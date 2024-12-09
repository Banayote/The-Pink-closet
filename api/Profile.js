import { connectToDatabase } from './_db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query;

        // Validate input
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        try {
            const db = await connectToDatabase();
            const collection = db.collection('users');

            // Fetch user data
            const user = await collection.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Remove sensitive data before sending the response
            const { password, ...safeUser } = user;

            res.status(200).json(safeUser);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Failed to fetch user data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
