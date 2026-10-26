export interface Address {
  line1: string;
  line2: string;
}

export interface Doctor {
  _id: string;
  name: string;
  image: string;
  specialty: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: Address;
}

export interface Appointment {
  doctor: Doctor;
  date: string;
  time: string;
}

export interface TimeSlot {
  datetime: Date;
  time: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: Address;
  gender: string;
  dob: string;
  profilePicture?: string;
}

// Temporary browser-only account model; replace with an API in the backend stage.
export interface DemoUser extends UserProfile {
  password: string;
}
