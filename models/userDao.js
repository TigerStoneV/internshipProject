const { query } = require('express');
const appDataSource = require('./dataSource');

const createUserToVerifyByPhoneNumber = async(userName, userPhoneNumber, randomFourDigit, userEmail) => {

    const result = await appDataSource.query(`
        INSERT INTO users (
            name,
            phone_number,
            email,
            verification_code
        ) VALUES (?, ?, ?, ?);`,
    [userName, userPhoneNumber, userEmail, randomFourDigit]
    );
    return result.insertId
};

const checkUserByPhoneNEmail = async(userPhoneNumber, userEmail) => {

    const result = await appDataSource.query(`
        SELECT
            id as userId,
            phone_number as userPhoneNumber,
            email as userEmail
        FROM users
        WHERE phone_number=? or email=?;`,
        [userPhoneNumber, userEmail]
    );
    return result[0]
}   

const contrastVerificationCode = async(userPhoneNumber, userKeyInCode) => {
    
    const result = await appDataSource.query(`
        SELECT
            id as userId,
            phone_number as phoneNumber,
            email,
            verification_code as verificationCode
        FROM users
        WHERE phone_number=? AND verification_code=?;`,
        [userPhoneNumber, userKeyInCode]
    )
    return result[0]
};

const deleteUser = async(userId) => {

    const result = await appDataSource.query(`
        DELETE FROM users
        WHERE id=?;`,
        [userId]
    )
    return result;
};

const getUserByPhoneNumber = async(userPhoneNumber) => {
    const result = await appDataSource.query(`
        SELECT
            id AS userId,
            name AS userName,
            phone_number AS userPhoneNumber,
            client_id AS clientId,
            client_admin AS clientAdmin
        FROM users
        WHERE phone_number=?;`,
        [userPhoneNumber]
    )

    return result[0];
}

const getUserByEmail = async(userEmail) => {

    const result = await appDataSource.query(`
        SELECT
            id as userId,
            phone_number as userPhoneNumber,
            email as userEmail,
            password as hashedUserPassword
        FROM users
        WHERE email=?;`,
        [userEmail]
    );
    return result[0]
}

const getUserById = async(userId) => {

    const result = await appDataSource.query(`
        SELECT
            u.id as userId,
            u.phone_number as userPhoneNumber,
            u.email as userEmail,
            u.client_id as clientId,
            u.client_admin as clientAdmin
        FROM users u
        INNER JOIN admins a ON u.id=a.user_id
        WHERE id=?;`,
        [userId]
    );
    return result[0]
}

// -- UP -- 회원가입: 전화번호 인증 구현 -- UP --
// --------------------------------------
const getClientByRegistrationNumber = async(companyRegistrationNumber) => {
    
    const result = await appDataSource.query(`
        SELECT
            id as clientId,
            company_name as companyName,
            registration_number as companyRegistrationNumber
        FROM clients
        WHERE registration_number=?;`,
        [companyRegistrationNumber]
    )
    return result[0];
}

const getClientByEmail = async(companyEmail) => {

    const result = await appDataSource.query(`
        SELECT
            id,
            company_name,
            email
        FROM clients
        WHERE email=?;`,
        [companyEmail]
    )
    return result[0];
};

const getClientByName = async(companyName) => {

    const result = await appDataSource.query(`
        SELECT
            id,
            company_name as companyName,
            registration_number as registrationNumber,
            email as companyEmail
        FROM clients
        WHERE company_name=?;`,
        [companyName]
    )
    return result[0];
}

