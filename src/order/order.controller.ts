import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller('/order')
export class OrderController {

    constructor(private orderService: OrderService) { }

    @Post()
    createOrder(@Body() dto: CreateOrderDto) {
        return this.orderService.createOrder(dto)
    }

    @Get(':key')
    getOrder(@Param('key') key: string) {
        return this.orderService.getOrder(key)
    }

    @Delete(':key')
    deleteOrder(@Param('key') key: string) {
        return this.orderService.deleteOrder(key)
    }

} 