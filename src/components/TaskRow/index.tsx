import {
  Box,
  Tooltip,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useTask } from "../../context/TaskContext";
import styles from "./TaskRow.module.css";

interface ITaskRowProps {
  name: string;
  description?: string;
  id: string;
  concluded: boolean;
}

const TaskRow = ({ name, description, id, concluded }: ITaskRowProps) => {
  const { concludedTask, noConcludedTask, removeTask } = useTask();

  return (
    <Box
      className={`${styles.container} ${concluded ? styles.concluded : ""}`}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Marcar como concluída">
          <Checkbox
            color="success"
            checked={concluded}
            onChange={(e) => {
              e.currentTarget.checked ? concludedTask(id) : noConcludedTask(id);
            }}
          />
        </Tooltip>

        <Tooltip title={description} arrow>
          <p className={concluded ? styles.titleConcluded : styles.title}>
            {name[0].toUpperCase() + name.slice(1)}
          </p>
        </Tooltip>
      </Box>
      <IconButton onClick={() => removeTask(id)}>
        <Delete color="error" />
      </IconButton>
    </Box>
  );
};

export default TaskRow;
