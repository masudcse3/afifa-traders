/** @format */

import { Drawer, Button, Typography, Box } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PartyIcon from "@mui/icons-material/People";
// import PurchasesIcon from "@mui/icons-material/ShoppingCart";
// import SalesIcon from "@mui/icons-material/AttachMoney";
import NewPurchasesIcon from "@mui/icons-material/AddShoppingCart";
import AllPurchasesIcon from "@mui/icons-material/ShoppingBasket";
import NewSalesIcon from "@mui/icons-material/PostAdd";
import AllSalesIcon from "@mui/icons-material/Assessment";
import ExpensesIcon from "@mui/icons-material/AccountBalance";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "self-start",
            alignItems: "start",
          }}
        >
          <Button
            startIcon={<DashboardIcon />}
            component={RouterLink}
            to="/"
            onClick={onClose}
            variant="string"
            sx={{
              fontSize: "15px",
            }}
            size="small"
          >
            ড্যাশবোর্ড
          </Button>
          <Button
            startIcon={<ExpensesIcon />}
            component={RouterLink}
            to="/expenses"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "15px" }}
            size="small"
          >
            খরচ
          </Button>
          <Button
            startIcon={<PartyIcon />}
            component={RouterLink}
            to="/parties"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "15px" }}
            size="small"
          >
            পার্টি
          </Button>

          {/* Submenu for purchases*/}
          <Button
            startIcon={<NewPurchasesIcon />}
            component={RouterLink}
            to="/purchases"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "15px" }}
            size="small"
          >
            নতুন ক্রয়
          </Button>
          <Button
            startIcon={<AllPurchasesIcon />}
            component={RouterLink}
            to="/all-purchases"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "15px" }}
            size="small"
          >
            সকল ক্রয়
          </Button>

          {/* Submenu for sales*/}
          <Button
            startIcon={<NewSalesIcon />}
            component={RouterLink}
            to="/sales"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "15px" }}
            size="small"
          >
            নতুন বিক্রয়
          </Button>
          <Button
            startIcon={<AllSalesIcon />}
            component={RouterLink}
            to="/all-sales"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "15px" }}
            size="small"
          >
            সকল বিক্রয়
          </Button>

          {/* Submenu for sales*/}
          <Button
            startIcon={<CategoryOutlinedIcon />}
            component={RouterLink}
            to="/products"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "15px" }}
            size="small"
          >
            পণ্য
          </Button>
          <Button
            startIcon={<Inventory2OutlinedIcon />}
            component={RouterLink}
            to="/stocks"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "15px" }}
            size="small"
          >
            স্টক
          </Button>
          <Button
            startIcon={<HandshakeOutlinedIcon />}
            component={RouterLink}
            to="/shares"
            onClick={onClose}
            variant="string"
            sx={{ fontSize: "15px" }}
            size="small"
          >
            শেয়ার হোল্ডার্স
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default MainMenu;
