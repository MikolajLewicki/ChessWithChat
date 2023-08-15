import logger from "../logs/logger.js"

export const getStatus = async (req, res) => {
    try{
        logger.info('getStatus api point used')

        res.status(200).json({message: 'OK!'})
    }catch(err){
        logger.error(err)
        res.status(500).json({message: 'Something went wrong'})
    }
}