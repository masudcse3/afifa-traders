/** @format */
import { useState, useEffect } from "react";

import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { tokens } from "../../theme";
import axios from "axios";
import dayjs from "dayjs";
import Spinner from "../../components/utils/Spinner";
import DeleteIcon from "@mui/icons-material/Delete";
import ToastMessage from "../../components/utils/Toast";
import BasicDateRangePicker from "../../components/utils/DatePicker";
const Expenses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // api url
  const api_url = import.meta.env.VITE_API_URL;
  // initial state
  const initialState = {
    title: "",
    amount: "",
    extra: false,
  };
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const today = new Date();

  const [date, setDate] = useState([
    dayjs(today).startOf("month"),
    dayjs(today).endOf("month"),
  ]);

  // handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setData({ ...data, [name]: checked });
    } else if (type === "number") {
      setData({ ...data, [name]: Number(value) });
    } else {
      setData({ ...data, [name]: value });
    }
  };
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${api_url}/expenses`, data, { withCredentials: true });
      setLoading(false);
      setData(initialState);
      setOpen(true);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  // handle all the expenses
  const [allExpenses, setAllExpenses] = useState([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      const from = dayjs(date[0]).format("YYYY-MM-DD");
      const to = dayjs(date[1]).format("YYYY-MM-DD");
      try {
        const response = await axios.get(
          `${api_url}/expenses?from=${from}&to=${to}`,
          {
            withCredentials: true,
          }
        );

        setAllExpenses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenses();
  }, [submitted, date]);
  const dateFormatter = (updatedAt) => {
    const date = new Date(updatedAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const year = date.getFullYear() % 100;
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;

    return {
      date: `${day}/${month}/${year}`,
      time: `${formattedHours}:${minutes} ${ampm}`,
    };
  };
  const totalExpenses = allExpenses.reduce(
    (total, expenses) => (total += expenses.amount),
    0
  );
  return (
    <>
      {loading && <Spinner />}

      <Box sx={{ background: colors.primary[400], padding: "20px" }}>
        <Typography variant="h4" align="center">
          নতুন খরচ যোগ করুন
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="title"
                label="খরচের খাত"
                variant="outlined"
                margin="normal"
                fullWidth
                color="secondary"
                onChange={handleChange}
                value={data.title}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="amount"
                type="number"
                label="খরচের পরিমাণ"
                variant="outlined"
                margin="normal"
                fullWidth
                color="secondary"
                onChange={handleChange}
                value={data.amount}
                size="small"
                required
              />
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Typography>অতিরিক্ত খরচ?</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.extra}
                    onChange={handleChange}
                    name="extra"
                    color="secondary"
                  />
                }
              />
            </Grid>
            <Grid item xs={4} align="right">
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                fullWidth
                sx={{ height: "40px" }}
              >
                যোগ করুন
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* All the expenses with filter */}
      <Button
        startIcon={<TuneIcon />}
        color="secondary"
        variant="outlined"
        onClick={handleFilterToggle}
        sx={{ marginTop: "10px" }}
      ></Button>
      {filterOpen && (
        <Box
          sx={{
            background: colors.primary[400],
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <BasicDateRangePicker
                color="secondary"
                value={date}
                onChange={(v) => setDate(v)}
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <Button color="secondary">Today</Button>
            </Grid>
            <Grid item xs={3}>
              <Button color="secondary">This Month</Button>
            </Grid>
            <Grid item xs={4}>
              <Button color="secondary">From-To</Button>
            </Grid>
            <Grid item xs={4}>
              <Button color="secondary">From-To</Button>
            </Grid>
          </Grid>
        </Box>
      )}
      {allExpenses.length > 0 && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h5" align="right" p=" 10px 20px">
            মোট খরচঃ {totalExpenses}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: "8px", fontSize: "14px" }}>
                    সময়
                  </TableCell>
                  <TableCell sx={{ padding: "8px 0px", fontSize: "14px" }}>
                    খাত
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "8px 0px",
                      fontSize: "14px",
                      textAlign: "right",
                    }}
                  >
                    পরিমাণ
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ padding: "0px 5px", fontSize: "14px" }}
                  >
                    এডিট
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allExpenses.map((expenses, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ padding: "5px 8px", fontSize: "14px" }}>
                      {dateFormatter(expenses.updatedAt).date} <br />
                      {dateFormatter(expenses.updatedAt).time}
                    </TableCell>
                    <TableCell sx={{ padding: "0px", fontSize: "14px" }}>
                      {expenses.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "0px",
                        fontSize: "14px",
                        textAlign: "right",
                      }}
                    >
                      {expenses.amount.toLocaleString("bn-BD")}
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{ padding: "0px", fontSize: "14px" }}
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => onDelete(product._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <ToastMessage
        message="খরচ যোগ সফল হয়েছে।"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default Expenses;
