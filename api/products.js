// /api/products.js

// Simulated database (for simplicity; not persistent)
let products = [];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Return all products
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    // Add a new product
    const { name, description, price, imageUrl } = req.body;
    if (!name || !description || !price || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new product and add it to the array
    const newProduct = { id: products.length + 1, name, description, price, imageUrl };
    products.push(newProduct);

    res.status(201).json({ message: 'Product added!', product: newProduct });
  } else {
    // Method not allowed
    res.status(405).json({ error: 'Method not allowed' });
  }
};
