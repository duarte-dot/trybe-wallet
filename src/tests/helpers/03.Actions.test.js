import mockData from './mockData';
import { addCurrencies, fetchCurrencies, fetchExpenses } from '../../redux/actions';

describe('fetchCurrencies', () => {
  it('dispatches addCurrencies with the fetched currencies codes', () => {
    const mockDispatch = jest.fn();
    const mockCurrencies = mockData;
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockCurrencies),
    }));

    return fetchCurrencies()(mockDispatch).then(() => {
      for (let i = 0; i < mockData.length; i += 1) {
        expect(mockDispatch).toHaveBeenCalledWith(addCurrencies([mockData[i]]));
      }
    });
  });
});

describe('fetchExpenses', () => {
  it('fetches the expenses from the API', () => {
    const mockExpenses = { USD: { ask: 4.5 }, EUR: { ask: 5.0 } };
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockExpenses),
    }));

    return fetchExpenses().then((expenses) => {
      expect(expenses).toEqual(mockExpenses);
    });
  });
});
