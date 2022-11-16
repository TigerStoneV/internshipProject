const axios = require('axios');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');
const qs = require('qs');
const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');

const { SENS_ACCESSKEY, SENS_SECRETKEY, SENS_SERVICEID} = process.env;
const timestamp = String(Date.now());
const partialUrl = `/sms/v2/services/${SENS_SERVICEID}/messages`;

const makeSignature = async() => {
	const space = " ";
	const newLine = "\n";
	const method = "POST";

	var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SENS_SECRETKEY);
        hmac.update(method);
        hmac.update(space);
        hmac.update(partialUrl);
        hmac.update(newLine);
        hmac.update(timestamp);
        hmac.update(newLine);
        hmac.update(SENS_ACCESSKEY);

	const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

	return signature;
};

const sendAuthSMS = async (randomFourDigit, userPhoneNumber) => {
    const signature = await makeSignature();
    await userPhoneNumberRegularExpression(userPhoneNumber);

    const sendSMS = await axios({
        method: 'post',
        url: `https://sens.apigw.ntruss.com${partialUrl}`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': SENS_ACCESSKEY,
            'x-ncp-apigw-signature-v2': signature
        },
        data: {
                'type':'SMS',
                'contentType':'COMM',
                'countryCode':'82',
                'from':'01051509714',
                'subject':'별따러가자 핸드폰 인증',
                'content': '별따러가자 인증문자',
                'messages':[
                    {
                        'to': `${userPhoneNumber}`,
                        'subject':'별따러가자 핸드폰 인증',
                        'content': `별따러가자 본인확인 인증번호 [${randomFourDigit}]를 입력해주세요`
                    }
                ]
        }
    }).then(response => response.data);

    return sendSMS;
};

const checkUserByPhoneNEmail = async(userName, userPhoneNumber, randomFourDigit, userEmail) => { 
    
    await userPhoneNumberRegularExpression(userPhoneNumber);
    await emailRegularExpression(userEmail);

    const user = await userDao.checkUserByPhoneNEmail(userPhoneNumber, userEmail);

    if (!user)  {
        const checkUserByEmail = await userDao.getUserByEmail(userEmail);
        const checkUserByPhoneNumber = await userDao.getUserByPhoneNumber(userPhoneNumber);

        if(checkUserByEmail) {
            const error = new Error(`${userEmail}는 이미 가입된 사용자입니다`);
            error.statusCode = 400;

            throw error
        }

        if(checkUserByPhoneNumber) {
            const error = new Error(`${userPhoneNumber}는 이미 가입된 사용자입니다`);
            error.statusCode = 400;

            throw error
        }

        await userDao.createUserToVerifyByPhoneNumber(userName, userPhoneNumber, randomFourDigit, userEmail);
    }

    if (user) {
        const userInfo = await userDao.getUserByPhoneNumber(userPhoneNumber);
        const kakaoId = userInfo['userKakaoId'];
        const googleId = userInfo['userGoogleId'];
        const password = userInfo['userPassword'];
        const clientAdmin = userInfo['clientAdmin'];

        if (clientAdmin===1||kakaoId||googleId||password) {
            let platform = '';
            if(clientAdmin===1) {
                const clientId = userInfo['clientId'];
                const client = await userDao.getClientByClientId(clientId);
                const companyName = client['companyName'];
                
                platform = `${companyName}의 관리자로 `
            } else if (kakaoId) {
                platform = 'kakao로 '
            } else if (googleId) {
                platform = 'google로 '
            } else if (password) {
                platform = '일반 회원가입으로 '
            }

            const error = new Error(`${userPhoneNumber}는 이미 ${platform}가입된 사용자입니다`);
            error.statusCode = 400;

            throw error
        };

        await userDao.updateVerificationCode(userPhoneNumber, randomFourDigit);
    }

    return await sendAuthSMS(randomFourDigit, userPhoneNumber);
};

const deleteUser = async(userPhoneNumber) => {

    await userPhoneNumberRegularExpression(userPhoneNumber);

    const user = await userDao.getUserByPhoneNumber(userPhoneNumber);

    if(!user) {
        const error = new Error(`${userPhoneNumber}은 존재하지 않는 사용자입니다`);
        error.statusCode = 400;

        throw error
    }

    const result = await userDao.deleteUser(user.userId);
    return result
};

