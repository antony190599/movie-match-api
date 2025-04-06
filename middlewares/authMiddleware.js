export const authMiddleware = (req, res, next) => {
    // Bypass authentication for the /docs route
    if (req.path.startsWith('/docs')) {
        return next();
    }
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;
  console.log(`API Key: ${apiKey}`);


  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }

  next();
};
