import React, { useState, Dispatch, SetStateAction } from "react";
import InputWithCurrency from "@/components/ui/amountinput";
import { FaUpload } from "react-icons/fa";
import { createBid } from "@/actions/bid_actions";
import { uploadImageToS3 } from "@/actions/s3_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PlaceBid = ({
  selectedCurrency,
  amount,
  setSelectedCurrency,
  setAmount,
  projectId,
}: {
  selectedCurrency: string;
  amount: number;
  setSelectedCurrency: any;
  setAmount: Dispatch<SetStateAction<number>>;
  projectId: string; // Project ID for the bid
}) => {
  const [proposal, setProposal] = useState("");
  const [days, setDays] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    try {
      // Map uploaded files to formatted supporting docs
      const formattedFiles = uploadedFiles?.map((file) => ({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      }));
  
      // Create bid data
      const bidData = {
        projectId,
        amount,
        proposal,
        days,
        supportingDocs: formattedFiles,
      };
  
      const response = await createBid(bidData);
  
      console.log(response, "here is response"); // Debugging line
  
      if (response.success) {
        toast.success(response.message);
        router.replace(`/bid/${response.bid._id}`); // Ensure correct route format
      } else {
        toast.error(response.message);
      }
  
      // Map over files to upload each one to its corresponding signed URL
      const uploadFiles = uploadedFiles.map((file, index) => {
        const signedUrl = response.signedUrls[index];
        return uploadImageToS3(file, signedUrl);
      });
  
      // Wait until all file uploads are complete
      await Promise.all(uploadFiles);
    } catch (error) {
      console.error("Error creating bid:", error);
    }
  };
  

  return (
    <>
      <h3 className="text-lg font-extrabold text-gray-800">Bid Now</h3>
      <div className="space-y-4 mt-4">
        <div>
          <p className="text-gray-700 font-extrabold text-sm mb-1">
            Your Proposal
          </p>
          <div className="relative">
            <textarea
              placeholder="Enter your bid proposal details"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none min-h-[120px] placeholder:text-gray-500"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
            />
            {/* Upload Icon */}
            <label htmlFor="file-upload" className="absolute bottom-3 right-3 cursor-pointer text-teal-500">
              <FaUpload size={18} />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {/* File Previews */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative w-[50px] h-[50px]">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
                  onClick={() => removeFile(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
            <div>
          <p className="text-gray-700 font-extrabold text-sm mb-1">
            Set Your Price
          </p>
          <InputWithCurrency
            selectedCurrency={selectedCurrency}
            amount={amount}
            onCurrencyChange={setSelectedCurrency}
            onAmountChange={setAmount}
          />
          </div>
          <div>
          <p className="text-gray-700 font-extrabold text-sm mb-1">
            Completed in
          </p>
           <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={days}
            placeholder="Required Days to complete"
            onChange={(e) => setDays(e.target.value)}
          />
          </div>
        </div>
      </div>
      <button
        className="w-full py-3 mt-4 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition duration-150 shadow-md"
        onClick={handleCreate}
      >
        Submit Bid
      </button>
    </>
  );
};

export default PlaceBid;
