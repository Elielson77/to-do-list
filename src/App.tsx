import { Box, IconButton, Typography } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { useState, useContext } from "react";
import CreateTaskModal from "./components/modals/CreateTaskModal";
import TaskRow from "./components/TaskRow";
import { TaskContext } from "./context/TaskContext";

function App() {
  const [openModalCreateTask, setOpenModalCreateTask] = useState(false);
  const { tasks } = useContext(TaskContext);

  return (
    <Box>
      <Box>
        <Typography sx={{ color: "white" }}>To Do List</Typography>
      </Box>
      <br />
      <br />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {tasks.map((task) => (
          <TaskRow
            name={task.name}
            description={task.description}
            key={task.id}
          />
        ))}
      </Box>

      <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() => setOpenModalCreateTask(true)}
        >
          <AddCircleRounded sx={{ fontSize: 60 }} color="primary" />
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
