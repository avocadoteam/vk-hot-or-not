var kr=Object.defineProperty;var Vt=Object.getOwnPropertySymbols;var $r=Object.prototype.hasOwnProperty,Sr=Object.prototype.propertyIsEnumerable;var Jt=(e,t,n)=>t in e?kr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Gt=(e,t)=>{for(var n in t||(t={}))$r.call(t,n)&&Jt(e,n,t[n]);if(Vt)for(var n of Vt(t))Sr.call(t,n)&&Jt(e,n,t[n]);return e};import{d as M,E as de,i as B,a as Wn,n as Wt,M as Kt,b as Q,w as mt,x as ht,c as re,z as Ir,h as Or,g as ye}from"./index.js";function Er(e,t){e.cursor[t].prev&&(e.cursor[t].prev.cursor[t].next=e.cursor[t].next),e.cursor[t].next&&(e.cursor[t].next.cursor[t].prev=e.cursor[t].prev),e.queue[t].last===e&&(e.queue[t].last=e.cursor[t].prev),e.queue[t].first===e&&(e.queue[t].first=e.cursor[t].next),e.cursor[t].prev=null,e.cursor[t].next=null}function Kn(e){var t,n;e.status="active",t=Le(e),(n=e).cursor.prev&&(n.cursor.prev.cursor.next=n.cursor.next),n.cursor.next&&(n.cursor.next.cursor.prev=n.cursor.prev),t.last===n&&(t.last=n.cursor.prev),t.first===n&&(t.first=n.cursor.next),n.cursor.prev=null,n.cursor.next=null}function Le(e){return e.group.activeChilds[e.priority]}function Yt(e,t){t.value.active=t.value.pending=e,t.status!=="active"&&Kn(t)}function gt(e,t){if(t.value.active===e)return t.value.pending=e,void(t.status==="pending"&&(Kn(t),Le(t).first||Er(t.group,t.priority)));var n,r,o,i;t.status==="active"&&(t.status="pending",Le(t).first||((o=t.group).queue[i=t.priority].last?(o.cursor[i].prev=o.queue[i].last,o.queue[i].last.cursor[i].next=o,o.queue[i].last=o):o.queue[i].first=o.queue[i].last=o),r=t,(n=Le(t)).last?(r.cursor.prev=n.last,n.last.cursor.next=r,n.last=r):n.first=n.last=r),t.value.pending=e,t.group.queue.rafID||(t.group.queue.rafID=Mr(t.group.queue.execQueue))}function Yn({value:e,runOp:t,group:n,priority:r}){return{value:{active:e,pending:e},runOp:t,status:"active",priority:r,group:n,cursor:{prev:null,next:null}}}function Zt(e){return{ops:[],queue:e,activeChilds:{props:{first:null,last:null},tree:{first:null,last:null},data:{first:null,last:null}},cursor:{props:{prev:null,next:null},tree:{prev:null,next:null},data:{prev:null,next:null}}}}function Nr(e){switch(e=String(e)){case"__proto__":case"__defineGetter__":case"__defineSetter__":case"constructor":case"prototype":case"hasOwnProperty":case"toString":case"valueOf":case"setProperty":case"removeProperty":return"forbidden";default:return e.replace(/[^a-zA-Z0-9\-_]/g,"")}}function Zn(e,t){for(let n=0;n<t.length;n++){let{type:r,field:o,value:i}=t[n];_r[r](e,o,i)}}function Xe(e){return e!==""&&e!==0&&e!=="0"&&(e==0||e==null)}function Hn(e,t,n){Xe(n)?e.style.removeProperty(`--${t}`):e.style.setProperty(`--${t}`,`${n}`)}function Qn(e,t,n){Xe(n)?delete e.style[t]:e.style[t]=`${n}`}function Xn(e,t,n){Xe(n)?delete e.dataset[t]:e.dataset[t]=`${n}`}function er(e,t,n){if(Xe(n)){switch(t){case"value":delete e.value;break;case"checked":e.checked=0;break;case"spellcheck":if(n==0)return void e.setAttribute("spellcheck","false")}e.removeAttribute(t)}else{switch(t){case"value":e.value=`${n}`;break;case"checked":e.checked=`${n}`}e.setAttribute(t,`${n}`)}}function vt(e,t){e.replaceData(0,(e.textContent||"").length,String(t))}function Dr({fn:e,state:t={},defer:n=0,name:r="",draft:o,isSvgRoot:i,namespace:d,env:l,isBlock:b=0}){let s=T,g={id:++Rr,name:r,plain:[],watch:[],nameMap:{},pages:[],closure:[],childTemplates:[],handlers:zr,upward:de.filter({fn(w,f,m){if(!m.page){if(!m.parent||!m.parent.page)return 1;m.page=m.parent.page}if(!m.page.root.activeSpawns.has(m.page.fullID))return console.count("inactive page upward"),0;let h=[m.page.template],v=[m.page];{let c=m.page.parent;for(;c;)v.push(c),h.push(c.template),c=c.parent}return m.node.next.forEach(c=>{let u=c.meta.nativeTemplate;if(u)if(h.includes(u)){let k=v[h.indexOf(u)];B({target:c,params:w,defer:1,page:k,stack:m,scope:m.scope})}else console.error("context drift",{stack:m,node:c});else B({target:c,params:w,defer:1,page:m.page,stack:m,scope:m.scope})}),0}}),loader:de.filter({fn(w,f,m){if(m.parent){let h=m.scope?m.scope.graphite.id:null;if(m.page){if(!m.page.root.activeSpawns.has(m.page.fullID))return console.count("inactive page loader"),0;if(m.page.template===g)return 1;if(m.page.root.childSpawns[m.page.fullID][g.id])m.page.root.childSpawns[m.page.fullID][g.id].forEach(v=>{(!h||v.root.scope&&h===v.root.scope.graphite.id)&&B({params:w,target:m.node,page:v,defer:1,scope:m.scope})});else{let v=m.page.fullID,c=m.page.template.name==="rec";g.pages.forEach(u=>{if(!h||u.root.scope&&h===u.root.scope.graphite.id)if(u.fullID===v||u.fullID.startsWith(`${v}_`)){let k=1;if(c){let $=m.page.template.id,x=u.parent;for(;x&&x!==m.page;){if(x.template.id===$){k=0;break}x=x.parent}}k&&B({params:w,target:m.node,page:u,defer:1,scope:m.scope})}else v.startsWith(`${u.fullID}_`)&&B({params:w,target:m.node,page:m.page,defer:1,scope:m.scope})})}}else g.pages.forEach(v=>{(!h||v.root.scope&&h===v.root.scope.graphite.id)&&B({params:w,target:m.node,page:v,defer:1,scope:m.scope})});return 0}return 1}}),parent:s,node:null,api:null,trigger:{mount:M({named:"mount"})},draft:o,isSvgRoot:i,namespace:d,env:l,isBlock:b||!(!s||!s.isBlock)};s&&s.childTemplates.push(g);let y=Wn({meta:{template:g}});return g.node=y,T=g,n?g.deferredInit=()=>{let w=T;T=g,g.deferredInit=null;try{Wt(y,()=>{let f=Kt(t);g.api=e(f,g.trigger),g.nameMap=f})}finally{T=w}}:Wt(y,()=>{let w=Kt(t);g.api=e(w,g.trigger),g.nameMap=w}),T=s,g}function Cr(e,t){let n;switch(n=t?t.getState(e):e.current,e.type){case"list":return[...n];case"shape":return Gt({},n);default:return n}}function tr(e,t,n){let r=t;for(;r&&!Ae(r,e);)r=r.parent;return r?Ae(r,e):n?(n.getState(e),n.reg[e.id]):e}function lt(e,t){Ae(t,e)||(t.reg[e.id]=tr(e,t.parent,t.root.scope))}function Ht(e,t,n){t in n||(n[t]=[]),n[t].push(...e)}function Pr(e,{values:t={},parentLeaf:n,mountNode:r,svgRoot:o,leafData:i,opGroup:d,domSubtree:l,hydration:b,root:s}){function g(h){if(h.before)for(let v=0;v<h.before.length;v++){let c=h.before[v];switch(c.type){case"map":{let u,k=c.from;if(!c.fn&&!k)break;k&&(lt(k,f),u=w[k.id].current),w[h.id].current=c.fn?c.fn(u):u;break}case"field":{let u=c.from;lt(u,f),w[h.id].current[c.field]=w[u.id].current;break}case"closure":lt(c.of,f)}}}function y(h,v,c){let u;v.stop=1;try{for(;v.i<h.length;)u=h[v.i],v.i++,u.fn(c[u.of.id]?c[u.of.id].current:tr(u.of,f.parent,f.root.scope).current)}catch(k){console.error(k),v.stop=0}}let w={},f={draft:e.draft,svgRoot:o,data:i,parent:n,hydration:b,mountNode:r,root:s,id:++Fr,fullID:"",reg:w,template:e};e.pages.push(f),n&&Ht([f],e.id,s.childSpawns[n.fullID]),f.fullID=n?`${n.fullID}_${f.id}`:`${f.id}`,s.childSpawns[f.fullID]={},s.activeSpawns.add(f.fullID),s.leafOps[f.fullID]={group:d,domSubtree:l};for(let h=0;h<e.closure.length;h++){let v=e.closure[h],c=v,u=f.parent;e:for(;u;){if(Ae(u,v)){c=Ae(u,v);break e}u=u.parent}!u&&s.scope&&(s.scope.getState(v),c=s.scope.reg[v.id]),w[v.id]=c}for(let h=0;h<e.plain.length;h++){let v=e.plain[h],c={id:v.id,current:Cr(v,s.scope)};w[v.id]=c}for(let h in t){let v=e.nameMap[h].stateRef.id;w[v]={id:v,current:t[h]}}e.closure.forEach(g),e.plain.forEach(g);let m={i:0,stop:0};for(;!m.stop;)y(e.watch,m,w);if(n)for(let h in s.childSpawns[f.fullID])Ht(s.childSpawns[f.fullID][h],h,s.childSpawns[n.fullID]);if(ne)ne.steps.push({target:e.trigger.mount,params:f,defer:1,page:f,scope:s.scope});else{let h;ne={parent:ne,steps:[{target:e.trigger.mount,params:f,defer:1,page:f,scope:s.scope}]};do for(;h=ne.steps.shift();)ne={parent:ne,steps:[]},B(h);while(ne=ne.parent)}return f}function Je(e){let t=e.parent;for(;t.type!=="element"&&t.type!=="using";)t=t.parent;return t?t.value:null}function Ge(e){if(!e.visible)return null;switch(e.type){case"text":case"element":return e;case"LF":case"route":case"rec":case"recItem":case"block":case"blockItem":for(let t=e.child.length-1;t>=0;t--){let n=Ge(e.child[t]);if(n)return n}return null;case"list":{let t=e.lastChild;if(!t)return null;for(;t;){let n=Ge(t);if(n)return n;t=t.left}return null}default:return null}}function We(e){switch(e.type){case"using":return null;case"LF":{let t=e.left;for(;t;){let n=Ge(t);if(n)return n;t=t.left}return We(e.parent)}case"element":case"text":case"route":case"rec":case"recItem":case"block":case"blockItem":case"list":{let t=e.parent;for(let n=e.index-1;n>=0;n--){let r=t.child[n];if(!r)continue;let o=Ge(r);if(o)return o}switch(t.type){case"element":case"using":return null}return We(t)}default:return null}}function bt(e){let t=We(e);return t?t.value:null}function yt(e,t){if(!e)throw Error(t)}function Et(e,t){if(!e)throw Error(`${t}() called outside from using() closure`)}function Ar(e){if(!T)return;let{draft:t}=e;if(t.type!=="listItem"&&t.type!=="rec")switch(T.draft.type){case"element":case"using":case"route":case"list":case"rec":case"recItem":case"block":case"blockItem":t.inParentIndex=T.draft.childCount,T.draft.childCount+=1,T.draft.childTemplates.push(e);break;default:console.warn(`unexpected currentTemplate type ${T.draft.type}`)}}function Qt(e,{parentBlockFragment:t,leaf:n,node:r,svgRoot:o,values:i}){e.childTemplates.forEach(d=>{Tr({parentBlockFragment:t,leaf:n,node:r,svgRoot:o,values:i,actor:d})})}function Tr({parentBlockFragment:e,leaf:t,node:n=t.mountNode,actor:r,svgRoot:o,values:i}){let d;yt(Lr.includes(e.type),`incorrect parent ${e.type}`);let{draft:l}=r,{queue:b}=t.root.leafOps[t.fullID].group,s=Zt(b),g=t.root.leafOps[t.fullID].domSubtree,y=g;switch(l.type){case"route":{let f={type:"route",parent:e,child:[],visible:0,index:l.inParentIndex};e.child[l.inParentIndex]=f,d={type:"route",block:f,ops:{},initialized:0,pendingInit:null};break}case"element":{let f;if(r.isBlock){let h,v,c=t;for(;c&&(!v||!h);){c.template.env&&(h=c.template.env);let{draft:u}=c;u.type==="element"&&(u.tag==="svg"?v="svg":u.tag==="foreignObject"&&(v="html")),c=c.parent}v||(v="html"),h&&(f=v==="svg"?h.document.createElementNS("http://www.w3.org/2000/svg",l.tag):h.document.createElement(l.tag),Zn(f,l.staticSeq))}else f=l.stencil.cloneNode();let m={type:"element",parent:e,child:[],value:f,visible:0,index:l.inParentIndex};e.child[l.inParentIndex]=m,d={type:"element",block:m,ops:{visible:Yn({value:0,priority:"tree",runOp(h){if(h){nr(m);let v=d;v.needToCallNode&&(v.needToCallNode=0,B({target:Ke,params:{element:m.value,fns:l.node},page:w,scope:t.root.scope})),m.visible=1}else m.value.remove(),m.visible=0},group:g})},needToCallNode:l.node.length>0},y=Zt(b);break}case"list":{let f={type:"list",parent:e,child:[],lastChild:null,visible:1,index:l.inParentIndex};e.child[l.inParentIndex]=f,d={type:"list",draft:l,block:f,records:[],pendingUpdate:null};break}case"using":case"listItem":break;case"rec":{let f={type:"rec",parent:e,child:[],visible:1,index:l.inParentIndex};e.child[l.inParentIndex]=f,d={type:"rec",block:f};break}case"recItem":{let f={type:"recItem",parent:e,child:[],visible:1,index:l.inParentIndex};e.child[l.inParentIndex]=f,d={type:"rec item",block:f};break}case"block":{let f={type:"block",parent:e,child:[],visible:1,index:l.inParentIndex};e.child[l.inParentIndex]=f,d={type:"block",block:f};break}case"blockItem":{let f={type:"blockItem",parent:e,child:[],visible:1,index:l.inParentIndex};e.child[l.inParentIndex]=f,d={type:"block item",block:f};break}default:console.warn(`unexpected draft type ${l.type}`)}let w=Pr(r,{values:i,parentLeaf:t,mountNode:n,svgRoot:o||t.svgRoot,leafData:d,opGroup:s,domSubtree:y,hydration:t.hydration,root:t.root})}function nr(e){let t=bt(e);t?t.after(e.value):Je(e).prepend(e.value),e.visible=1}function ut({mount:e,state:t,onMount:n,onState:r}){return{onMount:ht({source:t,clock:e,fn:n,greedy:1}),onState:ht({source:e,clock:t,fn:r,greedy:1})}}function Be(e,t){for(let n in e)t(e[n],n)}function Xt(e,t){if(!T)return;let n=T.draft;yt(n.type==="element",`"handler" extension can be used only with element nodes, got "${n.type}"`),t===void 0&&(t=e,e={});for(let l in t)yt(Q.unit(t[l]),`handler for "${l}" should be event`);let{passive:r=0,capture:o=0,prevent:i=0,stop:d=0}=e;n.handler.push({options:{prevent:i,stop:d},domConfig:{passive:i?0:r,capture:o},map:t})}function Nt(e){Et(T,"spec");let t=T.draft;switch(t.type){case"list":return void(e.visible&&(t.itemVisible=e.visible));case"listItem":case"using":case"route":case"rec":case"recItem":case"block":case"blockItem":return}if(e.attr&&t.attr.push(e.attr),e.data&&t.data.push(e.data),"text"in e){let n=e.text,r=t.childCount;Array.isArray(n)?(t.text.push(...n.map((o,i)=>({index:i+r,value:o}))),t.childCount+=n.length):(t.text.push({index:r,value:n}),t.childCount+=1)}if(e.style){let n={};for(let r in e.style)n[Nr(r)]=e.style[r];t.style.push(n)}if(e.styleVar&&t.styleVar.push(e.styleVar),e.visible&&(t.visible=e.visible),e.handler){let n=e.handler;typeof n.on=="object"?Xt(n.config||{},n.on):Xt(n)}e.\u0254&&Nt(e.\u0254)}function en(e,{initCtx:t,runOp:n,hooks:{onMount:r,onState:o}}){let i=e.opsAmount++;r.watch(({value:d,leaf:l})=>{let b=Yn({value:d,priority:"props",runOp(g){n(g,s)},group:l.root.leafOps[l.fullID].group});l.root.leafOps[l.fullID].group.ops[i]=b;let s=t(d,l)}),o.watch(({value:d,leaf:l})=>{gt(d,l.root.leafOps[l.fullID].group.ops[i])})}function Re(e,t,n){e[t].forEach(r=>{Be(r,(o,i)=>{switch(t){case"data":case"styleVar":n[t][i]=o;break;case"attr":n.attr[i==="xlink:href"?"href":i]=o;break;case"style":i.startsWith("--")?n.styleVar[i.slice(2)]=o:n.style[i]=o}})})}function tn(e,t,n){let r=e.data.block,o={type:"text",parent:r,visible:0,index:n,value:null};if(r.child[n]=o,e.hydration){let i=We(o);if(i)switch(i.type){case"text":o.value=e.root.env.document.createTextNode(t),i.value.after(o.value);break;case"element":o.value=i.value.nextSibling,vt(o.value,t)}else{let d=Je(o);o.value=d.firstChild,vt(o.value,t)}o.visible=1}else o.value=e.root.env.document.createTextNode(t),nr(o);return o}function ft(e){let t=e.stateRef,n=T;n.plain.includes(t)||n.closure.includes(t)||n.closure.push(t)}function jr(e,t){let n,r=0,o=0;typeof t=="function"?(r=1,n=t):t&&(o=1,t.fn&&(r=1,n=t.fn),t.\u0254&&(typeof t.\u0254=="function"?(r=1,n=t.\u0254):typeof t.\u0254.fn=="function"&&(r=1,n=t.\u0254.fn))),Et(T,"h");let i,d=T.env,l=T.namespace,b=l,s="html";b=s=l==="svg"?"svg":"html",e==="svg"&&(s="svg",b="svg"),T.isBlock||(i=s==="svg"?d.document.createElementNS("http://www.w3.org/2000/svg",e):d.document.createElement(e));let g=i,y={type:"element",tag:e,attr:[],data:[],text:[],style:[],styleVar:[],handler:[],stencil:g,seq:[],staticSeq:[],childTemplates:[],childCount:0,inParentIndex:-1,opsAmount:1,node:[]};l==="foreignObject"?(y.attr.push({xmlns:"http://www.w3.org/1999/xhtml"}),b="html"):e==="svg"?(y.attr.push({xmlns:"http://www.w3.org/2000/svg"}),b="svg"):e==="foreignObject"&&(b="foreignObject");let w=Dr({name:"element",draft:y,isSvgRoot:e==="svg",namespace:b,fn(f,{mount:m}){let h=M({named:"domElementCreated"});r&&n(),o&&Nt(t),Q.unit(y.visible)&&(y.seq.push({type:"visible",value:y.visible}),ft(y.visible));let v={attr:{},data:{},style:{},styleVar:{}};Re(y,"attr",v),Re(y,"data",v),Re(y,"style",v),Re(y,"styleVar",v),Be(v,(c,u)=>{Be(c,(k,$)=>{Q.unit(k)?(y.seq.push({type:u,field:$,value:k}),ft(k)):y.staticSeq.push({type:u,field:$,value:k})})}),y.text.forEach(c=>{c.value!==null&&(Q.unit(c.value)?(y.seq.push({type:"dynamicText",value:c.value,childIndex:c.index}),ft(c.value)):y.seq.push({type:"staticText",value:String(c.value),childIndex:c.index}))}),y.handler.forEach(c=>{Be(c.map,(u,k)=>{y.seq.push({type:"handler",for:k,handler:u,options:c.options,domConfig:c.domConfig})})}),g&&Zn(g,y.staticSeq),y.seq.forEach(c=>{switch(c.type){case"visible":{let{onMount:u,onState:k}=ut({mount:m,state:c.value,onMount:($,x)=>({leaf:x,value:$,hydration:x.hydration}),onState:($,x)=>({leaf:$,value:x,hydration:0})});u.watch(({leaf:$,value:x,hydration:C})=>{let _=$.data,S=_.block;if(C&&(Yt(x,_.ops.visible),x)){let J,q=bt(S);if(J=q?q.nextSibling:Je(S).firstChild,J.nodeName==="#text"){let G=J;J=J.nextSibling,G.remove()}S.value=J,S.visible=1}Qt(y,{parentBlockFragment:S,leaf:$,node:S.value,svgRoot:w.isSvgRoot?S.value:null}),x&&_.needToCallNode&&(_.needToCallNode=0,B({target:Ke,params:{element:_.block.value,fns:y.node},page:$,defer:1,scope:$.root.scope})),B({target:h,params:$,defer:1,page:$,scope:$.root.scope})}),mt([k,u]).watch(({leaf:$,value:x,hydration:C})=>{C||gt(x,$.data.ops.visible)});break}case"attr":case"data":case"style":case"styleVar":{let u=Ur[c.type],k=Br.some(({type:x,field:C})=>c.type===x&&c.field===C),$=ut({mount:h,state:c.value,onMount:(x,C)=>({leaf:C,value:x}),onState:(x,C)=>({leaf:x,value:C})});k?mt([$.onState,$.onMount]).watch(({leaf:x,value:C})=>{u(dt(x),c.field,C)}):en(y,{initCtx(x,C){let _=dt(C);return u(_,c.field,x),_},runOp(x,C){u(C,c.field,x)},hooks:$});break}case"dynamicText":en(y,{initCtx:(u,k)=>tn(k,u,c.childIndex),runOp(u,k){vt(k.value,u)},hooks:ut({mount:h,state:c.value,onMount:(u,k)=>({leaf:k,value:String(u)}),onState:(u,k)=>({leaf:u,value:String(k)})})});break;case"staticText":h.watch(u=>{tn(u,c.value,c.childIndex)});break;case"handler":{let u=c.handler.graphite.meta.nativeTemplate||null;h.watch(k=>{let $=null;if(u){let x=0,C=k;for(;!x&&C;)C.template===u?(x=1,$=C):C=C.parent}else $=null;dt(k).addEventListener(c.for,x=>{c.options.prevent&&x.preventDefault(),c.options.stop&&x.stopPropagation(),B({target:c.handler,params:x,page:$,scope:k.root.scope})},c.domConfig)});break}}}),m.watch(c=>{let u=c.data;if(!y.visible){let k=u.ops.visible,$=u.block;if(c.hydration){Yt(1,k);let x,C=bt($);if(x=C?C.nextSibling:Je($).firstChild,x.nodeName==="#text"){let _=x;x=x.nextSibling,_.remove()}$.value=x,$.visible=1}Qt(y,{parentBlockFragment:$,leaf:c,node:$.value,svgRoot:w.isSvgRoot?$.value:null}),B({target:h,params:c,defer:1,page:c,scope:c.root.scope}),c.hydration?u.needToCallNode&&(u.needToCallNode=0,B({target:Ke,params:{element:u.block.value,fns:y.node},page:c,defer:1,scope:c.root.scope})):gt(1,k)}})},env:d});Ar(w)}function qr(e){Et(T,"node");let t=T.draft;switch(t.type){case"list":case"listItem":case"using":case"route":case"rec":case"recItem":case"block":case"blockItem":return void console.error("node() hook supported only in h() nodes")}t.node.push(e)}typeof performance!="undefined"&&performance.now||typeof process!="undefined"&&process.hrtime;let Mr=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:e=>setTimeout(e,0);const _r={attr:er,data:Xn,style:Qn,styleVar:Hn},te=(e,t)=>e.includes(t);let zr={storeBase(e,t){e.plain.push(t)},storeOnMap(e,t,n,r){var o,i;n.unshift(e.loader),n.push(e.upward),r&&(te(e.plain,r)||(te(e.closure,r)||e.closure.push(r),i={type:"closure",of:r},(o=t).before||(o.before=[]),o.before.push(i)))},storeMap(e,t,n){te(e.plain,t)||te(n.seq,e.loader)||n.seq.unshift(e.loader)},storeWatch:(e,t,n)=>(e.watch.push({of:t,fn:n}),1),eventPrepend(e,t){t.seq.push(e.upward)},combineBase(e,t,n){e.plain.push(t,n)},combineField(e,t,n){te(e.plain,t)||n.seq.unshift(e.loader)},splitBase(e,t){e.plain.push(t)},splitMatchStore(e,t,n){te(e.plain,t)||n.seq.unshift(e.loader)},sampleSource(e,t,n,r){t.current?te(e.plain,n)||te(e.closure,n)||e.closure.push(n):e.plain.push(n),e.plain.push(t),te(e.plain,r)||e.plain.push(r)},sampleTarget(e,t){t.seq.push(e.loader)},sampleSourceLoader:e=>e.loader,sampleSourceUpward:(e,t)=>t&&e.upward},Rr=0,Fr=0,T=null;const Ae=(e,t)=>e.reg[t.id];let ne=null;const Lr=["LF","using","element","recItem","rec","block","blockItem","route"];let Ke=M({named:"onMount"});Ke.watch(({fns:e,element:t})=>{e.forEach(n=>{n(t)})});const Br=[{type:"attr",field:"value"},{type:"attr",field:"checked"},{type:"attr",field:"min"},{type:"attr",field:"max"}],Ur={attr:er,data:Xn,style:Qn,styleVar:Hn},dt=e=>e.data.block.value;var Ue={exports:{}};(function(e){var t="-ms-",n="-moz-",r="-webkit-",o="comm",i="rule",d="decl",l="@page",b="@media",s="@import",g="@charset",y="@viewport",w="@supports",f="@document",m="@namespace",h="@keyframes",v="@font-face",c="@counter-style",u="@font-feature-values",k=Math.abs,$=String.fromCharCode;function x(a,p){return(((p<<2^q(a,0))<<2^q(a,1))<<2^q(a,2))<<2^q(a,3)}function C(a){return a.trim()}function _(a,p){return(a=p.exec(a))?a[0]:a}function S(a,p,I){return a.replace(p,I)}function J(a,p){return a.indexOf(p)}function q(a,p){return 0|a.charCodeAt(p)}function G(a,p,I){return a.slice(p,I)}function U(a){return a.length}function pe(a){return a.length}function ae(a,p){return p.push(a),a}function nt(a,p){return a.map(p).join("")}function $e(a,p,I,N,D,W,ee){return{value:a,root:p,parent:I,type:N,props:D,children:W,line:e.line,column:e.column,length:ee,return:""}}function me(a,p,I){return $e(a,p.root,p.parent,I,p.props,p.children,0)}function Mt(){return e.character}function _t(){return e.character=e.position>0?q(e.characters,--e.position):0,e.column--,e.character===10&&(e.column=1,e.line--),e.character}function z(){return e.character=e.position<e.length?q(e.characters,e.position++):0,e.column++,e.character===10&&(e.column=1,e.line++),e.character}function oe(){return q(e.characters,e.position)}function Se(){return e.position}function Ie(a,p){return G(e.characters,a,p)}function Oe(a){switch(a){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function rt(a){return e.line=e.column=1,e.length=U(e.characters=a),e.position=0,[]}function at(a){return e.characters="",a}function qe(a){return C(Ie(e.position-1,Me(a===91?a+2:a===40?a+1:a)))}function zt(a){return at(Ft(rt(a)))}function Rt(a){for(;(e.character=oe())&&e.character<33;)z();return Oe(a)>2||Oe(e.character)>3?"":" "}function Ft(a){for(;z();)switch(Oe(e.character)){case 0:ae(ot(e.position-1),a);break;case 2:ae(qe(e.character),a);break;default:ae($(e.character),a)}return a}function Lt(a,p){for(;--p&&z()&&!(e.character<48||e.character>102||e.character>57&&e.character<65||e.character>70&&e.character<97););return Ie(a,Se()+(p<6&&oe()==32&&z()==32))}function Me(a){for(;z();)switch(e.character){case a:return e.position;case 34:case 39:return Me(a===34||a===39?a:e.character);case 40:a===41&&Me(a);break;case 92:z()}return e.position}function Bt(a,p){for(;z()&&a+e.character!==57&&(a+e.character!==84||oe()!==47););return"/*"+Ie(p,e.position-1)+"*"+$(a===47?a:z())}function ot(a){for(;!Oe(oe());)z();return Ie(a,e.position)}function gr(a){return at(Ee("",null,null,null,[""],a=rt(a),0,[0],a))}function Ee(a,p,I,N,D,W,ee,R,De){for(var he=0,ie=0,F=ee,ge=0,ve=0,ce=0,V=1,_e=1,K=1,L=0,se="",ze=D,le=W,Y=N,j=se;_e;)switch(ce=L,L=z()){case 34:case 39:case 91:case 40:j+=qe(L);break;case 9:case 10:case 13:case 32:j+=Rt(ce);break;case 92:j+=Lt(Se()-1,7);continue;case 47:switch(oe()){case 42:case 47:ae(Ut(Bt(z(),Se()),p,I),De);break;default:j+="/"}break;case 123*V:R[he++]=U(j)*K;case 125*V:case 59:case 0:switch(L){case 0:case 125:_e=0;case 59+ie:ve>0&&U(j)-F&&ae(ve>32?ct(j+";",N,I,F-1):ct(S(j," ","")+";",N,I,F-2),De);break;case 59:j+=";";default:if(ae(Y=it(j,p,I,he,ie,D,R,se,ze=[],le=[],F),W),L===123)if(ie===0)Ee(j,p,Y,Y,ze,W,F,R,le);else switch(ge){case 100:case 109:case 115:Ee(a,Y,Y,N&&ae(it(a,Y,Y,0,0,D,R,se,D,ze=[],F),le),D,le,F,R,N?ze:le);break;default:Ee(j,Y,Y,Y,[""],le,F,R,le)}}he=ie=ve=0,V=K=1,se=j="",F=ee;break;case 58:F=1+U(j),ve=ce;default:if(V<1){if(L==123)--V;else if(L==125&&V++==0&&_t()==125)continue}switch(j+=$(L),L*V){case 38:K=ie>0?1:(j+="\f",-1);break;case 44:R[he++]=(U(j)-1)*K,K=1;break;case 64:oe()===45&&(j+=qe(z())),ge=oe(),ie=U(se=j+=ot(Se())),L++;break;case 45:ce===45&&U(j)==2&&(V=0)}}return W}function it(a,p,I,N,D,W,ee,R,De,he,ie){for(var F=D-1,ge=D===0?W:[""],ve=pe(ge),ce=0,V=0,_e=0;ce<N;++ce)for(var K=0,L=G(a,F+1,F=k(V=ee[ce])),se=a;K<ve;++K)(se=C(V>0?ge[K]+" "+L:S(L,/&\f/g,ge[K])))&&(De[_e++]=se);return $e(a,p,I,D===0?i:R,De,he,ie)}function Ut(a,p,I){return $e(a,p,I,o,$(Mt()),G(a,2,-2),0)}function ct(a,p,I,N){return $e(a,p,I,d,G(a,0,N),G(a,N+1,-1),N)}function st(a,p){switch(x(a,p)){case 5103:return r+"print-"+a+a;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return r+a+a;case 5349:case 4246:case 4810:case 6968:case 2756:return r+a+n+a+t+a+a;case 6828:case 4268:return r+a+t+a+a;case 6165:return r+a+t+"flex-"+a+a;case 5187:return r+a+S(a,/(\w+).+(:[^]+)/,r+"box-$1$2"+t+"flex-$1$2")+a;case 5443:return r+a+t+"flex-item-"+S(a,/flex-|-self/,"")+a;case 4675:return r+a+t+"flex-line-pack"+S(a,/align-content|flex-|-self/,"")+a;case 5548:return r+a+t+S(a,"shrink","negative")+a;case 5292:return r+a+t+S(a,"basis","preferred-size")+a;case 6060:return r+"box-"+S(a,"-grow","")+r+a+t+S(a,"grow","positive")+a;case 4554:return r+S(a,/([^-])(transform)/g,"$1"+r+"$2")+a;case 6187:return S(S(S(a,/(zoom-|grab)/,r+"$1"),/(image-set)/,r+"$1"),a,"")+a;case 5495:case 3959:return S(a,/(image-set\([^]*)/,r+"$1$`$1");case 4968:return S(S(a,/(.+:)(flex-)?(.*)/,r+"box-pack:$3"+t+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+r+a+a;case 4095:case 3583:case 4068:case 2532:return S(a,/(.+)-inline(.+)/,r+"$1$2")+a;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(U(a)-1-p>6)switch(q(a,p+1)){case 109:if(q(a,p+4)!==45)break;case 102:return S(a,/(.+:)(.+)-([^]+)/,"$1"+r+"$2-$3$1"+n+(q(a,p+3)==108?"$3":"$2-$3"))+a;case 115:return~J(a,"stretch")?st(S(a,"stretch","fill-available"),p)+a:a}break;case 4949:if(q(a,p+1)!==115)break;case 6444:switch(q(a,U(a)-3-(~J(a,"!important")&&10))){case 107:return S(a,":",":"+r)+a;case 101:return S(a,/(.+:)([^;!]+)(;|!.+)?/,"$1"+r+(q(a,14)===45?"inline-":"")+"box$3$1"+r+"$2$3$1"+t+"$2box$3")+a}break;case 5936:switch(q(a,p+11)){case 114:return r+a+t+S(a,/[svh]\w+-[tblr]{2}/,"tb")+a;case 108:return r+a+t+S(a,/[svh]\w+-[tblr]{2}/,"tb-rl")+a;case 45:return r+a+t+S(a,/[svh]\w+-[tblr]{2}/,"lr")+a}return r+a+t+a+a}return a}function Ne(a,p){for(var I="",N=pe(a),D=0;D<N;D++)I+=p(a[D],D,a,p)||"";return I}function vr(a,p,I,N){switch(a.type){case s:case d:return a.return=a.return||a.value;case o:return"";case i:a.value=a.props.join(",")}return U(I=Ne(a.children,N))?a.return=a.value+"{"+I+"}":""}function br(a){var p=pe(a);return function(I,N,D,W){for(var ee="",R=0;R<p;R++)ee+=a[R](I,N,D,W)||"";return ee}}function yr(a){return function(p){p.root||(p=p.return)&&a(p)}}function xr(a,p,I,N){if(!a.return)switch(a.type){case d:a.return=st(a.value,a.length);break;case h:return Ne([me(S(a.value,"@","@"+r),a,"")],N);case i:if(a.length)return nt(a.props,function(D){switch(_(D,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Ne([me(S(D,/:(read-\w+)/,":"+n+"$1"),a,"")],N);case"::placeholder":return Ne([me(S(D,/:(plac\w+)/,":"+r+"input-$1"),a,""),me(S(D,/:(plac\w+)/,":"+n+"$1"),a,""),me(S(D,/:(plac\w+)/,t+"input-$1"),a,"")],N)}return""})}}function wr(a){a.type===i&&(a.props=a.props.map(function(p){return nt(zt(p),function(I,N,D){switch(q(I,0)){case 12:return G(I,1,U(I));case 0:case 40:case 43:case 62:case 126:return I;case 58:D[++N]==="global"&&(D[N]="",D[++N]="\f"+G(D[N],N=1,-1));case 32:return N===1?"":I;default:switch(N){case 0:return a=I,pe(D)>1?"":I;case(N=pe(D)-1):case 2:return N===2?I+a+a:I+a;default:return I}}})}))}e.line=1,e.column=1,e.length=0,e.position=0,e.character=0,e.characters="",e.CHARSET=g,e.COMMENT=o,e.COUNTER_STYLE=c,e.DECLARATION=d,e.DOCUMENT=f,e.FONT_FACE=v,e.FONT_FEATURE_VALUES=u,e.IMPORT=s,e.KEYFRAMES=h,e.MEDIA=b,e.MOZ=n,e.MS=t,e.NAMESPACE=m,e.PAGE=l,e.RULESET=i,e.SUPPORTS=w,e.VIEWPORT=y,e.WEBKIT=r,e.abs=k,e.alloc=rt,e.append=ae,e.caret=Se,e.char=Mt,e.charat=q,e.combine=nt,e.comment=Ut,e.commenter=Bt,e.compile=gr,e.copy=me,e.dealloc=at,e.declaration=ct,e.delimit=qe,e.delimiter=Me,e.escaping=Lt,e.from=$,e.hash=x,e.identifier=ot,e.indexof=J,e.match=_,e.middleware=br,e.namespace=wr,e.next=z,e.node=$e,e.parse=Ee,e.peek=oe,e.prefix=st,e.prefixer=xr,e.prev=_t,e.replace=S,e.ruleset=it,e.rulesheet=yr,e.serialize=Ne,e.sizeof=pe,e.slice=Ie,e.stringify=vr,e.strlen=U,e.substr=G,e.token=Oe,e.tokenize=zt,e.tokenizer=Ft,e.trim=C,e.whitespace=Rt,Object.defineProperty(e,"__esModule",{value:!0})})(Ue.exports);var rr=M({loc:{file:"/src/index.ts",line:5,column:17},name:"addStyle",sid:"-dde58y"}),Vr=re({map:new Map},{loc:{file:"/src/index.ts",line:6,column:16},name:"$styles",sid:"fw31b8"});Vr.on(rr,function(e,t){var n=t.id,r=t.styles;return e.map.has(n)?e:(e.map.set(n,function(o,i){return Ue.exports.serialize(Ue.exports.compile(".es-".concat(o," { ").concat(i," }")),Ue.exports.stringify)}(n,r)),{map:e.map})});var nn,Jr=(nn=9005e3,function(){return(++nn).toString(36)});function Gr(e,t){var n=[e[0]];return t.forEach(function(r,o){if(typeof r=="function"){if(typeof r.STYLED_ID!="string")throw new TypeError("Passed not an effector styled component");n.push(".es-".concat(r.STYLED_ID))}else n.push(String(r));n.push(e[o+1])}),n.join("")}var xt=function(e){return function(t){for(var n=Jr(),r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];var d=Gr(t,o),l=function(b){rr({id:n,styles:d}),jr(e,function(){qr(function(s){s.classList.add("es-".concat(n))}),b&&(typeof b=="function"?b():(Nt(b),typeof b.fn=="function"&&b.fn()))})};return l.STYLED_ID=n,l}};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","marquee","menu","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(e){xt[e]=xt(e)});var O=xt;function rn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?rn(Object(n),!0).forEach(function(r){Z(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):rn(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function wt(e){return wt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},wt(e)}function Z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function E(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function ue(e){return function(t){if(Array.isArray(t))return kt(t)}(e)||function(t){if(typeof Symbol!="undefined"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}(e)||Wr(e)||function(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function Wr(e,t){if(e){if(typeof e=="string")return kt(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?kt(e,t):void 0}}function kt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var an,on,cn,sn,ln,un,fn,dn,pn,mn,hn,gn,vn,bn,yn,xn,wn,kn,$n,Sn,In,On,En,Nn,Dn,Cn,Pn;O.div(an||(an=E([`
  --primary: #ff8c00;
  --primary-light: #ffb152;
  --primary-dark: #c86e00;
  --primary-text: #fff;

  --text: #404040;
  --border: #dadada;
  --shadow: 0 4px 20px 4px rgba(0, 0, 0, 0.1);

  --scrollbar: var(--primary-light);

  --tabs-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);

  --tab-bg: #fff;
  --tab-text: #606060;
  --tab-text-active: var(--primary);
  --tab-shadow-active: var(--primary);

  --content-bg: #f9f9f9;

  --code-var: #ff8c00;
  --code-func: #249ec6;
  --code-string: #00a153;
  --code-bool: #ff62d3;
  --code-number: #7a70f3;
  --code-date: #333;
  --code-regexp: #95b70e;

  @media (prefers-color-scheme: dark) {
    --text: #ddd;
    --border: #111;
    --shadow: 0 4px 20px 4px rgba(0, 0, 0, 0.1);

    --scrollbar: var(--primary);

    --tabs-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    --tab-bg: #444;
    --tab-text: #ddd;
    --tab-text-active: var(--primary);
    --tab-shadow-active: var(--primary);

    --content-bg: #333;

    --code-var: #ff8c00;
    --code-func: #a5d4e2;
    --code-string: #2cb472;
    --code-bool: #ff62d3;
    --code-number: #9990ff;
    --code-date: #fff;
    --code-regexp: #e5ff7e;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar);
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar:horizontal {
    height: 6px;
  }

  position: fixed;
  top: 64px;
  right: 64px;
  bottom: 64px;
  z-index: 1000;

  display: flex;
  flex-direction: row;
  width: 736px;
  min-width: 400px;
  max-width: 90%;

  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'PT Sans', Helvetica, Arial, sans-serif;
  line-height: 1.5;

  background-color: var(--bg);
  border-radius: 8px;
  box-shadow: var(--shadow);

  user-select: none;

  color-scheme: light dark;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;

  @media screen and (max-width: 700px) {
    max-width: 480px;
  }
`])));O.div(on||(on=E([`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 8px;
  margin-top: 48px;
  margin-bottom: 48px;
  margin-left: -10px;

  color: var(--primary);
  font-size: 14px;
  font-family: monospace;
  line-height: 6px;
  word-break: break-all;

  background-color: var(--bg);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  cursor: col-resize;

  &:hover,
  &[data-active='true'] {
    color: var(--bg);

    background-color: var(--primary);
  }
`])));O.section(cn||(cn=E([`
  position: relative;

  display: flex;
  flex-flow: column;
  width: 100%;

  border-radius: inherit;
`])));O.div(sn||(sn=E([`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;

  display: flex;

  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  background-color: var(--tab-bg);
  border-bottom: 1px solid var(--border);
  border-radius: inherit;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: var(--tabs-shadow);
`])));O.div(ln||(ln=E([`
  padding: 8px 16px;

  color: var(--tab-text);

  border-radius: inherit;
  border-top-right-radius: 0;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 -2px 0 0 var(--tab-shadow-active);
  }

  &:not(:first-child) {
    border-top-left-radius: 0;
  }

  &[data-active='true'] {
    color: var(--tab-text-active);

    box-shadow: inset 0 -2px 0 0 var(--tab-shadow-active);
  }
`])));O.div(un||(un=E([`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;

  background-color: var(--content-bg);
`])));O.ul(fn||(fn=E([`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 0;
  padding: 0 0;
  overflow-x: auto;

  list-style-type: none;
`])));O.li(dn||(dn=E([`
  display: flex;
  margin: 0 0;
  padding: 6px 10px;

  font-size: 12px;
  line-height: 1.3;
`])));O.pre(pn||(pn=E([`
  display: flex;
  margin: 0 0;

  color: var(--code-var);
  font-family: 'JetBrains Mono', hasklig, monofur, monospace;
`])));O.pre(mn||(mn=E([`
  margin: 0 0;

  color: var(--code-func);
  font-family: 'JetBrains Mono', hasklig, monofur, monospace;
`])));O.button(hn||(hn=E([`
  margin: 0;
  margin-left: 1rem;
  padding: 0.2rem 0.4rem;

  color: var(--primary-text);
  font-family: 'JetBrains Mono', hasklig, monofur, monospace;

  background-color: var(--primary);
  border: var(--primary);
  border-radius: 4px;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 1px var(--primary-dark), 0 0 3px 0 var(--primary-dark);
  }

  &:hover {
    background-color: var(--primary-dark);
  }
`])));O.span(gn||(gn=E([`
  display: inline-block;

  [data-opened='true'] > & {
    display: block;
    padding-left: 8px;
  }

  &[data-hidden='folded'] {
    display: none;

    [data-opened='true'] > & {
      display: block;
    }
  }

  &[data-hidden='expanded'] {
    display: inline-block;

    [data-opened='true'] > & {
      display: none;
    }
  }

  &:not(:last-child)::after {
    content: ', ';
  }
`])));O.span(vn||(vn=E([`
  color: var(--code-bool);
  font-style: italic;
`])));O.span(bn||(bn=E([`
  color: var(--code-number);
`])));O.span(yn||(yn=E([`
  color: var(--code-string);
`])));O.span(xn||(xn=E([`
  color: var(--code-number);
  font-weight: bold;
`])));O.span(wn||(wn=E([`
  color: var(--code-date);
`])));O.span(kn||(kn=E([`
  /* nothing here */
`])));O.span($n||($n=E([`
  color: var(--code-regexp);
`])));O.div(Sn||(Sn=E([`
  display: flex;
  * + * {
    margin-left: 0.5rem;
  }
`])));O.div(In||(In=E([`
  display: flex;
  flex-shrink: 0;
  padding: 1rem;
`])));O.input(On||(On=E([`
  /* nothing here */
`])));O.label(En||(En=E([`
  display: flex;
  flex-shrink: 0;
  padding: 0 0.5rem;
`])));O.input(Nn||(Nn=E([`
  display: flex;
  flex-shrink: 0;
  margin: 0 0.5rem;
  padding: 0 0.5rem;

  border: 1px solid var(--border);
  border-radius: 0.2rem;

  &:focus {
    border-color: var(--primary);
    outline: 0;
    box-shadow: 0 0 0 1px var(--primary);
  }
`])));O.div(Dn||(Dn=E([`
  display: flex;
  flex-direction: column;
`])));O.select(Cn||(Cn=E([""])));var Kr=O.input(Pn||(Pn=E([`
  display: flex;
  flex-shrink: 0;
  padding: 0 0.5rem;
  border: 1px solid var(--border);
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 2rem;

  &:focus {
    border-color: var(--primary);
    outline: 0;
    box-shadow: 0 0 0 2px var(--primary);
  }
`]))),ar=Math.pow(983020,2).toString(36);function or(e,t){var n;return(n=localStorage.getItem("".concat(ar,"-").concat(e)))!==null&&n!==void 0?n:t}function Ye(e,t){return localStorage.setItem("".concat(ar,"-").concat(e),t),t}function Yr(e,t){var n=M({loc:{file:"/src/setting.ts",line:11,column:17},name:"save",sid:"wnm0lw"});return n.watch(function(r){return Ye(e,r)}),{read:function(){return or(e,t)},write:function(r){return Ye(e,r)},save:n}}function Zr(e,t){var n=M({loc:{file:"/src/setting.ts",line:20,column:17},name:"save",sid:"-o65dje"});return n.watch(function(r){return Ye(e,JSON.stringify(r))}),{read:function(){return JSON.parse(or(e,JSON.stringify(t)))},write:function(r){return Ye(e,JSON.stringify(r)),r},save:n}}Zr("filter-kinds",["event","store"]);Yr("filter-text","");var An,Tn;O.div(An||(An=E([`
  padding: 6px;

  `,` {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }
`])),Kr);O.div(Tn||(Tn=E([`
  display: flex;
  flex-flow: row nowrap;

  :nth-child(2),
  :nth-child(3),
  :nth-child(4),
  :nth-child(5) {
    opacity: 0.8;
  }

  > :nth-child(n + 6) {
    opacity: 0.5;
  }

  > :not(:first-child) {
    margin-left: 0.5rem;
  }
`])));var jn,qn,Mn,_n,zn,Rn;O.h4(jn||(jn=E([`
  margin-top: 0;
`])));O.div(qn||(qn=E([`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 0;
  padding: 0 0;
  overflow-x: auto;
  align-items: stretch;

  list-style-type: none;

  :nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.1);
  }
`])));O.button(Mn||(Mn=E([`
  color: var(--text);
  font-family: 'JetBrains Mono', hasklig, monofur, monospace;
  font-size: 14px;
  text-align: left;

  border: var(--primary);
  padding: 0.2rem 0.4rem;

  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark);
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--primary-dark);
  }
`])));O.div(_n||(_n=E([`
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0.5rem;
`])));O.div(zn||(zn=E([`
  font-size: 0.8rem;
  margin-top: 1rem;
  margin-left: 0.5rem;
`])));O.div(Rn||(Rn=E([`
  display: flex;
  font-family: 'JetBrains Mono', hasklig, monofur, monospace;
  margin: 0 0.5rem;
  flex-shrink: 0;

  .event {
    color: var(--code-var);
  }

  .store {
    color: var(--code-string);
  }

  .effect {
    color: var(--code-number);
  }
`])));var Hr=re(!1,{loc:{file:"/src/view.ts",line:14,column:19},name:"$isVisible",sid:"m45rq1"}),Fn=M({loc:{file:"/src/view.ts",line:15,column:22},name:"togglePressed",sid:"-49o1h2"}),Qr=M({loc:{file:"/src/view.ts",line:16,column:21},name:"clearPressed",sid:"m6ugh"}),Xr=M({loc:{file:"/src/view.ts",line:17,column:22},name:"showInspector",sid:"-vcvppo"});(typeof document=="undefined"?"undefined":wt(document))==="object"&&document.addEventListener("keypress",function(e){e.ctrlKey&&(e.key!=="l"&&e.keyCode!==12||Qr(),e.key!=="b"&&e.keyCode!==2||Fn())}),Hr.on(Fn,function(e){return!e}).on(Xr,function(){return!0});var pt=re({},{and:{serialize:"ignore"},loc:{file:"/src/index.ts",line:5,column:15},name:"$files",sid:"-b5fubx"}),$t=M({loc:{file:"/src/index.ts",line:6,column:17},name:"storeAdd",sid:"-w7nr43"}),Dt=M({loc:{file:"/src/index.ts",line:7,column:21},name:"storeUpdated",sid:"w3u5z1"}),ea=re({},{and:{serialize:"ignore"},loc:{file:"/src/index.ts",line:8,column:16},name:"$stores",sid:"ioizqq"}),St=M({loc:{file:"/src/index.ts",line:9,column:17},name:"eventAdd",sid:"-o9yfun"}),Ct=M({loc:{file:"/src/index.ts",line:10,column:23},name:"eventTriggered",sid:"-3vh36s"}),ta=re({},{and:{serialize:"ignore"},loc:{file:"/src/index.ts",line:11,column:16},name:"$events",sid:"-b7nvrd"}),It=M({loc:{file:"/src/index.ts",line:12,column:18},name:"effectAdd",sid:"fekv6p"}),ir=M({loc:{file:"/src/index.ts",line:13,column:24},name:"effectTriggered",sid:"-w5t4dt"}),na=re({},{and:{serialize:"ignore"},loc:{file:"/src/index.ts",line:14,column:17},name:"$effects",sid:"bxdte"}),ra=re([],{and:{serialize:"ignore"},loc:{file:"/src/index.ts",line:15,column:14},name:"$logs",sid:"e84fof"}),cr=M({loc:{file:"/src/index.ts",line:16,column:25},name:"traceStoreChange",sid:"-sfjmqj"}),sr=M({loc:{file:"/src/index.ts",line:17,column:26},name:"traceEventTrigger",sid:"sv4vkc"}),lr=M({loc:{file:"/src/index.ts",line:18,column:23},name:"traceEffectRun",sid:"-6m76ro"}),Ln=mt([cr,sr,lr],{loc:{file:"/src/index.ts",line:19,column:17},name:"traceAdd",sid:"-l0l835"}),ur=M({loc:{file:"/src/index.ts",line:20,column:22},name:"traceFinished",sid:"-g0tcos"}),aa=re([],{loc:{file:"/src/index.ts",line:21,column:16},name:"$traces",sid:"-za84d"}),Ze=re({time:0,traces:[]},{loc:{file:"/src/index.ts",line:22,column:22},name:"$currentTrace",sid:"-4lffg7"});Ze.on(Ln,function(e,t){var n=e.time,r=e.traces;return{time:n||Date.now(),traces:[].concat(ue(r),[t])}}),Ir({and:[{source:Ze,clock:Ln,filter:function(e){return e.traces.length===1}}],or:{loc:{file:"/src/index.ts",line:27,column:0},sid:"-b1ex4a"}}).watch(function(){return queueMicrotask(ur)});var Bn=ht({and:[{source:Ze,clock:ur}],or:{loc:{file:"/src/index.ts",line:32,column:18},name:"moveTrace",sid:"-dwe01t"}});aa.on(Bn,function(e,t){return[].concat(ue(e),[t])}),Ze.reset(Bn),ea.on($t,function(e,t){return P(P({},e),{},Z({},t.name,{value:t.store.getState(),mapped:t.mapped}))}).on(Dt,function(e,t){var n=t.name,r=t.value;return e[n]=P(P({},e[n]),{},{value:r}),P({},e)}),pt.on($t,function(e,t){var n=t.name,r=t.file;if(r){if(e[r]){var o=e[r];return P(P({},e),{},Z({},r,[].concat(ue(o),[{kind:"store",name:n}])))}return P(P({},e),{},Z({},r,[{kind:"store",name:n}]))}return e}),ta.on(St,function(e,t){return P(P({},e),{},Z({},t.name,{mapped:t.mapped,history:[]}))}).on(Ct,function(e,t){var n=t.name,r=t.params,o=r===void 0?void 0:JSON.parse(JSON.stringify(r));return e[n]=P(P({},e[n]),{},{history:[o].concat(ue(e[n].history))}),P({},e)}),pt.on(St,function(e,t){var n=t.name,r=t.file;if(r){if(e[r]){var o=e[r];return P(P({},e),{},Z({},r,[].concat(ue(o),[{kind:"event",name:n}])))}return P(P({},e),{},Z({},r,[{kind:"event",name:n}]))}return e}),na.on(It,function(e,t){return P(P({},e),{},Z({},t.sid,{name:t.name,effect:t.effect,inFlight:t.effect.inFlight.getState()}))}).on(ir,function(e,t){var n=t.sid,r=e[n];return e[n]=P(P({},r),{},{inFlight:r.effect.inFlight.getState()}),P({},e)}),pt.on(It,function(e,t){var n=t.name,r=t.file;if(r){if(e[r]){var o=e[r];return P(P({},e),{},Z({},r,[].concat(ue(o),[{kind:"event",name:n}])))}return P(P({},e),{},Z({},r,[{kind:"event",name:n}]))}return e});var oa=1e3,Ve=Or({handler:function(e){var t=e.name,n=e.kind,r=e.payload;return{id:(++oa).toString(36),kind:n,name:t,payload:r,datetime:new Date}}},{loc:{file:"/src/index.ts",line:118,column:23},name:"createRecordFx",sid:"-epqwjl"});function He(e){return e.graphite}function ia(e){var t=we(e);He(e).seq.unshift(de.compute({fn:function(n,r,o){return lr({type:"effect",name:t,argument:n==null?void 0:n.param}),n}})),Qe(e.doneData,"".concat(t,".doneData")),Qe(e.failData,"".concat(t,".failData"))}function Qe(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:we(e);He(e).seq.unshift(de.compute({fn:function(n,r,o){return sr({type:"event",name:t,argument:n}),n}}))}function ca(e){var t=we(e);Qe(e.updates,"".concat(t,".updates")),He(e).seq.unshift(de.compute({fn:function(n,r){var o;return r.trace={before:(o=r.state.current,JSON.parse(JSON.stringify(o)))},n}})),He(e).seq.push(de.compute({fn:function(n,r,o){return cr({type:"store",name:t,before:r.trace.before,current:n}),n}}))}function Pt(e){var t,n;return(t=e.defaultConfig)===null||t===void 0||(n=t.loc)===null||n===void 0?void 0:n.file}function Un(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.name||we(e);$t({store:e,name:n,mapped:t.mapped||!1,file:Pt(e)}),ca(e),ye({and:{from:e.updates.map(function(r){return{name:n,value:r}}),to:Dt},or:{loc:{file:"/src/index.ts",line:214,column:4},sid:"a81on6"}})}function sa(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.name||we(e);St({event:e,name:n,mapped:t.mapped||!1,file:Pt(e)}),Qe(e),ye({and:{from:e.map(function(r){return{name:n,params:r}}),to:Ct},or:{loc:{file:"/src/index.ts",line:228,column:4},sid:"arahet"}})}function la(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=we(e),o=n.sid||e.sid||r;It({effect:e,name:r,sid:o,attached:(t=n.attached)!==null&&t!==void 0&&t,file:Pt(e)}),ia(e),ye({and:{from:[e,e.finally],to:ir.prepend(function(){return{sid:o}})},or:{loc:{file:"/src/index.ts",line:247,column:4},sid:"botxlu"}});var i=e.map(function(b){return{kind:"effect",name:r,payload:b}}),d=e.done.map(function(b){return{kind:"effect",name:r+".done",payload:b}}),l=e.fail.map(function(b){return{kind:"effect",name:r+".fail",payload:b}});ye({and:{from:[i,d,l],to:Ve},or:{loc:{file:"/src/index.ts",line:266,column:4},sid:"cmddsv"}})}function we(e){return e.compositeName.path.join("/")}ye({and:{from:Ct,to:Ve.prepend(function(e){return{kind:"event",name:e.name,payload:e.params}})},or:{loc:{file:"/src/index.ts",line:129,column:0},sid:"-3wk0bb"}}),ye({and:{from:Dt,to:Ve.prepend(function(e){return{kind:"store",name:e.name,payload:e.value}})},or:{loc:{file:"/src/index.ts",line:137,column:0},sid:"-3glz3u"}}),ra.on(Ve.doneData,function(e,t){return[t].concat(ue(e))});var ua=fa;function fa(e,t,n){var r=null,o=null,i=function(){r&&(clearTimeout(r),o=null,r=null)},d=function(){var b=o;i(),b&&b()},l=function(){if(!t)return e.apply(this,arguments);var b=this,s=arguments,g=n&&!r;if(i(),o=function(){e.apply(b,s)},r=setTimeout(function(){if(r=null,!g){var y=o;return o=null,y()}},t),g)return o()};return l.cancel=i,l.flush=d,l}/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var da=function(t){return t!=null&&typeof t=="object"&&Array.isArray(t)===!1};/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var pa=da;function Vn(e){return pa(e)===!0&&Object.prototype.toString.call(e)==="[object Object]"}var ma=function(t){var n,r;return!(Vn(t)===!1||(n=t.constructor,typeof n!="function")||(r=n.prototype,Vn(r)===!1)||r.hasOwnProperty("isPrototypeOf")===!1)};/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) Jon Schlinkert (https://github.com/jonschlinkert).
 * Released under the MIT License.
 */const Jn=ma,Gn=e=>typeof e=="object"&&e!==null||typeof e=="function",ha=e=>e==="__proto__"||e==="constructor"||e==="prototype",At=e=>{if(typeof e!="string"&&typeof e!="number"&&(e=String(e)),ha(e))throw new Error(`Cannot set unsafe key: "${e}"`)},ga=e=>Array.isArray(e)?e.flat().map(String).join(","):e,va=(e,t)=>{if(typeof e!="string"||!t)return e;let n=e+";";return t.arrays!==void 0&&(n+=`arrays=${t.arrays};`),t.separator!==void 0&&(n+=`separator=${t.separator};`),t.split!==void 0&&(n+=`split=${t.split};`),t.merge!==void 0&&(n+=`merge=${t.merge};`),t.preservePaths!==void 0&&(n+=`preservePaths=${t.preservePaths};`),n},ba=(e,t,n)=>{const r=ga(t?va(e,t):e);At(r);const o=xe.cache.get(r)||n();return xe.cache.set(r,o),o},ya=e=>{if(e.trim()!==""){const t=Number(e);return{is:Number.isInteger(t),number:t}}return{is:!1}},xa=(e,t)=>{const n=t||{},r=n.separator||".",o=r==="/"?!1:n.preservePaths;if(typeof e=="symbol")return[e];if(typeof n.split=="function")return n.split(e);const i=Array.isArray(e)?e:e.split(r);if(typeof e=="string"&&o!==!1&&/\//.test(e))return[e];for(let d=0;d<i.length&&typeof i[d]=="string";d++){const{is:l,number:b}=ya(i[d]);if(l){i[d]=b;continue}for(;i[d]&&d<i.length&&i[d].endsWith("\\")&&typeof i[d+1]=="string";)i[d]=i[d].slice(0,-1)+r+i.splice(d+1,1)}return i},wa=(e,t)=>ba(e,t,()=>xa(e,t)),ka=(e,t,n,r)=>{if(At(t),n===void 0)delete e[t];else if(r&&r.merge){const o=r.merge===!0?Object.assign:r.merge;o&&Jn(e[t])&&Jn(n)?e[t]=o(e[t],n):e[t]=n}else e[t]=n;return e},xe=(e,t,n,r)=>{if(!t||!Gn(e))return e;const o=wa(t,r),i=o.length,d=e;for(let l=0;l<i;l++){const b=o[l],s=o[l+1];if(At(b),s===void 0){ka(e,b,n,r);break}if(typeof s=="number"&&!Array.isArray(e[b])){e[b]=[],e=e[b];continue}Gn(e[b])||(e[b]={}),e=e[b]}return d};xe.cache=new Map;xe.clear=()=>{xe.cache=new Map};var $a=xe,Te="/src/lib.ts";const Sa="@effector-logger";function fe(e){return e.path.filter(t=>t!==Sa).join("/")}function be(e){var t,n,r;return(r=(n=(t=e.defaultConfig)===null||t===void 0?void 0:t.loc)===null||n===void 0?void 0:n.file)!==null&&r!==void 0?r:" "}function Ia(e,t,n){Q.store(e,{loc:{file:Te,line:11,column:8},sid:"-6vukfe"})&&n(e.getState()),(Q.store(e,{loc:{file:Te,line:14,column:22},name:"watchUnit",sid:"-tu8c8a"})?e.updates:e).watch(n)}function Oa(e,t,n){Q.store(e,{loc:{file:Te,line:18,column:8},sid:"-6s009v"})&&n(t.getState(e));const r=Wn({node:[de.run({fn:n})]}),i=(Q.store(e,{loc:{file:Te,line:24,column:22},name:"watchUnit",sid:"-f5u209"})?e.updates:e).graphite.id;(t.additionalLinks[i]=t.additionalLinks[i]||[]).push(r)}function Ce(e,t,n){Q.domain(t,{loc:{file:Te,line:31,column:8},sid:"-5xrbn0"})?Ia(e,t,n):Oa(e,t,n)}const Ea="",fr=[],dr=[],pr=[],A={block:"padding-left: 4px; padding-right: 4px; font-weight: normal;",chunk:"padding-left: 4px; padding-right: 4px; font-weight: normal;",effector:'line-height:1.5; color: #000; font-family: "Apple Emoji Font"; font-weight: normal !important;',new:"background-color: #29b6f6; color: #000",store:"background-color: #7e57c2; color: #fff",event:"background-color: #9ccc65; color: #000",effect:"background-color: #26a69a; color: #000",emoji:"",file:"color: #9e9e9e; padding-left: 20px;",reset:"color: currentColor; background-color: transparent;"},Na=[["\u2604\uFE0F","%s",A.effector],["effector","%s","font-family: Menlo, monospace;"]],Da=(e,t,n)=>e===t-1?A.reset:n;function H(e,t,n=void 0){const r=[],o=[];e.unshift(...Na),e.forEach(([d,l,b],s)=>{r.push(`%c${l}%c`),o.push(`${A.block} ${b}`,d,Da(s,e.length,`${A.block} ${b}`))}),t.forEach(([d,l,b])=>{r.push(`%c${l}`),o.push(`${A.chunk} ${b}`,d)});const i=[r.join(Ea),...o];n==="open"?console.group(...i):n==="collapsed"?console.groupCollapsed(...i):console.log(...i)}const Fe=["new","%s",A.new],Tt=e=>e.split("/").pop()||e,mr=e=>[Tt(e),"%s",A.store],hr=e=>[Tt(e),"%s",A.event],et=e=>[Tt(e),"%s",A.effect],jt=ua(()=>{const e=fr.splice(0),t=dr.splice(0),n=pr.splice(0);e.length+t.length+n.length>0&&(H([Fe],[["Initialized","%s",""],[`events(${t.length})`,"%s",""],[`effects(${n.length})`,"%s",""],[`stores(${e.length})`,"%s",""]],"collapsed"),e.length&&e.forEach(r=>{const o=fe(r.compositeName),i=be(r);H([Fe,mr(o)],[["-> ","%s",""],[r.getState(),"%o",""],[i,"%s",A.file],[o,"%s",""]])}),t.length>0&&t.forEach(r=>{const o=fe(r.compositeName),i=be(r);H([Fe,hr(o)],[[i,"%s",A.file],[o,"%s",""]])}),n.length>0&&n.forEach(r=>{const o=fe(r.compositeName),i=be(r);H([Fe,et(o)],[[i,"%s",A.file],[o,"%s",""]])}),console.groupEnd())},5);function Ca(e){fr.push(e),jt()}function Pa(e){dr.push(e),jt()}function Aa(e){pr.push(e),jt()}function Ta(e,t,n){H([mr(e)],[["-> ","%s",""],[n,"%o",""],[t,"%s",A.file],[e,"%s",A.file]])}function ja(e,t,n){H([hr(e)],[[n,"%o","padding-left: 4px;"],[t,"%s",A.file],[e,"%s",A.file]])}function qa(e,t,n){H([et(e)],[[n,"%o","padding-left: 4px;"],[t,"%s",A.file],[e,"%s",A.file]])}function Ma(e,t,n,r){H([et(e)],[["done \u2705","%s",A.emoji],[n,"(%o)","padding-left: 4px;"],["-> ","%s",""],[r,"%o","padding: 0;"],[t,"%s",A.file],[e,"%s",A.file]])}function _a(e,t,n,r){const o=r instanceof Error;H([et(e)],[["fail \u274C","%s",A.emoji],[n,"(%o)","padding-left: 4px;"],["-> ","%s",""],o?[String(r),"%s",""]:[r,"%o","padding: 0;"],[t,"%s",A.file],[e,"%s",A.file]],o?"collapsed":void 0),o&&H([],[[" ","%s",""],[r,"%o","padding-left: 20px;"]]),console.groupEnd()}const X=typeof window!="undefined"&&window.__REDUX_DEVTOOLS_EXTENSION__;function za(){return typeof document=="object"?`\u2604\uFE0F ${document.title}`:"\u2604\uFE0F no title instance"}const je={instanceId:za()},ke={};function qt(e,t){$a(ke,e.replace(/\//g,"."),t)}function Ra(e,t){X&&X.send({type:`${e} (event)`,payload:t},ke,je)}function Fa(e){const t=fe(e.compositeName);qt(t,e.defaultState)}function La(e,t){qt(e,t),X&&X.send({type:`${e} (store updated)`,value:t},ke,je)}function tt(e,t){qt(e,{inFlight:t.inFlight.getState(),pending:t.pending.getState()})}function Ba(e,t){tt(e,t)}function Ua(e,t,n){tt(e,t),X&&X.send({type:`${e} (effect called)`,params:n},ke,je)}function Va(e,t,n,r){tt(e,t),X&&X.send({type:`${e}.done (effect finished)`,params:n,result:r},ke,je)}function Ja(e,t,n,r){tt(e,t),X&&X.send({type:`${e}.fail (effect finished)`,params:n,error:r},ke,je)}var Ga="/src/attach.ts";const Wa={reduxDevtools:"enabled",console:"enabled",inspector:"enabled"},Ka=()=>({log:"enabled"});function Ot(e,t){const n=e;return n["effector-logger"]||(n["effector-logger"]=Ka()),t&&(n["effector-logger"]=Object.assign(Object.assign({},n["effector-logger"]),t)),n}function Ha(e,t){if(Array.isArray(e)){e.forEach(n=>Ot(n,t));return}Ot(e,t)}function Pe(e){return Ot(e)["effector-logger"].log==="enabled"}function Qa(e,t={}){const n=Object.assign(Object.assign({},Wa),t),r=n.console==="enabled",o=n.reduxDevtools==="enabled",i=n.inspector==="enabled";function d(s){const g=fe(s.compositeName),y=be(s);r&&Pa(s),i&&sa(s),Ce(s,e,w=>{Pe(s)&&(r&&ja(g,y,w),o&&Ra(g,w))})}function l(s){const g=fe(s.compositeName),y=be(s);r&&Ca(s),o&&Fa(s),i&&Un(s);const w=s.map.bind(s);s.map=(f,m)=>{const h=w(f,m);return h.compositeName.path=s.compositeName.path.slice(0,-1),h.compositeName.path.push(s.compositeName.path.slice(-1)+" -> *"),i&&Un(h,{mapped:!0}),h},Ce(s,e,f=>{Pe(s)&&(r&&Ta(g,y,f),o&&La(g,f))})}function b(s){const g=fe(s.compositeName),y=be(s);r&&Aa(s),o&&Ba(g,s),i&&la(s),Ce(s,e,w=>{Pe(s)&&(r&&qa(g,y,w),o&&Ua(g,s,w))}),Ce(s.done,e,({params:w,result:f})=>{Pe(s)&&(r&&Ma(g,y,w,f),o&&Va(g,s,w,f))}),Ce(s.fail,e,({params:w,error:f})=>{Pe(s)&&(r&&_a(g,y,w,f),o&&Ja(g,s,w,f))})}if(Q.domain(e,{loc:{file:Ga,line:120,column:8},sid:"-w5ukap"}))e.onCreateEvent(d),e.onCreateStore(l),e.onCreateEffect(b);else{const s=e.cloneOf;if(s===void 0)throw new Error("Scope should be created from domain");for(const g of s.history.events)d(g);for(const g of s.history.effects)b(g);for(const g of s.history.stores)l(g)}}export{Sa as LOGGER_DOMAIN_NAME,Qa as attachLogger,Ha as configure};
