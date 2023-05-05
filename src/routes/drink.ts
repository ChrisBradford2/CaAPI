import { router } from "../utils/utils";
import limiter from "../utils/ratelimit";

const auth = require('../middleware/auth');
const drinkCtrl = require('../controllers/drink');

router.post('/', auth, limiter, drinkCtrl.createDrink);
router.put('/:id', auth, limiter, drinkCtrl.modifyDrink);
router.delete('/:id', auth, limiter, drinkCtrl.deleteDrink);
router.get('/', auth, limiter, drinkCtrl.getAllDrink);
router.get('/:id', auth, limiter, drinkCtrl.getOneDrink);

module.exports = router;
