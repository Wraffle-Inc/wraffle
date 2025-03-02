import API_URL from '../../config/urls';
import UserList from './type';

const fetchUserList = async (): Promise<UserList> => {
  const res = await fetch(API_URL.USERS.LIST);

  return res.json();
};

export default fetchUserList;
