(this["webpackJsonpviewer-builder-client"]=this["webpackJsonpviewer-builder-client"]||[]).push([[29],{1282:function(e,t,n){"use strict";n.r(t);var r=n(22),a=n(12),c=n(21),u=n(18),l=n(1),s=n(826),o=n(35),i=n(0),f={margin:"0px",padding:"0px",width:"100%",height:"100%"};function d(){return window.luckysheet?Promise.resolve(window.luckysheet):new Promise((function(e,t){var n=["https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css","https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css","https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css","https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css","https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js","https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js","https://cdn.jsdelivr.net/npm/luckyexcel/dist/luckyexcel.umd.js"],r=0;function a(){++r===n.length&&e(window.luckysheet)}n.forEach((function(e){if(e.endsWith(".css")){var n=document.createElement("link");n.rel="stylesheet",n.href=e,n.onload=a,n.onerror=t,document.head.appendChild(n)}else if(e.endsWith(".js")){var r=document.createElement("script");r.src=e,r.onload=a,r.onerror=t,document.head.appendChild(r)}}))}))}function h(e,t){var n=[],r=t.row?t.row-1:null,a=t.col?p(t.col):null;if(t.range)for(var c=function(e){var t=e.split(":"),n=Object(u.a)(t,2),r=n[0],a=n[1];"undefined"===typeof a&&(a=r);return{startRow:parseInt(r.replace(/[^\d]/g,""))-1,startCol:p(r.replace(/\d/g,"")),endRow:parseInt(a.replace(/[^\d]/g,""))-1,endCol:p(a.replace(/\d/g,""))}}(t.range),l=c.startRow,s=c.endRow,o=c.startCol,i=c.endCol,f=l;f<=s;f++)for(var d=o;d<=i;d++)n.push([f,d]);else if(null!=r&&null==a)for(var h=e.data[r],v=0;v<h.length;v++){if(!h[v])break;n.push([r,v])}else if(null!=a&&null==r)for(var g=0;g<e.data.length;g++){e.data[g][a]&&n.push([g,a])}else if(null!=a&&null!=r){var b=e.data[r];if(b)b[a]&&n.push([r,a])}return n}function p(e){for(var t=0,n=e.length,r=0;r<n;r++){t=26*t+(e.charCodeAt(r)-65)+1}return t-1}function v(e){var t="";for(e++;e>0;){var n=(e-1)%26;t=String.fromCharCode(65+n)+t,e=Math.floor((e-n)/26)}return t}t.default=function(e){var t=e.data,n=t?t.results.bindings.map((function(e){return{sheetIndex:e.sheetIndex?parseInt(e.sheetIndex.value):null,sheetName:e.sheetName?e.sheetName.value:null,row:e.row?parseInt(e.row.value):null,col:e.col?e.col.value:null,range:e.range?e.range.value:null,value:e.value?e.value.value:null,color:e.color.value}})):[],p=Object(l.useState)(!1),g=Object(u.a)(p,2),b=g[0],m=g[1],w="luckysheet-".concat(e.widgetId).replace(" ","_"),j=Object(s.a)(),x=e.pubsub[e.excelUrlTopic],y=function(){var e=Object(c.a)(Object(a.a)().mark((function e(t){var n;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)({url:t,method:"GET",responseType:"blob",withCredentials:!0});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(c.a)(Object(a.a)().mark((function e(t){var n,r,c;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d();case 2:n=window.luckysheet,r=window.LuckyExcel,m(!1),c=y(t),r.transformExcelToLucky(c,(function(e){n.create({container:w,data:e.sheets,showinfobar:!1,title:t,userInfo:e.info.creator,hook:{rangeSelect:O,workbookCreateAfter:function(){m(!0)}}})}),(function(e){alert("Import failed. Is your file a valid xlsx?")})),j();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(t){var n=window.luckysheet,r=function(e){var t=e.indexOf(":");return-1!==t?e.substring(0,t):e}(n.getRangeAxis()[0]),a=n.getRangeValuesWithFlatte()[0]?n.getRangeValuesWithFlatte()[0].v:"null";e.publish(e.selectedCellLocation,r),e.publish(e.selectedCellValue,a),e.publish(e.currentActiveSheetName,t.name)};Object(l.useEffect)((function(){e.excelUrlTopic?k(x):e.excelUrl&&k(e.excelUrl)}),[x,e.excelUrl]),Object(l.useEffect)((function(){b&&E()}),[t,b]);var C=Object(l.useRef)(null),I=function(e){var t,n=window.luckysheet,a=[],c=Object(r.a)(e);try{var u=function(){var e,r=t.value;if(C.current&&(C.current.forEach((function(e){return e()})),C.current=[]),null!=r.sheetIndex){if((e=r.sheetIndex)<0||e>=n.getAllSheets().length)return console.error("Sheet index is out of range: ".concat(r.sheetIndex)),"continue"}else{if(!r.sheetName)return"continue";if(e=n.getAllSheets().findIndex((function(e){return e.name===r.sheetName})),e<0)return console.error("Could not find sheet ".concat(r.sheetName)),"continue"}var c=n.getAllSheets()[e];n.setSheetActive(e);for(var u=[],l=h(c,r),s=function(){var e=i[o],t=c.data[e[0]][e[1]]?c.data[e[0]][e[1]].v:null;if(r.value&&t&&r.value===t){var a=c.data[e[0]][e[1]]?c.data[e[0]][e[1]].bg:"#ffffff";n.setCellFormat(e[0],e[1],"bg",r.color),u.push((function(){return n.setCellFormat(e[0],e[1],"bg",a)}))}},o=0,i=l;o<i.length;o++)s();a.push((function(){n.setSheetActive(e),u.forEach((function(e){return e()}))}))};for(c.s();!(t=c.n()).done;)u()}catch(l){c.e(l)}finally{c.f()}n.refresh(),C.current=a},S=function(e){var t,n=window.luckysheet,a=n.getAllSheets(),c=a.reduce((function(e,t,n){return e[t.name]=n,e}),{}),l=[],s=Object(r.a)(e);try{var o=function(){var e,r=t.value;if(C.current&&(C.current.forEach((function(e){return e()})),C.current=[]),null!=r.sheetIndex){if((e=r.sheetIndex)<0||e>=n.getAllSheets().length)return console.error("Sheet index is out of range: ".concat(r.sheetIndex)),"continue"}else{if(!r.sheetName)return"continue";if((e=c[r.sheetName])<0)return console.error("Could not find sheet ".concat(r.sheetName)),"continue"}var s=a[e];n.setSheetActive(e);var o=[],i=h(s,r).filter((function(e){var t=Object(u.a)(e,2),n=t[0],a=t[1],c=s.data[n][a]?s.data[n][a].v:null;return r.value&&c&&r.value===c}));if(i.length>0){var f=function(e){return e.map((function(e){var t=Object(u.a)(e,2),n=t[0],r=t[1];return"".concat(v(r)).concat(n+1)})).join(",")}(i),d=i.map((function(e){var t=Object(u.a)(e,2),n=t[0],r=t[1];return s.data[n][r]?s.data[n][r].bg:"#ffffff"}));n.setRangeFormat("bg",r.color,{range:f}),o.push((function(){d.forEach((function(e,t){n.setCellFormat(i[t][0],i[t][1],"bg",e)}))}))}l.push((function(){n.setSheetActive(e),o.forEach((function(e){return e()}))}))};for(s.s();!(t=s.n()).done;)o()}catch(i){s.e(i)}finally{s.f()}n.refresh(),C.current=l},E=function(){var t=Object(c.a)(Object(a.a)().mark((function t(){return Object(a.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:null==e.data||null==e.data.results||null==e.data.results.bindings||0===e.data.results.bindings.length?console.log("Empty sparql highlight data ",e.query):e.fastHighlighting?S(n):I(n);case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(i.jsxs)("div",{style:{width:"100%",height:"100%",display:"flex",flexDirection:"column"},children:[Object(i.jsx)("div",{id:w,style:f}),!1]})}},826:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(18),a=n(1);function c(){var e=Object(a.useReducer)((function(){return{}}),{});return Object(r.a)(e,2)[1]}}}]);
//# sourceMappingURL=29.30643931.chunk.js.map