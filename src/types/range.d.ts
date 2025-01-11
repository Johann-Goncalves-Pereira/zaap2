// Utility type to build an array of a specified length
type BuildArray<
  Length extends number,
  Arr extends unknown[] = [],
> = Arr["length"] extends Length ? Arr : BuildArray<Length, [...Arr, unknown]>;

// Increment a numeric literal type
type Increment<N extends number> = [...BuildArray<N>, unknown]["length"];

// Create a union of numbers from Start to End
export type RangeInt<
  Start extends number,
  End extends number,
> = number extends Start
  ? number
  : Exclude<
      {
        [K in Start extends number
          ? End extends number
            ? `${Start | End}`
            : never
          : never]: K extends `${infer N extends number}` ? N : never;
      }[string],
      never
    >;
