import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";
import { ITask } from "../utils/types";

interface ITaskContextProps {
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
}

export const TaskContext = createContext({} as ITaskContextProps);
TaskContext.displayName = "Tasks";

export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    if (tasks[0]) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const { setTasks } = useContext(TaskContext);

  const addTask = (task: ITask) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTask = (task: ITask) => {
    const { id } = task;
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const concludedTask = (task: ITask) => {
    const { id } = task;
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (id === task.id) {
          task.concluded = true;
        }
        return task;
      })
    );
  };

  const noConcludedTask = (task: ITask) => {
    const { id } = task;
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (id === task.id) {
          task.concluded = false;
        }
        return task;
      })
    );
  };

  return { addTask, removeTask, concludedTask, noConcludedTask };
};
