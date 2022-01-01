import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type PizzaDocument = Pizza & Document

@Schema()
export class Pizza {

    @Prop({ required: true })
    name: string;

    @Prop()
    types: Array<string>;

    @Prop()
    sizes: Array<string>;

    @Prop()
    price: number;

    @Prop({ default: 0 })
    category: number;

    @Prop({ default: 0 })
    rating: number;

    @Prop({ required: true })
    img: string;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza)

