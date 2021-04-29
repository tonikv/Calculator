(this.webpackJsonpcalculator_redux=this.webpackJsonpcalculator_redux||[]).push([[0],{16:function(n,t,e){},2:function(n,t,e){n.exports={container:"Calculator_container__mzWPR",buttons:"Calculator_buttons__3fg75",btn:"Calculator_btn___TiK2",spantwo:"Calculator_spantwo__2nzjG",red:"Calculator_red__1OPwm",display:"Calculator_display__ZdP0G",calculation:"Calculator_calculation__2WnWh",result:"Calculator_result__3Rr2n",operand:"Calculator_operand__pqqhX",footer:"Calculator_footer__3EiGu"}},24:function(n,t,e){},25:function(n,t,e){"use strict";e.r(t);var c=e(0),a=e.n(c),l=e(5),r=e.n(l),o=(e(16),e(4)),i=e(6),u=Object(i.b)({name:"calculator",initialState:{number:"",calculation:"",display:"",operand:"",result:"",previous:""},reducers:{addNumber:function(n,t){n.number+=t.payload},addPrevious:function(n,t){n.previous=t.payload},clearNumber:function(n){n.number=""},addToCalculation:function(n,t){n.calculation+=t.payload},removeFromCalculation:function(n,t){n.calculation=t.payload},clearCalculation:function(n){n.calculation=""},allClear:function(n){n.number="",n.calculation="",n.display="0",n.operand="",n.result="0"},addToDisplay:function(n,t){n.display=t.payload},clearDisplay:function(n){n.display=""},chooseOperand:function(n,t){n.operand=t.payload},clearOperand:function(n){n.operand=""},compute:function(n,t){n.result=t.payload},clearCompute:function(n){n.result=""}}}),s=u.actions,d=s.allClear,b=s.addNumber,j=s.addPrevious,f=s.clearNumber,p=(s.addToDisplay,s.clearDisplay,s.addToCalculation),m=s.removeFromCalculation,h=(s.clearCalculation,s.chooseOperand,s.clearOperand,s.compute),x=(s.clearCompute,function(n){return n.calculator.calculation}),C=function(n){return n.calculator.result},O=function(n){return n.calculator.display},v=function(n){return function(t,e){var c=e().calculator.number,a=function(n){return n.calculator.previous}(e()),l=x(e()),r=/[x\xf7+-]/;if("0"!==a||1!==c.length||"0"!==n)if("."===n&&c.includes("."))console.log("prevent multiple decimals in one number");else if(r.test(n)&&r.test(a)&&"-"!==n)console.log("only one operand");else{if("-"===a&&"-"===n){if("-"===l[l.length-2])return void console.log("Prevent triple ---");if(1===l.length)return void console.log("Cannot start with --")}r.test(n)?t(f()):t(b(n)),t(p(n)),t(j(n))}else console.log("prevent multiple zeroes in the beginning")}},_=u.reducer,N=e(2),k=e.n(N),g=e(1);function y(){var n=Object(o.c)(C),t=Object(o.c)(x),e=(Object(o.c)(O),Object(o.b)());return Object(g.jsxs)("div",{className:k.a.container,children:[Object(g.jsxs)("div",{className:k.a.display,children:[Object(g.jsx)("p",{id:"display",className:k.a.calculation,children:t}),Object(g.jsx)("h4",{className:k.a.result,children:n})]}),Object(g.jsxs)("div",{className:k.a.buttons,children:[Object(g.jsx)("button",{id:"seven",className:k.a.btn,onClick:function(){return e(v("7"))},children:"7"}),Object(g.jsx)("button",{id:"eight",className:k.a.btn,onClick:function(){return e(v("8"))},children:"8"}),Object(g.jsx)("button",{id:"nine",className:k.a.btn,onClick:function(){return e(v("9"))},children:"9"}),Object(g.jsx)("button",{id:"add",className:k.a.btn,onClick:function(){return e(v("+"))},children:"+"}),Object(g.jsx)("button",{id:"four",className:k.a.btn,onClick:function(){return e(v("4"))},children:"4"}),Object(g.jsx)("button",{id:"five",className:k.a.btn,onClick:function(){return e(v("5"))},children:"5"}),Object(g.jsx)("button",{id:"six",className:k.a.btn,onClick:function(){return e(v("6"))},children:"6"}),Object(g.jsx)("button",{id:"subtract",className:k.a.btn,onClick:function(){return e(v("-"))},children:"-"}),Object(g.jsx)("button",{id:"one",className:k.a.btn,onClick:function(){return e(v("1"))},children:"1"}),Object(g.jsx)("button",{id:"two",className:k.a.btn,onClick:function(){return e(v("2"))},children:"2"}),Object(g.jsx)("button",{id:"three",className:k.a.btn,onClick:function(){return e(v("3"))},children:"3"}),Object(g.jsx)("button",{id:"multiply",className:k.a.btn,onClick:function(){return e(v("x"))},children:"x"}),Object(g.jsx)("button",{id:"zero",className:k.a.btn,onClick:function(){return e(v("0"))},children:"0"}),Object(g.jsx)("button",{id:"decimal",className:k.a.btn,onClick:function(){return e(v("."))},children:"."}),Object(g.jsx)("button",{className:k.a.btn,onClick:function(){return e(function(n){return function(t,e){t(m(n.toString()))}}(n))},children:"ANS"}),Object(g.jsx)("button",{id:"divide",className:k.a.btn,onClick:function(){return e(v("\xf7"))},children:"\xf7"}),Object(g.jsx)("button",{className:"".concat(k.a.btn," ").concat(k.a.red),onClick:function(){return e((function(n,t){var e=x(t());if(0!==e.length){var c=e.slice(0,-1);n(m(c))}else console.log("Cannot delete")}))},children:"DEL"}),Object(g.jsx)("button",{id:"clear",className:"".concat(k.a.btn," ").concat(k.a.red),onClick:function(){return e(d())},children:"AC"}),Object(g.jsx)("button",{id:"equals",className:"".concat(k.a.btn," ").concat(k.a.spantwo),onClick:function(){return e((function(n,t){var e=/[x\xf7+-]/g,c=!1,a=x(t());if(0!==a.length){a[a.length-1].match(e)&&(a=a.slice(0,-1)),"-"===a[0]&&(a=a.substring(1),c=!0);var l=a.match(/--|\+-|x-|\xf7-|[x\xf7+-]/g),r=a.replace(/--/g,"-");r=(r=(r=r.replace(/\+-/g,"+")).replace(/x-/g,"x")).replace(/\xf7-/g,"\xf7");var o=[],i=r.split(e);if(1!==i.length){i.forEach((function(n){return o.push(parseFloat(n))}));var u=o[0];c&&(u=-u);for(var s=0,d=1;d<o.length;d++){var b=o[d];switch(s=u,l[d-1]){case"+":u=s+=b;break;case"-":u=s-=b;break;case"x":u=s*=b;break;case"\xf7":u=s/=b;break;case"+-":u=s+=-b;break;case"--":u=s-=-b;break;case"x-":u=s*=-b;break;case"\xf7-":u=s/=-b}}s%1!==0&&(s=s.toFixed(2)),n(h(s.toString()))}else n(h(i[0]))}}))},children:"="})]}),Object(g.jsx)("div",{className:k.a.footer,children:" Calculator by tonikv "})]})}e(24);var w=function(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(y,{})})},P=Object(i.a)({reducer:{calculator:_}});r.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(o.a,{store:P,children:Object(g.jsx)(w,{})})}),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.1776d7c1.chunk.js.map