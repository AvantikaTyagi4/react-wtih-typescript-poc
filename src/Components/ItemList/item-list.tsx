import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Container, Stack, Typography } from "@mui/material";

interface Column {
  id: "id" | "name" | "type" | "size" | "location";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "type",
    label: "Type",
    minWidth: 170,
  },
  {
    id: "size",
    label: "Size",
    minWidth: 170,
  },
  {
    id: "location",
    label: "Location",
    minWidth: 170,
  },
];

function createData(
  id: number,
  name: string,
  type: string,
  location: string,
  size: string
) {
  return { id, name, type, location, size };
}

const rows = [
  createData(1, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(2, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(3, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(4, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(5, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(6, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(7, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(8, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(9, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(10, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(11, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(12, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(13, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(14, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(15, "Server", "Electronics", "Basement Room -201", "Large"),
  createData(16, "Server", "Electronics", "Basement Room -201", "Large"),
].sort((a, b) => (a.id < b.id ? -1 : 1));

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Stack direction="row" sx={{borderBottom:'1px solid rgba(224, 224, 224, 1)'}}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ margin: "20px 20px" }}
          >
            Items
          </Typography>
          {/* <a href='/tabular' style={{textDecoration:'none'}}> <Button variant="contained"  style={{margin:'20px'}}>Table View</Button></a> */}
          <a href="/addBook" style={{ textDecoration: "none" }}>
            <Button variant="contained" style={{ margin: "20px" }}>
              Add Item
            </Button>
          </a>
        </Stack>
        <TableContainer sx={{ maxHeight: "65vh"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
