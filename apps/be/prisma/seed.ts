/* eslint-disable no-console */
import { PrismaClient, Post, Category } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { range } from 'lodash'

export function fakePost(overrides: Partial<Post> = {}): Post {
  const mockedPost: Post = {
    id: faker.datatype.uuid(),
    title: faker.word.verb(),
    content: faker.word.adjective(),
  }
  return Object.assign(overrides, mockedPost)
}

export function fakeCategory(overrides: Partial<Category> = {}): Category {
  const mockedPost: Category = {
    id: faker.datatype.uuid(),
    deleted: false,
    name: faker.word.noun(),
    description: faker.word.adjective(),
    course: faker.datatype.number(),
    image: faker.image.food(),
    visible: true,
  }
  return Object.assign(overrides, mockedPost)
}

const prisma = new PrismaClient()
async function main() {
  console.log(`Start seeding ...`)

  const posts = () =>
    range(5)
      .map(() => fakePost())
      .map((r) =>
        prisma.post.upsert({
          where: { id: r.id },
          update: r,
          create: r,
        })
      )

  const categories = () =>
    prisma.category.createMany({
      data: range(5).map(() => fakeCategory()),
    })

  const requests = [...posts(), categories()]
  const response = await Promise.all(requests)
  console.log({ response })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
