const bcrypt = require('bcrypt')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  const data = []
  for (let i = 0; i < 10; i++) {
   data.push({
     username: `test${i}`,
     password: await bcrypt.hash('test', await bcrypt.genSalt())
   })
  }
  await knex('user').insert(data);
};
