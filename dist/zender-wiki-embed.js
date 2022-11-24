/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = window, ze = se.ShadowRoot && (se.ShadyCSS === void 0 || se.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ve = Symbol(), ot = /* @__PURE__ */ new WeakMap();
class Ht {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Ve)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ze && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ot.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ot.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const dr = (r) => new Ht(typeof r == "string" ? r : r + "", void 0, Ve), hr = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, o) => i + ((s) => {
    if (s._$cssResult$ === !0)
      return s.cssText;
    if (typeof s == "number")
      return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[o + 1], r[0]);
  return new Ht(t, r, Ve);
}, pr = (r, e) => {
  ze ? r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet) : e.forEach((t) => {
    const i = document.createElement("style"), n = se.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  });
}, st = ze ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules)
    t += i.cssText;
  return dr(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $e;
const ue = window, at = ue.trustedTypes, fr = at ? at.emptyScript : "", lt = ue.reactiveElementPolyfillSupport, qe = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? fr : null;
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
} }, Ft = (r, e) => e !== r && (e == e || r == r), we = { attribute: !0, type: String, converter: qe, reflect: !1, hasChanged: Ft };
class j extends HTMLElement {
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
  static createProperty(e, t = we) {
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
    return this.elementProperties.get(e) || we;
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
        t.unshift(st(n));
    } else
      e !== void 0 && t.push(st(e));
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
    return pr(t, this.constructor.elementStyles), t;
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
  _$EO(e, t, i = we) {
    var n;
    const o = this.constructor._$Ep(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const s = (((n = i.converter) === null || n === void 0 ? void 0 : n.toAttribute) !== void 0 ? i.converter : qe).toAttribute(t, i.type);
      this._$El = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$El = null;
    }
  }
  _$AK(e, t) {
    var i;
    const n = this.constructor, o = n._$Ev.get(e);
    if (o !== void 0 && this._$El !== o) {
      const s = n.getPropertyOptions(o), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((i = s.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? s.converter : qe;
      this._$El = o, this[o] = l.fromAttribute(t, s.type), this._$El = null;
    }
  }
  requestUpdate(e, t, i) {
    let n = !0;
    e !== void 0 && (((i = i || this.constructor.getPropertyOptions(e)).hasChanged || Ft)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), i.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, i))) : n = !1), !this.isUpdatePending && n && (this._$E_ = this._$Ej());
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
j.finalized = !0, j.elementProperties = /* @__PURE__ */ new Map(), j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, lt == null || lt({ ReactiveElement: j }), (($e = ue.reactiveElementVersions) !== null && $e !== void 0 ? $e : ue.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ee;
const ce = window, z = ce.trustedTypes, ut = z ? z.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, P = `lit$${(Math.random() + "").slice(9)}$`, qt = "?" + P, vr = `<${qt}>`, V = document, Y = (r = "") => V.createComment(r), ee = (r) => r === null || typeof r != "object" && typeof r != "function", jt = Array.isArray, br = (r) => jt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", X = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, dt = />/g, N = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, pt = /"/g, Wt = /^(?:script|style|textarea|title)$/i, mr = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), A = mr(1), D = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), W = V.createTreeWalker(V, 129, null, !1), gr = (r, e) => {
  const t = r.length - 1, i = [];
  let n, o = e === 2 ? "<svg>" : "", s = X;
  for (let a = 0; a < t; a++) {
    const c = r[a];
    let h, d, u = -1, p = 0;
    for (; p < c.length && (s.lastIndex = p, d = s.exec(c), d !== null); )
      p = s.lastIndex, s === X ? d[1] === "!--" ? s = ct : d[1] !== void 0 ? s = dt : d[2] !== void 0 ? (Wt.test(d[2]) && (n = RegExp("</" + d[2], "g")), s = N) : d[3] !== void 0 && (s = N) : s === N ? d[0] === ">" ? (s = n != null ? n : X, u = -1) : d[1] === void 0 ? u = -2 : (u = s.lastIndex - d[2].length, h = d[1], s = d[3] === void 0 ? N : d[3] === '"' ? pt : ht) : s === pt || s === ht ? s = N : s === ct || s === dt ? s = X : (s = N, n = void 0);
    const v = s === N && r[a + 1].startsWith("/>") ? " " : "";
    o += s === X ? c + vr : u >= 0 ? (i.push(h), c.slice(0, u) + "$lit$" + c.slice(u) + P + v) : c + P + (u === -2 ? (i.push(void 0), a) : v);
  }
  const l = o + (r[t] || "<?>") + (e === 2 ? "</svg>" : "");
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [ut !== void 0 ? ut.createHTML(l) : l, i];
};
class te {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const l = e.length - 1, a = this.parts, [c, h] = gr(e, t);
    if (this.el = te.createElement(c, i), W.currentNode = this.el.content, t === 2) {
      const d = this.el.content, u = d.firstChild;
      u.remove(), d.append(...u.childNodes);
    }
    for (; (n = W.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const d = [];
          for (const u of n.getAttributeNames())
            if (u.endsWith("$lit$") || u.startsWith(P)) {
              const p = h[s++];
              if (d.push(u), p !== void 0) {
                const v = n.getAttribute(p.toLowerCase() + "$lit$").split(P), b = /([.?@])?(.*)/.exec(p);
                a.push({ type: 1, index: o, name: b[2], strings: v, ctor: b[1] === "." ? $r : b[1] === "?" ? Er : b[1] === "@" ? _r : he });
              } else
                a.push({ type: 6, index: o });
            }
          for (const u of d)
            n.removeAttribute(u);
        }
        if (Wt.test(n.tagName)) {
          const d = n.textContent.split(P), u = d.length - 1;
          if (u > 0) {
            n.textContent = z ? z.emptyScript : "";
            for (let p = 0; p < u; p++)
              n.append(d[p], Y()), W.nextNode(), a.push({ type: 2, index: ++o });
            n.append(d[u], Y());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === qt)
          a.push({ type: 2, index: o });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(P, d + 1)) !== -1; )
            a.push({ type: 7, index: o }), d += P.length - 1;
        }
      o++;
    }
  }
  static createElement(e, t) {
    const i = V.createElement("template");
    return i.innerHTML = e, i;
  }
}
function J(r, e, t = r, i) {
  var n, o, s, l;
  if (e === D)
    return e;
  let a = i !== void 0 ? (n = t._$Co) === null || n === void 0 ? void 0 : n[i] : t._$Cl;
  const c = ee(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== c && ((o = a == null ? void 0 : a._$AO) === null || o === void 0 || o.call(a, !1), c === void 0 ? a = void 0 : (a = new c(r), a._$AT(r, t, i)), i !== void 0 ? ((s = (l = t)._$Co) !== null && s !== void 0 ? s : l._$Co = [])[i] = a : t._$Cl = a), a !== void 0 && (e = J(r, a._$AS(r, e.values), a, i)), e;
}
class yr {
  constructor(e, t) {
    this.u = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(e) {
    var t;
    const { el: { content: i }, parts: n } = this._$AD, o = ((t = e == null ? void 0 : e.creationScope) !== null && t !== void 0 ? t : V).importNode(i, !0);
    W.currentNode = o;
    let s = W.nextNode(), l = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (l === c.index) {
        let h;
        c.type === 2 ? h = new re(s, s.nextSibling, this, e) : c.type === 1 ? h = new c.ctor(s, c.name, c.strings, this, e) : c.type === 6 && (h = new Ar(s, this, e)), this.u.push(h), c = n[++a];
      }
      l !== (c == null ? void 0 : c.index) && (s = W.nextNode(), l++);
    }
    return o;
  }
  p(e) {
    let t = 0;
    for (const i of this.u)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class re {
  constructor(e, t, i, n) {
    var o;
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cm = (o = n == null ? void 0 : n.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$Cm;
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
    e = J(this, e, t), ee(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== D && this.g(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : br(e) ? this.k(e) : this.g(e);
  }
  O(e, t = this._$AB) {
    return this._$AA.parentNode.insertBefore(e, t);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  g(e) {
    this._$AH !== m && ee(this._$AH) ? this._$AA.nextSibling.data = e : this.T(V.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var t;
    const { values: i, _$litType$: n } = e, o = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = te.createElement(n.h, this.options)), n);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === o)
      this._$AH.p(i);
    else {
      const s = new yr(o, this), l = s.v(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = ft.get(e.strings);
    return t === void 0 && ft.set(e.strings, t = new te(e)), t;
  }
  k(e) {
    jt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const o of e)
      n === t.length ? t.push(i = new re(this.O(Y()), this.O(Y()), this, this.options)) : i = t[n], i._$AI(o), n++;
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
    this._$AM === void 0 && (this._$Cm = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
  }
}
class he {
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
      e = J(this, e, t, 0), s = !ee(e) || e !== this._$AH && e !== D, s && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = o[0], a = 0; a < o.length - 1; a++)
        c = J(this, l[i + a], t, a), c === D && (c = this._$AH[a]), s || (s = !ee(c) || c !== this._$AH[a]), c === m ? e = m : e !== m && (e += (c != null ? c : "") + o[a + 1]), this._$AH[a] = c;
    }
    s && !n && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class $r extends he {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
const wr = z ? z.emptyScript : "";
class Er extends he {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== m ? this.element.setAttribute(this.name, wr) : this.element.removeAttribute(this.name);
  }
}
class _r extends he {
  constructor(e, t, i, n, o) {
    super(e, t, i, n, o), this.type = 5;
  }
  _$AI(e, t = this) {
    var i;
    if ((e = (i = J(this, e, t, 0)) !== null && i !== void 0 ? i : m) === D)
      return;
    const n = this._$AH, o = e === m && n !== m || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== m && (n === m || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ar {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    J(this, e);
  }
}
const vt = ce.litHtmlPolyfillSupport;
vt == null || vt(te, re), ((Ee = ce.litHtmlVersions) !== null && Ee !== void 0 ? Ee : ce.litHtmlVersions = []).push("2.4.0");
const Sr = (r, e, t) => {
  var i, n;
  const o = (i = t == null ? void 0 : t.renderBefore) !== null && i !== void 0 ? i : e;
  let s = o._$litPart$;
  if (s === void 0) {
    const l = (n = t == null ? void 0 : t.renderBefore) !== null && n !== void 0 ? n : null;
    o._$litPart$ = s = new re(e.insertBefore(Y(), l), l, void 0, t != null ? t : {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _e, Ae;
class Z extends j {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Sr(t, this.renderRoot, this.renderOptions);
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
    return D;
  }
}
Z.finalized = !0, Z._$litElement$ = !0, (_e = globalThis.litElementHydrateSupport) === null || _e === void 0 || _e.call(globalThis, { LitElement: Z });
const bt = globalThis.litElementPolyfillSupport;
bt == null || bt({ LitElement: Z });
((Ae = globalThis.litElementVersions) !== null && Ae !== void 0 ? Ae : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kr = (r) => (e) => typeof e == "function" ? ((t, i) => (customElements.define(t, i), i))(r, e) : ((t, i) => {
  const { kind: n, elements: o } = i;
  return { kind: n, elements: o, finisher(s) {
    customElements.define(t, s);
  } };
})(r, e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Cr = (r, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(t) {
  t.createProperty(e.key, r);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(t) {
  t.createProperty(e.key, r);
} };
function E(r) {
  return (e, t) => t !== void 0 ? ((i, n, o) => {
    n.constructor.createProperty(o, i);
  })(r, e, t) : Cr(r, e);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Se;
((Se = window.HTMLSlotElement) === null || Se === void 0 ? void 0 : Se.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xr = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Rr = (r) => (...e) => ({ _$litDirective$: r, values: e });
class Or {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class je extends Or {
  constructor(e) {
    if (super(e), this.it = m, e.type !== xr.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === m || e == null)
      return this._t = void 0, this.it = e;
    if (e === D)
      return e;
    if (typeof e != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it)
      return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
}
je.directiveName = "unsafeHTML", je.resultType = 1;
const Tr = Rr(je), Pr = (r, e) => {
  [...e.attributes].forEach((t) => {
    var i;
    r.setAttribute(t.nodeName, (i = t.nodeValue) != null ? i : "");
  });
}, Ur = () => {
  document.querySelectorAll("[data-my-wiki-el]").forEach((e) => {
    const t = document.createElement("my-element");
    Pr(t, e), e != null && e.parentNode && e.parentNode.replaceChild(t, e);
  });
};
Ur();
function Nr(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var zt = { exports: {} }, Je = { exports: {} }, Vt = function(e, t) {
  return function() {
    for (var n = new Array(arguments.length), o = 0; o < n.length; o++)
      n[o] = arguments[o];
    return e.apply(t, n);
  };
}, Ir = Vt, Ge = Object.prototype.toString, Qe = function(r) {
  return function(e) {
    var t = Ge.call(e);
    return r[t] || (r[t] = t.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function M(r) {
  return r = r.toLowerCase(), function(t) {
    return Qe(t) === r;
  };
}
function Ke(r) {
  return Array.isArray(r);
}
function de(r) {
  return typeof r > "u";
}
function Br(r) {
  return r !== null && !de(r) && r.constructor !== null && !de(r.constructor) && typeof r.constructor.isBuffer == "function" && r.constructor.isBuffer(r);
}
var Jt = M("ArrayBuffer");
function Dr(r) {
  var e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && Jt(r.buffer), e;
}
function Mr(r) {
  return typeof r == "string";
}
function Lr(r) {
  return typeof r == "number";
}
function Gt(r) {
  return r !== null && typeof r == "object";
}
function ae(r) {
  if (Qe(r) !== "object")
    return !1;
  var e = Object.getPrototypeOf(r);
  return e === null || e === Object.prototype;
}
var Hr = M("Date"), Fr = M("File"), qr = M("Blob"), jr = M("FileList");
function Xe(r) {
  return Ge.call(r) === "[object Function]";
}
function Wr(r) {
  return Gt(r) && Xe(r.pipe);
}
function zr(r) {
  var e = "[object FormData]";
  return r && (typeof FormData == "function" && r instanceof FormData || Ge.call(r) === e || Xe(r.toString) && r.toString() === e);
}
var Vr = M("URLSearchParams");
function Jr(r) {
  return r.trim ? r.trim() : r.replace(/^\s+|\s+$/g, "");
}
function Gr() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Ze(r, e) {
  if (!(r === null || typeof r > "u"))
    if (typeof r != "object" && (r = [r]), Ke(r))
      for (var t = 0, i = r.length; t < i; t++)
        e.call(null, r[t], t, r);
    else
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && e.call(null, r[n], n, r);
}
function We() {
  var r = {};
  function e(n, o) {
    ae(r[o]) && ae(n) ? r[o] = We(r[o], n) : ae(n) ? r[o] = We({}, n) : Ke(n) ? r[o] = n.slice() : r[o] = n;
  }
  for (var t = 0, i = arguments.length; t < i; t++)
    Ze(arguments[t], e);
  return r;
}
function Qr(r, e, t) {
  return Ze(e, function(n, o) {
    t && typeof n == "function" ? r[o] = Ir(n, t) : r[o] = n;
  }), r;
}
function Kr(r) {
  return r.charCodeAt(0) === 65279 && (r = r.slice(1)), r;
}
function Xr(r, e, t, i) {
  r.prototype = Object.create(e.prototype, i), r.prototype.constructor = r, t && Object.assign(r.prototype, t);
}
function Zr(r, e, t) {
  var i, n, o, s = {};
  e = e || {};
  do {
    for (i = Object.getOwnPropertyNames(r), n = i.length; n-- > 0; )
      o = i[n], s[o] || (e[o] = r[o], s[o] = !0);
    r = Object.getPrototypeOf(r);
  } while (r && (!t || t(r, e)) && r !== Object.prototype);
  return e;
}
function Yr(r, e, t) {
  r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= e.length;
  var i = r.indexOf(e, t);
  return i !== -1 && i === t;
}
function ei(r) {
  if (!r)
    return null;
  var e = r.length;
  if (de(e))
    return null;
  for (var t = new Array(e); e-- > 0; )
    t[e] = r[e];
  return t;
}
var ti = function(r) {
  return function(e) {
    return r && e instanceof r;
  };
}(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)), $ = {
  isArray: Ke,
  isArrayBuffer: Jt,
  isBuffer: Br,
  isFormData: zr,
  isArrayBufferView: Dr,
  isString: Mr,
  isNumber: Lr,
  isObject: Gt,
  isPlainObject: ae,
  isUndefined: de,
  isDate: Hr,
  isFile: Fr,
  isBlob: qr,
  isFunction: Xe,
  isStream: Wr,
  isURLSearchParams: Vr,
  isStandardBrowserEnv: Gr,
  forEach: Ze,
  merge: We,
  extend: Qr,
  trim: Jr,
  stripBOM: Kr,
  inherits: Xr,
  toFlatObject: Zr,
  kindOf: Qe,
  kindOfTest: M,
  endsWith: Yr,
  toArray: ei,
  isTypedArray: ti,
  isFileList: jr
}, F = $;
function mt(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var Qt = function(e, t, i) {
  if (!t)
    return e;
  var n;
  if (i)
    n = i(t);
  else if (F.isURLSearchParams(t))
    n = t.toString();
  else {
    var o = [];
    F.forEach(t, function(a, c) {
      a === null || typeof a > "u" || (F.isArray(a) ? c = c + "[]" : a = [a], F.forEach(a, function(d) {
        F.isDate(d) ? d = d.toISOString() : F.isObject(d) && (d = JSON.stringify(d)), o.push(mt(c) + "=" + mt(d));
      }));
    }), n = o.join("&");
  }
  if (n) {
    var s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + n;
  }
  return e;
}, ri = $;
function pe() {
  this.handlers = [];
}
pe.prototype.use = function(e, t, i) {
  return this.handlers.push({
    fulfilled: e,
    rejected: t,
    synchronous: i ? i.synchronous : !1,
    runWhen: i ? i.runWhen : null
  }), this.handlers.length - 1;
};
pe.prototype.eject = function(e) {
  this.handlers[e] && (this.handlers[e] = null);
};
pe.prototype.forEach = function(e) {
  ri.forEach(this.handlers, function(i) {
    i !== null && e(i);
  });
};
var ii = pe, ni = $, oi = function(e, t) {
  ni.forEach(e, function(n, o) {
    o !== t && o.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[o]);
  });
}, Kt = $;
function G(r, e, t, i, n) {
  Error.call(this), this.message = r, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), i && (this.request = i), n && (this.response = n);
}
Kt.inherits(G, Error, {
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
var Xt = G.prototype, Zt = {};
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
  Zt[r] = { value: r };
});
Object.defineProperties(G, Zt);
Object.defineProperty(Xt, "isAxiosError", { value: !0 });
G.from = function(r, e, t, i, n, o) {
  var s = Object.create(Xt);
  return Kt.toFlatObject(r, s, function(a) {
    return a !== Error.prototype;
  }), G.call(s, r.message, e, t, i, n), s.name = r.name, o && Object.assign(s, o), s;
};
var K = G, Yt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, x = $;
function si(r, e) {
  e = e || new FormData();
  var t = [];
  function i(o) {
    return o === null ? "" : x.isDate(o) ? o.toISOString() : x.isArrayBuffer(o) || x.isTypedArray(o) ? typeof Blob == "function" ? new Blob([o]) : Buffer.from(o) : o;
  }
  function n(o, s) {
    if (x.isPlainObject(o) || x.isArray(o)) {
      if (t.indexOf(o) !== -1)
        throw Error("Circular reference detected in " + s);
      t.push(o), x.forEach(o, function(a, c) {
        if (!x.isUndefined(a)) {
          var h = s ? s + "." + c : c, d;
          if (a && !s && typeof a == "object") {
            if (x.endsWith(c, "{}"))
              a = JSON.stringify(a);
            else if (x.endsWith(c, "[]") && (d = x.toArray(a))) {
              d.forEach(function(u) {
                !x.isUndefined(u) && e.append(h, i(u));
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
var er = si, ke, gt;
function ai() {
  if (gt)
    return ke;
  gt = 1;
  var r = K;
  return ke = function(t, i, n) {
    var o = n.config.validateStatus;
    !n.status || !o || o(n.status) ? t(n) : i(new r(
      "Request failed with status code " + n.status,
      [r.ERR_BAD_REQUEST, r.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
      n.config,
      n.request,
      n
    ));
  }, ke;
}
var Ce, yt;
function li() {
  if (yt)
    return Ce;
  yt = 1;
  var r = $;
  return Ce = r.isStandardBrowserEnv() ? function() {
    return {
      write: function(i, n, o, s, l, a) {
        var c = [];
        c.push(i + "=" + encodeURIComponent(n)), r.isNumber(o) && c.push("expires=" + new Date(o).toGMTString()), r.isString(s) && c.push("path=" + s), r.isString(l) && c.push("domain=" + l), a === !0 && c.push("secure"), document.cookie = c.join("; ");
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
  }(), Ce;
}
var ui = function(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}, ci = function(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}, di = ui, hi = ci, tr = function(e, t) {
  return e && !di(t) ? hi(e, t) : t;
}, xe, $t;
function pi() {
  if ($t)
    return xe;
  $t = 1;
  var r = $, e = [
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
  return xe = function(i) {
    var n = {}, o, s, l;
    return i && r.forEach(i.split(`
`), function(c) {
      if (l = c.indexOf(":"), o = r.trim(c.substr(0, l)).toLowerCase(), s = r.trim(c.substr(l + 1)), o) {
        if (n[o] && e.indexOf(o) >= 0)
          return;
        o === "set-cookie" ? n[o] = (n[o] ? n[o] : []).concat([s]) : n[o] = n[o] ? n[o] + ", " + s : s;
      }
    }), n;
  }, xe;
}
var Re, wt;
function fi() {
  if (wt)
    return Re;
  wt = 1;
  var r = $;
  return Re = r.isStandardBrowserEnv() ? function() {
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
  }(), Re;
}
var Oe, Et;
function fe() {
  if (Et)
    return Oe;
  Et = 1;
  var r = K, e = $;
  function t(i) {
    r.call(this, i == null ? "canceled" : i, r.ERR_CANCELED), this.name = "CanceledError";
  }
  return e.inherits(t, r, {
    __CANCEL__: !0
  }), Oe = t, Oe;
}
var Te, _t;
function vi() {
  return _t || (_t = 1, Te = function(e) {
    var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return t && t[1] || "";
  }), Te;
}
var Pe, At;
function St() {
  if (At)
    return Pe;
  At = 1;
  var r = $, e = ai(), t = li(), i = Qt, n = tr, o = pi(), s = fi(), l = Yt, a = K, c = fe(), h = vi();
  return Pe = function(u) {
    return new Promise(function(v, b) {
      var _ = u.data, R = u.headers, O = u.responseType, L;
      function rt() {
        u.cancelToken && u.cancelToken.unsubscribe(L), u.signal && u.signal.removeEventListener("abort", L);
      }
      r.isFormData(_) && r.isStandardBrowserEnv() && delete R["Content-Type"];
      var f = new XMLHttpRequest();
      if (u.auth) {
        var lr = u.auth.username || "", ur = u.auth.password ? unescape(encodeURIComponent(u.auth.password)) : "";
        R.Authorization = "Basic " + btoa(lr + ":" + ur);
      }
      var me = n(u.baseURL, u.url);
      f.open(u.method.toUpperCase(), i(me, u.params, u.paramsSerializer), !0), f.timeout = u.timeout;
      function it() {
        if (!!f) {
          var C = "getAllResponseHeaders" in f ? o(f.getAllResponseHeaders()) : null, H = !O || O === "text" || O === "json" ? f.responseText : f.response, U = {
            data: H,
            status: f.status,
            statusText: f.statusText,
            headers: C,
            config: u,
            request: f
          };
          e(function(ye) {
            v(ye), rt();
          }, function(ye) {
            b(ye), rt();
          }, U), f = null;
        }
      }
      if ("onloadend" in f ? f.onloadend = it : f.onreadystatechange = function() {
        !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.indexOf("file:") === 0) || setTimeout(it);
      }, f.onabort = function() {
        !f || (b(new a("Request aborted", a.ECONNABORTED, u, f)), f = null);
      }, f.onerror = function() {
        b(new a("Network Error", a.ERR_NETWORK, u, f, f)), f = null;
      }, f.ontimeout = function() {
        var H = u.timeout ? "timeout of " + u.timeout + "ms exceeded" : "timeout exceeded", U = u.transitional || l;
        u.timeoutErrorMessage && (H = u.timeoutErrorMessage), b(new a(
          H,
          U.clarifyTimeoutError ? a.ETIMEDOUT : a.ECONNABORTED,
          u,
          f
        )), f = null;
      }, r.isStandardBrowserEnv()) {
        var nt = (u.withCredentials || s(me)) && u.xsrfCookieName ? t.read(u.xsrfCookieName) : void 0;
        nt && (R[u.xsrfHeaderName] = nt);
      }
      "setRequestHeader" in f && r.forEach(R, function(H, U) {
        typeof _ > "u" && U.toLowerCase() === "content-type" ? delete R[U] : f.setRequestHeader(U, H);
      }), r.isUndefined(u.withCredentials) || (f.withCredentials = !!u.withCredentials), O && O !== "json" && (f.responseType = u.responseType), typeof u.onDownloadProgress == "function" && f.addEventListener("progress", u.onDownloadProgress), typeof u.onUploadProgress == "function" && f.upload && f.upload.addEventListener("progress", u.onUploadProgress), (u.cancelToken || u.signal) && (L = function(C) {
        !f || (b(!C || C && C.type ? new c() : C), f.abort(), f = null);
      }, u.cancelToken && u.cancelToken.subscribe(L), u.signal && (u.signal.aborted ? L() : u.signal.addEventListener("abort", L))), _ || (_ = null);
      var ge = h(me);
      if (ge && ["http", "https", "file"].indexOf(ge) === -1) {
        b(new a("Unsupported protocol " + ge + ":", a.ERR_BAD_REQUEST, u));
        return;
      }
      f.send(_);
    });
  }, Pe;
}
var Ue, kt;
function bi() {
  return kt || (kt = 1, Ue = null), Ue;
}
var y = $, Ct = oi, xt = K, mi = Yt, gi = er, yi = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function Rt(r, e) {
  !y.isUndefined(r) && y.isUndefined(r["Content-Type"]) && (r["Content-Type"] = e);
}
function $i() {
  var r;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (r = St()), r;
}
function wi(r, e, t) {
  if (y.isString(r))
    try {
      return (e || JSON.parse)(r), y.trim(r);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (t || JSON.stringify)(r);
}
var ve = {
  transitional: mi,
  adapter: $i(),
  transformRequest: [function(e, t) {
    if (Ct(t, "Accept"), Ct(t, "Content-Type"), y.isFormData(e) || y.isArrayBuffer(e) || y.isBuffer(e) || y.isStream(e) || y.isFile(e) || y.isBlob(e))
      return e;
    if (y.isArrayBufferView(e))
      return e.buffer;
    if (y.isURLSearchParams(e))
      return Rt(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString();
    var i = y.isObject(e), n = t && t["Content-Type"], o;
    if ((o = y.isFileList(e)) || i && n === "multipart/form-data") {
      var s = this.env && this.env.FormData;
      return gi(o ? { "files[]": e } : e, s && new s());
    } else if (i || n === "application/json")
      return Rt(t, "application/json"), wi(e);
    return e;
  }],
  transformResponse: [function(e) {
    var t = this.transitional || ve.transitional, i = t && t.silentJSONParsing, n = t && t.forcedJSONParsing, o = !i && this.responseType === "json";
    if (o || n && y.isString(e) && e.length)
      try {
        return JSON.parse(e);
      } catch (s) {
        if (o)
          throw s.name === "SyntaxError" ? xt.from(s, xt.ERR_BAD_RESPONSE, this, null, this.response) : s;
      }
    return e;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: bi()
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
y.forEach(["delete", "get", "head"], function(e) {
  ve.headers[e] = {};
});
y.forEach(["post", "put", "patch"], function(e) {
  ve.headers[e] = y.merge(yi);
});
var Ye = ve, Ei = $, _i = Ye, Ai = function(e, t, i) {
  var n = this || _i;
  return Ei.forEach(i, function(s) {
    e = s.call(n, e, t);
  }), e;
}, Ne, Ot;
function rr() {
  return Ot || (Ot = 1, Ne = function(e) {
    return !!(e && e.__CANCEL__);
  }), Ne;
}
var Tt = $, Ie = Ai, Si = rr(), ki = Ye, Ci = fe();
function Be(r) {
  if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted)
    throw new Ci();
}
var xi = function(e) {
  Be(e), e.headers = e.headers || {}, e.data = Ie.call(
    e,
    e.data,
    e.headers,
    e.transformRequest
  ), e.headers = Tt.merge(
    e.headers.common || {},
    e.headers[e.method] || {},
    e.headers
  ), Tt.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(n) {
      delete e.headers[n];
    }
  );
  var t = e.adapter || ki.adapter;
  return t(e).then(function(n) {
    return Be(e), n.data = Ie.call(
      e,
      n.data,
      n.headers,
      e.transformResponse
    ), n;
  }, function(n) {
    return Si(n) || (Be(e), n && n.response && (n.response.data = Ie.call(
      e,
      n.response.data,
      n.response.headers,
      e.transformResponse
    ))), Promise.reject(n);
  });
}, k = $, ir = function(e, t) {
  t = t || {};
  var i = {};
  function n(h, d) {
    return k.isPlainObject(h) && k.isPlainObject(d) ? k.merge(h, d) : k.isPlainObject(d) ? k.merge({}, d) : k.isArray(d) ? d.slice() : d;
  }
  function o(h) {
    if (k.isUndefined(t[h])) {
      if (!k.isUndefined(e[h]))
        return n(void 0, e[h]);
    } else
      return n(e[h], t[h]);
  }
  function s(h) {
    if (!k.isUndefined(t[h]))
      return n(void 0, t[h]);
  }
  function l(h) {
    if (k.isUndefined(t[h])) {
      if (!k.isUndefined(e[h]))
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
  var c = {
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
  return k.forEach(Object.keys(e).concat(Object.keys(t)), function(d) {
    var u = c[d] || o, p = u(d);
    k.isUndefined(p) && u !== a || (i[d] = p);
  }), i;
}, De, Pt;
function nr() {
  return Pt || (Pt = 1, De = {
    version: "0.27.2"
  }), De;
}
var Ri = nr().version, T = K, et = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(r, e) {
  et[r] = function(i) {
    return typeof i === r || "a" + (e < 1 ? "n " : " ") + r;
  };
});
var Ut = {};
et.transitional = function(e, t, i) {
  function n(o, s) {
    return "[Axios v" + Ri + "] Transitional option '" + o + "'" + s + (i ? ". " + i : "");
  }
  return function(o, s, l) {
    if (e === !1)
      throw new T(
        n(s, " has been removed" + (t ? " in " + t : "")),
        T.ERR_DEPRECATED
      );
    return t && !Ut[s] && (Ut[s] = !0, console.warn(
      n(
        s,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(o, s, l) : !0;
  };
};
function Oi(r, e, t) {
  if (typeof r != "object")
    throw new T("options must be an object", T.ERR_BAD_OPTION_VALUE);
  for (var i = Object.keys(r), n = i.length; n-- > 0; ) {
    var o = i[n], s = e[o];
    if (s) {
      var l = r[o], a = l === void 0 || s(l, o, r);
      if (a !== !0)
        throw new T("option " + o + " must be " + a, T.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new T("Unknown option " + o, T.ERR_BAD_OPTION);
  }
}
var Ti = {
  assertOptions: Oi,
  validators: et
}, or = $, Pi = Qt, Nt = ii, It = xi, be = ir, Ui = tr, sr = Ti, q = sr.validators;
function Q(r) {
  this.defaults = r, this.interceptors = {
    request: new Nt(),
    response: new Nt()
  };
}
Q.prototype.request = function(e, t) {
  typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = be(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
  var i = t.transitional;
  i !== void 0 && sr.assertOptions(i, {
    silentJSONParsing: q.transitional(q.boolean),
    forcedJSONParsing: q.transitional(q.boolean),
    clarifyTimeoutError: q.transitional(q.boolean)
  }, !1);
  var n = [], o = !0;
  this.interceptors.request.forEach(function(p) {
    typeof p.runWhen == "function" && p.runWhen(t) === !1 || (o = o && p.synchronous, n.unshift(p.fulfilled, p.rejected));
  });
  var s = [];
  this.interceptors.response.forEach(function(p) {
    s.push(p.fulfilled, p.rejected);
  });
  var l;
  if (!o) {
    var a = [It, void 0];
    for (Array.prototype.unshift.apply(a, n), a = a.concat(s), l = Promise.resolve(t); a.length; )
      l = l.then(a.shift(), a.shift());
    return l;
  }
  for (var c = t; n.length; ) {
    var h = n.shift(), d = n.shift();
    try {
      c = h(c);
    } catch (u) {
      d(u);
      break;
    }
  }
  try {
    l = It(c);
  } catch (u) {
    return Promise.reject(u);
  }
  for (; s.length; )
    l = l.then(s.shift(), s.shift());
  return l;
};
Q.prototype.getUri = function(e) {
  e = be(this.defaults, e);
  var t = Ui(e.baseURL, e.url);
  return Pi(t, e.params, e.paramsSerializer);
};
or.forEach(["delete", "get", "head", "options"], function(e) {
  Q.prototype[e] = function(t, i) {
    return this.request(be(i || {}, {
      method: e,
      url: t,
      data: (i || {}).data
    }));
  };
});
or.forEach(["post", "put", "patch"], function(e) {
  function t(i) {
    return function(o, s, l) {
      return this.request(be(l || {}, {
        method: e,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  Q.prototype[e] = t(), Q.prototype[e + "Form"] = t(!0);
});
var Ni = Q, Me, Bt;
function Ii() {
  if (Bt)
    return Me;
  Bt = 1;
  var r = fe();
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
  }, Me = e, Me;
}
var Le, Dt;
function Bi() {
  return Dt || (Dt = 1, Le = function(e) {
    return function(i) {
      return e.apply(null, i);
    };
  }), Le;
}
var He, Mt;
function Di() {
  if (Mt)
    return He;
  Mt = 1;
  var r = $;
  return He = function(t) {
    return r.isObject(t) && t.isAxiosError === !0;
  }, He;
}
var Lt = $, Mi = Vt, le = Ni, Li = ir, Hi = Ye;
function ar(r) {
  var e = new le(r), t = Mi(le.prototype.request, e);
  return Lt.extend(t, le.prototype, e), Lt.extend(t, e), t.create = function(n) {
    return ar(Li(r, n));
  }, t;
}
var S = ar(Hi);
S.Axios = le;
S.CanceledError = fe();
S.CancelToken = Ii();
S.isCancel = rr();
S.VERSION = nr().version;
S.toFormData = er;
S.AxiosError = K;
S.Cancel = S.CanceledError;
S.all = function(e) {
  return Promise.all(e);
};
S.spread = Bi();
S.isAxiosError = Di();
Je.exports = S;
Je.exports.default = S;
(function(r) {
  r.exports = Je.exports;
})(zt);
const ie = /* @__PURE__ */ Nr(zt.exports), ne = {
  wikiRestApiUrl: (r) => `https://${r}.wikipedia.org/api/rest_v1/page`,
  wikiRestApiUrl2: (r) => `https://${r}.wikipedia.org/w/rest.php/v1/page`,
  wikiActionApiUrl: (r) => `https://${r}.wikipedia.org/w/api.php?action=query&format=json&lllimit=500&origin=*`,
  wikidataActionApiUrl: "https://www.wikidata.org/w/api.php?action=wbgetentities&props=sitelinks&format=json&origin=*"
}, tt = (r) => r.replace(/ /g, "_"), I = (r, e) => {
  if (!r || !e)
    return "";
  const t = tt(r);
  return `${ne.wikiRestApiUrl(e)}/summary/${t}`;
}, B = (r, e) => {
  if (!r || !e)
    return "";
  const t = tt(r);
  return `${ne.wikiActionApiUrl(e)}&prop=extracts&exintro&indexpageids&titles=${t}`;
}, Fi = async (r, e) => {
  var i, n, o;
  const t = await ie.get(`${ne.wikiActionApiUrl(e)}&prop=langlinks&pageids=${r}`).catch(() => null);
  return (o = (n = (i = t == null ? void 0 : t.data) == null ? void 0 : i.query) == null ? void 0 : n.pages) == null ? void 0 : o[r];
}, qi = async (r, e) => {
  if (!r || !e)
    return [];
  const t = tt(r), i = await ie.get(`${ne.wikiRestApiUrl2(e)}/${t}/links/language`).catch(() => null);
  return i == null ? void 0 : i.data;
}, ji = async (r) => {
  var n, o;
  const e = r.toUpperCase();
  return (o = (n = (await ie.get(`${ne.wikidataActionApiUrl}&ids=${e}`)).data.entities) == null ? void 0 : n[e]) == null ? void 0 : o.sitelinks;
}, Wi = async (r) => r ? (await ie.get(r)).data : null, zi = async (r) => {
  var t;
  return r ? (t = (await ie.get(r)).data) == null ? void 0 : t.query : null;
}, Vi = (r) => {
  let e;
  try {
    return e = new URL(r), e;
  } catch {
    return null;
  }
}, Ji = (r, e = 300) => {
  let t;
  return (...i) => {
    t || r.apply(void 0, i), clearTimeout(t), t = setTimeout(() => {
      t = void 0;
    }, e);
  };
}, Fe = () => {
  document.activeElement instanceof HTMLElement && document.activeElement.blur();
}, Gi = (r, e) => {
  const t = {
    A: !0,
    ABBR: !0,
    B: !0,
    BLOCKQUOTE: !0,
    BODY: !0,
    BR: !0,
    CENTER: !0,
    CODE: !0,
    DD: !0,
    DIV: !0,
    DL: !0,
    DT: !0,
    EM: !0,
    FONT: !0,
    H1: !0,
    H2: !0,
    H3: !0,
    H4: !0,
    H5: !0,
    H6: !0,
    HR: !0,
    I: !0,
    IMG: !0,
    LABEL: !0,
    LI: !0,
    OL: !0,
    P: !0,
    PRE: !0,
    SMALL: !0,
    SOURCE: !0,
    SPAN: !0,
    STRONG: !0,
    SUB: !0,
    SUP: !0,
    TABLE: !0,
    TBODY: !0,
    TR: !0,
    TD: !0,
    TH: !0,
    THEAD: !0,
    UL: !0,
    U: !0,
    VIDEO: !0
  }, i = { FORM: !0, "GOOGLE-SHEETS-HTML-ORIGIN": !0 }, n = {
    align: !0,
    color: !0,
    controls: !0,
    height: !0,
    href: !0,
    id: !0,
    src: !0,
    style: !0,
    target: !0,
    title: !0,
    type: !0,
    width: !0
  }, o = {
    "background-color": !0,
    color: !0,
    "font-size": !0,
    "font-weight": !0,
    "text-align": !0,
    "text-decoration": !0,
    width: !0
  }, s = ["http:", "https:", "data:", "m-files:", "file:", "ftp:", "mailto:", "pw:"], l = { href: !0, action: !0 }, a = new DOMParser();
  if (r = r.trim(), r == "" || r == "<br>")
    return "";
  r.indexOf("<body") == -1 && (r = "<body>" + r + "</body>");
  const c = a.parseFromString(r, "text/html");
  c.body.tagName !== "BODY" && c.body.remove(), typeof c.createElement != "function" && c.createElement.remove();
  function h(p) {
    let v;
    if (p.nodeType == Node.TEXT_NODE)
      v = p.cloneNode(!0);
    else if (p.nodeType == Node.ELEMENT_NODE && (t[p.tagName] || i[p.tagName] || e && p.matches(e))) {
      i[p.tagName] ? v = c.createElement("DIV") : v = c.createElement(p.tagName);
      for (let b = 0; b < p.attributes.length; b++) {
        const _ = p.attributes[b];
        if (n[_.name])
          if (_.name == "style")
            for (let R = 0; R < p.style.length; R++) {
              const O = p.style[R];
              o[O] && v.style.setProperty(O, p.style.getPropertyValue(O));
            }
          else {
            if (l[_.name] && _.value.indexOf(":") > -1 && !u(_.value, s))
              continue;
            v.setAttribute(_.name, _.value);
          }
      }
      for (let b = 0; b < p.childNodes.length; b++) {
        const _ = h(p.childNodes[b]);
        v.appendChild(_, !1);
      }
      if ((v.tagName == "SPAN" || v.tagName == "B" || v.tagName == "I" || v.tagName == "U") && v.innerHTML.trim() == "")
        return c.createDocumentFragment();
    } else
      v = c.createDocumentFragment();
    return v;
  }
  return h(c.body).innerHTML.replace(/<br[^>]*>(\S)/g, `<br>
$1`).replace(/div><div/g, `div>
<div`);
  function u(p, v) {
    for (let b = 0; b < v.length; b++)
      if (p.indexOf(v[b]) == 0)
        return !0;
    return !1;
  }
}, Qi = () => document.documentElement.lang || "nl", { language: Ki } = new Intl.Locale(Qi()), oe = {
  en: {
    info: {
      description: `This tool makes it easy to embed Wikipedia summaries into your website. To get started include the script into your website, then search for your desired Wikipedia article. 
			Copy the HTML code and paste it into a page. The article will be shown in the language of the website (if available).`,
      descriptionForZender: "Incase you are already using our CMS plugin, then you only have to copy the JSON code into the CMS. You can find the documentation for the plugins here (dutch only): ",
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
      readMore: "Read more on Wikipedia"
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
      descriptionForZender: "Indien u al gebruikt maakt van onze plugin voor uw CMS, moet u alleen dan de JSON code kopi\xEBren en plakken. Documentatie voor de plugins vindt u hier: ",
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
      readMore: "Lees verder op Wikipedia"
    },
    errors: {
      invalid: "Gelieve een geldig Q-ID of een wikipedia url in te geven.",
      notSupported: "Nederlandse versie van dit artikel kon niet teruggevonden worden."
    }
  }
}, Xi = hr`
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
		line-height: 0.8;
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
var Zi = Object.defineProperty, Yi = Object.getOwnPropertyDescriptor, w = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Yi(e, t) : e, o = r.length - 1, s; o >= 0; o--)
    (s = r[o]) && (n = (i ? s(e, t, n) : s(n)) || n);
  return i && n && Zi(e, t, n), n;
};
let g = class extends Z {
  constructor() {
    super(...arguments), this.isConfigMode = !1, this.searchValue = "", this.qId = "", this.outputSource = "", this.isSourceInJson = !0, this.showCodeCopiedFeedback = !1, this.showScriptCopiedFeedback = !1, this.showInfoSection = !1, this.title = "", this.description = "", this.thumbnail = { source: "", height: 0, width: 0 }, this.imgPosition = "img-left", this.pageSource = "", this.errorMessage = "", this.activeLanguage = Ki, this.content = this.activeLanguage === "nl" ? oe.nl : oe.en, this.radioGroup = [
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
    ], this.cdnScript = '<script type="module" src="https://cdn.jsdelivr.net/gh/studiohyperdrive/studiohyperdrive-zender-wiki-embed@release/stable/dist/zender-wiki-embed.min.js"><\/script>', this.debouncedFetchWiki = Ji(() => this.fetchWiki());
  }
  updated(r) {
    !this.isConfigMode && r.has("isConfigMode") && this.fetchWiki(), !r.has("outputSource") && !r.has("searchValue") && this.generateOutputCode(), this.isConfigMode && r.has("activeLanguage") && r.get("activeLanguage") && (this.content = this.activeLanguage === "nl" ? oe.nl : oe.en, this.radioGroup = [
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
    var a;
    const t = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org/i, [, , , i] = r.match(t) || [], n = await Fi(e, i);
    if (!n) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    if (i === this.activeLanguage) {
      const c = I(n.title, i), h = B(n.title, i);
      return { summaryUrl: c, fullIntroUrl: h };
    }
    const o = (a = n == null ? void 0 : n.langlinks) == null ? void 0 : a.find(({ lang: c }) => c === this.activeLanguage);
    let s, l;
    return o ? (s = I(o == null ? void 0 : o["*"], o == null ? void 0 : o.lang), l = B(o == null ? void 0 : o["*"], o == null ? void 0 : o.lang)) : (this.errorMessage = this.content.errors.notSupported, s = I(n.title, i), l = B(n.title, i)), { summaryUrl: s, fullIntroUrl: l };
  }
  async getWikiByTitleUrl(r) {
    const e = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org\/wiki\/([^/]+)/, [, , , t, i] = r.match(e) || [];
    if (t === this.activeLanguage) {
      const a = I(i, t), c = B(i, t);
      return { summaryUrl: a, fullIntroUrl: c };
    }
    const n = await qi(i, t);
    if (!n) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    const o = n.find(({ code: a }) => a === this.activeLanguage);
    let s, l;
    return o ? (s = I(o == null ? void 0 : o.title, o == null ? void 0 : o.code), l = B(o == null ? void 0 : o.title, o == null ? void 0 : o.code)) : (s = I(i, t), l = B(i, t), this.errorMessage = this.content.errors.notSupported), { summaryUrl: s, fullIntroUrl: l };
  }
  async getWikiByurl(r) {
    const e = Vi(r);
    if (!e) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    const t = e.searchParams.get("curid");
    return t ? this.getWikiByPageIdUrl(r, t) : this.getWikiByTitleUrl(r);
  }
  async getWikiByQid(r) {
    var s;
    const e = await ji(r), t = (e == null ? void 0 : e[`${this.activeLanguage}wiki`]) || (e == null ? void 0 : e.enwiki) || ((s = Object.values(e != null ? e : {})) == null ? void 0 : s[0]);
    if (!t) {
      this.errorMessage = this.content.errors.invalid;
      return;
    }
    const i = t.site.slice(0, 2), n = I(t == null ? void 0 : t.title, i), o = B(t == null ? void 0 : t.title, i);
    return { summaryUrl: n, fullIntroUrl: o };
  }
  isInputValid() {
    return this.searchValue = this.searchValue.replace(/ /g, ""), this.searchValue.match(/^\s*$/) ? (this.errorMessage = this.content.errors.invalid, !1) : (this.errorMessage = "", !0);
  }
  async fetchWiki() {
    var n;
    if (Fe(), !this.isInputValid())
      return;
    const r = /^q[0-9]+$/i;
    let e;
    this.searchValue.match(r) ? e = await this.getWikiByQid(this.searchValue) : e = await this.getWikiByurl(this.searchValue);
    const t = await Wi(e == null ? void 0 : e.summaryUrl), i = await zi(e == null ? void 0 : e.fullIntroUrl);
    if (!t) {
      this.title = "", this.description = "", this.thumbnail = { source: "", height: 0, width: 0 }, this.pageSource = "", this.qId = "";
      return;
    }
    this.qId = t.wikibase_item, this.title = t.title, this.description = Gi((n = i == null ? void 0 : i.pages[i.pageids[0]].extract) != null ? n : ""), this.thumbnail = t == null ? void 0 : t.thumbnail, this.pageSource = t.content_urls.desktop.page, this.imgPosition = t.thumbnail ? this.imgPosition : "no-img";
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
    Fe(), navigator.clipboard.writeText(this.cdnScript), this.showScriptCopiedFeedback = !0, setTimeout(() => this.showScriptCopiedFeedback = !1, 1500);
  }
  copyCodeToclipboard() {
    Fe(), navigator.clipboard.writeText(this.outputSource), this.showCodeCopiedFeedback = !0, setTimeout(() => this.showCodeCopiedFeedback = !1, 1500);
  }
  toggleCodeLang(r) {
    this.isSourceInJson = r;
  }
  toggleLanguage(r) {
    this.activeLanguage = r;
  }
  renderImgPositionSetting() {
    var r;
    return A`
			<h2>Config:</h2>

			<div>
				${(r = this.thumbnail) != null && r.source ? A`
							<p style="margin-bottom:0">${this.content.imgPosition.title}</p>
							${this.radioGroup.map(
      (e) => A`<input
											id=${e.id}
											type="radio"
											name="img_position"
											value=${e.id}
											@change=${this.handleRadioBtnChange}
											?checked=${this.imgPosition === e.id} />
										<label for="${e.id}">${e.label}</label><br />`
    )}
					  ` : A`<p style="margin-bottom:0">${this.content.imgPosition.noImgAvailable}</p>`}
			</div>
		`;
  }
  renderInfo() {
    return A`
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
				${this.showScriptCopiedFeedback ? A`<span>${this.content.info.btnClickFeedback}</span>` : ""}
				<button class="btn btn-code-copy" @click=${this.copyScriptToclipboard}>${this.content.info.btnText}</button>
			</div>

			<p style="margin-bottom: 2rem;">
				${this.content.info.descriptionForZender}
				<a
					href="/Handleiding_Wordpress_Plugin_wiki_embed.pdf"
					target="_blank"
					alt="Plugin documentation for Wordpress"
					title="Plugin documentation for Wordpress"
					>open Wordpress</a
				>
				|
				<a
					href="/Handleiding_Drupal_module_Wiki_embed.pdf"
					target="_blank"
					alt="Plugin documentation for Drupal"
					title="Plugin documentation for Drupal"
					>open Drupal</a
				>
			</p>
		`;
  }
  renderCodeBlock() {
    return A`
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
				${this.showCodeCopiedFeedback ? A`<span>${this.content.code.btnClickFeedback}</span>` : ""}
				<button class="btn btn-code-copy" @click=${this.copyCodeToclipboard}>${this.content.code.btnText}</button>
			</div>
		`;
  }
  renderConfigMode() {
    return A`
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
				${this.errorMessage ? A`<p class="invalid-input-feedback">${this.errorMessage}</p>` : ""}

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
    return A`
			<div class="${this.isConfigMode ? "container" : ""}">
				${this.isConfigMode ? this.renderConfigMode() : ""}

				<!--eslint-disable-next-line prettier/prettier -->
				${this.title && this.isConfigMode ? A`<h2>${this.content.preview.title}:</h2>` : ""}
				<div class="content-container ${this.imgPosition}">
					<div class="content">
						<h1 class="content-title">${this.title}</h1>

						${A`${Tr(this.description)}`}
					</div>

					${((r = this.thumbnail) == null ? void 0 : r.source) && this.imgPosition !== "no-img" ? A`
								<div class="thumbnail">
									<img
										src="${this.thumbnail.source}"
										alt="photo of ${this.title}"
										style="max-width: ${this.thumbnail.width}px" />
								</div>
						  ` : ""}

					<div class="read-more">
						${this.pageSource ? A`<p>
									<a href="${this.pageSource}"
										>${this.content.preview.readMore} <img src="/external-link-icon.svg" alt="external link icon" />
									</a>
							  </p>` : ""}
					</div>
				</div>
			</div>
		`;
  }
};
g.styles = Xi;
w([
  E({
    type: Boolean
  })
], g.prototype, "isConfigMode", 2);
w([
  E()
], g.prototype, "searchValue", 2);
w([
  E()
], g.prototype, "qId", 2);
w([
  E()
], g.prototype, "outputSource", 2);
w([
  E({ type: Boolean })
], g.prototype, "isSourceInJson", 2);
w([
  E({ type: Boolean })
], g.prototype, "showCodeCopiedFeedback", 2);
w([
  E({ type: Boolean })
], g.prototype, "showScriptCopiedFeedback", 2);
w([
  E({ type: Boolean })
], g.prototype, "showInfoSection", 2);
w([
  E()
], g.prototype, "title", 2);
w([
  E()
], g.prototype, "description", 2);
w([
  E({ type: Object })
], g.prototype, "thumbnail", 2);
w([
  E()
], g.prototype, "imgPosition", 2);
w([
  E()
], g.prototype, "pageSource", 2);
w([
  E()
], g.prototype, "errorMessage", 2);
w([
  E()
], g.prototype, "activeLanguage", 2);
w([
  E()
], g.prototype, "content", 2);
g = w([
  kr("my-element")
], g);
export {
  g as MyElement
};
