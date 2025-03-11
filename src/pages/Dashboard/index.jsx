import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import ProductChart from "/src/components/ProductChart";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <Box className={styles.dashboard}>
      <Typography variant="h5" className={styles.title}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={2}>
        {/* Total Products */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">120</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Average Price */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h6">Avg. Price</Typography>
              <Typography variant="h4">$50</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Rating Distribution */}
        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h6">Rating Distribution</Typography>
              <ProductChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
