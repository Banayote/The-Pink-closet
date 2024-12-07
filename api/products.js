// /api/products.js
let products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1",
    price: 29.99,
    imageUrl: "https://res.cloudinary.com/dnfavv3ud/image/upload/v1733579759/sy4gb9lcs0gs1mtowihg.jpg"
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2",
    price: 49.99,
    imageUrl: "https://res.cloudinary.com/dnfavv3ud/image/upload/v1733579759/sy4gb9lcs0gs1mtowihg.jpg"
  }
];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
