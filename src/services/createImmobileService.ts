import { TYPE } from "../models/Immobile";
import { CustomError } from "../utils/CustomError";
import { ClientMongo } from "../mongodb/models/Client";
import { ImmobileMongo } from "../mongodb/models/Immobile";

type CreateImmobileProps = {
  type: string;
  address: string;
  ownerId: string;
};

export class CreateImmobileService {
  async execute({ type, address, ownerId }: CreateImmobileProps) {
    if ( !(type.toLocaleUpperCase() in TYPE || typeof type !== "string" )) {
      throw new CustomError(422, "Type invalid");
    }
    if(!type || !address || !ownerId){
      throw new CustomError(422, "All fields are mandatory")
    }

    let typeEnum
    
    if (type.toUpperCase() === "HOME") {
        typeEnum = TYPE.HOME
    } else {
        typeEnum = TYPE.APARTMENT
    }

    const OwnerExist = await ClientMongo.findById(ownerId)

    if(!OwnerExist) {
      throw new CustomError(404, `Id ${ownerId} not found`)
    }

    const addressExist = await ImmobileMongo.findOne({
      address
    })

    if(addressExist){
      throw new CustomError(422, `address ${address} already registered`)
    }

    const immobile = await ImmobileMongo.create({
      type: typeEnum, address, ownerId
    })

    return immobile    
  }
}
