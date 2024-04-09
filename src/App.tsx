import { Box, Divider, Stack } from '@mui/material'
import './App.css'
import Navbar from './component/Navbar'
import Filters from './component/Filters'
import Products from './component/Products'

function App() {

  return (
    <Box>
      <Navbar />
      <Stack direction={'row'} divider={<Divider orientation="vertical" flexItem />}>
        <Filters />
        <Products />
      </Stack>
    </Box>

  )
}

export default App
