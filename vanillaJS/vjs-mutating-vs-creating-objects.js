var ccc = Object.assssign({}, aaa); // find more about it => will overwrite duplicit values

var aaa = {
    xxx: 'yyy',
    zzz: 'xxx'
}

var bbb = {
    xxx: 'zzz'
}

var ccc = Object.assign(aaa, bbb) // will mutate aaa
var ccc = Object.assign({}, aaa, bbb) // will create a new object

// =>
ccc = {
    xxx: 'zzz',
    zzz: 'xxx'
}