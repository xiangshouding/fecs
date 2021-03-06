/**
 * @file Rule to warn about using dot notation instead of square bracket notation when possible.
 * @author Josh Perez
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
var keywords = [
    'this',
    'function',
    'if',
    'return',
    'var',
    'else',
    'for',
    'new',
    'arguments',
    'in',
    'typeof',
    'while',
    'case',
    'break',
    'try',
    'catch',
    'delete',
    'throw',
    'switch',
    'continue',
    'default',
    'instanceof',
    'do',
    'void',
    'finally',
    'with',
    'debugger',
    'eval',
    'implements',
    'interface',
    'package',
    'private',
    'protected',
    'public',
    'static',
    'yield',
    'let',
    'class',
    'enum',
    'export',
    'extends',
    'import',
    'super',
    'true',
    'false',
    'null',
    'abstract',
    'boolean',
    'byte',
    'char',
    'const',
    'double',
    'final',
    'float',
    'goto',
    'int',
    'long',
    'native',
    'short',
    'synchronized',
    'throws',
    'transient',
    'volatile'
];

module.exports = function (context) {
    var options = context.options[0] || {};
    var allowKeywords = options.allowKeywords === void 0 || !!options.allowKeywords;

    return {
        MemberExpression: function (node) {
            if (
                node.computed &&
                node.property.type === 'Literal' &&
                validIdentifier.test(node.property.value) &&
                (allowKeywords || keywords.indexOf('' + node.property.value) === -1)
            ) {
                context.report(
                    node.property,
                    '[' + JSON.stringify(node.property.value) + '] is better written in dot notation.'
                );
            }
            if (
                !allowKeywords &&
                !node.computed &&
                keywords.indexOf('' + node.property.name) !== -1
            ) {
                context.report(node.property, '.' + node.property.name + ' is a syntax error.');
            }
        }
    };
};
