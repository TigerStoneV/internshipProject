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

const sendAuthSMS = async (randomFourDigit, phoneNumber) => {
    const signature = await makeSignature();

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
                        'to': `${phoneNumber}`,
                        'subject':'별따러가자 핸드폰 인증',
                        'content': `별따러가자 회원 인증번호 [${randomFourDigit}]를 입력해주세요`
                    }
                ]
        }
    }).then(response => response.data);

    // sendSMS 후 3분이 지나도록 확인되지 않으면 삭제해 // 지금은 무조건 삭제잖아 // 어 이거 프론트에서 시간지나면 deleteUser 해야할 것 같은데?
    // setTimeout(userDao.deleteUser, 180000, phoneNumber);

    return sendSMS;
};

const createUserToVerifyByPhoneNumber = async(userName, userPhoneNumber, randomFourDigit, userEmail) => {
    return await userDao.createUserToVerifyByPhoneNumber(userName, userPhoneNumber, randomFourDigit, userEmail);
};

const checkUserByPhoneNEmail = async(userName, userPhoneNumber, randomFourDigit, userEmail) => { 
    const user = await userDao.checkUserByPhoneNEmail(userPhoneNumber, userEmail);

    if (user) return '이미 가입된 사용자입니다!';
    if (!user)  {
        await createUserToVerifyByPhoneNumber(userName, userPhoneNumber, randomFourDigit, userEmail);
        return await sendAuthSMS(randomFourDigit, userPhoneNumber);
    }
};

const deleteUser = async(userPhoneNumber) => {
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
    const verification = await userDao.contrastVerificationCode(userPhoneNumber, userKeyInCode);
    
    // sendSMS 후 3분이 지나도록 확인되지 않으면 삭제해 // 지금은 무조건 삭제잖아 // 어 이거 프론트에서 해야할 것 같은데?

    if(verification) {return '전화번호 인증 완료되었습니다'};
    if(!verification) {
        await deleteUser(userPhoneNumber);
        return '인증번호가 일치하지 않습니다. 인증번호 재발급 x후 재시도해주세요'
    };
};

const emailRegularExpression = async(email) => {
    const EMAILREGEX =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

    if(!EMAILREGEX.test(email)) {
        const error = new Error('INVALID_EMAIL');
        error.statusCode = 400;

        throw error
    }
};

const passwordRegularExpression = async(companyPassword) => {
    const PWREGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if(!PWREGEX.test(companyPassword)) {
        const error = new Error('INVALID_PASSWORD');
        error.statusCode = 400;

        throw error
    }
};

const companyRegistrationNumberRegularExpression = async(companyRegistrationNumber) => {
    const COMPANY_REGIST_NUM_REGEX =/^(?=.*[0-9])(?=.{10})/

    if(!COMPANY_REGIST_NUM_REGEX.test(companyRegistrationNumber)) {
        const error = new Error('INVALID_COMPANY_REGISTRATION_NUMBER');
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

const clientSignup = async(companyName, companyRegistrationNumber, companyEmail, companyPassword, userName, userEmail, userPhoneNumber) => {

    await passwordRegularExpression(companyPassword);
    await emailRegularExpression(companyEmail);
    await emailRegularExpression(userEmail);
    await companyRegistrationNumberRegularExpression(companyRegistrationNumber);

    const clientName = await userDao.getClientByName(companyName);
    const clientRegistrationNumber = await userDao.getClientByRegistrationNumber(companyRegistrationNumber);
    const clientEmail = await userDao.getClientByEmail(companyEmail);

    if(clientName) {
        const error = new Error(`DUPLICATED_ENTRY_'${companyName}'_FOR_COMPANY_NAME`);
        error.statusCode = 401;

        throw error
    }

    if(clientRegistrationNumber) {
        const error = new Error(`DUPLICATED_ENTRY_'${companyRegistrationNumber}'_FOR_COMPANY_REGISTRATION_NUMBER`);
        error.statusCode = 401;

        throw error
    };

    if(clientEmail) {
        const error = new Error(`DUPLICATED_ENTRY_'${companyEmail}'_FOR_COMPANY_EMAIL`);
        error.statusCode = 401;

        throw error
    };

    const hashedCompanyPassword = await hashPassword(companyPassword);

    return await userDao.clientSignup(companyName, companyRegistrationNumber, companyEmail, hashedCompanyPassword, userName, userEmail, userPhoneNumber);
};
// -- UP -- 회원가입: client/user 회원가입 구현 -- UP --
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

    const name = await userDao.getBranchByName(branchName).branchName;
    const email = await userDao.getBranchByEmail(branchEmail).branchEmail;

    if(name) {
        const error = new Error(`DUPLICATED_ENTRY_'${name}'_FOR_BRANCH_NAME`);
        error.statusCode = 401;

        throw error
    };

    if(email) {
        const error = new Error(`DUPLICATED_ENTRY_'${email}'_FOR_BRANCH_EMAIL`);
        error.statusCode = 401;

        throw error
    };

    const hashedBranchPassword = await hashPassword(branchPassword);
    const coordinates = await addressToCoordinates(branchAddress);

    const branchLatitude = coordinates['x'];
    const branchLongitude = coordinates['y'];
    return await userDao.branchSignup(branchName, branchAddress, branchLatitude, branchLongitude, branchEmail, hashedBranchPassword, userName, userEmail, userPhoneNumber);
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
    }).then(response => response.data['id'])
    .catch(err => console.log("error " + err));
};

