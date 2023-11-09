import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import UserMiddlewares from '../middlewares/UserMiddlewares.js';
const userController = new UserController();
const userMiddlewares = new UserMiddlewares();

const router = Router();

router.get('/get-users', userController.getUsers);
router.post('/save-user', userMiddlewares.saveToRedis, userController.saveUser);

export default router;