import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createImmobileInput, updateImmobileInput } from "../inputs/ImmobileInput";
import { Immobile } from "../models/Immobile";
import { ImmobileMongo } from "../mongodb/models/Immobile";
import { CreateImmobileService } from "../services/CreateImmobileService";
import { UpdateImmobileService } from "../services/UpdateImmobileService";
import { CustomError } from "../utils/CustomError";

@Resolver()
export class ImmobileResolver {
    @Query(() => [Immobile])
    async findImmobile() {
        return await ImmobileMongo.find()
    }

    @Query(() => Immobile)
    async findImmobileById(@Arg("id") id: string) {
        return await ImmobileMongo.findOne({ _id: id })
    }

    @Mutation(() => Immobile)
    async createImmobile(
        @Arg("createImmobileObject") createImmobileObject: createImmobileInput
    ) {
        const { type, address, ownerId } = createImmobileObject
        const createImmobileService = new CreateImmobileService()
        const immobile = await createImmobileService.execute({ type, address, ownerId })
        return immobile
    }

    @Mutation(() => Immobile)
    async updateImmobile(
        @Arg("updateImmobileObject") updateImmobileObject: updateImmobileInput
    ) {
        const fields = { ...updateImmobileObject }
        const updateImmobileService = new UpdateImmobileService()
        const immobile = await updateImmobileService.execute(fields)
        return immobile;
    }

    @Mutation(() => String)
    async deleteImmobile(@Arg("id") id: string) {
        await ImmobileMongo.deleteOne({ _id: id })
        return id
    }
}