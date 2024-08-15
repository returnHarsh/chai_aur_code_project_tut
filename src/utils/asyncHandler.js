// creating a wrapper function for all the functions

// const asyncHandler = (fn)=> async(req,res,next)=>{
//     try{

//         await fn(req,res,next);

//     }catch(err){
//         return res.status(501).json({success : false , message : err.message});
//     }
// }


// creating a wrapper function using Promise
const asyncHandler = (fn)=>{
    (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).catch(err=>next(err));
    }
}

export {asyncHandler};