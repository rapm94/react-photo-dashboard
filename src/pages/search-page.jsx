import { useSelector, useDispatch } from 'react-redux';
import {TextField, ImageList, ImageListItem, ImageListItemBar, Button, Stack, Grid, Container} from '@mui/material';
import { photosSelector } from '../reducers/searchedPhotosSlice';
import { setSearchTerm } from '../reducers/searchTermSlice';
import { fetchPhotos } from '../reducers/searchedPhotosSlice';


export function SearchPage () {

    const  searchedPhotos  = useSelector(photosSelector);
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        event.preventDefault();
        const Term = event.target.value;
        dispatch(setSearchTerm(Term));
        dispatch(fetchPhotos(Term));
    }

    const handleSavePhoto = (image) => {
        console.log(image);
    }
    return (
        <>
        <Stack  direction='row' >
            <Container sx={{ width: 1/3,  }}>
             <TextField
                id="search-field"
                label="Search"
                variant="outlined"
                fullWidth
                onChange={(event) => handleSearch(event)}
            />
         </Container>        
          <Button
                id="search-button"
                variant="contained"
                color="primary"
                > Search </Button>

        </Stack>
            <Grid>
                <ImageList gap={20} cols={4} variant='quilted' rowHeight={ 300 }>
                    {searchedPhotos.map((image) => 
                    (<ImageListItem key={image.id}>
                        
                        <img
                        src={image.urls.thumb}
                        alt=''
                        />
                        <ImageListItemBar
                            title={image.id}
                            subtitle={image.alt}
                            actionIcon={<Button variant='contained' style={{backgroundColor: image.color}} sx={{mx: 2}} >Add to my photos</Button>}
                        />
                    </ImageListItem>))}
                </ImageList>
            </Grid>

        </>
        
    );  
}