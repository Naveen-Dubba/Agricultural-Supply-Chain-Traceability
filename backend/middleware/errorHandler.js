const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.message === 'Duplicate entry') {
    return res.status(409).json({ message: 'Record already exists' });
  }

  if (err.message === 'Not found') {
    return res.status(404).json({ message: 'Record not found' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
};

export default errorHandler;
