exports.handleError = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
  };

exports.handleNotFound = (res) => {
    res.status(404).json({ error: 'Not Found' });
  };

exports.handleServerError = (res, err) => {
    console.error('Internal Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  