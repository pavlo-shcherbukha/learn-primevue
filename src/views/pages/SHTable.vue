<template>
    <div class="card">

        <DataTable 
            :value="tabledata" 
            tableStyle="min-width: 50rem"
            :scrollable="true"
            scrollHeight="100%"
            :resizableColumns="true"
            columnResizeMode="expand"
            :reorderableColumns="true"
            selectionMode="single"
            v-model:selection="selectedRow"
            sortMode="multiple" 
            dataKey="id"
        >
            <Column field="id"      header="Task ID" sortable ></Column>
            <Column field="user_id" header="User assigned" sortable ></Column>
            <Column field="title"   header="Title" sortable ></Column>
            <Column field="due_on"  header="Finish at" sortable ></Column>
            <Column field="status"  header="Task status" sortable ></Column>
        </DataTable>
    </div>
</template>

<script>
    import TodoService from "../../service/TodoService.js";
    export default {
        components: {

        },
        data() {
            return {
                todo_srvc: new TodoService(),
                tabledata: []
            }
        },
        created(){

        },
        mounted() { 
       
            this.readTableData()
            return true;

        },
        methods: {
            readTableData(){
                this.todo_srvc.read2Todos()
                .then(resdata => {
                    if (resdata.ok){
                        this.tabledata=resdata.data;
                    } else {
                        this.tabledata=[]
                    }
                });
   
            },
        }
    

    }

    </script>

    <style scoped> 

    </style>