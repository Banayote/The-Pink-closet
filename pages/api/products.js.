export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, description, price, image_url } = req.body;

        // Validate required fields
        if (!name || !description || !price || !image_url) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            // You would add the product to your database here, if needed.
            // For now, we are assuming the data is stored in a temporary array.

            // Simulate adding the product to a database or storage
            const product = { name, description, price, image_url };

            // Return the success response with the product details
            return res.status(201).json({ message: 'Product added successfully', product });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to add product', details: error.message });
        }
    } else if (req.method === 'GET') {
        // Simulate returning products (if you stored them)
        const products = []; // Temporary array, you can replace this with actual storage
        return res.status(200).json(products);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
