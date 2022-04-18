import { Web3Storage } from "web3.storage";

/**
 * Creates a new instance of the the web3.storage client.
 */
export const makeStorageClient = (
  token: string = String(process.env.API_TOKEN)
): Web3Storage => {
  return new Web3Storage({
    token: token,
  });
};
