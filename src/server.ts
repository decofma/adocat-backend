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
        age: z.string(),
    })

    const {name, email, age} = createUserSchema.parse(request.body)

    await prisma.user.create({
        data: {
            name,
            email,
            age,
        }
    })

    return reply.status(201).send()
})

app.get('/cats', async () => {
    const cats = await prisma.cat.findMany()

    return { cats }
})

// "id" TEXT NOT NULL,
//     "name" TEXT NOT NULL,
//     "age" TEXT NOT NULL,
//     "gender" TEXT NOT NULL,
//     "race" TEXT NOT NULL,
//     "castrated" TEXT NOT NULL,
//     "vaccines" TEXT NOT NULL,
//     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

app.post('/cats', async(request, reply) => {
    const createCatSchema = z.object({
        name: z.string(),
        age: z.string(),
        gender: z.string(),
        race: z.string(),
        castrated: z.string(),
        vaccines: z.string(),
    })

    const {name, age, gender, race, castrated, vaccines} = createCatSchema.parse(request.body)

    await prisma.cat.create({
        data: {
            name,
            age,
            gender,
            race,
            castrated,
            vaccines,
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