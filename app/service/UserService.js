import Users from '../models/Users.js';
import RedisClient from "../redis/RedisClient.js";
class UserService {
    static async getUsers() {
        try {
            const users = null;
            const userListKey = 'userList';
            
            const redisClient = RedisClient.getInstance();
            const userCacheData = await redisClient.get(userListKey);

            if (userCacheData) {
                users = JSON.parse(redisData);
              } else {
                users = await Users.find({}, { password: 0 }); 
              }
              return users;
            
        } catch (error) {
            return await Users.find({}, { password: 0 }); 
        }
    }

    static async saveUser(newUser) {
        try {
            const user = new Users({...newUser});
            await user.save();
          } catch (error) {
            throw error;
          }
    }
}

export default UserService;