let { Hub, Logger } = require('./constant');
let { Moment } = require('lixi-core-nodejs');
const mqtt = require('mqtt');
let config = require('../../config');
let subscribe = 'log_bms'
let InsertLogGroup = Hub.getEndpoint('log.insert_group_log');
let GetGroupById = Hub.getEndpoint('group.get_by_Id');
let GetLastCharge = Hub.getEndpoint('log.get_last_charge');
let InsertLogCharge = Hub.getEndpoint('log.insert_group_charge');
let InsertLogUnit = Hub.getEndpoint('log.insert_unit');
let GetAlarmConfig = Hub.getEndpoint('config.get_alarm');
let InsertLogAlarm = Hub.getEndpoint('log.insert_alarm');
let UpdateLogCharge = Hub.getEndpoint('log.update_log_charge');

module.exports = () => {
    
    let mqttClient = mqtt.connect(config.mqtt.host, { username: config.mqtt.username, password: config.mqtt.password });

    mqttClient.on('error', (err) => {
      console.log(err);
      mqttClient.end();
    });

    mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    mqttClient.subscribe(subscribe, {qos: 0});


    mqttClient.on('message', async function (topic, message) {
        let now = Moment().toDate();
        let objData = '';
        try {
            objData = JSON.parse(message.toString());
            let alarmConfig = await GetAlarmConfig({ id: 1 });
            if(objData && (objData.return == 200 || objData.return == 201 )){
                let current_ampe = objData.I;
                let group_unit = await GetGroupById({ id : 1 });
                if(group_unit){
                    // thêm log tổ
                    await InsertLogGroup({
                        status : objData.return,
                        group_id : group_unit.id,
                        group_name : group_unit.name,
                        ampe : objData.I,
                        vol : objData.U
                    });
                    let lastCharge = await GetLastCharge();
                    if(lastCharge && lastCharge.status === 'done'){
                        if(current_ampe > 0){ // đang xả => bắt đầu ghi trạng thái xả
                            let id_charge = await InsertLogCharge({ group_id : group_unit.id, group_name : group_unit.name });
                        }
                        if(objData.device && Array.isArray(objData.device)){
                            objData.device.forEach(async unit_data => {
                                await InsertLogUnit({ 
                                    group_id : group_unit.id,
                                    group_name : group_unit.name,
                                    unit_id: unit_data.idx,
                                    unit_name: unit_data.idx,
                                    momh: unit_data.U,
                                    vol: unit_data.R,
                                    temp : unit_data.T
                                });
                                await InsertLogAlarm({ 
                                    unit_id: unit_data.idx,
                                    unit_name: unit_data.idx,
                                    res: unit_data.U,
                                    vol: unit_data.R,
                                    temp : unit_data.T,
                                    volmin : alarmConfig.volmin,
                                    volmax : alarmConfig.volmax,
                                    tempmin : alarmConfig.tempmin,
                                    tempmax : alarmConfig.tempmax,
                                    resmin : alarmConfig.resmin,
                                    resmax : alarmConfig.resmax
                                });
                            });
                        }
                        else{
                            console.log(message.toString());
                            console.log("not device");
                        }
                    }
                    else if(lastCharge && lastCharge.status === 'discharge'){
                        if(current_ampe <= 0){
                            await UpdateLogCharge({
                                id : lastCharge.id,
                                create_datetime : lastCharge.create_datetime,
                                status: 'done'
                            })
                        }
                        if(objData.device && Array.isArray(objData.device)){
                            objData.device.forEach(async unit_data => {
                                await InsertLogUnit({ 
                                    group_id : group_unit.id,
                                    group_name : group_unit.name,
                                    unit_id: unit_data.idx,
                                    unit_name: unit_data.idx,
                                    momh: unit_data.U,
                                    vol: unit_data.R,
                                    temp : unit_data.T
                                });
                                await InsertLogAlarm({ 
                                    unit_id: unit_data.idx,
                                    unit_name: unit_data.idx,
                                    res: unit_data.U,
                                    vol: unit_data.R,
                                    temp : unit_data.T,
                                    volmin : alarmConfig.volmin,
                                    volmax : alarmConfig.volmax,
                                    tempmin : alarmConfig.tempmin,
                                    tempmax : alarmConfig.tempmax,
                                    resmin : alarmConfig.resmin,
                                    resmax : alarmConfig.resmax
                                });
                            });
                        }
                        else{
                            console.log(message.toString());
                            console.log("not device");
                        }
                    }
                    else{
                        console.log(message.toString());
                        console.log("no discharge");
                    }
                }
                else{
                    console.log(message.toString());
                }
            }
            else{
                console.log(message.toString());
            }
        }
        catch (ex){
            console.log(message.toString());
        }
    });

    mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
};
