const fs = require('fs/promises');
const path = require('path');

const uploadFolder = path.join(__dirname, '..', 'uploads');

async function uploadFile(file) {
  const { originalname, buffer } = file;
  const fileName = originalname;
  const filePath = path.join(uploadFolder, fileName);

  try {
    // Ensure the upload folder exists
    await fs.mkdir(uploadFolder, { recursive: true });

    // Write the file to the specified path
    await fs.writeFile(filePath, buffer);

    return `/uploads/${fileName}`;
  } catch (error) {
    throw error; // Handle the error at a higher level, e.g., in your route handler
  }
}

module.exports = { uploadFile };