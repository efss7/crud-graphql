import { Field, ID, ObjectType } from "type-graphql";

export enum TYPE{
    EMAIL = "Email",
    TELEPHONE = "Telephone"
}

@ObjectType()
export class Client {
    @Field((type)=>ID)
    id:string;

    @Field()
    name:string

    @Field()
    type: TYPE

    @Field()
    contact: string
}