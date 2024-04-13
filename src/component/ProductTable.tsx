import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { FaFileDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { selectProducts, sortProductsByPrice, sortProductsByRating } from '../store/dataSlice';
import { Box, IconButton, Pagination, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';

const ProductTable:React.FC<{search:string}> = ({search}) => {

  const [page, setPage] = useState(1);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  let filteredProduct = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
  let fLenght = filteredProduct.length;
  filteredProduct = filteredProduct.slice((page - 1) * 10, ((page - 1) * 10) + 10);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price
              <IconButton aria-label="sort by price" onClick={()=>{dispatch(sortProductsByPrice())}}>
                <IoIosArrowRoundUp />
              </IconButton>
            </TableCell>
            <TableCell>Rating
              <IconButton aria-label="sort by rating" onClick={()=>{dispatch(sortProductsByRating())}}>
              <IoIosArrowRoundDown />
              </IconButton>
            </TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProduct.map((product, index) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{index + ((page - 1) * 10) + 1}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell>
                <Tooltip title="Download">
                  <IconButton aria-label="delete">
                    <FaFileDownload />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete">
                    <MdDelete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display={'flex'} justifyContent={"center"} alignItems={'center'} marginBottom={'20px'}>
        <Pagination count={Math.ceil(fLenght/10)} page={page} onChange={handleChange} size="large" />
      </Box>
    </TableContainer>
  );
}

export default ProductTable;