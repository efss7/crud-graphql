import "reflect-metadata"
import path from "path";
require("dotenv").config({ path: ".env" })
import "./mongodb/connect";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { ClientResolver } from "./ClientResolver";

async function main() {
    const schema = await buildSchema({
        resolvers: [ClientResolver],
        emitSchemaFile: path.resolve(__dirname, "scheme.ggl")
    })

    const server = new ApolloServer({
        schema,
    })

    const { url } = await server.listen()
    console.log("Server running on " + url)

}
main()