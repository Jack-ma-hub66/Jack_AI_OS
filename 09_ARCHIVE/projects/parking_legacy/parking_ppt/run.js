const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = '购物中心停车场车流下降分析';

const C = {
  navy:"1E2761", navyDark:"141B4D", blue:"2E6DB4", blueLight:"4A90D9",
  orange:"E8703A", red:"C0392B", green:"27AE60", white:"FFFFFF",
  offWhite:"F7F8FA", lightGray:"E8ECF0", midGray:"94A3B8",
  darkGray:"334155", text:"1E293B", muted:"64748B",
};
const makeShadow = () => ({ type:"outer", blur:8, offset:2, angle:135, color:"000000", opacity:0.10 });

function addSlideHeader(sl, title, subtitle) {
  sl.background = { color: C.offWhite };
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.68, fill:{color:C.navy} });
  sl.addText(title, { x:0.4, y:0, w:7.5, h:0.68, fontSize:20, bold:true, color:C.white, fontFace:"Microsoft YaHei", valign:"middle" });
  sl.addText(subtitle, { x:7.6, y:0, w:2.2, h:0.68, fontSize:10, color:C.lightGray, fontFace:"Microsoft YaHei", align:"right", valign:"middle" });
}
function sBar(sl, x, y, w, label, color) {
  sl.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.3, fill:{color} });
  sl.addText(label, { x, y, w, h:0.3, fontSize:11, bold:true, color:C.white, fontFace:"Microsoft YaHei", valign:"middle", margin:8 });
}
function mCard(sl, x, y, w, h, label, v26, v25, delta, dc) {
  sl.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{color:C.white}, shadow:makeShadow() });
  sl.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.05, fill:{color:C.orange} });
  sl.addText(label,  { x:x+0.14, y:y+0.1,  w:w-0.28, h:0.26, fontSize:9.5, color:C.muted,  fontFace:"Microsoft YaHei" });
  sl.addText(v26,    { x:x+0.14, y:y+0.36, w:w-0.28, h:0.5,  fontSize:21,  bold:true, color:C.navy, fontFace:"Microsoft YaHei" });
  sl.addText("vs "+v25, { x:x+0.14, y:y+0.88, w:w-0.28, h:0.26, fontSize:9.5, color:C.muted, fontFace:"Microsoft YaHei" });
  sl.addText(delta,  { x:x+0.14, y:y+1.16, w:w-0.28, h:0.28, fontSize:11,  bold:true, color:dc, fontFace:"Microsoft YaHei" });
}
function hdr(cols, bg) {
  return cols.map(t=>({ text:t, options:{bold:true,color:C.white,fill:{color:bg},fontSize:9} }));
}

// SLIDE 1: 封面
let sl = pres.addSlide();
sl.background = { color: C.navyDark };
sl.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:3.5, h:5.625, fill:{color:C.navy} });
sl.addShape(pres.shapes.RECTANGLE, { x:3.5, y:0, w:0.06, h:5.625, fill:{color:C.orange} });
sl.addText("停车场", { x:0.4, y:0.8, w:2.8, h:0.6, fontSize:26, bold:true, color:C.orange, fontFace:"Microsoft YaHei" });
sl.addText("车流下降\n分析报告", { x:0.4, y:1.45, w:2.8, h:1.5, fontSize:30, bold:true, color:C.white, fontFace:"Microsoft YaHei", lineSpacingMultiple:1.25 });
sl.addText("对比周期", { x:0.4, y:3.2, w:2.8, h:0.28, fontSize:10, color:C.midGray, fontFace:"Microsoft YaHei" });
sl.addText("周期A：春节周期", { x:0.4, y:3.5, w:2.8, h:0.28, fontSize:11, bold:true, color:C.white, fontFace:"Microsoft YaHei" });
sl.addText("26年2月1日-2月23日 vs 25年1月12日-2月4日", { x:0.4, y:3.8, w:2.8, h:0.26, fontSize:8.5, color:C.lightGray, fontFace:"Microsoft YaHei" });
sl.addText("周期B：长周期（72天）", { x:0.4, y:4.1, w:2.8, h:0.28, fontSize:11, bold:true, color:C.white, fontFace:"Microsoft YaHei" });
sl.addText("26年2月1日-4月13日 vs 25年2月2日-4月14日", { x:0.4, y:4.38, w:2.8, h:0.26, fontSize:8.5, color:C.lightGray, fontFace:"Microsoft YaHei" });
sl.addText("分析维度总览（共8项）", { x:4.0, y:0.5, w:5.6, h:0.42, fontSize:15, bold:true, color:C.white, fontFace:"Microsoft YaHei" });
["一、车流规模","二、停车时长分布","三、净收入","四、免费用户（两维度）","五、优惠券使用","六、会员等级结构","七、商场客流 & 开车率","八、天气 & 政策影响"].forEach((d,i)=>{
  const x=i%2===0?4.0:7.05, y=1.05+Math.floor(i/2)*0.88;
  sl.addShape(pres.shapes.RECTANGLE, { x, y, w:2.85, h:0.68, fill:{color:C.navy}, shadow:makeShadow() });
  sl.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h:0.68, fill:{color:C.orange} });
  sl.addText(d, { x:x+0.16, y, w:2.65, h:0.68, fontSize:12, color:C.white, fontFace:"Microsoft YaHei", valign:"middle" });
});

// SLIDE 2: 车流规模
sl = pres.addSlide();
addSlideHeader(sl, "一、车流规模", "维度 1 / 8");
sBar(sl, 0.3, 0.82, 4.4, "周期A：春节周期（26年23天 vs 25年24天）", C.navy);
mCard(sl, 0.3,  1.20, 2.1, 1.6, "总车次（26年）",   "119,325","139,546","▼ 20,221（-14.5%）",C.red);
mCard(sl, 2.55, 1.20, 2.1, 1.6, "日均车次（26年）", "5,188",  "5,814",  "▼ 626（-10.8%）",  C.red);
sBar(sl, 5.3, 0.82, 4.4, "周期B：长周期（各72天）", C.blue);
mCard(sl, 5.3,  1.20, 2.1, 1.6, "总车次（26年）",   "337,910","339,406","▼ 1,496（-0.4%）", C.red);
mCard(sl, 7.55, 1.20, 2.1, 1.6, "日均车次（26年）", "4,693",  "4,714",  "▼ 21（-0.4%）",   C.red);
sl.addChart(pres.charts.BAR, [
  {name:"26年", labels:["总车次(A)","总车次(B)"], values:[119325,337910]},
  {name:"25年", labels:["总车次(A)","总车次(B)"], values:[139546,339406]},
], { x:0.3, y:3.0, w:9.4, h:2.4, barDir:"col",
  chartColors:[C.blueLight,C.lightGray], chartArea:{fill:{color:C.white}},
  catAxisLabelColor:C.muted, valAxisLabelColor:C.muted,
  valGridLine:{color:"E2E8F0",size:0.5}, catGridLine:{style:"none"},
  showValue:true, dataLabelColor:C.darkGray, dataLabelFontSize:10,
  showLegend:true, legendPos:"t", legendFontSize:10, showTitle:false });

// SLIDE 3: 停车时长
sl = pres.addSlide();
addSlideHeader(sl, "二、停车时长分布（30分钟以上订单）", "维度 2 / 8");
const durL=["30分-2小时","2-4小时","4-6小时","6小时以上"];
const dA26=[33708,14241,2219,714], dA25=[39350,16647,2791,799];
const dB26=[94526,38906,6186,2013], dB25=[94650,37872,6508,1857];
const A26t=50882, A25t=59587, B26t=141631, B25t=140887;

function durTbl(d26,d25,t26,t25,bg) {
  const rows=[hdr(["分桶","26年","25年","差值","变动%","26年%","25年%"],bg)];
  durL.forEach((l,i)=>{
    const diff=d26[i]-d25[i], altBg=i%2===0?"F7F8FA":"FFFFFF";
    rows.push([
      {text:l,          options:{color:C.text, fill:{color:altBg},fontSize:9}},
      {text:d26[i].toLocaleString(), options:{color:C.navy, fill:{color:altBg},fontSize:9,bold:true}},
      {text:d25[i].toLocaleString(), options:{color:C.muted,fill:{color:altBg},fontSize:9}},
      {text:(diff>0?"+":"")+diff.toLocaleString(), options:{color:diff<0?C.red:C.green,fill:{color:altBg},fontSize:9,bold:true}},
      {text:(diff>0?"+":"")+(diff/d25[i]*100).toFixed(1)+"%", options:{color:diff<0?C.red:C.green,fill:{color:altBg},fontSize:9,bold:true}},
      {text:(d26[i]/t26*100).toFixed(1)+"%", options:{color:C.text,fill:{color:altBg},fontSize:9}},
      {text:(d25[i]/t25*100).toFixed(1)+"%", options:{color:C.text,fill:{color:altBg},fontSize:9}},
    ]);
  });
  return rows;
}
sBar(sl, 0.3, 0.82, 4.4, "周期A — 春节周期", C.navy);
sl.addTable(durTbl(dA26,dA25,A26t,A25t,C.navy), {x:0.3,y:1.16,w:4.4,colW:[1.1,0.65,0.65,0.6,0.55,0.55,0.55],border:{pt:0.5,color:"E2E8F0"}});
sl.addText("均停：26年113.1分 | 25年114.3分 | 差-1.2分",{x:0.3,y:2.82,w:4.4,h:0.22,fontSize:9.5,color:C.muted,fontFace:"Microsoft YaHei"});
sBar(sl, 5.3, 0.82, 4.4, "周期B — 长周期", C.blue);
sl.addTable(durTbl(dB26,dB25,B26t,B25t,C.blue), {x:5.3,y:1.16,w:4.4,colW:[1.1,0.65,0.65,0.6,0.55,0.55,0.55],border:{pt:0.5,color:"E2E8F0"}});
sl.addText("均停：26年113.1分 | 25年112.8分 | 差+0.3分",{x:5.3,y:2.82,w:4.4,h:0.22,fontSize:9.5,color:C.muted,fontFace:"Microsoft YaHei"});
sl.addChart(pres.charts.BAR,[{name:"26年(A)",labels:durL,values:dA26},{name:"25年(A)",labels:durL,values:dA25}],
  {x:0.3,y:3.05,w:4.4,h:2.35,barDir:"col",chartColors:[C.blueLight,C.lightGray],chartArea:{fill:{color:C.white}},
   catAxisLabelColor:C.muted,valAxisLabelColor:C.muted,valGridLine:{color:"E2E8F0",size:0.5},catGridLine:{style:"none"},
   showValue:true,dataLabelColor:C.darkGray,dataLabelFontSize:8,showLegend:true,legendPos:"t",legendFontSize:9,showTitle:false});
sl.addChart(pres.charts.BAR,[{name:"26年(B)",labels:durL,values:dB26},{name:"25年(B)",labels:durL,values:dB25}],
  {x:5.3,y:3.05,w:4.4,h:2.35,barDir:"col",chartColors:[C.blue,C.lightGray],chartArea:{fill:{color:C.white}},
   catAxisLabelColor:C.muted,valAxisLabelColor:C.muted,valGridLine:{color:"E2E8F0",size:0.5},catGridLine:{style:"none"},
   showValue:true,dataLabelColor:C.darkGray,dataLabelFontSize:8,showLegend:true,legendPos:"t",legendFontSize:9,showTitle:false});

// SLIDE 4: 净收入
sl = pres.addSlide();
addSlideHeader(sl, "三、净收入", "维度 3 / 8");
sBar(sl, 0.3, 0.82, 4.4, "周期A — 春节周期", C.navy);
mCard(sl, 0.3,  1.2,  2.1, 1.6, "净收入",     "¥105,667","¥132,713","▼ ¥27,046（-20.4%）",C.red);
mCard(sl, 2.55, 1.2,  2.1, 1.6, "日均收入",   "¥4,594",  "¥5,530",  "▼ ¥936（-16.9%）",  C.red);
mCard(sl, 0.3,  2.95, 2.1, 1.6, "每车次均收", "¥0.89",   "¥0.95",   "▼ ¥0.06（-6.3%）",  C.red);
mCard(sl, 2.55, 2.95, 2.1, 1.6, "总优惠金额", "¥182,632","¥207,265","▼ ¥24,633（-11.9%）",C.red);
sBar(sl, 5.3, 0.82, 4.4, "周期B — 长周期", C.blue);
mCard(sl, 5.3,  1.2,  2.1, 1.6, "净收入",     "¥288,265","¥278,800","▲ ¥9,465（+3.4%）",  C.green);
mCard(sl, 7.55, 1.2,  2.1, 1.6, "日均收入",   "¥4,004",  "¥3,872",  "▲ ¥132（+3.4%）",   C.green);
mCard(sl, 5.3,  2.95, 2.1, 1.6, "每车次均收", "¥0.85",   "¥0.82",   "▲ ¥0.03（+3.7%）",  C.green);
mCard(sl, 7.55, 2.95, 2.1, 1.6, "总优惠金额", "¥513,824","¥517,048","▼ ¥3,224（-0.6%）",  C.red);
sl.addChart(pres.charts.BAR,[{name:"净收入",labels:["周期A-26年","周期A-25年","周期B-26年","周期B-25年"],values:[105667,132713,288265,278800]}],
  {x:0.3,y:4.68,w:9.4,h:0.78,barDir:"bar",chartColors:[C.blueLight],chartArea:{fill:{color:C.white}},
   catAxisLabelColor:C.muted,valAxisLabelColor:C.muted,valGridLine:{color:"E2E8F0",size:0.5},catGridLine:{style:"none"},
   showValue:true,dataLabelColor:C.darkGray,dataLabelFontSize:9,showLegend:false,showTitle:false});

// SLIDE 5: 免费用户
sl = pres.addSlide();
addSlideHeader(sl, "四、免费用户（两维度）", "维度 4 / 8");
sl.addShape(pres.shapes.RECTANGLE, {x:0.3,y:0.82,w:9.4,h:0.3,fill:{color:"EFF3FB"}});
sl.addText([{text:"维度①",options:{bold:true,color:C.navy}},{text:" 30分钟以下（绝对免费）     ",options:{color:C.text}},
  {text:"维度②",options:{bold:true,color:C.navy}},{text:" 30分钟以上实缴为0（会员权益/券/积分全额抵扣）",options:{color:C.text}}],
  {x:0.3,y:0.82,w:9.4,h:0.3,fontSize:10,fontFace:"Microsoft YaHei",valign:"middle",margin:8});

function freeTbl(rows, bg) {
  const t=[hdr(["","26年车次","25年车次","差值","26年%","25年%"],bg)];
  rows.forEach(([l,v26,v25,diff,p26,p25,isNeg,isPos,isTotal],i)=>{
    const altBg=isTotal?"FFF3E0":i%2===0?"F7F8FA":"FFFFFF";
    const dc=isNeg?C.red:isPos?C.green:C.text;
    t.push([
      {text:l,    options:{color:C.text,fill:{color:altBg},fontSize:9,bold:isTotal}},
      {text:v26,  options:{color:C.navy,fill:{color:altBg},fontSize:9,bold:true}},
      {text:v25,  options:{color:C.muted,fill:{color:altBg},fontSize:9}},
      {text:diff, options:{color:dc,fill:{color:altBg},fontSize:9,bold:true}},
      {text:p26,  options:{color:C.text,fill:{color:altBg},fontSize:9}},
      {text:p25,  options:{color:C.text,fill:{color:altBg},fontSize:9}},
    ]);
  });
  return t;
}
const frA=[
  ["①30分钟以下","68,443","79,959","▼11,516","57.4%","57.3%",true,false,false],
  ["②30分以上实缴0","30,466","33,812","▼3,346","25.5%","24.2%",true,false,false],
  ["合计免费","98,909","113,771","▼14,862","82.9%","81.5%",true,false,true],
  ["付费车次","20,416","25,775","▼5,359","17.1%","18.5%",true,false,false],
];
const frB=[
  ["①30分钟以下","196,279","198,519","▼2,240","58.1%","58.5%",true,false,false],
  ["②30分以上实缴0","85,711","86,124","▼413","25.4%","25.4%",true,false,false],
  ["合计免费","281,990","284,643","▼2,653","83.5%","83.9%",true,false,true],
  ["付费车次","55,921","54,763","▲1,158","16.5%","16.1%",false,true,false],
];
sBar(sl, 0.3, 1.2, 4.4, "周期A — 春节周期", C.navy);
sl.addTable(freeTbl(frA,C.navy), {x:0.3,y:1.54,w:4.4,colW:[1.45,0.7,0.7,0.62,0.55,0.55],border:{pt:0.5,color:"E2E8F0"}});
sBar(sl, 5.3, 1.2, 4.4, "周期B — 长周期", C.blue);
sl.addTable(freeTbl(frB,C.blue), {x:5.3,y:1.54,w:4.4,colW:[1.45,0.7,0.7,0.62,0.55,0.55],border:{pt:0.5,color:"E2E8F0"}});
const pL=["30分以下","30分以上实缴0","付费"];
sl.addChart(pres.charts.PIE,[{name:"s",labels:pL,values:[57.4,25.5,17.1]}],{x:0.3,y:3.45,w:2.3,h:2.0,chartColors:[C.blueLight,"E8703A","27AE60"],showPercent:true,showLegend:true,legendPos:"b",legendFontSize:7.5,dataLabelFontSize:9,showTitle:true,title:"A 26年",titleFontSize:10});
sl.addChart(pres.charts.PIE,[{name:"s",labels:pL,values:[57.3,24.2,18.5]}],{x:2.75,y:3.45,w:2.3,h:2.0,chartColors:["94A3B8","CBD5E0","E2E8F0"],showPercent:true,showLegend:true,legendPos:"b",legendFontSize:7.5,dataLabelFontSize:9,showTitle:true,title:"A 25年",titleFontSize:10});
sl.addChart(pres.charts.PIE,[{name:"s",labels:pL,values:[58.1,25.4,16.5]}],{x:5.3,y:3.45,w:2.3,h:2.0,chartColors:[C.blue,"E8703A","27AE60"],showPercent:true,showLegend:true,legendPos:"b",legendFontSize:7.5,dataLabelFontSize:9,showTitle:true,title:"B 26年",titleFontSize:10});
sl.addChart(pres.charts.PIE,[{name:"s",labels:pL,values:[58.5,25.4,16.1]}],{x:7.75,y:3.45,w:2.3,h:2.0,chartColors:["94A3B8","CBD5E0","E2E8F0"],showPercent:true,showLegend:true,legendPos:"b",legendFontSize:7.5,dataLabelFontSize:9,showTitle:true,title:"B 25年",titleFontSize:10});

// SLIDE 6: 优惠券
sl = pres.addSlide();
addSlideHeader(sl, "五、优惠券使用情况", "维度 5 / 8");
sBar(sl, 0.3, 0.82, 4.4, "周期A — 春节周期", C.navy);
mCard(sl, 0.3,  1.2,  2.1, 1.6, "用券车次",       "9,187",   "16,299",  "▼ 7,112（-43.6%）",C.red);
mCard(sl, 2.55, 1.2,  2.1, 1.6, "用券占总车次",   "7.7%",    "11.7%",   "▼ 4.0pp",          C.red);
mCard(sl, 0.3,  2.95, 2.1, 1.6, "用券用户均停",   "145.0分", "149.2分", "▼ 4.2分（-2.8%）",C.red);
mCard(sl, 2.55, 2.95, 2.1, 1.6, "未用券用户均停", "106.1分", "101.1分", "▲ 5.0分（+4.9%）",C.green);
sBar(sl, 5.3, 0.82, 4.4, "周期B — 长周期", C.blue);
mCard(sl, 5.3,  1.2,  2.1, 1.6, "用券车次",       "23,366",  "38,430",  "▼ 15,064（-39.2%）",C.red);
mCard(sl, 7.55, 1.2,  2.1, 1.6, "用券占总车次",   "6.9%",    "11.3%",   "▼ 4.4pp",           C.red);
mCard(sl, 5.3,  2.95, 2.1, 1.6, "用券用户均停",   "144.6分", "147.6分", "▼ 3.0分（-2.0%）", C.red);
mCard(sl, 7.55, 2.95, 2.1, 1.6, "未用券用户均停", "106.9分", "99.7分",  "▲ 7.2分（+7.2%）", C.green);
sl.addShape(pres.shapes.RECTANGLE, {x:0.3,y:4.72,w:9.4,h:0.52,fill:{color:"FFF8F0"}});
sl.addShape(pres.shapes.RECTANGLE, {x:0.3,y:4.72,w:0.06,h:0.52,fill:{color:C.orange}});
sl.addText("⚠ 两周期用券车次均下降40%+，是新政策（取消任意消费得券）最直接的量化佐证。用券用户停车时长明显长于未用券用户（约38分钟），说明券在吸引深度消费，不只是薅免费。",
  {x:0.45,y:4.74,w:9.2,h:0.48,fontSize:10,color:C.text,fontFace:"Microsoft YaHei",valign:"middle"});

// SLIDE 7: 会员结构
sl = pres.addSlide();
addSlideHeader(sl, "六、会员等级结构（30分钟以上订单）", "维度 6 / 8");
const mL=["非会员","悦卡","银卡","金卡","钻石卡"];
const mA26=[13000,26619,9582,1449,232], mA25=[16504,28161,11689,2896,337];
const mB26=[33910,72545,29406,5092,678], mB25=[32641,67494,31272,8490,990];
function memTbl(d26,d25,t26,t25,bg){
  const rows=[hdr(["等级","26年","25年","差值（%）","26年占比","25年占比"],bg)];
  mL.forEach((l,i)=>{
    const diff=d26[i]-d25[i],pct=(diff/d25[i]*100).toFixed(1),altBg=i%2===0?"F7F8FA":"FFFFFF";
    rows.push([
      {text:l,options:{color:C.text,fill:{color:altBg},fontSize:9}},
      {text:d26[i].toLocaleString(),options:{color:C.navy,fill:{color:altBg},fontSize:9,bold:true}},
      {text:d25[i].toLocaleString(),options:{color:C.muted,fill:{color:altBg},fontSize:9}},
      {text:(diff>0?"+":"")+diff.toLocaleString()+" ("+(diff>0?"+":"")+pct+"%)",options:{color:diff<0?C.red:C.green,fill:{color:altBg},fontSize:9,bold:true}},
      {text:(d26[i]/t26*100).toFixed(1)+"%",options:{color:C.text,fill:{color:altBg},fontSize:9}},
      {text:(d25[i]/t25*100).toFixed(1)+"%",options:{color:C.text,fill:{color:altBg},fontSize:9}},
    ]);
  });
  return rows;
}
sBar(sl, 0.3, 0.82, 4.4, "周期A — 春节周期", C.navy);
sl.addTable(memTbl(mA26,mA25,A26t,A25t,C.navy),{x:0.3,y:1.16,w:4.4,colW:[0.82,0.68,0.68,1.32,0.65,0.65],border:{pt:0.5,color:"E2E8F0"}});
sBar(sl, 5.3, 0.82, 4.4, "周期B — 长周期", C.blue);
sl.addTable(memTbl(mB26,mB25,B26t,B25t,C.blue),{x:5.3,y:1.16,w:4.4,colW:[0.82,0.68,0.68,1.32,0.65,0.65],border:{pt:0.5,color:"E2E8F0"}});
sl.addChart(pres.charts.BAR,[{name:"26年(A)",labels:mL,values:[25.5,52.3,18.8,2.8,0.5]},{name:"25年(A)",labels:mL,values:[27.7,47.3,19.6,4.9,0.6]}],
  {x:0.3,y:3.32,w:4.4,h:2.05,barDir:"col",chartColors:[C.blueLight,C.lightGray],chartArea:{fill:{color:C.white}},
   catAxisLabelColor:C.muted,valAxisLabelColor:C.muted,valGridLine:{color:"E2E8F0",size:0.5},catGridLine:{style:"none"},
   showValue:true,dataLabelColor:C.darkGray,dataLabelFontSize:8,showLegend:true,legendPos:"t",legendFontSize:9,showTitle:false});
sl.addChart(pres.charts.BAR,[{name:"26年(B)",labels:mL,values:[23.9,51.2,20.8,3.6,0.5]},{name:"25年(B)",labels:mL,values:[23.2,47.9,22.2,6.0,0.7]}],
  {x:5.3,y:3.32,w:4.4,h:2.05,barDir:"col",chartColors:[C.blue,C.lightGray],chartArea:{fill:{color:C.white}},
   catAxisLabelColor:C.muted,valAxisLabelColor:C.muted,valGridLine:{color:"E2E8F0",size:0.5},catGridLine:{style:"none"},
   showValue:true,dataLabelColor:C.darkGray,dataLabelFontSize:8,showLegend:true,legendPos:"t",legendFontSize:9,showTitle:false});
sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:5.28,w:9.4,h:0.26,fill:{color:"FFF8F0"}});
sl.addText("⚠ 金卡用户：A周期 2,896→1,449（-50.0%），B周期 8,490→5,092（-40.0%）。两周期同步严重流失，需优先追查。",
  {x:0.35,y:5.28,w:9.3,h:0.26,fontSize:9.5,color:C.orange,bold:true,fontFace:"Microsoft YaHei",valign:"middle"});

// SLIDE 8: 商场客流
sl = pres.addSlide();
addSlideHeader(sl, "七、商场客流 & 开车进场率", "维度 7 / 8");
sBar(sl, 0.3, 0.82, 4.4, "周期A — 春节周期", C.navy);
mCard(sl, 0.3,  1.2,  2.1, 1.6, "总客流",         "718,538",   "796,737",   "▼ 78,199（-9.8%）", C.red);
mCard(sl, 2.55, 1.2,  2.1, 1.6, "日均客流",       "31,241",    "33,197",    "▼ 1,956（-5.9%）",  C.red);
mCard(sl, 0.3,  2.95, 2.1, 1.6, "开车进场率",     "16.6%",     "17.5%",     "▼ 0.9pp",           C.red);
mCard(sl, 2.55, 2.95, 2.1, 1.6, "每位客流停车比", "1:8.4",     "1:7.3",     "比值拉大（-）",     C.red);
sBar(sl, 5.3, 0.82, 4.4, "周期B — 长周期", C.blue);
mCard(sl, 5.3,  1.2,  2.1, 1.6, "总客流",         "2,027,197", "1,823,847", "▲ 203,350（+11.1%）",C.green);
mCard(sl, 7.55, 1.2,  2.1, 1.6, "日均客流",       "28,156",    "25,331",    "▲ 2,825（+11.1%）", C.green);
mCard(sl, 5.3,  2.95, 2.1, 1.6, "开车进场率",     "16.7%",     "18.6%",     "▼ 1.9pp",           C.red);
mCard(sl, 7.55, 2.95, 2.1, 1.6, "每位客流停车比", "1:6.0",     "1:5.4",     "比值拉大（-）",     C.red);
sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:4.72,w:9.4,h:0.55,fill:{color:"EFF3FB"}});
sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:4.72,w:0.06,h:0.55,fill:{color:C.blue}});
sl.addText([{text:"长周期关键矛盾：",options:{bold:true,color:C.navy}},{text:" 商场客流增长+11.1%，但开车进场率从18.6%跌至16.7%（-1.9pp）。人流在增加，开车比例却系统性下滑——问题不是客流不足，而是停车场对已到访客流的转化率在持续弱化。",options:{color:C.text}}],
  {x:0.45,y:4.74,w:9.2,h:0.51,fontSize:10,fontFace:"Microsoft YaHei",valign:"middle"});

// SLIDE 9: 天气 & 政策
sl = pres.addSlide();
addSlideHeader(sl, "八、天气影响 & 政策对比小结", "维度 8 / 8");
sBar(sl, 0.3, 0.82, 4.2, "天气干扰排查", C.navy);
sl.addTable([
  hdr(["周期","雨雪天数","结论"],C.navy),
  ...[["A 26年（23天）","0天","✓ 无干扰"],["A 25年（24天）","0天","✓ 无干扰"],["B 26年（72天）","11天","两周期相当，互相抵消"],["B 25年（72天）","12天","两周期相当，互相抵消"]].map(([a,b,c],i)=>[
    {text:a,options:{color:C.text,fill:{color:i%2===0?"F7F8FA":"FFFFFF"},fontSize:9.5}},
    {text:b,options:{color:b==="0天"?C.green:C.muted,fill:{color:i%2===0?"F7F8FA":"FFFFFF"},fontSize:9.5,bold:b==="0天"}},
    {text:c,options:{color:b==="0天"?C.green:C.muted,fill:{color:i%2===0?"F7F8FA":"FFFFFF"},fontSize:9.5}},
  ])
],{x:0.3,y:1.16,w:4.2,colW:[1.6,0.8,1.8],border:{pt:0.5,color:"E2E8F0"}});
sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:2.62,w:4.2,h:0.34,fill:{color:"E8F5E9"}});
sl.addText("天气排除：不构成车流下降的解释因素",{x:0.35,y:2.62,w:4.1,h:0.34,fontSize:10,bold:true,color:C.green,fontFace:"Microsoft YaHei",valign:"middle"});
sBar(sl, 0.3, 3.08, 4.2, "政策关键变动（2026年2月1日起）", C.navy);
sl.addTable([
  hdr(["优惠项目","旧政策","新政策","影响"],C.navy),
  ...[
    ["任意消费叠加券","+1小时","取消","用券率-4pp（最直接）"],
    ["满288元叠加券","+3小时","+2小时","高消费用户-1小时"],
    ["基础会员权益","悦1h/银2h/金4h/钻12h","不变","无影响"],
    ["非会员免费","30分钟","不变","无影响"],
    ["积分兑换","100积分=1h","不变","无影响"],
  ].map(([a,b,c,d],i)=>{
    const bg=i%2===0?"F7F8FA":"FFFFFF";
    return [
      {text:a,options:{color:C.text,fill:{color:bg},fontSize:9}},
      {text:b,options:{color:C.text,fill:{color:bg},fontSize:9}},
      {text:c,options:{color:c==="取消"?C.red:c==="+2小时"?C.orange:C.green,fill:{color:bg},fontSize:9,bold:c==="取消"}},
      {text:d,options:{color:c==="取消"?C.red:c==="+2小时"?C.orange:C.muted,fill:{color:bg},fontSize:9}},
    ];
  })
],{x:0.3,y:3.42,w:4.2,colW:[1.2,1.0,0.9,1.1],border:{pt:0.5,color:"E2E8F0"}});
sBar(sl, 5.2, 0.82, 4.5, "各维度研判总结", C.orange);
[
  [C.red,  "车流（A）-14.5%",    "客流-9.8%主因 + 政策致开车率下滑"],
  [C.muted,"车流（B）-0.4%",     "客流+11.1%但开车进场率-1.9pp对冲"],
  [C.red,  "收入（A）-20.4%",    "车流减少+用券缩水双重打击"],
  [C.green,"收入（B）+3.4%",     "每车均收+3.7%，收入韧性尚可"],
  [C.red,  "用券率两周期-40%+",  "新政策最确定的负面效应"],
  [C.red,  "金卡流失约40%",      "两周期同步，需优先追查"],
  [C.muted,"免费占比稳定83%",    "免费结构未恶化，付费占比微升"],
  [C.green,"天气干扰排除",       "两周期雨雪天数相当"],
].forEach((f,i)=>{
  const y=1.22+i*0.52, bg=i%2===0?"F7F8FA":"FFFFFF";
  sl.addShape(pres.shapes.RECTANGLE,{x:5.2,y,w:4.5,h:0.48,fill:{color:bg}});
  sl.addShape(pres.shapes.RECTANGLE,{x:5.2,y,w:0.05,h:0.48,fill:{color:f[0]}});
  sl.addText(f[1],{x:5.32,y:y+0.02,w:1.85,h:0.22,fontSize:9,bold:true,color:C.darkGray,fontFace:"Microsoft YaHei"});
  sl.addText(f[2],{x:5.32,y:y+0.24,w:4.3,h:0.22,fontSize:8.5,color:C.muted,fontFace:"Microsoft YaHei"});
});

// SLIDE 10: 结语
sl = pres.addSlide();
sl.background = { color: C.navyDark };
sl.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.75,fill:{color:C.navy}});
sl.addText("分析总结",{x:0.4,y:0,w:9,h:0.75,fontSize:24,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle"});

const conclusions = [
  {
    color: C.red,
    num: "1",
    title: "春节周期车流实质性下降，客流萎缩是根本原因",
    body: "春节周期总车次119,325，同比减少20,221辆（-14.5%）。同期商场客流下降9.8%（减少78,199人次），说明来商场的人本身就少了，这是车流下降的主要来源。叠加政策收紧（取消任意消费得券），开车进场率从17.5%压低至16.6%，两因素共同作用导致收入跌幅（-20.4%）远超车流跌幅（-14.5%）。天气因素已排除，两周期雨雪天数均为0天。",
  },
  {
    color: C.orange,
    num: "2",
    title: "长周期表面持平，开车进场率系统性下滑是隐患",
    body: "长周期总车次337,910，同比几乎持平（-0.4%）。但这个持平是在商场客流大增+11.1%（增加20.3万人次）背景下实现的——增加的客流没有转化为停车。开车进场率从18.6%跌至16.7%（-1.9pp），每100位到访客户中开车进场的人少了约2个。这说明停车场对到访客流的吸引力在持续弱化，可能与周边停车竞争加剧、公共交通替代或新客群结构变化有关，需要进一步追查。",
  },
  {
    color: C.red,
    num: "3",
    title: "用券率断崖下滑40%+，是新政策影响最直接的量化证据",
    body: "新政策取消【任意消费积分即得+1小时券】后：春节周期用券车次9,187 vs 25年16,299（-43.6%），长周期23,366 vs 38,430（-39.2%），两周期均下滑约40%。用券用户平均停车145分钟，比未用券用户（106分钟）长近40分钟，说明券是带动深度消费停留的工具，而非纯免费薅羊毛。政策削减后，深度消费用户的进场行为已发生明显改变。",
  },
  {
    color: C.red,
    num: "4",
    title: "金卡会员两周期均流失40%+，高价值客群出现退出信号",
    body: "金卡用户春节周期从2,896降至1,449（-50.0%），长周期从8,490降至5,092（-40.0%）。其他等级相对平稳，非会员、悦卡、银卡变动均在合理范围内，唯独金卡持续大幅流失，不像自然波动。可能原因：新政策对金卡权益缩水（满288元叠加券从+3小时降至+2小时）最为明显，或竞品针对性吸引了这批高消费用户。建议结合消费记录进一步排查。",
  },
  {
    color: C.green,
    num: "5",
    title: "长周期收入逆势增长，付费用户质量有所提升",
    body: "长周期净收入288,265元，同比+3.4%；每车次均收从¥0.82升至¥0.85（+3.7%）。总优惠金额基本持平（-0.6%），说明收入增长不靠压缩优惠，而是付费用户结构在改善——付费车次占比从16.1%微升至16.5%，付费用户停留时长也在提升。短期收入韧性尚好，但若开车进场率的系统性下滑不扭转，长期收入增长空间将受到根本性制约。",
  },
];

conclusions.forEach((c,i)=>{
  const col = i < 3 ? 0 : 1;
  const row = i < 3 ? i : i - 3;
  const x = col === 0 ? 0.2 : 5.2;
  const y = 0.88 + row * 1.57;
  const w = 4.75;

  sl.addShape(pres.shapes.RECTANGLE,{x, y, w, h:1.5, fill:{color:"1A2456"}, shadow:makeShadow()});
  sl.addShape(pres.shapes.RECTANGLE,{x, y, w:0.06, h:1.5, fill:{color:c.color}});
  sl.addShape(pres.shapes.RECTANGLE,{x:x+0.14, y:y+0.1, w:0.3, h:0.3, fill:{color:c.color}});
  sl.addText(c.num,{x:x+0.14,y:y+0.1,w:0.3,h:0.3,fontSize:11,bold:true,color:C.white,fontFace:"Microsoft YaHei",align:"center",valign:"middle"});
  sl.addText(c.title,{x:x+0.52,y:y+0.1,w:w-0.63,h:0.34,fontSize:10.5,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle"});
  sl.addText(c.body, {x:x+0.14,y:y+0.5, w:w-0.25,h:0.95,fontSize:8.5,color:"CADCFC",fontFace:"Microsoft YaHei",valign:"top"});
});

pres.writeFile({ fileName: "/Users/jack/Desktop/fx/停车场车流下降分析报告.pptx" }).then(()=>console.log("Done")).catch(e=>console.error(e));
