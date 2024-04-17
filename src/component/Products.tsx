import { Box, Container, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { useSelector } from "react-redux";
import { selectProducts } from "../store/dataSlice";
import { selectFilter, selectIsFilterSelected } from "../store/filterSlice";

export default function Products() {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const products = useSelector(selectProducts);
    const categories = useSelector(selectFilter);
    const isFilterSelected = useSelector(selectIsFilterSelected);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    let filteredProduct = products.filter(product => {
        if (!(product.title.toLowerCase().includes(search.toLowerCase())))
            return false;
        if (isFilterSelected)
            return categories.includes(product.category);
        return true
    });
    let fLenght = filteredProduct.length;
    filteredProduct = filteredProduct.slice((page - 1) * 10, ((page - 1) * 10) + 10);

    useEffect(() => {
        if (Math.ceil(fLenght / 10) < page) setPage(1);
    }, [fLenght, page]);

    return (
        <Box flex={4} sx={{ padding: "20px" }}>
            <Container>
                <Box display={'flex'} marginBottom={'10px'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>
                        Showing {filteredProduct.length} out of {fLenght}
                    </Typography>
                    <Input
                        sx={{ border: "1px solid", padding: "2px 2px 2px 10px", borderRadius: "5px" }}
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder="Search"
                        disableUnderline
                    />
                </Box>
            </Container>
            <Container>
                <ProductTable
                    filteredProduct={filteredProduct}
                    fLenght={fLenght}
                    handlePageChange={handlePageChange}
                    page={page}
                />
            </Container>
        </Box>
    )
}