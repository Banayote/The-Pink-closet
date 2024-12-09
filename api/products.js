// Example products array
const products = [
  { id: 1, name: "Product 1", description: "Description for product 1", price: 19.99, image_url: "image_url_1" },
  { id: 2, name: "Product 2", description: "Description for product 2", price: 29.99, image_url: "image_url_2" },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(products); // Return products
  } else if (req.method === 'POST') {
    const { name, description, price, image_url } = req.body;

    // Validate product data
    if (!name || !description || !price || !image_url) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Create a new product with a unique ID
    const newProduct = {
      id: products.length + 1,
      name,
      description,
      price: parseFloat(price),
      image_url,
    };

    products.push(newProduct); // Add the new product to the list
    res.status(201).json(newProduct); // Return the added product
  } else {
    res.status(405).json({ message: "Method Not Allowed" }); // Handle unsupported methods
  }
}
