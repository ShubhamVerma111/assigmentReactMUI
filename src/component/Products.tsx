import { Box, Container, Input } from "@mui/material";
import { useState } from "react";
import ProductTable from "./ProductTable";

export default function Products() {
    const [search, setSearch] = useState("")

    return (
        <Box flex={4} sx={{ padding: "20px" }}>
            <Container>
                <Box display={'flex'} marginBottom={'10px'} justifyContent={'end'}>
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
                    search={search}
                />
            </Container>
        </Box>
    )
}