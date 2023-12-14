const express = require('express');
const Appartement = require('../models/Appartement');

exports.create = async (req, res) => {
    try {
        const appartement = new Appartement(req.body);
        const savedAppartement = await appartement.save();

        res.status(200).json({ message: 'Appartement added successfully', appartement: savedAppartement });
        console.log(req.body)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add Appartement' });
    }
};


exports.getAppartements = async (req, res) => {
    try {
        const appartements = await Appartement.find();

        res.status(200).json({ message: 'Appartements grabbed successfully', appartements: appartements });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get Appartements' });
    }
}; 

exports.updateAppartement = async (req, res) => {
    const appartementId = req.params.id; // Assuming you are passing the owner ID in the request parameters
    const updateData = req.body;
console.log(updateData)
console.log(req.body)
    try {

        // Use findByIdAndUpdate with { new: true } to return the updated document
        const updatedAppartement = await Appartement.findByIdAndUpdate(appartementId, updateData, { new: true });
        console.log(updateData)

        if (updatedAppartement) {
            res.status(200).json({ message: 'Appartement updated successfully', appartement: updatedAppartement });
            console.log(updateData)

        } else {
            res.status(404).json({ message: 'Appartement not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update Appartement' });
    }
};



exports.deleteAppartement = async (req, res) => {
    const appartementId = req.params.id; // Assuming you are passing the owner ID in the request parameters
    try {
        const deletedAppartement = await Appartement.findByIdAndDelete(appartementId);
        
        if (deletedAppartement) {
            res.status(200).json({ message: 'Appartement deleted successfully', appartement: deletedAppartement });
        } else {
            res.status(404).json({ message: 'Appartement not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete Appartement' });
    }
};







