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

  const orderToConcluded = (tasksArr: ITask[]) => {
    return tasksArr.sort((a: ITask, b: ITask) => {
      if (a.concluded >= b.concluded) return 1;
      if (a.concluded <= b.concluded) return -1;
      return 0;
    });
  };

  useLayoutEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTasks(orderToConcluded(JSON.parse(tasks)));
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const { setTasks, tasks } = useContext(TaskContext);

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
    setTasks((prevTasks) => {
      const currentTasks = prevTasks.map((task) => {
        if (id === task.id) {
          task.concluded = true;
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(currentTasks));
      return currentTasks;
    });
  };

  const noConcludedTask = (id: string) => {
    setTasks((prevTasks) => {
      const currentTasks = prevTasks.map((task) => {
        if (id === task.id) {
          task.concluded = false;
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(currentTasks));
      return currentTasks;
    });
  };

  const editTask = ({ id, name, description, concluded }: ITask) => {
    const currentTask = tasks.find((task) => task.id === id);
    if (currentTask) {
      const date = new Date();
      const edit_date = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const edit_hour = `${hour}:${minutes}`;
      setTasks((prevTasks) => {
        const currentTasks = prevTasks.map((task) => {
          if (task.id === id) {
            task.concluded = concluded;
            task.name = name;
            task.description = description;
            task.edit_date = edit_date;
            task.edit_hour = edit_hour;
            return task;
          }
          return task;
        });
        localStorage.setItem("tasks", JSON.stringify(currentTasks));
        return currentTasks;
      });
    }
  };

  return { addTask, removeTask, concludedTask, noConcludedTask, editTask };
};
