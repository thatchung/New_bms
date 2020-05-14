import Vuex from 'vuex';

import commonModule from './modules/common';
import permissionModule from './modules/permission';
import accountModule from './modules/account';
import pageModule from './modules/page';
import missionModule from './modules/mission';
import investmentModule from './modules/investment';

const createStore = () => {
    return new Vuex.Store({
        namespaced: true,
        modules: {
            common: commonModule,
            permission: permissionModule,
            account: accountModule,
            page: pageModule,
            mission: missionModule,
            investment: investmentModule,
        }
    });
};

export default createStore