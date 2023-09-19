<template>
    <Toast />
    <div class="card">
        <h2> The simple grid with CRUD</h2>
        <p> <a href="https://primevue.org/datatable/" target="_blank">primeview datatable</a> </p>
         <Toolbar class="mb-4">
               <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="createTodo" />
                            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="deleteTodos" />

                         </div>
                </template>

         </Toolbar>        
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
            <Column headerStyle="min-width:10rem;">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="EditTodo(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="ConfirmDeleteTodo(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        <!-- Edit DIALOG -->
        <Dialog v-model:visible="todoDialog" :style="{ width: '450px' }" header="Todo Details" :modal="true" class="p-fluid">
                <div class="flex align-items-center justify-content-center">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span>EDIT DIALOG</span>
                </div>
                <div class="field">
                        <label for="id">id todo</label>
                        <InputText id="id" v-model.trim="todoDialogRow.id" required="true" autofocus :class="{ 'p-invalid': submitted && !todoDialogRow.id }" />
                        <small class="p-invalid" v-if="submitted && !todoDialogRow.id">id is required.</small>
                </div>
                <div class="field">
                        <label for="user_id">user_id</label>
                        <InputText id="user_id" v-model.trim="todoDialogRow.user_id" required="true" autofocus :class="{ 'p-invalid': submitted && !todoDialogRow.user_id }" />
                        <small class="p-invalid" v-if="submitted && !todoDialogRow.user_id">user_id is required.</small>
                </div>
                <div class="field">
                        <label for="title"></label>
                        <Textarea id="title" v-model="todoDialogRow.title" required="true" rows="3" cols="20" />
                </div>
                <div class="field">
                        <label for="due_on"></label>
                        <small class="p-invalid" v-if="submitted && !todoDialogRow.due_on">due_on is required.</small>
                        <Calendar v-model="todoDialogRow.due_on" dateFormat="yy-mm-dd" showIcon />
                </div>
                <div class="field">
                        <label for="status"></label>
                        <small class="p-invalid" v-if="submitted && !todoDialogRow.status">status is required.</small>
                        <Dropdown id="status" v-model="todoDialogRow.status" :options="statuses" optionLabel="label"  optionValue="value" placeholder="Select a Status">
                            <template #value="slotProps">
                               <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>


                </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveTodo" />
            </template>
        </Dialog>  
        <Dialog v-model:visible="todoDeleteDialog" :style="{ width: '450px' }" header="Confirm Delete record" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="todoDeleteDialogRow">Are you sure you want to <b>delete</b> <br/><b>id={{ todoDeleteDialogRow.id }}</b> <br/> <b>title = {{todoDeleteDialogRow.title}}</b>? <br/></span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="todoDeleteDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteTodo" />
                    </template>
        </Dialog>      
     
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
                selectedRow: {},
                todoDialog: false,
                todoDialogRow:{},
                todoDialogRowStatus: {},
                statuses: [
                            { label: 'PENDING', value: 'pending' },
                            { label: 'COMPLITED', value: 'completed' },
                            { label: 'IN PROGRESS', value: 'inprogress' }
                ],
                todoDeleteDialog: false,
                todoDeleteDialogRow:{},
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

            findIndexById(id){
                let index = -1;
                for (let i = 0; i < this.tabledata.length; i++) {
                    if (this.tabledata[i].id === id) {
                        index = i;
                        break;
                    }
                }
                return index;
            },
            EditTodo(editTodo){
                this.todoDialogRow =  editTodo ;
                this.todoDialog = true;
            },
            hideDialog(){
                this.todoDialog = false;
        
            },
            saveTodo(){
                let todoid = this.todoDialogRow.id;
                let index=this.findIndexById( todoid );
                if (index > -1){
                    this.tabledata[index] = this.todoDialogRow;
                    this.todoDialogRow = {};
                    this.todoDialog = false;
                    this.$toast.add(
                                    {
                                    severity: 'info', 
                                    summary: 'Data stored', 
                                    detail: `rowid=${todoid}  index=${index}` , 
                                    life: 3000}
                                );

                } else {
                    this.tabledata.push( this.todoDialogRow );
                    this.$toast.add(
                                    {
                                    severity: 'info', 
                                    summary: 'New data added', 
                                    detail: `rowid=${todoid}  index=${index}` , 
                                    life: 3000}
                                );
                    this.todoDialogRow = {};
                    this.todoDialog = false;
                }
            },  
            ConfirmDeleteTodo(delrow){
                this.todoDeleteDialogRow=delrow;
                this.todoDeleteDialog=true;
            },
            deleteTodo(){

                let todoid = this.todoDeleteDialogRow.id;
                let index=this.findIndexById( todoid );
                if (index > -1){
                    let deleted = this.tabledata.splice( index, 1);
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Todo Deleted: ' + JSON.stringify(deleted), life: 3000 });

                }
                this.todoDeleteDialog=false;
                this.todoDeleteDialogRow={};    
                

            },
            deleteTodos(){
                this.$toast.add({ severity: 'error', summary: 'Function not implemented', detail: 'This fnction is not implemented!', life: 3000 });

            },
            createTodo(){
                this.todoDialogRow = {};
                this.todoDialog = true;
            },        
   
   
        }
    

    }

    </script>

    <style scoped> 

    </style>