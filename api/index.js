module.exports = (req, res) => {
  const now = new Date();

  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
};