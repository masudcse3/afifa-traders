/** @format */

import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
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
import { tokens } from "../../theme";
import axios from "axios";
import Spinner from "../../components/utils/Spinner";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateProduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // api url
  const api_url = import.meta.env.VITE_API_URL;
  // initial state
  const [data, setData] = useState({
    name: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    category: "",
    failed: "",
  });
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const categories = ["ধান", "পাট", "গম", "ভুট্টা", "মসুরি", "কলাই"];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // handle errors

    const newErrors = { name: "", category: "", failed: "" };
    if (!data.name) {
      newErrors.name = "Product name is required";
    }
    if (!data.category) {
      newErrors.category = "Product category is required";
    }
    if (newErrors.name || newErrors.category) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    try {
      // handle the submission

      await axios.post(
        `${api_url}/products`,
        {
          name: data.name,
          category: data.category,
        },
        { withCredentials: true }
      );
      setSuccess("পণ্য যোগ সফল হয়েছে।");
      setData({ name: "", category: "" });
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error("Product adding faild", error);
      newErrors.failed = "পণ্যটি বিদ্যমান। অন্য নাম দিয়ে আবার চেষ্টা করুন।";
      setErrors(newErrors);
      setLoading(false);
      setSubmitted(false);
      setTimeout(() => {
        setErrors({ failed: "" });
      }, 2000);
      return;
    }
  };
  // All products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const api_url = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${api_url}/products`, {
        withCredentials: true,
      });
      setProducts(response.data);
    };
    fetchData();
  }, [submitted]);
  // handle the delete

  const onDelete = async (id) => {
    try {
      await axios.delete(`${api_url}/products/${id}`, {
        withCredentials: true,
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Product deleting faild", error);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <Box sx={{ background: colors.primary[400], padding: "20px" }}>
        <Typography variant="h4" align="center">
          নতুন পণ্য যোগ করুন
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="category"
                select={true}
                label="পণ্যের ধরণঃ"
                variant="outlined"
                margin="normal"
                fullWidth
                color="secondary"
                onChange={handleChange}
                value={data.category}
                error={!!errors?.category}
                helperText={errors?.category}
              >
                {categories.map((cat, index) => (
                  <MenuItem key={index} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="name"
                type="text"
                label="পণ্যের নামঃ"
                variant="outlined"
                margin="normal"
                fullWidth
                color="secondary"
                onChange={handleChange}
                value={data.name}
                error={!!errors?.name}
                helperText={errors?.name}
              />
            </Grid>
            <Grid item sx={2}>
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
          <Typography variant="p" color="green">
            {success && success}
          </Typography>
          <Typography variant="p" color="red">
            {errors.failed && errors.failed}
          </Typography>
        </form>
      </Box>
      {products.length > 0 && (
        <Box sx={{ marginTop: "20px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">
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
    </>
  );
};

export default CreateProduct;
