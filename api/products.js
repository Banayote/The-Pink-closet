export default function handler(req, res) {
    let products = []; // Temporary storage
    if (req.method === 'POST') {
        const product = req.body;
        products.push(product);
        res.status(201).json({ message: 'Product added successfully', product });
    } else if (req.method === 'GET') {
        res.status(200).json(products);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
