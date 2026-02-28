import fs from 'fs';
import { ApiError } from '../utils/ApiError.js';
import { imageKit } from '../utils/imageKit.js';



const uploadonImageKit = async(imageLocalPath)=>{
    try{
        if(!imageLocalPath){
            throw new ApiError(400,"image is missing")
        }


        const response =  await imageKit.upload({ 
    file: fs.readFileSync(imageLocalPath.path), 
    fileName: imageLocalPath.originalname,
    folder : '/bikes'    
});     

    const transformedUrl = imageKit.url({
 path : response.filePath,
  transformation: [
    {
      width: 1280,
      quality: "auto",
      format: "webp",
    },
  ],
  }); 
  
  if (imageLocalPath?.path) {
            fs.unlinkSync(imageLocalPath.path);
        }


  return transformedUrl;

}
    catch(error){
       if(imageLocalPath?.path){
        fs.unlinkSync(imageLocalPath.path)
       }
       throw error
    }
}

export default uploadonImageKit;

