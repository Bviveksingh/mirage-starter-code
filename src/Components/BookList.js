import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {red} from '@material-ui/core/colors';



function BookListComponent(props){
    let [bookList,setBookList] = useState([]);
    let deleteBook = async(id) => {
        try{
            await Axios.delete(`/api/book/${id}`);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
      setBookList([...props.books])
    },[props.books]);

    return(
        <div className="book-list">
            <GridList cellHeight={180} style={{width:`100%`,height:`auto`}}>
                <GridListTile key="Subheader" cols={2} style={{height:`auto`}}>
                    <ListSubheader component="div">Books</ListSubheader>
                </GridListTile>
                {bookList.map((book)=>(
                    <GridListTile key={book.id}>
                        <img src={require('../Images/book_cover.jpg')} alt="book-cover"/>

                    <GridListTileBar
                        title={book.name}
                        actionIcon={
                            <IconButton aria-label="delete-book" onClick={()=>deleteBook(book.id)}>
                                <DeleteIcon style={{color:red[500]}}/>
                            </IconButton>
                        }

                    />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default BookListComponent;
