let products = [];

export default (req, res) => {
  if (req.method === 'GET') {
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
      imageUrl,
    };
    products.push(newProduct);

    res.status(201).json({ message: 'Product added!', product: newProduct });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
