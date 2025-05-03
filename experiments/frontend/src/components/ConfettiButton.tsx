import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./responseModal.css";

const ConfettiButton: React.FC<{
  onClickAction: () => Promise<void>;
  isCorrect: boolean;
  isEmptyAnswer: boolean
}> = ({ onClickAction, isCorrect, isEmptyAnswer }) => {
  const [openMessageModal, setOpenMessageModal] = useState(false);

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!isEmptyAnswer) {
      setOpenMessageModal(true); 
    } else {
      setOpenMessageModal(false); 
    }
    
    confetti.reset();
    if (isCorrect) {
      const rect = e.currentTarget.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      const origin = {
        x: center.x / window.innerWidth,
        y: center.y / window.innerHeight,
      };

  //     // Confetti cannon logic
      const fire = (particleRatio: number, opts: any) => {
        confetti({
          ...opts,
          particleCount: Math.floor(200 * particleRatio),
          scalar: 1.4,
        });
      };

      const additionalVelocity = 20;
      const confettiExplosion = () => {
        fire(0.25, {
          spread: 26,
          startVelocity: 65 + additionalVelocity,
          origin,
        });
        fire(0.2, {
          spread: 60,
          origin,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          origin,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25 + additionalVelocity,
          decay: 0.92,
          origin,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45 + additionalVelocity,
          origin,
        });
      };
      confettiExplosion();
    }
    
    await onClickAction()
  }

  useEffect(() => {
    if (openMessageModal) {
      const timer = setTimeout(() => {
        setOpenMessageModal(false);
        if (isCorrect) {
          confetti.reset();
        }
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [openMessageModal, isCorrect]);

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="w-full mt-6 btn bg-[#fa8072] text-white font-bold uppercase tracking-wide rounded-md py-3 px-6 transition-all ease-in-out duration-200 shadow-md hover:bg-[#f97263] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97263] focus-visible:ring-offset-2"
      >
        Submit Answer
      </button>
      {openMessageModal && (
        <div
          id="response-modal"
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
          <div className="h-24 w-1/2 mx-auto rounded-lg bg-white text-4xl flex items-center justify-center">
            {isCorrect ? (
              <div className="text-center text-green-800 text-4xl">
                🙌 That's correct!
              </div>
            ) : (
              <div className="text-center text-orange-600 text-4xl">
                🤔 Not quite, but nice try!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConfettiButton;
