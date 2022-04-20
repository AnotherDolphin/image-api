import fs from 'fs'
import path from 'path'

const isCached = (image: string, width: number = NaN, height: number = NaN) => {
    let destination: string
    // no resize values in image search
    if (!width && !height) {
        destination = path.normalize(__dirname + '/../../gallery/' + image)
        if (fs.existsSync(destination)) return destination
        return false
    }
    // construct and search image name with resize values
    const extension = image.match(/\.\w+$/)![0]
    const name = image.replace(extension, '')
    let resizedName: string =
        name + '@' + `${width ?? ''}x${height ?? ''}` + extension
    destination = path.normalize(__dirname + '/../../gallery/' + resizedName)
    if (fs.existsSync(destination)) return destination
    return false
}

export default isCached
