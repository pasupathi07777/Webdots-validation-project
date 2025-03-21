const errorHandler=(error,req,res,next)=>{
    res.status(error.statusCode || 500).json({success:false,message:error.message|| "Internal server error"})
}

export default errorHandler 