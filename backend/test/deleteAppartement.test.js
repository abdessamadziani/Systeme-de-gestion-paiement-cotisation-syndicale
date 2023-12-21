const { deleteAppartement } = require('../controllers/appartementController');
const Appartement = require('../models/Appartement');

// Correctly mock Appartement model
jest.mock('../models/Appartement', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('deleteAppartement', () => {
  let req, res;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup mock request and response
    req = { params: { id: 'some_id' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should delete the appartement if it exists', async () => {
    Appartement.findByIdAndDelete.mockResolvedValue({ _id: req.params.id });

    await deleteAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Appartement deleted successfully', appartement: { _id: req.params.id } });
  });

  it('should respond with 404 if the appartement is not found', async () => {
    Appartement.findByIdAndDelete.mockResolvedValue(null);

    await deleteAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Appartement not found' });
  });

  it('should handle errors', async () => {
    const errorMessage = 'Failed to delete Appartement';
    Appartement.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    await deleteAppartement(req, res);

    // Check for the correct status and error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
