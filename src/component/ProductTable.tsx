import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ProductModal from './ProductModel'
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { FaFileDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { addMoreToProducts, deleteProductById, selectProducts, selectSortPrice, selectSortRating, sortProductsByPrice, sortProductsByRating } from '../store/dataSlice';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import download from '../download';
import { deleteProduct } from '../api/dummyJSON';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

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
  search: string
}

const ProductTable: React.FC<productsTableProp> = ({ search }) => {

  const dispatch = useDispatch();
  const sortPrice = useSelector(selectSortPrice);
  const sortRating = useSelector(selectSortRating);
  const filteredProduct = useSelector(selectProducts);
  const totalLen = 100;
  const currLen = useRef(filteredProduct.length);
  const [isProductModelOpen, setProductModelOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<any>();
  const [modelProduct, setModelProduct] = useState<product>({
    "id": -1,
    "title": '',
    "description": '',
    "price": 0,
    "discountPercentage": 0,
    "rating": 0,
    "stock": 0,
    "brand": '',
    "category": ''
  });

  async function handelDelete(id: number) {
    let isDeleted = await deleteProduct(id);
    if (isDeleted) dispatch(deleteProductById(id));
  }

  function openProduct(product: product) {
    setModelProduct(product);
    setProductModelOpen(true);
  }

  let timeout:any;
  const handleScroll = useCallback(() => {
    const scrollTop = tableRef?.current?.scrollTop;
    const clientHeight = tableRef?.current?.clientHeight;
    const scrollHeight = tableRef?.current?.scrollHeight;
    const scrolledToBottom = scrollTop + clientHeight >= scrollHeight-2;

    // console.log(scrolledToBottom , !loading , currLen.current !== totalLen);
    if (scrolledToBottom && !loading && currLen.current !== totalLen) {
      setLoading(true);
      console.log('start');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log('end');
        dispatch(addMoreToProducts());
        setLoading(false);
      }, 4000)
    }
  }, [loading, totalLen]);

  useEffect(()=>{
    currLen.current = filteredProduct.length;
  },[filteredProduct])


  useLayoutEffect(() => {
    tableRef?.current?.addEventListener('scroll', handleScroll);
    return () => { tableRef?.current?.removeEventListener('scroll', handleScroll); }
  }, [])

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: '440px' }} ref={tableRef}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell width={'15%'}>Name</TableCell>
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
                <TableCell sx={{ width: '5%' }}>{index + 1}</TableCell>
                <TableCell sx={{ width: '25%' }}><Typography onClick={() => { openProduct(product) }} >{product.title}</Typography></TableCell>
                <TableCell sx={{ width: '10%' }}>{product.brand}</TableCell>
                <TableCell sx={{ width: '15%' }}>{product.category}</TableCell>
                <TableCell sx={{ width: '15%', textAlign: 'center' }}>{product.price}</TableCell>
                <TableCell sx={{ width: '15%', textAlign: 'center' }}>{product.rating}</TableCell>
                <TableCell sx={{ width: '15%' }}>
                  <Tooltip title="Download">
                    <IconButton aria-label="delete" onClick={() => { download(product, product.title) }}>
                      <FaFileDownload size={'20px'} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={() => { handelDelete(product.id) }}>
                      <MdDelete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display={'flex'} justifyContent={"center"} alignItems={'center'} marginBottom={'20px'}>
          {loading && <p>Loading...</p>}
        </Box>

      </TableContainer>
      {isProductModelOpen && <ProductModal
        product={modelProduct}
        isProductModelOpen={isProductModelOpen}
        setProductModelClose={() => { setProductModelOpen(false) }}
      />}
    </>
  );
}

export default ProductTable;