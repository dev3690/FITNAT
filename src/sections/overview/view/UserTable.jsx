import { Table, Paper, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';

const users = [
  { id: 1, name: 'John Doe', number: '1234567890', role: 'Admin' },
  { id: 2, name: 'Jane Smith', number: '0987654321', role: 'User' },
  // Add more user data as needed
];

export function UserTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.number}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
