export default function ({ app, store, route,  redirect ,res}) {
    if (!store.state.common.session) {
        store.dispatch("common/loadSessionInSsr", app);
        if (!store.state.common.session) {
            return redirect('/login');
        }
    }

}