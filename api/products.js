module.exports = (req, res) => {
  // Mock product data for GET request
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is the first product.',
      price: 19.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is the second product.',
      price: 29.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  // Handle GET request
  if (req.method === 'GET') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS support
    return res.status(200).json(products);
  }

  // Handle POST request
  if (req.method === 'POST') {
    const { name, description, price, imageUrl } = req.body;

    // Validate incoming data
    if (!name || !description || !price || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Add logic to store the product if needed
    return res.status(200).json({
      message: 'Product added successfully!',
      product: { name, description, price, imageUrl },
    });
  }

  // Handle unsupported methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ message: 'Method Not Allowed' });
};
