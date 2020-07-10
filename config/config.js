module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    postgres_remote: {
        host: process.env.POSTGRESS_LOCAL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || 'chatplatzi',
    },
    postgres: {
        host: process.env.POSTGRESS_LOCAL_HOST || 'us-cdbr-iron-east-03.cleardb.net',
        user: process.env.POSTGRESS_LOCAL_USER || 'bd5facea6e05a5',
        password: process.env.POSTGRESS_LOCAL_PASS || 'd934b2cd',
        database: process.env.POSTGRESS_LOCAL_DB || 'heroku_eeb2cd690834874',
    },
    // mysqlService: {
    //     host: process.env.MYSQL_SERV_HOST || 'localhost',
    //     port: process.env.MYSQL_SERV_PORT || 3001
    // },
    // cacheService: {
    //     host: process.env.MYSQL_SERV_HOST || 'localhost',
    //     port: process.env.MYSQL_SERV_PORT || 3003
    // },
    // post: {
    //     port: process.env.MYSQL_POST_PORT || 300
    // },
    // redis: {
    //     host: process.env.REDIS_CACHE_HOST || 'localhost',
    //     port: process.env.REDIS_CACHE_PORT || 'localhost',
    //     password: process.env.REDIS_CACHE_PASSWORD || 'localhost',
    // },
};