import express from "express"
import bodyParser from "body-parser";
import {body, validationResult} from 'express-validator';
import LiqPay from "./liqpay";

const app = express();
app.use(bodyParser.json());

app.post('/', [
    body('public_key').notEmpty(),
    body('private_key').notEmpty(),
    body('method').notEmpty(),
    ...LiqPay.required_fields.map(
        field => body(`params.${field}`).notEmpty()
    )
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const liqpay = new LiqPay(req.body.public_key, req.body.private_key);
    const url = liqpay.createUrl(req.body.method, req.body.params);
    res.json({url});
});

app.listen(process.env.PORT, () => {
    console.log("Listening...")
});
