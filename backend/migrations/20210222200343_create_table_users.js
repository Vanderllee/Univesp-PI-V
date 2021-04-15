
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').unique().notNull()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users')
  };
