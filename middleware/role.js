import groupmenu from "../plugins/groupmenu";
export default function ({ app, store, redirect, route, error,res }) {
    let link = route.path
        .trim()
        .toLowerCase().split("/");
    if (link.length > 1) {
        link = "/" + link[1];
    }
    let permission;
    for (let i = 0; i < groupmenu.length; i++) {
        if (Array.isArray(groupmenu[i].children)) {
            for (let j = 0; j < groupmenu[i]['children'].length; j++) {
                if (Array.isArray(groupmenu[i]['children'][j].permission)) {
                    for (let z = 0; z < groupmenu[i]['children'][j]['children'].length; z++) {
                        let path = groupmenu[i]['children'][j]['children'][z].path.trim()
                            .toLowerCase()
                            .split("?");
                        if (link == path[0]) {
                            permission = groupmenu[i]['children'][j]['children'][z].permission;
                            break;
                        }
                    }
                } else {
                    let path = (groupmenu[i]['children'][j]['path'] + '').trim()
                        .toLowerCase()
                        .split("?");
                    if (path[0] == link) {
                        if(groupmenu[i]['children'][j].permission){
                            permission = groupmenu[i]['children'][j].permission;
                        }
                        else
                            permission = groupmenu[i].permission;
                        break;
                    }
                }
            }
        }
    }
    if (!store.state.common.profile.is_root && (link != '/' && link != '/profile')) {
        if (store.state.common.profile.permission) {
            let find = store.state.common.profile.permission.find(x => {
                return x == permission;
            });
            if (!find) {
                return error({ statusCode: 403 });
            }
        }
    }
}