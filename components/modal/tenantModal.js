import { Box, Typography, TextField, Button, Modal } from "@mui/material";

const AddTenantModal = ({
  open,
  handleClose,
  newData,
  handleChange,
  handleAdd,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add New Tenant
        </Typography>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          value={newData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          value={newData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          margin="normal"
          type={"password"}
          value={newData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Domain"
          margin="normal"
          name="domain"
          value={newData.domain}
          onChange={handleChange}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTenantModal;
