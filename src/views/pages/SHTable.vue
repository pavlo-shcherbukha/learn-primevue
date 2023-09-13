<template>
    <Toast />
    <div class="card">
        <h2> The simple grid with multi column sorting and one row selection</h2>
        <p> <a href="https://primevue.org/datatable/" target="_blank">primeview datatable</a> </p>
    </div>
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
            @row-select="onRowSelect($event)" 
        >
            <Column selectionMode="single" headerStyle="width: 3rem"></Column>
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
                tabledata: [],
                selectedRow: {}
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
            onRowSelect(event){
                let selected_id=event.data.id
                let selected_name=event.data.title
                this.$toast.add(
                                    {
                                    severity: 'info', 
                                    summary: 'Row Selected', 
                                    detail: `rowid=${selected_id} title=${selected_name} row index=${event.index}` , 
                                    life: 3000}
                                );
            

            },            
        }
    

    }

    </script>

    <style scoped> 

    </style>