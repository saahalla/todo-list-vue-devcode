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
            <v-row v-if="activity.length > 0">
                <v-col class="d-flex flex-column align-center mt-32" data-cy="activity-empty-state" v-for="(act, k) in activity" :key="k">
                    <v-card 
                        data-cy="activity-item"
                        width="235px"
                        height="234px"
                        rounded
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
                        src="../../assets/empty.png" 
                        alt="empty" 
                        max-width="767px" 
                        max-height="490px"
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
            activity: [
                
            ]
        }
    },
    components: {
      
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
</style>