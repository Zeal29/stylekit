export declare type AlphaNumeric = number | string;
export declare function setup(): void;
export declare function intpW(unit?: string, ...breakPoints: [number, number][]): string;
export declare function intpH(unit?: string, ...breakPoints: [number, number][]): string;
/**
 * we can use this function css
 * if a is greater then it return 1
 * if b is greater then it return 0
 * if b == a then it return 0
 */
export declare function aGb(a: AlphaNumeric, b: AlphaNumeric): string;
/**
 * we can use this function css
 * if a is greater then it return 1
 * if b is greater then it return 0
 * if b == a then it return 1
 */
export declare function aGEb(a: AlphaNumeric, b: AlphaNumeric): string;
//# sourceMappingURL=init.d.ts.map