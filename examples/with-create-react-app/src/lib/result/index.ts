export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export const okResult = <O = undefined>(value: any): Result<O> => {
  return {
    ok: true,
    value,
  };
};

export const failResult = <O = undefined>(error: any): Result<O, Error> => {
  return {
    ok: false,
    error,
  };
};
