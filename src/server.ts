import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const app = fastify()

const prisma = new PrismaClient()

app.get('/users', async () => {
    const users = await prisma.user.findMany()

    return { users }
})

app.post('/users', async(request, reply) => {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        cats: z.any(),
    })


    const {name, email, phone, cats} = createUserSchema.parse(request.body)


    const catData = cats
    ? cats.map((cats: { name: any; age: any; gender: any; race: any; castrated: any; vaccines: any }) => {
      return { name: cats.name, age: cats.age, gender: cats.gender, race: cats.race, castrated: cats.castrated, vaccines: cats.vaccines || undefined }
    })
    : []


    await prisma.user.create({
        data: {
            name,
            email,
            phone,
            cats: {
                create: catData,
            },
        }
    })

    return reply.status(201).send()
})

app.get('/cats', async () => {
    const cats = await prisma.cat.findMany()

    return { cats }
})

app.post('/cats', async(request, reply) => {
    const createCatSchema = z.object({
        name: z.string(),
        age: z.string(),
        gender: z.string(),
        race: z.string(),
        castrated: z.string(),
        vaccines: z.string(),
        ownerId: z.string(),
    })

    const {name, age, gender, race, castrated, vaccines, ownerId} = createCatSchema.parse(request.body)

    await prisma.cat.create({
        data: {
            name,
            age,
            gender,
            race,
            castrated,
            vaccines,
            owner: {
                connect: {
                    id: ownerId
                }
            }
        }
    })

    return reply.status(201).send()
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log('HTTP SERVER RUNNING')
})