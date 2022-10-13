import {
  Box,
  Typography,
  Modal,
  useTheme,
  useMediaQuery,
  Input,
  Button,
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
  const [description, setDescription] = useState<string>("");
  const { addTask } = useTask();

  const creatTask = () => {
    try {
      const task = {
        name,
        description,
        id: id(),
        concluded: false,
      };
      addTask(task);
      setName("");
      setDescription("");
      onClose();
    } catch {
      console.log("Deu erro");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
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
          <Input
            fullWidth
            type="text"
            placeholder="Nome da tarefa"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            sx={{ fontSize: "14px" }}
          />

          <Input
            fullWidth
            type="text"
            placeholder="Descrição tarefa"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
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
