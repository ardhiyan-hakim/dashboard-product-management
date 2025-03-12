import { useEffect, useState } from "react";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/productService";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  CircularProgress,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";
import styles from "./ProductList.module.scss";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
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
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddProduct = async () => {
    const addedProduct = await addProduct(newProduct);

    if (addedProduct) {
      setProducts([addedProduct, ...products]);
      setIsAddOpen(false);
      setNewProduct({ title: "", price: "", category: "" });
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
    const updatedProduct = await updateProduct(
      selectedProduct.id,
      selectedProduct
    );

    if (updatedProduct) {
      setProducts(
        products.map((p) => (p.id === selectedProduct.id ? updatedProduct : p))
      );
      setIsEditOpen(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(id);

      if (success) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

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
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          label="Sort By"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={category}
          label="Filter by Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setIsAddOpen(true)}
        className={styles.addButton}
      >
        Add Product
      </Button>

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
                  <Link
                    to={`/dashboard/products/${product.id}`}
                    className={styles.link}
                  >
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className={styles.actions}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEditProduct(product)}
                  >
                    <EditIcon size="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <DeleteIcon size="small" />
                  </IconButton>{" "}
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
        sx={{ display: "flex", justifyContent: "center", mt: 2, mx: "auto" }}
      />

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <DialogTitle>Add Product</DialogTitle>

        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />

          <TextField
            label="Price"
            fullWidth
            type="number"
            margin="dense"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />

          <TextField
            label="Category"
            fullWidth
            margin="dense"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsAddOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddProduct}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={selectedProduct?.title || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, title: e.target.value })
            }
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            margin="dense"
            value={selectedProduct?.price || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, price: e.target.value })
            }
          />
          <TextField
            label="Category"
            fullWidth
            margin="dense"
            value={selectedProduct?.category || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                category: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateProduct}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
