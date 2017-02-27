## Learn JS NoteBook

### 基本概念

1.变量：

(1)js的变量是松散类型的，可以用来保存任何类型的数据。定义变量要用var操作符。
```javascript
var a = 1;
var a = "abc";
var a = 1,b = "a";
```

(2)用var修饰和不用var修饰的变量区别：

使用`var`操作符定义的变量将成为定义该变量作用域的局部变量。
```javascript
function test(){
            message = "hi";
        }
        test();
        alert(message);
```
使用var修饰的变量不可delete，无var修饰的变量可以delete


2.数据类型

(1)js中有5种基本数据类型：Undefined,Null,Boolean,Number,String.
还有一种复杂数据类型Object(无序的名值)
i
(2)typeof操作符测试变量的数据类型,括号可以不写
undefined：这个值未定义
boolean：布尔值
string：字符串
number:数值
object：对象或者null
function:这个值是函数

```javascript
    function test(){
            var message = "hi",age = 29;
            var b;
            alert(c);//报错
            alert(typeof b);//undefined
            alert(typeof c);//undefined
        }
        test();
```

(3)var修饰的变量在函数内的定义是处处有定义的
```javascript
        var a = "abc";
        var b = 1;
        c= 2;
        function test(){
            alert(a);//undefined
            alert(b);//1
            alert(c);//2
            var a = "bcd";
            b = 2;
            c =3;
            alert(a);//bcd
            alert(b);//2
            alert(c);//3
        }
        test();
        //以上代码相当于在函数test()函数的第一行自动添加 var a;
   ```

(4)null和undefined在用==判断总是想等，返回true;
```javascript
 var a = null;
        function test(){
            var message = "hi",age = 29;
            var b;
            alert(b==a); //true;
        }
        test();
```

(5)NaN,Infinity,-Infinity
```javascript
    var a =1/0;
    alert(a);
    var b = -1/0;
    alert(b);
    alert(isNaN(NaN));
    alert(isNaN("10"));
    alert(isNaN("abc"));
    alert(isNaN(true));
    var s = "sd";
    alert(s/2);
```

4.操作符与语句(略)

`==`和`===`

逗号操作符
```javascript
    function test(){
        var a = (1,2,3,4);
        alert(a);
    }
    test(); //4
```
`for-in`语句：循环输出的属性名顺序是不可预测的
```javascript
    function test(){
//        var a = [1,2,3,4,5,6];
//        for(var b in a){
//            alert(a[b]);
//        }
        var person = {
            name:"Mike",
            age:29,
            5:true
        }
        for(var b in person){
            alert(person[b]);
        }
    }
    test();
```

5.函数
(1)理解参数
js函数不介意传递进来多少个参数，也不在乎参数的类型，固没有重载的概念。也就是说
，即使你定义的函数只能传递只接收两个参数，在调用这个函数时也未必传递两个参数。
在函数体内，可以通过arguments对象访问参数数组，即第一个元素就为arguments[0].

(2)当没有参数时，小括号可以省略`var person = new Object;`

### 变量，作用域和内存问题

1.复制变量值
```javascript
        var person = new Object();
        person.name = "Mike";
        var p = person;
        p.name = "Jack";
        alert(person.name);
        alert(p.name);
```

2.没有块级作用域，对应`var修饰的变量在函数内的定义是处处有定义的`
```javascript
function test(){
            var a = 1;
            if(a==1){
                var b = 2;
            }
            alert(b);
        }
        test();
```

### 引用类型

1.创建Object实例的方法

(1)new操作符后跟Object构造函数
```javascript
 var person = new Object();
 person.name = "Mike";
 person.age = 29;
 var s = "name";
 alert(person["name"]);
 alert(person.name);
 alert(person[s]);
```

(2)对象字面量表示法
```javascript
var person = {
    name:"Mike",
    age:29,
    5:true   //数值属性会自动转换成字符串
}
var p = {};  //相当于var p = new Object();
```

2.Array类型(数组)

创建数组的方式
(1)使用Array构造函数
```javascript
var a = new Array();
var b = new Array(20);
var c = new Array("Mike");
var d = new Array(1,2,3,4,5);
```
(2)数组字面量表示法
```javascript
var colors = ["red","blue","green"];
var a = [];
```
数组length属性
数组的length不是只读的，可以设置这个属性进行移除,增加项
```javascript
var colors = ["red","blue","green"];
colors.length = 2;
alert(colors[2]);
colors[colors.length] = "brown";
alert(colors[2]);
```

栈方法，队列方法
push,pop
push,shift

重排序方法
reverse:反转数组
sort：根据字符串升序排序

toString,valueOf,join方法

concat,splice,indexOf方法

(3)迭代方法
filter()方法:对数组每一项运行给定函数，返回true项返回的数组
```js
 var a = [1,2,3,4,5];
    var b = a.filter(function(c){
        if(c>2) return true;
    })
    alert(b);
```
map()方法:对数组每一项运行给定函数，返回每次函数调用的结果组成的数组
```js
    var a = [1,2,3,4,5];
    var b = a.map(function(c){
        return c+1;
    })
    alert(b);
```
every()方法：对数组每一项运行给定函数，如果每一项返回true，则返回true
some()方法：对数组每一项运行给定函数，如果任意一项返回true，则返回true
forEach()方法：对数组每一项运行给定函数，无返回值，相当于遍历数组。
3.Function类型

