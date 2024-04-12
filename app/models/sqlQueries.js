const Login = {
    CreateNewStudent:
    `insert into users set name = ?, email = ?, login_provider = ?, photo_url = ?, status = ?;`,
    
    GetUserDataForLogin:
    `select user_id, name, email, mobile, role from users where email = ?;`
};

module.exports = {
    Login
}
