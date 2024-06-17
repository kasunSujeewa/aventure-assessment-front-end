import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { postProduct } from "../services/api";

export const ProductAddingBar = ({ onProductCreate }) => {
  const [productTitle, setproductTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const onKeypressEvent = (e) => {
    e.preventDefault();
    setOpen(true);

    const postProducts = async () => {
      try {
        const product = await postProduct(productTitle);
        setproductTitle("");
        onProductCreate(product, product.message, !product.error);
        setOpen(false);
      } catch (error) {
        console.error("Error Creating Products:", error);
        setOpen(false);
        onProductCreate([], "Error Creating Products:", false);
      }
    };
    postProducts();
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        onSubmit={(e) => onKeypressEvent(e)}
      >
        <InputBase
          sx={{ ml: 3, flex: 1 }}
          placeholder="Add Your Product"
          inputProps={{ "aria-label": "Add Your Product" }}
          onChange={(e) => setproductTitle(e.target.value)}
          value={productTitle}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          type="submit"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </>
  );
};
