import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'products.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const products = JSON.parse(fileData);
        res.status(200).json(products);
    } else if (req.method === 'POST') {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const products = JSON.parse(fileData);

        const newProduct = req.body;
        products.push(newProduct);

        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
        res.status(201).json(newProduct);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
