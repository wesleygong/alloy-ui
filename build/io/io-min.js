/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("io-base",function(D){var d="io:start",P="io:complete",B="io:success",F="io:failure",e="io:end",X=0,O={"X-Requested-With":"XMLHttpRequest"},Z={},K=D.config.win;function L(){return K.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");}function E(){var Y=X;X++;return Y;}function W(g,Y){var f={};f.id=D.Lang.isNumber(Y)?Y:E();g=g||{};if(!g.use&&!g.upload){f.c=L();}else{if(g.use){if(g.use==="native"){if(K.XDomainRequest){f.c=new XDomainRequest();f.t=g.use;}else{f.c=L();}}else{f.c=D.io._transport[g.use];f.t=g.use;}}else{f.c={};}}return f;}function I(Y){if(K&&K.XMLHttpRequest){if(Y.c){Y.c.onreadystatechange=null;}}Y.c=null;Y=null;}function Q(h,i){var g=new D.EventTarget().publish("transaction:"+h),Y=i.arguments,f=i.context||D;if(Y){g.on(i.on[h],f,Y);}else{g.on(i.on[h],f);}return g;}function U(g,f){var Y=f.arguments;if(Y){D.fire(d,g,Y);}else{D.fire(d,g);}if(f.on&&f.on.start){Q("start",f).fire(g);}}function G(g,h){var f=g.e?{status:0,statusText:g.e}:g.c,Y=h.arguments;if(Y){D.fire(P,g.id,f,Y);}else{D.fire(P,g.id,f);}if(h.on&&h.on.complete){Q("complete",h).fire(g.id,f);}}function J(f,g){var Y=g.arguments;if(Y){D.fire(e,f.id,Y);}else{D.fire(e,f.id);}if(g.on&&g.on.end){Q("end",g).fire(f.id);}I(f);}function T(f,g){var Y=g.arguments;if(Y){D.fire(B,f.id,f.c,Y);}else{D.fire(B,f.id,f.c);}if(g.on&&g.on.success){Q("success",g).fire(f.id,f.c);}J(f,g);}function H(g,h){var f=g.e?{status:0,statusText:g.e}:g.c,Y=h.arguments;if(Y){D.fire(F,g.id,f,Y);}else{D.fire(F,g.id,f);}if(h.on&&h.on.failure){Q("failure",h).fire(g.id,f);}J(g,h);}function A(g,Y,h,f){I(g);h.xdr.use="flash";h.data=h.form&&f?f:null;return D.io(Y,h,g.id);}function R(Y,f){Y+=((Y.indexOf("?")==-1)?"?":"&")+f;return Y;}function V(Y,f){if(f){O[Y]=f;}else{delete O[Y];}}function C(g,Y){var f;Y=Y||{};for(f in O){if(O.hasOwnProperty(f)){if(Y[f]){continue;}else{Y[f]=O[f];}}}for(f in Y){if(Y.hasOwnProperty(f)){g.setRequestHeader(f,Y[f]);}}}function N(f,Y){if(f&&f.c){f.e=Y;f.c.abort();}}function S(f,Y){Z[f.id]=K.setTimeout(function(){N(f,"timeout");},Y);}function M(Y){K.clearTimeout(Z[Y]);delete Z[Y];}function b(g,h){var Y;try{if(g.c.status&&g.c.status!==0){Y=g.c.status;}else{Y=0;}}catch(f){Y=0;}if(Y>=200&&Y<300||Y===1223){T(g,h);}else{H(g,h);}}function c(Y,f){if(Y.c.readyState===4){if(f.timeout){M(Y.id);}K.setTimeout(function(){G(Y,f);b(Y,f);},0);}}function a(h,w,p){var q,g,t,k,Y,AA,n,y,l,z=h;w=D.Object(w);g=W(w.xdr||w.form,p);k=w.method?w.method=w.method.toUpperCase():w.method="GET";AA=w.sync;n=w.data;if(D.Lang.isObject(w.data)&&D.QueryString){w.data=D.QueryString.stringify(w.data);}if(w.form){if(w.form.upload){return D.io.upload(g,h,w);}else{q=D.io._serialize(w.form,w.data);if(k==="POST"||k==="PUT"){w.data=q;}else{if(k==="GET"){h=R(h,q);}}}}if(w.data&&k==="GET"){h=R(h,w.data);}if(w.data&&k==="POST"){w.headers=D.merge({"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},w.headers);}if(g.t){return D.io.xdr(h,g,w);}if(!AA){g.c.onreadystatechange=function(){c(g,w);};}try{g.c.open(k,h,AA?false:true);if(w.xdr&&w.xdr.credentials){g.c.withCredentials=true;}}catch(x){if(w.xdr){return A(g,z,w,n);}}C(g.c,w.headers);U(g.id,w);try{g.c.send(w.data||"");if(AA){t=g.c;y=["status","statusText","responseText","responseXML"];Y=w.arguments?{id:g.id,arguments:w.arguments}:{id:g.id};for(l=0;l<4;l++){Y[y[l]]=g.c[y[l]];}Y.getAllResponseHeaders=function(){return t.getAllResponseHeaders();};Y.getResponseHeader=function(f){return t.getResponseHeader(f);};G(g,w);b(g,w);return Y;}}catch(v){if(w.xdr){return A(g,z,w,n);}}if(w.timeout){S(g,w.timeout);}return{id:g.id,abort:function(){return g.c?N(g,"abort"):false;},isInProgress:function(){return g.c?g.c.readyState!==4&&g.c.readyState!==0:false;}};}a.start=U;a.complete=G;a.success=T;a.failure=H;a.end=J;a._id=E;a._timeout=Z;a.header=V;D.io=a;D.io.http=a;},"3.2.0",{optional:["querystring-stringify-simple"],requires:["event-custom-base"]});YUI.add("io-form",function(B){var A=encodeURIComponent;B.mix(B.io,{_serialize:function(M,R){var I=[],N=M.useDisabled||false,Q=0,C=(typeof M.id==="string")?M.id:M.id.getAttribute("id"),K,J,E,P,L,H,O,F,G,D;if(!C){C=B.guid("io:");M.id.setAttribute("id",C);}J=B.config.doc.getElementById(C);for(H=0,O=J.elements.length;H<O;++H){K=J.elements[H];L=K.disabled;E=K.name;if(N?E:E&&!L){E=A(E)+"=";P=A(K.value);switch(K.type){case"select-one":if(K.selectedIndex>-1){D=K.options[K.selectedIndex];I[Q++]=E+A(D.attributes.value&&D.attributes.value.specified?D.value:D.text);}break;case"select-multiple":if(K.selectedIndex>-1){for(F=K.selectedIndex,G=K.options.length;F<G;++F){D=K.options[F];if(D.selected){I[Q++]=E+A(D.attributes.value&&D.attributes.value.specified?D.value:D.text);}}}break;case"radio":case"checkbox":if(K.checked){I[Q++]=E+P;}break;case"file":case undefined:case"reset":case"button":break;case"submit":default:I[Q++]=E+P;}}}return R?I.join("&")+"&"+R:I.join("&");}},true);},"3.2.0",{requires:["io-base","node-base"]});YUI.add("io-xdr",function(C){var K=C.publish("io:xdrReady",{fireOnce:true}),F={},G={},B=L&&L.XDomainRequest,J=C.config.doc,L=C.config.win;function H(M,P){var N='<object id="yuiIoSwf" type="application/x-shockwave-flash" data="'+M+'" width="0" height="0">'+'<param name="movie" value="'+M+'">'+'<param name="FlashVars" value="yid='+P+'">'+'<param name="allowScriptAccess" value="always">'+"</object>",O=J.createElement("div");J.body.appendChild(O);O.innerHTML=N;}function A(M,N){M.c.onprogress=function(){G[M.id]=3;};M.c.onload=function(){G[M.id]=4;C.io.xdrResponse(M,N,"success");};M.c.onerror=function(){G[M.id]=4;C.io.xdrResponse(M,N,"failure");};if(N.timeout){M.c.ontimeout=function(){G[M.id]=4;C.io.xdrResponse(M,N,"timeout");};M.c.timeout=N.timeout;}}function D(Q,P,N){var O,M;if(!Q.e){O=P?decodeURI(Q.c.responseText):Q.c.responseText;M=N==="xml"?C.DataType.XML.parse(O):null;return{id:Q.id,c:{responseText:O,responseXML:M}};}else{return{id:Q.id,status:Q.e};}}function I(M,N){return M.c.abort(M.id,N);}function E(M){return B?G[M.id]!==4:M.c.isInProgress(M.id);}C.mix(C.io,{_transport:{},xdr:function(M,N,O){if(O.on&&O.xdr.use==="flash"){F[N.id]={on:O.on,context:O.context,arguments:O.arguments};
O.context=null;O.form=null;N.c.send(M,O,N.id);}else{if(B){A(N,O);N.c.open(O.method||"GET",M);N.c.send(O.data);}else{N.c.send(M,N,O);}}return{id:N.id,abort:function(){return N.c?I(N,O):false;},isInProgress:function(){return N.c?E(N.id):false;}};},xdrResponse:function(R,S,Q){var N,M=B?G:F,P=S.xdr.use==="flash"?true:false,O=S.xdr.dataType;S.on=S.on||{};if(P){N=F[R.id]?F[R.id]:null;if(N){S.on=N.on;S.context=N.context;S.arguments=N.arguments;}}switch(Q.toLowerCase()){case"start":C.io.start(R.id,S);break;case"complete":C.io.complete(R,S);break;case"success":C.io.success(O||P?D(R,P,O):R,S);delete M[R.id];break;case"timeout":case"abort":case"failure":if(Q===("abort"||"timeout")){R.e=Q;}C.io.failure(O||P?D(R,P,O):R,S);delete M[R.id];break;}},xdrReady:function(M){C.fire(K,M);},transport:function(M){var N=M.yid?M.yid:C.id;M.id=M.id||"flash";if(M.id==="native"||M.id==="flash"){H(M.src,N);this._transport.flash=J.getElementById("yuiIoSwf");}else{this._transport[M.id]=M.src;}}});},"3.2.0",{requires:["io-base","datatype-xml"]});YUI.add("io-upload-iframe",function(C){var L=C.config.win,G=C.config.doc,I=(G.documentMode&&G.documentMode===8);function E(S,R){var T=[],O=R.split("="),Q,P;for(Q=0,P=O.length-1;Q<P;Q++){T[Q]=G.createElement("input");T[Q].type="hidden";T[Q].name=O[Q].substring(O[Q].lastIndexOf("&")+1);T[Q].value=(Q+1===P)?O[Q+1]:O[Q+1].substring(0,(O[Q+1].lastIndexOf("&")));S.appendChild(T[Q]);}return T;}function H(Q,R){var P,O;for(P=0,O=R.length;P<O;P++){Q.removeChild(R[P]);}}function F(P,Q,O){P.setAttribute("action",O);P.setAttribute("method","POST");P.setAttribute("target","ioupload"+Q);P.setAttribute(C.UA.ie&&!I?"encoding":"enctype","multipart/form-data");}function N(P,O){var Q;for(Q in O){if(O.hasOwnProperty(O,Q)){if(O[Q]){P.setAttribute(Q,P[Q]);}else{P.removeAttribute(Q);}}}}function D(O,P){C.io._timeout[O.id]=L.setTimeout(function(){var Q={id:O.id,status:"timeout"};C.io.complete(Q,P);C.io.end(Q,P);},P.timeout);}function K(O){L.clearTimeout(C.io._timeout[O]);delete C.io._timeout[O];}function J(O){C.Event.purgeElement("#ioupload"+O,false);C.one("body").removeChild(C.one("#ioupload"+O));}function A(R,S){var Q=C.one("#ioupload"+R.id).get("contentWindow.document"),O=Q.one("body"),P;if(S.timeout){K(R.id);}if(O){P=O.query("pre:first-child");R.c.responseText=P?P.get("text"):O.get("text");}else{R.c.responseXML=Q._node;}C.io.complete(R,S);C.io.end(R,S);L.setTimeout(function(){J(R.id);},0);}function M(P,Q){var O=C.Node.create('<iframe id="ioupload'+P.id+'" name="ioupload'+P.id+'" />');O._node.style.position="absolute";O._node.style.top="-1000px";O._node.style.left="-1000px";C.one("body").appendChild(O);C.on("load",function(){A(P,Q);},"#ioupload"+P.id);}function B(S,Q,T){var R=(typeof T.form.id==="string")?G.getElementById(T.form.id):T.form.id,P,O={action:R.getAttribute("action"),target:R.getAttribute("target")};F(R,S.id,Q);if(T.data){P=E(R,T.data);}if(T.timeout){D(S,T);}R.submit();C.io.start(S.id,T);if(T.data){H(R,P);}N(R,O);return{id:S.id,abort:function(){var U={id:S.id,status:"abort"};if(C.one("#ioupload"+S.id)){J(S.id);C.io.complete(U,T);C.io.end(U,T);}else{return false;}},isInProgress:function(){return C.one("#ioupload"+S.id)?true:false;}};}C.mix(C.io,{upload:function(P,O,Q){M(P,Q);return B(P,O,Q);}});},"3.2.0",{requires:["io-base","node-base"]});YUI.add("io-queue",function(B){var A=new B.Queue(),G,L=1;function F(){var M=A.next();G=M.id;L=0;B.io(M.uri,M.cfg,M.id);}function D(M){A.promote(M);}function I(M,O){var N={uri:M,id:B.io._id(),cfg:O};A.add(N);if(L===1){F();}return N;}function C(M){L=1;if(G===M&&A.size()>0){F();}}function K(M){A.remove(M);}function E(){L=1;if(A.size()>0){F();}}function H(){L=0;}function J(){return A.size();}I.size=J;I.start=E;I.stop=H;I.promote=D;I.remove=K;B.on("io:complete",function(M){C(M);},B.io);B.mix(B.io,{queue:I},true);},"3.2.0",{requires:["io-base","queue-promote"]});YUI.add("io",function(A){},"3.2.0",{use:["io-base","io-form","io-xdr","io-upload-iframe","io-queue"]});