if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let d={};const o=e=>s(e,t),f={module:{uri:t},exports:d,require:o};i[t]=Promise.all(r.map((e=>f[e]||o(e)))).then((e=>(n(...e),d)))}}define(["./workbox-e0782b83"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"attach.js",revision:"4765fb9d1b50eba4b3b3e3fc8debda94"},{url:"eruda.js",revision:"b77374334b4377ccdfafb7c4437a6f3b"},{url:"index.css",revision:"4fbe18e570fb3d4d6b8d4dbdcf17bc21"},{url:"index.html",revision:"55f379418822df6432801b1c7e258814"},{url:"index.js",revision:"415d8ab7554bef0348c4cae16a3c51b3"},{url:"registerSW.js",revision:"7418d14ba6aac15d761a0528d5fb716f"},{url:"manifest.webmanifest",revision:"8781d46a04b1e53ba489e6f57ca55f46"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
