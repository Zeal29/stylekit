import ResizeObserver from "resize-observer-polyfill";

export type AlphaNumeric = number | string;
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

function intpPart(x: string, x1: number, x2: number, v1: number, v2: number, unit: string) {
	const min = Math.min(v1, v2);
	const max = Math.max(v1, v2);

	return `clamp(${min}${unit}, (${intp(x, x1, x2, v1, v2)} * 1${unit}), ${max}${unit}) `;
}

export function intpW(
	unit: string = "px",

	...breakPoints: [number, number][]
) {
	if (breakPoints.length < 2) throw new Error("there must be more then 1 break point to work.");
	debugger;

	let x = "var(--screen-x)";

	let equation = "calc(";

	for (let i = 1; i < breakPoints.length; i += 1) {
		const [x1, v1] = breakPoints[i - 1];
		const [x2, v2] = breakPoints[i];

		if (i != 1) {
			equation += `${aGEb(x, x1)} * `;
		}

		equation += intpPart(x, x1, x2, v1, v2, unit);

		if (i != breakPoints.length - 1) {
			equation += ` * ${aGb(x2, x)} `;
		}

		equation += " + ";
	}

	//removing last + symbol
	equation = equation.substr(0, equation.length - 2);

	equation += " )";

	return equation;
}

/**
 * we can use this function css
 * if a is greater then it return 1
 * if b is greater then it return 0
 * if b == a then it return 0
 */
export function aGb(a: AlphaNumeric, b: AlphaNumeric) {
	return `min(max(0, ${a} - ${b}), 1)`;
}

/**
 * we can use this function css
 * if a is greater then it return 1
 * if b is greater then it return 0
 * if b == a then it return 1
 */
export function aGEb(a: AlphaNumeric, b: AlphaNumeric) {
	return `calc((min(1, max(0, ${b} - ${a})) * -1) + 1 )`;
}
