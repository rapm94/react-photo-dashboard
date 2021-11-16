import { useSelector, useDispatch } from 'react-redux'
import {
  TextField,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
  Stack,
  Grid,
  Pagination,
  Snackbar,
  IconButton,
} from '@mui/material'
import {
  photosSelector,
  pageCountSelector,
} from '../reducers/searchedPhotosSlice'
import { fetchPhotos } from '../reducers/searchedPhotosSlice'
import { addPhoto } from '../reducers/myPhotosSlice'
import { invertColor } from '../helpers/invertColorHelper'
import { useState } from 'react'
import { myPhotosIdsSelector } from '../reducers/myPhotosSlice'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { myPhotosSelector } from '../reducers/myPhotosSlice'

export function SearchPage() {
  //Local state
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [imageAlreadySaved, setImageAlreadySaved] = useState(false)
  const [imageSaved, setImageSaved] = useState(false)

  //Redux state
  const searchedPhotos = useSelector(photosSelector)
  const dispatch = useDispatch()
  const pageCount = useSelector(pageCountSelector)
  const imagesIds = useSelector(myPhotosIdsSelector)
  const myPhotos = useSelector(myPhotosSelector)

  //Search photos
  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchTerm)
    dispatch(fetchPhotos(searchTerm))
  }

  const handleSavePhoto = (image) => {
    if (imagesIds.hasOwnProperty(image.id)) {
      setImageAlreadySaved(true)
    } else {
      console.log(myPhotos)
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
  const handlePageNumber = (event, value) => {
    setPage(value)
    dispatch(fetchPhotos(searchTerm, value))
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
          hidePrevButton
          hideNextButton
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
          autoHideDuration={2000}
          onClose={handleAlreadySavedClose}
          message="Image already saved."
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleAlreadySavedClose}
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
          autoHideDuration={2000}
          onClose={handleImageSavedClose}
          message="Image saved!."
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleImageSavedClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      )
    }
  }

  const handleImageSavedClose = () => {
    setImageSaved(false)
  }
  const handleAlreadySavedClose = () => {
    setImageAlreadySaved(false)
  }

  const handleButtonToggle = (image) => {
    if (!imagesIds.hasOwnProperty(image.id)) {
      return (
        <Button
          variant="contained"
          style={{
            backgroundColor: image.color,
            color: invertColor(image.color),
          }}
          sx={{ mx: 2 }}
          onClick={() => handleSavePhoto(image)}
        >
          Add
        </Button>
      )
    } else {
      return (
        <Button
          variant="contained"
          style={{
            backgroundColor: image.color,
            color: invertColor(image.color),
          }}
          sx={{ mx: 2 }}
          onClick={() => handleSavePhoto(image)}
          disabled
        >
          <CheckCircleIcon />
        </Button>
      )
    }
  }

  return (
    <>
      <div style={{ marginTop: 100, marginBottom: 30 }}>
        <form id="search-page-form" onSubmit={handleSearch}>
          <Stack
            direction="row"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <TextField
              id="search-field"
              label="Take a look"
              variant="outlined"
              onChange={handleChange}
              size="small"
              style={{ width: 400, marginRight: 10, marginLeft: 10 }}
            />
            <Button
              id="search-button"
              variant="contained"
              color="primary"
              type="submit"
              style={{
                boxShadow: 'none',
                backgroundColor: '#f5f5f5',
                color: '#000',
              }}
            >
              Search
            </Button>
          </Stack>
        </form>
      </div>

      <Grid>
        <ImageList gap={40} cols={4} variant="quilted" rowHeight={400}>
          {searchedPhotos.map((image) => (
            <ImageListItem key={image.id}>
              <img src={image.urls.regular} alt="" />
              <ImageListItemBar
                style={{ height: 50, backgroundColor: 'transparent' }}
                subtitle={image.alt}
                actionIcon={handleButtonToggle(image)}
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
