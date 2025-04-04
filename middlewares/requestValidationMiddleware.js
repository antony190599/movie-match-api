export const requestValidationMiddleware = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Bad Request: Request body is required.' });
    }
  }
  next();
};
