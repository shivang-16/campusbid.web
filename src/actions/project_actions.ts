"use server";

import { getCookie } from "./cookie_actions";

export const createProject = async (data: any) => {
    const token = await getCookie("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/project/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
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
