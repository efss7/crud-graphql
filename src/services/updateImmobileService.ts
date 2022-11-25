import { TYPE } from "../models/Immobile";
import { CustomError } from "../utils/CustomError";
import { ClientMongo } from "../mongodb/models/Client";
import { ImmobileMongo } from "../mongodb/models/Immobile";

type UpdateImmobileProps = {
    id:string
    type: string;
    address: string;
    ownerId: string;
};

export class UpdateImmobileService {
    async execute({id, type, address, ownerId }: UpdateImmobileProps) {
    if (!(type.toLocaleUpperCase() in TYPE )) {
        throw new CustomError(422, "Type invalid");
    }
    if (!id || !type || !address || !ownerId) {
        throw new CustomError(422, "All fields are mandatory")
    }

    let typeEnum

    if (type.toUpperCase() === "HOME") {
        typeEnum = TYPE.HOME
    } else {
        typeEnum = TYPE.APARTMENT
    }

    const OwnerExist = await ClientMongo.findById(ownerId)

    if (!OwnerExist) {
        throw new CustomError(404, `Id ${ownerId} not found`)
    }

    const addressExist = await ImmobileMongo.findOne({
        address
    })

    if (addressExist) {
        throw new CustomError(422, `address ${address} already registered`)
    }

    const immobile = await ImmobileMongo.findOneAndUpdate({_id:id},{
        type: typeEnum, address, ownerId
    })

        return immobile
    }
}
