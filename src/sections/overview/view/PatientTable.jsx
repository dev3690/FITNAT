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
            <TableCell>Name</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients?.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.mobile}</TableCell>
              <TableCell>{patient.city}</TableCell>
              <TableCell>{patient.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
