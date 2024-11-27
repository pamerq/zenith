const sendResponse = (res, status, data, message = null) => {
  res.status(status).json({ data, message });
};

const handleError = (res, error, customMessage) => {
  console.error(customMessage, error);
  res.status(500).json({ message: customMessage });
};

module.exports = { sendResponse, handleError };
