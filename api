// /api/products.js

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Respond with a list of products (just a mock example)
    res.status(200).json([
      {
        id: 1,
        name: 'Product 1',
        description: 'This is the first product.',
        price: 19.99,
        imageUrl: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'This is the second product.',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/150'
      }
    ]);
  } else if (req.method === 'POST') {
    // Logic for adding a new product (you can add real implementation here)
    const { name, description, price, imageUrl } = req.body;
    res.status(200).json({ message: 'Product added successfully!', product: { name, description, price, imageUrl } });
  } else {
    // If the method is not GET or POST
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
