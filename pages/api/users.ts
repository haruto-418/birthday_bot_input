import { NextApiRequest, NextApiResponse } from 'next';
import { excuteQuery } from '../../lib/mysql';
import { User } from '../../lib/type';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      const users = await excuteQuery('SELECT * FROM users');
      return res.status(200).json(users);
    case 'POST':
      try {
        const postRes = await excuteQuery(
          `INSERT INTO users VALUES(NULL, "${(req.body as User).user_name}", "${
            (req.body as User).birthday
          }")`
        );
        return res.status(200).json(postRes);
      } catch (err) {
        console.error(err);
        return res.status(500).json(err);
      }
    case 'DELETE':
      try {
        const id: string = req.query['id'] as string;
        const deleteRes = await excuteQuery(`DELETE FROM users WHERE id=${id}`);
        return res.status(200).json(deleteRes);
      } catch (err) {
        console.error(err);
        return res.status(500).json(err);
      }
    case 'PUT':
    default:
      throw new Error('error at /api/users. http method is not valid.');
  }
};

export default handler;
