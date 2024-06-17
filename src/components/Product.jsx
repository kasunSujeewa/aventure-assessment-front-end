import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteProduct, editProduct } from "../services/api";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";
import Badge from "@mui/material/Badge";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "40%",
    borderRadious: "8%",
  },
}));

const TruncatedText = ({ text, maxLength }) => {
  // Check if the text length is greater than the maxLength
  const truncated =
    text == null
      ? "No Description"
      : text.length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;

  // Return the truncated text using Typography
  return (
    <Typography sx={{ color: text == null ? "gray" : "black" }}>
      {truncated}
    </Typography>
  );
};

const TruncatedTitleText = ({ text, maxLength, qty }) => {
  // Check if the text length is greater than the maxLength
  const truncated =
    text == null
      ? "No Description"
      : text.length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;

  // Return the truncated text using Typography
  return (
    <Typography
      gutterBottom
      variant="h6"
      sx={{ fontWeight: "Bold" }}
      component="div"
    >
      <Badge color="secondary" badgeContent={qty}>
        {truncated}
      </Badge>
    </Typography>
  );
};

export const Product = ({
  product,
  onProducDelete,
  productUpdated,
  getAlertMessage,
}) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [titleError, settitleError] = useState(false);
  //const [selectedDeletingID, setselectedDeletingID] = useState("");
  const [openConfirmation, setopenConfirmation] = useState(false);
  const [erroMessage, seterroMessage] = useState("");
  const [productTitle, setproductTitle] = useState("");
  const [productDescription, setproductDescription] = useState(
    product.description
  );
  const [productPrice, setproductPrice] = useState("");
  const [productQty, setproductQty] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleDelete = (id) => {
    //setselectedDeletingID(id);
    setopenConfirmation(true);
  };
  const handleEditmodel = (product) => {
    setopenEdit(true);
    setproductDescription(product.description);
    setproductPrice(product.price);
    setproductQty(product.quantity);
    setproductTitle(product.title);
  };

  const confirmedDeleteing = () => {
    setopenConfirmation(false);
    setOpen(true);
    const deleteProducts = async () => {
      try {
        const response = await deleteProduct(product.id);
        onProducDelete(product.id);
        console.log(!response.error);
        getAlertMessage(response.message, !response.error);
        setOpen(false);
      } catch (error) {
        console.error("Error Deleting Product:", error);
        getAlertMessage("Error Deleting Products", false);
        setOpen(false);
      }
    };
    deleteProducts();
  };

  const titleOnchange = (e) => {
    setproductTitle(e.target.value);
    if (e.target.value == "") {
      settitleError(true);
    } else {
      settitleError(false);
    }
    //setselectedDeletingID("");
  };

  const handleClose = () => {
    setopenConfirmation(false);
    //setselectedDeletingID("");
  };

  const handleCloseEdit = () => {
    setopenEdit(false);
    //setselectedDeletingID("");
  };

  const handleUpdateSubmit = () => {
    setopenEdit(false);
    setOpen(true);

    const updateProducts = async () => {
      try {
        const response = await editProduct(product.id, {
          title: productTitle,
          description: productDescription,
          quantity: productQty,
          price: productPrice,
        });
        productUpdated();
        getAlertMessage(response.message, !response.error);
        setOpen(false);
      } catch (error) {
        console.error("Error Updating Products:", error);
        getAlertMessage("Error Updating Products", false);
        setOpen(false);
      }
    };
    updateProducts();
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid xs={6} md={4} lg={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{
              height: 140,
              backgroundSize: "cover",
              width: 200,
              backgroundPositionX: "center",
              backgroundPositionY: "center",
              alignItems: "center",
            }}
            image="https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk="
            title="green iguana"
          />
          <CardContent>
            <Chip
              icon={<AttachMoneyIcon />}
              style={{ float: "right" }}
              label={product.price}
              variant="outlined"
              color="warning"
            />

            <TruncatedTitleText
              text={product.title}
              maxLength={15}
              qty={product.quantity}
            />

            <hr />
            <TruncatedText text={product.description} maxLength={20} />
          </CardContent>
          <CardActions
            sx={{
              float: "inline-end",
            }}
          >
            <Button size="small" color="success">
              <EditIcon
                onClick={() => {
                  handleEditmodel(product);
                }}
              />
            </Button>
            <Button
              size="small"
              onClick={() => handleDelete(product.id)}
              color="error"
            >
              <DeleteIcon />
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={openConfirmation}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are You Sure, Do you want to delete this?"}
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
          <Button onClick={confirmedDeleteing} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <BootstrapDialog
        onClose={handleCloseEdit}
        aria-labelledby="customized-dialog-title"
        open={openEdit}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Product
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseEdit}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Input
            placeholder="Title"
            onChange={(e) => titleOnchange(e)}
            value={productTitle}
            fullWidth
            margin="dense"
            sx={{ marginBottom: "20px" }}
            error={titleError}
          />
          <Input
            placeholder="Price"
            onChange={(e) => setproductPrice(e.target.value)}
            value={productPrice}
            fullWidth
            margin="dense"
            sx={{ marginBottom: "20px" }}
          />
          <Input
            placeholder="Description"
            onChange={(e) => setproductDescription(e.target.value)}
            value={productDescription != null ? productDescription : ""}
            minRows={3}
            multiline
            fullWidth
            margin="dense"
            sx={{ marginBottom: "20px" }}
          />
          <Input
            placeholder="Quantity"
            value={productQty}
            onChange={(e) => setproductQty(e.target.value)}
            type="number"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={titleError} autoFocus onClick={handleUpdateSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
