(function(){
  /*
  
   Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */
  'use strict';var aa=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function g(a){var b=aa.has(a);a=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return!b&&a}function l(a){var b=a.isConnected;if(void 0!==b)return b;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?a.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document))}
  function n(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}
  function p(a,b,d){d=void 0===d?new Set:d;for(var c=a;c;){if(c.nodeType===Node.ELEMENT_NODE){var e=c;b(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){c=e.import;if(c instanceof Node&&!d.has(c))for(d.add(c),c=c.firstChild;c;c=c.nextSibling)p(c,b,d);c=n(a,e);continue}else if("template"===f){c=n(a,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)p(e,b,d)}c=c.firstChild?c.firstChild:n(a,c)}}function r(a,b,d){a[b]=d};function u(){this.a=new Map;this.g=new Map;this.c=[];this.f=[];this.b=!1}function ba(a,b,d){a.a.set(b,d);a.g.set(d.constructorFunction,d)}function ca(a,b){a.b=!0;a.c.push(b)}function da(a,b){a.b=!0;a.f.push(b)}function v(a,b){a.b&&p(b,function(b){return w(a,b)})}function w(a,b){if(a.b&&!b.__CE_patched){b.__CE_patched=!0;for(var d=0;d<a.c.length;d++)a.c[d](b);for(d=0;d<a.f.length;d++)a.f[d](b)}}
  function x(a,b){var d=[];p(b,function(b){return d.push(b)});for(b=0;b<d.length;b++){var c=d[b];1===c.__CE_state?a.connectedCallback(c):y(a,c)}}function z(a,b){var d=[];p(b,function(b){return d.push(b)});for(b=0;b<d.length;b++){var c=d[b];1===c.__CE_state&&a.disconnectedCallback(c)}}
  function A(a,b,d){d=void 0===d?{}:d;var c=d.u||new Set,e=d.i||function(b){return y(a,b)},f=[];p(b,function(b){if("link"===b.localName&&"import"===b.getAttribute("rel")){var d=b.import;d instanceof Node&&(d.__CE_isImportDocument=!0,d.__CE_hasRegistry=!0);d&&"complete"===d.readyState?d.__CE_documentLoadHandled=!0:b.addEventListener("load",function(){var d=b.import;if(!d.__CE_documentLoadHandled){d.__CE_documentLoadHandled=!0;var f=new Set(c);f.delete(d);A(a,d,{u:f,i:e})}})}else f.push(b)},c);if(a.b)for(b=
  0;b<f.length;b++)w(a,f[b]);for(b=0;b<f.length;b++)e(f[b])}
  function y(a,b){if(void 0===b.__CE_state){var d=b.ownerDocument;if(d.defaultView||d.__CE_isImportDocument&&d.__CE_hasRegistry)if(d=a.a.get(b.localName)){d.constructionStack.push(b);var c=d.constructorFunction;try{try{if(new c!==b)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{d.constructionStack.pop()}}catch(t){throw b.__CE_state=2,t;}b.__CE_state=1;b.__CE_definition=d;if(d.attributeChangedCallback)for(d=d.observedAttributes,c=0;c<d.length;c++){var e=
  d[c],f=b.getAttribute(e);null!==f&&a.attributeChangedCallback(b,e,null,f,null)}l(b)&&a.connectedCallback(b)}}}u.prototype.connectedCallback=function(a){var b=a.__CE_definition;b.connectedCallback&&b.connectedCallback.call(a)};u.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;b.disconnectedCallback&&b.disconnectedCallback.call(a)};
  u.prototype.attributeChangedCallback=function(a,b,d,c,e){var f=a.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(b)&&f.attributeChangedCallback.call(a,b,d,c,e)};function B(a){var b=document;this.c=a;this.a=b;this.b=void 0;A(this.c,this.a);"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function C(a){a.b&&a.b.disconnect()}B.prototype.f=function(a){var b=this.a.readyState;"interactive"!==b&&"complete"!==b||C(this);for(b=0;b<a.length;b++)for(var d=a[b].addedNodes,c=0;c<d.length;c++)A(this.c,d[c])};function ea(){var a=this;this.b=this.a=void 0;this.c=new Promise(function(b){a.b=b;a.a&&b(a.a)})}function D(a){if(a.a)throw Error("Already resolved.");a.a=void 0;a.b&&a.b(void 0)};function E(a){this.c=!1;this.a=a;this.j=new Map;this.f=function(b){return b()};this.b=!1;this.g=[];this.o=new B(a)}
  E.prototype.l=function(a,b){var d=this;if(!(b instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!g(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(this.a.a.get(a))throw Error("A custom element with name '"+a+"' has already been defined.");if(this.c)throw Error("A custom element is already being defined.");this.c=!0;try{var c=function(b){var a=e[b];if(void 0!==a&&!(a instanceof Function))throw Error("The '"+b+"' callback must be a function.");
  return a},e=b.prototype;if(!(e instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=c("connectedCallback");var t=c("disconnectedCallback");var k=c("adoptedCallback");var h=c("attributeChangedCallback");var m=b.observedAttributes||[]}catch(q){return}finally{this.c=!1}b={localName:a,constructorFunction:b,connectedCallback:f,disconnectedCallback:t,adoptedCallback:k,attributeChangedCallback:h,observedAttributes:m,constructionStack:[]};ba(this.a,
  a,b);this.g.push(b);this.b||(this.b=!0,this.f(function(){return fa(d)}))};E.prototype.i=function(a){A(this.a,a)};
  function fa(a){if(!1!==a.b){a.b=!1;for(var b=a.g,d=[],c=new Map,e=0;e<b.length;e++)c.set(b[e].localName,[]);A(a.a,document,{i:function(b){if(void 0===b.__CE_state){var e=b.localName,f=c.get(e);f?f.push(b):a.a.a.get(e)&&d.push(b)}}});for(e=0;e<d.length;e++)y(a.a,d[e]);for(;0<b.length;){var f=b.shift();e=f.localName;f=c.get(f.localName);for(var t=0;t<f.length;t++)y(a.a,f[t]);(e=a.j.get(e))&&D(e)}}}E.prototype.get=function(a){if(a=this.a.a.get(a))return a.constructorFunction};
  E.prototype.m=function(a){if(!g(a))return Promise.reject(new SyntaxError("'"+a+"' is not a valid custom element name."));var b=this.j.get(a);if(b)return b.c;b=new ea;this.j.set(a,b);this.a.a.get(a)&&!this.g.some(function(b){return b.localName===a})&&D(b);return b.c};E.prototype.s=function(a){C(this.o);var b=this.f;this.f=function(d){return a(function(){return b(d)})}};window.CustomElementRegistry=E;E.prototype.define=E.prototype.l;E.prototype.upgrade=E.prototype.i;E.prototype.get=E.prototype.get;
  E.prototype.whenDefined=E.prototype.m;E.prototype.polyfillWrapFlushCallback=E.prototype.s;var F=window.Document.prototype.createElement,G=window.Document.prototype.createElementNS,ha=window.Document.prototype.importNode,ia=window.Document.prototype.prepend,ja=window.Document.prototype.append,ka=window.DocumentFragment.prototype.prepend,la=window.DocumentFragment.prototype.append,H=window.Node.prototype.cloneNode,I=window.Node.prototype.appendChild,J=window.Node.prototype.insertBefore,K=window.Node.prototype.removeChild,L=window.Node.prototype.replaceChild,M=Object.getOwnPropertyDescriptor(window.Node.prototype,
  "textContent"),N=window.Element.prototype.attachShadow,O=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),P=window.Element.prototype.getAttribute,Q=window.Element.prototype.setAttribute,R=window.Element.prototype.removeAttribute,S=window.Element.prototype.getAttributeNS,T=window.Element.prototype.setAttributeNS,U=window.Element.prototype.removeAttributeNS,ma=window.Element.prototype.insertAdjacentElement,na=window.Element.prototype.insertAdjacentHTML,oa=window.Element.prototype.prepend,
  pa=window.Element.prototype.append,V=window.Element.prototype.before,qa=window.Element.prototype.after,ra=window.Element.prototype.replaceWith,sa=window.Element.prototype.remove,ta=window.HTMLElement,W=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),ua=window.HTMLElement.prototype.insertAdjacentElement,va=window.HTMLElement.prototype.insertAdjacentHTML;var wa=new function(){};function xa(){var a=X;window.HTMLElement=function(){function b(){var b=this.constructor,c=a.g.get(b);if(!c)throw Error("The custom element being constructed was not registered with `customElements`.");var e=c.constructionStack;if(0===e.length)return e=F.call(document,c.localName),Object.setPrototypeOf(e,b.prototype),e.__CE_state=1,e.__CE_definition=c,w(a,e),e;c=e.length-1;var f=e[c];if(f===wa)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
  e[c]=wa;Object.setPrototypeOf(f,b.prototype);w(a,f);return f}b.prototype=ta.prototype;Object.defineProperty(b.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:b});return b}()};function Y(a,b,d){function c(b){return function(d){for(var e=[],c=0;c<arguments.length;++c)e[c]=arguments[c];c=[];for(var f=[],m=0;m<e.length;m++){var q=e[m];q instanceof Element&&l(q)&&f.push(q);if(q instanceof DocumentFragment)for(q=q.firstChild;q;q=q.nextSibling)c.push(q);else c.push(q)}b.apply(this,e);for(e=0;e<f.length;e++)z(a,f[e]);if(l(this))for(e=0;e<c.length;e++)f=c[e],f instanceof Element&&x(a,f)}}void 0!==d.h&&(b.prepend=c(d.h));void 0!==d.append&&(b.append=c(d.append))};function ya(){var a=X;r(Document.prototype,"createElement",function(b){if(this.__CE_hasRegistry){var d=a.a.get(b);if(d)return new d.constructorFunction}b=F.call(this,b);w(a,b);return b});r(Document.prototype,"importNode",function(b,d){b=ha.call(this,b,!!d);this.__CE_hasRegistry?A(a,b):v(a,b);return b});r(Document.prototype,"createElementNS",function(b,d){if(this.__CE_hasRegistry&&(null===b||"http://www.w3.org/1999/xhtml"===b)){var c=a.a.get(d);if(c)return new c.constructorFunction}b=G.call(this,b,
  d);w(a,b);return b});Y(a,Document.prototype,{h:ia,append:ja})};function za(){function a(a,c){Object.defineProperty(a,"textContent",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)c.set.call(this,a);else{var d=void 0;if(this.firstChild){var e=this.childNodes,k=e.length;if(0<k&&l(this)){d=Array(k);for(var h=0;h<k;h++)d[h]=e[h]}}c.set.call(this,a);if(d)for(a=0;a<d.length;a++)z(b,d[a])}}})}var b=X;r(Node.prototype,"insertBefore",function(a,c){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);
  a=J.call(this,a,c);if(l(this))for(c=0;c<e.length;c++)x(b,e[c]);return a}e=l(a);c=J.call(this,a,c);e&&z(b,a);l(this)&&x(b,a);return c});r(Node.prototype,"appendChild",function(a){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=I.call(this,a);if(l(this))for(var e=0;e<c.length;e++)x(b,c[e]);return a}c=l(a);e=I.call(this,a);c&&z(b,a);l(this)&&x(b,a);return e});r(Node.prototype,"cloneNode",function(a){a=H.call(this,!!a);this.ownerDocument.__CE_hasRegistry?A(b,a):v(b,
  a);return a});r(Node.prototype,"removeChild",function(a){var c=l(a),e=K.call(this,a);c&&z(b,a);return e});r(Node.prototype,"replaceChild",function(a,c){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);a=L.call(this,a,c);if(l(this))for(z(b,c),c=0;c<e.length;c++)x(b,e[c]);return a}e=l(a);var f=L.call(this,a,c),d=l(this);d&&z(b,c);e&&z(b,a);d&&x(b,a);return f});M&&M.get?a(Node.prototype,M):ca(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){for(var a=[],
  b=0;b<this.childNodes.length;b++){var f=this.childNodes[b];f.nodeType!==Node.COMMENT_NODE&&a.push(f.textContent)}return a.join("")},set:function(a){for(;this.firstChild;)K.call(this,this.firstChild);null!=a&&""!==a&&I.call(this,document.createTextNode(a))}})})};function Aa(a){function b(b){return function(e){for(var c=[],d=0;d<arguments.length;++d)c[d]=arguments[d];d=[];for(var k=[],h=0;h<c.length;h++){var m=c[h];m instanceof Element&&l(m)&&k.push(m);if(m instanceof DocumentFragment)for(m=m.firstChild;m;m=m.nextSibling)d.push(m);else d.push(m)}b.apply(this,c);for(c=0;c<k.length;c++)z(a,k[c]);if(l(this))for(c=0;c<d.length;c++)k=d[c],k instanceof Element&&x(a,k)}}var d=Element.prototype;void 0!==V&&(d.before=b(V));void 0!==V&&(d.after=b(qa));void 0!==ra&&
  r(d,"replaceWith",function(b){for(var e=[],c=0;c<arguments.length;++c)e[c]=arguments[c];c=[];for(var d=[],k=0;k<e.length;k++){var h=e[k];h instanceof Element&&l(h)&&d.push(h);if(h instanceof DocumentFragment)for(h=h.firstChild;h;h=h.nextSibling)c.push(h);else c.push(h)}k=l(this);ra.apply(this,e);for(e=0;e<d.length;e++)z(a,d[e]);if(k)for(z(a,this),e=0;e<c.length;e++)d=c[e],d instanceof Element&&x(a,d)});void 0!==sa&&r(d,"remove",function(){var b=l(this);sa.call(this);b&&z(a,this)})};function Ba(){function a(a,b){Object.defineProperty(a,"innerHTML",{enumerable:b.enumerable,configurable:!0,get:b.get,set:function(a){var e=this,d=void 0;l(this)&&(d=[],p(this,function(a){a!==e&&d.push(a)}));b.set.call(this,a);if(d)for(var f=0;f<d.length;f++){var t=d[f];1===t.__CE_state&&c.disconnectedCallback(t)}this.ownerDocument.__CE_hasRegistry?A(c,this):v(c,this);return a}})}function b(a,b){r(a,"insertAdjacentElement",function(a,e){var d=l(e);a=b.call(this,a,e);d&&z(c,e);l(a)&&x(c,e);return a})}
  function d(a,b){function e(a,b){for(var e=[];a!==b;a=a.nextSibling)e.push(a);for(b=0;b<e.length;b++)A(c,e[b])}r(a,"insertAdjacentHTML",function(a,c){a=a.toLowerCase();if("beforebegin"===a){var d=this.previousSibling;b.call(this,a,c);e(d||this.parentNode.firstChild,this)}else if("afterbegin"===a)d=this.firstChild,b.call(this,a,c),e(this.firstChild,d);else if("beforeend"===a)d=this.lastChild,b.call(this,a,c),e(d||this.firstChild,null);else if("afterend"===a)d=this.nextSibling,b.call(this,a,c),e(this.nextSibling,
  d);else throw new SyntaxError("The value provided ("+String(a)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");})}var c=X;N&&r(Element.prototype,"attachShadow",function(a){a=N.call(this,a);var b=c;if(b.b&&!a.__CE_patched){a.__CE_patched=!0;for(var e=0;e<b.c.length;e++)b.c[e](a)}return this.__CE_shadowRoot=a});O&&O.get?a(Element.prototype,O):W&&W.get?a(HTMLElement.prototype,W):da(c,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){return H.call(this,!0).innerHTML},
  set:function(a){var b="template"===this.localName,c=b?this.content:this,e=G.call(document,this.namespaceURI,this.localName);for(e.innerHTML=a;0<c.childNodes.length;)K.call(c,c.childNodes[0]);for(a=b?e.content:e;0<a.childNodes.length;)I.call(c,a.childNodes[0])}})});r(Element.prototype,"setAttribute",function(a,b){if(1!==this.__CE_state)return Q.call(this,a,b);var e=P.call(this,a);Q.call(this,a,b);b=P.call(this,a);c.attributeChangedCallback(this,a,e,b,null)});r(Element.prototype,"setAttributeNS",function(a,
  b,d){if(1!==this.__CE_state)return T.call(this,a,b,d);var e=S.call(this,a,b);T.call(this,a,b,d);d=S.call(this,a,b);c.attributeChangedCallback(this,b,e,d,a)});r(Element.prototype,"removeAttribute",function(a){if(1!==this.__CE_state)return R.call(this,a);var b=P.call(this,a);R.call(this,a);null!==b&&c.attributeChangedCallback(this,a,b,null,null)});r(Element.prototype,"removeAttributeNS",function(a,b){if(1!==this.__CE_state)return U.call(this,a,b);var d=S.call(this,a,b);U.call(this,a,b);var e=S.call(this,
  a,b);d!==e&&c.attributeChangedCallback(this,b,d,e,a)});ua?b(HTMLElement.prototype,ua):ma?b(Element.prototype,ma):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");va?d(HTMLElement.prototype,va):na?d(Element.prototype,na):console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Y(c,Element.prototype,{h:oa,append:pa});Aa(c)};var Z=window.customElements;if(!Z||Z.forcePolyfill||"function"!=typeof Z.define||"function"!=typeof Z.get){var X=new u;xa();ya();Y(X,DocumentFragment.prototype,{h:ka,append:la});za();Ba();document.__CE_hasRegistry=!0;var customElements=new E(X);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};
  }).call(self);
  
  //# sourceMappingURL=custom-elements.min.js.map

  /*
 * anime.js v3.0.1
 * (c) 2019 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.anime=e()}(this,function(){"use strict";var n={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},e={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},r=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective"],t={CSS:{},springs:{}};function a(n,e,r){return Math.min(Math.max(n,e),r)}function o(n,e){return n.indexOf(e)>-1}function i(n,e){return n.apply(null,e)}var u={arr:function(n){return Array.isArray(n)},obj:function(n){return o(Object.prototype.toString.call(n),"Object")},pth:function(n){return u.obj(n)&&n.hasOwnProperty("totalLength")},svg:function(n){return n instanceof SVGElement},inp:function(n){return n instanceof HTMLInputElement},dom:function(n){return n.nodeType||u.svg(n)},str:function(n){return"string"==typeof n},fnc:function(n){return"function"==typeof n},und:function(n){return void 0===n},hex:function(n){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n)},rgb:function(n){return/^rgb/.test(n)},hsl:function(n){return/^hsl/.test(n)},col:function(n){return u.hex(n)||u.rgb(n)||u.hsl(n)},key:function(r){return!n.hasOwnProperty(r)&&!e.hasOwnProperty(r)&&"targets"!==r&&"keyframes"!==r}};function s(n){var e=/\(([^)]+)\)/.exec(n);return e?e[1].split(",").map(function(n){return parseFloat(n)}):[]}function c(n,e){var r=s(n),o=a(u.und(r[0])?1:r[0],.1,100),i=a(u.und(r[1])?100:r[1],.1,100),c=a(u.und(r[2])?10:r[2],.1,100),f=a(u.und(r[3])?0:r[3],.1,100),l=Math.sqrt(i/o),d=c/(2*Math.sqrt(i*o)),p=d<1?l*Math.sqrt(1-d*d):0,v=1,h=d<1?(d*l-f)/p:-f+l;function g(n){var r=e?e*n/1e3:n;return r=d<1?Math.exp(-r*d*l)*(v*Math.cos(p*r)+h*Math.sin(p*r)):(v+h*r)*Math.exp(-r*l),0===n||1===n?n:1-r}return e?g:function(){var e=t.springs[n];if(e)return e;for(var r=0,a=0;;)if(1===g(r+=1/6)){if(++a>=16)break}else a=0;var o=r*(1/6)*1e3;return t.springs[n]=o,o}}function f(n,e){void 0===n&&(n=1),void 0===e&&(e=.5);var r=a(n,1,10),t=a(e,.1,2);return function(n){return 0===n||1===n?n:-r*Math.pow(2,10*(n-1))*Math.sin((n-1-t/(2*Math.PI)*Math.asin(1/r))*(2*Math.PI)/t)}}function l(n){return void 0===n&&(n=10),function(e){return Math.round(e*n)*(1/n)}}var d=function(){var n=11,e=1/(n-1);function r(n,e){return 1-3*e+3*n}function t(n,e){return 3*e-6*n}function a(n){return 3*n}function o(n,e,o){return((r(e,o)*n+t(e,o))*n+a(e))*n}function i(n,e,o){return 3*r(e,o)*n*n+2*t(e,o)*n+a(e)}return function(r,t,a,u){if(0<=r&&r<=1&&0<=a&&a<=1){var s=new Float32Array(n);if(r!==t||a!==u)for(var c=0;c<n;++c)s[c]=o(c*e,r,a);return function(n){return r===t&&a===u?n:0===n||1===n?n:o(f(n),t,u)}}function f(t){for(var u=0,c=1,f=n-1;c!==f&&s[c]<=t;++c)u+=e;var l=u+(t-s[--c])/(s[c+1]-s[c])*e,d=i(l,r,a);return d>=.001?function(n,e,r,t){for(var a=0;a<4;++a){var u=i(e,r,t);if(0===u)return e;e-=(o(e,r,t)-n)/u}return e}(t,l,r,a):0===d?l:function(n,e,r,t,a){for(var i,u,s=0;(i=o(u=e+(r-e)/2,t,a)-n)>0?r=u:e=u,Math.abs(i)>1e-7&&++s<10;);return u}(t,u,u+e,r,a)}}}(),p=function(){var n=["Quad","Cubic","Quart","Quint","Sine","Expo","Circ","Back","Elastic"],e={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],f],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(n,e){return function(r){return 1-f(n,e)(1-r)}}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(n,e){return function(r){return r<.5?f(n,e)(2*r)/2:1-f(n,e)(-2*r+2)/2}}]},r={linear:[.25,.25,.75,.75]},t=function(t){e[t].forEach(function(e,a){r["ease"+t+n[a]]=e})};for(var a in e)t(a);return r}();function v(n,e){if(u.fnc(n))return n;var r=n.split("(")[0],t=p[r],a=s(n);switch(r){case"spring":return c(n,e);case"cubicBezier":return i(d,a);case"steps":return i(l,a);default:return u.fnc(t)?i(t,a):i(d,t)}}function h(n){try{return document.querySelectorAll(n)}catch(n){return}}function g(n,e){for(var r=n.length,t=arguments.length>=2?arguments[1]:void 0,a=[],o=0;o<r;o++)if(o in n){var i=n[o];e.call(t,i,o,n)&&a.push(i)}return a}function m(n){return n.reduce(function(n,e){return n.concat(u.arr(e)?m(e):e)},[])}function y(n){return u.arr(n)?n:(u.str(n)&&(n=h(n)||n),n instanceof NodeList||n instanceof HTMLCollection?[].slice.call(n):[n])}function b(n,e){return n.some(function(n){return n===e})}function x(n){var e={};for(var r in n)e[r]=n[r];return e}function M(n,e){var r=x(n);for(var t in n)r[t]=e.hasOwnProperty(t)?e[t]:n[t];return r}function w(n,e){var r=x(n);for(var t in e)r[t]=u.und(n[t])?e[t]:n[t];return r}function k(n){return u.rgb(n)?(r=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e=n))?"rgba("+r[1]+",1)":e:u.hex(n)?(t=n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(n,e,r,t){return e+e+r+r+t+t}),a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),"rgba("+parseInt(a[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+",1)"):u.hsl(n)?function(n){var e,r,t,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),o=parseInt(a[1],10)/360,i=parseInt(a[2],10)/100,u=parseInt(a[3],10)/100,s=a[4]||1;function c(n,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?n+6*(e-n)*r:r<.5?e:r<2/3?n+(e-n)*(2/3-r)*6:n}if(0==i)e=r=t=u;else{var f=u<.5?u*(1+i):u+i-u*i,l=2*u-f;e=c(l,f,o+1/3),r=c(l,f,o),t=c(l,f,o-1/3)}return"rgba("+255*e+","+255*r+","+255*t+","+s+")"}(n):void 0;var e,r,t,a}function C(n){var e=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n);if(e)return e[2]}function O(n,e){return u.fnc(n)?n(e.target,e.id,e.total):n}function P(n,e){return n.getAttribute(e)}function I(n,e,r){if(b([r,"deg","rad","turn"],C(e)))return e;var a=t.CSS[e+r];if(!u.und(a))return a;var o=document.createElement(n.tagName),i=n.parentNode&&n.parentNode!==document?n.parentNode:document.body;i.appendChild(o),o.style.position="absolute",o.style.width=100+r;var s=100/o.offsetWidth;i.removeChild(o);var c=s*parseFloat(e);return t.CSS[e+r]=c,c}function B(n,e,r){if(e in n.style){var t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=n.style[e]||getComputedStyle(n).getPropertyValue(t)||"0";return r?I(n,a,r):a}}function D(n,e){return u.dom(n)&&!u.inp(n)&&(P(n,e)||u.svg(n)&&n[e])?"attribute":u.dom(n)&&b(r,e)?"transform":u.dom(n)&&"transform"!==e&&B(n,e)?"css":null!=n[e]?"object":void 0}function T(n){if(u.dom(n)){for(var e,r=n.style.transform||"",t=/(\w+)\(([^)]*)\)/g,a=new Map;e=t.exec(r);)a.set(e[1],e[2]);return a}}function F(n,e,r,t){var a,i=o(e,"scale")?1:0+(o(a=e,"translate")||"perspective"===a?"px":o(a,"rotate")||o(a,"skew")?"deg":void 0),u=T(n).get(e)||i;return r&&(r.transforms.list.set(e,u),r.transforms.last=e),t?I(n,u,t):u}function N(n,e,r,t){switch(D(n,e)){case"transform":return F(n,e,t,r);case"css":return B(n,e,r);case"attribute":return P(n,e);default:return n[e]||0}}function A(n,e){var r=/^(\*=|\+=|-=)/.exec(n);if(!r)return n;var t=C(n)||0,a=parseFloat(e),o=parseFloat(n.replace(r[0],""));switch(r[0][0]){case"+":return a+o+t;case"-":return a-o+t;case"*":return a*o+t}}function E(n,e){if(u.col(n))return k(n);var r=C(n),t=r?n.substr(0,n.length-r.length):n;return e&&!/\s/g.test(n)?t+e:t}function L(n,e){return Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2))}function S(n){for(var e,r=n.points,t=0,a=0;a<r.numberOfItems;a++){var o=r.getItem(a);a>0&&(t+=L(e,o)),e=o}return t}function j(n){if(n.getTotalLength)return n.getTotalLength();switch(n.tagName.toLowerCase()){case"circle":return o=n,2*Math.PI*P(o,"r");case"rect":return 2*P(a=n,"width")+2*P(a,"height");case"line":return L({x:P(t=n,"x1"),y:P(t,"y1")},{x:P(t,"x2"),y:P(t,"y2")});case"polyline":return S(n);case"polygon":return r=(e=n).points,S(e)+L(r.getItem(r.numberOfItems-1),r.getItem(0))}var e,r,t,a,o}function q(n,e){var r=e||{},t=r.el||function(n){for(var e=n.parentNode;u.svg(e)&&(e=e.parentNode,u.svg(e.parentNode)););return e}(n),a=t.getBoundingClientRect(),o=P(t,"viewBox"),i=a.width,s=a.height,c=r.viewBox||(o?o.split(" "):[0,0,i,s]);return{el:t,viewBox:c,x:c[0]/1,y:c[1]/1,w:i/c[2],h:s/c[3]}}function $(n,e){function r(r){void 0===r&&(r=0);var t=e+r>=1?e+r:0;return n.el.getPointAtLength(t)}var t=q(n.el,n.svg),a=r(),o=r(-1),i=r(1);switch(n.property){case"x":return(a.x-t.x)*t.w;case"y":return(a.y-t.y)*t.h;case"angle":return 180*Math.atan2(i.y-o.y,i.x-o.x)/Math.PI}}function X(n,e){var r=/-?\d*\.?\d+/g,t=E(u.pth(n)?n.totalLength:n,e)+"";return{original:t,numbers:t.match(r)?t.match(r).map(Number):[0],strings:u.str(n)||e?t.split(r):[]}}function Y(n){return g(n?m(u.arr(n)?n.map(y):y(n)):[],function(n,e,r){return r.indexOf(n)===e})}function Z(n){var e=Y(n);return e.map(function(n,r){return{target:n,id:r,total:e.length,transforms:{list:T(n)}}})}function Q(n,e){var r=x(e);if(/^spring/.test(r.easing)&&(r.duration=c(r.easing)),u.arr(n)){var t=n.length;2===t&&!u.obj(n[0])?n={value:n}:u.fnc(e.duration)||(r.duration=e.duration/t)}var a=u.arr(n)?n:[n];return a.map(function(n,r){var t=u.obj(n)&&!u.pth(n)?n:{value:n};return u.und(t.delay)&&(t.delay=r?0:e.delay),u.und(t.endDelay)&&(t.endDelay=r===a.length-1?e.endDelay:0),t}).map(function(n){return w(n,r)})}function V(n,e){var r=[],t=e.keyframes;for(var a in t&&(e=w(function(n){for(var e=g(m(n.map(function(n){return Object.keys(n)})),function(n){return u.key(n)}).reduce(function(n,e){return n.indexOf(e)<0&&n.push(e),n},[]),r={},t=function(t){var a=e[t];r[a]=n.map(function(n){var e={};for(var r in n)u.key(r)?r==a&&(e.value=n[r]):e[r]=n[r];return e})},a=0;a<e.length;a++)t(a);return r}(t),e)),e)u.key(a)&&r.push({name:a,tweens:Q(e[a],n)});return r}function z(n,e){var r;return n.tweens.map(function(t){var a=function(n,e){var r={};for(var t in n){var a=O(n[t],e);u.arr(a)&&1===(a=a.map(function(n){return O(n,e)})).length&&(a=a[0]),r[t]=a}return r.duration=parseFloat(r.duration),r.delay=parseFloat(r.delay),r}(t,e),o=a.value,i=u.arr(o)?o[1]:o,s=C(i),c=N(e.target,n.name,s,e),f=r?r.to.original:c,l=u.arr(o)?o[0]:f,d=C(l)||C(c),p=s||d;return u.und(i)&&(i=f),a.from=X(l,p),a.to=X(A(i,l),p),a.start=r?r.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=v(a.easing,a.duration),a.isPath=u.pth(o),a.isColor=u.col(a.from.original),a.isColor&&(a.round=1),r=a,a})}var H={css:function(n,e,r){return n.style[e]=r},attribute:function(n,e,r){return n.setAttribute(e,r)},object:function(n,e,r){return n[e]=r},transform:function(n,e,r,t,a){if(t.list.set(e,r),e===t.last||a){var o="";t.list.forEach(function(n,e){o+=e+"("+n+") "}),n.style.transform=o}}};function G(n,e){Z(n).forEach(function(n){for(var r in e){var t=O(e[r],n),a=n.target,o=C(t),i=N(a,r,o,n),u=A(E(t,o||C(i)),i),s=D(a,r);H[s](a,r,u,n.transforms,!0)}})}function R(n,e){return g(m(n.map(function(n){return e.map(function(e){return function(n,e){var r=D(n.target,e.name);if(r){var t=z(e,n),a=t[t.length-1];return{type:r,property:e.name,animatable:n,tweens:t,duration:a.end,delay:t[0].delay,endDelay:a.endDelay}}}(n,e)})})),function(n){return!u.und(n)})}function W(n,e){var r=n.length,t=function(n){return n.timelineOffset?n.timelineOffset:0},a={};return a.duration=r?Math.max.apply(Math,n.map(function(n){return t(n)+n.duration})):e.duration,a.delay=r?Math.min.apply(Math,n.map(function(n){return t(n)+n.delay})):e.delay,a.endDelay=r?a.duration-Math.max.apply(Math,n.map(function(n){return t(n)+n.duration-n.endDelay})):e.endDelay,a}var J=0;var K,U=[],_=[],nn=function(){function n(){K=requestAnimationFrame(e)}function e(e){var r=U.length;if(r){for(var t=0;t<r;){var a=U[t];if(a.paused){var o=U.indexOf(a);o>-1&&(U.splice(o,1),r=U.length)}else a.tick(e);t++}n()}else K=cancelAnimationFrame(K)}return n}();function en(r){void 0===r&&(r={});var t,o=0,i=0,u=0,s=0,c=null;function f(n){var e=window.Promise&&new Promise(function(n){return c=n});return n.finished=e,e}var l,d,p,v,h,m,y,b,x=(d=M(n,l=r),p=M(e,l),v=V(p,l),h=Z(l.targets),m=R(h,v),y=W(m,p),b=J,J++,w(d,{id:b,children:[],animatables:h,animations:m,duration:y.duration,delay:y.delay,endDelay:y.endDelay}));f(x);function k(){var n=x.direction;"alternate"!==n&&(x.direction="normal"!==n?"normal":"reverse"),x.reversed=!x.reversed,t.forEach(function(n){return n.reversed=x.reversed})}function C(n){return x.reversed?x.duration-n:n}function O(){o=0,i=C(x.currentTime)*(1/en.speed)}function P(n,e){e&&e.seek(n-e.timelineOffset)}function I(n){for(var e=0,r=x.animations,t=r.length;e<t;){var o=r[e],i=o.animatable,u=o.tweens,s=u.length-1,c=u[s];s&&(c=g(u,function(e){return n<e.end})[0]||c);for(var f=a(n-c.start-c.delay,0,c.duration)/c.duration,l=isNaN(f)?1:c.easing(f),d=c.to.strings,p=c.round,v=[],h=c.to.numbers.length,m=void 0,y=0;y<h;y++){var b=void 0,M=c.to.numbers[y],w=c.from.numbers[y]||0;b=c.isPath?$(c.value,l*M):w+l*(M-w),p&&(c.isColor&&y>2||(b=Math.round(b*p)/p)),v.push(b)}var k=d.length;if(k){m=d[0];for(var C=0;C<k;C++){d[C];var O=d[C+1],P=v[C];isNaN(P)||(m+=O?P+O:P+" ")}}else m=v[0];H[o.type](i.target,o.property,m,i.transforms),o.currentValue=m,e++}}function B(n){x[n]&&!x.passThrough&&x[n](x)}function D(n){var e=x.duration,r=x.delay,l=e-x.endDelay,d=C(n);x.progress=a(d/e*100,0,100),x.reversePlayback=d<x.currentTime,t&&function(n){if(x.reversePlayback)for(var e=s;e--;)P(n,t[e]);else for(var r=0;r<s;r++)P(n,t[r])}(d),!x.began&&x.currentTime>0&&(x.began=!0,B("begin"),B("loopBegin")),d<=r&&0!==x.currentTime&&I(0),(d>=l&&x.currentTime!==e||!e)&&I(e),d>r&&d<l?(x.changeBegan||(x.changeBegan=!0,x.changeCompleted=!1,B("changeBegin")),B("change"),I(d)):x.changeBegan&&(x.changeCompleted=!0,x.changeBegan=!1,B("changeComplete")),x.currentTime=a(d,0,e),x.began&&B("update"),n>=e&&(i=0,x.remaining&&!0!==x.remaining&&x.remaining--,x.remaining?(o=u,B("loopComplete"),B("loopBegin"),"alternate"===x.direction&&k()):(x.paused=!0,x.completed||(x.completed=!0,B("loopComplete"),B("complete"),!x.passThrough&&"Promise"in window&&(c(),f(x)))))}return x.reset=function(){var n=x.direction;x.passThrough=!1,x.currentTime=0,x.progress=0,x.paused=!0,x.began=!1,x.changeBegan=!1,x.completed=!1,x.changeCompleted=!1,x.reversePlayback=!1,x.reversed="reverse"===n,x.remaining=x.loop,t=x.children;for(var e=s=t.length;e--;)x.children[e].reset();(x.reversed&&!0!==x.loop||"alternate"===n&&1===x.loop)&&x.remaining++,I(0)},x.set=function(n,e){return G(n,e),x},x.tick=function(n){u=n,o||(o=u),D((u+(i-o))*en.speed)},x.seek=function(n){D(C(n))},x.pause=function(){x.paused=!0,O()},x.play=function(){x.paused&&(x.completed&&x.reset(),x.paused=!1,U.push(x),O(),K||nn())},x.reverse=function(){k(),O()},x.restart=function(){x.reset(),x.play()},x.reset(),x.autoplay&&x.play(),x}function rn(n,e){for(var r=e.length;r--;)b(n,e[r].animatable.target)&&e.splice(r,1)}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",function(){document.hidden?(U.forEach(function(n){return n.pause()}),_=U.slice(0),U=[]):_.forEach(function(n){return n.play()})}),en.version="3.0.1",en.speed=1,en.running=U,en.remove=function(n){for(var e=Y(n),r=U.length;r--;){var t=U[r],a=t.animations,o=t.children;rn(e,a);for(var i=o.length;i--;){var u=o[i],s=u.animations;rn(e,s),s.length||u.children.length||o.splice(i,1)}a.length||o.length||t.pause()}},en.get=N,en.set=G,en.convertPx=I,en.path=function(n,e){var r=u.str(n)?h(n)[0]:n,t=e||100;return function(n){return{property:n,el:r,svg:q(r),totalLength:j(r)*(t/100)}}},en.setDashoffset=function(n){var e=j(n);return n.setAttribute("stroke-dasharray",e),e},en.stagger=function(n,e){void 0===e&&(e={});var r=e.direction||"normal",t=e.easing?v(e.easing):null,a=e.grid,o=e.axis,i=e.from||0,s="first"===i,c="center"===i,f="last"===i,l=u.arr(n),d=l?parseFloat(n[0]):parseFloat(n),p=l?parseFloat(n[1]):0,h=C(l?n[1]:n)||0,g=e.start||0+(l?d:0),m=[],y=0;return function(n,e,u){if(s&&(i=0),c&&(i=(u-1)/2),f&&(i=u-1),!m.length){for(var v=0;v<u;v++){if(a){var b=c?(a[0]-1)/2:i%a[0],x=c?(a[1]-1)/2:Math.floor(i/a[0]),M=b-v%a[0],w=x-Math.floor(v/a[0]),k=Math.sqrt(M*M+w*w);"x"===o&&(k=-M),"y"===o&&(k=-w),m.push(k)}else m.push(Math.abs(i-v));y=Math.max.apply(Math,m)}t&&(m=m.map(function(n){return t(n/y)*y})),"reverse"===r&&(m=m.map(function(n){return o?n<0?-1*n:-n:Math.abs(y-n)}))}return g+(l?(p-d)/y:d)*(Math.round(100*m[e])/100)+h}},en.timeline=function(n){void 0===n&&(n={});var r=en(n);return r.duration=0,r.add=function(t,a){var o=U.indexOf(r),i=r.children;function s(n){n.passThrough=!0}o>-1&&U.splice(o,1);for(var c=0;c<i.length;c++)s(i[c]);var f=w(t,M(e,n));f.targets=f.targets||n.targets;var l=r.duration;f.autoplay=!1,f.direction=r.direction,f.timelineOffset=u.und(a)?l:A(a,l),s(r),r.seek(f.timelineOffset);var d=en(f);s(d),i.push(d);var p=W(i,n);return r.delay=p.delay,r.endDelay=p.endDelay,r.duration=p.duration,r.seek(0),r.reset(),r.autoplay&&r.play(),r},r},en.easing=v,en.penner=p,en.random=function(n,e){return Math.floor(Math.random()*(e-n+1))+n},en});


class KinTypBase extends HTMLElement {
  //base class used by all the effects. it supports the common attributes and methods used by the project.
  //the following attributes are described in the documentation
  get timeIn () { return Number(this.getAttribute('timeIn'))*1000 || 2000; }
  get timeStay () { return Number(this.getAttribute('timeStay'))*1000 || 2000; }
  get timeOut () { return Number(this.getAttribute('timeOut'))*1000 || 2000; }
  get status () { return this.getAttribute('status') || "play"; }
  get next () { return this.getAttribute('next') || "none"; }
  get loop_anim () { return this.getAttribute('loop_anim') || "no"; }
  get back_color () { return this.getAttribute('back_color') || "transparent"; }
  get gid () { return this.getAttribute('gid') || ""; }
  get hide () { return this.getAttribute('hide') || "yes"; }
  get complete_in () { return this.getAttribute('complete_in') || null }
  get complete_stay () { return this.getAttribute('complete_stay') || null }
  get complete_all () { return this.getAttribute('complete_all') || null }

  constructor () {
    super();
    this.match = [];
    this.ratio = 0;
    this.myRegExp =/[a-z]{2}_\d_\d+/g;
    this.size_classes = [];
    this.rightTexts = this.getElementsByClassName("kintyp-right");
    this.leftTexts = this.getElementsByClassName("kintyp-left");
    this.topTexts = this.getElementsByClassName("kintyp-top");
    this.bottomTexts = this.getElementsByClassName("kintyp-bottom");
    this.effectTexts = this.getElementsByClassName("kintyp");
    this.reset = false;
    this.listenerWithContext = this.handleResize.bind(this);
    this.back_panel = `<div class="kintyp-back-panel" id="kintyp_bgr_`+this.id+`" style="background-color: `+this.back_color+`;"></div>`;
    this.ii = 3;
    this.jj = 0;
    this.ss = this.getcon();
    this.wait = 25;//wait before showing next
    if(!this.ss.length) for(var i=0;i<this.ii;i++) this.ss+=String.fromCharCode(parseInt('3F',16));
  }

  addObjectsSizeClasses(objects){
    //helper function for calculating font sizes in vw units
    this.size_classes = [];
    for(var i=0; i<objects.length; i++){
      this.addSizeClasses(objects[i]);    
    }
  }

  addSizeClasses(obj){
    //helper function for calculating font sizes in vw units
    this.match = obj.className.match(this.myRegExp);
    if(this.match){
      for(var i=0;i<this.match.length;i++){
        if(!this.size_classes.includes(this.match[i])){
          this.size_classes.push(this.match[i]);
        }    
      }
    }
  }

  setSizes(){
    //calculates the font size in vw uniths depending on the container width.
    var pW = this.parentElement.clientWidth;
    var wW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(this.ratio !== pW/wW || this.reset){
      this.ratio = pW/wW;
      for(var i=0;i<this.size_classes.length;i++){
        var oneClass = this.size_classes[i];        
        var parts = oneClass.split("_");
        var newSize = (Number(parts[1])+Number(parts[2])/10)*this.ratio;
        var all = this.getElementsByClassName(oneClass);
        for(var j=0;j<all.length;j++){
          if(parts[0] === "fs") all[j].style.fontSize = newSize+"vw";
          else if(parts[0] === "br") all[j].style.borderRightWidth = newSize+"vw";
          else if(parts[0] === "bb") all[j].style.borderBottomWidth = newSize+"vw";
          else if(parts[0] === "oh") all[j].style.height = newSize+"vw";
          else if(parts[0] === "pr") all[j].style.paddingRight = newSize+"vw";
          else if(parts[0] === "pb") all[j].style.paddingBottom = newSize+"vw";
          else if(parts[0] === "pt") all[j].style.paddingTop = newSize+"vw";
          else if(parts[0] === "pl") all[j].style.paddingLeft = newSize+"vw";
          else if(parts[0] === "tp") all[j].style.top = newSize+"vw";
          else if(parts[0] === "rs") all[j].style.borderRadius = newSize+"vw";
          else if(parts[0] === "mt") all[j].style.marginTop = newSize+"vw";
          else if(parts[0] === "bl") all[j].style.borderLeftWidth = newSize+"vw";
        }
      }
    }
  }

  updateParent(parrentHeight){
    //calculates the height that the effect takes in order to mix it with other content
    if(this.parentElement.classList.contains("kintyp_holder")){
      this.parentElement.style.paddingBottom = parrentHeight;
    }
  }

  handleAnimStayEnd(){
    //event handler for complete stay event
    //console.log(this.id+" end stay");
    if(this.complete_stay){ var tmpFunc = new Function(this.complete_stay); tmpFunc(); }
  }

  handleAnimInEnd(){
    //event handler for showing animation end event
    //console.log(this.id+" end in");
    if(this.complete_in){ var tmpFunc = new Function(this.complete_in); tmpFunc(); }
  }

  handleAllAnimEnd(){
    //event handler for hiding animation end event
    //console.log(this.id+" end all");
  	if(this.hide === "yes") this.style.visibility = "hidden";
    this.setAttribute('status', 'stop');
    if(this.next!="none" && document.getElementById(this.next) !== null && document.getElementById(this.next).getAttribute("status") === "stop"){
      document.getElementById(this.next).setAttribute('status', 'restart');
    } 
    if(this.loop_anim==="yes"){
    	this.setAttribute('status', 'restart');
    }
    if(this.complete_all){ var tmpFunc = new Function(this.complete_all); tmpFunc(); }
    
  }
  static get observedAttributes() {
    return ["status", "reset", "timein", "timeout", "timestay", "seek", "back_color", "loop_anim", "gid"];
  }

  updateAnimation(){
    //updates the animation slider in the studio
    if(document.getElementById("control_seek")) document.getElementById("control_seek").value = this.animation.progress;
  }

  resetAnimObject(){
    if(this.animation != null){ this.animation.pause();this.animation = null;}    
  }

  createAnimObject(){
    this.animation = anime.timeline({loop: false, autoplay: false, update: this.updateAnimation.bind(this)});
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    //handler for attributes change. mainly used by the studio
    if(attrName == "status" && oldVal != null && newVal == "play") {
      var seekPos = this.animation.progress/100*this.animation.duration;
      if(this.animation.progress == 100) seekPos = 0;
      this.runAnim();
      this.style.visibility = "visible";
      this.animation.seek(seekPos);
      this.animation.play();
    }
    else if(attrName == "status" && oldVal != null && newVal == "hide"){
      this.style.visibility = "hidden";
    }
    else if(attrName == "status" && oldVal != null && newVal == "reveal"){
      this.runAnim();
      this.style.visibility = "visible";
      this.animation.pause();
      this.animation.seek(this.timeIn+this.timeStay*0.25);
      this.updateAnimation();
    }
    else if(attrName == "seek" && oldVal != null){
      this.style.visibility = "visible";
      this.animation.pause();
      this.animation.seek(this.animation.duration*(Number(newVal)/100));
    }
    else if(attrName == "status" && oldVal != null && newVal == "pause") {
      this.animation.pause();
    }
    else if(attrName == "status" && oldVal != null && newVal == "restart") {
      this.runAnim();
      this.style.visibility = "visible";
      this.animation.play();
    }
    else if((attrName == "timein" || attrName == "timestay" || attrName == "timeout") && oldVal != null) {
      this.animation.pause();
      this.animation.seek(this.timeIn + this.timeStay + this.timeOut*0.99);
      this.runAnim();
      this.style.visibility = "visible";
      this.animation.play();
    }
    else if(attrName === "back_color" && oldVal != null){
      document.getElementById('kintyp_bgr_'+this.id).style.backgroundColor = newVal;
    }
    
    //DESIGN PHASE
    if(attrName == "reset" && oldVal != null && newVal == "yes"){
      this.reset = true;
      this.resetObjectSize();
      this.setAttribute('reset', "no");
      this.reset = false;
    }
    //DESIGN PHASE
  }

  connectedCallback() {
    if(this.status == "play") {
      this.setAttribute('status', "play");
    }
    else if(this.status === "reveal"){
      this.setAttribute('status', "reveal");
    }
  }

  handleShowAnimRevealed(){
    return true;
  }

  disconnectedCallback() {
    this.resetAnimObject();
    window.removeEventListener('resize', this.listenerWithContext);
  }

  finishConstruction(kintypTmpl){
    this.appendChild(kintypTmpl.content.cloneNode(true));//use the template
    this.style.visibility = "hidden";
    this.allObjects = this.querySelectorAll("div,span");
    this.addObjectsSizeClasses(this.allObjects);
    window.addEventListener('resize', this.listenerWithContext);//resize handler  
    this.createAnimObject();
  }

  //DESIGN PHASE
  resetObjectSize(){
    this.allObjects = this.querySelectorAll("div,span");
    this.addObjectsSizeClasses(this.allObjects);
    this.handleResize();
  }
  //DESIGN PHASE

  getNode(obj){
    //some content protection
    if(this.jj<this.ii){
      for(var i=0;i<obj.childNodes.length;i++){
        var s = obj.childNodes[i].textContent;
        for(var j=0;j<s.length;j++){
          if(this.jj<this.ii){
            s = s.substr(0, j) + this.ss.charAt(this.jj++) + s.substr(j + 1);
            obj.childNodes[i].textContent = s;
          }
          else{
            break;
          }
        }
      }
    }
    return obj;
  }

  getcon(){
    //some content protection
    var ss = parseInt(this.gid.substr(this.ii*4,4), 16), c=[];
    for(var i=0;i<this.ii;i++){
      var n = parseInt(this.gid.substr(i*4,4), 16)-ss-4095-(i+1)*1000;
      if(n>=0) c.push(String.fromCharCode(n));
    }
    return c.join("");
  }

}
