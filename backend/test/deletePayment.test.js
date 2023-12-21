const { deletePayment } = require('../controllers/paymentController'); // Adjust path as necessary
const Payment = require('../models/Payment'); // Adjust path as necessary

// Mock Payment model
jest.mock('../models/Payment', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('deletePayment function', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: { id: 'paymentId' }, // Example payment ID
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should delete the payment successfully', async () => {
    const mockDeletedPayment = { _id: req.params.id, amount: 100, method: 'credit card' }; // Mock deleted payment data
    Payment.findByIdAndDelete.mockResolvedValue(mockDeletedPayment);

    await deletePayment(req, res);

    expect(Payment.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Payment deleted successfully', payment: mockDeletedPayment });
  });

  it('should return 404 if the payment is not found', async () => {
    Payment.findByIdAndDelete.mockResolvedValue(null);

    await deletePayment(req, res);

    expect(Payment.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Payment not found' });
  });

  it('should handle errors when deleting a payment', async () => {
    const errorMessage = 'Failed to delete Payment';
    Payment.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    await deletePayment(req, res);

    expect(Payment.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  }); 
});
