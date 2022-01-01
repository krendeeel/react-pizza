import { Module } from "@nestjs/common";
import { PizzaController } from "./pizza.controller";
import { PizzaService } from "./pizza.service";
import { MongooseModule } from '@nestjs/mongoose'
import { Pizza, PizzaSchema } from "./schemas/pizza.schema";
import { FileService } from "src/file/file.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Pizza.name, schema: PizzaSchema }]),
    ],
    controllers: [PizzaController],
    providers: [PizzaService, FileService]
})

export class PizzaModule {

}
