'use client'
import { fetchBidById } from '@/actions/bid_actions';
import { Bids } from '@/helpers/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BidPage = () => {
  const [bid, setBid] = useState<Bids | null>(null);
  const { bidId } = useParams();

  useEffect(() => {
    if (typeof bidId === "string") {
      (async () => {
        const { bid } = await fetchBidById(bidId);
        setBid(bid);
      })();
    } else {
      console.error("Invalid bidId:", bidId);
    }
  }, [bidId]);

  if (!bid) return <div className="text-center py-10 text-gray-700">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Bid Details</h1>
      <div className="mb-4">
        <span className="font-semibold">Bid ID:</span> {bid._id}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Project ID:</span> {bid.projectId}
      </div>
      <div className="mb-4">
        <span className="font-semibold">User ID:</span> {typeof bid.user === 'string' ? 'Unknown User' : bid.user.name}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Amount:</span> {bid.amount} {bid.currency}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Proposal:</span> {bid.proposal}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Status:</span> {bid.status}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Delivery Time:</span> {bid.deliveredIn.day} days
      </div>
      <div className="mb-4">
        <span className="font-semibold">Created At:</span> {new Date(bid.createdAt).toLocaleDateString()}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Updated At:</span> {new Date(bid.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default BidPage;
