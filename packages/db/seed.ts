import { faker } from '@faker-js/faker'
import { Post } from '@prisma/client'
import { range } from 'lodash'
import { prisma } from '.'

function fakePost(overrides: Partial<Post> = {}): Post {
  const mockedPost: Post = {
    id: faker.datatype.uuid(),
    title: faker.word.verb(),
    content: faker.word.adjective(),
  }
  return Object.assign(overrides, mockedPost)
}

;(async () => {
  try {
    const users = () =>
      range(5)
        .map(() => fakePost())
        .map((r) =>
          prisma.post.upsert({
            where: { id: r.id! },
            update: r,
            create: r,
          })
        )

    const requests = [users]
    const response = await Promise.all(requests)
    console.log({ response })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()
