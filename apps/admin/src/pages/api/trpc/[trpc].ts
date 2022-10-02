import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter, createContext } from '@iomis/api'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
})
