import { Box, Tooltip, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useTask } from "../../context/TaskContext";
import styles from "./TaskRow.module.css";
import { useState } from "react";
import TaskDetails from "../modals/TaskDetails";
import { ITask } from "../../utils/types";

const TaskRow = (task: ITask) => {
  const { name, id, concluded } = task;
  const { concludedTask, noConcludedTask, removeTask } = useTask();
  const [isOpenModalDetails, setIsOpenModalDetails] = useState(false);

  return (
    <Box className={`${styles.container} ${concluded ? styles.concluded : ""}`}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip
          title={
            concluded ? "Desmarcar como concluída" : "Marcar como concluída"
          }
          arrow
        >
          <Checkbox
            color="success"
            checked={concluded}
            onChange={(e) => {
              e.currentTarget.checked ? concludedTask(id) : noConcludedTask(id);
            }}
          />
        </Tooltip>
      </Box>
      <Box
        sx={{
          width: "100%",
          py: 1,
          textAlign: "left",
          cursor: "pointer",
        }}
        onClick={() => setIsOpenModalDetails(true)}
      >
        <span
          className={`${styles.title} ${
            concluded ? styles.titleConcluded : ""
          }`}
          style={{ textDecoration: concluded ? "line-through" : "" }}
        >
          {name[0].toUpperCase() + name.slice(1)}
        </span>
      </Box>
      <IconButton onClick={() => removeTask(id)}>
        <Delete color="error" />
      </IconButton>

      <TaskDetails
        task={task}
        isOpen={isOpenModalDetails}
        onClose={() => setIsOpenModalDetails(false)}
      />
    </Box>
  );
};

export default TaskRow;
