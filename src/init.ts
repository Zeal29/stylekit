import ResizeObserver from "resize-observer-polyfill";

export function setup() {
	if ("document" in globalThis) {
		var root = document.documentElement;

		const ro = new ResizeObserver((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				root.style.setProperty("--screen-x", width.toString());
				root.style.setProperty("--screen-y", height.toString());
			}
		});

		ro.observe(root);
	} else {
		console.warn("Unable to run StyleKit in this environment");
	}
}

function intp(x: number | string, x1: number | string, x2: number | string, v1: number | string, v2: number | string) {
	return `(${v1} + ( (${x} - ${x1}) * ( (${v2} - ${v1}) / (${x2} - ${x1}) ) ) )`;
}

export function intpW(
	unit: string = "px",

	...breakPoints: [number, number][]
) {
	let x = "var(--screen-x)";

	const [x1, min] = breakPoints[0];
	const [x2, max] = breakPoints[breakPoints.length - 1];

	return `clamp(${min}${unit}, calc(${intp(x, x1, x2, min, max)} * 1${unit}), ${max}${unit})`;
}
