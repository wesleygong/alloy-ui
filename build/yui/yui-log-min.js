/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("yui-log",function(a){(function(){var d=a,e="yui:log",b="undefined",c={debug:1,info:1,warn:1,error:1};d.log=function(j,s,g,q){var l,p,n,k,o,i=d,r=i.config,h=(i.fire)?i:YUI.Env.globalEvents;if(r.debug){if(g){p=r.logExclude;n=r.logInclude;if(n&&!(g in n)){l=1;}else{if(p&&(g in p)){l=1;}}}if(!l){if(r.useBrowserConsole){k=(g)?g+": "+j:j;if(i.Lang.isFunction(r.logFn)){r.logFn.call(i,j,s,g);}else{if(typeof console!=b&&console.log){o=(s&&console[s]&&(s in c))?s:"log";console[o](k);}else{if(typeof opera!=b){opera.postError(k);}}}}if(h&&!q){if(h==i&&(!h.getEvent(e))){h.publish(e,{broadcast:2});}h.fire(e,{msg:j,cat:s,src:g});}}}return i;};d.message=function(){return d.log.apply(d,arguments);};})();},"3.2.0",{requires:["yui-base"]});