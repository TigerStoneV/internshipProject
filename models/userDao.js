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
        WHERE phone_number=? AND email=?;`,
        [userPhoneNumber, userEmail]
    );
    return result[0]
};

const updateVerificationCode = async(userPhoneNumber, randomFourDigit) => {

    const result = await appDataSource.query(`
        UPDATE users
        SET verification_code=?
        WHERE phone_number=?;`,
        [randomFourDigit, userPhoneNumber]
    );
    return result
};

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
            id as userId,
            name as userName,
            kakao_id as userKakaoId,
            google_id as userGoogleId,
            password as userPassword,
            phone_number as userPhoneNumber,
            client_id as clientId,
            client_admin as clientAdmin
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
    )
    return result[0]
}

const getUserById = async(userId) => {

    const result = await appDataSource.query(`
        SELECT
            id as userId,
            phone_number as userPhoneNumber,
            email as userEmail,
            client_id as clientId,
            client_admin as clientAdmin
        FROM users
        WHERE id=?;`,
        [userId]
    )
    return result[0]
}

const getUserByKakaoId = async(kakaoId) => {

    const result = await appDataSource.query(`
        SELECT
            id as userId,
            name as userName,
            phone_number as userPhoneNumber,
            kakao_id as kakaoId,
            google_id as googleId
        FROM users
        WHERE kakao_id=?;`,
        [kakaoId]
    )
    return result[0]
};

const getUserBygoogleId = async(googleId) => {

    const result = await appDataSource.query(`
        SELECT
            id as userId,
            name as userName,
            phone_number as userPhoneNumber,
            kakao_id as kakaoId,
            google_id as googleId
        FROM users
        WHERE google_id=?;`,
        [googleId]
    )
    return result[0]
}

const getClientAdminByClientId = async(clientId) => {

    const result = await appDataSource.query(`
        SELECT
            id as userId,
            name as userName,
            client_id as clientId,
            client_admin as clientAdmin
        FROM users
        WHERE client_id=? AND client_admin=1;`,
        [clientId]
    )
    return result[0];
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
            id as clientId,
            company_name as companyName,
            email as companyEmail,
            password as hashedCompanyPassword
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

const getClientByClientId = async(clientId) => {

    const result = await appDataSource.query(`
        SELECT
            id as clientId,
            company_name as companyName,
            registration_number as registrationNumber,
            email as companyEmail
        FROM clients
        WHERE id=?;`,
        [clientId]
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
            error.statusCode = 401;
    
            throw error
        };

        if(typeof(user['clientId'])==='number' && typeof(user['clientAdmin'])==='number') {
            const error = new Error(`${userPhoneNumber}는 이미 다른 회사의 관리자로 회원가입된 상태입니다`);
            error.statusCode = 401;
    
            throw error
        }

        if(typeof(user['clientId'])==='number' && user['clientAdmin']===null) {
            const error = new Error(`${userPhoneNumber}는 이미 다른 회사의 rider로 회원가입된 상태입니다`);
            error.statusCode = 401;
    
            throw error
        }

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
        return error.message;
    } finally {
        await queryRunner.release();
    }
};

// -- UP -- 회원가입: client/user 회원가입/로그인 구현 -- UP --
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
            id as branchId,
            name as branchName,
            address as branchAddress,
            email as branchEmail,
            password as hashedBranchPassword
        FROM branches
        WHERE email=?;`,
        [branchEmail]
    )
    return result[0];
};

const getAdminByBranchId = async(branchId) => {
    
    const result = await appDataSource.query(`
        SELECT
            id as adminId,
            user_id as adminUserId,
            branch_id as adminBranchId,
            riderlog_editor as adminRiderlogEditor
        FROM admins
        WHERE branch_id=?;`,
        [branchId]
    )
    return result[0];
};

