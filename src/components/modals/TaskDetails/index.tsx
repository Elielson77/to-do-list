import {
  Modal,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
} from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import { ITask } from "../../../utils/types";

interface ITaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: ITask;
}

const TaskDetails = ({ isOpen, onClose, task }: ITaskDetailsProps) => {
  const { create_date, name, description, hour_create, concluded } = task;
  const dateOld = new Date(create_date.split("/").reverse().join("-"));
  const currenteDate = new Date();

  const backDays = currenteDate.getDate() - dateOld.getDate();

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Modal open={isOpen} onClose={onClose} disableAutoFocus>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#939393",
          width: !smUp ? "100vw" : "calc(600px - 16px)",
          height: !smUp ? "100vh" : "calc(500px - 16px)",
          position: smUp ? "fixed" : "",
          left: smUp ? "calc(50% - 300px)" : "",
          bottom: smUp ? "calc(50% - 250px)" : "",
          borderRadius: smUp ? "12px" : "",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#565656",
              width: "calc(100% - 16px)",
              pb: 2,
              pl: "16px",
              borderRadius: smUp ? "10px 10px 0 0" : "",
            }}
          >
            <Box>
              <Typography sx={{ mt: 2, color: "#CFCFCF" }} variant="h5">
                {name[0].toUpperCase() + name.slice(1)}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ mt: "5px", color: "#CFCFCF" }}
              >{`- ${concluded ? "Concluída" : "Não concluída"}`}</Typography>
            </Box>

            <Box>
              <IconButton
                onClick={onClose}
                sx={{ margin: smUp ? "0 0 0 0 " : "0 0 0 0" }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ p: "16px", width: "100%" }}>
            <Typography>
              {description
                ? description[0].toUpperCase() + description.slice(1)
                : "Não há descrição"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            p: "0 0 12px 16px",
            pb: !smUp ? "calc(100vh - (100vh - 65px))" : "",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "baseline" }}>
            <Typography variant="subtitle2">
              Criada em: {create_date} às {hour_create}h
            </Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
              {`- ${String(backDays).padStart(2, "0")} ${
                backDays > 1 ? "dias" : "dia"
              } atrás `}
            </Typography>
          </Box>
          <IconButton
            sx={{
              margin: "-40px 30px 0 0",
              padding: "15px",
              backgroundColor: "#565656",
              ":hover": {
                backgroundColor: "#3f3f3f",
              },
            }}
          >
            <Edit />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskDetails;
