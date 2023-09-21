const fs = require('fs/promises');
const path = require('path');

const uploadFolder = path.join(__dirname, '..', 'uploads');

async function uploadFile(file) {
  const { originalname, buffer } = file;
  const fileName = originalname;

  const filePath = path.join(uploadFolder, fileName);

  await fs.writeFile(filePath, buffer);

  return `/uploads/${fileName}`;
}

module.exports = { uploadFile };