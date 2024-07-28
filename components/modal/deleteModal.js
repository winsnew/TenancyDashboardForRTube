import { Box, Typography, Modal,Button } from "@mui/material";

const DeleteModal = ({ open, handleClose, handleDelete,tenantId }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
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
        <Typography
          id="delete-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Confirm Delete
        </Typography>
        <Typography id="delete-modal-description" sx={{ mb: 3 }}>
          Are you sure you want to delete this tenant?
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(tenantId)}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
