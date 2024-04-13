import { Box, Container, Input, Typography } from "@mui/material";
import { useState } from "react";
import ProductTable from "./ProductTable";

export default function Products() {
    let [search, setSearch] = useState("")

    return (
        <Box flex={4} sx={{ padding: "20px" }}>
            <Container>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>
                        Showing 10 out of 100
                    </Typography>
                    <Input
                        sx={{border:"1px solid", padding:"2px 2px 2px 10px", borderRadius:"5px"}}
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder="Search"
                        disableUnderline
                    />

                </Box>
            </Container>
            <Container>
                <ProductTable search={search}/>
            </Container>
        </Box>
    )
}