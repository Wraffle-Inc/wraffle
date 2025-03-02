interface SettlementList {
  status: number;
  code: string;
  data: {
    users: Settlement[];
  };
}

interface Settlement {
  id: number;
  name: string;
  requestDate: string;
  email: string;
  requestCharge: string;
  remainCharge: string;
}

export default SettlementList;
