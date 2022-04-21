import fs from 'fs'
import path from 'path'

const isCached = (
    image: string,
    width: number = NaN,
    height: number = NaN
): string | boolean => {
    let destination: string

    // check that image extension/format exists
    const hasExtension = image.match(/\.\w+$/)
    let extension: string
    if (!hasExtension) throw new Error('requested image file missing extension')

    // search without dimensions if no height/width given
    if (!width && !height) {
        destination = path.normalize(__dirname + '/../../gallery/' + image)
        if (fs.existsSync(destination)) return destination
        return false
    }

    // construct and search image name with resize values
    extension = hasExtension[0]
    const name = image.replace(extension, '')
    let resizedName: string =
        name + '@' + `${width ?? ''}x${height ?? ''}` + extension
    destination = path.normalize(__dirname + '/../../gallery/' + resizedName)
    if (fs.existsSync(destination)) return destination
    return false
}

export default isCached
