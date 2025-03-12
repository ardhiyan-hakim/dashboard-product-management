import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress, Card, CardContent, Button } from "@mui/material";
import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box className={styles.loader}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography className={styles.error}>{error}</Typography>;
  }

  return (
    <Box className={styles.container}>
      <Card className={styles.card}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />
        <CardContent>
          <Typography variant="h5" className={styles.title}>{product.title}</Typography>
          <Typography variant="h6" color="primary">${product.price}</Typography>
          <Typography variant="body1">Category: {product.category}</Typography>
          <Typography variant="body2" className={styles.description}>{product.description}</Typography>
          <Typography variant="body2">Rating: ⭐ {product.rating}</Typography>
          <Button variant="contained" color="primary" href="/dashboard/products" className={styles.button}>
            Back to Products
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
