const { updateAppartement } = require('../controllers/appartementController');
const Appartement = require('../models/Appartement');

// Mock Appartement model
jest.mock('../models/Appartement', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('updateAppartement', () => {
  let req, res;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup mock request and response
    req = {
      params: { id: 'some_id' },
      body: { someField: 'newValue' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should update the appartement if it exists', async () => {
    const mockAppartement = { _id: req.params.id, ...req.body };
    Appartement.findByIdAndUpdate.mockResolvedValue(mockAppartement);

    await updateAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Appartement updated successfully', appartement: mockAppartement });
  });

  it('should respond with 404 if the appartement is not found', async () => {
    Appartement.findByIdAndUpdate.mockResolvedValue(null);

    await updateAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Appartement not found' });
  });

  it('should handle errors', async () => {
    const errorMessage = 'Failed to update Appartement';
    Appartement.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));

    await updateAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
