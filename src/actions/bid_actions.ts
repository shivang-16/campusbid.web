"use server";

import { getCookie } from "./cookie_actions";

export const fetchBidById = async (bidId: string) => {
    const token = await getCookie("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bid/get/${bidId}`,
      {
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
      throw new Error(`Error fetching bid: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching bid!");
    }
  }
};