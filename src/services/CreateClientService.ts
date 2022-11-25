import { ClientMongo } from "../mongodb/models/Client";
import { TYPE } from "../models/Client";
import { CustomError } from "../utils/CustomError";

type CreateClientServiceProps = {
  name: string;
  type: string;
  contact: string
}

export class CreateClientService {
  async execute({ name, type, contact }: CreateClientServiceProps) {
    const typeIsValid = (type.toLocaleUpperCase() in TYPE)

    if (!name || !type || !contact) {
      throw new CustomError(422, "All fields are mandatory")
    }

    if (!typeIsValid) {
      throw new CustomError(422, "Type invalid")
    }

    let typeEnum

    if (type.toUpperCase() === "EMAIL") {
      typeEnum = TYPE.EMAIL
    } else {
        typeEnum = TYPE.TELEPHONE
    }

    const client = await ClientMongo.create({
      name,
      type,
      contact
    });

    return client;
  }
}