'use client'
import { fetchBidById } from '@/actions/bid_actions';
import { Bids } from '@/helpers/types';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';

const BidPage = () => {
  const [bid, setBid] = useState<Bids | null>(null);
  const { bidId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof bidId === 'string') {
      (async () => {
        const { bid } = await fetchBidById(bidId);
        setBid(bid);
      })();
    } else {
      console.error("Invalid bidId:", bidId);
    }
  }, [bidId]);

  if (!bid) return (
    <div className="text-center py-20 text-gray-700 animate-pulse">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 text-gray-900">
      <Header />
      <div className='pb-8 pt-20'>
        <div className="max-w-3xl mx-auto px-8 py-10 bg-white shadow-xl rounded-lg border border-gray-200">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="text-teal-600 font-semibold mb-4 flex items-center space-x-2 hover:text-teal-800 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          <h1 className="text-2xl md:text-4xl font-extrabold text-teal-600 mb-12 text-center">Bid Details</h1>
          <div className="space-y-6">
            <DetailItem label="Bid ID" value={bid._id} />
            <DetailItem
              label="Project"
              value={typeof bid.projectId === 'object' && bid.projectId !== null ? bid.projectId.title : bid.projectId}
            />
            <DetailItem
              label="User"
              value={typeof bid.user === 'string' ? 'Unknown User' : bid.user.name}
            />
            <DetailItem
              label="Amount"
              value={`${bid.amount} ${bid.currency}`}
            />
            <div className="flex justify-between items-start border-b pb-4 transition-all">
              <span className="text-sm md:text-base font-semibold text-gray-600">Proposal:</span>
              <span className={`text-sm md:text-base text-gray-700 font-normal w-40 md:w-72`}>{bid.proposal}</span>
            </div>
            <DetailItem
              label="Status"
              value={bid.status}
              statusStyle={true ? 'text-green-500' : 'text-red-500'}
            />
            <DetailItem
              label="Delivery Time"
              value={`${bid.deliveredIn.days} days`}
            />
            <DetailItem
              label="Created At"
              value={new Date(bid.createdAt).toLocaleDateString()}
            />
            <DetailItem
              label="Updated At"
              value={new Date(bid.updatedAt).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component to structure each detail row
const DetailItem = ({ label, value, statusStyle = '' }: { label: string; value: string | number; statusStyle?: string }) => (
  <div className="flex justify-between items-start border-b pb-4 transition-all">
    <span className="text-sm md:text-base font-semibold text-gray-600">{label}:</span>
    <span className={`text-sm md:text-base ${statusStyle} text-gray-700 font-normal`}>{value}</span>
  </div>
);

export default BidPage;
