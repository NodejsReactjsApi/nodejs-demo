import Users from '../models/Users.js';
class UserService {
    static async getUsers() {
        try {
            const users = await Users.find({}, { password: 0 }); 
            return users;
        } catch (error) {
            throw error;
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