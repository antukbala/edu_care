const Login = {
    GetUserDataForLogin:
    `select user_id, name, email, mobile, role where email = ? and status = ?;`
};

module.exports = {
    Login
}
