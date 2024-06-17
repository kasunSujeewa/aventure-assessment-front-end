import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_AVENTURE_ASSESSMENT_LOCAL_API_BASE_URL}/products`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const postProduct = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_AVENTURE_ASSESSMENT_LOCAL_API_BASE_URL}/products`,
      { title: data }
    );
    return response.data;
  } catch (error) {
    console.error("Error storing product:", error);
    throw error;
  }
};

export const editProduct = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_AVENTURE_ASSESSMENT_LOCAL_API_BASE_URL}/products/` +
        id,
      {
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
      },
      { "Access-Control-Allow-Origin": "*" }
    );
    return response.data;
  } catch (error) {
    console.error("Error storing product:", error);
    throw error;
  }
};

export const deleteProduct = async (data) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_AVENTURE_ASSESSMENT_LOCAL_API_BASE_URL}/products/` +
        data
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
