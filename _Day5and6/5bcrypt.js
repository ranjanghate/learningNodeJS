const bcrypt = require('bcrypt');

const fun = async () => {
  const password = 'User@123';
  const hashPassword = await bcrypt.hash(password, 16);

  console.log(password);
  console.log(hashPassword);

  const isMatch = await bcrypt.compare('User@124', hashPassword);
  console.log(isMatch);
}

fun();
