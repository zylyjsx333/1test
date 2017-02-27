## 百度前端技术学院任务提交代码及笔记

### About

我的团队：<a>http://ife.baidu.com/group/profile?groupId=2852</a>

最终任务已移至单独仓库：<a>https://github.com/yuanguangxin/Questionnaire</a>

还是决定从0基础开始做任务，通过这第一个最简单的连CSS都没有的任务，复习了基础知识，看了大家
的代码，知道了许多之前不知道的标签，发现大家每个人写的都不一样，都有自己的特色，或许这就是
前端的魅力吧。

### Label and Point
1.除了之前学习的有序列表`<ol>`和无序列表`<ul>`，还知道了自定义列表`<dl>`,自定义列表以`<dl>`标签开始。
  每个自定义列表项以`<dt>`开始。每个自定义列表项的定义以`<dd>`开始.
  ```html
  <dl>
    <dt>计算机</dt>
    <dd>用来计算的仪器 ... ...</dd>
    <dt>显示器</dt>
    <dd>以视觉方式显示信息的装置 ... ...</dd>
  </dl>
  ```
2.Html5语义化标签的使用，如`<nav>`标签，`<aside>`标签，`<time>`标签,`<article>`标签，`<header>`标签，以及`<figure>`,`<figcaption>`标签等.

3.利用 maxlength 和 minlength 属性来控制 input 标签输入的最大长度及最小长度.
```html
<input type="password" minlength="6" maxlength="16"/>
```

4.利用pattern属性匹配正则表达式来验证输入格式.
```html
<input type="password" pattern="[A-Za-z0-9\-]*" placeholder="这是一个只能输入英文字母和数字的密码输入框"/>
```

5.`font-variant` 和 `font-transform`的使用

(1)`font-variant` 属性设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，
   但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。
   ```css
   font-variant:small-caps  //浏览器会显示小型大写字母的字体。
   ```
(2)`text-transform` 属性控制文本的大小写
```css
text-transform:none; //文本中的每个单词以大写字母开头
text-transform:capitalize; //文本中的每个单词以大写字母开头
text-transform:uppercase; //定义仅有大写字母
text-transform:lowercase; //定义无大写字母，仅有小写字母
```

6.`box-sizing`的使用
为了简便计算，使用`box-sizing`,`box-sizing`元素的内边距和边框不再会增加它的宽度
```css
box-sizing:border-box;
```

7.`calc`的使用
同样为了简便计算，calc()能让你给元素的做计算，你可以给一个div元素，使用百分比、em、px和rem单位值计算出其宽度或者高度，比如说`width:calc(50% + 2em)`,
这样一来你就不用考虑元素DIV的宽度值到底是多少，而把这个任务交由浏览器去计算。
```css
	width: calc( 16.666% - 20px );
```


