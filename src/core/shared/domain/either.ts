export abstract class Either<Ok, ErrorType> {
  abstract isOk(): this is Success<Ok, ErrorType>;
  abstract isFail(): this is Failure<Ok, ErrorType>;

  abstract map<NewOk>(fn: (value: Ok) => NewOk): Either<NewOk, ErrorType>;
  abstract chain<NewOk, NewError = ErrorType>(
    fn: (value: Ok) => Either<NewOk, NewError>,
  ): Either<NewOk, ErrorType | NewError>;

  // Factory methods
  static ok<T, E = Error>(value: T): Either<T, E> {
    return new Success(value);
  }

  static fail<E, T = unknown>(error: E): Either<T, E> {
    return new Failure(error);
  }

  static safe<T, E = Error>(fn: () => T): Either<T, E | Error> {
    try {
      return Either.ok(fn());
    } catch (e) {
      return Either.fail(e as E | Error);
    }
  }

  static of<T, E = Error>(value: T): Either<T, E> {
    return Either.ok(value);
  }

  // Utility methods that work on both success and failure
  abstract fold<R>(
    onSuccess: (value: Ok) => R,
    onFailure: (error: ErrorType) => R,
  ): R;
  abstract getOrElse(defaultValue: Ok): Ok;
  abstract toTuple(): [Ok | null, ErrorType | null];

  // Array processing - more principled approach
  static sequence<T, E>(eithers: Either<T, E>[]): Either<T[], E> {
    const results: T[] = [];
    for (const either of eithers) {
      if (either.isFail()) {
        return either as Either<T[], E>;
      }
      results.push((either as Success<T, E>).value);
    }
    return Either.ok(results);
  }

  static traverse<T, U, E>(
    values: T[],
    fn: (value: T) => Either<U, E>,
  ): Either<U[], E> {
    return Either.sequence(values.map(fn));
  }
}

class Success<Ok, ErrorType> extends Either<Ok, ErrorType> {
  constructor(public readonly value: Ok) {
    super();
  }

  isOk(): this is Success<Ok, ErrorType> {
    return true;
  }

  isFail(): this is Failure<Ok, ErrorType> {
    return false;
  }

  map<NewOk>(fn: (value: Ok) => NewOk): Either<NewOk, ErrorType> {
    return Either.ok(fn(this.value));
  }

  chain<NewOk, NewError = ErrorType>(
    fn: (value: Ok) => Either<NewOk, NewError>,
  ): Either<NewOk, ErrorType | NewError> {
    return fn(this.value);
  }

  fold<R>(onSuccess: (value: Ok) => R, onFailure: (error: ErrorType) => R): R {
    return onSuccess(this.value);
  }

  getOrElse(defaultValue: Ok): Ok {
    return this.value;
  }

  toTuple(): [Ok | null, ErrorType | null] {
    return [this.value, null];
  }
}

class Failure<Ok, ErrorType> extends Either<Ok, ErrorType> {
  constructor(public readonly error: ErrorType) {
    super();
  }

  isOk(): this is Success<Ok, ErrorType> {
    return false;
  }

  isFail(): this is Failure<Ok, ErrorType> {
    return true;
  }

  map<NewOk>(_fn: (value: Ok) => NewOk): Either<NewOk, ErrorType> {
    return Either.fail(this.error);
  }

  chain<NewOk, NewError = ErrorType>(
    _fn: (value: Ok) => Either<NewOk, NewError>,
  ): Either<NewOk, ErrorType | NewError> {
    return Either.fail(this.error);
  }

  fold<R>(onSuccess: (value: Ok) => R, onFailure: (error: ErrorType) => R): R {
    return onFailure(this.error);
  }

  getOrElse(defaultValue: Ok): Ok {
    return defaultValue;
  }

  toTuple(): [Ok | null, ErrorType | null] {
    return [null, this.error];
  }
}
