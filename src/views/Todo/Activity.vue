<template>
    <v-container>
        <div>
            <v-row>
                <v-col class="col">
                    <v-row class="todo-title" v-if="edit">
                        <v-icon size="40" @click="backButton()" data-cy="todo-back-button">
                            mdi-chevron-left
                        </v-icon>
                        <v-text-field 
                            type="text" 
                            v-model="activity.title" 
                            outlined 
                            color="#16ABF8"
                            @change="updateActivity(activity.id)"
                            data-cy="todo-title" 
                        >
                        </v-text-field>
                    </v-row>
                    <v-row class="todo-title" v-else>
                        <v-icon size="40" @click="backButton()" data-cy="todo-back-button" class="mr-4">
                            mdi-chevron-left
                        </v-icon>
                        <p @click="edit = true" data-cy="todo-title">{{activity.title}}</p>
                        <v-icon @click="edit = true" data-cy="todo-title-edit-button" class="ml-4">
                            $vuetify.icons.customEdit
                        </v-icon>
                    </v-row>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-dialog
                        v-model="modalAdd"
                        max-width="830px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                class="btn-add-todo white--text rounded-pill pa-6"
                                color="#16ABF8"
                                data-cy="todo-add-button"
                                v-bind="attrs"
                                v-on="on" 
                            >
                                <v-icon>mdi-plus</v-icon>
                                Tambah
                            </v-btn>
                        </template>
                        <v-card
                            rounded
                            data-cy="modal-add"
                        >
                            <v-card-title>
                                <v-container>
                                    <v-row>
                                        <p data-cy="modal-add-title">Tambah List Item</p>
                                        <v-spacer></v-spacer>
                                        <v-icon @click="modalAdd=false" data-cy="modal-add-close-button">
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
                                    <v-btn color="primary" rounded @click="addTodo()" data-cy="modal-add-save-button">
                                        Simpan
                                    </v-btn>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <div v-if="activity.todo_items.length > 0" class="mt-16">
                <v-row>
                    <v-col class="d-flex flex-column align-center" v-for="(td, k) in activity.todo_items" :key="k">
                        <v-card 
                            data-cy="todo-item"
                            width="800px"
                            height="60px"
                            style="border-radius: 10px;"
                            class="pa-2 px-8"
                        >
                        <v-row>
                            <v-checkbox
                                data-cy="todo-item-checkbox"
                            >
                            </v-checkbox>
                            <v-icon
                                :color="todoColor(td.priority)"
                                size="9"
                                class="ml-2"
                                data-cy="todo-item-priority-indicator"
                            >
                                mdi-circle
                            </v-icon>
                            <v-card-title data-cy="todo-item-title">
                                {{td.title}}
                            </v-card-title>
                            <v-col class="mt-2">
                                <v-dialog v-model="modalEdit" max-width="830px" :retain-focus="false">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon data-cy="todo-item-edit-button" v-on="on" v-bind="attrs" @click="set({data: td})">
                                            $vuetify.icons.customEdit
                                        </v-icon>
                                    </template>  
                                    <v-card
                                        rounded
                                        data-cy="modal-edit"
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
                                                <label class="text-uppercase">Nama List Item</label>
                                                <v-text-field
                                                    outlined
                                                    data-cy="modal-edit-name-input"
                                                    v-model="itemTodo.title"
                                                >
                                                </v-text-field>

                                                <label class="text-uppercase">Priority</label>
                                                <v-select 
                                                    v-model="itemTodo.priority" 
                                                    :items="prioritys"
                                                    outlined
                                                    style="width: 205px"
                                                    data-cy="modal-edit-priority-dropdown"
                                                >
                                                    
                                                </v-select>
                                                <v-btn color="primary" rounded @click="editTodo()" data-cy="modal-edit-save-button">
                                                    Simpan
                                                </v-btn>
                                            </v-container>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-col>
                            
                            <v-spacer></v-spacer>
                            <div>
                                <v-dialog v-model="modalDelete" max-width="490px" style="height: 355px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon data-cy="todo-item-delete-button" v-on="on" v-bind="attrs" class="mt-5" @click="set({data: td})">
                                            $vuetify.icons.custom
                                        </v-icon>
                                        
                                    </template>
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

                            </div>
                            
                        </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <v-row v-else>
                <v-col class="d-flex flex-column align-center mt-32" data-cy="todo-empty-state">
                    <v-img 
                        src="../../assets/todo-empty-state.png" 
                        alt="empty-state" 
                        max-width="541px" 
                        max-height="413px"
                        data-cy="activity-empty-state"
                    >
                    </v-img>
                </v-col>
            </v-row>
            <v-dialog v-model="deleteSuccess" max-width="490px" style="height: 58px">
                <v-card>
                    <v-card-title data-cy="modal-information-title">
                        <v-icon left data-cy="modal-information-icon">
                            $vuetify.icons.customIconCircleAlert
                        </v-icon>
                        Item Berhasil Dihapus
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
            edit: false,
            todo: {
                title: 'todo title',
                priority: ''
            },
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
            deleteSuccess: false,
            itemTodo: {}
                
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
            let results = await callApi(`/activity-groups/${act_id}?email=saahalla@gmail.com`, 'GET', {});
            this.activity = results;

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
                priority: this.todo.priority
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
            // alert(JSON.stringify(this.itemTodo))
            let data = {
                id: this.itemTodo.id,
                title: this.itemTodo.title,
                priority: this.itemTodo.priority,
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
        todoColor(priority) {
            let color = priority === "very-high" ? 'red' : 
                        priority === "high" ? 'yellow' : 
                        priority === "normal" ? 'green' :
                        priority === "low" ? 'blue' : 
                        priority === "very-low" ? 'purple' :
                        'black';
            return color;
        }, 
        set(d){
            // alert(JSON.stringify(d))
            this.itemTodo = d.data;
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
        @media only screen and (min-width: 768px) {
            margin-left: 120px;
            margin-right: 120px;
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