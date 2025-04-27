//users/:id: GET (Fetch a single user)
import userData from "../../data/users.json" with { type: 'json' };

const getUserById = (id) => {
  return userData.users.find((user) => user.id === id);
};

export default getUserById;