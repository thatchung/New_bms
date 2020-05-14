import Vue from 'vue';
import Paginate from 'vuejs-paginate';
import JsonExcel from 'vue-json-excel';
import draggable from "vuedraggable";

import PaginateCom from '../components/table/paginate.vue';
import checkboxSwitch from '../components/button/checkbox-switch';
import modeltrans from '../components/element/model-tran.vue';
import albumMedia from "../components/image/album-media";

import { VueListPicker } from "vue-list-picker";
import DragItDude from 'vue-drag-it-dude'
Vue.component('paginate', Paginate);
Vue.component('paginate-component', PaginateCom);
Vue.component('downloadExcel', JsonExcel);
Vue.component('draggableImg', draggable);
Vue.component('checkbox-switch', checkboxSwitch)
Vue.component('model-trans', modeltrans)
Vue.component('album-media', albumMedia)

Vue.component('vue-list-picker', VueListPicker)
Vue.component('vue-drag-it-dude', DragItDude)

import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';


Vue.component('hooper', Hooper)
Vue.component('slide', Slide)

Vue.component('date-picker', DatePicker)