import fetch from 'node-fetch';

let products = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, price, imageBase64 } = req.body;

    if (!name || !description || !price || !imageBase64) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Cloudinary URL and Upload Preset
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dnfavv3ud/upload';
      const uploadPreset = 'BANYOTE';  // Cloudinary upload preset

      // Upload image to Cloudinary
      const cloudinaryResponse = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: JSON.stringify({
          file: imageBase64,
          upload_preset: uploadPreset,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const imageData = await cloudinaryResponse.json();

      if (!imageData.secure_url) {
        return res.status(500).json({ error: 'Failed to upload image' });
      }

      // Create a new product
      const newProduct = {
        id: products.length + 1,
        name,
        description,
        price,
        imageUrl: imageData.secure_url,
      };
      products.push(newProduct);

      res.status(201).json({ message: 'Product added!', product: newProduct });
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
