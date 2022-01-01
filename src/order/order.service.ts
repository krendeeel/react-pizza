import { Injectable } from "@nestjs/common";
import { Order, OrderDocument } from "./schemas/order.schema";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as uuid from 'uuid'
import { CreateOrderDto } from "./dto/create-order.dto";


@Injectable()
export class OrderService {

    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }

    async createOrder(dto: CreateOrderDto): Promise<string> {
        const key = uuid.v4().split('-')[0];
        const order = await this.orderModel.create({ ...dto, key: key })
        return key;
    }

    async getOrder(key: string): Promise<Order> {
        const order = await this.orderModel.findOne({ key })
        return order
    }


    async deleteOrder(key: string): Promise<string> {
        const order = await this.orderModel.findOne({ key });
        const id = order._id;
        await this.orderModel.findByIdAndDelete(id)
        return id
    }

}