(this["webpackJsonpviewer-builder-client"]=this["webpackJsonpviewer-builder-client"]||[]).push([[22],{1069:function(t,e,n){},1283:function(t,e,n){"use strict";n.r(e);var r=n(3),a=n(11),i=n(14),o=n(5),l=n(6),c=n(7),h=n(8),s=n(0),u=n.n(s),d=n(1208),b=(n(1069),n(33)),p=n(1),f={bestuurder:{color:"green"},aandeelhouder:{color:"#007bff"},aansprakelijkheid:{color:"#e67900"}},g={icon2:"bestuurder",icon:"aandeelhouder",icon3:"aansprakelijkheid"},v=function(t){Object(c.a)(n,t);var e=Object(h.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).svgEl=u.a.createRef(),r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.drawTree(this.props)}},{key:"componentDidUpdate",value:function(){this.drawTree(this.props)}},{key:"addDepth",value:function(t,e,n){var r=this;return t.depth=e,n["depth"+e]?n["depth"+e]=n["depth"+e]+1:n["depth"+e]=1,t.children&&t.children.forEach((function(t){return r.addDepth(t,e+1,n)})),{data:t,amountPerDepth:n}}},{key:"defineHeight",value:function(t){return 20*Object.keys(t).reduce((function(e,n){var r=t[n];return r>e?r:e}),0)}},{key:"drawTree",value:function(t){if(t.data){var e=t.treeType||"horizontal",n=t.pubsub[this.props.subscribeVariableForTreeItemSelection],o=t.pubsub[this.props.subscribeVariableForTreeConnectionHighlight],l=t.pubsub[this.props.subscribeVariableForFilter],c=Object(b.d)(t.data),h=t.data.head.vars,s=h[0],u=h[1],p=h[2],v=!1;v||function(){v=!0;for(var t=function(t){var e=c.findIndex((function(e){return e[u]===c[t][p]}));if(-1===e)return"continue";if(t<e){var n=c[t];c[t]=c[e],c[e]=n,v=!1}},e=0;e<c.length;e++)t(e)}();for(var k="horizontal"===e?34:20,y=function(){var t=c[w];t[s].length>k&&(t[s]=t[s].slice(0,k)+"..."),t[u]===n&&(t.containsSelection=!0),t.relations=Object.keys(g).reduce((function(e,n){return Object(r.a)(Object(r.a)({},e),{},Object(a.a)({},g[n],!!t[n]))}),{}),o&&(t.relations[o]?t.highlight=f[o].color:t.highlight="all"===o?"black":"#c3c3c3"),t.datumOprichting>l&&(t.highlight="lightgrey");var e=c.find((function(e){return e[u]===t[p]}));e&&(e.children=e.children||[],e.children.push(t),c.splice(w,1))},w=c.length-1;w>=0;w--)y();var m,x=c[0];if(t.rootLabel)m={},Object(a.a)(m,s,t.rootLabel),Object(a.a)(m,p,"http://www.kvk.nl/handelsregister/gegevenswoordenboek/hr/concernrelaties/heineken/v1#Rechtspersoon1"),Object(a.a)(m,u,"http://www.kvk.nl/handelsregister/gegevenswoordenboek/hr/concernrelaties/heineken/v1#Rechtspersoon9"),Object(a.a)(m,"children",[].concat(Object(i.a)(c),Object(i.a)(c))),x=m;var j=this.addDepth(x,0,{}),O=j.amountPerDepth;x=j.data;var P=this.defineHeight(O),T=d.e(this.svgEl.current);T.style("width","100%").style("height","auto").style("padding","10px").style("box-sizing","border-box").style("font","10px sans-serif"),T.selectAll("*").remove();var z,I=("horizontal"===e?d.f().size([P,600]):d.a().size([2*Math.PI,275]))(d.b(x)),D=T.append("g"),V=d.c().x((function(t){return t.y})).y((function(t){return t.x})),F=d.d().angle((function(t){return t.x})).radius((function(t){return t.y}));z="horizontal"===e?V:F;var S;D.append("g").attr("fill","none").attr("stroke","#555").attr("stroke-opacity",.4).attr("stroke-width",.5).selectAll("path").data(I.links()).enter().append("path").attr("opacity",(function(t){return"black"===t.target.data.highlight?t.target.data.containsSelection?1:.3:1})).attr("stroke",(function(t){return t.target.data.highlight})).attr("stroke-width",(function(t){return t.target.data.containsSelection&&"black"!==t.target.data.highlight?t.target.data.highlight?2:1:t.target.data.highlight?1:.5})).attr("d",z);S="horizontal"===e?function(t){return"translate(".concat(t.y,",").concat(t.x,")")}:function(t){return"\n              rotate(".concat(180*t.x/Math.PI-90,")\n              translate(").concat(t.y,",0)\n              ")};var M=D.append("g").attr("stroke-linejoin","round").attr("stroke-width",3).selectAll("g").data(I.descendants()).enter().append("g").attr("fill",(function(t){return t.data.highlight||"black"})).attr("font-weight",(function(t){return t.data.containsSelection?"bold":"normal"})).attr("cursor","pointer").attr("transform",S).on("click",(function(e){t.publishVariable&&t.publish(t.publishVariable,e.data[u])})).on("mouseover",(function(t){d.e(this).selectAll("text").attr("font-weight","bold")})).on("mouseout",(function(t){d.e(this).selectAll("text").attr("font-weight",(function(t){return t.data.containsSelection?"bold":"normal"}))}));"horizontal"===e?M.append("text").attr("dy","0.31em").text((function(t){return t.data[s]})).filter((function(t){return t.children})).clone(!0).lower().attr("stroke","white"):M.append("text").attr("dy","0.31em").attr("x",(function(t){return t.children?t.x<Math.PI?-28:28:t.x<Math.PI?6:-6})).attr("text-anchor",(function(t){return t.x<Math.PI?"start":"end"})).attr("transform",(function(t){return t.x>=Math.PI?"rotate(180)":null})).text((function(t){return t.data[s]})).filter((function(t){return t.children})).clone(!0).lower().attr("stroke","white");try{var A=D.node().getBBox();T.attr("width",A.width).attr("height",A.height).attr("viewBox","".concat(A.x," ").concat(A.y," ").concat(A.width," ").concat(A.height))}catch(H){console.log(H)}}}},{key:"render",value:function(){return Object(p.jsx)("div",{style:{padding:"12px"},children:Object(p.jsx)("svg",{ref:this.svgEl})})}}],[{key:"getDescription",value:function(){return{name:"TreeD3",component:n,label:"TreeD3 widget",variables:[{name:"query",type:"yasgui",label:"to fill tree"},{name:"publishVariableOnTreeItemClick",type:"text",label:"Publish/subscribe variabele in which tree item URI is published, when tree item is clicked."},{name:"subscribeVariableForTreeItemSelection",type:"text",label:"Publish/subscribe variabele on which to listen to define tree item selection."},{name:"subscribeVariableForTreeConnectionHighlight",type:"text",label:"Publish/subscribe variabele on which to listen to define which tree connections to highlight"},{name:"subscribeVariableForFilter",type:"text",label:"Publish/subscribe variabele on which to listen to define which tree items should be filtered out"},{name:"rootLabel",type:"text",label:"Label of the root of the tree. Leave empty for no root."},{name:"treeType",type:"select",label:"Soort boom",options:[{label:"Horizontaal",value:"horizontal"},{label:"Radiaal",value:"radial"}]}]}}}]),n}(s.Component);e.default=v}}]);
//# sourceMappingURL=22.9ede71e5.chunk.js.map