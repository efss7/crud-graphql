import { Field, ID, ObjectType } from "type-graphql";

export enum TYPE {
    HOME = "Home",
    APARTMENT = "Apartment"
}

@ObjectType()
export class Immobile {
    @Field((type) => ID)
    id: string;

    @Field()
    type: TYPE

    @Field()
    address: string

    @Field()
    ownerId: string
}