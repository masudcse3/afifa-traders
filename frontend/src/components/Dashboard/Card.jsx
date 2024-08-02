/** @format */

import { Box, Typography, IconButton } from "@mui/material";

const Card = ({ title, content, bg, icon }) => {
  return (
    <Box
      sx={{
        backgroundColor: bg,
        borderRadius: "8px",
        padding: "20px",
        minWidth: "300px",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="500"
        display={"flex"}
        alignItems={"center"}
      >
        <IconButton color="secondary">{icon}</IconButton>
        {title}
      </Typography>
      <div>{content}</div>
    </Box>
  );
};

export default Card;
