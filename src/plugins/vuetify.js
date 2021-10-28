import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import CustomIcon from '@/components/CustomIcon.vue'
import CustomIconEdit from '@/components/CustomIconEdit.vue'
import CustomIconAlert from '@/components/CustomIconAlert.vue'
import CustomIconSort from '@/components/CustomIconSort.vue'
import CustomIconCircleAlert from '@/components/CustomIconCircleAlert.vue'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
          custom: { // name of our custom icon
            component: CustomIcon, // our custom component
          },
          customEdit: {
            component: CustomIconEdit
          },
          customAlert: {
            component: CustomIconAlert
          },
          customIconCircleAlert: {
            component: CustomIconCircleAlert
          },
          customIconSort: {
            component: CustomIconSort
          }
        },
    },
});
