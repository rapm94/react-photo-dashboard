import { Routes, Route } from 'react-router-dom'
import { SearchPage } from '../pages/SearchPhotosPage'
import { MyPhotosPage } from '../pages/PhotosPage'
import { CustomAppBar } from './../components/AppBar';
import { RandomPhotosPage } from '../pages/RandomPhotosPage'


function App() {
  return (
    <>
      <header>
        <CustomAppBar />
      </header>
      <body>
        <Routes>
          <Route path="/my-photos" element={<MyPhotosPage />} />
          <Route path="/" element={<SearchPage />} />
          <Route path="/random-photos" element={<RandomPhotosPage />} />
        </Routes>
      </body>
    </>
  )
}

export default App
