const { ApolloServer } = require("@apollo/server");
const{ startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");

const port = 4000;

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
        { name: "astronauts", url: "http://localhost:4001" },
        { name: "missions", url: "http://localhost:4002" }
    ]
  })
});

const server = new ApolloServer({
  gateway,
  subscriptions: false
});

startStandaloneServer(server,{
    listen : {port: port}
}).then(({url})=>{
    console.log(`🚀  Server ready at ${url}`);
});
