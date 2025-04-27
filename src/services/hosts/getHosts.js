//hosts: GET (Fetch all hosts and their information)
import hostData from "../../data/hosts.json" with { type: 'json' };

const getHosts = (username, password) => {
  let hosts = hostData.hosts;

  if (username) {
    hosts = hosts.filter((host) => host.username === username);
  }

  if (password !== undefined) {
    hosts = hosts.filter((host) => host.password === JSON.parse(password)); //formatting
  }

  return hosts;
};

export default getHosts;