const express = require('express');
const Payment = require('../models/Payment');
const Appartement = require('../models/Appartement');


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

exports.getPaymentById= async (req, res) => {
    const id = req.params.id;  // Get the building name from query parameters
    console.log(id)
    try {
        const payment = await Payment.findById({ _id: id }).populate('appartementId');
        res.status(200).json({ message: 'Payment  grabbed successfully', payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get the Payment' });
    }

    // res.json({ message: 'hello' });


};

// exports.updatePayment = async (req, res) => {
//     const paymentId = req.params.id; // Assuming you are passing the owner ID in the request parameters
//     const updateData = req.body;
// console.log(updateData)
// console.log(req.body)
//    try {

//         const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateData, { new: true });
//         console.log(updateData)

//         if (updatedPayment) {
//             res.status(200).json({ message: 'Payment updated successfully', payment: updatedPayment });
//             console.log(updateData)

//         } else {
//             res.status(404).json({ message: 'Payment not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to update Payment' });
//     }
//     //  res.json({ message: 'Hii' });

// };






// exports.updatePayment = async (req, res) => {
//     const paymentId = req.params.id;
//     const updateData = req.body;
  
//     try {
//       // Update the Appartement document first if appartementId is provided
//       if (updateData?.appartementId) {
//         const appartementId = updateData?.appartementId?._id; // Extract the ID
//         await Appartement.findByIdAndUpdate(appartementId, {
//           nb: updateData?.appartementId?.nb,
//           building: updateData?.appartementId?.building,
//         });
//       }
  
//       // Then update the Payment document
//       const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateData, { new: true });
  
//       if (updatedPayment) {
//         res.status(200).json({ message: 'Payment updated successfully', payment: updatedPayment });
//       } else {
//         res.status(404).json({ message: 'Payment not found' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to update Payment' });
//     }
//   };
  

exports.updatePayment = async (req, res) => {
    const paymentId = req.params.id;
    const updateData = req.body;
  
    try {
      // Check if appartementId is provided
      if (updateData?.appartementId && updateData.appartementId._id) {
        const { _id, nb, building } = updateData.appartementId;
        await Appartement.findByIdAndUpdate(_id, { nb, building });
      }
  
      // Update Payment document
      const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateData, { new: true });
  
      if (updatedPayment) {
        res.status(200).json({ message: 'Payment updated successfully', payment: updatedPayment });
      } else {
        res.status(404).json({ message: 'Payment not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update Payment' });
    }
  };
  




exports.deletePayment = async (req, res) => {
    const paymentId = req.params.id; // Assuming you are passing the owner ID in the request parameters
    try {
        const deletedPayment = await Payment.findByIdAndDelete(paymentId);
        
        if (deletedPayment) {
            res.status(200).json({ message: 'Payment deleted successfully', payment: deletedPayment });
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete Payment' });
    }
};







