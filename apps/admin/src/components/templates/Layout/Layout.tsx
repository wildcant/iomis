import { Container } from '@chakra-ui/react'
// import NotificationsContainer from 'components/Notification/NotificationContainer'
import { ReactNode } from 'react'
import { Navbar } from './components'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <main>
      <Navbar />
      <br />
      <Container maxW='container.xl'>{children}</Container>
    </main>
  )
}
