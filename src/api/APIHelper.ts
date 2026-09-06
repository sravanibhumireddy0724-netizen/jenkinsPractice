import { APIRequestContext } from "@playwright/test";


export class ApiHelper{

    private readonly request:APIRequestContext;
    private readonly baseURL:string;

    constructor(request:APIRequestContext,baseURL:string){

        this.request=request;
        this.baseURL=baseURL;
    }

    //GET

    async get(endpoint:string,headers?:Record<string,string>){
        let resposne=await this.request.get(`${this.baseURL}${endpoint}`,{
            headers:headers});

            return{ status:resposne.status(),
              //  statusText:resposne.statusText(),
                body:await resposne.json()
            }

        }
        //POST
 async post(endpoint:string,data:object,headers?:Record<string,string>){
        let resposne=await this.request.post(`${this.baseURL}${endpoint}`,{
            headers:headers,
            data:data
        });

            return{ status:resposne.status(),
              //  statusText:resposne.statusText(),
                body:await resposne.json()
            }

        }

        
        //PUT
 async put(endpoint:string,data:object,headers?:Record<string,string>){
        let resposne=await this.request.put(`${this.baseURL}${endpoint}`,{
            headers:headers,
            data:data
        });

            return{ status:resposne.status(),
              //  statusText:resposne.statusText(),
                body:await resposne.json()
            }

        }

        
        //DELETE
 async delete(endpoint:string,headers?:Record<string,string>){
        let resposne=await this.request.delete(`${this.baseURL}${endpoint}`,{
            headers:headers
        
        });

            return{ status:resposne.status(),
              //  statusText:resposne.statusText(),
             //   body:await resposne.json()
            }

        }





    }



