/** @format */

import { useState, useEffect } from "react";
import {
  useTheme,
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import axios from "axios";
import { tokens } from "../../theme";
import Spinner from "../../components/utils/Spinner";
import ToastMessage from "../../components/utils/Toast";
const Purchases = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // auto focus for weight field
  const [focused, setFocused] = useState(false);

  // initail state
  const initialData = {
    name: "",
    address: "",
    phone: "",
    product: "",
    weight: "",
    rate: "",
    total: 0,
  };
  const [data, setData] = useState(initialData);
  const [calculateWeight, setCalculateWeight] = useState([{}]);
  const [weight, setWeight] = useState("");
  const [totalInText, setTotalInText] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // api url
  const api_url = import.meta.env.VITE_API_URL;
  // calculate weight

  const handleCalculateWeight = (e) => {
    const { value } = e.target;
    setWeight(value);
  };
  const handleCalculateWeightSubmit = (e) => {
    e.preventDefault();

    const mon = weight.split(".")[0] || 0;
    const kg = weight.length > 1 ? weight.split(".")[1] : 0;
    const totalWeight = Number(mon) * 40 + Number(kg);
    setCalculateWeight([
      ...calculateWeight,
      {
        no: calculateWeight.length++,
        weight: totalWeight,
        weightInText: `${Number(mon).toLocaleString("bn-BD")} মন ${Number(
          kg
        ).toLocaleString("bn-BD")} কেজি`,
      },
    ]);

    setWeight("");
    setFocused(true);
  };
  useEffect(() => {
    const calculatedWeight = calculateWeight.slice(1);
    const totalWeight = calculatedWeight.reduce(
      (acc, cur) => (acc += Number(cur.weight)),
      0
    );

    data.weight = totalWeight;
    data.total = (data.rate * data.weight) / 40;
    const totalWeightPoint = totalWeight / 40;
    const totalMon = Math.trunc(totalWeightPoint);
    const totalKg = (totalWeightPoint - totalMon) * 40;
    setTotalInText(
      `${Number(totalMon).toLocaleString("bn-BD")} মন ${Number(
        totalKg
      ).toLocaleString("bn-BD")} কেজি`
    );
  }, [weight, calculateWeight]);
  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // perform API call or

      data.rate = Number(data.rate);
      await axios.post(
        `${api_url}/buy`,
        { ...data },
        { withCredentials: true }
      );
      // show the success message
      setOpen(true);
      setData(initialData);
      setCalculateWeight([{}]);
      setWeight("");
      setTotalInText("");
      setLoading(false);
      setFocused(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleDelete = (id) => {
    const result = calculateWeight.filter((item) => item.no !== id);

    setCalculateWeight(result);
  };
  // get all product names
  useEffect(() => {
    const getProductsName = async () => {
      const { data: apiData } = await axios.get(`${api_url}/products`, {
        withCredentials: true,
      });
      setProducts(apiData.map((product) => product.name));
    };
    getProductsName();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: colors.primary["400"],
          padding: "10px",
          borderRadius: "6px",
        }}
      >
        <Typography variant="h4" align="center" mb="12px">
          নতুন ক্রয়
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} sm={6} md={4}>
              <TextField
                label="নাম"
                name="name"
                value={data.name}
                onChange={handleChange}
                type="text"
                variant="outlined"
                color="secondary"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <TextField
                label="ঠিকানা"
                name="address"
                value={data.address}
                onChange={handleChange}
                type="text"
                variant="outlined"
                color="secondary"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="মোবাইল নাম্বার"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                type="number"
                variant="outlined"
                color="secondary"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <TextField
                label="পণ্য নির্বাচন"
                name="product"
                value={data.product}
                onChange={handleChange}
                select
                variant="outlined"
                color="secondary"
                fullWidth
                size="small"
                required
              >
                {products.map((product, index) => (
                  <MenuItem key={index} value={product}>
                    {product}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <TextField
                label="মন প্রতি দাম"
                name="rate"
                value={data.rate}
                onChange={handleChange}
                type="number"
                variant="outlined"
                color="secondary"
                fullWidth
                size="small"
                required
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <TextField
                label="ওজন"
                name="weight"
                value={weight}
                onChange={handleCalculateWeight}
                type="number"
                variant="outlined"
                color="secondary"
                fullWidth
                size="small"
                focused={focused}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={4}>
              <IconButton
                color="white"
                size="small"
                variant="contained"
                onClick={handleCalculateWeightSubmit}
                sx={{
                  backgroundColor: colors.redAccent["500"],
                  borderRadius: "6px",
                  width: "90%",
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={3} sm={3} md={4}>
              <IconButton
                color="white"
                variant="contained"
                size="small"
                type="submit"
                sx={{
                  backgroundColor: colors.blueAccent["500"],
                  borderRadius: "6px",
                  width: "90%",
                }}
              >
                <ArrowUpwardOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Box>
      {loading && <Spinner />}
      {calculateWeight.length > 1 && (
        <Box
          sx={{
            backgroundColor: colors.primary["400"],
            padding: "10px",
            borderRadius: "6px",
            marginTop: "20px",
          }}
        >
          <Box m={"10px 0"}>
            <Typography variant="h4">মোট ওজনঃ {totalInText}</Typography>
            <Typography variant="h4" mt="5px">
              মোট মূল্যঃ {data.total.toLocaleString("bn-BD")} টাকা
            </Typography>
          </Box>
          <Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow size="small">
                    <TableCell sx={{ fontSize: "14px" }}>ক্রমিক নং</TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>ওজন</TableCell>
                    <TableCell align="right" sx={{ fontSize: "14px" }}>
                      মুছুন
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calculateWeight.slice(1).map((data, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: "0 20px", fontSize: "14px" }}>
                        {++index}
                      </TableCell>
                      <TableCell sx={{ padding: "0px", fontSize: "14px" }}>
                        {data.weightInText}
                      </TableCell>
                      <TableCell align="right" sx={{ padding: "0px 10px" }}>
                        <IconButton
                          sx={{ color: colors.redAccent["500"] }}
                          aria-label="delete"
                          onClick={() => handleDelete(data.no)}
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
        </Box>
      )}
      {open && (
        <ToastMessage
          message={"পণ্য ক্রয় সফল হয়েছে। "}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default Purchases;
