const { create } = require('../controllers/paymentController');
const Payment = require('../models/Payment');

// Mock the save method on the Payment prototype
Payment.prototype.save = jest.fn();

describe('create payment function', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: { amount: 100, method: 'credit card' } // Example payment data
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should successfully add a payment', async () => {
    Payment.prototype.save.mockResolvedValue(req.body);

    await create(req, res);

    expect(Payment.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Payment added successfully', payment: req.body });
  });

  it('should handle errors when adding a payment', async () => {
    const errorMessage = 'Failed to add Payment';
    Payment.prototype.save.mockRejectedValue(new Error(errorMessage));

    await create(req, res);

    expect(Payment.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
