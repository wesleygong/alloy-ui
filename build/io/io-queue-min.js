/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0
build: nightly
*/
YUI.add("io-queue",function(b){var a=new b.Queue(),g,l=1;function f(){var m=a.next();g=m.id;l=0;b.io(m.uri,m.cfg,m.id);}function d(m){a.promote(m);}function i(m,p){var n={uri:m,id:b.io._id(),cfg:p};a.add(n);if(l===1){f();}return n;}function c(m){l=1;if(g===m&&a.size()>0){f();}}function k(m){a.remove(m);}function e(){l=1;if(a.size()>0){f();}}function h(){l=0;}function j(){return a.size();}i.size=j;i.start=e;i.stop=h;i.promote=d;i.remove=k;b.on("io:complete",function(m){c(m);},b.io);b.mix(b.io,{queue:i},true);},"3.3.0",{requires:["io-base","queue-promote"]});