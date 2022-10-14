import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  useLayoutEffect,
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

  useLayoutEffect(() => {
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
    setTasks((prevTasks) => {
      localStorage.setItem("tasks", JSON.stringify([...prevTasks, task]));
      return [...prevTasks, task];
    });
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => {
      const currentTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(currentTasks));
      return currentTasks;
    });
  };

  const concludedTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (id === task.id) {
          task.concluded = true;
        }
        return task;
      })
    );
  };

  const noConcludedTask = (id: string) => {
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