(1)js里Function就是个对象，因此函数名就是指向函数对象的指针，不会与某个函数绑定
```javascript
function f1(num1,num2){   //函数声明定义函数
            return num1 + num2;
        }
        var a = f1;
        alert(a(10,10));
var sum = function(num1,num2){  //函数表达式定义函数
            return num1 + num2;
        };
```

(2)函数声明与函数表达式
解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。
解析器会率先读取函数声明，并使其在执行任何代码之前可用(可以访问),至于
函数表达式，则必须等到执行器执行到它所在的代码行，才会真正被解释执行。
```javascript
//以下代码完全可以正常运行
alert(sum(10,10));
function sum(num1,num2){
    return num1 + num2;
}
//以下代码会在运行期间产生错误
alert(sum(10,10));
var sum = function(num1,num2){
              return num1 + num2;
          };
```

(3)函数的内部属性：arguments和this

利用arguments.callee进行递归解耦

```javascript
function f1(num){ //输出0
            if(num<=1) return 1;
            else return num * f1(num-1);
        }
        var f2 = f1;
        f1 = function(num){
            return 0;
        }
        alert(f2(5));
function f1(num){//输出120
            if(num<=1) return 1;
            else return num * arguments.callee(num-1);
        }
        var f2 = f1;
        f1 = function(num){
            return 0;
        }
        alert(f2(5));
```

4.基本包装类型

(1)为了便于操作基本类型值，js还提供了3个特殊的的引用类型Boolean,Number,和String.

```javascript
var s1 = "Dumplings";
var s2 = s1.substring(2);
```
(2)引用类型与基本包装类型区别
```js
 var people = "sd";
 people.name = "Jack";
 alert(people.name);
```

(3)使用new调用基本包装类型和直接调用同名转型函数区别
```javascript
    function test(){
        var value = "25";
        var number = value; //(value);
        alert(typeof number); //string
        var num = new Number(25);
        alert(typeof num); //Object
    }
    test();
```

(4)Boolean类型
```javascript
    var f = new Boolean(false);
    var result = f && true;
    alert(result); //true
    var f = false;
    result = f && true;
    alert(result);  //false
```

(5)String类型
charAt charCodeAt concat slice substring substr indexOf lastIndexOf split localeCompare
对于`slice substring substr`，在传递给这些方法是负值的情况下，slice会将传入的负值与字符串的长度相加。
substr会将第一个参数加上字符串的长度，将第二个参数转换成0，substring会把所有参数转换成0。

```javascript
  var a = "abcdefgh";
    alert(a.slice(-3));
    alert(a.substring(-3));
    alert(a.substr(-3));
    alert(a.slice(3,-4));
    alert(a.substring(3,-4));
    alert(a.substr(3,-4));
```

### 面向对象
1.理解对象
```javascript
var person = {
       name:"Mike",
       age:22,
       sayName:function(){
           alert(this.name);
       }
   }
    person.sayName();
```
2.创建对象
(1)工厂模式
```javascript
   function createPerson(name,age,job){
       var o = new Object();
       o.name = name;
       o.age = age;
       o.job = job;
       o.sayName = function(){
           alert(this.name);
       }
       return o;
   }
    var p1 = createPerson(1,2,3);
    var p2 = createPerson(4,5,6);
```
无法搞清是哪个对象的实例
(2)构造函数模式
```javascript
 function Person(name,age,person){
        this.name = name;
        this.age = age;
        this.person = person;
        this.sayName = function(){
            alert(this.name);
        }
    }
    var p1 = new Person(1,2,3);
    var p2 = new Person(4,5,6);
```
sayName创建多次
```javascript
 function Person(name,age,person){
        this.name = name;
        this.age = age;
        this.person = person;
        this.sayName = sayName;
    }
    function sayName(){
        alert(this.name);
    }
    var p1 = new Person(1,2,3);
    var p2 = new Person(4,5,6);
    p1.sayName();
```
sayName在全局创建一次，内部sayName相当于指针
(3)原型模式
```javascript
 function Person(){
    }
    Person.prototype.name = "Mike";
    Person.prototype.age = 29;
    Person.prototype.job = "Engineer";
    Person.prototype.sayName = function () {
        alert(this.name);
    }
    var p1 = new Person();
    p1.age = 2222;
    alert(p1.age);
    alert(p1.hasOwnProperty("age"));
```
```javascript
function Person(){
    }
    Person.prototype = {
        name:"Mike",
        age:29,
        job:"engineer",
        sayName: function () {
            alert(this.name);
        }
    };
```
原型模式的问题
```javascript
function Person(){
    }
    Person.prototype = {
        name:"Mike",
        friends:["A","B"]
    };
    var p1 = new Person();
    p1.friends.push("C");
    var p2 = new Person();
    alert(p2.friends);
```
(4)组合使用构造函数模式和原型模式
```javascript
function Person(name,age,job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.friends = ["A","B"];
    }
    Person.prototype = {
        constructor:Person,
        sayName: function () {
            alert(this.name);
        }
    }
    var p1 = new Person("Mike",29,"engineer");
    var p2 = new Person("Jack",27,"student");
    p1.friends.push("C");
    alert(p1.friends);
    alert(p2.friends);
```
(5)动态原型模式
(6)寄生构造函数模式
(7)稳妥构造函数模式

