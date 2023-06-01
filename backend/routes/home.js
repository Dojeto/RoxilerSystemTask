import { Router } from "express";

const router = Router();

router.get('/',(req,resp)=>{
    resp.send("Welcome to Roxiler System");
})

export default router