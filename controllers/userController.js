const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const sendVerificationSMS = catchAsync(async(req, res) => {
    let { userName, userPhoneNumber, userEmail } = req.body

    if(!userName||!userPhoneNumber||!userEmail) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 400;

        throw error
    }

    userName = userName.toString();
    userPhoneNumber = userPhoneNumber.toString();
    userEmail = userEmail.toString();

    const randomFourDigit = String(Math.floor(Math.random()*(10000-1000)) + 1000);

    let SMS = await userService.checkUserByPhoneNEmail(userName, userPhoneNumber, randomFourDigit, userEmail);

    if(SMS.statusCode === '202') {
        SMS = '인증번호를 문자로 발송했습니다. 3분 내 인증을 완료해주세요'
    };

    res.status(200).json({'SMS':SMS});
});

const contrastVerificationCode = catchAsync(async(req, res) => {
    let { userPhoneNumber, userKeyInCode } = req.body;

    if(!userPhoneNumber||!userKeyInCode) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
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
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 400;

        throw error
    };

    userPhoneNumber = userPhoneNumber.toString();
    
    let result = await userService.deleteUser(userPhoneNumber);

    if (result['affectedRows']===1) {
        
        result = `${userPhoneNumber}은 인증에 실패하였거나 시간초과로 삭제되었습니다. 재전송해주세요`
    }
    res.status(200).json({ 'message':result });
});

const clientSignup = catchAsync(async(req,res) => {

    let { companyName, companyRegistrationNumber, companyEmail, userName, userEmail, userPhoneNumber } = req.body;
    const { companyPassword } = req.body;

    if(!companyName||!companyRegistrationNumber||!companyEmail||!companyPassword||!userName||!userEmail||!userPhoneNumber) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 400;

        throw error
    }

    companyName = companyName.toString().trim();
    companyRegistrationNumber = +companyRegistrationNumber;
    companyEmail = companyEmail.toString();
    userName = userName.toString();
    userEmail = userEmail.toString();
    userPhoneNumber = userPhoneNumber.toString();

    let result = await userService.clientSignup(companyName, companyRegistrationNumber, companyEmail, companyPassword, userName, userEmail, userPhoneNumber);

    if (result['affectedRows']===1) result = `환영합니다! 회원가입에 성공했습니다`;

    res.status(201).json({ 'message' : result });
});

const clientSignin = catchAsync(async(req, res) => {
    
    let { companyEmail } = req.body;
    const { companyPassword } = req.body;

    if (!companyEmail||!companyPassword) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 400;

        throw error
    }

    companyEmail = companyEmail.toString();

    const jwtAccessToken = await userService.clientSignin(companyEmail, companyPassword);
    res.status(200).json({ 'accessToken':jwtAccessToken, 'message':'로그인 되었습니다'});
});

// -- UP -- 회원가입/로그인: client/user 회원가입 구현 -- UP --
// --------------------------------------

const branchSignup = catchAsync(async(req, res) => {

    let { branchName, branchAddress, branchEmail, userName, userEmail, userPhoneNumber } = req.body;
    const { branchPassword } = req.body;

    if (!branchName||!branchAddress||!branchEmail||!branchPassword||!userName||!userEmail||!userPhoneNumber) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 400

        throw error
    }

    branchName = branchName.toString().trim();
    branchAddress = branchAddress.toString();
    branchEmail = branchEmail.toString();
    userName = userName.toString();
    userEmail = userEmail.toString();
    userPhoneNumber = userPhoneNumber.toString();

    let result = await userService.branchSignup(branchName, branchAddress, branchEmail, branchPassword, userName, userEmail, userPhoneNumber);

    if(typeof(result) === 'number') {
        result = `환영합니다! 별따러가자 ${branchName} 및 관리자 생성을 성공했습니다!`
    };
    
    res.status(201).json({ 'message' : result });
});

const adminSignin = catchAsync(async(req, res) => {

    let { branchEmail } = req.body;
    const { branchPassword } = req.body;

    if (!branchEmail||!branchPassword) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 400

        throw error
    }

    branchEmail = branchEmail.toString();

    const accessToken = await userService.adminSignin(branchEmail, branchPassword);

    const branch = await userService.getAdminByBranchEmail(branchEmail);
    const branchName = branch['branchName'];
    const adminId = branch['adminId'];

    res.status(200).json({ 'accessToken' : accessToken, 'adminId' : adminId, 'message' : `별따러가자 ${branchName} 관리자 로그인 되었습니다` });
});

// -- UP -- 회원가입: branch/user/admin -- UP --
// --------------------------------------

const riderKakaoSignup = catchAsync(async(req, res) => {

    const { authorizationCode } = req.body;
    let { companyRegistrationNumber, userName, userEmail, userPhoneNumber } = req.body;

    if (!authorizationCode||!companyRegistrationNumber||!userName||!userEmail||!userPhoneNumber) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 401;
        
        throw error
    }

    companyRegistrationNumber = +companyRegistrationNumber;
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

    const insertId = await userService.riderKakaoSignup(kakaoId, companyRegistrationNumber, userName, userEmail, userPhoneNumber);
    res.status(201).json({ 'insertId': insertId });
    
});

