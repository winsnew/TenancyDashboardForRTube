import {
  Container,
  CssBaseline,
  Avatar,
  Button,
  TextField,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "api/login",
        { email, password }
      );
      console.log(response.data);
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar style={{ margin: "1px", backgroundColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          style={{ width: "100%", marginTop: "1px" }}
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            type="email"
            required
            fullWidth
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Password"
            required
            fullWidth
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p>{error}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "3px 0 2px" }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
