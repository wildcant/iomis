import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useHandleError(error: any) {
  const toast = useToast()
  useEffect(() => {
    if (error) {
      toast({
        status: 'error',
        description: error?.message ?? '',
      })
    }
  }, [error, toast])
}
