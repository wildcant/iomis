import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

const FormPanel = styled(Box)`
  border-radius: 8px;
  background-color: white;
  box-shadow: ${(props) => props.theme.shadows.xs};
  margin-bottom: 1rem;
`

const FormAccordion = styled(Accordion)`
  border-radius: 8px;
  background-color: white;
  box-shadow: ${(props) => props.theme.shadows.xs};
  margin-bottom: 1rem;
`

interface PanelProps {
  children: ReactNode
  title?: string
  description?: string
  allowToggle?: boolean
}
export function Panel(props: PanelProps) {
  const { children, title, description, allowToggle } = props

  return allowToggle ? (
    <FormAccordion allowToggle p={{ base: 2, md: 4 }}>
      <AccordionItem border={'none'}>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                padding={0}
                margin={0}
                border={'none'}
                bg={'transparent'}
                _hover={{ bg: 'transparent' }}
              >
                <Box flex='1' textAlign='left'>
                  <Heading as='h5' fontSize={'md'}>
                    {title}
                  </Heading>
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize='12px' />
                ) : (
                  <AddIcon fontSize='12px' />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel p={0} mt={2}>
              {description && (
                <Text fontSize={'sm'} mb='6'>
                  {description}
                </Text>
              )}
              {children}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </FormAccordion>
  ) : (
    <FormPanel p={{ base: 2, md: 4 }}>
      <Heading as='h5' fontSize={'md'} mb={2}>
        {title}
      </Heading>
      {description && (
        <Text fontSize={'sm'} mb='6'>
          {description}
        </Text>
      )}
      {children}
    </FormPanel>
  )
}
