import { useSelector, useDispatch } from 'react-redux'
import {
  TextField,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
  Stack,
  Grid,
  Container,
  Pagination,
} from '@mui/material'
import { photosSelector } from '../reducers/searchedPhotosSlice'
import { fetchPhotos } from '../reducers/searchedPhotosSlice'
import { addPhoto } from '../reducers/myPhotosSlice'
import { invertColor } from '../helpers/invertColorHelper'
import { useState } from 'react'

export function SearchPage() {
  //Local state
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  //Redux state
  const searchedPhotos = useSelector(photosSelector)
  const dispatch = useDispatch()

  //Search photos
  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchTerm)
    dispatch(fetchPhotos(searchTerm))
  }

  //Add photo to my photos
  const handleSavePhoto = (image) => {
    dispatch(addPhoto(image))
    console.log(image)
  }

  //Changing photo description
  const handleChange = (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  //Pagination
  const handlePageNumber = (event) => {
    event.preventDefault()
    const pageNumber = event.target.textContent
    setPage(pageNumber)
    dispatch(fetchPhotos(searchTerm, pageNumber))
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <Stack direction="row">
          <Container sx={{ width: 1 / 3 }}>
            <TextField
              id="search-field"
              label="Search"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              size="small"
            />
          </Container>
          <Button
            id="search-button"
            variant="contained"
            color="primary"
            type="submit"
          >
            {' '}
            Search{' '}
          </Button>
        </Stack>
      </form>
      <Stack>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          style={{ display: 'flex', justifyContent: 'center', m: 0.5 }}
          onChange={handlePageNumber}
        />
      </Stack>
      <Grid>
        <ImageList gap={20} cols={4} variant="quilted" rowHeight={300}>
          {searchedPhotos.map((image) => (
            <ImageListItem key={image.id}>
              <img src={image.urls.thumb} alt="" />
              <ImageListItemBar
                title={image.id}
                subtitle={image.alt}
                actionIcon={
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: image.color,
                      color: invertColor(image.color),
                    }}
                    sx={{ mx: 2 }}
                    onClick={() => handleSavePhoto(image)}
                  >
                    Add to my photos
                  </Button>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </>
  )
}
