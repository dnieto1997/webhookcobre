export const pagosPayty = async ( info:any ): Promise<any> => {

    const coockies = generateRandomString();

    let buscar:any = undefined;
    let urlReturn = "https://toppaylatam.com/";

    if(info.reference_pro2 != "0"){
        buscar = await buscarPayty(info);
    }

    if(info.inscrita){
        urlReturn = info.inscrita;
    }

    return new Promise<any>( (resolve, reject) => {
        
        if(buscar){
            const {answer} = buscar;
            const {paymentOrderStatus} = answer;
                
            if(!paymentOrderStatus){
                if(paymentOrderStatus =="RUNNING" && info.linkpro != 0){
                    console.log('entro')
                        resolve( {url:info.linkpro,resp:[]} );
                }
            }
        }

        const { amount,email,name,phone,topdoc,doc,reference } = info;

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic NTc4NDUwMDI6cHJvZHBhc3N3b3JkX3NrbjA0V0RLNmVEQWp6SDdNV29la3BPaEpVTGVjUzlqNEdtNURlck9HemNKQQ==");
        myHeaders.append("Cookie", "JSESSIONID=37c6A2a62CFB2FF6131cbeBbae582714Ef29DaDC.vadworldapi01-bdx-prod-fr-lyra");

        let raw = "";

        raw = JSON.stringify({
                "amount": `${amount}`,
                "currency": "COP",
                "customer": {
                    "email": `${email}`,
                    "billingDetails": {
                        "firstName": `${name}`,
                        "lastName": `${name}`,
                        "phoneNumber": `${phone}`,
                        "identityType": `${topdoc}`,
                        "identityCode": `${doc}`
                   }
                },
                "orderId": `${reference}`,
                "paymentMethods": [
                    "PSE"
                ],
                "taxRate": 0,
                "returnUrl": urlReturn,
                "cancelUrl": urlReturn,
                "successUrl": urlReturn
        });
       

        let requestOptions : RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

         fetch("https://api.payty.com/api-payment/V4/Charge/CreatePaymentOrder", requestOptions)
        .then(response => response.text())
        .then((result) =>{
            console.log(result)
            const jsonWeb = JSON.parse(result);
            resolve( {url:"",resp:jsonWeb} );
        })
        .catch(error => {
            resolve( error );
        });
        
});
}

 const buscarPayty = async ( info:any ): Promise<any> => {
    return new Promise<any>( (resolve, reject) => {
        
        const { amount,email,name,phone,topdoc,doc,reference } = info;

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic NTc4NDUwMDI6cHJvZHBhc3N3b3JkX3NrbjA0V0RLNmVEQWp6SDdNV29la3BPaEpVTGVjUzlqNEdtNURlck9HemNKQQ==");
        myHeaders.append("Cookie", "JSESSIONID=37c6A2a62CFB2FF6131cbeBbae582714Ef29DaDC.vadworldapi01-bdx-prod-fr-lyra");

        let raw = "";
        
        raw = JSON.stringify({
            "paymentOrderId": `${reference}`,
        });

        let requestOptions : RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

         fetch("https://api.payty.com/api-payment/V4/Charge/PaymentOrder/Get", requestOptions)
        .then(response => response.text())
        .then((result:any) =>{
            const jsonWeb = JSON.parse(result);
            resolve( jsonWeb );
        })
        .catch(error => {
            resolve( error );
        });
        
});
}

const generateRandomString = async () =>{

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const cookieValue = `JSESSIONID=${result}.vadworldapi01-bdx-prod-fr-lyra`;

    return cookieValue;
}