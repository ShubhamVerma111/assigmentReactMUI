import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { FaArrowDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { selectProducts, selectSkip, setWholeData } from '../store/dataSlice';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/dummyJSON';

export default function ProductTable() {

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const skip = useSelector(selectSkip);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getProducts((page-1)*10);
        if (response) {
          dispatch(setWholeData(response));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
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
          {products.map((product, index) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{index + skip + 1}</TableCell>
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