3.继承
(1)原型链
```javascript
 function superType(){
        this.property = true;
    }
    superType.prototype.getSuperValue = function(){
        return this.property;
    }
    function SubType(){
        this.subproperty = false;
    }
    SubType.prototype = new superType();
    SubType.prototype.getSubValue = function () {
        return this.subproperty;
    }
    var instance = new SubType();
    alert(instance.getSuperValue());
    alert(instance.getSubValue());
```
原型链的问题
```javascript
function superType(){
        this.property = ["A","B"];
    }
    superType.prototype.getSuperValue = function(){
        return this.property;
    }
    function SubType(){
    }
    SubType.prototype = new superType();
    SubType.prototype.getSubValue = function () {
        return this.subproperty;
    }
    var instance1 = new SubType();
    instance1.property.push("C");
    var instance2 = new SubType();
    alert(instance2.property);
```
(2)借用构造函数
```javascript
  function sum(num1,num2){
        return num1 + num2;
    }
    function callSum1(num1,num2){
        return sum.call(this,num1,num2);
    }
    alert(callSum1(1,2));
```
```javascript
    var color = "red";
    var o = {color:"blue"};
    function sayColor(){
        alert(this.color);
    }
    sayColor.call(o);
```
```javascript
    function A(){
        this.colors = {"red","blue","green"};
    }
    function B(){
        A.call(this);
    }
    var instance1 = new B();
    instance1.colors.push("black");
    alert(instance1.colors);
    var instance2 = new B();
    alert(instance2.colors);
```

```javascript
function A(name){
        this.name = name;
        this.sayName = function(){
            alert("haha");
        }
    }
    function B(){
        A.call(this,"Mike");
        this.age = 29;
    }
    var instance = new B();
    instance.sayName();
```
(3)组合继承
使用原型链实现对原型属性和方法的继承，通过借用构造函数实现对实例属性的继承
```javascript
function A(name){
        this.name = name;
        this.colors = ["red","blue","green"];
    }
    A.prototype.sayName = function () {
        alert(this.name);
    };
    function B(name,age){
        A.call(this,name);
        this.age = age;
    }
    B.prototype = new A();
    var instance1 = new B("Mike",29);
    instance1.colors.push("black");
    alert(instance1.colors);
    var instance2 = new B("Jack",22);
    alert(instance2.colors);
```
(4)原型式继承
(5)寄生式继承
(6)寄生组合式继承

###函数表达式
1.匿名函数(拉姆达函数)

2.闭包
(1)闭包指有权访问另一个函数作用域中的变量的函数，创建闭包最常见的方式，就是在函数内部创建另一个函数
```javascript
function f1(p){
             return function (ob1,ob2){
                 var value1 = ob1[p];
                 var value2 = ob2[p];
                 if(value1<value2) return -1;
                 else if(value1>value2) return 1;
                 else return 0;
             };
         }
```
(2)闭包只能取得包含函数中任何变量的最后一个值，闭包所保存的是整个变量对象
```javascript
    function f1(){
        var result = new Array();
        for(var i = 0;i<10;i++){
            result[i] = function(){
                return i;
            }
        }
        return result;
    }
    var s = f1();
    for(var i = 0;i< s.length;i++){
        alert(s[i]());
    }
```

```javascript
    function f1(){
        var result = new Array();
        for(var i = 0;i<10;i++){
            result[i] = (function(num){
                return function () {
                    return num;
                };
            })(i);
        }
        return result;
    }
    var s = f1();
    for(var i = 0;i< s.length;i++){
        alert(s[i]());
    }
```

(3)匿名立即执行函数
```javascript
 var f1 = function(){
        alert("sdsad");
    };
    f1();
    (function(){
        alert("sdsad");
    }());
    (function(){
        alert("sdsad");
    })();
```

### BOM
BOM：Browser Object Model(浏览器对象模型)
1.window对象
window是BOM的核心对象，它表示一个浏览器的实例，既是js访问浏览器窗口的接口，
也是js规定的Global(全局)对象
(1)全局作用域
在全局作用域中声明的变量，函数都会变成window对象的属性和方法。
```javascript
    var age = 29;
    function sayAge(){
        alert(this.age);
    }
    alert(window.age);
    sayAge();
    window.sayAge();
    //age = 29 相当于 window.age = 29
```
window对象定义的属性可以delete,var定义的变量无法delete
```javascript
 var age1 = 1;
 window.age2 = 2;
 delete window.age2;
 alert(window.age2);
```
(2)窗口位置
```javascript
    var left = window.screenLeft;
        var tops = window.screenTop;
        alert(left);
        alert(tops);
```
(3)窗口大小
```javascript
        alert(window.innerHeight);
        alert(window.innerWidth);
        alert(window.outerHeight);
        alert(window.outerWidth);
```
(4)系统对话框
alert,confirm,prompt
```javascript
if(confirm("Are you ok")){
       alert("选择了是");
   }else {
       alert("选择了取消");
   }
   window.print();
```
```javascript
    var result = prompt("什么是一阶线性非齐次微分方程?","不会");
    if(result===null){
        alert("取消");
    }else{
        alert("Your answer is："+result);
    }
```
2.location对象
既是window对象的属性，又是document对象的属性
```javascript
 //window.location = "http://www.baidu.com";
    location.href = "http://www.baidu.com";
    document.location = "http://www.baidu.com";
```
3.navigator对象
包含浏览器的属性和方法，不同浏览器属性不同。例如产品名称，版本信息，浏览器主语言等等..

4.screen对象
表明客户端能力，不同浏览器属性不同，如屏幕像素高度，DPI(屏幕点数)属性等等..

5.history对象
保存用户上网的历史纪录
```javascript
    history.go(-1);//后退一页
    history.go(1);//前进一页
    history.go(2);//前进两页
```

### DOM
DOM：Document Object Model(文档对象模型)
DOM可以将任何HTML文档描绘成一个由多层节点构成的结构
```html
<html>
<head>
    <title>Sample Page</title>
</head>
<body>
<p>Hello World！</p>
</body>
</html>
```
文档节点是每个文档的根节点，以上文档结点只有一个子节点，即<html>元素，我们称
之为文档元素文档元素是文档的最外层元素，每个文档只能有一个文档元素,在HTML中
始终是<html>

(1)childNodes属性,nodeName,nodeType(节点类型的值),nodeValue(文本节点的值)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<script type="text/javascript">
    var a = document.documentElement;
    for(var i = 0;i< a.childNodes.length;i++){
        alert(a.childNodes[i].nodeName);
    }
</script>
</body>
</html>
```

浏览器兼容问题：重点，初学者先忽略。

(2)每个节点都有一个parentNode属性，指向文档树的父节点。
   包含在childNodes列表中的每个节点都是同胞兄弟，有相同的parentNode，
   并可以通过previousSibling和nextSibling属性访问同意列表其他结点，
   第一个结点的previousSibling属性为null，最后一个节点的nextSibling属性也为null

(3)操作结点
可以将DOM树看成由一系列指针连接起来，任何DOM结点不能同时出现在文档的多个位置
appendChild:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<p>123</p>
<p>456</p>
<p>789</p>
<script type="text/javascript">
    var a = document.body.firstChild.nextSibling;
    var b = a.nextSibling.nextSibling;
    var result = document.body.appendChild(b);
</script>
</body>
</html>
```
除了appendChild,还有insertBefore,replaceChild,removeChild,cloneNode
cloneNode接收一个参数，true，false。表示是否执行深复制(包含子节点true)，浅复制(不包含子节点false)

(4)Document类型
Document表示文档，document是HTMLDocument的一个实例，表示整个HTML页面,document也是window对象的
一个属性.可做全局对象来访问,Document结点具有以下属性
nodeType = 9;
nodeName = "\#document"
nodeValue = null;
parentNode = null;
ownerDocument(返回元素的根元素) = null;

`document.documentElement`,`document.body`获得对`<html>``<body>`的引用

`document.title`,`document.URL`

(5)查找元素
document.getElementById
document.getElementByTagName
namedItem
document.getElementByName
```javascript
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<p >123</p>
<p name = "myP">456</p>
<p>789</p>
<a href="http://www.baidu.com"></a>
<script type="text/javascript">
    var a = document.body.firstChild.nextSibling;
    var b = a.nextSibling.nextSibling;
    var c = document.getElementsByTagName("p");
    var d = document.getElementsByTagName("*");
    alert(c.namedItem("myP").childNodes[0].nodeValue);
    alert(d.length);
</script>
</body>
</html>
```
(6)文档写入`write`,`writeln`
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<p>123</p>
<p>456</p>
<p>789</p>
<script type="text/javascript">
    document.write("<strong>"+"fsdfdsfdsfdsf"+"</strong>")
</script>
</body>
</html>
```
(7)Element类型
具有以下特性：
nodeType = 1
nodeName = 标签名
nodeValue = null
parentNode = Document或Element

html元素
id,title,dir,className

取得属性`getAttribute`(可获取自定义属性),`setAttribute`,`removeAttribute`

创建元素
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<p id="a" dir="rtl" dd="adsad">123</p>
<p>456</p>
<p>789</p>
<script type="text/javascript">
    var div= document.createElement("div");
    div.id = "myDiv";
    document.body.appendChild(div);
</script>
</body>
</html>
```
(8)Text类型
Text结点具有以下特征
nodeType= 3;
nodeName = "\#text";
nodeValue = "包含的文本";
parentNode = 一个Element；
没有子节点

操作结点文本
```javascript
    var a = document.getElementById("a").childNodes[0];
    a.appendData("zzzz");
    a.deleteData(0,3);
    a.insertData(0,"0000");
    a.replaceData(0,3,"asdasd");
    a.splitText(1);
    a.substringData(1,2);
    alert(a.nodeValue);
    a.length;
```
创建文本节点
```js
    var a = document.getElementById("a");
    var t = document.createTextNode("Hello world");
    a.appendChild(t);
```
(9)Comment类型
注释在DOM中是通过Comment类型来表示的
具有以下特征
nodeType = 8;
nodeName = "\#comment"
nodeValue = 注释的内容
parentNode = Document或Element
没有子节点

Comment与Text具有相同的基类，因此操作方法相似
(10)DocumentType类型：包含着与文档doctype有关的信息
(11)DocumentFragment类型：文档片段
```javascript
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<ul id="myList"></ul>
<script type="text/javascript">
    var fra = document.createDocumentFragment();
    var ul = document.getElementById("myList");
    var li = null;
    for (var i = 0; i < 3; i++) {
        li = document.createElement("li");
        li.appendChild(document.createTextNode("Item"+(i+1)));
        fra.appendChild(li);
    }       
    ul.appendChild(fra);
</script>
</body>
</html>
```
(12)Attr类型
元素的特性在DOM中以Attr类型表示，不推荐使用，推荐`setAttribute`,`getAttribute`,`removeAttribute`

### DOM扩展

1.CSS选择符

querySelector()方法：返回匹配的第一个元素
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<p class="a">123</p>
<p class="a">456</p>
<p>789</p>
<script type="text/javascript">
    var body = document.querySelector("body");
    var a = document.querySelector(".a");
    alert(a.nodeName);
</script>
</body>
</html>
```

querySelectorAll()方法：返回匹配元素的NodeList.

2.预防空格的元素遍历

childElementCount：返回子元素个数，不包含文本节点和注释

firstElementChild：指向第一个子元素，对比于firstChild

lastElementChild, previousElementSibling, nextElementSibling

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<p class="a">123</p>
<p class="a">456</p>
<p>789</p>
<script type="text/javascript">
    var a = document.body;
    alert(a.firstElementChild.nodeName);
</script>
</body>
</html>
```

3.HTML5新增

getElementByClassName()方法
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<div class="a" id="q">
    aaa
    <div class="b">
       b1b1b1
        <div class="b">
            b2b2b2
        </div>
    </div>
</div>
<div class="c">
    ccccc
    <div class="b">cbcbcb</div>
</div>
<script type="text/javascript">
   // var a = document.getElementsByClassName("a");
    //var a = document.getElementsByClassName("a b");
 //  var a = document.getElementById("q").getElementsByClassName("b");
 //  alert(a[1].childNodes[0].nodeValue);
</script>
</body>
</html>
```

焦点管理
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<button id="a">Button</button>
<script type="text/javascript">
    var a = document.getElementById("a");
    a.focus();
    alert(document.activeElement == a);
</script>
</body>
</html>
```

自定义数据属性
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<button id="a" data-age="17">Button1</button>
<script type="text/javascript">
   var a = document.getElementById("a");
   alert(a.dataset.age);
</script>
</body>
</html>
```

4.插入标记
**innerHTML**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<p id="a">111</p>
<script type="text/javascript">
    var b = document.getElementById("a");
    b.innerHTML = "<strong>asdasd</strong>";
</script>
</body>
</html>
```
**outerHTML**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<p id="a">111</p>
<script type="text/javascript">
    var b = document.getElementById("a");
    alert(b.outerHTML);
    b.outerHTML = "<div>222</div>"
</script>
</body>
</html>
```
5.scrollIntoView()

6.children属性
只包含元素子节点

7.插入文本
**innerText** 和 **outerText**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<p>pppp</p>
<div>divdivdiv</div>
<script type="text/javascript">
  var a = document.body;
  a.innerText = "newText";
    alert(a.innerText);
</script>
</body>
</html>
```

### DOM2和DOM3

1.访问元素的样式
任何支持style特性的HTML元素在js中都对应一个style属性。对于使用短划线(如`background-image`)的CSS属性，
必须将其转换成驼峰大小写形式。
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
    <style>
        #a{
            width:200px;
            height:200px;
            background-image: url("");
        }
    </style>
</head>
<body>
<div id="a">
    aaaaaaaaaaa
</div>
<script type="text/javascript">
    var a = document.getElementById("a");
    a.style.width = "300px";
    a.style.border = "5px solid black";
    a.style.backgroundImage = "url('aaa')";
    alert(a.style.width);
</script>
</body>
</html>
```
多数情况下，都可以简单地转换属性名来实现转换，有一个特殊的属性float，由于float是js中的保留字，
因此不能用作属性名。属性名为cssFloat(Firefox,Safari,Opera,Chrome),IE为styleFloat.

2.元素大小
(1)偏移量
offsetHeight:元素在垂直方向上占用的空间大小
offsetWidth:元素在水平方向上占用的空间大小
offsetLeft:元素的左外边框至包含元素左内边框之间的像素距离
offsetTop:元素的上外边框至包含元素的上内边框之间的像素距离
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
    <style>
        #a{
            width:200px;
            height:200px;
            background: blue;
        }
        #b{
            width:200px;
            height:200px;
            margin-top: 20px;
            background: red;
        }
    </style>
</head>
<body>
<div id="a" style="width: 300px">
    aaaaaaaaaaa
    <div id="b">
        bbbbbbbbbbb
    </div>
</div>
<script type="text/javascript">
    var a = document.getElementById("a");
    var b = document.getElementById("b");
    alert(b.offsetTop);
</script>
</body>
</html>
```
(2)客户区大小
clientHeight:元素内容区高度加上上下内边距的高度
clientWidth:元素内容区宽度加上左右边距的宽度

(3)滚动大小
scrollLeft  scrollTop
```javascript
    document.body.scrollTop = 250;
    alert(document.body.scrollTop);
```

### ES6入门

1.ECMAScript和JavaScript的关系

1996年11月，JavaScript的创造者Netscape公司，决定将JavaScript提交给国际标准化组织ECMA，
希望这种语言能够成为国际标准。

次年，ECMA发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语
言称为ECMAScript，这个版本就是1.0版。该标准从一开始就是针对JavaScript语言制定的，但是之
所以不叫JavaScript，有两个原因。一是商标，Java是Sun公司的商标，根据授权协议，只有Netsca
pe公司可以合法地使用JavaScript这个名字，且JavaScript本身也已经被Netscape公司注册为商标。
二是想体现这门语言的制定者是ECMA，不是Netscape，这样有利于保证这门语言的开放性和中立性。

因此，ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现。
在日常场合，这两个词是可以互换的。

2.let和const命令
(1)块级作用域
```javascript
    function test(){
        var a = 1;
        if(a==1){
            var b = 2;
            let c = 3;
        }
        alert(b);
        alert(c);
    }
    test();
```
```javascript
function test(){
        for(var i =0;i<3;i++){
            alert("haha");
        }
        alert(i);
    }
    test();
```
(2)let无变量提升现象
```javascript
    function test(){
        alert(a);
        alert(b);
        var a = 1;
        let b = 2;
    }
    test();
```

(3)暂时性死区
只要块级作用域内存在let命令，它所声明的变量就“绑定”这个区域，不再受外部的影响。

