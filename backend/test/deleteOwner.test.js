const { deleteOwner } = require('../controllers/ownerController'); // Replace with the actual file name
const Owner = require('../models/Owner'); // Replace with the actual path to your Owner model

// Mock Owner model
jest.mock('../models/Owner', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('deleteOwner function', () => {
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

  it('should delete the owner successfully', async () => {
    const mockDeletedOwner = { _id: req.params.id, name: 'John Doe' }; // Mock deleted owner data
    Owner.findByIdAndDelete.mockResolvedValue(mockDeletedOwner);

    await deleteOwner(req, res);

    expect(Owner.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Owner deleted successfully', owner: mockDeletedOwner });
  });

  it('should return 404 if the owner is not found', async () => {
    Owner.findByIdAndDelete.mockResolvedValue(null);

    await deleteOwner(req, res);

    expect(Owner.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Owner not found' });
  });

  it('should handle errors when deleting an owner', async () => {
    const errorMessage = 'Failed to delete Owner';
    Owner.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    await deleteOwner(req, res);

    expect(Owner.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
