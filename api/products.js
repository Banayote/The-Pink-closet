// Example products array
const products = [
  { id: 1, name: "Product 1", description: "Description for product 1", price: 19.99, image_url: "image_url_1" },
  { id: 2, name: "Product 2", description: "Description for product 2", price: 29.99, image_url: "image_url_2" },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return the products array
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, description, price, image_url } = req.body;

    // Validate product data
    if (!name || !description || !price || !image_url) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    // Check if price is a valid number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      res.status(400).json({ message: "Price must be a valid positive number." });
      return;
    }

    // Create a new product with a unique ID
    const newProduct = {
      id: products.length + 1,
      name,
      description,
      price: parsedPrice,
      image_url,
    };

    // Add the new product to the array
    products.push(newProduct);

    // Respond with the newly created product
    res.status(201).json(newProduct);
  } else {
    // Method not allowed
    res.status(405).json({ message: "Method Not Allowed" });
  }
}


