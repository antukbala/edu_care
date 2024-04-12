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
        const data = req.body;
        // TODO: PAYLOAD VALIDATION
        
        if (data) {
            values.email = data.email;
            
            const userData = await loginModel.getUserDataForLogin(values.email);
            if (userData === null) {
                const newUserData = {
                    name: data.name,
                    email: values.email,
                    loginProvider: data.provider,
                    photoUrl: data.photo_url
                }
                const newUserId = await loginModel.createNewUser(newUserData);
                if (newUserId === null) return res.send(Helper.generateResponse(CONSTANTS.RESPONSE_CODE.FAIL, 'Failed to create new User'));
                values.newUserId = newUserId;
            }
            
            const jwtData = (userData === null) ?
            {
                user_id: values.newUserId,
                name: data.name,
                mobile: null,
                role: null,
                is_new_user: true
            }
            :
            {
                user_id: userData.user_id,
                name: userData.name,
                mobile: userData.mobile,
                role: userData.role,
                is_new_user: false
            }

            const accessToken = generateJWT(jwtData);

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
