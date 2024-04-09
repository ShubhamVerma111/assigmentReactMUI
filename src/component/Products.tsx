import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { getProducts } from "../api/dummyJSON";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectSkip, selectTotal, setWholeData } from "../store/dataSlice";

export default function Products() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await getProducts();
                if (response) {
                    dispatch(setWholeData(response));
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    let products = useSelector(selectProducts);
    let total = useSelector(selectTotal);
    let skip = useSelector(selectSkip);

    return (
        <Box flex={4}>
            <Container>
                products Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo in earum dolorem nam commodi itaque consequatur saepe maxime ratione odit.\ Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nulla consequuntur esse? Non ratione dolorem provident doloribus nisi cumque dicta dolores quisquam corrupti, consectetur maiores ex vitae, recusandae, a praesentium impedit rem neque officiis molestias ad rerum nemo enim corporis? Temporibus placeat alias sit atque, beatae molestiae ducimus voluptatem sint non modi omnis autem consequuntur soluta quaerat neque quisquam quod blanditiis illum quam libero nam, totam, dicta repellat. Nihil fugit temporibus quo perspiciatis ea optio consequuntur nostrum vero quis voluptate.
            </Container>
        </Box>
    )
}