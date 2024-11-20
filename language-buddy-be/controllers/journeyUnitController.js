const JourneyUnit = require('../models/journeyUnitModel');

exports.getListUnit = async (req, res) => {
  try {
    const units = await JourneyUnit.find(req.params);
    res.status(201).json({ status: 'success', data: { units } });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
