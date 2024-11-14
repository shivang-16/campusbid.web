import { Bids } from "@/helpers/types";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";
import { FaCalendar, FaUserCircle } from "react-icons/fa";

const Bid = ({ bid, handleAssignClick }: { bid: Bids; handleAssignClick?: (bid: Bids) => void }) => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <li
        className={`flex flex-col items-center py-3 px-4 md:px-6 hover:shadow-sm transition-all duration-300 ease-in-out rounded-lg ${
          handleAssignClick
            ? "bg-white"
            : "bg-gradient-to-r from-teal-100 to-white"
        }`}
      >
        <div className="flex items-center gap-6 pb-3">
          <div className="w-12 h-12 flex items-center justify-center bg-teal-600 text-white text-xl font-bold rounded-full shadow-md">
            {typeof bid.user === "string" ? "?" : bid.user.name.charAt(0)}
          </div>
          <div className="flex-1 ml-4">
            <p className="text-lg font-semibold text-gray-900 truncate">
              {typeof bid.user === "string" ? "Unknown User" : bid.user.name}
            </p>
            <p className="text-sm text-gray-500 mb-3">{bid?.proposal?.slice(0, 150)}...</p>
            <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
              <FaUserCircle className="text-teal-500" />
              Bid Amount:
              <span className="font-medium text-teal-700">
                {bid.currency} {bid.amount}
              </span>
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
              <FaCalendar className="text-teal-500" />
              Delivered in:
              <span className="font-medium text-teal-700">
                {bid.deliveredIn.days} days
              </span>
            </p>
          </div>
        </div>
        <div className="flex">
          <Link href={`/bid/${bid._id}`}>
            <button className="ml-4 py-2 px-4 bg-gray-100 text-teal-500 text-sm rounded-md hover:bg-gray-200 transition-all duration-200 ease-in-out">
              View
            </button>
          </Link>
          {handleAssignClick && user?.role === "client" && (
            <button
              onClick={() => handleAssignClick(bid)}
              className="ml-4 py-2 px-4 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-all duration-200 ease-in-out"
            >
              Assign
            </button>
          )}
        </div>
      </li>
    </>
  );
};

export default Bid;
