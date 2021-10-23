<template>
    <v-container>
        <div>
            <v-row>
                <v-col class="col">
                    <h1 class="todo-title" data-cy="todo-title" v-if="edit">
                        <v-icon size="40" @click="backButton()" data-cy="todo-back-button">
                            mdi-chevron-left
                        </v-icon>
                        <v-text-field 
                            type="text" 
                            v-model="activity.title" 
                            outlined 
                            color="#16ABF8"
                            @change="updateActivity(activity.id)"
                        >
                        </v-text-field>
                    </h1>
                    <h1 class="todo-title" data-cy="todo-title" v-else>
                        <v-icon size="40" @click="backButton()" data-cy="todo-back-button">
                            mdi-chevron-left
                        </v-icon>
                        {{activity.title}}
                        <v-icon @click="edit = true">
                            mdi-pencil
                        </v-icon>
                    </h1>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-btn 
                        class="btn-add-todo white--text rounded-pill pa-6"
                        color="#16ABF8"
                        data-cy="todo-add-button"   
                        @click="addActivity"     
                    >
                    <v-icon>mdi-plus</v-icon>
                    Tambah
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="activity.length > 0" style="margin-left">
                <v-col class="d-flex flex-column align-center mt-32" data-cy="activity-empty-state" v-for="(act, k) in activity" :key="k">
                    <v-card 
                        data-cy="activity-item"
                        width="235px"
                        height="234px"
                        style="border-radius: 10px; "
                    >
                        <v-card-title>
                            {{act.title}}
                        </v-card-title>
                        <v-card-action>
                            <v-row class="d-flex flex-column align-center">
                                <p class="mt-16">
                                    {{formatDate(act.created_at)}}
                                </p>
                                <v-btn
                                    data-cy="activity-item-delete-button"
                                    @click="deleteActivity(act.id)"
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-row>
                        </v-card-action>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col class="d-flex flex-column align-center mt-32" data-cy="activity-empty-state">
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
        </div>
    </v-container>
</template>

<script>
import {callApi} from '../../callApi';

  export default {
    name: 'Dashboard',
    data: function () {
        return {
            activity: {},
            edit: false,
            todo: {
                title: 'todo title',
                priority: 'very-high'
            }
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
            console.log(results);
            this.activity = results;
        },
        updateActivity: async function(id) {
            let results = await callApi('/activity-groups/'+id, 'PATCH', {title: this.activity.title})
            if (results) {
               this.getData(); 
               this.edit=false;
            }
        },
        addActivity: async function() {
            let data = {
                activity_group_id: this.activity.id,
                title: this.todo.title,
                priority: this.todo.priority || 'high'
            }
                alert(JSON.stringify(data))
            // let results = await callApi('/activity-groups', 'POST', {title: 'New Activity', email: 'saahalla@gmail.com'})
            // if (results.email === 'saahalla@gmail.com') {
            //    this.getData(); 
            // }
        },
        async deleteActivity(id) {
            // alert(id);
            let results = await callApi('/activity-groups/'+id, 'DELETE', {});
            if(results){
                this.getData();
            }

        },
        formatDate(d) {
            let date = d.substr(0,10);
            let arr = date.split('-');
            let yyyy = arr[0];
            let mm = arr[1];
            let dd = arr[2];
            mm = mm == (1 || '01') ? 'Januari' :
                    mm == (2 || '02') ? 'Februari' :
                    mm == (3 || '03') ? 'Maret' :
                    mm == (4 || '04') ? 'April' :
                    mm == (5 || '05') ? 'Mei' :
                    mm == (6 || '06') ? 'Juni' :
                    mm == (7 || '07') ? 'Juli' :
                    mm == (8 || '08') ? 'Agustus' :
                    mm == (9 || '09') ? 'September' :
                    mm == ('10') ? 'Oktober' :
                    mm == ('11') ? 'November' :
                    mm == ('12') ? 'Desember' : mm

            date = `${dd} ${mm} ${yyyy}`;
            return date;
        },
        backButton() {
            window.history.back();
        }
    }
  }
</script>

<style lang="scss" scoped>
    .todo-title {
        /* activity-title */
        position: absolute;
        top: 63px;

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
        top: 63px;
        @media only screen and (min-width: 768px) {
            margin-left: 120px;
            margin-right: 120px;
        }
    }
    .mt-32 {
        margin-top: 120px;
    }
</style>