import { Close } from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";

interface ITaskRowProps {
  name: string;
  description: string;
}

const TaskRow = ({ name, description }: ITaskRowProps) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#fefefe",
        width: smUp ? "30%" : "80%",
        borderRadius: 20,
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 16px",
      }}
    >
      <Tooltip title={description} arrow>
        <Typography>{name}</Typography>
      </Tooltip>

      <Close />
    </Box>
  );
};

export default TaskRow;
