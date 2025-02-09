// A generic TypeScript type to flatten a nested object
type FlattenObjectKeys<
  T extends Record<string, unknown>,
  Key = keyof T
> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${FlattenObjectKeys<T[Key]>}`
    : Key
  : never;

type Event = {
  data: Record<string, unknown>;
};

export type EventLedger<T extends Event> = Record<
  FlattenObjectKeys<T["data"]>,
  string
>;
