import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../../context/ProductContext";

import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.id.toString() === id);

  if (loading) {
    return (
      <Box className={styles.loader}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" align="center">
        Product not found.
      </Typography>
    );
  }

  return (
    <Box className={styles.container}>
      <Card
        className={styles.card}
        sx={{ display: "flex", justifyContent: "center", maxWidth:"50%" }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
        <CardContent sx={{ display: "flex", flexDirection:"column", justifyContent: "center", gap:"1rem" }}>
          <Typography variant="h5" className={styles.title}>
            {product.title}
          </Typography>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          <Typography variant="body1">Category: {product.category}</Typography>
          <Typography variant="body2" className={styles.description}>
            {product.description}
          </Typography>
          <Typography variant="body2">Rating: ⭐ {product.rating}</Typography>
          <Button
            variant="contained"
            color="primary"
            href="/dashboard/products"
            className={styles.button}
          >
            Back to Products
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
