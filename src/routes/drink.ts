import { router } from "../utils/utils";

const auth = require('../middleware/auth');
const drinkCtrl = require('../controllers/drink');

router.post('/', auth, drinkCtrl.createDrink);
router.put('/:id', auth, drinkCtrl.modifyDrink);
router.delete('/:id', auth, drinkCtrl.deleteDrink);
router.get('/', auth, drinkCtrl.getAllDrink);
router.get('/:id', auth, drinkCtrl.getOneDrink);

module.exports = router;
