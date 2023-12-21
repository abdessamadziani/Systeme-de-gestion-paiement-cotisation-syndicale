const { getOwners } = require('../controllers/ownerController'); // Replace with the actual file name
const Owner = require('../models/Owner'); // Replace with the actual path to your Owner model

// Mock Owner model
jest.mock('../models/Owner', () => ({
  find: jest.fn(),
}));

describe('getOwners function', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {}; // Since getOwners does not use request body or params
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should grab all owners successfully', async () => {
    const mockOwners = [{ name: 'John Doe' }, { name: 'Jane Doe' }]; // Mock data
    Owner.find.mockResolvedValue(mockOwners);

    await getOwners(req, res);

    expect(Owner.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Owners grabbed successfully', owners: mockOwners });
  });

  it('should handle errors when getting owners', async () => {
    const errorMessage = 'Failed to get Owners';
    Owner.find.mockRejectedValue(new Error(errorMessage));

    await getOwners(req, res);

    expect(Owner.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
