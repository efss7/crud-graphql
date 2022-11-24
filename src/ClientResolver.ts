import { Query, Resolver } from "type-graphql";

@Resolver()
export class ClientResolver{
    @Query(()=>String)
    async clients(){
        return "Hello World"
    }
}