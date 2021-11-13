import { ImageListItem, Button, ImageListItemBar } from '@mui/material'

export function CardComponent(props) {
  return (
    <>
      <ImageListItem id='card-component' key={props.image.id}>
        <img src={props.image.urls.small} alt="" />
        <ImageListItemBar
          className='card-component-bar'
          subtitle={props.image.alt}
          actionIcon={
            <Button
              variant="contained"
              style={{
                backgroundColor: props.image.color,
                color: props.invertColor(props.image.color),
              }}
              sx={{ mx: 2 }}
              onClick={() => props.handleSavePhoto(props.image)}
            >
              Add to my photos
            </Button>
          }
        />
      </ImageListItem>
    </>
  )
}
