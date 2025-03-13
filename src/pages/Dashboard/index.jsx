import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService";
import { Box, Typography, CircularProgress } from "@mui/material";
import ProductChart from "../../components/ProductChart";
import styles from "./Dashboard.module.scss";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <Box className={styles.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>Dashboard</Typography>
      <ProductChart products={products} />
    </Box>
  );
};

export default DashboardPage;
