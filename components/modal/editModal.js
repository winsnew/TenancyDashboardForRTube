import { Modal, Box, Button, Typography, TextField } from "@mui/material";

const EditModal = ({
  open,
  handleClose,
  formData,
  handleChange,
  handleEdit,
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
          Edit Tenant
        </Typography>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          value={formData.domain}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Status"
          margin="normal"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          onClick={handleEdit}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal
