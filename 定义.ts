// https://24kcs.github.io/vue3_study/
// 1.类型注解：一种轻量级为函数或者变量添加约束
// 2.接口：是一种能力，一种约束，定义对象、函数、类等类型
// 3.类：和接口类似，对es6类的约束

/**
 * 常用语法
 */
// 1.基础类型
(() => {
  /* 布尔 */
  var bool:boolean = false;
  bool = true;
  bool = 123;
  bool = '123';
  /* 数字 在非严格模式可以把undefined和null赋值给number类型 */
  var num:number = 123;
  num = 456;
  num = '123';
  num = undefined;
  num = null;
  /* 字符串 */
  var str:string = '123';
  str = '456';
  str = 123;
  /* undefined和null */
  var ud:undefined = undefined;
  var nl:null = null;
  ud = null;
  nl = undefined;
  /* 数组(定义有两种方式) 1.在元素后面接上[]  2.泛型 */
  var arr1: number[] = [1, 2,3];
  arr1[1] = '5';

  var arr2: Array<number> = [1, 2, 3];
  /* 元组tuple 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同 */
  var t1:[string, number];
  t1 = ['1', 1];
  t1 = [1, '1'];
  t1.substring();

  /* 枚举 enum类型是对 JavaScript 标准数据类型的一个补充 */
  /* 默认情况下，从 0 开始为元素编号。 你也可以手动的指定成员的数值 */
  enum Color1 {
    Red,
    Green,
    Blue,
  };
  enum Color2 {
    Red = 1,
    Green,
    Blue,
  };
  enum Color3 {
    Red = 10,
    Green = 20,
    Blue = 30,
  };
  var myColor: Color1 = Color1.Red;

  /* any 动态变化的值 */
  var any:any = 123;
  any = '123';
  any = true;
  var arr: Array<any> = [100, 'xxx', true];

  arr[0].split(''); // 没有报错，any类型有优点，也有缺点
  /* void */
  function func():void {

  }
  /* object 除 number，string，boolean之外的类型 */
  function ff(object: object):object {
    return object;
  }
  ff(123);
  ff({x: 3, y: 4});

  /* 联合类型 */
  function getString(str: string | number):number {
    return str.toString().length;
  }
  getString('123');
  getString(123);
  getString(true);

  /* 类型断言 */
  function getLength (str: string | number):number {
    if ((<string>str).length) {
      return (str as string).length;
    } else {
      return str.toString().length;
    }
  }
  /* 类型推断(TS会在没有明确的指定类型的时候推测出一个类型) */
  let number = 123 // number
  let string = '123' // string
  number = '321';
  string = 321;
})();


// 2.接口 使用接口（Interfaces）来定义对象的类型
/* 可选属性,属性名后面加? */
/* 只读属性,属性名前加readonly */
(() => {
  /* 对象类型 */
  interface Person {
    readonly id: number,
    name: string,
    age: number,
    sex?: string,
  };

  var personOne:Person = {
    id: 1,
    name: '小甜甜',
    age: 20,
    sex: '女',
  };

  personOne.id = 2;
  personOne.money = 123123;

  /* 函数类型 */
  interface funcInter {
    (source: string, substring: string):boolean;
  };

  var functionType:funcInter = function(source: string, substring):boolean {
    return source.length > 10;
  }

  /* 类类型 */
  interface IFly {
    fly():void
  };

  interface ISwim {
    swim():void
  }

  class Person implements IFly, ISwim { // 一个类实现多个接口
    fly () {

    };
    swim () {

    };
  }

  
  interface Ability extends IFly, ISwim { // 接口继承接口

  }

  class Person2 implements Ability {
    fly () {

    };
    swim () {

    };
  }
})();


// 3.类
(() => {
  /* 普通类 */
  /* 继承 */
  /* 多态 */
  /* 修饰符 public--公共，所有位置都能访问、private--私有，只有内部可以访问、protected--受保护，内部和子类可以访问 */
  /* 只读属性 readonly */
  /* 存取器 get set */
  /* 静态成员 static--直接通过类访问，和实例无关  */
  /* 抽象类 使用abstract定义 */
  class Person {
    public readonly name:string
    private age:number
    protected sex:'string'
    public fullName: string
    static name2:string = '333';
    constructor (name, age, sex) {
      this.name = name; // 构造函数可以对只读属性修改
      this.age = age;
      this.sex = sex;
    };
    get FullName () { // 如果只有get只读
      return this.fullName;
    };
    set FullName (name) {
      this.fullName = name;
    }
    setName () {
      this.name = 'hello'; // 类中的普通函数，无法修改只读属性
    };
  };

  class Student extends Person{
    constructor (name, age, sex) {
      super(name, age, sex)
    }

    getAge () {
      return this.age; // private 私有的，只能父类内部访问
    }

    getSex () {
      return this.sex; // protected 父类和子类可以访问
    }
  };

  const student1:Student = new Student('hihi', 12, '男');
  
  console.log(student1.name); // 公共的，所有位置都能访问
  console.log(student1.age); // private，外部无法访问
  console.log(student1.sex) // protected，外部无法访问

  student1.name = 'hihihi'; // readonly 只读无法修改

  // get set存取器
  student1.FullName = 'hello word';
  console.log(student1.fullName);

  // 静态属性直接通过类访问
  console.log(Person.ccc);



  // 抽象类
  abstract class Animal {
    abstract cry () {  // 方法不能有任何内容的实现，是为了让子类实现具体内容

    }

    abstract jump ()

    run () {
      console.log('running');
    }
  }

  class Dog extends Animal {
    cry () {  // 子类必须实现抽象类中的抽象方法

    }
    jump () {
      console.log('crying');
    }
  }

  const pig = new Animal(); // 抽象类不能被实例化
})();


// 4.函数
(() => {
  /* 函数的类型 */
  function add1 (x, y) { // js命名函数
    return x + y;
  }

  let myAdd1 = function(x, y) { // js匿名函数
    return x + y;
  }

  function add2 (x: number, y: number): number { // ts命名函数
    return x + y;
  }

  let myAdd2 = function(x: number, y: number): number { // ts匿名函数
    return x + y;
  }

  /* 可选参数和默认参数 */
  function add3 (x: number = 1, y?: number): number { // 可选参数用?
    return y ? x + y : x;
  }

  /* 剩余参数 */
  function add4 (x: number = 1, ...args: number[]): number { // 剩余参数...
    return args ? x + args.reduce(((a:number, b:number):number => a + b), 0) : x;
  }

  /* 函数重载 */
  function add5(x: string, y: string): string;
  function add5(x: number, y: number): number;
  function add5 (x: number | string, y: number | string) {
    if (typeof x === 'string' && typeof y === 'string') {
      return x + y;
    } else if (typeof x === 'number' && typeof y === 'number') {
      return x + y;
    }
  }

  add5(1, 2);
  add5('x', 'y');

  add5(1, 'x');
})();

// 5.泛型 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。
(() => {
  /* 使用泛型 */
  function createArray <T> (value: T, num: number) {
    const arr:Array<T> = [];
    for(let i = 0; i <= num;i++) {
      arr.push(value);
    }
    return arr;
  }

  createArray<number>(100, 3);
  createArray<string>('200', 5);
  
  /* 多个泛型参数的函数 */
  function project <K, V> (k: K, v: V): [K, V] {
    return [k, v];
  }

  project<string, number>('1', 3);
})();

// 6.其他
(() => {
  /* 申明文件 declare */
  declare var jQuery: (selector: string) => any;
})();
