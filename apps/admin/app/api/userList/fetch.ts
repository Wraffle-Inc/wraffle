import API_URL from '../urls';
import UserList from './type';

const fetchUserList = async (): Promise<UserList> => {
  const res = await fetch(API_URL.USERS);

  return res.json();
};

export default fetchUserList;
