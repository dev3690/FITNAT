import { useState } from 'react';

import {
  Button,
  TableRow,
  TableCell,
} from '@mui/material';


export default function PatientTableRow({
  row,
  handleEdit,
  handleDelete,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.mobile}</TableCell>
        <TableCell>{row.city}</TableCell>
        <TableCell>{row.pain}</TableCell>
        <TableCell><a href={row.url} target="_blank" rel="noopener noreferrer">{row.url}</a></TableCell>
        <TableCell>{new Date(row.start_date).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(row.end_date).toLocaleDateString()}</TableCell>
        <TableCell>{row.package}</TableCell>
        <TableCell>{row.created_by==1 ? "Dr.Dhairya" : "DR. ?"}</TableCell>
        <TableCell>{row.type_id==1 ? "Dr.Dhairya" : "DR. ?"}</TableCell>
        <TableCell align="right">
            <Button variant='contained' size='small' onClick={handleEdit} color='primary' sx={{marginRight:1}}>Edit</Button>
             <Button variant='contained' size='small' color='error' onClick={()=>handleDelete(row.id)}>Delete</Button>
        </TableCell>
      
      </TableRow>
  );
}

