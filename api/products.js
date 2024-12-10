// api/products.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Path to the JSON file that contains your products
        const filePath = path.join(process.cwd(), 'api', 'products.json');
        
        // Read the contents of the products.json file
        const fileData = fs.readFileSync(filePath, 'utf-8');
        
        // Parse the file data as JSON
        const products = JSON.parse(fileData);

        // Send back the products as a JSON response
        res.status(200).json(products);
    } else {
        // If the method is not GET, return Method Not Allowed
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

