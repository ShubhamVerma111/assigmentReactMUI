import { Box, Divider, Stack } from '@mui/material'
import './App.css'
import Navbar from './component/Navbar'
import Filters from './component/Filters'
import Products from './component/Products'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from './store/dataSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'

function App() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(() => {
    dispatch(fetchData());
}, [dispatch]);

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
