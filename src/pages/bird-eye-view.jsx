

import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Table,
  Button,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { getData, USER, birdViewApi, callAxiosApi } from 'src/utils/api_utils';
import { useNavigate } from 'react-router-dom';
import { getLocalItem } from 'src/utils/local_operations';

import BirdEyeTableRow from './bird-eye-table-row';
import TableNoData from '../sections/user/table-no-data';
import UserTableHead from '../sections/user/user-table-head';
import TableEmptyRows from '../sections/user/table-empty-rows';
import UserTableToolbar from '../sections/user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../sections/user/utils';
import { calcTimeline } from 'src/utils/date_time';

export default function BirdEyeView() {
  const [users, setUsers] = useState([]);
  const [userMap, setUserMap] = useState(new Map());
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('assign_to');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(true);

  let optionList = [
    { id: 'name', label: 'Name' },
    { id: 'package', label: 'Package' },
    { id: 'link', label: 'Link' },
    { id: 'start_date', label: 'Start Date' },
    { id: 'end_date', label: 'End Date' },
    { id: 'pain', label: 'Pain' },
    { id: 'assign_to', label: 'Assign To' },
    ...Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map((item, index) => ({ id: `${item}-${index}`, label: item })),
  ];

  const [selectedColumns, setSelectedColumns] = useState(optionList.map((item) => item.label));

  const loggedInUser = getLocalItem('data');
  const loggedInUserTypeId = loggedInUser?.type_id;
  console.log("loggedInUser", loggedInUser);


  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await callAxiosApi(birdViewApi);
        const usersResponse = await callAxiosApi(getData, { table: USER });
        const usersData = usersResponse.data.data;
        const isAdmin = loggedInUser?.isMaster; // Assuming 'isMaster' identifies admin users

        console.log("patients data", response);

        const currentDate = new Date();

        //   const data = response?.data
        //   ?.map((item) => ({
        //     ...item?.patient_master,
        //     id: item?.id,
        //     totalWeeks: calcTimeline(item?.patient_master)?.totalWeeks,
        //     currentWeek: item?.currentWeek,
        //     isNotify: item?.isNotify,
        //     status: filterWeekKeys(item),
            // type_id: item?.patient_master?.type_id, 
        //   }))
        //   // console.log("data before",data)
        //   .filter((data) => 
        //     new Date(data.end_date) >= currentDate 
        //   &&
        //   data?.creator.type_id === loggedInUserTypeId ,
        // );


        // const data = response?.data
        //   ?.map((item) => ({
        //     ...item?.patient_master,
        //     id: item?.id,
        //     totalWeeks: calcTimeline(item?.patient_master)?.totalWeeks,
        //     currentWeek: item?.currentWeek,
        //     isNotify: item?.isNotify,
        //     status: filterWeekKeys(item),
        //     assign_to: item?.patient_master?.assign_to, // Assign_to field
        //     type_id: item?.patient_master?.type_id,
        //     creator: item?.creator, // Assuming creator contains the user's details
        //   }))
        //   // Filtering based on admin or non-admin privileges
        //   .filter((data) => {
        //     const isPatientActive = new Date(data.end_date) >= currentDate; // Check if patient is active

        //     // If user is an admin, show all patients, otherwise show only assigned patients
        //     return isPatientActive && (isAdmin || data.assign_to === loggedInUser.id);
        //   });

        const data = response?.data
          ?.map((item) => ({
            ...item?.patient_master,
            id: item?.id,
            totalWeeks: calcTimeline(item?.patient_master)?.totalWeeks,
            currentWeek: item?.currentWeek,
            isNotify: item?.isNotify,
            status: filterWeekKeys(item),
            assign_to: item?.patient_master?.assign_to, // Assigned field
            // type_id: item?.patient_master?.type_id, 
            // creator: item?.creator, 
            isActive: new Date(item?.patient_master?.end_date) >= currentDate, // Add isActive flag
          }))
          // Filtering based on admin or non-admin privileges
          .filter((data) => {
            const isPatientActive = new Date(data.end_date) >= currentDate; // Check if patient is active

            // If user is an admin, show patients with the same type_id
            if (isAdmin) {
              return data?.creator.type_id === loggedInUserTypeId;
            }

            // If not an admin, show only the patients assigned to the user
            return isPatientActive && data.assign_to === loggedInUser.id;
          });


        const userMapping = new Map(usersData.map(user => [user.id, user.name]));
        setUserMap(userMapping);
        setUsers(data);
        console.log("Data is ", data);
        // console.log("data.creator.type_id",data.creator.type_id)
        // console.log("Filtered Data",);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    const filterWeekKeys = (obj) => Object.keys(obj)
      .filter(key => key.startsWith('week'))
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});

    fetchUsers();
  }, [isDataUpdated, loggedInUserTypeId]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const upliftState = () => {
    setIsDataUpdated(!isDataUpdated);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
    filterBy: 'assign_to',
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const toggleFilterButton = () => {
    setShowFilterButton(!showFilterButton);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setOpenDialog(true);
  };

  return (
    <Container sx={{ display: 'flex' }}>
      <Grid xs={12} md={2} margin={5}>
        <div>
          <Button onClick={() => navigate('/patients')} variant='contained' color='primary'>Exit</Button>
        </div>

        <Card sx={{ marginTop: '10px' }}>
          <UserTableToolbar
            numSelected={0}
            filterName={filterName}
            handleSelectedColumns={setSelectedColumns}
            onFilterName={handleFilterByName}
            showFilterButton={showFilterButton}
          />

          <TableContainer sx={{ overflow: 'auto' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                rowCount={users.length}
                headLabel={optionList.filter((item) => selectedColumns.includes(item.label))}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    // In the render section, pass isActive to BirdEyeTableRow
                    <BirdEyeTableRow
                      key={row.id}
                      selectedColumns={selectedColumns}
                      id={row.id}
                      index={index}
                      currentWeek={row?.currentWeek}
                      isNotify={row?.isNotify}
                      totalWeeks={row?.totalWeeks}
                      selected={false}
                      name={row.name}
                      upliftState={upliftState}
                      status={row?.status}
                      pack={row.package}
                      url={row.url}
                      pain={row.pain}
                      start_date={row?.start_date}
                      end_date={row?.end_date}
                      assign_to={userMap.get(row.assign_to)}
                      isActive={row.isActive} // Add this prop
                      handleEdit={() => handleEdit(row)}
                      handleDelete={() => handleDelete(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            page={page}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[15, 25, 50]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>
    </Container>
  );
}
