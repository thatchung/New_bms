let { Config } = require('lixi-core-nodejs');

let env = Config.loadFromEnv({
    node_mode: process.env.NODE_ENV || 'local',
    dirname: __dirname
});

let expo = {
    node_env: env.NODE_ENV,
    tz: 'UTC',
    avatar_default: 'https://static.lixiapp.com/image/2019/12/19/45d7b90104a345c79604e3407e9098ca.png',
    admin_jwt_secret_key: env.ADMIN_JWT,
    jwt_secret_key: env.USER_JWT,
    root_access_key: env.ROOT_ACCESS_KEY,

    facebook: {
        account_kit_app_secret: env.FACEBOOK_ACCOUNT_KIT_APP_SECRET
    },

    mqtt: {
        host:'mqtt://127.0.0.1:1883',
        username:null,
        password:null
    },

    otp: {
        host: env.OTP_HOST,
        review_host : env.OTP_HOST_REVIEW,
        secret_key : env.OTP_SECRET
    },

    backward: {
        secret_key_review: env.SECRET_KEY_REVIEW,
        host_review: env.HOST_REVIEW,
        opencheck_api_host: env.BACKWARD_OPENCHECK_API_HOST,
        token_v2_secret_key: env.BACKWARD_TOKEN_V2_SECRET_KEY
    },

    api: {
        protocol: env.API_PROTOCOL,
        public_domain: env.API_PUBLIC_DOMAIN,
        host: env.API_HOST,
        port: env.API_PORT,
        request_log_enable: env.REQUEST_LOG_ENABLE,
        request_log_host: env.REQUEST_LOG_HOST,
        request_log_table_name: env.REQUEST_LOG_TABLE_NAME
    },

    log: {
        level: env.LOG_LEVEL
    },

    document: {
        enable: env.DOCUMENT_ENABLE,
        options: {
            port: env.DOCUMENT_PORT,
            auth: {
                mode: env.DOCUMENT_AUTH_MODE,
                list_basic_account: []
            }
        }
    },

    database: {
        default: {
            dialect: env.DATABASE_DEFAULT_DIALECT,
            connection: {
                host: env.DATABASE_DEFAULT_HOST,
                port: env.DATABASE_DEFAULT_PORT,
                username: env.DATABASE_DEFAULT_USERNAME,
                password: env.DATABASE_DEFAULT_PASSWORD + '',
                database: env.DATABASE_DEFAULT_DBNAME
            }
        }
    },

    elasticsearch: {
        default: {
            node: env.ELASTICSEARCH_DEFAULT_NODE
        },
        opencheck: {
            node: env.ELASTICSEARCH_OPENCHECK_NODE,
            prefix: env.ELASTICSEARCH_OPENCHECK_PREFIX
        },
        review: {
            node: env.ELASTICSEARCH_REVIEW_NODE,
            prefix: env.ELASTICSEARCH_REVIEW_PREFIX
        },
        delivery: {
            node: env.ELASTICSEARCH_DELIVERY_NODE,
            prefix: env.ELASTICSEARCH_DELIVERY_PREFIX
        }
    }
};

if (expo.document.options.auth.mode === 'basic') {
    expo.document.options.auth.list_basic_account.push({
        username: env.DOCUMENT_AUTH_BASIC_USERNAME,
        password: env.DOCUMENT_AUTH_BASIC_PASSWORD
    });
}

module.exports = expo;
