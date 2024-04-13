import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, updateFilterCategories } from "../store/filterSlice";

export default function Filters() {
    const [crietria, setCriateria] = useState<string[]>([]);
    const categories = useSelector(selectFilter);
    const dispatch = useDispatch();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            let updatedCategories = [...categories, event.target.name]
            dispatch(updateFilterCategories(updatedCategories));
        } else {
            let updatedCategories = categories.filter(cat => !(cat === event.target.name))
            dispatch(updateFilterCategories(updatedCategories));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('https://dummyjson.com/products/categories');
                setCriateria(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])

    return (
        <Box flex={1} sx={{ marginTop: "20px" }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<IoIosArrowDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Categories
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={-2}>
                        {crietria.map((cat, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    control={<Checkbox checked={categories.includes(cat)} onChange={handleCheckboxChange} name={cat} />}
                                    label={cat}
                                />
                            )
                        })}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box >
    )
}