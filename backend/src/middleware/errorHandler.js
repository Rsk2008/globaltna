const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Resource not found (invalid ID)' });
  }
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(422).json({ message: messages.join(', ') });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;
