import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'DELETE'){
        return res.status(405).end();
    }
    try{
        const { postId } = req.body;
        

    }
    catch(error){
        console.log(error);
        return res.status(400).end();
    }
}