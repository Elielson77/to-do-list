import { Modal, Box } from "@mui/material";

interface ITaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetails = ({ isOpen, onClose }: ITaskDetailsProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ backgroundColor: "white" }}>Detalhes</Box>
    </Modal>
  );
};

export default TaskDetails;