const riderKakaoSignup = async(kakaoId, companyRegistrationNumber, userName, userEmail, userPhoneNumber) => {

    // 정규표현식
    await emailRegularExpression(userEmail);
    await companyRegistrationNumberRegularExpression(companyRegistrationNumber);

    if (!kakaoId) {
        const error = new Error('KAKAO_ID_IS_NOT_DEFINED');
        error.statusCode = 401;
        
        throw error
    }

    // userDao로 옮김: 회원가입 버튼 눌렀을때 예외처리에 해당되는 내용이 있다면 롤백시키기 위함
    return await userDao.riderKakaoSignup(kakaoId, companyRegistrationNumber, userName, userEmail, userPhoneNumber);
    
};

const riderNormalSignup = async(companyRegistrationNumber, userName, userEmail, userPassword, userPhoneNumber) => {

    // 정규표현식
    await passwordRegularExpression(userPassword);
    await emailRegularExpression(userEmail);
    await companyRegistrationNumberRegularExpression(companyRegistrationNumber);

    const hashedUserPassword = await hashPassword(userPassword);

    return await userDao.riderNormalSignup(companyRegistrationNumber, userName, userEmail, hashedUserPassword, userPhoneNumber);
};

const createJWTAccessToken = async(userEmail) => {
    const user = await userDao.getUserByEmail(userEmail);

    const { ALGORITHM, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

    const jwtAccessToken = jwt.sign({'userId':user.userId}, JWT_SECRET, {
        algorithm: ALGORITHM,
        expiresIn: JWT_EXPIRES_IN
    });

    return jwtAccessToken;
}

const riderNormalSignin = async(userEmail, userPassword) => {

    // 정규표현식
    await passwordRegularExpression(userPassword);
    await emailRegularExpression(userEmail);

    const user = await userDao.getUserByEmail(userEmail);

    if(!user) {
        const error = new Error('WRONG_EMAIL');
        error.statusCode = 401;

        throw error
    }

    const hashedUserPassword = user['hashedUserPassword'];
    const contrastPassword = await checkHash(userPassword, hashedUserPassword);

    if(!contrastPassword) {
        const error = new Error('WRONG_PASSWORD');
        error.statusCode = 401;

        throw error
    }

    return await jwtAccessToken(userEmail);
}
// -- UP -- 회원가입: user/rider -- UP --
// --------------------------------------

module.exports = {
    sendAuthSMS,
    createUserToVerifyByPhoneNumber,
    checkUserByPhoneNEmail,
    contrastVerificationCode,
    deleteUser,
    clientSignup,
    branchSignup,
    kakaoAccessToken,
    kakaoUserInfo,
    riderKakaoSignup,
    riderNormalSignup,
    createJWTAccessToken,
    riderNormalSignin
}