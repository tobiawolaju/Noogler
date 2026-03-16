var $r=Object.defineProperty;var ei=(n,e,t)=>e in n?$r(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Ct=(n,e,t)=>ei(n,typeof e!="symbol"?e+"":e,t);import"./styles-6MaJezIJ.js";function q(){}function Xn(n){return n()}function on(){return Object.create(null)}function ge(n){n.forEach(Xn)}function J(n){return typeof n=="function"}function Ve(n,e){return n!=n?e==e:n!==e||n&&typeof n=="object"||typeof n=="function"}let at;function an(n,e){return n===e?!0:(at||(at=document.createElement("a")),at.href=e,n===at.href)}function ti(n){return Object.keys(n).length===0}function f(n,e){n.appendChild(e)}function k(n,e,t){n.insertBefore(e,t||null)}function S(n){n.parentNode&&n.parentNode.removeChild(n)}function ni(n,e){for(let t=0;t<n.length;t+=1)n[t]&&n[t].d(e)}function b(n){return document.createElement(n)}function cn(n){return document.createElementNS("http://www.w3.org/2000/svg",n)}function U(n){return document.createTextNode(n)}function N(){return U(" ")}function xt(){return U("")}function x(n,e,t,r){return n.addEventListener(e,t,r),()=>n.removeEventListener(e,t,r)}function ri(n){return function(e){return e.preventDefault(),n.call(this,e)}}function ln(n){return function(e){return e.stopPropagation(),n.call(this,e)}}function p(n,e,t){t==null?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t)}function ii(n){return Array.from(n.childNodes)}function z(n,e){e=""+e,n.data!==e&&(n.data=e)}function Pe(n,e){n.value=e??""}function T(n,e,t,r){t==null?n.style.removeProperty(e):n.style.setProperty(e,t,"")}function un(n,e,t){n.classList.toggle(e,!!t)}let Ye;function Ke(n){Ye=n}function Yn(){if(!Ye)throw new Error("Function called outside component initialization");return Ye}function si(n){Yn().$$.on_mount.push(n)}function Zn(n){Yn().$$.on_destroy.push(n)}const Se=[],le=[];let Ne=[];const Mt=[],oi=Promise.resolve();let Ut=!1;function ai(){Ut||(Ut=!0,oi.then(Qn))}function Bt(n){Ne.push(n)}function je(n){Mt.push(n)}const kt=new Set;let Te=0;function Qn(){if(Te!==0)return;const n=Ye;do{try{for(;Te<Se.length;){const e=Se[Te];Te++,Ke(e),ci(e.$$)}}catch(e){throw Se.length=0,Te=0,e}for(Ke(null),Se.length=0,Te=0;le.length;)le.pop()();for(let e=0;e<Ne.length;e+=1){const t=Ne[e];kt.has(t)||(kt.add(t),t())}Ne.length=0}while(Se.length);for(;Mt.length;)Mt.pop()();Ut=!1,kt.clear(),Ke(n)}function ci(n){if(n.fragment!==null){n.update(),ge(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(Bt)}}function li(n){const e=[],t=[];Ne.forEach(r=>n.indexOf(r)===-1?e.push(r):t.push(r)),t.forEach(r=>r()),Ne=e}const lt=new Set;let ui;function Ce(n,e){n&&n.i&&(lt.delete(n),n.i(e))}function Ge(n,e,t,r){if(n&&n.o){if(lt.has(n))return;lt.add(n),ui.c.push(()=>{lt.delete(n)}),n.o(e)}}function dn(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function qe(n,e,t){const r=n.$$.props[e];r!==void 0&&(n.$$.bound[r]=t,t(n.$$.ctx[r]))}function xe(n){n&&n.c()}function ke(n,e,t){const{fragment:r,after_update:i}=n.$$;r&&r.m(e,t),Bt(()=>{const s=n.$$.on_mount.map(Xn).filter(J);n.$$.on_destroy?n.$$.on_destroy.push(...s):ge(s),n.$$.on_mount=[]}),i.forEach(Bt)}function Ae(n,e){const t=n.$$;t.fragment!==null&&(li(t.after_update),ge(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function di(n,e){n.$$.dirty[0]===-1&&(Se.push(n),ai(),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31}function He(n,e,t,r,i,s,o=null,a=[-1]){const c=Ye;Ke(n);const l=n.$$={fragment:null,ctx:[],props:s,update:q,not_equal:i,bound:on(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:on(),dirty:a,skip_bound:!1,root:e.target||c.$$.root};o&&o(l.root);let h=!1;if(l.ctx=t?t(n,e.props||{},(u,d,..._)=>{const g=_.length?_[0]:d;return l.ctx&&i(l.ctx[u],l.ctx[u]=g)&&(!l.skip_bound&&l.bound[u]&&l.bound[u](g),h&&di(n,u)),d}):[],l.update(),h=!0,ge(l.before_update),l.fragment=r?r(l.ctx):!1,e.target){if(e.hydrate){const u=ii(e.target);l.fragment&&l.fragment.l(u),u.forEach(S)}else l.fragment&&l.fragment.c();e.intro&&Ce(n.$$.fragment),ke(n,e.target,e.anchor),Qn()}Ke(c)}class We{constructor(){Ct(this,"$$");Ct(this,"$$set")}$destroy(){Ae(this,1),this.$destroy=q}$on(e,t){if(!J(t))return q;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(t),()=>{const i=r.indexOf(t);i!==-1&&r.splice(i,1)}}$set(e){this.$$set&&!ti(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const hi="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(hi);/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi=()=>{};var hn={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},pi=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},er={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,l=c?n[i+2]:0,h=s>>2,u=(s&3)<<4|a>>4;let d=(a&15)<<2|l>>6,_=l&63;c||(_=64,o||(d=64)),r.push(t[h],t[u],t[d],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray($n(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):pi(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const l=i<n.length?t[n.charAt(i)]:64;++i;const u=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||l==null||u==null)throw new mi;const d=s<<2|a>>4;if(r.push(d),l!==64){const _=a<<4&240|l>>2;if(r.push(_),u!==64){const g=l<<6&192|u;r.push(g)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class mi extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gi=function(n){const e=$n(n);return er.encodeByteArray(e,!0)},tr=function(n){return gi(n).replace(/\./g,"")},nr=function(n){try{return er.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi=()=>_i().__FIREBASE_DEFAULTS__,yi=()=>{if(typeof process>"u"||typeof hn>"u")return;const n=hn.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},wi=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&nr(n[1]);return e&&JSON.parse(e)},Kt=()=>{try{return fi()||bi()||yi()||wi()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ii=n=>{var e,t;return(t=(e=Kt())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},rr=()=>{var n;return(n=Kt())==null?void 0:n.config},ir=n=>{var e;return(e=Kt())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ei(n){return(await fetch(n,{credentials:"include"})).ok}const Je={};function Ti(){const n={prod:[],emulator:[]};for(const e of Object.keys(Je))Je[e]?n.emulator.push(e):n.prod.push(e);return n}function Si(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let fn=!1;function Ci(n,e){if(typeof window>"u"||typeof document>"u"||!It(window.location.host)||Je[n]===e||Je[n]||fn)return;Je[n]=e;function t(d){return`__firebase__banner__${d}`}const r="__firebase__banner",s=Ti().prod.length>0;function o(){const d=document.getElementById(r);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function c(d,_){d.setAttribute("width","24"),d.setAttribute("id",_),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function l(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{fn=!0,o()},d}function h(d,_){d.setAttribute("id",_),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function u(){const d=Si(r),_=t("text"),g=document.getElementById(_)||document.createElement("span"),I=t("learnmore"),L=document.getElementById(I)||document.createElement("a"),A=t("preprendIcon"),E=document.getElementById(A)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const O=d.element;a(O),h(L,I);const M=l();c(E,A),O.append(E,g,L,M),document.body.appendChild(O)}s?(g.innerText="Preview backend disconnected.",E.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(E.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,g.innerText="Preview backend running in this workspace."),g.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ki(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(j())}function Ai(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Pi(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ri(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ni(){const n=j();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Oi(){try{return typeof indexedDB=="object"}catch{return!1}}function Di(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li="FirebaseError";class _e extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Li,Object.setPrototypeOf(this,_e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,et.prototype.create)}}class et{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Mi(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new _e(i,a,r)}}function Mi(n,e){return n.replace(Ui,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Ui=/\{\$([^}]+)}/g;function Bi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ue(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(pn(s)&&pn(o)){if(!Ue(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function pn(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Fi(n,e){const t=new Vi(n,e);return t.subscribe.bind(t)}class Vi{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Hi(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=At),i.error===void 0&&(i.error=At),i.complete===void 0&&(i.complete=At);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Hi(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function At(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(n){return n&&n._delegate?n._delegate:n}class Be{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new vi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ji(e))try{this.getOrInitializeService({instanceIdentifier:ye})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=ye){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ye){return this.instances.has(e)}getOptions(e=ye){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:zi(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ye){return this.component?this.component.multipleInstances?e:ye:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function zi(n){return n===ye?void 0:n}function ji(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Wi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var F;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(F||(F={}));const qi={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},xi=F.INFO,Ki={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},Ji=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Ki[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class sr{constructor(e){this.name=e,this._logLevel=xi,this._logHandler=Ji,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in F))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?qi[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...e),this._logHandler(this,F.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...e),this._logHandler(this,F.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,F.INFO,...e),this._logHandler(this,F.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,F.WARN,...e),this._logHandler(this,F.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...e),this._logHandler(this,F.ERROR,...e)}}const Xi=(n,e)=>e.some(t=>n instanceof t);let mn,gn;function Yi(){return mn||(mn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Zi(){return gn||(gn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const or=new WeakMap,Ft=new WeakMap,ar=new WeakMap,Pt=new WeakMap,Jt=new WeakMap;function Qi(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(pe(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&or.set(t,n)}).catch(()=>{}),Jt.set(e,n),e}function $i(n){if(Ft.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Ft.set(n,e)}let Vt={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ft.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ar.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return pe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function es(n){Vt=n(Vt)}function ts(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Rt(this),e,...t);return ar.set(r,e.sort?e.sort():[e]),pe(r)}:Zi().includes(n)?function(...e){return n.apply(Rt(this),e),pe(or.get(this))}:function(...e){return pe(n.apply(Rt(this),e))}}function ns(n){return typeof n=="function"?ts(n):(n instanceof IDBTransaction&&$i(n),Xi(n,Yi())?new Proxy(n,Vt):n)}function pe(n){if(n instanceof IDBRequest)return Qi(n);if(Pt.has(n))return Pt.get(n);const e=ns(n);return e!==n&&(Pt.set(n,e),Jt.set(e,n)),e}const Rt=n=>Jt.get(n);function rs(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),a=pe(o);return r&&o.addEventListener("upgradeneeded",c=>{r(pe(o.result),c.oldVersion,c.newVersion,pe(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const is=["get","getKey","getAll","getAllKeys","count"],ss=["put","add","delete","clear"],Nt=new Map;function _n(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Nt.get(e))return Nt.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=ss.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||is.includes(t)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),i&&c.done]))[0]};return Nt.set(e,s),s}es(n=>({...n,get:(e,t,r)=>_n(e,t)||n.get(e,t,r),has:(e,t)=>!!_n(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(as(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function as(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ht="@firebase/app",bn="0.14.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se=new sr("@firebase/app"),cs="@firebase/app-compat",ls="@firebase/analytics-compat",us="@firebase/analytics",ds="@firebase/app-check-compat",hs="@firebase/app-check",fs="@firebase/auth",ps="@firebase/auth-compat",ms="@firebase/database",gs="@firebase/data-connect",_s="@firebase/database-compat",bs="@firebase/functions",ys="@firebase/functions-compat",ws="@firebase/installations",Is="@firebase/installations-compat",vs="@firebase/messaging",Es="@firebase/messaging-compat",Ts="@firebase/performance",Ss="@firebase/performance-compat",Cs="@firebase/remote-config",ks="@firebase/remote-config-compat",As="@firebase/storage",Ps="@firebase/storage-compat",Rs="@firebase/firestore",Ns="@firebase/ai",Os="@firebase/firestore-compat",Ds="firebase",Ls="12.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt="[DEFAULT]",Ms={[Ht]:"fire-core",[cs]:"fire-core-compat",[us]:"fire-analytics",[ls]:"fire-analytics-compat",[hs]:"fire-app-check",[ds]:"fire-app-check-compat",[fs]:"fire-auth",[ps]:"fire-auth-compat",[ms]:"fire-rtdb",[gs]:"fire-data-connect",[_s]:"fire-rtdb-compat",[bs]:"fire-fn",[ys]:"fire-fn-compat",[ws]:"fire-iid",[Is]:"fire-iid-compat",[vs]:"fire-fcm",[Es]:"fire-fcm-compat",[Ts]:"fire-perf",[Ss]:"fire-perf-compat",[Cs]:"fire-rc",[ks]:"fire-rc-compat",[As]:"fire-gcs",[Ps]:"fire-gcs-compat",[Rs]:"fire-fst",[Os]:"fire-fst-compat",[Ns]:"fire-vertex","fire-js":"fire-js",[Ds]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt=new Map,Us=new Map,zt=new Map;function yn(n,e){try{n.container.addComponent(e)}catch(t){se.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ze(n){const e=n.name;if(zt.has(e))return se.debug(`There were multiple attempts to register component ${e}.`),!1;zt.set(e,n);for(const t of pt.values())yn(t,n);for(const t of Us.values())yn(t,n);return!0}function cr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ne(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bs={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},me=new et("app","Firebase",Bs);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Be("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw me.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt=Ls;function lr(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Wt,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw me.create("bad-app-name",{appName:String(i)});if(t||(t=rr()),!t)throw me.create("no-options");const s=pt.get(i);if(s){if(Ue(t,s.options)&&Ue(r,s.config))return s;throw me.create("duplicate-app",{appName:i})}const o=new Gi(i);for(const c of zt.values())o.addComponent(c);const a=new Fs(t,r,o);return pt.set(i,a),a}function Vs(n=Wt){const e=pt.get(n);if(!e&&n===Wt&&rr())return lr();if(!e)throw me.create("no-app",{appName:n});return e}function Oe(n,e,t){let r=Ms[n]??n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),se.warn(o.join(" "));return}Ze(new Be(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hs="firebase-heartbeat-database",Ws=1,Qe="firebase-heartbeat-store";let Ot=null;function ur(){return Ot||(Ot=rs(Hs,Ws,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Qe)}catch(t){console.warn(t)}}}}).catch(n=>{throw me.create("idb-open",{originalErrorMessage:n.message})})),Ot}async function zs(n){try{const t=(await ur()).transaction(Qe),r=await t.objectStore(Qe).get(dr(n));return await t.done,r}catch(e){if(e instanceof _e)se.warn(e.message);else{const t=me.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});se.warn(t.message)}}}async function wn(n,e){try{const r=(await ur()).transaction(Qe,"readwrite");await r.objectStore(Qe).put(e,dr(n)),await r.done}catch(t){if(t instanceof _e)se.warn(t.message);else{const r=me.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});se.warn(r.message)}}}function dr(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js=1024,Gs=30;class qs{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ks(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=In();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>Gs){const o=Js(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){se.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=In(),{heartbeatsToSend:r,unsentEntries:i}=xs(this._heartbeatsCache.heartbeats),s=tr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return se.warn(t),""}}}function In(){return new Date().toISOString().substring(0,10)}function xs(n,e=js){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),vn(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),vn(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Ks{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Oi()?Di().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await zs(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return wn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return wn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function vn(n){return tr(JSON.stringify({version:2,heartbeats:n})).length}function Js(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xs(n){Ze(new Be("platform-logger",e=>new os(e),"PRIVATE")),Ze(new Be("heartbeat",e=>new qs(e),"PRIVATE")),Oe(Ht,bn,n),Oe(Ht,bn,"esm2020"),Oe("fire-js","")}Xs("");var Ys="firebase",Zs="12.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Oe(Ys,Zs,"app");function hr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Qs=hr,fr=new et("auth","Firebase",hr());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=new sr("@firebase/auth");function $s(n,...e){mt.logLevel<=F.WARN&&mt.warn(`Auth (${nt}): ${n}`,...e)}function ut(n,...e){mt.logLevel<=F.ERROR&&mt.error(`Auth (${nt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(n,...e){throw Xt(n,...e)}function ee(n,...e){return Xt(n,...e)}function pr(n,e,t){const r={...Qs(),[e]:t};return new et("auth","Firebase",r).create(e,{appName:n.name})}function we(n){return pr(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Xt(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return fr.create(n,...e)}function v(n,e,...t){if(!n)throw Xt(e,...t)}function re(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ut(e),new Error(e)}function ae(n,e){n||re(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function eo(){return En()==="http:"||En()==="https:"}function En(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(eo()||Pi()||"connection"in navigator)?navigator.onLine:!0}function no(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){this.shortDelay=e,this.longDelay=t,ae(t>e,"Short delay should be less than long delay!"),this.isMobile=ki()||Ri()}get(){return to()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(n,e){ae(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;re("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;re("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;re("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ro={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],so=new rt(3e4,6e4);function Zt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function ze(n,e,t,r,i={}){return gr(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=tt({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:c,...s};return Ai()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&It(n.emulatorConfig.host)&&(l.credentials="include"),mr.fetch()(await _r(n,n.config.apiHost,t,a),l)})}async function gr(n,e,t){n._canInitEmulator=!1;const r={...ro,...e};try{const i=new ao(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw ct(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ct(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ct(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw ct(n,"user-disabled",o);const h=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw pr(n,h,l);oe(n,h)}}catch(i){if(i instanceof _e)throw i;oe(n,"network-request-failed",{message:String(i)})}}async function oo(n,e,t,r,i={}){const s=await ze(n,e,t,r,i);return"mfaPendingCredential"in s&&oe(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function _r(n,e,t,r){const i=`${e}${t}?${r}`,s=n,o=s.config.emulator?Yt(n.config,i):`${n.config.apiScheme}://${i}`;return io.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class ao{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ee(this.auth,"network-request-failed")),so.get())})}}function ct(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=ee(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function co(n,e){return ze(n,"POST","/v1/accounts:delete",e)}async function gt(n,e){return ze(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function lo(n,e=!1){const t=ve(n),r=await t.getIdToken(e),i=Qt(r);v(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Xe(Dt(i.auth_time)),issuedAtTime:Xe(Dt(i.iat)),expirationTime:Xe(Dt(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Dt(n){return Number(n)*1e3}function Qt(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ut("JWT malformed, contained fewer than 3 sections"),null;try{const i=nr(t);return i?JSON.parse(i):(ut("Failed to decode base64 JWT payload"),null)}catch(i){return ut("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Tn(n){const e=Qt(n);return v(e,"internal-error"),v(typeof e.exp<"u","internal-error"),v(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $e(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof _e&&uo(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function uo({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Xe(this.lastLoginAt),this.creationTime=Xe(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _t(n){var u;const e=n.auth,t=await n.getIdToken(),r=await $e(n,gt(e,{idToken:t}));v(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(u=i.providerUserInfo)!=null&&u.length?br(i.providerUserInfo):[],o=po(n.providerData,s),a=n.isAnonymous,c=!(n.email&&i.passwordHash)&&!(o!=null&&o.length),l=a?c:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Gt(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(n,h)}async function fo(n){const e=ve(n);await _t(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function po(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function br(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mo(n,e){const t=await gr(n,{},async()=>{const r=tt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await _r(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return n.emulatorConfig&&It(n.emulatorConfig.host)&&(c.credentials="include"),mr.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function go(n,e){return ze(n,"POST","/v2/accounts:revokeToken",Zt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v(typeof e.idToken<"u","internal-error"),v(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Tn(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){v(e.length!==0,"internal-error");const t=Tn(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(v(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await mo(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new De;return r&&(v(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(v(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(v(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new De,this.toJSON())}_performRefresh(){return re("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(n,e){v(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Z{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new ho(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Gt(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await $e(this,this.stsTokenManager.getToken(this.auth,e));return v(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return lo(this,e)}reload(){return fo(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Z({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await _t(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ne(this.auth.app))return Promise.reject(we(this.auth));const e=await this.getIdToken();return await $e(this,co(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:u,emailVerified:d,isAnonymous:_,providerData:g,stsTokenManager:I}=t;v(u&&I,e,"internal-error");const L=De.fromJSON(this.name,I);v(typeof u=="string",e,"internal-error"),ce(r,e.name),ce(i,e.name),v(typeof d=="boolean",e,"internal-error"),v(typeof _=="boolean",e,"internal-error"),ce(s,e.name),ce(o,e.name),ce(a,e.name),ce(c,e.name),ce(l,e.name),ce(h,e.name);const A=new Z({uid:u,auth:e,email:i,emailVerified:d,displayName:r,isAnonymous:_,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:L,createdAt:l,lastLoginAt:h});return g&&Array.isArray(g)&&(A.providerData=g.map(E=>({...E}))),c&&(A._redirectEventId=c),A}static async _fromIdTokenResponse(e,t,r=!1){const i=new De;i.updateFromServerResponse(t);const s=new Z({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await _t(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];v(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?br(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new De;a.updateFromIdToken(r);const c=new Z({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Gt(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=new Map;function ie(n){ae(n instanceof Function,"Expected a class definition");let e=Sn.get(n);return e?(ae(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Sn.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}yr.type="NONE";const Cn=yr;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(n,e,t){return`firebase:${n}:${e}:${t}`}class Le{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=dt(this.userKey,i.apiKey,s),this.fullPersistenceKey=dt("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await gt(this.auth,{idToken:e}).catch(()=>{});return t?Z._fromGetAccountInfoResponse(this.auth,t,e):null}return Z._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Le(ie(Cn),e,r);const i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||ie(Cn);const o=dt(r,e.config.apiKey,e.name);let a=null;for(const l of t)try{const h=await l._get(o);if(h){let u;if(typeof h=="string"){const d=await gt(e,{idToken:h}).catch(()=>{});if(!d)break;u=await Z._fromGetAccountInfoResponse(e,d,h)}else u=Z._fromJSON(e,h);l!==s&&(a=u),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Le(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new Le(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Er(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(wr(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Sr(e))return"Blackberry";if(Cr(e))return"Webos";if(Ir(e))return"Safari";if((e.includes("chrome/")||vr(e))&&!e.includes("edge/"))return"Chrome";if(Tr(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function wr(n=j()){return/firefox\//i.test(n)}function Ir(n=j()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function vr(n=j()){return/crios\//i.test(n)}function Er(n=j()){return/iemobile/i.test(n)}function Tr(n=j()){return/android/i.test(n)}function Sr(n=j()){return/blackberry/i.test(n)}function Cr(n=j()){return/webos/i.test(n)}function $t(n=j()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function _o(n=j()){var e;return $t(n)&&!!((e=window.navigator)!=null&&e.standalone)}function bo(){return Ni()&&document.documentMode===10}function kr(n=j()){return $t(n)||Tr(n)||Cr(n)||Sr(n)||/windows phone/i.test(n)||Er(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(n,e=[]){let t;switch(n){case"Browser":t=kn(j());break;case"Worker":t=`${kn(j())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${nt}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wo(n,e={}){return ze(n,"GET","/v2/passwordPolicy",Zt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io=6;class vo{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Io,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new An(this),this.idTokenSubscription=new An(this),this.beforeStateQueue=new yo(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=fr,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ie(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Le.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await gt(this,{idToken:e}),r=await Z._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(ne(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,a=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await _t(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=no()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ne(this.app))return Promise.reject(we(this));const t=e?ve(e):null;return t&&v(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ne(this.app)?Promise.reject(we(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ne(this.app)?Promise.reject(we(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ie(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await wo(this),t=new vo(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new et("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await go(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ie(e)||this._popupRedirectResolver;v(t,this,"argument-error"),this.redirectPersistenceManager=await Le.create(this,[ie(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(v(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ar(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(ne(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&$s(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function en(n){return ve(n)}class An{constructor(e){this.auth=e,this.observer=null,this.addObserver=Fi(t=>this.observer=t)}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function To(n){tn=n}function So(n){return tn.loadJS(n)}function Co(){return tn.gapiScript}function ko(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ao(n,e){const t=cr(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Ue(s,e??{}))return i;oe(i,"already-initialized")}return t.initialize({options:e})}function Po(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ie);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ro(n,e,t){const r=en(n);v(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Pr(e),{host:o,port:a}=No(e),c=a===null?"":`:${a}`,l={url:`${s}//${o}${c}/`},h=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){v(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),v(Ue(l,r.config.emulator)&&Ue(h,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,It(o)?(Ei(`${s}//${o}${c}`),Ci("Auth",!0)):Oo()}function Pr(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function No(n){const e=Pr(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Pn(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Pn(o)}}}function Pn(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Oo(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return re("not implemented")}_getIdTokenResponse(e){return re("not implemented")}_linkToIdToken(e,t){return re("not implemented")}_getReauthenticationResolver(e){return re("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Me(n,e){return oo(n,"POST","/v1/accounts:signInWithIdp",Zt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do="http://localhost";class Ie extends Rr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ie(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):oe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const o=new Ie(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Me(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Me(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Me(e,t)}buildRequest(){const e={requestUri:Do,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=tt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it extends Nr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue extends it{constructor(){super("facebook.com")}static credential(e){return Ie._fromParams({providerId:ue.PROVIDER_ID,signInMethod:ue.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ue.credentialFromTaggedObject(e)}static credentialFromError(e){return ue.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ue.credential(e.oauthAccessToken)}catch{return null}}}ue.FACEBOOK_SIGN_IN_METHOD="facebook.com";ue.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de extends it{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ie._fromParams({providerId:de.PROVIDER_ID,signInMethod:de.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return de.credentialFromTaggedObject(e)}static credentialFromError(e){return de.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return de.credential(t,r)}catch{return null}}}de.GOOGLE_SIGN_IN_METHOD="google.com";de.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he extends it{constructor(){super("github.com")}static credential(e){return Ie._fromParams({providerId:he.PROVIDER_ID,signInMethod:he.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return he.credentialFromTaggedObject(e)}static credentialFromError(e){return he.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return he.credential(e.oauthAccessToken)}catch{return null}}}he.GITHUB_SIGN_IN_METHOD="github.com";he.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe extends it{constructor(){super("twitter.com")}static credential(e,t){return Ie._fromParams({providerId:fe.PROVIDER_ID,signInMethod:fe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return fe.credentialFromTaggedObject(e)}static credentialFromError(e){return fe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return fe.credential(t,r)}catch{return null}}}fe.TWITTER_SIGN_IN_METHOD="twitter.com";fe.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await Z._fromIdTokenResponse(e,r,i),o=Rn(r);return new Fe({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Rn(r);return new Fe({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Rn(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends _e{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,bt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new bt(e,t,r,i)}}function Or(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?bt._fromErrorAndOperation(n,s,e,r):s})}async function Lo(n,e,t=!1){const r=await $e(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Fe._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mo(n,e,t=!1){const{auth:r}=n;if(ne(r.app))return Promise.reject(we(r));const i="reauthenticate";try{const s=await $e(n,Or(r,i,e,n),t);v(s.idToken,r,"internal-error");const o=Qt(s.idToken);v(o,r,"internal-error");const{sub:a}=o;return v(n.uid===a,r,"user-mismatch"),Fe._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&oe(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uo(n,e,t=!1){if(ne(n.app))return Promise.reject(we(n));const r="signIn",i=await Or(n,r,e),s=await Fe._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function Bo(n,e,t,r){return ve(n).onIdTokenChanged(e,t,r)}function Fo(n,e,t){return ve(n).beforeAuthStateChanged(e,t)}function Vo(n,e,t,r){return ve(n).onAuthStateChanged(e,t,r)}const yt="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(yt,"1"),this.storage.removeItem(yt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho=1e3,Wo=10;class Lr extends Dr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=kr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);bo()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Wo):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Ho)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Lr.type="LOCAL";const zo=Lr;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr extends Dr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Mr.type="SESSION";const Ur=Mr;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jo(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new vt(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(t.origin,s)),c=await jo(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}vt.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=nn("",20);i.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(u){const d=u;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(d.data.response);break;default:clearTimeout(h),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(){return window}function qo(n){te().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(){return typeof te().WorkerGlobalScope<"u"&&typeof te().importScripts=="function"}async function xo(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ko(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Jo(){return Br()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr="firebaseLocalStorageDb",Xo=1,wt="firebaseLocalStorage",Vr="fbase_key";class st{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Et(n,e){return n.transaction([wt],e?"readwrite":"readonly").objectStore(wt)}function Yo(){const n=indexedDB.deleteDatabase(Fr);return new st(n).toPromise()}function qt(){const n=indexedDB.open(Fr,Xo);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(wt,{keyPath:Vr})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(wt)?e(r):(r.close(),await Yo(),e(await qt()))})})}async function Nn(n,e,t){const r=Et(n,!0).put({[Vr]:e,value:t});return new st(r).toPromise()}async function Zo(n,e){const t=Et(n,!1).get(e),r=await new st(t).toPromise();return r===void 0?null:r.value}function On(n,e){const t=Et(n,!0).delete(e);return new st(t).toPromise()}const Qo=800,$o=3;class Hr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await qt(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>$o)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Br()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=vt._getInstance(Jo()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await xo(),!this.activeServiceWorker)return;this.sender=new Go(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ko()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await qt();return await Nn(e,yt,"1"),await On(e,yt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Nn(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Zo(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>On(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Et(i,!1).getAll();return new st(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Qo)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Hr.type="LOCAL";const ea=Hr;new rt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ta(n,e){return e?ie(e):(v(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends Rr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Me(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Me(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Me(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function na(n){return Uo(n.auth,new rn(n),n.bypassAuthState)}function ra(n){const{auth:e,user:t}=n;return v(t,e,"internal-error"),Mo(t,new rn(n),n.bypassAuthState)}async function ia(n){const{auth:e,user:t}=n;return v(t,e,"internal-error"),Lo(t,new rn(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return na;case"linkViaPopup":case"linkViaRedirect":return ia;case"reauthViaPopup":case"reauthViaRedirect":return ra;default:oe(this.auth,"internal-error")}}resolve(e){ae(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ae(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa=new rt(2e3,1e4);class Re extends Wr{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Re.currentPopupAction&&Re.currentPopupAction.cancel(),Re.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){ae(this.filter.length===1,"Popup operations only handle one event");const e=nn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ee(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ee(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Re.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ee(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,sa.get())};e()}}Re.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa="pendingRedirect",ht=new Map;class aa extends Wr{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ht.get(this.auth._key());if(!e){try{const r=await ca(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ht.set(this.auth._key(),e)}return this.bypassAuthState||ht.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ca(n,e){const t=da(e),r=ua(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function la(n,e){ht.set(n._key(),e)}function ua(n){return ie(n._redirectPersistence)}function da(n){return dt(oa,n.config.apiKey,n.name)}async function ha(n,e,t=!1){if(ne(n.app))return Promise.reject(we(n));const r=en(n),i=ta(r,e),o=await new aa(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa=10*60*1e3;class pa{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ma(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!zr(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(ee(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=fa&&this.cachedEventUids.clear(),this.cachedEventUids.has(Dn(e))}saveEventToCache(e){this.cachedEventUids.add(Dn(e)),this.lastProcessedEventTime=Date.now()}}function Dn(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function zr({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function ma(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return zr(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ga(n,e={}){return ze(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ba=/^https?/;async function ya(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ga(n);for(const t of e)try{if(wa(t))return}catch{}oe(n,"unauthorized-domain")}function wa(n){const e=jt(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!ba.test(t))return!1;if(_a.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia=new rt(3e4,6e4);function Ln(){const n=te().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function va(n){return new Promise((e,t)=>{var i,s,o;function r(){Ln(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ln(),t(ee(n,"network-request-failed"))},timeout:Ia.get()})}if((s=(i=te().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=te().gapi)!=null&&o.load)r();else{const a=ko("iframefcb");return te()[a]=()=>{gapi.load?r():t(ee(n,"network-request-failed"))},So(`${Co()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw ft=null,e})}let ft=null;function Ea(n){return ft=ft||va(n),ft}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ta=new rt(5e3,15e3),Sa="__/auth/iframe",Ca="emulator/auth/iframe",ka={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Aa=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Pa(n){const e=n.config;v(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Yt(e,Ca):`https://${n.config.authDomain}/${Sa}`,r={apiKey:e.apiKey,appName:n.name,v:nt},i=Aa.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${tt(r).slice(1)}`}async function Ra(n){const e=await Ea(n),t=te().gapi;return v(t,n,"internal-error"),e.open({where:document.body,url:Pa(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ka,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=ee(n,"network-request-failed"),a=te().setTimeout(()=>{s(o)},Ta.get());function c(){te().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Na={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Oa=500,Da=600,La="_blank",Ma="http://localhost";class Mn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Ua(n,e,t,r=Oa,i=Da){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...Na,width:r.toString(),height:i.toString(),top:s,left:o},l=j().toLowerCase();t&&(a=vr(l)?La:t),wr(l)&&(e=e||Ma,c.scrollbars="yes");const h=Object.entries(c).reduce((d,[_,g])=>`${d}${_}=${g},`,"");if(_o(l)&&a!=="_self")return Ba(e||"",a),new Mn(null);const u=window.open(e||"",a,h);v(u,n,"popup-blocked");try{u.focus()}catch{}return new Mn(u)}function Ba(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa="__/auth/handler",Va="emulator/auth/handler",Ha=encodeURIComponent("fac");async function Un(n,e,t,r,i,s){v(n.config.authDomain,n,"auth-domain-config-required"),v(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:nt,eventId:i};if(e instanceof Nr){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Bi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,u]of Object.entries({}))o[h]=u}if(e instanceof it){const h=e.getScopes().filter(u=>u!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await n._getAppCheckToken(),l=c?`#${Ha}=${encodeURIComponent(c)}`:"";return`${Wa(n)}?${tt(a).slice(1)}${l}`}function Wa({config:n}){return n.emulator?Yt(n,Va):`https://${n.authDomain}/${Fa}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt="webStorageSupport";class za{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ur,this._completeRedirectFn=ha,this._overrideRedirectResult=la}async _openPopup(e,t,r,i){var o;ae((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await Un(e,t,r,jt(),i);return Ua(e,s,nn())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Un(e,t,r,jt(),i);return qo(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(ae(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Ra(e),r=new pa(e);return t.register("authEvent",i=>(v(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Lt,{type:Lt},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[Lt];s!==void 0&&t(!!s),oe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ya(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return kr()||Ir()||$t()}}const ja=za;var Bn="@firebase/auth",Fn="1.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qa(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function xa(n){Ze(new Be("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;v(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ar(n)},l=new Eo(r,i,s,c);return Po(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ze(new Be("auth-internal",e=>{const t=en(e.getProvider("auth").getImmediate());return(r=>new Ga(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Oe(Bn,Fn,qa(n)),Oe(Bn,Fn,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka=5*60,Ja=ir("authIdTokenMaxAge")||Ka;let Vn=null;const Xa=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Ja)return;const i=t==null?void 0:t.token;Vn!==i&&(Vn=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Ya(n=Vs()){const e=cr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Ao(n,{popupRedirectResolver:ja,persistence:[ea,zo,Ur]}),r=ir("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=Xa(s.toString());Fo(t,o,()=>o(t.currentUser)),Bo(t,a=>o(a))}}const i=Ii("auth");return i&&Ro(t,`http://${i}`),t}function Za(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}To({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=ee("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Za().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});xa("Browser");const Qa={apiKey:"AIzaSyC0lb9VsaR09vuhPI1tVpmi_vtP9IMGwVM",authDomain:"noogler-490414.firebaseapp.com",databaseURL:"https://noogler-490414-default-rtdb.firebaseio.com",projectId:"noogler-490414",storageBucket:"noogler-490414.firebasestorage.app",messagingSenderId:"265815053881",appId:"1:265815053881:web:0bfa8a367670f4b04a1fe8",measurementId:"G-BR5XWXZRVK"},$a=lr(Qa),ec=Ya($a);function Hn(n){let e,t,r,i,s,o,a,c,l,h,u,d,_,g,I,L,A;return{c(){e=b("div"),t=b("div"),r=b("h2"),r.textContent="Noogler",i=N(),s=b("p"),o=U("ongoing call - "),a=U(n[2]),c=N(),l=b("div"),h=b("div"),u=N(),d=b("div"),_=b("button"),_.innerHTML='<span class="material-symbols-outlined">close</span>',g=N(),I=b("button"),I.innerHTML='<span class="material-symbols-outlined">call_end</span>',p(s,"class","call-overlay-status"),p(t,"class","call-overlay-header"),p(h,"class","mic-indicator"),T(h,"transform","scale("+(1+n[0]*.8)+")"),T(h,"opacity",.3+n[0]*.7),T(h,"width","120px"),T(h,"height","120px"),T(h,"border-radius","50%"),T(h,"background-color","var(--accent)"),T(h,"transition","transform 0.05s linear, opacity 0.05s linear"),p(l,"class","call-overlay-content"),T(l,"display","flex"),T(l,"justify-content","center"),T(l,"align-items","center"),T(l,"height","100%"),p(_,"type","button"),p(_,"class","call-overlay-action"),p(_,"aria-label","Close overlay"),p(I,"type","button"),p(I,"class","call-overlay-action call-overlay-end"),p(I,"aria-label","End call"),T(I,"background-color","#ff4d4d"),T(I,"color","white"),p(d,"class","call-overlay-actions"),p(e,"class","call-overlay"),p(e,"role","dialog"),p(e,"aria-label","Ongoing call")},m(E,O){k(E,e,O),f(e,t),f(t,r),f(t,i),f(t,s),f(s,o),f(s,a),f(e,c),f(e,l),f(l,h),f(e,u),f(e,d),f(d,_),f(d,g),f(d,I),L||(A=[x(_,"click",function(){J(n[3])&&n[3].apply(this,arguments)}),x(I,"click",function(){J(n[4])&&n[4].apply(this,arguments)})],L=!0)},p(E,O){n=E,O&4&&z(a,n[2]),O&1&&T(h,"transform","scale("+(1+n[0]*.8)+")"),O&1&&T(h,"opacity",.3+n[0]*.7)},d(E){E&&S(e),L=!1,ge(A)}}}function tc(n){let e,t=n[1]&&Hn(n);return{c(){t&&t.c(),e=xt()},m(r,i){t&&t.m(r,i),k(r,e,i)},p(r,[i]){r[1]?t?t.p(r,i):(t=Hn(r),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:q,o:q,d(r){r&&S(e),t&&t.d(r)}}}function nc(n){let e="",t=new Uint8Array(n);for(let r=0;r<t.byteLength;r++)e+=String.fromCharCode(t[r]);return window.btoa(e)}function rc(n,e,t){let{visible:r=!1}=e,{ws:i=null}=e,{elapsedLabel:s="0:00"}=e,{onClose:o=()=>{}}=e,{onEnd:a=()=>{}}=e,c,l,h,u,d,{micVolume:_=0}=e,g=0,I=!1;const L=w=>{try{const C=JSON.parse(w.data);C.type==="audio_reply"&&r&&c&&A(C.data)}catch{}};function A(w){const C=window.atob(w),R=new Uint8Array(C.length);for(let W=0;W<C.length;W++)R[W]=C.charCodeAt(W);const B=new Int16Array(R.buffer),D=new Float32Array(B.length);for(let W=0;W<B.length;W++)D[W]=B[W]/32768;const P=c.createBuffer(1,D.length,16e3);P.getChannelData(0).set(D);const m=c.createBufferSource();m.buffer=P,m.connect(c.destination);const y=c.currentTime;g<y&&(g=y+.05),m.start(g),g+=P.duration}function E(){if(!u)return;const w=new Uint8Array(u.frequencyBinCount);u.getByteTimeDomainData(w);let C=0;for(let B=0;B<w.length;B++){const D=(w[B]-128)/128;C+=D*D}const R=Math.sqrt(C/w.length);t(0,_=_*.8+Math.min(1,R*5)*.2),d=requestAnimationFrame(E)}async function O(){if(!c){i.send(JSON.stringify({type:"start_call"}));try{l=await navigator.mediaDevices.getUserMedia({audio:!0}),c=new(window.AudioContext||window.webkitAudioContext)({sampleRate:16e3}),g=c.currentTime,await c.audioWorklet.addModule("/pcm-processor.js");const w=c.createMediaStreamSource(l);h=new AudioWorkletNode(c,"pcm-processor"),h.port.onmessage=C=>{if(!r||!i||i.readyState!==1)return;const R=nc(C.data);i.send(JSON.stringify({type:"audio_chunk",data:R}))},u=c.createAnalyser(),u.fftSize=256,w.connect(u),E(),w.connect(h)}catch(w){console.error("Microphone access failed:",w)}}}function M(){i&&i.readyState===1&&I&&(i.send(JSON.stringify({type:"end_call"})),i.removeEventListener("message",L),t(6,I=!1)),d&&(cancelAnimationFrame(d),d=null),t(0,_=0),h&&(h.disconnect(),h=null),l&&(l.getTracks().forEach(w=>w.stop()),l=null),c&&(c.close(),c=null)}return Zn(()=>M()),n.$$set=w=>{"visible"in w&&t(1,r=w.visible),"ws"in w&&t(5,i=w.ws),"elapsedLabel"in w&&t(2,s=w.elapsedLabel),"onClose"in w&&t(3,o=w.onClose),"onEnd"in w&&t(4,a=w.onEnd),"micVolume"in w&&t(0,_=w.micVolume)},n.$$.update=()=>{n.$$.dirty&98&&(r&&i&&i.readyState===1?(I||(i.addEventListener("message",L),t(6,I=!0)),O()):r||M())},[_,r,s,o,a,i,I]}class ic extends We{constructor(e){super(),He(this,e,rc,tc,Ve,{visible:1,ws:5,elapsedLabel:2,onClose:3,onEnd:4,micVolume:0})}}function Wn(n){let e,t;return{c(){e=b("div"),t=b("div"),p(t,"class","call-pulse-bg"),p(e,"class","call-pulse-wrapper"),T(e,"transform","scale("+(1+n[5]*1.2)+")"),T(e,"opacity",.8+n[5]*.2)},m(r,i){k(r,e,i),f(e,t)},p(r,i){i&32&&T(e,"transform","scale("+(1+r[5]*1.2)+")"),i&32&&T(e,"opacity",.8+r[5]*.2)},d(r){r&&S(e)}}}function sc(n){let e,t,r,i,s,o,a,c,l,h,u,d,_,g,I=n[1]?"call_end":"call",L,A,E,O,M,w,C=n[1]&&Wn(n);return{c(){e=b("header"),t=b("div"),r=b("div"),i=b("button"),s=b("div"),o=b("div"),o.innerHTML='<span class="material-symbols-outlined wa-info-icon">info</span> <h2>Noogler</h2>',a=N(),c=b("p"),l=U(n[0]),h=N(),u=b("div"),C&&C.c(),d=N(),_=b("button"),g=b("span"),L=U(I),T(o,"display","flex"),T(o,"align-items","center"),T(o,"gap","6px"),p(c,"class","wa-status-line"),T(s,"display","flex"),T(s,"flex-direction","column"),T(s,"align-items","flex-start"),p(i,"type","button"),p(i,"class","wa-title-btn"),p(i,"aria-label","Open agent details"),p(t,"class","wa-toolbar"),p(g,"class","material-symbols-outlined"),p(g,"style",A=n[1]?"color: white !important;":""),p(_,"type","button"),p(_,"class","wa-icon-btn call-toggle"),p(_,"style",E="z-index: 1; "+(n[1]?"background-color: #ff4d4d; color: white !important;":"")),p(_,"aria-label",O=n[1]?"End call":"Start call"),un(_,"call-active",n[1]),p(u,"class","wa-header-actions"),T(u,"position","relative"),T(u,"display","grid"),T(u,"place-items","center"),p(e,"class","wa-header")},m(R,B){k(R,e,B),f(e,t),f(t,r),f(r,i),f(i,s),f(s,o),f(s,a),f(s,c),f(c,l),f(e,h),f(e,u),C&&C.m(u,null),f(u,d),f(u,_),f(_,g),f(g,L),M||(w=[x(i,"click",ln(function(){J(n[2])&&n[2].apply(this,arguments)})),x(_,"click",ln(function(){J(n[3])&&n[3].apply(this,arguments)})),x(e,"click",function(){J(n[4])&&n[4].apply(this,arguments)})],M=!0)},p(R,[B]){n=R,B&1&&z(l,n[0]),n[1]?C?C.p(n,B):(C=Wn(n),C.c(),C.m(u,d)):C&&(C.d(1),C=null),B&2&&I!==(I=n[1]?"call_end":"call")&&z(L,I),B&2&&A!==(A=n[1]?"color: white !important;":"")&&p(g,"style",A),B&2&&E!==(E="z-index: 1; "+(n[1]?"background-color: #ff4d4d; color: white !important;":""))&&p(_,"style",E),B&2&&O!==(O=n[1]?"End call":"Start call")&&p(_,"aria-label",O),B&2&&un(_,"call-active",n[1])},i:q,o:q,d(R){R&&S(e),C&&C.d(),M=!1,ge(w)}}}function oc(n,e,t){let{statusLine:r=""}=e,{callActive:i=!1}=e,{onOpenPanel:s=()=>{}}=e,{onToggleCall:o=()=>{}}=e,{onHeaderClick:a=()=>{}}=e,{micVolume:c=0}=e;return n.$$set=l=>{"statusLine"in l&&t(0,r=l.statusLine),"callActive"in l&&t(1,i=l.callActive),"onOpenPanel"in l&&t(2,s=l.onOpenPanel),"onToggleCall"in l&&t(3,o=l.onToggleCall),"onHeaderClick"in l&&t(4,a=l.onHeaderClick),"micVolume"in l&&t(5,c=l.micVolume)},[r,i,s,o,a,c]}class ac extends We{constructor(e){super(),He(this,e,oc,sc,Ve,{statusLine:0,callActive:1,onOpenPanel:2,onToggleCall:3,onHeaderClick:4,micVolume:5})}}function zn(n,e,t){const r=n.slice();return r[4]=e[t],r[6]=t,r}function cc(n){let e,t=dn(n[1]),r=[];for(let i=0;i<t.length;i+=1)r[i]=xn(zn(n,t,i));return{c(){for(let i=0;i<r.length;i+=1)r[i].c();e=xt()},m(i,s){for(let o=0;o<r.length;o+=1)r[o]&&r[o].m(i,s);k(i,e,s)},p(i,s){if(s&6){t=dn(i[1]);let o;for(o=0;o<t.length;o+=1){const a=zn(i,t,o);r[o]?r[o].p(a,s):(r[o]=xn(a),r[o].c(),r[o].m(e.parentNode,e))}for(;o<r.length;o+=1)r[o].d(1);r.length=t.length}},d(i){i&&S(e),ni(r,i)}}}function lc(n){let e;return{c(){e=b("div"),e.innerHTML="<h3>No events yet</h3> <p>Send a command to see replies from the local body.</p>",p(e,"class","wa-empty")},m(t,r){k(t,e,r)},p:q,d(t){t&&S(e)}}}function jn(n){let e,t=(n[4].type==="outgoing"?n[2]:"Agent")+"",r;return{c(){e=b("div"),r=U(t),p(e,"class","wa-bubble-tag")},m(i,s){k(i,e,s),f(e,r)},p(i,s){s&6&&t!==(t=(i[4].type==="outgoing"?i[2]:"Agent")+"")&&z(r,t)},d(i){i&&S(e)}}}function uc(n){let e,t=n[4].instruction+"",r,i,s,o,a=n[4].status+"",c,l,h=n[4].tag+"",u,d,_,g,I=n[4].detail+"",L,A,E,O,M,w,C=n[4].duration_ms+"",R,B,D=n[4].screenshot_path&&Gn(n),P=n[4].screenshot_data_url&&qn(n);return{c(){e=b("strong"),r=U(t),i=N(),s=b("small"),o=U("Status: "),c=U(a),l=U(" - Tag: "),u=U(h),d=N(),_=b("small"),g=U("Detail: "),L=U(I),A=N(),D&&D.c(),E=N(),P&&P.c(),O=N(),M=b("small"),w=U("Duration: "),R=U(C),B=U(" ms")},m(m,y){k(m,e,y),f(e,r),k(m,i,y),k(m,s,y),f(s,o),f(s,c),f(s,l),f(s,u),k(m,d,y),k(m,_,y),f(_,g),f(_,L),k(m,A,y),D&&D.m(m,y),k(m,E,y),P&&P.m(m,y),k(m,O,y),k(m,M,y),f(M,w),f(M,R),f(M,B)},p(m,y){y&2&&t!==(t=m[4].instruction+"")&&z(r,t),y&2&&a!==(a=m[4].status+"")&&z(c,a),y&2&&h!==(h=m[4].tag+"")&&z(u,h),y&2&&I!==(I=m[4].detail+"")&&z(L,I),m[4].screenshot_path?D?D.p(m,y):(D=Gn(m),D.c(),D.m(E.parentNode,E)):D&&(D.d(1),D=null),m[4].screenshot_data_url?P?P.p(m,y):(P=qn(m),P.c(),P.m(O.parentNode,O)):P&&(P.d(1),P=null),y&2&&C!==(C=m[4].duration_ms+"")&&z(R,C)},d(m){m&&(S(e),S(i),S(s),S(d),S(_),S(A),S(E),S(O),S(M)),D&&D.d(m),P&&P.d(m)}}}function dc(n){let e,t,r,i=n[4].payload+"",s;return{c(){e=b("strong"),e.textContent="Raw",t=N(),r=b("small"),s=U(i)},m(o,a){k(o,e,a),k(o,t,a),k(o,r,a),f(r,s)},p(o,a){a&2&&i!==(i=o[4].payload+"")&&z(s,i)},d(o){o&&(S(e),S(t),S(r))}}}function hc(n){let e,t,r,i=n[4].error+"",s;return{c(){e=b("strong"),e.textContent="Error",t=N(),r=b("small"),s=U(i)},m(o,a){k(o,e,a),k(o,t,a),k(o,r,a),f(r,s)},p(o,a){a&2&&i!==(i=o[4].error+"")&&z(s,i)},d(o){o&&(S(e),S(t),S(r))}}}function fc(n){let e,t,r,i,s=n[4].ts_ms+"",o;return{c(){e=b("strong"),e.textContent="Pong",t=N(),r=b("small"),i=U("ts_ms: "),o=U(s)},m(a,c){k(a,e,c),k(a,t,c),k(a,r,c),f(r,i),f(r,o)},p(a,c){c&2&&s!==(s=a[4].ts_ms+"")&&z(o,s)},d(a){a&&(S(e),S(t),S(r))}}}function pc(n){let e,t=n[4].text+"",r;return{c(){e=b("span"),r=U(t),T(e,"font-size","1.1em"),T(e,"white-space","pre-wrap")},m(i,s){k(i,e,s),f(e,r)},p(i,s){s&2&&t!==(t=i[4].text+"")&&z(r,t)},d(i){i&&S(e)}}}function mc(n){let e,t=(n[4].text??n[4].instruction)+"",r,i,s,o,a=n[4].tag+"",c;return{c(){e=b("strong"),r=U(t),i=N(),s=b("small"),o=U("Tag: "),c=U(a)},m(l,h){k(l,e,h),f(e,r),k(l,i,h),k(l,s,h),f(s,o),f(s,c)},p(l,h){h&2&&t!==(t=(l[4].text??l[4].instruction)+"")&&z(r,t),h&2&&a!==(a=l[4].tag+"")&&z(c,a)},d(l){l&&(S(e),S(i),S(s))}}}function Gn(n){let e,t,r=n[4].screenshot_path+"",i;return{c(){e=b("small"),t=U("Path: "),i=U(r)},m(s,o){k(s,e,o),f(e,t),f(e,i)},p(s,o){o&2&&r!==(r=s[4].screenshot_path+"")&&z(i,r)},d(s){s&&S(e)}}}function qn(n){let e,t;return{c(){e=b("img"),p(e,"class","wa-bubble-image"),an(e.src,t=n[4].screenshot_data_url)||p(e,"src",t),p(e,"alt","Screenshot"),p(e,"loading","lazy")},m(r,i){k(r,e,i)},p(r,i){i&2&&!an(e.src,t=r[4].screenshot_data_url)&&p(e,"src",t)},d(r){r&&S(e)}}}function xn(n){let e,t,r,i,s,o,a=(n[6]===0||n[1][n[6]-1].type!==n[4].type)&&jn(n);function c(u,d){return u[4].type==="outgoing"?mc:u[4].type==="chat_reply"?pc:u[4].type==="pong"?fc:u[4].type==="error"?hc:u[4].type==="raw"?dc:uc}let l=c(n),h=l(n);return{c(){e=b("div"),a&&a.c(),t=N(),r=b("div"),h.c(),s=N(),p(r,"class",i="wa-bubble "+(n[4].type==="outgoing"?"from-me":"from-body")+" "+(n[4].status==="error"?"error":"ok")),p(e,"class",o="wa-bubble-wrap "+(n[4].type==="outgoing"?"from-me":"from-body"))},m(u,d){k(u,e,d),a&&a.m(e,null),f(e,t),f(e,r),h.m(r,null),f(e,s)},p(u,d){u[6]===0||u[1][u[6]-1].type!==u[4].type?a?a.p(u,d):(a=jn(u),a.c(),a.m(e,t)):a&&(a.d(1),a=null),l===(l=c(u))&&h?h.p(u,d):(h.d(1),h=l(u),h&&(h.c(),h.m(r,null))),d&2&&i!==(i="wa-bubble "+(u[4].type==="outgoing"?"from-me":"from-body")+" "+(u[4].status==="error"?"error":"ok"))&&p(r,"class",i),d&2&&o!==(o="wa-bubble-wrap "+(u[4].type==="outgoing"?"from-me":"from-body"))&&p(e,"class",o)},d(u){u&&S(e),a&&a.d(),h.d()}}}function gc(n){let e;function t(s,o){return s[1].length===0?lc:cc}let r=t(n),i=r(n);return{c(){e=b("section"),i.c(),p(e,"class","wa-feed")},m(s,o){k(s,e,o),i.m(e,null),n[3](e)},p(s,[o]){r===(r=t(s))&&i?i.p(s,o):(i.d(1),i=r(s),i&&(i.c(),i.m(e,null)))},i:q,o:q,d(s){s&&S(e),i.d(),n[3](null)}}}function _c(n,e,t){let{events:r=[]}=e,{feedEl:i}=e,{userName:s="User"}=e;function o(a){le[a?"unshift":"push"](()=>{i=a,t(0,i)})}return n.$$set=a=>{"events"in a&&t(1,r=a.events),"feedEl"in a&&t(0,i=a.feedEl),"userName"in a&&t(2,s=a.userName)},[i,r,s,o]}class bc extends We{constructor(e){super(),He(this,e,_c,gc,Ve,{events:1,feedEl:0,userName:2})}}function yc(n){let e,t,r,i,s,o,a,c,l,h;return{c(){e=b("div"),t=b("form"),r=b("input"),i=N(),s=b("button"),o=cn("svg"),a=cn("path"),p(r,"id","noogler-input"),p(r,"name","noogler-input"),p(r,"placeholder","Message Noogler..."),p(r,"autocomplete","off"),p(r,"autocorrect","off"),p(r,"autocapitalize","off"),p(r,"spellcheck","false"),p(a,"d","M3.4 20.6 21 12 3.4 3.4l-.6 6.7 10.1 1.9-10.1 1.9.6 6.7Z"),p(o,"viewBox","0 0 24 24"),p(o,"aria-hidden","true"),p(o,"focusable","false"),p(s,"type","submit"),p(s,"class","wa-send"),s.disabled=c=!n[1],p(s,"aria-label","Send"),p(t,"class","wa-input"),p(e,"class","wa-footer")},m(u,d){k(u,e,d),f(e,t),f(t,r),Pe(r,n[0]),f(t,i),f(t,s),f(s,o),f(o,a),l||(h=[x(r,"input",n[3]),x(t,"submit",ri(function(){J(n[2])&&n[2].apply(this,arguments)}))],l=!0)},p(u,[d]){n=u,d&1&&r.value!==n[0]&&Pe(r,n[0]),d&2&&c!==(c=!n[1])&&(s.disabled=c)},i:q,o:q,d(u){u&&S(e),l=!1,ge(h)}}}function wc(n,e,t){let{instruction:r=""}=e,{connected:i=!1}=e,{onSubmit:s=()=>{}}=e;function o(){r=this.value,t(0,r)}return n.$$set=a=>{"instruction"in a&&t(0,r=a.instruction),"connected"in a&&t(1,i=a.connected),"onSubmit"in a&&t(2,s=a.onSubmit)},[r,i,s,o]}class Ic extends We{constructor(e){super(),He(this,e,wc,yc,Ve,{instruction:0,connected:1,onSubmit:2})}}function Kn(n){let e,t,r,i,s,o,a,c,l,h,u,d=n[3]?"Connected":"Disconnected",_,g,I,L,A,E,O,M,w,C,R,B,D,P,m,y,W,X,Q,$,H=n[4]&&Jn(n);function ot(Y,K){return Y[3]?vc:Ec}let Ee=ot(n),G=Ee(n);return{c(){e=b("div"),t=b("div"),r=b("button"),r.textContent="×",i=N(),s=b("div"),s.innerHTML='<h1>Noogler Dashboard</h1> <p style="opacity: 0.6; font-size: 0.9rem;">Configure your connection and monitor status</p>',o=N(),a=b("div"),c=b("div"),h=N(),u=b("span"),_=U(d),g=N(),I=b("div"),L=b("label"),L.textContent="Server WebSocket URL",A=N(),E=b("input"),O=N(),M=b("div"),w=b("label"),w.textContent="Agent Tag",C=N(),R=b("input"),B=N(),H&&H.c(),D=N(),P=b("div"),G.c(),m=N(),y=b("button"),W=U("Test Ping"),p(r,"type","button"),p(r,"class","wa-panel-close"),p(r,"aria-label","Close panel"),p(s,"class","panel-header"),p(c,"class",l="wa-status-dot "+(n[3]?"online":"offline")),p(a,"class","wa-status-row"),p(L,"for","ws-url"),p(E,"id","ws-url"),p(E,"placeholder","ws://..."),p(I,"class","wa-settings-group"),p(w,"for","agent-tag"),p(R,"id","agent-tag"),p(R,"placeholder","e.g. ws, dev, test"),p(M,"class","wa-settings-group"),p(y,"class","btn secondary"),y.disabled=X=!n[3],T(y,"padding","10px"),T(y,"background","rgba(0,0,0,0.05)"),T(y,"border","1px solid rgba(0,0,0,0.1)"),T(P,"display","grid"),T(P,"grid-template-columns","1fr 1fr"),T(P,"gap","12px"),T(P,"margin-top","auto"),p(t,"class","wa-panel"),p(e,"class","wa-overlay")},m(Y,K){k(Y,e,K),f(e,t),f(t,r),f(t,i),f(t,s),f(t,o),f(t,a),f(a,c),f(a,h),f(a,u),f(u,_),f(t,g),f(t,I),f(I,L),f(I,A),f(I,E),Pe(E,n[0]),f(t,O),f(t,M),f(M,w),f(M,C),f(M,R),Pe(R,n[1]),f(t,B),H&&H.m(t,null),f(t,D),f(t,P),G.m(P,null),f(P,m),f(P,y),f(y,W),Q||($=[x(r,"click",function(){J(n[5])&&n[5].apply(this,arguments)}),x(E,"input",n[9]),x(R,"input",n[10]),x(y,"click",function(){J(n[8])&&n[8].apply(this,arguments)})],Q=!0)},p(Y,K){n=Y,K&8&&l!==(l="wa-status-dot "+(n[3]?"online":"offline"))&&p(c,"class",l),K&8&&d!==(d=n[3]?"Connected":"Disconnected")&&z(_,d),K&1&&E.value!==n[0]&&Pe(E,n[0]),K&2&&R.value!==n[1]&&Pe(R,n[1]),n[4]?H?H.p(n,K):(H=Jn(n),H.c(),H.m(t,D)):H&&(H.d(1),H=null),Ee===(Ee=ot(n))&&G?G.p(n,K):(G.d(1),G=Ee(n),G&&(G.c(),G.m(P,m))),K&8&&X!==(X=!n[3])&&(y.disabled=X)},d(Y){Y&&S(e),H&&H.d(),G.d(),Q=!1,ge($)}}}function Jn(n){let e,t;return{c(){e=b("div"),t=U(n[4]),p(e,"class","wa-bubble error"),T(e,"width","100%"),T(e,"max-width","100%"),T(e,"margin","0")},m(r,i){k(r,e,i),f(e,t)},p(r,i){i&16&&z(t,r[4])},d(r){r&&S(e)}}}function vc(n){let e,t,r;return{c(){e=b("button"),e.textContent="Disconnect",p(e,"class","btn secondary"),T(e,"padding","10px"),T(e,"background","rgba(0,0,0,0.05)"),T(e,"border","1px solid rgba(0,0,0,0.1)")},m(i,s){k(i,e,s),t||(r=x(e,"click",function(){J(n[7])&&n[7].apply(this,arguments)}),t=!0)},p(i,s){n=i},d(i){i&&S(e),t=!1,r()}}}function Ec(n){let e,t,r;return{c(){e=b("button"),e.textContent="Connect",p(e,"class","btn primary"),T(e,"padding","10px")},m(i,s){k(i,e,s),t||(r=x(e,"click",function(){J(n[6])&&n[6].apply(this,arguments)}),t=!0)},p(i,s){n=i},d(i){i&&S(e),t=!1,r()}}}function Tc(n){let e,t=n[2]&&Kn(n);return{c(){t&&t.c(),e=xt()},m(r,i){t&&t.m(r,i),k(r,e,i)},p(r,[i]){r[2]?t?t.p(r,i):(t=Kn(r),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:q,o:q,d(r){r&&S(e),t&&t.d(r)}}}function Sc(n,e,t){let{visible:r=!1}=e,{connected:i=!1}=e,{wsUrl:s=""}=e,{tag:o=""}=e,{lastError:a=""}=e,{onClose:c=()=>{}}=e,{onConnect:l=()=>{}}=e,{onDisconnect:h=()=>{}}=e,{onPing:u=()=>{}}=e;function d(){s=this.value,t(0,s)}function _(){o=this.value,t(1,o)}return n.$$set=g=>{"visible"in g&&t(2,r=g.visible),"connected"in g&&t(3,i=g.connected),"wsUrl"in g&&t(0,s=g.wsUrl),"tag"in g&&t(1,o=g.tag),"lastError"in g&&t(4,a=g.lastError),"onClose"in g&&t(5,c=g.onClose),"onConnect"in g&&t(6,l=g.onConnect),"onDisconnect"in g&&t(7,h=g.onDisconnect),"onPing"in g&&t(8,u=g.onPing)},[s,o,r,i,a,c,l,h,u,d,_]}class Cc extends We{constructor(e){super(),He(this,e,Sc,Tc,Ve,{visible:2,connected:3,wsUrl:0,tag:1,lastError:4,onClose:5,onConnect:6,onDisconnect:7,onPing:8})}}function kc(n){let e,t,r,i,s,o,a,c,l,h,u,d,_,g,I,L,A;r=new ac({props:{statusLine:n[13],callActive:n[1],micVolume:n[12],onOpenPanel:n[23],onToggleCall:n[15],onHeaderClick:n[16]}});function E(m){n[27](m)}let O={events:n[8],userName:n[14]};n[9]!==void 0&&(O.feedEl=n[9]),s=new bc({props:O}),le.push(()=>qe(s,"feedEl",E));function M(m){n[28](m)}let w={connected:n[0],onSubmit:n[21]};n[6]!==void 0&&(w.instruction=n[6]),c=new Ic({props:w}),le.push(()=>qe(c,"instruction",M));function C(m){n[29](m)}let R={ws:n[3],visible:n[11],elapsedLabel:n[2],onClose:n[17],onEnd:n[18]};n[12]!==void 0&&(R.micVolume=n[12]),u=new ic({props:R}),le.push(()=>qe(u,"micVolume",C));function B(m){n[30](m)}function D(m){n[31](m)}let P={visible:n[10],connected:n[0],lastError:n[5],onClose:n[24],onConnect:n[19],onDisconnect:n[20],onPing:n[22]};return n[4]!==void 0&&(P.wsUrl=n[4]),n[7]!==void 0&&(P.tag=n[7]),g=new Cc({props:P}),le.push(()=>qe(g,"wsUrl",B)),le.push(()=>qe(g,"tag",D)),{c(){e=b("div"),t=b("main"),xe(r.$$.fragment),i=N(),xe(s.$$.fragment),a=N(),xe(c.$$.fragment),h=N(),xe(u.$$.fragment),_=N(),xe(g.$$.fragment),p(t,"class","wa-main"),p(e,"class","wa-shell")},m(m,y){k(m,e,y),f(e,t),ke(r,t,null),f(t,i),ke(s,t,null),f(t,a),ke(c,t,null),f(e,h),ke(u,e,null),f(e,_),ke(g,e,null),A=!0},p(m,y){const W={};y[0]&8192&&(W.statusLine=m[13]),y[0]&2&&(W.callActive=m[1]),y[0]&4096&&(W.micVolume=m[12]),r.$set(W);const X={};y[0]&256&&(X.events=m[8]),y[0]&16384&&(X.userName=m[14]),!o&&y[0]&512&&(o=!0,X.feedEl=m[9],je(()=>o=!1)),s.$set(X);const Q={};y[0]&1&&(Q.connected=m[0]),!l&&y[0]&64&&(l=!0,Q.instruction=m[6],je(()=>l=!1)),c.$set(Q);const $={};y[0]&8&&($.ws=m[3]),y[0]&2048&&($.visible=m[11]),y[0]&4&&($.elapsedLabel=m[2]),!d&&y[0]&4096&&(d=!0,$.micVolume=m[12],je(()=>d=!1)),u.$set($);const H={};y[0]&1024&&(H.visible=m[10]),y[0]&1&&(H.connected=m[0]),y[0]&32&&(H.lastError=m[5]),!I&&y[0]&16&&(I=!0,H.wsUrl=m[4],je(()=>I=!1)),!L&&y[0]&128&&(L=!0,H.tag=m[7],je(()=>L=!1)),g.$set(H)},i(m){A||(Ce(r.$$.fragment,m),Ce(s.$$.fragment,m),Ce(c.$$.fragment,m),Ce(u.$$.fragment,m),Ce(g.$$.fragment,m),A=!0)},o(m){Ge(r.$$.fragment,m),Ge(s.$$.fragment,m),Ge(c.$$.fragment,m),Ge(u.$$.fragment,m),Ge(g.$$.fragment,m),A=!1},d(m){m&&S(e),Ae(r),Ae(s),Ae(c),Ae(u),Ae(g)}}}function Ac(n,e,t){let r,i,s,o=null,a,c="wss://noogler-265815053881.europe-west1.run.app",l=!1,h="",u,d=0,_=!0,g="",I="ws",L=1,A=[],E,O=!1,M=!1,w=!1,C=0,R=0,B=0,D;const P=()=>{t(26,R=Date.now()-C)},m=()=>{y(),P(),D=setInterval(P,1e3)},y=()=>{D&&(clearInterval(D),D=void 0)},W=V=>{const be=Math.max(0,Math.floor(V/1e3)),Zr=Math.floor(be/60),Qr=be%60;return`${Zr}:${String(Qr).padStart(2,"0")}`},X=()=>{t(1,M=!0),t(11,w=!0),C=Date.now(),t(26,R=0),m()},Q=()=>{t(1,M=!1),t(11,w=!1),y(),t(26,R=0)},$=V=>{if(V.stopPropagation(),!M){X();return}Q()},H=()=>{M&&t(11,w=!0)},ot=()=>{t(11,w=!1)},Ee=()=>{Q()},G=()=>{o&&(a&&(a.readyState===WebSocket.OPEN||a.readyState===WebSocket.CONNECTING)||(_=!0,t(5,h=""),t(3,a=new WebSocket(c)),a.addEventListener("open",()=>{t(0,l=!0),d=0,a.send(JSON.stringify({type:"frontend_handshake",user_uid:o.uid}))}),a.addEventListener("close",()=>{t(0,l=!1),sn()}),a.addEventListener("error",()=>{t(5,h="WebSocket connection failed"),sn()}),a.addEventListener("message",V=>{try{const be=JSON.parse(V.data);be.type==="history_sync"?t(8,A=[...be.events,...A].slice(-200)):t(8,A=[...A,be].slice(-200)),Tt()}catch{t(8,A=[...A,{type:"raw",payload:V.data}].slice(-200)),Tt()}})))},Y=()=>{_=!1,u&&(clearTimeout(u),u=null),a&&(a.close(),t(3,a=null))},K=()=>{if(!l||!a||!g.trim())return;const V={type:"user",index:L,text:g.trim(),tag:I.trim()||"ws"};t(8,A=[...A,{type:"outgoing",text:V.text,tag:V.tag,ts_ms:Date.now()}].slice(-200)),Tt(),a.send(JSON.stringify(V)),L+=1,t(6,g="")},jr=()=>{!l||!a||a.send(JSON.stringify({type:"ping"}))},sn=()=>{if(!_||u)return;const V=Math.min(1e4,500*(d+1));d+=1,u=setTimeout(()=>{u=null,G()},V)},Tt=()=>{requestAnimationFrame(()=>{E&&t(9,E.scrollTop=E.scrollHeight,E)})},Gr=()=>{t(10,O=!0)},qr=()=>{t(10,O=!1)};let St;si(()=>{St=Vo(ec,V=>{V?(t(25,o=V),G()):(t(25,o=null),Y())})}),Zn(()=>{St&&St(),Y(),y()});function xr(V){E=V,t(9,E)}function Kr(V){g=V,t(6,g)}function Jr(V){B=V,t(12,B)}function Xr(V){c=V,t(4,c)}function Yr(V){I=V,t(7,I)}return n.$$.update=()=>{n.$$.dirty[0]&33554432&&t(14,r=o!=null&&o.displayName?o.displayName.split(" ")[0]:"User"),n.$$.dirty[0]&67108864&&t(2,i=W(R)),n.$$.dirty[0]&7&&t(13,s=M?`${i}`:l?"online":"offline")},[l,M,i,a,c,h,g,I,A,E,O,w,B,s,r,$,H,ot,Ee,G,Y,K,jr,Gr,qr,o,R,xr,Kr,Jr,Xr,Yr]}class Pc extends We{constructor(e){super(),He(this,e,Ac,kc,Ve,{},null,[-1,-1])}}new Pc({target:document.getElementById("app")});
