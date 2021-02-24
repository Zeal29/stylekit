var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import ResizeObserver from "resize-observer-polyfill";
export function setup() {
    if ("document" in globalThis) {
        var root = document.documentElement;
        var ro = new ResizeObserver(function (entries, observer) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                var _a = entry.contentRect, width = _a.width, height = _a.height;
                root.style.setProperty("--screen-x", width.toString());
                root.style.setProperty("--screen-y", height.toString());
            }
        });
        ro.observe(root);
    }
    else {
        console.warn("Unable to run StyleKit in this environment");
    }
}
function intp(x, x1, x2, v1, v2) {
    return "(" + v1 + " + ( (" + x + " - " + x1 + ") * ( (" + v2 + " - " + v1 + ") / (" + x2 + " - " + x1 + ") ) ) )";
}
function intpPart(x, x1, x2, v1, v2, unit) {
    var min = Math.min(v1, v2);
    var max = Math.max(v1, v2);
    return "clamp(" + min + unit + ", (" + intp(x, x1, x2, v1, v2) + " * 1" + unit + "), " + max + unit + ") ";
}
function intpScreen(unit, x) {
    if (unit === void 0) { unit = "px"; }
    var breakPoints = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        breakPoints[_i - 2] = arguments[_i];
    }
    if (breakPoints.length < 2)
        throw new Error("there must be more then 1 break point to work.");
    debugger;
    var equation = "calc(";
    for (var i = 1; i < breakPoints.length; i += 1) {
        var _a = breakPoints[i - 1], x1 = _a[0], v1 = _a[1];
        var _b = breakPoints[i], x2 = _b[0], v2 = _b[1];
        if (i != 1) {
            equation += aGEb(x, x1) + " * ";
        }
        equation += intpPart(x, x1, x2, v1, v2, unit);
        if (i != breakPoints.length - 1) {
            equation += " * " + aGb(x2, x) + " ";
        }
        equation += " + ";
    }
    //removing last + symbol
    equation = equation.substr(0, equation.length - 2);
    equation += " )";
    return equation;
}
export function intpW(unit) {
    if (unit === void 0) { unit = "px"; }
    var breakPoints = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        breakPoints[_i - 1] = arguments[_i];
    }
    var x = "var(--screen-x)";
    return intpScreen.apply(void 0, __spreadArrays([unit, x], breakPoints));
}
export function intpH(unit) {
    if (unit === void 0) { unit = "px"; }
    var breakPoints = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        breakPoints[_i - 1] = arguments[_i];
    }
    var y = "var(--screen-y)";
    return intpScreen.apply(void 0, __spreadArrays([unit, y], breakPoints));
}
/**
 * we can use this function css
 * if a is greater then it return 1
 * if b is greater then it return 0
 * if b == a then it return 0
 */
export function aGb(a, b) {
    return "min(max(0, " + a + " - " + b + "), 1)";
}
/**
 * we can use this function css
 * if a is greater then it return 1
 * if b is greater then it return 0
 * if b == a then it return 1
 */
export function aGEb(a, b) {
    return "calc((min(1, max(0, " + b + " - " + a + ")) * -1) + 1 )";
}
//# sourceMappingURL=init.js.map