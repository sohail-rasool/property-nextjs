import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: process.env.CLOUDUNARY_CLOUD_NAME, 
  api_key: process.env.CLOUDUNARY_API_KEY, 
  api_secret: process.env.CLOUDUNARY_API_SECRET
});

export default cloudinary;