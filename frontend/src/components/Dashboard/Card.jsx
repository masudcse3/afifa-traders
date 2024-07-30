/** @format */

import { Box, Typography } from "@mui/material";

const Card = ({ title, content, border }) => {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        border: `1px solid ${border}`,
        padding: "10px",
      }}
    >
      <Typography variant="h5" align="center">
        {title}
      </Typography>
      <div>{content}</div>
    </Box>
  );
};

export default Card;
