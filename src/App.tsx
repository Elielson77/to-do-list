import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AddCircleRounded, Done, Block, List } from "@mui/icons-material";
import { useState, useContext } from "react";
import CreateTaskModal from "./components/modals/CreateTaskModal";
import TaskRow from "./components/TaskRow";
import { TaskContext } from "./context/TaskContext";
import { ITask } from "./utils/types";
import FilterButton from "./components/FilterButton";

const filtersDefault = {
  concluded: false,
  nonConcluded: false,
  all: true,
};

function App() {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [filters, setFilters] = useState(filtersDefault);
  const [openModalCreateTask, setOpenModalCreateTask] = useState(false);
  const { tasks } = useContext(TaskContext);
  const date = new Date();
  const currentDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filterConcluded = () => {
    setFilters({ concluded: true, nonConcluded: false, all: false });
  };

  const filterNonConcluded = () => {
    setFilters({ concluded: false, nonConcluded: true, all: false });
  };

  const filterAll = () => {
    setFilters({ concluded: false, nonConcluded: false, all: true });
  };

  const filterSteps = [
    {
      title: "Todas",
      icon: <List />,
      onClick: filterAll,
      selected: filters.all,
    },
    {
      title: "Não Concluidas",
      icon: <Block />,
      onClick: filterNonConcluded,
      selected: filters.nonConcluded,
    },
    {
      title: "Concluídas",
      icon: <Done />,
      onClick: filterConcluded,
      selected: filters.concluded,
    },
  ];

  const renderTasks = (task: ITask) => {
    if (filters.concluded === task.concluded) {
      return <TaskRow key={task.id} {...task} />;
    } else if (filters.nonConcluded === !task.concluded) {
      return <TaskRow key={task.id} {...task} />;
    } else if (filters.all) {
      return <TaskRow key={task.id} {...task} />;
    }
  };

  return (
    <Box sx={{ padding: "10px 16px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Lista de Tarefas
        </Typography>
        <Typography variant="caption" sx={{ color: "white" }}>
          {currentDate}
        </Typography>
      </Box>
      <br />
      <br />

      <Box
        sx={{ display: "flex", gap: 1, justifyContent: !smUp ? "center" : "" }}
      >
        {filterSteps.map((filter) => (
          <FilterButton {...filter} />
        ))}
      </Box>

      <Box
        sx={{
          pt: 3,
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          width: smUp ? "500px" : "100%",
        }}
      >
        {tasks.map((task) => renderTasks(task))}
      </Box>

      <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() => setOpenModalCreateTask(true)}
        >
          <AddCircleRounded sx={{ fontSize: 60, color: "#828282" }} />
        </IconButton>
      </Box>

      <CreateTaskModal
        isOpen={openModalCreateTask}
        onClose={() => setOpenModalCreateTask(false)}
      />
    </Box>
  );
}

export default App;
