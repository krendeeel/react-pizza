import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreatePizzaDto } from "./dto/create-pizza.dto";
import { PizzaService } from "./pizza.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import * as mongoose from 'mongoose'

@Controller('/pizza')
export class PizzaController {

    constructor(private pizzaService: PizzaService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'img', maxCount: 1 }
    ]))
    addPizza(@UploadedFiles() files, @Body() dto: CreatePizzaDto) {
        const { img } = files
        return this.pizzaService.addPizza(dto, img[0])
    }

    @Get()
    getPizzas(
        @Query('count') count: number,
        @Query('offset') offset: number,
        @Query('category') category: string,
        @Query('sort') sort: string
    ) {
        return this.pizzaService.getPizzas(count, offset, category, sort)
    }

    @Get(':id')
    getPizza(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.pizzaService.getPizza(id)
    }

    @Delete(':id')
    deletepizza(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.pizzaService.deletePizza(id)
    }

}