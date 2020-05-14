
async function request(...options) {
    let params = options[0];
    toastr[params['type']](params['message']);
}
export default ({ app, store }, inject) => {
    inject('Notification', async (options) => await request(options))
}