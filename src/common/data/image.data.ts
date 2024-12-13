import path from 'path'


const ATTACH_PATH: string = path.join(__dirname, './files/test.txt')

const images: string[] = [
    './src/common/data/files/imagepng800600.png',
    './src/common/data/files/bigImage.png',
    './src/common/data/files/gifImage.gif',
]
// const imagesPath: string[] = images.map(images => path.join(__dirname, images))


export {
    ATTACH_PATH,
    // imagesPath,
    images,
}