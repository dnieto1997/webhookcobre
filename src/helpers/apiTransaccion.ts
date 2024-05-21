import { PayinInterface } from "src/interfaces/payin.interface";
import { TokenInteface } from "src/interfaces/tokenCobre.interface";

export const Token = async (url:string,apikey:string,BasicPass:string): Promise<TokenInteface> => {
   
  return new Promise<TokenInteface>( (resolve, reject) => {
    
   
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Basic ${BasicPass}`);
    headers.append('X-API-KEY',apikey );

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');


    const requestOptions:RequestInit = {
        method: 'POST',
        headers: headers,
        body: data,
        redirect: 'follow',
    };

    fetch(`${url}api-auth/v1/util/tokens`, requestOptions)
    .then(response => response.json())
    .then((result:any) =>{

      resolve( result );
    })
    .catch(error => {
      console.log(error)
      reject( error );
    });
  });
}

export const CobrePayin = async (token:string,url:string,apikey:string,referencia:string,payload:any): Promise<any> => {

    return new Promise<any>( (resolve, reject) => {

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-APIGW-AUTH', token);
      headers.append('X-CORRELATION-ID',referencia);
      headers.append('X-API-KEY',apikey );
     
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        redirect: 'follow',
      };

      fetch(`${url}workplace-bank-cash-in/v2/task/cash-in-links/novelty-detail/single-payment-transaction`, requestOptions)
      .then(response => response.json())
      .then((result:any) =>{
        resolve( result );
      })
      .catch(error => {
        reject( error );
      });
        
    });
}
  
export const CobrePayoutCobre = async (token:string,url:string,apikey:string,payload:any): Promise<any> => {
   
  return new Promise<any>( (resolve, reject) => {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-APIGW-AUTH', token);
    headers.append('X-API-KEY',apikey );

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        redirect: 'follow',
    };

    fetch(`${url}workplace-bank-instruction/v2/task/novelties`, requestOptions)
    .then(response => response.json())
    .then((result:any) =>{
      resolve( result );
    })
    .catch(error => {
      reject( error );
    });

  });
}
  
export const cashInLinks = async (token:string,url:string,apikey:string,referencia:string) => {
  

  return new Promise<any>( (resolve, reject) => {

    const date = new Date;

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('X-API-KEY',apikey );
    headers.append('X-APIGW-AUTH', token);
    headers.append('X-CORRELATION-ID', `${referencia}${date}`);

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    };

    fetch(`${url}workplace-bank-cash-in/v1/entity/cash-in-links/referenced/${referencia}`, requestOptions)
    .then(response => response.json())
    .then((result:any) =>{
      resolve( result );
    })
    .catch(error => {
      reject( error );
    });

  });

}
  
export const listBank = async (token:string,url:string,postData:any) => {
  

  return new Promise<any>( (resolve, reject) => {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData),
      };

    fetch(`${url}`, requestOptions)
    .then(response => response.json())
    .then((result:any) =>{
      resolve( result );
    })
    .catch(error => {
      reject( error );
    });

  });

}