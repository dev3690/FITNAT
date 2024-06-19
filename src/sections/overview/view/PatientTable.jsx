import { Table, Paper, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';

// const patients = [
//   { id: 1, name: 'Alice Johnson', age: 30, condition: 'Condition A' },
//   { id: 2, name: 'Bob Brown', age: 45, condition: 'Condition B' },
//   // Add more patient data as needed
// ];

export function PatientTable({patients}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Mobile</TableCell>
            <TableCell align='center'>City</TableCell>
            <TableCell align='center'>Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients?.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell align='center'>{patient.name}</TableCell>
              <TableCell align='center'>{patient.mobile}</TableCell>
              <TableCell align='center'>{patient.city}</TableCell>
              <TableCell align='center'>{patient.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
