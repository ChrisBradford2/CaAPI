import { router } from "../utils/utils";

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/user/:id', userCtrl.modifyUser);
router.delete('/user/:id', userCtrl.deleteUser);

module.exports = router;
