const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const sendVerificationSMS = catchAsync(async(req, res) => {
    let { userName, userPhoneNumber, userEmail } = req.body

    if(!userName||!userPhoneNumber||!userEmail) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    userName = userName.toString();
    userPhoneNumber = userPhoneNumber.toString();
    userEmail = userEmail.toString();

    const randomFourDigit = String(Math.floor(Math.random()*(10000-1000)) + 1000);

    const SMS = await userService.checkUserByPhoneNEmail(userName, userPhoneNumber, randomFourDigit, userEmail);
    res.status(200).json({'SMS':SMS});
});

const contrastVerificationCode = catchAsync(async(req, res) => {
    let { userPhoneNumber, userKeyInCode } = req.body;

    if(!userPhoneNumber||!userKeyInCode) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    userPhoneNumber = userPhoneNumber.toString();
    userKeyInCode = userKeyInCode.toString();
    
    const verification =  await userService.contrastVerificationCode(userPhoneNumber, userKeyInCode);
    res.status(200).json({ 'verification': verification })
});

const deleteUser = catchAsync(async(req, res) => {
    let { userPhoneNumber } = req.body;

    if(userPhoneNumber===undefined) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    };

    userPhoneNumber = userPhoneNumber.toString();
    
    const result = await userService.deleteUser(userPhoneNumber);
    res.status(200).json({ 'result':result });
});

const clientSignup = catchAsync(async(req,res) => {
    let { companyName, companyRegistrationNumber, companyEmail, userName, userEmail, userPhoneNumber } = req.body;
    const { companyPassword } = req.body;

    if(!companyName||!companyRegistrationNumber||!companyEmail||!companyPassword||!userName||!userEmail||!userPhoneNumber) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }

    companyName = companyName.toString().trim();
    companyRegistrationNumber = companyRegistrationNumber.toString();
    companyEmail = companyEmail.toString();
    userName = userName.toString();
    userEmail = userEmail.toString();
    userPhoneNumber = userPhoneNumber.toString();

    const result = await userService.clientSignup(companyName, companyRegistrationNumber, companyEmail, companyPassword, userName, userEmail, userPhoneNumber);
    res.status(201).json({ 'result' : result });
});
// -- UP -- 회원가입: client/user 회원가입 구현 -- UP --
// --------------------------------------

const branchSignup = catchAsync(async(req, res) => {
    let { branchName, branchAddress, branchEmail, userName, userEmail, userPhoneNumber } = req.body;
    const { branchPassword } = req.body;

    if (!branchName||!branchAddress||!branchEmail||!branchPassword||!userName||!userEmail||!userPhoneNumber) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400

        throw error
    }

    branchName = branchName.toString().trim();
    branchAddress = branchAddress.toString();
    branchEmail = branchEmail.toString();
    userName = userName.toString();
    userEmail = userEmail.toString();
    userPhoneNumber = userPhoneNumber.toString();

    const result = await userService.branchSignup(branchName, branchAddress, branchEmail, branchPassword, userName, userEmail, userPhoneNumber);
    res.status(201).json({ "result" : result });
});
// -- UP -- 회원가입: branch/user/admin -- UP --
// --------------------------------------

const riderKakaoSignup = catchAsync(async(req, res) => {

    const { authorizationCode } = req.body;
    let { companyRegistrationNumber, userName, userEmail, userPhoneNumber } = req.body;

    if (!authorizationCode||!companyRegistrationNumber||!userName||!userEmail||!userPhoneNumber) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 401;
        
        throw error
    }

    companyRegistrationNumber = companyRegistrationNumber.toString();
    userName = userName.toString();
    userEmail = userEmail.toString();
    userPhoneNumber = userPhoneNumber.toString();

    const kakaoAccessToken = await userService.kakaoAccessToken(authorizationCode);

    if (!kakaoAccessToken) {
        const error = new Error('KAKAO_ACCESSTOKEN_IS_NOT_VALID');
        error.statusCode = 401;
        
        throw error
    };

    const kakaoId = await userService.kakaoUserInfo(kakaoAccessToken);

    if (!kakaoId) {
        const error = new Error('KAKAO_ID_IS_NOT_VALID');
        error.statusCode = 401;
        
        throw error
    };

    const insertId = await userService.riderKakaoSignup(kakaoId, companyRegistrationNumber, userName, userEmail, userPhoneNumber);
    res.status(201).json({ 'insertId': insertId });
    
});

const riderNormalSignup = catchAsync(async(req, res) => {

    let { companyRegistrationNumber, userName, userEmail, userPhoneNumber } = req.body;
    const { userPassword } = req.body;

    if (!companyRegistrationNumber||!userName||!userEmail||!userPassword||!userPhoneNumber) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 401;

        throw error
    }

    companyRegistrationNumber = companyRegistrationNumber.toString();
    userName = userName.toString();
    userEmail = userEmail.toString();
    userPhoneNumber = userPhoneNumber.toString();
    
    const insertId = await userService.riderNormalSignup(companyRegistrationNumber, userName, userEmail, userPassword, userPhoneNumber);
    res.status(201).json({ 'insertId':insertId });

});

const riderNormalSignin = catchAsync(async(req, res) => {

    let { userEmail } = req.body;
    const { userPassword } = req.body;

    if (!userEmail||!userPassword) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 401;

        throw error
    }

    userEmail = userEmail.toString();

    const jwtAccessToken = await userService.riderNormalSignin(userEmail, userPassword);
    res.status(200).json({ 'accessToken':jwtAccessToken });
});

// -- UP -- 회원가입: user/rider -- UP --
// --------------------------------------

module.exports = {
    sendVerificationSMS,
    contrastVerificationCode,
    deleteUser,
    clientSignup,
    branchSignup,
    riderKakaoSignup,
    riderNormalSignup,
    riderNormalSignin
}