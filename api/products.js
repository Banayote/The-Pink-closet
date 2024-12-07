// /api/products.js

// Simulated database (for simplicity; not persistent)
let products = [];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Return all products
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    // Add a new product
    const { name, description, price, image_url } = req.body; // Correct field name 'image_url'

    // Check if all fields are provided
    if (!name || !description || !price || !image_url) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new product and add it to the array
    const newProduct = { 
      id: products.length + 1, 
      name, 
      description, 
      price, 
      image_url // Ensure the field name is consistent with what is being passed from the frontend
    };
    products.push(newProduct);

    // Return the newly created product
    res.status(201).json({ message: 'Product added!', product: newProduct });
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: 'Method not allowed' });
  }
};


