import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ITask } from "../../../utils/types";

interface IDetailsProps {
  task: ITask;
  isOpen: boolean;
  onClose: () => void;
}

const Details = ({ task, isOpen, onClose }: IDetailsProps) => {
  const {
    create_date,
    hour_create,
    edit_date,
    edit_hour,
    concluded_date,
    concluded_hour,
  } = task;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          padding: "10px 16px",
          backgroundColor: "white",
          position: "fixed",
          left: "40vw",
          bottom: "50%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "baseline",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle2">
            Criada em: {create_date} às {hour_create}h
          </Typography>
          {edit_date && edit_hour && (
            <Typography variant="subtitle2">
              Editada em: {edit_date} às {edit_hour}h
            </Typography>
          )}
          {concluded_date && concluded_hour && (
            <Typography variant="subtitle2">
              Concluída em: {concluded_date} às {concluded_hour}h
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default Details;
