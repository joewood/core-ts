const d3Scale = require("d3-scale");

export interface IToStringable {
    toString(): string;
}


export interface IOrdinal<Domain extends { toString(): string }, Range> {
    /** Given a value in the input domain, returns the corresponding value in 
     * the output range. If the given value is not in the scale’s domain, returns
     * the unknown; or, if the unknown value is implicit (the default), then the
     * value is implicitly added to the domain and the next-available value in
     * the range is assigned to value, such that this and subsequent invocations
     * of the scale given the same input value return the same output value. */
    (x: Domain): Range;
    /** If domain is specified, sets the domain to the specified array of values. The
     * first element in domain will be mapped to the first element in the range,
     * the second domain value to the second range value, and so on. Domain values
     * are stored internally in a map from stringified value to index; the resulting
     * index is then used to retrieve a value from the range. Thus, an ordinal scale’s
     * values must be coercible to a string, and the stringified version of the domain
     * value uniquely identifies the corresponding range value. If domain is not
     * specified, this method returns the current domain.
     * */
    domain(): Domain[];
    domain(values: Domain[]): this;
    /** If range is specified, sets the range of the ordinal scale to the specified array 
     * of values. The first element in the domain will be mapped to the first element in
     * range, the second domain value to the second range value, and so on. If there are
     * fewer elements in the range than in the domain, the scale will reuse values from
     * the start of the range. If range is not specified, this method returns the current
     * range. */
    range(): Range[];
    range(values: Range[]): this;
    /** if value is specified, sets the output value of the scale for unknown input 
     * values and returns this scale. If value is not specified, returns the current
     * unknown value, which defaults to implicit. The implicit value enables implicit
     * domain construction; */
    unknown(value: Range) : Domain;
}


export interface IScaleBand<Domain extends { toString(): string }, Range> extends IOrdinal<Domain, Range> {
    /** Sets the scale’s range to the specified two-element array of numbers while also enabling 
     * rounding. This is a convenience method equivalent to
     * */
    rangeRound(values: Range[]): this;
    /** If round is specified, enables or disables rounding accordingly. If rounding is enabled, 
     * the start and stop of each band will be integers. Rounding is sometimes useful for avoiding
     * antialiasing artifacts, though also consider the shape-rendering "crispEdges" styles.
     * Note that if the width of the domain is not a multiple of the cardinality of the range,
     * there may be leftover unused space, even without padding! Use band.align to specify how
     * the leftover space is distributed.
     * */
    round(enable?: boolean): this;
    /** If padding is specified, sets the inner padding to the specified value which must be in the 
     * range [0, 1]. If padding is not specified, returns the current inner padding which defaults
     * to 0. The inner padding determines the ratio of the range that is reserved for blank space
     * between bands.
     * */
    paddingInner(ratio?: number): number;
    /** If padding is specified, sets the outer padding to the specified value which must be in 
     * the range [0, 1]. If padding is not specified, returns the current outer padding which
     *  defaults to 0. The outer padding determines the ratio of the range that is reserved for
     *  blank space before the first band and after the last band.
     * */
    paddingOuter(ratio?: number): number;

    /** If align is specified, sets the alignment to the specified value which must be in
     *  the range [0, 1]. If align is not specified, returns the current alignment which defaults
     *  to 0.5. The alignment determines how any leftover unused space in the range is distributed.
     *  A value of 0.5 indicates that the leftover space should be equally distributed before the
     *  first band and after the last band; i.e., the bands should be centered within the range.
     *  A value of 0 or 1 may be used to shift the bands to one side, say to position them adjacent
     *  to an axis.
     * */
    align(ratio?: number): number;

    /** Returns the width of each band. */
    bandwidth(): number;
    /** Returns the distance between the starts of adjacent bands. */
    step(): number;

    copy(): this;
}

export interface ILinear<Range, Output> {
    (x: number): Output;
    invert(y: number): number;
    domain(): number[];
    domain(numbers: number[]): ILinear<Range, Output>;
    domain(range: Date[]): ILinear<Range, Output>;
    range(): Range[];
    range(values: Range[]): ILinear<Range, Output>;
    rangeRound(values: number[]): ILinear<number, number>;
    interpolate(): (a: Range, b: Range) => (t: number) => Output;
    interpolate(factory: (a: Range, b: Range) => (t: number) => Output): ILinear<Range, Output>;
    clamp(): boolean;
    clamp(clamp: boolean): ILinear<Range, Output>;
    nice(count?: number): ILinear<Range, Output>;
    ticks(count?: number): number[];
    tickFormat(count?: number, format?: string): (n: number) => string;
    copy(): ILinear<Range, Output>;
}


export interface IDateLinear {
    (x: Date): number;
    invert(y: number): number;
    domain(): number[];
    domain(dates: Date[]): IDateLinear;
    range(): number[];
    range(values: number[]): IDateLinear;
    rangeRound(values: number[]): IDateLinear;
    interpolate(): (a: Date, b: Date) => (t: Date) => number;
    interpolate(factory: (a: Date, b: Date) => (t: number) => number): IDateLinear;
    clamp(): boolean;
    clamp(clamp: boolean): IDateLinear;
    nice(count?: number): IDateLinear;
    ticks(count?: number): Date[];
    tickFormat(count?: number, format?: string): (n: number) => string;
    copy(): IDateLinear;
}

export function ordinal<D, R>(): IOrdinal<D, R> {
    return d3Scale.scaleOrdinal();
}

export function scaleLinear<R,O>(): ILinear<R,O> {
    return d3Scale.scaleLinear();
}

export function category20<Domain extends IToStringable>(): IOrdinal<Domain, string> {
    return d3Scale.scaleCategory20();
}

export function category20c<Domain extends IToStringable>(): IOrdinal<Domain, string> {
    return d3Scale.scaleCategory20c();
}

export function time(): IDateLinear {
    return d3Scale.scaleTime();
}

export function band<D, R>(): IScaleBand<D, R> {
    return d3Scale.scaleBand();
} 