const clientSignup = async(companyName, companyRegistrationNumber, companyEmail, hashedCompanyPassword, userName, userEmail, userPhoneNumber) => {

    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const createClient = await queryRunner.query(`
            INSERT INTO clients (
                company_name,
                registration_number,
                email,
                password
            ) VALUES (?, ?, ?, ?);`,
            [companyName, companyRegistrationNumber, companyEmail, hashedCompanyPassword]
        )

        const clientId = await createClient.insertId;
        const clientAdmin = 1;

        const user = await getUserByPhoneNumber(userPhoneNumber);

        if(!user) {
            const error = new Error(`${userPhoneNumber}은 존재하지 않는 사용자입니다`);
            error.statusCode = 400;
    
            throw error
        };

        const updateUser = await queryRunner.query(`
            UPDATE users
            SET
                name=?,
                email=?,
                client_id=?,
                client_admin=?
            WHERE phone_number=?;`,
        [userName, userEmail, clientId, clientAdmin, userPhoneNumber]
        )

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return updateUser;

    } catch (error) {
        await queryRunner.rollbackTransaction();
        return{ 'meassage': error.message };
    } finally {
        await queryRunner.release();
    }
};

// -- UP -- 회원가입: client/user 회원가입 구현 -- UP --
// --------------------------------------

const getBranchByName = async(branchName) => {

    const result = await appDataSource.query(`
        SELECT
            name as branchName,
            address as branchAddress,
            email as branchEmail
        FROM branches
        WHERE name=?;`,
        [branchName]
    )
    return result[0];
};

const getBranchByEmail = async(branchEmail) => {

    const result = await appDataSource.query(`
        SELECT
            name as branchName,
            address as branchAddress,
            email as branchEmail
        FROM branches
        WHERE email=?;`,
        [branchEmail]
    )
    return result[0];
};

const branchSignup = async(branchName, branchAddress, branchLatitude, branchLongitude, branchEmail, hashedBranchPassword, userName, userEmail, userPhoneNumber) => {

    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const createBranch = await queryRunner.query(`
        INSERT INTO branches (
            name,
            address,
            latitude,
            longitude,
            email,
            password
        ) VALUES (?, ?, ?, ?, ?, ?);`,
        [branchName, branchAddress, branchLatitude, branchLongitude, branchEmail, hashedBranchPassword]
        );

        await queryRunner.query(`
            UPDATE users
            SET
                name=?,
                email=?
            WHERE phone_number=?;`,
        [userName, userEmail, userPhoneNumber]
        )

        const user = await getUserByPhoneNumber(userPhoneNumber);

        if(!user) {
            const error = new Error(`${userPhoneNumber}은 존재하지 않는 사용자입니다`);
            error.statusCode = 400;
    
            throw error
        };

        const userId = user.userId;
        const branchId = createBranch.insertId;
        const riderlogEditor = 1;

        const createAdmin = await queryRunner.query(`
            INSERT INTO admins (
                user_id,
                branch_id,
                riderlog_editor
            ) VALUES (?, ?, ?);`,
            [userId, branchId, riderlogEditor]
            )

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return createAdmin.insertId;

    } catch (error) {
        await queryRunner.rollbackTransaction();
        return{ 'meassage': error.message };
    } finally {
        await queryRunner.release();
    }
};

// -- UP -- 회원가입: branch/user/admin -- UP --
// --------------------------------------


const getUserByKaKaoId = async(kakaoId) => {

    const result = await appDataSource.query(`
        SELECT
            name as userName,
            kakao_id as userKakaoId,
            phone_number as userPhoneNumber,
            email as userEmail,
            client_id as clientId,
            client_admin as clientAdmin
        FROM users
        WHERE kakao_id=?;`,
        [kakaoId]
    );
    return result[0];
};

const saveKakaoId = async(kakaoId, clientId, userName, userEmail, userPhoneNumber) => {

    const result = await appDataSource.query(`
        UPDATE users
        SET
            name=?,
            kakao_id=?,
            email=?,
            client_id=?
        WHERE phone_number=?;`,
        [userName, kakaoId, userEmail, clientId, userPhoneNumber]   
    )
    return result;
};

