import React from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const ContactForm = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const emailValidation = () => {
    return String(email)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (username === "") {
      setErrMsg("Username is required!");
    } else if (email === "") {
      setErrMsg("Please give your Email!");
    } else if (!emailValidation(email)) {
      setErrMsg("Give a valid Email!");
    } else if (subject === "") {
      setErrMsg("Please give your Subject!");
    } else if (message === "") {
      setErrMsg("Message is required!");
    } else {
      const templateParams = {
        username,
        phoneNumber,
        email,
        subject,
        message,
      };

      emailjs
        .send(
          "service_bwkc4u7",
          "template_abe0qvd",
          templateParams,
          "qvICHaqRSY6V5wHZq"
        )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSuccessMsg(
            `Thank you dear ${username}, Your message has been sent successfully!`
          );
          setErrMsg("");
          setUsername("");
          setEmail("");
          setSubject("");
          setMessage("");
        })
        .catch((error) => {
          console.log("FAILED...", error);
          setErrMsg("Failed to send your message. Please try again later.");
        });
    }
  };

  return (
    <section id="contact" className="w-1/3 mx-auto">
        <p className="text-xl mb-6">Questions, Requests, or Advice? We're Listening!</p>
      <div className="w-full">
        <div className="w-full flex flex-col justify-between">
          <div className="w-full bg-primary p-10 rounded-lg shadow-md">
            <form className="flex flex-col gap-6">
              {errMsg && (
                <p className="p-3 text-center text-base animate-bounce bg-white text-orange-500">
                  {errMsg}
                </p>
              )}
              {successMsg && (
                <p className="p-3 text-center text-base animate-bounce bg-white text-green-500">
                  {successMsg}
                </p>
              )}
              <div className="flex gap-10 flex-wrap md:flex-nowrap">
                <div className="flex-1 flex flex-col gap-2">
                  <p className="text-sm text-black font-medium uppercase tracking-wide">
                    Your Name
                  </p>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className={`p-2 rounded-lg border ${
                      errMsg === "Username is required!"
                        ? "border-[#ff5e57]"
                        : "border-transparent"
                    } bg-white text-gray-400`}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-sm text-black font-medium uppercase tracking-wide">
                  Email
                </p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={`p-2 rounded-lg border ${
                    errMsg === "Please give your Email!"
                      ? "border-[#ff5e57]"
                      : "border-transparent"
                  } bg-white text-gray-400`}
                  type="email"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-sm text-black font-medium uppercase tracking-wide">
                  Subject
                </p>
                <input
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                  className={`p-2 rounded-lg border ${
                    errMsg === "Please give your Subject!"
                      ? "border-[#ff5e57]"
                      : "border-transparent"
                  } bg-white text-gray-400`}
                  type="text"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-sm text-black font-medium uppercase tracking-wide">
                  Message
                </p>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className={`p-2 rounded-lg border ${
                    errMsg === "Message is required!"
                      ? "border-[#ff5e57]"
                      : "border-transparent"
                  } bg-white text-gray-400`}
                  cols="30"
                  rows="8"
                ></textarea>
              </div>
              <div className="w-full">
                <button
                  onClick={handleSend}
                  className="w-full h-12 bg-white rounded-lg uppercase text-black font-medium transition-all duration-300 border border-transparent hover:text-white hover:bg-gray-600"
                >
                  Contact us
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