const contrastVerificationCode = async(userPhoneNumber, userKeyInCode) => {

    await userPhoneNumberRegularExpression(userPhoneNumber);

    const verification = await userDao.contrastVerificationCode(userPhoneNumber, userKeyInCode);

    if(verification) {return '휴대폰번호 인증 완료되었습니다'};

    if(!verification) {
        await deleteUser(userPhoneNumber);

        const error = new Error('인증번호가 일치하지 않습니다. 휴대폰번호를 재전송해주세요');
        error.statusCode = 400;

        throw error
    };
};

const userPhoneNumberRegularExpression = async(userPhoneNumber) => {
    
    const USER_PHONE_NUM_REGEX =/^(010)([0-9]{3,4})([0-9]{4})$/

    if(!USER_PHONE_NUM_REGEX.test(userPhoneNumber)) {
        const error = new Error(`휴대폰번호 형식이 올바르지 않습니다.'-'기호를 제외한 번호를 입력해주세요`);
        error.statusCode = 400;

        throw error
    }
};

const emailRegularExpression = async(email) => {
    const EMAILREGEX =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

    if(!EMAILREGEX.test(email)) {
        const error = new Error('메일주소 형식이 올바르지 않습니다');
        error.statusCode = 400;

        throw error
    }
};

const passwordRegularExpression = async(companyPassword) => {
    const PWREGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if(!PWREGEX.test(companyPassword)) {
        const error = new Error('비밀번호 형식이 올바르지 않습니다');
        error.statusCode = 400;

        throw error
    }
};

const companyRegistrationNumberRegularExpression = async(companyRegistrationNumber) => {
    const COMPANY_REGIST_NUM_REGEX =/^(?=.*[0-9]{10})/

    if(!COMPANY_REGIST_NUM_REGEX.test(companyRegistrationNumber)) {
        const error = new Error(`사업자등록번호 형식이 올바르지 않습니다. '-'기호를 제외하고 10자리 숫자만 입력해주세요`);
        error.statusCode = 400;

        throw error
    }
};

const hashPassword = async(plainPassword) => {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword, salt);
};

