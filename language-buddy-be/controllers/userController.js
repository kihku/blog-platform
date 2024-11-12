exports.checkId = (req, res, next, val) => {
    if(req.params.id * 1 > 3) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next()
}

exports.getUser = (req, res) => {
    console.log(req.params);
}