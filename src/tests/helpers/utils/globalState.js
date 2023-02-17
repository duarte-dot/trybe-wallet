import mockData from '../mockData';

const INITIAL_STATE = {
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '30',
        description: 'lanchão',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ],
  },
};
export default INITIAL_STATE;
