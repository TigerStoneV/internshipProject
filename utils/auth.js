const { catchAsync } = require('./utils/error');
const userDao = require('../models/userDao');
console.log({catchAsync}, '캐치어싱크');

const loginRequired = catchAsync(async(req, res, next) => {

    const { JWT_SECRET } = process.env;
    const { accessToken } = req.headers.authorization;

    if(!accessToken) {
        const error = new Error('NEED_ACCESS_TOKEN');
        error.statusCode = 401;

        return res.status(error.statusCode).json({ meassage: error.message });   
    }

    const decoded = jwt.verify(accessToken, JWT_SECRET);
    console.log(decoded, 'decoded');

    const user = await userDao.getUserById(decoded['userId']);
    const userId = user.userId

});