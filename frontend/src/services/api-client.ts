import { RegisterFormData } from "../pages/Register";
import { SigninFormData } from "../pages/Signin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const registerUser = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
};

export const signIn = async (formData: SigninFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Token invalid");

  return res.json();
};

export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!res.ok) throw new Error("Error during sign out ");
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!res.ok) {
    throw new Error("Failed to add hotel");
  }

  return res.json();
};
