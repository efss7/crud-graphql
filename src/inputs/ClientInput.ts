import { Field, ID, InputType } from "type-graphql";

@InputType()
export class createClientInput{
    @Field()
    name: string

    @Field()
    type: string

    @Field()
    contact: string
}

@InputType()
export class updateClientInput {
    
    @Field((type)=>ID)
    id:string

    @Field()
    name: string

    @Field()
    type: string

    @Field()
    contact: string
}