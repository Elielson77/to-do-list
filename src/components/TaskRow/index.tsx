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
import { useTask } from "../../context/TaskContext";
import styles from "./TaskRow.module.css";

interface ITaskRowProps {
  name: string;
  description?: string;
  id: string;
  concluded: boolean;
}

const TaskRow = ({ name, description, id, concluded }: ITaskRowProps) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { concludedTask, noConcludedTask, removeTask } = useTask();

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#CFCFCF",
        width: smUp ? "30%" : "80%",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 10px",
        borderBottom: "2px solid rgb(0, 0, 0, 0.54)",
      }}
      className={concluded ? styles.concluded : ""}
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
          <Typography
            className={concluded ? styles.title_concluded : styles.title}
          >
            {name[0].toUpperCase() + name.slice(1)}
          </Typography>
        </Tooltip>
      </Box>
      <IconButton onClick={() => removeTask(id)}>
        <Delete color="error" />
      </IconButton>
    </Box>
  );
};

export default TaskRow;
