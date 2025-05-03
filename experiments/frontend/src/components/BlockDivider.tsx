import React from "react";
import { IVisualizationTask } from "../hooks/useFetchTasks";

interface BlockDividerProps {
  currentTaskIndex: number; 
  questionLength: number;
  onClickContinue: () => void;
  tasks: IVisualizationTask[];
  getResponse: () => Record<string, any>;
}

/**
 * This component appears when a "block" of tasks is completed or we're 
 * about to move to the next block (or the next phase).
 */
const BlockDivider: React.FC<BlockDividerProps> = ({
  currentTaskIndex,
  questionLength,
  onClickContinue,
  tasks,
  getResponse
}) => {
  const responses: any = getResponse();
  const mc: IVisualizationTask = tasks[currentTaskIndex];
  const totalBlocks = 5; // you can change this based on your logic

  // If no test_type is found in the response, this indicates
  // user finished warm-up or is at the start of the experiment
  if (!mc?.test_type) {
    return (
      <div
        id="task-container"
        className="px-20 py-10 flex flex-col h-screen w-full"
      >
        <div className="h-full flex my-6">
          <div className="w-1/4 justify-center my-auto ml-16">
            <img src={`/images/section-divider-1.svg`} alt="section divider" />
          </div>
          <div className="justify-center my-auto">
            <div className="mx-auto text-4xl text-center space-y-12">
              <div>Great! You've just finished the warm up round!</div>
              <div>
                In the previous part you answered{" "}
                <span className="text-green-500">5</span> out of{" "}
                <span className="text-green-500">5</span> correctly!
              </div>
              <div>Let's get started!</div>
            </div>
          </div>
        </div>
        <button
          onClick={onClickContinue}
          className="w-full h-16 mb-16 btn bg-[#fa8072] text-white font-bold uppercase tracking-wide rounded-md py-3 px-6 transition-all ease-in-out duration-200 shadow-md hover:bg-[#f97263] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97263] focus-visible:ring-offset-2"
        >
          Let's keep going
        </button>
      </div>
    );
  }

  // Calculate how many items in this test_type block
  const testItems = tasks.filter((t) => t.test_type === mc.test_type);
  const numTestItems = testItems.length;

  // Get number of correct answers in this block
  const blockItems: boolean[] = Object.keys(responses)
    .map((key) => {
      if (responses[key]?.test_type === mc.test_type) {
        return responses[key].correct_answer === responses[key].answer;
      }
      return false;
    })
    .filter(Boolean);
  const numCorrectItems = blockItems.length;

  // figure out how many blocks are completed
  const testsCompleted: (string | undefined)[] = Array.from(
    new Set(
      Object.keys(responses).map((k) => {
        return responses[k]?.test_type;
      })
    )
  ).filter(Boolean);
  const blockCount = testsCompleted.length - 1; 

  return (
    <div
      id="task-container"
      className="px-20 py-10 flex flex-col h-screen w-full"
    >
      <div className="h-full flex my-6">
        <div className="w-1/4 justify-center my-auto ml-16">
          <img
            src={`/images/section-divider-${blockCount + 1}.svg`}
            alt="section divider"
          />
        </div>
        <div className="justify-center my-auto">
          <div className="mx-auto text-4xl text-center space-y-12">
            <div>
              Great! You've just finished part{" "}
              <span className="text-blue-600">{blockCount}</span> out of{" "}
              <span className="text-blue-600">{totalBlocks}</span>!
            </div>
            <div>
              In the previous part you answered{" "}
              <span className="text-green-500">{numCorrectItems}</span> out of{" "}
              <span className="text-green-500">{numTestItems}</span> correctly!
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onClickContinue}
        className="w-full h-16 mb-16 btn bg-[#fa8072] text-white font-bold uppercase tracking-wide rounded-md py-3 px-6 transition-all ease-in-out duration-200 shadow-md hover:bg-[#f97263] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97263] focus-visible:ring-offset-2"
      >
        Let's keep going
      </button>
    </div>
  );
};

export default BlockDivider;
