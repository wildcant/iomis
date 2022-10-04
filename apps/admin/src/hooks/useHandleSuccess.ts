import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

export function useHandleSuccess(isSuccess: boolean, msg?: string) {
  const toast = useToast()

  useEffect(() => {
    if (isSuccess) {
      toast({
        status: 'success',
        description: msg ?? 'Tu solicitud fue procesada exitosamente.',
      })
    }
  }, [isSuccess, msg, toast])
}
