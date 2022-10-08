const MAX_WIDTH = 200
const MAX_HEIGHT = 200

export const resizeImage = async (
  image: HTMLImageElement,
  fileType = 'image/png'
): Promise<string> =>
  await new Promise((resolve) => {
    // have to wait till it's loaded
    let width = image.width
    let height = image.height

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > MAX_WIDTH) {
        // height *= MAX_WIDTH / width;
        height = Math.round((height *= MAX_WIDTH / width))
        width = MAX_WIDTH
      }
    } else {
      if (height > MAX_HEIGHT) {
        // width *= MAX_HEIGHT / height;
        width = Math.round((width *= MAX_HEIGHT / height))
        height = MAX_HEIGHT
      }
    }

    const canvas = document.createElement('canvas')
    // resize the canvas and draw the image data into it
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error("'Not able to get ctx from canvas.'")
    }

    ctx.drawImage(image, 0, 0, width, height)
    // get the data from canvas as 70% PNG (can be also JPG, etc.)
    resolve(canvas.toDataURL(fileType, 0.7))
  })

export const resizeImageFromBlob = async (
  imgBlob: string,
  fileType = 'image/png'
): Promise<string> =>
  await new Promise((resolve) => {
    // helper Image object
    const image = new Image()

    image.src = imgBlob

    image.onload = async () => {
      const resp = await resizeImage(image, fileType)

      resolve(resp)
    }

    image.onerror = (err) => {
      window.console.error(err)
      throw new Error('Error occurred loading image.')
    }
  })

export const processImage = async (file: File): Promise<string> =>
  await new Promise((resolve) => {
    if (!/image/i.test(file.type)) {
      throw new Error(`File ${file.name} is not an image.`)
    }

    // read the file
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = (event) => {
      if (!event.target?.result) {
        throw new Error('Error occurred loading image.')
      }
      // create blob
      const blob = new Blob([event.target.result])
      // and get it's URL
      const blobURL = (window.URL || window.webkitURL).createObjectURL(blob)
      resolve(blobURL)
    }
    reader.onerror = () => {
      throw new Error(`Error occurred reading file: ${file.name}`)
    }
  })
