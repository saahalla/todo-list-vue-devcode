<template>
    <v-container>
        <div>
            <v-row>
                <v-col class="col">
                    <v-row class="todo-title">
                        <v-btn @click="backButton()" data-cy="todo-back-button" class="mr-2 mt-2" plain>
                            <v-icon size="40">
                                mdi-chevron-left
                            </v-icon>
                        </v-btn>
                        <v-text-field 
                            type="text" 
                            v-model="activity.title" 
                            outlined 
                            color="#16ABF8"
                            v-if="edit"
                            autofocus
                            @blur="updateActivity(activity.id)"
                        >
                        </v-text-field>
                        <h4 @click="edit = true" data-cy="todo-title" v-else>{{activity.title}}
                        </h4>
                        <v-btn @click="edit = true" data-cy="todo-title-edit-button" class="mt-2" plain>
                            <v-icon>
                                $vuetify.icons.customEdit
                            </v-icon>
                        </v-btn>
                    </v-row>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-menu offset-y data-cy="sort">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                style="margin-top: 63px; float: right" 
                                class="rounded-pill pa-6" 
                                data-cy="todo-sort-button"
                                v-on="on"
                                v-bind="attrs"
                            >
                                <v-icon>
                                    mdi-sort
                                </v-icon>
                            </v-btn>
                        </template>
                        <v-list max-width="300px" data-cy="sort-parent">
                            <v-list-item
                                v-for="(sort, k) in sortItems"
                                :key="k"
                                @click="sortTodo(sort.name)"
                                data-cy="sort-selection"
                            >
                                <v-icon color="blue" class="mr-4" data-cy="sort-selection-icon">
                                    {{sort.icon}}
                                </v-icon>
                                <v-list-item-title data-cy="sort-selection-title">
                                    {{sort.name}}
                                </v-list-item-title>
                                <v-spacer></v-spacer>
                                <v-icon v-if="sort.check === true" color="blue" data-cy="sort-selection-selected">
                                    mdi-check
                                </v-icon>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
                <v-col>
                    <v-btn 
                        class="btn-add-todo white--text rounded-pill pa-6"
                        color="#16ABF8"
                        data-cy="todo-add-button"
                        @click="showAddModal"
                    >
                        <v-icon>mdi-plus</v-icon>
                        Tambah
                    </v-btn>
                    
                </v-col>
            </v-row>
            <div v-if="todo_items && todo_items.length > 0" class="mt-16">
                <v-row>
                    <v-col class="d-flex flex-column align-center" v-for="(td, k) in todo_items" :key="k">
                        <v-card 
                            data-cy="todo-item"
                            width="800px"
                            height="60px"
                            style="border-radius: 10px;"
                            class="pa-2 px-8"
                        >
                        <v-row class="d-flex align-center">
                            <!-- <v-checkbox
                                :input-value="td.is_active === true || td.is_active === 1 ? false : true"
                                value
                                data-cy="todo-item-checkbox"
                                @click="updateStatusTodo(td)"
                            >
                            </v-checkbox> -->
                            <input
                                type="checkbox"
                                :checked="td.is_active === true || td.is_active === 1 ? false : true"
                                @click="updateStatusTodo(td)"
                                style="width: 20px; height: 20px"
                                data-cy="todo-item-checkbox"
                            >
                            <v-icon
                                :color="todoColor(td.priority)"
                                size="9"
                                class="ml-2"
                                data-cy="todo-item-priority-indicator"
                            >
                                mdi-circle
                            </v-icon>
                            <v-card-title data-cy="todo-item-title" id="todoItemTitle" :style="td.is_active == 0 ? 'text-decoration: line-through; color: #888888': ''">
                                {{td.title}}
                            </v-card-title>
                            <!-- <v-col> -->
                                <v-btn data-cy="todo-item-edit-button" @click="showEditModal({data: td})" plain>
                                    <v-icon>
                                        $vuetify.icons.customEdit
                                    </v-icon>
                                </v-btn>
                            <!-- </v-col> -->
                            
                            <v-spacer></v-spacer>
                            <div>
                                <v-btn data-cy="todo-item-delete-button" @click="showModalDelete({data: td})" plain>
                                    <v-icon>
                                        $vuetify.icons.custom
                                    </v-icon>
                                </v-btn>   
                            </div>
                            
                        </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <v-row v-else>
                <v-col class="d-flex flex-column align-center mt-32">
                    <v-img 
                        src="../../assets/todo-empty-state.png" 
                        alt="empty-state" 
                        max-width="541px" 
                        max-height="413px"
                        data-cy="todo-empty-state"
                    >
                    </v-img>
                </v-col>
            </v-row>
            <!-- Modal Add item Todo -->
            <v-dialog
                v-model="modalAdd"
                max-width="830px"
            >
                <v-card
                    rounded
                    data-cy="modal-add"
                >
                    <v-card-title>
                        <v-container>
                            <v-row>
                                <h4 data-cy="modal-add-title">Tambah List Item</h4>
                                <v-spacer></v-spacer>
                                <v-btn plain @click="modalAdd=false" data-cy="modal-add-close-button">
                                    <v-icon>
                                        mdi-close
                                    </v-icon>
                                </v-btn>

                            </v-row>
                        </v-container>
                    </v-card-title>
                    <hr/>
                    <v-card-text>
                        <v-container>
                            <label class="text-uppercase" data-cy="modal-add-name-title">Nama List Item</label>
                            <v-text-field
                                outlined
                                data-cy="modal-add-name-input"
                                v-model="todo.title"
                            >
                            </v-text-field>

                            <label class="text-uppercase" data-cy="modal-add-priority-title">Priority</label>
                            <v-select 
                                v-model="todo.priority" 
                                :items="prioritys"
                                outlined
                                style="width: 205px"
                                data-cy="modal-add-priority-dropdown"
                            >
                                
                            </v-select>
                            <v-btn color="primary" rounded @click="addTodo()" data-cy="modal-add-save-button" :disabled="todo.title && todo.priority ? false : true">
                                Simpan
                            </v-btn>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Modal Edit Item Todo -->
            <v-dialog v-model="modalEdit" max-width="830px" :retain-focus="false">
                <v-card
                    rounded
                    data-cy="modal-add"
                >
                    <v-card-title>
                        <v-container>
                            <v-row>
                                Edit Item
                                <v-spacer></v-spacer>
                                <v-icon @click="modalEdit=false">
                                    mdi-close
                                </v-icon>

                            </v-row>
                        </v-container>
                    </v-card-title>
                    <hr/>
                    <v-card-text>
                        <v-container>
                            <label class="text-uppercase" data-cy="modal-add-name-title">Nama List Item</label>
                            <v-text-field
                                outlined
                                data-cy="modal-add-name-input"
                                v-model="itemTodo.title"
                            >
                            </v-text-field>

                            <label class="text-uppercase" data-cy="modal-add-priority-title">Priority</label>
                            <div data-cy="modal-add-priority-dropdown">
                                <v-select 
                                    v-model="itemTodo.priority" 
                                    :items="prioritys"
                                    outlined
                                    style="width: 205px"
                                    data-cy="modal-add-priority-item"
                                >
                                    
                                </v-select>
                            </div>
                            <v-btn color="primary" rounded @click="editTodo()" data-cy="modal-add-save-button">
                                Simpan
                            </v-btn>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Modal Hapus Item Todo -->
            <v-dialog v-model="modalDelete" max-width="490px" style="height: 355px">
                <v-card
                    rounded
                    data-cy="modal-delete"
                    style="text-align: center"
                    class="px-8 py-6"
                >
                    <v-icon size="84" data-cy="modal-delete-icon" class="delete-card-header">
                        $vuetify.icons.customAlert
                    </v-icon>
                    <v-card-title style="text-align: center">
                        Apakah anda yakin menghapus List Item "{{itemTodo.title}}"
                    </v-card-title>
                    <v-col>
                        <v-btn color="#f4f4f4" data-cy="modal-delete-cancel-button" rounded class="px-8 mr-4" @click="modalDelete=false">
                            Batal
                        </v-btn>
                        <v-btn color="#ED4C5C" data-cy="modal-delete-confirm-button" rounded class="px-8" @click="deleteItem(itemTodo.id)">
                            Hapus
                        </v-btn>
                    </v-col>
                    
                </v-card>
            </v-dialog>
            <v-dialog v-model="deleteSuccess" max-width="490px" style="height: 58px">
                <v-card data-cy="modal-information">
                    <v-card-title data-cy="modal-information-title">
                        <v-icon left data-cy="modal-information-icon">
                            $vuetify.icons.customIconCircleAlert
                        </v-icon>
                        Item Todo Berhasil Dihapus
                    </v-card-title>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>

