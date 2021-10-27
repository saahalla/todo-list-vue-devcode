<template>
    <v-container>
        <div>
            <v-row>
                <v-col class="col">
                    <h1 class="activity-title" data-cy="activity-title">Activity</h1>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-btn 
                        class="btn-add-activity white--text rounded-pill pa-6"
                        color="#16ABF8"
                        data-cy="activity-add-button"   
                        @click="addActivity"     
                    >
                    <v-icon>mdi-plus</v-icon>
                    Tambah
                    </v-btn>
                </v-col>
            </v-row>
            <div v-if="activity && activity.length > 0" class="mt-32">
                <v-row style="margin-left">
                    <v-col class="d-flex flex-column align-center" v-for="(act, k) in activity" :key="k">
                        <v-card 
                            data-cy="activity-item"
                            width="235px"
                            height="234px"
                            style="border-radius: 10px;"
                        >
                            <div
                                class="card-header"
                                @click="showActivity(act.id)"
                            >
                                <h4 data-cy="activity-item-title">
                                    {{act.title}}
                                </h4>
                            </div>
                            <div class="card-footer">
                                <v-row>
                                    <v-card-subtitle data-cy="activity-item-date">
                                        {{formatDate(act.created_at)}}
                                    </v-card-subtitle>
                                    <v-dialog 
                                        v-model="modalDeleteActivity" 
                                        max-width="490px" 
                                        style="height: 355px"
                                        :retain-focus="false"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                data-cy="activity-item-delete-button" 
                                                v-bind="attrs" 
                                                v-on="on" 
                                                @click="set({data: act})"
                                                plain
                                                class="mt-2 ml-4"
                                            >
                                                <v-icon>
                                                    $vuetify.icons.custom
                                                </v-icon>
                                            </v-btn>
                                            
                                        </template>
                                        <v-card
                                            rounded
                                            data-cy="modal-delete"
                                            style="text-align: center"
                                            class="px-9 py-6"
                                        >
                                            <v-icon size="84" data-cy="modal-delete-icon" class="delete-card-header">
                                                $vuetify.icons.customAlert
                                            </v-icon>
                                            <v-card-title style="text-align: center">
                                                Apakah anda yakin menghapus Activity "{{itemActivity.title}}"
                                            </v-card-title>
                                            <v-col>
                                                <v-btn color="#f4f4f4" data-cy="modal-delete-cancel-button" rounded class="px-8 mr-4" @click="modalDeleteActivity=false">
                                                    Batal
                                                </v-btn>
                                                <v-btn color="#ED4C5C" data-cy="modal-delete-confirm-button" rounded class="px-8" @click="deleteActivity(itemActivity.id)">
                                                    Hapus
                                                </v-btn>
                                            </v-col>
                                            
                                        </v-card>
                                    </v-dialog>

                                    <!-- </v-col> -->
                                </v-row>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <v-row v-else>
                <v-col class="d-flex flex-column align-center mt-32">
                    <v-img 
                        src="../../assets/empty.png" 
                        alt="empty" 
                        max-width="767px" 
                        max-height="490px"
                        data-cy="activity-empty-state"
                        @click="addActivity"
                    >
                    </v-img>
                </v-col>
            </v-row>
            <v-dialog v-model="deleteSuccess" max-width="490px" style="height: 58px">
                <v-card data-cy="modal-information">
                    <v-card-title data-cy="modal-information-title">
                        <v-icon left data-cy="modal-information-icon">
                            $vuetify.icons.customIconCircleAlert
                        </v-icon>
                        Activity Berhasil Dihapus
                    </v-card-title>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>

<script>
import {callApi} from '../../callApi';
// import swal from 'sweetalert';

  export default {
    name: 'Dashboard',
    data: function () {
        return {
            activity: [
                
            ],
            modalDeleteActivity: false,
            deleteSuccess: false,
            itemActivity: {}
        }
    },
    components: {
    //   Icon
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData: async function() {
            let results = await callApi('/activity-groups?email=saahalla@gmail.com', 'GET', {});
            console.log(results);
            this.activity = results.data;
        },
        addActivity: async function() {
            let results = await callApi('/activity-groups', 'POST', {title: 'New Activity', email: 'saahalla@gmail.com'})
            if (results.email === 'saahalla@gmail.com') {
               this.getData(); 
            }
        },
        async deleteActivity(id) {
            // alert(id);
            let results = await callApi('/activity-groups/'+id, 'DELETE', {});
            if(results){
                this.getData();
                this.modalDeleteActivity = false;
                // swal('Activity berhasil dihapus','', 'success')
                this.deleteSuccess = true;
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
        showActivity(id) {
            // alert(id)
            this.$router.push(`/detail/${id}`)
        },
        set(d) {
            this.itemActivity = d.data;
        }
    }
  } 
</script>

<style lang="scss" scoped>
    .activity-title {
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
    .btn-add-activity {
        top: 63px;
        @media only screen and (min-width: 768px) {
            margin-left: 120px;
            margin-right: 120px;
        }
    }
    .mt-32 {
        margin-top: 120px;
    }
    
    .card-header {
        padding-top: 15px;
        padding-left: 20px;
        padding-right: 20px;
        height: 190px;
        font-family: Poppins;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        // /* identical to box height */
        // background-color: blue;
    }
    .card-footer {
        padding-right: 20px;
        padding-left: 20px;
        // background-color: red;
    }
    .delete-card-header {
        height: 130px;
        // background-color: red;
    }
</style>