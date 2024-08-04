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
          Show Detail
        </Button>
        {/* <Button
          variant="contained"
          color="grey"
          size="small"
          onClick={() => handleEdit(params.id)}
        >
          Delete
        </Button> */}
      </strong>
    ),
  },
];

const ManageUser = () => {
  const [rows, setRows] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/tenantUsers");
        const tenantsUser = response.data.map(tenantuser => ({
          id: tenantuser.id,
          name: tenantuser.name,
          email: tenantuser.email,
          domain: tenantuser.domain,
          created_at: new Date(tenantuser.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
        }));
        setRows(tenantsUser);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box m="20px" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
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
        </Box>
      </Box>
    </Box>
  );
};

export default ManageUser;
