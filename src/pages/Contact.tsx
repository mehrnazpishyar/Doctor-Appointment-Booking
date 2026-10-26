import React from "react";
import { assets } from "../assets/data";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 pb-4 text-gray-500">
        <p className="text-green-600">CONTACT US</p>
      </div>

      <div className="mt-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-[360px] rounded" src={assets.contact} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className=" font-semibold text-lg text-gray-600">OUR HOSPITAL</p>
          <p className=" text-gray-500">
            Deutschland
          </p>
          <p className=" text-gray-500">
            Tel: +49-000-000-000
            <br />
            Dr.Appointment@*******
          </p>
        </div>
      </div>
      <ContactForm/>
    </div>
  );
};

export default Contact;
