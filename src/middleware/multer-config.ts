const multer = require('multer');

const MIME_TYPES: { [x: string]: string; } = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req: any, file: any, callback: (arg0: null, arg1: string) => void) => {
    callback(null, 'images');
  },
  filename: (req: any, file: { originalname: string; mimetype: string | number; }, callback: (arg0: null, arg1: string) => void) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');
