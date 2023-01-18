
export function ErrorHandler(err,res) {

    return res.status(500).json({
        status:'error',
        message:'Global Error'
    })
}