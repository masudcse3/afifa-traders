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
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
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
  const [name, setName] = useState("");
  const [bold, setBold] = useState("Month");
  const [editOpen, setEditOpen] = useState(false);
  const [expenseId, setExpenseId] = useState("");
  const today = new Date();
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বার",
  ];
  const thisMonth = months[today.getMonth()];
  const initialDate = [
    dayjs(today).startOf("month"),
    dayjs(today).endOf("month"),
  ];
  const [date, setDate] = useState(initialDate);

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
      setSubmitted(!submitted);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`${api_url}/expenses/${expenseId}`, data, {
        withCredentials: true,
      });
      setLoading(false);
      setData(initialState);
      setOpen(true);
      setEditOpen(false);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };
  // handle the delete event
  const onDelete = async (id) => {
    try {
      const confirmDel = confirm("আপনি নিশ্চিত এই খরচ মুছতে চান?");
      if (confirmDel) {
        setLoading(true);
        await axios.delete(`${api_url}/expenses/${id}`, {
          withCredentials: true,
        });
        setLoading(false);
        setAllExpenses(allExpenses.filter((expense) => expense._id !== id));
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const onEdit = async (id, title, amount, extra) => {
    setEditOpen(true);
    setExpenseId(id);
    setData({ title: title, amount: amount, extra: extra });
    setSubmitted(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
    setBold("");
  };

  // handle all the expenses
  const [allExpenses, setAllExpenses] = useState([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      const from = dayjs(date[0]).format("YYYY-MM-DD");
      const to = dayjs(date[1]).format("YYYY-MM-DD");
      try {
        const response = await axios.get(
          `${api_url}/expenses?from=${from}&to=${to}&madeBy=${name}`,
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
  }, [submitted, date, name, api_url]);

  const handleToday = () => {
    setDate([dayjs(), dayjs().add(1, "day")]);
    setBold("Today");
  };
  const handleMonth = () => {
    setDate(initialDate);
    setBold("Month");
  };
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
      <Box sx={{ background: colors.primary[400], padding: "20px" }}>
        <Typography variant="h4" align="center">
          {editOpen ? "খরচ পরিবর্তন করুন" : "নতুন খরচ যোগ করুন"}
        </Typography>
        <form onSubmit={editOpen ? handleEditSubmit : handleSubmit}>
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
              <Typography>পেয়ারা চাষ</Typography>
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
                sx={{ height: "40px", color: "white" }}
              >
                {editOpen ? "পরিবর্তন করুন" : "যোগ করুন"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* All the expenses with filter */}
      <Grid
        spacing={1}
        container
        alignItems="center"
        sx={{
          marginTop: "10px",
          background: colors.blueAccent[500],
          p: "5px 0",
        }}
      >
        <Grid item xs={1}>
          <TuneIcon onClick={handleFilterToggle} color={colors.grey[400]} />
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            onClick={handleToday}
            sx={{
              fontWeight: bold === "Today" ? "bold" : "normal",
              fontSize: bold === "Today" ? "16px" : "normal",
              cursor: "pointer",
            }}
          >
            আজ
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            onClick={handleMonth}
            sx={{
              fontWeight: bold === "Month" ? "bold" : "normal",
              fontSize: bold === "Month" ? "16px" : "normal",
              cursor: "pointer",
            }}
          >
            {thisMonth}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            onClick={() => setName("Masud Rana")}
            sx={{
              cursor: "pointer",
              fontWeight: name === "Masud Rana" ? "bold" : "normal",
              fontSize: name === "Masud Rana" ? "16px" : "normal",
            }}
          >
            মাসুদ
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              fontWeight: name === "Mufti Solaiman Hosen" ? "bold" : "normal",
              fontSize: name === "Mufti Solaiman Hosen" ? "16px" : "normal",
            }}
            onClick={() => setName("Mufti Solaiman Hosen")}
          >
            সোলাইমান
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            variant="h6"
            onClick={() => setName("")}
            sx={{
              cursor: "pointer",
              fontWeight: name === "" ? "bold" : "normal",
              fontSize: name === "" ? "16px" : "normal",
            }}
          >
            সকল
          </Typography>
        </Grid>
      </Grid>

      {filterOpen && (
        <Box
          sx={{
            background: colors.primary[400],
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12}>
              <BasicDateRangePicker
                color="secondary"
                value={date}
                onChange={(v) => setDate(v)}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {loading && <Spinner />}
      {allExpenses.length > 0 && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h5" align="right" p=" 10px 20px">
            মোট খরচঃ {totalExpenses.toLocaleString("bn-BD")} /=
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
                      {dateFormatter(expenses.createdAt).date} <br />
                      {dateFormatter(expenses.createdAt).time}
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

                    <TableCell align="right" sx={{ padding: "0px" }}>
                      <IconButton
                        aria-label="edit"
                        onClick={() =>
                          onEdit(
                            expenses._id,
                            expenses.title,
                            expenses.amount,
                            expenses.extra
                          )
                        }
                      >
                        <EditNoteOutlinedIcon
                          fontSize="large"
                          sx={{ color: colors.blueAccent[500] }}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => onDelete(expenses._id)}
                      >
                        <DeleteIcon sx={{ color: colors.redAccent[500] }} />
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
        message={"খরচ যোগ সফল হয়েছে।"}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default Expenses;
