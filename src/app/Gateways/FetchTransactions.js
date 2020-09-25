import { hackneyToken } from '../lib/Cookie';

export default async id => {
  const response = await fetch(
    `${process.env.REACT_APP_HN_API_URL}/tenancies/${id}/transactions`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hackneyToken()}`
      }
    }
  );
  return response.json();
};