const checkHash = async(plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

const createJWTAccessToken = async(userId) => {

    const { ALGORITHM, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

    const jwtAccessToken = jwt.sign({'userId':userId}, JWT_SECRET, {
        algorithm: ALGORITHM,
        expiresIn: JWT_EXPIRES_IN
    });

    return jwtAccessToken;
};

const clientSignup = async(companyName, companyRegistrationNumber, companyEmail, companyPassword, userName, userEmail, userPhoneNumber) => {

    await companyRegistrationNumberRegularExpression(companyRegistrationNumber);
    await emailRegularExpression(companyEmail);
    await passwordRegularExpression(companyPassword);
    await emailRegularExpression(userEmail);
    await userPhoneNumberRegularExpression(userPhoneNumber);

    const clientName = await userDao.getClientByName(companyName);
    const clientRegistrationNumber = await userDao.getClientByRegistrationNumber(companyRegistrationNumber);
    const clientEmail = await userDao.getClientByEmail(companyEmail);

    if(clientName) {
        const error = new Error(`${companyName}은 이미 회원가입된 회사명 입니다`);
        error.statusCode = 401;

        throw error
    };

    if(clientRegistrationNumber) {
        const error = new Error(`${companyRegistrationNumber}은 이미 회원가입된 사업자등록번호 입니다`);
        error.statusCode = 401;

        throw error
    };

    if(clientEmail) {
        const error = new Error(`${companyEmail}은 이미 회원가입된 메일주소 입니다`);
        error.statusCode = 401;

        throw error
    };

    const hashedCompanyPassword = await hashPassword(companyPassword);

    return await userDao.clientSignup(companyName, companyRegistrationNumber, companyEmail, hashedCompanyPassword, userName, userEmail, userPhoneNumber);
};

const clientSignin = async(companyEmail, companyPassword) => {

    await passwordRegularExpression(companyPassword);
    await emailRegularExpression(companyEmail);

    const client = await userDao.getClientByEmail(companyEmail);

    if(!client) {
        const error = new Error('존재하지 않는 메일주소 입니다');
        error.statusCode = 401;

        throw error
    }

    const clientId = client['clientId'];

    const hashedCompanyPassword = client['hashedCompanyPassword'];
    const contrastPassword = await checkHash(companyPassword, hashedCompanyPassword);

    if(!contrastPassword) {
        const error = new Error('존재하지 않는 비밀번호 입니다');
        error.statusCode = 401;

        throw error
    }

    const user = await userDao.getClientAdminByClientId(clientId);

    return await createJWTAccessToken(user.userId);
}

// -- UP -- 회원가입: client/user 회원가입/로그인 구현 -- UP --
// --------------------------------------

const addressToCoordinates = async(address) => {
    
    const { KAKAO_REST_API_KEY } = process.env
    const beforeEncoding = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`
    const URL = encodeURI(beforeEncoding);

    const convert = await axios({
        method: 'get',
        url: URL,
        headers: {
            'Authorization': `KakaoAK ${KAKAO_REST_API_KEY}`
        }
    }).then(response => response.data.documents[0]);

    const coordinates = {};
    coordinates['x'] = convert['x'];
    coordinates['y'] = convert['y'];
    
    return coordinates
};

// -- UP -- 주소를 경위도 좌표로 변화 -- UP --
const branchSignup = async(branchName, branchAddress, branchEmail, branchPassword, userName, userEmail, userPhoneNumber) => {

    await passwordRegularExpression(branchPassword);
    await emailRegularExpression(branchEmail);
    await emailRegularExpression(userEmail);
    await userPhoneNumberRegularExpression(userPhoneNumber);

    const name = await userDao.getBranchByName(branchName).branchName;
    const email = await userDao.getBranchByEmail(branchEmail).branchEmail;

    if(name) {
        const error = new Error(`${name}은 이미 등록된 지점명 입니다`);
        error.statusCode = 401;

        throw error
    };

    if(email) {
        const error = new Error(`${email}은 이미 등록된 메일주소 입니다`);
        error.statusCode = 401;

        throw error
    };

    const hashedBranchPassword = await hashPassword(branchPassword);

    const coordinates = await addressToCoordinates(branchAddress);

    const branchLatitude = coordinates['x'];
    const branchLongitude = coordinates['y'];

    return await userDao.branchSignup(branchName, branchAddress, branchLatitude, branchLongitude, branchEmail, hashedBranchPassword, userName, userEmail, userPhoneNumber);
};

const getBranchByEmail = async(branchEmail) => {

    return await userDao.getBranchByEmail(branchEmail);
};

const getAdminByBranchEmail = async(branchEmail) => {

    return await userDao.getAdminByBranchEmail(branchEmail);
};

const adminSignin = async(branchEmail, branchPassword) => {

    await passwordRegularExpression(branchPassword);
    await emailRegularExpression(branchEmail);

    const branch = await userDao.getBranchByEmail(branchEmail);

    if(!branch) {
        const error = new Error(`${branchEmail}은 존재하지 않는 메일주소 입니다`);
        error.statusCode = 401;

        throw error
    }

    const hashedBranchPassword = branch['hashedBranchPassword'];
    const contrastPassword = await checkHash(branchPassword, hashedBranchPassword);

    if(!contrastPassword) {
        const error = new Error('존재하지 않는 비밀번호 입니다')
        error.statusCode = 401;

        throw error 
    }

    const branchId = branch['branchId'];
    const admin = await userDao.getAdminByBranchId(branchId);
    const adminId = admin['adminId'];

    return await createJWTAccessToken(adminId);
};

// -- UP -- 회원가입: branch/user/admin -- UP --
// --------------------------------------

const kakaoAccessToken = async(authorizationCode) => {

    const { KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI } = process.env;

    return await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
        'Content-type':'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: qs.stringify({
            grant_type: 'authorization_code',
            client_id: KAKAO_REST_API_KEY,
            redirect_uri: KAKAO_REDIRECT_URI,
            code: authorizationCode
        })
    }).then(response => response.data['access_token'])
    .catch(err => console.log("error " + err));
};

const kakaoUserInfo = async(kakaoAccessToken) => {

    return await axios ({
        method: 'get',
        url: 'https://kapi.kakao.com//v2/user/me',
        headers: {
            'Content-type':'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization': `Bearer ${kakaoAccessToken}`
        }
    }).then(response => response.data.id)
    .catch(err => console.log("error " + err));
};

const riderKakaoSignup = async(kakaoId, companyRegistrationNumber, userName, userEmail, userPhoneNumber) => {

    await emailRegularExpression(userEmail);
    await companyRegistrationNumberRegularExpression(companyRegistrationNumber);
    await userPhoneNumberRegularExpression(userPhoneNumber);

    const user = await userDao.getUserByKakaoId(kakaoId);

    if(user) {
        const error = new Error(`${userPhoneNumber}는 이미 kakao로 가입된 사용자입니다`)
        error.statusCode = 401;

        throw error 
    }

    const riderByPhoneNumber = await userDao.getRiderByuserPhoneNumber(userPhoneNumber);
    const riderByEmail = await userDao.getRiderByuserEmail(userEmail);

    if(riderByPhoneNumber) {
        const error = new Error(`${userPhoneNumber}는 이미 가입된 사용자입니다`)
        error.statusCode = 401;

        throw error 
    }

    if(riderByEmail) {
        const error = new Error(`${userEmail}는 이미 가입된 사용자입니다`)
        error.statusCode = 401;

        throw error 
    }

    return await userDao.riderKakaoSignup(kakaoId, companyRegistrationNumber, userName, userEmail, userPhoneNumber);
};

const riderKakaoSignin = async(kakaoId) => {

    const user = await userDao.getUserByKakaoId(kakaoId);
    
    return await createJWTAccessToken(user.userId);
};

const riderGoogleSignup = async(googleId, companyRegistrationNumber, userName, userEmail, userPhoneNumber) => {

    await emailRegularExpression(userEmail);
    await companyRegistrationNumberRegularExpression(companyRegistrationNumber);
    await userPhoneNumberRegularExpression(userPhoneNumber);

    const user = await userDao.getUserBygoogleId(googleId);

    if(user) {
        const error = new Error(`${userPhoneNumber}는 이미 google로 가입된 사용자입니다`)
        error.statusCode = 401;

        throw error 
    }

    const riderByPhoneNumber = await userDao.getRiderByuserPhoneNumber(userPhoneNumber);
    const riderByEmail = await userDao.getRiderByuserEmail(userEmail);

    if(riderByPhoneNumber) {
        const error = new Error(`${userPhoneNumber}는 이미 가입된 사용자입니다`)
        error.statusCode = 401;

        throw error 
    }

    if(riderByEmail) {
        const error = new Error(`${userEmail}는 이미 가입된 사용자입니다`)
        error.statusCode = 401;

        throw error 
    }

    return await userDao.riderGoogleSignup(googleId, companyRegistrationNumber, userName, userEmail, userPhoneNumber);
};

const riderGoogleSignin = async(googleId) => {

    const user = await userDao.getUserByGoogleId(googleId);
    
    return await createJWTAccessToken(user.userId);
};


const riderNormalSignup = async(companyRegistrationNumber, userName, userEmail, userPassword, userPhoneNumber) => {

    await passwordRegularExpression(userPassword);
    await emailRegularExpression(userEmail);
    await companyRegistrationNumberRegularExpression(companyRegistrationNumber);
    await userPhoneNumberRegularExpression(userPhoneNumber);

    const clientRegistrationNumber = await userDao.getClientByRegistrationNumber(companyRegistrationNumber);

    if(!clientRegistrationNumber) {
        const error = new Error('존재하지 않는 사업자등록번호 입니다. 소속 사업장에 문의해주세요')
        error.statusCode = 401;

        throw error 
    }

    const riderByPhoneNumber = await userDao.getRiderByuserPhoneNumber(userPhoneNumber);
    const riderByEmail = await userDao.getRiderByuserEmail(userEmail);

    if(riderByPhoneNumber) {
        const error = new Error(`${userPhoneNumber}는 이미 가입된 사용자입니다`)
        error.statusCode = 401;

        throw error 
    }

    if(riderByEmail) {
        const error = new Error(`${userEmail}는 이미 가입된 사용자입니다`)
        error.statusCode = 401;

        throw error 
    }

    const hashedUserPassword = await hashPassword(userPassword);
    return await userDao.riderNormalSignup(companyRegistrationNumber, userName, userEmail, hashedUserPassword, userPhoneNumber);

};

const riderNormalSignin = async(userEmail, userPassword) => {

    await passwordRegularExpression(userPassword);
    await emailRegularExpression(userEmail);

    const user = await userDao.getUserByEmail(userEmail);

    if(!user) {
        const error = new Error('존재하지 않는 메일주소 입니다');
        error.statusCode = 401;

        throw error
    }

    const hashedUserPassword = user['hashedUserPassword'];
    const contrastPassword = await checkHash(userPassword, hashedUserPassword);

    if(!contrastPassword) {
        const error = new Error('존재하지 않는 비밀번호 입니다');
        error.statusCode = 401;

        throw error
    }

    return await createJWTAccessToken(user.userId);
};

const riderKakaoRegister = async(kakaoAccessToken) => {

    const kakaoUser = await kakaoUserInfo(kakaoAccessToken);
    const kakaoId = kakaoUser['id'];
    const kakaoName = kakaoUser['properties']['nickname'];
    const kakaoEmail = kakaoUser['kakao_account']['email'];
    const userPhoneNumber = '010' + String(Math.floor(Math.random()*(100000000-10000000)) + 10000000);

    await emailRegularExpression(kakaoEmail);
    
    let user = await userDao.getUserByKaKaoId(kakaoId);

    if(!user) {
        const result = await userDao.riderKakaoRegister(kakaoId, kakaoName, kakaoEmail, userPhoneNumber);
        if (typeof(result)!=='number') {
            const error = new Error('카카오 라이더 생성과정에서 문제가 생겼습니다');
            error.statusCode = 401;
    
            throw error
        }
    }

    user = await userDao.getUserByKaKaoId(kakaoId);
    return await createJWTAccessToken(user.userId);
};

const googleUserInfo = async(googleAccessToken) => {

    return await axios({
        method:'get',
        url:`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`,
        headers: {
            'Content-Type':'application/json'
        }
    }).then(response => response.data)
    
    .catch(err => console.log('error ' + err));
};

const riderGoogleRegister = async(googleAccessToken) => {

    const userInfo = await googleUserInfo(googleAccessToken);

    if (!userInfo) {
        const error = new Error('GOOGLE_ACCESSTOKEN_IS_NOT_VALID');
        error.statusCode = 401;
        
        throw error
    };

    const googleId = userInfo['id'];
    const googleEmail = userInfo['email'];
    const googleName = userInfo['name'];
    const userPhoneNumber = '010' + String(Math.floor(Math.random()*(100000000-10000000)) + 10000000);

    await emailRegularExpression(googleEmail);

    let user = await userDao.getUserByGoogleId(googleId);

    if(!user) {
        const result = await userDao.riderGoogleRegister(googleId, googleEmail, googleName, userPhoneNumber);

        if (typeof(result)!=='number') {
            const error = new Error('구글 라이더 생성과정에서 문제가 생겼습니다');
            error.statusCode = 401;
    
            throw error
        }
    }

    user = await userDao.getUserByGoogleId(googleId);
    return await createJWTAccessToken(user.userId);
};

// -- UP -- 회원가입: user/rider -- UP --
// --------------------------------------

module.exports = {
    sendAuthSMS,
    checkUserByPhoneNEmail,
    contrastVerificationCode,
    deleteUser,
    clientSignup,
    clientSignin,
    branchSignup,
    getBranchByEmail,
    getAdminByBranchEmail,
    adminSignin,
    kakaoAccessToken,
    kakaoUserInfo,
    googleUserInfo,
    createJWTAccessToken,
    riderKakaoSignup,
    riderKakaoSignin,
    riderGoogleSignup,
    riderGoogleSignin,
    riderNormalSignup,
    riderNormalSignin,
    riderKakaoRegister,
    riderGoogleRegister
}