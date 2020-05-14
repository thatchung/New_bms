let { Err: { BaseError } } = require('lixi-core-nodejs');
let GetUser = require('../core/get_user_by_id');

module.exports = async ( ) => {
    let user = await GetUser({ id : user.id });
    if(!user){
    	throw new BaseError({ code: 'account_not_found' });
    }
    
    return account;
};
