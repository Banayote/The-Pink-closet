import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const filePath = path.resolve('./api/product.json');

    if (req.method === 'GET') {
        // Fetch all products
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            res.status(200).json(JSON.parse(data));
        } catch (error) {
            res.status(500).json({ error: 'Failed to read products' });
        }
    } else if (req.method === 'POST') {
        // Add a new product
        const newProduct = req.body;

        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const products = JSON.parse(data);
            products.push(newProduct);

            fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save product' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
