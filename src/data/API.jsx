// Define the function to fetch employee data
export async function fetchEmployeeData() {
  try {
    const response = await fetch("http://localhost:3001/UserAccount");
    if (!response.ok) {
      throw new Error("Failed to fetch employee data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Define the function to fetch Product data
export async function fetchProductData() {
  try {
    const response = await fetch("http://localhost:3001/Product");
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Define the function to fetch Order data
export async function fetchOrderData() {
  try {
    const response = await fetch("http://localhost:3001/Order");
    if (!response.ok) {
      throw new Error("Failed to fetch Order data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
