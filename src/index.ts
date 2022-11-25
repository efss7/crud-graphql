import { ApolloServer } from "apollo-server";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import "./mongodb/Connect";
import { ClientResolver } from "./resolvers/ClientResolver";
import { ImmobileResolver } from "./resolvers/ImmobileResolver";
require("dotenv").config({ path: ".env" })

async function main() {
    const schema = await buildSchema({
        resolvers: [ClientResolver, ImmobileResolver],
        emitSchemaFile: path.resolve(__dirname, "scheme.ggl")
    })

    const server = new ApolloServer({
        schema,
    })

    const { url } = await server.listen()
    console.log("Server running on " + url)

}
main()