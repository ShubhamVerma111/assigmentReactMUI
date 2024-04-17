import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormEvent, useState } from 'react';
import { Grid, NativeSelect, TextField } from '@mui/material';
import { updateData } from '../api/dummyJSON';
import { useDispatch } from 'react-redux';
import { updateProductById } from '../store/dataSlice';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type productType = {
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
type errorType = {
    "title": string,
    "description": string,
    "price": string,
    "discountPercentage": string,
    "rating": string,
    "stock": string,
    "brand": string,
    "category": string
}
interface productModelProp {
    product: productType,
    isProductModelOpen: boolean,
    setProductModelClose: () => void
}

const ProductModal: React.FC<productModelProp> = ({ product, isProductModelOpen, setProductModelClose }) => {

    const [formData, setFormData] = useState<productType>(product);
    const [errors, setErrors] = useState<Partial<errorType>>({});
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name as string]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            let isUpdated = await updateData(formData);
            if (isUpdated) { 
                dispatch(updateProductById(isUpdated)); 
                setProductModelClose();
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data: productType) => {
        let errors: Partial<errorType> = {};
        if (Number(data.price) < 10 || !data.price.toString().trim()) {
            errors.price = 'Price must be at least 10';
        }
        if (Number(data.discountPercentage) < 0 || Number(data.discountPercentage) >= 100 || !data.discountPercentage.toString().trim()) {
            errors.discountPercentage = 'Discount Percentage must be positive and less than 100';
        }
        if (Number(data.rating) < 0 || Number(data.rating) > 5 || !data.rating.toString().trim()) {
            errors.rating = 'Rating must be between 0 and 5';
        }
        if (Number(data.stock) < 1 || !data.stock.toString().trim()) {
            errors.stock = 'Stock must be at least 1';
        }
        return errors;
    };

    return (
        <div>
            <Modal
                open={isProductModelOpen}
                onClose={setProductModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} display={'flex'} flexWrap={'wrap'} gap={'4rem'} justifyContent={'space-between'}>
                    <form onSubmit={handleSubmit}>
                        <Grid container rowSpacing={2} columnSpacing={6}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    name="title"
                                    label="Title"
                                    defaultValue={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    name="description"
                                    label="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="standard"
                                    name="price"
                                    type="number"
                                    label="Price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    error={Boolean(errors.price)}
                                    helperText={errors.price}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    name="discountPercentage"
                                    type="number"
                                    label="Discount Percentage"
                                    value={formData.discountPercentage}
                                    onChange={handleChange}
                                    error={Boolean(errors.discountPercentage)}
                                    helperText={errors.discountPercentage}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    name="rating"
                                    type="number"
                                    label="Rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    error={Boolean(errors.rating)}
                                    helperText={errors.rating}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    name="stock"
                                    type="number"
                                    label="Stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    error={Boolean(errors.stock)}
                                    helperText={errors.stock}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    name="brand"
                                    label="Brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <NativeSelect
                                    fullWidth
                                    defaultValue={product.category}
                                    disabled
                                    
                                >
                                    <option value={product.category}>{product.category}</option>
                                </NativeSelect>
                            </Grid>
                        </Grid>
                        <Box paddingTop={'20px'} textAlign={'right'}>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                            <Button onClick={setProductModelClose}>Close</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ProductModal