const riderKakaoSignin = catchAsync(async(req, res) => {
    
    const { authorizationCode } = req.body;

    if(!authorizationCode) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 401;

        throw error
    }

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
    
    const accessToken = await userService.riderKakaoSignin(kakaoId);
    res.status(201).json({ 'accessToken':accessToken, 'message':'로그인 되었습니다' });
});

const riderGoogleSignup = catchAsync(async(req, res) => {

    const { googleAccessToken } = req.body;
    let { companyRegistrationNumber, userName, userEmail, userPhoneNumber } = req.body;

    if (!googleAccessToken||!companyRegistrationNumber||!userName||!userEmail||!userPhoneNumber) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 401;
        
        throw error
    }

    companyRegistrationNumber = +companyRegistrationNumber;
    userName = userName.toString();
    userEmail = userEmail.toString();
    userPhoneNumber = userPhoneNumber.toString();

    const googleUserInfo = await userService.googleUserInfo(googleAccessToken);
    
    if (!googleUserInfo) {
        const error = new Error('CANNOT_GET_GOOGLE_USERINFO');
        error.statusCode = 401;
        
        throw error
    };

    const googleId = googleUserInfo['id'];

    const insertId = await userService.riderGoogleSignup(googleId, companyRegistrationNumber, userName, userEmail, userPhoneNumber);
    res.status(201).json({ 'insertId': insertId });
    
});

const riderGoogleSignin = catchAsync(async(req, res) => {
    
    const { googleAccessToken } = req.body;

    if (!googleAccessToken) {
        const error = new Error('GOOGLE_ACCESSTOKEN_IS_NOT_VALID');
        error.statusCode = 401;
        
        throw error
    };

    const googleUserInfo = await userService.googleUserInfo(googleAccessToken);

    if (!googleUserInfo) {
        const error = new Error('CANNOT_GET_GOOGLE_USERINFO');
        error.statusCode = 401;
        
        throw error
    };

    const googleId = googleUserInfo['id'];
    
    const accessToken = await userService.riderGoogleSignin(googleId);
    res.status(201).json({ 'accessToken':accessToken, 'message':'로그인 되었습니다' });
});

const riderNormalSignup = catchAsync(async(req, res) => {

    let { companyRegistrationNumber, userName, userEmail, userPhoneNumber } = req.body;
    const { userPassword } = req.body;

    if (!companyRegistrationNumber||!userName||!userEmail||!userPassword||!userPhoneNumber) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 401;

        throw error
    }

    companyRegistrationNumber = +companyRegistrationNumber;
    userName = userName.toString();
    userEmail = userEmail.toString();
    userPhoneNumber = userPhoneNumber.toString();
    
    const insertId = await userService.riderNormalSignup(companyRegistrationNumber, userName, userEmail, userPassword, userPhoneNumber);
    res.status(201).json({ 'result':insertId });

});

const riderNormalSignin = catchAsync(async(req, res) => {

    let { userEmail } = req.body;
    const { userPassword } = req.body;

    if (!userEmail||!userPassword) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 401;

        throw error
    }

    userEmail = userEmail.toString();

    const jwtAccessToken = await userService.riderNormalSignin(userEmail, userPassword);
    res.status(200).json({ 'accessToken':jwtAccessToken, 'message':'로그인 되었습니다' });
});

const riderKakaoRegister = catchAsync(async(req, res) => {
    
    const { authorizationCode } = req.body;

    if(!authorizationCode) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 401;

        throw error
    }

    const kakaoAccessToken = await userService.kakaoAccessToken(authorizationCode);

    if (!kakaoAccessToken) {
        const error = new Error('KAKAO_ACCESSTOKEN_IS_NOT_VALID');
        error.statusCode = 401;
        
        throw error
    };
    
    const accessToken = await userService.riderKakaoRegister(kakaoAccessToken);

    res.status(201).json({ 'accessToken':accessToken, 'message':'로그인 되었습니다' });
});

const riderGoogleRegister = catchAsync(async(req, res) => {

    const { googleAccessToken } = req.body;

    if(!googleAccessToken) {
        const error = new Error('필수 항목들을 모두 기입했는지 확인해주세요');
        error.statusCode = 401;

        throw error
    }

    const accessToken = await userService.riderGoogleRegister(googleAccessToken);
    res.status(201).json({ 'accessToken':accessToken, 'message':'로그인 되었습니다' });
});

// -- UP -- 회원가입/로그인: user/rider -- UP --
// --------------------------------------

module.exports = {
    sendVerificationSMS,
    contrastVerificationCode,
    deleteUser,
    clientSignup,
    clientSignin,
    branchSignup,
    adminSignin,
    riderKakaoSignup,
    riderKakaoSignin,
    riderGoogleSignup,
    riderGoogleSignin,
    riderNormalSignup,
    riderNormalSignin,
    riderKakaoRegister,
    riderGoogleRegister
}