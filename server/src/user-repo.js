const knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL
});

module.exports = {
    getAllUsers: async () => {
        return knex('users').select('*')
    },

    getUserById: async (userId) => {
        return knex('users').returning('*').where('user_id', userId)
    },

    getUserByUsername: async (username) => {
        return knex('users').returning('*').where('username', username)
    },

    createUser: async (username, password) => {
        return knex('users').returning('*').insert([{username: username, password_hash: password}])
    },
}