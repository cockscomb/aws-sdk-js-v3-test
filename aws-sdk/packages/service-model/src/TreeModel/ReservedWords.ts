/**
 * A set of words that are not legal identifiers in JavaScript.
 *
 * @see https://tc39.github.io/ecma262/#sec-reserved-words
 */
export const JS_RESERVED_WORDS: Set<string> = new Set([
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'finally',
    'for',
    'function',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'interface',
    'let',
    'new',
    'null',
    'package',
    'private',
    'protected',
    'public',
    'return',
    'static',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'true',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield',
]);

export const TS_RESERVED_WORDS = new Set<string>([
    'any',
    'as',
    'async',
    'boolean',
    'constructor',
    'declare',
    'from',
    'get',
    'module',
    'never',
    'number',
    'of',
    'Partial',
    'Pick',
    'Readonly',
    'Record',
    'require',
    'set',
    'string',
    'symbol',
    'type',
    'undefined',
]);
