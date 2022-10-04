import { Center, Flex, Text } from '@chakra-ui/react'
import Image from 'next/future/image'
import { HTMLProps, useCallback, useEffect, useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { processImage, resizeImageFromBlob } from './utils'

interface IDropzoneFieldProps<TValues extends FieldValues>
  extends Omit<HTMLProps<HTMLInputElement>, 'name' | 'defaultValue'>,
    UseControllerProps<TValues> {
  onImageSelected?: () => void
}

export function DropzoneField<TValues extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  onImageSelected,
  ...props
}: IDropzoneFieldProps<TValues>) {
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
            const blob = await processImage(firstImage)
            const processedImage = await resizeImageFromBlob(blob)
            setSelectedImage(processedImage)
          } catch (error) {
            // TODO: Show notification.
          }
        }
      }
    },
    []
  )
  const { getRootProps, isDragActive } = useDropzone({ onDrop })

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
          Subir foto
        </Text>
        <input {...props} {...field} type='hidden' value={selectedImage} />
      </Flex>
    </>
  )
}
