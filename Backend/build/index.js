"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
async function init() {
    const app = (0, express_1.default)();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express_1.default.json());
    // Create GraphQL server
    const gqlserver = new server_1.ApolloServer({
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
                say: (_, { name }) => `Hey ${name}, How are you ?`
            }
        }
    });
    // Start the gql server
    await gqlserver.start();
    app.get("/", (_req, res) => {
        res.json({ message: "Server is up and running" });
    });
    // where we have to make graphql endpoint 
    // By doing this it will create Apollo Studio for GraphQL 
    app.use("/graphql", (0, express5_1.expressMiddleware)(gqlserver));
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}
init();
//# sourceMappingURL=index.js.map