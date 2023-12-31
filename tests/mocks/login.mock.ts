const validPassword = 'sortudo';
const validUsername = 'Eddie';

const noUsernameLoginBody = { username: '', password: validPassword };

const noPasswordLoginBody = { username: validUsername, password: '' };

const notExistingUserBody = { username: 'Ana', password: validPassword };

const existingUserWithWrongPasswordBody = { username: validUsername, password: 'wrong_password' };

const resultTokenLogin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVkZGllIiwicGFzc3dvcmQiOiJzb3J0dWRvIn0.pZDnJ_xAXOssgCRvmnSryDe2CHwSb7j9n8v8hamxky4"

const existingUser = {
  username: 'Eddie',
  vocation: 'Guerreiro',
  level: 10,
  password: resultTokenLogin,
};

const validLoginBody = { username: validUsername, password: validPassword };


export default {
  noUsernameLoginBody,
  resultTokenLogin,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  existingUser,
  validLoginBody
}