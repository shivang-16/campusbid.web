import { ProjectDataProps } from "@/helpers/types";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";

const BidList = ({ project }: { project: ProjectDataProps }) => {
  const user = useAppSelector(state => state.user.user);

  return (
    <>
      {project.bids.length === 0 ? (
        <h2 className="text-base md:text-[20px] font-medium text-gray-400">
          No bids have been placed yet.
        </h2>
      ) : (
        <h2 className="text-xl md:text-[23px] pb-3 font-semibold text-gray-700 border-b-2 border-gray-200">
          A total of{" "}
          <span className="text-teal-600">{project.bids.length} bids</span> have
          been placed.
        </h2>
      )}

      <ul className="space-y-4">
        {project.bids.map((bid, index) => (
          <Link href={`/bid/${bid._id}`} key={index}>
            <li className="flex flex-col items-center py-3 px-4 md:px-6 bg-white hover:shadow-sm transition-all duration-300 ease-in-out">
              <div className="flex items-center gap-6 pb-3">
              <div className="w-12 h-12 flex items-center justify-center bg-teal-600 text-white text-xl font-bold rounded-full shadow-md">
                {typeof bid.user === "string" ? "?" : bid.user.name.charAt(0)}
              </div>
              <div className="flex-1 ml-4">
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {typeof bid.user === "string"
                    ? "Unknown User"
                    : bid.user.name}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
                  <FaUserCircle className="text-teal-500" />
                  Bid Amount:
                  <span className="font-medium text-teal-700">
                    {bid.currency} {bid.amount}
                  </span>
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
                  <FaCalendarAlt className="text-teal-500" />
                  Delivered in:
                  <span className="font-medium text-teal-700">
                    {bid.deliveredIn.days} days
                  </span>
                </p>
              </div>
              
              </div>
              <div className="flex">
              <button className="ml-4 py-2 px-4 bg-gray-100 text-teal-500 text-sm rounded-md hover:bg-gray-200 transition-all duration-200 ease-in-out">
                  View
                </button>
              {/* Conditionally render the Assign button if the user is a client */}
              {user?.role === "client" && (
                <button className="ml-4 py-2 px-4 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-all duration-200 ease-in-out">
                  Assign
                </button>
              )}
              </div>
            </li>
            <hr className="border-gray-300 my-4" />
          </Link>
        ))}
      </ul>
    </>
  );
};

export default BidList;
