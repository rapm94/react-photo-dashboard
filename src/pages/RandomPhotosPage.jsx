import React from 'react'
import { useState, useEffect } from 'react'
import {
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
  Snackbar,
  IconButton,
} from '@mui/material'
import { invertColor } from '../helpers/invertColorHelper'
import { useSelector, useDispatch } from 'react-redux'
import { addPhoto } from '../reducers/myPhotosSlice'
import ReactLoading from 'react-loading'
import { myPhotosIdsSelector } from '../reducers/myPhotosSlice'
import CloseIcon from '@mui/icons-material/Close'

export function RandomPhotosPage() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [imageAlreadySaved, setImageAlreadySaved] = useState(false)
  const [imageSaved, setImageSaved] = useState(false)

  const dispatch = useDispatch()
  const imagesIds = useSelector(myPhotosIdsSelector)

  function fetchPhotos() {
    return async () => {
      setLoading(true)
      try {
        const response = await fetch(
          'https://api.unsplash.com/photos/random?count=12&client_id=xrJ1LP9YOXq01I6uPbvcvNFm4A5wjJF0dJf9_AuRe3M',
        )
        const data = await response.json()
        setPhotos(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // add a tag array key to the image object, generated from description first word
  function addTag(image) {
    return {
      ...image,
      tag: [{ title: image.description.split(' ')[0] }],
    }
  }
  const handleImageSavedClose = () => {
    setImageSaved(false)
  }
  const handleAlreadySavedClose = () => {
    setImageAlreadySaved(false)
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

  useEffect(() => {
    setPhotos(fetchPhotos())
  }, [])

  const handleSavePhoto = (image) => {
    if (imagesIds.hasOwnProperty(image.id)) {
      setImageAlreadySaved(true)
    } else {
      //TODO: dispatch(addPhoto(image))
      setImageSaved(true)
    }
  }

  const handleRandomize = () => {
    setPhotos(fetchPhotos())
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <ReactLoading
            type="bubbles"
            color="#4361ee"
            height={667}
            width={375}
          />
        </div>
      ) : (
        <div style={{ marginTop: 100 }}>
          <Grid
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <container style={{ width: 200 }}>
              <Button onClick={handleRandomize}>Randomize photos</Button>
            </container>
            <ImageList gap={40} cols={4} variant="quilted" rowHeight={400}>
              {photos.map((image) => (
                <ImageListItem key={image.id}>
                  <img src={image.urls.regular} alt="" />
                  <ImageListItemBar
                    style={{ height: 50, backgroundColor: 'transparent' }}
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
                        Add
                      </Button>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          {handleSnackbarType()}
        </div>
      )}
    </>
  )
}
