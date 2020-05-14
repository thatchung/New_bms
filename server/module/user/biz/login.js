let { Err: { BaseError } } = require('lixi-core-nodejs');
let { Hub } = require('../constant');
let GetUserByEmail = require('../core/get_user_by_email');
let CheckPassword = require('../core/check_password');
let GenerateSession = Hub.getEndpoint('session.generate_session');

module.exports = async ({ email,password }) => {

    let user = await GetUserByEmail({ email });
    if(!user){
    	throw new BaseError({ code: 'user_not_found' });
    }

    if (
        !CheckPassword({
            password,
            hashed_password: user.password
        })
    )
        throw new BaseError({ code: 'password_invalid' });

    let { session } = await GenerateSession({ user });
     
    return {
        token: session.token,
        name: user.name
    }
};
