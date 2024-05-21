export const apiAliados = async ( referencia,id,ErrSms,status,currency,amount,method,url ): Promise<any> => {
    return new Promise<any>( (resolve, reject) => {
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = "";

        if(status =="declined"){

             raw = JSON.stringify({
                "reference": `${referencia}`,
                "status": `${status}`,
                "method": `${method}`,
                "amount": `${amount}`,
                "currency": `${currency}`,
                "referenceid": `${id}`,
                "ErrSms": `${ErrSms}`,
            });
        }else{
             raw = JSON.stringify({
                "reference": `${referencia}`,
                "status": `${status}`,
                "method": `${method}`,
                "amount": `${amount}`,
                "currency": `${currency}`,
                "referenceid": `${id}`,
            });
        }

        let requestOptions : RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

         fetch(url, requestOptions)
        .then(response => response.text())
        .then((result) =>{
            resolve( result );
        })
        .catch(error => {
            resolve( error );
        });
        
});
}