const getAdminByBranchEmail = async(branchEmail) => {

    const result = await appDataSource.query(`
        SELECT
            b.id as branchId,
            b.name as branchName,
            a.id as adminId,
            a.user_id as adminUserId,
            a.riderlog_editor as riderlogEditor
        FROM branches b
        INNER JOIN admins a ON b.id=a.branch_id
        WHERE b.email=?;`,
        [branchEmail]
    )
    return result[0];
};

const getAdminByAdminId = async(adminId) => {

    const result = await appDataSource.query(`
        SELECT
            id as adminId,
            user_id as adminUserId,
            branch_id as branchId,
            riderlog_editor as riderlogEditor
        FROM admin
        WHERE id=?;`,
        [adminId]
    )
    return result[0];
}

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
            error.statusCode = 401;
    
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
        return error.message;
    } finally {
        await queryRunner.release();
    }
};

// -- UP -- 회원가입: branch/user/admin -- UP --
// --------------------------------------


const getUserByKaKaoId = async(kakaoId) => {

    const result = await appDataSource.query(`
        SELECT
            id as userId,
            name as userName,
            kakao_id as kakaoId,
            google_id as googleId,
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

const getUserByGoogleId = async(googleId) => {

    const result = await appDataSource.query(`
        SELECT
            id as userId,
            name as userName,
            kakao_id as kakaoId,
            google_id as googleId,
            phone_number as userPhoneNumber,
            email as userEmail,
            client_id as clientId,
            client_admin as clientAdmin
        FROM users
        WHERE google_id=?;`,
        [googleId]
    )
    return result[0];
};

const updateUserKakao = async(kakaoId, clientId, userName, userEmail, userPhoneNumber) => {

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
        const client = await getClientByRegistrationNumber(companyRegistrationNumber);
        const clientRegistrationNumber = client['companyRegistrationNumber'];
        const companyName = client['companyName'];
        const clientId = client['clientId'];

        if(!clientRegistrationNumber) {
            const error = new Error('등록되지 않은 회사입니다. 소속 사업장에 문의해주세요');
            error.statusCode = 401;
            
            throw error
        };

        const getUserInfo = await getUserByPhoneNumber(userPhoneNumber);
        const checkUserIsAdmin = getUserInfo['clientAdmin'];

        if (checkUserIsAdmin === 1) {
            const error = new Error(`${companyName}의 관리자로 등록되어 있습니다. 회사계정으로 서비스를 이용해주세요`);
            error.statusCode = 401;
            
            throw error
        };

        let user = await getUserByKaKaoId(kakaoId);

        if(user) {
            const error = new Error(`${userPhoneNumber}는 이미 kakao 소셜로그인으로 회원가입 완료된 사용자입니다`);
            error.statusCode = 401;
            
            throw error
        };

        await updateUserKakao(kakaoId, clientId, userName, userEmail, userPhoneNumber);

        const userId = getUserInfo['userId'];

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
        return error.message;
    } finally {
        await queryRunner.release();
    }
};

const getRiderByuserPhoneNumber = async(userPhoneNumber) => {

    const result = await appDataSource.query(`
        SELECT
            r.id as riderId,
            r.user_id as userId,
            u.name as userName
        FROM riders r
        INNER JOIN users u ON r.user_id=u.id
        WHERE u.phone_number=?;`,
        [userPhoneNumber]
    )
    return result[0];
};

const getRiderByuserEmail = async(userEmail) => {

    const result = await appDataSource.query(`
        SELECT
            r.id as riderId,
            r.user_id as userId,
            u.name as userName
        FROM riders r
        INNER JOIN users u ON r.user_id=u.id
        WHERE u.email=?;`,
        [userEmail]
    )
    return result[0];
};

const riderGoogleSignup = async(googleId, companyRegistrationNumber, userName, userEmail, userPhoneNumber) => {

    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const client = await getClientByRegistrationNumber(companyRegistrationNumber);
        const clientRegistrationNumber = client['companyRegistrationNumber'];
        const companyName = client['companyName'];
        const clientId = client['clientId'];

        if(!clientRegistrationNumber) {
            const error = new Error('등록되지 않은 회사입니다. 소속 사업장에 문의해주세요');
            error.statusCode = 401;
            
            throw error
        };

        const getUserInfo = await getUserByPhoneNumber(userPhoneNumber);
        const checkUserIsAdmin = getUserInfo['clientAdmin'];

        if (checkUserIsAdmin === 1) {
            const error = new Error(`${companyName}의 관리자로 등록되어 있습니다. 회사계정으로 서비스를 이용해주세요`);
            error.statusCode = 401;
            
            throw error
        };

        let user = await getUserBygoogleId(googleId);

        if(user) {
            const error = new Error(`${userPhoneNumber}는 이미 google 소셜로그인으로 회원가입 완료된 사용자입니다`);
            error.statusCode = 401;
            
            throw error
        };

        const result = await queryRunner.query(`
            UPDATE users
            SET
                name=?,
                google_id=?,
                email=?,
                client_id=?
            WHERE phone_number=?;`,
            [userName, googleId, userEmail, clientId, userPhoneNumber]   
        )

        const userId = getUserInfo['userId'];

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
        return error.message;
    } finally {
        await queryRunner.release();
    }
};

const riderNormalSignup = async(companyRegistrationNumber, userName, userEmail, hashedUserPassword, userPhoneNumber) => {
    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const client = await getClientByRegistrationNumber(companyRegistrationNumber);
        const companyName = client['companyName'];
        const clientId = client['clientId'];

        const getUserInfo = await getUserByPhoneNumber(userPhoneNumber);
        const checkUserIsAdmin = getUserInfo['clientAdmin'];

        if (checkUserIsAdmin === 1) {
            return `${companyName}의 관리자로 등록되어 있습니다. 회사계정으로 서비스를 이용해주세요`;
        };

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

        const userId = getUserInfo['userId'];

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
        return error.message;
    } finally {
        await queryRunner.release();
    }
};

const riderKakaoRegister = async(kakaoId, kakaoName, kakaoEmail, userPhoneNumber) => {

    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const createUser = await queryRunner.query(`
                INSERT INTO users (
                    kakao_id,
                    name,
                    email,
                    phone_number
                ) VALUES (?, ?, ?, ?);`,
            [kakaoId, kakaoName, kakaoEmail, userPhoneNumber]
        )
        
        const userId = createUser.insertId;

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
        return error.message;
    } finally {
        await queryRunner.release();
    }
};

const riderGoogleRegister = async(googleId, googleEmail, userName, userPhoneNumber) => {

    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const createUser = await queryRunner.query(`
            INSERT INTO users (
                google_id,
                name,
                email,
                phone_number
            ) VALUES (?, ?, ?, ?);`,
        [googleId, userName, googleEmail, userPhoneNumber]
        );

        const userId = createUser.insertId

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
        return error.message;
    } finally {
        await queryRunner.release();
    }
};

// -- UP -- 회원가입/로그인: user/rider -- UP --
// --------------------------------------

module.exports = {
    createUserToVerifyByPhoneNumber,
    checkUserByPhoneNEmail,
    updateVerificationCode,
    contrastVerificationCode,
    deleteUser,
    getUserByPhoneNumber,
    getUserByEmail,
    getUserById,
    getUserByKakaoId,
    getUserBygoogleId,
    getClientAdminByClientId,
    getClientByRegistrationNumber,
    getClientByEmail,
    getClientByName,
    getClientByClientId,
    clientSignup,
    getBranchByName,
    getBranchByEmail,
    getAdminByBranchId,
    getAdminByBranchEmail,
    getAdminByAdminId,
    branchSignup,
    getRiderByuserPhoneNumber,
    getRiderByuserEmail,
    riderNormalSignup,
    getUserByKaKaoId,
    getUserByGoogleId,
    riderKakaoSignup,
    riderGoogleSignup,
    riderKakaoRegister,
    riderGoogleRegister
}