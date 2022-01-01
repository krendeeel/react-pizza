import { Module } from "@nestjs/common";
import { PizzaModule } from "./pizza/pizza.module";
import { MongooseModule } from '@nestjs/mongoose'
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static"
import * as path from 'path'
import { OrderModule } from "./order/order.module";

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
        PizzaModule,
        OrderModule,
        MongooseModule.forRoot('mongodb+srv://roman:roman123@cluster0.hffjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
        FileModule,
    ]
})

export class AppModule {

}