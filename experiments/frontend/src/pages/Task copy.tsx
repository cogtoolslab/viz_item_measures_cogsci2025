import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./task.css";
import { IVisualizationTask } from "../hooks/useFetchTasks";
import FullscreenImage from "../components/FullscreenImage";
import "./keyframes.css";
import ConfettiButton from "../components/ConfettiButton";

const QUESTION_LENGTH = 46;
const TIME_LIMIT = 60 * 1000;
const WAIT_TIME = 5000;
const IMAGE_BUFFER_DELAY = 500; // give .5s for the image to load
const TRANSITION_DELAY = 1400;
const TIMEOUT_MESSAGE_DELAY = 5000;
const NO_CHOICE_DELAY = 3000;

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array; // Return the shuffled array
}

const Task: React.FC<{
  tasks: IVisualizationTask[];
  addResponse: (object: Object) => void;
  getResponse: () => Object;
}> = ({ tasks, addResponse, getResponse }) => {
  const [currentProgress, setCurrentProgress] = useState(
    0 //(1 * 100) / QUESTION_LENGTH
  );
  const [timerActive, setTimerActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [visualizationTask, setVisualizationTask] =
    useState<IVisualizationTask>();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<number | string | null>(null);
  const [timeState, setTimeState] = useState<{
    timestamp_start: number;
    local_time_start: string;
  }>({
    timestamp_start: -1,
    local_time_start: "",
  });
  const [mcArray, setMCArray] = useState(
    Array.from({ length: 10 }, (_, i) => `mc${i + 1}`)
  );
  const [blockTest, setBlockTest] = useState("");
  const [showBlockDivider, setShowBlockDivide] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [lastResponseCorrectness, setLastResponseCorrectness] = useState(false);
  const [blockLength, setBlockLength] = useState(0);
  const [blockItemsCompleted, setBlockItemsCompleted] = useState(0);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [showNoAnswerMessage, setShowNoAnswerMessage] = useState(false);
  const [optionHistory, setOptionHistory] = useState<
    { option: string; timestamp: number }[]
  >([]);

  useEffect(() => {
    if (tasks[currentTaskIndex]?.correct_answer) {
      setLastResponseCorrectness(
        tasks[currentTaskIndex].correct_answer === answer
      );
    }
  }, [answer]);

  // set block information at the top of the page
  useEffect(() => {
    const responses: any = getResponse();
    const mc: IVisualizationTask = tasks[currentTaskIndex];
    const test_items = tasks.filter((t) => t.test_type === mc.test_type);

    setBlockLength(test_items.length);

    const block_items: boolean[] = Object.keys(responses)
      .map((k) => {
        if (responses[k]?.test_type) {
          return responses[k]?.test_type;
        }
      })
      .filter((r) => r !== undefined)
      .filter((t) => t === mc?.test_type);

    setBlockItemsCompleted(block_items.length);
  }, [currentTaskIndex, getResponse]);

  useEffect(() => {
    if (timeElapsed >= WAIT_TIME) {
      setShowItem(true);
    }
  }, [timeElapsed]);

  const startTimer = () => {
    setTimeout(() => {
      setTimerActive(true);
    }, IMAGE_BUFFER_DELAY);
  };

  const stopTimer = () => {
    setTimerActive(false);
    setTimeElapsed(0);
  };

  useEffect(() => {
    setTimeState((t) => ({
      ...t,
      timestamp_start: new Date().getTime(),
      local_time_start: new Date().toLocaleTimeString("en-US"),
    }));
    startTimer();
  }, [currentTaskIndex]);

  useEffect(() => {
    if (tasks.length > 0) {
      setVisualizationTask(tasks[0]);
    }
  }, [tasks]);

  useEffect(() => {
    let interval = 0;

    if (timerActive && !showBlockDivider) {
      const startTime = Date.now() - timeElapsed;
      interval = setInterval(() => {
        const time = Date.now() - startTime;
        setTimeElapsed(time);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, timeElapsed, showBlockDivider]);

  useEffect(() => {
    if (timeElapsed > TIME_LIMIT) {
      // alert("Time is up. Let's move on to the next question!");
      setShowTimeoutMessage(true);
    }
  }, [timeElapsed]);

  useEffect(() => {
    if (showTimeoutMessage) {
      onSubmitClick();
      setTimeout(async () => {
        setShowTimeoutMessage(false);
        // setAnswer("<TIMEOUT>");
      }, TIMEOUT_MESSAGE_DELAY);
    }
  }, [showTimeoutMessage]);

  const onSubmitClick = async () => {
    const timeEndState = {
      timestamp_end: new Date().getTime(),
      local_time_end: new Date().toLocaleTimeString("en-US"),
    };
    const ADDITIONAL_DELAY = showTimeoutMessage ? TIMEOUT_MESSAGE_DELAY : 0;

    if (answer === null && timeElapsed < TIME_LIMIT) {
      // alert("Please pick an answer before submitting.");
      setShowNoAnswerMessage(true);
      setTimeout(() => {
        setShowNoAnswerMessage(false);
      }, NO_CHOICE_DELAY);
      return;
    }

    const uploadTask = async () => {
      if (!timeState.timestamp_start) {
        return;
      }
      const order_id = `order${currentTaskIndex + 1}`;
      const orderObject = {
        ...visualizationTask,
        order_id,
        answer,
        time_elapsed: timeEndState.timestamp_end - timeState.timestamp_start,
        timestamp_start: timeState.timestamp_start,
        local_time_start: timeState.local_time_start,
        ...timeEndState,
        optionHistory,
      };
      console.log(orderObject);

      addResponse({
        [order_id]: orderObject,
      });

      setAnswer(null);

      if (currentTaskIndex < QUESTION_LENGTH - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else if (currentTaskIndex == QUESTION_LENGTH - 1) {
        setShowBlockDivide(true);
      }
    };

    stopTimer();
    setTimeout(async () => {
      await uploadTask();
      setShowItem(false);
      setOptionHistory([])
      window.scrollTo(0, 0);
    }, TRANSITION_DELAY + ADDITIONAL_DELAY);
  };

  useEffect(() => {
    setCurrentProgress((blockItemsCompleted * 100) / blockLength);
  }, [blockItemsCompleted, blockLength]);

  useEffect(() => {
    if (!visualizationTask?.test_type) {
      return;
    }
    if (visualizationTask.test_type !== blockTest) {
      setBlockTest(visualizationTask.test_type);
      setShowBlockDivide(true);
    }
  }, [visualizationTask]);

  //set current visualization task
  useEffect(() => {
    setVisualizationTask(tasks[currentTaskIndex]);
  }, [currentTaskIndex]);

  // set the mc options
  useEffect(() => {
    const arr: any = shuffle(Array.from({ length: 10 }, (_, i) => `mc${i + 1}`))
      .map((mc_str) => {
        if (!visualizationTask) {
          return;
        }
        const mc_num = mc_str as "mc1" | "mc2" | "mc3" | "mc4";
        const option = visualizationTask[mc_num];
        if (
          option === "NaN" ||
          option === "Skip" ||
          option === undefined ||
          option === "Don't Know"
        ) {
          return "";
        }
        return option;
      })
      .filter((r) => r !== "");

    // swap mc required to be at the bottom
    function swapLastElement(arr: any[]) {
      const index = arr.indexOf("None of the above.");
      if (index !== -1 && index !== arr.length - 1) {
        [arr[index], arr[arr.length - 1]] = [arr[arr.length - 1], arr[index]];
      }
      return arr;
    }

    const finalMCArray = swapLastElement(arr);
    setMCArray(finalMCArray);
  }, [visualizationTask]);

  if (!visualizationTask) {
    return <div>Loading...</div>;
  }

  if (showBlockDivider) {
    const onClickBlockContinue: React.MouseEventHandler<HTMLButtonElement> = (
      e
    ) => {
      e.preventDefault();
      if (currentTaskIndex == QUESTION_LENGTH - 1) {
        navigate("/survey");
      }
      setShowBlockDivide(false);
      setTimeState((t) => ({
        ...t,
        timestamp_start: new Date().getTime(),
        local_time_start: new Date().toLocaleTimeString("en-US"),
      }));
    };

    const responses: any = getResponse();
    const mc: IVisualizationTask = responses[`order${currentTaskIndex}`];

    if (!mc?.test_type) {
      return (
        <div
          id="task-container"
          className="px-20 py-10 flex flex-col h-screen w-full"
        >
          <div className="h-full flex my-6">
            <div className="w-1/4 justify-center my-auto ml-16">
              <img src={`/images/section-divider-1.svg`} className="" />
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
            onClick={onClickBlockContinue}
            className="w-full h-16 mb-16 btn bg-[#fa8072] text-white font-bold uppercase tracking-wide rounded-md py-3 px-6 transition-all ease-in-out duration-200 shadow-md hover:bg-[#f97263] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97263] focus-visible:ring-offset-2"
          >
            Let's keep going
          </button>
        </div>
      );
    }

    const test_items = tasks.filter((t) => t.test_type === mc.test_type);
    const num_test_items = test_items.length;
    const block_items: boolean[] = Object.keys(responses)
      .map((k) => {
        if (responses[k]?.test_type === mc.test_type) {
          return responses[k].correct_answer === responses[k].answer;
        } else {
          return false;
        }
      })
      .filter((i) => i !== false);
    const tests_completed: boolean[] = Array.from(
      new Set(
        Object.keys(responses).map((k) => {
          return responses[k]?.test_type;
        })
      )
    );
    const block_count = tests_completed.length - 1;
    const num_correct_items = block_items.length;

    return (
      <div
        id="task-container"
        className="px-20 py-10 flex flex-col h-screen w-full"
      >
        <div className="h-full flex my-6">
          <div className="w-1/4 justify-center my-auto ml-16">
            <img
              src={`/images/section-divider-${block_count + 1}.svg`}
              className=""
            />
          </div>
          <div className="justify-center my-auto">
            <div className="mx-auto text-4xl text-center space-y-12">
              <div>
                Great! You've just finished part{" "}
                <span className="text-blue-600">{block_count}</span> out of{" "}
                <span className="text-blue-600">5</span>!{" "}
              </div>
              <div>
                In the previous part you answered{" "}
                <span className="text-green-500">{num_correct_items}</span> out
                of <span className="text-green-500">{num_test_items}</span>{" "}
                correctly!
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onClickBlockContinue}
          className="w-full h-16 mb-16 btn bg-[#fa8072] text-white font-bold uppercase tracking-wide rounded-md py-3 px-6 transition-all ease-in-out duration-200 shadow-md hover:bg-[#f97263] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97263] focus-visible:ring-offset-2"
        >
          Let's keep going
        </button>
      </div>
    );
  }

  return (
    <div
      key={currentTaskIndex}
      id="overall"
      className="px-20 py-10 flex flex-col space-y-2"
    >
      <p className="mt-4">
        Take a look at the graph below and try to answer the question as quickly
        and as accurately as you can.
      </p>
      <div className="mt-6">
        You can take up to {Math.floor(TIME_LIMIT / 1000)} seconds to submit
        your response!{""} Your choices will appear after{" "}
        {Math.floor(WAIT_TIME / 1000)} seconds. <br />
        <div>
          Here's how long it's been so far:{" "}
          <span className="text-blue-400">
            {Math.floor(timeElapsed / 1000)} seconds{""}.
          </span>
        </div>
      </div>

      <div className="mt-8 pt-2">
        <div>
          Current progress: {blockItemsCompleted} / {blockLength}{" "}
        </div>
        <div className="bg-gray-300 rounded-lg">
          <div
            className="bg-green-300 h-4 rounded-lg"
            style={{
              width: `${Math.round(currentProgress)}%`,
              backgroundColor: "green",
            }}
          ></div>
        </div>
        <br />
      </div>
      <div
        style={{ width: "1200px" }}
        className="flex flex-col border mx-auto p-6 bg-white rounded-lg shadow-lg mt-6"
      >
        <div className="">
          <FullscreenImage
            key={visualizationTask.image_link}
            src={visualizationTask.image_link}
            alt={visualizationTask.image_link}
          />
        </div>
        <div className="font-bold">Question: </div>
        <div>{visualizationTask.question}</div>
        {showItem && (
          <>
            <div className="font-bold">Answer: </div>
            <div className="mb-4">Please select one of the choices below.</div>
            <div className="flex flex-col justify-center items-center w-3/4 mx-auto">
              {visualizationTask.text_input_type ===
                "multiple_choice_question" &&
                mcArray.map((option, idx) => {
                  const option_labels = Array.from("ABCDEFGHIJ");
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
                          setOptionHistory((o) => [
                            ...o,
                            { option, timestamp: new Date().getTime() },
                          ]);
                          setAnswer(option);
                        }}
                        className={`
                      ${
                        answer === option
                          ? "bg-[#ddf4ff] border-blue-400"
                          : "border-gray-300 hover:bg-[#ddf4ff] hover:border-[#1cb0f6]"
                      }
                      cursor-pointer p-4 flex items-center min-w-full rounded-lg border-2 border-b-[6px] mb-2 transition-all duration-100  active:border-b-2`}
                      >
                        <p className="flex justify-center items-center w-12 h-12 rounded-lg text-center mr-4">
                          {option_labels[idx]}.
                        </p>
                        <p className="w-full text-center text-gray-700">
                          {option}
                        </p>
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })}
            </div>
            {showItem && (
              <div>
                <ConfettiButton
                  isEmptyAnswer={answer === null && timeElapsed < TIME_LIMIT}
                  isCorrect={lastResponseCorrectness}
                  onClickAction={onSubmitClick}
                />
              </div>
            )}
          </>
        )}
        {showTimeoutMessage && (
          <div
            style={{
              animationName: "fadeInOpacityFast",
              animationIterationCount: "1",
              animationTimingFunction: "ease-out",
              animationDuration: `${TIMEOUT_MESSAGE_DELAY}ms`,
              animationFillMode: "forwards",
            }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          >
            <div className="h-24 w-1/2 mx-auto rounded-lg bg-white text-4xl flex items-center justify-center px-4">
              Time is up. Let's move on to the next question!
            </div>
          </div>
        )}
        {showNoAnswerMessage && (
          <div
            style={{
              animationName: "fadeInOpacityFast",
              animationIterationCount: "1",
              animationTimingFunction: "ease-out",
              animationDuration: `${NO_CHOICE_DELAY}ms`,
              animationFillMode: "forwards",
            }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          >
            <div className="h-24 w-1/2 mx-auto rounded-lg bg-white text-4xl flex items-center justify-center px-4">
              Please select one of the response options.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
