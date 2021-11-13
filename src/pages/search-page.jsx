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
  Snackbar,
  IconButton,
} from '@mui/material'
import { photosSelector, pageCountSelector } from '../reducers/searchedPhotosSlice'
import { fetchPhotos } from '../reducers/searchedPhotosSlice'
import { addPhoto } from '../reducers/myPhotosSlice'
import { invertColor } from '../helpers/invertColorHelper'
import { useState } from 'react'
import { myPhotosSelector } from './../reducers/myPhotosSlice'
import CloseIcon from '@mui/icons-material/Close'

export function SearchPage() {
  //Local state
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [imageAlreadySaved, setImageAlreadySaved] = useState(false)
  const [imageSaved, setImageSaved] = useState(false)

  //Redux state
  const searchedPhotos = useSelector(photosSelector)
  const dispatch = useDispatch()
  const myPhotos = useSelector(myPhotosSelector)
  const pageCount = useSelector(pageCountSelector)

  //Search photos
  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchTerm)
    dispatch(fetchPhotos(searchTerm))
    console.log()
  }

  //Add photo to my photos
  const handleSavePhoto = (image) => {
    if (myPhotos.includes(image)) {
      setImageAlreadySaved(true)
    } else {
      dispatch(addPhoto(image))
      setImageSaved(true)
    }
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

  const handlePaginationToggle = () => {
    if (searchedPhotos.length > 0) {
      return (
        <Pagination
          variant="outlined"
          shape="rounded"
          count={pageCount}
          page={page}
          style={{ display: 'flex', justifyContent: 'center', m: 0.5 }}
          onChange={handlePageNumber}
        />
      )
    } else {
      return null
    }
  }

  const handleSnackbarType = () => { 
    if (imageAlreadySaved) {
      return (
        <Snackbar
        open={imageAlreadySaved}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
        message='Image already saved.'
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackBarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      ) 
    } else { 
      return (
        <Snackbar
        open={imageSaved}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
        message='Image saved!.'
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackBarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      )
    }
  }

  const handleSnackBarClose = async () => {
      await setImageAlreadySaved(false);
      await setImageSaved(false)
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
            Search
          </Button>
        </Stack>
      </form>

      <Grid>
        <ImageList gap={20} cols={4} variant="quilted" rowHeight={300}>
          {searchedPhotos.map((image) => (
            <ImageListItem key={image.id}>
              <img src={image.urls.regular} alt="" />
              <ImageListItemBar
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
        <Stack>{handlePaginationToggle()}</Stack>
      </Grid>
      {handleSnackbarType()}
    </>
  )
}
