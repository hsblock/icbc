(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e4770db"],{"14c3":function(t,e,n){var a=n("c6b6"),r=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var o=n.call(t,e);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==a(t))throw TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"159b":function(t,e,n){var a=n("da84"),r=n("fdbc"),o=n("17c2"),s=n("9112");for(var c in r){var i=a[c],l=i&&i.prototype;if(l&&l.forEach!==o)try{s(l,"forEach",o)}catch(u){l.forEach=o}}},"17c2":function(t,e,n){"use strict";var a=n("b727").forEach,r=n("a640"),o=n("ae40"),s=r("forEach"),c=o("forEach");t.exports=s&&c?[].forEach:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}},3898:function(t,e,n){},4160:function(t,e,n){"use strict";var a=n("23e7"),r=n("17c2");a({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},"466d":function(t,e,n){"use strict";var a=n("d784"),r=n("825a"),o=n("50c4"),s=n("1d80"),c=n("8aa5"),i=n("14c3");a("match",1,(function(t,e,n){return[function(e){var n=s(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,n):new RegExp(e)[t](String(n))},function(t){var a=n(e,t,this);if(a.done)return a.value;var s=r(t),l=String(this);if(!s.global)return i(s,l);var u=s.unicode;s.lastIndex=0;var f,d=[],p=0;while(null!==(f=i(s,l))){var h=String(f[0]);d[p]=h,""===h&&(s.lastIndex=c(l,o(s.lastIndex),u)),p++}return 0===p?null:d}]}))},5212:function(t,e,n){"use strict";n("c01d")},"56a0":function(t,e,n){},"861e":function(t,e,n){},8789:function(t,e,n){},"8aa5":function(t,e,n){"use strict";var a=n("6547").charAt;t.exports=function(t,e,n){return e+(n?a(t,e).length:1)}},"8fcd":function(t,e,n){"use strict";n("56a0")},"90b8":function(t,e,n){},9263:function(t,e,n){"use strict";var a=n("ad6d"),r=n("9f7f"),o=RegExp.prototype.exec,s=String.prototype.replace,c=o,i=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),l=r.UNSUPPORTED_Y||r.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],f=i||u||l;f&&(c=function(t){var e,n,r,c,f=this,d=l&&f.sticky,p=a.call(f),h=f.source,v=0,g=t;return d&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),g=String(t).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==t[f.lastIndex-1])&&(h="(?: "+h+")",g=" "+g,v++),n=new RegExp("^(?:"+h+")",p)),u&&(n=new RegExp("^"+h+"$(?!\\s)",p)),i&&(e=f.lastIndex),r=o.call(d?n:f,g),d?r?(r.input=r.input.slice(v),r[0]=r[0].slice(v),r.index=f.lastIndex,f.lastIndex+=r[0].length):f.lastIndex=0:i&&r&&(f.lastIndex=f.global?r.index+r[0].length:e),u&&r&&r.length>1&&s.call(r[0],n,(function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(r[c]=void 0)})),r}),t.exports=c},9538:function(t,e,n){"use strict";n("90b8")},9807:function(t,e,n){},"98fb":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-container"},[n("div",{staticClass:"left"},[n("Video"),n("AreaData")],1),n("div",{staticClass:"right"},[n("People"),n("PassFlowStat"),n("PassFlowStru"),n("FaceDetection")],1)])},r=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"face-detection-container"},[n("h2",[t._v("访客人脸识别")]),n("transition-group",{attrs:{name:"faces",tag:"p"}},t._l(t.infos,(function(e,a){return n("div",{key:a,staticClass:"face-detection-item"},[n("img",{staticClass:"face",attrs:{src:e.img,alt:""}}),n("div",[t._v(" "+t._s(e.gender)+" "+t._s(e.age)+" ")])])})),0)],1)},s=[],c=(n("4160"),n("a434"),n("159b"),n("a1bc")),i={name:"FaceDetection",data:function(){return{infos:[],ws:null}},mounted:function(){this.openWebSocket()},methods:{openWebSocket:function(){var t=this;this.ws=new WebSocket(c["b"]+"faceAttr"),this.ws.onopen=function(){return console.log("face detection open")},this.ws.onmessage=function(e){var n=JSON.parse(e.data)["infos"];console.log(n),t.infos.splice(0,t.infos.length),n.forEach((function(e){t.infos.splice(t.infos.length,0,{img:"data:image/png;base64,"+e["img"],gender:e["gender"],age:e["age"]})}))},this.ws.onerror=function(t){return console.log(t)},this.ws.onclose=function(){return console.log("face detection close")}}}},l=i,u=(n("5212"),n("2877")),f=Object(u["a"])(l,o,s,!1,null,"b9d77e26",null),d=f.exports,p=n("d1a6"),h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"area-datas-container"},[n("h2",[t._v("区域统计数据")]),n("div",{staticClass:"area-datas-wrapper"},[n("div",{staticClass:"area-datas-items"},[n("h4",[t._v("自助区域")]),n("span",[t._v("当前排队人数: "+t._s(t.self.num))]),n("span",[t._v("最长停留时间: "+t._s(t.self.maxSTime)+"分钟")]),n("span",[t._v("最长接触时间: "+t._s(t.self.maxATime)+"分钟")])]),n("div",{staticClass:"area-datas-items"},[n("h4",[t._v("安防区域")]),n("span",[t._v("可疑危险物品: "+t._s(t.safe.danger))]),n("span",[t._v("检测遗留物品: "+t._s(t.safe.lost))])]),n("div",{staticClass:"area-datas-items"},[n("h4",[t._v("迎宾区域")]),n("span",[t._v("值班员工: "+t._s(t.greet.staff))]),n("span",[t._v("最近离岗时长: "+t._s(t.greet.leaveTime)+"分钟")])])])])},v=[],g={name:"AreaData",data:function(){return{safe:{danger:["手枪"],lost:["手机"]},self:{num:10,maxSTime:10,maxATime:10},greet:{staff:"张三",leaveTime:0}}}},b=g,m=(n("c80c"),Object(u["a"])(b,h,v,!1,null,"7223eeb6",null)),w=m.exports,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"people-container"},[n("div",[t._v(" 当前驻留人次: "+t._s(t.currentStay)+" 今日客流总量: "+t._s(t.todayFlow)+" 客流上限: "+t._s(t.flowLimit)+" ")])])},_=[],C={name:"People",data:function(){return{currentStay:100,todayFlow:200,flowLimit:80}}},E=C,y=(n("efc8"),Object(u["a"])(E,x,_,!1,null,"0382101d",null)),S=y.exports,D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pass-flow-stat-container"},[n("h2",{staticClass:"title"},[t._v(" 客流统计信息 ")]),n("div",{staticClass:"pass-flow-stat-wrapper"},[n("TodayFlow"),n("SevenDayFlow")],1)])},F=[],A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("LineChart",{staticClass:"today-flow",attrs:{"chart-data":t.chartData,options:t.options}})},R=[],k=(n("a630"),n("d81d"),n("3ca3"),n("6636")),P={name:"TodayFlow",components:{LineChart:k["a"]},data:function(){return{chartData:{labels:Array.from({length:9}).map((function(t,e){return 9+e})),datasets:[{label:"当天客流",fill:!1,backgroundColor:"#000",borderColor:"#000",data:Array.from({length:6}).map((function(t,e){return Math.round(10*Math.random())}))}]},options:{responsive:!0,maintainAspectRatio:!1}}},mounted:function(){this.openWebSocket()},beforeDestroy:function(){this.ws.close(1e3,"today flow closing")},methods:{openWebSocket:function(){var t=this;this.ws=new WebSocket(c["b"]+"latestday"),this.ws.onopen=function(){return console.log("today flow open")},this.ws.onmessage=function(e){t.chartData.datasets[0].data=JSON.parse(e.data)["population"]},this.ws.onerror=function(t){return console.log(t)},this.ws.onclose=function(){return console.log("today flow close")}}}},O=P,T=Object(u["a"])(O,A,R,!1,null,"38ac9626",null),I=T.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("LineChart",{staticClass:"seven-day-flow",attrs:{"chart-data":t.chartData,options:t.options}})},$=[],L=(n("a15b"),n("ac1f"),n("466d"),{name:"SevenDayFlow",components:{LineChart:k["a"]},data:function(){return{chartData:{labels:Array.from({length:7}).map((function(t,e){var n=new Date,a=n.getFullYear(),r=n.getMonth(),o=n.getDate(),s=new Date(a,r,o-e-1).toLocaleDateString(),c=s.match(/([0-9]+)/g);return c.splice(0,1),c.join("/")})).reverse(),datasets:[{label:"历史七天客流",fill:!1,backgroundColor:"#000",borderColor:"#000",data:Array.from({length:7}).map((function(t,e){return Math.round(100*Math.random())}))}]},options:{responsive:!0,maintainAspectRatio:!1}}}}),M=L,N=Object(u["a"])(M,j,$,!1,null,"80ff7ea2",null),W=N.exports,U={name:"PassFlowStat",components:{SevenDayFlow:W,TodayFlow:I}},B=U,J=(n("9538"),Object(u["a"])(B,D,F,!1,null,"63d593e0",null)),K=J.exports,Y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pass-flow-stru-container"},[n("h2",{staticClass:"title"},[t._v(" 客流人员结构 ")]),n("div",{staticClass:"pass-flow-stru-wrapper"},[n("PassAttr")],1)])},V=[],G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pass-attr"},[t._m(0),n("PieChart",{staticClass:"gender-distribution",attrs:{"chart-data":t.chartData,options:t.options}})],1)},X=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"labels"},[n("table",[n("tr",[n("td",{staticStyle:{background:"#4CACED"}}),n("td",[t._v("男性")])]),n("tr",[n("td",{staticStyle:{background:"#FF6384"}}),n("td",[t._v("女性")])])]),n("table",[n("tr",[n("td",{staticStyle:{background:"#ff9f40"}}),n("td",[t._v("18岁以下")])]),n("tr",[n("td",{staticStyle:{background:"#FFCD56"}}),n("td",[t._v("18-30岁")])]),n("tr",[n("td",{staticStyle:{background:"#4BC0C0"}}),n("td",[t._v("30-60岁")])]),n("tr",[n("td",{staticStyle:{background:"#9966FF"}}),n("td",[t._v("60岁以上")])])])])}],q=n("1fca"),z=n("81b0"),H={extends:q["b"],props:["chartData","options"],mounted:function(){this.renderChart(z.cloneDeep(this.chartData),this.options)},watch:{chartData:{handler:function(){console.log("change"),this.renderChart(z.cloneDeep(this.chartData),this.options)},deep:!0}}},Q={name:"PassAttr",components:{PieChart:H},data:function(){return{chartData:{labels:[],datasets:[{label:"性别分布",backgroundColor:["#4CACED","#FF6384"],borderColor:"#ffffff",data:[10,20]},{label:"年龄分布",backgroundColor:["#ff9f40","#FFCD56","#4BC0C0","#9966FF"],borderColor:"#ffffff",data:[70,20,40,50]}]},options:{responsive:!0,maintainAspectRatio:!1,devicePixelRatio:2,legend:{display:!1},tooltips:{enabled:!1}},ws:null}},created:function(){this.openWebSocket()},methods:{openWebSocket:function(){var t=this;this.ws=new WebSocket(c["a"].ws.ageRate),this.ws.onopen=function(){return console.log("gender percent open")},this.ws.onmessage=function(e){var n=JSON.parse(e.data);t.chartData.datasets[0].data=[+n["男"],+n["女"]]},this.ws.onerror=function(t){return console.log(t)},this.ws.onclose=function(){return console.log("gender percent close")}}}},Z=Q,tt=(n("cc48"),Object(u["a"])(Z,G,X,!1,null,"18a908b8",null)),et=tt.exports,nt={name:"PassFlowStru",components:{PassAttr:et}},at=nt,rt=(n("be50"),Object(u["a"])(at,Y,V,!1,null,"200e110f",null)),ot=rt.exports,st={name:"Main",components:{PassFlowStru:ot,PassFlowStat:K,People:S,AreaData:w,Video:p["a"],FaceDetection:d}},ct=st,it=(n("8fcd"),Object(u["a"])(ct,a,r,!1,null,"1a480b93",null));e["default"]=it.exports},"9f7f":function(t,e,n){"use strict";var a=n("d039");function r(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=a((function(){var t=r("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=a((function(){var t=r("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a15b:function(t,e,n){"use strict";var a=n("23e7"),r=n("44ad"),o=n("fc6a"),s=n("a640"),c=[].join,i=r!=Object,l=s("join",",");a({target:"Array",proto:!0,forced:i||!l},{join:function(t){return c.call(o(this),void 0===t?",":t)}})},a434:function(t,e,n){"use strict";var a=n("23e7"),r=n("23cb"),o=n("a691"),s=n("50c4"),c=n("7b0b"),i=n("65f0"),l=n("8418"),u=n("1dde"),f=n("ae40"),d=u("splice"),p=f("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,v=Math.min,g=9007199254740991,b="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!d||!p},{splice:function(t,e){var n,a,u,f,d,p,m=c(this),w=s(m.length),x=r(t,w),_=arguments.length;if(0===_?n=a=0:1===_?(n=0,a=w-x):(n=_-2,a=v(h(o(e),0),w-x)),w+n-a>g)throw TypeError(b);for(u=i(m,a),f=0;f<a;f++)d=x+f,d in m&&l(u,f,m[d]);if(u.length=a,n<a){for(f=x;f<w-a;f++)d=f+a,p=f+n,d in m?m[p]=m[d]:delete m[p];for(f=w;f>w-a+n;f--)delete m[f-1]}else if(n>a)for(f=w-a;f>x;f--)d=f+a-1,p=f+n-1,d in m?m[p]=m[d]:delete m[p];for(f=0;f<n;f++)m[f+x]=arguments[f+2];return m.length=w-a+n,u}})},a640:function(t,e,n){"use strict";var a=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&a((function(){n.call(null,e||function(){throw 1},1)}))}},ac1f:function(t,e,n){"use strict";var a=n("23e7"),r=n("9263");a({target:"RegExp",proto:!0,forced:/./.exec!==r},{exec:r})},be50:function(t,e,n){"use strict";n("861e")},c01d:function(t,e,n){},c80c:function(t,e,n){"use strict";n("3898")},cc48:function(t,e,n){"use strict";n("9807")},d784:function(t,e,n){"use strict";n("ac1f");var a=n("6eeb"),r=n("d039"),o=n("b622"),s=n("9263"),c=n("9112"),i=o("species"),l=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),f=o("replace"),d=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),p=!r((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var h=o(t),v=!r((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),g=v&&!r((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[i]=function(){return n},n.flags="",n[h]=/./[h]),n.exec=function(){return e=!0,null},n[h](""),!e}));if(!v||!g||"replace"===t&&(!l||!u||d)||"split"===t&&!p){var b=/./[h],m=n(h,""[t],(function(t,e,n,a,r){return e.exec===s?v&&!r?{done:!0,value:b.call(e,n,a)}:{done:!0,value:t.call(n,e,a)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),w=m[0],x=m[1];a(String.prototype,t,w),a(RegExp.prototype,h,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}f&&c(RegExp.prototype[h],"sham",!0)}},efc8:function(t,e,n){"use strict";n("8789")}}]);
//# sourceMappingURL=chunk-0e4770db.945cecef.js.map