<template>
    <div class="card">
        <DataTable :value="tabledata" tableStyle="min-width: 50rem">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </div>
</template>

<script>
    import api from "../../service/TodoService.js";
    export default {
        components: {

        },
        data() {
        return {
            tabledata: []
        }
        },
        created(){

        },
        mounted() { 
            //return this.getTableData();

        },
        methods: {
            readTableData(){
                return api.getTodos()
                .then (result=>{
                    if (result.ok){
                        this.tabledata=result.data
                        console.log(  'OKKKKK:  '  +  JSON.stringify(this.tabledata)  )
                    } else {
                        this.tabledata=[]
                        console.log(  'ERRORR!'  )
                    }

                });

            },
        }
    

    }

    </script>

    <style scoped> 

    </style>