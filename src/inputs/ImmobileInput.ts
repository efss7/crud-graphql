import { Field, ID, InputType } from "type-graphql";

@InputType()
export class createImmobileInput {
    @Field()
    type: string

    @Field()
    address: string

    @Field()
    ownerId: string
}

@InputType()
export class updateImmobileInput {

    @Field((type) => ID)
    id: string

    @Field()
    type: string

    @Field()
    address: string

    @Field()
    ownerId: string
}