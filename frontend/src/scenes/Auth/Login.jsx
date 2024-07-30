/** @format */
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // backend api endpoint
  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  // init the state
  const [data, setData] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Check if the cookie is present and redirect if it is
    const token = Cookies.get("jwt");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // handle the onChange event
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // handle the form validation error
    const newErrors = { phone: "", password: "", errorMessage: "" };
    if (!data.phone) {
      newErrors.phone = "Phone is required";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
    }
    if (newErrors.phone || newErrors.password) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    // handle the form submission
    try {
      const { phone, password } = data;

      const apiCall = axios.post(`${api_url}/login`, { phone, password });
      const { data: apiCallData } = await apiCall;
      setErrors(null);
      setSuccessMsg(apiCallData.message);
      setLoading(false);
      // save the cookie and redirect to dashboard
      Cookies.set("jwt", apiCallData.token, {
        expires: 30,
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);

      const err = await error;
      newErrors.errorMessage = err.response.data.message;
      setErrors(newErrors);
      setLoading(false);
      return;
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <Typography
          sx={{ color: "#db4f4a", textAlign: "center", paddingTop: "3px" }}
        >
          {errors?.errorMessage && errors?.errorMessage}
        </Typography>
        <Typography
          sx={{ color: "#07a255", textAlign: "center", paddingTop: "3px" }}
        >
          {successMsg && successMsg}
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            name="phone"
            label="Phone Number"
            variant="outlined"
            margin="normal"
            fullWidth
            value={data.phone}
            onChange={handleChange}
            error={!!errors?.phone}
            helperText={errors?.phone}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={data.password}
            onChange={handleChange}
            error={!!errors?.password}
            helperText={errors?.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
