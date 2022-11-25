import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['info', 'query', 'warn', 'error'],
    errorFormat: 'pretty'
})

const connectDB = () => {
    try{
        prisma.$connect();
        console.log('DB is connected');
    } catch (err){
        console.log(err);
        process.exit(1);
    }
}

export {prisma, connectDB}