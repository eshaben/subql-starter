import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "kapex-starter",
  description:
    "This project can be used as a starting point for developing your SubQuery project. It indexes all transfers on Kapex network",
  runner: {
    node: {
      name: "@subql/node",
      version: ">=3.0.1",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /* The genesis hash of the network (hash of block 0) */
    chainId: "TBC",
    /**
     * This endpoint must be a public non-pruned archive node
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * You can get them from OnFinality for free https://app.onfinality.io
     * https://documentation.onfinality.io/support/the-enhanced-api-service
     */
    endpoint: ["wss://k-ui.kapex.networks"],
    // Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
    // dictionary: "https://api.subquery.network/sq/subquery/kapex-dictionary"
    chaintypes: {
      file: "./dist/chaintypes.js",
    },
  },
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          /*{
            kind: SubstrateHandlerKind.Block,
            handler: "handleBlock",
            filter: {
              modulo: 100,
            },
          },*/
          /*{
            kind: SubstrateHandlerKind.Call,
            handler: "handleCall",
            filter: {
              module: "balances",
            },
          },*/
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleEvent",
            filter: {
              module: "balances",
              method: "Transfer",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
