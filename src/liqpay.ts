import {createHash} from "crypto"

interface LiqPayParams {
    version: string;
    amount: number;
    currency: string;
    description: string;
    order_id: string;

    public_key?: string;

    [name: string]: any;
}

export default class LiqPay {
    publicKey: string;
    privateKey: string;
    host: string;

    static required_fields: string[] = [
        "version", "amount", "currency", "description", "order_id"
    ];

    constructor(publicKey: string, privateKey: string, host: string = "https://www.liqpay.ua/api") {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.host = host;
    }

    prepareParams(params: LiqPayParams) {
        params.public_key = this.publicKey;
        LiqPay.required_fields.forEach(field => {
            if (!params[field]) throw new Error(`Field "${field} is required`)
        });
        return params;
    }

    castParamsToBase64(params: LiqPayParams) {
        const data = this.prepareParams(params);
        return Buffer.from(JSON.stringify(data)).toString('base64');
    }

    createSignature(params: LiqPayParams) {
        const data = this.castParamsToBase64(params);
        const sha1 = createHash('sha1');
        sha1.update(this.privateKey + data + this.privateKey);
		const signature = sha1.digest('base64');
		return {data, signature};
    }

    createUrl(method: string, params: LiqPayParams) {
        const {data, signature} = this.createSignature(params);
        return `${this.host}/${method}?data=${data}&signature=${signature}`;
    }
}
