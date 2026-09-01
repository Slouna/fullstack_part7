const app = require("./app");
const path = require("path");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong", time: new Date().toISOString() });
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
