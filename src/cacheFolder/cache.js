const redis=require("redis")
const { promisify } = require("util");

//1. Connect to the redis server
const redisClient = redis.createClient(
  18213,
  "redis-18213.c305.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("CiaIJQSQY0HfIVGLILV1yQFtLDU7S4az", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});



//2. Prepare the functions for each command

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

module.exports={SET_ASYNC,GET_ASYNC}
