import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/useAppContext";
import { ApiError, apiRequest } from "../lib/api";

type AppointmentStatus = "BOOKED" | "CANCELLED" | "COMPLETED";

interface ApiAppointment {
  id: string;
  startsAt: string;
  status: AppointmentStatus;
  doctor: {
    id: string;
    name: string;
    image: string;
    specialty: string;
    addressLine1: string;
    addressLine2: string;
  };
}

interface AppointmentsResponse {
  appointments: ApiAppointment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function formatAppointmentDate(startsAt: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(startsAt));
}

const MyAppointments = () => {
  const { token, setToken } = useAppContext();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<ApiAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reloadVersion, setReloadVersion] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const controller = new AbortController();
    let active = true;

    setIsLoading(true);
    setLoadError("");
    setAppointments([]);

    apiRequest<AppointmentsResponse>(
      `/appointments?page=${page}&limit=10`,
      {
        token,
        signal: controller.signal,
      }
    )
      .then((data) => {
        if (!active) return;

        setAppointments(data.appointments);
        setTotalPages(data.pagination.totalPages);
      })
      .catch((error: unknown) => {
        if (!active) return;

        if (error instanceof ApiError && error.status === 401) {
          localStorage.removeItem("token");
          setToken(null);
          navigate("/login", { replace: true });
          return;
        }

        setLoadError(
          error instanceof ApiError
            ? error.message
            : "Could not load your appointments. Please try again."
        );
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [token, page, reloadVersion, navigate, setToken]);

  const cancelAppointment = async (appointmentId: string) => {
    if (!token || cancellingId || isLoading) return;

    setCancellingId(appointmentId);

    try {
      const { appointment } = await apiRequest<{
        appointment: {
          id: string;
          status: AppointmentStatus;
        };
      }>(
        `/appointments/${encodeURIComponent(appointmentId)}/cancel`,
        {
          method: "PATCH",
          token,
        }
      );

      setAppointments((previous) =>
        previous.map((item) =>
          item.id === appointment.id
            ? { ...item, status: appointment.status }
            : item
        )
      );

      toast.success("Appointment cancelled successfully.");
    } catch (error: unknown) {
      if (error instanceof ApiError && error.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login", { replace: true });
        return;
      }

      if (
        error instanceof ApiError &&
        (error.status === 404 || error.status === 409)
      ) {
        setIsLoading(true);
        setReloadVersion((version) => version + 1);
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not cancel your appointment."
      );
    } finally {
      setCancellingId(null);
    }
  };

  if (!token) return null;

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-blue-600">
        My appointments
      </p>

      <p className="mb-4 text-sm text-gray-500">
        All times are shown in Europe/Berlin.
      </p>

      {isLoading ? (
        <p role="status" className="py-8 text-center">
          Loading your appointments...
        </p>
      ) : loadError ? (
        <div className="py-8 text-center">
          <p role="alert">{loadError}</p>

          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setLoadError("");
              setReloadVersion((version) => version + 1);
            }}
            className="mt-3 text-primary underline"
          >
            Try again
          </button>
        </div>
      ) : appointments.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          You have no appointments yet.
        </p>
      ) : (
        <div>
          {appointments.map((item) => {
            const isFuture =
              new Date(item.startsAt).getTime() > Date.now();

            const canCancel =
              item.status === "BOOKED" && isFuture;

            const statusLabel =
              item.status === "CANCELLED"
                ? "Cancelled"
                : item.status === "COMPLETED"
                  ? "Completed"
                  : isFuture
                    ? "Booked"
                    : "Past appointment";

            return (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
              >
                <div>
                  <img
                    className="w-32 bg-gray-100 rounded-md"
                    src={item.doctor.image}
                    alt={item.doctor.name}
                  />
                </div>

                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {item.doctor.name}
                  </p>

                  <p>{item.doctor.specialty}</p>

                  <p className="text-zinc-700 font-medium mt-1">
                    Address:
                  </p>

                  <p className="text-xs">
                    {item.doctor.addressLine1}
                  </p>

                  <p className="text-xs">
                    {item.doctor.addressLine2}
                  </p>

                  <p className="text-xs mt-2">
                    <span className="text-sm text-neutral-700 font-medium">
                      Date & Time:
                    </span>{" "}
                    {formatAppointmentDate(item.startsAt)}
                  </p>

                  <p
                    className={`mt-2 text-sm ${
                      item.status === "CANCELLED"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    Status: {statusLabel}
                  </p>
                </div>

                {canCancel && (
                  <div className="col-span-2 flex flex-col justify-center">
                    <button
                      type="button"
                      onClick={() => cancelAppointment(item.id)}
                      disabled={cancellingId !== null}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 px-4 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {cancellingId === item.id
                        ? "Cancelling..."
                        : "Cancel appointment"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!isLoading && !loadError && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 my-6">
          <button
            type="button"
            disabled={page === 1 || cancellingId !== null}
            onClick={() => {
              setIsLoading(true);
              setPage((previous) => previous - 1);
            }}
            className="border rounded px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <p className="text-sm">
            Page {page} of {totalPages}
          </p>

          <button
            type="button"
            disabled={page >= totalPages || cancellingId !== null}
            onClick={() => {
              setIsLoading(true);
              setPage((previous) => previous + 1);
            }}
            className="border rounded px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;