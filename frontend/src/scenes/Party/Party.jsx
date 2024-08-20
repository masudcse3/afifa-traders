/** @format */
import { useState, useEffect } from "react";

import {
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Box,
  useTheme,
  IconButton,
} from "@mui/material";

import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../theme";
import axios from "axios";

import Spinner from "../../components/utils/Spinner";

import ToastMessage from "../../components/utils/Toast";

const Party = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // api url
  const api_url = import.meta.env.VITE_API_URL;
  // initial state
  const initialState = {
    name: "",
    millName: "",
    address: "",
    phone: "",
  };
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [partyId, setPartyId] = useState("");
  const [search, setSearch] = useState("");
  // handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  // handle search change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  // handle toggle form open
  const toggleFormOpen = () => {
    setEditOpen(!editOpen);
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(`${api_url}/parties`, data, { withCredentials: true });
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
      await axios.patch(`${api_url}/parties/${partyId}`, data, {
        withCredentials: true,
      });
      setLoading(false);
      setData(initialState);
      setOpen(true);
      setSubmitted(!submitted);
      setEditOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = async ({ id, name, millName, address, phone }) => {
    setEditOpen(true);
    setPartyId(id);
    setData({ name, millName, address, phone });
    setSubmitted(!submitted);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // handle all the expenses
  const [allParties, setAllParties] = useState([]);
  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get(`${api_url}/parties?s=${search}`, {
          withCredentials: true,
        });

        setAllParties(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchParties();
  }, [submitted, api_url, search]);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Button
          onClick={toggleFormOpen}
          startIcon={editOpen ? <CloseIcon /> : <AddIcon />}
          sx={{ color: colors.grey[100] }}
        >
          {editOpen ? "বন্ধ করুন" : "নতুন পার্টি যোগ"}
        </Button>
        <TextField
          name="search"
          label="পার্টি খুঁজুন"
          variant="outlined"
          margin="normal"
          color="secondary"
          onChange={handleSearchChange}
          value={search}
          size="small"
        />
      </Box>
      {editOpen && (
        <Box sx={{ background: colors.primary[400], padding: "20px" }}>
          <Typography variant="h4" align="center">
            নতুন পার্টি যোগ করুন
          </Typography>
          <form onSubmit={editOpen ? handleEditSubmit : handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  name="name"
                  label="পার্টির নাম"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  color="secondary"
                  onChange={handleChange}
                  value={data.name}
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="millName"
                  label="মিলের নাম"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  color="secondary"
                  onChange={handleChange}
                  value={data.millName}
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="address"
                  label="ঠিকানা"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  color="secondary"
                  onChange={handleChange}
                  value={data.address}
                  size="small"
                  required
                  sx={{ marginTop: "0px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="phone"
                  label="মোবাইল নাম্বার"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  color="secondary"
                  onChange={handleChange}
                  value={data.phone}
                  size="small"
                  required
                  sx={{ marginTop: "0px" }}
                />
              </Grid>

              <Grid item xs={12} align="right">
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  sx={{ height: "40px", color: "white" }}
                >
                  যোগ করুন
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}

      {/* All the expenses with filter */}

      {loading && <Spinner />}
      {allParties.length > 0 &&
        allParties.map((party) => (
          <Box
            key={party._id}
            sx={{
              background: colors.primary[400],
              padding: "10px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
            display="flex"
            alignItems="center"
          >
            <Box
              sx={{
                borderRight: `1px solid ${colors.grey[600]}`,
                width: "20%",
              }}
            >
              <Typography
                sx={{
                  borderBottom: `1px solid ${colors.grey[600]}`,
                  padding: "5px",
                }}
              >
                নামঃ
              </Typography>
              <Typography
                sx={{
                  borderBottom: `1px solid ${colors.grey[600]}`,
                  padding: "5px",
                }}
              >
                মিলঃ
              </Typography>
              <Typography
                sx={{
                  borderBottom: `1px solid ${colors.grey[600]}`,
                  padding: "5px",
                }}
              >
                ঠিকানাঃ
              </Typography>
              <Typography
                sx={{
                  borderBottom: `1px solid ${colors.grey[600]}`,
                  padding: "5px",
                }}
              >
                মোবাইলঃ
              </Typography>
              <Typography
                sx={{
                  padding: "5px",
                }}
              >
                বাকিঃ
              </Typography>
            </Box>
            <Box sx={{ width: "80%" }}>
              <Typography
                sx={{
                  borderBottom: `1px solid ${colors.grey[600]}`,
                  padding: "4.5px 20px",
                }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {party.name}
                <div>
                  <IconButton
                    sx={{
                      padding: "0px",
                      fontSize: "10px",
                      color: colors.blueAccent[500],
                    }}
                    onClick={() =>
                      onEdit({
                        id: party._id,
                        name: party.name,
                        millName: party.millName,
                        address: party.address,
                        phone: party.phone,
                      })
                    }
                  >
                    <AppRegistrationOutlinedIcon />
                  </IconButton>
                </div>
              </Typography>
              <Typography
                sx={{
                  borderBottom: `1px solid ${colors.grey[600]}`,
                  padding: "5px 20px",
                }}
              >
                {party.millName}
              </Typography>
              <Typography
                sx={{
                  borderBottom: `1px solid ${colors.grey[600]}`,
                  padding: "5px 20px",
                }}
              >
                {party.address}
              </Typography>
              <Typography
                sx={{
                  borderBottom: `1px solid ${colors.grey[600]}`,
                  padding: "5px 20px",
                }}
              >
                <Link
                  href={`tel:${party.phone}`}
                  underline="hover"
                  sx={{ color: colors.grey[100] }}
                >
                  {party.phone}
                </Link>
              </Typography>
              <Typography
                sx={{
                  padding: "5px 20px",
                }}
              >
                {party.due.toLocaleString("bn-BD")} টাকা
              </Typography>
            </Box>
          </Box>
        ))}
      <ToastMessage
        message={"পার্টি যোগ সফল হয়েছে।"}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default Party;
