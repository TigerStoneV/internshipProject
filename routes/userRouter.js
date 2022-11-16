const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/sendSMS', userController.sendVerificationSMS);
router.post('/contrastCode', userController.contrastVerificationCode);
router.post('/clientSignup', userController.clientSignup);
router.post('/clientSignin', userController.clientSignin);
router.post('/branchSignup', userController.branchSignup);
router.post('/adminSignin', userController.adminSignin);
router.post('/riderNormalSignup', userController.riderNormalSignup);
router.post('/riderNormalSignin', userController.riderNormalSignin);
router.post('/riderKakaoSignup', userController.riderKakaoSignup);
router.post('/riderKakaoSignin', userController.riderKakaoSignin);
router.post('/riderGoogleSignup', userController.riderGoogleSignup);
router.post('/riderGoogleSignin', userController.riderGoogleSignin);
router.post('/riderKakaoRegister', userController.riderKakaoRegister); // 임시기능
router.post('/riderGoogleRegister', userController.riderGoogleRegister); // 임시기능
router.delete('', userController.deleteUser);

module.exports = router;