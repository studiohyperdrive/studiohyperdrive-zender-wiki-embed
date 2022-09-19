/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, He = Symbol(), Ze = /* @__PURE__ */ new WeakMap();
class Bt {
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
      i && (e = Ze.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ze.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const ar = (r) => new Bt(typeof r == "string" ? r : r + "", void 0, He), lr = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, s) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Bt(t, r, He);
}, ur = (r, e) => {
  qe ? r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet) : e.forEach((t) => {
    const i = document.createElement("style"), n = window.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  });
}, Ye = qe ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules)
    t += i.cssText;
  return ar(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var me;
const et = window.trustedTypes, dr = et ? et.emptyScript : "", tt = window.reactiveElementPolyfillSupport, Ie = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? dr : null;
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
} }, Dt = (r, e) => e !== r && (e == e || r == r), be = { attribute: !0, type: String, converter: Ie, reflect: !1, hasChanged: Dt };
class q extends HTMLElement {
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
  static createProperty(e, t = be) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const i = typeof e == "symbol" ? Symbol() : "__" + e, n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && Object.defineProperty(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    return { get() {
      return this[t];
    }, set(n) {
      const s = this[e];
      this[t] = n, this.requestUpdate(e, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || be;
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
        t.unshift(Ye(n));
    } else
      e !== void 0 && t.push(Ye(e));
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
    return ur(t, this.constructor.elementStyles), t;
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
  _$EO(e, t, i = be) {
    var n, s;
    const o = this.constructor._$Ep(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const l = ((s = (n = i.converter) === null || n === void 0 ? void 0 : n.toAttribute) !== null && s !== void 0 ? s : Ie.toAttribute)(t, i.type);
      this._$El = e, l == null ? this.removeAttribute(o) : this.setAttribute(o, l), this._$El = null;
    }
  }
  _$AK(e, t) {
    var i, n;
    const s = this.constructor, o = s._$Ev.get(e);
    if (o !== void 0 && this._$El !== o) {
      const l = s.getPropertyOptions(o), a = l.converter, d = (n = (i = a == null ? void 0 : a.fromAttribute) !== null && i !== void 0 ? i : typeof a == "function" ? a : null) !== null && n !== void 0 ? n : Ie.fromAttribute;
      this._$El = o, this[o] = d(t, l.type), this._$El = null;
    }
  }
  requestUpdate(e, t, i) {
    let n = !0;
    e !== void 0 && (((i = i || this.constructor.getPropertyOptions(e)).hasChanged || Dt)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), i.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, i))) : n = !1), !this.isUpdatePending && n && (this._$E_ = this._$Ej());
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((n, s) => this[s] = n), this._$Ei = void 0);
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (e = this._$ES) === null || e === void 0 || e.forEach((n) => {
        var s;
        return (s = n.hostUpdate) === null || s === void 0 ? void 0 : s.call(n);
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
q.finalized = !0, q.elementProperties = /* @__PURE__ */ new Map(), q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, tt == null || tt({ ReactiveElement: q }), ((me = globalThis.reactiveElementVersions) !== null && me !== void 0 ? me : globalThis.reactiveElementVersions = []).push("1.3.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ge;
const L = globalThis.trustedTypes, rt = L ? L.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, x = `lit$${(Math.random() + "").slice(9)}$`, It = "?" + x, cr = `<${It}>`, j = document, Y = (r = "") => j.createComment(r), ee = (r) => r === null || typeof r != "object" && typeof r != "function", Mt = Array.isArray, hr = (r) => Mt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, nt = />/g, k = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, ot = /"/g, qt = /^(?:script|style|textarea|title)$/i, pr = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), w = pr(1), F = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), fr = (r, e, t) => {
  var i, n;
  const s = (i = t == null ? void 0 : t.renderBefore) !== null && i !== void 0 ? i : e;
  let o = s._$litPart$;
  if (o === void 0) {
    const l = (n = t == null ? void 0 : t.renderBefore) !== null && n !== void 0 ? n : null;
    s._$litPart$ = o = new re(e.insertBefore(Y(), l), l, void 0, t != null ? t : {});
  }
  return o._$AI(r), o;
}, H = j.createTreeWalker(j, 129, null, !1), vr = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : "", o = G;
  for (let a = 0; a < t; a++) {
    const d = r[a];
    let h, c, u = -1, f = 0;
    for (; f < d.length && (o.lastIndex = f, c = o.exec(d), c !== null); )
      f = o.lastIndex, o === G ? c[1] === "!--" ? o = it : c[1] !== void 0 ? o = nt : c[2] !== void 0 ? (qt.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = k) : c[3] !== void 0 && (o = k) : o === k ? c[0] === ">" ? (o = n != null ? n : G, u = -1) : c[1] === void 0 ? u = -2 : (u = o.lastIndex - c[2].length, h = c[1], o = c[3] === void 0 ? k : c[3] === '"' ? ot : st) : o === ot || o === st ? o = k : o === it || o === nt ? o = G : (o = k, n = void 0);
    const U = o === k && r[a + 1].startsWith("/>") ? " " : "";
    s += o === G ? d + cr : u >= 0 ? (i.push(h), d.slice(0, u) + "$lit$" + d.slice(u) + x + U) : d + x + (u === -2 ? (i.push(void 0), a) : U);
  }
  const l = s + (r[t] || "<?>") + (e === 2 ? "</svg>" : "");
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [rt !== void 0 ? rt.createHTML(l) : l, i];
};
class te {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, a = this.parts, [d, h] = vr(e, t);
    if (this.el = te.createElement(d, i), H.currentNode = this.el.content, t === 2) {
      const c = this.el.content, u = c.firstChild;
      u.remove(), c.append(...u.childNodes);
    }
    for (; (n = H.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const c = [];
          for (const u of n.getAttributeNames())
            if (u.endsWith("$lit$") || u.startsWith(x)) {
              const f = h[o++];
              if (c.push(u), f !== void 0) {
                const U = n.getAttribute(f.toLowerCase() + "$lit$").split(x), _ = /([.?@])?(.*)/.exec(f);
                a.push({ type: 1, index: s, name: _[2], strings: U, ctor: _[1] === "." ? br : _[1] === "?" ? yr : _[1] === "@" ? $r : oe });
              } else
                a.push({ type: 6, index: s });
            }
          for (const u of c)
            n.removeAttribute(u);
        }
        if (qt.test(n.tagName)) {
          const c = n.textContent.split(x), u = c.length - 1;
          if (u > 0) {
            n.textContent = L ? L.emptyScript : "";
            for (let f = 0; f < u; f++)
              n.append(c[f], Y()), H.nextNode(), a.push({ type: 2, index: ++s });
            n.append(c[u], Y());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === It)
          a.push({ type: 2, index: s });
        else {
          let c = -1;
          for (; (c = n.data.indexOf(x, c + 1)) !== -1; )
            a.push({ type: 7, index: s }), c += x.length - 1;
        }
      s++;
    }
  }
  static createElement(e, t) {
    const i = j.createElement("template");
    return i.innerHTML = e, i;
  }
}
function W(r, e, t = r, i) {
  var n, s, o, l;
  if (e === F)
    return e;
  let a = i !== void 0 ? (n = t._$Cl) === null || n === void 0 ? void 0 : n[i] : t._$Cu;
  const d = ee(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== d && ((s = a == null ? void 0 : a._$AO) === null || s === void 0 || s.call(a, !1), d === void 0 ? a = void 0 : (a = new d(r), a._$AT(r, t, i)), i !== void 0 ? ((o = (l = t)._$Cl) !== null && o !== void 0 ? o : l._$Cl = [])[i] = a : t._$Cu = a), a !== void 0 && (e = W(r, a._$AS(r, e.values), a, i)), e;
}
class mr {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t = e == null ? void 0 : e.creationScope) !== null && t !== void 0 ? t : j).importNode(i, !0);
    H.currentNode = s;
    let o = H.nextNode(), l = 0, a = 0, d = n[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let h;
        d.type === 2 ? h = new re(o, o.nextSibling, this, e) : d.type === 1 ? h = new d.ctor(o, d.name, d.strings, this, e) : d.type === 6 && (h = new wr(o, this, e)), this.v.push(h), d = n[++a];
      }
      l !== (d == null ? void 0 : d.index) && (o = H.nextNode(), l++);
    }
    return s;
  }
  m(e) {
    let t = 0;
    for (const i of this.v)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class re {
  constructor(e, t, i, n) {
    var s;
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$C_ = (s = n == null ? void 0 : n.isConnected) === null || s === void 0 || s;
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
    e = W(this, e, t), ee(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== F && this.T(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.k(e) : hr(e) ? this.S(e) : this.T(e);
  }
  j(e, t = this._$AB) {
    return this._$AA.parentNode.insertBefore(e, t);
  }
  k(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.j(e));
  }
  T(e) {
    this._$AH !== m && ee(this._$AH) ? this._$AA.nextSibling.data = e : this.k(j.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var t;
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = te.createElement(n.h, this.options)), n);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === s)
      this._$AH.m(i);
    else {
      const o = new mr(s, this), l = o.p(this.options);
      o.m(i), this.k(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = at.get(e.strings);
    return t === void 0 && at.set(e.strings, t = new te(e)), t;
  }
  S(e) {
    Mt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e)
      n === t.length ? t.push(i = new re(this.j(Y()), this.j(Y()), this, this.options)) : i = t[n], i._$AI(s), n++;
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
class oe {
  constructor(e, t, i, n, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, i, n) {
    const s = this.strings;
    let o = !1;
    if (s === void 0)
      e = W(this, e, t, 0), o = !ee(e) || e !== this._$AH && e !== F, o && (this._$AH = e);
    else {
      const l = e;
      let a, d;
      for (e = s[0], a = 0; a < s.length - 1; a++)
        d = W(this, l[i + a], t, a), d === F && (d = this._$AH[a]), o || (o = !ee(d) || d !== this._$AH[a]), d === m ? e = m : e !== m && (e += (d != null ? d : "") + s[a + 1]), this._$AH[a] = d;
    }
    o && !n && this.P(e);
  }
  P(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class br extends oe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
const gr = L ? L.emptyScript : "";
class yr extends oe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(e) {
    e && e !== m ? this.element.setAttribute(this.name, gr) : this.element.removeAttribute(this.name);
  }
}
class $r extends oe {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    var i;
    if ((e = (i = W(this, e, t, 0)) !== null && i !== void 0 ? i : m) === F)
      return;
    const n = this._$AH, s = e === m && n !== m || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, o = e !== m && (n === m || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class wr {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    W(this, e);
  }
}
const lt = window.litHtmlPolyfillSupport;
lt == null || lt(te, re), ((ge = globalThis.litHtmlVersions) !== null && ge !== void 0 ? ge : globalThis.litHtmlVersions = []).push("2.2.7");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ye, $e;
class Z extends q {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = fr(t, this.renderRoot, this.renderOptions);
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
Z.finalized = !0, Z._$litElement$ = !0, (ye = globalThis.litElementHydrateSupport) === null || ye === void 0 || ye.call(globalThis, { LitElement: Z });
const ut = globalThis.litElementPolyfillSupport;
ut == null || ut({ LitElement: Z });
(($e = globalThis.litElementVersions) !== null && $e !== void 0 ? $e : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Er = (r) => (e) => typeof e == "function" ? ((t, i) => (window.customElements.define(t, i), i))(r, e) : ((t, i) => {
  const { kind: n, elements: s } = i;
  return { kind: n, elements: s, finisher(o) {
    window.customElements.define(t, o);
  } };
})(r, e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _r = (r, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(t) {
  t.createProperty(e.key, r);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(t) {
  t.createProperty(e.key, r);
} };
function C(r) {
  return (e, t) => t !== void 0 ? ((i, n, s) => {
    n.constructor.createProperty(s, i);
  })(r, e, t) : _r(r, e);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var we;
((we = window.HTMLSlotElement) === null || we === void 0 ? void 0 : we.prototype.assignedElements) != null;
const Ar = (r, e) => {
  [...e.attributes].forEach((t) => {
    var i;
    r.setAttribute(t.nodeName, (i = t.nodeValue) != null ? i : "");
  });
}, Sr = () => {
  document.querySelectorAll("[data-my-wiki-el]").forEach((e) => {
    const t = document.createElement("my-element");
    Ar(t, e), e != null && e.parentNode && e.parentNode.replaceChild(t, e);
  });
};
Sr();
function Cr(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Ht = { exports: {} }, Le = { exports: {} }, Lt = function(e, t) {
  return function() {
    for (var n = new Array(arguments.length), s = 0; s < n.length; s++)
      n[s] = arguments[s];
    return e.apply(t, n);
  };
}, Rr = Lt, je = Object.prototype.toString, Fe = function(r) {
  return function(e) {
    var t = je.call(e);
    return r[t] || (r[t] = t.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function T(r) {
  return r = r.toLowerCase(), function(t) {
    return Fe(t) === r;
  };
}
function We(r) {
  return Array.isArray(r);
}
function se(r) {
  return typeof r > "u";
}
function xr(r) {
  return r !== null && !se(r) && r.constructor !== null && !se(r.constructor) && typeof r.constructor.isBuffer == "function" && r.constructor.isBuffer(r);
}
var jt = T("ArrayBuffer");
function Pr(r) {
  var e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && jt(r.buffer), e;
}
function kr(r) {
  return typeof r == "string";
}
function Or(r) {
  return typeof r == "number";
}
function Ft(r) {
  return r !== null && typeof r == "object";
}
function ie(r) {
  if (Fe(r) !== "object")
    return !1;
  var e = Object.getPrototypeOf(r);
  return e === null || e === Object.prototype;
}
var Tr = T("Date"), Ur = T("File"), Nr = T("Blob"), Br = T("FileList");
function Ve(r) {
  return je.call(r) === "[object Function]";
}
function Dr(r) {
  return Ft(r) && Ve(r.pipe);
}
function Ir(r) {
  var e = "[object FormData]";
  return r && (typeof FormData == "function" && r instanceof FormData || je.call(r) === e || Ve(r.toString) && r.toString() === e);
}
var Mr = T("URLSearchParams");
function qr(r) {
  return r.trim ? r.trim() : r.replace(/^\s+|\s+$/g, "");
}
function Hr() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function ze(r, e) {
  if (!(r === null || typeof r > "u"))
    if (typeof r != "object" && (r = [r]), We(r))
      for (var t = 0, i = r.length; t < i; t++)
        e.call(null, r[t], t, r);
    else
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && e.call(null, r[n], n, r);
}
function Me() {
  var r = {};
  function e(n, s) {
    ie(r[s]) && ie(n) ? r[s] = Me(r[s], n) : ie(n) ? r[s] = Me({}, n) : We(n) ? r[s] = n.slice() : r[s] = n;
  }
  for (var t = 0, i = arguments.length; t < i; t++)
    ze(arguments[t], e);
  return r;
}
function Lr(r, e, t) {
  return ze(e, function(n, s) {
    t && typeof n == "function" ? r[s] = Rr(n, t) : r[s] = n;
  }), r;
}
function jr(r) {
  return r.charCodeAt(0) === 65279 && (r = r.slice(1)), r;
}
function Fr(r, e, t, i) {
  r.prototype = Object.create(e.prototype, i), r.prototype.constructor = r, t && Object.assign(r.prototype, t);
}
function Wr(r, e, t) {
  var i, n, s, o = {};
  e = e || {};
  do {
    for (i = Object.getOwnPropertyNames(r), n = i.length; n-- > 0; )
      s = i[n], o[s] || (e[s] = r[s], o[s] = !0);
    r = Object.getPrototypeOf(r);
  } while (r && (!t || t(r, e)) && r !== Object.prototype);
  return e;
}
function Vr(r, e, t) {
  r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= e.length;
  var i = r.indexOf(e, t);
  return i !== -1 && i === t;
}
function zr(r) {
  if (!r)
    return null;
  var e = r.length;
  if (se(e))
    return null;
  for (var t = new Array(e); e-- > 0; )
    t[e] = r[e];
  return t;
}
var Jr = function(r) {
  return function(e) {
    return r && e instanceof r;
  };
}(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)), b = {
  isArray: We,
  isArrayBuffer: jt,
  isBuffer: xr,
  isFormData: Ir,
  isArrayBufferView: Pr,
  isString: kr,
  isNumber: Or,
  isObject: Ft,
  isPlainObject: ie,
  isUndefined: se,
  isDate: Tr,
  isFile: Ur,
  isBlob: Nr,
  isFunction: Ve,
  isStream: Dr,
  isURLSearchParams: Mr,
  isStandardBrowserEnv: Hr,
  forEach: ze,
  merge: Me,
  extend: Lr,
  trim: qr,
  stripBOM: jr,
  inherits: Fr,
  toFlatObject: Wr,
  kindOf: Fe,
  kindOfTest: T,
  endsWith: Vr,
  toArray: zr,
  isTypedArray: Jr,
  isFileList: Br
}, D = b;
function dt(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var Wt = function(e, t, i) {
  if (!t)
    return e;
  var n;
  if (i)
    n = i(t);
  else if (D.isURLSearchParams(t))
    n = t.toString();
  else {
    var s = [];
    D.forEach(t, function(a, d) {
      a === null || typeof a > "u" || (D.isArray(a) ? d = d + "[]" : a = [a], D.forEach(a, function(c) {
        D.isDate(c) ? c = c.toISOString() : D.isObject(c) && (c = JSON.stringify(c)), s.push(dt(d) + "=" + dt(c));
      }));
    }), n = s.join("&");
  }
  if (n) {
    var o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + n;
  }
  return e;
}, Qr = b;
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
  Qr.forEach(this.handlers, function(i) {
    i !== null && e(i);
  });
};
var Kr = ae, Xr = b, Gr = function(e, t) {
  Xr.forEach(e, function(n, s) {
    s !== t && s.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[s]);
  });
}, Vt = b;
function V(r, e, t, i, n) {
  Error.call(this), this.message = r, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), i && (this.request = i), n && (this.response = n);
}
Vt.inherits(V, Error, {
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
var zt = V.prototype, Jt = {};
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
  Jt[r] = { value: r };
});
Object.defineProperties(V, Jt);
Object.defineProperty(zt, "isAxiosError", { value: !0 });
V.from = function(r, e, t, i, n, s) {
  var o = Object.create(zt);
  return Vt.toFlatObject(r, o, function(a) {
    return a !== Error.prototype;
  }), V.call(o, r.message, e, t, i, n), o.name = r.name, s && Object.assign(o, s), o;
};
var J = V, Qt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, S = b;
function Zr(r, e) {
  e = e || new FormData();
  var t = [];
  function i(s) {
    return s === null ? "" : S.isDate(s) ? s.toISOString() : S.isArrayBuffer(s) || S.isTypedArray(s) ? typeof Blob == "function" ? new Blob([s]) : Buffer.from(s) : s;
  }
  function n(s, o) {
    if (S.isPlainObject(s) || S.isArray(s)) {
      if (t.indexOf(s) !== -1)
        throw Error("Circular reference detected in " + o);
      t.push(s), S.forEach(s, function(a, d) {
        if (!S.isUndefined(a)) {
          var h = o ? o + "." + d : d, c;
          if (a && !o && typeof a == "object") {
            if (S.endsWith(d, "{}"))
              a = JSON.stringify(a);
            else if (S.endsWith(d, "[]") && (c = S.toArray(a))) {
              c.forEach(function(u) {
                !S.isUndefined(u) && e.append(h, i(u));
              });
              return;
            }
          }
          n(a, h);
        }
      }), t.pop();
    } else
      e.append(o, i(s));
  }
  return n(r), e;
}
var Kt = Zr, Ee, ct;
function Yr() {
  if (ct)
    return Ee;
  ct = 1;
  var r = J;
  return Ee = function(t, i, n) {
    var s = n.config.validateStatus;
    !n.status || !s || s(n.status) ? t(n) : i(new r(
      "Request failed with status code " + n.status,
      [r.ERR_BAD_REQUEST, r.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
      n.config,
      n.request,
      n
    ));
  }, Ee;
}
var _e, ht;
function ei() {
  if (ht)
    return _e;
  ht = 1;
  var r = b;
  return _e = r.isStandardBrowserEnv() ? function() {
    return {
      write: function(i, n, s, o, l, a) {
        var d = [];
        d.push(i + "=" + encodeURIComponent(n)), r.isNumber(s) && d.push("expires=" + new Date(s).toGMTString()), r.isString(o) && d.push("path=" + o), r.isString(l) && d.push("domain=" + l), a === !0 && d.push("secure"), document.cookie = d.join("; ");
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
var ti = function(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}, ri = function(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}, ii = ti, ni = ri, Xt = function(e, t) {
  return e && !ii(t) ? ni(e, t) : t;
}, Ae, pt;
function si() {
  if (pt)
    return Ae;
  pt = 1;
  var r = b, e = [
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
    var n = {}, s, o, l;
    return i && r.forEach(i.split(`
`), function(d) {
      if (l = d.indexOf(":"), s = r.trim(d.substr(0, l)).toLowerCase(), o = r.trim(d.substr(l + 1)), s) {
        if (n[s] && e.indexOf(s) >= 0)
          return;
        s === "set-cookie" ? n[s] = (n[s] ? n[s] : []).concat([o]) : n[s] = n[s] ? n[s] + ", " + o : o;
      }
    }), n;
  }, Ae;
}
var Se, ft;
function oi() {
  if (ft)
    return Se;
  ft = 1;
  var r = b;
  return Se = r.isStandardBrowserEnv() ? function() {
    var t = /(msie|trident)/i.test(navigator.userAgent), i = document.createElement("a"), n;
    function s(o) {
      var l = o;
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
    return n = s(window.location.href), function(l) {
      var a = r.isString(l) ? s(l) : l;
      return a.protocol === n.protocol && a.host === n.host;
    };
  }() : function() {
    return function() {
      return !0;
    };
  }(), Se;
}
var Ce, vt;
function le() {
  if (vt)
    return Ce;
  vt = 1;
  var r = J, e = b;
  function t(i) {
    r.call(this, i == null ? "canceled" : i, r.ERR_CANCELED), this.name = "CanceledError";
  }
  return e.inherits(t, r, {
    __CANCEL__: !0
  }), Ce = t, Ce;
}
var Re, mt;
function ai() {
  return mt || (mt = 1, Re = function(e) {
    var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return t && t[1] || "";
  }), Re;
}
var xe, bt;
function gt() {
  if (bt)
    return xe;
  bt = 1;
  var r = b, e = Yr(), t = ei(), i = Wt, n = Xt, s = si(), o = oi(), l = Qt, a = J, d = le(), h = ai();
  return xe = function(u) {
    return new Promise(function(U, _) {
      var Q = u.data, K = u.headers, X = u.responseType, N;
      function Ke() {
        u.cancelToken && u.cancelToken.unsubscribe(N), u.signal && u.signal.removeEventListener("abort", N);
      }
      r.isFormData(Q) && r.isStandardBrowserEnv() && delete K["Content-Type"];
      var p = new XMLHttpRequest();
      if (u.auth) {
        var nr = u.auth.username || "", sr = u.auth.password ? unescape(encodeURIComponent(u.auth.password)) : "";
        K.Authorization = "Basic " + btoa(nr + ":" + sr);
      }
      var pe = n(u.baseURL, u.url);
      p.open(u.method.toUpperCase(), i(pe, u.params, u.paramsSerializer), !0), p.timeout = u.timeout;
      function Xe() {
        if (!!p) {
          var A = "getAllResponseHeaders" in p ? s(p.getAllResponseHeaders()) : null, B = !X || X === "text" || X === "json" ? p.responseText : p.response, P = {
            data: B,
            status: p.status,
            statusText: p.statusText,
            headers: A,
            config: u,
            request: p
          };
          e(function(ve) {
            U(ve), Ke();
          }, function(ve) {
            _(ve), Ke();
          }, P), p = null;
        }
      }
      if ("onloadend" in p ? p.onloadend = Xe : p.onreadystatechange = function() {
        !p || p.readyState !== 4 || p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0) || setTimeout(Xe);
      }, p.onabort = function() {
        !p || (_(new a("Request aborted", a.ECONNABORTED, u, p)), p = null);
      }, p.onerror = function() {
        _(new a("Network Error", a.ERR_NETWORK, u, p, p)), p = null;
      }, p.ontimeout = function() {
        var B = u.timeout ? "timeout of " + u.timeout + "ms exceeded" : "timeout exceeded", P = u.transitional || l;
        u.timeoutErrorMessage && (B = u.timeoutErrorMessage), _(new a(
          B,
          P.clarifyTimeoutError ? a.ETIMEDOUT : a.ECONNABORTED,
          u,
          p
        )), p = null;
      }, r.isStandardBrowserEnv()) {
        var Ge = (u.withCredentials || o(pe)) && u.xsrfCookieName ? t.read(u.xsrfCookieName) : void 0;
        Ge && (K[u.xsrfHeaderName] = Ge);
      }
      "setRequestHeader" in p && r.forEach(K, function(B, P) {
        typeof Q > "u" && P.toLowerCase() === "content-type" ? delete K[P] : p.setRequestHeader(P, B);
      }), r.isUndefined(u.withCredentials) || (p.withCredentials = !!u.withCredentials), X && X !== "json" && (p.responseType = u.responseType), typeof u.onDownloadProgress == "function" && p.addEventListener("progress", u.onDownloadProgress), typeof u.onUploadProgress == "function" && p.upload && p.upload.addEventListener("progress", u.onUploadProgress), (u.cancelToken || u.signal) && (N = function(A) {
        !p || (_(!A || A && A.type ? new d() : A), p.abort(), p = null);
      }, u.cancelToken && u.cancelToken.subscribe(N), u.signal && (u.signal.aborted ? N() : u.signal.addEventListener("abort", N))), Q || (Q = null);
      var fe = h(pe);
      if (fe && ["http", "https", "file"].indexOf(fe) === -1) {
        _(new a("Unsupported protocol " + fe + ":", a.ERR_BAD_REQUEST, u));
        return;
      }
      p.send(Q);
    });
  }, xe;
}
var Pe, yt;
function li() {
  return yt || (yt = 1, Pe = null), Pe;
}
var v = b, $t = Gr, wt = J, ui = Qt, di = Kt, ci = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function Et(r, e) {
  !v.isUndefined(r) && v.isUndefined(r["Content-Type"]) && (r["Content-Type"] = e);
}
function hi() {
  var r;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (r = gt()), r;
}
function pi(r, e, t) {
  if (v.isString(r))
    try {
      return (e || JSON.parse)(r), v.trim(r);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (t || JSON.stringify)(r);
}
var ue = {
  transitional: ui,
  adapter: hi(),
  transformRequest: [function(e, t) {
    if ($t(t, "Accept"), $t(t, "Content-Type"), v.isFormData(e) || v.isArrayBuffer(e) || v.isBuffer(e) || v.isStream(e) || v.isFile(e) || v.isBlob(e))
      return e;
    if (v.isArrayBufferView(e))
      return e.buffer;
    if (v.isURLSearchParams(e))
      return Et(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString();
    var i = v.isObject(e), n = t && t["Content-Type"], s;
    if ((s = v.isFileList(e)) || i && n === "multipart/form-data") {
      var o = this.env && this.env.FormData;
      return di(s ? { "files[]": e } : e, o && new o());
    } else if (i || n === "application/json")
      return Et(t, "application/json"), pi(e);
    return e;
  }],
  transformResponse: [function(e) {
    var t = this.transitional || ue.transitional, i = t && t.silentJSONParsing, n = t && t.forcedJSONParsing, s = !i && this.responseType === "json";
    if (s || n && v.isString(e) && e.length)
      try {
        return JSON.parse(e);
      } catch (o) {
        if (s)
          throw o.name === "SyntaxError" ? wt.from(o, wt.ERR_BAD_RESPONSE, this, null, this.response) : o;
      }
    return e;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: li()
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
  ue.headers[e] = {};
});
v.forEach(["post", "put", "patch"], function(e) {
  ue.headers[e] = v.merge(ci);
});
var Je = ue, fi = b, vi = Je, mi = function(e, t, i) {
  var n = this || vi;
  return fi.forEach(i, function(o) {
    e = o.call(n, e, t);
  }), e;
}, ke, _t;
function Gt() {
  return _t || (_t = 1, ke = function(e) {
    return !!(e && e.__CANCEL__);
  }), ke;
}
var At = b, Oe = mi, bi = Gt(), gi = Je, yi = le();
function Te(r) {
  if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted)
    throw new yi();
}
var $i = function(e) {
  Te(e), e.headers = e.headers || {}, e.data = Oe.call(
    e,
    e.data,
    e.headers,
    e.transformRequest
  ), e.headers = At.merge(
    e.headers.common || {},
    e.headers[e.method] || {},
    e.headers
  ), At.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(n) {
      delete e.headers[n];
    }
  );
  var t = e.adapter || gi.adapter;
  return t(e).then(function(n) {
    return Te(e), n.data = Oe.call(
      e,
      n.data,
      n.headers,
      e.transformResponse
    ), n;
  }, function(n) {
    return bi(n) || (Te(e), n && n.response && (n.response.data = Oe.call(
      e,
      n.response.data,
      n.response.headers,
      e.transformResponse
    ))), Promise.reject(n);
  });
}, $ = b, Zt = function(e, t) {
  t = t || {};
  var i = {};
  function n(h, c) {
    return $.isPlainObject(h) && $.isPlainObject(c) ? $.merge(h, c) : $.isPlainObject(c) ? $.merge({}, c) : $.isArray(c) ? c.slice() : c;
  }
  function s(h) {
    if ($.isUndefined(t[h])) {
      if (!$.isUndefined(e[h]))
        return n(void 0, e[h]);
    } else
      return n(e[h], t[h]);
  }
  function o(h) {
    if (!$.isUndefined(t[h]))
      return n(void 0, t[h]);
  }
  function l(h) {
    if ($.isUndefined(t[h])) {
      if (!$.isUndefined(e[h]))
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
  var d = {
    url: o,
    method: o,
    data: o,
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
  return $.forEach(Object.keys(e).concat(Object.keys(t)), function(c) {
    var u = d[c] || s, f = u(c);
    $.isUndefined(f) && u !== a || (i[c] = f);
  }), i;
}, Ue, St;
function Yt() {
  return St || (St = 1, Ue = {
    version: "0.27.2"
  }), Ue;
}
var wi = Yt().version, R = J, Qe = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(r, e) {
  Qe[r] = function(i) {
    return typeof i === r || "a" + (e < 1 ? "n " : " ") + r;
  };
});
var Ct = {};
Qe.transitional = function(e, t, i) {
  function n(s, o) {
    return "[Axios v" + wi + "] Transitional option '" + s + "'" + o + (i ? ". " + i : "");
  }
  return function(s, o, l) {
    if (e === !1)
      throw new R(
        n(o, " has been removed" + (t ? " in " + t : "")),
        R.ERR_DEPRECATED
      );
    return t && !Ct[o] && (Ct[o] = !0, console.warn(
      n(
        o,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(s, o, l) : !0;
  };
};
function Ei(r, e, t) {
  if (typeof r != "object")
    throw new R("options must be an object", R.ERR_BAD_OPTION_VALUE);
  for (var i = Object.keys(r), n = i.length; n-- > 0; ) {
    var s = i[n], o = e[s];
    if (o) {
      var l = r[s], a = l === void 0 || o(l, s, r);
      if (a !== !0)
        throw new R("option " + s + " must be " + a, R.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new R("Unknown option " + s, R.ERR_BAD_OPTION);
  }
}
var _i = {
  assertOptions: Ei,
  validators: Qe
}, er = b, Ai = Wt, Rt = Kr, xt = $i, de = Zt, Si = Xt, tr = _i, I = tr.validators;
function z(r) {
  this.defaults = r, this.interceptors = {
    request: new Rt(),
    response: new Rt()
  };
}
z.prototype.request = function(e, t) {
  typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = de(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var i = t.transitional;
  i !== void 0 && tr.assertOptions(i, {
    silentJSONParsing: I.transitional(I.boolean),
    forcedJSONParsing: I.transitional(I.boolean),
    clarifyTimeoutError: I.transitional(I.boolean)
  }, !1);
  var n = [], s = !0;
  this.interceptors.request.forEach(function(f) {
    typeof f.runWhen == "function" && f.runWhen(t) === !1 || (s = s && f.synchronous, n.unshift(f.fulfilled, f.rejected));
  });
  var o = [];
  this.interceptors.response.forEach(function(f) {
    o.push(f.fulfilled, f.rejected);
  });
  var l;
  if (!s) {
    var a = [xt, void 0];
    for (Array.prototype.unshift.apply(a, n), a = a.concat(o), l = Promise.resolve(t); a.length; )
      l = l.then(a.shift(), a.shift());
    return l;
  }
  for (var d = t; n.length; ) {
    var h = n.shift(), c = n.shift();
    try {
      d = h(d);
    } catch (u) {
      c(u);
      break;
    }
  }
  try {
    l = xt(d);
  } catch (u) {
    return Promise.reject(u);
  }
  for (; o.length; )
    l = l.then(o.shift(), o.shift());
  return l;
};
z.prototype.getUri = function(e) {
  e = de(this.defaults, e);
  var t = Si(e.baseURL, e.url);
  return Ai(t, e.params, e.paramsSerializer);
};
er.forEach(["delete", "get", "head", "options"], function(e) {
  z.prototype[e] = function(t, i) {
    return this.request(de(i || {}, {
      method: e,
      url: t,
      data: (i || {}).data
    }));
  };
});
er.forEach(["post", "put", "patch"], function(e) {
  function t(i) {
    return function(s, o, l) {
      return this.request(de(l || {}, {
        method: e,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: o
      }));
    };
  }
  z.prototype[e] = t(), z.prototype[e + "Form"] = t(!0);
});
var Ci = z, Ne, Pt;
function Ri() {
  if (Pt)
    return Ne;
  Pt = 1;
  var r = le();
  function e(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    var i;
    this.promise = new Promise(function(o) {
      i = o;
    });
    var n = this;
    this.promise.then(function(s) {
      if (!!n._listeners) {
        var o, l = n._listeners.length;
        for (o = 0; o < l; o++)
          n._listeners[o](s);
        n._listeners = null;
      }
    }), this.promise.then = function(s) {
      var o, l = new Promise(function(a) {
        n.subscribe(a), o = a;
      }).then(s);
      return l.cancel = function() {
        n.unsubscribe(o);
      }, l;
    }, t(function(o) {
      n.reason || (n.reason = new r(o), i(n.reason));
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
    var i, n = new e(function(o) {
      i = o;
    });
    return {
      token: n,
      cancel: i
    };
  }, Ne = e, Ne;
}
var Be, kt;
function xi() {
  return kt || (kt = 1, Be = function(e) {
    return function(i) {
      return e.apply(null, i);
    };
  }), Be;
}
var De, Ot;
function Pi() {
  if (Ot)
    return De;
  Ot = 1;
  var r = b;
  return De = function(t) {
    return r.isObject(t) && t.isAxiosError === !0;
  }, De;
}
var Tt = b, ki = Lt, ne = Ci, Oi = Zt, Ti = Je;
function rr(r) {
  var e = new ne(r), t = ki(ne.prototype.request, e);
  return Tt.extend(t, ne.prototype, e), Tt.extend(t, e), t.create = function(n) {
    return rr(Oi(r, n));
  }, t;
}
var g = rr(Ti);
g.Axios = ne;
g.CanceledError = le();
g.CancelToken = Ri();
g.isCancel = Gt();
g.VERSION = Yt().version;
g.toFormData = Kt;
g.AxiosError = J;
g.Cancel = g.CanceledError;
g.all = function(e) {
  return Promise.all(e);
};
g.spread = xi();
g.isAxiosError = Pi();
Le.exports = g;
Le.exports.default = g;
(function(r) {
  r.exports = Le.exports;
})(Ht);
const ce = /* @__PURE__ */ Cr(Ht.exports), he = {
  wikiRestApiUrl: (r) => `https://${r}.wikipedia.org/api/rest_v1/page`,
  wikiRestApiUrl2: (r) => `https://${r}.wikipedia.org/w/rest.php/v1/page`,
  wikiActionApiUrl: (r) => `https://${r}.wikipedia.org/w/api.php?action=query&format=json&lllimit=500&origin=*`,
  wikidataActionApiUrl: "https://www.wikidata.org/w/api.php?action=wbgetentities&props=sitelinks&format=json&origin=*"
}, ir = (r) => r.replace(/ /g, "_"), O = (r, e) => {
  if (!r || !e)
    return "";
  const t = ir(r);
  return `${he.wikiRestApiUrl(e)}/summary/${t}`;
}, Ui = async (r, e) => {
  var i, n, s;
  const t = await ce.get(`${he.wikiActionApiUrl(e)}&prop=langlinks&pageids=${r}`).catch(() => null);
  return (s = (n = (i = t == null ? void 0 : t.data) == null ? void 0 : i.query) == null ? void 0 : n.pages) == null ? void 0 : s[r];
}, Ni = async (r, e) => {
  if (!r || !e)
    return [];
  const t = ir(r), i = await ce.get(`${he.wikiRestApiUrl2(e)}/${t}/links/language`).catch(() => null);
  return i == null ? void 0 : i.data;
}, Bi = async (r) => {
  var n, s;
  const e = r.toUpperCase();
  return (s = (n = (await ce.get(`${he.wikidataActionApiUrl}&ids=${e}`)).data.entities) == null ? void 0 : n[e]) == null ? void 0 : s.sitelinks;
}, Di = async (r) => r ? (await ce.get(r)).data : null, Ii = (r) => {
  let e;
  try {
    return e = new URL(r), e;
  } catch {
    return null;
  }
}, Mi = (r, e = 300) => {
  let t;
  return (...i) => {
    t || r.apply(void 0, i), clearTimeout(t), t = setTimeout(() => {
      t = void 0;
    }, e);
  };
}, Ut = () => {
  document.activeElement instanceof HTMLElement && document.activeElement.blur();
}, qi = () => document.documentElement.lang || "nl", { language: M } = new Intl.Locale(qi()), Nt = {
  en: {
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
}, Hi = lr`
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
			grid-template-columns: 1fr auto;
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
`;
var Li = Object.defineProperty, ji = Object.getOwnPropertyDescriptor, E = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? ji(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && Li(e, t, n), n;
};
let y = class extends Z {
  constructor() {
    super(...arguments), this.isConfigMode = !1, this.searchValue = "", this.qId = "", this.outputSource = "", this.showCodeCopiedFeedback = !1, this.title = "", this.description = "", this.thumbnail = { source: "", height: 0, width: 0 }, this.imgPosition = "img-left", this.pageSource = "", this.errorMessage = "", this.content = M === "nl" ? Nt.nl : Nt.en, this.radioGroup = [
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
    ], this.debouncedFetchWiki = Mi(() => this.fetchWiki());
  }
  updated(r) {
    !this.isConfigMode && r.has("isConfigMode") && this.fetchWiki(), !r.has("outputSource") && !r.has("searchValue") && this.generateOutputCode();
  }
  async getWikiByPageIdUrl(r, e) {
    var l;
    const t = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org/i, [, , , i] = r.match(t) || [], n = await Ui(e, i);
    if (!n) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    if (i === M)
      return O(n.title, i);
    const s = (l = n == null ? void 0 : n.langlinks) == null ? void 0 : l.find(({ lang: a }) => a === M);
    let o;
    return s ? o = O(s == null ? void 0 : s["*"], s == null ? void 0 : s.lang) : (this.errorMessage = this.content.errors.notSupported, o = O(n.title, i)), o;
  }
  async getWikiByTitleUrl(r) {
    const e = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org\/wiki\/([^/]+)/, [, , , t, i] = r.match(e) || [];
    if (t === M)
      return O(i, t);
    const n = await Ni(i, t);
    if (!n) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    const s = n.find(({ code: l }) => l === M);
    let o;
    return s ? o = O(s == null ? void 0 : s.title, s == null ? void 0 : s.code) : (o = O(i, t), this.errorMessage = this.content.errors.notSupported), o;
  }
  async getWikiByurl(r) {
    const e = Ii(r);
    if (!e) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    const t = e.searchParams.get("curid");
    return t ? this.getWikiByPageIdUrl(r, t) : this.getWikiByTitleUrl(r);
  }
  async getWikiByQid(r) {
    var s;
    const e = await Bi(r), t = (e == null ? void 0 : e[`${M}wiki`]) || (e == null ? void 0 : e.enwiki) || ((s = Object.values(e != null ? e : {})) == null ? void 0 : s[0]);
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
    if (Ut(), !this.isInputValid())
      return;
    const r = /^q[0-9]+$/i;
    let e = null, t;
    if (this.searchValue.match(r) ? t = await this.getWikiByQid(this.searchValue) : t = await this.getWikiByurl(this.searchValue), e = await Di(t), !e) {
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
    const r = {
      "data-my-wiki-el": "",
      searchvalue: this.qId,
      imgposition: this.imgPosition
    };
    this.outputSource = `'${JSON.stringify(r, null, 2)}'`;
  }
  copyCodeToclipboard() {
    Ut(), navigator.clipboard.writeText(this.outputSource), this.showCodeCopiedFeedback = !0, setTimeout(() => this.showCodeCopiedFeedback = !1, 1500);
  }
  renderImgPositionSetting() {
    var r;
    return w`
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
  renderCodeBlock() {
    return w`
			<h2>${this.content.code.title}:</h2>
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
				</div>
				${this.errorMessage ? w`<p class="invalid-input-feedback">${this.errorMessage}</p>` : ""}
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
y.styles = Hi;
E([
  C({
    type: Boolean
  })
], y.prototype, "isConfigMode", 2);
E([
  C()
], y.prototype, "searchValue", 2);
E([
  C()
], y.prototype, "qId", 2);
E([
  C()
], y.prototype, "outputSource", 2);
E([
  C({ type: Boolean })
], y.prototype, "showCodeCopiedFeedback", 2);
E([
  C()
], y.prototype, "title", 2);
E([
  C()
], y.prototype, "description", 2);
E([
  C({ type: Object })
], y.prototype, "thumbnail", 2);
E([
  C()
], y.prototype, "imgPosition", 2);
E([
  C()
], y.prototype, "pageSource", 2);
E([
  C()
], y.prototype, "errorMessage", 2);
y = E([
  Er("my-element")
], y);
export {
  y as MyElement
};
