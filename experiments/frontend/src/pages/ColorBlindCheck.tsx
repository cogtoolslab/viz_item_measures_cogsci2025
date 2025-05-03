import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./task.css";

interface IColorBlindTask {
  question: string;
  task_id: string;
  image_link: string;
  text_input_type: "multiple_choice_question" | "numerical_choice";
}

const tasks: IColorBlindTask[] = [
  {
    question: "Please tell us what you see in the image.",
    text_input_type: "numerical_choice",
    task_id: "1",
    image_link: "cb_images/a.webp",
  },
  {
    question: "Please tell us what you see in the image.",
    text_input_type: "numerical_choice",
    task_id: "2",
    image_link: "cb_images/b.webp",
  },
  {
    question: "Please tell us what you see in the image.",
    text_input_type: "numerical_choice",
    task_id: "3",
    image_link: "cb_images/c.webp",
  },
];

const QUESTION_LENGTH = tasks.length

const ColorBlindCheck: React.FC<{
  addResponse: (object: Object) => void;
}> = ({ addResponse }) => {
  const [currentProgress, setCurrentProgress] = useState(
    (1 * 100) / QUESTION_LENGTH
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [visualizationTask, setVisualizationTask] = useState<IColorBlindTask>();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<number | string | null>(null);
  const [timeState, setTimeState] = useState<{
    timestamp_start: number;
    local_time_start: string;
  }>();

  useEffect(() => {
    const timeState = {
      timestamp_start: new Date().getTime(),
      local_time_start: new Date().toLocaleTimeString("en-US"),
    };
    setTimeState(timeState);
  }, [currentTaskIndex]);

  useEffect(() => {
    console.log(visualizationTask, tasks, tasks[0], "TASKS");
    if (tasks.length > 0) {
      setVisualizationTask(tasks[0]);
    }
  }, [tasks]);

  const onSubmitClick = async () => {
    if (answer === null) {
      alert("Please enter an answer before submitting.");
      return;
    }

    const uploadTaskAudio = async () => {
      if (!timeState) {
        return;
      }
      console.log("uploading");
      const order_id = `order${currentTaskIndex + 1}`;

      const timestamp_end = new Date().getTime();
      addResponse({
        [order_id]: {
          ...visualizationTask,
          order_id,
          answer,
          time_elapsed: timestamp_end - timeState.timestamp_start,
          ...timeState,
          local_time_end: new Date().toLocaleTimeString("en-US"),
          timestamp_end: new Date().getTime(),
        },
      });

      setAnswer(null);

      if (currentTaskIndex < QUESTION_LENGTH - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setCurrentProgress(currentProgress + (1 * 100) / QUESTION_LENGTH);
        console.log("AAA");
      } else if (currentTaskIndex == QUESTION_LENGTH - 1) {
        navigate("/task");
      }
    };
    uploadTaskAudio();

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setVisualizationTask(tasks[currentTaskIndex]);
    console.log("Starting record");
  }, [currentTaskIndex]);

  if (!visualizationTask) {
    return <div>Loading...</div>;
  }

  return (
    <div
      key={currentTaskIndex}
      id="overall"
      className="px-20 py-10 flex flex-col space-y-2"
    >
      <h1 className="text-4xl font-bold">What does this image say?</h1>
      <p className="mt-4">
        Take a look at the image below and try to answer the question as accurately as you can.
      </p>

      <div className="mt-8 pt-2">
        <div>
          Current progress: {currentTaskIndex + 1} / {tasks.length}{" "}
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
        style={{ width: "800px" }}
        className="flex flex-col border mx-auto p-6 bg-white rounded-lg shadow-lg mt-6"
      >
        <img
          key={visualizationTask.image_link}
          className="mx-auto"
          style={{ width: "600px" }}
          src={visualizationTask.image_link}
          alt={visualizationTask.image_link}
        />
        <div className="font-bold">Question: </div>
        <div>{visualizationTask.question}</div>
        <div className="font-bold">Answer: </div>
        {visualizationTask.text_input_type === "numerical_choice" && (
          <>
            <div className="mb-4">
              Please tell us what you see in the image.
            </div>
            <div>
              <input
                onWheel={(e) => e.currentTarget.blur()}
                onChange={(e) => setAnswer(parseFloat(e.target.value))}
                className="border border-black px-2 rounded-sm"
                type="number"
              />{" "}
            </div>
          </>
        )}

        {
          <button
            onClick={onSubmitClick}
            className={
              "bg-gray-300 hover:bg-gray-400 cursor-pointer px-4 py-2 mt-4 rounded-sm"
            }
          >
            Submit Answer
          </button>
        }
      </div>
    </div>
  );
};

export default ColorBlindCheck;
