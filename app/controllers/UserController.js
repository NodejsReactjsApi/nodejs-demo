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

    async saveUser(req, res) {
        try {
            const user = new Users({
              username: req.body.name,
              password: req.body.password,
              email: req.body.email,
            });
        
            await user.save();
        
            res.status(201).json(user);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Kullanıcı eklenirken hata oluştu.' });
          }
    }
}

export default UserController;