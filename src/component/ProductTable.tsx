import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";
import { FaArrowDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { selectProducts } from '../store/dataSlice';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ProductTable() {

  const [page, setPage] = useState(1);
  const products = useSelector(selectProducts);
  let finalProducts = products.slice((page - 1) * 10, ((page - 1) * 10) + 10);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    finalProducts = products.slice((page - 1) * 10, ((page - 1) * 10) + 10);
  }, [page]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {finalProducts.map((product, index) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{index + ((page-1)*10) + 1}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell><FaArrowDown /><MdDelete /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination count={10} page={page} onChange={handleChange} />
    </TableContainer>
  );
}