import { router } from "../utils/utils";
import limiter from "../utils/ratelimit";

const userCtrl = require('../controllers/user');

router.post('/signup', limiter, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.put('/user/:id', limiter, userCtrl.modifyUser);
router.delete('/user/:id', limiter, userCtrl.deleteUser);

module.exports = router;
