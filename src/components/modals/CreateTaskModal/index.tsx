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
import { nanoid as id } from "nanoid";
import { useTask } from "../../../context/TaskContext";

interface ICreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal = ({ isOpen, onClose }: ICreateTaskModalProps) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>("");
  const { addTask } = useTask();

  const creatTask = () => {
    try {
      const date = new Date();

      const task = {
        name,
        description,
        id: id(),
        concluded: false,
        create_date: date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        hour_create: `${date.getHours()}:${date.getMinutes()}`,
      };
      addTask(task);
      setName("");
      setDescription(undefined);
      onClose();
    } catch {
      console.log("Deu erro");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} disableAutoFocus disableScrollLock>
      <Box
        sx={{
          backgroundColor: "white",
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
          <Typography variant="h6">Criar Tarefa</Typography>
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
            onClick={creatTask}
            sx={{ width: smUp ? "30%" : "100%" }}
          >
            adicionar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
