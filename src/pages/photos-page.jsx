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
  Paper,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {
  myPhotosSelector,
  removeOnePhoto,
  removeAllPhotos,
  changeDescription,
  sortPhotos,
} from '../reducers/myPhotosSlice'
import { Delete, Edit, Download } from '@mui/icons-material'
import { blue, red } from '@mui/material/colors'
import { useState } from 'react'
import '../styles/CardComponent.scss'

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
  const [toggleChip, setToggleChip] = useState(false)

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
    setSearchByTag(tag)
    setToggleChip(!toggleChip)
  }
  //Clearing chip searchintg
  const handleClearChipSearch = () => {
    setSearchByTag('')
  }

  return (
    <>
      <Grid separation={5} justifyContent="center">
        <Stack direction="row" separation={5}>
          <TextField
            placeholder="Search your photos..."
            onChange={handleSearch}
            size="small"
            style={{ width: 300 }}
          />
          <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 300 }}
            size="small"
            onChange={handleSort}
            renderInput={(params) => (
              <TextField {...params} label="Sort By..." />
            )}
          />
          <Paper
            component="ul"
            style={{
              display: 'flex',
              justifyContent: 'left',
              flexWrap: 'nowrap',
              listStyle: 'none',
              margin: 0,
              overflow: 'auto',
              maxWidth: '600px',
            }}
          >
            <List style={{ maxWidth: 750, position: 'relative' }}>
              {tags.map((tag, index) =>   <Chip
                  key={ index }
                  label={ tag }
                  sx={{ m: 0.5 }}
                  size="small"
                  onClick= { handleChipClick }
                  variant= { toggleChip && tag.includes(searchByTag) ? 'filled' : 'outlined' }
                  color= { toggleChip && tag.includes(searchByTag) ? 'secondary' : 'primary' }
                  disabled = { toggleChip && tag.includes(searchByTag) ? true : false }
                /> 
              )}
            </List>
          </Paper>
        </Stack>
      </Grid>
      <Stack direction="row">
        <Button onClick={removeAllPhotosHandler}>Delete all photos</Button>

        <Button onClick={handleClearChipSearch}>Clear category</Button>
      </Stack>
      <Grid>
        <ImageList gap={20} cols={4} variant="quilted" rowHeight={400}>
          {myPhotos
            .filter((image) => {
              if (searchByDescription || searchByTag) {
                const description = image.description
                  ? image.description.toLowerCase()
                  : image.alt_description.toLowerCase()
                const tag = image.tags.map((tag) => tag.title.toLowerCase())
                return (
                  description.includes(searchByDescription) &&
                  tag.includes(searchByTag)
                )
              } else {
                return true
              }
            })
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
                          <Delete style={{ color: blue[50] }} />
                        </IconButton>
                        <IconButton onClick={() => setEditing(image.id)}>
                          <Edit style={{ color: blue[50] }} />
                        </IconButton>
                        <IconButton
                          onClick={() => onDownload(image.links.download)}
                        >
                          <Download style={{ color: blue[50] }} />
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
