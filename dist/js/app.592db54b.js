(function(e){function t(t){for(var n,i,o=t[0],c=t[1],l=t[2],d=0,f=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(f.length)f.shift()();return s.push.apply(s,l||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,o=1;o<r.length;o++){var c=r[o];0!==a[c]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},s=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"0584":function(e,t,r){},2567:function(e,t,r){"use strict";var n=r("b989"),a=r.n(n);a.a},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("transition",{attrs:{name:e.transition}},["loading"===e.view?r("Loading",{on:{load:e.onLoad}}):e._e(),"main"===e.view?r("Main",{attrs:{headerTransparent:e.headerTransparent}}):e._e()],1)],1)},s=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"loading"},[r("div",{staticClass:"loading__wave",style:e.waveStyle},[r("svg",{staticClass:"waves",attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 24 150 28",preserveAspectRatio:"none","shape-rendering":"auto"}},[r("defs",[r("path",{attrs:{id:"wave",d:"M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"}})]),r("g",{staticClass:"parallax"},[r("use",{attrs:{"xlink:href":"#wave",x:"48",y:"0",fill:e.currentWaveColor+", .7)"}}),r("use",{attrs:{"xlink:href":"#wave",x:"48",y:"3",fill:e.currentWaveColor+", .5)"}}),r("use",{attrs:{"xlink:href":"#wave",x:"48",y:"5",fill:e.currentWaveColor+", .3)"}}),r("use",{attrs:{"xlink:href":"#wave",x:"48",y:"7",fill:e.currentWaveColor+", 1)"}})])])]),e.error?r("div",{staticClass:"loading__text",style:e.textStyle},[e._v(" Error ")]):e._e(),r("transition",{attrs:{name:"fade",mode:"out-in"}},[e.error||e.loaded?e._e():r("div",{staticClass:"loading__text",style:e.textStyle},[e._v(" "+e._s(e.progress)+"% ")])])],1)},o=[],c=(r("99af"),r("d81d"),r("d3b7"),r("e25e"),r("3ca3"),r("159b"),r("ddb0"),r("96cf"),r("1da1")),l=r("2909"),u=r("bc3a"),d=r.n(u),f=r("e0eb"),m=["/images/me.jpg"],g={name:"Loading",data:function(){return{loaded:!1,imageCount:m.length,imageLoaded:0,progress:0,progressInterval:null,error:!1}},computed:{textStyle:function(){return this.currentPercent<45&&!this.error?{color:"#408cea"}:{color:"#ffffff"}},waveStyle:function(){if(this.error)return{"background-color":"tomato","-webkit-transform":"translateY(0%)",transform:"translateY(0%)"};var e="translateY(".concat(100-this.currentPercent,"%)");return{"-webkit-transform":e,transform:e}},currentWaveColor:function(){return this.error?"rgba(255, 99, 71":"rgba(64, 140, 234"},currentPercent:function(){return parseInt(this.imageLoaded/this.imageCount*100)||0}},watch:{currentPercent:function(){this.updateProgress()}},created:function(){var e=this,t=d.a.get("/data/activity.json"),r=d.a.get("/data/project.json");d.a.all([t,r]).then(d.a.spread((function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];var a=r[0].data||[],s=r[1].data||[],i=a.map((function(t,r){var n=Promise.resolve();return t.image&&(++e.imageCount,n=e.imagePreloader("/images/"+t.image)),n})),o=s.map((function(t,r){var n=Promise.resolve(),a=[];return t.image&&(++e.imageCount,n=e.imagePreloader("/images/"+t.image)),(t.detail||[]).forEach((function(t){t.image&&(++e.imageCount,a.push(e.imagePreloader("/images/"+t.image)))})),Promise.all([n].concat(a))})),u=m.map((function(t){return e.imagePreloader(t)}));Promise.all([].concat(Object(l["a"])(i),Object(l["a"])(o),Object(l["a"])(u))).then(Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(f["delay"])(500);case 2:return e.loaded=!0,t.next=5,Object(f["delay"])(100);case 5:e.$emit("load",{activity:a,project:s});case 6:case"end":return t.stop()}}),t)}))))}))).catch((function(t){console.error(t),e.error=!0}))},methods:{updateProgress:function(){var e=this;clearInterval(this.progressInterval),this.progressInterval=setInterval((function(){if(e.progress!==e.currentPercent){var t=(e.currentPercent-e.progress)/10,r=t>=0?Math.ceil(t):Math.floot(t);e.progress+=r}}),20)},imagePreloader:function(e){var t=this;return new Promise((function(r,n){var a=function(){++t.imageLoaded,r()},s=new Image;s.src=e,s.onload=function(){a()},s.onerror=function(e){console.error(e),a()}}))}}},v=g,p=(r("eb82"),r("2877")),h=Object(p["a"])(v,i,o,!1,null,"220c7c99",null),_=h.exports,b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main"},[r("Header"),r("div",{staticClass:"main__message"},[r("div",{staticClass:"main__message__wrap"},[r("h1",[e._v(e._s(e.message))]),r("span",{staticClass:"cursor",class:{idle:!e.messageWriting}}),r("br"),r("p",[e._v("Code is my life.")])])]),e._m(0)],1)},w=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main__content__delay"},[r("div",{staticClass:"profile"},[r("div",{staticClass:"profile__image"},[r("img",{attrs:{alt:"ghlee",src:"/images/me.jpg"}})]),r("div",{staticClass:"profile__name"},[e._v("이근혁")]),r("div",{staticClass:"profile__name--en"},[e._v("Geunhyeok LEE")])])])}],y=(r("fb6a"),r("ac1f"),r("1276"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"header"},[r("div",{staticClass:"header__wrap"},[r("div",{staticClass:"header__wrap__item",on:{click:function(t){return e.scrollTo("about")}}},[e._v("About")]),r("div",{staticClass:"header__wrap__item",on:{click:function(t){return e.scrollTo("project")}}},[e._v("Project")]),r("div",{staticClass:"header__wrap__item",on:{click:function(t){return e.scrollTo("activity")}}},[e._v("Activity")])])])}),x=[],j=r("49c3"),C=r.n(j),P={name:"headerMenu",data:function(){return{scrolling:!1}},methods:{scrollTo:function(e){var t=this;this.scrolling||(this.scrolling=!0,C()(document.getElementById(e)).finally((function(){t.scrolling=!1})))}}},O=P,k=(r("d3b7e"),Object(p["a"])(O,y,x,!1,null,"0ef9c256",null)),M=k.exports,I=["Hello, World!","Developer","Programmer"],T={name:"home",components:{Header:M},data:function(){return{message:"",messageIndex:0,messageWriting:!0}},mounted:function(){setTimeout(this.updateMessage,500),window.addEventListener("scroll",this.onScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.onScroll)},methods:{updateMessage:function(){var e=this;this.messageWriting=!0;var t=I[this.messageIndex].split("").concat([""]);t.reduce((function(r,n,a){return r.then(Object(c["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t.length-1!==a){r.next=8;break}return r.next=3,Object(f["delay"])(300);case 3:return e.messageWriting=!1,r.next=6,Object(f["delay"])(1900);case 6:return e.removeMessage(),r.abrupt("return");case 8:return r.next=10,Object(f["delay"])(160);case 10:e.message+=n;case 11:case"end":return r.stop()}}),r)}))))}),Promise.resolve())},removeMessage:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.messageWriting=!0,!this.message.length){e.next=8;break}return e.next=4,Object(f["delay"])(80);case 4:this.message=this.message.slice(0,this.message.length-1),this.removeMessage(),e.next=12;break;case 8:return this.messageIndex+1===I.length?this.messageIndex=0:this.messageIndex=this.messageIndex+1,e.next=11,Object(f["delay"])(400);case 11:this.updateMessage();case 12:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}},W=T,E=(r("2567"),Object(p["a"])(W,b,w,!1,null,"65b525e2",null)),S=E.exports,L={name:"app",components:{Loading:_,Main:S},data:function(){return{view:"loading",transition:"loading",headerTransparent:!0}},created:function(){var e="0.1.0.20010939012";console.log("Build version:",e)},methods:{onLoad:function(){var e=this;this.view="main",setTimeout((function(){e.transition="fade"}),500)}}},$=L,R=(r("5c0b"),Object(p["a"])($,a,s,!1,null,null,null)),A=R.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(A)}}).$mount("#app"),"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then((function(e){n["a"].prototype.$sw=e})).catch(console.error)},"5c0b":function(e,t,r){"use strict";var n=r("9c0c"),a=r.n(n);a.a},"9ae6":function(e,t,r){},"9c0c":function(e,t,r){},b989:function(e,t,r){},d3b7e:function(e,t,r){"use strict";var n=r("0584"),a=r.n(n);a.a},e0eb:function(e,t,r){r("d3b7");var n=function(e){return new Promise((function(t){setTimeout(t,e)}))};e.exports={delay:n}},eb82:function(e,t,r){"use strict";var n=r("9ae6"),a=r.n(n);a.a}});