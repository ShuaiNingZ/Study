// TODO typeof
function fn(x: number): Array<number> {
    return [x];
}

type f = typeof fn

// (x: number) => Array<number>

// TODO keyof
interface hint {
    success: 'success',
    warning: 'warning',
    error: 'error',
}

type h = keyof hint;
// "success" | "warning" | "error"

// TODO in
type Key = 'a' | 'b' | 'c';
type k = {
    [p in Key]: string
}
// {a: string, b: string, c: string}

// TODO 交叉类型
// 交叉类型: 且, 将多个类型合并为一个类型
// 语法: 类型一 & 类型二
interface a {
    id: number,
    name: string,
    timestamp: string
}

interface b {
    id: number,
    age: number,
    timestamp: number,
}

type ab = a & b;
// {
//     id: number,
//     name: string,
//     age: number,
//     timestamp: never
// }
// 实现交叉类型
function crossType<T, U>(a: T, b: U): T & U {
    for (const key in b) {
        (a as T & U)[key] = b[key] as any;
    }
    return a as T & U;
}

interface m {
    id: number,
    name: string
}

interface n {
    id: number,
    age: number
}

crossType<m, n>(
    {
        id: 1,
        name: 'string'
    },
    {
        id: 21,
        age: 24
    }
)

// TODO 联合类型
// 联合类型: 或者, 取多个类型中的一种类型 或 只能访问共有属性或方法
// 语法: 类型一 | 类型二

let union: string | number;
union = '50';
union = 10;
// 字面量联合类型
type union1 = true | false;
type union2 = { status: 200, data: object } | { status: 500, request: string };

interface c {
    name: string,
    age: number
}

interface d {
    name: string,
    sex: 0 | 1
}

let union3: c | d;
// union3.name

// TODO 类型别名
// 类型别名: 用关键词 type 定义类型
// 类型别名不会新建一个类型, 而是创建一个新名字来引用此类型
type Age = number;
let age: Age = 25;
type Point = {
    x: number;
    y: number;
};
let point: Point = {
    x: 10,
    y: 20
};

// TODO 索引类型
// 索引类型: 让 TS 编译器覆盖监测到使用动态属性名的代码
'索引类型查询操作符 keyof'

interface user {
    id: number,
    phone: string,
    readonly department: string
}

class Token {
    private secret: string | undefined
    public jwt: string
    public accessExp: number = 60 * 60
    public refreshExp: number = 60 * 60 * 24 * 30 * 3
}

type userType = keyof user;
// "id" | "phone" | "department"
type token = keyof Token;
// "accessExp" | "refreshExp"
// class 中 keyof T 的结果为 公共属性名的联合

'索引访问操作符 T[K]'
type valueType = Token[token];
// number | string
type jwt = Token['jwt'];
// string

// 一个对象类型为泛型 T, 这个对象的属性 K 只要满足 K extends keyof T
// 即可得到这个属性值的类型为 T[K]
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]
}

interface Person {
    name: string;
    readonly age: number;
}

const person: Person = {
    name: "竹木",
    age: 25
}
const nameVal = getProperty(person, 'name')
console.log(nameVal); // 竹木
const ageVal = getProperty(person, 'age')
console.log(ageVal); // 25

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n])
}

let values: unknown[] = pluck(person, ['name', 'age'])
console.log(values); // ['竹木', 25]


// TODO 映射类型

// 映射类型可以将已知类型的每个属性都变为可选或者只读的
interface Obj {
    name: string
    age?: number
    readonly sex: boolean
}

// Partial 将已知类型改为可选
type ObjOptional = Partial<Obj>
// {name?: string, age?: number, sex?: boolean}
// Readonly 将已知类型改为只读
type ObjReadonly = Readonly<Obj>
// {readonly name: string, readonly age?: number, readonly sex: boolean}

// 实现源码
// type Readonly<T> = {
//     readonly [K in keyof T]: T[K]
// }
// type Partial<T> = {
//     [K in keyof T]?: T[K]
// }
// type Pick<T, K extends keyof T>={
//     [F in K]: T[F]
// }
type ObjPick = Pick<Obj, 'name'>
// {name: string}

// TODO 条件类型

// 条件类型用来表达非均匀类型映射, 可以根据一个条件表达式来进行类型检测
// 语法: T extends U ? x : y
// 语义: 类似三目运算, 若 T 是 U 的子类型, 则类型为 X, 否则类型为 Y
// 若无法确定 T 是否为 U 的子类型, 则类型为 X | Y

declare function g<T extends boolean>(x: T): T extends true ? string : number;

const g1 = g(Math.random() < 0.5);
// string | number
const g2 = g(true);
// string
const g3 = g(false);
// number

'可分配条件类型'
// 在条件类型 T extends U ? X : Y 中, 当泛型参数 T 取值为 A | B | C 时,
// 这个条件类型就等价于 (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)

// 可分配条件类型中被检查的类型必须是裸类型参数.
// 裸类型表示没有被包裹的类型, 如: Array<T>、T、Promise<T> 等都不是裸类型
// 简而言之裸类型就是未经过任何其他类型修饰或包装的类型

// Exclude<T, U> 从 T 中提出可以赋值给 U 的类型
type typeExclude = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>
// "b" | "d"
// 实现源码
// type Exclude<T, U> = T extends U ? never : T;

type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>

interface Part {
    id: number
    name: string
    subparts: Part[]
    firstFn: (brand: string) => void
    anotherFn: (channel: string) => string
}

type FnNames = FunctionPropertyNames<Part>
// 遍历整个接口, 然后通过条件判断接口属性值类型是否是函数类型, 如果是取其属性名
// 得到: type FnNames = 'firstFn' | 'anotherFn'
'注意小知识: undefined、null、never、private、protected 等类型或修饰符在 T[keyof T] 的结果中会被排除在外'
type FnProperties = FunctionProperties<Part>
// {firstFn: (brand: string) => void, anotherFn: (channel: string) => string}

// NonNullable<T> 从 T 中剔除 null 和 undefined
// ReturnType<T> 获取函数返回值类型
// InstanceType<T> 获取构造函数类型的实例类型


// TODO is 关键字
// is 关键字: 用于函数返回值类型中, 判断参数是否属于某一类型, 并根据结果返回对应的布尔类型
// 语法: prop is type
// function isString(s: unknown): boolean {
//     return typeof s === 'string'
// }
const isString = (s: unknown): s is string => typeof s === 'string';

function toUpperCase(x: unknown) {
    if (isString(x)) {
        x.toUpperCase();
    }
}

const isType = (function () {
    const toString = Object.prototype.toString;
    return function (val: unknown, type: string): boolean {
        return toString.call(val) === `[object ${type}]`
    }
})()

// TODO infer 关键字
// 在条件类型表达式中, 可以在 extends 条件语句中使用 infer 关键字来生命一个待推断的类型变量
// ReturnType<T> 获取函数返回值类型
const add = (x: number, y: number) => x + y;
export type t = ReturnType<typeof add>;
// number
// 实现源码
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// inter 的作用是让 TypeScript 自己推断, 并将推断结果存储到一个类型变量中, infer 只能用于 extends 语句中

// inter 实现元组转联合类型
type Flatten<T> = T extends Array<infer U> ? U : never;
export type F0 = [string, number];
export type F1 = Flatten<F0>;
// string | number






