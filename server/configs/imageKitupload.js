import fs from 'fs';
import { ApiError } from '../utils/ApiError.js';
import { imageKit } from '../utils/imageKit.js';

const uploadonImageKit = async (imageLocalPath) => {
    try {
        if (!imageLocalPath || !imageLocalPath.path) {
            throw new ApiError(400, "Image file is missing");
        }

        const fileBuffer = fs.readFileSync(imageLocalPath.path);

        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageLocalPath.originalname,
            folder: '/bikes'
        });

        const transformedUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                {
                    width: 1280,
                    quality: "auto",
                    format: "webp",
                },
            ],
        });

        if (fs.existsSync(imageLocalPath.path)) {
            fs.unlinkSync(imageLocalPath.path);
        }

        return transformedUrl;

    } catch (error) {
        if (imageLocalPath?.path && fs.existsSync(imageLocalPath.path)) {
            try {
                fs.unlinkSync(imageLocalPath.path);
            } catch (unlinkError) {
                console.error("Failed to delete local file:", unlinkError);
            }
        }
        throw new ApiError(500, error.message || "Internal Server Error during image upload");
    }
}

export default uploadonImageKit;