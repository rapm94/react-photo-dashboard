import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {blue} from '@mui/material/colors';

import '../styles/AppBar.scss'



export function CustomAppBar(){

    return(
        <AppBar id='appbar'>
            <Toolbar>
                <Typography variant="h6">
                    My Photo App        
                </Typography>
                <Link to="/" >
                <Button className='button-search' style={{ margin: 10, backgroundColor: '#FFFFFF', color: blue[400]}}>Search</Button>
                </Link>
                <Link to="/my-photos">
                <Button style={{ maring: 10}}>My Photos</Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}