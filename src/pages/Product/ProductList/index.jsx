import { useEffect, useState } from "react";
import { fetchProducts } from "../../../services/productService";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./ProductList.module.scss";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (sortOption === "price") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "name") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [search, category, sortOption, products]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <Box className={styles.container}>
      <h2>Product List</h2>

      <TextField
        label="Search Product"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Filter by Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} className={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id} className={styles.row}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <Link to={`/dashboard/products/${product.id}`} className={styles.link}>
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/dashboard/products/${product.id}`} color="primary">
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredProducts.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default ProductList;
