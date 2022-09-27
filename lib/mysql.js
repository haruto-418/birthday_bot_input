import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

export const excuteQuery = async (query) => {
  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (err) {
    console.error(err);
    throw new Error(`error at excuteQuery(): ${err}`);
  }
};
