import {
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Stack,
  Card,
  TextField,
  Button,
  Box,
  Modal,
  Chip,
  List,
  Autocomplete,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {
  myPhotosSelector,
  removeOnePhoto,
  removeAllPhotos,
  changeDescription,
  sortPhotos,
} from '../reducers/myPhotosSlice'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
} from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import { useState } from 'react'

//Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export function MyPhotosPage() {
  //Local state
  const [descriptionText, setDescriptionText] = useState('')
  const [editing, setEditing] = useState(null)
  const [searchByDescription, setSearchByDescription] = useState('')
  const [searchByTag, setSearchByTag] = useState('')

  //Redux state
  const dispatch = useDispatch()
  const myPhotos = useSelector(myPhotosSelector)

  //Local functions
  const onDownload = (downloadLink) => {
    const link = document.createElement('a')
    link.download = `download.txt`
    link.href = downloadLink
    link.click()
  }

  //Search by description
  const handleSearch = (event) => {
    event.preventDefault()
    const term = event.target.value
    setSearchByDescription(term)
  }

  //Remove
  const removeOnePhotoHandler = (id) => {
    dispatch(removeOnePhoto(id))
  }

  const removeAllPhotosHandler = () => {
    dispatch(removeAllPhotos())
  }

  
  let tags = myPhotos.reduce(
    (prev, current) => [...prev, ...current.tags.map((tag) => tag.title)],
    [],
  )
  tags = [...new Set(tags)]

  //Handle the description change
  const handleEditDescription = (event) => {
    event.preventDefault()
    const description = event.target.value
    setDescriptionText(description)
  }

  const handleEdit = () => {
    dispatch(changeDescription({ id: editing, description: descriptionText }))
    setEditing(null)
  }

  //Handle sorting
  const handleSort = (event) => {
    event.preventDefault()
    const sortBy = event.target.textContent
    dispatch(sortPhotos(sortBy.toLowerCase()))
  }

  const options = ['Width', 'Height', 'Likes']

  //Handling chip searching
  const handleChipClick = (event) => {
    const tag = event.target.textContent
   !searchByTag?  setSearchByTag(tag) : setSearchByTag('')
  }

  const toggleChip = () => {
    if (tags.length > 0) {  
    return (
      <Stack
        direction='row'
          style={{
            display: 'flex',
            marginTop: 20,
            maxWidth: 'auto',
            justifyContent: 'center',
          }}
        >
          <List style={{ justifyContent:'space-around' }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{ m: 0.5 }}
                size="small"
                onClick={handleChipClick}
                variant={tag === searchByTag ? 'filled' : 'outlined'}
                color={tag === searchByTag ? 'secondary' : 'primary'}
              />
            ))}
          </List>
        </Stack>
    )
    }
  }

  return (
    <>
      <Grid  style={{ marginTop: 100 }}>
        <Stack
          direction="row"
          style={{ justifyContent: 'space-around', width: '100%' }}
        >
          <div style={{display: 'flex', justifyContent: 'space-around', width: '50%'}}>
            <TextField
            placeholder="Search your photos..."
            onChange={handleSearch}
            size="small"
            style={{ width: 300 }}
          />
          <div style={{display:'flex'}}>
          <Autocomplete
            disablePortal
            options={options}
            style={{ width: 200 }}
            size="small"
            onChange={handleSort}
            renderInput={(params) => (
              <TextField {...params} label="Sort By..." />
            )}
          />
       <IconButton onClick={removeAllPhotosHandler}>
          <DeleteIcon size='small' style={{color:'#333333'}}/>
       </IconButton>  
          </div>
   
          </div>
        </Stack>
        {toggleChip()}
      </Grid>

      <Grid>
        <ImageList gap={40} cols={4} variant="quilted" rowHeight={400}>
          {myPhotos
            .filter((image) => searchByTag ? image.tags.find((tag) => tag.title === searchByTag) : true)
            .filter((image) => image.description
            ? image.description.toLowerCase().includes(searchByDescription)
            : image.alt_description
                .toLowerCase()
                .includes(searchByDescription))
            .map((image) => (
              <ImageListItem key={image.id}>
                <img src={image.urls.small} alt="" />
                <ImageListItemBar
                  title={
                    image.description
                      ? image.description
                      : image.alt_description
                  }
                  subtitle={
                    <ul>
                      <li>
                        Size: h {image.height}x w {image.width}
                      </li>
                      <li>Likes: {image.likes}</li>
                      <li>Created at: {image.created_at}</li>
                    </ul>
                  }
                  actionIcon={
                    <div>
                      <Stack direction="row" separetion={1} m={2}>
                        <IconButton
                          onClick={() => removeOnePhotoHandler(image.id)}
                        >
                          <DeleteIcon style={{ color: blue[50] }} />
                        </IconButton>
                        <IconButton onClick={() => setEditing(image.id)}>
                          <EditIcon style={{ color: blue[50] }} />
                        </IconButton>
                        <IconButton
                          onClick={() => onDownload(image.links.download)}
                        >
                          <DownloadIcon style={{ color: blue[50] }} />
                        </IconButton>
                      </Stack>
                    </div>
                  }
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Grid>
      <Card />
      <Modal open={editing !== null} onClose={() => setEditing(null)}>
        <Box sx={style}>
          <TextField
            placeholder="Change photo description..."
            onChange={handleEditDescription}
          />
          <Button onClick={handleEdit}>Save</Button>
        </Box>
      </Modal>
    </>
  )
}
