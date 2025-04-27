//user/:id DELETE (Remove a user)
import userData from "../../data/users.json" with { type: 'json' };

const deleteUserById = (id) => {
  const index = userData.users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }
  userData.users.splice(index, 1);
  return id;
};

export default deleteUserById;
