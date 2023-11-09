import RedisClient from "../redis/RedisClient.js";
class UserMiddlewares {
    async userFilter(req, res, next) {
      try {
        next();
      } catch (error) {
        next(error);
      }
    }

    async saveToRedis(req, res, next) {
      if (req.method === 'POST') {
          const user = req.body;
          const userListKey = 'userList';

          const redisClient = RedisClient.getInstance();
          await redisClient.connect();

          const isMaster = await redisClient.isMaster();
          if (isMaster) {
            const userCacheData = await redisClient.get(userListKey);
            const updatedUserList = userCacheData ? [...JSON.parse(userCacheData), user] : [user];
            
            console.log("updatedUserList: ", updatedUserList);
            await redisClient.set(userListKey, JSON.stringify(updatedUserList));
          } else {
            console.warn("Bu Redis sunucusu bir slave. Yazma işlemi yapılamaz.");
          }
      }
      next(); 

    }
  }
  export default UserMiddlewares