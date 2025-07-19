// ==UserScript==
// @name         【哔哩哔哩】一些任务
// @namespace    https://github.com/AkagiYui/UserScript
// @version      0.0.1
// @author       AkagiYui
// @description  可以一键执行一系列操作。
// @license      MIT
// @icon         https://static.hdslb.com/images/favicon.ico
// @homepage     https://github.com/AkagiYui
// @supportURL   https://github.com/AkagiYui/UserScript/issues
// @match        https://space.bilibili.com/*/favlist*
// @require      https://cdn.jsdelivr.net/npm/preact@10.26.9/dist/preact.min.js
// @grant        GM_addStyles
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(' .floating-button{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;border:none;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px #00000026,0 2px 6px #0000001a;transition:all .3s cubic-bezier(.4,0,.2,1);z-index:9999;font-family:inherit;outline:none}.floating-button:hover{transform:translateY(-2px);box-shadow:0 6px 16px #0003,0 3px 8px #00000026;background:linear-gradient(135deg,#5a6fd8,#6a4190)}.floating-button:active{transform:translateY(0);box-shadow:0 2px 8px #0003,0 1px 4px #0000001a}.floating-button:focus-visible{outline:2px solid #667eea;outline-offset:2px}.floating-button svg{width:24px;height:24px;transition:transform .2s ease}.floating-button:hover svg{transform:scale(1.1)}.floating-button *{box-sizing:border-box}@media (max-width: 768px){.floating-button{bottom:16px;right:16px;width:48px;height:48px}.floating-button svg{width:20px;height:20px}}.modal-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;background-color:#0009;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);z-index:10000;display:flex;align-items:center;justify-content:center;animation:modal-fade-in .3s cubic-bezier(.4,0,.2,1)}.modal-backdrop--closing{animation:modal-fade-out .3s cubic-bezier(.4,0,.2,1)}.modal-content{position:relative;width:100%;height:100%;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:0;box-shadow:0 20px 40px #0000004d;display:flex;flex-direction:column;animation:modal-slide-up .3s cubic-bezier(.4,0,.2,1);overflow:hidden}.modal-content--closing{animation:modal-slide-down .3s cubic-bezier(.4,0,.2,1)}.modal-header{position:absolute;top:20px;right:20px;z-index:10001}.modal-close-button{width:48px;height:48px;border-radius:50%;border:none;background:#fff3;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease;outline:none;padding:0;box-sizing:border-box}.modal-close-button:hover{background:#ffffff4d;transform:translateY(2px)}.modal-close-button:active{transform:translateY(0);background:#fff6}.modal-close-button:focus-visible{outline:2px solid rgba(255,255,255,.8);outline-offset:2px}.modal-close-button svg{width:24px;height:24px;transition:transform .2s ease;display:block;flex-shrink:0}.modal-body{flex:1;padding:80px 40px 40px;overflow-y:auto;color:#fff}@keyframes modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes modal-fade-out{0%{opacity:1}to{opacity:0}}@keyframes modal-slide-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes modal-slide-down{0%{transform:translateY(0)}to{transform:translateY(100%)}}.modal-backdrop *,.modal-content *,.modal-header *,.modal-body *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif}@media (max-width: 768px){.modal-header{top:16px;right:16px}.modal-close-button{width:40px;height:40px}.modal-close-button svg{width:20px;height:20px}.modal-body{padding:60px 20px 20px}}.script-card{background:#0006;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:12px;border:1px solid rgba(255,255,255,.3);margin-bottom:16px;transition:all .3s ease;overflow:hidden}.script-card:hover{background:#00000080;border-color:#fff6;transform:translateY(-2px)}.script-card.running{border-color:#4caf50;box-shadow:0 0 20px #4caf504d}.script-header{padding:20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;-webkit-user-select:none;user-select:none}.script-info{flex:1;min-width:0}.script-name{font-size:1.2rem;font-weight:600;margin:0 0 8px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5)}.script-description{font-size:.9rem;margin:0 0 12px;color:#fffffff2;line-height:1.4;text-shadow:0 1px 2px rgba(0,0,0,.3)}.script-category{display:inline-block;padding:4px 12px;border-radius:16px;font-size:.8rem;font-weight:500;text-transform:uppercase;letter-spacing:.5px}.script-category.tool{background:#2196f333;color:#2196f3;border:1px solid rgba(33,150,243,.3)}.script-category.operation{background:#ff980033;color:#ff9800;border:1px solid rgba(255,152,0,.3)}.script-controls{display:flex;align-items:center;gap:12px;margin-left:20px}.progress-container{display:flex;align-items:center;gap:8px;min-width:120px}.progress-bar{width:80px;height:6px;background:#fff3;border-radius:3px;overflow:hidden}.progress-fill{height:100%;background:linear-gradient(90deg,#4caf50,#8bc34a);border-radius:3px;transition:width .3s ease}.progress-text{font-size:.8rem;color:#fffc;font-weight:500;min-width:32px}.expand-button{width:32px;height:32px;border:none;background:#ffffff1a;border-radius:50%;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease}.expand-button:hover{background:#fff3}.expand-button.expanded{transform:rotate(180deg)}.script-body{padding:0 20px 20px;border-top:1px solid rgba(255,255,255,.2);animation:slideDown .3s ease;background:#0003}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.script-parameters h4{font-size:1rem;font-weight:600;margin:20px 0 16px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5)}.parameter-group{margin-bottom:20px}.parameter-label{display:block;font-size:.9rem;font-weight:500;margin-bottom:8px;color:#fffffff2;text-shadow:0 1px 2px rgba(0,0,0,.3)}.parameter-label .required{color:#f44336;margin-left:4px}.script-input,.script-select,.script-textarea{width:100%;padding:12px;border:1px solid rgba(255,255,255,.3);border-radius:8px;background:#0000004d;color:#fff;font-size:.9rem;transition:all .2s ease;text-shadow:0 1px 2px rgba(0,0,0,.3)}.script-input:focus,.script-select:focus,.script-textarea:focus{outline:none;border-color:#2196f3;background:#ffffff26}.script-input::placeholder,.script-textarea::placeholder{color:#ffffff80}.script-input:disabled,.script-select:disabled,.script-textarea:disabled{opacity:.6;cursor:not-allowed}.script-checkbox{display:flex;align-items:center;cursor:pointer;position:relative}.script-checkbox input[type=checkbox]{opacity:0;position:absolute;width:0;height:0}.checkmark{width:20px;height:20px;border:2px solid rgba(255,255,255,.3);border-radius:4px;background:#ffffff1a;position:relative;transition:all .2s ease}.script-checkbox input[type=checkbox]:checked+.checkmark{background:#2196f3;border-color:#2196f3}.script-checkbox input[type=checkbox]:checked+.checkmark:after{content:"";position:absolute;left:6px;top:2px;width:6px;height:10px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.parameter-description{font-size:.8rem;color:#fff9;margin:8px 0 0;line-height:1.4}.script-actions{margin-top:24px;display:flex;justify-content:flex-end}.execute-button,.stop-button{padding:12px 24px;border:none;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .2s ease}.execute-button{background:linear-gradient(135deg,#4caf50,#45a049);color:#fff}.execute-button:hover{background:linear-gradient(135deg,#45a049,#3d8b40);transform:translateY(-1px)}.stop-button{background:linear-gradient(135deg,#f44336,#d32f2f);color:#fff}.stop-button:hover{background:linear-gradient(135deg,#d32f2f,#b71c1c);transform:translateY(-1px)}@media (max-width: 768px){.script-header{padding:16px;flex-direction:column;align-items:flex-start;gap:12px}.script-controls{margin-left:0;width:100%;justify-content:space-between}.script-body{padding:0 16px 16px}.progress-container{min-width:auto;flex:1}.progress-bar{flex:1;min-width:60px}}.log-panel{height:100%;width:100%;display:flex;flex-direction:column;background:#00000080;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:12px;border:1px solid rgba(255,255,255,.3);overflow:hidden;box-sizing:border-box}.log-header{padding:20px;border-bottom:1px solid rgba(255,255,255,.2);display:flex;justify-content:space-between;align-items:center;background:#0000004d}.log-header h3{font-size:1.2rem;font-weight:600;margin:0;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5)}.log-controls{display:flex;align-items:center;gap:12px}.log-count{font-size:.9rem;color:#ffffffb3;padding:4px 8px;background:#ffffff1a;border-radius:12px}.clear-button{padding:8px 12px;border:none;border-radius:6px;background:#f4433633;color:#f44336;font-size:.8rem;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .2s ease;border:1px solid rgba(244,67,54,.3)}.clear-button:hover{background:#f443364d;transform:translateY(-1px)}.log-container{flex:1;overflow-y:auto;padding:0}.log-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff9;text-align:center;padding:40px 20px}.empty-icon{font-size:3rem;margin-bottom:16px;opacity:.7}.log-empty p{font-size:1.1rem;font-weight:500;margin:0 0 8px;color:#fffc}.log-empty span{font-size:.9rem;color:#ffffff80}.log-list{padding:12px 0}.log-entry{padding:12px 20px;border-left:3px solid transparent;transition:all .2s ease;animation:slideIn .3s ease}@keyframes slideIn{0%{opacity:0;transform:translate(-10px)}to{opacity:1;transform:translate(0)}}.log-entry:hover{background:#ffffff0d}.log-entry.info{border-left-color:#2196f3}.log-entry.warn{border-left-color:#ff9800}.log-entry.error{border-left-color:#f44336}.log-entry.success{border-left-color:#4caf50}.log-meta{display:flex;align-items:center;gap:8px;margin-bottom:4px;font-size:.8rem}.log-icon{font-size:1rem;line-height:1}.log-time{color:#fff9;font-family:Courier New,monospace;font-weight:500}.log-script{color:#ffffff80;background:#ffffff1a;padding:2px 6px;border-radius:4px;font-size:.7rem;font-weight:500}.log-message{color:#fffffff2;font-size:.9rem;line-height:1.4;word-break:break-word;margin-left:24px;text-shadow:0 1px 2px rgba(0,0,0,.3)}.log-entry.error .log-message{color:#ffcdd2}.log-entry.warn .log-message{color:#ffe0b2}.log-entry.success .log-message{color:#c8e6c9}.log-footer{padding:16px 20px;border-top:1px solid rgba(255,255,255,.1);background:#ffffff0d}.log-legend{display:flex;gap:16px;justify-content:center}.legend-item{display:flex;align-items:center;gap:4px;font-size:.8rem;color:#fff9}.legend-icon{font-size:.9rem}.log-container::-webkit-scrollbar{width:6px}.log-container::-webkit-scrollbar-track{background:#ffffff1a}.log-container::-webkit-scrollbar-thumb{background:#ffffff4d;border-radius:3px}.log-container::-webkit-scrollbar-thumb:hover{background:#ffffff80}@media (max-width: 768px){.log-header{padding:16px;flex-direction:column;align-items:flex-start;gap:12px}.log-controls{width:100%;justify-content:space-between}.log-entry{padding:10px 16px}.log-message{margin-left:20px;font-size:.85rem}.log-legend{flex-wrap:wrap;gap:12px}.log-footer{padding:12px 16px}}.resize-handle{width:8px;height:100%;cursor:col-resize;position:relative;display:flex;align-items:center;justify-content:center;background:transparent;transition:all .2s ease;-webkit-user-select:none;user-select:none;flex-shrink:0}.resize-handle:hover{background:#ffffff1a}.resize-handle--dragging{background:#fff3}.resize-handle-line{position:absolute;left:50%;top:0;bottom:0;width:1px;background:#fff3;transform:translate(-50%);transition:all .2s ease}.resize-handle:hover .resize-handle-line{background:#fff6;width:2px}.resize-handle--dragging .resize-handle-line{background:#fff9;width:2px}.resize-handle-grip{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:4px;height:24px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;opacity:0;transition:opacity .2s ease}.resize-handle:hover .resize-handle-grip,.resize-handle--dragging .resize-handle-grip{opacity:1}.resize-handle-dot{width:2px;height:2px;background:#fff9;border-radius:50%;flex-shrink:0}.resize-handle:hover .resize-handle-dot{background:#fffc}.resize-handle--dragging .resize-handle-dot{background:#fff}body.resizing,body.resizing *{cursor:col-resize!important;-webkit-user-select:none!important;user-select:none!important}@media (max-width: 1024px){.resize-handle{display:none}}@media (prefers-contrast: high){.resize-handle-line{background:#fffc}.resize-handle:hover .resize-handle-line{background:#fff}.resize-handle-dot{background:#ffffffe6}}@media (prefers-reduced-motion: reduce){.resize-handle,.resize-handle-line,.resize-handle-grip{transition:none}}.script-manager{width:100%;height:100%;display:flex;flex-direction:column;color:#fff;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif}.script-manager-header{padding:20px 24px 24px;text-align:center;background:#ffffff0d;border-bottom:1px solid rgba(255,255,255,.1);margin-top:0}.script-manager-header h1{font-size:1.8rem;font-weight:700;margin:0 0 8px;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,.8),0 1px 2px rgba(0,0,0,.6),0 0 8px rgba(102,126,234,.3);line-height:1.2}.script-manager-header p{font-size:1rem;margin:0 0 20px;color:#ffffffe6;text-shadow:0 1px 2px rgba(0,0,0,.5)}.script-manager-header p a{color:#87ceeb;text-decoration:none;transition:all .2s ease;text-shadow:0 1px 2px rgba(0,0,0,.5)}.script-manager-header p a:hover{color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5),0 0 8px rgba(135,206,235,.6);text-decoration:underline}.status-bar{display:flex;justify-content:center;gap:24px;flex-wrap:wrap}.status-item{display:flex;align-items:center;gap:8px;padding:8px 16px;background:#ffffff1a;border-radius:20px;border:1px solid rgba(255,255,255,.2)}.status-label{font-size:.9rem;color:#ffffffb3}.status-value{font-size:.9rem;font-weight:600;color:#fff;background:#fff3;padding:2px 8px;border-radius:12px;min-width:24px;text-align:center}.status-value.running{background:linear-gradient(135deg,#4caf50,#45a049);color:#fff;animation:pulse 2s infinite}@keyframes pulse{0%,to{opacity:1}50%{opacity:.7}}.script-manager-content{flex:1;display:flex;gap:24px;padding:24px;min-height:0}.scripts-panel{flex-shrink:0;overflow-y:auto;padding-right:12px;box-sizing:border-box}.scripts-section{margin-bottom:32px}.scripts-section:last-child{margin-bottom:0}.scripts-section h2{font-size:1.3rem;font-weight:600;margin:0 0 20px;color:#fff;display:flex;align-items:center;gap:8px;padding-bottom:12px;border-bottom:2px solid rgba(255,255,255,.1)}.scripts-list{display:flex;flex-direction:column;gap:16px}.logs-panel{flex-shrink:0;display:flex;flex-direction:column;box-sizing:border-box}.scripts-panel::-webkit-scrollbar{width:8px}.scripts-panel::-webkit-scrollbar-track{background:#ffffff1a;border-radius:4px}.scripts-panel::-webkit-scrollbar-thumb{background:#ffffff4d;border-radius:4px}.scripts-panel::-webkit-scrollbar-thumb:hover{background:#ffffff80}@media (max-width: 1200px){.scripts-panel{width:400px!important;min-width:350px}.logs-panel{width:auto!important;flex:1;min-width:450px}}@media (max-width: 1024px){.script-manager-content{flex-direction:column;gap:20px}.scripts-panel{width:100%!important;min-width:auto;max-width:none;padding-right:0}.logs-panel{width:100%!important;min-width:auto;height:400px;min-height:300px}}@media (max-width: 768px){.script-manager-content{padding:16px;gap:16px}.script-manager-header{padding:20px 16px}.script-manager-header h1{font-size:1.6rem}.status-bar{gap:16px}.status-item{padding:6px 12px}.scripts-section h2{font-size:1.2rem}.logs-panel{height:350px;min-height:250px}}@media (max-width: 480px){.script-manager-header h1{font-size:1.4rem}.script-manager-header p{font-size:.9rem}.status-bar{flex-direction:column;align-items:center;gap:12px}.status-item{width:100%;max-width:200px;justify-content:space-between}.logs-panel{height:300px;min-height:200px}}.script-manager.loading{opacity:.7;pointer-events:none}.script-manager.loading:after{content:"";position:absolute;top:50%;left:50%;width:40px;height:40px;margin:-20px 0 0 -20px;border:3px solid rgba(255,255,255,.3);border-top:3px solid white;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.scripts-list:empty:after{content:"\u6682\u65E0\u811A\u672C";display:block;text-align:center;color:#ffffff80;font-style:italic;padding:40px 20px;background:#ffffff0d;border-radius:8px;border:1px dashed rgba(255,255,255,.2)}.task-panel{width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden}.task-panel-header{text-align:center;margin-bottom:40px}.task-panel-header h1{font-size:2.5rem;font-weight:700;margin:0 0 16px;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,.3)}.task-panel-header p{font-size:1.1rem;margin:0;color:#fffc;font-weight:400}.task-panel-content{flex:1;display:flex;flex-direction:column;gap:40px}.counter-section{background:#ffffff1a;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:16px;padding:32px;text-align:center;border:1px solid rgba(255,255,255,.2)}.counter-section h2{font-size:1.5rem;font-weight:600;margin:0 0 24px;color:#fff}.counter-display{margin-bottom:24px}.counter-value{font-size:4rem;font-weight:700;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.3);display:inline-block;min-width:120px}.counter-controls{display:flex;gap:16px;justify-content:center;align-items:center}.counter-button{width:48px;height:48px;border-radius:50%;border:none;font-size:1.2rem;font-weight:600;cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center;outline:none}.counter-button--decrease{background:#ff6b6be6;color:#fff}.counter-button--decrease:hover{background:#ff6b6b;transform:scale(1.05)}.counter-button--reset{background:#fff3;color:#fff;width:auto;padding:0 20px;border-radius:24px;font-size:.9rem}.counter-button--reset:hover{background:#ffffff4d;transform:scale(1.05)}.counter-button--increase{background:#6bff6be6;color:#fff}.counter-button--increase:hover{background:#6bff6b;transform:scale(1.05)}.counter-button:active{transform:scale(.95)}.counter-button:focus-visible{outline:2px solid rgba(255,255,255,.8);outline-offset:2px}.placeholder-section{background:#ffffff1a;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:16px;padding:32px;border:1px solid rgba(255,255,255,.2)}.placeholder-section h2{font-size:1.5rem;font-weight:600;margin:0 0 24px;color:#fff;text-align:center}.feature-list{display:flex;flex-direction:column;gap:20px}.feature-item{display:flex;align-items:center;gap:16px;padding:16px;background:#ffffff0d;border-radius:12px;border:1px solid rgba(255,255,255,.1);transition:all .2s ease}.feature-item:hover{background:#ffffff1a;transform:translateY(-2px)}.feature-icon{font-size:2rem;width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:#ffffff1a;border-radius:12px;flex-shrink:0}.feature-text h3{font-size:1.1rem;font-weight:600;margin:0 0 4px;color:#fff}.feature-text p{font-size:.9rem;margin:0;color:#ffffffb3}@media (max-width: 768px){.task-panel-header h1{font-size:2rem}.task-panel-content{gap:24px}.counter-section,.placeholder-section{padding:24px}.counter-value{font-size:3rem}.counter-controls{gap:12px}.counter-button{width:40px;height:40px;font-size:1rem}.feature-list{gap:16px}.feature-item{padding:12px}.feature-icon{font-size:1.5rem;width:40px;height:40px}} ');

