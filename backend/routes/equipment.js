const express = require('express');
const Equipments = require('../models/equipment');

const router = express.Router();

//add equipment
router.post('/equipment/save', (req, res) => {
    let newEquipment = new Equipments(req.body);

    newEquipment.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Equipment saved successfully."
        });
    });
});

//get equipments
router.get('/equipments', (req, res) => {
    Equipments.find().exec((err, equipments) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingEquipments: equipments
        });
    });
});

//get specific equipment
router.get('/equipment/:id', (req, res) => {
    let equipmentId = req.params.id;
    Equipments.findById(equipmentId, (err, equipment) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            equipment
        });
    });
});

//update equipment
router.put('/equipment/update/:id', (req, res) => {
    Equipments.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, equipment) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Update successfully."
            });
        }
    );
});

//delete equipment
router.delete('/equipment/delete/:id', (req, res) => {
    Equipments.findByIdAndRemove(req.params.id).exec((err, deletedequipment) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful.", err
        });

        return res.json({
            message: "Delete Successfull.", deletedequipment
        });
    });
});

module.exports = router;