const riderKakaoSignup = async(kakaoId, companyRegistrationNumber, userName, userEmail, userPhoneNumber) => {

    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // 예외처리
        // 예외1. 사업자등록번호가 DB에 없을 때
        const client = await getClientByRegistrationNumber(companyRegistrationNumber);
        const clientRegistrationNumber = client['companyRegistrationNumber'];
        const companyName = client['companyName'];
        const clientId = client['clientId'];

        if(!clientRegistrationNumber) {
            const error = new Error('등록되지 않은 회사입니다. 소속 사업장에 문의해주세요');
            error.statusCode = 401;
            
            throw error
        };

        // 예외2. client admin은 소셜로그인 불가
        const getUserInfo = await getUserByPhoneNumber(userPhoneNumber);
        const checkUserIsAdmin = getUserInfo['clientAdmin'];

        if (checkUserIsAdmin === 1) {
            return `${companyName}의 관리자로 등록되어 있습니다. 회사계정으로 서비스를 이용해주세요`;
        };

        // 예외 3. kakaoId 이미 DB에 존재한다면 에러메세지 반환
        let user = await getUserByKaKaoId(kakaoId);

        if(user) {
            return `${userPhoneNumber}는 이미 kakao 소셜로그인으로 회원가입 완료된 사용자입니다`
        };

        // saveKaokaoId - updateUser
        await saveKakaoId(kakaoId, clientId, userName, userEmail, userPhoneNumber);

        // createRider
        const userId = getUserInfo['userId'];
        console.log(userId, '다오단 userId')

        const createRider = await queryRunner.query(`
            INSERT INTO riders (
                user_id
            ) VALUES (?);`,
            [userId]    
        );

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return createRider.insertId;

    } catch (error) {
        await queryRunner.rollbackTransaction();
        return{ 'meassage': error.message };
    } finally {
        await queryRunner.release();
    }
};

const riderNormalSignup = async(companyRegistrationNumber, userName, userEmail, hashedUserPassword, userPhoneNumber) => {
    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // 예외처리
        // 예외1. 사업자등록번호가 DB에 없을 때
        const client = await getClientByRegistrationNumber(companyRegistrationNumber);
        const clientRegistrationNumber = client['companyRegistrationNumber'];
        const companyName = client['companyName'];
        const clientId = client['clientId'];

        if(!clientRegistrationNumber) {
            const error = new Error('등록되지 않은 회사입니다. 소속 사업장에 문의해주세요');
            error.statusCode = 401;
            
            throw error
        };

        // 예외2. client admin은 개인로그인 불가
        const getUserInfo = await getUserByPhoneNumber(userPhoneNumber);
        const checkUserIsAdmin = getUserInfo['clientAdmin'];

        if (checkUserIsAdmin === 1) {
            return `${companyName}의 관리자로 등록되어 있습니다. 회사계정으로 서비스를 이용해주세요`;
        };

        // updateUser
        await queryRunner.query(`
            UPDATE users
            SET
                name=?,
                email=?,
                password=?,
                client_id=?
            WHERE phone_number=?;`,
            [userName, userEmail, hashedUserPassword, clientId, userPhoneNumber]
        );

        // createRider
        const userId = getUserInfo['userId'];
        console.log(userId, '다오단 userId')

        const createRider = await queryRunner.query(`
            INSERT INTO riders (
                user_id
            ) VALUES (?);`,
            [userId]    
        );

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return createRider.insertId;

    } catch (error) {
        await queryRunner.rollbackTransaction();
        return{ 'meassage': error.message };
    } finally {
        await queryRunner.release();
    }
};

// -- UP -- 회원가입: user/rider -- UP --
// --------------------------------------

module.exports = {
    createUserToVerifyByPhoneNumber,
    checkUserByPhoneNEmail,
    contrastVerificationCode,
    deleteUser,
    getUserByPhoneNumber,
    getUserByEmail,
    getUserById,
    getClientByRegistrationNumber,
    getClientByEmail,
    getClientByName,
    clientSignup,
    getBranchByName,
    getBranchByEmail,
    branchSignup,
    riderKakaoSignup,
    riderNormalSignup
}