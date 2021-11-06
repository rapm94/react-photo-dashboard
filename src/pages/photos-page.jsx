import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import {Grid, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useSelector } from 'react-redux';
import { myPhotosSelector } from '../reducers/myPhotosSlice';

export function MyPhotosPage() {

    const myPhotos = useSelector(myPhotosSelector);


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
                            actionIcon={<span>{image.id}</span>}
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Card/>
        </>
    );
}