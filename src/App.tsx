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
          label="Concluidas"
          sx={{ backgroundColor: "white" }}
          icon={<Done />}
          onClick={filterConcluded}
        />
        <Chip
          label="Não concluidas"
          sx={{ backgroundColor: "white" }}
          icon={<Block />}
          onClick={filterNonConcluded}
        />
        <Chip
          label="Todas"
          sx={{ backgroundColor: "white" }}
          icon={<List />}
          onClick={filterAll}
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
        {tasks.map((task) => (
          <TaskRow key={task.id} {...task} />
        ))}
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