(4)const
const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。

(5)let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。

ES6推荐使用let取代var声明变量

3.变量的解构赋值(模式匹配)
(1)数组和对象的解构赋值
```javascript
    var [a,b,c] = [1,2,3];
    alert(a);
```
```javascript
    var [a,[b,c],d] = [1,[2,3],4];
    var {a,b} = {a:1,b:2};
    let [{a,b},[c,d]] = [{a:1,b:2},[3,4]];
    function f1(a,b,c){
        return [a,b,c];
    }
    var [i,j,k] = f1(1,2,3);
    var [a = 1,b] = ["123",2];
```
(2)用途
交换变量的值
```js
[x,y] = [y,x];
```
函数返回多个值
```js
    function f1(a,b,c){
        return [a,b,c];
    }
    var [x,y,z] = f1(1,2,3);
    alert(x);
    function f2(a,b){
        return {name:a,age:b};
    }
    var {name,age} = f2("Mike",17);
    alert(name);
```

4.字符串的扩展
(1)for..of遍历
```js
    var s ="abcdefg";
    for(let a of s){
        alert(a);
    }
```
(2)charAt()方法
(3)repeat()方法

5.函数的拓展
(1)形参默认值
(2)拓展运算符`...`
将数组转为用参数分隔的参数序列
```js
    let a = [1,2,3,4];
    let b = [1,2,3,4,5,6,7];
    let c = a.concat([5,6,7]);
    let d = [...a,5,6,7];
    alert(b);
    alert(c);
    alert(d);
```
并推荐使用`...`拷贝数组
(3)箭头函数
ES6允许用`=>`定义函数
```js
 var f1 = function(v){
        return v;
    }
    var f = (v) => v;
    alert(f(1));
    alert(f1(1));
    var f = (a) => {a = 1;return a};
        alert(f(4));
```
作用：简化回调函数
```js
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});
// 箭头函数写法
[1,2,3].map(x => x * x);
```
匿名立即执行函数推荐写成箭头函数的形式。
```js
(() => {
  alert('Hello!');
})();
```

6.Class
(1)对比于ES5之前创建类的方法，更加简单易懂，
ES6推荐使用Class取代`prototype`的操作
```javascript
    class People{
        constructor(name,age){
            this.name = name;
            this.age = age;
        }
        sayHello(){
            alert("Hello");
        }
        toString(){
            return "名字是："+this.name+","+"年龄是："+this.age;
        }
    }
    var a = new People(1,1);
    a.sayHello();
```
(2)继承,ES6推荐使用extends语法糖取代原型链等复杂的方式
```js
    class People{
        constructor(name,age){
            alert("父类构造！")
            this.name = name;
            this.age = age;
        }
        sayHello(){
            alert("Hello");
        }
        toString(){
            return "名字是："+this.name+","+"年龄是："+this.age;
        }
    }
    class Student extends People{
        constructor(name,age,stuId){
            super(name,age);
            this.stuId =stuId;
            alert("子类构造！");
        }
    }
    var a = new Student("Mike",19,20155555);
    alert(a.stuId);
```

### 事件
1.事件流
(1)事件冒泡
div -> body -> html -> Document
2.事件处理程序
事件就是用户或浏览器自身执行的某种动作。诸如click,load等，都是事件的名字。
而响应某个事件的函数就叫做事件处理程序。事件处理程序的名字以"on"开头，因此click
时间的处理程序就是onclick，load事件的处理程序就是onload。
(1)HTML事件处理程序(不推荐)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<button onclick="f1()">Button</button>
<script type="text/javascript">
    function f1(){
        alert('点击事件！')
    }
</script>
</body>
</html>
```
(2)DOM0级事件处理程序
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<input type="button" id="myBtn" value="Button"/>
<script type="text/javascript">
    var a= document.getElementById("myBtn");
    a.onclick = function(){
        alert(this.id);
    }
    a.onclick = null; //删除事件处理程序
</script>
</body>
</html>
```
(3)DOM2级事件处理程序
DOM2级事件包括三个阶段，事件捕获阶段，处于目标阶段和事件冒泡阶段。
DOM2级事件定义了两个方法，用于处理指定和删除事件处理程序的操作：`addEventListener()`和
`removeEventListener`
```js
var a= document.getElementById("myBtn");
    a.addEventListener("click",function(){
        alert(this.id);
    })
```
removeEventListener无法移除匿名函数
```js
    var a= document.getElementById("myBtn");
    var f1 = function(){
        alert(this.id);
    }
    a.addEventListener("click",f1);
```
(4)IE事件处理程序(支持的只有IE和Opera)
IE实现了与DOM中类似的两个方法，`attachEvent()`和`detachEvent`.这两个方法接受相同
的两个参数。

3.事件对象
(1)DOM中的事件对象
在触发DOM上的某个事件时，会产生一个事件对象`event`，这个对象中包含着所有与事件有关的信息，
包括事件的元素，事件的类型以及其他与特定事件相关的信息。而`this`始终等于处理事件的那个元素。
(2)IE中的事件对象

4.事件类型
(1)UI事件：当用户与页面上的元素交互时触发
(2)焦点事件：当元素获得或失去焦点
(3)鼠标事件：当用户通过鼠标在页面上执行操作时触发
(4)滚轮事件：当使用鼠标滚轮时触发
(5)文本事件：当在文档中输入文本时触发
(6)键盘事件：当用户通过键盘在页面上执行操作时触发
(7)合成事件：当为IME(输入法编辑器)输入字符时触发
(8)变动事件：当底层DOM结构发生变化时触发
除了这几类事件，HTML5也新增定义了一组事件。

