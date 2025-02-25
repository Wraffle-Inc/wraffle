import API_URL from '../urls';

const fetchUserList = async () => {
  const res = await fetch(API_URL.USERS);
  return res.json();
};

export default fetchUserList;
