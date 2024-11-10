'use client'
import { fetchBidById } from '@/actions/bid_actions';
import { Bids } from '@/helpers/types';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';

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
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-gray-100 text-gray-900">
      <Header />
      <div className="pb-8 pt-20">
        <div className="max-w-4xl mx-auto px-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="text-teal-500 font-semibold mb-6 flex items-center space-x-2 hover:text-teal-800 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          <h1 className="text-2xl lg:text-3xl font-semibold text-teal-700 py-5 mb-8 text-center">Bid Application Details</h1>

          <div className="space-y-8">
            <SectionTitle title="Application Information" />
            <DetailItem label="Bid ID" value={bid._id} />
            <DetailItem
              label="Project"
              value={typeof bid.projectId === 'object' && bid.projectId !== null ? bid.projectId.title : bid.projectId}
            />
            <DetailItem
              label="Applicant Name"
              value={typeof bid.user === 'string' ? 'Unknown User' : bid.user.name}
            />
            <DetailItem
              label="Bid Amount"
              value={`${bid.amount} ${bid.currency}`}
            />

            <SectionTitle title="Proposal Details" />
            <div className="flex justify-between items-start border-b pb-4">
              <span className="text-base text-gray-700 font-normal">{bid.proposal}</span>
            </div>

            <SectionTitle title="Application Status" />
            <DetailItem
              label="Status"
              value={bid.status}
              statusStyle={true ? 'text-green-500' : 'text-red-500'}
            />

            <SectionTitle title="Delivery & Timeline" />
            <DetailItem
              label="Delivery Time"
              value={`${bid.deliveredIn.days} days`}
            />

            <SectionTitle title="Timestamps" />
            <DetailItem
              label="Created At"
              value={new Date(bid.createdAt).toLocaleDateString()}
            />
            <div className="flex justify-between items-start pb-4">
              <span className="text-sm font-medium text-gray-500">Updated At:</span>
              <span className={`text-sm text-gray-600 font-normal`}>{new Date(bid.updatedAt).toLocaleDateString()}</span>
            </div>

            {/* Supporting Documents Section */}
            <SectionTitle title="Supporting Documents" />
            {bid.supportingDocs && bid.supportingDocs.length > 0 ? (
              <div className="border rounded-lg p-6 shadow-sm">
                <div className="space-y-6">
                  {bid.supportingDocs.map((doc, index) => {
                    const isImage = doc.fileType.startsWith('image');
                    const isPdf = doc.fileType === 'application/pdf';
                    const isText = doc.fileType.startsWith('text');
                    const isOffice = doc.fileType.includes('msword') || doc.fileType.includes('officedocument');

                    return (
                      <div key={index} className="border-b pb-4 mb-4">
                        <div className="flex items-center space-x-6">
                          {isImage && (
                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                              <Image
                                src={doc.fileUrl}
                                alt={doc.fileName}
                                width={150}
                                height={150}
                                className="rounded-lg shadow-md border border-gray-200 hover:scale-105 transition-transform"
                              />
                            </a>
                          )}

                          {/* Preview for PDFs */}
                          {isPdf && (
                            <div className="flex items-center space-x-3">
                              <embed src={doc.fileUrl} width={150} height={150} className="rounded-lg shadow-md" />
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-600 hover:text-teal-800 underline"
                              >
                                {doc.fileName}
                              </a>
                            </div>
                          )}

                          {/* Preview for Text Files */}
                          {isText && (
                            <div className="flex items-center space-x-3">
                              <span className="text-gray-500">Text File Preview:</span>
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-600 hover:text-teal-800 underline"
                              >
                                {doc.fileName}
                              </a>
                            </div>
                          )}

                          {/* Preview for Office Files (Word, Excel) */}
                          {isOffice && (
                            <div className="flex items-center space-x-3">
                              <span className="text-gray-500">Office Document Preview:</span>
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-600 hover:text-teal-800 underline"
                              >
                                {doc.fileName}
                              </a>
                            </div>
                          )}

                          {/* For unsupported file types */}
                          {!isImage && !isPdf && !isText && !isOffice && (
                            <div className="text-sm text-gray-500">Unsupported file type</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No supporting documents available.</div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for section titles
const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b pb-2 mb-4">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
  </div>
);

// Helper component to structure each detail row
const DetailItem = ({ label, value, statusStyle = '' }: { label: string; value: string | number; statusStyle?: string }) => (
  <div className="flex justify-between items-start pb-4">
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    <span className={`text-sm ${statusStyle} text-gray-600 font-normal`}>{value}</span>
  </div>
);

export default BidPage;
