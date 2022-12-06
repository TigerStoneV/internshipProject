const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');

const userLoginRequired = async(req, res, next) => {

    const { JWT_SECRET } = process.env;
    const accessToken = req.headers.authorization;

    if(!accessToken) {
        const error = new Error('NEED_ACCESS_TOKEN');
        error.statusCode = 401;

        return res.status(error.statusCode).json({ meassage: error.message });   
    }

    const decoded = jwt.verify(accessToken, JWT_SECRET);


    const user = await userDao.getUserById(decoded['id']);

    if (!user) {
        const error = new Error('USER_DOES_NOT_EXIST');
        error.statusCode = 404;

        return res.status(error.statusCode).json({ meassage: error.message });  
    }

    req.user = user;

    next();
};

const adminLoginRequired = async(req, res, next) => {

    const { JWT_SECRET } = process.env;
    const accessToken = req.headers.authorization;

    if(!accessToken) {
        const error = new Error('NEED_ACCESS_TOKEN');
        error.statusCode = 401;

        return res.status(error.statusCode).json({ meassage: error.message });   
    }

    const decoded = jwt.verify(accessToken, JWT_SECRET);

    const admin = await userDao.getAdminByAdminId(decoded['id']);

    if (!admin) {
        const error = new Error('ADMIN_DOES_NOT_EXIST');
        error.statusCode = 404;

        return res.status(error.statusCode).json({ meassage: error.message });  
    }

    req.admin = admin;

    next();
};

module.exports = {
    userLoginRequired,
    adminLoginRequired
}