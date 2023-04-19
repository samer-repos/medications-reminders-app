const Redis = require("ioredis");

const redis = new Redis({
  host: "localhost",
  port: "6379",
  password: "",
});

exports.getMedications = async () => JSON.parse(await redis.get("medications"));

exports.redis = redis;
