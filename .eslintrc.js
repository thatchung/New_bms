module.exports = {
    extends: ['google', 'prettier'],
    plugins: ['prettier'],
    env: {
        commonjs: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        process: false,
        __filename: false,
        __dirname: false,
        Buffer: false,
        test: false,
        expect: false
    },
    rules: {
        indent: [
            2,
            4,
            {
                SwitchCase: 1
            }
        ],
        quotes: [
            2,
            'single',
            {
                allowTemplateLiterals: true
            }
        ],
        'no-var': [2],
        'object-curly-spacing': [2, 'always'],
        'space-before-function-paren': [
            2,
            { anonymous: 'never', named: 'never', asyncArrow: 'always' }
        ],
        'max-len': [
            2,
            {
                code: 150
            }
        ],
        'new-cap': [
            2,
            {
                capIsNew: false,
                properties: false
            }
        ],
        camelcase: 0,
        'prefer-const': 0,
        'require-jsdoc': 0
    }
};
