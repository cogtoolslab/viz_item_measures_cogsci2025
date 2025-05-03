import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./task.css";
import { IVisualizationTask } from "../hooks/useFetchTasks";
import FullscreenImage from "../components/FullscreenImage";
import "./keyframes.css";
import ConfettiButton from "../components/ConfettiButton";
import "./messagePopup.css";

const tasks: IVisualizationTask[] = [
  {
    question:
      "The grid shows the location of several buildings. Which building is located at B3?",
    units: "",
    instructions: "",
    task_id: "0",
    set_id: "practice",
    image_link:
      "https://data-visualization-benchmark.s3.us-west-2.amazonaws.com/practice/images/practice0.png",
    text_input_type: "multiple_choice_question",
    mc1: "Gym",
    mc2: "Hospital",
    mc3: "Library",
    mc4: "School",
    test_type: "practice",
    correct_answer: "School",
    order_id: "-1",
  },
  {
    question:
      "Aubery made a tower with 5 layers of cubes, as shown. She then removed the top 2 layers of the tower. How many cubes did she remove?",
    units: "",
    instructions: "",
    task_id: "1",
    set_id: "practice",
    image_link:
      "https://data-visualization-benchmark.s3.us-west-2.amazonaws.com/practice/images/practice1.png",
    text_input_type: "multiple_choice_question",
    mc1: "2 cubes",
    mc2: "8 cubes",
    mc3: "12 cubes",
    mc4: "24 cubes",
    test_type: "practice",
    correct_answer: "24 cubes",
    order_id: "-1",
  },
  {
    question: "What number is represented by point X on the number line?",
    units: "",
    instructions: "",
    task_id: "2",
    set_id: "practice",
    image_link:
      "https://data-visualization-benchmark.s3.us-west-2.amazonaws.com/practice/images/practice2.png",
    text_input_type: "multiple_choice_question",
    mc1: "73",
    mc2: "82",
    mc3: "77",
    mc4: "75",
    test_type: "practice",
    correct_answer: "75",
    order_id: "-1",
  },
  {
    question:
      "The first six number of the patterns are shown. The pattern continues by adding the same number each time. What is the next number in the pattern?",
    units: "",
    instructions: "",
    task_id: "3",
    set_id: "practice",
    image_link:
      "https://data-visualization-benchmark.s3.us-west-2.amazonaws.com/practice/images/practice3.png",
    text_input_type: "multiple_choice_question",
    mc1: "24",
    mc2: "23",
    mc3: "26",
    mc4: "21",
    test_type: "practice",
    correct_answer: "23",
    order_id: "-1",
  },
  {
    question: "Determine whether the statement is True or False.",
    units: "",
    instructions: "",
    task_id: "4",
    set_id: "practice",
    image_link:
      "https://data-visualization-benchmark.s3.us-west-2.amazonaws.com/practice/images/practice4.png",
    text_input_type: "multiple_choice_question",
    mc1: "True",
    mc2: "False",
    test_type: "practice",
    correct_answer: "True",
    order_id: "-1",
  },
];

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array; // Return the shuffled array
}

const QUESTION_LENGTH = tasks.length;
const TIME_LIMIT = 60 * 1000;
const WAIT_TIME = 5000;
const IMAGE_BUFFER_DELAY = 500; // give .5s for the image to load
const TRANSITION_DELAY = 1400;
const TIMEOUT_MESSAGE_DELAY = 5000;
const NO_CHOICE_DELAY = 3000;

