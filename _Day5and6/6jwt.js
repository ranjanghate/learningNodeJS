const jsonwebtoken = require('jsonwebtoken');

const func = async () => {
  const token = await jsonwebtoken.sign( { _id: 'User' }, 'thisisasecretkey', { expiresIn: '20 hours' });
  console.log(token);

  const data = await jsonwebtoken.verify(token, 'thisisasecretkey');
  console.log(data);
}

func();
