import { AppBar, Toolbar, Typography, Fab, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import {Search as SearchIcon, Photo as PhotoIcon, Shuffle as ShuffleIcon  } from '@mui/icons-material';

// import '../styles/AppBar.scss'



export function CustomAppBar(){

    return(
        <AppBar id='appbar' elevation={0} style={{backgroundColor:'#f8f9fa'}} >
            <Toolbar style={{ justifyContent: 'flex-start', padding: 10 }}>
                <Box style={{width: '60%'}}>
                    <Link to='/'style={{ textDecoration: 'none'}}> 
                        <Typography variant="h6" style={{marginLeft: 30, color:'#ffffff', backgroundColor: '#4361ee', width: 200, justifyContent: 'center', display:'flex', borderRadius: 5}}>
                                Phototastic        
                        </Typography>
                    </Link>
                </Box>
                <div style={{ justifyContent:'space-around', width: '30%', display: 'inline-flex', alignContent: 'flex-start' }}>
                <Link to="/" style={{textDecoration:'none'}}>
                    <Fab size='small'  style={{boxShadow: 'none', backgroundColor: "#ffffff"}} variant="extended">
                        <Typography variant="h6" style={{color: '#333333', textTransform:'capitalize'}} >
                            Search 
                        </Typography>
                        <SearchIcon fontSize='small' style={{color: '#333333'}} />
                    </Fab>
                </Link>
                <Link to="/my-photos"style={{textDecoration:'none'}} >
                    <Fab size='small' style={{boxShadow: 'none', backgroundColor: "#ffffff"}} variant="extended">
                        <Typography variant="h6" style={{color: '#333333', textTransform:'capitalize'}} >
                            Photos 
                        </Typography>
                        <PhotoIcon fontSize='small' style={{color: '#333333'}}/>
                    </Fab>
                </Link>
                <Link to='/random-photos'style={{textDecoration:'none'}} >
                    <Fab size='small' style={{boxShadow: 'none', backgroundColor: "#ffffff"}} variant="extended">
                        <Typography variant="h6" style={{color: '#333333', textTransform: 'capitalize'}} >
                            Shuffle 
                        </Typography>
                        <ShuffleIcon fontSize='small' style={{color: '#333333'}} />
                    </Fab>
                </Link>
                </div>
                
            </Toolbar>
        </AppBar>
    )
}