const PracticeTask: React.FC<{
  addResponse: (object: Object) => void;
  getResponse: () => Object;
  nextUrl: string;
}> = ({ addResponse, getResponse, nextUrl }) => {
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
  }>();
  const [mcArray, setMCArray] = useState(
    Array.from({ length: 10 }, (_, i) => `mc${i + 1}`)
  );
  const [blockTest, setBlockTest] = useState("");
  const [showBlockDivider, setShowBlockDivide] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [lastResponseCorrectness, setLastResponseCorrectness] = useState(false);
  const [blockLength, setBlockLength] = useState(0);
  const [blockItemsCompleted, setBlockItemsCompleted] = useState(0);
  const [showLoopMessage, setShowLoopMessage] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [showNoAnswerMessage, setShowNoAnswerMessage] = useState(false);
  const [optionHistory, setOptionHistory] = useState<
    { option: string; timestamp: number }[]
  >([]);
  const [trialRepeatCount, setTrialRepeatCount] = useState(1);

  useEffect(() => {
    if (tasks[currentTaskIndex]?.correct_answer) {
      setLastResponseCorrectness(
        tasks[currentTaskIndex].correct_answer === answer
      );
    }
  }, [answer]);

  // set block information at the top of the page
  useEffect(() => {
    const mc: IVisualizationTask = tasks[currentTaskIndex];
    const test_items = tasks.filter((t) => t.test_type === mc.test_type);

    setBlockLength(test_items.length);
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
    const timeState = {
      timestamp_start: new Date().getTime(),
      local_time_start: new Date().toLocaleTimeString("en-US"),
    };
    setTimeState(timeState);
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
    if (timeElapsed > TIME_LIMIT && !showTimeoutMessage) {
      setShowTimeoutMessage(true);
    }
  }, [timeElapsed]);

  useEffect(() => {
    if (showTimeoutMessage) {
      onSubmitClick();
      setTimeout(() => {
        setShowTimeoutMessage(false);
      }, TIMEOUT_MESSAGE_DELAY);
    }
  }, [showTimeoutMessage]);

  useEffect(() => {
    console.log(timeState);
  }, [timeState]);

  const onSubmitClick = async () => {
    const timeEndState = {
      timestamp_end: new Date().getTime(),
      local_time_end: new Date().toLocaleTimeString("en-US"),
    };
    const ADDITIONAL_DELAY = showTimeoutMessage ? TIMEOUT_MESSAGE_DELAY : 0;

    if (answer === null && timeElapsed < TIME_LIMIT) {
      setShowNoAnswerMessage(true);
      setTimeout(() => {
        setShowNoAnswerMessage(false);
      }, NO_CHOICE_DELAY);
      return;
    } else {
      setBlockItemsCompleted((i) => i + 1);
    }

    const uploadTask = async () => {
      if (!timeState) {
        return;
      }
      const order_id = `practice${currentTaskIndex + 1}`;

      addResponse({
        [order_id]: {
          ...visualizationTask,
          order_id,
          answer,
          time_elapsed: timeEndState.timestamp_end - timeState.timestamp_start,
          timestamp_start: timeState.timestamp_start,
          local_time_start: timeState.local_time_start,
          ...timeEndState,
          optionHistory,
        },
      });

      setAnswer(null);

      if (currentTaskIndex < QUESTION_LENGTH - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setCurrentProgress(currentProgress + (1 * 100) / QUESTION_LENGTH);
      } else if (currentTaskIndex == QUESTION_LENGTH - 1) {
        const responses: any = getResponse();
        // get practice 5 response
        responses.practice5 = { ...visualizationTask, answer };

        const block_items: boolean[] = Object.keys(responses)
          .map((k) => {
            if (responses[k]?.test_type === "practice") {
              return responses[k].correct_answer === responses[k].answer;
            } else {
              return false;
            }
          })
          .filter((i) => i !== false);

        const num_correct_items = block_items.length;
        if (num_correct_items === tasks.length) {
          navigate(nextUrl);
        } else {
          if (!showLoopMessage) {
            if (trialRepeatCount === 3) {
              navigate("/redirect");
            } else {
              setTrialRepeatCount(t => t+1)
            }
            setShowLoopMessage(true);
          }
        }
      }
    };

    stopTimer();
    setTimeout(async () => {
      await uploadTask();
      setOptionHistory([]);
      setShowItem(false);
      window.scrollTo(0, 0);
    }, TRANSITION_DELAY + ADDITIONAL_DELAY);
  };

  const loopMessageClick = () => {
    setShowLoopMessage(false);
    setCurrentTaskIndex(0);
    setCurrentProgress(0);
    setBlockItemsCompleted(0);
  };

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
        if (option === "NaN" || option === "Skip" || option === undefined) {
          return "";
        }
        return option;
      })
      .filter((r) => r !== "");

    setMCArray(arr);
  }, [visualizationTask]);

  if (!visualizationTask) {
    return <div>Loading...</div>;
  }

  if (showBlockDivider) {
    const onClickBlockContinue: React.MouseEventHandler<HTMLButtonElement> = (
      e
    ) => {
      e.preventDefault();
      setShowBlockDivide(false);
      setTimeState((t) => ({
        ...t,
        timestamp_start: new Date().getTime(),
        local_time_start: new Date().toLocaleTimeString("en-US"),
      }));
    };

    const responses: any = getResponse();
    const mc: IVisualizationTask = responses[`practice${currentTaskIndex}`];

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
              <div className="mx-auto text-4xl text-left space-y-12">
                <div>Let's do a warm up round with 5 questions!</div>
                <div>
                  You can continue after you answer all of the questions
                  correctly.
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClickBlockContinue}
            className="w-full h-16 mb-16 btn bg-[#fa8072] text-white font-bold uppercase tracking-wide rounded-md py-3 px-6 transition-all ease-in-out duration-200 shadow-md hover:bg-[#f97263] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97263] focus-visible:ring-offset-2"
          >
            Let's start
          </button>
        </div>
      );
    }
  }

  return (
    <div
      key={currentTaskIndex}
      id="overall"
      className="px-20 py-10 flex flex-col space-y-2"
    >
      <p className="mt-4">
        Take a look at the picture below and try to answer the question as
        quickly and as accurately as you can.
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
                  if (option && option !== "NaN" && option != "Skip") {
                    return (
                      <div
                        key={option}
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
                      cursor-pointer p-4 h-16 flex items-center min-w-full rounded-lg border-2 border-b-[6px] mb-2 transition-all duration-100  active:border-b-2`}
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

        {/* Actively close this one */}
        {showLoopMessage && (
          <div
            style={{
              animationName: "fadeInOnly",
              animationIterationCount: "1",
              animationTimingFunction: "ease-out",
              animationDuration: `3s`,
              animationFillMode: "forwards",
            }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          >
            <div className="h-72 w-1/2 bg-white rounded-lg p-4">
              <div className="py-4 w-full mx-auto rounded-lg bg-white text-4xl flex items-center text-center justify-center apx-4 my-auto">
                Nice try! Unfortunately, you missed at least one of the warmup
                questions. Feel free to try again. You will be able to continue
                once you have answered all questions correctly!
              </div>
              <button
                onClick={loopMessageClick}
                className="w-full text-center cursor-pointer btn bg-gray-600 text-white font-bold uppercase tracking-wide rounded-md py-3 px-6 transition-all ease-in-out duration-200 shadow-md hover:bg-gray-500 hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97263] focus-visible:ring-offset-2"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeTask;
