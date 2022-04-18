import sharp from 'sharp'

// let inputFile  = "img.jpg";
// let outputFile = "output.jpg";

const resize = async (
    inputFile: string | any,
    width: number | undefined = undefined,
    height: number | undefined = undefined
) => {
    try {
        // const options = {
        //     height: height,
        //     width: width,
        // }
        // const extension = inputFile.match(/.w+$/)![0]
        // const name = inputFile.replace(extension, '')
        
        const resized = sharp(inputFile).resize({height: 200})
        
        resized.toFile('sdf.png').then( res => {
            // console.log(res);
        })  
        // const fileInfo = await resized.toFile(
        //     `${name}-${width ?? ''}-${height ?? ''}${'.png'}`
        // )
    } catch (err) {
        console.log(err)
    }
}

export default resize
