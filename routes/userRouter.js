const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/sendSMS', userController.sendVerificationSMS);
router.post('/contrastCode', userController.contrastVerificationCode);
router.post('/clientSignup', userController.clientSignup);
router.post('/branchSignup', userController.branchSignup);
router.post('/riderKakaoSignup', userController.riderKakaoSignup);
router.post('/riderNormalSignup', userController.riderNormalSignup);
router.post('/riderNormalSignin', userController.riderNormalSignin)
router.delete('', userController.deleteUser);

module.exports = router;