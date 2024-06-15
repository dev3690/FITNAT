import { useState } from 'react';

import {
  Card,
  Stack,
  Table,
  Button,
  Dialog,
  TableRow,
  Container,
  TableBody,
  TableCell,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// import TableNoData from '../table-no-data';
import UserTableHead from './user-table-head';
// import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from './user-table-toolbar';
import { applyFilter, getComparator } from './utils';

// Sample user data
const initialUsers = [
  { id: 1, name: 'John Doe', number: '1234567890', role: 'Admin', isVerified: true, status: 'Active' },
  { id: 2, name: 'Jane Smith', number: '0987654321', role: 'User', isVerified: true, status: 'Active' },
  { id: 3, name: 'Alice Johnson', number: '1112223333', role: 'Admin', isVerified: false, status: 'Inactive' },
  { id: 4, name: 'Bob Brown', number: '4445556666', role: 'User', isVerified: true, status: 'Active' },
  { id: 5, name: 'Charlie Green', number: '7778889999', role: 'User', isVerified: false, status: 'Inactive' },
  { id: 6, name: 'David Black', number: '2223334444', role: 'User', isVerified: true, status: 'Active' },
  { id: 7, name: 'Eve White', number: '5556667777', role: 'Admin', isVerified: false, status: 'Inactive' },
  { id: 8, name: 'Frank Blue', number: '8889990000', role: 'User', isVerified: true, status: 'Active' },
  { id: 9, name: 'Grace Pink', number: '0001112222', role: 'User', isVerified: false, status: 'Inactive' },
  { id: 10, name: 'Hank Gray', number: '3334445555', role: 'User', isVerified: true, status: 'Active' },
  { id: 11, name: 'Ivy Orange', number: '6667778888', role: 'Admin', isVerified: false, status: 'Inactive' },
  { id: 12, name: 'Jack Purple', number: '9990001111', role: 'User', isVerified: true, status: 'Active' },
  { id: 13, name: 'Karen Red', number: '1231231234', role: 'User', isVerified: false, status: 'Inactive' },
  { id: 14, name: 'Leo Gold', number: '4564564567', role: 'Admin', isVerified: true, status: 'Active' },
  { id: 15, name: 'Mona Silver', number: '7897897890', role: 'User', isVerified: true, status: 'Active' },
];

// ----------------------------------------------------------------------

export default function Ex1() {
  const [users, setUsers] = useState(initialUsers);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentUser(null);
    setIsEditing(false);
  };

  const handleDialogSave = () => {
    if (isEditing) {
      setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
    } else {
      setUsers([...users, { ...currentUser, id: users.length + 1, isVerified: false, status: 'Inactive' }]);
    }
    handleDialogClose();
  };

  const handleAddNewUser = () => {
    setCurrentUser({ name: '', number: '', role: '' });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Patients</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddNewUser}>
          New User
        </Button>
      </Stack>

       <Card>
       <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'number', label: 'Number' },
                  { id: 'role', label: 'Role' },
                  { id: 'actions', label: 'Actions', align: 'center' },
                ]}
                onRequestSort={handleSort}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.number}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(row)}>
                          <Iconify icon="eva:edit-fill" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row.id)}>
                          <Iconify icon="eva:trash-2-outline" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                /> */}

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={currentUser?.name || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="number"
            label="Number"
            type="text"
            fullWidth
            value={currentUser?.number || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            value={currentUser?.role || ''}
            onChange={handleInputChange}
          />
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave}>{isEditing ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
