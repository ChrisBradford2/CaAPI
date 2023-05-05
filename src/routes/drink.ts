import { router } from "../utils/utils";
import limiter from "../utils/ratelimit";

const auth = require('../middleware/auth');
const drinkCtrl = require('../controllers/drink');

router.post('/',limiter, auth, drinkCtrl.createDrink);
router.put('/:id',limiter, auth, drinkCtrl.modifyDrink);
router.delete('/:id',limiter, auth, drinkCtrl.deleteDrink);
router.get('/',limiter, auth, drinkCtrl.getAllDrink);
router.get('/:id',limiter, auth, drinkCtrl.getOneDrink);

module.exports = router;
