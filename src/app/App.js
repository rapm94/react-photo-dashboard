import { Routes, Route, Link } from 'react-router-dom'
import { SearchPage } from '../pages/search-page'
import { MyPhotosPage } from '../pages/photos-page'
import { CustomAppBar } from '../components/AppBar'
import { Grid, Container, Stack, Button } from '@mui/material'

function App() {
  return (
    <>
      <header>
      <Grid container p={5}>
          <Container>
            <Stack md={8}></Stack>
            <Stack direction="row" md={2} justifyContent="flex-end" spacing={8}>
              <Link to="/">
                <Button>Search</Button>
              </Link>
              <Link to="/my-photos">
                <Button>My Photos</Button>
              </Link>
            </Stack>
          </Container>
        </Grid>
      </header>
      <body>
        <Routes>
          <Route path="/my-photos" element={<MyPhotosPage />} />
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </body>
    </>
  )
}

export default App
