import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-teal-50 text-primary">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
        <p className="text-sm md:text-base text-gray-600 font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
