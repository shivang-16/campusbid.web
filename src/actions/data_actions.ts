"use server";

import { getCookie } from "./cookie_actions";
import { revalidateTag } from "next/cache";
import apiClient from "@/apiClient/apiClient";

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
      throw new Error(`Error in saving student info: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while saving student info");
    }
  }
};


export const getCityNames = async (query: string) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/data/cities/get?q=${query}`,
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
      throw new Error(`Error in saving student info: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while saving student info");
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
      throw new Error(`Error in saving student info: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while saving student info");
    }
  }
};