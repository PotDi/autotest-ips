import path from 'path'

const ATTACH_PATH: string = path.join(__dirname, './files/test.txt')

const images: string[] = [
    './src/common/data/files/imagepng800600.png',
    './src/common/data/files/PngbigImage.png',
    './src/common/data/files/JPGFullHd.jpg',
]

export {
    ATTACH_PATH,
    // imagesPath,
    images,
}