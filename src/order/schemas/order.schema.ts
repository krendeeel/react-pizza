import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type OrderDocument = Order & Document

@Schema()
export class Order {

    @Prop({ required: true })
    key: string;

    @Prop()
    items: string;

    @Prop()
    totalPrice: string;

    @Prop()
    totalCount: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order)

