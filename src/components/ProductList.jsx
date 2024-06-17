import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Product } from "./Product";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getProducts } from "../services/api";

export const ProductList = ({ newProduct, getMessage }) => {
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = useState(true);

  const productDeleted = () => {
    setOpen(true);
  };
  const handleProductUpdated = () => {
    setOpen(true);
  };
  const getMessagefromProd = (data, type) => {
    getMessage(data, type);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProducts();
        setProductList(productData.data);
        setOpen(false);
      } catch (error) {
        console.error("Error fetching Products:", error);
        setOpen(false);
        getMessage("Error fetching Products", false);
      }
    };
    fetchProducts();
  }, [open, newProduct]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {productList.map((product, index) => (
            <Product
              key={index}
              product={product}
              onProducDelete={productDeleted}
              productUpdated={handleProductUpdated}
              getAlertMessage={getMessagefromProd}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};
