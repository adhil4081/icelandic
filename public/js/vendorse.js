
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
    "use strict";

    function m(v) {
        if (!v) throw new Error("No options passed to Waypoint constructor");
        if (!v.element) throw new Error("No element option passed to Waypoint constructor");
        if (!v.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + S, this.options = m.Adapter.extend({}, m.defaults, v), this.element = this.options.element, this.adapter = new m.Adapter(this.element), this.callback = v.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = m.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = m.Context.findOrCreateByElement(this.options.context), m.offsetAliases[this.options.offset] && (this.options.offset = m.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), u[this.key] = this, S += 1
    }
    var S = 0,
        u = {};
    m.prototype.queueTrigger = function(v) {
        this.group.queueTrigger(this, v)
    }, m.prototype.trigger = function(v) {
        this.enabled && this.callback && this.callback.apply(this, v)
    }, m.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete u[this.key]
    }, m.prototype.disable = function() {
        return this.enabled = !1, this
    }, m.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, m.prototype.next = function() {
        return this.group.next(this)
    }, m.prototype.previous = function() {
        return this.group.previous(this)
    }, m.invokeAll = function(v) {
        var c = [];
        for (var d in u) c.push(u[d]);
        for (var l = 0, g = c.length; g > l; l++) c[l][v]()
    }, m.destroyAll = function() {
        m.invokeAll("destroy")
    }, m.disableAll = function() {
        m.invokeAll("disable")
    }, m.enableAll = function() {
        m.invokeAll("enable")
    }, m.refreshAll = function() {
        m.Context.refreshAll()
    }, m.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, m.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, m.adapters = [], m.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, m.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = m
})(),
function() {
    "use strict";

    function m(l) {
        window.setTimeout(l, 1e3 / 60)
    }

    function S(l) {
        this.element = l, this.Adapter = c.Adapter, this.adapter = new this.Adapter(l), this.key = "waypoint-context-" + u, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, l.waypointContextKey = this.key, v[l.waypointContextKey] = this, u += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var u = 0,
        v = {},
        c = window.Waypoint,
        d = window.onload;
    S.prototype.add = function(l) {
        var g = l.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[g][l.key] = l, this.refresh()
    }, S.prototype.checkEmpty = function() {
        var l = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            g = this.Adapter.isEmptyObject(this.waypoints.vertical);
        l && g && (this.adapter.off(".waypoints"), delete v[this.key])
    }, S.prototype.createThrottledResizeHandler = function() {
        function l() {
            g.handleResize(), g.didResize = !1
        }
        var g = this;
        this.adapter.on("resize.waypoints", function() {
            g.didResize || (g.didResize = !0, c.requestAnimationFrame(l))
        })
    }, S.prototype.createThrottledScrollHandler = function() {
        function l() {
            g.handleScroll(), g.didScroll = !1
        }
        var g = this;
        this.adapter.on("scroll.waypoints", function() {
            (!g.didScroll || c.isTouch) && (g.didScroll = !0, c.requestAnimationFrame(l))
        })
    }, S.prototype.handleResize = function() {
        c.Context.refreshAll()
    }, S.prototype.handleScroll = function() {
        var l = {},
            g = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var T in g) {
            var I = g[T],
                D = I.newScroll > I.oldScroll,
                y = D ? I.forward : I.backward;
            for (var b in this.waypoints[T]) {
                var C = this.waypoints[T][b],
                    O = I.oldScroll < C.triggerPoint,
                    P = I.newScroll >= C.triggerPoint,
                    E = O && P,
                    o = !O && !P;
                (E || o) && (C.queueTrigger(y), l[C.group.id] = C.group)
            }
        }
        for (var a in l) l[a].flushTriggers();
        this.oldScroll = {
            x: g.horizontal.newScroll,
            y: g.vertical.newScroll
        }
    }, S.prototype.innerHeight = function() {
        return this.element == this.element.window ? c.viewportHeight() : this.adapter.innerHeight()
    }, S.prototype.remove = function(l) {
        delete this.waypoints[l.axis][l.key], this.checkEmpty()
    }, S.prototype.innerWidth = function() {
        return this.element == this.element.window ? c.viewportWidth() : this.adapter.innerWidth()
    }, S.prototype.destroy = function() {
        var l = [];
        for (var g in this.waypoints)
            for (var T in this.waypoints[g]) l.push(this.waypoints[g][T]);
        for (var I = 0, D = l.length; D > I; I++) l[I].destroy()
    }, S.prototype.refresh = function() {
        var l, g = this.element == this.element.window,
            T = g ? void 0 : this.adapter.offset(),
            I = {};
        this.handleScroll(), l = {
            horizontal: {
                contextOffset: g ? 0 : T.left,
                contextScroll: g ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: g ? 0 : T.top,
                contextScroll: g ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var D in l) {
            var y = l[D];
            for (var b in this.waypoints[D]) {
                var C, O, P, E, o, a = this.waypoints[D][b],
                    h = a.options.offset,
                    k = a.triggerPoint,
                    _ = 0,
                    M = k == null;
                a.element !== a.element.window && (_ = a.adapter.offset()[y.offsetProp]), typeof h == "function" ? h = h.apply(a) : typeof h == "string" && (h = parseFloat(h), a.options.offset.indexOf("%") > -1 && (h = Math.ceil(y.contextDimension * h / 100))), C = y.contextScroll - y.contextOffset, a.triggerPoint = _ + C - h, O = k < y.oldScroll, P = a.triggerPoint >= y.oldScroll, E = O && P, o = !O && !P, !M && E ? (a.queueTrigger(y.backward), I[a.group.id] = a.group) : (!M && o || M && y.oldScroll >= a.triggerPoint) && (a.queueTrigger(y.forward), I[a.group.id] = a.group)
            }
        }
        return c.requestAnimationFrame(function() {
            for (var F in I) I[F].flushTriggers()
        }), this
    }, S.findOrCreateByElement = function(l) {
        return S.findByElement(l) || new S(l)
    }, S.refreshAll = function() {
        for (var l in v) v[l].refresh()
    }, S.findByElement = function(l) {
        return v[l.waypointContextKey]
    }, window.onload = function() {
        d && d(), S.refreshAll()
    }, c.requestAnimationFrame = function(l) {
        var g = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || m;
        g.call(window, l)
    }, c.Context = S
}(),
function() {
    "use strict";

    function m(d, l) {
        return d.triggerPoint - l.triggerPoint
    }

    function S(d, l) {
        return l.triggerPoint - d.triggerPoint
    }

    function u(d) {
        this.name = d.name, this.axis = d.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), v[this.axis][this.name] = this
    }
    var v = {
            vertical: {},
            horizontal: {}
        },
        c = window.Waypoint;
    u.prototype.add = function(d) {
        this.waypoints.push(d)
    }, u.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, u.prototype.flushTriggers = function() {
        for (var d in this.triggerQueues) {
            var l = this.triggerQueues[d],
                g = d === "up" || d === "left";
            l.sort(g ? S : m);
            for (var T = 0, I = l.length; I > T; T += 1) {
                var D = l[T];
                (D.options.continuous || T === l.length - 1) && D.trigger([d])
            }
        }
        this.clearTriggerQueues()
    }, u.prototype.next = function(d) {
        this.waypoints.sort(m);
        var l = c.Adapter.inArray(d, this.waypoints),
            g = l === this.waypoints.length - 1;
        return g ? null : this.waypoints[l + 1]
    }, u.prototype.previous = function(d) {
        this.waypoints.sort(m);
        var l = c.Adapter.inArray(d, this.waypoints);
        return l ? this.waypoints[l - 1] : null
    }, u.prototype.queueTrigger = function(d, l) {
        this.triggerQueues[l].push(d)
    }, u.prototype.remove = function(d) {
        var l = c.Adapter.inArray(d, this.waypoints);
        l > -1 && this.waypoints.splice(l, 1)
    }, u.prototype.first = function() {
        return this.waypoints[0]
    }, u.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, u.findOrCreate = function(d) {
        return v[d.axis][d.name] || new u(d)
    }, c.Group = u
}(),
function() {
    "use strict";

    function m(v) {
        this.$element = S(v)
    }
    var S = window.jQuery,
        u = window.Waypoint;
    S.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(v, c) {
        m.prototype[c] = function() {
            var d = Array.prototype.slice.call(arguments);
            return this.$element[c].apply(this.$element, d)
        }
    }), S.each(["extend", "inArray", "isEmptyObject"], function(v, c) {
        m[c] = S[c]
    }), u.adapters.push({
        name: "jquery",
        Adapter: m
    }), u.Adapter = m
}(),
function() {
    "use strict";

    function m(u) {
        return function() {
            var v = [],
                c = arguments[0];
            return u.isFunction(arguments[0]) && (c = u.extend({}, arguments[1]), c.handler = arguments[0]), this.each(function() {
                var d = u.extend({}, c, {
                    element: this
                });
                typeof d.context == "string" && (d.context = u(this).closest(d.context)[0]), v.push(new S(d))
            }), v
        }
    }
    var S = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = m(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = m(window.Zepto))
}();
/*!
Waypoints Infinite Scroll Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
    "use strict";

    function m(v) {
        this.options = S.extend({}, m.defaults, v), this.container = this.options.element, this.options.container !== "auto" && (this.container = this.options.container), this.$container = S(this.container), this.$more = S(this.options.more), this.$more.length && (this.setupHandler(), this.waypoint = new u(this.options))
    }
    var S = window.jQuery,
        u = window.Waypoint;
    m.prototype.setupHandler = function() {
        this.options.handler = S.proxy(function() {
            this.options.onBeforePageLoad(), this.destroy(), this.$container.addClass(this.options.loadingClass), S.get(S(this.options.more).attr("href"), S.proxy(function(v) {
                var c = S(S.parseHTML(v)),
                    d = c.find(this.options.more),
                    l = c.find(this.options.items);
                l.length || (l = c.filter(this.options.items)), this.$container.append(l), this.$container.removeClass(this.options.loadingClass), d.length || (d = c.filter(this.options.more)), d.length ? (this.$more.replaceWith(d), this.$more = d, this.waypoint = new u(this.options)) : this.$more.remove(), this.options.onAfterPageLoad(l)
            }, this))
        }, this)
    }, m.prototype.destroy = function() {
        this.waypoint && this.waypoint.destroy()
    }, m.defaults = {
        container: "auto",
        items: ".infinite-item",
        more: ".infinite-more-link",
        offset: "bottom-in-view",
        loadingClass: "infinite-loading",
        onBeforePageLoad: S.noop,
        onAfterPageLoad: S.noop
    }, u.Infinite = m
})();

function PointerEventsPolyfill(m) {
    if (this.options = {
            selector: "*",
            mouseEvents: ["click", "dblclick", "mousedown", "mouseup"],
            usePolyfillIf: function() {
                if (navigator.appName == "Microsoft Internet Explorer") {
                    var u = navigator.userAgent;
                    if (u.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/) != null) {
                        var v = parseFloat(RegExp.$1);
                        if (11 > v) return !0
                    }
                }
                return !1
            }
        }, m) {
        var S = this;
        $.each(m, function(u, v) {
            S.options[u] = v
        })
    }
    this.options.usePolyfillIf() && this.register_mouse_events()
}
PointerEventsPolyfill.initialize = function(m) {
    return PointerEventsPolyfill.singleton == null && (PointerEventsPolyfill.singleton = new PointerEventsPolyfill(m)), PointerEventsPolyfill.singleton
}, PointerEventsPolyfill.prototype.register_mouse_events = function() {
    $(document).on(this.options.mouseEvents.join(" "), this.options.selector, function(m) {
        if ($(this).css("pointer-events") == "none") {
            var S = $(this).css("display");
            $(this).css("display", "none");
            var u = document.elementFromPoint(m.clientX, m.clientY);
            return S ? $(this).css("display", S) : $(this).css("display", ""), m.target = u, $(u).trigger(m), !1
        }
        return !0
    })
}, String.prototype.startsWith || (String.prototype.startsWith = function(m, S) {
    return S = S || 0, this.indexOf(m, S) === S
});
/*!
 * Flickity PACKAGED v2.1.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */
