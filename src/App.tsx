import {
  Box,
  Chip,
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
    weekday: "short",
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

      <Box sx={{ display: "flex", gap: 1 }}>
        <Chip
          label={
            <Typography
              sx={{
                fontSize: "1em",
                fontWeight: "bold",
                color: filters.all ? "#828282" : "#545353",
              }}
            >
              Todas
            </Typography>
          }
          sx={{ backgroundColor: filters.all ? "#212121" : "#CFCFCF" }}
          icon={<List />}
          onClick={filterAll}
          variant="filled"
        />

        <Chip
          label={
            <Typography
              sx={{
                fontSize: "1em",
                fontWeight: "bold",
                color: filters.nonConcluded ? "#828282" : "#545353",
              }}
            >
              Não concluidas
            </Typography>
          }
          sx={{ backgroundColor: filters.nonConcluded ? "#212121" : "#CFCFCF" }}
          icon={<Block />}
          onClick={filterNonConcluded}
          variant="filled"
        />

        <Chip
          label={
            <Typography
              sx={{
                fontSize: "1em",
                fontWeight: "bold",
                color: filters.concluded ? "#828282" : "#545353",
              }}
            >
              Concluídas
            </Typography>
          }
          sx={{ backgroundColor: filters.concluded ? "#212121" : "#CFCFCF" }}
          icon={<Done />}
          onClick={filterConcluded}
          variant="filled"
        />
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
