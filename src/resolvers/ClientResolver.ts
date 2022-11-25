import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createClientInput, updateClientInput } from "../inputs/ClientInput";
import { Client } from "../models/Client";
import { ClientMongo } from "../mongodb/models/Client";
import { CreateClientService } from "../services/CreateClientService";
import { UpdateClientService } from "../services/UpdateClientService";

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

        const createClientService = new CreateClientService()

        const client = await createClientService.execute({
            name,
            type,
            contact
        })

        return client
    }

    @Mutation(() => Client)
    async updateClient(
        @Arg("updateClientObject") updateClientObject: updateClientInput
    ) {
        const fields = {...updateClientObject}

        const updateClientService = new UpdateClientService()

        const client = await updateClientService.execute (fields)

        return client;
    }
    @Mutation(() => String)
    async deleteClient(@Arg("id") id: string) {
        await ClientMongo.deleteOne({ _id: id })
        return id
    }
}