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
          <span className="text-teal-600">{project.bids.length} bids</span> have been placed.
        </h2>
      )}

      <ul className="space-y-4">
        {project.bids.map((bid, index) => (
          <Link href={`/bid/${bid._id}`} key={index}>
            <li className="flex w-full justify-between py-3 px-1 md:px-6 bg-white transition-all duration-300 ease-in-out">
              <div className="flex items-center gap-6 pb-3">
                <div className="w-11 h-11 flex items-center justify-center bg-teal-600 text-white text-xl font-bold rounded-full shadow-md">
                  {typeof bid.user === "string" ? "?" : bid.user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-[16px] font-semibold text-gray-700 truncate">
                    {typeof bid.user === "string"
                      ? "Unknown User"
                      : bid.user.name}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
                    <FaUserCircle className="text-teal-500" />
                    Amount:
                    <span className="font-medium text-teal-700">
                      {bid.currency} {bid.amount}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
                    <FaCalendarAlt className="text-teal-500" />
                    Deadline:
                    <span className="font-medium text-teal-700">
                      {bid.deliveredIn.days} days
                    </span>
                  </p>
                </div>

              </div>
              <div className="flex">
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
