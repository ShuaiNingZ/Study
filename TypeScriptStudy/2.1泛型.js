// function fn(a: number): number {
//     return a
// }
/**
 * 在定义函数或者类时, 如果遇到类型不明确就可以使用泛型
 *
 */
function fn(a) {
    return a;
}
// 可以直接调用具有泛型的函数
fn(10); // 不指定泛型, TS 可以自动对类型进行推断
fn('hello'); // 指定泛型
function fn2(a, b) {
    console.log(b);
    return a;
}
fn2(123, '12');
// T extends Inter 表示泛型 T 必须实现 Inter 类(子类)
function fn3(a) {
    return a.length;
}
