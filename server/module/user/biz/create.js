let { Util, Moment,Axios,Err: { BaseError } } = require('lixi-core-nodejs');
let { Db } = require('../constant');
let GetUserByEmail = require('../core/get_user_by_email');
let HashPassword = require('../core/hash_password');
module.exports = async ({ name,email,password }) => {

    let user = await GetUserByEmail({ email });
    if(user){
        throw new BaseError({ code: 'email_is_used' });
    }

    let new_user = { 
        name : name,  
        email : email,
        password : await HashPassword({ password: password }),
        state : 'active' 
    };

    // await Db.query().table('bms_user').insertSyncElastic(new_user);

    let id_user = await Db
            .query()
            .table('bms_user')
            .insert(new_user);
    id_user = id_user[0];

    await Db.query()
        .table('bms_user')
        .syncElastic(id_user, { refresh: 'wait_for' });

    return {
        id: id
    }
};
