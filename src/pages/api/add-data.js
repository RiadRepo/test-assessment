
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { productData } = req.body;
        return res.status(200).json({
            productData
        });
    } catch (error) {
        console.error('Error calculating GST:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
