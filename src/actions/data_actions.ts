"use server";

import { getCookie } from "./cookie_actions";

export const getCollegeNames = async (query: string) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/data/colleges/get?q=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching colleges: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching colleges");
    }
  }
};


export const getCityNames = async (query: string, stateCode: string) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/data/cities/get?q=${query}&stateCode=${stateCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching city: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching city");
    }
  }
};


export const getStateNames = async (query: string) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/data/states/get?q=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching states: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching state");
    }
  }
};



export const getAllOptions = async (option: string, type: string, value: string) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/data/options/get?option=${option}&type=${type}&q=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching options: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching options");
    }
  }
};