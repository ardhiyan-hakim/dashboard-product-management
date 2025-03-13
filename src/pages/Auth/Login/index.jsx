import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import styles from "./Login.module.scss";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        formData
      );

      const { accessToken, refreshToken } = response.data;
      if (!accessToken || !refreshToken)
        throw new Error("No tokens received from API");

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container className={styles.container} maxWidth="xs">
      <Box className={styles.formBox}>
        <Typography variant="h5" className={styles.title}>
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            type="username"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className={styles.button}
            sx={{ marginTop: "1rem", paddingY: "0.75rem" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
