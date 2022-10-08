import { Center, Flex, Spinner, Text, useBoolean } from '@chakra-ui/react'
import Image from 'next/future/image'
import { HTMLProps, useCallback, useEffect, useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { processImage, resizeImageFromBlob } from './utils'

interface IDropzoneFieldProps<TValues extends FieldValues>
  extends Omit<HTMLProps<HTMLInputElement>, 'name' | 'defaultValue'>,
    UseControllerProps<TValues> {
  onImageSelected?: () => void
  fileName?: string
}

export function DropzoneField<TValues extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  onImageSelected,
  fileName,
  ...props
}: IDropzoneFieldProps<TValues>) {
  const [loading, setLoading] = useBoolean(false)
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  })
  const [selectedImage, setSelectedImage] = useState<string>()

  const onDrop = useCallback<NonNullable<DropzoneOptions['onDrop']>>(
    async (acceptedFiles) => {
      if (acceptedFiles.length) {
        const [firstImage] = acceptedFiles
        if (firstImage) {
          try {
            setLoading.on()
            const blob = await processImage(firstImage)
            const processedImage = await resizeImageFromBlob(
              blob,
              firstImage.type
            )

            const { url } = (await (
              await fetch('/api/upload-image', {
                method: 'POST',
                body: JSON.stringify({
                  image: processedImage,
                  fileName,
                  fileType: firstImage.type.split('/')[1],
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            ).json()) as { url: string }

            setSelectedImage(url)
          } catch (error) {
            window.console.error(error)
            // TODO: Show notification.
          } finally {
            setLoading.off()
          }
        }
      }
    },
    [fileName, setLoading]
  )

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    disabled: loading,
  })

  const { onChange } = field
  useEffect(() => {
    // Manually update form when input changes.
    if (selectedImage) {
      onChange(selectedImage)
      onImageSelected?.()
    }
  }, [onChange, onImageSelected, selectedImage])

  return (
    <>
      {!!selectedImage && (
        <Center mb='1rem'>
          <Image
            src={selectedImage}
            alt='Add Image'
            style={isDragActive ? { filter: 'blur(5px)' } : {}}
            width={100}
            height={100}
          />
        </Center>
      )}
      <Flex
        {...getRootProps()}
        border={`2px ${isDragActive ? 'solid' : 'dashed'} rgb(218, 220, 227)`}
        alignItems={'center'}
        justifyContent={'center'}
        padding={2}
      >
        <Text color='#5e5e5e' fontSize='xs'>
          {loading ? <Spinner /> : 'Subir foto'}
        </Text>
        <input {...props} {...field} type='hidden' value={selectedImage} />
      </Flex>
    </>
  )
}
