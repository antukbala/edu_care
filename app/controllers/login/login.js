const loginModel = require('../../models/login/login');
const { CONSTANTS } = require('../../services/constants');
const Helper = require('../../services/helper');
const Encryption = require('../../services/encryption');
const JWT = require('jsonwebtoken');

function generateJWT(userDetails) {
    try {
        const options = {
            expiresIn: '2h',
            // algorithm: 'RS256'
        };
        return JWT.sign(userDetails, process.env.JADU_MONTRO, options);
    } catch (error) {
        throw error;
    }
}

// const testData = {
//     name: 'amit kumar bala antu',
//     mobile: '01685273709'
// };
// console.log(generateJWT(testData));

async function generateAccessToken(req, res) {
    try {
        let values = {};
        const data = req.body.user;
        // TODO: PAYLOAD VALIDATION
        
        if (payload) {
            values.email = data.email;
            
            const userData = await loginModel.getUserDataForLogin(values.email);
            if (userData === null) {
                return res.send(Helper.generateResponse(CONSTANTS.RESPONSE_CODE.FAIL, 'No user found'));
            }

            values.userId = userData.user_id;
            values.officeId = userData.office_id;
            values.name = userData.name;
            values.mobile = userData.mobile;
            values.categoryId = userData.category_id;
            // values.photoUrl = userData.photo_url;
            // values.loginId = userData.login_id;
            // values.loginProvider = userData.login_provider;
            values.officeName = userData.office_name;
            values.department = userData.department;
            values.title = userData.title;

            const accessToken = generateJWT(values);

            return res.send({ status: 1000, access_token: accessToken });
        } else {
            return res.send(Helper.generateResponse(CONSTANTS.RESPONSE_CODE.FAIL, 'No user found'));
        }
    } catch (error) {
        console.log(error);
        return res.send(Helper.generateResponse(CONSTANTS.RESPONSE_CODE.FAIL, 'No user found '+error.message));
    }
}

module.exports = {
    generateAccessToken
}
