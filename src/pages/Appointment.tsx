import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import { assets } from "../assets/data";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import DoctorDataStatus from "../components/DoctorDataStatus";
import { ApiError, apiRequest } from "../lib/api";

interface AvailableSlot {
  startsAt: string;
  time: string;
}

interface SlotsResponse {
  doctorId: string;
  date: string;
  timeZone: string;
  doctorAvailable: boolean;
  slotDurationMinutes: number;
  slots: AvailableSlot[];
}

function getBookingDays() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const today = `${getPart("year")}-${getPart("month")}-${getPart("day")}`;

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(`${today}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + index);

    return {
      date: date.toISOString().slice(0, 10),
      day: new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        timeZone: "Europe/Berlin",
      }).format(date).toUpperCase(),
      dayNumber: date.getUTCDate(),
    };
  });
}

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const {
    doctors,
    doctorsLoading,
    doctorsError,
    currencySymbol,
    token,
    setToken,
  } = useAppContext();

  const docInfo = doctors.find((doctor) => doctor._id === docId);

  const [bookingDays] = useState(getBookingDays);
  const [selectedDate, setSelectedDate] = useState(
    bookingDays[0].date
  );

  const [availability, setAvailability] =
    useState<SlotsResponse | null>(null);

  const [selectedStartsAt, setSelectedStartsAt] = useState("");
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState("");
  const [reloadVersion, setReloadVersion] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  // Only use results belonging to the current doctor and date.
  const currentAvailability =
      availability &&
      availability?.doctorId === docId &&
      availability.date === selectedDate
      ? availability
      : null;

  const slots = currentAvailability?.slots ?? [];

  const selectedSlot = slots.find(
    (slot) => slot.startsAt === selectedStartsAt
  );

  useEffect(() => {
    if (!docId) return;

    const controller = new AbortController();
    let active = true;

    setSlotsLoading(true);
    setSlotsError("");
    setAvailability(null);
    setSelectedStartsAt("");

    apiRequest<SlotsResponse>(
      `/doctors/${encodeURIComponent(docId)}/slots?date=${selectedDate}`,
      { signal: controller.signal }
    )
      .then((data) => {
        if (active) {
          setAvailability(data);
        }
      })
      .catch((error: unknown) => {
        if (!active) return;

        setSlotsError(
          error instanceof ApiError
            ? error.message
            : "Could not load available times. Please try again."
        );
      })
      .finally(() => {
        if (active) {
          setSlotsLoading(false);
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [docId, selectedDate, reloadVersion]);

  const bookAppointment = async () => {
    if (isBooking) return;

    if (!token) {
      toast.warning("Please log in to book an appointment.");
      localStorage.setItem("redirectTo", `/appointment/${docId}`);
      navigate("/login");
      return;
    }

    if (
      !docId ||
      slotsLoading ||
      slotsError ||
      !selectedSlot
    ) {
      toast.error("Please select an available time slot.");
      return;
    }

    setIsBooking(true);

    try {
      await apiRequest<{ message: string }>("/appointments", {
        method: "POST",
        token,
        body: JSON.stringify({
          doctorId: docId,
          startsAt: selectedSlot.startsAt,
        }),
      });

      toast.success("Your appointment has been booked!");

      setSelectedStartsAt("");
      setAvailability(null);
      setSlotsLoading(true);
      setReloadVersion((version) => version + 1);
    } catch (error: unknown) {
      if (error instanceof ApiError && error.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
        localStorage.setItem("redirectTo", `/appointment/${docId}`);
        toast.error("Please log in again.");
        navigate("/login");
        return;
      }

      if (error instanceof ApiError && error.status === 409) {
        setSelectedStartsAt("");
        setAvailability(null);
        setSlotsLoading(true);
        setReloadVersion((version) => version + 1);
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not book your appointment."
      );
    } finally {
      setIsBooking(false);
    }
  };

  if (doctorsLoading || doctorsError) {
    return <DoctorDataStatus />;
  }

  if (!docInfo) {
    return (
      <p className="py-16 text-center">
        Doctor not found.
      </p>
    );
  }

  return docInfo ? (
    <div>
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ----- Doc Info : name, degree, experience ----- */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.specialty}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          {/* ----- Doc About ----- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img className="w-3" src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking slots */}
      {/* Booking slots */}
      <div className="sm:ml-72 sm:pl-4 mt-16 font-medium text-gray-700">
        <p className="text-lg text-blue-700 font-bold">
          Booking slots
        </p>

        <p className="text-sm text-gray-500 mt-1">
          All times are shown in Europe/Berlin.
        </p>

        {/* Days */}
        <div className="flex gap-4 items-center w-full overflow-x-auto mt-4">
          {bookingDays.map((day) => (
            <button
              type="button"
              key={day.date}
              disabled={isBooking}
              aria-pressed={selectedDate === day.date}
              onClick={() => {
                if (day.date === selectedDate) return;

                setSelectedDate(day.date);
                setSelectedStartsAt("");
                setAvailability(null);
                setSlotsError("");
                setSlotsLoading(true);
              }}
              className={`flex flex-col items-center justify-center
          h-24 min-w-16 shrink-0 rounded-md border
          disabled:cursor-not-allowed ${selectedDate === day.date
                  ? "bg-primary text-white border-primary"
                  : "border-gray-200 text-gray-700"
                }`}
            >
              <span className="font-bold">{day.day}</span>
              <span className="text-sm">{day.dayNumber}</span>
            </button>
          ))}
        </div>

        {/* Times */}
        <div className="mt-4">
          {slotsLoading ? (
            <p role="status" className="text-sm text-gray-500">
              Loading available times...
            </p>
          ) : slotsError ? (
            <div>
              <p role="alert" className="text-sm text-red-600">
                {slotsError}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSlotsLoading(true);
                  setSlotsError("");
                  setReloadVersion((version) => version + 1);
                }}
                className="mt-2 text-primary underline"
              >
                Try again
              </button>
            </div>
          ) : !currentAvailability?.doctorAvailable ? (
            <p className="text-sm text-gray-500">
              This doctor is currently unavailable.
            </p>
          ) : slots.length === 0 ? (
            <p className="text-sm text-gray-500">
              No available times for this day. Please choose another day.
            </p>
          ) : (
            <div className="flex items-center gap-3 flex-wrap sm:justify-start justify-center">
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot.startsAt}
                  disabled={isBooking}
                  aria-pressed={selectedStartsAt === slot.startsAt}
                  onClick={() => setSelectedStartsAt(slot.startsAt)}
                  className={`text-sm font-light shrink-0 px-5 py-2
              rounded-full border disabled:cursor-not-allowed ${selectedStartsAt === slot.startsAt
                      ? "bg-primary text-white border-primary"
                      : "text-gray-500 border-gray-300"
                    }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex sm:justify-start justify-center">
          <button
            type="button"
            onClick={bookAppointment}
            disabled={
              isBooking ||
              slotsLoading ||
              Boolean(slotsError) ||
              !selectedSlot
            }
            className="bg-primary text-white text-sm font-light
        px-14 py-3 rounded-full my-6
        disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isBooking ? "Booking..." : "Book an appointment"}
          </button>
        </div>
      </div>
      {/* List of Related Doctors */}
      <RelatedDoctors specialty={docInfo.specialty} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
