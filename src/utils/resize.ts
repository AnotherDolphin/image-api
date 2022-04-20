import sharp from 'sharp'
import fs from 'fs'

const resize = async (
    inputFile: string,
    width: number = NaN,
    height: number = NaN
) => {
    try {
        // set target width and/or height if provided
        const options: { [k: string]: number } = {}
        if (width) options.width = width
        if (height) options.height = height
        console.log(height);
        
        // construct outfile name
        const extension = inputFile.match(/\.\w+$/)![0]
        const name = inputFile.replace(extension, '')
        let outputFile: string =
            name +
            '@' +
            (options.width ?? '') +
            'x' +
            (options.height ?? '') +
            extension

        // return img if this size is cached
        if (fs.existsSync(outputFile)) return outputFile

        // resize and return new image
        const resized = sharp(inputFile).resize(options)
        await resized.toFile(outputFile)
        return outputFile
    } catch (err) {
        console.log(err)
    }
}

export default resize
