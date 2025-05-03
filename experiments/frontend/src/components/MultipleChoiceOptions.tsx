import React from "react";

interface MultipleChoiceOptionsProps {
  options: string[];
  selectedAnswer: string | number | null;
  setAnswer: (answer: string) => void;
  onOptionHistory: (option: string) => void;
}

/**
 * Displays multiple choice options (A, B, C, D, etc.).
 */
const MultipleChoiceOptions: React.FC<MultipleChoiceOptionsProps> = ({
  options,
  selectedAnswer,
  setAnswer,
  onOptionHistory,
}) => {
  // You can change the label size or logic if you have fewer or more than 10.
  const optionLabels = Array.from("ABCDEFGHIJ");

  return (
    <div className="flex flex-col justify-center items-center w-3/4 mx-auto">
      {options.map((option, idx) => {
        if (
          option &&
          option !== "NaN" &&
          option !== "Skip" &&
          option !== "Don't Know"
        ) {
          return (
            <div
              key={option}
              style={{ height: "4.75rem" }}
              onClick={() => {
                onOptionHistory(option);
                setAnswer(option);
              }}
              className={`
                ${
                  selectedAnswer === option
                    ? "bg-[#ddf4ff] border-blue-400"
                    : "border-gray-300 hover:bg-[#ddf4ff] hover:border-[#1cb0f6]"
                }
                cursor-pointer p-4 flex items-center min-w-full rounded-lg border-2 border-b-[6px] mb-2 transition-all duration-100  active:border-b-2
              `}
            >
              <p className="flex justify-center items-center w-12 h-12 rounded-lg text-center mr-4">
                {optionLabels[idx]}.
              </p>
              <p className="w-full text-center text-gray-700">
                {option}
              </p>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default MultipleChoiceOptions;
