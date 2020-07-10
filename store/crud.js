const mysql = require('mysql');
const {
    nanoid
} = require('nanoid');
const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,

};

let connection;

const handleCon = () => {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.info("connected mysql");
        }


        connection.on('error', err => {
            console.error('[db err]', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleCon();
            } else {
                throw err;
            }
        });
    });
};

handleCon();

const list = (table) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            return (err) ? reject(err) : resolve(data);
        });
    });
};

async function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
            return (err) ? reject(err) : resolve(data);
        });
    });
}

async function insert(table, data) {

    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            return (err) ? reject(err) : resolve(result);
        });
    });

}

async function update(table, data) {

    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id= ?`, [data, data.id], (err, result) => {
            return (err) ? reject(err) : resolve(result);
        });
    });

}

const upsert = async (table, data) => (data && data.id) ? update(table, data) : insert(table, data);


const query = (table, query, join) => {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, data) => {
            return (err) ? reject(err) : resolve(data[0] || null);
        });
    });
};
module.exports = {
    list,
    get,
    upsert,
    query,
};