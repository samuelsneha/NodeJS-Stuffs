function logger(req,res,next){
    console.log('logging middleware function...')
    next();
};

module.exports = logger;