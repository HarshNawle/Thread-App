import express, { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    // Create GraphQL server
    const gqlserver = new ApolloServer({
        // if the typeDef & resolvers is empty then
        // it will throw error : Query root type must be provided.
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String 
            }
        `, // Schema
        resolvers: {
            Query: {
                hello: () => `Hey there, I am a graphql server`,
                say: (_, {name}: {name: string}) => `Hey ${name}, How are you ?`
            }
        }
    });

    // Start the gql server
    await gqlserver.start();

    app.get("/", (_req: Request, res: Response) => {
        res.json({ message: "Server is up and running" });
    });

    // where we have to make graphql endpoint 
    // By doing this it will create Apollo Studio for GraphQL 
    app.use("/graphql", expressMiddleware(gqlserver))

    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();
