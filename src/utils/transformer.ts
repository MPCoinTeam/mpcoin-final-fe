type CamelCase<S extends string> = S extends `${infer P}_${infer Q}` ? `${P}${Capitalize<CamelCase<Q>>}` : S;

type CamelCaseObject<T> =
  T extends Array<any>
    ? Array<CamelCaseObject<T[number]>>
    : T extends object
      ? {
          [K in keyof T as CamelCase<string & K>]: CamelCaseObject<T[K]>;
        }
      : T;

export const toCamelCase = <T>(obj: T): CamelCaseObject<T> => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase) as CamelCaseObject<T>;
  } else if (obj && obj.constructor === Object) {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
        acc[camelKey] = toCamelCase(value);
        return acc;
      },
      {} as Record<string, any>,
    ) as CamelCaseObject<T>;
  }
  return obj as CamelCaseObject<T>;
};
