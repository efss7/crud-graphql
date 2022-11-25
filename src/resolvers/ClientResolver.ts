import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createClientInput, updateClientInput } from "../inputs/ClientInput";
import { Client, TYPE } from "../models/Client";
import { ClientMongo } from "../mongodb/models/Client";
import { CustomError } from "../utils/CustomError";

@Resolver()
export class ClientResolver {
    @Query(() => [Client])
    async findClients() {
        return await ClientMongo.find()
    }

    @Query(() => Client)
    async findClientById(@Arg("id") id: string) {
        return await ClientMongo.findOne({ _id: id })
    }

    @Mutation(() => Client)
    async createClient(
        @Arg("createClientObject") createClientObject: createClientInput
    ) {
        const { name, type, contact } = createClientObject

        if (!type || !(type.toLocaleUpperCase() in TYPE)) {
            throw new CustomError(422, "Type invalid")
        }
        let typeEnum
        if (type.toUpperCase() === "EMAIL") {
            typeEnum = TYPE.EMAIL
        } else {
            typeEnum = TYPE.TELEPHONE
        }

        return await ClientMongo.create({
            name, type: typeEnum, contact
        })
    }

    @Mutation(() => Client)
    async updateClient(
        @Arg("updateClientObject") updateClientObject: updateClientInput
    ) {
        const client = { ...updateClientObject }
        await ClientMongo.updateOne({ _id: client.id }, client)
        return client;
    }
    @Mutation(()=> String)
    async deleteClient(@Arg("id") id:string){
        await ClientMongo.deleteOne({_id: id})
        return id
    }
}