import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"


const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        const app = await NestFactory.create(AppModule)
        app.enableCors()
        await app.listen(PORT, () => console.log('start'))
    } catch (e) {
        console.log(e)
    }
}

start()