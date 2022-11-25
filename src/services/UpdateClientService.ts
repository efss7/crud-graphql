import { TYPE } from "../models/Client";
import { ClientMongo } from "../mongodb/models/Client";
import { CustomError } from "../utils/CustomError";

type UpdateClientServiceProps = {
    id:string;
    name: string;
    type: string;
    contact: string;
}

export class UpdateClientService {
    async execute({ id, name, type, contact }: UpdateClientServiceProps) {
        const typeIsValid = (type.toLocaleUpperCase() in TYPE)

        if(!id || !name || !type || !contact) {
            throw new CustomError(422, "All fields are mandatory")
        }
        
        if(!typeIsValid) {
            throw new CustomError(422, "Type invalid")
        }

        if(!contact || typeof contact !== "string" ){
            throw new CustomError(422, "Contact invalid")
        }

        let typeEnum

        if (type.toUpperCase() === "EMAIL") {
            typeEnum = TYPE.EMAIL
        } else {
            typeEnum = TYPE.TELEPHONE
        }

        const client = await ClientMongo.findOneAndUpdate({ _id: id }, {
            name,
            type,
            contact
        });

        return client;
    }
}