//host/:id PUT (Update a host)
import hostData from "../../data/hosts.json" with { type: 'json' };

const updateHostById = ({id, username, password, name, email, phoneNumber, profilePicture, aboutMe}) => { // the full details of the user are passed in the body of the request
  const host = hostData.hosts.find((host) => host.id === id);

 if (!host) {
    return null;
  }

  host.username = username ?? host.username;
  host.password = password ?? host.password;
  host.name = name ?? host.name;
  host.email = email ?? host.email;
  host.phoneNumber = phoneNumber ?? host.phoneNumber;
  host.profilePicture = profilePicture ?? host.profilePicture;
  host.aboutMe = aboutMe ?? host.aboutMe;

  return host;
};

export default updateHostById;

