/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, He = Symbol(), Ye = /* @__PURE__ */ new WeakMap();
class Nt {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== He)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (qe && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ye.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ye.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const sr = (r) => new Nt(typeof r == "string" ? r : r + "", void 0, He), ar = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, o) => i + ((s) => {
    if (s._$cssResult$ === !0)
      return s.cssText;
    if (typeof s == "number")
      return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[o + 1], r[0]);
  return new Nt(t, r, He);
}, lr = (r, e) => {
  qe ? r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet) : e.forEach((t) => {
    const i = document.createElement("style"), n = window.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  });
}, et = qe ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules)
    t += i.cssText;
  return sr(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ve;
const tt = window.trustedTypes, cr = tt ? tt.emptyScript : "", rt = window.reactiveElementPolyfillSupport, Me = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? cr : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, It = (r, e) => e !== r && (e == e || r == r), me = { attribute: !0, type: String, converter: Me, reflect: !1, hasChanged: It };
class M extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(e) {
    var t;
    (t = this.h) !== null && t !== void 0 || (this.h = []), this.h.push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((t, i) => {
      const n = this._$Ep(i, t);
      n !== void 0 && (this._$Ev.set(n, i), e.push(n));
    }), e;
  }
  static createProperty(e, t = me) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const i = typeof e == "symbol" ? Symbol() : "__" + e, n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && Object.defineProperty(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    return { get() {
      return this[t];
    }, set(n) {
      const o = this[e];
      this[t] = n, this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || me;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties, i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const n of i)
        this.createProperty(n, t[n]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i)
        t.unshift(et(n));
    } else
      e !== void 0 && t.push(et(e));
    return t;
  }
  static _$Ep(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  u() {
    var e;
    this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, i;
    ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) === null || i === void 0 || i.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
    });
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return lr(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$EO(e, t, i = me) {
    var n, o;
    const s = this.constructor._$Ep(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const l = ((o = (n = i.converter) === null || n === void 0 ? void 0 : n.toAttribute) !== null && o !== void 0 ? o : Me.toAttribute)(t, i.type);
      this._$El = e, l == null ? this.removeAttribute(s) : this.setAttribute(s, l), this._$El = null;
    }
  }
  _$AK(e, t) {
    var i, n;
    const o = this.constructor, s = o._$Ev.get(e);
    if (s !== void 0 && this._$El !== s) {
      const l = o.getPropertyOptions(s), a = l.converter, u = (n = (i = a == null ? void 0 : a.fromAttribute) !== null && i !== void 0 ? i : typeof a == "function" ? a : null) !== null && n !== void 0 ? n : Me.fromAttribute;
      this._$El = s, this[s] = u(t, l.type), this._$El = null;
    }
  }
  requestUpdate(e, t, i) {
    let n = !0;
    e !== void 0 && (((i = i || this.constructor.getPropertyOptions(e)).hasChanged || It)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), i.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, i))) : n = !1), !this.isUpdatePending && n && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((n, o) => this[o] = n), this._$Ei = void 0);
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (e = this._$ES) === null || e === void 0 || e.forEach((n) => {
        var o;
        return (o = n.hostUpdate) === null || o === void 0 ? void 0 : o.call(n);
      }), this.update(i)) : this._$Ek();
    } catch (n) {
      throw t = !1, this._$Ek(), n;
    }
    t && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
      var n;
      return (n = i.hostUpdated) === null || n === void 0 ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
