
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link as RouterLink, useNavigate } from 'react-router-dom';
// import './Dashboard.css';
import {
  Typography, Box,Container,TextField, Stack, Table, TableBody, Button, Grid, Card, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, FormControlLabel, FormGroup, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, TablePagination,
} from '@mui/material';

// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

import { posts } from 'src/_mock/blog';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';
// import formatDistanceStrictWithOptions from 'date-fns/esm/fp/formatDistanceStrictWithOptions/index.js';

// ----------------------------------------------------------------------




const packageDetails = {
  Gold: 4,
  Premium: 8,
  Deluxe: 12,
};

 const users = [
  {
    id: 1,
    details: [
      { label: 'Name', value: 'John Doe' },
      { label: 'Package', value: 'Premium' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-01-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 2,
    details: [
      { label: 'Name', value: 'Jane Smith' },
      { label: 'Package', value: 'Premium' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-02-01' },
      { label: 'End Date', value: '2023-11-30' }
    ]
  },
  // Adding 10 more users
  {
    id: 3,
    details: [
      { label: 'Name', value: 'Michael Brown' },
      { label: 'Package', value: 'Deluxe' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-03-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 4,
    details: [
      { label: 'Name', value: 'Emily Davis' },
      { label: 'Package', value: 'Premium' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-04-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 5,
    details: [
      { label: 'Name', value: 'David Wilson' },
      { label: 'Package', value: 'Gold' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-05-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 6,
    details: [
      { label: 'Name', value: 'Olivia Martinez' },
      { label: 'Package', value: 'Gold' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-06-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 7,
    details: [
      { label: 'Name', value: 'James Johnson' },
      { label: 'Package', value: 'Deluxe' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-07-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 8,
    details: [
      { label: 'Name', value: 'Sophia Lee' },
      { label: 'Package', value: 'Gold' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-08-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 9,
    details: [
      { label: 'Name', value: 'Robert White' },
      { label: 'Package', value: 'Premium' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-09-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 10,
    details: [
      { label: 'Name', value: 'Emma Garcia' },
      { label: 'Package', value: 'Premium' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-10-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 11,
    details: [
      { label: 'Name', value: 'Daniel Harris' },
      { label: 'Package', value: 'Deluxe' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-11-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  },
  {
    id: 12,
    details: [
      { label: 'Name', value: 'Isabella Clark' },
      { label: 'Package', value: 'Premium' },
      { label: 'Link', value: 'http://example.com/exercise1' },
      { label: 'Start Date', value: '2023-12-01' },
      { label: 'End Date', value: '2023-12-31' }
    ]
  }
];


export default function BlogView() {

  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    Name: true,
    'Start Date': true,
    'End Date': true,
    Package: true,
    ' Link': true,
    // Initialize all weeks to be visible by default
    ...Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).reduce((acc, week) => ({ ...acc, [week]: true }), {})
  });

  const [updateClicked, setUpdateClicked] = useState({});
  const [tasksClicked, setTasksClicked] = useState({});
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [addPatientDialogOpen, setAddPatientDialogOpen] = useState(false);
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const handleUpdate = (userId, week) => {
    setUpdateClicked((prev) => ({
      ...prev,
      [`${userId}-${week}`]: !prev[`${userId}-${week}`]
    }));
  };

  const handleTasks = (userId, week) => {
    setTasksClicked((prev) => ({
      ...prev,
      [`${userId}-${week}`]: !prev[`${userId}-${week}`]
    }));
  };


 const handleAddPatientOpen = () => {
    setAddPatientDialogOpen(true);
  };

  const handleAddPatientClose = () => {
    setAddPatientDialogOpen(false);
  };


  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const generateWeeks = (packageType) => {
    const numberOfWeeks = packageDetails[packageType];
    return Array.from({ length: numberOfWeeks }, (_, i) => `Week ${i + 1}`);
  };

  const handleFilterOpen = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterClose = () => {
    setFilterDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

// export default function BlogView() {
  return (
    <Container>
      
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          style={{ width: '16%', display: 'flex', justifyContent: 'space-between', alignItems: 'right' }}
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddPatientOpen}
        >
          Add Patient
        </Button>
      </Stack>

    {/* <Grid>
      Hello

    </Grid> */}
    <Box display="flex">
      {/* <Box className={`menu-bar ${drawerOpen ? 'open' : 'closed'}`}>   */}
      {/* <Box className={`menu-bar ${drawerOpen ? 'open' : 'closed'}`} display="flex" flexDirection="row" justifyContent="center" alignItems="center"> */}
        {/* <List>
          <Typography variant="h4" component="h4" alignText='center' gutterBottom>
            FITNAT
          </Typography>
          <ListItem button component={RouterLink} to="/page1">
            <ListItemText primary="Add Patient" />
          </ListItem>
          <ListItem button component={RouterLink} to="/page2">
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={RouterLink} to="/page3">
            <ListItemText primary="Logout" />
          </ListItem>
        </List> */}
      {/* </Box> */}
      <Box style={{ flex: 1, transition: 'margin-left 0.3s ease', marginLeft: drawerOpen ? '250px' : '0', display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
        <Box my={1} style={{ width: '95%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* <Typography variant="h4" component="h4" gutterBottom>
            Dashboard
          </Typography> */}

          <Button variant="outlined" 
          // startIcon={<FilterListIcon />} 
          onClick={handleFilterOpen}>
            Collapse Columns
          </Button>
        </Box>

        <Dialog
          open={filterDialogOpen}
          onClose={handleFilterClose}
          maxWidth="xs"
          position="fixed"
          right={0}
          top={50}
          style={{ width: '300px', zIndex: 1 }}
        >
          <DialogTitle>Collapse Columns</DialogTitle>
          <DialogContent>
            <FormGroup>
              {users[0].details.map((detail) => (
                <FormControlLabel
                  key={detail.label}
                  control={
                    <Checkbox
                      checked={columnVisibility[detail.label]}
                      onChange={() => toggleColumnVisibility(detail.label)}
                      color="primary"
                    />
                  }
                  label={detail.label}
                />
              ))}
              {Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map((week) => (
                <FormControlLabel
                  key={week}
                  control={
                    <Checkbox
                      checked={columnVisibility[week]}
                      onChange={() => toggleColumnVisibility(week)}
                      color="primary"
                    />
                  }
                  label={week}
                />
              ))}
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFilterClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Grid xs={12} md={2} margin={5}>
          <Card elevation={10} backgroundColor="#000000" sx={{ padding: 3, backgroundColor: "#BFF6C3" }}>
            <TableContainer component={Paper} style={{ width: 'auto', marginInline: 'auto', overflowX: 'auto' }}>
              <Table size="small" aria-label="user details table">
                <TableHead>
                  <TableRow>
                    {users[0].details.map((detail) => (
                      columnVisibility[detail.label] && (
                        <TableCell key={detail.label} style={{ padding: '8px', fontSize: '0.975rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', position: 'sticky', top: 0, backgroundColor: '#ACE1AF' }}>
                          {detail.label}
                        </TableCell>
                      )
                    ))}
                    {Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map((week) => (
                      columnVisibility[week] && (
                        <TableCell key={week} colSpan={2} style={{ padding: '8px', fontSize: '0.975rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', position: 'sticky', top: 0, backgroundColor: '#ACE1AF' }}>
                          {week}
                        </TableCell>
                      )
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                    <TableRow key={user.id} style={{ backgroundColor: (page * rowsPerPage + index) % 2 === 0 ? '#8DECB4' : '#ffffff' }}>
                      {user.details.map((detail) => (
                        columnVisibility[detail.label] && (
                          <TableCell key={detail.label} style={{ padding: '8px', fontSize: '0.875rem', whiteSpace: 'nowrap', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {detail.label === 'Link' ? (
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                // startIcon={<LinkIcon />}
                                href={detail.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ borderRadius: '50%', minWidth: '40px' }} // Adding styles for rounding the button
                              >
                                Link
                                {/* Rendering only the link icon */}
                                {/* <LinkIcon /> */}
                              </Button>
                            ) : (
                              detail.value
                            )}
                          </TableCell>
                        )
                      ))}
                      {Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map((week, i) => (
                        columnVisibility[week] && (
                          <React.Fragment key={`${week}-${user.id}`}>
                            <TableCell style={{ padding: '8px', fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              <Button
                                variant="contained"
                                size="large"
                                color={updateClicked[`${user.id}-${week}`] ? 'success' : 'inherit'}
                                onClick={() => handleUpdate(user.id, week)}
                                style={{ minWidth: '40px', padding: '4px 8px' }}
                                disabled={i >= packageDetails[user.details.find(detail => detail.label === 'Package').value]}
                              >
                                Upd
                              </Button>
                            </TableCell>
                            <TableCell style={{ padding: '8px', fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              <Button
                                variant="contained"
                                size="large"
                                color={tasksClicked[`${user.id}-${week}`] ? 'success' : 'info'}
                                onClick={() => handleTasks(user.id, week)}
                                style={{ minWidth: '40px', padding: '4px 8px' }}
                                disabled={i >= packageDetails[user.details.find(detail => detail.label === 'Package').value]}
                              >
                                Tks
                              </Button>
                            </TableCell>
                          </React.Fragment>
                        )
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 15, 30]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>
        </Grid>
      </Box>
    </Box>


      {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack> */}

      {/* <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid> */}


      <Dialog open={addPatientDialogOpen} onClose={handleAddPatientClose}>
        <DialogTitle>Add Patient</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="start-date"
              label="Start Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              id="end-date"
              label="End Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              id="package"
              label="Package"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="link"
              label="Link"
              type="url"
              fullWidth
              variant="outlined"
            />
            {/* Add more fields as necessary */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPatientClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPatientClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
