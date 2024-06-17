import "./App.css";
import Grid from "@mui/material/Unstable_Grid2";
import { ProductAddingBar } from "./components/ProductAddingBar";
import { ProductList } from "./components/ProductList";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function App() {
  const [newCreatedProduct, setnewCreatedProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("Success");

  const handleProductCreate = (newProduct, message, type) => {
    setnewCreatedProduct(newProduct);
    setMessage(message);
    setSuccess(type);
    setOpen(true);
  };

  const getMessageForShow = (message, type) => {
    setMessage(message);
    console.log(type);
    setSuccess(type);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="App">
      <Grid container spacing={2} className="containerHeader">
        <Grid xs={1} lg={3}></Grid>
        <Grid xs={10} lg={6} className="productAddingHeader">
          <ProductAddingBar onProductCreate={handleProductCreate} />
        </Grid>
        <Grid xs={1} lg={3}></Grid>
      </Grid>
      <Grid container padding={4}>
        <ProductList
          getMessage={getMessageForShow}
          newProduct={newCreatedProduct}
        />
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
