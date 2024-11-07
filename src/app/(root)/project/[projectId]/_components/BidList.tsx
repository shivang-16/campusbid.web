import { ProjectDataProps } from "@/helpers/types";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";

const BidList = ({ project }: { project: ProjectDataProps }) => {
  return (
    <>
      {project.bids.length === 0 ? (
        <h2 className="text-xl md:text-[23px] font-semibold text-gray-700">
          No bids have been placed yet.
        </h2>
      ) : (
        <h2 className="text-xl md:text-[23px] pb-[3px] font-semibold text-gray-700 border-b-2 border-gray-200">
          A total of{" "}
          <span className="text-teal-600">{project.bids.length} bids</span> have
          been placed.
        </h2>
      )}

      <ul className="space-y-4">
        {project.bids.map((bid, index) => (
          <Link href={`/bid/${bid._id}`} key={index}>
            <li className="flex items-center gap-6 py-6 px-4 md:px-6 bg-white hover:shadow-sm transition-all duration-300 ease-in-out">
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
            </li>
            <hr className="border-gray-300 my-4" />
          </Link>
        ))}
      </ul>
    </>
  );
};

export default BidList;