(function(m, S) {
    typeof define == "function" && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(u) {
        return S(m, u)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("jquery")) : m.jQueryBridget = S(m, m.jQuery)
})(window, function(m, S) {
    "use strict";

    function u(g, T, I) {
        function D(b, C, O) {
            var P, E = "$()." + g + '("' + C + '")';
            return b.each(function(o, a) {
                var h = I.data(a, g);
                if (!h) return void l(g + " not initialized. Cannot call methods, i.e. " + E);
                var k = h[C];
                if (!k || C.charAt(0) == "_") return void l(E + " is not a valid method");
                var _ = k.apply(h, O);
                P = P === void 0 ? _ : P
            }), P !== void 0 ? P : b
        }

        function y(b, C) {
            b.each(function(O, P) {
                var E = I.data(P, g);
                E ? (E.option(C), E._init()) : (E = new T(P, C), I.data(P, g, E))
            })
        }
        I = I || S || m.jQuery, I && (T.prototype.option || (T.prototype.option = function(b) {
            I.isPlainObject(b) && (this.options = I.extend(!0, this.options, b))
        }), I.fn[g] = function(b) {
            if (typeof b == "string") {
                var C = c.call(arguments, 1);
                return D(this, b, C)
            }
            return y(this, b), this
        }, v(I))
    }

    function v(g) {
        !g || g && g.bridget || (g.bridget = u)
    }
    var c = Array.prototype.slice,
        d = m.console,
        l = typeof d == "undefined" ? function() {} : function(g) {
            d.error(g)
        };
    return v(S || m.jQuery), u
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("ev-emitter/ev-emitter", S) : typeof module == "object" && module.exports ? module.exports = S() : m.EvEmitter = S()
}(typeof window != "undefined" ? window : this, function() {
    function m() {}
    var S = m.prototype;
    return S.on = function(u, v) {
        if (u && v) {
            var c = this._events = this._events || {},
                d = c[u] = c[u] || [];
            return d.indexOf(v) == -1 && d.push(v), this
        }
    }, S.once = function(u, v) {
        if (u && v) {
            this.on(u, v);
            var c = this._onceEvents = this._onceEvents || {},
                d = c[u] = c[u] || {};
            return d[v] = !0, this
        }
    }, S.off = function(u, v) {
        var c = this._events && this._events[u];
        if (c && c.length) {
            var d = c.indexOf(v);
            return d != -1 && c.splice(d, 1), this
        }
    }, S.emitEvent = function(u, v) {
        var c = this._events && this._events[u];
        if (c && c.length) {
            c = c.slice(0), v = v || [];
            for (var d = this._onceEvents && this._onceEvents[u], l = 0; l < c.length; l++) {
                var g = c[l],
                    T = d && d[g];
                T && (this.off(u, g), delete d[g]), g.apply(this, v)
            }
            return this
        }
    }, S.allOff = function() {
        delete this._events, delete this._onceEvents
    }, m
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("get-size/get-size", S) : typeof module == "object" && module.exports ? module.exports = S() : m.getSize = S()
}(window, function() {
    "use strict";

    function m(y) {
        var b = parseFloat(y),
            C = y.indexOf("%") == -1 && !isNaN(b);
        return C && b
    }

    function S() {}

    function u() {
        for (var y = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, b = 0; b < I; b++) {
            var C = T[b];
            y[C] = 0
        }
        return y
    }

    function v(y) {
        var b = getComputedStyle(y);
        return b || g("Style returned " + b + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), b
    }

    function c() {
        if (!D) {
            D = !0;
            var y = document.createElement("div");
            y.style.width = "200px", y.style.padding = "1px 2px 3px 4px", y.style.borderStyle = "solid", y.style.borderWidth = "1px 2px 3px 4px", y.style.boxSizing = "border-box";
            var b = document.body || document.documentElement;
            b.appendChild(y);
            var C = v(y);
            l = Math.round(m(C.width)) == 200, d.isBoxSizeOuter = l, b.removeChild(y)
        }
    }

    function d(y) {
        if (c(), typeof y == "string" && (y = document.querySelector(y)), y && typeof y == "object" && y.nodeType) {
            var b = v(y);
            if (b.display == "none") return u();
            var C = {};
            C.width = y.offsetWidth, C.height = y.offsetHeight;
            for (var O = C.isBorderBox = b.boxSizing == "border-box", P = 0; P < I; P++) {
                var E = T[P],
                    o = b[E],
                    a = parseFloat(o);
                C[E] = isNaN(a) ? 0 : a
            }
            var h = C.paddingLeft + C.paddingRight,
                k = C.paddingTop + C.paddingBottom,
                _ = C.marginLeft + C.marginRight,
                M = C.marginTop + C.marginBottom,
                F = C.borderLeftWidth + C.borderRightWidth,
                B = C.borderTopWidth + C.borderBottomWidth,
                W = O && l,
                H = m(b.width);
            H !== !1 && (C.width = H + (W ? 0 : h + F));
            var G = m(b.height);
            return G !== !1 && (C.height = G + (W ? 0 : k + B)), C.innerWidth = C.width - (h + F), C.innerHeight = C.height - (k + B), C.outerWidth = C.width + _, C.outerHeight = C.height + M, C
        }
    }
    var l, g = typeof console == "undefined" ? S : function(y) {
            console.error(y)
        },
        T = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        I = T.length,
        D = !1;
    return d
}),
function(m, S) {
    "use strict";
    typeof define == "function" && define.amd ? define("desandro-matches-selector/matches-selector", S) : typeof module == "object" && module.exports ? module.exports = S() : m.matchesSelector = S()
}(window, function() {
    "use strict";
    var m = function() {
        var S = window.Element.prototype;
        if (S.matches) return "matches";
        if (S.matchesSelector) return "matchesSelector";
        for (var u = ["webkit", "moz", "ms", "o"], v = 0; v < u.length; v++) {
            var c = u[v],
                d = c + "MatchesSelector";
            if (S[d]) return d
        }
    }();
    return function(S, u) {
        return S[m](u)
    }
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(u) {
        return S(m, u)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("desandro-matches-selector")) : m.fizzyUIUtils = S(m, m.matchesSelector)
}(window, function(m, S) {
    var u = {};
    u.extend = function(d, l) {
        for (var g in l) d[g] = l[g];
        return d
    }, u.modulo = function(d, l) {
        return (d % l + l) % l
    };
    var v = Array.prototype.slice;
    u.makeArray = function(d) {
        if (Array.isArray(d)) return d;
        if (d == null) return [];
        var l = typeof d == "object" && typeof d.length == "number";
        return l ? v.call(d) : [d]
    }, u.removeFrom = function(d, l) {
        var g = d.indexOf(l);
        g != -1 && d.splice(g, 1)
    }, u.getParent = function(d, l) {
        for (; d.parentNode && d != document.body;)
            if (d = d.parentNode, S(d, l)) return d
    }, u.getQueryElement = function(d) {
        return typeof d == "string" ? document.querySelector(d) : d
    }, u.handleEvent = function(d) {
        var l = "on" + d.type;
        this[l] && this[l](d)
    }, u.filterFindElements = function(d, l) {
        d = u.makeArray(d);
        var g = [];
        return d.forEach(function(T) {
            if (T instanceof HTMLElement) {
                if (!l) return void g.push(T);
                S(T, l) && g.push(T);
                for (var I = T.querySelectorAll(l), D = 0; D < I.length; D++) g.push(I[D])
            }
        }), g
    }, u.debounceMethod = function(d, l, g) {
        g = g || 100;
        var T = d.prototype[l],
            I = l + "Timeout";
        d.prototype[l] = function() {
            var D = this[I];
            clearTimeout(D);
            var y = arguments,
                b = this;
            this[I] = setTimeout(function() {
                T.apply(b, y), delete b[I]
            }, g)
        }
    }, u.docReady = function(d) {
        var l = document.readyState;
        l == "complete" || l == "interactive" ? setTimeout(d) : document.addEventListener("DOMContentLoaded", d)
    }, u.toDashed = function(d) {
        return d.replace(/(.)([A-Z])/g, function(l, g, T) {
            return g + "-" + T
        }).toLowerCase()
    };
    var c = m.console;
    return u.htmlInit = function(d, l) {
        u.docReady(function() {
            var g = u.toDashed(l),
                T = "data-" + g,
                I = document.querySelectorAll("[" + T + "]"),
                D = document.querySelectorAll(".js-" + g),
                y = u.makeArray(I).concat(u.makeArray(D)),
                b = T + "-options",
                C = m.jQuery;
            y.forEach(function(O) {
                var P, E = O.getAttribute(T) || O.getAttribute(b);
                try {
                    P = E && JSON.parse(E)
                } catch (a) {
                    return void(c && c.error("Error parsing " + T + " on " + O.className + ": " + a))
                }
                var o = new d(O, P);
                C && C.data(O, l, o)
            })
        })
    }, u
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(u) {
        return S(m, u)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("get-size")) : (m.Flickity = m.Flickity || {}, m.Flickity.Cell = S(m, m.getSize))
}(window, function(m, S) {
    function u(c, d) {
        this.element = c, this.parent = d, this.create()
    }
    var v = u.prototype;
    return v.create = function() {
        this.element.style.position = "absolute", this.element.setAttribute("aria-selected", "false"), this.x = 0, this.shift = 0
    }, v.destroy = function() {
        this.element.style.position = "";
        var c = this.parent.originSide;
        this.element.removeAttribute("aria-selected"), this.element.style[c] = ""
    }, v.getSize = function() {
        this.size = S(this.element)
    }, v.setPosition = function(c) {
        this.x = c, this.updateTarget(), this.renderPosition(c)
    }, v.updateTarget = v.setDefaultTarget = function() {
        var c = this.parent.originSide == "left" ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[c] + this.size.width * this.parent.cellAlign
    }, v.renderPosition = function(c) {
        var d = this.parent.originSide;
        this.element.style[d] = this.parent.getPositionValue(c)
    }, v.wrapShift = function(c) {
        this.shift = c, this.renderPosition(this.x + this.parent.slideableWidth * c)
    }, v.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }, u
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/slide", S) : typeof module == "object" && module.exports ? module.exports = S() : (m.Flickity = m.Flickity || {}, m.Flickity.Slide = S())
}(window, function() {
    "use strict";

    function m(u) {
        this.parent = u, this.isOriginLeft = u.originSide == "left", this.cells = [], this.outerWidth = 0, this.height = 0
    }
    var S = m.prototype;
    return S.addCell = function(u) {
        if (this.cells.push(u), this.outerWidth += u.size.outerWidth, this.height = Math.max(u.size.outerHeight, this.height), this.cells.length == 1) {
            this.x = u.x;
            var v = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = u.size[v]
        }
    }, S.updateTarget = function() {
        var u = this.isOriginLeft ? "marginRight" : "marginLeft",
            v = this.getLastCell(),
            c = v ? v.size[u] : 0,
            d = this.outerWidth - (this.firstMargin + c);
        this.target = this.x + this.firstMargin + d * this.parent.cellAlign
    }, S.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, S.select = function() {
        this.changeSelected(!0)
    }, S.unselect = function() {
        this.changeSelected(!1)
    }, S.changeSelected = function(u) {
        var v = u ? "add" : "remove";
        this.cells.forEach(function(c) {
            c.element.classList[v]("is-selected"), c.element.setAttribute("aria-selected", u.toString())
        })
    }, S.getCellElements = function() {
        return this.cells.map(function(u) {
            return u.element
        })
    }, m
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(u) {
        return S(m, u)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("fizzy-ui-utils")) : (m.Flickity = m.Flickity || {}, m.Flickity.animatePrototype = S(m, m.fizzyUIUtils))
}(window, function(m, S) {
    var u = {};
    return u.startAnimation = function() {
        this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
    }, u.animate = function() {
        this.applyDragForce(), this.applySelectedAttraction();
        var v = this.x;
        if (this.integratePhysics(), this.positionSlider(), this.settle(v), this.isAnimating) {
            var c = this;
            requestAnimationFrame(function() {
                c.animate()
            })
        }
    }, u.positionSlider = function() {
        var v = this.x;
        this.options.wrapAround && this.cells.length > 1 && (v = S.modulo(v, this.slideableWidth), v -= this.slideableWidth, this.shiftWrapCells(v)), v += this.cursorPosition, v = this.options.rightToLeft ? -v : v;
        var c = this.getPositionValue(v);
        this.slider.style.transform = this.isAnimating ? "translate3d(" + c + ",0,0)" : "translateX(" + c + ")";
        var d = this.slides[0];
        if (d) {
            var l = -this.x - d.target,
                g = l / this.slidesWidth;
            this.dispatchEvent("scroll", null, [g, l])
        }
    }, u.positionSliderAtSelected = function() {
        this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider())
    }, u.getPositionValue = function(v) {
        return this.options.percentPosition ? .01 * Math.round(v / this.size.innerWidth * 1e4) + "%" : Math.round(v) + "px"
    }, u.settle = function(v) {
        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * v) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]))
    }, u.shiftWrapCells = function(v) {
        var c = this.cursorPosition + v;
        this._shiftCells(this.beforeShiftCells, c, -1);
        var d = this.size.innerWidth - (v + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, d, 1)
    }, u._shiftCells = function(v, c, d) {
        for (var l = 0; l < v.length; l++) {
            var g = v[l],
                T = c > 0 ? d : 0;
            g.wrapShift(T), c -= g.size.outerWidth
        }
    }, u._unshiftCells = function(v) {
        if (v && v.length)
            for (var c = 0; c < v.length; c++) v[c].wrapShift(0)
    }, u.integratePhysics = function() {
        this.x += this.velocity, this.velocity *= this.getFrictionFactor()
    }, u.applyForce = function(v) {
        this.velocity += v
    }, u.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    }, u.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    }, u.applyDragForce = function() {
        if (this.isDraggable && this.isPointerDown) {
            var v = this.dragX - this.x,
                c = v - this.velocity;
            this.applyForce(c)
        }
    }, u.applySelectedAttraction = function() {
        var v = this.isDraggable && this.isPointerDown;
        if (!v && !this.isFreeScrolling && this.slides.length) {
            var c = this.selectedSlide.target * -1 - this.x,
                d = c * this.options.selectedAttraction;
            this.applyForce(d)
        }
    }, u
}),
function(m, S) {
    if (typeof define == "function" && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(v, c, d, l, g, T) {
        return S(m, v, c, d, l, g, T)
    });
    else if (typeof module == "object" && module.exports) module.exports = S(m, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var u = m.Flickity;
        m.Flickity = S(m, m.EvEmitter, m.getSize, m.fizzyUIUtils, u.Cell, u.Slide, u.animatePrototype)
    }
}(window, function(m, S, u, v, c, d, l) {
    function g(E, o) {
        for (E = v.makeArray(E); E.length;) o.appendChild(E.shift())
    }

    function T(E, o) {
        var a = v.getQueryElement(E);
        if (!a) return void(y && y.error("Bad element for Flickity: " + (a || E)));
        if (this.element = a, this.element.flickityGUID) {
            var h = C[this.element.flickityGUID];
            return h.option(o), h
        }
        I && (this.$element = I(this.element)), this.options = v.extend({}, this.constructor.defaults), this.option(o), this._create()
    }
    var I = m.jQuery,
        D = m.getComputedStyle,
        y = m.console,
        b = 0,
        C = {};
    T.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    }, T.createMethods = [];
    var O = T.prototype;
    v.extend(O, S.prototype), O._create = function() {
        var E = this.guid = ++b;
        this.element.flickityGUID = E, C[E] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && m.addEventListener("resize", this);
        for (var o in this.options.on) {
            var a = this.options.on[o];
            this.on(o, a)
        }
        T.createMethods.forEach(function(h) {
            this[h]()
        }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
    }, O.option = function(E) {
        v.extend(this.options, E)
    }, O.activate = function() {
        if (!this.isActive) {
            this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize();
            var E = this._filterFindCellElements(this.element.children);
            g(E, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
            var o, a = this.options.initialIndex;
            o = this.isInitActivated ? this.selectedIndex : a !== void 0 && this.cells[a] ? a : 0, this.select(o, !1, !0), this.isInitActivated = !0, this.dispatchEvent("ready")
        }
    }, O._createSlider = function() {
        var E = document.createElement("div");
        E.className = "flickity-slider", E.style[this.originSide] = 0, this.slider = E
    }, O._filterFindCellElements = function(E) {
        return v.filterFindElements(E, this.options.cellSelector)
    }, O.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
    }, O._makeCells = function(E) {
        var o = this._filterFindCellElements(E),
            a = o.map(function(h) {
                return new c(h, this)
            }, this);
        return a
    }, O.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, O.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }, O.positionCells = function() {
        this._sizeCells(this.cells), this._positionCells(0)
    }, O._positionCells = function(E) {
        E = E || 0, this.maxCellHeight = E && this.maxCellHeight || 0;
        var o = 0;
        if (E > 0) {
            var a = this.cells[E - 1];
            o = a.x + a.size.outerWidth
        }
        for (var h = this.cells.length, k = E; k < h; k++) {
            var _ = this.cells[k];
            _.setPosition(o), o += _.size.outerWidth, this.maxCellHeight = Math.max(_.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = o, this.updateSlides(), this._containSlides(), this.slidesWidth = h ? this.getLastSlide().target - this.slides[0].target : 0
    }, O._sizeCells = function(E) {
        E.forEach(function(o) {
            o.getSize()
        })
    }, O.updateSlides = function() {
        if (this.slides = [], this.cells.length) {
            var E = new d(this);
            this.slides.push(E);
            var o = this.originSide == "left",
                a = o ? "marginRight" : "marginLeft",
                h = this._getCanCellFit();
            this.cells.forEach(function(k, _) {
                if (!E.cells.length) return void E.addCell(k);
                var M = E.outerWidth - E.firstMargin + (k.size.outerWidth - k.size[a]);
                h.call(this, _, M) || (E.updateTarget(), E = new d(this), this.slides.push(E)), E.addCell(k)
            }, this), E.updateTarget(), this.updateSelectedSlide()
        }
    }, O._getCanCellFit = function() {
        var E = this.options.groupCells;
        if (!E) return function() {
            return !1
        };
        if (typeof E == "number") {
            var o = parseInt(E, 10);
            return function(k) {
                return k % o !== 0
            }
        }
        var a = typeof E == "string" && E.match(/^(\d+)%$/),
            h = a ? parseInt(a[1], 10) / 100 : 1;
        return function(k, _) {
            return _ <= (this.size.innerWidth + 1) * h
        }
    }, O._init = O.reposition = function() {
        this.positionCells(), this.positionSliderAtSelected()
    }, O.getSize = function() {
        this.size = u(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
    };
    var P = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return O.setCellAlign = function() {
        var E = P[this.options.cellAlign];
        this.cellAlign = E ? E[this.originSide] : this.options.cellAlign
    }, O.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var E = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = E + "px"
        }
    }, O._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
            var E = this.cursorPosition,
                o = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(E, o, -1), E = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(E, 0, 1)
        }
    }, O._getGapCells = function(E, o, a) {
        for (var h = []; E > 0;) {
            var k = this.cells[o];
            if (!k) break;
            h.push(k), o += a, E -= k.size.outerWidth
        }
        return h
    }, O._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var E = this.options.rightToLeft,
                o = E ? "marginRight" : "marginLeft",
                a = E ? "marginLeft" : "marginRight",
                h = this.slideableWidth - this.getLastCell().size[a],
                k = h < this.size.innerWidth,
                _ = this.cursorPosition + this.cells[0].size[o],
                M = h - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(F) {
                k ? F.target = h * this.cellAlign : (F.target = Math.max(F.target, _), F.target = Math.min(F.target, M))
            }, this)
        }
    }, O.dispatchEvent = function(E, o, a) {
        var h = o ? [o].concat(a) : a;
        if (this.emitEvent(E, h), I && this.$element) {
            E += this.options.namespaceJQueryEvents ? ".flickity" : "";
            var k = E;
            if (o) {
                var _ = I.Event(o);
                _.type = E, k = _
            }
            this.$element.trigger(k, a)
        }
    }, O.select = function(E, o, a) {
        if (this.isActive && (E = parseInt(E, 10), this._wrapSelect(E), (this.options.wrapAround || o) && (E = v.modulo(E, this.slides.length)), this.slides[E])) {
            var h = this.selectedIndex;
            this.selectedIndex = E, this.updateSelectedSlide(), a ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [E]), E != h && this.dispatchEvent("change", null, [E]), this.dispatchEvent("cellSelect")
        }
    }, O._wrapSelect = function(E) {
        var o = this.slides.length,
            a = this.options.wrapAround && o > 1;
        if (!a) return E;
        var h = v.modulo(E, o),
            k = Math.abs(h - this.selectedIndex),
            _ = Math.abs(h + o - this.selectedIndex),
            M = Math.abs(h - o - this.selectedIndex);
        !this.isDragSelect && _ < k ? E += o : !this.isDragSelect && M < k && (E -= o), E < 0 ? this.x -= this.slideableWidth : E >= o && (this.x += this.slideableWidth)
    }, O.previous = function(E, o) {
        this.select(this.selectedIndex - 1, E, o)
    }, O.next = function(E, o) {
        this.select(this.selectedIndex + 1, E, o)
    }, O.updateSelectedSlide = function() {
        var E = this.slides[this.selectedIndex];
        E && (this.unselectSelectedSlide(), this.selectedSlide = E, E.select(), this.selectedCells = E.cells, this.selectedElements = E.getCellElements(), this.selectedCell = E.cells[0], this.selectedElement = this.selectedElements[0])
    }, O.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }, O.selectCell = function(E, o, a) {
        var h = this.queryCell(E);
        if (h) {
            var k = this.getCellSlideIndex(h);
            this.select(k, o, a)
        }
    }, O.getCellSlideIndex = function(E) {
        for (var o = 0; o < this.slides.length; o++) {
            var a = this.slides[o],
                h = a.cells.indexOf(E);
            if (h != -1) return o
        }
    }, O.getCell = function(E) {
        for (var o = 0; o < this.cells.length; o++) {
            var a = this.cells[o];
            if (a.element == E) return a
        }
    }, O.getCells = function(E) {
        E = v.makeArray(E);
        var o = [];
        return E.forEach(function(a) {
            var h = this.getCell(a);
            h && o.push(h)
        }, this), o
    }, O.getCellElements = function() {
        return this.cells.map(function(E) {
            return E.element
        })
    }, O.getParentCell = function(E) {
        var o = this.getCell(E);
        return o || (E = v.getParent(E, ".flickity-slider > *"), this.getCell(E))
    }, O.getAdjacentCellElements = function(E, o) {
        if (!E) return this.selectedSlide.getCellElements();
        o = o === void 0 ? this.selectedIndex : o;
        var a = this.slides.length;
        if (1 + 2 * E >= a) return this.getCellElements();
        for (var h = [], k = o - E; k <= o + E; k++) {
            var _ = this.options.wrapAround ? v.modulo(k, a) : k,
                M = this.slides[_];
            M && (h = h.concat(M.getCellElements()))
        }
        return h
    }, O.queryCell = function(E) {
        return typeof E == "number" ? this.cells[E] : (typeof E == "string" && (E = this.element.querySelector(E)), this.getCell(E))
    }, O.uiChange = function() {
        this.emitEvent("uiChange")
    }, O.childUIPointerDown = function(E) {
        this.emitEvent("childUIPointerDown", [E])
    }, O.onresize = function() {
        this.watchCSS(), this.resize()
    }, v.debounceMethod(T, "onresize", 150), O.resize = function() {
        if (this.isActive) {
            this.getSize(), this.options.wrapAround && (this.x = v.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
            var E = this.selectedElements && this.selectedElements[0];
            this.selectCell(E, !1, !0)
        }
    }, O.watchCSS = function() {
        var E = this.options.watchCSS;
        if (E) {
            var o = D(this.element, ":after").content;
            o.indexOf("flickity") != -1 ? this.activate() : this.deactivate()
        }
    }, O.onkeydown = function(E) {
        var o = document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !o) {
            var a = T.keyboardHandlers[E.keyCode];
            a && a.call(this)
        }
    }, T.keyboardHandlers = {
        37: function() {
            var E = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(), this[E]()
        },
        39: function() {
            var E = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(), this[E]()
        }
    }, O.focus = function() {
        var E = m.pageYOffset;
        this.element.focus({
            preventScroll: !0
        }), m.pageYOffset != E && m.scrollTo(m.pageXOffset, E)
    }, O.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function(E) {
            E.destroy()
        }), this.element.removeChild(this.viewport), g(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
    }, O.destroy = function() {
        this.deactivate(), m.removeEventListener("resize", this), this.emitEvent("destroy"), I && this.$element && I.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete C[this.guid]
    }, v.extend(O, l), T.data = function(E) {
        E = v.getQueryElement(E);
        var o = E && E.flickityGUID;
        return o && C[o]
    }, v.htmlInit(T, "flickity"), I && I.bridget && I.bridget("flickity", T), T.setJQuery = function(E) {
        I = E
    }, T.Cell = c, T
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(u) {
        return S(m, u)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("ev-emitter")) : m.Unipointer = S(m, m.EvEmitter)
}(window, function(m, S) {
    function u() {}

    function v() {}
    var c = v.prototype = Object.create(S.prototype);
    c.bindStartEvent = function(l) {
        this._bindStartEvent(l, !0)
    }, c.unbindStartEvent = function(l) {
        this._bindStartEvent(l, !1)
    }, c._bindStartEvent = function(l, g) {
        g = g === void 0 || g;
        var T = g ? "addEventListener" : "removeEventListener",
            I = "mousedown";
        m.PointerEvent ? I = "pointerdown" : "ontouchstart" in m && (I = "touchstart"), l[T](I, this)
    }, c.handleEvent = function(l) {
        var g = "on" + l.type;
        this[g] && this[g](l)
    }, c.getTouch = function(l) {
        for (var g = 0; g < l.length; g++) {
            var T = l[g];
            if (T.identifier == this.pointerIdentifier) return T
        }
    }, c.onmousedown = function(l) {
        var g = l.button;
        g && g !== 0 && g !== 1 || this._pointerDown(l, l)
    }, c.ontouchstart = function(l) {
        this._pointerDown(l, l.changedTouches[0])
    }, c.onpointerdown = function(l) {
        this._pointerDown(l, l)
    }, c._pointerDown = function(l, g) {
        l.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = g.pointerId !== void 0 ? g.pointerId : g.identifier, this.pointerDown(l, g))
    }, c.pointerDown = function(l, g) {
        this._bindPostStartEvents(l), this.emitEvent("pointerDown", [l, g])
    };
    var d = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return c._bindPostStartEvents = function(l) {
        if (l) {
            var g = d[l.type];
            g.forEach(function(T) {
                m.addEventListener(T, this)
            }, this), this._boundPointerEvents = g
        }
    }, c._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(l) {
            m.removeEventListener(l, this)
        }, this), delete this._boundPointerEvents)
    }, c.onmousemove = function(l) {
        this._pointerMove(l, l)
    }, c.onpointermove = function(l) {
        l.pointerId == this.pointerIdentifier && this._pointerMove(l, l)
    }, c.ontouchmove = function(l) {
        var g = this.getTouch(l.changedTouches);
        g && this._pointerMove(l, g)
    }, c._pointerMove = function(l, g) {
        this.pointerMove(l, g)
    }, c.pointerMove = function(l, g) {
        this.emitEvent("pointerMove", [l, g])
    }, c.onmouseup = function(l) {
        this._pointerUp(l, l)
    }, c.onpointerup = function(l) {
        l.pointerId == this.pointerIdentifier && this._pointerUp(l, l)
    }, c.ontouchend = function(l) {
        var g = this.getTouch(l.changedTouches);
        g && this._pointerUp(l, g)
    }, c._pointerUp = function(l, g) {
        this._pointerDone(), this.pointerUp(l, g)
    }, c.pointerUp = function(l, g) {
        this.emitEvent("pointerUp", [l, g])
    }, c._pointerDone = function() {
        this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone()
    }, c._pointerReset = function() {
        this.isPointerDown = !1, delete this.pointerIdentifier
    }, c.pointerDone = u, c.onpointercancel = function(l) {
        l.pointerId == this.pointerIdentifier && this._pointerCancel(l, l)
    }, c.ontouchcancel = function(l) {
        var g = this.getTouch(l.changedTouches);
        g && this._pointerCancel(l, g)
    }, c._pointerCancel = function(l, g) {
        this._pointerDone(), this.pointerCancel(l, g)
    }, c.pointerCancel = function(l, g) {
        this.emitEvent("pointerCancel", [l, g])
    }, v.getPointerPoint = function(l) {
        return {
            x: l.pageX,
            y: l.pageY
        }
    }, v
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(u) {
        return S(m, u)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("unipointer")) : m.Unidragger = S(m, m.Unipointer)
}(window, function(m, S) {
    function u() {}
    var v = u.prototype = Object.create(S.prototype);
    v.bindHandles = function() {
        this._bindHandles(!0)
    }, v.unbindHandles = function() {
        this._bindHandles(!1)
    }, v._bindHandles = function(l) {
        l = l === void 0 || l;
        for (var g = l ? "addEventListener" : "removeEventListener", T = l ? this._touchActionValue : "", I = 0; I < this.handles.length; I++) {
            var D = this.handles[I];
            this._bindStartEvent(D, l), D[g]("click", this), m.PointerEvent && (D.style.touchAction = T)
        }
    }, v._touchActionValue = "none", v.pointerDown = function(l, g) {
        var T = this.okayPointerDown(l);
        T && (this.pointerDownPointer = g, l.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(l), this.emitEvent("pointerDown", [l, g]))
    };
    var c = {
            TEXTAREA: !0,
            INPUT: !0,
            SELECT: !0,
            OPTION: !0
        },
        d = {
            radio: !0,
            checkbox: !0,
            button: !0,
            submit: !0,
            image: !0,
            file: !0
        };
    return v.okayPointerDown = function(l) {
        var g = c[l.target.nodeName],
            T = d[l.target.type],
            I = !g || T;
        return I || this._pointerReset(), I
    }, v.pointerDownBlur = function() {
        var l = document.activeElement,
            g = l && l.blur && l != document.body;
        g && l.blur()
    }, v.pointerMove = function(l, g) {
        var T = this._dragPointerMove(l, g);
        this.emitEvent("pointerMove", [l, g, T]), this._dragMove(l, g, T)
    }, v._dragPointerMove = function(l, g) {
        var T = {
            x: g.pageX - this.pointerDownPointer.pageX,
            y: g.pageY - this.pointerDownPointer.pageY
        };
        return !this.isDragging && this.hasDragStarted(T) && this._dragStart(l, g), T
    }, v.hasDragStarted = function(l) {
        return Math.abs(l.x) > 3 || Math.abs(l.y) > 3
    }, v.pointerUp = function(l, g) {
        this.emitEvent("pointerUp", [l, g]), this._dragPointerUp(l, g)
    }, v._dragPointerUp = function(l, g) {
        this.isDragging ? this._dragEnd(l, g) : this._staticClick(l, g)
    }, v._dragStart = function(l, g) {
        this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(l, g)
    }, v.dragStart = function(l, g) {
        this.emitEvent("dragStart", [l, g])
    }, v._dragMove = function(l, g, T) {
        this.isDragging && this.dragMove(l, g, T)
    }, v.dragMove = function(l, g, T) {
        l.preventDefault(), this.emitEvent("dragMove", [l, g, T])
    }, v._dragEnd = function(l, g) {
        this.isDragging = !1, setTimeout(function() {
            delete this.isPreventingClicks
        }.bind(this)), this.dragEnd(l, g)
    }, v.dragEnd = function(l, g) {
        this.emitEvent("dragEnd", [l, g])
    }, v.onclick = function(l) {
        this.isPreventingClicks && l.preventDefault()
    }, v._staticClick = function(l, g) {
        this.isIgnoringMouseUp && l.type == "mouseup" || (this.staticClick(l, g), l.type != "mouseup" && (this.isIgnoringMouseUp = !0, setTimeout(function() {
            delete this.isIgnoringMouseUp
        }.bind(this), 400)))
    }, v.staticClick = function(l, g) {
        this.emitEvent("staticClick", [l, g])
    }, u.getPointerPoint = S.getPointerPoint, u
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(u, v, c) {
        return S(m, u, v, c)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : m.Flickity = S(m, m.Flickity, m.Unidragger, m.fizzyUIUtils)
}(window, function(m, S, u, v) {
    function c() {
        return {
            x: m.pageXOffset,
            y: m.pageYOffset
        }
    }
    v.extend(S.defaults, {
        draggable: ">1",
        dragThreshold: 3
    }), S.createMethods.push("_createDrag");
    var d = S.prototype;
    v.extend(d, u.prototype), d._touchActionValue = "pan-y";
    var l = "createTouch" in document,
        g = !1;
    d._createDrag = function() {
        this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable), l && !g && (m.addEventListener("touchmove", function() {}), g = !0)
    }, d.onActivateDrag = function() {
        this.handles = [this.viewport], this.bindHandles(), this.updateDraggable()
    }, d.onDeactivateDrag = function() {
        this.unbindHandles(), this.element.classList.remove("is-draggable")
    }, d.updateDraggable = function() {
        this.options.draggable == ">1" ? this.isDraggable = this.slides.length > 1 : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
    }, d.bindDrag = function() {
        this.options.draggable = !0, this.updateDraggable()
    }, d.unbindDrag = function() {
        this.options.draggable = !1, this.updateDraggable()
    }, d._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }, d._childUIPointerDownDrag = function(I) {
        I.preventDefault(), this.pointerDownFocus(I)
    }, d.pointerDown = function(I, D) {
        if (!this.isDraggable) return void this._pointerDownDefault(I, D);
        var y = this.okayPointerDown(I);
        y && (this._pointerDownPreventDefault(I), this.pointerDownFocus(I), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = c(), m.addEventListener("scroll", this), this._pointerDownDefault(I, D))
    }, d._pointerDownDefault = function(I, D) {
        this.pointerDownPointer = D, this._bindPostStartEvents(I), this.dispatchEvent("pointerDown", I, [D])
    };
    var T = {
        INPUT: !0,
        TEXTAREA: !0,
        SELECT: !0
    };
    return d.pointerDownFocus = function(I) {
        var D = T[I.target.nodeName];
        D || this.focus()
    }, d._pointerDownPreventDefault = function(I) {
        var D = I.type == "touchstart",
            y = I.pointerType == "touch",
            b = T[I.target.nodeName];
        D || y || b || I.preventDefault()
    }, d.hasDragStarted = function(I) {
        return Math.abs(I.x) > this.options.dragThreshold
    }, d.pointerUp = function(I, D) {
        delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", I, [D]), this._dragPointerUp(I, D)
    }, d.pointerDone = function() {
        m.removeEventListener("scroll", this), delete this.pointerDownScroll
    }, d.dragStart = function(I, D) {
        this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), m.removeEventListener("scroll", this), this.dispatchEvent("dragStart", I, [D]))
    }, d.pointerMove = function(I, D) {
        var y = this._dragPointerMove(I, D);
        this.dispatchEvent("pointerMove", I, [D, y]), this._dragMove(I, D, y)
    }, d.dragMove = function(I, D, y) {
        if (this.isDraggable) {
            I.preventDefault(), this.previousDragX = this.dragX;
            var b = this.options.rightToLeft ? -1 : 1;
            this.options.wrapAround && (y.x = y.x % this.slideableWidth);
            var C = this.dragStartPosition + y.x * b;
            if (!this.options.wrapAround && this.slides.length) {
                var O = Math.max(-this.slides[0].target, this.dragStartPosition);
                C = C > O ? .5 * (C + O) : C;
                var P = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                C = C < P ? .5 * (C + P) : C
            }
            this.dragX = C, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", I, [D, y])
        }
    }, d.dragEnd = function(I, D) {
        if (this.isDraggable) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var y = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var b = this.getRestingPosition();
                this.isFreeScrolling = -b > this.slides[0].target && -b < this.getLastSlide().target
            } else this.options.freeScroll || y != this.selectedIndex || (y += this.dragEndBoostSelect());
            delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(y), delete this.isDragSelect, this.dispatchEvent("dragEnd", I, [D])
        }
    }, d.dragEndRestingSelect = function() {
        var I = this.getRestingPosition(),
            D = Math.abs(this.getSlideDistance(-I, this.selectedIndex)),
            y = this._getClosestResting(I, D, 1),
            b = this._getClosestResting(I, D, -1),
            C = y.distance < b.distance ? y.index : b.index;
        return C
    }, d._getClosestResting = function(I, D, y) {
        for (var b = this.selectedIndex, C = 1 / 0, O = this.options.contain && !this.options.wrapAround ? function(P, E) {
                return P <= E
            } : function(P, E) {
                return P < E
            }; O(D, C) && (b += y, C = D, D = this.getSlideDistance(-I, b), D !== null);) D = Math.abs(D);
        return {
            distance: C,
            index: b - y
        }
    }, d.getSlideDistance = function(I, D) {
        var y = this.slides.length,
            b = this.options.wrapAround && y > 1,
            C = b ? v.modulo(D, y) : D,
            O = this.slides[C];
        if (!O) return null;
        var P = b ? this.slideableWidth * Math.floor(D / y) : 0;
        return I - (O.target + P)
    }, d.dragEndBoostSelect = function() {
        if (this.previousDragX === void 0 || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
        var I = this.getSlideDistance(-this.dragX, this.selectedIndex),
            D = this.previousDragX - this.dragX;
        return I > 0 && D > 0 ? 1 : I < 0 && D < 0 ? -1 : 0
    }, d.staticClick = function(I, D) {
        var y = this.getParentCell(I.target),
            b = y && y.element,
            C = y && this.cells.indexOf(y);
        this.dispatchEvent("staticClick", I, [D, b, C])
    }, d.onscroll = function() {
        var I = c(),
            D = this.pointerDownScroll.x - I.x,
            y = this.pointerDownScroll.y - I.y;
        (Math.abs(D) > 3 || Math.abs(y) > 3) && this._pointerDone()
    }, S
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(u) {
        return S(m, u)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("unipointer")) : m.TapListener = S(m, m.Unipointer)
}(window, function(m, S) {
    function u(c) {
        this.bindTap(c)
    }
    var v = u.prototype = Object.create(S.prototype);
    return v.bindTap = function(c) {
        c && (this.unbindTap(), this.tapElement = c, this._bindStartEvent(c, !0))
    }, v.unbindTap = function() {
        this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
    }, v.pointerUp = function(c, d) {
        if (!this.isIgnoringMouseUp || c.type != "mouseup") {
            var l = S.getPointerPoint(d),
                g = this.tapElement.getBoundingClientRect(),
                T = m.pageXOffset,
                I = m.pageYOffset,
                D = l.x >= g.left + T && l.x <= g.right + T && l.y >= g.top + I && l.y <= g.bottom + I;
            if (D && this.emitEvent("tap", [c, d]), c.type != "mouseup") {
                this.isIgnoringMouseUp = !0;
                var y = this;
                setTimeout(function() {
                    delete y.isIgnoringMouseUp
                }, 400)
            }
        }
    }, v.destroy = function() {
        this.pointerDone(), this.unbindTap()
    }, u
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(u, v, c) {
        return S(m, u, v, c)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : S(m, m.Flickity, m.TapListener, m.fizzyUIUtils)
}(window, function(m, S, u, v) {
    "use strict";

    function c(T, I) {
        this.direction = T, this.parent = I, this._create()
    }

    function d(T) {
        return typeof T == "string" ? T : "M " + T.x0 + ",50 L " + T.x1 + "," + (T.y1 + 50) + " L " + T.x2 + "," + (T.y2 + 50) + " L " + T.x3 + ",50  L " + T.x2 + "," + (50 - T.y2) + " L " + T.x1 + "," + (50 - T.y1) + " Z"
    }
    var l = "http://www.w3.org/2000/svg";
    c.prototype = Object.create(u.prototype), c.prototype._create = function() {
        this.isEnabled = !0, this.isPrevious = this.direction == -1;
        var T = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == T;
        var I = this.element = document.createElement("button");
        I.className = "flickity-button flickity-prev-next-button", I.className += this.isPrevious ? " previous" : " next", I.setAttribute("type", "button"), this.disable(), I.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var D = this.createSVG();
        I.appendChild(D), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, c.prototype.activate = function() {
        this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
    }, c.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element), u.prototype.destroy.call(this), this.element.removeEventListener("click", this)
    }, c.prototype.createSVG = function() {
        var T = document.createElementNS(l, "svg");
        T.setAttribute("class", "flickity-button-icon"), T.setAttribute("viewBox", "0 0 100 100");
        var I = document.createElementNS(l, "path"),
            D = d(this.parent.options.arrowShape);
        return I.setAttribute("d", D), I.setAttribute("class", "arrow"), this.isLeft || I.setAttribute("transform", "translate(100, 100) rotate(180) "), T.appendChild(I), T
    }, c.prototype.onTap = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var T = this.isPrevious ? "previous" : "next";
            this.parent[T]()
        }
    }, c.prototype.handleEvent = v.handleEvent, c.prototype.onclick = function(T) {
        var I = document.activeElement;
        I && I == this.element && this.onTap(T, T)
    }, c.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
    }, c.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
    }, c.prototype.update = function() {
        var T = this.parent.slides;
        if (this.parent.options.wrapAround && T.length > 1) return void this.enable();
        var I = T.length ? T.length - 1 : 0,
            D = this.isPrevious ? 0 : I,
            y = this.parent.selectedIndex == D ? "disable" : "enable";
        this[y]()
    }, c.prototype.destroy = function() {
        this.deactivate()
    }, v.extend(S.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }), S.createMethods.push("_createPrevNextButtons");
    var g = S.prototype;
    return g._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new c(-1, this), this.nextButton = new c(1, this), this.on("activate", this.activatePrevNextButtons))
    }, g.activatePrevNextButtons = function() {
        this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
    }, g.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
    }, S.PrevNextButton = c, S
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(u, v, c) {
        return S(m, u, v, c)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : S(m, m.Flickity, m.TapListener, m.fizzyUIUtils)
}(window, function(m, S, u, v) {
    function c(l) {
        this.parent = l, this._create()
    }
    c.prototype = new u, c.prototype._create = function() {
        this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, c.prototype.activate = function() {
        this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
    }, c.prototype.deactivate = function() {
        this.parent.element.removeChild(this.holder), u.prototype.destroy.call(this)
    }, c.prototype.setDots = function() {
        var l = this.parent.slides.length - this.dots.length;
        l > 0 ? this.addDots(l) : l < 0 && this.removeDots(-l)
    }, c.prototype.addDots = function(l) {
        for (var g = document.createDocumentFragment(), T = [], I = this.dots.length, D = I + l, y = I; y < D; y++) {
            var b = document.createElement("li");
            b.className = "dot", b.setAttribute("aria-label", "Page dot " + (y + 1)), g.appendChild(b), T.push(b)
        }
        this.holder.appendChild(g), this.dots = this.dots.concat(T)
    }, c.prototype.removeDots = function(l) {
        var g = this.dots.splice(this.dots.length - l, l);
        g.forEach(function(T) {
            this.holder.removeChild(T)
        }, this)
    }, c.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"))
    }, c.prototype.onTap = function(l) {
        var g = l.target;
        if (g.nodeName == "LI") {
            this.parent.uiChange();
            var T = this.dots.indexOf(g);
            this.parent.select(T)
        }
    }, c.prototype.destroy = function() {
        this.deactivate()
    }, S.PageDots = c, v.extend(S.defaults, {
        pageDots: !0
    }), S.createMethods.push("_createPageDots");
    var d = S.prototype;
    return d._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new c(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
    }, d.activatePageDots = function() {
        this.pageDots.activate()
    }, d.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }, d.updatePageDots = function() {
        this.pageDots.setDots()
    }, d.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }, S.PageDots = c, S
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(u, v, c) {
        return S(u, v, c)
    }) : typeof module == "object" && module.exports ? module.exports = S(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : S(m.EvEmitter, m.fizzyUIUtils, m.Flickity)
}(window, function(m, S, u) {
    function v(d) {
        this.parent = d, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this)
    }
    v.prototype = Object.create(m.prototype), v.prototype.play = function() {
        if (this.state != "playing") {
            var d = document.hidden;
            if (d) return void document.addEventListener("visibilitychange", this.onVisibilityPlay);
            this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()
        }
    }, v.prototype.tick = function() {
        if (this.state == "playing") {
            var d = this.parent.options.autoPlay;
            d = typeof d == "number" ? d : 3e3;
            var l = this;
            this.clear(), this.timeout = setTimeout(function() {
                l.parent.next(!0), l.tick()
            }, d)
        }
    }, v.prototype.stop = function() {
        this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange)
    }, v.prototype.clear = function() {
        clearTimeout(this.timeout)
    }, v.prototype.pause = function() {
        this.state == "playing" && (this.state = "paused", this.clear())
    }, v.prototype.unpause = function() {
        this.state == "paused" && this.play()
    }, v.prototype.visibilityChange = function() {
        var d = document.hidden;
        this[d ? "pause" : "unpause"]()
    }, v.prototype.visibilityPlay = function() {
        this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay)
    }, S.extend(u.defaults, {
        pauseAutoPlayOnHover: !0
    }), u.createMethods.push("_createPlayer");
    var c = u.prototype;
    return c._createPlayer = function() {
        this.player = new v(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
    }, c.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
    }, c.playPlayer = function() {
        this.player.play()
    }, c.stopPlayer = function() {
        this.player.stop()
    }, c.pausePlayer = function() {
        this.player.pause()
    }, c.unpausePlayer = function() {
        this.player.unpause()
    }, c.deactivatePlayer = function() {
        this.player.stop(), this.element.removeEventListener("mouseenter", this)
    }, c.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
    }, c.onmouseleave = function() {
        this.player.unpause(), this.element.removeEventListener("mouseleave", this)
    }, u.Player = v, u
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(u, v) {
        return S(m, u, v)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("./flickity"), require("fizzy-ui-utils")) : S(m, m.Flickity, m.fizzyUIUtils)
}(window, function(m, S, u) {
    function v(d) {
        var l = document.createDocumentFragment();
        return d.forEach(function(g) {
            l.appendChild(g.element)
        }), l
    }
    var c = S.prototype;
    return c.insert = function(d, l) {
        var g = this._makeCells(d);
        if (g && g.length) {
            var T = this.cells.length;
            l = l === void 0 ? T : l;
            var I = v(g),
                D = l == T;
            if (D) this.slider.appendChild(I);
            else {
                var y = this.cells[l].element;
                this.slider.insertBefore(I, y)
            }
            if (l === 0) this.cells = g.concat(this.cells);
            else if (D) this.cells = this.cells.concat(g);
            else {
                var b = this.cells.splice(l, T - l);
                this.cells = this.cells.concat(g).concat(b)
            }
            this._sizeCells(g), this.cellChange(l, !0)
        }
    }, c.append = function(d) {
        this.insert(d, this.cells.length)
    }, c.prepend = function(d) {
        this.insert(d, 0)
    }, c.remove = function(d) {
        var l = this.getCells(d);
        if (l && l.length) {
            var g = this.cells.length - 1;
            l.forEach(function(T) {
                T.remove();
                var I = this.cells.indexOf(T);
                g = Math.min(I, g), u.removeFrom(this.cells, T)
            }, this), this.cellChange(g, !0)
        }
    }, c.cellSizeChange = function(d) {
        var l = this.getCell(d);
        if (l) {
            l.getSize();
            var g = this.cells.indexOf(l);
            this.cellChange(g)
        }
    }, c.cellChange = function(d, l) {
        var g = this.selectedElement;
        this._positionCells(d), this._getWrapShiftCells(), this.setGallerySize();
        var T = this.getCell(g);
        T && (this.selectedIndex = this.getCellSlideIndex(T)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [d]), this.select(this.selectedIndex), l && this.positionSliderAtSelected()
    }, S
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(u, v) {
        return S(m, u, v)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("./flickity"), require("fizzy-ui-utils")) : S(m, m.Flickity, m.fizzyUIUtils)
}(window, function(m, S, u) {
    "use strict";

    function v(l) {
        if (l.nodeName == "IMG") {
            var g = l.getAttribute("data-flickity-lazyload"),
                T = l.getAttribute("data-flickity-lazyload-src"),
                I = l.getAttribute("data-flickity-lazyload-srcset");
            if (g || T || I) return [l]
        }
        var D = "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]",
            y = l.querySelectorAll(D);
        return u.makeArray(y)
    }

    function c(l, g) {
        this.img = l, this.flickity = g, this.load()
    }
    S.createMethods.push("_createLazyload");
    var d = S.prototype;
    return d._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }, d.lazyLoad = function() {
        var l = this.options.lazyLoad;
        if (l) {
            var g = typeof l == "number" ? l : 0,
                T = this.getAdjacentCellElements(g),
                I = [];
            T.forEach(function(D) {
                var y = v(D);
                I = I.concat(y)
            }), I.forEach(function(D) {
                new c(D, this)
            }, this)
        }
    }, c.prototype.handleEvent = u.handleEvent, c.prototype.load = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this);
        var l = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
            g = this.img.getAttribute("data-flickity-lazyload-srcset");
        this.img.src = l, g && this.img.setAttribute("srcset", g), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset")
    }, c.prototype.onload = function(l) {
        this.complete(l, "flickity-lazyloaded")
    }, c.prototype.onerror = function(l) {
        this.complete(l, "flickity-lazyerror")
    }, c.prototype.complete = function(l, g) {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
        var T = this.flickity.getParentCell(this.img),
            I = T && T.element;
        this.flickity.cellSizeChange(I), this.img.classList.add(g), this.flickity.dispatchEvent("lazyLoad", l, I)
    }, S.LazyLoader = c, S
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], S) : typeof module == "object" && module.exports && (module.exports = S(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(m) {
    return m
}),
function(m, S) {
    typeof define == "function" && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], S) : typeof module == "object" && module.exports ? module.exports = S(require("flickity"), require("fizzy-ui-utils")) : m.Flickity = S(m.Flickity, m.fizzyUIUtils)
}(window, function(m, S) {
    function u(c, d, l) {
        return (d - c) * l + c
    }
    m.createMethods.push("_createAsNavFor");
    var v = m.prototype;
    return v._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
        var c = this.options.asNavFor;
        if (c) {
            var d = this;
            setTimeout(function() {
                d.setNavCompanion(c)
            })
        }
    }, v.setNavCompanion = function(c) {
        c = S.getQueryElement(c);
        var d = m.data(c);
        if (d && d != this) {
            this.navCompanion = d;
            var l = this;
            this.onNavCompanionSelect = function() {
                l.navCompanionSelect()
            }, d.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
        }
    }, v.navCompanionSelect = function(c) {
        if (this.navCompanion) {
            var d = this.navCompanion.selectedCells[0],
                l = this.navCompanion.cells.indexOf(d),
                g = l + this.navCompanion.selectedCells.length - 1,
                T = Math.floor(u(l, g, this.navCompanion.cellAlign));
            if (this.selectCell(T, !1, c), this.removeNavSelectedElements(), !(T >= this.cells.length)) {
                var I = this.cells.slice(l, g + 1);
                this.navSelectedElements = I.map(function(D) {
                    return D.element
                }), this.changeNavSelectedClass("add")
            }
        }
    }, v.changeNavSelectedClass = function(c) {
        this.navSelectedElements.forEach(function(d) {
            d.classList[c]("is-nav-selected")
        })
    }, v.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }, v.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
    }, v.onNavStaticClick = function(c, d, l, g) {
        typeof g == "number" && this.navCompanion.selectCell(g)
    }, v.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }, v.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
    }, m
}),
function(m, S) {
    "use strict";
    typeof define == "function" && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(u) {
        return S(m, u)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("ev-emitter")) : m.imagesLoaded = S(m, m.EvEmitter)
}(typeof window != "undefined" ? window : this, function(m, S) {
    function u(y, b) {
        for (var C in b) y[C] = b[C];
        return y
    }

    function v(y) {
        if (Array.isArray(y)) return y;
        var b = typeof y == "object" && typeof y.length == "number";
        return b ? I.call(y) : [y]
    }

    function c(y, b, C) {
        if (!(this instanceof c)) return new c(y, b, C);
        var O = y;
        return typeof y == "string" && (O = document.querySelectorAll(y)), O ? (this.elements = v(O), this.options = u({}, this.options), typeof b == "function" ? C = b : u(this.options, b), C && this.on("always", C), this.getImages(), g && (this.jqDeferred = new g.Deferred), void setTimeout(this.check.bind(this))) : void T.error("Bad element for imagesLoaded " + (O || y))
    }

    function d(y) {
        this.img = y
    }

    function l(y, b) {
        this.url = y, this.element = b, this.img = new Image
    }
    var g = m.jQuery,
        T = m.console,
        I = Array.prototype.slice;
    c.prototype = Object.create(S.prototype), c.prototype.options = {}, c.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, c.prototype.addElementImages = function(y) {
        y.nodeName == "IMG" && this.addImage(y), this.options.background === !0 && this.addElementBackgroundImages(y);
        var b = y.nodeType;
        if (b && D[b]) {
            for (var C = y.querySelectorAll("img"), O = 0; O < C.length; O++) {
                var P = C[O];
                this.addImage(P)
            }
            if (typeof this.options.background == "string") {
                var E = y.querySelectorAll(this.options.background);
                for (O = 0; O < E.length; O++) {
                    var o = E[O];
                    this.addElementBackgroundImages(o)
                }
            }
        }
    };
    var D = {
        1: !0,
        9: !0,
        11: !0
    };
    return c.prototype.addElementBackgroundImages = function(y) {
        var b = getComputedStyle(y);
        if (b)
            for (var C = /url\((['"])?(.*?)\1\)/gi, O = C.exec(b.backgroundImage); O !== null;) {
                var P = O && O[2];
                P && this.addBackground(P, y), O = C.exec(b.backgroundImage)
            }
    }, c.prototype.addImage = function(y) {
        var b = new d(y);
        this.images.push(b)
    }, c.prototype.addBackground = function(y, b) {
        var C = new l(y, b);
        this.images.push(C)
    }, c.prototype.check = function() {
        function y(C, O, P) {
            setTimeout(function() {
                b.progress(C, O, P)
            })
        }
        var b = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(C) {
            C.once("progress", y), C.check()
        }) : void this.complete()
    }, c.prototype.progress = function(y, b, C) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !y.isLoaded, this.emitEvent("progress", [this, y, b]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, y), this.progressedCount == this.images.length && this.complete(), this.options.debug && T && T.log("progress: " + C, y, b)
    }, c.prototype.complete = function() {
        var y = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(y, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var b = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[b](this)
        }
    }, d.prototype = Object.create(S.prototype), d.prototype.check = function() {
        var y = this.getIsImageComplete();
        return y ? void this.confirm(this.img.naturalWidth !== 0, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, d.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }, d.prototype.confirm = function(y, b) {
        this.isLoaded = y, this.emitEvent("progress", [this, this.img, b])
    }, d.prototype.handleEvent = function(y) {
        var b = "on" + y.type;
        this[b] && this[b](y)
    }, d.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, d.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, d.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, l.prototype = Object.create(d.prototype), l.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var y = this.getIsImageComplete();
        y && (this.confirm(this.img.naturalWidth !== 0, "naturalWidth"), this.unbindEvents())
    }, l.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, l.prototype.confirm = function(y, b) {
        this.isLoaded = y, this.emitEvent("progress", [this, this.element, b])
    }, c.makeJQueryPlugin = function(y) {
        y = y || m.jQuery, y && (g = y, g.fn.imagesLoaded = function(b, C) {
            var O = new c(this, b, C);
            return O.jqDeferred.promise(g(this))
        })
    }, c.makeJQueryPlugin(), c
}),
function(m, S) {
    typeof define == "function" && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(u, v) {
        return S(m, u, v)
    }) : typeof module == "object" && module.exports ? module.exports = S(m, require("flickity"), require("imagesloaded")) : m.Flickity = S(m, m.Flickity, m.imagesLoaded)
}(window, function(m, S, u) {
    "use strict";
    S.createMethods.push("_createImagesLoaded");
    var v = S.prototype;
    return v._createImagesLoaded = function() {
        this.on("activate", this.imagesLoaded)
    }, v.imagesLoaded = function() {
        function c(l, g) {
            var T = d.getParentCell(g.img);
            d.cellSizeChange(T && T.element), d.options.freeScroll || d.positionSliderAtSelected()
        }
        if (this.options.imagesLoaded) {
            var d = this;
            u(this.slider).on("progress", c)
        }
    }, S
});
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
 (function(m, S, u) {
    function v(a, h) {
        return typeof a === h
    }

    function c() {
        var a, h, k, _, M, F, B;
        for (var W in D)
            if (D.hasOwnProperty(W)) {
                if (a = [], h = D[W], h.name && (a.push(h.name.toLowerCase()), h.options && h.options.aliases && h.options.aliases.length))
                    for (k = 0; k < h.options.aliases.length; k++) a.push(h.options.aliases[k].toLowerCase());
                for (_ = v(h.fn, "function") ? h.fn() : h.fn, M = 0; M < a.length; M++) F = a[M], B = F.split("."), B.length === 1 ? b[B[0]] = _ : (!b[B[0]] || b[B[0]] instanceof Boolean || (b[B[0]] = new Boolean(b[B[0]])), b[B[0]][B[1]] = _), I.push((_ ? "" : "no-") + B.join("-"))
            }
    }

    function d(a) {
        var h = C.className,
            k = b._config.classPrefix || "";
        if (O && (h = h.baseVal), b._config.enableJSClass) {
            var _ = new RegExp("(^|\\s)" + k + "no-js(\\s|$)");
            h = h.replace(_, "$1" + k + "js$2")
        }
        b._config.enableClasses && (h += " " + k + a.join(" " + k), O ? C.className.baseVal = h : C.className = h)
    }

    function l() {
        return typeof S.createElement != "function" ? S.createElement(arguments[0]) : O ? S.createElementNS.call(S, "http://www.w3.org/2000/svg", arguments[0]) : S.createElement.apply(S, arguments)
    }

    function g() {
        var a = S.body;
        return a || (a = l(O ? "svg" : "body"), a.fake = !0), a
    }

    function T(a, h, k, _) {
        var M, F, B, W, H = "modernizr",
            G = l("div"),
            R = g();
        if (parseInt(k, 10))
            for (; k--;) B = l("div"), B.id = _ ? _[k] : H + (k + 1), G.appendChild(B);
        return M = l("style"), M.type = "text/css", M.id = "s" + H, (R.fake ? R : G).appendChild(M), R.appendChild(G), M.styleSheet ? M.styleSheet.cssText = a : M.appendChild(S.createTextNode(a)), G.id = H, R.fake && (R.style.background = "", R.style.overflow = "hidden", W = C.style.overflow, C.style.overflow = "hidden", C.appendChild(R)), F = h(G, a), R.fake ? (R.parentNode.removeChild(R), C.style.overflow = W, C.offsetHeight) : G.parentNode.removeChild(G), !!F
    }
    var I = [],
        D = [],
        y = {
            _version: "3.3.1",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(a, h) {
                var k = this;
                setTimeout(function() {
                    h(k[a])
                }, 0)
            },
            addTest: function(a, h, k) {
                D.push({
                    name: a,
                    fn: h,
                    options: k
                })
            },
            addAsyncTest: function(a) {
                D.push({
                    name: null,
                    fn: a
                })
            }
        },
        b = function() {};
    b.prototype = y, b = new b;
    var C = S.documentElement,
        O = C.nodeName.toLowerCase() === "svg",
        P = y._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    y._prefixes = P;
    var E = y.testStyles = T;
    b.addTest("touchevents", function() {
        var a;
        if ("ontouchstart" in m || m.DocumentTouch && S instanceof DocumentTouch) a = !0;
        else {
            var h = ["@media (", P.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            E(h, function(k) {
                a = k.offsetTop === 9
            })
        }
        return a
    }), c(), d(I), delete y.addTest, delete y.addAsyncTest;
    for (var o = 0; o < b._q.length; o++) b._q[o]();
    m.Modernizr = b
})(window, document);
/*!
 * Headhesive.js v1.2.3 - An on-demand sticky header
 * Author: Copyright (c) Mark Goodyear <@markgdyr> <http://markgoodyear.com>
 * Url: http://markgoodyear.com/labs/headhesive
 * License: MIT
 */
(function(m, S) {
    typeof define == "function" && define.amd ? define([], function() {
        return S()
    }) : typeof exports == "object" ? module.exports = S() : m.Headhesive = S()
})(this, function() {
    "use strict";
    var m = function(d, l) {
            for (var g in l) l.hasOwnProperty(g) && (d[g] = typeof l[g] == "object" ? m(d[g], l[g]) : l[g]);
            return d
        },
        S = function(d, l) {
            var g, T, I, D = Date.now || function() {
                    return new Date().getTime()
                },
                y = null,
                b = 0,
                C = function() {
                    b = D(), y = null, I = d.apply(g, T), g = T = null
                };
            return function() {
                var O = D(),
                    P = l - (O - b);
                return g = this, T = arguments, 0 >= P ? (clearTimeout(y), y = null, b = O, I = d.apply(g, T), g = T = null) : y || (y = setTimeout(C, P)), I
            }
        },
        u = function() {
            return window.pageYOffset !== void 0 ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
        },
        v = function(d, l) {
            for (var g = 0, T = d.offsetHeight; d;) g += d.offsetTop, d = d.offsetParent;
            return l === "bottom" && (g += T), g
        },
        c = function(d, l) {
            "querySelector" in document && "addEventListener" in window && (this.visible = !1, this.options = {
                offset: 300,
                offsetSide: "top",
                classes: {
                    clone: "headhesive",
                    stick: "headhesive--stick",
                    unstick: "headhesive--unstick"
                },
                throttle: 250,
                onInit: function() {},
                onStick: function() {},
                onUnstick: function() {},
                onDestroy: function() {}
            }, this.elem = typeof d == "string" ? document.querySelector(d) : d, this.options = m(this.options, l), this.init())
        };
    return c.prototype = {
        constructor: c,
        init: function() {
            if (this.clonedElem = this.elem.cloneNode(!0), this.clonedElem.className += " " + this.options.classes.clone, document.body.insertBefore(this.clonedElem, document.body.firstChild), typeof this.options.offset == "number") this.scrollOffset = this.options.offset;
            else {
                if (typeof this.options.offset != "string") throw new Error("Invalid offset: " + this.options.offset);
                this._setScrollOffset()
            }
            this._throttleUpdate = S(this.update.bind(this), this.options.throttle), this._throttleScrollOffset = S(this._setScrollOffset.bind(this), this.options.throttle), window.addEventListener("scroll", this._throttleUpdate, !1), window.addEventListener("resize", this._throttleScrollOffset, !1), this.options.onInit.call(this)
        },
        _setScrollOffset: function() {
            typeof this.options.offset == "string" && (this.scrollOffset = v(document.querySelector(this.options.offset), this.options.offsetSide))
        },
        destroy: function() {
            document.body.removeChild(this.clonedElem), window.removeEventListener("scroll", this._throttleUpdate), window.removeEventListener("resize", this._throttleScrollOffset), this.options.onDestroy.call(this)
        },
        stick: function() {
            this.visible || (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.stick, this.visible = !0, this.options.onStick.call(this))
        },
        unstick: function() {
            this.visible && (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.unstick, this.visible = !1, this.options.onUnstick.call(this))
        },
        update: function() {
            u() > this.scrollOffset ? this.stick() : this.unstick()
        }
    }, c
}); /*! js-url - v2.5.0 - 2017-04-22 */
(jQuery),
function(m, S) {
    typeof exports == "object" && typeof module != "undefined" ? module.exports = S() : typeof define == "function" && define.amd ? define(S) : m.lazyframe = S()
}(this, function() {
    "use strict";
    var m = Object.assign || function(S) {
        for (var u = 1; u < arguments.length; u++) {
            var v = arguments[u];
            for (var c in v) Object.prototype.hasOwnProperty.call(v, c) && (S[c] = v[c])
        }
        return S
    };
    return function() {
        function S(P) {
            if (y = m({}, C, arguments.length <= 1 ? void 0 : arguments[1]), typeof P == "string")
                for (var E = document.querySelectorAll(P), o = 0; o < E.length; o++) u(E[o]);
            else if (P.length === void 0) u(P);
            else if (P.length > 1)
                for (var a = 0; a < P.length; a++) u(P[a]);
            else u(P[0]);
            y.lazyload && T()
        }

        function u(P) {
            var E = this;
            if (P instanceof HTMLElement && !P.classList.contains("lazyframe--loaded")) {
                var o = {
                    el: P,
                    settings: v(P)
                };
                o.el.addEventListener("click", function() {
                    o.el.appendChild(o.iframe);
                    var a = P.querySelectorAll("iframe");
                    o.settings.onAppend.call(E, a[0])
                }), y.lazyload ? I(o) : l(o, !!o.settings.thumbnail)
            }
        }

        function v(P) {
            var E = Array.prototype.slice.apply(P.attributes).filter(function(h) {
                    return h.value !== ""
                }).reduce(function(h, k) {
                    return h[k.name.indexOf("data-") === 0 ? k.name.split("data-")[1] : k.name] = k.value, h
                }, {}),
                o = m({}, y, E, {
                    y: P.offsetTop,
                    parameters: c(E.src)
                });
            if (o.vendor) {
                var a = o.src.match(O.regex[o.vendor]);
                o.id = O.condition[o.vendor](a)
            }
            return o
        }

        function c(P) {
            var E = P.split("?");
            return E[1] ? (E = E[1], E.indexOf("autoplay") !== -1 ? E : E + "&autoplay=1") : "autoplay=1"
        }

        function d(P) {
            return !!P.vendor && (!P.title || !P.thumbnail) && (P.vendor !== "youtube" && P.vendor !== "youtube_nocookie" || !!P.apikey)
        }

        function l(P) {
            var E = this;
            d(P.settings) ? g(P, function(o, a) {
                if (!o) {
                    var h = a[0],
                        k = a[1];
                    if (k.settings.title || (k.settings.title = O.response[k.settings.vendor].title(h)), !k.settings.thumbnail) {
                        var _ = O.response[k.settings.vendor].thumbnail(h);
                        k.settings.thumbnail = _, P.settings.onThumbnailLoad.call(E, _)
                    }
                    I(k, !0)
                }
            }) : I(P, !0)
        }

        function g(P, E) {
            var o = O.endpoints[P.settings.vendor](P.settings),
                a = new XMLHttpRequest;
            a.open("GET", o, !0), a.onload = function() {
                if (a.status >= 200 && a.status < 400) {
                    var h = JSON.parse(a.responseText);
                    E(null, [h, P])
                } else E(!0)
            }, a.onerror = function() {
                E(!0)
            }, a.send()
        }

        function T() {
            var P = this,
                E = window.innerHeight,
                o = b.length,
                a = function(M, F) {
                    M.settings.initialized = !0, M.el.classList.add("lazyframe--loaded"), o--, l(M), M.settings.initinview && M.el.click(), M.settings.onLoad.call(P, M)
                };
            b.filter(function(M) {
                return M.settings.y < E
            }).forEach(a);
            var h = function(M, F, B) {
                    var W = void 0;
                    return function() {
                        var H = this,
                            G = arguments,
                            R = function() {
                                W = null, B || M.apply(H, G)
                            },
                            nt = B && !W;
                        clearTimeout(W), W = setTimeout(R, F), nt && M.apply(H, G)
                    }
                }(function() {
                    _ = k < window.pageYOffset, k = window.pageYOffset, _ && b.filter(function(M) {
                        return M.settings.y < E + k && M.settings.initialized === !1
                    }).forEach(a), o === 0 && window.removeEventListener("scroll", h, !1)
                }, y.debounce),
                k = 0,
                _ = !1;
            window.addEventListener("scroll", h, !1)
        }

        function I(P, E) {
            if (P.iframe = D(P.settings), P.settings.thumbnail && E && (P.el.style.backgroundImage = "url(" + P.settings.thumbnail + ")"), P.settings.title && P.el.children.length === 0) {
                var o = document.createDocumentFragment(),
                    a = document.createElement("span");
                a.className = "lazyframe__title", a.innerHTML = P.settings.title, o.appendChild(a), P.el.appendChild(o)
            }
            y.lazyload || (P.el.classList.add("lazyframe--loaded"), P.settings.onLoad.call(this, P), b.push(P)), P.settings.initialized || b.push(P)
        }

        function D(P) {
            var E = document.createDocumentFragment(),
                o = document.createElement("iframe");
            if (P.vendor && (P.src = O.src[P.vendor](P)), o.setAttribute("id", "lazyframe-" + P.id), o.setAttribute("src", P.src), o.setAttribute("frameborder", 0), o.setAttribute("allowfullscreen", ""), P.vendor === "vine") {
                var a = document.createElement("script");
                a.setAttribute("src", "https://platform.vine.co/static/scripts/embed.js"), E.appendChild(a)
            }
            return E.appendChild(o), E
        }
        var y = void 0,
            b = [],
            C = {
                vendor: void 0,
                id: void 0,
                src: void 0,
                thumbnail: void 0,
                title: void 0,
                apikey: void 0,
                initialized: !1,
                parameters: void 0,
                y: void 0,
                debounce: 250,
                lazyload: !0,
                initinview: !1,
                onLoad: function(P) {},
                onAppend: function(P) {},
                onThumbnailLoad: function(P) {}
            },
            O = {
                regex: {
                    youtube_nocookie: /(?:youtube-nocookie\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=)))([a-zA-Z0-9_-]{6,11})/,
                    youtube: /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,
                    vimeo: /vimeo\.com\/(?:video\/)?([0-9]*)(?:\?|)/,
                    vine: /vine.co\/v\/(.*)/
                },
                condition: {
                    youtube: function(P) {
                        return !(!P || P[1].length != 11) && P[1]
                    },
                    youtube_nocookie: function(P) {
                        return !(!P || P[1].length != 11) && P[1]
                    },
                    vimeo: function(P) {
                        return !!(P && P[1].length === 9 || P[1].length === 8) && P[1]
                    },
                    vine: function(P) {
                        return !(!P || P[1].length !== 11) && P[1]
                    }
                },
                src: {
                    youtube: function(P) {
                        return "https://www.youtube.com/embed/" + P.id + "/?" + P.parameters
                    },
                    youtube_nocookie: function(P) {
                        return "https://www.youtube-nocookie.com/embed/" + P.id + "/?" + P.parameters
                    },
                    vimeo: function(P) {
                        return "https://player.vimeo.com/video/" + P.id + "/?" + P.parameters
                    },
                    vine: function(P) {
                        return "https://vine.co/v/" + P.id + "/embed/simple"
                    }
                },
                endpoints: {
                    youtube: function(P) {
                        return "https://www.googleapis.com/youtube/v3/videos?id=" + P.id + "&key=" + P.apikey + "&fields=items(snippet(title,thumbnails))&part=snippet"
                    },
                    youtube_nocookie: function(P) {
                        return "https://www.googleapis.com/youtube/v3/videos?id=" + P.id + "&key=" + P.apikey + "&fields=items(snippet(title,thumbnails))&part=snippet"
                    },
                    vimeo: function(P) {
                        return "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + P.id
                    },
                    vine: function(P) {
                        return "https://vine.co/oembed.json?url=https%3A%2F%2Fvine.co%2Fv%2F" + P.id
                    }
                },
                response: {
                    youtube: {
                        title: function(P) {
                            return P.items[0].snippet.title
                        },
                        thumbnail: function(P) {
                            var E = P.items[0].snippet.thumbnails;
                            return (E.maxres || E.standard || E.high || E.medium || E.default).url
                        }
                    },
                    youtube_nocookie: {
                        title: function(P) {
                            return P.items[0].snippet.title
                        },
                        thumbnail: function(P) {
                            var E = P.items[0].snippet.thumbnails;
                            return (E.maxres || E.standard || E.high || E.medium || E.default).url
                        }
                    },
                    vimeo: {
                        title: function(P) {
                            return P.title
                        },
                        thumbnail: function(P) {
                            return P.thumbnail_url
                        }
                    },
                    vine: {
                        title: function(P) {
                            return P.title
                        },
                        thumbnail: function(P) {
                            return P.thumbnail_url
                        }
                    }
                }
            };
        return S
    }()
}),
function(m, S, u, v) {
    "use strict";

    function c(o, a) {
        var h, k, _, M = [],
            F = 0;
        o && o.isDefaultPrevented() || (o.preventDefault(), a = a || {}, o && o.data && (a = O(o.data.options, a)), h = a.$target || u(o.currentTarget).trigger("blur"), (_ = u.fancybox.getInstance()) && _.$trigger && _.$trigger.is(h) || (a.selector ? M = u(a.selector) : (k = h.attr("data-fancybox") || "", k ? (M = o.data ? o.data.items : [], M = M.length ? M.filter('[data-fancybox="' + k + '"]') : u('[data-fancybox="' + k + '"]')) : M = [h]), F = u(M).index(h), F < 0 && (F = 0), _ = u.fancybox.open(M, a, F), _.$trigger = h))
    }
    if (m.console = m.console || {
            info: function(o) {}
        }, u) {
        if (u.fn.fancybox) return void console.info("fancyBox already initialized");
        var d = {
                closeExisting: !1,
                loop: !1,
                gutter: 50,
                keyboard: !0,
                preventCaptionOverlap: !0,
                arrows: !0,
                infobar: !0,
                smallBtn: "auto",
                toolbar: "auto",
                buttons: ["zoom", "slideShow", "thumbs", "close"],
                idleTime: 3,
                protect: !1,
                modal: !1,
                image: {
                    preload: !1
                },
                ajax: {
                    settings: {
                        data: {
                            fancybox: !0
                        }
                    }
                },
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: {
                        scrolling: "auto"
                    }
                },
                video: {
                    tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                    format: "",
                    autoStart: !0
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 366,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                    smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
                },
                parentEl: "body",
                hideScrollbar: !0,
                autoFocus: !0,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: {
                    autoStart: !1
                },
                touch: {
                    vertical: !0,
                    momentum: !0
                },
                hash: null,
                media: {},
                slideShow: {
                    autoStart: !1,
                    speed: 3e3
                },
                thumbs: {
                    autoStart: !1,
                    hideOnClose: !0,
                    parentEl: ".fancybox-container",
                    axis: "y"
                },
                wheel: "auto",
                onInit: u.noop,
                beforeLoad: u.noop,
                afterLoad: u.noop,
                beforeShow: u.noop,
                afterShow: u.noop,
                beforeClose: u.noop,
                afterClose: u.noop,
                onActivate: u.noop,
                onDeactivate: u.noop,
                clickContent: function(o, a) {
                    return o.type === "image" && "zoom"
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    preventCaptionOverlap: !1,
                    idleTime: !1,
                    clickContent: function(o, a) {
                        return o.type === "image" && "toggleControls"
                    },
                    clickSlide: function(o, a) {
                        return o.type === "image" ? "toggleControls" : "close"
                    },
                    dblclickContent: function(o, a) {
                        return o.type === "image" && "zoom"
                    },
                    dblclickSlide: function(o, a) {
                        return o.type === "image" && "zoom"
                    }
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom"
                    },
                    de: {
                        CLOSE: "Schlie&szlig;en",
                        NEXT: "Weiter",
                        PREV: "Zur&uuml;ck",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Vergr&ouml;&szlig;ern"
                    }
                }
            },
            l = u(m),
            g = u(S),
            T = 0,
            I = function(o) {
                return o && o.hasOwnProperty && o instanceof u
            },
            D = function() {
                return m.requestAnimationFrame || m.webkitRequestAnimationFrame || m.mozRequestAnimationFrame || m.oRequestAnimationFrame || function(o) {
                    return m.setTimeout(o, 1e3 / 60)
                }
            }(),
            y = function() {
                return m.cancelAnimationFrame || m.webkitCancelAnimationFrame || m.mozCancelAnimationFrame || m.oCancelAnimationFrame || function(o) {
                    m.clearTimeout(o)
                }
            }(),
            b = function() {
                var o, a = S.createElement("fakeelement"),
                    h = {
                        transition: "transitionend",
                        OTransition: "oTransitionEnd",
                        MozTransition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd"
                    };
                for (o in h)
                    if (a.style[o] !== void 0) return h[o];
                return "transitionend"
            }(),
            C = function(o) {
                return o && o.length && o[0].offsetHeight
            },
            O = function(o, a) {
                var h = u.extend(!0, {}, o, a);
                return u.each(a, function(k, _) {
                    u.isArray(_) && (h[k] = _)
                }), h
            },
            P = function(o) {
                var a, h;
                return !(!o || o.ownerDocument !== S) && (u(".fancybox-container").css("pointer-events", "none"), a = {
                    x: o.getBoundingClientRect().left + o.offsetWidth / 2,
                    y: o.getBoundingClientRect().top + o.offsetHeight / 2
                }, h = S.elementFromPoint(a.x, a.y) === o, u(".fancybox-container").css("pointer-events", ""), h)
            },
            E = function(o, a, h) {
                var k = this;
                k.opts = O({
                    index: h
                }, u.fancybox.defaults), u.isPlainObject(a) && (k.opts = O(k.opts, a)), u.fancybox.isMobile && (k.opts = O(k.opts, k.opts.mobile)), k.id = k.opts.id || ++T, k.currIndex = parseInt(k.opts.index, 10) || 0, k.prevIndex = null, k.prevPos = null, k.currPos = 0, k.firstRun = !0, k.group = [], k.slides = {}, k.addContent(o), k.group.length && k.init()
            };
        u.extend(E.prototype, {
                init: function() {
                    var o, a, h = this,
                        k = h.group[h.currIndex],
                        _ = k.opts;
                    _.closeExisting && u.fancybox.close(!0), u("body").addClass("fancybox-active"), !u.fancybox.getInstance() && _.hideScrollbar !== !1 && !u.fancybox.isMobile && S.body.scrollHeight > m.innerHeight && (u("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (m.innerWidth - S.documentElement.clientWidth) + "px;}</style>"), u("body").addClass("compensate-for-scrollbar")), a = "", u.each(_.buttons, function(M, F) {
                        a += _.btnTpl[F] || ""
                    }), o = u(h.translate(h, _.baseTpl.replace("{{buttons}}", a).replace("{{arrows}}", _.btnTpl.arrowLeft + _.btnTpl.arrowRight))).attr("id", "fancybox-container-" + h.id).addClass(_.baseClass).data("FancyBox", h).appendTo(_.parentEl), h.$refs = {
                        container: o
                    }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(M) {
                        h.$refs[M] = o.find(".fancybox-" + M)
                    }), h.trigger("onInit"), h.activate(), h.jumpTo(h.currIndex)
                },
                translate: function(o, a) {
                    var h = o.opts.i18n[o.opts.lang] || o.opts.i18n.en;
                    return a.replace(/\{\{(\w+)\}\}/g, function(k, _) {
                        return h[_] === void 0 ? k : h[_]
                    })
                },
                addContent: function(o) {
                    var a, h = this,
                        k = u.makeArray(o);
                    u.each(k, function(_, M) {
                        var F, B, W, H, G, R = {},
                            nt = {};
                        u.isPlainObject(M) ? (R = M, nt = M.opts || M) : u.type(M) === "object" && u(M).length ? (F = u(M), nt = F.data() || {}, nt = u.extend(!0, {}, nt, nt.options), nt.$orig = F, R.src = h.opts.src || nt.src || F.attr("href"), R.type || R.src || (R.type = "inline", R.src = M)) : R = {
                            type: "html",
                            src: M + ""
                        }, R.opts = u.extend(!0, {}, h.opts, nt), u.isArray(nt.buttons) && (R.opts.buttons = nt.buttons), u.fancybox.isMobile && R.opts.mobile && (R.opts = O(R.opts, R.opts.mobile)), B = R.type || R.opts.type, H = R.src || "", !B && H && ((W = H.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (B = "video", R.opts.video.format || (R.opts.video.format = "video/" + (W[1] === "ogv" ? "ogg" : W[1]))) : H.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? B = "image" : H.match(/\.(pdf)((\?|#).*)?$/i) ? (B = "iframe", R = u.extend(!0, R, {
                            contentType: "pdf",
                            opts: {
                                iframe: {
                                    preload: !1
                                }
                            }
                        })) : H.charAt(0) === "#" && (B = "inline")), B ? R.type = B : h.trigger("objectNeedsType", R), R.contentType || (R.contentType = u.inArray(R.type, ["html", "inline", "ajax"]) > -1 ? "html" : R.type), R.index = h.group.length, R.opts.smallBtn == "auto" && (R.opts.smallBtn = u.inArray(R.type, ["html", "inline", "ajax"]) > -1), R.opts.toolbar === "auto" && (R.opts.toolbar = !R.opts.smallBtn), R.$thumb = R.opts.$thumb || null, R.opts.$trigger && R.index === h.opts.index && (R.$thumb = R.opts.$trigger.find("img:first"), R.$thumb.length && (R.opts.$orig = R.opts.$trigger)), R.$thumb && R.$thumb.length || !R.opts.$orig || (R.$thumb = R.opts.$orig.find("img:first")), R.$thumb && !R.$thumb.length && (R.$thumb = null), R.thumb = R.opts.thumb || (R.$thumb ? R.$thumb[0].src : null), u.type(R.opts.caption) === "function" && (R.opts.caption = R.opts.caption.apply(M, [h, R])), u.type(h.opts.caption) === "function" && (R.opts.caption = h.opts.caption.apply(M, [h, R])), R.opts.caption instanceof u || (R.opts.caption = R.opts.caption === void 0 ? "" : R.opts.caption + ""), R.type === "ajax" && (G = H.split(/\s+/, 2), G.length > 1 && (R.src = G.shift(), R.opts.filter = G.shift())), R.opts.modal && (R.opts = u.extend(!0, R.opts, {
                            trapFocus: !0,
                            infobar: 0,
                            toolbar: 0,
                            smallBtn: 0,
                            keyboard: 0,
                            slideShow: 0,
                            fullScreen: 0,
                            thumbs: 0,
                            touch: 0,
                            clickContent: !1,
                            clickSlide: !1,
                            clickOutside: !1,
                            dblclickContent: !1,
                            dblclickSlide: !1,
                            dblclickOutside: !1
                        })), h.group.push(R)
                    }), Object.keys(h.slides).length && (h.updateControls(), (a = h.Thumbs) && a.isActive && (a.create(), a.focus()))
                },
                addEvents: function() {
                    var o = this;
                    o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(a) {
                        a.stopPropagation(), a.preventDefault(), o.close(a)
                    }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(a) {
                        a.stopPropagation(), a.preventDefault(), o.previous()
                    }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(a) {
                        a.stopPropagation(), a.preventDefault(), o.next()
                    }).on("click.fb", "[data-fancybox-zoom]", function(a) {
                        o[o.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                    }), l.on("orientationchange.fb resize.fb", function(a) {
                        a && a.originalEvent && a.originalEvent.type === "resize" ? (o.requestId && y(o.requestId), o.requestId = D(function() {
                            o.update(a)
                        })) : (o.current && o.current.type === "iframe" && o.$refs.stage.hide(), setTimeout(function() {
                            o.$refs.stage.show(), o.update(a)
                        }, u.fancybox.isMobile ? 600 : 250))
                    }), g.on("keydown.fb", function(a) {
                        var h = u.fancybox ? u.fancybox.getInstance() : null,
                            k = h.current,
                            _ = a.keyCode || a.which;
                        if (_ == 9) return void(k.opts.trapFocus && o.focus(a));
                        if (!(!k.opts.keyboard || a.ctrlKey || a.altKey || a.shiftKey || u(a.target).is("input,textarea,video,audio"))) return _ === 8 || _ === 27 ? (a.preventDefault(), void o.close(a)) : _ === 37 || _ === 38 ? (a.preventDefault(), void o.previous()) : _ === 39 || _ === 40 ? (a.preventDefault(), void o.next()) : void o.trigger("afterKeydown", a, _)
                    }), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, g.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(a) {
                        o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1
                    }), o.idleInterval = m.setInterval(function() {
                        ++o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && !o.isDragging && (o.isIdle = !0, o.idleSecondsCounter = 0, o.hideControls())
                    }, 1e3))
                },
                removeEvents: function() {
                    var o = this;
                    l.off("orientationchange.fb resize.fb"), g.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), o.idleInterval && (m.clearInterval(o.idleInterval), o.idleInterval = null)
                },
                previous: function(o) {
                    return this.jumpTo(this.currPos - 1, o)
                },
                next: function(o) {
                    return this.jumpTo(this.currPos + 1, o)
                },
                jumpTo: function(o, a) {
                    var h, k, _, M, F, B, W, H, G, R = this,
                        nt = R.group.length;
                    if (!(R.isDragging || R.isClosing || R.isAnimating && R.firstRun)) {
                        if (o = parseInt(o, 10), !(_ = R.current ? R.current.opts.loop : R.opts.loop) && (o < 0 || o >= nt)) return !1;
                        if (h = R.firstRun = !Object.keys(R.slides).length, F = R.current, R.prevIndex = R.currIndex, R.prevPos = R.currPos, M = R.createSlide(o), nt > 1 && ((_ || M.index < nt - 1) && R.createSlide(o + 1), (_ || M.index > 0) && R.createSlide(o - 1)), R.current = M, R.currIndex = M.index, R.currPos = M.pos, R.trigger("beforeShow", h), R.updateControls(), M.forcedDuration = void 0, u.isNumeric(a) ? M.forcedDuration = a : a = M.opts[h ? "animationDuration" : "transitionDuration"], a = parseInt(a, 10), k = R.isMoved(M), M.$slide.addClass("fancybox-slide--current"), h) return M.opts.animationEffect && a && R.$refs.container.css("transition-duration", a + "ms"), R.$refs.container.addClass("fancybox-is-open").trigger("focus"), R.loadSlide(M), void R.preload("image");
                        B = u.fancybox.getTranslate(F.$slide), W = u.fancybox.getTranslate(R.$refs.stage), u.each(R.slides, function(Ft, lt) {
                            u.fancybox.stop(lt.$slide, !0)
                        }), F.pos !== M.pos && (F.isComplete = !1), F.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), k ? (G = B.left - (F.pos * B.width + F.pos * F.opts.gutter), u.each(R.slides, function(Ft, lt) {
                            lt.$slide.removeClass("fancybox-animated").removeClass(function(an, ye) {
                                return (ye.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                            });
                            var Mi = lt.pos * B.width + lt.pos * lt.opts.gutter;
                            u.fancybox.setTranslate(lt.$slide, {
                                top: 0,
                                left: Mi - W.left + G
                            }), lt.pos !== M.pos && lt.$slide.addClass("fancybox-slide--" + (lt.pos > M.pos ? "next" : "previous")), C(lt.$slide), u.fancybox.animate(lt.$slide, {
                                top: 0,
                                left: (lt.pos - M.pos) * B.width + (lt.pos - M.pos) * lt.opts.gutter
                            }, a, function() {
                                lt.$slide.css({
                                    transform: "",
                                    opacity: ""
                                }).removeClass("fancybox-slide--next fancybox-slide--previous"), lt.pos === R.currPos && R.complete()
                            })
                        })) : a && M.opts.transitionEffect && (H = "fancybox-animated fancybox-fx-" + M.opts.transitionEffect, F.$slide.addClass("fancybox-slide--" + (F.pos > M.pos ? "next" : "previous")), u.fancybox.animate(F.$slide, H, a, function() {
                            F.$slide.removeClass(H).removeClass("fancybox-slide--next fancybox-slide--previous")
                        }, !1)), M.isLoaded ? R.revealContent(M) : R.loadSlide(M), R.preload("image")
                    }
                },
                createSlide: function(o) {
                    var a, h, k = this;
                    return h = o % k.group.length, h = h < 0 ? k.group.length + h : h, !k.slides[o] && k.group[h] && (a = u('<div class="fancybox-slide"></div>').appendTo(k.$refs.stage), k.slides[o] = u.extend(!0, {}, k.group[h], {
                        pos: o,
                        $slide: a,
                        isLoaded: !1
                    }), k.updateSlide(k.slides[o])), k.slides[o]
                },
                scaleToActual: function(o, a, h) {
                    var k, _, M, F, B, W = this,
                        H = W.current,
                        G = H.$content,
                        R = u.fancybox.getTranslate(H.$slide).width,
                        nt = u.fancybox.getTranslate(H.$slide).height,
                        Ft = H.width,
                        lt = H.height;
                    W.isAnimating || W.isMoved() || !G || H.type != "image" || !H.isLoaded || H.hasError || (W.isAnimating = !0, u.fancybox.stop(G), o = o === void 0 ? .5 * R : o, a = a === void 0 ? .5 * nt : a, k = u.fancybox.getTranslate(G), k.top -= u.fancybox.getTranslate(H.$slide).top, k.left -= u.fancybox.getTranslate(H.$slide).left, F = Ft / k.width, B = lt / k.height, _ = .5 * R - .5 * Ft, M = .5 * nt - .5 * lt, Ft > R && (_ = k.left * F - (o * F - o), _ > 0 && (_ = 0), _ < R - Ft && (_ = R - Ft)), lt > nt && (M = k.top * B - (a * B - a), M > 0 && (M = 0), M < nt - lt && (M = nt - lt)), W.updateCursor(Ft, lt), u.fancybox.animate(G, {
                        top: M,
                        left: _,
                        scaleX: F,
                        scaleY: B
                    }, h || 366, function() {
                        W.isAnimating = !1
                    }), W.SlideShow && W.SlideShow.isActive && W.SlideShow.stop())
                },
                scaleToFit: function(o) {
                    var a, h = this,
                        k = h.current,
                        _ = k.$content;
                    h.isAnimating || h.isMoved() || !_ || k.type != "image" || !k.isLoaded || k.hasError || (h.isAnimating = !0, u.fancybox.stop(_), a = h.getFitPos(k), h.updateCursor(a.width, a.height), u.fancybox.animate(_, {
                        top: a.top,
                        left: a.left,
                        scaleX: a.width / _.width(),
                        scaleY: a.height / _.height()
                    }, o || 366, function() {
                        h.isAnimating = !1
                    }))
                },
                getFitPos: function(o) {
                    var a, h, k, _, M = this,
                        F = o.$content,
                        B = o.$slide,
                        W = o.width || o.opts.width,
                        H = o.height || o.opts.height,
                        G = {};
                    return !!(o.isLoaded && F && F.length) && (a = u.fancybox.getTranslate(M.$refs.stage).width, h = u.fancybox.getTranslate(M.$refs.stage).height, a -= parseFloat(B.css("paddingLeft")) + parseFloat(B.css("paddingRight")) + parseFloat(F.css("marginLeft")) + parseFloat(F.css("marginRight")), h -= parseFloat(B.css("paddingTop")) + parseFloat(B.css("paddingBottom")) + parseFloat(F.css("marginTop")) + parseFloat(F.css("marginBottom")), W && H || (W = a, H = h), k = Math.min(1, a / W, h / H), W *= k, H *= k, W > a - .5 && (W = a), H > h - .5 && (H = h), o.type === "image" ? (G.top = Math.floor(.5 * (h - H)) + parseFloat(B.css("paddingTop")), G.left = Math.floor(.5 * (a - W)) + parseFloat(B.css("paddingLeft"))) : o.contentType === "video" && (_ = o.opts.width && o.opts.height ? W / H : o.opts.ratio || 16 / 9, H > W / _ ? H = W / _ : W > H * _ && (W = H * _)), G.width = W, G.height = H, G)
                },
                update: function(o) {
                    var a = this;
                    u.each(a.slides, function(h, k) {
                        a.updateSlide(k, o)
                    })
                },
                updateSlide: function(o, a) {
                    var h = this,
                        k = o && o.$content,
                        _ = o.width || o.opts.width,
                        M = o.height || o.opts.height,
                        F = o.$slide;
                    h.adjustCaption(o), k && (_ || M || o.contentType === "video") && !o.hasError && (u.fancybox.stop(k), u.fancybox.setTranslate(k, h.getFitPos(o)), o.pos === h.currPos && (h.isAnimating = !1, h.updateCursor())), h.adjustLayout(o), F.length && (F.trigger("refresh"), o.pos === h.currPos && h.$refs.toolbar.add(h.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", F.get(0).scrollHeight > F.get(0).clientHeight)), h.trigger("onUpdate", o, a)
                },
                centerSlide: function(o) {
                    var a = this,
                        h = a.current,
                        k = h.$slide;
                    !a.isClosing && h && (k.siblings().css({
                        transform: "",
                        opacity: ""
                    }), k.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), u.fancybox.animate(k, {
                        top: 0,
                        left: 0,
                        opacity: 1
                    }, o === void 0 ? 0 : o, function() {
                        k.css({
                            transform: "",
                            opacity: ""
                        }), h.isComplete || a.complete()
                    }, !1))
                },
                isMoved: function(o) {
                    var a, h, k = o || this.current;
                    return !!k && (h = u.fancybox.getTranslate(this.$refs.stage), a = u.fancybox.getTranslate(k.$slide), !k.$slide.hasClass("fancybox-animated") && (Math.abs(a.top - h.top) > .5 || Math.abs(a.left - h.left) > .5))
                },
                updateCursor: function(o, a) {
                    var h, k, _ = this,
                        M = _.current,
                        F = _.$refs.container;
                    M && !_.isClosing && _.Guestures && (F.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), h = _.canPan(o, a), k = !!h || _.isZoomable(), F.toggleClass("fancybox-is-zoomable", k), u("[data-fancybox-zoom]").prop("disabled", !k), h ? F.addClass("fancybox-can-pan") : k && (M.opts.clickContent === "zoom" || u.isFunction(M.opts.clickContent) && M.opts.clickContent(M) == "zoom") ? F.addClass("fancybox-can-zoomIn") : M.opts.touch && (M.opts.touch.vertical || _.group.length > 1) && M.contentType !== "video" && F.addClass("fancybox-can-swipe"))
                },
                isZoomable: function() {
                    var o, a = this,
                        h = a.current;
                    return !!(h && !a.isClosing && h.type === "image" && !h.hasError && (!h.isLoaded || (o = a.getFitPos(h)) && (h.width > o.width || h.height > o.height)))
                },
                isScaledDown: function(o, a) {
                    var h = this,
                        k = !1,
                        _ = h.current,
                        M = _.$content;
                    return o !== void 0 && a !== void 0 ? k = o < _.width && a < _.height : M && (k = u.fancybox.getTranslate(M), k = k.width < _.width && k.height < _.height), k
                },
                canPan: function(o, a) {
                    var h = this,
                        k = h.current,
                        _ = null,
                        M = !1;
                    return k.type === "image" && (k.isComplete || o && a) && !k.hasError && (M = h.getFitPos(k), o !== void 0 && a !== void 0 ? _ = {
                        width: o,
                        height: a
                    } : k.isComplete && (_ = u.fancybox.getTranslate(k.$content)), _ && M && (M = Math.abs(_.width - M.width) > 1.5 || Math.abs(_.height - M.height) > 1.5)), M
                },
                loadSlide: function(o) {
                    var a, h, k, _ = this;
                    if (!o.isLoading && !o.isLoaded) {
                        if (o.isLoading = !0, _.trigger("beforeLoad", o) === !1) return o.isLoading = !1, !1;
                        switch (a = o.type, h = o.$slide, h.off("refresh").trigger("onReset").addClass(o.opts.slideClass), a) {
                            case "image":
                                _.setImage(o);
                                break;
                            case "iframe":
                                _.setIframe(o);
                                break;
                            case "html":
                                _.setContent(o, o.src || o.content);
                                break;
                            case "video":
                                _.setContent(o, o.opts.video.tpl.replace(/\{\{src\}\}/gi, o.src).replace("{{format}}", o.opts.videoFormat || o.opts.video.format || "").replace("{{poster}}", o.thumb || ""));
                                break;
                            case "inline":
                                u(o.src).length ? _.setContent(o, u(o.src)) : _.setError(o);
                                break;
                            case "ajax":
                                _.showLoading(o), k = u.ajax(u.extend({}, o.opts.ajax.settings, {
                                    url: o.src,
                                    success: function(M, F) {
                                        F === "success" && _.setContent(o, M)
                                    },
                                    error: function(M, F) {
                                        M && F !== "abort" && _.setError(o)
                                    }
                                })), h.one("onReset", function() {
                                    k.abort()
                                });
                                break;
                            default:
                                _.setError(o)
                        }
                        return !0
                    }
                },
                setImage: function(o) {
                    var a, h = this;
                    setTimeout(function() {
                        var k = o.$image;
                        h.isClosing || !o.isLoading || k && k.length && k[0].complete || o.hasError || h.showLoading(o)
                    }, 50), h.checkSrcset(o), o.$content = u('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(o.$slide.addClass("fancybox-slide--image")), o.opts.preload !== !1 && o.opts.width && o.opts.height && o.thumb && (o.width = o.opts.width, o.height = o.opts.height, a = S.createElement("img"), a.onerror = function() {
                        u(this).remove(), o.$ghost = null
                    }, a.onload = function() {
                        h.afterLoad(o)
                    }, o.$ghost = u(a).addClass("fancybox-image").appendTo(o.$content).attr("src", o.thumb)), h.setBigImage(o)
                },
                checkSrcset: function(o) {
                    var a, h, k, _, M = o.opts.srcset || o.opts.image.srcset;
                    if (M) {
                        k = m.devicePixelRatio || 1, _ = m.innerWidth * k, h = M.split(",").map(function(W) {
                            var H = {};
                            return W.trim().split(/\s+/).forEach(function(G, R) {
                                var nt = parseInt(G.substring(0, G.length - 1), 10);
                                if (R === 0) return H.url = G;
                                nt && (H.value = nt, H.postfix = G[G.length - 1])
                            }), H
                        }), h.sort(function(W, H) {
                            return W.value - H.value
                        });
                        for (var F = 0; F < h.length; F++) {
                            var B = h[F];
                            if (B.postfix === "w" && B.value >= _ || B.postfix === "x" && B.value >= k) {
                                a = B;
                                break
                            }
                        }!a && h.length && (a = h[h.length - 1]), a && (o.src = a.url, o.width && o.height && a.postfix == "w" && (o.height = o.width / o.height * a.value, o.width = a.value), o.opts.srcset = M)
                    }
                },
                setBigImage: function(o) {
                    var a = this,
                        h = S.createElement("img"),
                        k = u(h);
                    o.$image = k.one("error", function() {
                        a.setError(o)
                    }).one("load", function() {
                        var _;
                        o.$ghost || (a.resolveImageSlideSize(o, this.naturalWidth, this.naturalHeight), a.afterLoad(o)), a.isClosing || (o.opts.srcset && (_ = o.opts.sizes, _ && _ !== "auto" || (_ = (o.width / o.height > 1 && l.width() / l.height() > 1 ? "100" : Math.round(o.width / o.height * 100)) + "vw"), k.attr("sizes", _).attr("srcset", o.opts.srcset)), o.$ghost && setTimeout(function() {
                            o.$ghost && !a.isClosing && o.$ghost.hide()
                        }, Math.min(300, Math.max(1e3, o.height / 1600))), a.hideLoading(o))
                    }).addClass("fancybox-image").attr("src", o.src).appendTo(o.$content), (h.complete || h.readyState == "complete") && k.naturalWidth && k.naturalHeight ? k.trigger("load") : h.error && k.trigger("error")
                },
                resolveImageSlideSize: function(o, a, h) {
                    var k = parseInt(o.opts.width, 10),
                        _ = parseInt(o.opts.height, 10);
                    o.width = a, o.height = h, k > 0 && (o.width = k, o.height = Math.floor(k * h / a)), _ > 0 && (o.width = Math.floor(_ * a / h), o.height = _)
                },
                setIframe: function(o) {
                    var a, h = this,
                        k = o.opts.iframe,
                        _ = o.$slide;
                    o.$content = u('<div class="fancybox-content' + (k.preload ? " fancybox-is-hidden" : "") + '"></div>').css(k.css).appendTo(_), _.addClass("fancybox-slide--" + o.contentType), o.$iframe = a = u(k.tpl.replace(/\{rnd\}/g, new Date().getTime())).attr(k.attr).appendTo(o.$content), k.preload ? (h.showLoading(o), a.on("load.fb error.fb", function(M) {
                        this.isReady = 1, o.$slide.trigger("refresh"), h.afterLoad(o)
                    }), _.on("refresh.fb", function() {
                        var M, F, B = o.$content,
                            W = k.css.width,
                            H = k.css.height;
                        if (a[0].isReady === 1) {
                            try {
                                M = a.contents(), F = M.find("body")
                            } catch (G) {}
                            F && F.length && F.children().length && (_.css("overflow", "visible"), B.css({
                                width: "100%",
                                "max-width": "100%",
                                height: "9999px"
                            }), W === void 0 && (W = Math.ceil(Math.max(F[0].clientWidth, F.outerWidth(!0)))), B.css("width", W || "").css("max-width", ""), H === void 0 && (H = Math.ceil(Math.max(F[0].clientHeight, F.outerHeight(!0)))), B.css("height", H || ""), _.css("overflow", "auto")), B.removeClass("fancybox-is-hidden")
                        }
                    })) : h.afterLoad(o), a.attr("src", o.src), _.one("onReset", function() {
                        try {
                            u(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                        } catch (M) {}
                        u(this).off("refresh.fb").empty(), o.isLoaded = !1, o.isRevealed = !1
                    })
                },
                setContent: function(o, a) {
                    var h = this;
                    h.isClosing || (h.hideLoading(o), o.$content && u.fancybox.stop(o.$content), o.$slide.empty(), I(a) && a.parent().length ? ((a.hasClass("fancybox-content") || a.parent().hasClass("fancybox-content")) && a.parents(".fancybox-slide").trigger("onReset"), o.$placeholder = u("<div>").hide().insertAfter(a), a.css("display", "inline-block")) : o.hasError || (u.type(a) === "string" && (a = u("<div>").append(u.trim(a)).contents()), o.opts.filter && (a = u("<div>").html(a).find(o.opts.filter))), o.$slide.one("onReset", function() {
                        u(this).find("video,audio").trigger("pause"), o.$placeholder && (o.$placeholder.after(a.removeClass("fancybox-content").hide()).remove(), o.$placeholder = null), o.$smallBtn && (o.$smallBtn.remove(), o.$smallBtn = null), o.hasError || (u(this).empty(), o.isLoaded = !1, o.isRevealed = !1)
                    }), u(a).appendTo(o.$slide), u(a).is("video,audio") && (u(a).addClass("fancybox-video"), u(a).wrap("<div></div>"), o.contentType = "video", o.opts.width = o.opts.width || u(a).attr("width"), o.opts.height = o.opts.height || u(a).attr("height")), o.$content = o.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), o.$content.siblings().hide(), o.$content.length || (o.$content = o.$slide.wrapInner("<div></div>").children().first()), o.$content.addClass("fancybox-content"), o.$slide.addClass("fancybox-slide--" + o.contentType), h.afterLoad(o))
                },
                setError: function(o) {
                    o.hasError = !0, o.$slide.trigger("onReset").removeClass("fancybox-slide--" + o.contentType).addClass("fancybox-slide--error"), o.contentType = "html", this.setContent(o, this.translate(o, o.opts.errorTpl)), o.pos === this.currPos && (this.isAnimating = !1)
                },
                showLoading: function(o) {
                    var a = this;
                    (o = o || a.current) && !o.$spinner && (o.$spinner = u(a.translate(a, a.opts.spinnerTpl)).appendTo(o.$slide).hide().fadeIn("fast"))
                },
                hideLoading: function(o) {
                    var a = this;
                    (o = o || a.current) && o.$spinner && (o.$spinner.stop().remove(), delete o.$spinner)
                },
                afterLoad: function(o) {
                    var a = this;
                    a.isClosing || (o.isLoading = !1, o.isLoaded = !0, a.trigger("afterLoad", o), a.hideLoading(o), !o.opts.smallBtn || o.$smallBtn && o.$smallBtn.length || (o.$smallBtn = u(a.translate(o, o.opts.btnTpl.smallBtn)).appendTo(o.$content)), o.opts.protect && o.$content && !o.hasError && (o.$content.on("contextmenu.fb", function(h) {
                        return h.button == 2 && h.preventDefault(), !0
                    }), o.type === "image" && u('<div class="fancybox-spaceball"></div>').appendTo(o.$content)), a.adjustCaption(o), a.adjustLayout(o), o.pos === a.currPos && a.updateCursor(), a.revealContent(o))
                },
                adjustCaption: function(o) {
                    var a, h = this,
                        k = o || h.current,
                        _ = k.opts.caption,
                        M = k.opts.preventCaptionOverlap,
                        F = h.$refs.caption,
                        B = !1;
                    F.toggleClass("fancybox-caption--separate", M), M && _ && _.length && (k.pos !== h.currPos ? (a = F.clone().appendTo(F.parent()), a.children().eq(0).empty().html(_), B = a.outerHeight(!0), a.empty().remove()) : h.$caption && (B = h.$caption.outerHeight(!0)), k.$slide.css("padding-bottom", B || ""))
                },
                adjustLayout: function(o) {
                    var a, h, k, _, M = this,
                        F = o || M.current;
                    F.isLoaded && F.opts.disableLayoutFix !== !0 && (F.$content.css("margin-bottom", ""), F.$content.outerHeight() > F.$slide.height() + .5 && (k = F.$slide[0].style["padding-bottom"], _ = F.$slide.css("padding-bottom"), parseFloat(_) > 0 && (a = F.$slide[0].scrollHeight, F.$slide.css("padding-bottom", 0), Math.abs(a - F.$slide[0].scrollHeight) < 1 && (h = _), F.$slide.css("padding-bottom", k))), F.$content.css("margin-bottom", h))
                },
                revealContent: function(o) {
                    var a, h, k, _, M = this,
                        F = o.$slide,
                        B = !1,
                        W = !1,
                        H = M.isMoved(o),
                        G = o.isRevealed;
                    return o.isRevealed = !0, a = o.opts[M.firstRun ? "animationEffect" : "transitionEffect"], k = o.opts[M.firstRun ? "animationDuration" : "transitionDuration"], k = parseInt(o.forcedDuration === void 0 ? k : o.forcedDuration, 10), !H && o.pos === M.currPos && k || (a = !1), a === "zoom" && (o.pos === M.currPos && k && o.type === "image" && !o.hasError && (W = M.getThumbPos(o)) ? B = M.getFitPos(o) : a = "fade"), a === "zoom" ? (M.isAnimating = !0, B.scaleX = B.width / W.width, B.scaleY = B.height / W.height, _ = o.opts.zoomOpacity, _ == "auto" && (_ = Math.abs(o.width / o.height - W.width / W.height) > .1), _ && (W.opacity = .1, B.opacity = 1), u.fancybox.setTranslate(o.$content.removeClass("fancybox-is-hidden"), W), C(o.$content), void u.fancybox.animate(o.$content, B, k, function() {
                        M.isAnimating = !1, M.complete()
                    })) : (M.updateSlide(o), a ? (u.fancybox.stop(F), h = "fancybox-slide--" + (o.pos >= M.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + a, F.addClass(h).removeClass("fancybox-slide--current"), o.$content.removeClass("fancybox-is-hidden"), C(F), o.type !== "image" && o.$content.hide().show(0), void u.fancybox.animate(F, "fancybox-slide--current", k, function() {
                        F.removeClass(h).css({
                            transform: "",
                            opacity: ""
                        }), o.pos === M.currPos && M.complete()
                    }, !0)) : (o.$content.removeClass("fancybox-is-hidden"), G || !H || o.type !== "image" || o.hasError || o.$content.hide().fadeIn("fast"), void(o.pos === M.currPos && M.complete())))
                },
                getThumbPos: function(o) {
                    var a, h, k, _, M, F = !1,
                        B = o.$thumb;
                    return !(!B || !P(B[0])) && (a = u.fancybox.getTranslate(B), h = parseFloat(B.css("border-top-width") || 0), k = parseFloat(B.css("border-right-width") || 0), _ = parseFloat(B.css("border-bottom-width") || 0), M = parseFloat(B.css("border-left-width") || 0), F = {
                        top: a.top + h,
                        left: a.left + M,
                        width: a.width - k - M,
                        height: a.height - h - _,
                        scaleX: 1,
                        scaleY: 1
                    }, a.width > 0 && a.height > 0 && F)
                },
                complete: function() {
                    var o, a = this,
                        h = a.current,
                        k = {};
                    !a.isMoved() && h.isLoaded && (h.isComplete || (h.isComplete = !0, h.$slide.siblings().trigger("onReset"), a.preload("inline"), C(h.$slide), h.$slide.addClass("fancybox-slide--complete"), u.each(a.slides, function(_, M) {
                        M.pos >= a.currPos - 1 && M.pos <= a.currPos + 1 ? k[M.pos] = M : M && (u.fancybox.stop(M.$slide), M.$slide.off().remove())
                    }), a.slides = k), a.isAnimating = !1, a.updateCursor(), a.trigger("afterShow"), h.opts.video.autoStart && h.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function() {
                        this.webkitExitFullscreen && this.webkitExitFullscreen(), a.next()
                    }), h.opts.autoFocus && h.contentType === "html" && (o = h.$content.find("input[autofocus]:enabled:visible:first"), o.length ? o.trigger("focus") : a.focus(null, !0)), h.$slide.scrollTop(0).scrollLeft(0))
                },
                preload: function(o) {
                    var a, h, k = this;
                    k.group.length < 2 || (h = k.slides[k.currPos + 1], a = k.slides[k.currPos - 1], a && a.type === o && k.loadSlide(a), h && h.type === o && k.loadSlide(h))
                },
                focus: function(o, a) {
                    var h, k, _ = this,
                        M = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                    _.isClosing || (h = !o && _.current && _.current.isComplete ? _.current.$slide.find("*:visible" + (a ? ":not(.fancybox-close-small)" : "")) : _.$refs.container.find("*:visible"), h = h.filter(M).filter(function() {
                        return u(this).css("visibility") !== "hidden" && !u(this).hasClass("disabled")
                    }), h.length ? (k = h.index(S.activeElement), o && o.shiftKey ? (k < 0 || k == 0) && (o.preventDefault(), h.eq(h.length - 1).trigger("focus")) : (k < 0 || k == h.length - 1) && (o && o.preventDefault(), h.eq(0).trigger("focus"))) : _.$refs.container.trigger("focus"))
                },
                activate: function() {
                    var o = this;
                    u(".fancybox-container").each(function() {
                        var a = u(this).data("FancyBox");
                        a && a.id !== o.id && !a.isClosing && (a.trigger("onDeactivate"), a.removeEvents(), a.isVisible = !1)
                    }), o.isVisible = !0, (o.current || o.isIdle) && (o.update(), o.updateControls()), o.trigger("onActivate"), o.addEvents()
                },
                close: function(o, a) {
                    var h, k, _, M, F, B, W, H = this,
                        G = H.current,
                        R = function() {
                            H.cleanUp(o)
                        };
                    return !H.isClosing && (H.isClosing = !0, H.trigger("beforeClose", o) === !1 ? (H.isClosing = !1, D(function() {
                        H.update()
                    }), !1) : (H.removeEvents(), _ = G.$content, h = G.opts.animationEffect, k = u.isNumeric(a) ? a : h ? G.opts.animationDuration : 0, G.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), o !== !0 ? u.fancybox.stop(G.$slide) : h = !1, G.$slide.siblings().trigger("onReset").remove(), k && H.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", k + "ms"), H.hideLoading(G), H.hideControls(!0), H.updateCursor(), h !== "zoom" || _ && k && G.type === "image" && !H.isMoved() && !G.hasError && (W = H.getThumbPos(G)) || (h = "fade"), h === "zoom" ? (u.fancybox.stop(_), M = u.fancybox.getTranslate(_), B = {
                        top: M.top,
                        left: M.left,
                        scaleX: M.width / W.width,
                        scaleY: M.height / W.height,
                        width: W.width,
                        height: W.height
                    }, F = G.opts.zoomOpacity, F == "auto" && (F = Math.abs(G.width / G.height - W.width / W.height) > .1), F && (W.opacity = 0), u.fancybox.setTranslate(_, B), C(_), u.fancybox.animate(_, W, k, R), !0) : (h && k ? u.fancybox.animate(G.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + h, k, R) : o === !0 ? setTimeout(R, k) : R(), !0)))
                },
                cleanUp: function(o) {
                    var a, h, k, _ = this,
                        M = _.current.opts.$orig;
                    _.current.$slide.trigger("onReset"), _.$refs.container.empty().remove(), _.trigger("afterClose", o), _.current.opts.backFocus && (M && M.length && M.is(":visible") || (M = _.$trigger), M && M.length && (h = m.scrollX, k = m.scrollY, M.trigger("focus"), u("html, body").scrollTop(k).scrollLeft(h))), _.current = null, a = u.fancybox.getInstance(), a ? a.activate() : (u("body").removeClass("fancybox-active compensate-for-scrollbar"), u("#fancybox-style-noscroll").remove())
                },
                trigger: function(o, a) {
                    var h, k = Array.prototype.slice.call(arguments, 1),
                        _ = this,
                        M = a && a.opts ? a : _.current;
                    if (M ? k.unshift(M) : M = _, k.unshift(_), u.isFunction(M.opts[o]) && (h = M.opts[o].apply(M, k)), h === !1) return h;
                    o !== "afterClose" && _.$refs ? _.$refs.container.trigger(o + ".fb", k) : g.trigger(o + ".fb", k)
                },
                updateControls: function() {
                    var o = this,
                        a = o.current,
                        h = a.index,
                        k = o.$refs.container,
                        _ = o.$refs.caption,
                        M = a.opts.caption;
                    a.$slide.trigger("refresh"), M && M.length ? (o.$caption = _, _.children().eq(0).html(M)) : o.$caption = null, o.hasHiddenControls || o.isIdle || o.showControls(), k.find("[data-fancybox-count]").html(o.group.length), k.find("[data-fancybox-index]").html(h + 1), k.find("[data-fancybox-prev]").prop("disabled", !a.opts.loop && h <= 0), k.find("[data-fancybox-next]").prop("disabled", !a.opts.loop && h >= o.group.length - 1), a.type === "image" ? k.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", a.opts.image.src || a.src).show() : a.opts.toolbar && k.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), u(S.activeElement).is(":hidden,[disabled]") && o.$refs.container.trigger("focus")
                },
                hideControls: function(o) {
                    var a = this,
                        h = ["infobar", "toolbar", "nav"];
                    !o && a.current.opts.preventCaptionOverlap || h.push("caption"), this.$refs.container.removeClass(h.map(function(k) {
                        return "fancybox-show-" + k
                    }).join(" ")), this.hasHiddenControls = !0
                },
                showControls: function() {
                    var o = this,
                        a = o.current ? o.current.opts : o.opts,
                        h = o.$refs.container;
                    o.hasHiddenControls = !1, o.idleSecondsCounter = 0, h.toggleClass("fancybox-show-toolbar", !(!a.toolbar || !a.buttons)).toggleClass("fancybox-show-infobar", !!(a.infobar && o.group.length > 1)).toggleClass("fancybox-show-caption", !!o.$caption).toggleClass("fancybox-show-nav", !!(a.arrows && o.group.length > 1)).toggleClass("fancybox-is-modal", !!a.modal)
                },
                toggleControls: function() {
                    this.hasHiddenControls ? this.showControls() : this.hideControls()
                }
            }), u.fancybox = {
                version: "3.5.6",
                defaults: d,
                getInstance: function(o) {
                    var a = u('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                        h = Array.prototype.slice.call(arguments, 1);
                    return a instanceof E && (u.type(o) === "string" ? a[o].apply(a, h) : u.type(o) === "function" && o.apply(a, h), a)
                },
                open: function(o, a, h) {
                    return new E(o, a, h)
                },
                close: function(o) {
                    var a = this.getInstance();
                    a && (a.close(), o === !0 && this.close(o))
                },
                destroy: function() {
                    this.close(!0), g.add("body").off("click.fb-start", "**")
                },
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                use3d: function() {
                    var o = S.createElement("div");
                    return m.getComputedStyle && m.getComputedStyle(o) && m.getComputedStyle(o).getPropertyValue("transform") && !(S.documentMode && S.documentMode < 11)
                }(),
                getTranslate: function(o) {
                    var a;
                    return !(!o || !o.length) && (a = o[0].getBoundingClientRect(), {
                        top: a.top || 0,
                        left: a.left || 0,
                        width: a.width,
                        height: a.height,
                        opacity: parseFloat(o.css("opacity"))
                    })
                },
                setTranslate: function(o, a) {
                    var h = "",
                        k = {};
                    if (o && a) return a.left === void 0 && a.top === void 0 || (h = (a.left === void 0 ? o.position().left : a.left) + "px, " + (a.top === void 0 ? o.position().top : a.top) + "px", h = this.use3d ? "translate3d(" + h + ", 0px)" : "translate(" + h + ")"), a.scaleX !== void 0 && a.scaleY !== void 0 ? h += " scale(" + a.scaleX + ", " + a.scaleY + ")" : a.scaleX !== void 0 && (h += " scaleX(" + a.scaleX + ")"), h.length && (k.transform = h), a.opacity !== void 0 && (k.opacity = a.opacity), a.width !== void 0 && (k.width = a.width), a.height !== void 0 && (k.height = a.height), o.css(k)
                },
                animate: function(o, a, h, k, _) {
                    var M, F = this;
                    u.isFunction(h) && (k = h, h = null), F.stop(o), M = F.getTranslate(o), o.on(b, function(B) {
                        (!B || !B.originalEvent || o.is(B.originalEvent.target) && B.originalEvent.propertyName != "z-index") && (F.stop(o), u.isNumeric(h) && o.css("transition-duration", ""), u.isPlainObject(a) ? a.scaleX !== void 0 && a.scaleY !== void 0 && F.setTranslate(o, {
                            top: a.top,
                            left: a.left,
                            width: M.width * a.scaleX,
                            height: M.height * a.scaleY,
                            scaleX: 1,
                            scaleY: 1
                        }) : _ !== !0 && o.removeClass(a), u.isFunction(k) && k(B))
                    }), u.isNumeric(h) && o.css("transition-duration", h + "ms"), u.isPlainObject(a) ? (a.scaleX !== void 0 && a.scaleY !== void 0 && (delete a.width, delete a.height, o.parent().hasClass("fancybox-slide--image") && o.parent().addClass("fancybox-is-scaling")), u.fancybox.setTranslate(o, a)) : o.addClass(a), o.data("timer", setTimeout(function() {
                        o.trigger(b)
                    }, h + 33))
                },
                stop: function(o, a) {
                    o && o.length && (clearTimeout(o.data("timer")), a && o.trigger(b), o.off(b).css("transition-duration", ""), o.parent().removeClass("fancybox-is-scaling"))
                }
            }, u.fn.fancybox = function(o) {
                var a;
                return o = o || {}, a = o.selector || !1, a ? u("body").off("click.fb-start", a).on("click.fb-start", a, {
                    options: o
                }, c) : this.off("click.fb-start").on("click.fb-start", {
                    items: this,
                    options: o
                }, c), this
            }, g.on("click.fb-start", "[data-fancybox]", c), g.on("click.fb-start", "[data-fancybox-trigger]", function(o) {
                u('[data-fancybox="' + u(this).attr("data-fancybox-trigger") + '"]').eq(u(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
                    $trigger: u(this)
                })
            }),
            function() {
                var o = null;
                g.on("mousedown mouseup focus blur", ".fancybox-button", function(a) {
                    switch (a.type) {
                        case "mousedown":
                            o = u(this);
                            break;
                        case "mouseup":
                            o = null;
                            break;
                        case "focusin":
                            u(".fancybox-button").removeClass("fancybox-focus"), u(this).is(o) || u(this).is("[disabled]") || u(this).addClass("fancybox-focus");
                            break;
                        case "focusout":
                            u(".fancybox-button").removeClass("fancybox-focus")
                    }
                })
            }()
    }
}(window, document, jQuery),
function(m) {
    "use strict";
    var S = {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "transparent",
                    enablejsapi: 1,
                    html5: 1
                },
                paramPlace: 8,
                type: "iframe",
                url: "https://www.youtube-nocookie.com/embed/$4",
                thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
            },
            vimeo: {
                matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                paramPlace: 3,
                type: "iframe",
                url: "//player.vimeo.com/video/$2"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            gmap_place: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                type: "iframe",
                url: function(c) {
                    return "//maps.google." + c[2] + "/?ll=" + (c[9] ? c[9] + "&z=" + Math.floor(c[10]) + (c[12] ? c[12].replace(/^\//, "&") : "") : c[12] + "").replace(/\?/, "&") + "&output=" + (c[12] && c[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                }
            },
            gmap_search: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                type: "iframe",
                url: function(c) {
                    return "//maps.google." + c[2] + "/maps?q=" + c[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
                }
            }
        },
        u = function(c, d, l) {
            if (c) return l = l || "", m.type(l) === "object" && (l = m.param(l, !0)), m.each(d, function(g, T) {
                c = c.replace("$" + g, T || "")
            }), l.length && (c += (c.indexOf("?") > 0 ? "&" : "?") + l), c
        };
    m(document).on("objectNeedsType.fb", function(c, d, l) {
        var g, T, I, D, y, b, C, O = l.src || "",
            P = !1;
        g = m.extend(!0, {}, S, l.opts.media), m.each(g, function(E, o) {
            if (I = O.match(o.matcher)) {
                if (P = o.type, C = E, b = {}, o.paramPlace && I[o.paramPlace]) {
                    y = I[o.paramPlace], y[0] == "?" && (y = y.substring(1)), y = y.split("&");
                    for (var a = 0; a < y.length; ++a) {
                        var h = y[a].split("=", 2);
                        h.length == 2 && (b[h[0]] = decodeURIComponent(h[1].replace(/\+/g, " ")))
                    }
                }
                return D = m.extend(!0, {}, o.params, l.opts[E], b), O = m.type(o.url) === "function" ? o.url.call(this, I, D, l) : u(o.url, I, D), T = m.type(o.thumb) === "function" ? o.thumb.call(this, I, D, l) : u(o.thumb, I), E === "youtube" ? O = O.replace(/&t=((\d+)m)?(\d+)s/, function(k, _, M, F) {
                    return "&start=" + ((M ? 60 * parseInt(M, 10) : 0) + parseInt(F, 10))
                }) : E === "vimeo" && (O = O.replace("&%23", "#")), !1
            }
        }), P ? (l.opts.thumb || l.opts.$thumb && l.opts.$thumb.length || (l.opts.thumb = T), P === "iframe" && (l.opts = m.extend(!0, l.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        })), m.extend(l, {
            type: P,
            src: O,
            origSrc: l.src,
            contentSource: C,
            contentType: P === "image" ? "image" : C == "gmap_place" || C == "gmap_search" ? "map" : "video"
        })) : O && (l.type = l.opts.defaultType)
    });
    var v = {
        youtube: {
            src: "https://www.youtube.com/iframe_api",
            class: "YT",
            loading: !1,
            loaded: !1
        },
        vimeo: {
            src: "https://player.vimeo.com/api/player.js",
            class: "Vimeo",
            loading: !1,
            loaded: !1
        },
        load: function(c) {
            var d, l = this;
            if (this[c].loaded) return void setTimeout(function() {
                l.done(c)
            });
            this[c].loading || (this[c].loading = !0, d = document.createElement("script"), d.type = "text/javascript", d.src = this[c].src, c === "youtube" ? window.onYouTubeIframeAPIReady = function() {
                l[c].loaded = !0, l.done(c)
            } : d.onload = function() {
                l[c].loaded = !0, l.done(c)
            }, document.body.appendChild(d))
        },
        done: function(c) {
            var d, l, g;
            c === "youtube" && delete window.onYouTubeIframeAPIReady, (d = m.fancybox.getInstance()) && (l = d.current.$content.find("iframe"), c === "youtube" && YT !== void 0 && YT ? g = new YT.Player(l.attr("id"), {
                events: {
                    onStateChange: function(T) {
                        T.data == 0 && d.next()
                    }
                }
            }) : c === "vimeo" && Vimeo !== void 0 && Vimeo && (g = new Vimeo.Player(l), g.on("ended", function() {
                d.next()
            })))
        }
    };
    m(document).on({
        "afterShow.fb": function(c, d, l) {
            d.group.length > 1 && (l.contentSource === "youtube" || l.contentSource === "vimeo") && v.load(l.contentSource)
        }
    })
}(jQuery),
function(m, S, u) {
    "use strict";
    var v = function() {
            return m.requestAnimationFrame || m.webkitRequestAnimationFrame || m.mozRequestAnimationFrame || m.oRequestAnimationFrame || function(y) {
                return m.setTimeout(y, 1e3 / 60)
            }
        }(),
        c = function() {
            return m.cancelAnimationFrame || m.webkitCancelAnimationFrame || m.mozCancelAnimationFrame || m.oCancelAnimationFrame || function(y) {
                m.clearTimeout(y)
            }
        }(),
        d = function(y) {
            var b = [];
            y = y.originalEvent || y || m.e, y = y.touches && y.touches.length ? y.touches : y.changedTouches && y.changedTouches.length ? y.changedTouches : [y];
            for (var C in y) y[C].pageX ? b.push({
                x: y[C].pageX,
                y: y[C].pageY
            }) : y[C].clientX && b.push({
                x: y[C].clientX,
                y: y[C].clientY
            });
            return b
        },
        l = function(y, b, C) {
            return b && y ? C === "x" ? y.x - b.x : C === "y" ? y.y - b.y : Math.sqrt(Math.pow(y.x - b.x, 2) + Math.pow(y.y - b.y, 2)) : 0
        },
        g = function(y) {
            if (y.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || u.isFunction(y.get(0).onclick) || y.data("selectable")) return !0;
            for (var b = 0, C = y[0].attributes, O = C.length; b < O; b++)
                if (C[b].nodeName.substr(0, 14) === "data-fancybox-") return !0;
            return !1
        },
        T = function(y) {
            var b = m.getComputedStyle(y)["overflow-y"],
                C = m.getComputedStyle(y)["overflow-x"],
                O = (b === "scroll" || b === "auto") && y.scrollHeight > y.clientHeight,
                P = (C === "scroll" || C === "auto") && y.scrollWidth > y.clientWidth;
            return O || P
        },
        I = function(y) {
            for (var b = !1; !((b = T(y.get(0))) || (y = y.parent(), !y.length || y.hasClass("fancybox-stage") || y.is("body"))););
            return b
        },
        D = function(y) {
            var b = this;
            b.instance = y, b.$bg = y.$refs.bg, b.$stage = y.$refs.stage, b.$container = y.$refs.container, b.destroy(), b.$container.on("touchstart.fb.touch mousedown.fb.touch", u.proxy(b, "ontouchstart"))
        };
    D.prototype.destroy = function() {
        var y = this;
        y.$container.off(".fb.touch"), u(S).off(".fb.touch"), y.requestId && (c(y.requestId), y.requestId = null), y.tapped && (clearTimeout(y.tapped), y.tapped = null)
    }, D.prototype.ontouchstart = function(y) {
        var b = this,
            C = u(y.target),
            O = b.instance,
            P = O.current,
            E = P.$slide,
            o = P.$content,
            a = y.type == "touchstart";
        if (a && b.$container.off("mousedown.fb.touch"), (!y.originalEvent || y.originalEvent.button != 2) && E.length && C.length && !g(C) && !g(C.parent()) && (C.is("img") || !(y.originalEvent.clientX > C[0].clientWidth + C.offset().left))) {
            if (!P || O.isAnimating || P.$slide.hasClass("fancybox-animated")) return y.stopPropagation(), void y.preventDefault();
            b.realPoints = b.startPoints = d(y), b.startPoints.length && (P.touch && y.stopPropagation(), b.startEvent = y, b.canTap = !0, b.$target = C, b.$content = o, b.opts = P.opts.touch, b.isPanning = !1, b.isSwiping = !1, b.isZooming = !1, b.isScrolling = !1, b.canPan = O.canPan(), b.startTime = new Date().getTime(), b.distanceX = b.distanceY = b.distance = 0, b.canvasWidth = Math.round(E[0].clientWidth), b.canvasHeight = Math.round(E[0].clientHeight), b.contentLastPos = null, b.contentStartPos = u.fancybox.getTranslate(b.$content) || {
                top: 0,
                left: 0
            }, b.sliderStartPos = u.fancybox.getTranslate(E), b.stagePos = u.fancybox.getTranslate(O.$refs.stage), b.sliderStartPos.top -= b.stagePos.top, b.sliderStartPos.left -= b.stagePos.left, b.contentStartPos.top -= b.stagePos.top, b.contentStartPos.left -= b.stagePos.left, u(S).off(".fb.touch").on(a ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", u.proxy(b, "ontouchend")).on(a ? "touchmove.fb.touch" : "mousemove.fb.touch", u.proxy(b, "ontouchmove")), u.fancybox.isMobile && S.addEventListener("scroll", b.onscroll, !0), ((b.opts || b.canPan) && (C.is(b.$stage) || b.$stage.find(C).length) || (C.is(".fancybox-image") && y.preventDefault(), u.fancybox.isMobile && C.parents(".fancybox-caption").length)) && (b.isScrollable = I(C) || I(C.parent()), u.fancybox.isMobile && b.isScrollable || y.preventDefault(), (b.startPoints.length === 1 || P.hasError) && (b.canPan ? (u.fancybox.stop(b.$content), b.isPanning = !0) : b.isSwiping = !0, b.$container.addClass("fancybox-is-grabbing")), b.startPoints.length === 2 && P.type === "image" && (P.isLoaded || P.$ghost) && (b.canTap = !1, b.isSwiping = !1, b.isPanning = !1, b.isZooming = !0, u.fancybox.stop(b.$content), b.centerPointStartX = .5 * (b.startPoints[0].x + b.startPoints[1].x) - u(m).scrollLeft(), b.centerPointStartY = .5 * (b.startPoints[0].y + b.startPoints[1].y) - u(m).scrollTop(), b.percentageOfImageAtPinchPointX = (b.centerPointStartX - b.contentStartPos.left) / b.contentStartPos.width, b.percentageOfImageAtPinchPointY = (b.centerPointStartY - b.contentStartPos.top) / b.contentStartPos.height, b.startDistanceBetweenFingers = l(b.startPoints[0], b.startPoints[1]))))
        }
    }, D.prototype.onscroll = function(y) {
        var b = this;
        b.isScrolling = !0, S.removeEventListener("scroll", b.onscroll, !0)
    }, D.prototype.ontouchmove = function(y) {
        var b = this;
        return y.originalEvent.buttons !== void 0 && y.originalEvent.buttons === 0 ? void b.ontouchend(y) : b.isScrolling ? void(b.canTap = !1) : (b.newPoints = d(y), void((b.opts || b.canPan) && b.newPoints.length && b.newPoints.length && (b.isSwiping && b.isSwiping === !0 || y.preventDefault(), b.distanceX = l(b.newPoints[0], b.startPoints[0], "x"), b.distanceY = l(b.newPoints[0], b.startPoints[0], "y"), b.distance = l(b.newPoints[0], b.startPoints[0]), b.distance > 0 && (b.isSwiping ? b.onSwipe(y) : b.isPanning ? b.onPan() : b.isZooming && b.onZoom()))))
    }, D.prototype.onSwipe = function(y) {
        var b, C = this,
            O = C.instance,
            P = C.isSwiping,
            E = C.sliderStartPos.left || 0;
        if (P !== !0) P == "x" && (C.distanceX > 0 && (C.instance.group.length < 2 || C.instance.current.index === 0 && !C.instance.current.opts.loop) ? E += Math.pow(C.distanceX, .8) : C.distanceX < 0 && (C.instance.group.length < 2 || C.instance.current.index === C.instance.group.length - 1 && !C.instance.current.opts.loop) ? E -= Math.pow(-C.distanceX, .8) : E += C.distanceX), C.sliderLastPos = {
            top: P == "x" ? 0 : C.sliderStartPos.top + C.distanceY,
            left: E
        }, C.requestId && (c(C.requestId), C.requestId = null), C.requestId = v(function() {
            C.sliderLastPos && (u.each(C.instance.slides, function(o, a) {
                var h = a.pos - C.instance.currPos;
                u.fancybox.setTranslate(a.$slide, {
                    top: C.sliderLastPos.top,
                    left: C.sliderLastPos.left + h * C.canvasWidth + h * a.opts.gutter
                })
            }), C.$container.addClass("fancybox-is-sliding"))
        });
        else if (Math.abs(C.distance) > 10) {
            if (C.canTap = !1, O.group.length < 2 && C.opts.vertical ? C.isSwiping = "y" : O.isDragging || C.opts.vertical === !1 || C.opts.vertical === "auto" && u(m).width() > 800 ? C.isSwiping = "x" : (b = Math.abs(180 * Math.atan2(C.distanceY, C.distanceX) / Math.PI), C.isSwiping = b > 45 && b < 135 ? "y" : "x"), C.isSwiping === "y" && u.fancybox.isMobile && C.isScrollable) return void(C.isScrolling = !0);
            O.isDragging = C.isSwiping, C.startPoints = C.newPoints, u.each(O.slides, function(o, a) {
                var h, k;
                u.fancybox.stop(a.$slide), h = u.fancybox.getTranslate(a.$slide), k = u.fancybox.getTranslate(O.$refs.stage), a.$slide.css({
                    transform: "",
                    opacity: "",
                    "transition-duration": ""
                }).removeClass("fancybox-animated").removeClass(function(_, M) {
                    return (M.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                }), a.pos === O.current.pos && (C.sliderStartPos.top = h.top - k.top, C.sliderStartPos.left = h.left - k.left), u.fancybox.setTranslate(a.$slide, {
                    top: h.top - k.top,
                    left: h.left - k.left
                })
            }), O.SlideShow && O.SlideShow.isActive && O.SlideShow.stop()
        }
    }, D.prototype.onPan = function() {
        var y = this;
        if (l(y.newPoints[0], y.realPoints[0]) < (u.fancybox.isMobile ? 10 : 5)) return void(y.startPoints = y.newPoints);
        y.canTap = !1, y.contentLastPos = y.limitMovement(), y.requestId && c(y.requestId), y.requestId = v(function() {
            u.fancybox.setTranslate(y.$content, y.contentLastPos)
        })
    }, D.prototype.limitMovement = function() {
        var y, b, C, O, P, E, o = this,
            a = o.canvasWidth,
            h = o.canvasHeight,
            k = o.distanceX,
            _ = o.distanceY,
            M = o.contentStartPos,
            F = M.left,
            B = M.top,
            W = M.width,
            H = M.height;
        return P = W > a ? F + k : F, E = B + _, y = Math.max(0, .5 * a - .5 * W), b = Math.max(0, .5 * h - .5 * H), C = Math.min(a - W, .5 * a - .5 * W), O = Math.min(h - H, .5 * h - .5 * H), k > 0 && P > y && (P = y - 1 + Math.pow(-y + F + k, .8) || 0), k < 0 && P < C && (P = C + 1 - Math.pow(C - F - k, .8) || 0), _ > 0 && E > b && (E = b - 1 + Math.pow(-b + B + _, .8) || 0), _ < 0 && E < O && (E = O + 1 - Math.pow(O - B - _, .8) || 0), {
            top: E,
            left: P
        }
    }, D.prototype.limitPosition = function(y, b, C, O) {
        var P = this,
            E = P.canvasWidth,
            o = P.canvasHeight;
        return C > E ? (y = y > 0 ? 0 : y, y = y < E - C ? E - C : y) : y = Math.max(0, E / 2 - C / 2), O > o ? (b = b > 0 ? 0 : b, b = b < o - O ? o - O : b) : b = Math.max(0, o / 2 - O / 2), {
            top: b,
            left: y
        }
    }, D.prototype.onZoom = function() {
        var y = this,
            b = y.contentStartPos,
            C = b.width,
            O = b.height,
            P = b.left,
            E = b.top,
            o = l(y.newPoints[0], y.newPoints[1]),
            a = o / y.startDistanceBetweenFingers,
            h = Math.floor(C * a),
            k = Math.floor(O * a),
            _ = (C - h) * y.percentageOfImageAtPinchPointX,
            M = (O - k) * y.percentageOfImageAtPinchPointY,
            F = (y.newPoints[0].x + y.newPoints[1].x) / 2 - u(m).scrollLeft(),
            B = (y.newPoints[0].y + y.newPoints[1].y) / 2 - u(m).scrollTop(),
            W = F - y.centerPointStartX,
            H = B - y.centerPointStartY,
            G = P + (_ + W),
            R = E + (M + H),
            nt = {
                top: R,
                left: G,
                scaleX: a,
                scaleY: a
            };
        y.canTap = !1, y.newWidth = h, y.newHeight = k, y.contentLastPos = nt, y.requestId && c(y.requestId), y.requestId = v(function() {
            u.fancybox.setTranslate(y.$content, y.contentLastPos)
        })
    }, D.prototype.ontouchend = function(y) {
        var b = this,
            C = b.isSwiping,
            O = b.isPanning,
            P = b.isZooming,
            E = b.isScrolling;
        if (b.endPoints = d(y), b.dMs = Math.max(new Date().getTime() - b.startTime, 1), b.$container.removeClass("fancybox-is-grabbing"), u(S).off(".fb.touch"), S.removeEventListener("scroll", b.onscroll, !0), b.requestId && (c(b.requestId), b.requestId = null), b.isSwiping = !1, b.isPanning = !1, b.isZooming = !1, b.isScrolling = !1, b.instance.isDragging = !1, b.canTap) return b.onTap(y);
        b.speed = 100, b.velocityX = b.distanceX / b.dMs * .5, b.velocityY = b.distanceY / b.dMs * .5, O ? b.endPanning() : P ? b.endZooming() : b.endSwiping(C, E)
    }, D.prototype.endSwiping = function(y, b) {
        var C = this,
            O = !1,
            P = C.instance.group.length,
            E = Math.abs(C.distanceX),
            o = y == "x" && P > 1 && (C.dMs > 130 && E > 10 || E > 50);
        C.sliderLastPos = null, y == "y" && !b && Math.abs(C.distanceY) > 50 ? (u.fancybox.animate(C.instance.current.$slide, {
            top: C.sliderStartPos.top + C.distanceY + 150 * C.velocityY,
            opacity: 0
        }, 200), O = C.instance.close(!0, 250)) : o && C.distanceX > 0 ? O = C.instance.previous(300) : o && C.distanceX < 0 && (O = C.instance.next(300)), O !== !1 || y != "x" && y != "y" || C.instance.centerSlide(200), C.$container.removeClass("fancybox-is-sliding")
    }, D.prototype.endPanning = function() {
        var y, b, C, O = this;
        O.contentLastPos && (O.opts.momentum === !1 || O.dMs > 350 ? (y = O.contentLastPos.left, b = O.contentLastPos.top) : (y = O.contentLastPos.left + 500 * O.velocityX, b = O.contentLastPos.top + 500 * O.velocityY), C = O.limitPosition(y, b, O.contentStartPos.width, O.contentStartPos.height), C.width = O.contentStartPos.width, C.height = O.contentStartPos.height, u.fancybox.animate(O.$content, C, 366))
    }, D.prototype.endZooming = function() {
        var y, b, C, O, P = this,
            E = P.instance.current,
            o = P.newWidth,
            a = P.newHeight;
        P.contentLastPos && (y = P.contentLastPos.left, b = P.contentLastPos.top, O = {
            top: b,
            left: y,
            width: o,
            height: a,
            scaleX: 1,
            scaleY: 1
        }, u.fancybox.setTranslate(P.$content, O), o < P.canvasWidth && a < P.canvasHeight ? P.instance.scaleToFit(150) : o > E.width || a > E.height ? P.instance.scaleToActual(P.centerPointStartX, P.centerPointStartY, 150) : (C = P.limitPosition(y, b, o, a), u.fancybox.animate(P.$content, C, 150)))
    }, D.prototype.onTap = function(y) {
        var b, C = this,
            O = u(y.target),
            P = C.instance,
            E = P.current,
            o = y && d(y) || C.startPoints,
            a = o[0] ? o[0].x - u(m).scrollLeft() - C.stagePos.left : 0,
            h = o[0] ? o[0].y - u(m).scrollTop() - C.stagePos.top : 0,
            k = function(_) {
                var M = E.opts[_];
                if (u.isFunction(M) && (M = M.apply(P, [E, y])), M) switch (M) {
                    case "close":
                        P.close(C.startEvent);
                        break;
                    case "toggleControls":
                        P.toggleControls();
                        break;
                    case "next":
                        P.next();
                        break;
                    case "nextOrClose":
                        P.group.length > 1 ? P.next() : P.close(C.startEvent);
                        break;
                    case "zoom":
                        E.type == "image" && (E.isLoaded || E.$ghost) && (P.canPan() ? P.scaleToFit() : P.isScaledDown() ? P.scaleToActual(a, h) : P.group.length < 2 && P.close(C.startEvent))
                }
            };
        if ((!y.originalEvent || y.originalEvent.button != 2) && (O.is("img") || !(a > O[0].clientWidth + O.offset().left))) {
            if (O.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) b = "Outside";
            else if (O.is(".fancybox-slide")) b = "Slide";
            else {
                if (!P.current.$content || !P.current.$content.find(O).addBack().filter(O).length) return;
                b = "Content"
            }
            if (C.tapped) {
                if (clearTimeout(C.tapped), C.tapped = null, Math.abs(a - C.tapX) > 50 || Math.abs(h - C.tapY) > 50) return this;
                k("dblclick" + b)
            } else C.tapX = a, C.tapY = h, E.opts["dblclick" + b] && E.opts["dblclick" + b] !== E.opts["click" + b] ? C.tapped = setTimeout(function() {
                C.tapped = null, P.isAnimating || k("click" + b)
            }, 500) : k("click" + b);
            return this
        }
    }, u(S).on("onActivate.fb", function(y, b) {
        b && !b.Guestures && (b.Guestures = new D(b))
    }).on("beforeClose.fb", function(y, b) {
        b && b.Guestures && b.Guestures.destroy()
    })
}(window, document, jQuery),
function(m, S) {
    "use strict";
    S.extend(!0, S.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3,
            progress: !0
        }
    });
    var u = function(v) {
        this.instance = v, this.init()
    };
    S.extend(u.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var v = this,
                c = v.instance,
                d = c.group[c.currIndex].opts.slideShow;
            v.$button = c.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                v.toggle()
            }), c.group.length < 2 || !d ? v.$button.hide() : d.progress && (v.$progress = S('<div class="fancybox-progress"></div>').appendTo(c.$refs.inner))
        },
        set: function(v) {
            var c = this,
                d = c.instance,
                l = d.current;
            l && (v === !0 || l.opts.loop || d.currIndex < d.group.length - 1) ? c.isActive && l.contentType !== "video" && (c.$progress && S.fancybox.animate(c.$progress.show(), {
                scaleX: 1
            }, l.opts.slideShow.speed), c.timer = setTimeout(function() {
                d.current.opts.loop || d.current.index != d.group.length - 1 ? d.next() : d.jumpTo(0)
            }, l.opts.slideShow.speed)) : (c.stop(), d.idleSecondsCounter = 0, d.showControls())
        },
        clear: function() {
            var v = this;
            clearTimeout(v.timer), v.timer = null, v.$progress && v.$progress.removeAttr("style").hide()
        },
        start: function() {
            var v = this,
                c = v.instance.current;
            c && (v.$button.attr("title", (c.opts.i18n[c.opts.lang] || c.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), v.isActive = !0, c.isComplete && v.set(!0), v.instance.trigger("onSlideShowChange", !0))
        },
        stop: function() {
            var v = this,
                c = v.instance.current;
            v.clear(), v.$button.attr("title", (c.opts.i18n[c.opts.lang] || c.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), v.isActive = !1, v.instance.trigger("onSlideShowChange", !1), v.$progress && v.$progress.removeAttr("style").hide()
        },
        toggle: function() {
            var v = this;
            v.isActive ? v.stop() : v.start()
        }
    }), S(m).on({
        "onInit.fb": function(v, c) {
            c && !c.SlideShow && (c.SlideShow = new u(c))
        },
        "beforeShow.fb": function(v, c, d, l) {
            var g = c && c.SlideShow;
            l ? g && d.opts.slideShow.autoStart && g.start() : g && g.isActive && g.clear()
        },
        "afterShow.fb": function(v, c, d) {
            var l = c && c.SlideShow;
            l && l.isActive && l.set()
        },
        "afterKeydown.fb": function(v, c, d, l, g) {
            var T = c && c.SlideShow;
            !T || !d.opts.slideShow || g !== 80 && g !== 32 || S(m.activeElement).is("button,a,input") || (l.preventDefault(), T.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(v, c) {
            var d = c && c.SlideShow;
            d && d.stop()
        }
    }), S(m).on("visibilitychange", function() {
        var v = S.fancybox.getInstance(),
            c = v && v.SlideShow;
        c && c.isActive && (m.hidden ? c.clear() : c.set())
    })
}(document, jQuery),
function(m, S) {
    "use strict";
    var u = function() {
        for (var c = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ], d = {}, l = 0; l < c.length; l++) {
            var g = c[l];
            if (g && g[1] in m) {
                for (var T = 0; T < g.length; T++) d[c[0][T]] = g[T];
                return d
            }
        }
        return !1
    }();
    if (u) {
        var v = {
            request: function(c) {
                c = c || m.documentElement, c[u.requestFullscreen](c.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                m[u.exitFullscreen]()
            },
            toggle: function(c) {
                c = c || m.documentElement, this.isFullscreen() ? this.exit() : this.request(c)
            },
            isFullscreen: function() {
                return Boolean(m[u.fullscreenElement])
            },
            enabled: function() {
                return Boolean(m[u.fullscreenEnabled])
            }
        };
        S.extend(!0, S.fancybox.defaults, {
            btnTpl: {
                fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
            },
            fullScreen: {
                autoStart: !1
            }
        }), S(m).on(u.fullscreenchange, function() {
            var c = v.isFullscreen(),
                d = S.fancybox.getInstance();
            d && (d.current && d.current.type === "image" && d.isAnimating && (d.isAnimating = !1, d.update(!0, !0, 0), d.isComplete || d.complete()), d.trigger("onFullscreenChange", c), d.$refs.container.toggleClass("fancybox-is-fullscreen", c), d.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !c).toggleClass("fancybox-button--fsexit", c))
        })
    }
    S(m).on({
        "onInit.fb": function(c, d) {
            var l;
            if (!u) return void d.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
            d && d.group[d.currIndex].opts.fullScreen ? (l = d.$refs.container, l.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(g) {
                g.stopPropagation(), g.preventDefault(), v.toggle()
            }), d.opts.fullScreen && d.opts.fullScreen.autoStart === !0 && v.request(), d.FullScreen = v) : d && d.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
        },
        "afterKeydown.fb": function(c, d, l, g, T) {
            d && d.FullScreen && T === 70 && (g.preventDefault(), d.FullScreen.toggle())
        },
        "beforeClose.fb": function(c, d) {
            d && d.FullScreen && d.$refs.container.hasClass("fancybox-is-fullscreen") && v.exit()
        }
    })
}(document, jQuery),
function(m, S) {
    "use strict";
    var u = "fancybox-thumbs";
    S.fancybox.defaults = S.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, S.fancybox.defaults);
    var v = function(c) {
        this.init(c)
    };
    S.extend(v.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(c) {
            var d = this,
                l = c.group,
                g = 0;
            d.instance = c, d.opts = l[c.currIndex].opts.thumbs, c.Thumbs = d, d.$button = c.$refs.toolbar.find("[data-fancybox-thumbs]");
            for (var T = 0, I = l.length; T < I && (l[T].thumb && g++, !(g > 1)); T++);
            g > 1 && d.opts ? (d.$button.removeAttr("style").on("click", function() {
                d.toggle()
            }), d.isActive = !0) : d.$button.hide()
        },
        create: function() {
            var c, d = this,
                l = d.instance,
                g = d.opts.parentEl,
                T = [];
            d.$grid || (d.$grid = S('<div class="' + u + " " + u + "-" + d.opts.axis + '"></div>').appendTo(l.$refs.container.find(g).addBack().filter(g)), d.$grid.on("click", "a", function() {
                l.jumpTo(S(this).attr("data-index"))
            })), d.$list || (d.$list = S('<div class="' + u + '__list">').appendTo(d.$grid)), S.each(l.group, function(I, D) {
                c = D.thumb, c || D.type !== "image" || (c = D.src), T.push('<a href="javascript:;" tabindex="0" data-index="' + I + '"' + (c && c.length ? ' style="background-image:url(' + c + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
            }), d.$list[0].innerHTML = T.join(""), d.opts.axis === "x" && d.$list.width(parseInt(d.$grid.css("padding-right"), 10) + l.group.length * d.$list.children().eq(0).outerWidth(!0))
        },
        focus: function(c) {
            var d, l, g = this,
                T = g.$list,
                I = g.$grid;
            g.instance.current && (d = T.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + g.instance.current.index + '"]').addClass("fancybox-thumbs-active"), l = d.position(), g.opts.axis === "y" && (l.top < 0 || l.top > T.height() - d.outerHeight()) ? T.stop().animate({
                scrollTop: T.scrollTop() + l.top
            }, c) : g.opts.axis === "x" && (l.left < I.scrollLeft() || l.left > I.scrollLeft() + (I.width() - d.outerWidth())) && T.parent().stop().animate({
                scrollLeft: l.left
            }, c))
        },
        update: function() {
            var c = this;
            c.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), c.isVisible ? (c.$grid || c.create(), c.instance.trigger("onThumbsShow"), c.focus(0)) : c.$grid && c.instance.trigger("onThumbsHide"), c.instance.update()
        },
        hide: function() {
            this.isVisible = !1, this.update()
        },
        show: function() {
            this.isVisible = !0, this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible, this.update()
        }
    }), S(m).on({
        "onInit.fb": function(c, d) {
            var l;
            d && !d.Thumbs && (l = new v(d), l.isActive && l.opts.autoStart === !0 && l.show())
        },
        "beforeShow.fb": function(c, d, l, g) {
            var T = d && d.Thumbs;
            T && T.isVisible && T.focus(g ? 0 : 250)
        },
        "afterKeydown.fb": function(c, d, l, g, T) {
            var I = d && d.Thumbs;
            I && I.isActive && T === 71 && (g.preventDefault(), I.toggle())
        },
        "beforeClose.fb": function(c, d) {
            var l = d && d.Thumbs;
            l && l.isVisible && l.opts.hideOnClose !== !1 && l.$grid.hide()
        }
    })
}(document, jQuery),
function(m, S) {
    "use strict";

    function u(v) {
        var c = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        return String(v).replace(/[&<>"'`=\/]/g, function(d) {
            return c[d]
        })
    }
    S.extend(!0, S.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
        },
        share: {
            url: function(v, c) {
                return !v.currentHash && c.type !== "inline" && c.type !== "html" && (c.origSrc || c.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
        }
    }), S(m).on("click", "[data-fancybox-share]", function() {
        var v, c, d = S.fancybox.getInstance(),
            l = d.current || null;
        l && (S.type(l.opts.share.url) === "function" && (v = l.opts.share.url.apply(l, [d, l])), c = l.opts.share.tpl.replace(/\{\{media\}\}/g, l.type === "image" ? encodeURIComponent(l.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(v)).replace(/\{\{url_raw\}\}/g, u(v)).replace(/\{\{descr\}\}/g, d.$caption ? encodeURIComponent(d.$caption.text()) : ""), S.fancybox.open({
            src: d.translate(d, c),
            type: "html",
            opts: {
                touch: !1,
                animationEffect: !1,
                afterLoad: function(g, T) {
                    d.$refs.container.one("beforeClose.fb", function() {
                        g.close(null, 0)
                    }), T.$content.find(".fancybox-share__button").click(function() {
                        return window.open(this.href, "Share", "width=550, height=450"), !1
                    })
                },
                mobile: {
                    autoFocus: !1
                }
            }
        }))
    })
}(document, jQuery),
function(m, S, u) {
    "use strict";

    function v() {
        var l = m.location.hash.substr(1),
            g = l.split("-"),
            T = g.length > 1 && /^\+?\d+$/.test(g[g.length - 1]) && parseInt(g.pop(-1), 10) || 1,
            I = g.join("-");
        return {
            hash: l,
            index: T < 1 ? 1 : T,
            gallery: I
        }
    }

    function c(l) {
        l.gallery !== "" && u("[data-fancybox='" + u.escapeSelector(l.gallery) + "']").eq(l.index - 1).focus().trigger("click.fb-start")
    }

    function d(l) {
        var g, T;
        return !!l && (g = l.current ? l.current.opts : l.opts, (T = g.hash || (g.$orig ? g.$orig.data("fancybox") || g.$orig.data("fancybox-trigger") : "")) !== "" && T)
    }
    u.escapeSelector || (u.escapeSelector = function(l) {
        return (l + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(g, T) {
            return T ? g === "\0" ? "\xEF\xBF\xBD" : g.slice(0, -1) + "\\" + g.charCodeAt(g.length - 1).toString(16) + " " : "\\" + g
        })
    }), u(function() {
        u.fancybox.defaults.hash !== !1 && (u(S).on({
            "onInit.fb": function(l, g) {
                var T, I;
                g.group[g.currIndex].opts.hash !== !1 && (T = v(), (I = d(g)) && T.gallery && I == T.gallery && (g.currIndex = T.index - 1))
            },
            "beforeShow.fb": function(l, g, T, I) {
                var D;
                T && T.opts.hash !== !1 && (D = d(g)) && (g.currentHash = D + (g.group.length > 1 ? "-" + (T.index + 1) : ""), m.location.hash !== "#" + g.currentHash && (I && !g.origHash && (g.origHash = m.location.hash), g.hashTimer && clearTimeout(g.hashTimer), g.hashTimer = setTimeout(function() {
                    "replaceState" in m.history ? (m.history[I ? "pushState" : "replaceState"]({}, S.title, m.location.pathname + m.location.search + "#" + g.currentHash), I && (g.hasCreatedHistory = !0)) : m.location.hash = g.currentHash, g.hashTimer = null
                }, 300)))
            },
            "beforeClose.fb": function(l, g, T) {
                T && T.opts.hash !== !1 && (clearTimeout(g.hashTimer), g.currentHash && g.hasCreatedHistory ? m.history.back() : g.currentHash && ("replaceState" in m.history ? m.history.replaceState({}, S.title, m.location.pathname + m.location.search + (g.origHash || "")) : m.location.hash = g.origHash), g.currentHash = null)
            }
        }), u(m).on("hashchange.fb", function() {
            var l = v(),
                g = null;
            u.each(u(".fancybox-container").get().reverse(), function(T, I) {
                var D = u(I).data("FancyBox");
                if (D && D.currentHash) return g = D, !1
            }), g ? g.currentHash === l.gallery + "-" + l.index || l.index === 1 && g.currentHash == l.gallery || (g.currentHash = null, g.close()) : l.gallery !== "" && c(l)
        }), setTimeout(function() {
            u.fancybox.getInstance() || c(v())
        }, 50))
    })
}