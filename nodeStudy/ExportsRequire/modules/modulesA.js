const objA = {
    name: 'obj-a'
}

module.exports.objA = objA;

/*
console.log(module.hasOwnProperty(exports))
console.log(module.exports === exports)
console.log('exports' in module)

console.log(require.main === module, 'module_a');
// false

console.log(require);

console.log(
    require.main.filename,
    module.filename,
    __filename,
    'filename'
)*/