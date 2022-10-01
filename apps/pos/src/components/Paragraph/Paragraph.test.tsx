import { cleanup, render, screen } from '@testing-library/react-native'

import { Paragraph } from './Paragraph'

afterEach(cleanup)

it('should render textual children', () => {
  render(<Paragraph>Textual content</Paragraph>)
  expect(screen.getByText('Textual content')).toBeDefined()
})
