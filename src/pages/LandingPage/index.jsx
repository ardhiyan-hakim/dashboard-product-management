import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import styles from "./LandingPage.module.scss";
import { useProducts } from "../../context/ProductContext";

const LandingPage = () => {
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <Box className={styles.container}>
      <h2>Welcome to Our Product List</h2>

      <TableContainer component={Paper} className={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      />
    </Box>
  );
};

export default LandingPage;
