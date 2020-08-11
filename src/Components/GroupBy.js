import React,{useState,useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListIcon from '@material-ui/icons/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

function GroupByComponent(props){
    let [open,setOpen] = useState(false);
    let [genres,setGenres] = useState([]);

    useEffect(()=>{
        async function getGenres(){
          const response = await Axios.get('/api/genres');
          setGenres(response.data.genres);
        }
        getGenres();
    },[]);

    let handleClick = () =>{
        setOpen(!open);
    }

    let getAllBooks = async()=>{
      const response = await Axios.get('/api/books');
      props.changeBookList(response.data.books);
      console.log(props);
    }

    let getBooksByGenre = async(id)=>{
      const response = await Axios.get(`/api/genre/${id}/books`);
      props.changeBookList(response.data.books);
    }

    return(
        <div className="group-container">
            <List style={{width:`250px`}}>
                <ListItem button onClick={handleClick}>
                <ListItemIcon>
                <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Group by Genre" />
                {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {genres.map((genre)=>(
                  <ListItem button key={genre.id} onClick={()=>getBooksByGenre(genre.id)} >
                    <ListItemText primary={genre.name}/>
                  </ListItem>
                ))}
                </List>
                </Collapse>

            </List>
            <div>
            <Button variant="contained" color="primary" style={{marginTop:`10px`}} onClick={getAllBooks}>
                Show all books
            </Button>
            </div>
        </div>
    )
}

export default GroupByComponent;
