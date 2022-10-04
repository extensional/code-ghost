// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
type Data = {
    name: string;
};

const axiosInstance = axios.create({
    baseURL: process.env.CODACT_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const response = await axiosInstance.post(req.url!, { ...req.body! });
        res.status(response.status).json({ ...response.data });
    }
    if (req.method === "GET") {
        const response = await axiosInstance.get(req.url!);
        res.status(response.status).json({ ...response.data });
    }
}
