import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useTask } from "../../context/TaskContext";

interface ITaskRowProps {
  name: string;
  description?: string;
  id: string;
}

const TaskRow = ({ name, description, id }: ITaskRowProps) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [taskConcluded, setTaskConcluded] = useState<boolean>(false);
  const { concludedTask, noConcludedTask, removeTask } = useTask();

  useEffect(() => {
    taskConcluded && concludedTask(id);
    !taskConcluded && noConcludedTask(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concludedTask]);

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#fefefe",
        width: smUp ? "30%" : "80%",
        borderRadius: "2px",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 10px",
        borderBottom: "2px solid black",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Marcar como concluída">
          <Checkbox
            value={taskConcluded}
            onChange={(e) => setTaskConcluded(e.currentTarget.checked)}
          />
        </Tooltip>

        <Tooltip title={description} arrow>
          <Typography ml={1} sx={{ textTransform: "" }}>
            {name[0].toUpperCase() + name.slice(1)}
          </Typography>
        </Tooltip>
      </Box>
      <IconButton onClick={() => removeTask(id)} >
        <Delete />
      </IconButton>
    </Box>
  );
};

export default TaskRow;
