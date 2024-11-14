import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import ConfirmationModal from "./BidConfirmationModel"; // Adjust the path as necessary
import { ProjectDataProps } from "@/helpers/types";
import { assignBidToProject } from "@/actions/project_actions";
import { toast } from "sonner";
import Bid from "./Bid";

const BidList = ({ project }: { project: ProjectDataProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState<any>(null);

  const handleAssignClick = (bid: any) => {
    setSelectedBid(bid);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBid(null);
  };

  const handleConfirmAssign = async () => {
    if (!selectedBid) return;

    try {
      const response = await assignBidToProject( selectedBid._id, project._id);

      if(response.success) {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
      
      handleModalClose();
    } catch (error) {
      console.error("Error assigning bid:", error);
      alert("Failed to assign bid. Please try again.");
    }
  };

  return (
    <>
      {project.bids
      .filter((bid) => !project.assignedBid?._id || bid._id !== project.assignedBid._id)
      .length === 0 ? (
        <h2 className="text-base md:text-[20px] font-medium text-gray-400">
          No new bid.
        </h2>
      ) : (
        <h2 className="text-xl md:text-[23px] pb-3 font-semibold text-gray-700 border-b-2 border-gray-200">
          A total of{" "}
          <span className="text-teal-600">{project.bids.length} bids</span> have
          been placed.
        </h2>
      )}

      <ul className="space-y-4">
        {project.bids
        .filter((bid) => !project.assignedBid?._id || bid._id !== project.assignedBid._id) // Filter bids
        .map((bid, index) => (
          <React.Fragment key={index}>
            <Bid bid={bid} handleAssignClick={handleAssignClick}/>
            <hr className="border-gray-300 my-4" />
          </React.Fragment>
        ))}
      </ul>

      {selectedBid && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleConfirmAssign}
          bid={selectedBid}
        />
      )}
    </>
  );
};

export default BidList;
