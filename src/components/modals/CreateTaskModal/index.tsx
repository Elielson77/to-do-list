import {
  Box,
  Typography,
  Modal,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useTask } from "../../../context/TaskContext";
import { ITask } from "../../../utils/types";

interface ICreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: ITask;
}

const CreateTaskModal = ({ isOpen, onClose, task }: ICreateTaskModalProps) => {
  const isEditing = Boolean(task);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [name, setName] = useState<string>(task ? task.name : "");
  const [description, setDescription] = useState<string | undefined>(
    task ? task.description : ""
  );
  const { addTask, editTask } = useTask();

  const handleTask = () => {
    if (isEditing && task) {
      const { id, concluded, create_date } = task;
      editTask({ id, name, description, concluded, create_date });
      setName("");
      setDescription(undefined);
      onClose();
    } else {
      try {
        const date = new Date();
        const hours = String(date.getHours());
        const minutes = String(date.getMinutes());

        const task = {
          name,
          description,
          id: nanoid(),
          concluded: false,
          create_date: date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
          hour_create: `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`,
        };
        addTask(task);
        setName("");
        setDescription(undefined);
        onClose();
      } catch {
        console.log("Deu erro");
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} disableAutoFocus disableScrollLock>
      <Box
        sx={{
          backgroundColor: "#eaeaea",
          borderRadius: "5px",
          padding: "10px 20px",
          width: smUp ? "500px" : "250px",
          position: "fixed",
          bottom: "50%",
          left: smUp ? "calc(50% - 280px)" : "calc(50% - 145px)",
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">
            {isEditing ? "Editar" : "Criar"} Tarefa
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 1,
            gap: 2,
          }}
        >
          <TextField
            variant="standard"
            inputProps={{ autoFocus: true }}
            fullWidth
            placeholder="Nome da tarefa"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            sx={{ fontSize: "14px" }}
            autoFocus
          />

          <TextField
            variant="standard"
            fullWidth
            type="text"
            placeholder="Descrição tarefa"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value || undefined)}
            sx={{ fontSize: "14px" }}
          />

          <Button
            variant="contained"
            onClick={handleTask}
            sx={{ width: smUp ? "30%" : "100%" }}
          >
            {isEditing ? "editar" : "adicionar"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
