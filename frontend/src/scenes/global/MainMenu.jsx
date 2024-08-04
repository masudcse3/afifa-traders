/** @format */

import { Drawer, Button, Typography, Box } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link as RouterLink } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const MainMenu = ({ open, onClose }) => {
  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          width: 200,
          "& .MuiDrawer-paper": { width: 200 },
        }}
      >
        <Typography variant="h5" p="10px" align="center">
          AFIFA TRADERS
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Button
            startIcon={<GridViewOutlinedIcon />}
            component={RouterLink}
            to="/"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "16px" }}
          >
            ড্যাশবোর্ড
          </Button>
          <Button
            startIcon={<MonetizationOnOutlinedIcon />}
            component={RouterLink}
            to="/expenses"
            variant="string"
            sx={{ fontSize: "16px" }}
          >
            খরচ
          </Button>
          <Button
            startIcon={<GridViewOutlinedIcon />}
            component={RouterLink}
            to="/"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "16px" }}
          >
            পার্টি
          </Button>
          <Button
            startIcon={<GridViewOutlinedIcon />}
            component={RouterLink}
            to="/"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "16px" }}
          >
            ড্যাশবোর্ড
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default MainMenu;
