import { NextApiRequest, NextApiResponse } from "next";
import { useMemo } from "react";

export default (request: NextApiRequest, response: NextApiResponse) => {
  return response.end("Hello world!");
};
