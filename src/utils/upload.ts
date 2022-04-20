import multer from 'multer'

const storage = multer.diskStorage({
    destination: './gallery',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage }).single('image')

export default upload
