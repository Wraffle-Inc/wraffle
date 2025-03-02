import API_URL from '../../api/urls';
import {HttpResponse, http} from 'msw';
import SettlementList from '@/app/api/settlementList/type';

const url = API_URL.SETTLEMENTS.LIST;

const mockSettlementList: SettlementList = {
  status: 200,
  code: '',
  data: {
    users: [
      {
        id: 1,
        name: '김하늘',
        requestDate: '2021-08-05T00:00:00.000Z',
        email: 'example.com',
        requestCharge: '50,000',
        remainCharge: '20,000',
      },
      {
        id: 2,
        name: '김하늘',
        requestDate: '2021-08-05T00:00:00.000Z',
        email: 'example.com',
        requestCharge: '50,000',
        remainCharge: '20,000',
      },
    ],
  },
};

const mockSettlementListHandler = http.get(url, () => {
  return HttpResponse.json(mockSettlementList);
});

export default mockSettlementListHandler;
