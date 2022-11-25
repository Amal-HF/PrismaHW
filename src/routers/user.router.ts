import express from 'express';
import validate from '../middleware/validate';
import { 
    getUserHandler,
    addUserHandler,
    // getUserByIDHandler,
    // getUserByAgeHandler
} from '../controllers/user.controller';
import { 
    userSchema,
    userParamsSchema
 } from '../Zod.schema/user.schema';

const router = express.Router();

router.get('/', getUserHandler);
router.post('/', validate(userSchema), addUserHandler);
// router.get('/:id', validate(userParamsSchema), getUserByIDHandler);
// router.get('/age/:id', validate(userParamsSchema), getUserByAgeHandler);

export default router;