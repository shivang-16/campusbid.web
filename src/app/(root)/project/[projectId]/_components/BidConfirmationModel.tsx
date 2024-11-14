import { Bids } from "@/helpers/types";
import Image from "next/image";
import React, { FC } from "react";
import { FaCalendar, FaUserCircle } from "react-icons/fa";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bid: Bids;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  bid,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 sm:w-[400px] shadow-lg">
      <div className="flex items-center gap-6 pb-3">
                <div className="w-12 h-12 flex items-center justify-center bg-teal-600 text-white text-xl font-bold rounded-full shadow-md">
                  {typeof bid.user === "string" ? "?" : bid.user?.name.charAt(0)}
                </div>
                <div className="flex-1 ml-4">
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {typeof bid.user === "string" ? "Unknown User" : bid.user?.name}
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
                      {bid.deliveredIn?.days} days
                    </span>
                  </p>
                </div>
              </div>
              <div>
              {bid.supportingDocs && bid.supportingDocs.length > 0 ? (
              <div className="rounded-lg p-6">
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
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
