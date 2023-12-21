const express = require('express');
const Owner = require('../models/Owner');

exports.create = async (req, res) => {
    try {
        const owner = new Owner(req.body);
        const savedOwner = await owner.save();

        res.status(200).json({ message: 'Owner added successfully', owner: savedOwner });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add Owner' });
    }
};


exports.getOwners = async (req, res) => {
    try {
        const owners = await Owner.find();

        res.status(200).json({ message: 'Owners grabbed successfully', owners: owners });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Owners' });
    }
}; 


exports.getOwnerById= async (req, res) => {
    const id = req.params.id;  // Get the building name from query parameters
    try {
        const owner = await Owner.findById({ _id: id });
        res.status(200).json({ message: 'Owner  grabbed successfully', owner });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get the Owner' });
    }

};

exports.updateOwner = async (req, res) => {
    const ownerId = req.params.id; // Assuming you are passing the owner ID in the request parameters
    const updateData = req.body;
    try {

        const updatedOwner = await Owner.findByIdAndUpdate(ownerId, updateData, { new: true });

        if (updatedOwner) {
            res.status(200).json({ message: 'Owner updated successfully', owner: updatedOwner });

        } else {
            res.status(404).json({ message: 'Owner not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Owner' });
    }
};



exports.deleteOwner = async (req, res) => {
    const ownerId = req.params.id;
    try {
        const deletedOwner = await Owner.findByIdAndDelete(ownerId);
        
        if (deletedOwner) {
            res.status(200).json({ message: 'Owner deleted successfully', owner: deletedOwner });
        } else {
            res.status(404).json({ message: 'Owner not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Owner' });
    }
};







