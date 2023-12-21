const { getOwnerById } = require('../controllers/ownerController'); // Replace with the actual file name
const Owner = require('../models/Owner'); // Replace with the actual path to your Owner model

// Mock Owner model
jest.mock('../models/Owner', () => ({
  findById: jest.fn(),
}));

describe('getOwnerById function', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: { id: 'ownerId' }, // Example owner ID
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should grab the owner by ID successfully', async () => {
    const mockOwner = { _id: req.params.id, name: 'John Doe' }; // Mock owner data
    Owner.findById.mockResolvedValue(mockOwner);

    await getOwnerById(req, res);

    expect(Owner.findById).toHaveBeenCalledWith({ _id: req.params.id });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Owner  grabbed successfully', owner: mockOwner });
  });

  it('should handle errors when getting an owner by ID', async () => {
    const errorMessage = 'Failed to get the Owner';
    Owner.findById.mockRejectedValue(new Error(errorMessage));

    await getOwnerById(req, res);

    expect(Owner.findById).toHaveBeenCalledWith({ _id: req.params.id });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
