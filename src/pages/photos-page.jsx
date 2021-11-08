import { Grid, ImageList, ImageListItem, ImageListItemBar, IconButton, Stack, Card, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { myPhotosSelector, removeOnePhoto } from '../reducers/myPhotosSlice';
import { Delete, Edit, Download } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { useDispatch } from 'react-redux';


export function MyPhotosPage() {

    const dispatch = useDispatch();
    const myPhotos = useSelector(myPhotosSelector);

    const removeOnePhotoHandler = (id) => {
        dispatch(removeOnePhoto(id));
    }

    return (
        <>
            <Stack direction='row' separation={5}>
                <TextField/>
                <TextField/>
            </Stack>
            <Grid>
                <ImageList gap={20} cols={4} variant='quilted' rowHeight={ 300 }>
                    {myPhotos.map((image) => (
                        <ImageListItem key={image.id}>
                        
                        <img
                        src={image.urls.thumb}
                        alt=''
                        />
                        <ImageListItemBar
                            title={image.id}
                            subtitle={image.alt}
                            actionIcon={<Stack direction='row' 
                            separetion={1}
                            m={2}><IconButton onClick={()=>removeOnePhotoHandler(image.id)}>
                                <Delete 
                            style={{ color: blue[50] }}/>
                            </IconButton>
                            <IconButton >
                                <Edit style={{ color: blue[50] }}/>
                                </IconButton><Download style={{ color: blue[50] }} />
                                <IconButton>
                                    </IconButton>
                                    </Stack>}
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Card/>
        </>
    );
}