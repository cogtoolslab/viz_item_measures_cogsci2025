import React from "react";
import "../pages/keyframes.css";

interface NoAnswerMessageOverlayProps {
  visible: boolean;
  duration: number; // in ms
  message: string;
}

/**
 * Overlay component that appears if the user hasn't selected an answer
 * but tries to submit before the timeout.
 */
const NoAnswerMessageOverlay: React.FC<NoAnswerMessageOverlayProps> = ({
  visible,
  duration,
  message,
}) => {
  if (!visible) return null;

  return (
    <div
      style={{
        animationName: "fadeInOpacityFast",
        animationIterationCount: "1",
        animationTimingFunction: "ease-out",
        animationDuration: `${duration}ms`,
        animationFillMode: "forwards",
      }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    >
      <div className="h-24 w-1/2 mx-auto rounded-lg bg-white text-4xl flex items-center justify-center px-4">
        {message}
      </div>
    </div>
  );
};

export default NoAnswerMessageOverlay;
