import Users from '../models/Users.js';
class UserController {
    async getUsers(req, res) {
        try {
            const users = await Users.find({}, { password: 0 }); 
            res.json({ success: true, users });
        } catch (error) {
            res.json({ success: false, message: 'Kullanıcılar getirilemedi.' });
        }
    }
}

export default UserController;