import { FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React, { useCallback, useState } from 'react'
import {
  Animated,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from 'src/components'
import { useModalContext } from './ModalContext'
import { IModalProps } from './types'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export const Modal = (props: IModalProps) => {
  const {
    id,
    variant,
    titleProps,
    primaryProps,
    secondaryProps,
    closeButton,
    children,
    containerProps,
    onClose,
  } = props

  const { modals, closeModal } = useModalContext()
  const modal = modals.find((m) => m.id === id)
  const isConfirmation = variant === 'confirmation'

  const insets = useSafeAreaInsets()
  const [showOverlay, setShowOverlay] = useState(true)
  const value = React.useRef(new Animated.Value(0))

  /**
   * Fade in overlay blur animation.
   */
  const fadeOverlay = Animated.timing(value.current, {
    toValue: 10,
    duration: 500,
    useNativeDriver: false,
    isInteraction: true,
  })

  // Will change fadeAnim value to 10
  const fadeInOverlay = () => {
    setShowOverlay(true)
    fadeOverlay.start()
  }

  // Will change fadeAnim value to 0
  const fadeOutOverlay = () => {
    setShowOverlay(false)
    fadeOverlay.reset()
  }

  const handleCloseModal = useCallback(() => {
    if (modal) {
      onClose?.()
      fadeOutOverlay()
      setTimeout(() => closeModal(modal.id), 10)
    }
  }, [modal])

  return (
    <View>
      <RNModal
        animationType='slide'
        transparent={true}
        visible={!!modal}
        onRequestClose={() => handleCloseModal()}
        onShow={fadeInOverlay}
        {...containerProps}
      >
        <View className='flex-1'>
          {showOverlay && (
            <AnimatedBlurView
              intensity={value.current}
              tint='dark'
              style={StyleSheet.absoluteFill}
            />
          )}
          <View className='flex-1 justify-between'>
            <View />
            <View
              className={`min-h-fit w-full bg-secondary rounded-t-2xl shadow-sm relative px-5 pt-2`}
            >
              <View style={{ paddingBottom: insets.bottom, width: '100%' }}>
                <View className='w-full'>
                  {closeButton && (
                    <View className='right-0 z-10'>
                      <TouchableOpacity
                        onPress={handleCloseModal}
                        className='absolute self-end p-3 z-10'
                      >
                        <FontAwesome name='close' size={16} />
                      </TouchableOpacity>
                    </View>
                  )}
                  {titleProps && isConfirmation && (
                    <Text className='text-gray-700' {...titleProps} />
                  )}
                  {children && (
                    <SafeAreaView className='max-h-[92%]'>
                      {children}
                    </SafeAreaView>
                  )}
                  {isConfirmation && (
                    <View className='justify-end gap-2 mt-4'>
                      <Button {...primaryProps}>
                        {primaryProps?.children ?? 'Confirmar'}
                      </Button>
                      <Button
                        variant='secondary'
                        onPress={handleCloseModal}
                        {...secondaryProps}
                      >
                        {secondaryProps?.children ?? 'Cancelar'}
                      </Button>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </RNModal>
    </View>
  )
}
