import UserService from "../service/UserService.js";
class UserController {
    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers(); 
            res.json({ success: true, users });
        } catch (error) {
            res.json({ success: false, message: 'Kullanıcılar getirilemedi.' });
        }
    }

    async saveUser(req, res) {
        try {
            const newUser = req.body;
            const user = await UserService.createUser(newUser);
            res.status(201).json(user);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Kullanıcı eklenirken hata oluştu.' });
          }
    }
}

export default UserController;