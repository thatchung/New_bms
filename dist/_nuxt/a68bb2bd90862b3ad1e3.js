(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{589:function(t,e,n){"use strict";n(79),n(121),n(19),n(16),n(32),n(67),n(397),n(53);var r=n(0),o=n.n(r);e.a={filters:{formatTypeMoney:function(t){var e=t+"";return t&&e.length>0?e.replace(/\B(?=(\d{3})+(?!\d))/g,","):0},ageFilter:function(t){var e=Date.now()-t;if(e<0)return 0;var n=new Date(e);return Math.abs(n.getUTCFullYear()-1970)},dateFilter:function(t){return o()(t).format("DD/MM/YYYY")},dateTimeFilter:function(t){return o()(t).format("HH:mm:ss DD/MM/YYYY")},timeFilter:function(t){return o()(t).format("HH:mm")},dateTimeFilterComment:function(t){return o()(t).format("DD/MM/YYYY")+" lúc "+o()(t).format("HH:mm")},simpleStateFilter:function(t){var e="";switch(t){case"active":e="Active";break;case"inactive":e="Inactive"}return e},showStateFilter:function(t){var e="";switch(t){case"show":e="Hiển thị";break;case"hide":e="Ẩn"}return e},editorStateFilter:function(t){var e="";switch(t){case"draft":e="Bản nháp";break;case"submit":e="Mới";break;case"lock":e="Đã khóa";break;case"inactive":e="Đã block"}return e},confirmStateFilter:function(t){var e="";switch(t){case"not_yet":e="Chưa xong";break;case"new":e="Mới";break;case"confirm":e="Đã duyệt";break;case"reject":e="Từ chối";break;case"inactive":e="Đã block"}return e},reportReviewState:function(t){return{new:"Mới",in_progress:"Đã tiếp nhận",reject:"Đã từ chối",done:"Đã xử lý"}[t]},articleConfirmStateFilter:function(t){return{new:"Mới",confirm:"Duyệt",reject:"Từ chối"}[t]},typePostFilter:function(t){return{review:"App",news:"News",article:"Web",video:"Video"}[t]},removeCharTo70:function(t){var e=t;return t.length>70&&(e=t.substring(0,70)+"..."),e}},methods:{replaceImageByDefault:function(t){var img=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t.target.src=""!==img?img:"/images/no-image.png"},getListObjectDistinct:function(t){var e=t.array,n=t.commitArray,r=[];if(e&&e.length&&n&&n.length){var o=function(i){-1==n.findIndex((function(t){return t.uuid==e[i].uuid}))&&r.push(e[i])};for(var i in e)o(i);return r}return e},getListOrderBy:function(t){return t.array.sort((function(a,b){return Number(a.order)-Number(b.order)}))},isExistObject:function(t){var e=t.uuid;return t.array.findIndex((function(t){return t.uuid==e}))>-1},filterFieldNull:function(t){for(var form=t.form,object={},e=0,n=Object.keys(form);e<n.length;e++){var i=n[e],r=form[i];null!=r&&(object[i]=form[i])}return object},warningError:function(t){var e=t.message;this.$Notification({type:"error",title:"Lỗi",dangerouslyUseHTMLString:!0,message:e})},warningSuccess:function(t){var e=t.message;this.$Notification({type:"success",title:"Thành Công",dangerouslyUseHTMLString:!0,message:e})},getlinkimageresize:function(image,t){return image.includes("https://cdn01.diadiemanuong.com/ddau/")&&(image=(image=image.replace("999x",t)).replace("640x",t)),image}}}},594:function(t,e,n){"use strict";n(66),n(16),n(32),n(6);var r=n(1),o=(n(397),n(54),n(25),n(19),n(29)),c=n(33),l=(new Date).getTime(),d=function(t,e,n,i,s,r,a,o,c,l){"boolean"!=typeof a&&(o,o=a,a=!1);var u,d="function"==typeof n?n.options:n;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0),u)if(d.functional){var m=d.render;d.render=function(t,e){return u.call(e),m(t,e)}}else{var f=d.beforeCreate;d.beforeCreate=f?[].concat(f,u):[u]}return n}({render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ckeditor"},[e("textarea",{attrs:{name:this.name,id:this.id,types:this.types,config:this.config,disabled:this.readOnlyMode},domProps:{value:this.value}})])},staticRenderFns:[]},0,{name:"VueCkeditor",props:{name:{type:String,default:function(){return"editor-".concat(++l)}},value:{type:String},id:{type:String,default:function(){return"editor-".concat(l)}},types:{type:String,default:function(){return"classic"}},config:{type:Object,default:function(){}},instanceReadyCallback:{type:Function},readOnlyMode:{type:Boolean,default:function(){return!1}}},data:function(){return{instanceValue:""}},computed:{instance:function(){return CKEDITOR.instances[this.id]}},watch:{value:function(t){try{this.instance&&this.update(t)}catch(t){}},readOnlyMode:function(t){this.instance.setReadOnly(t)}},mounted:function(){this.create()},methods:{create:function(){var t=this;"undefined"==typeof CKEDITOR?console.log("CKEDITOR is missing (http://ckeditor.com/)"):("inline"===this.types?CKEDITOR.inline(this.id,this.config):CKEDITOR.replace(this.id,this.config),this.instance.setData(this.value),this.instance.on("instanceReady",(function(){t.instance.setData(t.value)})),this.instance.on("change",this.onChange),this.instance.on("mode",this.onMode),this.instance.on("blur",(function(e){t.$emit("blur",e)})),this.instance.on("focus",(function(e){t.$emit("focus",e)})),this.instance.on("contentDom",(function(e){t.$emit("contentDom",e)})),CKEDITOR.on("dialogDefinition",(function(e){t.$emit("dialogDefinition",e)})),this.instance.on("fileUploadRequest",(function(e){t.$emit("fileUploadRequest",e)})),this.instance.on("fileUploadResponse",(function(e){setTimeout((function(){t.onChange()}),0),t.$emit("fileUploadResponse",e)})),void 0!==this.instanceReadyCallback&&this.instance.on("instanceReady",this.instanceReadyCallback),this.$once("hook:beforeDestroy",(function(){t.destroy()})))},update:function(t){this.instanceValue!==t&&(this.instance.setData(t,{internal:!1}),this.instanceValue=t)},destroy:function(){try{var t=window.CKEDITOR;t.instances&&t.instances[this.id]&&t.instances[this.id].destroy()}catch(t){}},onMode:function(){var t=this;if("source"===this.instance.mode){var e=this.instance.editable();e.attachListener(e,"input",(function(){t.onChange()}))}},onChange:function(){var t=this.instance.getData();t!==this.value&&(this.$emit("input",t),this.instanceValue=t)}}},0,0,0,void 0,void 0);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var f=function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({props:{readonly:{type:Boolean,default:!1},uuid:{type:String,default:"editer-id"},messageHtml:{type:String,default:null},listImageUuid:{type:Array,default:[]},placeholder:{type:String}}},Object(c.b)({postbyUrl:"common/postbyUrl"}),{components:{"vue-ckeditor":d},computed:{message:{get:function(){return this.messageHtml},set:function(t){this.$emit("update:messageHtml",t)}},readonlymode:{get:function(){return this.readonly}}},data:function(){return{listMedia:[],config:{filebrowserBrowseUrl:"/media",toolbar:[{name:"document",items:["Source","-","Save","Preview","Print"]},{name:"clipboard",items:["Cut","Copy","Paste","PasteText","PasteFromWord","-","Undo","Redo"]},"/",{name:"basicstyles",items:["Find","SelectAll","-","Bold","Italic","Underline","Strike","Subscript","Superscript","-","CopyFormatting","RemoveFormat","TextColor","BGColor"]},{name:"paragraph",items:["NumberedList","BulletedList","-","Outdent","Indent","-","JustifyLeft","JustifyCenter","JustifyRight","JustifyBlock","Language"]},{name:"links",items:["Link","Unlink"]},{name:"insert",items:["Font","FontSize","Image","Flash","Table","HorizontalRule","Smiley","SpecialChar","Iframe","uploadimagefile"]}],height:300},current_img:null}},beforeMount:function(){window.localStorage.hasOwnProperty("list_image")&&window.localStorage.removeItem("list_image")},mounted:function(){!this.placeholder||this.messageHtml&&""!=this.messageHtml&&null!=this.messageHtml||(this.message='<p style="color: #5d5d5d;">'+this.placeholder+"</p>")},beforeUpdate:function(){this.checkData()},methods:{onBlur:function(t){this.checkData()},onFocus:function(t){this.checkData()},onContentDom:function(t){this.checkData()},onDialogDefinition:function(t){},checkData:function(){var t=this;if(window.localStorage.hasOwnProperty("list_image")){var e=JSON.parse(window.localStorage.getItem("list_image")),n=!0,r=!1,o=void 0;try{for(var c,l=function(){var img=c.value;t.listImageUuid.findIndex((function(t){return t==img}))<0&&t.listImageUuid.push(img)},d=e[Symbol.iterator]();!(n=(c=d.next()).done);n=!0)l()}catch(t){r=!0,o=t}finally{try{n||null==d.return||d.return()}finally{if(r)throw o}}}this.message&&this.$emit("update:messageHtml",this.messageHtml),this.$emit("update:listImage",this.listImageUuid),this.$emit("load")},loadImageFile:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,i,o,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=t.target.files,i=0;case 2:if(!(i<r.length)){n.next=20;break}if(!(r[i].size>=3e6)){n.next=8;break}return e.$Notification({type:"warning",title:"Chú ý!",message:"File ảnh tải lên có dung lượng vượt mức 3MB!"}),n.abrupt("return");case 8:return o=e.warterMark?{apply_watermark:!0,watermark_with_name:!0,author_uuid:e.author_uuid}:{},n.next=11,e.$callApi({method:"post",lixi_review:!0,imageFile:r[i],url:"media/image",data:o});case 11:if((c=n.sent).meta.success){n.next=14;break}return n.abrupt("return");case 14:if(0!=c.data.length){n.next=16;break}return n.abrupt("return");case 16:CKEDITOR.instances["editer-id"].insertHtml("<p style='text-align: center;'><img data-uploaded='Uploaded' src='"+c.data[0].media_link+"' style='display: block;  max-width: 96%;margin:0px auto;' /></p>");case 17:i++,n.next=2;break;case 20:case"end":return n.stop()}}),n)})))()}},watch:{deep:!0}}),h=n(3),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("vue-ckeditor",{attrs:{readOnlyMode:t.readonlymode,id:t.uuid,config:t.config},on:{blur:function(e){return t.onBlur(e)},focus:function(e){return t.onFocus(e)},contentDom:function(e){return t.onContentDom(e)},dialogDefinition:function(e){return t.onDialogDefinition(e)}},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}}),t._v(" "),n("input",{staticStyle:{display:"none"},attrs:{id:"edit-bt-image-button",type:"file",accept:"image/*",multiple:""},on:{change:t.loadImageFile}})],1)}),[],!1,null,null,null);e.a=component.exports},608:function(t,e,n){"use strict";n.r(e);n(66),n(25),n(19),n(16),n(32),n(6);var r=n(1),o=n(29),c=n(30),l=n(589),d=n(33),m=n(594);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v,y={layout:"app",mixins:[l.a],components:{"ckeditor-html":m.a},computed:h({},Object(d.c)({profile:"common/getProfile"})),filters:{stateFilter:function(t){var e={active:"Active",inactive:"Inactive"};return t in e?e[t]:t},channelFilter:function(t){var e={google:"Google",facebook:"Facebook"};return t in e?e[t]:t}},data:function(){return{loading:!1,params:{name:{value:null},channel:{value:null},status:{value:null},page:{value:1},page_size:{value:10}},list_mission:{meta:{},items:[]},isLoading:!1,isShowAdd:!1,timemission:[],form:{user_id:null,name:null,channel:"facebook",cover_link:"",description:"",status:"active"},editMode:"add"}},mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r in n={},t.params)n[r]=t.params[r].value=void 0!==t.$route.query[r]?t.$route.query[r]:t.params[r].value?void 0!==t.params[r].value.uuid?t.params[r].value.uuid:t.params[r].value:null;if(0!=t.list_mission.items.length){e.next=7;break}return e.next=5,t.loadData(n);case 5:e.next=8;break;case 7:t.$setParamsUrl(n);case 8:case"end":return e.stop()}}),e)})))()},methods:h({},Object(d.b)({getListMission:"mission/getListMission",addMission:"mission/addMission"}),{submitForm:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.loading=!0;var data={};for(var e in this.params)data[e]=this.params[e].value?void 0!==this.params[e].value.uuid?this.params[e].value.uuid:this.params[e].value:null;t&&(this.params.page.value=data.page=t),this.loadData(data)},loadData:(v=Object(r.a)(regeneratorRuntime.mark((function t(data){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.$setParamsUrl(data),t.next=3,this.getListMission(data);case 3:this.list_mission=t.sent,this.loading=!1;case 5:case"end":return t.stop()}}),t,this)}))),function(t){return v.apply(this,arguments)}),addNewMission:function(){this.isShowAdd=!0,this.editMode="add",this.form={user_id:null,name:null,channel:"facebook",cover_link:"",description:"",status:"active"}},createMission:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((n=t.form).user_id=t.profile.id,t.timemission&&2==t.timemission.length){e.next=5;break}return t.$Notification({type:"warning",title:"Thất bại",message:"Chưa chọn thời gian chiến dịch."}),e.abrupt("return");case 5:if(r=new Date(t.timemission[0]),o=new Date(t.timemission[1]),n.start_time=r.getTime(),n.end_time=o.getTime(),0!=n.s_time&&0!=n.e_time){e.next=12;break}return t.$Notification({type:"warning",title:"Thất bại",message:"Chưa chọn thời gian chiến dịch."}),e.abrupt("return");case 12:return e.next=14,c.a.showConfirm(t);case 14:t.addMission({params:n,callback:{success:function(e){t.$Notification({type:"success",title:"Thành công",message:"Tạo chiến dịch thành công"}),t.isShowAdd=!1,t.submitForm(t.params.page.value)},error:function(e){t.$Notification({type:"error",title:"Thất bại",message:"Có lỗi xảy ra"})}}});case 15:case"end":return e.stop()}}),e)})))()}})},_=n(3),component=Object(_.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("data-list",{attrs:{"has-btn":!1},scopedSlots:t._u([{key:"filter",fn:function(){return[n("div",{staticClass:"btn btn-primary waves-effect waves-light m-b-20",on:{click:function(e){return t.addNewMission()}}},[n("i",{staticClass:"mdi mdi-account-multiple-plus m-r-5"}),t._v(" "),n("span",[t._v("Thêm chiến dịch")])]),t._v(" "),n("filter-panel",{attrs:{target:"panel-mission",value:t.params},on:{submit:function(e){return t.submitForm(1)}}},[n("div",{staticClass:"row"},[n("filter-item",{attrs:{field:"name",title:"Tên chiến dịch","item-class":"col-sm-12 col-md-6"},scopedSlots:t._u([{key:"default",fn:function(e){var data=e.data;return n("el-input",{attrs:{clearable:""},model:{value:data.value,callback:function(e){t.$set(data,"value",e)},expression:"data.value"}})}}])}),t._v(" "),n("filter-item",{attrs:{field:"channel",title:"Kênh chiến dịch","item-class":"col-sm-12 col-md-6"},scopedSlots:t._u([{key:"default",fn:function(e){var data=e.data;return n("el-select",{attrs:{clearable:""},model:{value:data.value,callback:function(e){t.$set(data,"value",e)},expression:"data.value"}},t._l(["google","facebook"],(function(e){return n("el-option",{key:e,attrs:{value:e,label:t._f("channelFilter")(e)}})})),1)}}])}),t._v(" "),n("filter-item",{attrs:{field:"status",title:"Trạng thái","item-class":"col-sm-12 col-md-6"},scopedSlots:t._u([{key:"default",fn:function(e){var data=e.data;return n("el-select",{attrs:{clearable:""},model:{value:data.value,callback:function(e){t.$set(data,"value",e)},expression:"data.value"}},t._l(["active","inactive"],(function(e){return n("el-option",{key:e,attrs:{value:e,label:t._f("stateFilter")(e)}})})),1)}}])})],1)])]},proxy:!0},{key:"table",fn:function(){return[n("table-view",{on:{load:t.submitForm},model:{value:t.list_mission,callback:function(e){t.list_mission=e},expression:"list_mission"}},[n("thead",[n("tr",[n("th",{attrs:{"data-priority":"1"}}),t._v(" "),n("th",{attrs:{"data-priority":"1"}},[t._v("Chiến dịch")]),t._v(" "),n("th",{attrs:{"data-priority":"1"}},[t._v("Kênh triển khai")]),t._v(" "),n("th",{attrs:{"data-priority":"1"}},[t._v("Thời gian chạy")]),t._v(" "),n("th",{attrs:{"data-priority":"1"}},[t._v("Người tạo")]),t._v(" "),n("th",{attrs:{"data-priority":"1"}},[t._v("Hành động")])])]),t._v(" "),n("loading-item",{attrs:{loading:t.loading}}),t._v(" "),n("tbody",t._l(t.list_mission.items,(function(e,r){return n("tr",{key:r},[n("td",{attrs:{width:"150px"}},[n("div",{staticClass:"center-image"},[n("Thumbnail",{staticClass:"table-img-avatar",attrs:{src:e.cover_link,ratio:"1-1"}})],1)]),t._v(" "),n("td",[n("NuxtLink",{attrs:{to:"/mission/"+e.id}},[t._v(t._s(e.name))])],1),t._v(" "),n("td",[t._v("\n                \t"+t._s(t._f("channelFilter")(e.channel))+"\n              \t")]),t._v(" "),n("td",[t._v("\n                \t"+t._s(e.start_time+"-"+e.end_time)+"\n              \t")]),t._v(" "),n("td",[t._v("\n                \t"+t._s(e.user_name)+"\n              \t")]),t._v(" "),n("td",[n("NuxtLink",{attrs:{to:"/mission/"+e.id}},[n("div",{staticClass:"btn btn-primary waves-effect waves-light m-b-20"},[t._v(" Cập nhật\n                  ")])])],1)])})),0)],1)]},proxy:!0},{key:"popup",fn:function(){return[n("model",{attrs:{modelwidth:"70%","is-open":t.isShowAdd,title:"add"==t.editMode?"Thêm Mới Chiến Dịch":"Cập nhật Công Nợ"},on:{"update:isOpen":function(e){t.isShowAdd=e},"update:is-open":function(e){t.isShowAdd=e}},scopedSlots:t._u([{key:"body",fn:function(){return[n("div",{staticClass:"row m-t-10"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"col-md-3"},[n("label",{attrs:{for:""}},[t._v("Tên chiến dịch: ")]),t._v(" "),n("span",{staticClass:"text-danger"},[t._v("*")])]),t._v(" "),n("div",{staticClass:"col-md-9"},[n("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1)])]),t._v(" "),n("div",{staticClass:"row m-t-10"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"col-md-3"},[n("label",{attrs:{for:""}},[t._v("Kênh triển khai:")])]),t._v(" "),n("div",{staticClass:"col-md-9"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.form.channel,expression:"form.channel"}],staticClass:"form-control",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.form,"channel",e.target.multiple?n:n[0])}}},t._l(["facebook","google"],(function(e){return n("option",{key:e,attrs:{label:t._f("channelFilter")(e)},domProps:{value:e}})})),0)])])]),t._v(" "),n("div",{staticClass:"row m-t-10"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"col-md-3"},[n("label",{attrs:{for:""}},[t._v("Thời gian : ")]),t._v(" "),n("span",{staticClass:"text-danger"},[t._v("*")])]),t._v(" "),n("div",{staticClass:"col-md-9"},[n("el-date-picker",{attrs:{type:"datetimerange","range-separator":"To","start-placeholder":"Ngày bắt đầu","end-placeholder":"Ngày kết thúc"},model:{value:t.timemission,callback:function(e){t.timemission=e},expression:"timemission"}})],1)])]),t._v(" "),n("div",{staticClass:"row m-t-10"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"col-md-3"},[n("label",{attrs:{for:""}},[t._v("Trạng thái:")])]),t._v(" "),n("div",{staticClass:"col-md-9"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.form.status,expression:"form.status"}],staticClass:"form-control",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.form,"status",e.target.multiple?n:n[0])}}},t._l(["active","inactive"],(function(e){return n("option",{key:e,attrs:{label:t._f("stateFilter")(e)},domProps:{value:e}})})),0)])])]),t._v(" "),n("div",{staticClass:"row m-t-10"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"col-md-3"},[n("label",{attrs:{for:""}},[t._v("Cover:")])]),t._v(" "),n("div",{staticClass:"col-md-3"},[n("image-link",{attrs:{link:t.form.cover_link,imageradius:5,"image-width":200,"image-height":100},on:{"update:link":function(e){return t.$set(t.form,"cover_link",e)}}})],1)])]),t._v(" "),n("div",{staticClass:"row m-t-10"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"col-md-3"},[n("label",{attrs:{for:""}},[t._v("Mô tả: ")])]),t._v(" "),n("div",{staticClass:"col-md-9"},[n("ckeditor-html",{attrs:{"message-html":t.form.description,readonly:!1,"list-image-uuid":[],uuid:"content_review"},on:{"update:messageHtml":function(e){return t.$set(t.form,"description",e)},"update:message-html":function(e){return t.$set(t.form,"description",e)}}})],1)])])]},proxy:!0},{key:"footer",fn:function(){return[n("div",{staticClass:"row m-t-10"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"col-xs-12"},["add"==t.editMode?n("button",{staticClass:"pull-right btn btn-danger",attrs:{type:"button",disabled:t.isLoading},on:{click:function(e){return t.createMission()}}},[n("i",{staticClass:"mdi mdi-content-save"}),t._v("\n                    Lưu\n                    "),t.isLoading?n("i",{staticClass:"fa fa-spinner fa-spin"}):t._e()]):t._e()])])])]},proxy:!0}])})]},proxy:!0}])})],1)}),[],!1,null,null,null);e.default=component.exports}}]);