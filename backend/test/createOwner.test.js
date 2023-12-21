const { create } = require('../controllers/ownerController');
const Owner = require('../models/Owner');

// Mock the save method on the Owner prototype
Owner.prototype.save = jest.fn();

// Reset the mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('create owner function', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { name: 'John Doe', email: 'john@example.com' } // Replace with the structure of your owner data
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should successfully add an owner', async () => {
    Owner.prototype.save.mockResolvedValue(req.body);

    await create(req, res);

    expect(Owner.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Owner added successfully', owner: req.body });
  });

  it('should handle errors when adding an owner', async () => {
    const errorMessage = 'Failed to add Owner';
    Owner.prototype.save.mockRejectedValue(new Error(errorMessage));

    await create(req, res);

    expect(Owner.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
