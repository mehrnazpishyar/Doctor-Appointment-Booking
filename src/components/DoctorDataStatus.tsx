import { useAppContext } from "../context/useAppContext";

const DoctorDataStatus = () => {
  const {
    doctorsLoading,
    doctorsError,
    reloadDoctors,
  } = useAppContext();

  if (doctorsLoading) {
    return (
      <p role="status" className="py-12 text-center">
        Loading doctors...
      </p>
    );
  }

  if (doctorsError) {
    return (
      <div className="py-12 text-center">
        <p role="alert">{doctorsError}</p>

        <button
          type="button"
          onClick={reloadDoctors}
          className="mt-4 text-primary underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return null;
};

export default DoctorDataStatus;