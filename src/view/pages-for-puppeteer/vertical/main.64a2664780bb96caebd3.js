(() => {
  class t {
    constructor(t = {}) { let e; let i; let s; let n; let a; this.min = (e = t.min) !== null && void 0 !== e ? e : 0, this.max = (i = t.max) !== null && void 0 !== i ? i : 150, this.leftValue = (s = t.leftValue) !== null && void 0 !== s ? s : 25, this.step = (n = t.step) !== null && void 0 !== n ? n : 1, t.range ? (this.rightValue = (a = t.rightValue) !== null && void 0 !== a ? a : 75, this.isRange = !0) : this.isRange = !1; }

    setLeftValue(t) { t < this.min ? this.leftValue = this.min : (this.isRange || (this.leftValue = Math.min(t, this.max)), this.isRange && (this.leftValue = Math.min(t, this.rightValue))); }

    setRightValue(t) { t > this.max ? this.rightValue = this.max : this.rightValue = Math.max(t, this.leftValue); }
  } function e(t, e) { const i = document.createElement(t); return e && (i.className = e), i; } class i {
    constructor() { this.component = e('div', 'range-slider__slider'); }

    append(...t) { this.component.append(...t); }

    before(...t) { this.component.before(...t); }
  } class s {
    constructor() { this.view = null, this.component = e('div', 'range-slider__track'), this.attachEventHandlers(); }

    registerWith(t) { this.view = t; }

    getOffsetWidth() { return this.component.offsetWidth; }

    getOffsetHeight() { return this.component.offsetHeight; }

    getBoundingClientRect() { return this.component.getBoundingClientRect(); }

    append(...t) { this.component.append(...t); }

    attachEventHandlers() { this.component.addEventListener('click', ((t) => { let e; const i = t.clientX - this.getBoundingClientRect().left; const s = t.clientY - this.getBoundingClientRect().top; (e = this.view) === null || void 0 === e || e.handleScaleOrTrackClick(i, s); })); }
  } class n {
    constructor() { this.component = e('div', 'range-slider__range js-range-slider__range'); }

    setLeftIndentInPx(t) { this.component.style.left = `${t}px`; }

    setRightIndentInPx(t) { this.component.style.right = `${t}px`; }

    setTopIndentInPx(t) { this.component.style.top = `${t}px`; }

    setBottomIndentInPx(t) { this.component.style.bottom = `${t}px`; }

    setWidthInPx(t) { this.component.style.width = `${t}px`; }

    setHeightInPx(t) { this.component.style.height = `${t}px`; }
  } class a {
    constructor(t = 'left') { this.view = null, this.type = t, this.component = e('div', `range-slider__thumb range-slider__thumb_${t} js-range-slider__thumb_${t}`), this.attachEventHandlers(); }

    registerWith(t) { this.view = t; }

    setLeftIndentInPx(t) { this.component.style.left = `${t}px`; }

    setTopIndentInPx(t) { this.component.style.top = `${t}px`; }

    getLeftIndent() { return this.component.style.left; }

    getTopIndent() { return this.component.style.top; }

    setZIndex(t) { this.component.style.zIndex = `${t}`; }

    getBoundingClientRect() { return this.component.getBoundingClientRect(); }

    attachEventHandlers() { this.component.addEventListener('pointerover', (() => { this.component.classList.add('range-slider__thumb_hover'); })), this.component.addEventListener('pointerout', (() => { this.component.classList.remove('range-slider__thumb_hover'); })), this.component.addEventListener('pointerdown', (() => { this.component.classList.add('range-slider__thumb_active'); })), this.component.addEventListener('pointerup', (() => { this.component.classList.remove('range-slider__thumb_active'); })), this.component.addEventListener('pointerdown', ((t) => { this.component.setPointerCapture(t.pointerId), t.preventDefault(); const e = t.clientX - this.getBoundingClientRect().left; const i = t.clientY - this.getBoundingClientRect().top; const s = (t) => { let s; let n; this.type == 'left' && ((s = this.view) === null || void 0 === s || s.handleLeftInput(t.clientX, t.clientY, e, i)), this.type == 'right' && ((n = this.view) === null || void 0 === n || n.handleRightInput(t.clientX, t.clientY, e, i)); }; const n = () => { this.component.removeEventListener('pointermove', s), this.component.removeEventListener('pointerup', n); }; this.component.addEventListener('pointermove', s), this.component.addEventListener('pointerup', n); })), this.component.addEventListener('dragstart', (() => !1)); }
  } class l {
    constructor(t = 'left') { this.type = t, this.component = document.createElement('div'); }

    setOpacity(t) { this.component.style.opacity = `${t}`; }

    setValue(t) { this.component.textContent = `${t}`; }

    getValue() { return this.component.textContent; }

    getBoundingClientRect() { return this.component.getBoundingClientRect(); }

    getOffsetWidth() { return this.component.offsetWidth; }

    getOffsetHeight() { return this.component.offsetHeight; }
  } class h extends l {constructor(t = 'left') { super(t), this.component = e('div', `range-slider__min-max-label range-slider__min-max-label_${t} js-range-slider__min-max-label_${t}`); }} class o extends l {
    constructor(t = 'left') { super(t), this.component = e('div', `range-slider__value-label range-slider__value-label_${t} js-range-slider__value-label_${t}`); }

    setLeftIndent(t) { this.component.style.left = t; }

    getLeftIndent() { return this.component.style.left; }

    setTopIndent(t) { this.component.style.top = t; }

    getTopIndent() { return this.component.style.top; }
  } class r {
    constructor(t, i, s = 4) { this.view = null, this.component = e('div', 'range-slider__scale'), this.min = t, this.max = i, this.intervalsNumber = s, this.intervals = [], this.values = [], this.valueElements = [], this.createIntervals(), this.addMarksInIntervals(), this.addValues(), this.attachEventHandlers(); }

    registerWith(t) { this.view = t; }

    createIntervals() { for (let t = 0; t < this.intervalsNumber; t++) this.intervals[t] = e('div', 'range-slider__scale-interval'), this.component.append(this.intervals[t]); }

    addMarksInIntervals() { this.intervals.forEach(((t) => { const i = new DocumentFragment(); this.intervalsNumber < 29 && i.append(e('span', 'range-slider__scale-mark')), this.intervalsNumber < 15 && i.append(e('span', 'range-slider__scale-mark')), this.intervalsNumber < 8 && i.append(e('span', 'range-slider__scale-mark')), this.intervalsNumber < 5 && i.append(e('span', 'range-slider__scale-mark')), t.append(i); })); }

    addValues() { this.values[0] = this.min; const t = Math.round((this.max - this.min) / this.intervalsNumber); for (let e = 1; e < this.intervalsNumber; e++) this.values[e] = e * t + this.min; this.values.push(this.max); const i = e('span', 'range-slider__scale-interval-value range-slider__scale-interval-value_min'); i.textContent = `${this.values[0]}`, this.intervals[0].append(i), this.valueElements.push(i); for (let t = 1; t < this.values.length; t++) { const i = e('span', 'range-slider__scale-interval-value'); i.textContent = `${this.values[t]}`, this.intervals[t - 1].append(i), this.valueElements.push(i); } }

    fitWidthForVertical() { let t = 0; this.valueElements.forEach(((e) => { e.offsetWidth > t && (t = e.offsetWidth); })), this.component.style.paddingRight = `${t + 3}px`; }

    fitHeightForHorizontal() { let t = 0; this.valueElements.forEach(((e) => { e.offsetHeight > t && (t = e.offsetHeight); })), this.component.style.paddingBottom = `${t + 3}px`; }

    getBoundingClientRect() { return this.component.getBoundingClientRect(); }

    attachEventHandlers() { this.component.addEventListener('click', ((t) => { let e; const i = t.clientX - this.getBoundingClientRect().left; const s = t.clientY - this.getBoundingClientRect().top; (e = this.view) === null || void 0 === e || e.handleScaleOrTrackClick(i, s); })); }
  } class c {
    constructor() { this.component = e('div', 'range-slider__labels-container'); }

    append(...t) { this.component.append(...t); }

    fixWidthForVertical(t) { let e = 0; t.forEach(((t) => { t.getOffsetWidth() > e && (e = t.getOffsetWidth()); })), this.component.style.paddingLeft = `${e + 4}px`; }

    fixHeightForHorizontal(t) { let e = 0; t.forEach(((t) => { t.getOffsetHeight() > e && (e = t.getOffsetHeight()); })), this.component.style.paddingTop = `${e + 4}px`; }
  } class u {
    constructor(t, e = {}) { let l; this.presenter = null, this.component = t, this.slider = new i(), this.track = new s(), this.track.registerWith(this), this.range = new n(), this.thumbLeft = new a('left'), this.thumbLeft.registerWith(this), e.range ? (this.isRange = !0, this.thumbRight = new a('right'), this.thumbRight.registerWith(this)) : this.isRange = !1, e.scale ? (this.hasScale = !0, this.scaleIntervals = (l = e.scaleIntervals) !== null && void 0 !== l ? l : 4) : this.hasScale = !1, (e.minMaxLabels || e.valueLabel) && (this.labelsContainer = new c(), e.minMaxLabels && (this.minLabel = new h('left'), this.maxLabel = new h('right')), e.valueLabel && (this.valueLabelLeft = new o('left'), e.range && (this.valueLabelRight = new o('right'), this.valueLabelCommon = new o('common')))), e.vertical && (this.vertical = !0), this.render(); }

    registerWith(t) { this.presenter = t; }

    render() { this.track.append(this.range.component), this.slider.append(this.track.component, this.thumbLeft.component), this.component.append(this.slider.component), this.isRange ? this.slider.append(this.thumbRight.component) : (this.vertical || this.range.setLeftIndentInPx(0), this.vertical && this.range.setBottomIndentInPx(0)), this.minLabel && this.maxLabel && this.labelsContainer.append(this.minLabel.component, this.maxLabel.component), this.valueLabelLeft && (this.labelsContainer.append(this.valueLabelLeft.component), this.isRange && this.labelsContainer.append(this.valueLabelRight.component, this.valueLabelCommon.component)), this.labelsContainer && this.slider.before(this.labelsContainer.component), this.vertical && this.component.classList.add('range-slider_vertical'); }

    setMinValue(t) { this.minLabel && this.minLabel.setValue(t); }

    setMaxValue(t) { this.maxLabel && this.maxLabel.setValue(t); }

    setLeftValue(t, e) { if (this.vertical || (this.thumbLeft.setLeftIndentInPx(e), this.isRange || this.range.setWidthInPx(e), this.isRange && this.range.setLeftIndentInPx(e), this.valueLabelLeft && this.valueLabelLeft.setLeftIndent(this.thumbLeft.getLeftIndent()), parseInt(this.thumbLeft.getLeftIndent()) == this.track.getOffsetWidth() ? this.thumbLeft.setZIndex(100) : this.thumbLeft.setZIndex(3)), this.vertical) { const t = this.track.getOffsetHeight() - e; this.thumbLeft.setTopIndentInPx(t), this.isRange || this.range.setHeightInPx(e), this.isRange && this.range.setBottomIndentInPx(e), this.valueLabelLeft && this.valueLabelLeft.setTopIndent(this.thumbLeft.getTopIndent()), parseInt(this.thumbLeft.getTopIndent()) == 0 ? this.thumbLeft.setZIndex(100) : this.thumbLeft.setZIndex(3); } this.valueLabelLeft && (this.valueLabelLeft.setValue(t), this.isRange && (this.valueLabelCommon.setValue(`${t} - ${this.valueLabelRight.getValue()}`), this.isTwoValueLabelsClose() ? this.mergeLabels() : this.splitLabels())), this.valueLabelLeft && this.minLabel && (this.isLeftValueLabelCloseToMinLabel() ? this.minLabel.setOpacity(0) : this.minLabel.setOpacity(1), this.isRange || (this.isLeftValueLabelCloseToMaxLabel() ? this.maxLabel.setOpacity(0) : this.maxLabel.setOpacity(1))); }

    setRightValue(t, e) { if (this.vertical || (this.thumbRight.setLeftIndentInPx(e), this.range.setRightIndentInPx(this.track.getOffsetWidth() - e), this.valueLabelRight && this.valueLabelRight.setLeftIndent(this.thumbRight.getLeftIndent())), this.vertical) { const t = this.track.getOffsetHeight() - e; this.thumbRight.setTopIndentInPx(t), this.range.setTopIndentInPx(t), this.valueLabelRight && this.valueLabelRight.setTopIndent(this.thumbRight.getTopIndent()); } this.valueLabelRight && (this.valueLabelRight.setValue(t), this.valueLabelCommon.setValue(`${this.valueLabelLeft.getValue()} - ${t}`), this.isTwoValueLabelsClose() ? this.mergeLabels() : this.splitLabels()), this.valueLabelRight && this.maxLabel && (this.isRightValueLabelCloseToMaxLabel() ? this.maxLabel.setOpacity(0) : this.maxLabel.setOpacity(1)); }

    mergeLabels() { let t; let e; let i; let s; let n; if ((t = this.valueLabelLeft) === null || void 0 === t || t.setOpacity(0), (e = this.valueLabelRight) === null || void 0 === e || e.setOpacity(0), (i = this.valueLabelCommon) === null || void 0 === i || i.setOpacity(1), !this.vertical) { const t = parseInt(this.thumbRight.getLeftIndent()) - parseInt(this.thumbLeft.getLeftIndent()); (s = this.valueLabelCommon) === null || void 0 === s || s.setLeftIndent(`${parseInt(this.valueLabelLeft.getLeftIndent()) + t / 2}px`); } if (this.vertical) { const t = parseInt(this.thumbRight.getTopIndent()) - parseInt(this.thumbLeft.getTopIndent()); (n = this.valueLabelCommon) === null || void 0 === n || n.setTopIndent(`${parseInt(this.valueLabelRight.getTopIndent()) - t / 2}px`); } }

    splitLabels() { let t; let e; let i; (t = this.valueLabelCommon) === null || void 0 === t || t.setOpacity(0), (e = this.valueLabelLeft) === null || void 0 === e || e.setOpacity(1), (i = this.valueLabelRight) === null || void 0 === i || i.setOpacity(1); }

    isTwoValueLabelsClose() { if (!this.vertical) { const t = this.valueLabelLeft.getBoundingClientRect().right; return this.valueLabelRight.getBoundingClientRect().left - t < 3; } if (this.vertical) return this.valueLabelLeft.getBoundingClientRect().top - this.valueLabelRight.getBoundingClientRect().bottom < 3; }

    isLeftValueLabelCloseToMinLabel() { let t; let e; return this.vertical ? this.vertical ? (t = this.valueLabelLeft.getBoundingClientRect().bottom, e = this.minLabel.getBoundingClientRect().top, e - t < 3) : void 0 : (t = this.valueLabelLeft.getBoundingClientRect().left, e = this.minLabel.getBoundingClientRect().right, t - e < 3); }

    isLeftValueLabelCloseToMaxLabel() { let t; let e; return this.vertical ? this.vertical ? (t = this.valueLabelLeft.getBoundingClientRect().top, e = this.maxLabel.getBoundingClientRect().bottom, t - e < 3) : void 0 : (t = this.valueLabelLeft.getBoundingClientRect().right, e = this.maxLabel.getBoundingClientRect().left, e - t < 3); }

    isRightValueLabelCloseToMaxLabel() { let t; let e; return this.vertical ? this.vertical ? (t = this.valueLabelRight.getBoundingClientRect().top, e = this.maxLabel.getBoundingClientRect().bottom, t - e < 3) : void 0 : (t = this.valueLabelRight.getBoundingClientRect().right, e = this.maxLabel.getBoundingClientRect().left, e - t < 3); }

    handleLeftInput(t, e, i = 0, s = 0) { let n; let a; if (!this.vertical) { let e = t - i - this.track.getBoundingClientRect().left; if (e < 0 && (e = 0), this.isRange || e > this.track.getOffsetWidth() && (e = this.track.getOffsetWidth()), this.isRange) { const t = parseInt(this.thumbRight.getLeftIndent()); e > t && (e = t); }(n = this.presenter) === null || void 0 === n || n.handleLeftInput(e); } if (this.vertical) { let t = e - s - this.track.getBoundingClientRect().top; if (t > this.track.getOffsetHeight() && (t = this.track.getOffsetHeight()), this.isRange || t < 0 && (t = 0), this.isRange) { const e = parseInt(this.thumbRight.getTopIndent()); t < e && (t = e); } const i = this.track.getOffsetHeight() - t; (a = this.presenter) === null || void 0 === a || a.handleLeftInput(i); } }

    handleRightInput(t, e, i = 0, s = 0) { let n; let a; if (!this.vertical) { let e = t - i - this.track.getBoundingClientRect().left; const s = parseInt(this.thumbLeft.getLeftIndent()); e < s && (e = s), e > this.track.getOffsetWidth() && (e = this.track.getOffsetWidth()), (n = this.presenter) === null || void 0 === n || n.handleRightInput(e); } if (this.vertical) { let t = e - s - this.track.getBoundingClientRect().top; const i = parseInt(this.thumbLeft.getTopIndent()); t < 0 && (t = 0), t > i && (t = i); const n = this.track.getOffsetHeight() - t; (a = this.presenter) === null || void 0 === a || a.handleRightInput(n); } }

    addScale(t, e, i) { this.scale = new r(t, e, i), this.scale.registerWith(this), this.component.append(this.scale.component), this.vertical || this.scale.fitHeightForHorizontal(), this.vertical && this.scale.fitWidthForVertical(); }

    handleScaleOrTrackClick(t, e) { let i; let s; let n; let a; let l; let h; this.isRange || (this.addSmoothTransition('left'), this.vertical ? (s = this.presenter) === null || void 0 === s || s.handleLeftInput(this.track.getOffsetHeight() - e) : (i = this.presenter) === null || void 0 === i || i.handleLeftInput(t), setTimeout((() => { this.removeSmoothTransition('left'); }), 1e3)), this.isRange && (this.whichThumbIsNearer(t, e) == 'left' ? (this.addSmoothTransition('left'), this.vertical ? (a = this.presenter) === null || void 0 === a || a.handleLeftInput(this.track.getOffsetHeight() - e) : (n = this.presenter) === null || void 0 === n || n.handleLeftInput(t), setTimeout((() => { this.removeSmoothTransition('left'); }), 1e3)) : (this.addSmoothTransition('right'), this.vertical ? (h = this.presenter) === null || void 0 === h || h.handleRightInput(this.track.getOffsetHeight() - e) : (l = this.presenter) === null || void 0 === l || l.handleRightInput(t), setTimeout((() => { this.removeSmoothTransition('right'); }), 1e3))); }

    whichThumbIsNearer(t, e) { const i = this.thumbLeft.getBoundingClientRect(); const s = this.thumbRight.getBoundingClientRect(); const n = this.track.getBoundingClientRect(); let a = 0; let l = 0; if (!this.vertical) { const e = i.left + i.width / 2 - n.left; const h = s.left + s.width / 2 - n.left; a = Math.abs(t - e), l = Math.abs(t - h); } if (this.vertical) { const t = i.top + i.height / 2 - n.top; const h = s.top + s.height / 2 - n.top; a = Math.abs(e - t), l = Math.abs(e - h); } return a <= l ? 'left' : 'right'; }

    addSmoothTransition(t = 'left') { t == 'left' && (this.thumbLeft.component.classList.add('range-slider__thumb_smooth-transition'), this.range.component.classList.add('range-slider__range_smooth-transition'), this.valueLabelLeft && this.valueLabelLeft.component.classList.add('range-slider__value-label_smooth-transition')), t == 'right' && (this.thumbRight.component.classList.add('range-slider__thumb_smooth-transition'), this.range.component.classList.add('range-slider__range_smooth-transition'), this.valueLabelRight && this.valueLabelRight.component.classList.add('range-slider__value-label_smooth-transition')); }

    removeSmoothTransition(t = 'left') { t == 'left' && (this.thumbLeft.component.classList.remove('range-slider__thumb_smooth-transition'), this.range.component.classList.remove('range-slider__range_smooth-transition'), this.valueLabelLeft && this.valueLabelLeft.component.classList.remove('range-slider__value-label_smooth-transition')), t == 'right' && (this.thumbRight.component.classList.remove('range-slider__thumb_smooth-transition'), this.range.component.classList.remove('range-slider__range_smooth-transition'), this.valueLabelRight && this.valueLabelRight.component.classList.remove('range-slider__value-label_smooth-transition')); }

    fixLabelsContainerWidthForVertical() { let t; const e = this.collectLabels(); (t = this.labelsContainer) === null || void 0 === t || t.fixWidthForVertical(e); }

    fixLabelsContainerHeightForHorizontal() { let t; const e = this.collectLabels(); (t = this.labelsContainer) === null || void 0 === t || t.fixHeightForHorizontal(e); }

    collectLabels() { const t = []; return this.minLabel && this.maxLabel && (t.push(this.minLabel), t.push(this.maxLabel)), this.valueLabelLeft && t.push(this.valueLabelLeft), this.valueLabelRight && t.push(this.valueLabelRight), t; }
  } class d {
    constructor(t, e) { this.model = t, this.view = e, this.view.setMinValue(t.min), this.view.setMaxValue(t.max), this.passLeftValueToView(t.leftValue), this.view.isRange && this.passRightValueToView(t.rightValue), this.view.hasScale && this.view.addScale(t.min, t.max, e.scaleIntervals), this.view.vertical || !this.view.valueLabelLeft && !this.view.minLabel || this.view.fixLabelsContainerHeightForHorizontal(), this.view.vertical && (this.view.valueLabelLeft || this.view.minLabel) && this.view.fixLabelsContainerWidthForVertical(); }

    handleLeftInput(t) { const e = this.convertPxToValue(t); this.model.setLeftValue(e), this.view.setLeftValue(e, this.convertValueToPx(e)); }

    handleRightInput(t) { const e = this.convertPxToValue(t); this.model.setRightValue(e), this.view.setRightValue(e, this.convertValueToPx(e)); }

    passLeftValueToView(t) { const e = this.convertValueToPx(t); this.view.setLeftValue(t, e); }

    passRightValueToView(t) { const e = this.convertValueToPx(t); this.view.setRightValue(t, e); }

    convertValueToPx(t) { const e = this.model.min; const i = (t - e) / (this.model.max - e) * 100; let s = 0; return this.view.vertical || (s = +this.view.track.getOffsetWidth() * i / 100), this.view.vertical && (s = +this.view.track.getOffsetHeight() * i / 100), s; }

    convertPxToValue(t) { const e = this.model.min; const i = this.model.max; let s = 0; this.view.vertical || (s = 100 * t / +this.view.track.getOffsetWidth()), this.view.vertical && (s = 100 * t / +this.view.track.getOffsetHeight()); let n = (i - e) * s / 100 + e; return n = this.fitToStep(n), n = this.removeCalcInaccuracy(n), n; }

    fitToStep(t) { let e = Math.round(t / this.model.step) * this.model.step; return e = this.removeCalcInaccuracy(e), e; }

    removeCalcInaccuracy(t) { return +t.toFixed(10); }
  }window.addEventListener('load', (() => {
    const e = document.querySelectorAll('.js-range-slider'); for (const i of e) {
      const e = new t({ range: !0 }); const s = new u(i, {
        minMaxLabels: !0, valueLabel: !0, vertical: !0, range: !0, scale: !0, scaleIntervals: 5,
      }); const n = new d(e, s); s.registerWith(n);
    }
  }));
})();