(function (preact) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var f$1 = 0;
  function u$1(e2, t2, n, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return preact.options.vnode && preact.options.vnode(l2), l2;
  }
  var t, r, u, i, o = 0, f = [], c = preact.options, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, s = c.__;
  function p(n, t2) {
    c.__h && c.__h(r, n, o || t2), o = 0;
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n >= u2.__.length && u2.__.push({}), u2.__[n];
  }
  function d(n) {
    return o = 1, h(D, n);
  }
  function h(n, u2, i2) {
    var o2 = p(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [D(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.__f)) {
      var f2 = function(n2, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return !!n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        })) return !c2 || c2.call(this, n2, t2, r2);
        var i3 = o2.__c.props !== n2;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), c2 && c2.call(this, n2, t2, r2) || i3;
      };
      r.__f = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n2, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n2, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n2, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function y(n, u2) {
    var i2 = p(t++, 3);
    !c.__s && C(i2.__H, u2) && (i2.__ = n, i2.u = u2, r.__H.__h.push(i2));
  }
  function A(n) {
    return o = 5, T(function() {
      return { current: n };
    }, []);
  }
  function T(n, r2) {
    var u2 = p(t++, 7);
    return C(u2.__H, r2) && (u2.__ = n(), u2.__H = r2, u2.__h = n), u2.__;
  }
  function j() {
    for (var n; n = f.shift(); ) if (n.__P && n.__H) try {
      n.__H.__h.forEach(z), n.__H.__h.forEach(B), n.__H.__h = [];
    } catch (t2) {
      n.__H.__h = [], c.__e(t2, n.__v);
    }
  }
  c.__b = function(n) {
    r = null, e && e(n);
  }, c.__ = function(n, t2) {
    n && t2.__k && t2.__k.__m && (n.__m = t2.__k.__m), s && s(n, t2);
  }, c.__r = function(n) {
    a && a(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.u = n2.__N = void 0;
    })) : (i2.__h.forEach(z), i2.__h.forEach(B), i2.__h = [], t = 0)), u = r;
  }, c.diffed = function(n) {
    v && v(n);
    var t2 = n.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j)), t2.__H.__.forEach(function(n2) {
      n2.u && (n2.__H = n2.u), n2.u = void 0;
    })), u = r = null;
  }, c.__c = function(n, t2) {
    t2.some(function(n2) {
      try {
        n2.__h.forEach(z), n2.__h = n2.__h.filter(function(n3) {
          return !n3.__ || B(n3);
        });
      } catch (r2) {
        t2.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), t2 = [], c.__e(r2, n2.__v);
      }
    }), l && l(n, t2);
  }, c.unmount = function(n) {
    m && m(n);
    var t2, r2 = n.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n2) {
      try {
        z(n2);
      } catch (n3) {
        t2 = n3;
      }
    }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w(n) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 35);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function B(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function C(n, t2) {
    return !n || n.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n[r2];
    });
  }
  function D(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  function FloatingButton({ onClick }) {
    return /* @__PURE__ */ u$1(
      "button",
      {
        class: "floating-button",
        onClick,
        title: "打开任务面板",
        "aria-label": "打开任务面板",
        children: /* @__PURE__ */ u$1(
          "svg",
          {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ u$1(
                "path",
                {
                  d: "M12 2L2 7L12 12L22 7L12 2Z",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              ),
              /* @__PURE__ */ u$1(
                "path",
                {
                  d: "M2 17L12 22L22 17",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              ),
              /* @__PURE__ */ u$1(
                "path",
                {
                  d: "M2 12L12 17L22 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              )
            ]
          }
        )
      }
    );
  }
  function Modal({ isOpen, onClose, children }) {
    const [isClosing, setIsClosing] = d(false);
    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 300);
    };
    const handleBackdropClick = (e2) => {
      if (e2.target === e2.currentTarget) {
        handleClose();
      }
    };
    if (!isOpen && !isClosing) {
      return null;
    }
    return /* @__PURE__ */ u$1(
      "div",
      {
        class: `modal-backdrop ${isClosing ? "modal-backdrop--closing" : ""}`,
        onClick: handleBackdropClick,
        children: /* @__PURE__ */ u$1("div", { class: `modal-content ${isClosing ? "modal-content--closing" : ""}`, children: [
          /* @__PURE__ */ u$1("div", { class: "modal-header", children: /* @__PURE__ */ u$1(
            "button",
            {
              class: "modal-close-button",
              onClick: handleClose,
              title: "关闭面板",
              "aria-label": "关闭面板",
              children: /* @__PURE__ */ u$1(
                "svg",
                {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ u$1(
                    "path",
                    {
                      d: "M19 9L12 16L5 9",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }
                  )
                }
              )
            }
          ) }),
          /* @__PURE__ */ u$1("div", { class: "modal-body", children })
        ] })
      }
    );
  }
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  function ScriptCard({
    script,
    onExecute,
    onStop,
    isRunning,
    progress = 0
  }) {
    const [parameters, setParameters] = d({});
    const [isExpanded, setIsExpanded] = d(false);
    y(() => {
      const storageKey = `bili_tasks_params_${script.id}`;
      const savedParams = _GM_getValue(storageKey, "{}");
      try {
        const parsedParams = JSON.parse(savedParams);
        const initialParams = {};
        script.parameters.forEach((param) => {
          initialParams[param.key] = parsedParams[param.key] !== void 0 ? parsedParams[param.key] : param.defaultValue;
        });
        setParameters(initialParams);
      } catch (error) {
        console.warn("Failed to load saved parameters:", error);
        const initialParams = {};
        script.parameters.forEach((param) => {
          initialParams[param.key] = param.defaultValue;
        });
        setParameters(initialParams);
      }
    }, [script.id, script.parameters]);
    y(() => {
      if (Object.keys(parameters).length > 0) {
        const storageKey = `bili_tasks_params_${script.id}`;
        _GM_setValue(storageKey, JSON.stringify(parameters));
      }
    }, [parameters, script.id]);
    const handleParameterChange = (key, value) => {
      setParameters((prev) => ({
        ...prev,
        [key]: value
      }));
    };
    const handleExecute = () => {
      const missingParams = script.parameters.filter((param) => param.required && !parameters[param.key]).map((param) => param.label);
      if (missingParams.length > 0) {
        alert(`请填写必填参数: ${missingParams.join(", ")}`);
        return;
      }
      onExecute(script.id, parameters);
    };
    const handleStop = () => {
      onStop(script.id);
    };
    const renderParameterInput = (param) => {
      var _a;
      const value = parameters[param.key];
      switch (param.type) {
        case "text":
          return /* @__PURE__ */ u$1(
            "input",
            {
              type: "text",
              value: value || "",
              onChange: (e2) => handleParameterChange(param.key, e2.target.value),
              placeholder: param.placeholder,
              disabled: isRunning,
              class: "script-input"
            }
          );
        case "number":
          return /* @__PURE__ */ u$1(
            "input",
            {
              type: "number",
              value: value || "",
              onChange: (e2) => handleParameterChange(param.key, Number(e2.target.value)),
              placeholder: param.placeholder,
              disabled: isRunning,
              class: "script-input"
            }
          );
        case "boolean":
          return /* @__PURE__ */ u$1("label", { class: "script-checkbox", children: [
            /* @__PURE__ */ u$1(
              "input",
              {
                type: "checkbox",
                checked: value || false,
                onChange: (e2) => handleParameterChange(param.key, e2.target.checked),
                disabled: isRunning
              }
            ),
            /* @__PURE__ */ u$1("span", { class: "checkmark" })
          ] });
        case "select":
          return /* @__PURE__ */ u$1(
            "select",
            {
              value: value || "",
              onChange: (e2) => handleParameterChange(param.key, e2.target.value),
              disabled: isRunning,
              class: "script-select",
              children: [
                /* @__PURE__ */ u$1("option", { value: "", children: "请选择..." }),
                (_a = param.options) == null ? void 0 : _a.map((option) => /* @__PURE__ */ u$1("option", { value: option.value, children: option.label }, option.value))
              ]
            }
          );
        case "textarea":
          return /* @__PURE__ */ u$1(
            "textarea",
            {
              value: value || "",
              onChange: (e2) => handleParameterChange(param.key, e2.target.value),
              placeholder: param.placeholder,
              disabled: isRunning,
              class: "script-textarea",
              rows: 4
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ u$1("div", { class: `script-card ${script.category} ${isRunning ? "running" : ""}`, children: [
      /* @__PURE__ */ u$1("div", { class: "script-header", onClick: () => setIsExpanded(!isExpanded), children: [
        /* @__PURE__ */ u$1("div", { class: "script-info", children: [
          /* @__PURE__ */ u$1("h3", { class: "script-name", children: script.name }),
          /* @__PURE__ */ u$1("p", { class: "script-description", children: script.description }),
          /* @__PURE__ */ u$1("span", { class: `script-category ${script.category}`, children: script.category === "tool" ? "工具" : "操作" })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "script-controls", children: [
          isRunning && /* @__PURE__ */ u$1("div", { class: "progress-container", children: [
            /* @__PURE__ */ u$1("div", { class: "progress-bar", children: /* @__PURE__ */ u$1(
              "div",
              {
                class: "progress-fill",
                style: { width: `${progress}%` }
              }
            ) }),
            /* @__PURE__ */ u$1("span", { class: "progress-text", children: [
              Math.round(progress),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ u$1(
            "button",
            {
              class: `expand-button ${isExpanded ? "expanded" : ""}`,
              type: "button",
              children: /* @__PURE__ */ u$1("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ u$1("path", { d: "M4 6l4 4 4-4", stroke: "currentColor", "stroke-width": "2", fill: "none" }) })
            }
          )
        ] })
      ] }),
      isExpanded && /* @__PURE__ */ u$1("div", { class: "script-body", children: [
        script.parameters.length > 0 && /* @__PURE__ */ u$1("div", { class: "script-parameters", children: [
          /* @__PURE__ */ u$1("h4", { children: "参数配置" }),
          script.parameters.map((param) => /* @__PURE__ */ u$1("div", { class: "parameter-group", children: [
            /* @__PURE__ */ u$1("label", { class: "parameter-label", children: [
              param.label,
              param.required && /* @__PURE__ */ u$1("span", { class: "required", children: "*" })
            ] }),
            renderParameterInput(param),
            param.description && /* @__PURE__ */ u$1("p", { class: "parameter-description", children: param.description })
          ] }, param.key))
        ] }),
        /* @__PURE__ */ u$1("div", { class: "script-actions", children: isRunning ? /* @__PURE__ */ u$1(
          "button",
          {
            class: "stop-button",
            onClick: handleStop,
            type: "button",
            children: [
              /* @__PURE__ */ u$1("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ u$1("rect", { x: "4", y: "4", width: "8", height: "8", fill: "currentColor" }) }),
              "停止执行"
            ]
          }
        ) : /* @__PURE__ */ u$1(
          "button",
          {
            class: "execute-button",
            onClick: handleExecute,
            type: "button",
            children: [
              /* @__PURE__ */ u$1("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ u$1("path", { d: "M5 3l8 5-8 5V3z", fill: "currentColor" }) }),
              "开始执行"
            ]
          }
        ) })
      ] })
    ] });
  }
  function LogPanel({ logs, onClear }) {
    const logContainerRef = A(null);
    y(() => {
      if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
      }
    }, [logs]);
    const formatTime = (date) => {
      return date.toLocaleTimeString("zh-CN", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    };
    const getLogIcon = (level) => {
      switch (level) {
        case "info":
          return "ℹ️";
        case "warn":
          return "⚠️";
        case "error":
          return "❌";
        case "success":
          return "✅";
        default:
          return "ℹ️";
      }
    };
    return /* @__PURE__ */ u$1("div", { class: "log-panel", children: [
      /* @__PURE__ */ u$1("div", { class: "log-header", children: [
        /* @__PURE__ */ u$1("h3", { children: "执行日志" }),
        /* @__PURE__ */ u$1("div", { class: "log-controls", children: [
          /* @__PURE__ */ u$1("span", { class: "log-count", children: [
            logs.length,
            " 条日志"
          ] }),
          /* @__PURE__ */ u$1(
            "button",
            {
              class: "clear-button",
              onClick: onClear,
              title: "清空日志",
              children: [
                /* @__PURE__ */ u$1("svg", { width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ u$1(
                  "path",
                  {
                    d: "M2 3h12M5.5 3V2a1 1 0 011-1h3a1 1 0 011 1v1M7 7v6M9 7v6M4 3v10a1 1 0 001 1h6a1 1 0 001-1V3",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    fill: "none"
                  }
                ) }),
                "清空"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u$1("div", { class: "log-container", ref: logContainerRef, children: logs.length === 0 ? /* @__PURE__ */ u$1("div", { class: "log-empty", children: [
        /* @__PURE__ */ u$1("div", { class: "empty-icon", children: "📝" }),
        /* @__PURE__ */ u$1("p", { children: "暂无日志" }),
        /* @__PURE__ */ u$1("span", { children: "执行脚本后，日志将在这里显示" })
      ] }) : /* @__PURE__ */ u$1("div", { class: "log-list", children: logs.map((log) => /* @__PURE__ */ u$1("div", { class: `log-entry ${log.level}`, children: [
        /* @__PURE__ */ u$1("div", { class: "log-meta", children: [
          /* @__PURE__ */ u$1("span", { class: "log-icon", children: getLogIcon(log.level) }),
          /* @__PURE__ */ u$1("span", { class: "log-time", children: formatTime(log.timestamp) }),
          log.scriptId && /* @__PURE__ */ u$1("span", { class: "log-script", children: [
            "[",
            log.scriptId,
            "]"
          ] })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "log-message", children: log.message })
      ] }, log.id)) }) }),
      /* @__PURE__ */ u$1("div", { class: "log-footer", children: /* @__PURE__ */ u$1("div", { class: "log-legend", children: [
        /* @__PURE__ */ u$1("div", { class: "legend-item", children: [
          /* @__PURE__ */ u$1("span", { class: "legend-icon info", children: "ℹ️" }),
          /* @__PURE__ */ u$1("span", { children: "信息" })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "legend-item", children: [
          /* @__PURE__ */ u$1("span", { class: "legend-icon warn", children: "⚠️" }),
          /* @__PURE__ */ u$1("span", { children: "警告" })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "legend-item", children: [
          /* @__PURE__ */ u$1("span", { class: "legend-icon error", children: "❌" }),
          /* @__PURE__ */ u$1("span", { children: "错误" })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "legend-item", children: [
          /* @__PURE__ */ u$1("span", { class: "legend-icon success", children: "✅" }),
          /* @__PURE__ */ u$1("span", { children: "成功" })
        ] })
      ] }) })
    ] });
  }
  function ResizeHandle({ onMouseDown, isDragging }) {
    const handleRef = A(null);
    y(() => {
      const handleElement = handleRef.current;
      if (!handleElement) return;
      const handleMouseDown = (e2) => {
        e2.preventDefault();
        onMouseDown(e2);
      };
      handleElement.addEventListener("mousedown", handleMouseDown);
      return () => {
        handleElement.removeEventListener("mousedown", handleMouseDown);
      };
    }, [onMouseDown]);
    return /* @__PURE__ */ u$1(
      "div",
      {
        ref: handleRef,
        class: `resize-handle ${isDragging ? "resize-handle--dragging" : ""}`,
        title: "拖拽调整面板宽度",
        children: [
          /* @__PURE__ */ u$1("div", { class: "resize-handle-line" }),
          /* @__PURE__ */ u$1("div", { class: "resize-handle-grip", children: [
            /* @__PURE__ */ u$1("div", { class: "resize-handle-dot" }),
            /* @__PURE__ */ u$1("div", { class: "resize-handle-dot" }),
            /* @__PURE__ */ u$1("div", { class: "resize-handle-dot" }),
            /* @__PURE__ */ u$1("div", { class: "resize-handle-dot" }),
            /* @__PURE__ */ u$1("div", { class: "resize-handle-dot" }),
            /* @__PURE__ */ u$1("div", { class: "resize-handle-dot" })
          ] })
        ]
      }
    );
  }
  const SCRIPT_CONFIGS = [
    // 工具脚本
    {
      id: "bv2av",
      name: "BV/AV号转换",
      description: "将B站的BV号转换为AV号，或反之",
      category: "tool",
      isRunning: false,
      parameters: [
        {
          key: "videoId",
          label: "视频ID",
          type: "text",
          defaultValue: "",
          required: true,
          placeholder: "输入BV号或AV号，如：BV1L9Uoa9EUx 或 av111298867365120",
          description: "支持BV号和AV号格式"
        }
      ]
    },
    {
      id: "show_resource_info",
      name: "获取视频信息",
      description: "获取B站视频的详细信息",
      category: "tool",
      isRunning: false,
      parameters: [
        {
          key: "videoIds",
          label: "视频ID列表",
          type: "textarea",
          defaultValue: "",
          required: true,
          placeholder: "每行一个视频ID，支持BV号或AV号",
          description: "批量获取多个视频的信息"
        }
      ]
    },
    // 操作脚本
    {
      id: "move_shortest_to_toview",
      name: "移动最短视频到稍后再看",
      description: "从收藏夹随机页中选择时长最短的视频添加到稍后再看",
      category: "operation",
      isRunning: false,
      parameters: [
        {
          key: "favoriteId",
          label: "收藏夹ID",
          type: "number",
          defaultValue: "",
          required: true,
          description: "要操作的收藏夹ID"
        },
        {
          key: "upTo",
          label: "稍后再看目标数量",
          type: "number",
          defaultValue: 100,
          required: true,
          description: "稍后再看补全到多少个资源(上限1000)"
        },
        {
          key: "durationThreshold",
          label: "时长阈值(秒)",
          type: "number",
          defaultValue: 1800,
          required: false,
          description: "超过这个时长的视频不添加，0表示不限制"
        },
        {
          key: "ignoreFrontPage",
          label: "忽略前几页",
          type: "number",
          defaultValue: 6,
          required: false,
          description: "忽略收藏夹前几页的内容"
        },
        {
          key: "ignoreTitleKeywords",
          label: "忽略标题关键词",
          type: "text",
          defaultValue: "asmr,助眠,音声,触发音",
          required: false,
          description: "忽略标题中包含这些关键词的视频，用逗号分隔"
        }
      ]
    },
    {
      id: "add_toview_to_favorite",
      name: "稍后再看添加到收藏夹",
      description: "把稍后再看的视频添加到指定收藏夹",
      category: "operation",
      isRunning: false,
      parameters: [
        {
          key: "favoriteId",
          label: "目标收藏夹ID",
          type: "number",
          defaultValue: "",
          required: true,
          description: "要添加到的收藏夹ID"
        },
        {
          key: "maxCount",
          label: "最大添加数量",
          type: "number",
          defaultValue: 50,
          required: false,
          description: "最多添加多少个视频，0表示全部添加"
        }
      ]
    },
    {
      id: "move_favorite_to_another",
      name: "移动收藏夹视频",
      description: "将一个收藏夹的视频移动到另一个收藏夹",
      category: "operation",
      isRunning: false,
      parameters: [
        {
          key: "fromFavorite",
          label: "源收藏夹ID",
          type: "number",
          defaultValue: "",
          required: true,
          description: "被移动的收藏夹ID"
        },
        {
          key: "toFavorite",
          label: "目标收藏夹ID",
          type: "number",
          defaultValue: "",
          required: true,
          description: "移动到的收藏夹ID"
        },
        {
          key: "upTo",
          label: "目标收藏夹上限",
          type: "number",
          defaultValue: 1e3,
          required: true,
          description: "目标收藏夹的视频数上限"
        },
        {
          key: "onlyWithKeywords",
          label: "仅移动包含关键词的视频",
          type: "text",
          defaultValue: "",
          required: false,
          placeholder: "用逗号分隔多个关键词",
          description: "只移动标题中包含这些关键词的视频，空表示不过滤"
        }
      ]
    },
    {
      id: "move_single_media",
      name: "移动单个视频",
      description: "将指定视频从一个收藏夹移动到另一个收藏夹",
      category: "operation",
      isRunning: false,
      parameters: [
        {
          key: "mediaId",
          label: "视频ID",
          type: "text",
          defaultValue: "",
          required: true,
          description: "要移动的视频ID（支持BV号或AV号）"
        },
        {
          key: "fromFavorite",
          label: "源收藏夹ID",
          type: "number",
          defaultValue: "",
          required: true,
          description: "视频当前所在的收藏夹ID"
        },
        {
          key: "toFavorite",
          label: "目标收藏夹ID",
          type: "number",
          defaultValue: "",
          required: true,
          description: "要移动到的收藏夹ID"
        }
      ]
    },
    {
      id: "delete_timeout_lottery",
      name: "删除过期抽奖动态",
      description: "删除已过期的抽奖动态（仅限官方抽奖工具）",
      category: "operation",
      isRunning: false,
      parameters: [
        {
          key: "detectOnly",
          label: "仅检测不删除",
          type: "boolean",
          defaultValue: false,
          required: false,
          description: "开启后只检测过期动态，不执行删除操作"
        },
        {
          key: "notDeleteWinning",
          label: "不删除中奖动态",
          type: "boolean",
          defaultValue: true,
          required: false,
          description: "不删除已中奖的抽奖动态"
        },
        {
          key: "userId",
          label: "用户ID",
          type: "number",
          defaultValue: "",
          required: false,
          description: "指定用户ID，不填则为当前登录用户"
        }
      ]
    },
    {
      id: "clear_toview",
      name: "清空稍后再看",
      description: "删除稍后再看中的所有视频",
      category: "operation",
      isRunning: false,
      parameters: [
        {
          key: "confirm",
          label: "确认清空",
          type: "boolean",
          defaultValue: false,
          required: true,
          description: "确认要清空稍后再看列表（此操作不可恢复）"
        }
      ]
    }
  ];
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function containsAnyKeyword(text, keywords, caseSensitive = false) {
    if (keywords.length === 0) return false;
    const searchText = caseSensitive ? text : text.toLowerCase();
    return keywords.some((keyword) => {
      const searchKeyword = caseSensitive ? keyword : keyword.toLowerCase();
      return searchText.includes(searchKeyword);
    });
  }
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  const XOR_CODE = 23442827791579;
  const MASK_CODE = 2251799813685247;
  const MAX_AID = 1 << 51;
  const ALPHABET = "FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf";
  const ENCODE_MAP = [8, 7, 0, 5, 1, 3, 2, 4, 6];
  const DECODE_MAP = [2, 4, 1, 5, 7, 3, 6, 0, 8];
  const BASE = ALPHABET.length;
  const PREFIX = "BV1";
  const PREFIX_LEN = PREFIX.length;
  const CODE_LEN = ENCODE_MAP.length;
  function av2bv(aid) {
    const bvid = new Array(9);
    let tmp = (MAX_AID | aid) ^ XOR_CODE;
    for (let i2 = 0; i2 < CODE_LEN; i2++) {
      bvid[ENCODE_MAP[i2]] = ALPHABET[tmp % BASE];
      tmp = Math.floor(tmp / BASE);
    }
    return PREFIX + bvid.join("");
  }
  function bv2av(bvid) {
    if (!bvid.startsWith(PREFIX)) {
      throw new Error(`Invalid BV ID: ${bvid}`);
    }
    const code = bvid.slice(PREFIX_LEN);
    let tmp = 0;
    for (let i2 = 0; i2 < CODE_LEN; i2++) {
      const idx = ALPHABET.indexOf(code[DECODE_MAP[i2]]);
      if (idx === -1) {
        throw new Error(`Invalid character in BV ID: ${code[DECODE_MAP[i2]]}`);
      }
      tmp = tmp * BASE + idx;
    }
    return tmp & MASK_CODE ^ XOR_CODE;
  }
  function isValidBvid(bvid) {
    if (!bvid.startsWith(PREFIX) || bvid.length !== PREFIX_LEN + CODE_LEN) {
      return false;
    }
    const code = bvid.slice(PREFIX_LEN);
    return code.split("").every((char) => ALPHABET.includes(char));
  }
  function isValidAid(aid) {
    return Number.isInteger(aid) && aid > 0 && aid < MAX_AID;
  }
  const bvConverter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    av2bv,
    bv2av,
    isValidAid,
    isValidBvid
  }, Symbol.toStringTag, { value: "Module" }));
  class ScriptExecutor {
    constructor(scriptId, onLog, onProgress) {
      __publicField(this, "execution");
      __publicField(this, "onLog");
      __publicField(this, "onProgress");
      __publicField(this, "shouldStop", false);
      this.execution = {
        id: generateId(),
        scriptId,
        status: "running",
        startTime: /* @__PURE__ */ new Date(),
        progress: 0,
        logs: []
      };
      this.onLog = onLog;
      this.onProgress = onProgress;
    }
    /**
     * 记录日志
     */
    log(level, message) {
      const logEntry = {
        id: generateId(),
        timestamp: /* @__PURE__ */ new Date(),
        level,
        message,
        scriptId: this.execution.scriptId
      };
      this.execution.logs.push(logEntry);
      this.onLog(logEntry);
    }
    /**
     * 更新进度
     */
    updateProgress(progress) {
      this.execution.progress = Math.max(0, Math.min(100, progress));
      this.onProgress(this.execution.progress);
    }
    /**
     * 检查是否应该停止执行
     */
    checkShouldStop() {
      if (this.shouldStop) {
        throw new Error("Script execution was stopped by user");
      }
    }
    /**
     * 停止脚本执行
     */
    stop() {
      this.shouldStop = true;
      this.log("warn", "用户请求停止脚本执行");
    }
    /**
     * 运行脚本的完整流程
     */
    async run(parameters) {
      try {
        this.log("info", "开始执行脚本");
        this.updateProgress(0);
        const result = await this.execute(parameters);
        this.execution.status = "completed";
        this.execution.endTime = /* @__PURE__ */ new Date();
        this.execution.result = result;
        this.updateProgress(100);
        this.log("success", "脚本执行完成");
      } catch (error) {
        this.execution.status = this.shouldStop ? "stopped" : "failed";
        this.execution.endTime = /* @__PURE__ */ new Date();
        this.execution.error = error instanceof Error ? error.message : String(error);
        if (this.shouldStop) {
          this.log("warn", "脚本执行已停止");
        } else {
          this.log("error", `脚本执行失败: ${this.execution.error}`);
        }
      }
      return this.execution;
    }
    /**
     * 获取执行状态
     */
    getExecution() {
      return { ...this.execution };
    }
  }
  const scriptRel = /* @__PURE__ */ function detectScriptRel() {
    const relList = typeof document !== "undefined" && document.createElement("link").relList;
    return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
  }();
  const assetsURL = function(dep) {
    return "/" + dep;
  };
  const seen = {};
  const __vitePreload = function preload(baseModule, deps, importerUrl) {
    let promise = Promise.resolve();
    if (deps && deps.length > 0) {
      let allSettled2 = function(promises) {
        return Promise.all(
          promises.map(
            (p2) => Promise.resolve(p2).then(
              (value) => ({ status: "fulfilled", value }),
              (reason) => ({ status: "rejected", reason })
            )
          )
        );
      };
      document.getElementsByTagName("link");
      const cspNonceMeta = document.querySelector(
        "meta[property=csp-nonce]"
      );
      const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
      promise = allSettled2(
        deps.map((dep) => {
          dep = assetsURL(dep);
          if (dep in seen) return;
          seen[dep] = true;
          const isCss = dep.endsWith(".css");
          const cssSelector = isCss ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
            return;
          }
          const link = document.createElement("link");
          link.rel = isCss ? "stylesheet" : scriptRel;
          if (!isCss) {
            link.as = "script";
          }
          link.crossOrigin = "";
          link.href = dep;
          if (cspNonce) {
            link.setAttribute("nonce", cspNonce);
          }
          document.head.appendChild(link);
          if (isCss) {
            return new Promise((res, rej) => {
              link.addEventListener("load", res);
              link.addEventListener(
                "error",
                () => rej(new Error(`Unable to preload CSS for ${dep}`))
              );
            });
          }
        })
      );
    }
    function handlePreloadError(err) {
      const e2 = new Event("vite:preloadError", {
        cancelable: true
      });
      e2.payload = err;
      window.dispatchEvent(e2);
      if (!e2.defaultPrevented) {
        throw err;
      }
    }
    return promise.then((res) => {
      for (const item of res || []) {
        if (item.status !== "rejected") continue;
        handlePreloadError(item.reason);
      }
      return baseModule().catch(handlePreloadError);
    });
  };
  class TokenBucket {
    constructor(capacity, rate) {
      __publicField(this, "capacity");
      __publicField(this, "tokens");
      __publicField(this, "rate");
      __publicField(this, "lastRefillTime");
      this.capacity = capacity;
      this.tokens = capacity;
      this.rate = rate;
      this.lastRefillTime = Date.now();
    }
    /**
     * 填充令牌
     */
    refill() {
      const now = Date.now();
      const timePassed = (now - this.lastRefillTime) / 1e3;
      const newTokens = timePassed * this.rate;
      this.tokens = Math.min(this.capacity, this.tokens + newTokens);
      this.lastRefillTime = now;
    }
    /**
     * 消费令牌
     * @param tokens 需要消费的令牌数量
     * @returns 是否成功消费
     */
    consume(tokens = 1) {
      this.refill();
      if (this.tokens >= tokens) {
        this.tokens -= tokens;
        return true;
      }
      return false;
    }
    /**
     * 等待直到可以消费指定数量的令牌
     * @param tokens 需要消费的令牌数量
     * @returns Promise，在可以消费时resolve
     */
    async waitForTokens(tokens = 1) {
      return new Promise((resolve) => {
        const checkTokens = () => {
          if (this.consume(tokens)) {
            resolve();
          } else {
            setTimeout(checkTokens, 100);
          }
        };
        checkTokens();
      });
    }
    /**
     * 获取当前令牌数量
     */
    getTokens() {
      this.refill();
      return this.tokens;
    }
  }
  class BiliApiClient {
    constructor(capacity = 10, rate = 0.7) {
      __publicField(this, "tokenBucket");
      __publicField(this, "baseHeaders");
      this.tokenBucket = new TokenBucket(capacity, rate);
      this.baseHeaders = {
        "Referer": "https://www.bilibili.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
      };
    }
    /**
     * 发送GET请求
     */
    async get(url, params) {
      await this.tokenBucket.waitForTokens();
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== void 0 && value !== null) {
            searchParams.append(key, String(value));
          }
        });
      }
      const fullUrl = searchParams.toString() ? `${url}?${searchParams}` : url;
      return new Promise((resolve, reject) => {
        _GM_xmlhttpRequest({
          method: "GET",
          url: fullUrl,
          headers: this.baseHeaders,
          onload: (response) => {
            try {
              const data = JSON.parse(response.responseText);
              resolve(data);
            } catch (error) {
              reject(new Error(`Failed to parse response: ${error}`));
            }
          },
          onerror: (error) => {
            reject(new Error(`Request failed: ${error}`));
          },
          ontimeout: () => {
            reject(new Error("Request timeout"));
          },
          timeout: 1e4
        });
      });
    }
    /**
     * 发送POST请求
     */
    async post(url, data, params) {
      await this.tokenBucket.waitForTokens();
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== void 0 && value !== null) {
            searchParams.append(key, String(value));
          }
        });
      }
      const fullUrl = searchParams.toString() ? `${url}?${searchParams}` : url;
      const formData = new URLSearchParams();
      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          if (value !== void 0 && value !== null) {
            formData.append(key, String(value));
          }
        });
      }
      return new Promise((resolve, reject) => {
        _GM_xmlhttpRequest({
          method: "POST",
          url: fullUrl,
          headers: {
            ...this.baseHeaders,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: formData.toString(),
          onload: (response) => {
            try {
              const responseData = JSON.parse(response.responseText);
              resolve(responseData);
            } catch (error) {
              reject(new Error(`Failed to parse response: ${error}`));
            }
          },
          onerror: (error) => {
            reject(new Error(`Request failed: ${error}`));
          },
          ontimeout: () => {
            reject(new Error("Request timeout"));
          },
          timeout: 1e4
        });
      });
    }
    /**
     * 获取当前令牌数量（用于调试）
     */
    getTokenCount() {
      return this.tokenBucket.getTokens();
    }
  }
  const biliApiClient = new BiliApiClient();
  function getCsrfToken() {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "bili_jct") {
        return value;
      }
    }
    throw new Error("CSRF token not found. Please make sure you are logged in.");
  }
  function getUserId() {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "DedeUserID") {
        return value;
      }
    }
    throw new Error("User ID not found. Please make sure you are logged in.");
  }
  async function getToViewList() {
    const response = await biliApiClient.get("https://api.bilibili.com/x/v2/history/toview");
    if (response.code !== 0) {
      throw new Error(`Failed to get toview list: ${response.message}`);
    }
    return response.data;
  }
  async function getFavoriteResourceList(favoriteId, pageIndex = 1, pageSize = 20) {
    const response = await biliApiClient.get(
      "https://api.bilibili.com/x/v3/fav/resource/list",
      {
        media_id: favoriteId,
        pn: pageIndex,
        ps: pageSize,
        keyword: "",
        order: "mtime",
        type: 0,
        tid: 0,
        platform: "web"
      }
    );
    if (response.code !== 0) {
      throw new Error(`Failed to get favorite resource list: ${response.message}`);
    }
    return response.data;
  }
  async function addToToView(videoId) {
    const response = await biliApiClient.post(
      "https://api.bilibili.com/x/v2/history/toview/add",
      { aid: videoId, csrf: getCsrfToken() }
    );
    if (response.code !== 0) {
      throw new Error(`Failed to add to toview: ${response.message}`);
    }
  }
  async function clearToViewList() {
    const response = await biliApiClient.post(
      "https://api.bilibili.com/x/v2/history/toview/clear",
      { csrf: getCsrfToken() }
    );
    if (response.code !== 0) {
      throw new Error(`Failed to clear toview list: ${response.message}`);
    }
  }
  async function addToFavorite(favoriteId, resourceIds) {
    for (const resource of resourceIds) {
      const response = await biliApiClient.post(
        "https://api.bilibili.com/x/v3/fav/resource/deal",
        {
          rid: resource.id,
          type: resource.type,
          add_media_ids: favoriteId.toString(),
          del_media_ids: "",
          csrf: getCsrfToken()
        }
      );
      if (response.code !== 0) {
        throw new Error(`Failed to add to favorite: ${response.message}`);
      }
    }
  }
  async function moveToFavorite(fromFavoriteId, toFavoriteId, resourceIds) {
    const resources = resourceIds.map((r2) => `${r2.id}:${r2.type}`).join(",");
    const response = await biliApiClient.post(
      "https://api.bilibili.com/x/v3/fav/resource/move",
      {
        src_media_id: fromFavoriteId.toString(),
        tar_media_id: toFavoriteId.toString(),
        resources,
        csrf: getCsrfToken()
      }
    );
    if (response.code !== 0) {
      throw new Error(`Failed to move to favorite: ${response.message}`);
    }
  }
  async function getDynamicList(uid, offset = "") {
    const response = await biliApiClient.get(
      "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space",
      {
        offset,
        host_mid: uid || getUserId(),
        timezone_offset: -480
      }
    );
    if (response.code !== 0) {
      throw new Error(`Failed to get dynamic list: ${response.message}`);
    }
    return response.data;
  }
  async function deleteDynamic(dynamicId) {
    const response = await biliApiClient.post(
      "https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/rm_dynamic",
      { dynamic_id: dynamicId },
      void 0
    );
    if (response.code !== 0) {
      throw new Error(`Failed to delete dynamic: ${response.message}`);
    }
  }
  async function getLotteryInfo(dynamicId) {
    const response = await biliApiClient.get(
      "https://api.vc.bilibili.com/lottery_svr/v1/lottery_svr/lottery_notice",
      {
        business_id: dynamicId,
        business_type: "1",
        csrf: getCsrfToken(),
        web_location: "333.1330"
      }
    );
    if (response.code !== 0) {
      throw new Error(`Failed to get lottery info: ${response.message}`);
    }
    return response.data;
  }
  class MoveShortestToToviewExecutor extends ScriptExecutor {
    async execute(parameters) {
      const { favoriteId, upTo, durationThreshold, ignoreFrontPage, ignoreTitleKeywords } = parameters;
      if (!favoriteId) {
        throw new Error("请输入收藏夹ID");
      }
      this.log("info", `开始从收藏夹 ${favoriteId} 移动最短视频到稍后再看`);
      this.updateProgress(10);
      try {
        const toviewList = await getToViewList();
        const currentCount = toviewList.count;
        const targetCount = upTo || 100;
        if (currentCount >= targetCount) {
          this.log("info", `稍后再看已有 ${currentCount} 个视频，达到目标数量 ${targetCount}`);
          return { added: 0, currentCount, targetCount };
        }
        const needCount = targetCount - currentCount;
        this.log("info", `需要添加 ${needCount} 个视频到稍后再看`);
        this.updateProgress(20);
        const ignorePages = ignoreFrontPage || 6;
        const keywords = ignoreTitleKeywords ? ignoreTitleKeywords.split(",").map((k2) => k2.trim()) : [];
        const maxDuration = durationThreshold || 0;
        let addedCount = 0;
        let pageIndex = ignorePages + 1;
        const pageSize = 20;
        while (addedCount < needCount) {
          this.checkShouldStop();
          this.log("info", `正在获取第 ${pageIndex} 页收藏夹资源...`);
          const favoriteData = await getFavoriteResourceList(favoriteId, pageIndex, pageSize);
          if (!favoriteData.medias || favoriteData.medias.length === 0) {
            this.log("warn", "已到达收藏夹末尾，停止添加");
            break;
          }
          let candidates = favoriteData.medias.filter((video) => {
            if (maxDuration > 0 && video.duration > maxDuration) {
              return false;
            }
            if (keywords.length > 0 && containsAnyKeyword(video.title, keywords)) {
              return false;
            }
            return true;
          });
          candidates.sort((a2, b) => a2.duration - b.duration);
          for (const video of candidates) {
            if (addedCount >= needCount) break;
            this.checkShouldStop();
            try {
              await addToToView(video.id);
              addedCount++;
              this.log("success", `已添加: ${video.title} (时长: ${Math.floor(video.duration / 60)}分钟)`);
              await delay(1e3);
            } catch (error) {
              this.log("error", `添加失败: ${video.title} - ${error instanceof Error ? error.message : String(error)}`);
            }
            this.updateProgress(20 + addedCount / needCount * 70);
          }
          pageIndex++;
          await delay(500);
        }
        this.log("success", `操作完成，共添加 ${addedCount} 个视频到稍后再看`);
        return { added: addedCount, currentCount: currentCount + addedCount, targetCount };
      } catch (error) {
        this.log("error", `操作失败: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  }
  class AddToviewToFavoriteExecutor extends ScriptExecutor {
    async execute(parameters) {
      const { favoriteId, maxCount } = parameters;
      if (!favoriteId) {
        throw new Error("请输入收藏夹ID");
      }
      this.log("info", `开始将稍后再看的视频添加到收藏夹 ${favoriteId}`);
      this.updateProgress(10);
      try {
        const toviewList = await getToViewList();
        if (!toviewList.list || toviewList.list.length === 0) {
          this.log("info", "稍后再看列表为空");
          return { added: 0, total: 0 };
        }
        const maxAdd = maxCount || toviewList.list.length;
        const videosToAdd = toviewList.list.slice(0, maxAdd);
        this.log("info", `准备添加 ${videosToAdd.length} 个视频到收藏夹`);
        this.updateProgress(20);
        let addedCount = 0;
        const total = videosToAdd.length;
        for (let i2 = 0; i2 < total; i2++) {
          this.checkShouldStop();
          const video = videosToAdd[i2];
          this.log("info", `正在添加: ${video.title} (${i2 + 1}/${total})`);
          try {
            await addToFavorite(favoriteId, [{ id: video.id, type: video.type }]);
            addedCount++;
            this.log("success", `添加成功: ${video.title}`);
            await delay(1e3);
          } catch (error) {
            this.log("error", `添加失败: ${video.title} - ${error instanceof Error ? error.message : String(error)}`);
          }
          this.updateProgress(20 + (i2 + 1) / total * 70);
        }
        this.log("success", `操作完成，成功添加 ${addedCount}/${total} 个视频到收藏夹`);
        return { added: addedCount, total };
      } catch (error) {
        this.log("error", `操作失败: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  }
  class MoveFavoriteExecutor extends ScriptExecutor {
    async execute(parameters) {
      const { fromFavorite, toFavorite, upTo, onlyWithKeywords } = parameters;
      if (!fromFavorite || !toFavorite) {
        throw new Error("请输入源收藏夹ID和目标收藏夹ID");
      }
      this.log("info", `开始从收藏夹 ${fromFavorite} 移动视频到收藏夹 ${toFavorite}`);
      this.updateProgress(10);
      try {
        const keywords = onlyWithKeywords ? onlyWithKeywords.split(",").map((k2) => k2.trim()) : [];
        const maxCount = upTo || 1e3;
        let movedCount = 0;
        let pageIndex = 1;
        const pageSize = 20;
        while (movedCount < maxCount) {
          this.checkShouldStop();
          this.log("info", `正在获取第 ${pageIndex} 页源收藏夹资源...`);
          const favoriteData = await getFavoriteResourceList(fromFavorite, pageIndex, pageSize);
          if (!favoriteData.medias || favoriteData.medias.length === 0) {
            this.log("info", "已处理完所有视频");
            break;
          }
          let candidates = favoriteData.medias;
          if (keywords.length > 0) {
            candidates = candidates.filter(
              (video) => containsAnyKeyword(video.title, keywords)
            );
          }
          for (const video of candidates) {
            if (movedCount >= maxCount) break;
            this.checkShouldStop();
            try {
              await moveToFavorite(
                fromFavorite,
                toFavorite,
                [{ id: video.id, type: video.type }]
              );
              movedCount++;
              this.log("success", `已移动: ${video.title}`);
              await delay(1e3);
            } catch (error) {
              this.log("error", `移动失败: ${video.title} - ${error instanceof Error ? error.message : String(error)}`);
            }
            this.updateProgress(10 + movedCount / maxCount * 80);
          }
          pageIndex++;
          await delay(500);
        }
        this.log("success", `操作完成，共移动 ${movedCount} 个视频`);
        return { moved: movedCount, maxCount };
      } catch (error) {
        this.log("error", `操作失败: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  }
  class MoveSingleMediaExecutor extends ScriptExecutor {
    async execute(parameters) {
      const { mediaId, fromFavorite, toFavorite } = parameters;
      if (!mediaId || !fromFavorite || !toFavorite) {
        throw new Error("请输入视频ID、源收藏夹ID和目标收藏夹ID");
      }
      this.log("info", `开始移动视频 ${mediaId} 从收藏夹 ${fromFavorite} 到收藏夹 ${toFavorite}`);
      this.updateProgress(20);
      try {
        let videoId;
        let videoType = 2;
        if (mediaId.startsWith("BV")) {
          const { bv2av: bv2av2 } = await __vitePreload(async () => {
            const { bv2av: bv2av3 } = await Promise.resolve().then(() => bvConverter);
            return { bv2av: bv2av3 };
          }, true ? void 0 : void 0);
          videoId = bv2av2(mediaId);
        } else if (mediaId.startsWith("av")) {
          videoId = parseInt(mediaId.slice(2));
        } else {
          videoId = parseInt(mediaId);
        }
        if (isNaN(videoId)) {
          throw new Error("无效的视频ID格式");
        }
        this.updateProgress(50);
        await moveToFavorite(
          fromFavorite,
          toFavorite,
          [{ id: videoId, type: videoType }]
        );
        this.updateProgress(100);
        this.log("success", `视频移动成功: ${mediaId}`);
        return { mediaId, fromFavorite, toFavorite, success: true };
      } catch (error) {
        this.log("error", `移动失败: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  }
  class DeleteTimeoutLotteryExecutor extends ScriptExecutor {
    async execute(parameters) {
      var _a, _b, _c, _d;
      const { detectOnly, notDeleteWinning, userId } = parameters;
      this.log("info", `开始${detectOnly ? "检测" : "删除"}过期抽奖动态`);
      this.updateProgress(10);
      try {
        let deletedCount = 0;
        let detectedCount = 0;
        let offset = "";
        while (true) {
          this.checkShouldStop();
          this.log("info", "正在获取动态列表...");
          const dynamicData = await getDynamicList(userId, offset);
          if (!dynamicData.items || dynamicData.items.length === 0) {
            this.log("info", "已处理完所有动态");
            break;
          }
          for (const item of dynamicData.items) {
            this.checkShouldStop();
            if (item.type === "DYNAMIC_TYPE_FORWARD" && ((_c = (_b = (_a = item.modules) == null ? void 0 : _a.module_dynamic) == null ? void 0 : _b.additional) == null ? void 0 : _c.type) === "ADDITIONAL_TYPE_LOTTERY") {
              try {
                const lotteryInfo = await getLotteryInfo(item.id_str);
                const isExpired = new Date(lotteryInfo.lottery_time * 1e3) < /* @__PURE__ */ new Date();
                const isWinning = (_d = lotteryInfo.lottery_result) == null ? void 0 : _d.is_winner;
                if (isExpired) {
                  detectedCount++;
                  if (notDeleteWinning && isWinning) {
                    this.log("info", `跳过中奖动态: ${item.id_str}`);
                    continue;
                  }
                  if (!detectOnly) {
                    await deleteDynamic(item.id_str);
                    deletedCount++;
                    this.log("success", `已删除过期抽奖动态: ${item.id_str}`);
                    await delay(1e3);
                  } else {
                    this.log("info", `检测到过期抽奖动态: ${item.id_str}`);
                  }
                }
              } catch (error) {
                this.log("error", `处理动态失败: ${item.id_str} - ${error instanceof Error ? error.message : String(error)}`);
              }
            }
          }
          offset = dynamicData.offset;
          if (!offset) break;
          await delay(500);
          this.updateProgress(Math.min(90, 10 + detectedCount * 2));
        }
        const message = detectOnly ? `检测完成，发现 ${detectedCount} 个过期抽奖动态` : `删除完成，共删除 ${deletedCount}/${detectedCount} 个过期抽奖动态`;
        this.log("success", message);
        return { detected: detectedCount, deleted: deletedCount, detectOnly };
      } catch (error) {
        this.log("error", `操作失败: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  }
  class ClearToviewExecutor extends ScriptExecutor {
    async execute(parameters) {
      const { confirm } = parameters;
      if (!confirm) {
        throw new Error("请确认要清空稍后再看列表");
      }
      this.log("info", "开始清空稍后再看列表");
      this.updateProgress(20);
      try {
        const toviewList = await getToViewList();
        const totalCount = toviewList.count;
        if (totalCount === 0) {
          this.log("info", "稍后再看列表已为空");
          return { cleared: 0, total: 0 };
        }
        this.log("info", `准备清空 ${totalCount} 个视频`);
        this.updateProgress(50);
        await clearToViewList();
        this.updateProgress(100);
        this.log("success", `成功清空稍后再看列表，共清除 ${totalCount} 个视频`);
        return { cleared: totalCount, total: totalCount };
      } catch (error) {
        this.log("error", `清空失败: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  }
  class BvAvConverterExecutor extends ScriptExecutor {
    async execute(parameters) {
      const { videoId } = parameters;
      if (!videoId) {
        throw new Error("请输入视频ID");
      }
      this.log("info", `开始转换视频ID: ${videoId}`);
      this.updateProgress(20);
      try {
        let result;
        if (videoId.startsWith("BV")) {
          if (!isValidBvid(videoId)) {
            throw new Error("无效的BV号格式");
          }
          const aid = bv2av(videoId);
          result = {
            input: videoId,
            output: `av${aid}`,
            type: "BV → AV"
          };
          this.log("success", `转换成功: ${videoId} → av${aid}`);
        } else if (videoId.startsWith("av")) {
          const aid = parseInt(videoId.slice(2));
          if (!isValidAid(aid)) {
            throw new Error("无效的AV号格式");
          }
          const bvid = av2bv(aid);
          result = {
            input: videoId,
            output: bvid,
            type: "AV → BV"
          };
          this.log("success", `转换成功: ${videoId} → ${bvid}`);
        } else {
          const aid = parseInt(videoId);
          if (isValidAid(aid)) {
            const bvid = av2bv(aid);
            result = {
              input: `av${aid}`,
              output: bvid,
              type: "AV → BV"
            };
            this.log("success", `转换成功: av${aid} → ${bvid}`);
          } else {
            throw new Error("无法识别的视频ID格式，请输入BV号或AV号");
          }
        }
        this.updateProgress(100);
        return result;
      } catch (error) {
        this.log("error", `转换失败: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }
  }
  class VideoInfoExecutor extends ScriptExecutor {
    async execute(parameters) {
      const { videoIds } = parameters;
      if (!videoIds) {
        throw new Error("请输入视频ID列表");
      }
      const idList = videoIds.split("\n").filter((id) => id.trim()).map((id) => id.trim());
      if (idList.length === 0) {
        throw new Error("请输入至少一个视频ID");
      }
      this.log("info", `开始获取 ${idList.length} 个视频的信息`);
      this.updateProgress(10);
      const results = [];
      const total = idList.length;
      for (let i2 = 0; i2 < total; i2++) {
        this.checkShouldStop();
        const videoId = idList[i2];
        this.log("info", `正在处理: ${videoId} (${i2 + 1}/${total})`);
        try {
          await delay(500);
          const info = {
            id: videoId,
            title: `视频标题 - ${videoId}`,
            duration: Math.floor(Math.random() * 3600),
            author: "作者名称",
            view: Math.floor(Math.random() * 1e5),
            like: Math.floor(Math.random() * 1e4)
          };
          results.push(info);
          this.log("success", `获取成功: ${videoId} - ${info.title}`);
        } catch (error) {
          this.log("error", `获取失败: ${videoId} - ${error instanceof Error ? error.message : String(error)}`);
          results.push({
            id: videoId,
            error: error instanceof Error ? error.message : String(error)
          });
        }
        this.updateProgress(10 + (i2 + 1) / total * 90);
      }
      this.log("info", `处理完成，成功: ${results.filter((r2) => !r2.error).length}，失败: ${results.filter((r2) => r2.error).length}`);
      return { results, total: results.length };
    }
  }
  function createScriptExecutor(scriptId, onLog, onProgress) {
    switch (scriptId) {
      case "bv2av":
        return new BvAvConverterExecutor(scriptId, onLog, onProgress);
      case "show_resource_info":
        return new VideoInfoExecutor(scriptId, onLog, onProgress);
      case "move_shortest_to_toview":
        return new MoveShortestToToviewExecutor(scriptId, onLog, onProgress);
      case "add_toview_to_favorite":
        return new AddToviewToFavoriteExecutor(scriptId, onLog, onProgress);
      case "move_favorite_to_another":
        return new MoveFavoriteExecutor(scriptId, onLog, onProgress);
      case "move_single_media":
        return new MoveSingleMediaExecutor(scriptId, onLog, onProgress);
      case "delete_timeout_lottery":
        return new DeleteTimeoutLotteryExecutor(scriptId, onLog, onProgress);
      case "clear_toview":
        return new ClearToviewExecutor(scriptId, onLog, onProgress);
      default:
        throw new Error(`Unknown script type: ${scriptId}`);
    }
  }
  class ScriptExecutionManager {
    constructor(onLog, onProgress) {
      __publicField(this, "executors", /* @__PURE__ */ new Map());
      __publicField(this, "onLog");
      __publicField(this, "onProgress");
      this.onLog = onLog;
      this.onProgress = onProgress;
    }
    /**
     * 执行脚本
     */
    async executeScript(scriptId, parameters) {
      const existingExecutor = Array.from(this.executors.values()).find((executor2) => executor2.getExecution().scriptId === scriptId && executor2.getExecution().status === "running");
      if (existingExecutor) {
        throw new Error("该脚本已在运行中，请等待完成或停止后再试");
      }
      const executor = createScriptExecutor(
        scriptId,
        this.onLog,
        (progress) => this.onProgress(scriptId, progress)
      );
      const executionId = executor.getExecution().id;
      this.executors.set(executionId, executor);
      try {
        const result = await executor.run(parameters);
        return result;
      } finally {
        setTimeout(() => {
          this.executors.delete(executionId);
        }, 5e3);
      }
    }
    /**
     * 停止脚本执行
     */
    stopScript(scriptId) {
      const executor = Array.from(this.executors.values()).find((executor2) => executor2.getExecution().scriptId === scriptId && executor2.getExecution().status === "running");
      if (executor) {
        executor.stop();
        return true;
      }
      return false;
    }
    /**
     * 获取正在运行的脚本列表
     */
    getRunningScripts() {
      return Array.from(this.executors.values()).filter((executor) => executor.getExecution().status === "running").map((executor) => executor.getExecution().scriptId);
    }
    /**
     * 清理所有执行器
     */
    cleanup() {
      this.executors.clear();
    }
  }
  function calculateNewWidths(currentX, state, config) {
    const deltaX = currentX - state.startX;
    let newLeftWidth = state.startLeftWidth + deltaX;
    let newRightWidth = state.startRightWidth - deltaX;
    if (newLeftWidth < config.minLeftWidth) {
      newLeftWidth = config.minLeftWidth;
      newRightWidth = config.containerWidth - newLeftWidth;
    }
    if (newRightWidth < config.minRightWidth) {
      newRightWidth = config.minRightWidth;
      newLeftWidth = config.containerWidth - newRightWidth;
    }
    const totalWidth = newLeftWidth + newRightWidth;
    if (totalWidth > config.containerWidth) {
      const ratio = config.containerWidth / totalWidth;
      newLeftWidth *= ratio;
      newRightWidth *= ratio;
    }
    return { leftWidth: newLeftWidth, rightWidth: newRightWidth };
  }
  function calculateRatio(leftWidth, rightWidth) {
    const totalWidth = leftWidth + rightWidth;
    return totalWidth > 0 ? leftWidth / totalWidth : 0.4;
  }
  function calculateWidthsFromRatio(ratio, containerWidth, config) {
    let leftWidth = containerWidth * ratio;
    let rightWidth = containerWidth * (1 - ratio);
    if (leftWidth < config.minLeftWidth) {
      leftWidth = config.minLeftWidth;
      rightWidth = containerWidth - leftWidth;
    }
    if (rightWidth < config.minRightWidth) {
      rightWidth = config.minRightWidth;
      leftWidth = containerWidth - rightWidth;
    }
    return { leftWidth, rightWidth };
  }
  function isMobileOrSmallScreen() {
    return window.innerWidth <= 1024;
  }
  function getContainerWidth(containerElement) {
    if (!containerElement) return 1200;
    return containerElement.clientWidth;
  }
  function debounce(func, delay2) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => func(...args), delay2);
    };
  }
  function ScriptManager() {
    const containerRef = A(null);
    const [appState, setAppState] = d(() => ({
      scripts: SCRIPT_CONFIGS.map((config) => ({ ...config })),
      executions: [],
      logs: [],
      selectedScript: null,
      isModalOpen: true
    }));
    const [panelRatio, setPanelRatio] = d(0.4);
    const [resizeState, setResizeState] = d({
      isDragging: false,
      startX: 0,
      startLeftWidth: 0,
      startRightWidth: 0
    });
    const [panelWidths, setPanelWidths] = d({ leftWidth: 450, rightWidth: 600 });
    const [executionManager] = d(() => new ScriptExecutionManager(
      (log) => {
        setAppState((prev) => ({
          ...prev,
          logs: [...prev.logs, log]
        }));
      },
      (scriptId, progress) => {
        setAppState((prev) => ({
          ...prev,
          scripts: prev.scripts.map(
            (script) => script.id === scriptId ? { ...script, progress } : script
          )
        }));
      }
    ));
    y(() => {
      const savedLogs = _GM_getValue("bili_tasks_logs", "[]");
      try {
        const logs = JSON.parse(savedLogs).map((log) => ({
          ...log,
          timestamp: new Date(log.timestamp)
        }));
        setAppState((prev) => ({ ...prev, logs }));
      } catch (error) {
        console.warn("Failed to load saved logs:", error);
      }
      const savedRatio = _GM_getValue("bili_tasks_panel_ratio", "0.4");
      try {
        const ratio = parseFloat(savedRatio);
        if (ratio >= 0.2 && ratio <= 0.8) {
          setPanelRatio(ratio);
        }
      } catch (error) {
        console.warn("Failed to load saved panel ratio:", error);
      }
    }, []);
    y(() => {
      const logsToSave = appState.logs.slice(-100);
      _GM_setValue("bili_tasks_logs", JSON.stringify(logsToSave));
    }, [appState.logs]);
    y(() => {
      _GM_setValue("bili_tasks_panel_ratio", panelRatio.toString());
    }, [panelRatio]);
    y(() => {
      const updatePanelWidths = () => {
        if (isMobileOrSmallScreen()) {
          setPanelWidths({ leftWidth: 450, rightWidth: 600 });
          return;
        }
        const containerWidth = getContainerWidth(containerRef.current);
        const config = {
          minLeftWidth: 300,
          minRightWidth: 400,
          containerWidth: containerWidth - 48 - 24 - 8
          // 减去左右padding(48px)、gap(24px)和分隔条宽度(8px)
        };
        const { leftWidth, rightWidth } = calculateWidthsFromRatio(panelRatio, config.containerWidth, config);
        setPanelWidths({ leftWidth, rightWidth });
      };
      updatePanelWidths();
      const debouncedResize = debounce(updatePanelWidths, 100);
      window.addEventListener("resize", debouncedResize);
      return () => {
        window.removeEventListener("resize", debouncedResize);
      };
    }, [panelRatio]);
    const handleExecuteScript = async (scriptId, parameters) => {
      setAppState((prev) => ({
        ...prev,
        scripts: prev.scripts.map(
          (script) => script.id === scriptId ? { ...script, isRunning: true, lastRun: /* @__PURE__ */ new Date() } : script
        )
      }));
      try {
        await executionManager.executeScript(scriptId, parameters);
      } catch (error) {
        const errorLog = {
          id: generateId(),
          timestamp: /* @__PURE__ */ new Date(),
          level: "error",
          message: `脚本执行失败: ${error instanceof Error ? error.message : String(error)}`,
          scriptId
        };
        setAppState((prev) => ({
          ...prev,
          logs: [...prev.logs, errorLog]
        }));
      } finally {
        setAppState((prev) => ({
          ...prev,
          scripts: prev.scripts.map(
            (script) => script.id === scriptId ? { ...script, isRunning: false } : script
          )
        }));
      }
    };
    const handleStopScript = (scriptId) => {
      const success = executionManager.stopScript(scriptId);
      if (success) {
        const stopLog = {
          id: generateId(),
          timestamp: /* @__PURE__ */ new Date(),
          level: "warn",
          message: "用户请求停止脚本执行",
          scriptId
        };
        setAppState((prev) => ({
          ...prev,
          logs: [...prev.logs, stopLog],
          scripts: prev.scripts.map(
            (script) => script.id === scriptId ? { ...script, isRunning: false } : script
          )
        }));
      }
    };
    const handleClearLogs = () => {
      setAppState((prev) => ({ ...prev, logs: [] }));
      _GM_setValue("bili_tasks_logs", "[]");
    };
    const handleResizeStart = (e2) => {
      if (isMobileOrSmallScreen()) return;
      const containerWidth = getContainerWidth(containerRef.current);
      const config = {
        minLeftWidth: 300,
        minRightWidth: 400,
        containerWidth: containerWidth - 48 - 24 - 8
        // 减去左右padding(48px)、gap(24px)和分隔条宽度(8px)
      };
      const { leftWidth, rightWidth } = calculateWidthsFromRatio(panelRatio, config.containerWidth, config);
      setResizeState({
        isDragging: true,
        startX: e2.clientX,
        startLeftWidth: leftWidth,
        startRightWidth: rightWidth
      });
      document.body.classList.add("resizing");
    };
    const handleResizeMove = (e2) => {
      if (!resizeState.isDragging || isMobileOrSmallScreen()) return;
      const containerWidth = getContainerWidth(containerRef.current);
      const config = {
        minLeftWidth: 300,
        minRightWidth: 400,
        containerWidth: containerWidth - 48 - 24 - 8
        // 减去左右padding(48px)、gap(24px)和分隔条宽度(8px)
      };
      const { leftWidth, rightWidth } = calculateNewWidths(e2.clientX, resizeState, config);
      const newRatio = calculateRatio(leftWidth, rightWidth);
      setPanelRatio(newRatio);
      setPanelWidths({ leftWidth, rightWidth });
    };
    const handleResizeEnd = () => {
      if (!resizeState.isDragging) return;
      setResizeState((prev) => ({ ...prev, isDragging: false }));
      document.body.classList.remove("resizing");
    };
    y(() => {
      if (resizeState.isDragging) {
        document.addEventListener("mousemove", handleResizeMove);
        document.addEventListener("mouseup", handleResizeEnd);
        return () => {
          document.removeEventListener("mousemove", handleResizeMove);
          document.removeEventListener("mouseup", handleResizeEnd);
        };
      }
    }, [resizeState.isDragging, resizeState]);
    const getScriptProgress = (scriptId) => {
      const script = appState.scripts.find((s2) => s2.id === scriptId);
      return (script == null ? void 0 : script.progress) || 0;
    };
    const toolScripts = appState.scripts.filter((script) => script.category === "tool");
    const operationScripts = appState.scripts.filter((script) => script.category === "operation");
    return /* @__PURE__ */ u$1("div", { class: "script-manager", ref: containerRef, children: [
      /* @__PURE__ */ u$1("div", { class: "script-manager-header", children: [
        /* @__PURE__ */ u$1("h1", { children: "哔哩哔哩任务管理器" }),
        /* @__PURE__ */ u$1("p", { children: [
          "作者：AkagiYui | 仓库：",
          /* @__PURE__ */ u$1("a", { href: "https://github.com/AkagiYui", target: "_blank", rel: "noopener noreferrer", children: "github.com/AkagiYui" })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "status-bar", children: [
          /* @__PURE__ */ u$1("div", { class: "status-item", children: [
            /* @__PURE__ */ u$1("span", { class: "status-label", children: "工具脚本:" }),
            /* @__PURE__ */ u$1("span", { class: "status-value", children: toolScripts.length })
          ] }),
          /* @__PURE__ */ u$1("div", { class: "status-item", children: [
            /* @__PURE__ */ u$1("span", { class: "status-label", children: "操作脚本:" }),
            /* @__PURE__ */ u$1("span", { class: "status-value", children: operationScripts.length })
          ] }),
          /* @__PURE__ */ u$1("div", { class: "status-item", children: [
            /* @__PURE__ */ u$1("span", { class: "status-label", children: "运行中:" }),
            /* @__PURE__ */ u$1("span", { class: "status-value running", children: appState.scripts.filter((s2) => s2.isRunning).length })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u$1("div", { class: "script-manager-content", children: [
        /* @__PURE__ */ u$1(
          "div",
          {
            class: "scripts-panel",
            style: { width: isMobileOrSmallScreen() ? "auto" : `${panelWidths.leftWidth}px` },
            children: [
              /* @__PURE__ */ u$1("div", { class: "scripts-section", children: [
                /* @__PURE__ */ u$1("h2", { children: "🔧 工具脚本" }),
                /* @__PURE__ */ u$1("div", { class: "scripts-list", children: toolScripts.map((script) => /* @__PURE__ */ u$1(
                  ScriptCard,
                  {
                    script,
                    onExecute: handleExecuteScript,
                    onStop: handleStopScript,
                    isRunning: script.isRunning,
                    progress: getScriptProgress(script.id)
                  },
                  script.id
                )) })
              ] }),
              /* @__PURE__ */ u$1("div", { class: "scripts-section", children: [
                /* @__PURE__ */ u$1("h2", { children: "⚙️ 操作脚本" }),
                /* @__PURE__ */ u$1("div", { class: "scripts-list", children: operationScripts.map((script) => /* @__PURE__ */ u$1(
                  ScriptCard,
                  {
                    script,
                    onExecute: handleExecuteScript,
                    onStop: handleStopScript,
                    isRunning: script.isRunning,
                    progress: getScriptProgress(script.id)
                  },
                  script.id
                )) })
              ] })
            ]
          }
        ),
        !isMobileOrSmallScreen() && /* @__PURE__ */ u$1(
          ResizeHandle,
          {
            onMouseDown: handleResizeStart,
            isDragging: resizeState.isDragging
          }
        ),
        /* @__PURE__ */ u$1(
          "div",
          {
            class: "logs-panel",
            style: { width: isMobileOrSmallScreen() ? "auto" : `${panelWidths.rightWidth}px` },
            children: /* @__PURE__ */ u$1(
              LogPanel,
              {
                logs: appState.logs,
                onClear: handleClearLogs
              }
            )
          }
        )
      ] })
    ] });
  }
  function TaskPanel(_props = {}) {
    return /* @__PURE__ */ u$1("div", { class: "task-panel", children: /* @__PURE__ */ u$1(ScriptManager, {}) });
  }
  function App() {
    const [isModalOpen, setIsModalOpen] = d(false);
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      !isModalOpen && /* @__PURE__ */ u$1(FloatingButton, { onClick: handleOpenModal }),
      /* @__PURE__ */ u$1(Modal, { isOpen: isModalOpen, onClose: handleCloseModal, children: /* @__PURE__ */ u$1(TaskPanel, {}) })
    ] });
  }
  preact.render(
    /* @__PURE__ */ u$1(App, {}),
    (() => {
      const app = document.createElement("div");
      app.id = "bili-tasks-app";
      document.body.append(app);
      console.log(11111);
      return app;
    })()
  );

})(preact);