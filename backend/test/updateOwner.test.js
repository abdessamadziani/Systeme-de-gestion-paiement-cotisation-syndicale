const { updateOwner } = require('../controllers/ownerController'); // Replace with the actual file name
const Owner = require('../models/Owner'); // Replace with the actual path to your Owner model

// Mock Owner model
jest.mock('../models/Owner', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('updateOwner function', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: { id: 'ownerId' }, // Example owner ID
      body: { name: 'Updated Name', email: 'updated@example.com' } // Example update data
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should update the owner successfully', async () => {
    const mockUpdatedOwner = { ...req.body, _id: req.params.id };
    Owner.findByIdAndUpdate.mockResolvedValue(mockUpdatedOwner);

    await updateOwner(req, res);

    expect(Owner.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Owner updated successfully', owner: mockUpdatedOwner });
  });

  it('should return 404 if the owner is not found', async () => {
    Owner.findByIdAndUpdate.mockResolvedValue(null);

    await updateOwner(req, res);

    expect(Owner.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, { new: true });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Owner not found' });
  });

  it('should handle errors when updating an owner', async () => {
    const errorMessage = 'Failed to update Owner';
    Owner.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));

    await updateOwner(req, res);

    expect(Owner.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, { new: true });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
