import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { fetchProducts } from "../../services/productService";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";

import TotalProductsChart from "../../components/TotalProductCharts";
import AveragePriceChart from "../../components/AveragePriceChart";
import RatingDistributionChart from "../../components/RatingDistributorChart";

import styles from "./Dashboard.module.scss";

const DashboardPage = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <Box className={styles.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography
        variant="h4"
        className={styles.title}
        sx={{ marginBottom: "2rem" }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{ padding: "1.5rem", marginBottom: "1rem" }}
        >
          <Typography variant="h6" align="center">
            Total Products Per Category
          </Typography>
          <TotalProductsChart products={products} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{ padding: "1.5rem", marginBottom: "1rem" }}
        >
          <Typography variant="h6" align="center">
            Average Price Per Category
          </Typography>
          <AveragePriceChart products={products} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{ padding: "1.5rem", marginBottom: "1rem" }}
        >
          <Typography variant="h6" align="center">
            Rating Distribution Per Category
          </Typography>
          <RatingDistributionChart products={products} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
