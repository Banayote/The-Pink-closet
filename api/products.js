// /api/products.js

let products = [];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Return all products
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, description, price, imageUrl } = req.body;
    if (!name || !description || !price || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newProduct = { 
      id: products.length + 1, 
      name, 
      description, 
      price, 
      image_url: imageUrl  // Ensure 'image_url' is used here
    };
    products.push(newProduct);

    res.status(201).json({ message: 'Product added!', product: newProduct });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
