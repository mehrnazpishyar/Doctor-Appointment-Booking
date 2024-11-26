import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/data";


const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);


  const saveProfile = () => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setIsEdit(false);
    toast.success("Profile updated successfully!")
  };


  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (line, value) => {
    setUserData((prev) => ({
      ...prev,
      address: { ...prev.address, [line]: value },
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm border border-gray-300 rounded-lg mx-auto py-4 mt-14 justify-center items-center">
     <div className="relative">
        <img
          className="w-36 h-36 rounded-full object-cover"
          src={userData.profilePicture || assets.avatar}
          alt="Profile"
        />
        {isEdit && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute bottom-0 left-0 bg-white text-sm cursor-pointer"
          />
        )}
      </div>

      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          onChange={(e) => handleInputChange("name", e.target.value)}
          value={userData.name}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">Contact Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-green-600">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="tel"
              onChange={(e) => handleInputChange("phone", e.target.value)}
              value={userData.phone}
            />
          ) : (
            <p className="text-green-600">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                value={userData.address.line1}
              />
              <br />
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) => handleAddressChange("line2", e.target.value)}
                value={userData.address.line2}
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1} <br /> {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              onChange={(e) => handleInputChange("gender", e.target.value)}
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              onChange={(e) => handleInputChange("dob", e.target.value)}
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={saveProfile}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Save information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border bg-primary text-white border-primary px-8 py-2 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
