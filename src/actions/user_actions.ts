"use server";

import { getCookie } from "./cookie_actions";
import { revalidateTag } from "next/cache";
import apiClient from "@/apiClient/apiClient";

export const signUpUser = async (data: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error registering user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while registering user!");
    }
  }
};

export const resendOtp = async (email: string) => {
  try {
    const res = await apiClient.post("/api/auth/resend", { email });

    const data = res.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error re-sending OTP: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while re-sending OTP!");
    }
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgetpassword`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Error sending password resetting link: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while sending password resetting link!"
      );
    }
  }
};

export const resetPassword = async (
  data: any,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/resetpassword/${token}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error resetting password: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while resetting password!");
    }
  }
};

export const verifyAuthToken = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/token/verify`,
      {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error verifying auth token: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while verifying auth token!");
    }
  }
};

export const getUser = async () => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        // cache: "force-cache",
        next: {
          tags: ["userData"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching logged in user: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching logged in user"
      );
    }
  }
};


export const savePersonalInfo = async (data: any) => {
  const token = await getCookie("token");
  console.log(data)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/save/info`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to save student information");
    }

    const responseData = await res.json();

    // Revalidate or refresh user data
    revalidateTag("userData");

    return responseData;
  } catch (error: unknown) {
    console.error("Fetch error:", error)
    if (error instanceof Error) {
      throw new Error(`Error in saving student info: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while saving student info");
    }
  }
};


export const modeChanger = async (data: any) => {
  const token = await getCookie("token");
  console.log(data)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/update/mode`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to save student information");
    }

    const responseData = await res.json();

    // Revalidate or refresh user data
    revalidateTag("userData");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in changing mode: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while changing mode");
    }
  }
};

export const fetchMyBids = async (status?: string) => {
  const token = await getCookie("token");

try {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/list/bids?status=${status}`,
    {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
    }
  );

  const responseData = await response.json();

  return responseData;
} catch (error) {
  if (error instanceof Error) {
    throw new Error(`Error fetching bids: ${error.message}`);
  } else {
    throw new Error("An unknown error occurred while fetching bids!");
  }
}
};

// this routes in for freelancer role
export const fetchMyAssignedProjects = async (status?: string) => {
  const token = await getCookie("token");

try {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/freelancer/list/projects?status=${status}`,
    {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
    }
  );

  const responseData = await response.json();

  return responseData;
} catch (error) {
  if (error instanceof Error) {
    throw new Error(`Error fetching projects: ${error.message}`);
  } else {
    throw new Error("An unknown error occurred while fetching projects!");
  }
}
};

//this route is client role
export const fetchMyProjects = async (status?: string) => {
  const token = await getCookie("token");

try {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/client/list/projects?status=${status}`,
    {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
    }
  );

  const responseData = await response.json();

  return responseData;
} catch (error) {
  if (error instanceof Error) {
    throw new Error(`Error fetching projects: ${error.message}`);
  } else {
    throw new Error("An unknown error occurred while fetching projects!");
  }
}
};