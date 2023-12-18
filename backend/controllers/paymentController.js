const express = require('express');
const Payment = require('../models/Payment');

exports.create = async (req, res) => {
    try {
        const payment = new Payment(req.body);
        const savedPayment = await payment.save();

        res.status(200).json({ message: 'Payment added successfully', payment: savedPayment });
        console.log(req.body)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add Payment' });
    }
};


exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('ownerId').populate('appartementId');
        // const payments = await Payment.find();


        res.status(200).json({ message: 'payments grabbed successfully', payments: payments });
        console.log(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get Payments' });
    }
}; 

exports.updatePayment = async (req, res) => {
    const paymentId = req.params.id; // Assuming you are passing the owner ID in the request parameters
    const updateData = req.body;
console.log(updateData)
console.log(req.body)
    try {

        // Use findByIdAndUpdate with { new: true } to return the updated document
        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateData, { new: true });
        console.log(updateData)

        if (updatedPayment) {
            res.status(200).json({ message: 'Payment updated successfully', owner: updatedPayment });
            console.log(updateData)

        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update Payment' });
    }
};



// exports.deleteOwner = async (req, res) => {
//     const ownerId = req.params.id; // Assuming you are passing the owner ID in the request parameters
//     try {
//         const deletedOwner = await Owner.findByIdAndDelete(ownerId);
        
//         if (deletedOwner) {
//             res.status(200).json({ message: 'Owner deleted successfully', owner: deletedOwner });
//         } else {
//             res.status(404).json({ message: 'Owner not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to delete Owner' });
//     }
// };







