export type JSONWebTokenOptions = HS256StrategyOptions | RS256StrategyOptions;

export interface JSONWebTokenHeader {
  readonly typ: string;

  readonly alg: string;
}

export interface BaseStrategyOptions {
  readonly header: JSONWebTokenHeader;

  readonly ttl: number;
}

export abstract class BaseStrategy {
  abstract sign(unsigned: string): string;

  abstract validateSignature(unsigned: string, candidate: string): boolean;

  generate(payload: object, options?: JSONWebTokenOptions): string;

  verify<T>(token: string): T;
}

export interface HS256StrategyOptions {
  readonly ttl: number;

  readonly secret: string;
}

export interface RS256StrategyOptions {
  readonly ttl: number;

  readonly publicKey: string;

  readonly privKey: string;
}

export class HS256Strategy extends BaseStrategy {
  constructor(options: HS256StrategyOptions);

  sign(unsigned: string): string;

  validateSignature(unsigned: string, candidate: string): boolean;
}

export class RS256Strategy extends BaseStrategy {
  constructor(options: RS256StrategyOptions);

  sign(unsigned: string): string;

  validateSignature(unsigned: string, candidate: string): boolean;
}

export class JSONWebToken {
  constructor(strategy: BaseStrategy);

  setStrategy(strategy: BaseStrategy): void;

  generate(payload: object, options?: JSONWebTokenOptions): string;

  verify<T extends object>(token: string): T;
}
