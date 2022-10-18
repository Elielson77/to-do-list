import { Box, Tooltip, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useTask } from "../../context/TaskContext";
import styles from "./TaskRow.module.css";
import { useState } from "react";
import TaskDetails from "../modals/TaskDetails";

interface ITaskRowProps {
  name: string;
  description?: string;
  id: string;
  concluded: boolean;
}

const TaskRow = ({ name, description, id, concluded }: ITaskRowProps) => {
  const { concludedTask, noConcludedTask, removeTask } = useTask();
  const [isOpenModalDetails, setIsOpenModalDetails] = useState(false);

  return (
    <Box className={`${styles.container} ${concluded ? styles.concluded : ""}`}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title={concluded ? "Desmarcar como concluída" : "Marcar como concluída"} arrow>
          <Checkbox
            color="success"
            checked={concluded}
            onChange={(e) => {
              e.currentTarget.checked ? concludedTask(id) : noConcludedTask(id);
            }}
          />
        </Tooltip>

        <Tooltip title={description} arrow>
          <span
            className={concluded ? styles.titleConcluded : styles.title}
            style={{ textDecoration: concluded ? "line-through" : "" }}
            onClick={() => setIsOpenModalDetails(true)}
          >
            {name[0].toUpperCase() + name.slice(1)}
          </span>
        </Tooltip>
      </Box>
      <IconButton onClick={() => removeTask(id)}>
        <Delete color="error" />
      </IconButton>

      <TaskDetails
        isOpen={isOpenModalDetails}
        onClose={() => setIsOpenModalDetails(false)}
      />
    </Box>
  );
};

export default TaskRow;
