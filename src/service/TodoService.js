import axios from "axios";
const SRVC_URL = "https://gorest.co.in";
export default class TodoService {
    readTodos() {
        let data = [
            {
                "id": 26439,
                "user_id": 5132794,
                "title": "Amissio aspicio utor triumphus deinde.",
                "due_on": "2023-09-27T00:00:00.000+05:30",
                "status": "pending"
            },
            {
                "id": 26430,
                "user_id": 5132775,
                "title": "Labore theatrum fuga dolore ambulo texo.",
                "due_on": "2023-09-23T00:00:00.000+05:30",
                "status": "pending"
            },
            {
                "id": 26424,
                "user_id": 5132764,
                "title": "Currus solio creta trado contigo varietas vix auctor.",
                "due_on": "2023-09-22T00:00:00.000+05:30",
                "status": "pending"
            },
            {
                "id": 26422,
                "user_id": 5132761,
                "title": "Conturbo despirmatio subnecto aranea cum adicio patrocinor coma tenus.",
                "due_on": "2023-09-23T00:00:00.000+05:30",
                "status": "completed"
            },
            {
                "id": 26420,
                "user_id": 5132757,
                "title": "Ascit strenuus cresco pecunia tutamen aeneus.",
                "due_on": "2023-09-29T00:00:00.000+05:30",
                "status": "pending"
            },
            {
                "id": 26419,
                "user_id": 5132756,
                "title": "Commodo inventore suadeo ut vesica aut.",
                "due_on": "2023-09-27T00:00:00.000+05:30",
                "status": "pending"
            },
            {
                "id": 26408,
                "user_id": 5132727,
                "title": "Vix suasoria sequi timidus depraedor turba alter omnis vis.",
                "due_on": "2023-10-09T00:00:00.000+05:30",
                "status": "pending"
            },
            {
                "id": 26407,
                "user_id": 5132725,
                "title": "Tero thema congregatio ut atrocitas quia aurum.",
                "due_on": "2023-10-03T00:00:00.000+05:30",
                "status": "completed"
            },
            {
                "id": 26405,
                "user_id": 5132721,
                "title": "Aureus deleo socius cunctatio carus.",
                "due_on": "2023-10-04T00:00:00.000+05:30",
                "status": "pending"
            },
            {
                "id": 26394,
                "user_id": 5131584,
                "title": "Cruentus quisquam cilicium sublime ventus.",
                "due_on": "2023-09-26T00:00:00.000+05:30",
                "status": "completed"
            }
        ];
        return data;
    };

    read2Todos() {
        let url = `${SRVC_URL}/public/v2/todos`;
        let headers = { "Content-Type": "application/json", "Accept": "application/json" }
        let response = {}
        return axios({
            method: "get",
            timeout: 30000,
            url: url,
            headers: headers
        })
        .then((result) => {
            response.ok = true;
            response.status = result.status;
            response.data = result.data;
            return response;
        })
        .catch((err) => {
            let error = {}
            error.status = err.response.status;
            error.headers = err.response.headers;
            error.url = err.response.config.url;
            error.method = err.response.config.method;
            error.params = err.response.config.params;
            error.where = err.fileName;
            error.line = err.lineNumber;
            error.data = err.response.data;
            error.message = err.message;

            response.ok = false;
            response.status = error.status;
            response.error = error;
            return response;
        });
    };
/*
    getProductsSmall() {
        return fetch(contextPath + 'demo/data/products-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProducts() {
        return fetch(contextPath + 'demo/data/products.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch(contextPath + 'demo/data/products-orders-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
*/    
}



/*
export default {
    getHealth(){
        console.log("=======");

    };

    
    getTodos(){
        let url = `${SRVC_URL}/public/v2/todos`;
        let headers={ "Content-Type": "application/json", "Accept": "application/json"}
        let response={}
        return axios( { method:  "get",
                        timeout: 30,
                        url: url,
                        headers:  headers
            .then((result) => {
                response.ok=true;
                response.status=result.status;
                response.data= result.data ;
                return response;
            })
            .catch((err) => {
                let error={}
                error.status = err.response.status;
                error.headers = err.response.headers;
                error.url = err.response.config.url;
                error.method = err.response.config.method;
                error.params = err.response.config.params;
                error.where = err.fileName;
                error.line = err.lineNumber;
                error.data = err.response.data;
                error.message = err.message ;

                response.ok = false;
                response.status = error.status;
                response.error= error ;
                return response;
        })          
    }
   
};
*/
