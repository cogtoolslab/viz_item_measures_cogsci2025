export interface IVisualizationTask {
  question: string;
  units: string;
  instructions: string;
  task_id: string;
  set_id: string;
  image_link: string;
  text_input_type: "multiple_choice_question" | "numerical_cho",
  mc1?: string,
  mc2?: string,
  mc3?: string,
  mc4?: string,
  mc5?: string,
  mc6?: string,
  mc7?: string,
  mc8?: string,
  mc9?: string,
  mc10?: string,
  test_type?: string,
  correct_answer?: string,
  order_id?: string
}

import { useState, useEffect } from "react";

// Custom hook that fetches tasks and returns it
function useFetchTasks(url: string): {
  tasks: IVisualizationTask[] | null;
  loading: boolean;
  error: Error | null;
} {
  const [tasks, setTasks] = useState<IVisualizationTask[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Function to fetchtasks
    const fetchtasks = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsontasks = await response.json();
        const tasks: IVisualizationTask[] = jsontasks.tasks;
        setTasks(tasks);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchtasks();
  }, [url]); // Dependency array, ensures useEffect runs only if url changes

  return { tasks, loading, error };
}

export default useFetchTasks;
