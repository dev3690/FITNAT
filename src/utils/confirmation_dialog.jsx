import React from 'react'
import {
    Card,
    Stack,
    Table,
    Button,
    Dialog,
    Container,
    TableBody,
    TextField,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableContainer,
    TablePagination,
    CircularProgress,
    Box
} from '@mui/material';
const ConfirmationDialog = ({ message, handleOpen, handleClose, openDialog, handleSave }) => {

    return (
        <Dialog open={openDialog} onClose={handleClose} fullWidth>
            <DialogTitle>{'Confirm'}</DialogTitle>
            <DialogContent>
                <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>handleSave(false)}>Cancel</Button>
                <Button onClick={()=>handleSave(true)}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog