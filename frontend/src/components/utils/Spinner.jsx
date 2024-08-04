/** @format */

import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Spinner;
