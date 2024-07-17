import { Box, Typography, Button, Paper, TextField, Link } from "@mui/material";
import { useState } from "react";
import axios from "../lib/axios";

const MakeTenant = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    domain: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/tenants", formData);
      setMessage("Request Tenant Successfully");
      console.log(response.data);
    } catch (error) {
      setMessage("Failed to create Tenant");
      console.error(error);
    }
  };
  return (
    <Box
      sx={{ mx: "auto", width: 400, justifyItems: "center", paddingTop: "10%" }}
    >
      <Typography sx={{ textAlign: "center" }}>Make Tenant</Typography>
      <Paper>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "grid",
            gap: 2,
            mt: 1,
            p: 3,
            gridTemplateColumns: "repeat(1, 1fr)",
          }}
        >
          <TextField
            label="Username"
            name="name"
            autoFocus
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            type={"email"}
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            name="password"
            type={"password"}
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            label="Domain"
            name="domain"
            type={"text"}
            value={formData.domain}
            onChange={handleInputChange}
          />
          <Box sx={{ display: "flex", gap: 2, flexDirection: "row-reverse" }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
          {message && (
            <Typography sx={{ textAlign: 'center', color: 'green' }}>
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MakeTenant;
