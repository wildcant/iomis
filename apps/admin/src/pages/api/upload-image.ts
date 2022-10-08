/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { Dropbox } from 'dropbox'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Upload images.
 * settings at https://www.dropbox.com/developers/apps/info/6cx60k4pjtzb9yi#settings
 */
export default async function uploadImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { image, fileName = 'image', fileType = 'png' } = req.body
    if (!image) {
      throw new Error(
        'image property is required (it should be base 64 data url image)'
      )
    }

    // generate timestamp to differenciate stored image file names.
    const timestamp = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .format(Date.now())
      .replaceAll('/', '')
      .replaceAll(', ', '')
      .replaceAll(':', '')

    // Create new dropbox instance.
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN })

    // Extract base 64 data from image dataUrl.
    const base64Data = req.body.image.replace(
      new RegExp(`^data:image/${fileType};base64,`, 'g'),
      ''
    )

    // Transform base 64 to buffer.
    const contents = Buffer.from(base64Data, 'base64')

    // Upload image to dropbox.
    const {
      result: { path_display },
    } = await dbx.filesUpload({
      path: `/iomis/images/${fileName}-${timestamp}.${fileType}`,
      contents,
    })

    if (!path_display) {
      throw new Error('There was an error uploading the image to dropbox.')
    }

    // Generate shared link to access stored image.
    const { result } = await dbx.sharingCreateSharedLinkWithSettings({
      path: path_display,
    })

    // Replace download flag with raw flag so it can be used directly in image tags.
    const url = result.url.replace(/dl=0/, 'raw=1')

    res.status(200).json({ url })
  } catch (error) {
    console.error(error)
    const errMsg = error instanceof Error ? ` Error: ${error.message}` : ''
    throw new Error(`There was a problem uploading the image. ${errMsg}`)
  }
}
