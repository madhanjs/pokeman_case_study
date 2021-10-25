import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const ArrowButton = ({ type, disabled, handleClick }) => {
  return (
    <IconButton
      aria-label={type}
      color="primary"
      size="large"
      disabled={disabled}
      onClick={handleClick}
      disableRipple
    >
      {type === "backward" ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );
};
