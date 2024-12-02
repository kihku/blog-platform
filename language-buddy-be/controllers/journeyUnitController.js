const { createUnit, getUnitList } = require('../services/journeyUnitService');

exports.getListUnit = async (req, res) => {
  try {
    const units = await getUnitList(req.params);
    res.status(201).json({ status: 'success', data: units });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err._message,
    });
  }
};

exports.createUnit = async (req, res) => {
  try {
    const unit = await createUnit(req.body);
    res
      .status(201)
      .json({ status: 'success', data: { id: unit._id.toString() } });
  } catch (err) { 
    res.status(400).json({
      status: 'fail',
      message: err._message,
    });
  }
}; 
