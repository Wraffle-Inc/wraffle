import API_URL from '../urls';
import SettlementList from './type';

const fetchSettlementList = async (): Promise<SettlementList> => {
  const res = await fetch(API_URL.SETTLEMENTS.LIST);

  return res.json();
};

export default fetchSettlementList;
