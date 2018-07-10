webpackJsonp([5],{285:function(n,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var e=t(386),a=t(321),o=(t(393),t(0)),i=Object(o.a)(a.a,e.a,e.b,!1,null,"674ac099",null);r.default=i.exports},321:function(n,r,t){"use strict";var e=t(322);r.a=e.a},322:function(n,r,t){"use strict";var e=t(14),a=t(388);r.a={props:{},data:function(){return{selectedYear:"",selectedMonth:""}},computed:{selectYearBase:function(){return this.$config.selectBeginDate.getFullYear()-1},selectYearCount:function(){return this.$config.selectEndDate.getFullYear()-this.selectYearBase}},methods:{query:function(){this.selectedYear&&this.selectedMonth?(this.$refs.summaryTable.load(),this.setCache()):this.$dialog.alert({type:"error",msg:"请同时选择年月后<br/>再进行“查阅”操作"})},setCache:function(){e.a.localStorage.set("summaryData",{selectedYear:this.selectedYear,selectedMonth:this.selectedMonth})},getCache:function(){var n=e.a.localStorage.get("summaryData");return console.log("cache",n),!!n&&(this.selectedYear=n.selectedYear,this.selectedMonth=n.selectedMonth,!0)},sure:function(){this.confirmDisplay=!1,this.$dialog.alert({msg:"填写正确",type:"success"})}},mounted:function(){var n=this;this.getCache()&&this.$nextTick(function(){n.query()})},components:{SummaryDataTable:a.a}}},323:function(n,r,t){"use strict";var e=t(324);r.a=e.a},324:function(n,r,t){"use strict";r.a={props:{year:Number|String,month:Number|String},data:function(){return{dataList:[],defaultPage:1,pageCount:1}},methods:{loadDataList:function(n){var r=this;this.$loading({title:"正在加载",msg:"正在加载数据，请稍后..."}),this.$services.manage.getProblemDataList({work:"huizongliebiao",page:n,params:{year:this.year,month:this.month<10?"0"+this.month:this.month}}).then(function(n){r.$loading.close(),r.dataList=n.data}).catch(function(n){r.$loading.close(),r.$dialog.alert({type:"error",msg:n.msg})})},load:function(){this.loadDataList(this.defaultPage)}}}},325:function(n,r,t){var e=t(392);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);var a=t(280).default;a("523e10c7",e,!0,{})},326:function(n,r,t){var e=t(394);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);var a=t(280).default;a("4e5a3efb",e,!0,{})},386:function(n,r,t){"use strict";var e=t(387);t.d(r,"a",function(){return e.a}),t.d(r,"b",function(){return e.b})},387:function(n,r,t){"use strict";t.d(r,"a",function(){return e}),t.d(r,"b",function(){return a});var e=function(){var n=this,r=n.$createElement,t=n._self._c||r;return t("div",{staticClass:"summary-data-wrap"},[t("div",{staticClass:"base-main-title"},[n._v("汇总列表>")]),n._v(" "),t("div",{staticClass:"base-main-panel"},[t("div",{staticClass:"control-bar"},[t("div",{staticClass:"time-filter-box flex"},[t("base-select",{staticClass:"year-select",attrs:{placeholder:"请选择年",options:n.selectYearCount,"base-number":n.selectYearBase,selected:n.selectedYear},on:{change:function(r){return n.selectedYear=r}}}),n._v(" "),t("base-select",{staticClass:"month-select",attrs:{placeholder:"请选择月",options:12,selected:n.selectedMonth},on:{change:function(r){return n.selectedMonth=r}}}),n._v(" "),t("span",{staticClass:"tips"},[n._v("提示：请同时选择年和月份后进行筛选")])],1),n._v(" "),t("div",{staticClass:"btn-box flex"},[t("button",{staticClass:"base-btn base-line-btn query-btn",on:{click:n.query}},[n._v("查阅")])])]),n._v(" "),t("summary-data-table",{ref:"summaryTable",attrs:{year:n.selectedYear,month:n.selectedMonth}})],1)])},a=[]},388:function(n,r,t){"use strict";var e=t(389),a=t(323),o=(t(391),t(0)),i=Object(o.a)(a.a,e.a,e.b,!1,null,"1c3c7f28",null);r.a=i.exports},389:function(n,r,t){"use strict";var e=t(390);t.d(r,"a",function(){return e.a}),t.d(r,"b",function(){return e.b})},390:function(n,r,t){"use strict";t.d(r,"a",function(){return e}),t.d(r,"b",function(){return a});var e=function(){var n=this,r=n.$createElement,t=n._self._c||r;return t("div",{staticClass:"table-wrap"},[t("base-table",{staticClass:"summary-data-table",attrs:{list:n.dataList},scopedSlots:n._u([{key:"header",fn:function(r){return[t("th",[n._v("公司")]),n._v(" "),t("th",[n._v("状态")])]}},{key:"default",fn:function(r){return[t("td",[n._v(n._s(r.item.gongsi_sx))]),n._v(" "),t("td",[n._v(n._s(r.item.status))])]}}])}),n._v(" "),t("base-pager",{attrs:{count:n.pageCount,default:n.defaultPage},on:{pagechange:n.loadDataList}})],1)},a=[]},391:function(n,r,t){"use strict";var e=t(325),a=t.n(e);a.a},392:function(n,r,t){r=n.exports=t(279)(!0),r.push([n.i,"","",{version:3,sources:[],names:[],mappings:"",file:"SummaryDataTable.vue?vue&type=style&index=0&id=1c3c7f28&lang=scss&scoped=true",sourceRoot:""}])},393:function(n,r,t){"use strict";var e=t(326),a=t.n(e);a.a},394:function(n,r,t){var e=t(282);r=n.exports=t(279)(!0),r.push([n.i,'.summary-data-wrap .control-bar[data-v-674ac099]{display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;height:72px;padding:0 12px}.summary-data-wrap .control-bar .time-filter-box option[data-v-674ac099],.summary-data-wrap .control-bar .time-filter-box select[data-v-674ac099]{height:22px}.summary-data-wrap .control-bar .time-filter-box .month-select[data-v-674ac099],.summary-data-wrap .control-bar .time-filter-box .year-select[data-v-674ac099]{margin-right:8px;width:90px}.summary-data-wrap .control-bar .time-filter-box .month-select[data-v-674ac099]{margin-right:0}.summary-data-wrap .control-bar .time-filter-box .tips[data-v-674ac099]{margin-left:16px;padding-left:24px;line-height:18px;color:#fa763c;position:relative}.summary-data-wrap .control-bar .time-filter-box .tips[data-v-674ac099]:before{content:"";position:absolute;left:0;top:0;width:18px;height:18px;background:url('+e(t(281))+") 0 -40px no-repeat}.summary-data-wrap .control-bar .btn-box .query-btn[data-v-674ac099]{width:80px;height:25px;font-size:12px;border-radius:25px}.summary-data-wrap .control-bar .btn-box .report-btn[data-v-674ac099]{width:130px;height:25px;font-size:12px;border-radius:25px;margin-left:12px}.summary-data-wrap .build-dialog .form-item[data-v-674ac099]{display:flex;flex-flow:row nowrap;justify-content:center;align-items:center}.summary-data-wrap .build-dialog .form-item .form-label[data-v-674ac099]{width:75px;font-size:12px}.summary-data-wrap .build-dialog .form-item .form-input[data-v-674ac099]{width:146px;height:24px}.summary-data-wrap .build-dialog .form-item[data-v-674ac099]:nth-child(n+2){margin-top:14px}.summary-data-wrap .input-error-tips .tips-label[data-v-674ac099]{padding-left:20px;color:#fe0000}.summary-data-wrap .input-error-tips .tips-content-wrap[data-v-674ac099]{margin-top:15px;font-size:12px;display:flex;flex-flow:row nowrap;justify-content:center;align-items:flex-start;text-align:left}","",{version:3,sources:["D:/Projects/app_kangsidi/src/views/D:/Projects/app_kangsidi/src/views/SummaryData.vue"],names:[],mappings:"AAmPA,iDAxLE,aAAa,AACb,qBAF0B,AAG1B,8BAH8C,AAI9C,mBAJ2D,AA4LzD,YAAY,AACZ,cA3MiB,CAmPlB,AA5CH,kJAQQ,WAAY,CACb,AATP,+JAYQ,iBAAiB,AACjB,UAAW,CACZ,AAdP,gFAgBQ,cAAe,CAChB,AAjBP,wEAmBQ,iBAAiB,AACjB,kBAAkB,AAClB,iBAAiB,AACjB,cA3OoB,AA4OpB,iBAAkB,CAUnB,AAjCP,+EAyBU,WAAW,AACX,kBAAkB,AAClB,OAAO,AACP,MAAM,AACN,WAAW,AACX,YAAY,AACZ,0DAA6D,CAC9D,AAhCT,qEA7JE,WAkM4B,AAjM5B,YAiMkC,AAhMlC,eAH2D,AAI3D,kBA+LkC,CAC7B,AAtCP,sEA7JE,YAqM6B,AApM7B,YAoMmC,AAnMnC,eAH2D,AAI3D,mBAkMmC,AAC7B,gBAhPa,CAiPd,AA1CP,6DAxLE,aAAa,AACb,qBAF0B,AAG1B,uBAqO8B,AApO9B,kBAJ2D,CAoPxD,AA3DL,yEAiDQ,WAAW,AACX,cAjSW,CAkSZ,AAnDP,yEAqDQ,YAAY,AACZ,WAAY,CACb,AAvDP,4EAyDQ,eAAgB,CACjB,AA1DP,kEA+DM,kBAAkB,AAClB,aAnRe,CAoRhB,AAjEL,yEAmEM,gBAAgB,AAChB,eAAe,AA5PnB,aAAa,AACb,qBAF0B,AAG1B,uBA2P8B,AA1P9B,uBA0PgD,AAC5C,eAAgB,CACjB",file:"SummaryData.vue?vue&type=style&index=0&id=674ac099&lang=scss&scoped=true",sourcesContent:["//视图尺寸定义\r\n$width-design-m: 750;\r\n$width-pc-min: 1000;\r\n//字体大小定义\r\n$font-default: 12px;\r\n$font-s: 12px;\r\n$font-h1: 40px;\r\n$font-h2: 30px;\r\n$font-h3: 22px;\r\n$font-h4: 18px;\r\n$font-h5: 16px;\r\n$font-h6: 14px;\r\n//颜色定义，$color-xxx定义前景色\r\n$color-empty: #eff4fb;\r\n$color-border: #dddddd;\r\n$color-input-border: #bfbfbf;\r\n$color-input-border-dark: #aaaaaa;\r\n$color-input-hover: #cfe0ff;\r\n$color-white: #ffffff;\r\n$color-black: #000000;\r\n$color-default: #333333;\r\n$color-active-lighter: #a5cdfb;\r\n$color-active-light: #5386d9;\r\n$color-active: #3072e5;\r\n$color-active-dark: #25539d;\r\n$color-disabled-light: #f6f6f6;\r\n$color-bg-light: #f8f8f8;\r\n$color-bg-light-2: #f5f5f5;\r\n$color-bg-light-3: #f2f2f2;\r\n$color-bg-table-hover: #fff8df;\r\n$color-warning-text: #fa763c;\r\n$color-warning: #ff6633;\r\n$color-error: #fe0000;\r\n$color-error-2: #f30000;\r\n$color-success: green;\r\n$color-tips-bg: #5b5b5b;\r\n$color-table-bg: $color-white;\r\n$color-table-bg-1: #f5f5f5;\r\n$color-table-bg-2: #d7e4ff;\r\n$color-table-bg-3: #9ab7ea;\r\n$color-table-bg-warning: #fff8ac;\r\n//边框、线条定义\r\n$border-default: 1px solid $color-border;\r\n//边距尺寸定义\r\n$margin-default: 12px;\r\n$margin-s: 8px;\r\n@mixin mobile() {\r\n  @media screen and (max-width: 767px) {\r\n    @content;\r\n  }\r\n}\r\n\r\n@mixin mobile-xs() {\r\n  @media screen and (max-width: 359px) {\r\n    @content;\r\n  }\r\n}\r\n\r\n@mixin flex($flow:row nowrap, $jus:space-between, $ali:center) {\r\n  display: flex;\r\n  flex-flow: $flow;\r\n  justify-content: $jus;\r\n  align-items: $ali;\r\n}\r\n\r\n@mixin text-overflow {\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n}\r\n\r\n@mixin clearfix-after {\r\n  &:after {\r\n    display: block;\r\n    content: '';\r\n    clear: both;\r\n  }\r\n}\r\n\r\n@mixin content {\r\n  .content {\r\n    @content;\r\n  }\r\n}\r\n\r\n@mixin btn-size($width: auto, $height: auto, $font-size: 12px) {\r\n  width: $width;\r\n  height: $height;\r\n  font-size: $font-size;\r\n  border-radius: $height;\r\n}\r\n\r\n@mixin btn($width: auto, $height: auto, $font-size: 12px) {\r\n  @include flex($jus: center);\r\n  @include btn-size($width, $height, $font-size);\r\n  line-height: 1;\r\n  background: $color-active;\r\n  color: $color-white;\r\n  border: none;\r\n  font-size: $font-size;\r\n  cursor: pointer;\r\n  &:hover,\r\n  &:active {\r\n    background: $color-active-light;\r\n  }\r\n  &.base-line-btn {\r\n    background: $color-white;\r\n    border: 1px solid $color-active;\r\n    color: $color-active;\r\n    &:hover,\r\n    &:active {\r\n      background: $color-white;\r\n      border-color: $color-active-light;\r\n      color: $color-active-light;\r\n    }\r\n  }\r\n}\r\n\r\n@mixin upload-btn {\r\n  position: relative;\r\n  overflow: hidden;\r\n  input[type=\"file\"] {\r\n    position: absolute;\r\n    left: -100%;\r\n    top: -100%;\r\n    width: 200%;\r\n    height: 200%;\r\n    opacity: 0;\r\n    cursor: pointer;\r\n  }\r\n}\r\n\r\n@mixin auto-scroll {\r\n  overflow: auto;\r\n  &::-webkit-scrollbar {\r\n    position: absolute;\r\n    top: 10px;\r\n    padding-top: 20px;\r\n    width: 6px;\r\n    height: 6px;\r\n  }\r\n  &::-webkit-scrollbar-thumb {\r\n    /*滚动条里面小方块*/\r\n    border-radius: 10px;\r\n    background-color: $color-input-border;\r\n  }\r\n  &::-webkit-scrollbar-track {\r\n    /*滚动条里面轨道*/\r\n    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\r\n    /*border-radius: 10px;*/\r\n    // background: #EDEDED;\r\n  }\r\n}\r\n\r\n@function get-rem-size($px) {\r\n  @return $px/100+'rem';\r\n}\r\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n.summary-data-wrap {\r\n  .control-bar {\r\n    @include flex();\r\n    height: 72px;\r\n    padding: 0 $margin-default;\r\n    .time-filter-box {\r\n      select,\r\n      option {\r\n        height: 22px;\r\n      }\r\n      .year-select,\r\n      .month-select {\r\n        margin-right: 8px;\r\n        width: 90px;\r\n      }\r\n      .month-select {\r\n        margin-right: 0;\r\n      }\r\n      .tips {\r\n        margin-left: 16px;\r\n        padding-left: 24px;\r\n        line-height: 18px;\r\n        color: $color-warning-text;\r\n        position: relative;\r\n        &:before {\r\n          content: \"\";\r\n          position: absolute;\r\n          left: 0;\r\n          top: 0;\r\n          width: 18px;\r\n          height: 18px;\r\n          background: url(../assets/images/icons.png) 0 -40px no-repeat;\r\n        }\r\n      }\r\n    }\r\n    .btn-box {\r\n      .query-btn {\r\n        @include btn-size(80px, 25px);\r\n      }\r\n      .report-btn {\r\n        @include btn-size(130px, 25px);\r\n        margin-left: $margin-default;\r\n      }\r\n    }\r\n  }\r\n  .build-dialog {\r\n    .form-item {\r\n      @include flex($jus: center);\r\n      .form-label {\r\n        width: 75px;\r\n        font-size: $font-default;\r\n      }\r\n      .form-input {\r\n        width: 146px;\r\n        height: 24px;\r\n      }\r\n      &:nth-child(n + 2) {\r\n        margin-top: 14px;\r\n      }\r\n    }\r\n  }\r\n  .input-error-tips {\r\n    .tips-label {\r\n      padding-left: 20px;\r\n      color: $color-error;\r\n    }\r\n    .tips-content-wrap {\r\n      margin-top: 15px;\r\n      font-size: 12px;\r\n      @include flex($jus: center, $ali: flex-start);\r\n      text-align: left;\r\n    }\r\n  }\r\n}\r\n"],sourceRoot:""}])}});
//# sourceMappingURL=SummaryData.bdcc38378777b669622b.js.map