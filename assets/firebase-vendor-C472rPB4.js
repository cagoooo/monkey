const wc=()=>{};var io={};/**
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
 */const _a=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Rc=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const i=r[e++];if(i<128)t[n++]=String.fromCharCode(i);else if(i>191&&i<224){const o=r[e++];t[n++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=r[e++],a=r[e++],l=r[e++],f=((i&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[n++]=String.fromCharCode(55296+(f>>10)),t[n++]=String.fromCharCode(56320+(f&1023))}else{const o=r[e++],a=r[e++];t[n++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")},ya={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const o=r[i],a=i+1<r.length,l=a?r[i+1]:0,f=i+2<r.length,d=f?r[i+2]:0,g=o>>2,A=(o&3)<<4|l>>4;let S=(l&15)<<2|d>>6,P=d&63;f||(P=64,a||(S=64)),n.push(e[g],e[A],e[S],e[P])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(_a(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):Rc(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const o=e[r.charAt(i++)],l=i<r.length?e[r.charAt(i)]:0;++i;const d=i<r.length?e[r.charAt(i)]:64;++i;const A=i<r.length?e[r.charAt(i)]:64;if(++i,o==null||l==null||d==null||A==null)throw new Sc;const S=o<<2|l>>4;if(n.push(S),d!==64){const P=l<<4&240|d>>2;if(n.push(P),A!==64){const k=d<<6&192|A;n.push(k)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Sc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Cc=function(r){const t=_a(r);return ya.encodeByteArray(t,!0)},Wn=function(r){return Cc(r).replace(/\./g,"")},Vc=function(r){try{return ya.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function Pc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const bc=()=>Pc().__FIREBASE_DEFAULTS__,Dc=()=>{if(typeof process>"u"||typeof io>"u")return;const r=io.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Nc=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&Vc(r[1]);return t&&JSON.parse(t)},ws=()=>{try{return wc()||bc()||Dc()||Nc()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},kc=r=>{var t,e;return(e=(t=ws())==null?void 0:t.emulatorHosts)==null?void 0:e[r]},Oc=r=>{const t=kc(r);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const n=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),n]:[t.substring(0,e),n]},Ea=()=>{var r;return(r=ws())==null?void 0:r.config};/**
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
 */class xc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
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
 */function Mc(r,t){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},n=t||"demo-project",i=r.iat||0,o=r.sub||r.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...r};return[Wn(JSON.stringify(e)),Wn(JSON.stringify(a)),""].join(".")}/**
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
 */function Lc(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Fc(){var t;const r=(t=ws())==null?void 0:t.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Uc(){return!Fc()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Bc(){try{return typeof indexedDB=="object"}catch{return!1}}function qc(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}/**
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
 */const jc="FirebaseError";class Oe extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=jc,Object.setPrototypeOf(this,Oe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ta.prototype.create)}}class Ta{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],a=o?$c(o,n):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new Oe(i,l,n)}}function $c(r,t){return r.replace(zc,(e,n)=>{const i=t[n];return i!=null?String(i):`<${n}?>`})}const zc=/\{\$([^}]+)}/g;function Yn(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const i of e){if(!n.includes(i))return!1;const o=r[i],a=t[i];if(oo(o)&&oo(a)){if(!Yn(o,a))return!1}else if(o!==a)return!1}for(const i of n)if(!e.includes(i))return!1;return!0}function oo(r){return r!==null&&typeof r=="object"}/**
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
 */function Ce(r){return r&&r._delegate?r._delegate:r}/**
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
 */function Ia(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Gc(r){return(await fetch(r,{credentials:"include"})).ok}class fn{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const oe="[DEFAULT]";/**
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
 */class Hc{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new xc;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),n=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(i){if(n)return null;throw i}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Qc(t))try{this.getOrInitializeService({instanceIdentifier:oe})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:i});n.resolve(o)}catch{}}}}clearInstance(t=oe){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=oe){return this.instances.has(t)}getOptions(t=oe){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);n===l&&a.resolve(i)}return i}onInit(t,e){const n=this.normalizeInstanceIdentifier(e),i=this.onInitCallbacks.get(n)??new Set;i.add(t),this.onInitCallbacks.set(n,i);const o=this.instances.get(n);return o&&t(o,n),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const i of n)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Kc(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=oe){return this.component?this.component.multipleInstances?t:oe:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Kc(r){return r===oe?void 0:r}function Qc(r){return r.instantiationMode==="EAGER"}/**
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
 */class Wc{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Hc(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var q;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(q||(q={}));const Yc={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},Jc=q.INFO,Xc={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},Zc=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),i=Xc[t];if(i)console[i](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class va{constructor(t){this.name=t,this._logLevel=Jc,this._logHandler=Zc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in q))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Yc[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...t),this._logHandler(this,q.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...t),this._logHandler(this,q.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,q.INFO,...t),this._logHandler(this,q.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,q.WARN,...t),this._logHandler(this,q.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...t),this._logHandler(this,q.ERROR,...t)}}const tl=(r,t)=>t.some(e=>r instanceof e);let ao,uo;function el(){return ao||(ao=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nl(){return uo||(uo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Aa=new WeakMap,ts=new WeakMap,wa=new WeakMap,zr=new WeakMap,Rs=new WeakMap;function rl(r){const t=new Promise((e,n)=>{const i=()=>{r.removeEventListener("success",o),r.removeEventListener("error",a)},o=()=>{e(zt(r.result)),i()},a=()=>{n(r.error),i()};r.addEventListener("success",o),r.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&Aa.set(e,r)}).catch(()=>{}),Rs.set(t,r),t}function sl(r){if(ts.has(r))return;const t=new Promise((e,n)=>{const i=()=>{r.removeEventListener("complete",o),r.removeEventListener("error",a),r.removeEventListener("abort",a)},o=()=>{e(),i()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",o),r.addEventListener("error",a),r.addEventListener("abort",a)});ts.set(r,t)}let es={get(r,t,e){if(r instanceof IDBTransaction){if(t==="done")return ts.get(r);if(t==="objectStoreNames")return r.objectStoreNames||wa.get(r);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return zt(r[t])},set(r,t,e){return r[t]=e,!0},has(r,t){return r instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in r}};function il(r){es=r(es)}function ol(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const n=r.call(Gr(this),t,...e);return wa.set(n,t.sort?t.sort():[t]),zt(n)}:nl().includes(r)?function(...t){return r.apply(Gr(this),t),zt(Aa.get(this))}:function(...t){return zt(r.apply(Gr(this),t))}}function al(r){return typeof r=="function"?ol(r):(r instanceof IDBTransaction&&sl(r),tl(r,el())?new Proxy(r,es):r)}function zt(r){if(r instanceof IDBRequest)return rl(r);if(zr.has(r))return zr.get(r);const t=al(r);return t!==r&&(zr.set(r,t),Rs.set(t,r)),t}const Gr=r=>Rs.get(r);function ul(r,t,{blocked:e,upgrade:n,blocking:i,terminated:o}={}){const a=indexedDB.open(r,t),l=zt(a);return n&&a.addEventListener("upgradeneeded",f=>{n(zt(a.result),f.oldVersion,f.newVersion,zt(a.transaction),f)}),e&&a.addEventListener("blocked",f=>e(f.oldVersion,f.newVersion,f)),l.then(f=>{o&&f.addEventListener("close",()=>o()),i&&f.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const cl=["get","getKey","getAll","getAllKeys","count"],ll=["put","add","delete","clear"],Hr=new Map;function co(r,t){if(!(r instanceof IDBDatabase&&!(t in r)&&typeof t=="string"))return;if(Hr.get(t))return Hr.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,i=ll.includes(e);if(!(e in(n?IDBIndex:IDBObjectStore).prototype)||!(i||cl.includes(e)))return;const o=async function(a,...l){const f=this.transaction(a,i?"readwrite":"readonly");let d=f.store;return n&&(d=d.index(l.shift())),(await Promise.all([d[e](...l),i&&f.done]))[0]};return Hr.set(t,o),o}il(r=>({...r,get:(t,e,n)=>co(t,e)||r.get(t,e,n),has:(t,e)=>!!co(t,e)||r.has(t,e)}));/**
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
 */class hl{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(fl(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function fl(r){const t=r.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ns="@firebase/app",lo="0.14.10";/**
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
 */const Ot=new va("@firebase/app"),dl="@firebase/app-compat",pl="@firebase/analytics-compat",ml="@firebase/analytics",gl="@firebase/app-check-compat",_l="@firebase/app-check",yl="@firebase/auth",El="@firebase/auth-compat",Tl="@firebase/database",Il="@firebase/data-connect",vl="@firebase/database-compat",Al="@firebase/functions",wl="@firebase/functions-compat",Rl="@firebase/installations",Sl="@firebase/installations-compat",Cl="@firebase/messaging",Vl="@firebase/messaging-compat",Pl="@firebase/performance",bl="@firebase/performance-compat",Dl="@firebase/remote-config",Nl="@firebase/remote-config-compat",kl="@firebase/storage",Ol="@firebase/storage-compat",xl="@firebase/firestore",Ml="@firebase/ai",Ll="@firebase/firestore-compat",Fl="firebase",Ul="12.11.0";/**
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
 */const rs="[DEFAULT]",Bl={[ns]:"fire-core",[dl]:"fire-core-compat",[ml]:"fire-analytics",[pl]:"fire-analytics-compat",[_l]:"fire-app-check",[gl]:"fire-app-check-compat",[yl]:"fire-auth",[El]:"fire-auth-compat",[Tl]:"fire-rtdb",[Il]:"fire-data-connect",[vl]:"fire-rtdb-compat",[Al]:"fire-fn",[wl]:"fire-fn-compat",[Rl]:"fire-iid",[Sl]:"fire-iid-compat",[Cl]:"fire-fcm",[Vl]:"fire-fcm-compat",[Pl]:"fire-perf",[bl]:"fire-perf-compat",[Dl]:"fire-rc",[Nl]:"fire-rc-compat",[kl]:"fire-gcs",[Ol]:"fire-gcs-compat",[xl]:"fire-fst",[Ll]:"fire-fst-compat",[Ml]:"fire-vertex","fire-js":"fire-js",[Fl]:"fire-js-all"};/**
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
 */const Jn=new Map,ql=new Map,ss=new Map;function ho(r,t){try{r.container.addComponent(t)}catch(e){Ot.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function Xn(r){const t=r.name;if(ss.has(t))return Ot.debug(`There were multiple attempts to register component ${t}.`),!1;ss.set(t,r);for(const e of Jn.values())ho(e,r);for(const e of ql.values())ho(e,r);return!0}function jl(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}function $l(r){return r==null?!1:r.settings!==void 0}/**
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
 */const zl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Gt=new Ta("app","Firebase",zl);/**
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
 */class Gl{constructor(t,e,n){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new fn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Gt.create("app-deleted",{appName:this._name})}}/**
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
 */const Hl=Ul;function Kl(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n={name:rs,automaticDataCollectionEnabled:!0,...t},i=n.name;if(typeof i!="string"||!i)throw Gt.create("bad-app-name",{appName:String(i)});if(e||(e=Ea()),!e)throw Gt.create("no-options");const o=Jn.get(i);if(o){if(Yn(e,o.options)&&Yn(n,o.config))return o;throw Gt.create("duplicate-app",{appName:i})}const a=new Wc(i);for(const f of ss.values())a.addComponent(f);const l=new Gl(e,n,a);return Jn.set(i,l),l}function Ql(r=rs){const t=Jn.get(r);if(!t&&r===rs&&Ea())return Kl();if(!t)throw Gt.create("no-app",{appName:r});return t}function Te(r,t,e){let n=Bl[r]??r;e&&(n+=`-${e}`);const i=n.match(/\s|\//),o=t.match(/\s|\//);if(i||o){const a=[`Unable to register library "${n}" with version "${t}":`];i&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ot.warn(a.join(" "));return}Xn(new fn(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}/**
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
 */const Wl="firebase-heartbeat-database",Yl=1,dn="firebase-heartbeat-store";let Kr=null;function Ra(){return Kr||(Kr=ul(Wl,Yl,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(dn)}catch(e){console.warn(e)}}}}).catch(r=>{throw Gt.create("idb-open",{originalErrorMessage:r.message})})),Kr}async function Jl(r){try{const e=(await Ra()).transaction(dn),n=await e.objectStore(dn).get(Sa(r));return await e.done,n}catch(t){if(t instanceof Oe)Ot.warn(t.message);else{const e=Gt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ot.warn(e.message)}}}async function fo(r,t){try{const n=(await Ra()).transaction(dn,"readwrite");await n.objectStore(dn).put(t,Sa(r)),await n.done}catch(e){if(e instanceof Oe)Ot.warn(e.message);else{const n=Gt.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ot.warn(n.message)}}}function Sa(r){return`${r.name}!${r.options.appId}`}/**
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
 */const Xl=1024,Zl=30;class th{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new nh(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=po();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>Zl){const a=rh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Ot.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=po(),{heartbeatsToSend:n,unsentEntries:i}=eh(this._heartbeatsCache.heartbeats),o=Wn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Ot.warn(e),""}}}function po(){return new Date().toISOString().substring(0,10)}function eh(r,t=Xl){const e=[];let n=r.slice();for(const i of r){const o=e.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),mo(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),mo(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class nh{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Bc()?qc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Jl(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return fo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return fo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}else return}}function mo(r){return Wn(JSON.stringify({version:2,heartbeats:r})).length}function rh(r){if(r.length===0)return-1;let t=0,e=r[0].date;for(let n=1;n<r.length;n++)r[n].date<e&&(e=r[n].date,t=n);return t}/**
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
 */function sh(r){Xn(new fn("platform-logger",t=>new hl(t),"PRIVATE")),Xn(new fn("heartbeat",t=>new th(t),"PRIVATE")),Te(ns,lo,r),Te(ns,lo,"esm2020"),Te("fire-js","")}sh("");var ih="firebase",oh="12.11.0";/**
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
 */Te(ih,oh,"app");var go=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ht,Ca;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,p){function _(){}_.prototype=p.prototype,E.F=p.prototype,E.prototype=new _,E.prototype.constructor=E,E.D=function(T,y,v){for(var m=Array(arguments.length-2),Tt=2;Tt<arguments.length;Tt++)m[Tt-2]=arguments[Tt];return p.prototype[y].apply(T,m)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,p,_){_||(_=0);const T=Array(16);if(typeof p=="string")for(var y=0;y<16;++y)T[y]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(y=0;y<16;++y)T[y]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=E.g[0],_=E.g[1],y=E.g[2];let v=E.g[3],m;m=p+(v^_&(y^v))+T[0]+3614090360&4294967295,p=_+(m<<7&4294967295|m>>>25),m=v+(y^p&(_^y))+T[1]+3905402710&4294967295,v=p+(m<<12&4294967295|m>>>20),m=y+(_^v&(p^_))+T[2]+606105819&4294967295,y=v+(m<<17&4294967295|m>>>15),m=_+(p^y&(v^p))+T[3]+3250441966&4294967295,_=y+(m<<22&4294967295|m>>>10),m=p+(v^_&(y^v))+T[4]+4118548399&4294967295,p=_+(m<<7&4294967295|m>>>25),m=v+(y^p&(_^y))+T[5]+1200080426&4294967295,v=p+(m<<12&4294967295|m>>>20),m=y+(_^v&(p^_))+T[6]+2821735955&4294967295,y=v+(m<<17&4294967295|m>>>15),m=_+(p^y&(v^p))+T[7]+4249261313&4294967295,_=y+(m<<22&4294967295|m>>>10),m=p+(v^_&(y^v))+T[8]+1770035416&4294967295,p=_+(m<<7&4294967295|m>>>25),m=v+(y^p&(_^y))+T[9]+2336552879&4294967295,v=p+(m<<12&4294967295|m>>>20),m=y+(_^v&(p^_))+T[10]+4294925233&4294967295,y=v+(m<<17&4294967295|m>>>15),m=_+(p^y&(v^p))+T[11]+2304563134&4294967295,_=y+(m<<22&4294967295|m>>>10),m=p+(v^_&(y^v))+T[12]+1804603682&4294967295,p=_+(m<<7&4294967295|m>>>25),m=v+(y^p&(_^y))+T[13]+4254626195&4294967295,v=p+(m<<12&4294967295|m>>>20),m=y+(_^v&(p^_))+T[14]+2792965006&4294967295,y=v+(m<<17&4294967295|m>>>15),m=_+(p^y&(v^p))+T[15]+1236535329&4294967295,_=y+(m<<22&4294967295|m>>>10),m=p+(y^v&(_^y))+T[1]+4129170786&4294967295,p=_+(m<<5&4294967295|m>>>27),m=v+(_^y&(p^_))+T[6]+3225465664&4294967295,v=p+(m<<9&4294967295|m>>>23),m=y+(p^_&(v^p))+T[11]+643717713&4294967295,y=v+(m<<14&4294967295|m>>>18),m=_+(v^p&(y^v))+T[0]+3921069994&4294967295,_=y+(m<<20&4294967295|m>>>12),m=p+(y^v&(_^y))+T[5]+3593408605&4294967295,p=_+(m<<5&4294967295|m>>>27),m=v+(_^y&(p^_))+T[10]+38016083&4294967295,v=p+(m<<9&4294967295|m>>>23),m=y+(p^_&(v^p))+T[15]+3634488961&4294967295,y=v+(m<<14&4294967295|m>>>18),m=_+(v^p&(y^v))+T[4]+3889429448&4294967295,_=y+(m<<20&4294967295|m>>>12),m=p+(y^v&(_^y))+T[9]+568446438&4294967295,p=_+(m<<5&4294967295|m>>>27),m=v+(_^y&(p^_))+T[14]+3275163606&4294967295,v=p+(m<<9&4294967295|m>>>23),m=y+(p^_&(v^p))+T[3]+4107603335&4294967295,y=v+(m<<14&4294967295|m>>>18),m=_+(v^p&(y^v))+T[8]+1163531501&4294967295,_=y+(m<<20&4294967295|m>>>12),m=p+(y^v&(_^y))+T[13]+2850285829&4294967295,p=_+(m<<5&4294967295|m>>>27),m=v+(_^y&(p^_))+T[2]+4243563512&4294967295,v=p+(m<<9&4294967295|m>>>23),m=y+(p^_&(v^p))+T[7]+1735328473&4294967295,y=v+(m<<14&4294967295|m>>>18),m=_+(v^p&(y^v))+T[12]+2368359562&4294967295,_=y+(m<<20&4294967295|m>>>12),m=p+(_^y^v)+T[5]+4294588738&4294967295,p=_+(m<<4&4294967295|m>>>28),m=v+(p^_^y)+T[8]+2272392833&4294967295,v=p+(m<<11&4294967295|m>>>21),m=y+(v^p^_)+T[11]+1839030562&4294967295,y=v+(m<<16&4294967295|m>>>16),m=_+(y^v^p)+T[14]+4259657740&4294967295,_=y+(m<<23&4294967295|m>>>9),m=p+(_^y^v)+T[1]+2763975236&4294967295,p=_+(m<<4&4294967295|m>>>28),m=v+(p^_^y)+T[4]+1272893353&4294967295,v=p+(m<<11&4294967295|m>>>21),m=y+(v^p^_)+T[7]+4139469664&4294967295,y=v+(m<<16&4294967295|m>>>16),m=_+(y^v^p)+T[10]+3200236656&4294967295,_=y+(m<<23&4294967295|m>>>9),m=p+(_^y^v)+T[13]+681279174&4294967295,p=_+(m<<4&4294967295|m>>>28),m=v+(p^_^y)+T[0]+3936430074&4294967295,v=p+(m<<11&4294967295|m>>>21),m=y+(v^p^_)+T[3]+3572445317&4294967295,y=v+(m<<16&4294967295|m>>>16),m=_+(y^v^p)+T[6]+76029189&4294967295,_=y+(m<<23&4294967295|m>>>9),m=p+(_^y^v)+T[9]+3654602809&4294967295,p=_+(m<<4&4294967295|m>>>28),m=v+(p^_^y)+T[12]+3873151461&4294967295,v=p+(m<<11&4294967295|m>>>21),m=y+(v^p^_)+T[15]+530742520&4294967295,y=v+(m<<16&4294967295|m>>>16),m=_+(y^v^p)+T[2]+3299628645&4294967295,_=y+(m<<23&4294967295|m>>>9),m=p+(y^(_|~v))+T[0]+4096336452&4294967295,p=_+(m<<6&4294967295|m>>>26),m=v+(_^(p|~y))+T[7]+1126891415&4294967295,v=p+(m<<10&4294967295|m>>>22),m=y+(p^(v|~_))+T[14]+2878612391&4294967295,y=v+(m<<15&4294967295|m>>>17),m=_+(v^(y|~p))+T[5]+4237533241&4294967295,_=y+(m<<21&4294967295|m>>>11),m=p+(y^(_|~v))+T[12]+1700485571&4294967295,p=_+(m<<6&4294967295|m>>>26),m=v+(_^(p|~y))+T[3]+2399980690&4294967295,v=p+(m<<10&4294967295|m>>>22),m=y+(p^(v|~_))+T[10]+4293915773&4294967295,y=v+(m<<15&4294967295|m>>>17),m=_+(v^(y|~p))+T[1]+2240044497&4294967295,_=y+(m<<21&4294967295|m>>>11),m=p+(y^(_|~v))+T[8]+1873313359&4294967295,p=_+(m<<6&4294967295|m>>>26),m=v+(_^(p|~y))+T[15]+4264355552&4294967295,v=p+(m<<10&4294967295|m>>>22),m=y+(p^(v|~_))+T[6]+2734768916&4294967295,y=v+(m<<15&4294967295|m>>>17),m=_+(v^(y|~p))+T[13]+1309151649&4294967295,_=y+(m<<21&4294967295|m>>>11),m=p+(y^(_|~v))+T[4]+4149444226&4294967295,p=_+(m<<6&4294967295|m>>>26),m=v+(_^(p|~y))+T[11]+3174756917&4294967295,v=p+(m<<10&4294967295|m>>>22),m=y+(p^(v|~_))+T[2]+718787259&4294967295,y=v+(m<<15&4294967295|m>>>17),m=_+(v^(y|~p))+T[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(y+(m<<21&4294967295|m>>>11))&4294967295,E.g[2]=E.g[2]+y&4294967295,E.g[3]=E.g[3]+v&4294967295}n.prototype.v=function(E,p){p===void 0&&(p=E.length);const _=p-this.blockSize,T=this.C;let y=this.h,v=0;for(;v<p;){if(y==0)for(;v<=_;)i(this,E,v),v+=this.blockSize;if(typeof E=="string"){for(;v<p;)if(T[y++]=E.charCodeAt(v++),y==this.blockSize){i(this,T),y=0;break}}else for(;v<p;)if(T[y++]=E[v++],y==this.blockSize){i(this,T),y=0;break}}this.h=y,this.o+=p},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var _=E.length-8;_<E.length;++_)E[_]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,_=0;_<4;++_)for(let T=0;T<32;T+=8)E[p++]=this.g[_]>>>T&255;return E};function o(E,p){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=p(E)}function a(E,p){this.h=p;const _=[];let T=!0;for(let y=E.length-1;y>=0;y--){const v=E[y]|0;T&&v==p||(_[y]=v,T=!1)}this.g=_}var l={};function f(E){return-128<=E&&E<128?o(E,function(p){return new a([p|0],p<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return A;if(E<0)return O(d(-E));const p=[];let _=1;for(let T=0;E>=_;T++)p[T]=E/_|0,_*=4294967296;return new a(p,0)}function g(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return O(g(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(p,8));let T=A;for(let v=0;v<E.length;v+=8){var y=Math.min(8,E.length-v);const m=parseInt(E.substring(v,v+y),p);y<8?(y=d(Math.pow(p,y)),T=T.j(y).add(d(m))):(T=T.j(_),T=T.add(d(m)))}return T}var A=f(0),S=f(1),P=f(16777216);r=a.prototype,r.m=function(){if(L(this))return-O(this).m();let E=0,p=1;for(let _=0;_<this.g.length;_++){const T=this.i(_);E+=(T>=0?T:4294967296+T)*p,p*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(L(this))return"-"+O(this).toString(E);const p=d(Math.pow(E,6));var _=this;let T="";for(;;){const y=At(_,p).g;_=nt(_,y.j(p));let v=((_.g.length>0?_.g[0]:_.h)>>>0).toString(E);if(_=y,k(_))return v+T;for(;v.length<6;)v="0"+v;T=v+T}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function L(E){return E.h==-1}r.l=function(E){return E=nt(this,E),L(E)?-1:k(E)?0:1};function O(E){const p=E.g.length,_=[];for(let T=0;T<p;T++)_[T]=~E.g[T];return new a(_,~E.h).add(S)}r.abs=function(){return L(this)?O(this):this},r.add=function(E){const p=Math.max(this.g.length,E.g.length),_=[];let T=0;for(let y=0;y<=p;y++){let v=T+(this.i(y)&65535)+(E.i(y)&65535),m=(v>>>16)+(this.i(y)>>>16)+(E.i(y)>>>16);T=m>>>16,v&=65535,m&=65535,_[y]=m<<16|v}return new a(_,_[_.length-1]&-2147483648?-1:0)};function nt(E,p){return E.add(O(p))}r.j=function(E){if(k(this)||k(E))return A;if(L(this))return L(E)?O(this).j(O(E)):O(O(this).j(E));if(L(E))return O(this.j(O(E)));if(this.l(P)<0&&E.l(P)<0)return d(this.m()*E.m());const p=this.g.length+E.g.length,_=[];for(var T=0;T<2*p;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(let y=0;y<E.g.length;y++){const v=this.i(T)>>>16,m=this.i(T)&65535,Tt=E.i(y)>>>16,te=E.i(y)&65535;_[2*T+2*y]+=m*te,Y(_,2*T+2*y),_[2*T+2*y+1]+=v*te,Y(_,2*T+2*y+1),_[2*T+2*y+1]+=m*Tt,Y(_,2*T+2*y+1),_[2*T+2*y+2]+=v*Tt,Y(_,2*T+2*y+2)}for(E=0;E<p;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=p;E<2*p;E++)_[E]=0;return new a(_,0)};function Y(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function it(E,p){this.g=E,this.h=p}function At(E,p){if(k(p))throw Error("division by zero");if(k(E))return new it(A,A);if(L(E))return p=At(O(E),p),new it(O(p.g),O(p.h));if(L(p))return p=At(E,O(p)),new it(O(p.g),p.h);if(E.g.length>30){if(L(E)||L(p))throw Error("slowDivide_ only works with positive integers.");for(var _=S,T=p;T.l(E)<=0;)_=lt(_),T=lt(T);var y=ht(_,1),v=ht(T,1);for(T=ht(T,2),_=ht(_,2);!k(T);){var m=v.add(T);m.l(E)<=0&&(y=y.add(_),v=m),T=ht(T,1),_=ht(_,1)}return p=nt(E,y.j(p)),new it(y,p)}for(y=A;E.l(p)>=0;){for(_=Math.max(1,Math.floor(E.m()/p.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),v=d(_),m=v.j(p);L(m)||m.l(E)>0;)_-=T,v=d(_),m=v.j(p);k(v)&&(v=S),y=y.add(v),E=nt(E,m)}return new it(y,E)}r.B=function(E){return At(this,E).h},r.and=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<p;T++)_[T]=this.i(T)&E.i(T);return new a(_,this.h&E.h)},r.or=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<p;T++)_[T]=this.i(T)|E.i(T);return new a(_,this.h|E.h)},r.xor=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<p;T++)_[T]=this.i(T)^E.i(T);return new a(_,this.h^E.h)};function lt(E){const p=E.g.length+1,_=[];for(let T=0;T<p;T++)_[T]=E.i(T)<<1|E.i(T-1)>>>31;return new a(_,E.h)}function ht(E,p){const _=p>>5;p%=32;const T=E.g.length-_,y=[];for(let v=0;v<T;v++)y[v]=p>0?E.i(v+_)>>>p|E.i(v+_+1)<<32-p:E.i(v+_);return new a(y,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Ca=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=g,Ht=a}).apply(typeof go<"u"?go:typeof self<"u"?self:typeof window<"u"?window:{});var Fn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Va,rn,Pa,$n,is,ba,Da,Na;(function(){var r,t=Object.defineProperty;function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Fn=="object"&&Fn];for(var u=0;u<s.length;++u){var c=s[u];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var n=e(this);function i(s,u){if(u)t:{var c=n;s=s.split(".");for(var h=0;h<s.length-1;h++){var I=s[h];if(!(I in c))break t;c=c[I]}s=s[s.length-1],h=c[s],u=u(h),u!=h&&u!=null&&t(c,s,{configurable:!0,writable:!0,value:u})}}i("Symbol.dispose",function(s){return s||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(s){return s||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(s){return s||function(u){var c=[],h;for(h in u)Object.prototype.hasOwnProperty.call(u,h)&&c.push([h,u[h]]);return c}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(s){var u=typeof s;return u=="object"&&s!=null||u=="function"}function f(s,u,c){return s.call.apply(s.bind,arguments)}function d(s,u,c){return d=f,d.apply(null,arguments)}function g(s,u){var c=Array.prototype.slice.call(arguments,1);return function(){var h=c.slice();return h.push.apply(h,arguments),s.apply(this,h)}}function A(s,u){function c(){}c.prototype=u.prototype,s.Z=u.prototype,s.prototype=new c,s.prototype.constructor=s,s.Ob=function(h,I,w){for(var V=Array(arguments.length-2),F=2;F<arguments.length;F++)V[F-2]=arguments[F];return u.prototype[I].apply(h,V)}}var S=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?s=>s&&AsyncContext.Snapshot.wrap(s):s=>s;function P(s){const u=s.length;if(u>0){const c=Array(u);for(let h=0;h<u;h++)c[h]=s[h];return c}return[]}function k(s,u){for(let h=1;h<arguments.length;h++){const I=arguments[h];var c=typeof I;if(c=c!="object"?c:I?Array.isArray(I)?"array":c:"null",c=="array"||c=="object"&&typeof I.length=="number"){c=s.length||0;const w=I.length||0;s.length=c+w;for(let V=0;V<w;V++)s[c+V]=I[V]}else s.push(I)}}class L{constructor(u,c){this.i=u,this.j=c,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function O(s){a.setTimeout(()=>{throw s},0)}function nt(){var s=E;let u=null;return s.g&&(u=s.g,s.g=s.g.next,s.g||(s.h=null),u.next=null),u}class Y{constructor(){this.h=this.g=null}add(u,c){const h=it.get();h.set(u,c),this.h?this.h.next=h:this.g=h,this.h=h}}var it=new L(()=>new At,s=>s.reset());class At{constructor(){this.next=this.g=this.h=null}set(u,c){this.h=u,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let lt,ht=!1,E=new Y,p=()=>{const s=Promise.resolve(void 0);lt=()=>{s.then(_)}};function _(){for(var s;s=nt();){try{s.h.call(s.g)}catch(c){O(c)}var u=it;u.j(s),u.h<100&&(u.h++,s.next=u.g,u.g=s)}ht=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(s,u){this.type=s,this.g=this.target=u,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var v=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var s=!1,u=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const c=()=>{};a.addEventListener("test",c,u),a.removeEventListener("test",c,u)}catch{}return s})();function m(s){return/^[\s\xa0]*$/.test(s)}function Tt(s,u){y.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s&&this.init(s,u)}A(Tt,y),Tt.prototype.init=function(s,u){const c=this.type=s.type,h=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;this.target=s.target||s.srcElement,this.g=u,u=s.relatedTarget,u||(c=="mouseover"?u=s.fromElement:c=="mouseout"&&(u=s.toElement)),this.relatedTarget=u,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=s.pointerType,this.state=s.state,this.i=s,s.defaultPrevented&&Tt.Z.h.call(this)},Tt.prototype.h=function(){Tt.Z.h.call(this);const s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var te="closure_listenable_"+(Math.random()*1e6|0),Hu=0;function Ku(s,u,c,h,I){this.listener=s,this.proxy=null,this.src=u,this.type=c,this.capture=!!h,this.ha=I,this.key=++Hu,this.da=this.fa=!1}function An(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function wn(s,u,c){for(const h in s)u.call(c,s[h],h,s)}function Qu(s,u){for(const c in s)u.call(void 0,s[c],c,s)}function si(s){const u={};for(const c in s)u[c]=s[c];return u}const ii="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function oi(s,u){let c,h;for(let I=1;I<arguments.length;I++){h=arguments[I];for(c in h)s[c]=h[c];for(let w=0;w<ii.length;w++)c=ii[w],Object.prototype.hasOwnProperty.call(h,c)&&(s[c]=h[c])}}function Rn(s){this.src=s,this.g={},this.h=0}Rn.prototype.add=function(s,u,c,h,I){const w=s.toString();s=this.g[w],s||(s=this.g[w]=[],this.h++);const V=Ir(s,u,h,I);return V>-1?(u=s[V],c||(u.fa=!1)):(u=new Ku(u,this.src,w,!!h,I),u.fa=c,s.push(u)),u};function Tr(s,u){const c=u.type;if(c in s.g){var h=s.g[c],I=Array.prototype.indexOf.call(h,u,void 0),w;(w=I>=0)&&Array.prototype.splice.call(h,I,1),w&&(An(u),s.g[c].length==0&&(delete s.g[c],s.h--))}}function Ir(s,u,c,h){for(let I=0;I<s.length;++I){const w=s[I];if(!w.da&&w.listener==u&&w.capture==!!c&&w.ha==h)return I}return-1}var vr="closure_lm_"+(Math.random()*1e6|0),Ar={};function ai(s,u,c,h,I){if(Array.isArray(u)){for(let w=0;w<u.length;w++)ai(s,u[w],c,h,I);return null}return c=li(c),s&&s[te]?s.J(u,c,l(h)?!!h.capture:!1,I):Wu(s,u,c,!1,h,I)}function Wu(s,u,c,h,I,w){if(!u)throw Error("Invalid event type");const V=l(I)?!!I.capture:!!I;let F=Rr(s);if(F||(s[vr]=F=new Rn(s)),c=F.add(u,c,h,V,w),c.proxy)return c;if(h=Yu(),c.proxy=h,h.src=s,h.listener=c,s.addEventListener)v||(I=V),I===void 0&&(I=!1),s.addEventListener(u.toString(),h,I);else if(s.attachEvent)s.attachEvent(ci(u.toString()),h);else if(s.addListener&&s.removeListener)s.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Yu(){function s(c){return u.call(s.src,s.listener,c)}const u=Ju;return s}function ui(s,u,c,h,I){if(Array.isArray(u))for(var w=0;w<u.length;w++)ui(s,u[w],c,h,I);else h=l(h)?!!h.capture:!!h,c=li(c),s&&s[te]?(s=s.i,w=String(u).toString(),w in s.g&&(u=s.g[w],c=Ir(u,c,h,I),c>-1&&(An(u[c]),Array.prototype.splice.call(u,c,1),u.length==0&&(delete s.g[w],s.h--)))):s&&(s=Rr(s))&&(u=s.g[u.toString()],s=-1,u&&(s=Ir(u,c,h,I)),(c=s>-1?u[s]:null)&&wr(c))}function wr(s){if(typeof s!="number"&&s&&!s.da){var u=s.src;if(u&&u[te])Tr(u.i,s);else{var c=s.type,h=s.proxy;u.removeEventListener?u.removeEventListener(c,h,s.capture):u.detachEvent?u.detachEvent(ci(c),h):u.addListener&&u.removeListener&&u.removeListener(h),(c=Rr(u))?(Tr(c,s),c.h==0&&(c.src=null,u[vr]=null)):An(s)}}}function ci(s){return s in Ar?Ar[s]:Ar[s]="on"+s}function Ju(s,u){if(s.da)s=!0;else{u=new Tt(u,this);const c=s.listener,h=s.ha||s.src;s.fa&&wr(s),s=c.call(h,u)}return s}function Rr(s){return s=s[vr],s instanceof Rn?s:null}var Sr="__closure_events_fn_"+(Math.random()*1e9>>>0);function li(s){return typeof s=="function"?s:(s[Sr]||(s[Sr]=function(u){return s.handleEvent(u)}),s[Sr])}function ft(){T.call(this),this.i=new Rn(this),this.M=this,this.G=null}A(ft,T),ft.prototype[te]=!0,ft.prototype.removeEventListener=function(s,u,c,h){ui(this,s,u,c,h)};function yt(s,u){var c,h=s.G;if(h)for(c=[];h;h=h.G)c.push(h);if(s=s.M,h=u.type||u,typeof u=="string")u=new y(u,s);else if(u instanceof y)u.target=u.target||s;else{var I=u;u=new y(h,s),oi(u,I)}I=!0;let w,V;if(c)for(V=c.length-1;V>=0;V--)w=u.g=c[V],I=Sn(w,h,!0,u)&&I;if(w=u.g=s,I=Sn(w,h,!0,u)&&I,I=Sn(w,h,!1,u)&&I,c)for(V=0;V<c.length;V++)w=u.g=c[V],I=Sn(w,h,!1,u)&&I}ft.prototype.N=function(){if(ft.Z.N.call(this),this.i){var s=this.i;for(const u in s.g){const c=s.g[u];for(let h=0;h<c.length;h++)An(c[h]);delete s.g[u],s.h--}}this.G=null},ft.prototype.J=function(s,u,c,h){return this.i.add(String(s),u,!1,c,h)},ft.prototype.K=function(s,u,c,h){return this.i.add(String(s),u,!0,c,h)};function Sn(s,u,c,h){if(u=s.i.g[String(u)],!u)return!0;u=u.concat();let I=!0;for(let w=0;w<u.length;++w){const V=u[w];if(V&&!V.da&&V.capture==c){const F=V.listener,rt=V.ha||V.src;V.fa&&Tr(s.i,V),I=F.call(rt,h)!==!1&&I}}return I&&!h.defaultPrevented}function Xu(s,u){if(typeof s!="function")if(s&&typeof s.handleEvent=="function")s=d(s.handleEvent,s);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(s,u||0)}function hi(s){s.g=Xu(()=>{s.g=null,s.i&&(s.i=!1,hi(s))},s.l);const u=s.h;s.h=null,s.m.apply(null,u)}class Zu extends T{constructor(u,c){super(),this.m=u,this.l=c,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:hi(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Be(s){T.call(this),this.h=s,this.g={}}A(Be,T);var fi=[];function di(s){wn(s.g,function(u,c){this.g.hasOwnProperty(c)&&wr(u)},s),s.g={}}Be.prototype.N=function(){Be.Z.N.call(this),di(this)},Be.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Cr=a.JSON.stringify,tc=a.JSON.parse,ec=class{stringify(s){return a.JSON.stringify(s,void 0)}parse(s){return a.JSON.parse(s,void 0)}};function pi(){}function mi(){}var qe={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Vr(){y.call(this,"d")}A(Vr,y);function Pr(){y.call(this,"c")}A(Pr,y);var ee={},gi=null;function Cn(){return gi=gi||new ft}ee.Ia="serverreachability";function _i(s){y.call(this,ee.Ia,s)}A(_i,y);function je(s){const u=Cn();yt(u,new _i(u))}ee.STAT_EVENT="statevent";function yi(s,u){y.call(this,ee.STAT_EVENT,s),this.stat=u}A(yi,y);function Et(s){const u=Cn();yt(u,new yi(u,s))}ee.Ja="timingevent";function Ei(s,u){y.call(this,ee.Ja,s),this.size=u}A(Ei,y);function $e(s,u){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){s()},u)}function ze(){this.g=!0}ze.prototype.ua=function(){this.g=!1};function nc(s,u,c,h,I,w){s.info(function(){if(s.g)if(w){var V="",F=w.split("&");for(let z=0;z<F.length;z++){var rt=F[z].split("=");if(rt.length>1){const ot=rt[0];rt=rt[1];const Vt=ot.split("_");V=Vt.length>=2&&Vt[1]=="type"?V+(ot+"="+rt+"&"):V+(ot+"=redacted&")}}}else V=null;else V=w;return"XMLHTTP REQ ("+h+") [attempt "+I+"]: "+u+`
`+c+`
`+V})}function rc(s,u,c,h,I,w,V){s.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+I+"]: "+u+`
`+c+`
`+w+" "+V})}function de(s,u,c,h){s.info(function(){return"XMLHTTP TEXT ("+u+"): "+ic(s,c)+(h?" "+h:"")})}function sc(s,u){s.info(function(){return"TIMEOUT: "+u})}ze.prototype.info=function(){};function ic(s,u){if(!s.g)return u;if(!u)return null;try{const w=JSON.parse(u);if(w){for(s=0;s<w.length;s++)if(Array.isArray(w[s])){var c=w[s];if(!(c.length<2)){var h=c[1];if(Array.isArray(h)&&!(h.length<1)){var I=h[0];if(I!="noop"&&I!="stop"&&I!="close")for(let V=1;V<h.length;V++)h[V]=""}}}}return Cr(w)}catch{return u}}var Vn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ti={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ii;function br(){}A(br,pi),br.prototype.g=function(){return new XMLHttpRequest},Ii=new br;function Ge(s){return encodeURIComponent(String(s))}function oc(s){var u=1;s=s.split(":");const c=[];for(;u>0&&s.length;)c.push(s.shift()),u--;return s.length&&c.push(s.join(":")),c}function Mt(s,u,c,h){this.j=s,this.i=u,this.l=c,this.S=h||1,this.V=new Be(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new vi}function vi(){this.i=null,this.g="",this.h=!1}var Ai={},Dr={};function Nr(s,u,c){s.M=1,s.A=bn(Ct(u)),s.u=c,s.R=!0,wi(s,null)}function wi(s,u){s.F=Date.now(),Pn(s),s.B=Ct(s.A);var c=s.B,h=s.S;Array.isArray(h)||(h=[String(h)]),Li(c.i,"t",h),s.C=0,c=s.j.L,s.h=new vi,s.g=eo(s.j,c?u:null,!s.u),s.P>0&&(s.O=new Zu(d(s.Y,s,s.g),s.P)),u=s.V,c=s.g,h=s.ba;var I="readystatechange";Array.isArray(I)||(I&&(fi[0]=I.toString()),I=fi);for(let w=0;w<I.length;w++){const V=ai(c,I[w],h||u.handleEvent,!1,u.h||u);if(!V)break;u.g[V.key]=V}u=s.J?si(s.J):{},s.u?(s.v||(s.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.B,s.v,s.u,u)):(s.v="GET",s.g.ea(s.B,s.v,null,u)),je(),nc(s.i,s.v,s.B,s.l,s.S,s.u)}Mt.prototype.ba=function(s){s=s.target;const u=this.O;u&&Ut(s)==3?u.j():this.Y(s)},Mt.prototype.Y=function(s){try{if(s==this.g)t:{const F=Ut(this.g),rt=this.g.ya(),z=this.g.ca();if(!(F<3)&&(F!=3||this.g&&(this.h.h||this.g.la()||zi(this.g)))){this.K||F!=4||rt==7||(rt==8||z<=0?je(3):je(2)),kr(this);var u=this.g.ca();this.X=u;var c=ac(this);if(this.o=u==200,rc(this.i,this.v,this.B,this.l,this.S,F,u),this.o){if(this.U&&!this.L){e:{if(this.g){var h,I=this.g;if((h=I.g?I.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!m(h)){var w=h;break e}}w=null}if(s=w)de(this.i,this.l,s,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Or(this,s);else{this.o=!1,this.m=3,Et(12),ne(this),He(this);break t}}if(this.R){s=!0;let ot;for(;!this.K&&this.C<c.length;)if(ot=uc(this,c),ot==Dr){F==4&&(this.m=4,Et(14),s=!1),de(this.i,this.l,null,"[Incomplete Response]");break}else if(ot==Ai){this.m=4,Et(15),de(this.i,this.l,c,"[Invalid Chunk]"),s=!1;break}else de(this.i,this.l,ot,null),Or(this,ot);if(Ri(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),F!=4||c.length!=0||this.h.h||(this.m=1,Et(16),s=!1),this.o=this.o&&s,!s)de(this.i,this.l,c,"[Invalid Chunked Response]"),ne(this),He(this);else if(c.length>0&&!this.W){this.W=!0;var V=this.j;V.g==this&&V.aa&&!V.P&&(V.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),jr(V),V.P=!0,Et(11))}}else de(this.i,this.l,c,null),Or(this,c);F==4&&ne(this),this.o&&!this.K&&(F==4?Ji(this.j,this):(this.o=!1,Pn(this)))}else vc(this.g),u==400&&c.indexOf("Unknown SID")>0?(this.m=3,Et(12)):(this.m=0,Et(13)),ne(this),He(this)}}}catch{}finally{}};function ac(s){if(!Ri(s))return s.g.la();const u=zi(s.g);if(u==="")return"";let c="";const h=u.length,I=Ut(s.g)==4;if(!s.h.i){if(typeof TextDecoder>"u")return ne(s),He(s),"";s.h.i=new a.TextDecoder}for(let w=0;w<h;w++)s.h.h=!0,c+=s.h.i.decode(u[w],{stream:!(I&&w==h-1)});return u.length=0,s.h.g+=c,s.C=0,s.h.g}function Ri(s){return s.g?s.v=="GET"&&s.M!=2&&s.j.Aa:!1}function uc(s,u){var c=s.C,h=u.indexOf(`
`,c);return h==-1?Dr:(c=Number(u.substring(c,h)),isNaN(c)?Ai:(h+=1,h+c>u.length?Dr:(u=u.slice(h,h+c),s.C=h+c,u)))}Mt.prototype.cancel=function(){this.K=!0,ne(this)};function Pn(s){s.T=Date.now()+s.H,Si(s,s.H)}function Si(s,u){if(s.D!=null)throw Error("WatchDog timer not null");s.D=$e(d(s.aa,s),u)}function kr(s){s.D&&(a.clearTimeout(s.D),s.D=null)}Mt.prototype.aa=function(){this.D=null;const s=Date.now();s-this.T>=0?(sc(this.i,this.B),this.M!=2&&(je(),Et(17)),ne(this),this.m=2,He(this)):Si(this,this.T-s)};function He(s){s.j.I==0||s.K||Ji(s.j,s)}function ne(s){kr(s);var u=s.O;u&&typeof u.dispose=="function"&&u.dispose(),s.O=null,di(s.V),s.g&&(u=s.g,s.g=null,u.abort(),u.dispose())}function Or(s,u){try{var c=s.j;if(c.I!=0&&(c.g==s||xr(c.h,s))){if(!s.L&&xr(c.h,s)&&c.I==3){try{var h=c.Ba.g.parse(u)}catch{h=null}if(Array.isArray(h)&&h.length==3){var I=h;if(I[0]==0){t:if(!c.v){if(c.g)if(c.g.F+3e3<s.F)xn(c),kn(c);else break t;qr(c),Et(18)}}else c.xa=I[1],0<c.xa-c.K&&I[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=$e(d(c.Va,c),6e3));Pi(c.h)<=1&&c.ta&&(c.ta=void 0)}else se(c,11)}else if((s.L||c.g==s)&&xn(c),!m(u))for(I=c.Ba.g.parse(u),u=0;u<I.length;u++){let z=I[u];const ot=z[0];if(!(ot<=c.K))if(c.K=ot,z=z[1],c.I==2)if(z[0]=="c"){c.M=z[1],c.ba=z[2];const Vt=z[3];Vt!=null&&(c.ka=Vt,c.j.info("VER="+c.ka));const ie=z[4];ie!=null&&(c.za=ie,c.j.info("SVER="+c.za));const Bt=z[5];Bt!=null&&typeof Bt=="number"&&Bt>0&&(h=1.5*Bt,c.O=h,c.j.info("backChannelRequestTimeoutMs_="+h)),h=c;const qt=s.g;if(qt){const Ln=qt.g?qt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ln){var w=h.h;w.g||Ln.indexOf("spdy")==-1&&Ln.indexOf("quic")==-1&&Ln.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(Mr(w,w.h),w.h=null))}if(h.G){const $r=qt.g?qt.g.getResponseHeader("X-HTTP-Session-Id"):null;$r&&(h.wa=$r,G(h.J,h.G,$r))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-s.F,c.j.info("Handshake RTT: "+c.T+"ms")),h=c;var V=s;if(h.na=to(h,h.L?h.ba:null,h.W),V.L){bi(h.h,V);var F=V,rt=h.O;rt&&(F.H=rt),F.D&&(kr(F),Pn(F)),h.g=V}else Wi(h);c.i.length>0&&On(c)}else z[0]!="stop"&&z[0]!="close"||se(c,7);else c.I==3&&(z[0]=="stop"||z[0]=="close"?z[0]=="stop"?se(c,7):Br(c):z[0]!="noop"&&c.l&&c.l.qa(z),c.A=0)}}je(4)}catch{}}var cc=class{constructor(s,u){this.g=s,this.map=u}};function Ci(s){this.l=s||10,a.PerformanceNavigationTiming?(s=a.performance.getEntriesByType("navigation"),s=s.length>0&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Vi(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Pi(s){return s.h?1:s.g?s.g.size:0}function xr(s,u){return s.h?s.h==u:s.g?s.g.has(u):!1}function Mr(s,u){s.g?s.g.add(u):s.h=u}function bi(s,u){s.h&&s.h==u?s.h=null:s.g&&s.g.has(u)&&s.g.delete(u)}Ci.prototype.cancel=function(){if(this.i=Di(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Di(s){if(s.h!=null)return s.i.concat(s.h.G);if(s.g!=null&&s.g.size!==0){let u=s.i;for(const c of s.g.values())u=u.concat(c.G);return u}return P(s.i)}var Ni=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function lc(s,u){if(s){s=s.split("&");for(let c=0;c<s.length;c++){const h=s[c].indexOf("=");let I,w=null;h>=0?(I=s[c].substring(0,h),w=s[c].substring(h+1)):I=s[c],u(I,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Lt(s){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;s instanceof Lt?(this.l=s.l,Ke(this,s.j),this.o=s.o,this.g=s.g,Qe(this,s.u),this.h=s.h,Lr(this,Fi(s.i)),this.m=s.m):s&&(u=String(s).match(Ni))?(this.l=!1,Ke(this,u[1]||"",!0),this.o=We(u[2]||""),this.g=We(u[3]||"",!0),Qe(this,u[4]),this.h=We(u[5]||"",!0),Lr(this,u[6]||"",!0),this.m=We(u[7]||"")):(this.l=!1,this.i=new Je(null,this.l))}Lt.prototype.toString=function(){const s=[];var u=this.j;u&&s.push(Ye(u,ki,!0),":");var c=this.g;return(c||u=="file")&&(s.push("//"),(u=this.o)&&s.push(Ye(u,ki,!0),"@"),s.push(Ge(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&s.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&s.push("/"),s.push(Ye(c,c.charAt(0)=="/"?dc:fc,!0))),(c=this.i.toString())&&s.push("?",c),(c=this.m)&&s.push("#",Ye(c,mc)),s.join("")},Lt.prototype.resolve=function(s){const u=Ct(this);let c=!!s.j;c?Ke(u,s.j):c=!!s.o,c?u.o=s.o:c=!!s.g,c?u.g=s.g:c=s.u!=null;var h=s.h;if(c)Qe(u,s.u);else if(c=!!s.h){if(h.charAt(0)!="/")if(this.g&&!this.h)h="/"+h;else{var I=u.h.lastIndexOf("/");I!=-1&&(h=u.h.slice(0,I+1)+h)}if(I=h,I==".."||I==".")h="";else if(I.indexOf("./")!=-1||I.indexOf("/.")!=-1){h=I.lastIndexOf("/",0)==0,I=I.split("/");const w=[];for(let V=0;V<I.length;){const F=I[V++];F=="."?h&&V==I.length&&w.push(""):F==".."?((w.length>1||w.length==1&&w[0]!="")&&w.pop(),h&&V==I.length&&w.push("")):(w.push(F),h=!0)}h=w.join("/")}else h=I}return c?u.h=h:c=s.i.toString()!=="",c?Lr(u,Fi(s.i)):c=!!s.m,c&&(u.m=s.m),u};function Ct(s){return new Lt(s)}function Ke(s,u,c){s.j=c?We(u,!0):u,s.j&&(s.j=s.j.replace(/:$/,""))}function Qe(s,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);s.u=u}else s.u=null}function Lr(s,u,c){u instanceof Je?(s.i=u,gc(s.i,s.l)):(c||(u=Ye(u,pc)),s.i=new Je(u,s.l))}function G(s,u,c){s.i.set(u,c)}function bn(s){return G(s,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),s}function We(s,u){return s?u?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Ye(s,u,c){return typeof s=="string"?(s=encodeURI(s).replace(u,hc),c&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function hc(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var ki=/[#\/\?@]/g,fc=/[#\?:]/g,dc=/[#\?]/g,pc=/[#\?@]/g,mc=/#/g;function Je(s,u){this.h=this.g=null,this.i=s||null,this.j=!!u}function re(s){s.g||(s.g=new Map,s.h=0,s.i&&lc(s.i,function(u,c){s.add(decodeURIComponent(u.replace(/\+/g," ")),c)}))}r=Je.prototype,r.add=function(s,u){re(this),this.i=null,s=pe(this,s);let c=this.g.get(s);return c||this.g.set(s,c=[]),c.push(u),this.h+=1,this};function Oi(s,u){re(s),u=pe(s,u),s.g.has(u)&&(s.i=null,s.h-=s.g.get(u).length,s.g.delete(u))}function xi(s,u){return re(s),u=pe(s,u),s.g.has(u)}r.forEach=function(s,u){re(this),this.g.forEach(function(c,h){c.forEach(function(I){s.call(u,I,h,this)},this)},this)};function Mi(s,u){re(s);let c=[];if(typeof u=="string")xi(s,u)&&(c=c.concat(s.g.get(pe(s,u))));else for(s=Array.from(s.g.values()),u=0;u<s.length;u++)c=c.concat(s[u]);return c}r.set=function(s,u){return re(this),this.i=null,s=pe(this,s),xi(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[u]),this.h+=1,this},r.get=function(s,u){return s?(s=Mi(this,s),s.length>0?String(s[0]):u):u};function Li(s,u,c){Oi(s,u),c.length>0&&(s.i=null,s.g.set(pe(s,u),P(c)),s.h+=c.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],u=Array.from(this.g.keys());for(let h=0;h<u.length;h++){var c=u[h];const I=Ge(c);c=Mi(this,c);for(let w=0;w<c.length;w++){let V=I;c[w]!==""&&(V+="="+Ge(c[w])),s.push(V)}}return this.i=s.join("&")};function Fi(s){const u=new Je;return u.i=s.i,s.g&&(u.g=new Map(s.g),u.h=s.h),u}function pe(s,u){return u=String(u),s.j&&(u=u.toLowerCase()),u}function gc(s,u){u&&!s.j&&(re(s),s.i=null,s.g.forEach(function(c,h){const I=h.toLowerCase();h!=I&&(Oi(this,h),Li(this,I,c))},s)),s.j=u}function _c(s,u){const c=new ze;if(a.Image){const h=new Image;h.onload=g(Ft,c,"TestLoadImage: loaded",!0,u,h),h.onerror=g(Ft,c,"TestLoadImage: error",!1,u,h),h.onabort=g(Ft,c,"TestLoadImage: abort",!1,u,h),h.ontimeout=g(Ft,c,"TestLoadImage: timeout",!1,u,h),a.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=s}else u(!1)}function yc(s,u){const c=new ze,h=new AbortController,I=setTimeout(()=>{h.abort(),Ft(c,"TestPingServer: timeout",!1,u)},1e4);fetch(s,{signal:h.signal}).then(w=>{clearTimeout(I),w.ok?Ft(c,"TestPingServer: ok",!0,u):Ft(c,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(I),Ft(c,"TestPingServer: error",!1,u)})}function Ft(s,u,c,h,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),h(c)}catch{}}function Ec(){this.g=new ec}function Fr(s){this.i=s.Sb||null,this.h=s.ab||!1}A(Fr,pi),Fr.prototype.g=function(){return new Dn(this.i,this.h)};function Dn(s,u){ft.call(this),this.H=s,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}A(Dn,ft),r=Dn.prototype,r.open=function(s,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=s,this.D=u,this.readyState=1,Ze(this)},r.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};s&&(u.body=s),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Xe(this)),this.readyState=0},r.Pa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Ze(this)),this.g&&(this.readyState=3,Ze(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ui(this)}else s.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ui(s){s.j.read().then(s.Ma.bind(s)).catch(s.ga.bind(s))}r.Ma=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var u=s.value?s.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!s.done}))&&(this.response=this.responseText+=u)}s.done?Xe(this):Ze(this),this.readyState==3&&Ui(this)}},r.Oa=function(s){this.g&&(this.response=this.responseText=s,Xe(this))},r.Na=function(s){this.g&&(this.response=s,Xe(this))},r.ga=function(){this.g&&Xe(this)};function Xe(s){s.readyState=4,s.l=null,s.j=null,s.B=null,Ze(s)}r.setRequestHeader=function(s,u){this.A.append(s,u)},r.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],u=this.h.entries();for(var c=u.next();!c.done;)c=c.value,s.push(c[0]+": "+c[1]),c=u.next();return s.join(`\r
`)};function Ze(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Dn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Bi(s){let u="";return wn(s,function(c,h){u+=h,u+=":",u+=c,u+=`\r
`}),u}function Ur(s,u,c){t:{for(h in c){var h=!1;break t}h=!0}h||(c=Bi(c),typeof s=="string"?c!=null&&Ge(c):G(s,u,c))}function W(s){ft.call(this),this.headers=new Map,this.L=s||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}A(W,ft);var Tc=/^https?$/i,Ic=["POST","PUT"];r=W.prototype,r.Fa=function(s){this.H=s},r.ea=function(s,u,c,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);u=u?u.toUpperCase():"GET",this.D=s,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ii.g(),this.g.onreadystatechange=S(d(this.Ca,this));try{this.B=!0,this.g.open(u,String(s),!0),this.B=!1}catch(w){qi(this,w);return}if(s=c||"",c=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var I in h)c.set(I,h[I]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(const w of h.keys())c.set(w,h.get(w));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(c.keys()).find(w=>w.toLowerCase()=="content-type"),I=a.FormData&&s instanceof a.FormData,!(Array.prototype.indexOf.call(Ic,u,void 0)>=0)||h||I||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,V]of c)this.g.setRequestHeader(w,V);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(s),this.v=!1}catch(w){qi(this,w)}};function qi(s,u){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=u,s.o=5,ji(s),Nn(s)}function ji(s){s.A||(s.A=!0,yt(s,"complete"),yt(s,"error"))}r.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=s||7,yt(this,"complete"),yt(this,"abort"),Nn(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Nn(this,!0)),W.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?$i(this):this.Xa())},r.Xa=function(){$i(this)};function $i(s){if(s.h&&typeof o<"u"){if(s.v&&Ut(s)==4)setTimeout(s.Ca.bind(s),0);else if(yt(s,"readystatechange"),Ut(s)==4){s.h=!1;try{const w=s.ca();t:switch(w){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var c;if(!(c=u)){var h;if(h=w===0){let V=String(s.D).match(Ni)[1]||null;!V&&a.self&&a.self.location&&(V=a.self.location.protocol.slice(0,-1)),h=!Tc.test(V?V.toLowerCase():"")}c=h}if(c)yt(s,"complete"),yt(s,"success");else{s.o=6;try{var I=Ut(s)>2?s.g.statusText:""}catch{I=""}s.l=I+" ["+s.ca()+"]",ji(s)}}finally{Nn(s)}}}}function Nn(s,u){if(s.g){s.m&&(clearTimeout(s.m),s.m=null);const c=s.g;s.g=null,u||yt(s,"ready");try{c.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function Ut(s){return s.g?s.g.readyState:0}r.ca=function(){try{return Ut(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(s){if(this.g){var u=this.g.responseText;return s&&u.indexOf(s)==0&&(u=u.substring(s.length)),tc(u)}};function zi(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.F){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function vc(s){const u={};s=(s.g&&Ut(s)>=2&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<s.length;h++){if(m(s[h]))continue;var c=oc(s[h]);const I=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const w=u[I]||[];u[I]=w,w.push(c)}Qu(u,function(h){return h.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function tn(s,u,c){return c&&c.internalChannelParams&&c.internalChannelParams[s]||u}function Gi(s){this.za=0,this.i=[],this.j=new ze,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=tn("failFast",!1,s),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=tn("baseRetryDelayMs",5e3,s),this.Za=tn("retryDelaySeedMs",1e4,s),this.Ta=tn("forwardChannelMaxRetries",2,s),this.va=tn("forwardChannelRequestTimeoutMs",2e4,s),this.ma=s&&s.xmlHttpFactory||void 0,this.Ua=s&&s.Rb||void 0,this.Aa=s&&s.useFetchStreams||!1,this.O=void 0,this.L=s&&s.supportsCrossDomainXhr||!1,this.M="",this.h=new Ci(s&&s.concurrentRequestLimit),this.Ba=new Ec,this.S=s&&s.fastHandshake||!1,this.R=s&&s.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=s&&s.Pb||!1,s&&s.ua&&this.j.ua(),s&&s.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&s&&s.detectBufferingProxy||!1,this.ia=void 0,s&&s.longPollingTimeout&&s.longPollingTimeout>0&&(this.ia=s.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Gi.prototype,r.ka=8,r.I=1,r.connect=function(s,u,c,h){Et(0),this.W=s,this.H=u||{},c&&h!==void 0&&(this.H.OSID=c,this.H.OAID=h),this.F=this.X,this.J=to(this,null,this.W),On(this)};function Br(s){if(Hi(s),s.I==3){var u=s.V++,c=Ct(s.J);if(G(c,"SID",s.M),G(c,"RID",u),G(c,"TYPE","terminate"),en(s,c),u=new Mt(s,s.j,u),u.M=2,u.A=bn(Ct(c)),c=!1,a.navigator&&a.navigator.sendBeacon)try{c=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!c&&a.Image&&(new Image().src=u.A,c=!0),c||(u.g=eo(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Pn(u)}Zi(s)}function kn(s){s.g&&(jr(s),s.g.cancel(),s.g=null)}function Hi(s){kn(s),s.v&&(a.clearTimeout(s.v),s.v=null),xn(s),s.h.cancel(),s.m&&(typeof s.m=="number"&&a.clearTimeout(s.m),s.m=null)}function On(s){if(!Vi(s.h)&&!s.m){s.m=!0;var u=s.Ea;lt||p(),ht||(lt(),ht=!0),E.add(u,s),s.D=0}}function Ac(s,u){return Pi(s.h)>=s.h.j-(s.m?1:0)?!1:s.m?(s.i=u.G.concat(s.i),!0):s.I==1||s.I==2||s.D>=(s.Sa?0:s.Ta)?!1:(s.m=$e(d(s.Ea,s,u),Xi(s,s.D)),s.D++,!0)}r.Ea=function(s){if(this.m)if(this.m=null,this.I==1){if(!s){this.V=Math.floor(Math.random()*1e5),s=this.V++;const I=new Mt(this,this.j,s);let w=this.o;if(this.U&&(w?(w=si(w),oi(w,this.U)):w=this.U),this.u!==null||this.R||(I.J=w,w=null),this.S)t:{for(var u=0,c=0;c<this.i.length;c++){e:{var h=this.i[c];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break e}h=void 0}if(h===void 0)break;if(u+=h,u>4096){u=c;break t}if(u===4096||c===this.i.length-1){u=c+1;break t}}u=1e3}else u=1e3;u=Qi(this,I,u),c=Ct(this.J),G(c,"RID",s),G(c,"CVER",22),this.G&&G(c,"X-HTTP-Session-Id",this.G),en(this,c),w&&(this.R?u="headers="+Ge(Bi(w))+"&"+u:this.u&&Ur(c,this.u,w)),Mr(this.h,I),this.Ra&&G(c,"TYPE","init"),this.S?(G(c,"$req",u),G(c,"SID","null"),I.U=!0,Nr(I,c,null)):Nr(I,c,u),this.I=2}}else this.I==3&&(s?Ki(this,s):this.i.length==0||Vi(this.h)||Ki(this))};function Ki(s,u){var c;u?c=u.l:c=s.V++;const h=Ct(s.J);G(h,"SID",s.M),G(h,"RID",c),G(h,"AID",s.K),en(s,h),s.u&&s.o&&Ur(h,s.u,s.o),c=new Mt(s,s.j,c,s.D+1),s.u===null&&(c.J=s.o),u&&(s.i=u.G.concat(s.i)),u=Qi(s,c,1e3),c.H=Math.round(s.va*.5)+Math.round(s.va*.5*Math.random()),Mr(s.h,c),Nr(c,h,u)}function en(s,u){s.H&&wn(s.H,function(c,h){G(u,h,c)}),s.l&&wn({},function(c,h){G(u,h,c)})}function Qi(s,u,c){c=Math.min(s.i.length,c);const h=s.l?d(s.l.Ka,s.l,s):null;t:{var I=s.i;let F=-1;for(;;){const rt=["count="+c];F==-1?c>0?(F=I[0].g,rt.push("ofs="+F)):F=0:rt.push("ofs="+F);let z=!0;for(let ot=0;ot<c;ot++){var w=I[ot].g;const Vt=I[ot].map;if(w-=F,w<0)F=Math.max(0,I[ot].g-100),z=!1;else try{w="req"+w+"_"||"";try{var V=Vt instanceof Map?Vt:Object.entries(Vt);for(const[ie,Bt]of V){let qt=Bt;l(Bt)&&(qt=Cr(Bt)),rt.push(w+ie+"="+encodeURIComponent(qt))}}catch(ie){throw rt.push(w+"type="+encodeURIComponent("_badmap")),ie}}catch{h&&h(Vt)}}if(z){V=rt.join("&");break t}}V=void 0}return s=s.i.splice(0,c),u.G=s,V}function Wi(s){if(!s.g&&!s.v){s.Y=1;var u=s.Da;lt||p(),ht||(lt(),ht=!0),E.add(u,s),s.A=0}}function qr(s){return s.g||s.v||s.A>=3?!1:(s.Y++,s.v=$e(d(s.Da,s),Xi(s,s.A)),s.A++,!0)}r.Da=function(){if(this.v=null,Yi(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var s=4*this.T;this.j.info("BP detection timer enabled: "+s),this.B=$e(d(this.Wa,this),s)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Et(10),kn(this),Yi(this))};function jr(s){s.B!=null&&(a.clearTimeout(s.B),s.B=null)}function Yi(s){s.g=new Mt(s,s.j,"rpc",s.Y),s.u===null&&(s.g.J=s.o),s.g.P=0;var u=Ct(s.na);G(u,"RID","rpc"),G(u,"SID",s.M),G(u,"AID",s.K),G(u,"CI",s.F?"0":"1"),!s.F&&s.ia&&G(u,"TO",s.ia),G(u,"TYPE","xmlhttp"),en(s,u),s.u&&s.o&&Ur(u,s.u,s.o),s.O&&(s.g.H=s.O);var c=s.g;s=s.ba,c.M=1,c.A=bn(Ct(u)),c.u=null,c.R=!0,wi(c,s)}r.Va=function(){this.C!=null&&(this.C=null,kn(this),qr(this),Et(19))};function xn(s){s.C!=null&&(a.clearTimeout(s.C),s.C=null)}function Ji(s,u){var c=null;if(s.g==u){xn(s),jr(s),s.g=null;var h=2}else if(xr(s.h,u))c=u.G,bi(s.h,u),h=1;else return;if(s.I!=0){if(u.o)if(h==1){c=u.u?u.u.length:0,u=Date.now()-u.F;var I=s.D;h=Cn(),yt(h,new Ei(h,c)),On(s)}else Wi(s);else if(I=u.m,I==3||I==0&&u.X>0||!(h==1&&Ac(s,u)||h==2&&qr(s)))switch(c&&c.length>0&&(u=s.h,u.i=u.i.concat(c)),I){case 1:se(s,5);break;case 4:se(s,10);break;case 3:se(s,6);break;default:se(s,2)}}}function Xi(s,u){let c=s.Qa+Math.floor(Math.random()*s.Za);return s.isActive()||(c*=2),c*u}function se(s,u){if(s.j.info("Error code "+u),u==2){var c=d(s.bb,s),h=s.Ua;const I=!h;h=new Lt(h||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Ke(h,"https"),bn(h),I?_c(h.toString(),c):yc(h.toString(),c)}else Et(2);s.I=0,s.l&&s.l.pa(u),Zi(s),Hi(s)}r.bb=function(s){s?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))};function Zi(s){if(s.I=0,s.ja=[],s.l){const u=Di(s.h);(u.length!=0||s.i.length!=0)&&(k(s.ja,u),k(s.ja,s.i),s.h.i.length=0,P(s.i),s.i.length=0),s.l.oa()}}function to(s,u,c){var h=c instanceof Lt?Ct(c):new Lt(c);if(h.g!="")u&&(h.g=u+"."+h.g),Qe(h,h.u);else{var I=a.location;h=I.protocol,u=u?u+"."+I.hostname:I.hostname,I=+I.port;const w=new Lt(null);h&&Ke(w,h),u&&(w.g=u),I&&Qe(w,I),c&&(w.h=c),h=w}return c=s.G,u=s.wa,c&&u&&G(h,c,u),G(h,"VER",s.ka),en(s,h),h}function eo(s,u,c){if(u&&!s.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=s.Aa&&!s.ma?new W(new Fr({ab:c})):new W(s.ma),u.Fa(s.L),u}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function no(){}r=no.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Mn(){}Mn.prototype.g=function(s,u){return new vt(s,u)};function vt(s,u){ft.call(this),this.g=new Gi(u),this.l=s,this.h=u&&u.messageUrlParams||null,s=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(s?s["X-WebChannel-Content-Type"]=u.messageContentType:s={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(s?s["X-WebChannel-Client-Profile"]=u.sa:s={"X-WebChannel-Client-Profile":u.sa}),this.g.U=s,(s=u&&u.Qb)&&!m(s)&&(this.g.u=s),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!m(u)&&(this.g.G=u,s=this.h,s!==null&&u in s&&(s=this.h,u in s&&delete s[u])),this.j=new me(this)}A(vt,ft),vt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},vt.prototype.close=function(){Br(this.g)},vt.prototype.o=function(s){var u=this.g;if(typeof s=="string"){var c={};c.__data__=s,s=c}else this.v&&(c={},c.__data__=Cr(s),s=c);u.i.push(new cc(u.Ya++,s)),u.I==3&&On(u)},vt.prototype.N=function(){this.g.l=null,delete this.j,Br(this.g),delete this.g,vt.Z.N.call(this)};function ro(s){Vr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var u=s.__sm__;if(u){t:{for(const c in u){s=c;break t}s=void 0}(this.i=s)&&(s=this.i,u=u!==null&&s in u?u[s]:void 0),this.data=u}else this.data=s}A(ro,Vr);function so(){Pr.call(this),this.status=1}A(so,Pr);function me(s){this.g=s}A(me,no),me.prototype.ra=function(){yt(this.g,"a")},me.prototype.qa=function(s){yt(this.g,new ro(s))},me.prototype.pa=function(s){yt(this.g,new so)},me.prototype.oa=function(){yt(this.g,"b")},Mn.prototype.createWebChannel=Mn.prototype.g,vt.prototype.send=vt.prototype.o,vt.prototype.open=vt.prototype.m,vt.prototype.close=vt.prototype.close,Na=function(){return new Mn},Da=function(){return Cn()},ba=ee,is={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Vn.NO_ERROR=0,Vn.TIMEOUT=8,Vn.HTTP_ERROR=6,$n=Vn,Ti.COMPLETE="complete",Pa=Ti,mi.EventType=qe,qe.OPEN="a",qe.CLOSE="b",qe.ERROR="c",qe.MESSAGE="d",ft.prototype.listen=ft.prototype.J,rn=mi,W.prototype.listenOnce=W.prototype.K,W.prototype.getLastError=W.prototype.Ha,W.prototype.getLastErrorCode=W.prototype.ya,W.prototype.getStatus=W.prototype.ca,W.prototype.getResponseJson=W.prototype.La,W.prototype.getResponseText=W.prototype.la,W.prototype.send=W.prototype.ea,W.prototype.setWithCredentials=W.prototype.Fa,Va=W}).apply(typeof Fn<"u"?Fn:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class pt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}pt.UNAUTHENTICATED=new pt(null),pt.GOOGLE_CREDENTIALS=new pt("google-credentials-uid"),pt.FIRST_PARTY=new pt("first-party-uid"),pt.MOCK_USER=new pt("mock-user");/**
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
 */let xe="12.11.0";function ah(r){xe=r}/**
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
 *//**
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
 */const le=new va("@firebase/firestore");function ge(){return le.logLevel}function b(r,...t){if(le.logLevel<=q.DEBUG){const e=t.map(Ss);le.debug(`Firestore (${xe}): ${r}`,...e)}}function xt(r,...t){if(le.logLevel<=q.ERROR){const e=t.map(Ss);le.error(`Firestore (${xe}): ${r}`,...e)}}function he(r,...t){if(le.logLevel<=q.WARN){const e=t.map(Ss);le.warn(`Firestore (${xe}): ${r}`,...e)}}function Ss(r){if(typeof r=="string")return r;try{return(function(e){return JSON.stringify(e)})(r)}catch{return r}}/**
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
 */function M(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,ka(r,n,e)}function ka(r,t,e){let n=`FIRESTORE (${xe}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw xt(n),new Error(n)}function Q(r,t,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,r||ka(t,i,n)}function j(r,t){return r}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Oe{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ie{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
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
 */class Oa{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class uh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(pt.UNAUTHENTICATED)))}shutdown(){}}class ch{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class lh{constructor(t){this.t=t,this.currentUser=pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Q(this.o===void 0,42304);let n=this.i;const i=f=>this.i!==n?(n=this.i,e(f)):Promise.resolve();let o=new Ie;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Ie,t.enqueueRetryable((()=>i(this.currentUser)))};const a=()=>{const f=o;t.enqueueRetryable((async()=>{await f.promise,await i(this.currentUser)}))},l=f=>{b("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=f,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((f=>l(f))),setTimeout((()=>{if(!this.auth){const f=this.t.getImmediate({optional:!0});f?l(f):(b("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Ie)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((n=>this.i!==t?(b("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(Q(typeof n.accessToken=="string",31837,{l:n}),new Oa(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Q(t===null||typeof t=="string",2055,{h:t}),new pt(t)}}class hh{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=pt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class fh{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new hh(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(pt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class _o{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class dh{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,$l(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Q(this.o===void 0,3512);const n=o=>{o.error!=null&&b("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,b("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>n(o)))};const i=o=>{b("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>i(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):b("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new _o(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(Q(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new _o(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function ph(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class xa{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=ph(40);for(let o=0;o<i.length;++o)n.length<20&&i[o]<e&&(n+=t.charAt(i[o]%62))}return n}}function U(r,t){return r<t?-1:r>t?1:0}function os(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const i=r.charAt(n),o=t.charAt(n);if(i!==o)return Qr(i)===Qr(o)?U(i,o):Qr(i)?1:-1}return U(r.length,t.length)}const mh=55296,gh=57343;function Qr(r){const t=r.charCodeAt(0);return t>=mh&&t<=gh}function Ve(r,t,e){return r.length===t.length&&r.every(((n,i)=>e(n,t[i])))}/**
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
 */const yo="__name__";class Pt{constructor(t,e,n){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&M(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Pt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Pt?t.forEach((n=>{e.push(n)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const o=Pt.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return U(t.length,e.length)}static compareSegments(t,e){const n=Pt.isNumericId(t),i=Pt.isNumericId(e);return n&&!i?-1:!n&&i?1:n&&i?Pt.extractNumericId(t).compare(Pt.extractNumericId(e)):os(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Ht.fromString(t.substring(4,t.length-2))}}class H extends Pt{construct(t,e,n){return new H(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new D(C.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((i=>i.length>0)))}return new H(e)}static emptyPath(){return new H([])}}const _h=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class gt extends Pt{construct(t,e,n){return new gt(t,e,n)}static isValidIdentifier(t){return _h.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),gt.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===yo}static keyField(){return new gt([yo])}static fromServerFormat(t){const e=[];let n="",i=0;const o=()=>{if(n.length===0)throw new D(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;i<t.length;){const l=t[i];if(l==="\\"){if(i+1===t.length)throw new D(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const f=t[i+1];if(f!=="\\"&&f!=="."&&f!=="`")throw new D(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=f,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(n+=l,i++):(o(),i++)}if(o(),a)throw new D(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new gt(e)}static emptyPath(){return new gt([])}}/**
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
 */class N{constructor(t){this.path=t}static fromPath(t){return new N(H.fromString(t))}static fromName(t){return new N(H.fromString(t).popFirst(5))}static empty(){return new N(H.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&H.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return H.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new N(new H(t.slice()))}}function yh(r,t,e,n){if(t===!0&&n===!0)throw new D(C.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Eo(r){if(N.isDocumentKey(r))throw new D(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Ma(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function ur(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=(function(n){return n.constructor?n.constructor.name:null})(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function zn(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new D(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ur(r);throw new D(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
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
 */function et(r,t){const e={typeString:r};return t&&(e.value=t),e}function En(r,t){if(!Ma(r))throw new D(C.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const i=t[n].typeString,o="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const a=r[n];if(i&&typeof a!==i){e=`JSON field '${n}' must be a ${i}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${n}' field to equal '${o.value}'`;break}}if(e)throw new D(C.INVALID_ARGUMENT,e);return!0}/**
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
 */const To=-62135596800,Io=1e6;class K{static now(){return K.fromMillis(Date.now())}static fromDate(t){return K.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Io);return new K(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new D(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new D(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<To)throw new D(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new D(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Io}_compareTo(t){return this.seconds===t.seconds?U(this.nanoseconds,t.nanoseconds):U(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:K._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(En(t,K._jsonSchema))return new K(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-To;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}K._jsonSchemaVersion="firestore/timestamp/1.0",K._jsonSchema={type:et("string",K._jsonSchemaVersion),seconds:et("number"),nanoseconds:et("number")};/**
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
 */class x{static fromTimestamp(t){return new x(t)}static min(){return new x(new K(0,0))}static max(){return new x(new K(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const pn=-1;function Eh(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=x.fromTimestamp(n===1e9?new K(e+1,0):new K(e,n));return new Kt(i,N.empty(),t)}function Th(r){return new Kt(r.readTime,r.key,pn)}class Kt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Kt(x.min(),N.empty(),pn)}static max(){return new Kt(x.max(),N.empty(),pn)}}function Ih(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=N.comparator(r.documentKey,t.documentKey),e!==0?e:U(r.largestBatchId,t.largestBatchId))}/**
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
 */const vh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ah{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function cr(r){if(r.code!==C.FAILED_PRECONDITION||r.message!==vh)throw r;b("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class R{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new R(((n,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(n,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(n,i)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof R?e:R.resolve(e)}catch(e){return R.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):R.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):R.reject(e)}static resolve(t){return new R(((e,n)=>{e(t)}))}static reject(t){return new R(((e,n)=>{n(t)}))}static waitFor(t){return new R(((e,n)=>{let i=0,o=0,a=!1;t.forEach((l=>{++i,l.next((()=>{++o,a&&o===i&&e()}),(f=>n(f)))})),a=!0,o===i&&e()}))}static or(t){let e=R.resolve(!1);for(const n of t)e=e.next((i=>i?R.resolve(i):n()));return e}static forEach(t,e){const n=[];return t.forEach(((i,o)=>{n.push(e.call(this,i,o))})),this.waitFor(n)}static mapArray(t,e){return new R(((n,i)=>{const o=t.length,a=new Array(o);let l=0;for(let f=0;f<o;f++){const d=f;e(t[d]).next((g=>{a[d]=g,++l,l===o&&n(a)}),(g=>i(g)))}}))}static doWhile(t,e){return new R(((n,i)=>{const o=()=>{t()===!0?e().next((()=>{o()}),i):n()};o()}))}}function wh(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Me(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class lr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}lr.ce=-1;/**
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
 */const Rh=-1;function hr(r){return r==null}function Zn(r){return r===0&&1/r==-1/0}function Sh(r){return typeof r=="number"&&Number.isInteger(r)&&!Zn(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const La="";function Ch(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=vo(t)),t=Vh(r.get(e),t);return vo(t)}function Vh(r,t){let e=t;const n=r.length;for(let i=0;i<n;i++){const o=r.charAt(i);switch(o){case"\0":e+="";break;case La:e+="";break;default:e+=o}}return e}function vo(r){return r+La+""}/**
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
 */function Ao(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function Le(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Fa(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class X{constructor(t,e){this.comparator=t,this.root=e||ut.EMPTY}insert(t,e){return new X(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(t){return new X(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ut.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(t,n.key);if(i===0)return e+n.left.size;i<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Un(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Un(this.root,t,this.comparator,!1)}getReverseIterator(){return new Un(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Un(this.root,t,this.comparator,!0)}}class Un{constructor(t,e,n,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ut{constructor(t,e,n,i,o){this.key=t,this.value=e,this.color=n??ut.RED,this.left=i??ut.EMPTY,this.right=o??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,i,o){return new ut(t??this.key,e??this.value,n??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let i=this;const o=n(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,n),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return ut.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,n,i,o){return this}insert(t,e,n){return new ut(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class st{constructor(t){this.comparator=t,this.data=new X(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new wo(this.data.getIterator())}getIteratorFrom(t){return new wo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((n=>{e=e.add(n)})),e}isEqual(t){if(!(t instanceof st)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new st(this.comparator);return e.data=t,e}}class wo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class jt{constructor(t){this.fields=t,t.sort(gt.comparator)}static empty(){return new jt([])}unionWith(t){let e=new st(gt.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new jt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Ve(this.fields,t.fields,((e,n)=>e.isEqual(n)))}}/**
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
 */class Ua extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ct{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Ua("Invalid base64 string: "+o):o}})(t);return new ct(e)}static fromUint8Array(t){const e=(function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o})(t);return new ct(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return U(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ct.EMPTY_BYTE_STRING=new ct("");const Ph=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Qt(r){if(Q(!!r,39018),typeof r=="string"){let t=0;const e=Ph.exec(r);if(Q(!!e,46558,{timestamp:r}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:J(r.seconds),nanos:J(r.nanos)}}function J(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Wt(r){return typeof r=="string"?ct.fromBase64String(r):ct.fromUint8Array(r)}/**
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
 */const Ba="server_timestamp",qa="__type__",ja="__previous_value__",$a="__local_write_time__";function Cs(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[qa])==null?void 0:n.stringValue)===Ba}function fr(r){const t=r.mapValue.fields[ja];return Cs(t)?fr(t):t}function mn(r){const t=Qt(r.mapValue.fields[$a].timestampValue);return new K(t.seconds,t.nanos)}/**
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
 */class bh{constructor(t,e,n,i,o,a,l,f,d,g,A){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=f,this.useFetchStreams=d,this.isUsingEmulator=g,this.apiKey=A}}const as="(default)";class gn{constructor(t,e){this.projectId=t,this.database=e||as}static empty(){return new gn("","")}get isDefaultDatabase(){return this.database===as}isEqual(t){return t instanceof gn&&t.projectId===this.projectId&&t.database===this.database}}function Dh(r,t){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new D(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new gn(r.options.projectId,t)}/**
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
 */const za="__type__",Nh="__max__",Bn={mapValue:{}},Ga="__vector__",tr="value";function Yt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Cs(r)?4:Oh(r)?9007199254740991:kh(r)?10:11:M(28295,{value:r})}function kt(r,t){if(r===t)return!0;const e=Yt(r);if(e!==Yt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return mn(r).isEqual(mn(t));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=Qt(i.timestampValue),l=Qt(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(r,t);case 5:return r.stringValue===t.stringValue;case 6:return(function(i,o){return Wt(i.bytesValue).isEqual(Wt(o.bytesValue))})(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return(function(i,o){return J(i.geoPointValue.latitude)===J(o.geoPointValue.latitude)&&J(i.geoPointValue.longitude)===J(o.geoPointValue.longitude)})(r,t);case 2:return(function(i,o){if("integerValue"in i&&"integerValue"in o)return J(i.integerValue)===J(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const a=J(i.doubleValue),l=J(o.doubleValue);return a===l?Zn(a)===Zn(l):isNaN(a)&&isNaN(l)}return!1})(r,t);case 9:return Ve(r.arrayValue.values||[],t.arrayValue.values||[],kt);case 10:case 11:return(function(i,o){const a=i.mapValue.fields||{},l=o.mapValue.fields||{};if(Ao(a)!==Ao(l))return!1;for(const f in a)if(a.hasOwnProperty(f)&&(l[f]===void 0||!kt(a[f],l[f])))return!1;return!0})(r,t);default:return M(52216,{left:r})}}function _n(r,t){return(r.values||[]).find((e=>kt(e,t)))!==void 0}function Pe(r,t){if(r===t)return 0;const e=Yt(r),n=Yt(t);if(e!==n)return U(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return U(r.booleanValue,t.booleanValue);case 2:return(function(o,a){const l=J(o.integerValue||o.doubleValue),f=J(a.integerValue||a.doubleValue);return l<f?-1:l>f?1:l===f?0:isNaN(l)?isNaN(f)?0:-1:1})(r,t);case 3:return Ro(r.timestampValue,t.timestampValue);case 4:return Ro(mn(r),mn(t));case 5:return os(r.stringValue,t.stringValue);case 6:return(function(o,a){const l=Wt(o),f=Wt(a);return l.compareTo(f)})(r.bytesValue,t.bytesValue);case 7:return(function(o,a){const l=o.split("/"),f=a.split("/");for(let d=0;d<l.length&&d<f.length;d++){const g=U(l[d],f[d]);if(g!==0)return g}return U(l.length,f.length)})(r.referenceValue,t.referenceValue);case 8:return(function(o,a){const l=U(J(o.latitude),J(a.latitude));return l!==0?l:U(J(o.longitude),J(a.longitude))})(r.geoPointValue,t.geoPointValue);case 9:return So(r.arrayValue,t.arrayValue);case 10:return(function(o,a){var S,P,k,L;const l=o.fields||{},f=a.fields||{},d=(S=l[tr])==null?void 0:S.arrayValue,g=(P=f[tr])==null?void 0:P.arrayValue,A=U(((k=d==null?void 0:d.values)==null?void 0:k.length)||0,((L=g==null?void 0:g.values)==null?void 0:L.length)||0);return A!==0?A:So(d,g)})(r.mapValue,t.mapValue);case 11:return(function(o,a){if(o===Bn.mapValue&&a===Bn.mapValue)return 0;if(o===Bn.mapValue)return 1;if(a===Bn.mapValue)return-1;const l=o.fields||{},f=Object.keys(l),d=a.fields||{},g=Object.keys(d);f.sort(),g.sort();for(let A=0;A<f.length&&A<g.length;++A){const S=os(f[A],g[A]);if(S!==0)return S;const P=Pe(l[f[A]],d[g[A]]);if(P!==0)return P}return U(f.length,g.length)})(r.mapValue,t.mapValue);default:throw M(23264,{he:e})}}function Ro(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return U(r,t);const e=Qt(r),n=Qt(t),i=U(e.seconds,n.seconds);return i!==0?i:U(e.nanos,n.nanos)}function So(r,t){const e=r.values||[],n=t.values||[];for(let i=0;i<e.length&&i<n.length;++i){const o=Pe(e[i],n[i]);if(o)return o}return U(e.length,n.length)}function be(r){return us(r)}function us(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(e){const n=Qt(e);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(e){return Wt(e).toBase64()})(r.bytesValue):"referenceValue"in r?(function(e){return N.fromName(e).toString()})(r.referenceValue):"geoPointValue"in r?(function(e){return`geo(${e.latitude},${e.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(e){let n="[",i=!0;for(const o of e.values||[])i?i=!1:n+=",",n+=us(o);return n+"]"})(r.arrayValue):"mapValue"in r?(function(e){const n=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const a of n)o?o=!1:i+=",",i+=`${a}:${us(e.fields[a])}`;return i+"}"})(r.mapValue):M(61005,{value:r})}function Gn(r){switch(Yt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=fr(r);return t?16+Gn(t):16;case 5:return 2*r.stringValue.length;case 6:return Wt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((i,o)=>i+Gn(o)),0)})(r.arrayValue);case 10:case 11:return(function(n){let i=0;return Le(n.fields,((o,a)=>{i+=o.length+Gn(a)})),i})(r.mapValue);default:throw M(13486,{value:r})}}function Co(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function cs(r){return!!r&&"integerValue"in r}function Vs(r){return!!r&&"arrayValue"in r}function Vo(r){return!!r&&"nullValue"in r}function Po(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Wr(r){return!!r&&"mapValue"in r}function kh(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[za])==null?void 0:n.stringValue)===Ga}function un(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return Le(r.mapValue.fields,((e,n)=>t.mapValue.fields[e]=un(n))),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=un(r.arrayValue.values[e]);return t}return{...r}}function Oh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Nh}/**
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
 */class bt{constructor(t){this.value=t}static empty(){return new bt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Wr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=un(e)}setAll(t){let e=gt.emptyPath(),n={},i=[];t.forEach(((a,l)=>{if(!e.isImmediateParentOf(l)){const f=this.getFieldsMap(e);this.applyChanges(f,n,i),n={},i=[],e=l.popLast()}a?n[l.lastSegment()]=un(a):i.push(l.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,n,i)}delete(t){const e=this.field(t.popLast());Wr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return kt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let i=e.mapValue.fields[t.get(n)];Wr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,n){Le(e,((i,o)=>t[i]=o));for(const i of n)delete t[i]}clone(){return new bt(un(this.value))}}/**
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
 */class mt{constructor(t,e,n,i,o,a,l){this.key=t,this.documentType=e,this.version=n,this.readTime=i,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new mt(t,0,x.min(),x.min(),x.min(),bt.empty(),0)}static newFoundDocument(t,e,n,i){return new mt(t,1,e,x.min(),n,i,0)}static newNoDocument(t,e){return new mt(t,2,e,x.min(),x.min(),bt.empty(),0)}static newUnknownDocument(t,e){return new mt(t,3,e,x.min(),x.min(),bt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(x.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=bt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=bt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=x.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof mt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new mt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class er{constructor(t,e){this.position=t,this.inclusive=e}}function bo(r,t,e){let n=0;for(let i=0;i<r.position.length;i++){const o=t[i],a=r.position[i];if(o.field.isKeyField()?n=N.comparator(N.fromName(a.referenceValue),e.key):n=Pe(a,e.data.field(o.field)),o.dir==="desc"&&(n*=-1),n!==0)break}return n}function Do(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!kt(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class yn{constructor(t,e="asc"){this.field=t,this.dir=e}}function xh(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class Ha{}class tt extends Ha{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Lh(t,e,n):e==="array-contains"?new Bh(t,n):e==="in"?new qh(t,n):e==="not-in"?new jh(t,n):e==="array-contains-any"?new $h(t,n):new tt(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Fh(t,n):new Uh(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Pe(e,this.value)):e!==null&&Yt(this.value)===Yt(e)&&this.matchesComparison(Pe(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class St extends Ha{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new St(t,e)}matches(t){return Ka(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ka(r){return r.op==="and"}function Qa(r){return Mh(r)&&Ka(r)}function Mh(r){for(const t of r.filters)if(t instanceof St)return!1;return!0}function ls(r){if(r instanceof tt)return r.field.canonicalString()+r.op.toString()+be(r.value);if(Qa(r))return r.filters.map((t=>ls(t))).join(",");{const t=r.filters.map((e=>ls(e))).join(",");return`${r.op}(${t})`}}function Wa(r,t){return r instanceof tt?(function(n,i){return i instanceof tt&&n.op===i.op&&n.field.isEqual(i.field)&&kt(n.value,i.value)})(r,t):r instanceof St?(function(n,i){return i instanceof St&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce(((o,a,l)=>o&&Wa(a,i.filters[l])),!0):!1})(r,t):void M(19439)}function Ya(r){return r instanceof tt?(function(e){return`${e.field.canonicalString()} ${e.op} ${be(e.value)}`})(r):r instanceof St?(function(e){return e.op.toString()+" {"+e.getFilters().map(Ya).join(" ,")+"}"})(r):"Filter"}class Lh extends tt{constructor(t,e,n){super(t,e,n),this.key=N.fromName(n.referenceValue)}matches(t){const e=N.comparator(t.key,this.key);return this.matchesComparison(e)}}class Fh extends tt{constructor(t,e){super(t,"in",e),this.keys=Ja("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Uh extends tt{constructor(t,e){super(t,"not-in",e),this.keys=Ja("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Ja(r,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((n=>N.fromName(n.referenceValue)))}class Bh extends tt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Vs(e)&&_n(e.arrayValue,this.value)}}class qh extends tt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&_n(this.value.arrayValue,e)}}class jh extends tt{constructor(t,e){super(t,"not-in",e)}matches(t){if(_n(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!_n(this.value.arrayValue,e)}}class $h extends tt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Vs(e)||!e.arrayValue.values)&&e.arrayValue.values.some((n=>_n(this.value.arrayValue,n)))}}/**
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
 */class zh{constructor(t,e=null,n=[],i=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=i,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function No(r,t=null,e=[],n=[],i=null,o=null,a=null){return new zh(r,t,e,n,i,o,a)}function Ps(r){const t=j(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((n=>ls(n))).join(","),e+="|ob:",e+=t.orderBy.map((n=>(function(o){return o.field.canonicalString()+o.dir})(n))).join(","),hr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((n=>be(n))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((n=>be(n))).join(",")),t.Te=e}return t.Te}function bs(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!xh(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!Wa(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Do(r.startAt,t.startAt)&&Do(r.endAt,t.endAt)}function hs(r){return N.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
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
 */class Fe{constructor(t,e=null,n=[],i=[],o=null,a="F",l=null,f=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=i,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=f,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Gh(r,t,e,n,i,o,a,l){return new Fe(r,t,e,n,i,o,a,l)}function Ds(r){return new Fe(r)}function ko(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Hh(r){return N.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Xa(r){return r.collectionGroup!==null}function cn(r){const t=j(r);if(t.Ee===null){t.Ee=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ee.push(o),e.add(o.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new st(gt.comparator);return a.filters.forEach((f=>{f.getFlattenedFilters().forEach((d=>{d.isInequality()&&(l=l.add(d.field))}))})),l})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ee.push(new yn(o,n))})),e.has(gt.keyField().canonicalString())||t.Ee.push(new yn(gt.keyField(),n))}return t.Ee}function Dt(r){const t=j(r);return t.Ie||(t.Ie=Kh(t,cn(r))),t.Ie}function Kh(r,t){if(r.limitType==="F")return No(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map((i=>{const o=i.dir==="desc"?"asc":"desc";return new yn(i.field,o)}));const e=r.endAt?new er(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new er(r.startAt.position,r.startAt.inclusive):null;return No(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function fs(r,t){const e=r.filters.concat([t]);return new Fe(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function Qh(r,t){const e=r.explicitOrderBy.concat([t]);return new Fe(r.path,r.collectionGroup,e,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function nr(r,t,e){return new Fe(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function dr(r,t){return bs(Dt(r),Dt(t))&&r.limitType===t.limitType}function Za(r){return`${Ps(Dt(r))}|lt:${r.limitType}`}function _e(r){return`Query(target=${(function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map((i=>Ya(i))).join(", ")}]`),hr(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map((i=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(i))).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((i=>be(i))).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((i=>be(i))).join(",")),`Target(${n})`})(Dt(r))}; limitType=${r.limitType})`}function pr(r,t){return t.isFoundDocument()&&(function(n,i){const o=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):N.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)})(r,t)&&(function(n,i){for(const o of cn(n))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0})(r,t)&&(function(n,i){for(const o of n.filters)if(!o.matches(i))return!1;return!0})(r,t)&&(function(n,i){return!(n.startAt&&!(function(a,l,f){const d=bo(a,l,f);return a.inclusive?d<=0:d<0})(n.startAt,cn(n),i)||n.endAt&&!(function(a,l,f){const d=bo(a,l,f);return a.inclusive?d>=0:d>0})(n.endAt,cn(n),i))})(r,t)}function Wh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function tu(r){return(t,e)=>{let n=!1;for(const i of cn(r)){const o=Yh(i,t,e);if(o!==0)return o;n=n||i.field.isKeyField()}return 0}}function Yh(r,t,e){const n=r.field.isKeyField()?N.comparator(t.key,e.key):(function(o,a,l){const f=a.data.field(o),d=l.data.field(o);return f!==null&&d!==null?Pe(f,d):M(42886)})(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
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
 */class fe{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[i,o]of n)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),i=this.inner[n];if(i===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],t))return n.length===1?delete this.inner[e]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(t){Le(this.inner,((e,n)=>{for(const[i,o]of n)t(i,o)}))}isEmpty(){return Fa(this.inner)}size(){return this.innerSize}}/**
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
 */const Jh=new X(N.comparator);function Jt(){return Jh}const eu=new X(N.comparator);function sn(...r){let t=eu;for(const e of r)t=t.insert(e.key,e);return t}function Xh(r){let t=eu;return r.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function ae(){return ln()}function nu(){return ln()}function ln(){return new fe((r=>r.toString()),((r,t)=>r.isEqual(t)))}const Zh=new st(N.comparator);function $(...r){let t=Zh;for(const e of r)t=t.add(e);return t}const tf=new st(U);function ef(){return tf}/**
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
 */function Ns(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Zn(t)?"-0":t}}function ru(r){return{integerValue:""+r}}function nf(r,t){return Sh(t)?ru(t):Ns(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class mr{constructor(){this._=void 0}}function rf(r,t,e){return r instanceof ds?(function(i,o){const a={fields:{[qa]:{stringValue:Ba},[$a]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Cs(o)&&(o=fr(o)),o&&(a.fields[ja]=o),{mapValue:a}})(e,t):r instanceof rr?su(r,t):r instanceof sr?iu(r,t):(function(i,o){const a=of(i,o),l=Oo(a)+Oo(i.Ae);return cs(a)&&cs(i.Ae)?ru(l):Ns(i.serializer,l)})(r,t)}function sf(r,t,e){return r instanceof rr?su(r,t):r instanceof sr?iu(r,t):e}function of(r,t){return r instanceof ps?(function(n){return cs(n)||(function(o){return!!o&&"doubleValue"in o})(n)})(t)?t:{integerValue:0}:null}class ds extends mr{}class rr extends mr{constructor(t){super(),this.elements=t}}function su(r,t){const e=ou(t);for(const n of r.elements)e.some((i=>kt(i,n)))||e.push(n);return{arrayValue:{values:e}}}class sr extends mr{constructor(t){super(),this.elements=t}}function iu(r,t){let e=ou(t);for(const n of r.elements)e=e.filter((i=>!kt(i,n)));return{arrayValue:{values:e}}}class ps extends mr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Oo(r){return J(r.integerValue||r.doubleValue)}function ou(r){return Vs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function af(r,t){return r.field.isEqual(t.field)&&(function(n,i){return n instanceof rr&&i instanceof rr||n instanceof sr&&i instanceof sr?Ve(n.elements,i.elements,kt):n instanceof ps&&i instanceof ps?kt(n.Ae,i.Ae):n instanceof ds&&i instanceof ds})(r.transform,t.transform)}class ue{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ue}static exists(t){return new ue(void 0,t)}static updateTime(t){return new ue(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Hn(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class ks{}function au(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new cf(r.key,ue.none()):new Os(r.key,r.data,ue.none());{const e=r.data,n=bt.empty();let i=new st(gt.comparator);for(let o of t.fields)if(!i.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?n.delete(o):n.set(o,a),i=i.add(o)}return new gr(r.key,n,new jt(i.toArray()),ue.none())}}function uf(r,t,e){r instanceof Os?(function(i,o,a){const l=i.value.clone(),f=Mo(i.fieldTransforms,o,a.transformResults);l.setAll(f),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(r,t,e):r instanceof gr?(function(i,o,a){if(!Hn(i.precondition,o))return void o.convertToUnknownDocument(a.version);const l=Mo(i.fieldTransforms,o,a.transformResults),f=o.data;f.setAll(uu(i)),f.setAll(l),o.convertToFoundDocument(a.version,f).setHasCommittedMutations()})(r,t,e):(function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function hn(r,t,e,n){return r instanceof Os?(function(o,a,l,f){if(!Hn(o.precondition,a))return l;const d=o.value.clone(),g=Lo(o.fieldTransforms,f,a);return d.setAll(g),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(r,t,e,n):r instanceof gr?(function(o,a,l,f){if(!Hn(o.precondition,a))return l;const d=Lo(o.fieldTransforms,f,a),g=a.data;return g.setAll(uu(o)),g.setAll(d),a.convertToFoundDocument(a.version,g).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((A=>A.field)))})(r,t,e,n):(function(o,a,l){return Hn(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(r,t,e)}function xo(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!(function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&Ve(n,i,((o,a)=>af(o,a)))})(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class Os extends ks{constructor(t,e,n,i=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class gr extends ks{constructor(t,e,n,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function uu(r){const t=new Map;return r.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}})),t}function Mo(r,t,e){const n=new Map;Q(r.length===e.length,32656,{Ve:e.length,de:r.length});for(let i=0;i<e.length;i++){const o=r[i],a=o.transform,l=t.data.field(o.field);n.set(o.field,sf(a,l,e[i]))}return n}function Lo(r,t,e){const n=new Map;for(const i of r){const o=i.transform,a=e.data.field(i.field);n.set(i.field,rf(o,a,t))}return n}class cf extends ks{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class lf{constructor(t,e,n,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&uf(o,t,n[i])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=hn(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=hn(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=nu();return this.mutations.forEach((i=>{const o=t.get(i.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(i.key)?null:l;const f=au(a,l);f!==null&&n.set(i.key,f),a.isValidDocument()||a.convertToNoDocument(x.min())})),n}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),$())}isEqual(t){return this.batchId===t.batchId&&Ve(this.mutations,t.mutations,((e,n)=>xo(e,n)))&&Ve(this.baseMutations,t.baseMutations,((e,n)=>xo(e,n)))}}/**
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
 */class hf{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class ff{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var Z,B;function cu(r){if(r===void 0)return xt("GRPC error has no .code"),C.UNKNOWN;switch(r){case Z.OK:return C.OK;case Z.CANCELLED:return C.CANCELLED;case Z.UNKNOWN:return C.UNKNOWN;case Z.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case Z.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case Z.INTERNAL:return C.INTERNAL;case Z.UNAVAILABLE:return C.UNAVAILABLE;case Z.UNAUTHENTICATED:return C.UNAUTHENTICATED;case Z.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case Z.NOT_FOUND:return C.NOT_FOUND;case Z.ALREADY_EXISTS:return C.ALREADY_EXISTS;case Z.PERMISSION_DENIED:return C.PERMISSION_DENIED;case Z.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case Z.ABORTED:return C.ABORTED;case Z.OUT_OF_RANGE:return C.OUT_OF_RANGE;case Z.UNIMPLEMENTED:return C.UNIMPLEMENTED;case Z.DATA_LOSS:return C.DATA_LOSS;default:return M(39323,{code:r})}}(B=Z||(Z={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function df(){return new TextEncoder}/**
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
 */const pf=new Ht([4294967295,4294967295],0);function Fo(r){const t=df().encode(r),e=new Ca;return e.update(t),new Uint8Array(e.digest())}function Uo(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Ht([e,n],0),new Ht([i,o],0)]}class xs{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new on(`Invalid padding: ${e}`);if(n<0)throw new on(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new on(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new on(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Ht.fromNumber(this.ge)}ye(t,e,n){let i=t.add(e.multiply(Ht.fromNumber(n)));return i.compare(pf)===1&&(i=new Ht([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Fo(t),[n,i]=Uo(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(n,i,o);if(!this.we(a))return!1}return!0}static create(t,e,n){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new xs(o,i,e);return n.forEach((l=>a.insert(l))),a}insert(t){if(this.ge===0)return;const e=Fo(t),[n,i]=Uo(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(n,i,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class on extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class _r{constructor(t,e,n,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const i=new Map;return i.set(t,Tn.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new _r(x.min(),i,new X(U),Jt(),$())}}class Tn{constructor(t,e,n,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Tn(n,e,$(),$(),$())}}/**
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
 */class Kn{constructor(t,e,n,i){this.be=t,this.removedTargetIds=e,this.key=n,this.De=i}}class lu{constructor(t,e){this.targetId=t,this.Ce=e}}class hu{constructor(t,e,n=ct.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=i}}class Bo{constructor(){this.ve=0,this.Fe=qo(),this.Me=ct.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=$(),e=$(),n=$();return this.Fe.forEach(((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:n=n.add(i);break;default:M(38017,{changeType:o})}})),new Tn(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=qo()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,Q(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class mf{constructor(t){this.Ge=t,this.ze=new Map,this.je=Jt(),this.Je=qn(),this.He=qn(),this.Ze=new X(U)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.rt(e)&&n.Le(t.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(n.Qe(),n.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),n.Le(t.resumeToken));break;default:M(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((n,i)=>{this.rt(i)&&e(i)}))}st(t){const e=t.targetId,n=t.Ce.count,i=this.ot(e);if(i){const o=i.target;if(hs(o))if(n===0){const a=new N(o.path);this.et(e,a,mt.newNoDocument(a,x.min()))}else Q(n===1,20013,{expectedCount:n});else{const a=this._t(e);if(a!==n){const l=this.ut(t),f=l?this.ct(l,t,a):1;if(f!==0){this.it(e);const d=f===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,d)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:o=0}=e;let a,l;try{a=Wt(n).toUint8Array()}catch(f){if(f instanceof Ua)return he("Decoding the base64 bloom filter in existence filter failed ("+f.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw f}try{l=new xs(a,i,o)}catch(f){return he(f instanceof on?"BloomFilter error: ":"Applying bloom filter failed: ",f),null}return l.ge===0?null:l}ct(t,e,n){return e.Ce.count===n-this.Pt(t,e.targetId)?0:2}Pt(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let i=0;return n.forEach((o=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),i++)})),i}Tt(t){const e=new Map;this.ze.forEach(((o,a)=>{const l=this.ot(a);if(l){if(o.current&&hs(l.target)){const f=new N(l.target.path);this.Et(f).has(a)||this.It(a,f)||this.et(a,f,mt.newNoDocument(f,t))}o.Be&&(e.set(a,o.ke()),o.qe())}}));let n=$();this.He.forEach(((o,a)=>{let l=!0;a.forEachWhile((f=>{const d=this.ot(f);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(n=n.add(o))})),this.je.forEach(((o,a)=>a.setReadTime(t)));const i=new _r(t,e,this.Ze,this.je,n);return this.je=Jt(),this.Je=qn(),this.He=qn(),this.Ze=new X(U),i}Ye(t,e){if(!this.rt(t))return;const n=this.It(t,e.key)?2:0;this.nt(t).Ke(e.key,n),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.He=this.He.insert(e.key,this.Rt(e.key).add(t))}et(t,e,n){if(!this.rt(t))return;const i=this.nt(t);this.It(t,e)?i.Ke(e,1):i.Ue(e),this.He=this.He.insert(e,this.Rt(e).delete(t)),this.He=this.He.insert(e,this.Rt(e).add(t)),n&&(this.je=this.je.insert(e,n))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.nt(t).$e()}nt(t){let e=this.ze.get(t);return e||(e=new Bo,this.ze.set(t,e)),e}Rt(t){let e=this.He.get(t);return e||(e=new st(U),this.He=this.He.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new st(U),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||b("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Bo),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function qn(){return new X(N.comparator)}function qo(){return new X(N.comparator)}const gf={asc:"ASCENDING",desc:"DESCENDING"},_f={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},yf={and:"AND",or:"OR"};class Ef{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ms(r,t){return r.useProto3Json||hr(t)?t:{value:t}}function gs(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function fu(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function ve(r){return Q(!!r,49232),x.fromTimestamp((function(e){const n=Qt(e);return new K(n.seconds,n.nanos)})(r))}function du(r,t){return _s(r,t).canonicalString()}function _s(r,t){const e=(function(i){return new H(["projects",i.projectId,"databases",i.database])})(r).child("documents");return t===void 0?e:e.child(t)}function pu(r){const t=H.fromString(r);return Q(Eu(t),10190,{key:t.toString()}),t}function Yr(r,t){const e=pu(t);if(e.get(1)!==r.databaseId.projectId)throw new D(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new D(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new N(gu(e))}function mu(r,t){return du(r.databaseId,t)}function Tf(r){const t=pu(r);return t.length===4?H.emptyPath():gu(t)}function jo(r){return new H(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function gu(r){return Q(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function If(r,t){let e;if("targetChange"in t){t.targetChange;const n=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M(39313,{state:d})})(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=(function(d,g){return d.useProto3Json?(Q(g===void 0||typeof g=="string",58123),ct.fromBase64String(g||"")):(Q(g===void 0||g instanceof Buffer||g instanceof Uint8Array,16193),ct.fromUint8Array(g||new Uint8Array))})(r,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&(function(d){const g=d.code===void 0?C.UNKNOWN:cu(d.code);return new D(g,d.message||"")})(a);e=new hu(n,i,o,l||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const i=Yr(r,n.document.name),o=ve(n.document.updateTime),a=n.document.createTime?ve(n.document.createTime):x.min(),l=new bt({mapValue:{fields:n.document.fields}}),f=mt.newFoundDocument(i,o,a,l),d=n.targetIds||[],g=n.removedTargetIds||[];e=new Kn(d,g,f.key,f)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const i=Yr(r,n.document),o=n.readTime?ve(n.readTime):x.min(),a=mt.newNoDocument(i,o),l=n.removedTargetIds||[];e=new Kn([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const i=Yr(r,n.document),o=n.removedTargetIds||[];e=new Kn([],o,i,null)}else{if(!("filter"in t))return M(11601,{Vt:t});{t.filter;const n=t.filter;n.targetId;const{count:i=0,unchangedNames:o}=n,a=new ff(i,o),l=n.targetId;e=new lu(l,a)}}return e}function vf(r,t){return{documents:[mu(r,t.path)]}}function Af(r,t){const e={structuredQuery:{}},n=t.path;let i;t.collectionGroup!==null?(i=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=mu(r,i);const o=(function(d){if(d.length!==0)return yu(St.create(d,"and"))})(t.filters);o&&(e.structuredQuery.where=o);const a=(function(d){if(d.length!==0)return d.map((g=>(function(S){return{field:ye(S.field),direction:Sf(S.dir)}})(g)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=ms(r,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(t.endAt)),{ft:e,parent:i}}function wf(r){let t=Tf(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let i=null;if(n>0){Q(n===1,65062);const g=e.from[0];g.allDescendants?i=g.collectionId:t=t.child(g.collectionId)}let o=[];e.where&&(o=(function(A){const S=_u(A);return S instanceof St&&Qa(S)?S.getFilters():[S]})(e.where));let a=[];e.orderBy&&(a=(function(A){return A.map((S=>(function(k){return new yn(Ee(k.field),(function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(k.direction))})(S)))})(e.orderBy));let l=null;e.limit&&(l=(function(A){let S;return S=typeof A=="object"?A.value:A,hr(S)?null:S})(e.limit));let f=null;e.startAt&&(f=(function(A){const S=!!A.before,P=A.values||[];return new er(P,S)})(e.startAt));let d=null;return e.endAt&&(d=(function(A){const S=!A.before,P=A.values||[];return new er(P,S)})(e.endAt)),Gh(t,i,a,o,l,"F",f,d)}function Rf(r,t){const e=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:i})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function _u(r){return r.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Ee(e.unaryFilter.field);return tt.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=Ee(e.unaryFilter.field);return tt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ee(e.unaryFilter.field);return tt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ee(e.unaryFilter.field);return tt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}})(r):r.fieldFilter!==void 0?(function(e){return tt.create(Ee(e.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(e){return St.create(e.compositeFilter.filters.map((n=>_u(n))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M(1026)}})(e.compositeFilter.op))})(r):M(30097,{filter:r})}function Sf(r){return gf[r]}function Cf(r){return _f[r]}function Vf(r){return yf[r]}function ye(r){return{fieldPath:r.canonicalString()}}function Ee(r){return gt.fromServerFormat(r.fieldPath)}function yu(r){return r instanceof tt?(function(e){if(e.op==="=="){if(Po(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NAN"}};if(Vo(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Po(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NOT_NAN"}};if(Vo(e.value))return{unaryFilter:{field:ye(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ye(e.field),op:Cf(e.op),value:e.value}}})(r):r instanceof St?(function(e){const n=e.getFilters().map((i=>yu(i)));return n.length===1?n[0]:{compositeFilter:{op:Vf(e.op),filters:n}}})(r):M(54877,{filter:r})}function Eu(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function Tu(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
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
 */class $t{constructor(t,e,n,i,o=x.min(),a=x.min(),l=ct.EMPTY_BYTE_STRING,f=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=f}withSequenceNumber(t){return new $t(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Pf{constructor(t){this.yt=t}}function bf(r){const t=wf({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?nr(t,t.limit,"L"):t}/**
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
 */class Df{constructor(){this.bn=new Nf}addToCollectionParentIndex(t,e){return this.bn.add(e),R.resolve()}getCollectionParents(t,e){return R.resolve(this.bn.getEntries(e))}addFieldIndex(t,e){return R.resolve()}deleteFieldIndex(t,e){return R.resolve()}deleteAllFieldIndexes(t){return R.resolve()}createTargetIndexes(t,e){return R.resolve()}getDocumentsMatchingTarget(t,e){return R.resolve(null)}getIndexType(t,e){return R.resolve(0)}getFieldIndexes(t,e){return R.resolve([])}getNextCollectionGroupToUpdate(t){return R.resolve(null)}getMinOffset(t,e){return R.resolve(Kt.min())}getMinOffsetFromCollectionGroup(t,e){return R.resolve(Kt.min())}updateCollectionGroup(t,e,n){return R.resolve()}updateIndexEntries(t,e){return R.resolve()}}class Nf{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e]||new st(H.comparator),o=!i.has(n);return this.index[e]=i.add(n),o}has(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e];return i&&i.has(n)}getEntries(t){return(this.index[t]||new st(H.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
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
 */const $o={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Iu=41943040;class It{static withCacheSize(t){return new It(t,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
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
 */It.DEFAULT_COLLECTION_PERCENTILE=10,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,It.DEFAULT=new It(Iu,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),It.DISABLED=new It(-1,0,0);/**
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
 */class De{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new De(0)}static ar(){return new De(-1)}}/**
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
 */const zo="LruGarbageCollector",kf=1048576;function Go([r,t],[e,n]){const i=U(r,e);return i===0?U(t,n):i}class Of{constructor(t){this.Pr=t,this.buffer=new st(Go),this.Tr=0}Er(){return++this.Tr}Ir(t){const e=[t,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Go(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class xf{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){b(zo,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Me(e)?b(zo,"Ignoring IndexedDB error during garbage collection: ",e):await cr(e)}await this.Ar(3e5)}))}}class Mf{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next((n=>Math.floor(e/100*n)))}nthSequenceNumber(t,e){if(e===0)return R.resolve(lr.ce);const n=new Of(e);return this.Vr.forEachTarget(t,(i=>n.Ir(i.sequenceNumber))).next((()=>this.Vr.mr(t,(i=>n.Ir(i))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.Vr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(b("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve($o)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(b("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),$o):this.gr(t,e)))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let n,i,o,a,l,f,d;const g=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((A=>(A>this.params.maximumSequenceNumbersToCollect?(b("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${A}`),i=this.params.maximumSequenceNumbersToCollect):i=A,a=Date.now(),this.nthSequenceNumber(t,i)))).next((A=>(n=A,l=Date.now(),this.removeTargets(t,n,e)))).next((A=>(o=A,f=Date.now(),this.removeOrphanedDocuments(t,n)))).next((A=>(d=Date.now(),ge()<=q.DEBUG&&b("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-g}ms
	Determined least recently used ${i} in `+(l-a)+`ms
	Removed ${o} targets in `+(f-l)+`ms
	Removed ${A} documents in `+(d-f)+`ms
Total Duration: ${d-g}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:A}))))}}function Lf(r,t){return new Mf(r,t)}/**
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
 */class Ff{constructor(){this.changes=new fe((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,mt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?R.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 *//**
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
 */class Uf{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class Bf{constructor(t,e,n,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=i}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next((i=>(n=i,this.remoteDocumentCache.getEntry(t,e)))).next((i=>(n!==null&&hn(n.mutation,i,jt.empty(),K.now()),i)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.getLocalViewOfDocuments(t,n,$()).next((()=>n))))}getLocalViewOfDocuments(t,e,n=$()){const i=ae();return this.populateOverlays(t,i,e).next((()=>this.computeViews(t,e,i,n).next((o=>{let a=sn();return o.forEach(((l,f)=>{a=a.insert(l,f.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const n=ae();return this.populateOverlays(t,n,e).next((()=>this.computeViews(t,e,n,$())))}populateOverlays(t,e,n){const i=[];return n.forEach((o=>{e.has(o)||i.push(o)})),this.documentOverlayCache.getOverlays(t,i).next((o=>{o.forEach(((a,l)=>{e.set(a,l)}))}))}computeViews(t,e,n,i){let o=Jt();const a=ln(),l=(function(){return ln()})();return e.forEach(((f,d)=>{const g=n.get(d.key);i.has(d.key)&&(g===void 0||g.mutation instanceof gr)?o=o.insert(d.key,d):g!==void 0?(a.set(d.key,g.mutation.getFieldMask()),hn(g.mutation,d,g.mutation.getFieldMask(),K.now())):a.set(d.key,jt.empty())})),this.recalculateAndSaveOverlays(t,o).next((f=>(f.forEach(((d,g)=>a.set(d,g))),e.forEach(((d,g)=>l.set(d,new Uf(g,a.get(d)??null)))),l)))}recalculateAndSaveOverlays(t,e){const n=ln();let i=new X(((a,l)=>a-l)),o=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const l of a)l.keys().forEach((f=>{const d=e.get(f);if(d===null)return;let g=n.get(f)||jt.empty();g=l.applyToLocalView(d,g),n.set(f,g);const A=(i.get(l.batchId)||$()).add(f);i=i.insert(l.batchId,A)}))})).next((()=>{const a=[],l=i.getReverseIterator();for(;l.hasNext();){const f=l.getNext(),d=f.key,g=f.value,A=nu();g.forEach((S=>{if(!o.has(S)){const P=au(e.get(S),n.get(S));P!==null&&A.set(S,P),o=o.add(S)}})),a.push(this.documentOverlayCache.saveOverlays(t,d,A))}return R.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.recalculateAndSaveOverlays(t,n)))}getDocumentsMatchingQuery(t,e,n,i){return Hh(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Xa(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,i):this.getDocumentsMatchingCollectionQuery(t,e,n,i)}getNextDocuments(t,e,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,i).next((o=>{const a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,i-o.size):R.resolve(ae());let l=pn,f=o;return a.next((d=>R.forEach(d,((g,A)=>(l<A.largestBatchId&&(l=A.largestBatchId),o.get(g)?R.resolve():this.remoteDocumentCache.getEntry(t,g).next((S=>{f=f.insert(g,S)}))))).next((()=>this.populateOverlays(t,d,o))).next((()=>this.computeViews(t,f,d,$()))).next((g=>({batchId:l,changes:Xh(g)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new N(e)).next((n=>{let i=sn();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i}))}getDocumentsMatchingCollectionGroupQuery(t,e,n,i){const o=e.collectionGroup;let a=sn();return this.indexManager.getCollectionParents(t,o).next((l=>R.forEach(l,(f=>{const d=(function(A,S){return new Fe(S,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)})(e,f.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,n,i).next((g=>{g.forEach(((A,S)=>{a=a.insert(A,S)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,n,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next((a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,o,i)))).next((a=>{o.forEach(((f,d)=>{const g=d.getKey();a.get(g)===null&&(a=a.insert(g,mt.newInvalidDocument(g)))}));let l=sn();return a.forEach(((f,d)=>{const g=o.get(f);g!==void 0&&hn(g.mutation,d,jt.empty(),K.now()),pr(e,d)&&(l=l.insert(f,d))})),l}))}}/**
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
 */class qf{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return R.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,(function(i){return{id:i.id,version:i.version,createTime:ve(i.createTime)}})(e)),R.resolve()}getNamedQuery(t,e){return R.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,(function(i){return{name:i.name,query:bf(i.bundledQuery),readTime:ve(i.readTime)}})(e)),R.resolve()}}/**
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
 */class jf{constructor(){this.overlays=new X(N.comparator),this.Lr=new Map}getOverlay(t,e){return R.resolve(this.overlays.get(e))}getOverlays(t,e){const n=ae();return R.forEach(e,(i=>this.getOverlay(t,i).next((o=>{o!==null&&n.set(i,o)})))).next((()=>n))}saveOverlays(t,e,n){return n.forEach(((i,o)=>{this.St(t,e,o)})),R.resolve()}removeOverlaysForBatchId(t,e,n){const i=this.Lr.get(n);return i!==void 0&&(i.forEach((o=>this.overlays=this.overlays.remove(o))),this.Lr.delete(n)),R.resolve()}getOverlaysForCollection(t,e,n){const i=ae(),o=e.length+1,a=new N(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const f=l.getNext().value,d=f.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&f.largestBatchId>n&&i.set(f.getKey(),f)}return R.resolve(i)}getOverlaysForCollectionGroup(t,e,n,i){let o=new X(((d,g)=>d-g));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let g=o.get(d.largestBatchId);g===null&&(g=ae(),o=o.insert(d.largestBatchId,g)),g.set(d.getKey(),d)}}const l=ae(),f=o.getIterator();for(;f.hasNext()&&(f.getNext().value.forEach(((d,g)=>l.set(d,g))),!(l.size()>=i)););return R.resolve(l)}St(t,e,n){const i=this.overlays.get(n.key);if(i!==null){const a=this.Lr.get(i.largestBatchId).delete(n.key);this.Lr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new hf(e,n));let o=this.Lr.get(e);o===void 0&&(o=$(),this.Lr.set(e,o)),this.Lr.set(e,o.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
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
 */class $f{constructor(){this.sessionToken=ct.EMPTY_BYTE_STRING}getSessionToken(t){return R.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,R.resolve()}}/**
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
 */class Ms{constructor(){this.kr=new st(at.qr),this.Kr=new st(at.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const n=new at(t,e);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(t,e){t.forEach((n=>this.addReference(n,e)))}removeReference(t,e){this.Wr(new at(t,e))}Qr(t,e){t.forEach((n=>this.removeReference(n,e)))}Gr(t){const e=new N(new H([])),n=new at(e,t),i=new at(e,t+1),o=[];return this.Kr.forEachInRange([n,i],(a=>{this.Wr(a),o.push(a.key)})),o}zr(){this.kr.forEach((t=>this.Wr(t)))}Wr(t){this.kr=this.kr.delete(t),this.Kr=this.Kr.delete(t)}jr(t){const e=new N(new H([])),n=new at(e,t),i=new at(e,t+1);let o=$();return this.Kr.forEachInRange([n,i],(a=>{o=o.add(a.key)})),o}containsKey(t){const e=new at(t,0),n=this.kr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class at{constructor(t,e){this.key=t,this.Jr=e}static qr(t,e){return N.comparator(t.key,e.key)||U(t.Jr,e.Jr)}static Ur(t,e){return U(t.Jr,e.Jr)||N.comparator(t.key,e.key)}}/**
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
 */class zf{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Hr=new st(at.qr)}checkEmpty(t){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,i){const o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new lf(o,e,n,i);this.mutationQueue.push(a);for(const l of i)this.Hr=this.Hr.add(new at(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return R.resolve(a)}lookupMutationBatch(t,e){return R.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,i=this.Xr(n),o=i<0?0:i;return R.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?Rh:this.Yn-1)}getAllMutationBatches(t){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new at(e,0),i=new at(e,Number.POSITIVE_INFINITY),o=[];return this.Hr.forEachInRange([n,i],(a=>{const l=this.Zr(a.Jr);o.push(l)})),R.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new st(U);return e.forEach((i=>{const o=new at(i,0),a=new at(i,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([o,a],(l=>{n=n.add(l.Jr)}))})),R.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,i=n.length+1;let o=n;N.isDocumentKey(o)||(o=o.child(""));const a=new at(new N(o),0);let l=new st(U);return this.Hr.forEachWhile((f=>{const d=f.key.path;return!!n.isPrefixOf(d)&&(d.length===i&&(l=l.add(f.Jr)),!0)}),a),R.resolve(this.Yr(l))}Yr(t){const e=[];return t.forEach((n=>{const i=this.Zr(n);i!==null&&e.push(i)})),e}removeMutationBatch(t,e){Q(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Hr;return R.forEach(e.mutations,(i=>{const o=new at(i.key,e.batchId);return n=n.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)})).next((()=>{this.Hr=n}))}nr(t){}containsKey(t,e){const n=new at(e,0),i=this.Hr.firstAfterOrEqual(n);return R.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,R.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Gf{constructor(t){this.ti=t,this.docs=(function(){return new X(N.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,i=this.docs.get(n),o=i?i.size:0,a=this.ti(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return R.resolve(n?n.document.mutableCopy():mt.newInvalidDocument(e))}getEntries(t,e){let n=Jt();return e.forEach((i=>{const o=this.docs.get(i);n=n.insert(i,o?o.document.mutableCopy():mt.newInvalidDocument(i))})),R.resolve(n)}getDocumentsMatchingQuery(t,e,n,i){let o=Jt();const a=e.path,l=new N(a.child("__id-9223372036854775808__")),f=this.docs.getIteratorFrom(l);for(;f.hasNext();){const{key:d,value:{document:g}}=f.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Ih(Th(g),n)<=0||(i.has(g.key)||pr(e,g))&&(o=o.insert(g.key,g.mutableCopy()))}return R.resolve(o)}getAllFromCollectionGroup(t,e,n,i){M(9500)}ni(t,e){return R.forEach(this.docs,(n=>e(n)))}newChangeBuffer(t){return new Hf(this)}getSize(t){return R.resolve(this.size)}}class Hf extends Ff{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach(((n,i)=>{i.isValidDocument()?e.push(this.Mr.addEntry(t,i)):this.Mr.removeEntry(n)})),R.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}/**
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
 */class Kf{constructor(t){this.persistence=t,this.ri=new fe((e=>Ps(e)),bs),this.lastRemoteSnapshotVersion=x.min(),this.highestTargetId=0,this.ii=0,this.si=new Ms,this.targetCount=0,this.oi=De._r()}forEachTarget(t,e){return this.ri.forEach(((n,i)=>e(i))),R.resolve()}getLastRemoteSnapshotVersion(t){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return R.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ii&&(this.ii=e),R.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new De(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,R.resolve()}updateTargetData(t,e){return this.lr(e),R.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,R.resolve()}removeTargets(t,e,n){let i=0;const o=[];return this.ri.forEach(((a,l)=>{l.sequenceNumber<=e&&n.get(l.targetId)===null&&(this.ri.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),i++)})),R.waitFor(o).next((()=>i))}getTargetCount(t){return R.resolve(this.targetCount)}getTargetData(t,e){const n=this.ri.get(e)||null;return R.resolve(n)}addMatchingKeys(t,e,n){return this.si.$r(e,n),R.resolve()}removeMatchingKeys(t,e,n){this.si.Qr(e,n);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach((a=>{o.push(i.markPotentiallyOrphaned(t,a))})),R.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),R.resolve()}getMatchingKeysForTargetId(t,e){const n=this.si.jr(e);return R.resolve(n)}containsKey(t,e){return R.resolve(this.si.containsKey(e))}}/**
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
 */class vu{constructor(t,e){this._i={},this.overlays={},this.ai=new lr(0),this.ui=!1,this.ui=!0,this.ci=new $f,this.referenceDelegate=t(this),this.li=new Kf(this),this.indexManager=new Df,this.remoteDocumentCache=(function(i){return new Gf(i)})((n=>this.referenceDelegate.hi(n))),this.serializer=new Pf(e),this.Pi=new qf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new jf,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this._i[t.toKey()];return n||(n=new zf(e,this.referenceDelegate),this._i[t.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,n){b("MemoryPersistence","Starting transaction:",t);const i=new Qf(this.ai.next());return this.referenceDelegate.Ti(),n(i).next((o=>this.referenceDelegate.Ei(i).next((()=>o)))).toPromise().then((o=>(i.raiseOnCommittedEvent(),o)))}Ii(t,e){return R.or(Object.values(this._i).map((n=>()=>n.containsKey(t,e))))}}class Qf extends Ah{constructor(t){super(),this.currentSequenceNumber=t}}class Ls{constructor(t){this.persistence=t,this.Ri=new Ms,this.Ai=null}static Vi(t){return new Ls(t)}get di(){if(this.Ai)return this.Ai;throw M(60996)}addReference(t,e,n){return this.Ri.addReference(n,e),this.di.delete(n.toString()),R.resolve()}removeReference(t,e,n){return this.Ri.removeReference(n,e),this.di.add(n.toString()),R.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),R.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach((i=>this.di.add(i.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((i=>{i.forEach((o=>this.di.add(o.toString())))})).next((()=>n.removeTargetData(t,e)))}Ti(){this.Ai=new Set}Ei(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.di,(n=>{const i=N.fromPath(n);return this.mi(t,i).next((o=>{o||e.removeEntry(i,x.min())}))})).next((()=>(this.Ai=null,e.apply(t))))}updateLimboDocument(t,e){return this.mi(t,e).next((n=>{n?this.di.delete(e.toString()):this.di.add(e.toString())}))}hi(t){return 0}mi(t,e){return R.or([()=>R.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class ir{constructor(t,e){this.persistence=t,this.fi=new fe((n=>Ch(n.path)),((n,i)=>n.isEqual(i))),this.garbageCollector=Lf(this,e)}static Vi(t,e){return new ir(t,e)}Ti(){}Ei(t){return R.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next((n=>e.next((i=>n+i))))}pr(t){let e=0;return this.mr(t,(n=>{e++})).next((()=>e))}mr(t,e){return R.forEach(this.fi,((n,i)=>this.wr(t,n,i).next((o=>o?R.resolve():e(i)))))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ni(t,(a=>this.wr(t,a,e).next((l=>{l||(n++,o.removeEntry(a,x.min()))})))).next((()=>o.apply(t))).next((()=>n))}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),R.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.fi.set(n,t.currentSequenceNumber),R.resolve()}removeReference(t,e,n){return this.fi.set(n,t.currentSequenceNumber),R.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),R.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Gn(t.data.value)),e}wr(t,e,n){return R.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.fi.get(e);return R.resolve(i!==void 0&&i>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class Fs{constructor(t,e,n,i){this.targetId=t,this.fromCache=e,this.Ts=n,this.Es=i}static Is(t,e){let n=$(),i=$();for(const o of e.docChanges)switch(o.type){case 0:n=n.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Fs(t,e.fromCache,n,i)}}/**
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
 */class Wf{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Yf{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Uc()?8:wh(Lc())>0?6:4})()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,n,i){const o={result:null};return this.gs(t,e).next((a=>{o.result=a})).next((()=>{if(!o.result)return this.ps(t,e,i,n).next((a=>{o.result=a}))})).next((()=>{if(o.result)return;const a=new Wf;return this.ys(t,e,a).next((l=>{if(o.result=l,this.As)return this.ws(t,e,a,l.size)}))})).next((()=>o.result))}ws(t,e,n,i){return n.documentReadCount<this.Vs?(ge()<=q.DEBUG&&b("QueryEngine","SDK will not create cache indexes for query:",_e(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),R.resolve()):(ge()<=q.DEBUG&&b("QueryEngine","Query:",_e(e),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.ds*i?(ge()<=q.DEBUG&&b("QueryEngine","The SDK decides to create cache indexes for query:",_e(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Dt(e))):R.resolve())}gs(t,e){if(ko(e))return R.resolve(null);let n=Dt(e);return this.indexManager.getIndexType(t,n).next((i=>i===0?null:(e.limit!==null&&i===1&&(e=nr(e,null,"F"),n=Dt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next((o=>{const a=$(...o);return this.fs.getDocuments(t,a).next((l=>this.indexManager.getMinOffset(t,n).next((f=>{const d=this.Ss(e,l);return this.bs(e,d,a,f.readTime)?this.gs(t,nr(e,null,"F")):this.Ds(t,d,e,f)}))))})))))}ps(t,e,n,i){return ko(e)||i.isEqual(x.min())?R.resolve(null):this.fs.getDocuments(t,n).next((o=>{const a=this.Ss(e,o);return this.bs(e,a,n,i)?R.resolve(null):(ge()<=q.DEBUG&&b("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),_e(e)),this.Ds(t,a,e,Eh(i,pn)).next((l=>l)))}))}Ss(t,e){let n=new st(tu(t));return e.forEach(((i,o)=>{pr(t,o)&&(n=n.add(o))})),n}bs(t,e,n,i){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ys(t,e,n){return ge()<=q.DEBUG&&b("QueryEngine","Using full collection scan to execute query:",_e(e)),this.fs.getDocumentsMatchingQuery(t,e,Kt.min(),n)}Ds(t,e,n,i){return this.fs.getDocumentsMatchingQuery(t,n,i).next((o=>(e.forEach((a=>{o=o.insert(a.key,a)})),o)))}}/**
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
 */const Us="LocalStore",Jf=3e8;class Xf{constructor(t,e,n,i){this.persistence=t,this.Cs=e,this.serializer=i,this.vs=new X(U),this.Fs=new fe((o=>Ps(o)),bs),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(n)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Bf(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.vs)))}}function Zf(r,t,e,n){return new Xf(r,t,e,n)}async function Au(r,t){const e=j(r);return await e.persistence.runTransaction("Handle user change","readonly",(n=>{let i;return e.mutationQueue.getAllMutationBatches(n).next((o=>(i=o,e.Os(t),e.mutationQueue.getAllMutationBatches(n)))).next((o=>{const a=[],l=[];let f=$();for(const d of i){a.push(d.batchId);for(const g of d.mutations)f=f.add(g.key)}for(const d of o){l.push(d.batchId);for(const g of d.mutations)f=f.add(g.key)}return e.localDocuments.getDocuments(n,f).next((d=>({Ns:d,removedBatchIds:a,addedBatchIds:l})))}))}))}function wu(r){const t=j(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.li.getLastRemoteSnapshotVersion(e)))}function td(r,t){const e=j(r),n=t.snapshotVersion;let i=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const a=e.xs.newChangeBuffer({trackRemovals:!0});i=e.vs;const l=[];t.targetChanges.forEach(((g,A)=>{const S=i.get(A);if(!S)return;l.push(e.li.removeMatchingKeys(o,g.removedDocuments,A).next((()=>e.li.addMatchingKeys(o,g.addedDocuments,A))));let P=S.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(A)!==null?P=P.withResumeToken(ct.EMPTY_BYTE_STRING,x.min()).withLastLimboFreeSnapshotVersion(x.min()):g.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(g.resumeToken,n)),i=i.insert(A,P),(function(L,O,nt){return L.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-L.snapshotVersion.toMicroseconds()>=Jf?!0:nt.addedDocuments.size+nt.modifiedDocuments.size+nt.removedDocuments.size>0})(S,P,g)&&l.push(e.li.updateTargetData(o,P))}));let f=Jt(),d=$();if(t.documentUpdates.forEach((g=>{t.resolvedLimboDocuments.has(g)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,g))})),l.push(ed(o,a,t.documentUpdates).next((g=>{f=g.Bs,d=g.Ls}))),!n.isEqual(x.min())){const g=e.li.getLastRemoteSnapshotVersion(o).next((A=>e.li.setTargetsMetadata(o,o.currentSequenceNumber,n)));l.push(g)}return R.waitFor(l).next((()=>a.apply(o))).next((()=>e.localDocuments.getLocalViewOfDocuments(o,f,d))).next((()=>f))})).then((o=>(e.vs=i,o)))}function ed(r,t,e){let n=$(),i=$();return e.forEach((o=>n=n.add(o))),t.getEntries(r,n).next((o=>{let a=Jt();return e.forEach(((l,f)=>{const d=o.get(l);f.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(l)),f.isNoDocument()&&f.version.isEqual(x.min())?(t.removeEntry(l,f.readTime),a=a.insert(l,f)):!d.isValidDocument()||f.version.compareTo(d.version)>0||f.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(f),a=a.insert(l,f)):b(Us,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",f.version)})),{Bs:a,Ls:i}}))}function nd(r,t){const e=j(r);return e.persistence.runTransaction("Allocate target","readwrite",(n=>{let i;return e.li.getTargetData(n,t).next((o=>o?(i=o,R.resolve(i)):e.li.allocateTargetId(n).next((a=>(i=new $t(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.li.addTargetData(n,i).next((()=>i)))))))})).then((n=>{const i=e.vs.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.vs=e.vs.insert(n.targetId,n),e.Fs.set(t,n.targetId)),n}))}async function ys(r,t,e){const n=j(r),i=n.vs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",o,(a=>n.persistence.referenceDelegate.removeTarget(a,i)))}catch(a){if(!Me(a))throw a;b(Us,`Failed to update sequence numbers for target ${t}: ${a}`)}n.vs=n.vs.remove(t),n.Fs.delete(i.target)}function Ho(r,t,e){const n=j(r);let i=x.min(),o=$();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(f,d,g){const A=j(f),S=A.Fs.get(g);return S!==void 0?R.resolve(A.vs.get(S)):A.li.getTargetData(d,g)})(n,a,Dt(t)).next((l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(a,l.targetId).next((f=>{o=f}))})).next((()=>n.Cs.getDocumentsMatchingQuery(a,t,e?i:x.min(),e?o:$()))).next((l=>(rd(n,Wh(t),l),{documents:l,ks:o})))))}function rd(r,t,e){let n=r.Ms.get(t)||x.min();e.forEach(((i,o)=>{o.readTime.compareTo(n)>0&&(n=o.readTime)})),r.Ms.set(t,n)}class Ko{constructor(){this.activeTargetIds=ef()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class sd{constructor(){this.vo=new Ko,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,n){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new Ko,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class id{Mo(t){}shutdown(){}}/**
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
 */const Qo="ConnectivityMonitor";class Wo{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){b(Qo,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){b(Qo,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let jn=null;function Es(){return jn===null?jn=(function(){return 268435456+Math.round(2147483648*Math.random())})():jn++,"0x"+jn.toString(16)}/**
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
 */const Jr="RestConnection",od={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class ad{get qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Uo=`projects/${n}/databases/${i}`,this.$o=this.databaseId.database===as?`project_id=${n}`:`project_id=${n}&database_id=${i}`}Wo(t,e,n,i,o){const a=Es(),l=this.Qo(t,e.toUriEncodedString());b(Jr,`Sending RPC '${t}' ${a}:`,l,n);const f={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(f,i,o);const{host:d}=new URL(l),g=Ia(d);return this.zo(t,l,f,n,g).then((A=>(b(Jr,`Received RPC '${t}' ${a}: `,A),A)),(A=>{throw he(Jr,`RPC '${t}' ${a} failed with error: `,A,"url: ",l,"request:",n),A}))}jo(t,e,n,i,o,a){return this.Wo(t,e,n,i,o)}Go(t,e,n){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+xe})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((i,o)=>t[o]=i)),n&&n.headers.forEach(((i,o)=>t[o]=i))}Qo(t,e){const n=od[t];let i=`${this.Ko}/v1/${e}:${n}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
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
 */class ud{constructor(t){this.Jo=t.Jo,this.Ho=t.Ho}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Ho()}send(t){this.Jo(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}/**
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
 */const dt="WebChannelConnection",nn=(r,t,e)=>{r.listen(t,(n=>{try{e(n)}catch(i){setTimeout((()=>{throw i}),0)}}))};class Ae extends ad{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!Ae.c_){const t=Da();nn(t,ba.STAT_EVENT,(e=>{e.stat===is.PROXY?b(dt,"STAT_EVENT: detected buffering proxy"):e.stat===is.NOPROXY&&b(dt,"STAT_EVENT: detected no buffering proxy")})),Ae.c_=!0}}zo(t,e,n,i,o){const a=Es();return new Promise(((l,f)=>{const d=new Va;d.setWithCredentials(!0),d.listenOnce(Pa.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case $n.NO_ERROR:const A=d.getResponseJson();b(dt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(A)),l(A);break;case $n.TIMEOUT:b(dt,`RPC '${t}' ${a} timed out`),f(new D(C.DEADLINE_EXCEEDED,"Request time out"));break;case $n.HTTP_ERROR:const S=d.getStatus();if(b(dt,`RPC '${t}' ${a} failed with status:`,S,"response text:",d.getResponseText()),S>0){let P=d.getResponseJson();Array.isArray(P)&&(P=P[0]);const k=P==null?void 0:P.error;if(k&&k.status&&k.message){const L=(function(nt){const Y=nt.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(Y)>=0?Y:C.UNKNOWN})(k.status);f(new D(L,k.message))}else f(new D(C.UNKNOWN,"Server responded with status "+d.getStatus()))}else f(new D(C.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:t,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{b(dt,`RPC '${t}' ${a} completed.`)}}));const g=JSON.stringify(i);b(dt,`RPC '${t}' ${a} sending request:`,i),d.send(e,"POST",g,n,15)}))}T_(t,e,n){const i=Es(),o=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(l.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,e,n),l.encodeInitMessageHeaders=!0;const d=o.join("");b(dt,`Creating RPC '${t}' stream ${i}: ${d}`,l);const g=a.createWebChannel(d,l);this.E_(g);let A=!1,S=!1;const P=new ud({Jo:k=>{S?b(dt,`Not sending because RPC '${t}' stream ${i} is closed:`,k):(A||(b(dt,`Opening RPC '${t}' stream ${i} transport.`),g.open(),A=!0),b(dt,`RPC '${t}' stream ${i} sending:`,k),g.send(k))},Ho:()=>g.close()});return nn(g,rn.EventType.OPEN,(()=>{S||(b(dt,`RPC '${t}' stream ${i} transport opened.`),P.i_())})),nn(g,rn.EventType.CLOSE,(()=>{S||(S=!0,b(dt,`RPC '${t}' stream ${i} transport closed`),P.o_(),this.I_(g))})),nn(g,rn.EventType.ERROR,(k=>{S||(S=!0,he(dt,`RPC '${t}' stream ${i} transport errored. Name:`,k.name,"Message:",k.message),P.o_(new D(C.UNAVAILABLE,"The operation could not be completed")))})),nn(g,rn.EventType.MESSAGE,(k=>{var L;if(!S){const O=k.data[0];Q(!!O,16349);const nt=O,Y=(nt==null?void 0:nt.error)||((L=nt[0])==null?void 0:L.error);if(Y){b(dt,`RPC '${t}' stream ${i} received error:`,Y);const it=Y.status;let At=(function(E){const p=Z[E];if(p!==void 0)return cu(p)})(it),lt=Y.message;it==="NOT_FOUND"&&lt.includes("database")&&lt.includes("does not exist")&&lt.includes(this.databaseId.database)&&he(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),At===void 0&&(At=C.INTERNAL,lt="Unknown error status: "+it+" with message "+Y.message),S=!0,P.o_(new D(At,lt)),g.close()}else b(dt,`RPC '${t}' stream ${i} received:`,O),P.__(O)}})),Ae.u_(),setTimeout((()=>{P.s_()}),0),P}terminate(){this.a_.forEach((t=>t.close())),this.a_=[]}E_(t){this.a_.push(t)}I_(t){this.a_=this.a_.filter((e=>e===t))}Go(t,e,n){super.Go(t,e,n),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Na()}}/**
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
 */function cd(r){return new Ae(r)}function Xr(){return typeof document<"u"?document:null}/**
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
 */function yr(r){return new Ef(r,!0)}/**
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
 */Ae.c_=!1;class Ru{constructor(t,e,n=1e3,i=1.5,o=6e4){this.Ci=t,this.timerId=e,this.R_=n,this.A_=i,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),i=Math.max(0,e-n);i>0&&b("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),t()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const Yo="PersistentStream";class ld{constructor(t,e,n,i,o,a,l,f){this.Ci=t,this.S_=n,this.b_=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=f,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ru(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.K_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.K_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(xt(e.toString()),xt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,i])=>{this.D_===e&&this.G_(n,i)}),(n=>{t((()=>{const i=new D(C.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(i)}))}))}G_(t,e){const n=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo((()=>{n((()=>this.listener.Zo()))})),this.stream.Yo((()=>{n((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((i=>{n((()=>this.z_(i)))})),this.stream.onMessage((i=>{n((()=>++this.F_==1?this.J_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return b(Yo,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget((()=>this.D_===t?e():(b(Yo,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class hd extends ld{constructor(t,e,n,i,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,i,a),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=If(this.serializer,t),n=(function(o){if(!("targetChange"in o))return x.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?x.min():a.readTime?ve(a.readTime):x.min()})(t);return this.listener.H_(e,n)}Z_(t){const e={};e.database=jo(this.serializer),e.addTarget=(function(o,a){let l;const f=a.target;if(l=hs(f)?{documents:vf(o,f)}:{query:Af(o,f).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=fu(o,a.resumeToken);const d=ms(o,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(x.min())>0){l.readTime=gs(o,a.snapshotVersion.toTimestamp());const d=ms(o,a.expectedCount);d!==null&&(l.expectedCount=d)}return l})(this.serializer,t);const n=Rf(this.serializer,t);n&&(e.labels=n),this.q_(e)}X_(t){const e={};e.database=jo(this.serializer),e.removeTarget=t,this.q_(e)}}/**
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
 */class fd{}class dd extends fd{constructor(t,e,n,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new D(C.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,n,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Wo(t,_s(e,n),i,o,a))).catch((o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(C.UNKNOWN,o.toString())}))}jo(t,e,n,i,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.jo(t,_s(e,n),i,a,l,o))).catch((a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(C.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function pd(r,t,e,n){return new dd(r,t,e,n)}class md{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(xt(e),this.aa=!1):b("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Ne="RemoteStore";class gd{constructor(t,e,n,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=o,this.Aa.Mo((a=>{n.enqueueAndForget((async()=>{vn(this)&&(b(Ne,"Restarting streams for network reachability change."),await(async function(f){const d=j(f);d.Ia.add(4),await In(d),d.Va.set("Unknown"),d.Ia.delete(4),await Er(d)})(this))}))})),this.Va=new md(n,i)}}async function Er(r){if(vn(r))for(const t of r.Ra)await t(!0)}async function In(r){for(const t of r.Ra)await t(!1)}function Su(r,t){const e=j(r);e.Ea.has(t.targetId)||(e.Ea.set(t.targetId,t),$s(e)?js(e):Ue(e).O_()&&qs(e,t))}function Bs(r,t){const e=j(r),n=Ue(e);e.Ea.delete(t),n.O_()&&Cu(e,t),e.Ea.size===0&&(n.O_()?n.L_():vn(e)&&e.Va.set("Unknown"))}function qs(r,t){if(r.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(x.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Ue(r).Z_(t)}function Cu(r,t){r.da.$e(t),Ue(r).X_(t)}function js(r){r.da=new mf({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),At:t=>r.Ea.get(t)||null,ht:()=>r.datastore.serializer.databaseId}),Ue(r).start(),r.Va.ua()}function $s(r){return vn(r)&&!Ue(r).x_()&&r.Ea.size>0}function vn(r){return j(r).Ia.size===0}function Vu(r){r.da=void 0}async function _d(r){r.Va.set("Online")}async function yd(r){r.Ea.forEach(((t,e)=>{qs(r,t)}))}async function Ed(r,t){Vu(r),$s(r)?(r.Va.ha(t),js(r)):r.Va.set("Unknown")}async function Td(r,t,e){if(r.Va.set("Online"),t instanceof hu&&t.state===2&&t.cause)try{await(async function(i,o){const a=o.cause;for(const l of o.targetIds)i.Ea.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.Ea.delete(l),i.da.removeTarget(l))})(r,t)}catch(n){b(Ne,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Jo(r,n)}else if(t instanceof Kn?r.da.Xe(t):t instanceof lu?r.da.st(t):r.da.tt(t),!e.isEqual(x.min()))try{const n=await wu(r.localStore);e.compareTo(n)>=0&&await(function(o,a){const l=o.da.Tt(a);return l.targetChanges.forEach(((f,d)=>{if(f.resumeToken.approximateByteSize()>0){const g=o.Ea.get(d);g&&o.Ea.set(d,g.withResumeToken(f.resumeToken,a))}})),l.targetMismatches.forEach(((f,d)=>{const g=o.Ea.get(f);if(!g)return;o.Ea.set(f,g.withResumeToken(ct.EMPTY_BYTE_STRING,g.snapshotVersion)),Cu(o,f);const A=new $t(g.target,f,d,g.sequenceNumber);qs(o,A)})),o.remoteSyncer.applyRemoteEvent(l)})(r,e)}catch(n){b(Ne,"Failed to raise snapshot:",n),await Jo(r,n)}}async function Jo(r,t,e){if(!Me(t))throw t;r.Ia.add(1),await In(r),r.Va.set("Offline"),e||(e=()=>wu(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{b(Ne,"Retrying IndexedDB access"),await e(),r.Ia.delete(1),await Er(r)}))}async function Xo(r,t){const e=j(r);e.asyncQueue.verifyOperationInProgress(),b(Ne,"RemoteStore received new credentials");const n=vn(e);e.Ia.add(3),await In(e),n&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Er(e)}async function Id(r,t){const e=j(r);t?(e.Ia.delete(2),await Er(e)):t||(e.Ia.add(2),await In(e),e.Va.set("Unknown"))}function Ue(r){return r.ma||(r.ma=(function(e,n,i){const o=j(e);return o.sa(),new hd(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)})(r.datastore,r.asyncQueue,{Zo:_d.bind(null,r),Yo:yd.bind(null,r),t_:Ed.bind(null,r),H_:Td.bind(null,r)}),r.Ra.push((async t=>{t?(r.ma.B_(),$s(r)?js(r):r.Va.set("Unknown")):(await r.ma.stop(),Vu(r))}))),r.ma}/**
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
 */class zs{constructor(t,e,n,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=i,this.removalCallback=o,this.deferred=new Ie,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,i,o){const a=Date.now()+n,l=new zs(t,e,a,i,o);return l.start(n),l}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Pu(r,t){if(xt("AsyncQueue",`${t}: ${r}`),Me(r))return new D(C.UNAVAILABLE,`${t}: ${r}`);throw r}/**
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
 */class we{static emptySet(t){return new we(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||N.comparator(e.key,n.key):(e,n)=>N.comparator(e.key,n.key),this.keyedMap=sn(),this.sortedSet=new X(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof we)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new we;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
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
 */class Zo{constructor(){this.ga=new X(N.comparator)}track(t){const e=t.doc.key,n=this.ga.get(e);n?t.type!==0&&n.type===3?this.ga=this.ga.insert(e,t):t.type===3&&n.type!==1?this.ga=this.ga.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.ga=this.ga.remove(e):t.type===1&&n.type===2?this.ga=this.ga.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):M(63341,{Vt:t,pa:n}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,n)=>{t.push(n)})),t}}class ke{constructor(t,e,n,i,o,a,l,f,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=f,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,i,o){const a=[];return e.forEach((l=>{a.push({type:0,doc:l})})),new ke(t,e,we.emptySet(e),a,n,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&dr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==n[i].type||!e[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
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
 */class vd{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class Ad{constructor(){this.queries=ta(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,n){const i=j(e),o=i.queries;i.queries=ta(),o.forEach(((a,l)=>{for(const f of l.Sa)f.onError(n)}))})(this,new D(C.ABORTED,"Firestore shutting down"))}}function ta(){return new fe((r=>Za(r)),dr)}async function wd(r,t){const e=j(r);let n=3;const i=t.query;let o=e.queries.get(i);o?!o.ba()&&t.Da()&&(n=2):(o=new vd,n=t.Da()?0:1);try{switch(n){case 0:o.wa=await e.onListen(i,!0);break;case 1:o.wa=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(a){const l=Pu(a,`Initialization of query '${_e(t.query)}' failed`);return void t.onError(l)}e.queries.set(i,o),o.Sa.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&Gs(e)}async function Rd(r,t){const e=j(r),n=t.query;let i=3;const o=e.queries.get(n);if(o){const a=o.Sa.indexOf(t);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?i=t.Da()?0:1:!o.ba()&&t.Da()&&(i=2))}switch(i){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function Sd(r,t){const e=j(r);let n=!1;for(const i of t){const o=i.query,a=e.queries.get(o);if(a){for(const l of a.Sa)l.Fa(i)&&(n=!0);a.wa=i}}n&&Gs(e)}function Cd(r,t,e){const n=j(r),i=n.queries.get(t);if(i)for(const o of i.Sa)o.onError(e);n.queries.delete(t)}function Gs(r){r.Ca.forEach((t=>{t.next()}))}var Ts,ea;(ea=Ts||(Ts={})).Ma="default",ea.Cache="cache";class Vd{constructor(t,e,n){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(t){if(!this.options.includeMetadataChanges){const n=[];for(const i of t.docChanges)i.type!==3&&n.push(i);t=new ke(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const n=e!=="Offline";return(!this.options.qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=ke.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Ts.Cache}}/**
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
 */class bu{constructor(t){this.key=t}}class Du{constructor(t){this.key=t}}class Pd{constructor(t,e){this.query=t,this.Za=e,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=$(),this.mutatedKeys=$(),this.eu=tu(t),this.tu=new we(this.eu)}get nu(){return this.Za}ru(t,e){const n=e?e.iu:new Zo,i=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,a=i,l=!1;const f=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal(((g,A)=>{const S=i.get(g),P=pr(this.query,A)?A:null,k=!!S&&this.mutatedKeys.has(S.key),L=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let O=!1;S&&P?S.data.isEqual(P.data)?k!==L&&(n.track({type:3,doc:P}),O=!0):this.su(S,P)||(n.track({type:2,doc:P}),O=!0,(f&&this.eu(P,f)>0||d&&this.eu(P,d)<0)&&(l=!0)):!S&&P?(n.track({type:0,doc:P}),O=!0):S&&!P&&(n.track({type:1,doc:S}),O=!0,(f||d)&&(l=!0)),O&&(P?(a=a.add(P),o=L?o.add(g):o.delete(g)):(a=a.delete(g),o=o.delete(g)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const g=this.query.limitType==="F"?a.last():a.first();a=a.delete(g.key),o=o.delete(g.key),n.track({type:1,doc:g})}return{tu:a,iu:n,bs:l,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,i){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort(((g,A)=>(function(P,k){const L=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:O})}};return L(P)-L(k)})(g.type,A.type)||this.eu(g.doc,A.doc))),this.ou(n),i=i??!1;const l=e&&!i?this._u():[],f=this.Ya.size===0&&this.current&&!i?1:0,d=f!==this.Xa;return this.Xa=f,a.length!==0||d?{snapshot:new ke(this.query,t.tu,o,a,t.mutatedKeys,f===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Zo,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(t){return!this.Za.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Za=this.Za.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Za=this.Za.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Ya;this.Ya=$(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))}));const e=[];return t.forEach((n=>{this.Ya.has(n)||e.push(new Du(n))})),this.Ya.forEach((n=>{t.has(n)||e.push(new bu(n))})),e}cu(t){this.Za=t.ks,this.Ya=$();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return ke.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Hs="SyncEngine";class bd{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Dd{constructor(t){this.key=t,this.hu=!1}}class Nd{constructor(t,e,n,i,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new fe((l=>Za(l)),dr),this.Eu=new Map,this.Iu=new Set,this.Ru=new X(N.comparator),this.Au=new Map,this.Vu=new Ms,this.du={},this.mu=new Map,this.fu=De.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function kd(r,t,e=!0){const n=Mu(r);let i;const o=n.Tu.get(t);return o?(n.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.lu()):i=await Nu(n,t,e,!0),i}async function Od(r,t){const e=Mu(r);await Nu(e,t,!0,!1)}async function Nu(r,t,e,n){const i=await nd(r.localStore,Dt(t)),o=i.targetId,a=r.sharedClientState.addLocalQueryTarget(o,e);let l;return n&&(l=await xd(r,t,o,a==="current",i.resumeToken)),r.isPrimaryClient&&e&&Su(r.remoteStore,i),l}async function xd(r,t,e,n,i){r.pu=(A,S,P)=>(async function(L,O,nt,Y){let it=O.view.ru(nt);it.bs&&(it=await Ho(L.localStore,O.query,!1).then((({documents:E})=>O.view.ru(E,it))));const At=Y&&Y.targetChanges.get(O.targetId),lt=Y&&Y.targetMismatches.get(O.targetId)!=null,ht=O.view.applyChanges(it,L.isPrimaryClient,At,lt);return ra(L,O.targetId,ht.au),ht.snapshot})(r,A,S,P);const o=await Ho(r.localStore,t,!0),a=new Pd(t,o.ks),l=a.ru(o.documents),f=Tn.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",i),d=a.applyChanges(l,r.isPrimaryClient,f);ra(r,e,d.au);const g=new bd(t,e,a);return r.Tu.set(t,g),r.Eu.has(e)?r.Eu.get(e).push(t):r.Eu.set(e,[t]),d.snapshot}async function Md(r,t,e){const n=j(r),i=n.Tu.get(t),o=n.Eu.get(i.targetId);if(o.length>1)return n.Eu.set(i.targetId,o.filter((a=>!dr(a,t)))),void n.Tu.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await ys(n.localStore,i.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(i.targetId),e&&Bs(n.remoteStore,i.targetId),Is(n,i.targetId)})).catch(cr)):(Is(n,i.targetId),await ys(n.localStore,i.targetId,!0))}async function Ld(r,t){const e=j(r),n=e.Tu.get(t),i=e.Eu.get(n.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Bs(e.remoteStore,n.targetId))}async function ku(r,t){const e=j(r);try{const n=await td(e.localStore,t);t.targetChanges.forEach(((i,o)=>{const a=e.Au.get(o);a&&(Q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.hu=!0:i.modifiedDocuments.size>0?Q(a.hu,14607):i.removedDocuments.size>0&&(Q(a.hu,42227),a.hu=!1))})),await xu(e,n,t)}catch(n){await cr(n)}}function na(r,t,e){const n=j(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const i=[];n.Tu.forEach(((o,a)=>{const l=a.view.va(t);l.snapshot&&i.push(l.snapshot)})),(function(a,l){const f=j(a);f.onlineState=l;let d=!1;f.queries.forEach(((g,A)=>{for(const S of A.Sa)S.va(l)&&(d=!0)})),d&&Gs(f)})(n.eventManager,t),i.length&&n.Pu.H_(i),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function Fd(r,t,e){const n=j(r);n.sharedClientState.updateQueryState(t,"rejected",e);const i=n.Au.get(t),o=i&&i.key;if(o){let a=new X(N.comparator);a=a.insert(o,mt.newNoDocument(o,x.min()));const l=$().add(o),f=new _r(x.min(),new Map,new X(U),a,l);await ku(n,f),n.Ru=n.Ru.remove(o),n.Au.delete(t),Ks(n)}else await ys(n.localStore,t,!1).then((()=>Is(n,t,e))).catch(cr)}function Is(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Eu.get(t))r.Tu.delete(n),e&&r.Pu.yu(n,e);r.Eu.delete(t),r.isPrimaryClient&&r.Vu.Gr(t).forEach((n=>{r.Vu.containsKey(n)||Ou(r,n)}))}function Ou(r,t){r.Iu.delete(t.path.canonicalString());const e=r.Ru.get(t);e!==null&&(Bs(r.remoteStore,e),r.Ru=r.Ru.remove(t),r.Au.delete(e),Ks(r))}function ra(r,t,e){for(const n of e)n instanceof bu?(r.Vu.addReference(n.key,t),Ud(r,n)):n instanceof Du?(b(Hs,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,t),r.Vu.containsKey(n.key)||Ou(r,n.key)):M(19791,{wu:n})}function Ud(r,t){const e=t.key,n=e.path.canonicalString();r.Ru.get(e)||r.Iu.has(n)||(b(Hs,"New document in limbo: "+e),r.Iu.add(n),Ks(r))}function Ks(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const t=r.Iu.values().next().value;r.Iu.delete(t);const e=new N(H.fromString(t)),n=r.fu.next();r.Au.set(n,new Dd(e)),r.Ru=r.Ru.insert(e,n),Su(r.remoteStore,new $t(Dt(Ds(e.path)),n,"TargetPurposeLimboResolution",lr.ce))}}async function xu(r,t,e){const n=j(r),i=[],o=[],a=[];n.Tu.isEmpty()||(n.Tu.forEach(((l,f)=>{a.push(n.pu(f,t,e).then((d=>{var g;if((d||e)&&n.isPrimaryClient){const A=d?!d.fromCache:(g=e==null?void 0:e.targetChanges.get(f.targetId))==null?void 0:g.current;n.sharedClientState.updateQueryState(f.targetId,A?"current":"not-current")}if(d){i.push(d);const A=Fs.Is(f.targetId,d);o.push(A)}})))})),await Promise.all(a),n.Pu.H_(i),await(async function(f,d){const g=j(f);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",(A=>R.forEach(d,(S=>R.forEach(S.Ts,(P=>g.persistence.referenceDelegate.addReference(A,S.targetId,P))).next((()=>R.forEach(S.Es,(P=>g.persistence.referenceDelegate.removeReference(A,S.targetId,P)))))))))}catch(A){if(!Me(A))throw A;b(Us,"Failed to update sequence numbers: "+A)}for(const A of d){const S=A.targetId;if(!A.fromCache){const P=g.vs.get(S),k=P.snapshotVersion,L=P.withLastLimboFreeSnapshotVersion(k);g.vs=g.vs.insert(S,L)}}})(n.localStore,o))}async function Bd(r,t){const e=j(r);if(!e.currentUser.isEqual(t)){b(Hs,"User change. New user:",t.toKey());const n=await Au(e.localStore,t);e.currentUser=t,(function(o,a){o.mu.forEach((l=>{l.forEach((f=>{f.reject(new D(C.CANCELLED,a))}))})),o.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await xu(e,n.Ns)}}function qd(r,t){const e=j(r),n=e.Au.get(t);if(n&&n.hu)return $().add(n.key);{let i=$();const o=e.Eu.get(t);if(!o)return i;for(const a of o){const l=e.Tu.get(a);i=i.unionWith(l.view.nu)}return i}}function Mu(r){const t=j(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=ku.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=qd.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Fd.bind(null,t),t.Pu.H_=Sd.bind(null,t.eventManager),t.Pu.yu=Cd.bind(null,t.eventManager),t}class or{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=yr(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return Zf(this.persistence,new Yf,t.initialUser,this.serializer)}Cu(t){return new vu(Ls.Vi,this.serializer)}Du(t){return new sd}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}or.provider={build:()=>new or};class jd extends or{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){Q(this.persistence.referenceDelegate instanceof ir,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new xf(n,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?It.withCacheSize(this.cacheSizeBytes):It.DEFAULT;return new vu((n=>ir.Vi(n,e)),this.serializer)}}class vs{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>na(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Bd.bind(null,this.syncEngine),await Id(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Ad})()}createDatastore(t){const e=yr(t.databaseInfo.databaseId),n=cd(t.databaseInfo);return pd(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return(function(n,i,o,a,l){return new gd(n,i,o,a,l)})(this.localStore,this.datastore,t.asyncQueue,(e=>na(this.syncEngine,e,0)),(function(){return Wo.v()?new Wo:new id})())}createSyncEngine(t,e){return(function(i,o,a,l,f,d,g){const A=new Nd(i,o,a,l,f,d);return g&&(A.gu=!0),A})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(i){const o=j(i);b(Ne,"RemoteStore shutting down."),o.Ia.add(5),await In(o),o.Aa.shutdown(),o.Va.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}vs.provider={build:()=>new vs};/**
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
 *//**
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
 */class $d{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):xt("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
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
 */const Xt="FirestoreClient";class zd{constructor(t,e,n,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this._databaseInfo=i,this.user=pt.UNAUTHENTICATED,this.clientId=xa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(n,(async a=>{b(Xt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(b(Xt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ie;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Pu(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function Zr(r,t){r.asyncQueue.verifyOperationInProgress(),b(Xt,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener((async i=>{n.isEqual(i)||(await Au(t.localStore,i),n=i)})),t.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=t}async function sa(r,t){r.asyncQueue.verifyOperationInProgress();const e=await Gd(r);b(Xt,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener((n=>Xo(t.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,i)=>Xo(t.remoteStore,i))),r._onlineComponents=t}async function Gd(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){b(Xt,"Using user provided OfflineComponentProvider");try{await Zr(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(i){return i.name==="FirebaseError"?i.code===C.FAILED_PRECONDITION||i.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(e))throw e;he("Error using user provided cache. Falling back to memory cache: "+e),await Zr(r,new or)}}else b(Xt,"Using default OfflineComponentProvider"),await Zr(r,new jd(void 0));return r._offlineComponents}async function Hd(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(b(Xt,"Using user provided OnlineComponentProvider"),await sa(r,r._uninitializedComponentsProvider._online)):(b(Xt,"Using default OnlineComponentProvider"),await sa(r,new vs))),r._onlineComponents}async function ia(r){const t=await Hd(r),e=t.eventManager;return e.onListen=kd.bind(null,t.syncEngine),e.onUnlisten=Md.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Od.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Ld.bind(null,t.syncEngine),e}function Kd(r,t,e,n){const i=new $d(n),o=new Vd(t,i,e);return r.asyncQueue.enqueueAndForget((async()=>wd(await ia(r),o))),()=>{i.Nu(),r.asyncQueue.enqueueAndForget((async()=>Rd(await ia(r),o)))}}/**
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
 */function Lu(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const Qd="ComponentProvider",oa=new Map;function Wd(r,t,e,n,i){return new bh(r,t,e,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,Lu(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,n)}/**
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
 */const Fu="firestore.googleapis.com",aa=!0;class ua{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new D(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Fu,this.ssl=aa}else this.host=t.host,this.ssl=t.ssl??aa;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Iu;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<kf)throw new D(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}yh("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Lu(t.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new D(C.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new D(C.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new D(C.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(n,i){return n.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Qs{constructor(t,e,n,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ua({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new D(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ua(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new uh;switch(n.type){case"firstParty":return new fh(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const n=oa.get(e);n&&(b(Qd,"Removing Datastore"),oa.delete(e),n.terminate())})(this),Promise.resolve()}}function Yd(r,t,e,n={}){var d;r=zn(r,Qs);const i=Ia(t),o=r._getSettings(),a={...o,emulatorOptions:r._getEmulatorOptions()},l=`${t}:${e}`;i&&Gc(`https://${l}`),o.host!==Fu&&o.host!==l&&he("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const f={...o,host:l,ssl:i,emulatorOptions:n};if(!Yn(f,a)&&(r._setSettings(f),n.mockUserToken)){let g,A;if(typeof n.mockUserToken=="string")g=n.mockUserToken,A=pt.MOCK_USER;else{g=Mc(n.mockUserToken,(d=r._app)==null?void 0:d.options.projectId);const S=n.mockUserToken.sub||n.mockUserToken.user_id;if(!S)throw new D(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");A=new pt(S)}r._authCredentials=new ch(new Oa(g,A))}}/**
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
 */class Zt{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Zt(this.firestore,t,this._query)}}class _t{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Re(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new _t(this.firestore,t,this._key)}toJSON(){return{type:_t._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(En(e,_t._jsonSchema))return new _t(t,n||null,new N(H.fromString(e.referencePath)))}}_t._jsonSchemaVersion="firestore/documentReference/1.0",_t._jsonSchema={type:et("string",_t._jsonSchemaVersion),referencePath:et("string")};class Re extends Zt{constructor(t,e,n){super(t,e,Ds(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new _t(this.firestore,null,new N(t))}withConverter(t){return new Re(this.firestore,t,this._path)}}function dp(r,t,...e){if(r=Ce(r),r instanceof Qs){const n=H.fromString(t,...e);return Eo(n),new Re(r,null,n)}{if(!(r instanceof _t||r instanceof Re))throw new D(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(H.fromString(t,...e));return Eo(n),new Re(r.firestore,null,n)}}/**
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
 */const ca="AsyncQueue";class la{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ru(this,"async_queue_retry"),this._c=()=>{const n=Xr();n&&b(ca,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=t;const e=Xr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Xr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new Ie;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Yu.push(t),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!Me(t))throw t;b(ca,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((n=>{throw this.nc=n,this.rc=!1,xt("INTERNAL UNHANDLED ERROR: ",ha(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=e,e}enqueueAfterDelay(t,e,n){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const i=zs.createAndSchedule(this,t,e,n,(o=>this.hc(o)));return this.tc.push(i),i}uc(){this.nc&&M(47125,{Pc:ha(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ec(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ic(t){return this.Tc().then((()=>{this.tc.sort(((e,n)=>e.targetTimeMs-n.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function ha(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}class As extends Qs{constructor(t,e,n,i){super(t,e,n,i),this.type="firestore",this._queue=new la,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new la(t),this._firestoreClient=void 0,await t}}}function pp(r,t){const e=typeof r=="object"?r:Ql(),n=typeof r=="string"?r:t,i=jl(e,"firestore").getImmediate({identifier:n});if(!i._initialized){const o=Oc("firestore");o&&Yd(i,...o)}return i}function Jd(r){if(r._terminated)throw new D(C.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Xd(r),r._firestoreClient}function Xd(r){var n,i,o,a;const t=r._freezeSettings(),e=Wd(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(i=r._app)==null?void 0:i.options.apiKey,t);r._componentsProvider||(o=t.localCache)!=null&&o._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new zd(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&(function(f){const d=f==null?void 0:f._online.build();return{_offline:f==null?void 0:f._offline.build(d),_online:d}})(r._componentsProvider))}/**
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
 */class wt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new wt(ct.fromBase64String(t))}catch(e){throw new D(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new wt(ct.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:wt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(En(t,wt._jsonSchema))return wt.fromBase64String(t.bytes)}}wt._jsonSchemaVersion="firestore/bytes/1.0",wt._jsonSchema={type:et("string",wt._jsonSchemaVersion),bytes:et("string")};/**
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
 */class Uu{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new D(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new gt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class Bu{constructor(t){this._methodName=t}}/**
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
 */class Nt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new D(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new D(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return U(this._lat,t._lat)||U(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Nt._jsonSchemaVersion}}static fromJSON(t){if(En(t,Nt._jsonSchema))return new Nt(t.latitude,t.longitude)}}Nt._jsonSchemaVersion="firestore/geoPoint/1.0",Nt._jsonSchema={type:et("string",Nt._jsonSchemaVersion),latitude:et("number"),longitude:et("number")};/**
 * @license
 * Copyright 2024 Google LLC
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
 */class Rt{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(n,i){if(n.length!==i.length)return!1;for(let o=0;o<n.length;++o)if(n[o]!==i[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Rt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(En(t,Rt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new Rt(t.vectorValues);throw new D(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Rt._jsonSchemaVersion="firestore/vectorValue/1.0",Rt._jsonSchema={type:et("string",Rt._jsonSchemaVersion),vectorValues:et("object")};/**
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
 */const Zd=/^__.*__$/;function qu(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:r})}}class Ws{constructor(t,e,n,i,o,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=i,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new Ws({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(t){var i;const e=(i=this.path)==null?void 0:i.child(t),n=this.i({path:e,arrayElement:!1});return n.mc(t),n}fc(t){var i;const e=(i=this.path)==null?void 0:i.child(t),n=this.i({path:e,arrayElement:!1});return n.Ac(),n}gc(t){return this.i({path:void 0,arrayElement:!0})}yc(t){return ar(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.mc(this.path.get(t))}mc(t){if(t.length===0)throw this.yc("Document fields must not be empty");if(qu(this.dataSource)&&Zd.test(t))throw this.yc('Document fields cannot begin and end with "__"')}}class tp{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||yr(t)}A(t,e,n,i=!1){return new Ws({dataSource:t,methodName:e,targetDoc:n,path:gt.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ep(r){const t=r._freezeSettings(),e=yr(r._databaseId);return new tp(r._databaseId,!!t.ignoreUndefinedProperties,e)}function np(r,t,e,n=!1){return Ys(e,r.A(n?4:3,t))}function Ys(r,t){if(ju(r=Ce(r)))return sp("Unsupported field value:",t,r),rp(r,t);if(r instanceof Bu)return(function(n,i){if(!qu(i.dataSource))throw i.yc(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.yc(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.yc("Nested arrays are not supported");return(function(n,i){const o=[];let a=0;for(const l of n){let f=Ys(l,i.gc(a));f==null&&(f={nullValue:"NULL_VALUE"}),o.push(f),a++}return{arrayValue:{values:o}}})(r,t)}return(function(n,i){if((n=Ce(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return nf(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=K.fromDate(n);return{timestampValue:gs(i.serializer,o)}}if(n instanceof K){const o=new K(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:gs(i.serializer,o)}}if(n instanceof Nt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof wt)return{bytesValue:fu(i.serializer,n._byteString)};if(n instanceof _t){const o=i.databaseId,a=n.firestore._databaseId;if(!a.isEqual(o))throw i.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:du(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Rt)return(function(a,l){const f=a instanceof Rt?a.toArray():a;return{mapValue:{fields:{[za]:{stringValue:Ga},[tr]:{arrayValue:{values:f.map((g=>{if(typeof g!="number")throw l.yc("VectorValues must only contain numeric values.");return Ns(l.serializer,g)}))}}}}}})(n,i);if(Tu(n))return n._toProto(i.serializer);throw i.yc(`Unsupported field value: ${ur(n)}`)})(r,t)}function rp(r,t){const e={};return Fa(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Le(r,((n,i)=>{const o=Ys(i,t.dc(n));o!=null&&(e[n]=o)})),{mapValue:{fields:e}}}function ju(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof K||r instanceof Nt||r instanceof wt||r instanceof _t||r instanceof Bu||r instanceof Rt||Tu(r))}function sp(r,t,e){if(!ju(e)||!Ma(e)){const n=ur(e);throw n==="an object"?t.yc(r+" a custom object"):t.yc(r+" "+n)}}function Js(r,t,e){if((t=Ce(t))instanceof Uu)return t._internalPath;if(typeof t=="string")return op(r,t);throw ar("Field path arguments must be of type string or ",r,!1,void 0,e)}const ip=new RegExp("[~\\*/\\[\\]]");function op(r,t,e){if(t.search(ip)>=0)throw ar(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new Uu(...t.split("."))._internalPath}catch{throw ar(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function ar(r,t,e,n,i){const o=n&&!n.isEmpty(),a=i!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let f="";return(o||a)&&(f+=" (found",o&&(f+=` in field ${n}`),a&&(f+=` in document ${i}`),f+=")"),new D(C.INVALID_ARGUMENT,l+r+f)}/**
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
 */class ap{convertValue(t,e="none"){switch(Yt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return J(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Wt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Le(t,((i,o)=>{n[i]=this.convertValue(o,e)})),n}convertVectorValue(t){var n,i,o;const e=(o=(i=(n=t.fields)==null?void 0:n[tr].arrayValue)==null?void 0:i.values)==null?void 0:o.map((a=>J(a.doubleValue)));return new Rt(e)}convertGeoPoint(t){return new Nt(J(t.latitude),J(t.longitude))}convertArray(t,e){return(t.values||[]).map((n=>this.convertValue(n,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=fr(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(mn(t));default:return null}}convertTimestamp(t){const e=Qt(t);return new K(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=H.fromString(t);Q(Eu(n),9688,{name:t});const i=new gn(n.get(1),n.get(3)),o=new N(n.popFirst(5));return i.isEqual(e)||xt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2024 Google LLC
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
 */class $u extends ap{constructor(t){super(),this.firestore=t}convertBytes(t){return new wt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new _t(this.firestore,null,e)}}const fa="@firebase/firestore",da="4.13.0";/**
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
 */function pa(r){return(function(e,n){if(typeof e!="object"||e===null)return!1;const i=e;for(const o of n)if(o in i&&typeof i[o]=="function")return!0;return!1})(r,["next","error","complete"])}/**
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
 */class zu{constructor(t,e,n,i,o){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new _t(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new up(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Js("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class up extends zu{data(){return super.data()}}/**
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
 */function cp(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new D(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Xs{}class Zs extends Xs{}function mp(r,t,...e){let n=[];t instanceof Xs&&n.push(t),n=n.concat(e),(function(o){const a=o.filter((f=>f instanceof ei)).length,l=o.filter((f=>f instanceof ti)).length;if(a>1||a>0&&l>0)throw new D(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const i of n)r=i._apply(r);return r}class ti extends Zs{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new ti(t,e,n)}_apply(t){const e=this._parse(t);return Gu(t._query,e),new Zt(t.firestore,t.converter,fs(t._query,e))}_parse(t){const e=ep(t.firestore);return(function(o,a,l,f,d,g,A){let S;if(d.isKeyField()){if(g==="array-contains"||g==="array-contains-any")throw new D(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${g}' queries on documentId().`);if(g==="in"||g==="not-in"){ga(A,g);const k=[];for(const L of A)k.push(ma(f,o,L));S={arrayValue:{values:k}}}else S=ma(f,o,A)}else g!=="in"&&g!=="not-in"&&g!=="array-contains-any"||ga(A,g),S=np(l,a,A,g==="in"||g==="not-in");return tt.create(d,g,S)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class ei extends Xs{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new ei(t,e)}_parse(t){const e=this._queryConstraints.map((n=>n._parse(t))).filter((n=>n.getFilters().length>0));return e.length===1?e[0]:St.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(i,o){let a=i;const l=o.getFlattenedFilters();for(const f of l)Gu(a,f),a=fs(a,f)})(t._query,e),new Zt(t.firestore,t.converter,fs(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ni extends Zs{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new ni(t,e)}_apply(t){const e=(function(i,o,a){if(i.startAt!==null)throw new D(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new D(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new yn(o,a)})(t._query,this._field,this._direction);return new Zt(t.firestore,t.converter,Qh(t._query,e))}}function gp(r,t="asc"){const e=t,n=Js("orderBy",r);return ni._create(n,e)}class ri extends Zs{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new ri(t,e,n)}_apply(t){return new Zt(t.firestore,t.converter,nr(t._query,this._limit,this._limitType))}}function _p(r){return ri._create("limit",r,"F")}function ma(r,t,e){if(typeof(e=Ce(e))=="string"){if(e==="")throw new D(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Xa(t)&&e.indexOf("/")!==-1)throw new D(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(H.fromString(e));if(!N.isDocumentKey(n))throw new D(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Co(r,new N(n))}if(e instanceof _t)return Co(r,e._key);throw new D(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ur(e)}.`)}function ga(r,t){if(!Array.isArray(r)||r.length===0)throw new D(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Gu(r,t){const e=(function(i,o){for(const a of i)for(const l of a.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null})(r.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new D(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class an{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class ce extends zu{constructor(t,e,n,i,o,a){super(t,e,n,i,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Qn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Js("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=ce._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}ce._jsonSchemaVersion="firestore/documentSnapshot/1.0",ce._jsonSchema={type:et("string",ce._jsonSchemaVersion),bundleSource:et("string","DocumentSnapshot"),bundleName:et("string"),bundle:et("string")};class Qn extends ce{data(t={}){return super.data(t)}}class Se{constructor(t,e,n,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new an(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new Qn(this._firestore,this._userDataWriter,n.key,n,new an(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new D(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map((l=>{const f=new Qn(i._firestore,i._userDataWriter,l.doc.key,l.doc,new an(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:f,oldIndex:-1,newIndex:a++}}))}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((l=>o||l.type!==3)).map((l=>{const f=new Qn(i._firestore,i._userDataWriter,l.doc.key,l.doc,new an(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,g=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),g=a.indexOf(l.doc.key)),{type:lp(l.type),doc:f,oldIndex:d,newIndex:g}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Se._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=xa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],i=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),n.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function lp(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
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
 */Se._jsonSchemaVersion="firestore/querySnapshot/1.0",Se._jsonSchema={type:et("string",Se._jsonSchemaVersion),bundleSource:et("string","QuerySnapshot"),bundleName:et("string"),bundle:et("string")};function yp(r,...t){var d,g,A;r=Ce(r);let e={includeMetadataChanges:!1,source:"default"},n=0;typeof t[n]!="object"||pa(t[n])||(e=t[n++]);const i={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(pa(t[n])){const S=t[n];t[n]=(d=S.next)==null?void 0:d.bind(S),t[n+1]=(g=S.error)==null?void 0:g.bind(S),t[n+2]=(A=S.complete)==null?void 0:A.bind(S)}let o,a,l;if(r instanceof _t)a=zn(r.firestore,As),l=Ds(r._key.path),o={next:S=>{t[n]&&t[n](hp(a,r,S))},error:t[n+1],complete:t[n+2]};else{const S=zn(r,Zt);a=zn(S.firestore,As),l=S._query;const P=new $u(a);o={next:k=>{t[n]&&t[n](new Se(a,P,S,k))},error:t[n+1],complete:t[n+2]},cp(r._query)}const f=Jd(a);return Kd(f,l,i,o)}function hp(r,t,e){const n=e.docs.get(t._key),i=new $u(r);return new ce(r,i,t._key,n,new an(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){ah(Hl),Xn(new fn("firestore",((n,{instanceIdentifier:i,options:o})=>{const a=n.getProvider("app").getImmediate(),l=new As(new lh(n.getProvider("auth-internal")),new dh(a,n.getProvider("app-check-internal")),Dh(a,i),a);return o={useFetchStreams:e,...o},l._setSettings(o),l}),"PUBLIC").setMultipleInstances(!0)),Te(fa,da,t),Te(fa,da,"esm2020")})();export{fn as C,Oe as F,Xn as _,$l as a,jl as b,Oc as c,Ql as d,Kl as e,pp as f,Ce as g,dp as h,Ia as i,yp as j,_p as l,gp as o,Gc as p,mp as q,Te as r};
