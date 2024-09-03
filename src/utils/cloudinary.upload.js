const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

// utility fn to upload the file to the cloudinary server and getting url to that.
const cloudinaryUpload = async function (localFilePath) {
  try {
    if (!localFilePath) return null; // if file path is wrong.
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    console.log(
      `file is uploaded successfully on the cloudinary, url: ${uploadResult.url()}`
    );
    return uploadResult;
  } catch (error) {
    // if file not find or some error in uploading file at cloudinary, then unlink the local file from our server.
    fs.unlinkSync(localFilePath); // do sync, because need to be done first.
    return null;
  }
};

module.exports = {
  cloudinaryUpload,
};
