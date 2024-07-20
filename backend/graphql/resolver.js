const { db } = require('./db.js');

const resolvers = {
  Query: {
    books: () => {
      return db.query('SELECT * FROM bookstate')
        .then(([rows]) => rows);
    }},
  };

module.exports = { resolvers };
