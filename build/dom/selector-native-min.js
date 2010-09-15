/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("selector-native",function(A){(function(E){E.namespace("Selector");var C="compareDocumentPosition",D="ownerDocument";var B={_foundCache:[],useNative:true,_compare:("sourceIndex" in E.config.doc.documentElement)?function(I,H){var G=I.sourceIndex,F=H.sourceIndex;if(G===F){return 0;}else{if(G>F){return 1;}}return -1;}:(E.config.doc.documentElement[C]?function(G,F){if(G[C](F)&4){return -1;}else{return 1;}}:function(J,I){var H,F,G;if(J&&I){H=J[D].createRange();H.setStart(J,0);F=I[D].createRange();F.setStart(I,0);G=H.compareBoundaryPoints(1,F);}return G;}),_sort:function(F){if(F){F=E.Array(F,0,true);if(F.sort){F.sort(B._compare);}}return F;},_deDupe:function(F){var G=[],H,I;for(H=0;(I=F[H++]);){if(!I._found){G[G.length]=I;I._found=true;}}for(H=0;(I=G[H++]);){I._found=null;I.removeAttribute("_found");}return G;},query:function(G,N,O,F){N=N||E.config.doc;var K=[],H=(E.Selector.useNative&&E.config.doc.querySelector&&!F),J=[[G,N]],L,P,I,M=(H)?E.Selector._nativeQuery:E.Selector._bruteQuery;if(G&&M){if(!F&&(!H||N.tagName)){J=B._splitQueries(G,N);}for(I=0;(L=J[I++]);){P=M(L[0],L[1],O);if(!O){P=E.Array(P,0,true);}if(P){K=K.concat(P);}}if(J.length>1){K=B._sort(B._deDupe(K));}}return(O)?(K[0]||null):K;},_splitQueries:function(H,K){var G=H.split(","),I=[],L="",J,F;if(K){if(K.tagName){K.id=K.id||E.guid();L='[id="'+K.id+'"] ';}for(J=0,F=G.length;J<F;++J){H=L+G[J];I.push([H,K]);}}return I;},_nativeQuery:function(F,G,H){if(E.UA.webkit&&F.indexOf(":checked")>-1&&(E.Selector.pseudos&&E.Selector.pseudos.checked)){return E.Selector.query(F,G,H,true);}try{return G["querySelector"+(H?"":"All")](F);}catch(I){return E.Selector.query(F,G,H,true);}},filter:function(G,F){var H=[],I,J;if(G&&F){for(I=0;(J=G[I++]);){if(E.Selector.test(J,F)){H[H.length]=J;}}}else{}return H;},test:function(H,I,N){var L=false,G=I.split(","),F=false,O,R,M,Q,K,J,P;if(H&&H.tagName){if(!N&&!E.DOM.inDoc(H)){O=H.parentNode;if(O){N=O;}else{Q=H[D].createDocumentFragment();Q.appendChild(H);N=Q;F=true;}}N=N||H[D];if(!H.id){H.id=E.guid();}for(K=0;(P=G[K++]);){P+='[id="'+H.id+'"]';M=E.Selector.query(P,N);for(J=0;R=M[J++];){if(R===H){L=true;break;}}if(L){break;}}if(F){Q.removeChild(H);}}return L;},ancestor:function(G,F,H){return E.DOM.ancestor(G,function(I){return E.Selector.test(I,F);},H);}};E.mix(E.Selector,B,true);})(A);},"3.2.0",{requires:["dom-base"]});