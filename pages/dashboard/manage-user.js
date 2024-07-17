import {
  Box,
  Button,
  Typography,
  Container,
  useTheme,
  Toolbar,
} from "@mui/material";
import Header from "../../components/header";
import axios from "../../lib/axios";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../styles/theme";
import { useState, useEffect } from "react";

const columns = [
  { field: "id", headerName: "No", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 170 },
  { field: "domain", headerName: "Domain", width: 170 },
  { field: "created_at", headerName: "Created_at", width: 120 },
  {
    field: "action",
    headerName: "Action",
    width: 170,
    renderCell: (params) => (
      <strong>
        <Button
          variant="contained"
          color="grey"
          size="small"
          onClick={() => handleEdit(params.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="grey"
          size="small"
          onClick={() => handleEdit(params.id)}
        >
          Delete
        </Button>
      </strong>
    ),
  },
];

const ManageUser = () => {
  const [rows, setRows] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            // onClick={handleOpen}
          >
            Add Tenants
          </Button>
        </Box>
      </Box>

      <Box flexGrow={1} display="flex" flexDirection="column" overflow="auto">
        <Box flexGrow={1}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            sx={{ backgroundColor: colors.primary[400] }}
            rowsPerPageOptions={[5]}
          />
          {/* <Toolbar>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteSelected}
                disabled={selectedData.length === 0}
              >
                Delete Selected
              </Button>
            </Toolbar> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ManageUser;
