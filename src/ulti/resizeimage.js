import fs from 'fs'
import sharp from 'sharp'

export default function resizeimage(path,format,width,height){
    const readStream = fs.createReadStream(path);
    let transform = sharp()
    if (format) {
        transform = transform.toFormat(format)
    }
    if (width || height) {
        transform = transform.resize(width, height)
    }
    return readStream.pipe(transform)
}