import React from "react";

interface ProgressBarProps {
  current: number; // current number of items completed
  total: number;   // total number of items in this block
}

/**
 * A simple progress bar to visually represent how many tasks are completed
 * out of the total in the current block.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total === 0 ? 0 : Math.round((current * 100) / total);

  return (
    <div>
      <div>
        Current progress: {current} / {total}
      </div>
      <div className="bg-gray-300 rounded-lg">
        <div
          className="h-4 rounded-lg"
          style={{
            width: `${percentage}%`,
            backgroundColor: "green",
          }}
        ></div>
      </div>
      <br />
    </div>
  );
};

export default ProgressBar;
