import React,{useState} from 'react';
import {AddCircle} from '@material-ui/icons';
import { Button,IconButton } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';

function AddBookComponent(){
    let [open,setOpen] = useState(false);
    let [bookName,setBookName] = useState('');

    let addBook = async() => {
        try{
            await Axios.post('/api/add_book',{
                name:bookName
            });
        }
        catch(error){
            console.log(error);
        }
    }

    let handleOpen = () => setOpen(true);
    let handleClose = () => {
        setOpen(false);
        addBook();
    }



    let handleBookName = e => setBookName(e.target.value);

    return(
        <div className="add-book">
            <Button size="large" onClick={handleOpen} startIcon={<AddCircle style={{color:orange[500],fontSize:40}}/>}>Add Book</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{height:`600px`}}
            >
                <DialogTitle id="alert-dialog-title">{"Add Book"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name of the book"
                        type="text"
                        fullWidth
                        value={bookName}
                        onChange={handleBookName}
                    />

                </DialogContent>
                <DialogActions>
                    <IconButton aria-label="Add Book" onClick={handleClose}>
                        <AddCircle fontSize="large" style={{color:orange[500]}}/>
                    </IconButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}







export default AddBookComponent;
