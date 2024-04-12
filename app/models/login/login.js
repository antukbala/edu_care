const DB = require('../../../libs/dbConnect/mysql/attendanceDB');
const SQL = require('../sqlQueries');
const { CONSTANTS } = require('../../services/constants');

async function createNewUser(values) {
    try {
        let connection = await DB.dbConnection();
        try {
            let query = SQL.Login.CreateNewStudent;
            let params = [values.name, values.email, values.loginProvider, values.photoUrl, 'active'];
            const user = await DB.doQuery(connection, query, params);
            return user.hasOwnProperty('insertId') ? user.insertId : null;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserDataForLogin(email) {
    try {
        let connection = await DB.dbConnection();
        try {
            let query = SQL.Login.GetUserDataForLogin;
            let params = [email];
            const user = await DB.doQuery(connection, query, params);
            return (user.length === 0) ? null : user[0];
        } finally {
            connection.release();
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createNewUser,
    getUserDataForLogin
}
