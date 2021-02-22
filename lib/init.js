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
export function intpW(unit) {
    if (unit === void 0) { unit = "px"; }
    var breakPoints = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        breakPoints[_i - 1] = arguments[_i];
    }
    var x = "var(--screen-x)";
    var _a = breakPoints[0], x1 = _a[0], min = _a[1];
    var _b = breakPoints[breakPoints.length - 1], x2 = _b[0], max = _b[1];
    return "clamp(" + min + unit + ", calc(" + intp(x, x1, x2, min, max) + " * 1" + unit + "), " + max + unit + ")";
}
//# sourceMappingURL=init.js.map