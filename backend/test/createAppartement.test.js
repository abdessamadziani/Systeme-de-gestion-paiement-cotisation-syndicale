const  create  = require('../controllers/appartementController').create; // Import the function to be tested
const Appartement = require('../models/Appartement'); // Import the Appartement model or the relevant dependencies


describe('create function', () => {
  it('should create a new Appartement and return it', async () => {
    const req = {
      body: {
        // Mock the request body data here
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const savedAppartement = {
      // Mock the saved Appartement data here
    };

    // Mock the save method of the Appartement constructor
    const saveSpy = jest.spyOn(Appartement.prototype, 'save');
    saveSpy.mockResolvedValue(savedAppartement);

    await create(req, res);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith();

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Appartement added successfully',
      appartement: savedAppartement,
    });

    // Restore the original save method
    saveSpy.mockRestore();
  });

  it('should handle errors and return a 500 status code', async () => {
    const req = {
      body: {
        // Mock the request body data here
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const error = new Error('Test error message');

    // Mock the save method of the Appartement constructor to throw an error
    const saveSpy = jest.spyOn(Appartement.prototype, 'save');
    saveSpy.mockRejectedValue(error);

    await create(req, res);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith();

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to add Appartement' });

    // Restore the original save method
    saveSpy.mockRestore();
  });
});
