import React from "react";

interface InputWithCurrencyProps {
  selectedCurrency: string;
  amount: number;
  onCurrencyChange: (currency: string) => void;
  onAmountChange: (amount: number) => void;
}

const InputWithCurrency: React.FC<InputWithCurrencyProps> = ({
  selectedCurrency,
  amount,
  onCurrencyChange,
  onAmountChange,
}) => {
  const currencies = ["USD", "EUR", "GBP", "JPY", "INR"]; // Add more as needed

  return (
    <div className="flex items-center">
      {/* Currency Selector */}
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      {/* Amount Input */}
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(Number(e.target.value))}
        placeholder="Enter amount"
        className="w-full p-2 border border-gray-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
};

export default InputWithCurrency;
