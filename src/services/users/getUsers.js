//users: GET (Fetch all users and their information)
import userData from "../../data/users.json" with { type: 'json' };

const getUsers = (username, password) => {
  let users = userData.users;

  if (username) {
    users = users.filter((user) => user.username === username);
  }

  if (password !== undefined) {
    users = users.filter((user) => user.password === JSON.parse(password));
  }

  return users;
};

export default getUsers;