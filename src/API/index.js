export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Log the entire response to understand its structure
      return data;
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
    });
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts/")
    .then((res) => res.json())
    .then((data) => {
      console.log("Revenue Data:", data); // Log the entire response to understand its structure
      return data;
    })
    .catch((error) => {
      console.error("Error fetching revenue:", error);
    });
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log("Inventory Data:", data); // Log the entire response to understand its structure
      return data;
    })
    .catch((error) => {
      console.error("Error fetching inventory:", error);
    });
};

export const getCustomers = () => {
  return fetch("http://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      console.log("Customer Data:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching customer:", error);
    });
};
