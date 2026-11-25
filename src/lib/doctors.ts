import type { Doctor } from "../types";
import { apiRequest } from "./api";

interface ApiDoctor extends Omit<Doctor, "_id" | "address"> {
  id: string;
  addressLine1: string;
  addressLine2: string;
}

interface DoctorsResponse {
  doctors: ApiDoctor[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function toDoctor(doctor: ApiDoctor): Doctor {
  return {
    _id: doctor.id,
    name: doctor.name,
    image: doctor.image,
    specialty: doctor.specialty,
    degree: doctor.degree,
    experience: doctor.experience,
    about: doctor.about,
    fees: doctor.fees,
    available: doctor.available,
    address: {
      line1: doctor.addressLine1,
      line2: doctor.addressLine2,
    },
  };
}

export async function fetchDoctors(
  signal?: AbortSignal
): Promise<Doctor[]> {
  const firstPage = await apiRequest<DoctorsResponse>(
    "/doctors?page=1&limit=100",
    { signal }
  );

  const doctors = [...firstPage.doctors];

  for (
    let page = 2;
    page <= firstPage.pagination.totalPages;
    page++
  ) {
    const nextPage = await apiRequest<DoctorsResponse>(
      `/doctors?page=${page}&limit=100`,
      { signal }
    );

    doctors.push(...nextPage.doctors);
  }

  return doctors.map(toDoctor);
}