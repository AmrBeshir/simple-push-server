const knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL
});

module.exports = {

    addUserToken: async (userId, deviceDetails, token) => {
        return await knex('user_tokens').returning('*').insert([{
            user_id: userId,
            device_details: deviceDetails,
            token: token
        }])
    },

    getTokenByUserId: async (userId) => {
        return await knex('user_tokens').select('*').where('user_id', userId)
    },

    deleteUserToken: async (user) => {
        return knex('user_tokens').where(user).del()
      },

    getTokenByUserData: async (userId, deviceDetails) => {
        return await knex('user_tokens').where({
            user_id: userId,
            device_details: deviceDetails
        })
    }
}