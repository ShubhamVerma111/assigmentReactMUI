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
import { deleteProductById, selectSortPrice, selectSortRating, sortProductsByPrice, sortProductsByRating } from '../store/dataSlice';
import { Box, IconButton, Pagination, Tooltip } from '@mui/material';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import download from '../download';
import { deleteProduct } from '../api/dummyJSON';

type product = {
  "id": number,
  "title": string,
  "description": string,
  "price": number,
  "discountPercentage": number,
  "rating": number,
  "stock": number,
  "brand": string,
  "category": string
}
interface productsTableProp {
  filteredProduct: product[],
  fLenght: number,
  page: number,
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void
}

const ProductTable: React.FC<productsTableProp> = ({ filteredProduct, fLenght, page, handlePageChange }) => {

  const dispatch = useDispatch();
  const sortPrice = useSelector(selectSortPrice);
  const sortRating = useSelector(selectSortRating);

  async function handelDelete(id:number){
    let isDeleted = await deleteProduct(id);
    if(isDeleted) dispatch(deleteProductById(id));
  }

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
              <IconButton aria-label="sort by price" onClick={() => { dispatch(sortProductsByPrice()) }}>
                {sortPrice ? <IoIosArrowRoundDown /> : <IoIosArrowRoundUp />}
              </IconButton>
            </TableCell>
            <TableCell>Rating
              <IconButton aria-label="sort by rating" onClick={() => { dispatch(sortProductsByRating()) }}>
                {sortRating ? <IoIosArrowRoundDown /> : <IoIosArrowRoundUp />}
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
                  <IconButton aria-label="delete" onClick={()=>{download(product, product.title)}}>
                    <FaFileDownload />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete" onClick={()=> {handelDelete(product.id)}}>
                    <MdDelete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display={'flex'} justifyContent={"center"} alignItems={'center'} marginBottom={'20px'}>
        <Pagination count={Math.ceil(fLenght / 10)} page={page} onChange={handlePageChange} size="large" />
      </Box>
    </TableContainer>
  );
}

export default ProductTable;