(1)UI事件
UI事件指的是那些不一定与用户操作有关的事件。
load：当页面完全加载后在window上面除法触发,window对象上发生的
```js
window.onload = function(){
        var a = document.getElementById("myBtn");
        alert(a);
    };
```
resize:当窗口或框架的大小发生变化时在window或框架上面触发
```js
 window.addEventListener("resize", function () {
        alert("Resize");
    })
```
scroll:当页面滚动位置发生变化时触发

(2)焦点事件：
blur:当元素失去焦点时触发，该事件不会冒泡
focus:当元素获得焦点时触发，该事件不会冒泡
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
姓名：<input id="name" type="text"/>
学号：<input id="stuId" type="text"/>
<script>
    document.getElementById("name").onfocus = function () {
        alert("focus");
    }
    document.getElementById("name").onblur = function () {
        alert("Blur");
    }
</script>
</body>
</html>
```
```html
document.getElementById("name").onblur = function () {
        if(this.value ==""){
            alert("不能为空！");
            document.getElementById("name").focus();
        }
    }
```
(3)鼠标与滚轮事件
click：单击主鼠标(左键)时触发
dblclick:双击主鼠标(左键)时触发
mouseover:鼠标移入触发
mouseout:鼠标移出触发
mousedown:用户按下任意鼠标按钮时触发
```js
document.getElementById("name").onmousedown = function(){
        alert(event.button);
    }
```
获取鼠标在视口位置`event.clientX`,`event.clientY`
获取鼠标在页面位置`event.pageX`,`event.pageY`

mousewheel:当用户通过鼠标滚轮与页面交互，在垂直方向上滚动页面时触发
wheelDelta是120的倍数
```js
 document.body.onmousewheel = function () {
        alert(event.wheelDelta);
    }
```
(4)键盘与文本事件
keydown:当用户按下键盘上的任意键时触发,按住不放会重复触发此事件
keypress:当用户按下键盘上的字符键时触发,按住不放会重复触发此事件
keyup:当用户释放键盘上的按键时触发
textInput:在文本插入文本框前触发此事件(DOM3级事件),输入的字符`event.data`
当用户按了键盘上的字符集键时，首先会触发keydown事件，紧接着是keypress，最后是keyup事件
键码：`event.keyCode`
(5)HTML5事件
contextmenu事件：通过右键调出上下文菜单
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<div id="myDiv" style="width: 800px;height: 800px;background-color: #ccc">右键</div>
<ul id="myMenu" style="width:50px;position: absolute;visibility: hidden;background-color: red;z-index: 12">
    <li><a href="">1</a></li>
    <li><a href="">2</a></li>
    <li><a href="">3</a></li>
</ul>
<script>
    window.onload = function(){
        var div = document.getElementById("myDiv");
        div.oncontextmenu = function () {
            event.preventDefault(event);
            var menu = document.getElementById("myMenu");
            menu.style.left = event.clientX + "px";
            menu.style.top = event.clientY + "px";
            menu.style.visibility = "visible";
        };
        document.addEventListener("click",function(){
            document.getElementById("myMenu").style.visibility = "hidden";
        });
    }
</script>
</body>
</html>
```
(2)HTML5拖放事件

5.模拟事件
UIEvents:一般化UI事件
MouseEvents:一般化鼠标事件
MutationEvents:一般化DOM变动事件
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<div id="myDiv" style="width: 800px;height: 800px;background-color: #ccc">右键</div>
<script>
    var a = document.getElementById("myDiv");
    a.onclick = function(){
        alert("click");
    }
    var event = document.createEvent("MouseEvents");
    event.initEvent("click");
    a.dispatchEvent(event);
</script>
</body>
</html>
```

### 表单脚本
1.表单独有的属性和方法
(1)action:接受请求的URL
(2)name:表单的名称
(3)reset():将所有表单域重置为默认值
(4)submit():提交表单
2.提交表单和阻止表单提交
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<form id="myForm" action="index.html">
    <input type="submit" value="提交"/>
</form>
<script>
    document.getElementById("myForm").onsubmit = function(){
       event.preventDefault(event);
        // return false;
    }
</script>
</body>
</html>
```
3.表单重置和阻止表单重置`reset`
4.表单字段
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<form id="myForm" action="index.html">
    姓名：<input type="text"/>
    性别：<input type="radio" name="sex"/>男 <input type="radio" name="sex"/>女
    <input type="submit" value="提交"/>
</form>
<script>
    var myForm = document.getElementById("myForm");
    alert(myForm.elements[3].nodeName);
</script>
</body>
</html>
```
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<form id="myForm" action="index.html">
    姓名：<input type="text" name="myName"/>
    性别：<input type="radio" name="sex"/>男 <input type="radio" name="sex"/>女
    <input type="submit" value="提交"/>
</form>
<script>
    var myForm = document.getElementById("myForm");
    alert(myForm.elements["myName"].nodeName);
</script>
</body>
</html>
```
5.表单字段属性
(1)disable:布尔值，表示是否被禁用
(2)form:指向当前所在表单
(3)name:当前字段名称
(4)readOnly:布尔值,当前字段是否只读
(5)type:当前字段的类型(checkbox，radio等)
(6)value:当前字段的value值

6.必填字段`required`

7.选择框脚本
选择框是通过`<select>`和`<option>`元素创建的

