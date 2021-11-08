import { useSelector, useDispatch } from 'react-redux';
import { TextField, ImageList, ImageListItem, ImageListItemBar, Button, Stack, Grid, Container } from '@mui/material';
import { photosSelector } from '../reducers/searchedPhotosSlice';
import { setSearchTerm } from '../reducers/searchTermSlice';
import { fetchPhotos } from '../reducers/searchedPhotosSlice';
import { addPhoto } from '../reducers/myPhotosSlice';



function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}


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
      dispatch(addPhoto(image));
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
                            actionIcon={<Button variant='contained' style={{ backgroundColor: image.color, color: invertColor(image.color)}} sx={{mx: 2}} onClick={() =>handleSavePhoto(image)}>Add to my photos</Button>}
                        />
                    </ImageListItem>))}
                </ImageList>
            </Grid>

        </>
        
    );  
}