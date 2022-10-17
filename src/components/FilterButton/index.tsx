import { Chip, Typography } from "@mui/material";
import { JSXElementConstructor, ReactElement } from "react";

interface IFilterButtonProps {
  selected: boolean;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  onClick: () => void;
  title: string;
}

const FilterButton = ({
  selected,
  onClick,
  icon,
  title,
}: IFilterButtonProps) => {
  return (
    <Chip
      label={
        <Typography
          sx={{
            fontSize: "1em",
            fontWeight: "bold",
            color: selected ? "#828282" : "#545353",
          }}
        >
          {title}
        </Typography>
      }
      sx={{ backgroundColor: selected ? "#212121" : "#CFCFCF" }}
      icon={icon}
      onClick={onClick}
      variant="filled"
    />
  );
};

export default FilterButton;
