const crypto = require('crypto');

const key_one = crypto.randomBytes(32).toString('hex');
const key_two = crypto.randomBytes(32).toString('hex');

console.table({
    key_one,
    key_two
});