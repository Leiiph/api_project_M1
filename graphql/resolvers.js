import { db } from './db.js';

export const resolvers = {
  Query: {
    books: async () => {
        const [rows] = await db.query('SELECT * FROM bookstate');
        return rows;
    }
  },
};
