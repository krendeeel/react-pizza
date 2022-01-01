import { Injectable } from "@nestjs/common";
import { Pizza, PizzaDocument } from "./schemas/pizza.schema";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePizzaDto } from "./dto/create-pizza.dto";
import { FileService, FileType } from "src/file/file.service";
import * as mongoose from 'mongoose'

const checkParam = (p: string) => p ? p : { $exists: true }

@Injectable()
export class PizzaService {

    constructor(@InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>,
        private fileService: FileService) { }

    async addPizza(dto: CreatePizzaDto, img): Promise<Pizza> {
        const imgPath = this.fileService.createFile(FileType.IMAGE, img)
        const pizza = await this.pizzaModel.create({ ...dto, img: imgPath });
        return pizza;
    }

    async getPizzas(count = 10, offset = 0, category, sort = '0',): Promise<Pizza[]> {
        switch (sort) {
            case '0':
                return await this.pizzaModel.find({
                    category: checkParam(category)
                }).skip(Number(offset)).limit(Number(count)).sort({ 'rating': -1 })
            case '1':
                return await this.pizzaModel.find({
                    category: checkParam(category)
                }).skip(Number(offset)).limit(Number(count)).sort({ 'price': 1 })
            case '2':
                return await this.pizzaModel.find({
                    category: checkParam(category)
                }).skip(Number(offset)).limit(Number(count)).sort({ 'name': 1 })
            default:
                return await this.pizzaModel.find({
                    category: checkParam(category)
                }).skip(Number(offset)).limit(Number(count))
        }
    }

    async getPizza(id: mongoose.Schema.Types.ObjectId): Promise<Pizza> {
        const pizza = await this.pizzaModel.findById(id)
        return pizza
    }


    async deletePizza(id: mongoose.Schema.Types.ObjectId): Promise<mongoose.Schema.Types.ObjectId> {
        const pizza = await this.pizzaModel.findByIdAndDelete(id)
        return pizza._id
    }
}