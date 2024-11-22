import React from "react";
import { assets } from "../assets/data";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500 ">
        <p className="text-green-600">
          ABOUT US
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.about} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to Doctor Appointment Website, your reliable partner in
            simplifying healthcare management. We know how challenging it can be
            to schedule appointments and keep track of health records, which is
            why we've made it easier for you.
          </p>
          <p>
            At Doctor Appointment Website, we are dedicated to providing
            top-notch healthcare technology. Our platform is constantly
            evolving, incorporating the latest innovations to ensure the best
            user experience and exceptional service. Whether you're booking your
            first appointment or managing ongoing health needs, we are here to
            guide you throughout your healthcare journey.
          </p>
          <b>Our goal </b>
          <p>
            At Doctor Appointment Website, our goal is to provide a smooth and
            effortless healthcare experience for all users. We strive to connect
            patients with healthcare providers, ensuring you can easily access
            the care you require, whenever you need it.
          </p>
        </div>
      </div>

      <div className="text-xl my-4 pt-14">
        <p>Why should you choose us?</p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-10 mt-6">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-primary text-white rounded-lg">
          <b>EFFICIENCY:</b>
          <p>
            Effortless appointment booking that seamlessly integrates into your
            busy routine.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-primary text-white rounded-lg">
          <b>PERSONALIZATION:</b>
          <p>
            Personalized suggestions and alerts to keep you focused on your
            health.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-primary text-white rounded-lg">
          <b>CONVENIENCE: </b>
          <p>
            Connect with a network of reliable healthcare providers near you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
