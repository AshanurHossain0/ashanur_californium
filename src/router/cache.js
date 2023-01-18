const redis = require("redis");
const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
    11496,
    "redis-11496.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
  );
  redisClient.auth("cTu8VlJIruKaCyQRBdRy1J5XzGvsIEoZ", function (err) {
    if (err) throw err;
  });     
  
  redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
  }); 

//set and get functions of redis
  const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);//to create data in cache memory.
  const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);//to get data from cache memory.


  module.exports ={redisClient,SET_ASYNC,GET_ASYNC}