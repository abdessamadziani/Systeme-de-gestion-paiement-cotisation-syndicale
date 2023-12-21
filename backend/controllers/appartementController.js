const express = require('express');
const Appartement = require('../models/Appartement');
const Owner = require('../models/Owner');


exports.create = async (req, res) => {
    try {
        const appartement = new Appartement(req.body);
        const savedAppartement = await appartement.save();

        res.status(200).json({ message: 'Appartement added successfully', appartement: savedAppartement });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add Appartement' });
    }
};


exports.getAppartements = async (req, res) => {
    try {
        const appartements = await Appartement.find().populate('ownerId');

        res.status(200).json({ message: 'Appartements grabbed successfully', appartements: appartements });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get Appartements' });
    }
}; 











exports.getAppartementsNumber = async (req, res) => {
    const buildingName = req.params.name;  // Get the building name from query parameters
    console.log(buildingName)
    try {
        const appartementsNumber = await Appartement.find({ building: buildingName }).populate('ownerId');
        res.status(200).json({ message: 'Appartements room numbers grabbed successfully', appartementsNumber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get Appartements room numbers' });
    }

};

exports.getAppartementById= async (req, res) => {
    const id = req.params.id;  // Get the building name from query parameters
    console.log(id)
    try {
        const appartement = await Appartement.findById({ _id: id }).populate('ownerId');
        res.status(200).json({ message: 'Appartement  grabbed successfully', appartement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get the Appartement' });
    }

};



exports.getOwnerByAppartementNumber = async (req, res) => {
    const appartementNb = req.params.nb; // Get the apartment number from query parameters
  
  

    
    try {
        const appartements = await Appartement.find({ nb: appartementNb }).populate('ownerId');

        if (appartements.length === 0) {
            return res.status(404).json({ message: 'No appartements found with the given number' });
        }

        // Extracting owner information from each apartment
        const owners = appartements.map(appartement => appartement.ownerId);

        res.status(200).json({ message: 'Owners fetched successfully', owners });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get the Owners' });
    }


  };


exports.updateAppartement = async (req, res) => {
    const appartementId = req.params.id; // Assuming you are passing the owner ID in the request parameters
    const updateData = req.body;


    try {

        const updatedAppartement = await Appartement.findByIdAndUpdate(appartementId, updateData, { new: true });

        if (updatedAppartement) {
            res.status(200).json({ message: 'Appartement updated successfully', appartement: updatedAppartement });

        } else {
            res.status(404).json({ message: 'Appartement not found' });
        }
    } catch (error) {
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
        res.status(500).json({ error: 'Failed to delete Appartement' });
    }

};