M.finalized = !0, M.elementProperties = /* @__PURE__ */ new Map(), M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, rt == null || rt({ ReactiveElement: M }), ((ve = globalThis.reactiveElementVersions) !== null && ve !== void 0 ? ve : globalThis.reactiveElementVersions = []).push("1.3.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ge;
const q = globalThis.trustedTypes, it = q ? q.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, x = `lit$${(Math.random() + "").slice(9)}$`, Bt = "?" + x, ur = `<${Bt}>`, H = document, G = (r = "") => H.createComment(r), Y = (r) => r === null || typeof r != "object" && typeof r != "function", Lt = Array.isArray, dr = (r) => Lt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nt = /-->/g, ot = />/g, P = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, at = /"/g, Mt = /^(?:script|style|textarea|title)$/i, hr = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), w = hr(1), F = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), lt = /* @__PURE__ */ new WeakMap(), pr = (r, e, t) => {
  var i, n;
  const o = (i = t == null ? void 0 : t.renderBefore) !== null && i !== void 0 ? i : e;
  let s = o._$litPart$;
  if (s === void 0) {
    const l = (n = t == null ? void 0 : t.renderBefore) !== null && n !== void 0 ? n : null;
    o._$litPart$ = s = new te(e.insertBefore(G(), l), l, void 0, t != null ? t : {});
  }
  return s._$AI(r), s;
}, D = H.createTreeWalker(H, 129, null, !1), fr = (r, e) => {
  const t = r.length - 1, i = [];
  let n, o = e === 2 ? "<svg>" : "", s = K;
  for (let a = 0; a < t; a++) {
    const u = r[a];
    let h, d, c = -1, f = 0;
    for (; f < u.length && (s.lastIndex = f, d = s.exec(u), d !== null); )
      f = s.lastIndex, s === K ? d[1] === "!--" ? s = nt : d[1] !== void 0 ? s = ot : d[2] !== void 0 ? (Mt.test(d[2]) && (n = RegExp("</" + d[2], "g")), s = P) : d[3] !== void 0 && (s = P) : s === P ? d[0] === ">" ? (s = n != null ? n : K, c = -1) : d[1] === void 0 ? c = -2 : (c = s.lastIndex - d[2].length, h = d[1], s = d[3] === void 0 ? P : d[3] === '"' ? at : st) : s === at || s === st ? s = P : s === nt || s === ot ? s = K : (s = P, n = void 0);
    const U = s === P && r[a + 1].startsWith("/>") ? " " : "";
    o += s === K ? u + ur : c >= 0 ? (i.push(h), u.slice(0, c) + "$lit$" + u.slice(c) + x + U) : u + x + (c === -2 ? (i.push(void 0), a) : U);
  }
  const l = o + (r[t] || "<?>") + (e === 2 ? "</svg>" : "");
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [it !== void 0 ? it.createHTML(l) : l, i];
};
class ee {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const l = e.length - 1, a = this.parts, [u, h] = fr(e, t);
    if (this.el = ee.createElement(u, i), D.currentNode = this.el.content, t === 2) {
      const d = this.el.content, c = d.firstChild;
      c.remove(), d.append(...c.childNodes);
    }
    for (; (n = D.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const d = [];
          for (const c of n.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith(x)) {
              const f = h[s++];
              if (d.push(c), f !== void 0) {
                const U = n.getAttribute(f.toLowerCase() + "$lit$").split(x), A = /([.?@])?(.*)/.exec(f);
                a.push({ type: 1, index: o, name: A[2], strings: U, ctor: A[1] === "." ? vr : A[1] === "?" ? gr : A[1] === "@" ? yr : se });
              } else
                a.push({ type: 6, index: o });
            }
          for (const c of d)
            n.removeAttribute(c);
        }
        if (Mt.test(n.tagName)) {
          const d = n.textContent.split(x), c = d.length - 1;
          if (c > 0) {
            n.textContent = q ? q.emptyScript : "";
            for (let f = 0; f < c; f++)
              n.append(d[f], G()), D.nextNode(), a.push({ type: 2, index: ++o });
            n.append(d[c], G());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === Bt)
          a.push({ type: 2, index: o });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(x, d + 1)) !== -1; )
            a.push({ type: 7, index: o }), d += x.length - 1;
        }
      o++;
    }
  }
  static createElement(e, t) {
    const i = H.createElement("template");
    return i.innerHTML = e, i;
  }
}
function j(r, e, t = r, i) {
  var n, o, s, l;
  if (e === F)
    return e;
  let a = i !== void 0 ? (n = t._$Cl) === null || n === void 0 ? void 0 : n[i] : t._$Cu;
  const u = Y(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== u && ((o = a == null ? void 0 : a._$AO) === null || o === void 0 || o.call(a, !1), u === void 0 ? a = void 0 : (a = new u(r), a._$AT(r, t, i)), i !== void 0 ? ((s = (l = t)._$Cl) !== null && s !== void 0 ? s : l._$Cl = [])[i] = a : t._$Cu = a), a !== void 0 && (e = j(r, a._$AS(r, e.values), a, i)), e;
}
class br {
  constructor(e, t) {
    this.v = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(e) {
    var t;
    const { el: { content: i }, parts: n } = this._$AD, o = ((t = e == null ? void 0 : e.creationScope) !== null && t !== void 0 ? t : H).importNode(i, !0);
    D.currentNode = o;
    let s = D.nextNode(), l = 0, a = 0, u = n[0];
    for (; u !== void 0; ) {
      if (l === u.index) {
        let h;
        u.type === 2 ? h = new te(s, s.nextSibling, this, e) : u.type === 1 ? h = new u.ctor(s, u.name, u.strings, this, e) : u.type === 6 && (h = new $r(s, this, e)), this.v.push(h), u = n[++a];
      }
      l !== (u == null ? void 0 : u.index) && (s = D.nextNode(), l++);
    }
    return o;
  }
  m(e) {
    let t = 0;
    for (const i of this.v)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class te {
  constructor(e, t, i, n) {
    var o;
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$C_ = (o = n == null ? void 0 : n.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$C_;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = j(this, e, t), Y(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== F && this.T(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.k(e) : dr(e) ? this.S(e) : this.T(e);
  }
  j(e, t = this._$AB) {
    return this._$AA.parentNode.insertBefore(e, t);
  }
  k(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.j(e));
  }
  T(e) {
    this._$AH !== m && Y(this._$AH) ? this._$AA.nextSibling.data = e : this.k(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var t;
    const { values: i, _$litType$: n } = e, o = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ee.createElement(n.h, this.options)), n);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === o)
      this._$AH.m(i);
    else {
      const s = new br(o, this), l = s.p(this.options);
      s.m(i), this.k(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = lt.get(e.strings);
    return t === void 0 && lt.set(e.strings, t = new ee(e)), t;
  }
  S(e) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const o of e)
      n === t.length ? t.push(i = new te(this.j(G()), this.j(G()), this, this.options)) : i = t[n], i._$AI(o), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$C_ = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
  }
}
class se {
  constructor(e, t, i, n, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, i, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0)
      e = j(this, e, t, 0), s = !Y(e) || e !== this._$AH && e !== F, s && (this._$AH = e);
    else {
      const l = e;
      let a, u;
      for (e = o[0], a = 0; a < o.length - 1; a++)
        u = j(this, l[i + a], t, a), u === F && (u = this._$AH[a]), s || (s = !Y(u) || u !== this._$AH[a]), u === m ? e = m : e !== m && (e += (u != null ? u : "") + o[a + 1]), this._$AH[a] = u;
    }
    s && !n && this.P(e);
  }
  P(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class vr extends se {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
const mr = q ? q.emptyScript : "";
class gr extends se {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(e) {
    e && e !== m ? this.element.setAttribute(this.name, mr) : this.element.removeAttribute(this.name);
  }
}
class yr extends se {
  constructor(e, t, i, n, o) {
    super(e, t, i, n, o), this.type = 5;
  }
  _$AI(e, t = this) {
    var i;
    if ((e = (i = j(this, e, t, 0)) !== null && i !== void 0 ? i : m) === F)
      return;
    const n = this._$AH, o = e === m && n !== m || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== m && (n === m || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class $r {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    j(this, e);
  }
}
const ct = window.litHtmlPolyfillSupport;
ct == null || ct(ee, te), ((ge = globalThis.litHtmlVersions) !== null && ge !== void 0 ? ge : globalThis.litHtmlVersions = []).push("2.2.7");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ye, $e;
class X extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, t;
    const i = super.createRenderRoot();
    return (e = (t = this.renderOptions).renderBefore) !== null && e !== void 0 || (t.renderBefore = i.firstChild), i;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pr(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return F;
  }
}
X.finalized = !0, X._$litElement$ = !0, (ye = globalThis.litElementHydrateSupport) === null || ye === void 0 || ye.call(globalThis, { LitElement: X });
const ut = globalThis.litElementPolyfillSupport;
ut == null || ut({ LitElement: X });
(($e = globalThis.litElementVersions) !== null && $e !== void 0 ? $e : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wr = (r) => (e) => typeof e == "function" ? ((t, i) => (window.customElements.define(t, i), i))(r, e) : ((t, i) => {
  const { kind: n, elements: o } = i;
  return { kind: n, elements: o, finisher(s) {
    window.customElements.define(t, s);
  } };
})(r, e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Er = (r, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(t) {
  t.createProperty(e.key, r);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(t) {
  t.createProperty(e.key, r);
} };
function $(r) {
  return (e, t) => t !== void 0 ? ((i, n, o) => {
    n.constructor.createProperty(o, i);
  })(r, e, t) : Er(r, e);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var we;
((we = window.HTMLSlotElement) === null || we === void 0 ? void 0 : we.prototype.assignedElements) != null;
const _r = (r, e) => {
  [...e.attributes].forEach((t) => {
    var i;
    r.setAttribute(t.nodeName, (i = t.nodeValue) != null ? i : "");
  });
}, Ar = () => {
  document.querySelectorAll("[data-my-wiki-el]").forEach((e) => {
    const t = document.createElement("my-element");
    _r(t, e), e != null && e.parentNode && e.parentNode.replaceChild(t, e);
  });
};
Ar();
function kr(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Dt = { exports: {} }, Fe = { exports: {} }, qt = function(e, t) {
  return function() {
    for (var n = new Array(arguments.length), o = 0; o < n.length; o++)
      n[o] = arguments[o];
    return e.apply(t, n);
  };
}, Sr = qt, je = Object.prototype.toString, ze = function(r) {
  return function(e) {
    var t = je.call(e);
    return r[t] || (r[t] = t.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function T(r) {
  return r = r.toLowerCase(), function(t) {
    return ze(t) === r;
  };
}
function We(r) {
  return Array.isArray(r);
}
function oe(r) {
  return typeof r > "u";
}
function Cr(r) {
  return r !== null && !oe(r) && r.constructor !== null && !oe(r.constructor) && typeof r.constructor.isBuffer == "function" && r.constructor.isBuffer(r);
}
var Ht = T("ArrayBuffer");
function xr(r) {
  var e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && Ht(r.buffer), e;
}
function Rr(r) {
  return typeof r == "string";
}
function Pr(r) {
  return typeof r == "number";
}
function Ft(r) {
  return r !== null && typeof r == "object";
}
function ie(r) {
  if (ze(r) !== "object")
    return !1;
  var e = Object.getPrototypeOf(r);
  return e === null || e === Object.prototype;
}
var Or = T("Date"), Tr = T("File"), Ur = T("Blob"), Nr = T("FileList");
function Ve(r) {
  return je.call(r) === "[object Function]";
}
function Ir(r) {
  return Ft(r) && Ve(r.pipe);
}
function Br(r) {
  var e = "[object FormData]";
  return r && (typeof FormData == "function" && r instanceof FormData || je.call(r) === e || Ve(r.toString) && r.toString() === e);
}
var Lr = T("URLSearchParams");
function Mr(r) {
  return r.trim ? r.trim() : r.replace(/^\s+|\s+$/g, "");
}
function Dr() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Je(r, e) {
  if (!(r === null || typeof r > "u"))
    if (typeof r != "object" && (r = [r]), We(r))
      for (var t = 0, i = r.length; t < i; t++)
        e.call(null, r[t], t, r);
    else
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && e.call(null, r[n], n, r);
}
function De() {
  var r = {};
  function e(n, o) {
    ie(r[o]) && ie(n) ? r[o] = De(r[o], n) : ie(n) ? r[o] = De({}, n) : We(n) ? r[o] = n.slice() : r[o] = n;
  }
  for (var t = 0, i = arguments.length; t < i; t++)
    Je(arguments[t], e);
  return r;
}
function qr(r, e, t) {
  return Je(e, function(n, o) {
    t && typeof n == "function" ? r[o] = Sr(n, t) : r[o] = n;
  }), r;
}
function Hr(r) {
  return r.charCodeAt(0) === 65279 && (r = r.slice(1)), r;
}
function Fr(r, e, t, i) {
  r.prototype = Object.create(e.prototype, i), r.prototype.constructor = r, t && Object.assign(r.prototype, t);
}
function jr(r, e, t) {
  var i, n, o, s = {};
  e = e || {};
  do {
    for (i = Object.getOwnPropertyNames(r), n = i.length; n-- > 0; )
      o = i[n], s[o] || (e[o] = r[o], s[o] = !0);
    r = Object.getPrototypeOf(r);
  } while (r && (!t || t(r, e)) && r !== Object.prototype);
  return e;
}
function zr(r, e, t) {
  r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= e.length;
  var i = r.indexOf(e, t);
  return i !== -1 && i === t;
}
function Wr(r) {
  if (!r)
    return null;
  var e = r.length;
  if (oe(e))
    return null;
  for (var t = new Array(e); e-- > 0; )
    t[e] = r[e];
  return t;
}
var Vr = function(r) {
  return function(e) {
    return r && e instanceof r;
  };
}(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)), g = {
  isArray: We,
  isArrayBuffer: Ht,
  isBuffer: Cr,
  isFormData: Br,
  isArrayBufferView: xr,
  isString: Rr,
  isNumber: Pr,
  isObject: Ft,
  isPlainObject: ie,
  isUndefined: oe,
  isDate: Or,
  isFile: Tr,
  isBlob: Ur,
  isFunction: Ve,
  isStream: Ir,
  isURLSearchParams: Lr,
  isStandardBrowserEnv: Dr,
  forEach: Je,
  merge: De,
  extend: qr,
  trim: Mr,
  stripBOM: Hr,
  inherits: Fr,
  toFlatObject: jr,
  kindOf: ze,
  kindOfTest: T,
  endsWith: zr,
  toArray: Wr,
  isTypedArray: Vr,
  isFileList: Nr
}, B = g;
function dt(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var jt = function(e, t, i) {
  if (!t)
    return e;
  var n;
  if (i)
    n = i(t);
  else if (B.isURLSearchParams(t))
    n = t.toString();
  else {
    var o = [];
    B.forEach(t, function(a, u) {
      a === null || typeof a > "u" || (B.isArray(a) ? u = u + "[]" : a = [a], B.forEach(a, function(d) {
        B.isDate(d) ? d = d.toISOString() : B.isObject(d) && (d = JSON.stringify(d)), o.push(dt(u) + "=" + dt(d));
      }));
    }), n = o.join("&");
  }
  if (n) {
    var s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + n;
  }
  return e;
}, Jr = g;
function ae() {
  this.handlers = [];
}
ae.prototype.use = function(e, t, i) {
  return this.handlers.push({
    fulfilled: e,
    rejected: t,
    synchronous: i ? i.synchronous : !1,
    runWhen: i ? i.runWhen : null
  }), this.handlers.length - 1;
};
ae.prototype.eject = function(e) {
  this.handlers[e] && (this.handlers[e] = null);
};
ae.prototype.forEach = function(e) {
  Jr.forEach(this.handlers, function(i) {
    i !== null && e(i);
  });
};
var Qr = ae, Zr = g, Kr = function(e, t) {
  Zr.forEach(e, function(n, o) {
    o !== t && o.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[o]);
  });
}, zt = g;
function z(r, e, t, i, n) {
  Error.call(this), this.message = r, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), i && (this.request = i), n && (this.response = n);
}
zt.inherits(z, Error, {
  toJSON: function() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var Wt = z.prototype, Vt = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(r) {
  Vt[r] = { value: r };
});
Object.defineProperties(z, Vt);
Object.defineProperty(Wt, "isAxiosError", { value: !0 });
z.from = function(r, e, t, i, n, o) {
  var s = Object.create(Wt);
  return zt.toFlatObject(r, s, function(a) {
    return a !== Error.prototype;
  }), z.call(s, r.message, e, t, i, n), s.name = r.name, o && Object.assign(s, o), s;
};
var V = z, Jt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, S = g;
function Xr(r, e) {
  e = e || new FormData();
  var t = [];
  function i(o) {
    return o === null ? "" : S.isDate(o) ? o.toISOString() : S.isArrayBuffer(o) || S.isTypedArray(o) ? typeof Blob == "function" ? new Blob([o]) : Buffer.from(o) : o;
  }
  function n(o, s) {
    if (S.isPlainObject(o) || S.isArray(o)) {
      if (t.indexOf(o) !== -1)
        throw Error("Circular reference detected in " + s);
      t.push(o), S.forEach(o, function(a, u) {
        if (!S.isUndefined(a)) {
          var h = s ? s + "." + u : u, d;
          if (a && !s && typeof a == "object") {
            if (S.endsWith(u, "{}"))
              a = JSON.stringify(a);
            else if (S.endsWith(u, "[]") && (d = S.toArray(a))) {
              d.forEach(function(c) {
                !S.isUndefined(c) && e.append(h, i(c));
              });
              return;
            }
          }
          n(a, h);
        }
      }), t.pop();
    } else
      e.append(s, i(o));
  }
  return n(r), e;
}
var Qt = Xr, Ee, ht;
function Gr() {
  if (ht)
    return Ee;
  ht = 1;
  var r = V;
  return Ee = function(t, i, n) {
    var o = n.config.validateStatus;
    !n.status || !o || o(n.status) ? t(n) : i(new r(
      "Request failed with status code " + n.status,
      [r.ERR_BAD_REQUEST, r.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
      n.config,
      n.request,
      n
    ));
  }, Ee;
}
var _e, pt;
function Yr() {
  if (pt)
    return _e;
  pt = 1;
  var r = g;
  return _e = r.isStandardBrowserEnv() ? function() {
    return {
      write: function(i, n, o, s, l, a) {
        var u = [];
        u.push(i + "=" + encodeURIComponent(n)), r.isNumber(o) && u.push("expires=" + new Date(o).toGMTString()), r.isString(s) && u.push("path=" + s), r.isString(l) && u.push("domain=" + l), a === !0 && u.push("secure"), document.cookie = u.join("; ");
      },
      read: function(i) {
        var n = document.cookie.match(new RegExp("(^|;\\s*)(" + i + ")=([^;]*)"));
        return n ? decodeURIComponent(n[3]) : null;
      },
      remove: function(i) {
        this.write(i, "", Date.now() - 864e5);
      }
    };
  }() : function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }(), _e;
}
var ei = function(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}, ti = function(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}, ri = ei, ii = ti, Zt = function(e, t) {
  return e && !ri(t) ? ii(e, t) : t;
}, Ae, ft;
function ni() {
  if (ft)
    return Ae;
  ft = 1;
  var r = g, e = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  return Ae = function(i) {
    var n = {}, o, s, l;
    return i && r.forEach(i.split(`
`), function(u) {
      if (l = u.indexOf(":"), o = r.trim(u.substr(0, l)).toLowerCase(), s = r.trim(u.substr(l + 1)), o) {
        if (n[o] && e.indexOf(o) >= 0)
          return;
        o === "set-cookie" ? n[o] = (n[o] ? n[o] : []).concat([s]) : n[o] = n[o] ? n[o] + ", " + s : s;
      }
    }), n;
  }, Ae;
}
var ke, bt;
function oi() {
  if (bt)
    return ke;
  bt = 1;
  var r = g;
  return ke = r.isStandardBrowserEnv() ? function() {
    var t = /(msie|trident)/i.test(navigator.userAgent), i = document.createElement("a"), n;
    function o(s) {
      var l = s;
      return t && (i.setAttribute("href", l), l = i.href), i.setAttribute("href", l), {
        href: i.href,
        protocol: i.protocol ? i.protocol.replace(/:$/, "") : "",
        host: i.host,
        search: i.search ? i.search.replace(/^\?/, "") : "",
        hash: i.hash ? i.hash.replace(/^#/, "") : "",
        hostname: i.hostname,
        port: i.port,
        pathname: i.pathname.charAt(0) === "/" ? i.pathname : "/" + i.pathname
      };
    }
    return n = o(window.location.href), function(l) {
      var a = r.isString(l) ? o(l) : l;
      return a.protocol === n.protocol && a.host === n.host;
    };
  }() : function() {
    return function() {
      return !0;
    };
  }(), ke;
}
var Se, vt;
function le() {
  if (vt)
    return Se;
  vt = 1;
  var r = V, e = g;
  function t(i) {
    r.call(this, i == null ? "canceled" : i, r.ERR_CANCELED), this.name = "CanceledError";
  }
  return e.inherits(t, r, {
    __CANCEL__: !0
  }), Se = t, Se;
}
var Ce, mt;
function si() {
  return mt || (mt = 1, Ce = function(e) {
    var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return t && t[1] || "";
  }), Ce;
}
var xe, gt;
function yt() {
  if (gt)
    return xe;
  gt = 1;
  var r = g, e = Gr(), t = Yr(), i = jt, n = Zt, o = ni(), s = oi(), l = Jt, a = V, u = le(), h = si();
  return xe = function(c) {
    return new Promise(function(U, A) {
      var J = c.data, Q = c.headers, Z = c.responseType, N;
      function Ke() {
        c.cancelToken && c.cancelToken.unsubscribe(N), c.signal && c.signal.removeEventListener("abort", N);
      }
      r.isFormData(J) && r.isStandardBrowserEnv() && delete Q["Content-Type"];
      var p = new XMLHttpRequest();
      if (c.auth) {
        var ir = c.auth.username || "", nr = c.auth.password ? unescape(encodeURIComponent(c.auth.password)) : "";
        Q.Authorization = "Basic " + btoa(ir + ":" + nr);
      }
      var pe = n(c.baseURL, c.url);
      p.open(c.method.toUpperCase(), i(pe, c.params, c.paramsSerializer), !0), p.timeout = c.timeout;
      function Xe() {
        if (!!p) {
          var k = "getAllResponseHeaders" in p ? o(p.getAllResponseHeaders()) : null, I = !Z || Z === "text" || Z === "json" ? p.responseText : p.response, R = {
            data: I,
            status: p.status,
            statusText: p.statusText,
            headers: k,
            config: c,
            request: p
          };
          e(function(be) {
            U(be), Ke();
          }, function(be) {
            A(be), Ke();
          }, R), p = null;
        }
      }
      if ("onloadend" in p ? p.onloadend = Xe : p.onreadystatechange = function() {
        !p || p.readyState !== 4 || p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0) || setTimeout(Xe);
      }, p.onabort = function() {
        !p || (A(new a("Request aborted", a.ECONNABORTED, c, p)), p = null);
      }, p.onerror = function() {
        A(new a("Network Error", a.ERR_NETWORK, c, p, p)), p = null;
      }, p.ontimeout = function() {
        var I = c.timeout ? "timeout of " + c.timeout + "ms exceeded" : "timeout exceeded", R = c.transitional || l;
        c.timeoutErrorMessage && (I = c.timeoutErrorMessage), A(new a(
          I,
          R.clarifyTimeoutError ? a.ETIMEDOUT : a.ECONNABORTED,
          c,
          p
        )), p = null;
      }, r.isStandardBrowserEnv()) {
        var Ge = (c.withCredentials || s(pe)) && c.xsrfCookieName ? t.read(c.xsrfCookieName) : void 0;
        Ge && (Q[c.xsrfHeaderName] = Ge);
      }
      "setRequestHeader" in p && r.forEach(Q, function(I, R) {
        typeof J > "u" && R.toLowerCase() === "content-type" ? delete Q[R] : p.setRequestHeader(R, I);
      }), r.isUndefined(c.withCredentials) || (p.withCredentials = !!c.withCredentials), Z && Z !== "json" && (p.responseType = c.responseType), typeof c.onDownloadProgress == "function" && p.addEventListener("progress", c.onDownloadProgress), typeof c.onUploadProgress == "function" && p.upload && p.upload.addEventListener("progress", c.onUploadProgress), (c.cancelToken || c.signal) && (N = function(k) {
        !p || (A(!k || k && k.type ? new u() : k), p.abort(), p = null);
      }, c.cancelToken && c.cancelToken.subscribe(N), c.signal && (c.signal.aborted ? N() : c.signal.addEventListener("abort", N))), J || (J = null);
      var fe = h(pe);
      if (fe && ["http", "https", "file"].indexOf(fe) === -1) {
        A(new a("Unsupported protocol " + fe + ":", a.ERR_BAD_REQUEST, c));
        return;
      }
      p.send(J);
    });
  }, xe;
}
var Re, $t;
function ai() {
  return $t || ($t = 1, Re = null), Re;
}
var v = g, wt = Kr, Et = V, li = Jt, ci = Qt, ui = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function _t(r, e) {
  !v.isUndefined(r) && v.isUndefined(r["Content-Type"]) && (r["Content-Type"] = e);
}
function di() {
  var r;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (r = yt()), r;
}
function hi(r, e, t) {
  if (v.isString(r))
    try {
      return (e || JSON.parse)(r), v.trim(r);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (t || JSON.stringify)(r);
}
var ce = {
  transitional: li,
  adapter: di(),
  transformRequest: [function(e, t) {
    if (wt(t, "Accept"), wt(t, "Content-Type"), v.isFormData(e) || v.isArrayBuffer(e) || v.isBuffer(e) || v.isStream(e) || v.isFile(e) || v.isBlob(e))
      return e;
    if (v.isArrayBufferView(e))
      return e.buffer;
    if (v.isURLSearchParams(e))
      return _t(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString();
    var i = v.isObject(e), n = t && t["Content-Type"], o;
    if ((o = v.isFileList(e)) || i && n === "multipart/form-data") {
      var s = this.env && this.env.FormData;
      return ci(o ? { "files[]": e } : e, s && new s());
    } else if (i || n === "application/json")
      return _t(t, "application/json"), hi(e);
    return e;
  }],
  transformResponse: [function(e) {
    var t = this.transitional || ce.transitional, i = t && t.silentJSONParsing, n = t && t.forcedJSONParsing, o = !i && this.responseType === "json";
    if (o || n && v.isString(e) && e.length)
      try {
        return JSON.parse(e);
      } catch (s) {
        if (o)
          throw s.name === "SyntaxError" ? Et.from(s, Et.ERR_BAD_RESPONSE, this, null, this.response) : s;
      }
    return e;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ai()
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
v.forEach(["delete", "get", "head"], function(e) {
  ce.headers[e] = {};
});
v.forEach(["post", "put", "patch"], function(e) {
  ce.headers[e] = v.merge(ui);
});
var Qe = ce, pi = g, fi = Qe, bi = function(e, t, i) {
  var n = this || fi;
  return pi.forEach(i, function(s) {
    e = s.call(n, e, t);
  }), e;
}, Pe, At;
function Kt() {
  return At || (At = 1, Pe = function(e) {
    return !!(e && e.__CANCEL__);
  }), Pe;
}
var kt = g, Oe = bi, vi = Kt(), mi = Qe, gi = le();
function Te(r) {
  if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted)
    throw new gi();
}
var yi = function(e) {
  Te(e), e.headers = e.headers || {}, e.data = Oe.call(
    e,
    e.data,
    e.headers,
    e.transformRequest
  ), e.headers = kt.merge(
    e.headers.common || {},
    e.headers[e.method] || {},
    e.headers
  ), kt.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(n) {
      delete e.headers[n];
    }
  );
  var t = e.adapter || mi.adapter;
  return t(e).then(function(n) {
    return Te(e), n.data = Oe.call(
      e,
      n.data,
      n.headers,
      e.transformResponse
    ), n;
  }, function(n) {
    return vi(n) || (Te(e), n && n.response && (n.response.data = Oe.call(
      e,
      n.response.data,
      n.response.headers,
      e.transformResponse
    ))), Promise.reject(n);
  });
}, _ = g, Xt = function(e, t) {
  t = t || {};
  var i = {};
  function n(h, d) {
    return _.isPlainObject(h) && _.isPlainObject(d) ? _.merge(h, d) : _.isPlainObject(d) ? _.merge({}, d) : _.isArray(d) ? d.slice() : d;
  }
  function o(h) {
    if (_.isUndefined(t[h])) {
      if (!_.isUndefined(e[h]))
        return n(void 0, e[h]);
    } else
      return n(e[h], t[h]);
  }
  function s(h) {
    if (!_.isUndefined(t[h]))
      return n(void 0, t[h]);
  }
  function l(h) {
    if (_.isUndefined(t[h])) {
      if (!_.isUndefined(e[h]))
        return n(void 0, e[h]);
    } else
      return n(void 0, t[h]);
  }
  function a(h) {
    if (h in t)
      return n(e[h], t[h]);
    if (h in e)
      return n(void 0, e[h]);
  }
  var u = {
    url: s,
    method: s,
    data: s,
    baseURL: l,
    transformRequest: l,
    transformResponse: l,
    paramsSerializer: l,
    timeout: l,
    timeoutMessage: l,
    withCredentials: l,
    adapter: l,
    responseType: l,
    xsrfCookieName: l,
    xsrfHeaderName: l,
    onUploadProgress: l,
    onDownloadProgress: l,
    decompress: l,
    maxContentLength: l,
    maxBodyLength: l,
    beforeRedirect: l,
    transport: l,
    httpAgent: l,
    httpsAgent: l,
    cancelToken: l,
    socketPath: l,
    responseEncoding: l,
    validateStatus: a
  };
  return _.forEach(Object.keys(e).concat(Object.keys(t)), function(d) {
    var c = u[d] || o, f = c(d);
    _.isUndefined(f) && c !== a || (i[d] = f);
  }), i;
}, Ue, St;
function Gt() {
  return St || (St = 1, Ue = {
    version: "0.27.2"
  }), Ue;
}
var $i = Gt().version, C = V, Ze = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(r, e) {
  Ze[r] = function(i) {
    return typeof i === r || "a" + (e < 1 ? "n " : " ") + r;
  };
});
var Ct = {};
Ze.transitional = function(e, t, i) {
  function n(o, s) {
    return "[Axios v" + $i + "] Transitional option '" + o + "'" + s + (i ? ". " + i : "");
  }
  return function(o, s, l) {
    if (e === !1)
      throw new C(
        n(s, " has been removed" + (t ? " in " + t : "")),
        C.ERR_DEPRECATED
      );
    return t && !Ct[s] && (Ct[s] = !0, console.warn(
      n(
        s,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(o, s, l) : !0;
  };
};
function wi(r, e, t) {
  if (typeof r != "object")
    throw new C("options must be an object", C.ERR_BAD_OPTION_VALUE);
  for (var i = Object.keys(r), n = i.length; n-- > 0; ) {
    var o = i[n], s = e[o];
    if (s) {
      var l = r[o], a = l === void 0 || s(l, o, r);
      if (a !== !0)
        throw new C("option " + o + " must be " + a, C.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new C("Unknown option " + o, C.ERR_BAD_OPTION);
  }
}
var Ei = {
  assertOptions: wi,
  validators: Ze
}, Yt = g, _i = jt, xt = Qr, Rt = yi, ue = Xt, Ai = Zt, er = Ei, L = er.validators;
function W(r) {
  this.defaults = r, this.interceptors = {
    request: new xt(),
    response: new xt()
  };
}
W.prototype.request = function(e, t) {
  typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = ue(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var i = t.transitional;
  i !== void 0 && er.assertOptions(i, {
    silentJSONParsing: L.transitional(L.boolean),
    forcedJSONParsing: L.transitional(L.boolean),
    clarifyTimeoutError: L.transitional(L.boolean)
  }, !1);
  var n = [], o = !0;
  this.interceptors.request.forEach(function(f) {
    typeof f.runWhen == "function" && f.runWhen(t) === !1 || (o = o && f.synchronous, n.unshift(f.fulfilled, f.rejected));
  });
  var s = [];
  this.interceptors.response.forEach(function(f) {
    s.push(f.fulfilled, f.rejected);
  });
  var l;
  if (!o) {
    var a = [Rt, void 0];
    for (Array.prototype.unshift.apply(a, n), a = a.concat(s), l = Promise.resolve(t); a.length; )
      l = l.then(a.shift(), a.shift());
    return l;
  }
  for (var u = t; n.length; ) {
    var h = n.shift(), d = n.shift();
    try {
      u = h(u);
    } catch (c) {
      d(c);
      break;
    }
  }
  try {
    l = Rt(u);
  } catch (c) {
    return Promise.reject(c);
  }
  for (; s.length; )
    l = l.then(s.shift(), s.shift());
  return l;
};
W.prototype.getUri = function(e) {
  e = ue(this.defaults, e);
  var t = Ai(e.baseURL, e.url);
  return _i(t, e.params, e.paramsSerializer);
};
Yt.forEach(["delete", "get", "head", "options"], function(e) {
  W.prototype[e] = function(t, i) {
    return this.request(ue(i || {}, {
      method: e,
      url: t,
      data: (i || {}).data
    }));
  };
});
Yt.forEach(["post", "put", "patch"], function(e) {
  function t(i) {
    return function(o, s, l) {
      return this.request(ue(l || {}, {
        method: e,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  W.prototype[e] = t(), W.prototype[e + "Form"] = t(!0);
});
var ki = W, Ne, Pt;
function Si() {
  if (Pt)
    return Ne;
  Pt = 1;
  var r = le();
  function e(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    var i;
    this.promise = new Promise(function(s) {
      i = s;
    });
    var n = this;
    this.promise.then(function(o) {
      if (!!n._listeners) {
        var s, l = n._listeners.length;
        for (s = 0; s < l; s++)
          n._listeners[s](o);
        n._listeners = null;
      }
    }), this.promise.then = function(o) {
      var s, l = new Promise(function(a) {
        n.subscribe(a), s = a;
      }).then(o);
      return l.cancel = function() {
        n.unsubscribe(s);
      }, l;
    }, t(function(s) {
      n.reason || (n.reason = new r(s), i(n.reason));
    });
  }
  return e.prototype.throwIfRequested = function() {
    if (this.reason)
      throw this.reason;
  }, e.prototype.subscribe = function(i) {
    if (this.reason) {
      i(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(i) : this._listeners = [i];
  }, e.prototype.unsubscribe = function(i) {
    if (!!this._listeners) {
      var n = this._listeners.indexOf(i);
      n !== -1 && this._listeners.splice(n, 1);
    }
  }, e.source = function() {
    var i, n = new e(function(s) {
      i = s;
    });
    return {
      token: n,
      cancel: i
    };
  }, Ne = e, Ne;
}
var Ie, Ot;
function Ci() {
  return Ot || (Ot = 1, Ie = function(e) {
    return function(i) {
      return e.apply(null, i);
    };
  }), Ie;
}
var Be, Tt;
function xi() {
  if (Tt)
    return Be;
  Tt = 1;
  var r = g;
  return Be = function(t) {
    return r.isObject(t) && t.isAxiosError === !0;
  }, Be;
}
var Ut = g, Ri = qt, ne = ki, Pi = Xt, Oi = Qe;
function tr(r) {
  var e = new ne(r), t = Ri(ne.prototype.request, e);
  return Ut.extend(t, ne.prototype, e), Ut.extend(t, e), t.create = function(n) {
    return tr(Pi(r, n));
  }, t;
}
var E = tr(Oi);
E.Axios = ne;
E.CanceledError = le();
E.CancelToken = Si();
E.isCancel = Kt();
E.VERSION = Gt().version;
E.toFormData = Qt;
E.AxiosError = V;
E.Cancel = E.CanceledError;
E.all = function(e) {
  return Promise.all(e);
};
E.spread = Ci();
E.isAxiosError = xi();
Fe.exports = E;
Fe.exports.default = E;
(function(r) {
  r.exports = Fe.exports;
})(Dt);
const de = /* @__PURE__ */ kr(Dt.exports), he = {
  wikiRestApiUrl: (r) => `https://${r}.wikipedia.org/api/rest_v1/page`,
  wikiRestApiUrl2: (r) => `https://${r}.wikipedia.org/w/rest.php/v1/page`,
  wikiActionApiUrl: (r) => `https://${r}.wikipedia.org/w/api.php?action=query&format=json&lllimit=500&origin=*`,
  wikidataActionApiUrl: "https://www.wikidata.org/w/api.php?action=wbgetentities&props=sitelinks&format=json&origin=*"
}, rr = (r) => r.replace(/ /g, "_"), O = (r, e) => {
  if (!r || !e)
    return "";
  const t = rr(r);
  return `${he.wikiRestApiUrl(e)}/summary/${t}`;
}, Ti = async (r, e) => {
  var i, n, o;
  const t = await de.get(`${he.wikiActionApiUrl(e)}&prop=langlinks&pageids=${r}`).catch(() => null);
  return (o = (n = (i = t == null ? void 0 : t.data) == null ? void 0 : i.query) == null ? void 0 : n.pages) == null ? void 0 : o[r];
}, Ui = async (r, e) => {
  if (!r || !e)
    return [];
  const t = rr(r), i = await de.get(`${he.wikiRestApiUrl2(e)}/${t}/links/language`).catch(() => null);
  return i == null ? void 0 : i.data;
}, Ni = async (r) => {
  var n, o;
  const e = r.toUpperCase();
  return (o = (n = (await de.get(`${he.wikidataActionApiUrl}&ids=${e}`)).data.entities) == null ? void 0 : n[e]) == null ? void 0 : o.sitelinks;
}, Ii = async (r) => r ? (await de.get(r)).data : null, Bi = (r) => {
  let e;
  try {
    return e = new URL(r), e;
  } catch {
    return null;
  }
}, Li = (r, e = 300) => {
  let t;
  return (...i) => {
    t || r.apply(void 0, i), clearTimeout(t), t = setTimeout(() => {
      t = void 0;
    }, e);
  };
}, Le = () => {
  document.activeElement instanceof HTMLElement && document.activeElement.blur();
}, Mi = () => document.documentElement.lang || "nl", { language: Di } = new Intl.Locale(Mi()), re = {
  en: {
    info: {
      description: `This tool makes it easy to embed Wikipedia summaries into your website. To get started include the script into your website, then search for your desired Wikipedia article. 
			Copy the HTML code and paste it into a page. The article will be shown in the language of the website (if available).`,
      descriptionForZender: `If you're using this tool for "Zender" then just copy the JSON code into the CMS.`,
      btnText: "copy script",
      btnClickFeedback: "script copied!"
    },
    search: {
      inputPlaceholder: "Enter a Q-ID or a wikipedia page url",
      btnText: "Show code & preview"
    },
    imgPosition: {
      title: "Where should the image be positioned?",
      optionLeft: "On the left",
      optionRight: "On the right",
      optionBottom: "Under text",
      optionNoImg: "Hide image",
      noImgAvailable: "No image availabe"
    },
    code: {
      title: "Code",
      btnText: "copy code",
      btnClickFeedback: "Code copied!"
    },
    preview: {
      title: "Preview",
      readMore: "Read more"
    },
    errors: {
      invalid: "Please enter a valid Q-ID or a Wikipedia url.",
      notSupported: "Could not find the english version of this Wikipedia article."
    }
  },
  nl: {
    info: {
      description: `Deze site maakt het gemakkelijk om Wikipedia samenvattingen toe te voegen in uw website. 
			Om te starten moet u de onderstaande script kopi\xEBren en in uw site plakken, daarna zoekt u uw gewenste Wikipedia artikel en kopi\xEBrt u de HTML code in een pagina. 
			Het artikel zal in de taal van uw website weergegeven worden (indien beschikbaar).`,
      descriptionForZender: 'Als u deze toepassing gebruikt voor "Zender", dan moet u alleen de JSON code kopi\xEBren en plakken in het gewenste CMS.',
      btnText: "kopi\xEBr script",
      btnClickFeedback: "script gekopieerd!"
    },
    search: {
      inputPlaceholder: "Vul een Q-ID of een wikipedia pagina url",
      btnText: "Toon code & voorbeeld"
    },
    imgPosition: {
      title: "Waar moet de afbeelding gepositioneerd worden?",
      optionLeft: "Links",
      optionRight: "Rechts",
      optionBottom: "Van onder",
      optionNoImg: "Verberg afbeelding",
      noImgAvailable: "Geen afbeelding beschikbaar"
    },
    code: {
      title: "Code",
      btnText: "kopi\xEBr code",
      btnClickFeedback: "Code gekopieerd!"
    },
    preview: {
      title: "Voorbeeld",
      readMore: "Lees meer"
    },
    errors: {
      invalid: "Gelieve een geldig Q-ID of een wikipedia url in te geven.",
      notSupported: "Nederlandse versie van dit artikel kon niet teruggevonden worden."
    }
  }
}, qi = ar`
	:host {
		display: block;
		padding: 1rem;
	}

	.container {
		max-width: 50rem;
		margin: 0 auto;
	}

	.wiki-config {
		margin-bottom: 2rem;
	}
	.wiki-input {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem 2rem;
	}

	@media only screen and (min-width: 600px) {
		.wiki-input {
			grid-template-columns: 1fr auto auto;
			grid-column-gap: 1rem;
		}
	}
	.content-container {
		display: grid;
		grid-template-columns: minmax(min-content, max-content) auto;
		grid-template-rows: auto;
		grid-column-gap: 1rem;
		grid-row-gap: 1rem;
	}

	.content {
		grid-area: content;
	}
	.content-title {
		margin-top: 0;
	}

	.thumbnail {
		grid-area: thumbnail;
	}
	.thumbnail img {
		width: 100%;
	}

	.read-more {
		grid-area: read-more;
	}

	.img-left {
		grid-template-areas:
			'thumbnail content'
			'read-more read-more';
	}

	.img-right {
		grid-template-areas:
			'content thumbnail'
			'read-more read-more';
	}

	.img-bottom {
		grid-template-areas:
			'content'
			'thumbnail'
			'read-more';
	}

	.no-img {
		grid-template-areas:
			'content'
			'read-more';
	}

	.code-block {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 0.75rem;
		margin-bottom: 2rem;
		background: #eeeeee;
		border-radius: 0.3rem;
	}

	.search-input {
		display: block;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #212529;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 0.3rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}

	.invalid-input-feedback {
		color: #dc3545;
		margin-top: 0.25rem;
	}

	/* Bootsrap css */
	.btn {
		--bs-btn-padding-x: 0.75rem;
		--bs-btn-padding-y: 0.375rem;
		--bs-btn-font-size: 1rem;
		--bs-btn-font-weight: 400;
		--bs-btn-line-height: 1.5;
		--bs-btn-border-width: 1px;
		--bs-btn-border-radius: 0.3rem;
		--bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
		--bs-btn-disabled-opacity: 0.65;
		--bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), 0.5);
		display: inline-block;
		padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
		font-family: var(--bs-btn-font-family);
		font-size: var(--bs-btn-font-size);
		font-weight: var(--bs-btn-font-weight);
		line-height: var(--bs-btn-line-height);
		color: var(--bs-btn-color);
		text-align: center;
		text-decoration: none;
		vertical-align: middle;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
		border-radius: var(--bs-btn-border-radius);
		background-color: var(--bs-btn-bg);
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
	}
	.btn:focus {
		color: var(--bs-btn-hover-color);
		background-color: var(--bs-btn-hover-bg);
		border-color: var(--bs-btn-hover-border-color);
		outline: 0;
		box-shadow: var(--bs-btn-focus-box-shadow);
	}

	.btn-outline {
		border: 1px solid #212529;
	}

	.btn-outline:hover {
		color: #fff;
		background-color: #212529;
		border-color: #212529;
	}

	.search-btn {
		--bs-btn-color: #fff;
		--bs-btn-bg: #212529;
		--bs-btn-border-color: #212529;
		--bs-btn-hover-color: #fff;
		--bs-btn-hover-bg: #424649;
		--bs-btn-hover-border-color: #373b3e;
		--bs-btn-focus-shadow-rgb: 66, 70, 73;
		--bs-btn-active-color: #fff;
		--bs-btn-active-bg: #4d5154;
		--bs-btn-active-border-color: #373b3e;
		--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
		--bs-btn-disabled-color: #fff;
		--bs-btn-disabled-bg: #212529;
		--bs-btn-disabled-border-color: #212529;
	}

	.search-btn:hover {
		color: var(--bs-btn-hover-color);
		background-color: var(--bs-btn-hover-bg);
		border-color: var(--bs-btn-hover-border-color);
	}

	.btn-code-copy {
		--bs-btn-color: #212529;
		--bs-btn-border-color: #212529;
		--bs-btn-hover-color: #fff;
		--bs-btn-hover-bg: #212529;
		--bs-btn-hover-border-color: #212529;
		--bs-btn-focus-shadow-rgb: 33, 37, 41;
		--bs-btn-active-color: #fff;
		--bs-btn-active-bg: #212529;
		--bs-btn-active-border-color: #212529;
		--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
		--bs-btn-disabled-color: #212529;
		--bs-btn-disabled-bg: transparent;
		--bs-btn-disabled-border-color: #212529;
		--bs-gradient: none;

		--bs-btn-padding-x: 0.5rem;
		--bs-btn-font-size: 0.85rem;
		--bs-btn-line-height: 1;
	}

	.btn-code-copy:hover {
		cursor: pointer;

		color: var(--bs-btn-hover-color);
		background-color: var(--bs-btn-hover-bg);
		border-color: var(--bs-btn-hover-border-color);
	}
	.nav-tabs {
		--bs-nav-tabs-border-width: 1px;
		--bs-nav-tabs-border-radius: 0.375rem;
		--bs-nav-tabs-link-hover-border-color: #e9ecef #e9ecef #dee2e6;
		--bs-nav-tabs-link-active-color: #495057;
		--bs-nav-tabs-link-active-bg: #fff;
		--bs-nav-tabs-link-active-border-color: #dee2e6 #dee2e6 #fff;
		border-bottom: var(--bs-nav-tabs-border-width) solid var(--bs-nav-tabs-border-color);
	}

	.nav {
		--bs-nav-link-padding-x: 1rem;
		--bs-nav-link-padding-y: 0.5rem;
		--bs-nav-link-font-weight: ;
		--bs-nav-link-color: var(--bs-link-color);
		--bs-nav-link-hover-color: var(--bs-link-hover-color);
		--bs-nav-link-disabled-color: #6c757d;
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		margin-bottom: 0;
		list-style: none;
		margin-bottom: 1px;
	}

	.nav-tabs .nav-link {
		margin-bottom: calc(-1 * var(--bs-nav-tabs-border-width));
		background: 0 0;
		border: var(--bs-nav-tabs-border-width) solid transparent;
		border-top-left-radius: var(--bs-nav-tabs-border-radius);
		border-top-right-radius: var(--bs-nav-tabs-border-radius);
	}

	.nav-link {
		display: block;
		padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
		font-size: var(--bs-nav-link-font-size);
		font-weight: var(--bs-nav-link-font-weight);
		color: var(--bs-nav-link-color);
		text-decoration: none;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
		cursor: pointer;
	}

	.nav-link.active {
		color: var(--bs-nav-tabs-link-active-color);
		background-color: var(--bs-nav-tabs-link-active-bg);
		border-color: var(--bs-nav-tabs-link-active-border-color);
	}

	.nav-tabs .nav-link:hover {
		isolation: isolate;
		border-color: var(--bs-nav-tabs-link-hover-border-color);
	}

	.width-border {
		--bs-nav-tabs-border-width: 1px;
		--bs-nav-tabs-border-color: #dee2e6;
	}
`;
var Hi = Object.defineProperty, Fi = Object.getOwnPropertyDescriptor, y = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Fi(e, t) : e, o = r.length - 1, s; o >= 0; o--)
    (s = r[o]) && (n = (i ? s(e, t, n) : s(n)) || n);
  return i && n && Hi(e, t, n), n;
};
let b = class extends X {
  constructor() {
    super(...arguments), this.isConfigMode = !1, this.searchValue = "", this.qId = "", this.outputSource = "", this.isSourceInJson = !0, this.showCodeCopiedFeedback = !1, this.showScriptCopiedFeedback = !1, this.showInfoSection = !1, this.title = "", this.description = "", this.thumbnail = { source: "", height: 0, width: 0 }, this.imgPosition = "img-left", this.pageSource = "", this.errorMessage = "", this.activeLanguage = Di, this.content = this.activeLanguage === "nl" ? re.nl : re.en, this.radioGroup = [
      {
        id: "img-left",
        label: this.content.imgPosition.optionLeft
      },
      {
        id: "img-right",
        label: this.content.imgPosition.optionRight
      },
      {
        id: "img-bottom",
        label: this.content.imgPosition.optionBottom
      },
      {
        id: "no-img",
        label: this.content.imgPosition.optionNoImg
      }
    ], this.cdnScript = '<script type="module" src="https://cdn.jsdelivr.net/gh/studiohyperdrive/studiohyperdrive-zender-wiki-embed@release/stable/dist/zender-wiki-embed.min.js"><\/script>', this.debouncedFetchWiki = Li(() => this.fetchWiki());
  }
  updated(r) {
    !this.isConfigMode && r.has("isConfigMode") && this.fetchWiki(), !r.has("outputSource") && !r.has("searchValue") && this.generateOutputCode(), this.isConfigMode && r.has("activeLanguage") && r.get("activeLanguage") && (this.content = this.activeLanguage === "nl" ? re.nl : re.en, this.radioGroup = [
      {
        id: "img-left",
        label: this.content.imgPosition.optionLeft
      },
      {
        id: "img-right",
        label: this.content.imgPosition.optionRight
      },
      {
        id: "img-bottom",
        label: this.content.imgPosition.optionBottom
      },
      {
        id: "no-img",
        label: this.content.imgPosition.optionNoImg
      }
    ], this.qId && this.debouncedFetchWiki());
  }
  async getWikiByPageIdUrl(r, e) {
    var l;
    const t = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org/i, [, , , i] = r.match(t) || [], n = await Ti(e, i);
    if (!n) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    if (i === this.activeLanguage)
      return O(n.title, i);
    const o = (l = n == null ? void 0 : n.langlinks) == null ? void 0 : l.find(({ lang: a }) => a === this.activeLanguage);
    let s;
    return o ? s = O(o == null ? void 0 : o["*"], o == null ? void 0 : o.lang) : (this.errorMessage = this.content.errors.notSupported, s = O(n.title, i)), s;
  }
  async getWikiByTitleUrl(r) {
    const e = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org\/wiki\/([^/]+)/, [, , , t, i] = r.match(e) || [];
    if (t === this.activeLanguage)
      return O(i, t);
    const n = await Ui(i, t);
    if (!n) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    const o = n.find(({ code: l }) => l === this.activeLanguage);
    let s;
    return o ? s = O(o == null ? void 0 : o.title, o == null ? void 0 : o.code) : (s = O(i, t), this.errorMessage = this.content.errors.notSupported), s;
  }
  async getWikiByurl(r) {
    const e = Bi(r);
    if (!e) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    const t = e.searchParams.get("curid");
    return t ? this.getWikiByPageIdUrl(r, t) : this.getWikiByTitleUrl(r);
  }
  async getWikiByQid(r) {
    var o;
    const e = await Ni(r), t = (e == null ? void 0 : e[`${this.activeLanguage}wiki`]) || (e == null ? void 0 : e.enwiki) || ((o = Object.values(e != null ? e : {})) == null ? void 0 : o[0]);
    if (!t) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    const i = t.site.slice(0, 2);
    return O(t == null ? void 0 : t.title, i);
  }
  isInputValid() {
    return this.searchValue = this.searchValue.replace(/ /g, ""), this.searchValue.match(/^\s*$/) ? (this.errorMessage = this.content.errors.invalid, !1) : (this.errorMessage = "", !0);
  }
  async fetchWiki() {
    if (Le(), !this.isInputValid())
      return;
    const r = /^q[0-9]+$/i;
    let e = null, t;
    if (this.searchValue.match(r) ? t = await this.getWikiByQid(this.searchValue) : t = await this.getWikiByurl(this.searchValue), e = await Ii(t), !e) {
      this.title = "", this.description = "", this.thumbnail = { source: "", height: 0, width: 0 }, this.pageSource = "", this.qId = "";
      return;
    }
    this.qId = e.wikibase_item, this.description = e.extract, this.title = e.title, this.thumbnail = e == null ? void 0 : e.thumbnail, this.pageSource = e.content_urls.desktop.page, this.imgPosition = e.thumbnail ? this.imgPosition : "no-img";
  }
  handleInputChange(r) {
    this.searchValue = r.target.value;
  }
  handleInputKeyPress(r) {
    r.key === "Enter" && this.debouncedFetchWiki();
  }
  handleRadioBtnChange(r) {
    var t;
    const e = (t = r.target.value) != null ? t : "no-img";
    this.imgPosition = e;
  }
  generateOutputCode() {
    if (!this.isSourceInJson) {
      this.outputSource = `<div data-my-wiki-el searchValue="${this.qId}" imgPosition="${this.imgPosition}"></div>`;
      return;
    }
    const r = {
      "data-my-wiki-el": "",
      searchvalue: this.qId,
      imgposition: this.imgPosition
    };
    this.outputSource = `'${JSON.stringify(r, null, 2)}'`;
  }
  toggleInfoSection() {
    this.showInfoSection = !this.showInfoSection;
  }
  copyScriptToclipboard() {
    Le(), navigator.clipboard.writeText(this.cdnScript), this.showScriptCopiedFeedback = !0, setTimeout(() => this.showScriptCopiedFeedback = !1, 1500);
  }
  copyCodeToclipboard() {
    Le(), navigator.clipboard.writeText(this.outputSource), this.showCodeCopiedFeedback = !0, setTimeout(() => this.showCodeCopiedFeedback = !1, 1500);
  }
  toggleCodeLang(r) {
    this.isSourceInJson = r;
  }
  toggleLanguage(r) {
    this.activeLanguage = r;
  }
  renderImgPositionSetting() {
    var r;
    return w`
			<h2>Config:</h2>

			<div>
				${(r = this.thumbnail) != null && r.source ? w`
							<p style="margin-bottom:0">${this.content.imgPosition.title}</p>
							${this.radioGroup.map(
      (e) => w`<input
											id=${e.id}
											type="radio"
											name="img_position"
											value=${e.id}
											@change=${this.handleRadioBtnChange}
											?checked=${this.imgPosition === e.id} />
										<label for="${e.id}">${e.label}</label><br />`
    )}
					  ` : w`<p style="margin-bottom:0">${this.content.imgPosition.noImgAvailable}</p>`}
			</div>
		`;
  }
  renderInfo() {
    return w`
			<h2>Info:</h2>

			<ul class="nav nav-tabs width-border">
				<li class="nav-item">
					<a class="nav-link ${this.activeLanguage === "nl" ? "active" : ""}" @click=${() => this.toggleLanguage("nl")}
						>Nederlands</a
					>
				</li>
				<li class="nav-item">
					<a class="nav-link ${this.activeLanguage === "en" ? "active" : ""}" @click=${() => this.toggleLanguage("en")}
						>English</a
					>
				</li>
			</ul>

			<p>${this.content.info.description}</p>

			<div class="code-block" style="margin-bottom: 0">
				<code> ${this.cdnScript} </code>
				${this.showScriptCopiedFeedback ? w`<span>${this.content.info.btnClickFeedback}</span>` : ""}
				<button class="btn btn-code-copy" @click=${this.copyScriptToclipboard}>${this.content.info.btnText}</button>
			</div>

			<p style="margin-bottom: 2rem;">${this.content.info.descriptionForZender}</p>
		`;
  }
  renderCodeBlock() {
    return w`
			<h2>${this.content.code.title}:</h2>

			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a class="nav-link ${this.isSourceInJson ? "active" : ""}" @click=${() => this.toggleCodeLang(!0)}>JSON</a>
				</li>
				<li class="nav-item">
					<a class="nav-link ${this.isSourceInJson ? "" : "active"}" @click=${() => this.toggleCodeLang(!1)}
						>HTML</a
					>
				</li>
			</ul>

			<div class="code-block">
				<code> ${this.outputSource} </code>
				${this.showCodeCopiedFeedback ? w`<span>${this.content.code.btnClickFeedback}</span>` : ""}
				<button class="btn btn-code-copy" @click=${this.copyCodeToclipboard}>${this.content.code.btnText}</button>
			</div>
		`;
  }
  renderConfigMode() {
    return w`
			<div class="wiki-config">
				<div class="wiki-input">
					<input
						class="search-input"
						placeholder="${this.content.search.inputPlaceholder}"
						tabindex="1"
						@input=${this.handleInputChange}
						@keypress=${this.handleInputKeyPress} />

					<button class="btn search-btn" @click=${this.debouncedFetchWiki} part="button" tabindex="2">
						${this.content.search.btnText}
					</button>
					<button class="btn btn-outline" @click=${this.toggleInfoSection} part="button" tabindex="3">?</button>
				</div>
				${this.errorMessage ? w`<p class="invalid-input-feedback">${this.errorMessage}</p>` : ""}

				<!-- eslint-disable-next-line prettier/prettier -->
				${this.showInfoSection ? this.renderInfo() : ""}

				<!-- eslint-disable-next-line prettier/prettier -->
				${this.qId ? this.renderImgPositionSetting() : ""}
			</div>

			${this.qId ? this.renderCodeBlock() : ""}
		`;
  }
  render() {
    var r;
    return w`
			<div class="${this.isConfigMode ? "container" : ""}">
				${this.isConfigMode ? this.renderConfigMode() : ""}

				<!--eslint-disable-next-line prettier/prettier -->
				${this.title && this.isConfigMode ? w`<h2>${this.content.preview.title}:</h2>` : ""}
				<div class="content-container ${this.imgPosition}">
					<div class="content">
						<h1 class="content-title">${this.title}</h1>
						<p>${this.description}</p>
					</div>

					${((r = this.thumbnail) == null ? void 0 : r.source) && this.imgPosition !== "no-img" ? w`
								<div class="thumbnail">
									<img
										src="${this.thumbnail.source}"
										alt="photo of ${this.title}"
										style="max-width: ${this.thumbnail.width}px" />
								</div>
						  ` : ""}

					<div class="read-more">
						${this.pageSource ? w`<p>${this.content.preview.readMore}: <a href="${this.pageSource}">${this.pageSource}</a></p>` : ""}
					</div>
				</div>
			</div>
		`;
  }
};
b.styles = qi;
y([
  $({
    type: Boolean
  })
], b.prototype, "isConfigMode", 2);
y([
  $()
], b.prototype, "searchValue", 2);
y([
  $()
], b.prototype, "qId", 2);
y([
  $()
], b.prototype, "outputSource", 2);
y([
  $({ type: Boolean })
], b.prototype, "isSourceInJson", 2);
y([
  $({ type: Boolean })
], b.prototype, "showCodeCopiedFeedback", 2);
y([
  $({ type: Boolean })
], b.prototype, "showScriptCopiedFeedback", 2);
y([
  $({ type: Boolean })
], b.prototype, "showInfoSection", 2);
y([
  $()
], b.prototype, "title", 2);
y([
  $()
], b.prototype, "description", 2);
y([
  $({ type: Object })
], b.prototype, "thumbnail", 2);
y([
  $()
], b.prototype, "imgPosition", 2);
y([
  $()
], b.prototype, "pageSource", 2);
y([
  $()
], b.prototype, "errorMessage", 2);
y([
  $()
], b.prototype, "activeLanguage", 2);
y([
  $()
], b.prototype, "content", 2);
b = y([
  wr("my-element")
], b);
export {
  b as MyElement
};
