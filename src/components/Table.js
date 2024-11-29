import React, { useState, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const columns = [
  { id: 'device_name', label: 'Device Name', minWidth: 170, align: 'left' },
  { id: 'time_stamp', label: 'Start Time', minWidth: 170, align: 'left' },
  { id: 'resolution_time_stamp', label: 'Resolution Time Stamp', minWidth: 170, align: 'left' },
  { id: 'duration_seconds', label: 'Duration of Alarm', minWidth: 170, align: 'right' },
  { id: 'category', label: 'Category', minWidth: 170, align: 'left' },
  { id: 'code', label: 'Alarm Code', minWidth: 100, align: 'left' },
  { id: 'description', label: 'Description', minWidth: 170, align: 'left' },
  { id: 'fault_type', label: 'Alarm Level', minWidth: 170, align: 'left' },
];
export default function StickyHeadTable({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filtersState, setFiltersState] = useState(
    columns.reduce((acc, column) => {
      acc[column.id] = '';
      return acc;
    }, {})
  );
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => {
      acc[column.id] = true;
      return acc;
    }, {})
  );
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [openDialog, setOpenDialog] = useState(false);

  const requestSort = (columnId) => {
    let direction = 'asc';
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnId, direction });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event, columnId) => {
    setFiltersState({
      ...filtersState,
      [columnId]: event.target.value,
    });
  };

  const handleColumnToggle = (event, columnId) => {
    setVisibleColumns({
      ...visibleColumns,
      [columnId]: event.target.checked,
    });
  };

  const handleOpenColumnDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseColumnDialog = () => {
    setOpenDialog(false);
  };

  const sortedRows = useMemo(() => {
    let sortableRows = [...data];
    if (sortConfig.key) {
      sortableRows.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRows;
  }, [data, sortConfig]);

  const filteredRows = useMemo(() => {
    return sortedRows.filter((row) =>
      columns.every((column) => {
        const filterValue = filtersState[column.id];
        if (
          !filterValue ||
          column.id === 'time_stamp' ||
          column.id === 'resolution_time_stamp' ||
          column.id === 'duration_seconds'
        ) {
          return true; // No filter applied or filter excluded for specific columns
        }
        const cellValue = row[column.id];
        return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
      })
    );
  }, [sortedRows, filtersState]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Button onClick={handleOpenColumnDialog} sx={{ marginBottom: '10px' }}>
        Manage Columns
      </Button>

      <Dialog open={openDialog} onClose={handleCloseColumnDialog}>
        <DialogTitle>Manage Columns</DialogTitle>
        <DialogContent>
          {columns.map((column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={visibleColumns[column.id]}
                  onChange={(event) => handleColumnToggle(event, column.id)}
                />
              }
              label={column.label}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseColumnDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns
                .filter((column) => visibleColumns[column.id])
                .map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    onClick={() => requestSort(column.id)}
                  >
                    <div style={{ cursor: 'pointer' }}>
                      {column.label}
                      {sortConfig.key === column.id && (
                        <span>
                          {sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}
                        </span>
                      )}
                    </div>
                    {/* Exclude filters for specific columns */}
                    {column.id !== 'time_stamp' &&
                      column.id !== 'resolution_time_stamp' &&
                      column.id !== 'duration_seconds' && (
                        <TextField
                          variant="outlined"
                          size="small"
                          placeholder={`Search ${column.label}`}
                          onChange={(event) => handleFilterChange(event, column.id)}
                          value={filtersState[column.id]}
                          sx={{ marginTop: '8px' }}
                        />
                      )}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns
                    .filter((column) => visibleColumns[column.id])
                    .map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
