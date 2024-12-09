import { connectToDatabase } from './_db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        try {
            const db = await connectToDatabase();
            const collection = db.collection('users');

            // Save user data
            const result = await collection.insertOne({ name, email, password });

            res.status(200).json({ message: 'User profile created successfully', id: result.insertedId });
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).json({ error: 'Failed to create user profile' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
