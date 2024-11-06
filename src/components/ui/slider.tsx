import React from 'react';

interface MinPaymentSliderProps {
  minPayment: number;
  setMinPayment: React.Dispatch<React.SetStateAction<number>>;
}

const MinPaymentSlider: React.FC<MinPaymentSliderProps> = ({ minPayment, setMinPayment }) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={0}
          max={50000}
          value={minPayment}
          onChange={(e) => setMinPayment(Number(e.target.value))}
          className="w-full h-2 appearance-none mb-2 rounded-full outline-none"
        />
      </div>
      <style jsx>{`
        /* Base track styling */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
        }

        /* Track styling */
        input[type="range"]::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(
            to right,
            #14b8a6 ${(minPayment / 50000) * 100}%, 
            #d1d5db ${(minPayment / 50000) * 100}% 100%
          ); /* Teal for filled and gray for unfilled */
        }

        input[type="range"]::-moz-range-track {
          height: 4px;
          background-color: #d1d5db;
          border-radius: 2px;
        }

        input[type="range"]::-ms-track {
          height: 4px;
          background-color: #d1d5db;
          border-radius: 2px;
        }

        /* Thumb (handle) styling */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background-color: #14b8a6; /* Dark teal color for thumb */
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
          margin-top: -8px; /* Center the thumb */
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background-color: #14b8a6;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
        }

        input[type="range"]::-ms-thumb {
          width: 20px;
          height: 20px;
          background-color: #14b8a6;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default MinPaymentSlider;