(1)选择框的属性和方法
add(newOption,relOption)
multiple:布尔值，是否允许多项选择
options:所有options的集合
remove(index):移除指定位置选项
selectedIndex:选中索引，没有返回-1
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<form id="myForm" action="index.html">
    <select name="city" id="city" >
        <option value="Harbin">哈尔滨</option>
        <option value="Beijing" selected>北京</option>
    </select>
    <input type="submit" value="提交"/>
</form>
<script>
    var myForm = document.getElementById("myForm");
    var a = myForm.elements[0];
    alert(a.selectedIndex);
</script>
</body>
</html>
```
(2)option元素属性
index:所在索引
selected:布尔值,是否被选中
text:选项的文本
value:选项的value值

### 定时器
1.理解js的单线程`setTimeout`和`setInterval`
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<button id="myBtn">Button</button>
<script>
    var a = document.getElementById("myBtn");
    a.onclick = function(){
        setTimeout(function(){
            alert("定时器");
        },1000);
    };
</script>
</body>
</html>
```
2.重复的定时器
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<button id="myBtn">Button</button>
<script>
    var a = document.getElementById("myBtn");
    a.onclick = function(){
        setTimeout(function(){
            alert("定时器");
            setTimeout(arguments.callee,1000);
        },1000);
    };
</script>
</body>
</html>
```
3.定时器制作动画
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<button id="myBtn" style="width: 50px;height: 50px;background-color: red;border: none">Button</button>
<script>
    var a = document.getElementById("myBtn");
    a.onmouseover = function () {
            setTimeout(function () {
                if (parseInt(a.style.width) < 900) {
                    a.style.width = parseInt(a.style.width) + 10 + "px";
                    setTimeout(arguments.callee, 20);
                }
            }, 20);
    };
</script>
</body>
</html>
```

### 拖放
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
</head>
<body>
<div id="myDiv" class="draggable" style="width: 100px;height: 100px;position: absolute;background-color: red"></div>
<script>
    var DragDrop = function DragDrop(){
        var dragging = null;
        var diffX = 0;
        var diffY = 0;
        function handleEvent(event){
            var target = event.target;
            switch (event.type){
                case "mousedown":
                    if(target.className.indexOf("draggable")>-1){
                        dragging = target;
                        diffX = event.clientX - target.offsetLeft;
                        diffY = event.clientY - target.offsetTop;
                    }
                    break;
                case "mousemove":
                    if(dragging!=null){
                        dragging.style.left = (event.clientX-diffX) + "px";
                        dragging.style.top = (event.clientY-diffY) + "px";
                    }
                    break;
                case "mouseup":
                    dragging = null;
                    break;
            }
        };
        return{
            enable:function (){
                document.addEventListener("mousedown",handleEvent);
                document.addEventListener("mousemove",handleEvent);
                document.addEventListener("mouseup",handleEvent);
            },
            disable:function(){
                document.removeEventListener("mousedown",handleEvent);
                document.removeEventListener("mousemove",handleEvent);
                document.removeEventListener("mouseup",handleEvent);
            }
        }
    };
    DragDrop().enable();
</script>
</body>
</html>
```

### CSS3动画
1.rotate()
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
    <style>
        .a{
            width: 100px;
            height: 100px;
            background: #ccc;
        }
        .a:hover{
            -ms-transform: rotate(30deg);		/* IE 9 */
            -webkit-transform: rotate(30deg);	/* Safari and Chrome */
            -o-transform: rotate(30deg);		/* Opera */
            -moz-transform: rotate(30deg);		/* Firefox */
        }
    </style>
</head>
<body>
<div class="a"></div>
</body>
</html>
```
```js
  var a = document.getElementsByClassName("a")[0];
  a.onclick = function(){
      a.style.width = "200px";
      a.style.webkitTransition = "width 2s";
  }
```
2.`translate(50px,100px)`:左侧移动50px,顶部移动100px
3.`scale(2,4)`:把宽度转换为原始尺寸的2倍，把高度转换为原始高度的4倍。
4.`skew(30deg,20deg)` 围绕X轴把元素翻转30度，围绕Y轴翻转20度。
5.`rotateX()` 元素围绕其X轴以给定的度数进行旋转。`-webkit-transform: rotateX(90deg);`
6.过渡`transition`
7.`@keyframes`定义动画
用百分比来规定变化发生的时间
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
    <style>
        @-webkit-keyframes myfirst
        {
            0%   {background: red;}
            25%  {background: yellow;}
            50%  {background: blue;}
            100% {background: green;}
        }
        .a{
            width: 100px;
            height: 100px;
            background: #ccc;
        }
        .a:hover{
            -webkit-animation: myfirst 5s;
            -webkit-animation-iteration-count: infinite;
        }
    </style>
</head>
<body>
<center><div class="a"></div>
</center>
</body>
</html>
```
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sample Page</title>
    <style>
        @-webkit-keyframes myfirst /* Safari 和 Chrome */
        {
            0%   {background: red; left:0px; top:0px;}
            25%  {background: yellow; left:200px; top:0px;}
            50%  {background: blue; left:200px; top:200px;}
            75%  {background: green; left:0px; top:200px;}
            100% {background: red; left:0px; top:0px;}
        }
        .a{
            position: absolute;
            width: 100px;
            height: 100px;
            background: #ccc;
        }
        .a:hover{
            -webkit-animation: myfirst 5s;
            /*播放次数*/
            -webkit-animation-iteration-count: infinite;
            /*第二次是否逆序播放*/
            -webkit-animation-direction:alternate;
        }
    </style>
</head>
<body>
<center><div class="a"></div>
</center>
</body>
</html>
```