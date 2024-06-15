import { Table, Paper, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';

const patients = [
  { id: 1, name: 'Alice Johnson', age: 30, condition: 'Condition A' },
  { id: 2, name: 'Bob Brown', age: 45, condition: 'Condition B' },
  // Add more patient data as needed
];

export function PatientTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Condition</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.id}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.condition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
