import "reflect-metadata" //configuração TYPEORM 
import express from 'express'
import dotenv from 'dotenv'

import router from "./routes"

import './database'

dotenv.config()

const server = express()

server.use(express.json())
server.use("/", router)

server.use((request, response) => {
    return response.status(404).send('Página não encontrada')
})

server.listen(process.env.PORTA, () => {
    console.log('Server rodando na porta '+process.env.PORTA)
})