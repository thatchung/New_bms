import Vue from 'vue'

import Multiselect from 'vue-multiselect'
import TableView from '../components/table/table-view.vue'
import FilterPanel from '../components/table/filter-panel.vue'
import FilterItem from '../components/table/filter-item.vue'
import SelectList from '../components/element/select-list.vue'
import RemoveSelect from '../components/element/remote-select.vue'
import model from '~/components/element/model.vue';
import ImageItem from '~/components/image/image-item.vue';
import Dropdown from '~/components/element/dropdown.vue';
import { Tabs, Tab } from 'vue-tabs-component';
// import VueLodash from 'vue-lodash'

import Thumbnail from '../components/image/thumbnail';
import ImageLink from '../components/image/image-link';
import LoadingItem from '../components/element/loading-item';
import Breadcrumb from '../components/layout/breadcrumb';
import ButtonAdd from '../components/button/button-add';
import Status from '../components/element/status';
import DataList from '../components/layout/data-list';
import DataAdd from '../components/layout/data-add';
import DataForm from '../components/layout/data-form';
import VueCookies from 'vue-cookie';

Vue.use(VueCookies);
const options = { name: 'lodash' }

Vue.component('dropdown', Dropdown)
Vue.component('data-list', DataList)
Vue.component('data-add', DataAdd)
Vue.component('data-form', DataForm)
Vue.component('image-link',ImageLink)
Vue.component('Thumbnail', Thumbnail)
Vue.component('item-image', ImageItem)
Vue.component('loading-item', LoadingItem)
Vue.component('breadcrumb', Breadcrumb)
// Vue.use(VueLodash, options);
Vue.component('status', Status);
Vue.component('multiselect', Multiselect);
Vue.component('table-view', TableView)
Vue.component('filter-panel', FilterPanel)
Vue.component('filter-item', FilterItem)
Vue.component('remote-select', RemoveSelect)
Vue.component('select-list', SelectList)
Vue.component('button-add', ButtonAdd)
Vue.component('model', model)
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
