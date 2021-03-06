import createDocumentRequest from './CreateDocumentRequest';
import { enableFetchMocks } from 'jest-fetch-mock';
import { email, hackneyToken, username } from '../../lib/Cookie';
jest.mock('../../lib/Cookie');

describe('CreateDocumentRequest', () => {
  beforeEach(() => {
    enableFetchMocks();
    email.mockImplementation(() => 'joe@email.com');
    hackneyToken.mockImplementation(() => 'token');
    username.mockImplementation(() => 'Joe Bloggs');
    process.env.REACT_APP_DOC_UPLOAD_API_URL = 'http://doc-upload';
  });

  const customer = {
    systemIds: {
      jigsaw: ['263272'],
      academyBenefits: ['60940760', '60940888'],
      academyCouncilTax: ['333333399', '399999999'],
      uhtHousingRegister: ['DIR0148754/1'],
      uhw: ['334351']
    },
    dob: ['1969-02-01 12:00:00'],
    name: [
      { first: 'Sarah', last: 'Smith', title: 'Miss' },
      { first: 'Sarahh', last: 'Smithh', title: 'Miss' }
    ]
  };

  it('can create a document request', async () => {
    const expectedMetadata = {
      firstName: [customer.name[0].first, customer.name[1].first],
      lastName: [customer.name[0].last, customer.name[1].last],
      dob: customer.dob,
      requestedBy: 'Joe Bloggs',
      requestedByEmail: 'joe@email.com',
      'systemId.jigsaw': customer.systemIds.jigsaw,
      'systemId.academyBenefits': customer.systemIds.academyBenefits,
      'systemId.academyCouncilTax': customer.systemIds.academyCouncilTax,
      'systemId.uhtHousingRegister': customer.systemIds.uhtHousingRegister,
      'systemId.uhw': customer.systemIds.uhw
    };
    const requestId = 'doc123';
    const expectedUrl = `http://doc-upload/requests/${requestId}`;
    fetch.mockResponse(JSON.stringify({ requestId }));

    const result = await createDocumentRequest(customer);

    expect(fetch).toHaveBeenCalledWith('http://doc-upload/requests', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer token',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ metadata: expectedMetadata })
    });
    expect(result.requestUrl).toEqual(expectedUrl);
    expect(result.success).toEqual(true);
  });

  it('fails if customer record is invalid', async () => {
    const result = await createDocumentRequest();
    expect(result.success).toEqual(false);
  });

  it('fails if create fails', async () => {
    fetch.mockImplementationOnce(() => ({ ok: false, status: 500 }));
    const result = await createDocumentRequest(customer);
    expect(result.success).toEqual(false);
  });

  it('fails if create fails', async () => {
    fetch.mockImplementationOnce(() => ({ ok: false, status: 500 }));
    const result = await createDocumentRequest(customer);
    expect(result.success).toEqual(false);
  });

  it('fails if error thrown', async () => {
    console.log = jest.fn();
    fetch.mockImplementationOnce(() => {
      throw new Error();
    });
    const result = await createDocumentRequest(customer);
    expect(result.success).toEqual(false);
  });
});
