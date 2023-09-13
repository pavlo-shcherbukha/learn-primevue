<template>
    <Toast />

    <div class="card">
        <h2> The simple grid with multi column sorting and Multi ROWS selection</h2>
        <p> <a href="https://primevue.org/datatable/" target="_blank">primeview datatable</a> </p>
         <Toolbar class="mb-4">
               <template v-slot:start>
                        <div class="my-2">
                            <Button label="Selected Rows" icon="pi pi-play" class="p-button-success mr-2" @click="allselectedRows" />
                            
                            <Dropdown v-model="dropdownValue" :options="selectedRows" optionLabel="title" placeholder="Select" />   

                            {{dropdownValue}}        
                            
                        </div>
                </template>

         </Toolbar>
    </div>
    <div class="card">
        <DataTable 
            :value="tabledata" 
            v-model:selection="selectedRows"
            dataKey="id"
            tableStyle="min-width: 50rem"
            @row-select="onRowSelect($event)"
        >
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
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
                selectedRows: [],
                dropdownValue: null,

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
            handleRow(event){
               //let id=this.selectedRow.id   

            },
            onRowSelect(event){
                //this.$toast.add({severity: 'info',  summary: 'Row', detail: "XZ", life: 3000})
                /*
                @row-click="handleRow($event)"
                @row-select="onRowSelect($event)" 
                */

                let selected_id=event.data.id
                let selected_name=event.data.title
                this.$toast.add(
                                    {
                                    severity: 'info', 
                                    summary: `row selected rowid=${selected_id} title=${selected_name} rowindeex=${event.index}`, 
                                    detail: ".", 
                                    life: 3000}
                                );
                               
            

            },
            allselectedRows(){
                          this.$toast.add(
                                    {
                                    severity: 'info', 
                                    summary: `row selected `, 
                                    detail: JSON.stringify(this.selectedRows) , 
                                    life: 6000}
                                );

            }

        }
    

    }

</script>