<script>
import {callApi} from '../../callApi';

  export default {
    name: 'Dashboard',
    data: function () {
        return {
            activity: {}, // activity
            todo_items: [],
            edit: false,
            todo: {
                title: '',
                priority: 'high'
            },
            sortItems: [
                {
                    name: "Terbaru", 
                    icon: "mdi-sort-ascending",
                    check: false
                },
                {
                    name: "Terlama", 
                    icon: "mdi-sort-descending",
                    check: false
                },
                {
                    name: "A-Z", 
                    icon: "mdi-sort-alphabetical-ascending",
                    check: false
                },
                {
                    name: "Z-A", 
                    icon: "mdi-sort-alphabetical-descending",
                    check: false
                },
                {
                    name: "Belum Selesai", 
                    icon: "mdi-sort",
                    check: false
                }
            ],
            prioritys: [//'Very High', 'High', 'Medium', 'Low', 'Very Low'
                {
                    value: 'very-high',
                    text: 'Very High',
                },
                {
                    value: 'high',
                    text: 'High',
                },
                {
                    value: 'normal',
                    text: 'Medium',
                },
                {
                    value: 'low',
                    text: 'Low',
                },
                {
                    value: 'very-low',
                    text: 'Very Low',
                },
            ],
            modalAdd: false,
            modalEdit: false,
            modalDelete: false,
            itemTodo: {},
            deleteSuccess: false
                
        }
    },
    components: {
      
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData: async function() {
            let act_id = this.$route.params.id;
            // alert(JSON.stringify(act_id));
            let results = await callApi(`/activity-groups/${act_id}`, 'GET', {});
            this.activity = results;
            this.todo_items = results.todo_items;

        },
        backButton() {
            window.history.back();
        },
        async updateActivity(id) {
            let data= {
                title: this.activity.title
            }
            let results = await callApi('/activity-groups/'+id, 'PATCH', data)
            if(results) {
                this.getData();
                this.edit = false;
            }
        },
        async addTodo() {
            let data = {
                activity_group_id: this.activity.id,
                title: this.todo.title,
                priority: this.itemTodo.priority
            }
            let results = await callApi('/todo-items', 'POST', data)
            if(results){
                this.modalAdd = false;
                this.todo = {};
                this.getData();
            }
            // alert(JSON.stringify(results));
        },
        async editTodo() {            
            let data = {
                id: this.itemTodo.id,
                title: this.itemTodo.title,
                priority: this.itemTodo.priority
            };
            let results = await callApi(`/todo-items/${data.id}`, 'PATCH', data);
            if(results) {
                this.getData()
                this.modalEdit = false;
            }
        },
        async deleteItem(id) {
            let results = await callApi(`/todo-items/${id}`, 'DELETE', {});
            if(results) {
                this.getData()
                this.modalDelete = false;
                this.deleteSuccess = true;
            }
        },
        async updateStatusTodo(data) {
            data.is_active = data.is_active == true ? false : true;
            // alert(JSON.stringify(data))
            await callApi(`/todo-items/${data.id}`, 'PATCH', data);
           
        },
        showAddModal() {
            this.modalAdd = true;
        },
        showEditModal(d) {
            this.modalEdit = true;
            this.itemTodo = d.data;
        },
        todoColor(priority) {
            // console.log(priority);
            let color = priority === "very-high" ? 'red' : 
                        priority === "high" ? 'yellow' : 
                        priority === "normal" ? 'green' :
                        priority === "low" ? 'blue' : 
                        priority === "very-low" ? 'purple' :
                        'black';
            return color;
        }, 
        showModalDelete(d){
            // alert(JSON.stringify(d))
            this.itemTodo = d.data;
            this.modalDelete = true;
        },
        sortTodo(name) {
            if(name === 'Terbaru') {
                this.sortTerbaru();
                this.sortItems[0].check = true;
                this.sortItems[1].check = false;
                this.sortItems[2].check = false;
                this.sortItems[3].check = false;
                this.sortItems[4].check = false;
            }else if(name === 'Terlama') {
                this.sortTerlama();
                this.sortItems[1].check = true;
                this.sortItems[0].check = false;
                this.sortItems[2].check = false;
                this.sortItems[3].check = false;
                this.sortItems[4].check = false;
            }else if(name === 'A-Z') {
                this.sortAZ();
                this.sortItems[2].check = true;
                this.sortItems[0].check = false;
                this.sortItems[1].check = false;
                this.sortItems[3].check = false;
                this.sortItems[4].check = false;
            }else if(name === 'Z-A') {
                this.sortZA();
                this.sortItems[3].check = true;
                this.sortItems[0].check = false;
                this.sortItems[1].check = false;
                this.sortItems[2].check = false;
                this.sortItems[4].check = false;
            }else if(name === 'Belum Selesai') {
                this.sortBelumSelesai();
                this.sortItems[4].check = true;
                this.sortItems[0].check = false;
                this.sortItems[1].check = false;
                this.sortItems[2].check = false;
                this.sortItems[3].check = false;
            }
            console.log(JSON.stringify(this.todo_items))
            // alert(name);
        },
        sortTerlama() {
            this.todo_items.sort(function(a, b){
                return a.id - b.id
            })
        },
        sortTerbaru() {
            this.todo_items.sort(function(a, b){
                return b.id - a.id
            })
        },
        sortBelumSelesai() {
            this.todo_items.sort(function(a,b){
                return b.is_active - a.is_active
            })
        },
        sortAZ(){
            this.todo_items.sort(function(a,b){
                let x = String(a.title).toLowerCase();
                let y = String(b.title).toLowerCase();

                if(x < y) {return -1;}
                if(x > y) {return 1;}
                return 0;
            })
        },
        sortZA(){
            this.todo_items.sort(function(a,b){
                let x = String(a.title).toLowerCase();
                let y = String(b.title).toLowerCase();

                if(x < y) {return 1;}
                if(x > y) {return -1;}
                return 0;
            })
        }
    }
  }
</script>

<style lang="scss" scoped>
    .todo-title {
        /* activity-title */
        position: absolute;
        margin-top: 63px;

        font-family: Poppins;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 54px;
        /* identical to box height */
        color: #111111;

        @media only screen and (min-width: 768px) {
            margin-left: 120px;
            margin-right: 120px;
        }
    }
    .btn-add-todo {
        margin-top: 63px;
        float: right;
        @media only screen and (min-width: 768px) {
            // margin-left: 120px;
            margin-right: 150px;
        }
    }
    .mt-32 {
        margin-top: 120px;
    }
    .delete-card-header {
        height: 130px;
        // background-color: red;
    }
</style>