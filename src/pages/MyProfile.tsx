import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { Address, UserProfile } from "../types";
import { assets } from "../assets/data";
import { useAppContext } from "../context/useAppContext";
import { ApiError, apiRequest } from "../lib/api";

interface ApiProfile {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  gender: string | null;
  dob: string | null;
  profilePicture: string | null;
}

function toUserProfile(user: ApiProfile): UserProfile {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: {
      line1: user.addressLine1,
      line2: user.addressLine2,
    },
    gender: user.gender ?? "",
    dob: user.dob?.slice(0, 10) ?? "",
    profilePicture: user.profilePicture ?? undefined,
  };
}

const MyProfile = () => {
  const { token, setToken } = useAppContext();
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [userData, setUserData] = useState<UserProfile>({
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
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const controller = new AbortController();
    let active = true;

    setIsLoading(true);
    setLoadError("");
    setIsEdit(false);

    apiRequest<{ user: ApiProfile }>("/auth/me", {
      token,
      signal: controller.signal,
    })
      .then(({ user }) => {
        if (active) {
          setUserData(toUserProfile(user));
        }
      })
      .catch((error: unknown) => {
        if (!active) return;

        if (error instanceof ApiError && error.status === 401) {
          localStorage.removeItem("token");
          setToken(null);
          navigate("/login", { replace: true });
          return;
        }

        setLoadError("Could not load your profile. Please try again.");
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
  }, [token, navigate, setToken]);


  const saveProfile = async () => {
    if (!token || isSaving) return;

    setIsSaving(true);

    try {
      const { user } = await apiRequest<{ user: ApiProfile }>(
        "/auth/me",
        {
          method: "PATCH",
          token,
          body: JSON.stringify({
            name: userData.name,
            phone: userData.phone,
            addressLine1: userData.address.line1,
            addressLine2: userData.address.line2,
            gender: userData.gender || null,
            dob: userData.dob || null,
          }),
        }
      );

      setUserData(toUserProfile(user));
      setIsEdit(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login", { replace: true });
        return;
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update profile"
      );
    } finally {
      setIsSaving(false);
    
  }
};


const handleInputChange = (field: "name" | "phone" | "gender" | "dob", value: string) => {
  setUserData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const handleAddressChange = (line: keyof Address, value: string) => {
  setUserData((prev) => ({
    ...prev,
    address: { ...prev.address, [line]: value },
  }));
};

if (!token) {
  return null;
}

if (isLoading) {
  return (
    <p className="py-16 text-center">
      Loading profile...
    </p>
  );
}

if (loadError) {
  return (
    <div className="py-16 text-center">
      <p role="alert">{loadError}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-4 text-primary underline"
      >
        Try again
      </button>
    </div>
  );
}

return (
  <div className="max-w-lg flex flex-col gap-2 text-sm border border-gray-300 rounded-lg mx-auto py-4 mt-14 justify-center items-center">
    <div className="relative">
      <img
        className="w-36 h-36 rounded-full object-cover"
        src={userData.profilePicture || assets.avatar}
        alt="Profile"
      />

    </div>

    {isEdit ? (
      <input
        className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
        type="text"
        onChange={(e) => handleInputChange("name", e.target.value)}
        value={userData.name}
        disabled={isSaving}
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
            disabled={isSaving}
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
              disabled={isSaving}
            />
            <br />
            <input
              className="bg-gray-50"
              type="text"
              onChange={(e) => handleAddressChange("line2", e.target.value)}
              value={userData.address.line2}
              disabled={isSaving}
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
            disabled={isSaving}
          >
            <option value="">Not specified</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
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
            disabled={isSaving}
          />
        ) : (
          <p className="text-gray-400">{userData.dob}</p>
        )}
      </div>
    </div>
    <div className="mt-10">
      {isEdit ? (
        <button
          type="button"
          onClick={saveProfile}
          disabled={isSaving}
          className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Save information"}
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
