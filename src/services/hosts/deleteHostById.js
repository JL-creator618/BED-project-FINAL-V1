//host/:id DELETE (Remove a host)
import hostData from "../../data/hosts.json" with { type: 'json' };

const deleteHostById = (id) => {
  const hostIndex = hostData.hosts.findIndex((host) => host.id === id);

  if (hostIndex === -1) {
    return null; 
  }
  hostData.hosts.splice(hostIndex, 1);
  return id;
};

export default deleteHostById;
