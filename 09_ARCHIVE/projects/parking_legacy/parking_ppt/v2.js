const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = '停车场车流下降分析报告';

// ── 色彩系统 ────────────────────────────────────────────
const C = {
  navy:    "1B2A6B", navyDark:"0D1540", navyMid:"243580",
  blue:    "3070C0", blueLight:"5B9BD5", bluePale:"D6E4F7",
  orange:  "E07B3A", orangePale:"FDF0E6",
  red:     "C0392B", redPale:"FDECEA",
  green:   "1E8A4C", greenPale:"E8F5EE",
  white:   "FFFFFF", offWhite:"F5F7FA",
  gray1:   "E8ECF2", gray2:   "C5CDD8", gray3:"7A8899",
  text:    "1A2540", muted:   "5A6A80",
};

const makeShadow = () => ({type:"outer",blur:12,offset:3,angle:135,color:"000000",opacity:0.08});

// ── 基礎元件 ────────────────────────────────────────────
function slideHeader(sl, title, tag) {
  sl.background = { color: C.offWhite };
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.65,fill:{color:C.navy}});
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:0.08,h:0.65,fill:{color:C.orange}});
  sl.addText(title,{x:0.22,y:0,w:8.5,h:0.65,fontSize:21,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle"});
  sl.addText(tag,  {x:8.8, y:0,w:1.0, h:0.65,fontSize:10,color:C.gray2,fontFace:"Microsoft YaHei",align:"right",valign:"middle"});
}

function periodBadge(sl, x, y, label, color) {
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w:2.2,h:0.36,fill:{color},rectRadius:0.05});
  sl.addText(label,{x,y,w:2.2,h:0.36,fontSize:11,bold:true,color:C.white,fontFace:"Microsoft YaHei",align:"center",valign:"middle"});
}

function subLabel(sl, x, y, text) {
  sl.addText(text,{x,y,w:9.5,h:0.28,fontSize:10,color:C.muted,fontFace:"Microsoft YaHei"});
}

// 大數字卡片（寬鬆版）
function bigCard(sl, x, y, w, h, label, val, vs, delta, dc) {
  sl.addShape(pres.shapes.RECTANGLE,{x,y,w,h,fill:{color:C.white},shadow:makeShadow()});
  sl.addShape(pres.shapes.RECTANGLE,{x,y,w,h:0.055,fill:{color:dc==="red"?C.red:dc==="green"?C.green:C.orange}});
  sl.addText(label,{x:x+0.18,y:y+0.14,w:w-0.36,h:0.26,fontSize:10,color:C.muted,fontFace:"Microsoft YaHei"});
  sl.addText(val,  {x:x+0.18,y:y+0.42,w:w-0.36,h:0.58,fontSize:23,bold:true,color:C.navy,fontFace:"Microsoft YaHei"});
  sl.addText("vs "+vs,{x:x+0.18,y:y+1.04,w:w-0.36,h:0.24,fontSize:9.5,color:C.gray3,fontFace:"Microsoft YaHei"});
  sl.addText(delta,{x:x+0.18,y:y+1.3, w:w-0.36,h:0.28,fontSize:11,bold:true,
    color:dc==="red"?C.red:dc==="green"?C.green:C.orange,fontFace:"Microsoft YaHei"});
}

// 小信息行（用於表格式數據）
function infoRow(sl, x, y, w, label, v26, v25, diff, diffColor, isAlt) {
  sl.addShape(pres.shapes.RECTANGLE,{x,y,w,h:0.42,fill:{color:isAlt?C.gray1:C.white}});
  sl.addText(label,{x:x+0.15,y,w:w*0.35,h:0.42,fontSize:10,color:C.text,fontFace:"Microsoft YaHei",valign:"middle"});
  sl.addText(v26,  {x:x+w*0.38,y,w:w*0.22,h:0.42,fontSize:10,bold:true,color:C.navy,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
  sl.addText(v25,  {x:x+w*0.62,y,w:w*0.22,h:0.42,fontSize:10,color:C.muted,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
  sl.addText(diff, {x:x+w*0.82,y,w:w*0.16,h:0.42,fontSize:10,bold:true,color:diffColor,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
}

function tableHeader(sl, x, y, w, cols, widths) {
  sl.addShape(pres.shapes.RECTANGLE,{x,y,w,h:0.38,fill:{color:C.navy}});
  let cx=x;
  cols.forEach((c,i)=>{
    sl.addText(c,{x:cx+0.1,y,w:widths[i]-0.1,h:0.38,fontSize:10,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle",align:i===0?"left":"center"});
    cx+=widths[i];
  });
}

// ============================================================
// SLIDE 1: 封面
// ============================================================
let sl = pres.addSlide();
sl.background = { color: C.navyDark };
sl.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:4.0,h:5.625,fill:{color:C.navy}});
sl.addShape(pres.shapes.RECTANGLE,{x:3.95,y:0,w:0.08,h:5.625,fill:{color:C.orange}});
sl.addShape(pres.shapes.RECTANGLE,{x:0,y:3.6,w:4.0,h:0.06,fill:{color:C.blueLight},transparency:40});

sl.addText("停车场",{x:0.45,y:0.9,w:3.2,h:0.6,fontSize:24,bold:true,color:C.orange,fontFace:"Microsoft YaHei"});
sl.addText("车流下降\n分析报告",{x:0.45,y:1.55,w:3.2,h:1.6,fontSize:34,bold:true,color:C.white,fontFace:"Microsoft YaHei",lineSpacingMultiple:1.3});

sl.addText("对比周期",{x:0.45,y:3.3,w:3.2,h:0.3,fontSize:10,color:C.gray2,fontFace:"Microsoft YaHei"});
[
  ["周期 A  春节周期","26年2月1日—2月23日 vs 25年1月12日—2月4日"],
  ["周期 B  长周期（72天）","26年2月1日—4月13日 vs 25年2月2日—4月14日"],
].forEach(([t,s],i)=>{
  const y=3.65+i*0.82;
  sl.addShape(pres.shapes.RECTANGLE,{x:0.45,y,w:3.1,h:0.72,fill:{color:C.navyMid},rectRadius:0.06});
  sl.addShape(pres.shapes.RECTANGLE,{x:0.45,y,w:0.06,h:0.72,fill:{color:C.orange}});
  sl.addText(t,{x:0.6,y:y+0.06,w:2.9,h:0.28,fontSize:12,bold:true,color:C.white,fontFace:"Microsoft YaHei"});
  sl.addText(s,{x:0.6,y:y+0.36,w:2.9,h:0.28,fontSize:9,color:C.gray2,fontFace:"Microsoft YaHei"});
});

// 右側維度列表
sl.addText("分析维度（共 8 项）",{x:4.35,y:0.6,w:5.3,h:0.45,fontSize:14,bold:true,color:C.white,fontFace:"Microsoft YaHei"});
const dims=[
  ["01","车流规模"],["02","停车时长分布"],["03","净收入"],["04","免费用户"],
  ["05","优惠券使用"],["06","会员等级结构"],["07","商场客流 & 开车率"],["08","天气 & 政策影响"],
];
dims.forEach(([num,label],i)=>{
  const col=i%2, row=Math.floor(i/2);
  const x=col===0?4.35:7.2, y=1.18+row*1.02;
  sl.addShape(pres.shapes.RECTANGLE,{x,y,w:2.65,h:0.82,fill:{color:C.navyMid},shadow:makeShadow()});
  sl.addShape(pres.shapes.RECTANGLE,{x,y,w:0.06,h:0.82,fill:{color:C.orange}});
  sl.addText(num,  {x:x+0.16,y:y+0.06,w:0.5,h:0.3,fontSize:10,color:C.orange,fontFace:"Microsoft YaHei",bold:true});
  sl.addText(label,{x:x+0.16,y:y+0.36,w:2.3,h:0.36,fontSize:13,bold:true,color:C.white,fontFace:"Microsoft YaHei"});
});

// ── 定義數據 ──────────────────────────────────────────────
const D = {
  A26:{ total:58904, u30:8022,  above30:50882, days:23,
        revenue:105667, disc:182632, payable:288299, discRate:63.3,
        avgDur:113.1, buckets:[33708,14241,2219,714],
        freeAbove30:30466, freeAbove30PctOfAbove30:59.9,
        coupon:9187, couponPct:15.6, durCoupon:145.0, durNoCoupon:106.1,
        members:{悦卡:26619,银卡:9582,金卡:1449,钻石卡:232,非会员:13000},
        foot:718538, driveRate:8.2, rain:0 },
  A25:{ total:68938, u30:9351,  above30:59587, days:24,
        revenue:132713, disc:207265, payable:339978, discRate:61.0,
        avgDur:114.3, buckets:[39350,16647,2791,799],
        freeAbove30:33812, freeAbove30PctOfAbove30:56.7,
        coupon:16299, couponPct:23.6, durCoupon:149.2, durNoCoupon:101.1,
        members:{悦卡:28161,银卡:11689,金卡:2896,钻石卡:337,非会员:16504},
        foot:796737, driveRate:8.7, rain:0 },
  B26:{ total:166400, u30:24769, above30:141631, days:72,
        revenue:288265, disc:513824, payable:802089, discRate:64.1,
        avgDur:113.1, buckets:[94526,38906,6186,2013],
        freeAbove30:85711, freeAbove30PctOfAbove30:60.5,
        coupon:23366, couponPct:14.0, durCoupon:144.6, durNoCoupon:106.9,
        members:{悦卡:72545,银卡:29406,金卡:5092,钻石卡:678,非会员:33910},
        foot:2027197, driveRate:8.2, rain:11 },
  B25:{ total:167810, u30:26923, above30:140887, days:72,
        revenue:278800, disc:517048, payable:795848, discRate:65.0,
        avgDur:112.8, buckets:[94650,37872,6508,1857],
        freeAbove30:86124, freeAbove30PctOfAbove30:61.1,
        coupon:38430, couponPct:22.9, durCoupon:147.6, durNoCoupon:99.7,
        members:{悦卡:67494,银卡:31272,金卡:8490,钻石卡:990,非会员:32641},
        foot:1823847, driveRate:9.2, rain:12 },
};

function pct(a,b){return ((a-b)/Math.abs(b)*100).toFixed(1);}
function pp(a,b){return (a-b).toFixed(1);}
function diff(a,b){return (a-b).toLocaleString('zh-CN');}
function sign(v){return v>=0?"+":"";}
function dc(a,b,inverse=false){
  const up=a>b;
  return (inverse?!up:up)?"green":"red";
}

// ============================================================
// 通用函數：生成一個周期的車流頁
// ============================================================
function makeFlowSlide(d26, d25, periodLabel, periodDesc, slideTag) {
  const sl = pres.addSlide();
  slideHeader(sl, `一、车流规模  ·  ${periodLabel}`, slideTag);
  subLabel(sl, 0.3, 0.78, periodDesc);

  const totalDiff = d26.total - d25.total;
  const dailyDiff = (d26.total/d26.days - d25.total/d25.days);

  bigCard(sl,0.3, 1.05, 2.9,1.75,"总车次（26年）",
    d26.total.toLocaleString(), d25.total.toLocaleString(),
    `▼ ${Math.abs(totalDiff).toLocaleString()}（${pct(d26.total,d25.total)}%）`, "red");
  bigCard(sl,3.4, 1.05, 2.9,1.75,"日均车次（26年）",
    (d26.total/d26.days).toFixed(0), (d25.total/d25.days).toFixed(0),
    `▼ ${Math.abs(dailyDiff).toFixed(1)}（${pct(d26.total/d26.days,d25.total/d25.days)}%）`, "red");
  bigCard(sl,6.5, 1.05, 3.2,1.75,"统计天数",
    `${d26.days}天`, `${d25.days}天`, "周期天数对比", "neutral");

  // 車流構成分解表
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:3.02,w:9.4,h:0.38,fill:{color:C.navy}});
  [{x:0.3,w:2.5,t:"分类"},{x:2.8,w:2.0,t:"26年车次"},{x:4.8,w:2.0,t:"25年车次"},{x:6.8,w:1.5,t:"差值"},{x:8.3,w:1.4,t:"变动%"}].forEach(({x,w,t})=>{
    sl.addText(t,{x,y:3.02,w,h:0.38,fontSize:10,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle",align:x===0.3?"left":"center"});
  });

  const rows=[
    ["30分钟以下（免费）", d26.u30, d25.u30],
    ["30分钟以上（有记录）", d26.above30, d25.above30],
    ["合计总车次", d26.total, d25.total],
  ];
  rows.forEach(([label,v26,v25],i)=>{
    const y=3.42+i*0.5;
    const isTotal=i===2;
    const bg=isTotal?"EBF2FC":i%2===0?C.white:C.gray1;
    sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:9.4,h:0.46,fill:{color:bg}});
    if(isTotal) sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:0.06,h:0.46,fill:{color:C.blue}});
    const d=v26-v25, dPct=pct(v26,v25);
    const dColor=d<0?C.red:C.green;
    sl.addText(label, {x:0.45,y,w:2.3,h:0.46,fontSize:10,bold:isTotal,color:C.text,fontFace:"Microsoft YaHei",valign:"middle"});
    sl.addText(v26.toLocaleString(),{x:2.8,y,w:2.0,h:0.46,fontSize:10,bold:true,color:C.navy,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText(v25.toLocaleString(),{x:4.8,y,w:2.0,h:0.46,fontSize:10,color:C.muted,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText((d>0?"+":"")+d.toLocaleString(),{x:6.8,y,w:1.5,h:0.46,fontSize:10,bold:true,color:dColor,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText((d>0?"+":"")+dPct+"%",{x:8.3,y,w:1.4,h:0.46,fontSize:10,bold:true,color:dColor,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
  });
}

// ============================================================
// 通用函數：停車時長頁
// ============================================================
function makeDurSlide(d26, d25, periodLabel, periodDesc, slideTag) {
  const sl = pres.addSlide();
  slideHeader(sl, `二、停车时长分布  ·  ${periodLabel}`, slideTag);
  subLabel(sl, 0.3, 0.78, periodDesc);

  const bktLabels=["30分钟以下","30分-2小时","2-4小时","4-6小时","6小时以上"];
  const bkt26=[d26.u30,...d26.buckets];
  const bkt25=[d25.u30,...d25.buckets];

  // 表格
  const colW=[2.4,1.55,1.55,1.3,1.3,1.3];
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.95,w:9.4,h:0.38,fill:{color:C.navy}});
  const hdrs=["分桶","26年车次","25年车次","差值","变动%","26年占总%"];
  let cx=0.3;
  hdrs.forEach((h,i)=>{
    sl.addText(h,{x:cx+0.1,y:0.95,w:colW[i]-0.1,h:0.38,fontSize:10,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle",align:i===0?"left":"center"});
    cx+=colW[i];
  });

  bktLabels.forEach((label,i)=>{
    const y=1.35+i*0.52;
    const v26=bkt26[i], v25=bkt25[i];
    const d=v26-v25, dPct=pct(v26,v25);
    const dColor=d<0?C.red:C.green;
    const p26tot=((v26/d26.total)*100).toFixed(1);
    const bg=i%2===0?C.white:C.gray1;
    const isUnder30=i===0;
    sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:9.4,h:0.48,fill:{color:bg}});
    if(isUnder30) sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:0.05,h:0.48,fill:{color:C.orange}});
    cx=0.3;
    const vals=[label, v26.toLocaleString(), v25.toLocaleString(),
      (d>0?"+":"")+d.toLocaleString(), (d>0?"+":"")+dPct+"%", p26tot+"%"];
    vals.forEach((v,j)=>{
      const isBold=j===1||j===4||j===5;
      const color=j===3||j===4?dColor:j===1?C.navy:C.text;
      sl.addText(v,{x:cx+0.1,y,w:colW[j]-0.1,h:0.48,fontSize:10,bold:isBold,color,fontFace:"Microsoft YaHei",valign:"middle",align:j===0?"left":"center"});
      cx+=colW[j];
    });
  });

  // 平均停車時長
  const dAvg=d26.avgDur-d25.avgDur;
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:4.05,w:9.4,h:0.42,fill:{color:C.bluePale}});
  sl.addText(`平均停车时长：26年 ${d26.avgDur} 分钟  |  25年 ${d25.avgDur} 分钟  |  变动 ${dAvg>0?"+":""}${dAvg.toFixed(1)} 分钟`,
    {x:0.45,y:4.05,w:9.2,h:0.42,fontSize:11,color:C.navy,fontFace:"Microsoft YaHei",valign:"middle",bold:false});

  // 30分鐘以上四個分桶柱狀圖（尺度獨立，可以看清楚）
  sl.addChart(pres.charts.BAR,[
    {name:"26年",labels:bktLabels.slice(1),values:bkt26.slice(1)},
    {name:"25年",labels:bktLabels.slice(1),values:bkt25.slice(1)},
  ],{x:0.3,y:4.58,w:9.4,h:0.88,barDir:"col",
    chartColors:[C.blueLight,C.gray2],chartArea:{fill:{color:C.white}},
    catAxisLabelColor:C.muted,valAxisLabelColor:C.muted,
    valGridLine:{color:"E2E8F0",size:0.5},catGridLine:{style:"none"},
    showValue:true,dataLabelColor:"334155",dataLabelFontSize:8,
    showLegend:true,legendPos:"t",legendFontSize:9,showTitle:false});
}

// ============================================================
// 通用函數：淨收入頁
// ============================================================
function makeRevenueSlide(d26, d25, periodLabel, periodDesc, slideTag) {
  const sl = pres.addSlide();
  slideHeader(sl, `三、净收入  ·  ${periodLabel}`, slideTag);
  subLabel(sl, 0.3, 0.78, periodDesc);

  const revDiff=d26.revenue-d25.revenue;
  const discRateDiff=(d26.discRate-d25.discRate).toFixed(1);

  bigCard(sl,0.3, 1.05,3.0,1.75,"净收入（26年）",
    `¥${d26.revenue.toLocaleString()}`, `¥${d25.revenue.toLocaleString()}`,
    `${revDiff>=0?"▲":"▼"} ¥${Math.abs(revDiff).toLocaleString()}（${revDiff>=0?"+":""}${pct(d26.revenue,d25.revenue)}%）`,
    dc(d26.revenue,d25.revenue));
  bigCard(sl,3.55,1.05,3.0,1.75,"日均净收入（26年）",
    `¥${(d26.revenue/d26.days).toFixed(0)}`, `¥${(d25.revenue/d25.days).toFixed(0)}`,
    `${revDiff>=0?"▲":"▼"} ¥${Math.abs((d26.revenue/d26.days)-(d25.revenue/d25.days)).toFixed(0)}`,
    dc(d26.revenue,d25.revenue));
  bigCard(sl,6.8, 1.05,2.9,1.75,"优惠金额占比（26年）",
    `${d26.discRate}%`, `${d25.discRate}%`,
    `${discRateDiff>=0?"+":""}${discRateDiff}pp`,
    dc(d26.discRate,d25.discRate,true));

  // 收入明細表
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:3.02,w:9.4,h:0.38,fill:{color:C.navy}});
  [{x:0.3,w:3.0,t:"项目"},{x:3.3,w:2.2,t:"26年"},{x:5.5,w:2.2,t:"25年"},{x:7.7,w:2.0,t:"变动"}].forEach(({x,w,t})=>{
    sl.addText(t,{x,y:3.02,w,h:0.38,fontSize:10,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle",align:x===0.3?"left":"center"});
  });

  const rows2=[
    ["应付金额（元）",       d26.payable,    d25.payable,    false],
    ["实收净收入（元）",     d26.revenue,    d25.revenue,    false],
    ["优惠金额（元）",       d26.disc,       d25.disc,       true],
    ["优惠金额占比",         d26.discRate+"%", d25.discRate+"%", true],
    ["日均净收入（元）",     Math.round(d26.revenue/d26.days), Math.round(d25.revenue/d25.days), false],
  ];
  rows2.forEach(([label,v26,v25,inverse],i)=>{
    const y=3.42+i*0.42;
    const bg=i%2===0?C.white:C.gray1;
    sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:9.4,h:0.38,fill:{color:bg}});
    const isNum=typeof v26==="number";
    const d=isNum?v26-v25:null;
    const dStr=isNum?(d>=0?"+":"")+d.toLocaleString():(parseFloat(v26)-parseFloat(v25)).toFixed(1)+"pp";
    const dColor=isNum?(inverse?d<0?C.green:C.red:d>=0?C.green:C.red):
      (parseFloat(v26)>parseFloat(v25))?(inverse?C.green:C.red):(inverse?C.red:C.green);
    sl.addText(label,{x:0.45,y,w:2.8,h:0.38,fontSize:10,color:C.text,fontFace:"Microsoft YaHei",valign:"middle"});
    sl.addText(isNum?v26.toLocaleString():v26,{x:3.3,y,w:2.2,h:0.38,fontSize:10,bold:true,color:C.navy,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText(isNum?v25.toLocaleString():v25,{x:5.5,y,w:2.2,h:0.38,fontSize:10,color:C.muted,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText(dStr,{x:7.7,y,w:2.0,h:0.38,fontSize:10,bold:true,color:dColor,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
  });
}

// ============================================================
// 通用函數：免費用戶頁
// ============================================================
function makeFreeSlide(d26, d25, periodLabel, periodDesc, slideTag) {
  const sl = pres.addSlide();
  slideHeader(sl, `四、免费用户  ·  ${periodLabel}`, slideTag);
  subLabel(sl, 0.3, 0.78, periodDesc);

  // 說明條
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:1.05,w:9.4,h:0.36,fill:{color:C.bluePale}});
  sl.addText([
    {text:"维度①",options:{bold:true,color:C.navy}},
    {text:"  30分钟以下（绝对免费，无订单记录）        ",options:{color:C.text}},
    {text:"维度②",options:{bold:true,color:C.navy}},
    {text:"  30分钟以上实缴为0（权益/券/积分全额抵扣）",options:{color:C.text}},
  ],{x:0.45,y:1.05,w:9.1,h:0.36,fontSize:10,fontFace:"Microsoft YaHei",valign:"middle"});

  // 表格
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:1.52,w:9.4,h:0.38,fill:{color:C.navy}});
  const fHdrs=[{x:0.3,w:2.8,t:"分类"},{x:3.1,w:1.6,t:"26年数量"},{x:4.7,w:1.6,t:"25年数量"},{x:6.3,w:1.3,t:"差值"},{x:7.6,w:1.0,t:"26年占总%"},{x:8.6,w:1.1,t:"25年占总%"}];
  fHdrs.forEach(({x,w,t})=>{
    sl.addText(t,{x,y:1.52,w,h:0.38,fontSize:10,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle",align:x===0.3?"left":"center"});
  });

  const freeAbove30_26_pctOfTotal = (d26.freeAbove30/d26.total*100).toFixed(1);
  const freeAbove30_25_pctOfTotal = (d25.freeAbove30/d25.total*100).toFixed(1);
  const totalFree26=d26.u30+d26.freeAbove30, totalFree25=d25.u30+d25.freeAbove30;

  const fRows=[
    ["①30分钟以下（免费）", d26.u30, d25.u30, (d26.u30/d26.total*100).toFixed(1), (d25.u30/d25.total*100).toFixed(1)],
    ["②30分以上实缴为0",    d26.freeAbove30, d25.freeAbove30, freeAbove30_26_pctOfTotal, freeAbove30_25_pctOfTotal],
    ["合计免费车次",         totalFree26, totalFree25, (totalFree26/d26.total*100).toFixed(1), (totalFree25/d25.total*100).toFixed(1)],
    ["付费车次",             d26.total-totalFree26, d25.total-totalFree25, ((d26.total-totalFree26)/d26.total*100).toFixed(1), ((d25.total-totalFree25)/d25.total*100).toFixed(1)],
  ];
  fRows.forEach(([label,v26,v25,p26,p25],i)=>{
    const y=1.92+i*0.52;
    const isTotal=i===2, isPaid=i===3;
    const bg=isTotal?"EBF2FC":isPaid?"EAFAF2":i%2===0?C.white:C.gray1;
    sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:9.4,h:0.48,fill:{color:bg}});
    if(isTotal||isPaid) sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:0.06,h:0.48,fill:{color:isTotal?C.blue:C.green}});
    const d=v26-v25, dColor=d<0?(isPaid?C.green:C.red):(isPaid?C.red:C.green);
    sl.addText(label,{x:0.45,y,w:2.6,h:0.48,fontSize:10,bold:isTotal,color:C.text,fontFace:"Microsoft YaHei",valign:"middle"});
    sl.addText(v26.toLocaleString(),{x:3.1,y,w:1.6,h:0.48,fontSize:10,bold:true,color:C.navy,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText(v25.toLocaleString(),{x:4.7,y,w:1.6,h:0.48,fontSize:10,color:C.muted,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText((d>0?"+":"")+d.toLocaleString(),{x:6.3,y,w:1.3,h:0.48,fontSize:10,bold:true,color:dColor,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText(p26+"%",{x:7.6,y,w:1.0,h:0.48,fontSize:10,color:C.text,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText(p25+"%",{x:8.6,y,w:1.1,h:0.48,fontSize:10,color:C.muted,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
  });

  // 補充：實繳0佔30分鐘以上訂單比例
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:4.16,w:9.4,h:0.38,fill:{color:C.orangePale}});
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:4.16,w:0.06,h:0.38,fill:{color:C.orange}});
  sl.addText(
    `实缴为0订单占30分钟以上订单比例：26年 ${d26.freeAbove30PctOfAbove30}%（${d26.freeAbove30.toLocaleString()}/${d26.above30.toLocaleString()}）  |  25年 ${d25.freeAbove30PctOfAbove30}%（${d25.freeAbove30.toLocaleString()}/${d25.above30.toLocaleString()}）  |  变动 ${(d26.freeAbove30PctOfAbove30-d25.freeAbove30PctOfAbove30).toFixed(1)}pp`,
    {x:0.45,y:4.16,w:9.2,h:0.38,fontSize:10,color:C.text,fontFace:"Microsoft YaHei",valign:"middle"});

  // 圓餅圖（放大+修正圖例+25年用對比色）
  const pL=["30分以下免费","30分以上实缴0","付费"];
  const pv26=[d26.u30/d26.total*100, d26.freeAbove30/d26.total*100, (d26.total-totalFree26)/d26.total*100].map(v=>+v.toFixed(1));
  const pv25=[d25.u30/d25.total*100, d25.freeAbove30/d25.total*100, (d25.total-totalFree25)/d25.total*100].map(v=>+v.toFixed(1));
  sl.addChart(pres.charts.PIE,[{name:"26年",labels:pL,values:pv26}],
    {x:0.3,y:4.55,w:4.6,h:1.0,
     chartColors:[C.blueLight,C.orange,C.green],
     showPercent:true,showLegend:true,legendPos:"r",legendFontSize:9,
     dataLabelFontSize:10,dataLabelColor:"FFFFFF",
     showTitle:true,title:"26年结构",titleFontSize:11});
  sl.addChart(pres.charts.PIE,[{name:"25年",labels:pL,values:pv25}],
    {x:5.1,y:4.55,w:4.6,h:1.0,
     chartColors:["7B9ED9","D97B3A","5BAD7B"],
     showPercent:true,showLegend:true,legendPos:"r",legendFontSize:9,
     dataLabelFontSize:10,dataLabelColor:"FFFFFF",
     showTitle:true,title:"25年结构",titleFontSize:11});
}

// ============================================================
// 通用函數：優惠券頁
// ============================================================
function makeCouponSlide(d26, d25, periodLabel, periodDesc, slideTag) {
  const sl = pres.addSlide();
  slideHeader(sl, `五、优惠券使用  ·  ${periodLabel}`, slideTag);
  subLabel(sl, 0.3, 0.78, periodDesc);

  const couponDiff=d26.coupon-d25.coupon;
  const ppDiff=(d26.couponPct-d25.couponPct).toFixed(1);

  bigCard(sl,0.3, 1.05,3.0,1.75,"用券车次（26年）",
    d26.coupon.toLocaleString(), d25.coupon.toLocaleString(),
    `▼ ${Math.abs(couponDiff).toLocaleString()}（${pct(d26.coupon,d25.coupon)}%）`,"red");
  bigCard(sl,3.55,1.05,3.0,1.75,"用券占总车次（26年）",
    d26.couponPct+"%", d25.couponPct+"%",
    `▼ ${Math.abs(ppDiff)}pp`,"red");
  bigCard(sl,6.8, 1.05,2.9,1.75,"用券用户均停（26年）",
    d26.durCoupon+"分", d25.durCoupon+"分",
    `${(d26.durCoupon-d25.durCoupon).toFixed(1)}分`,
    dc(d26.durCoupon,d25.durCoupon));

  // 停車時長對比
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:3.02,w:9.4,h:0.38,fill:{color:C.navy}});
  [{x:0.3,w:3.5,t:"指标"},{x:3.8,w:2.5,t:"26年"},{x:6.3,w:2.5,t:"25年"},{x:8.8,w:0.9,t:"差值"}].forEach(({x,w,t})=>{
    sl.addText(t,{x,y:3.02,w,h:0.38,fontSize:10,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle",align:x===0.3?"left":"center"});
  });

  [
    ["用券车次",           d26.coupon.toLocaleString(), d25.coupon.toLocaleString(), (d26.coupon-d25.coupon>0?"+":"")+((d26.coupon-d25.coupon)).toLocaleString(), d26.coupon<d25.coupon],
    ["用券占总车次",       d26.couponPct+"%", d25.couponPct+"%", (d26.couponPct-d25.couponPct>0?"+":"")+(d26.couponPct-d25.couponPct).toFixed(1)+"pp", d26.couponPct<d25.couponPct],
    ["用券用户平均停车时长", d26.durCoupon+"分钟", d25.durCoupon+"分钟", (d26.durCoupon-d25.durCoupon>0?"+":"")+(d26.durCoupon-d25.durCoupon).toFixed(1)+"分钟", d26.durCoupon<d25.durCoupon],
    ["未用券用户平均停车时长",d26.durNoCoupon+"分钟", d25.durNoCoupon+"分钟", (d26.durNoCoupon-d25.durNoCoupon>0?"+":"")+(d26.durNoCoupon-d25.durNoCoupon).toFixed(1)+"分钟", false],
    ["用券 vs 未用券时长差", (d26.durCoupon-d26.durNoCoupon).toFixed(1)+"分钟", (d25.durCoupon-d25.durNoCoupon).toFixed(1)+"分钟", "—", false],
  ].forEach(([label,v26,v25,dStr,isNeg],i)=>{
    const y=3.42+i*0.42;
    const bg=i%2===0?C.white:C.gray1;
    sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:9.4,h:0.38,fill:{color:bg}});
    const dColor=isNeg?C.red:C.green;
    sl.addText(label,{x:0.45,y,w:3.3,h:0.38,fontSize:10,color:C.text,fontFace:"Microsoft YaHei",valign:"middle"});
    sl.addText(v26,{x:3.8,y,w:2.5,h:0.38,fontSize:10,bold:true,color:C.navy,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText(v25,{x:6.3,y,w:2.5,h:0.38,fontSize:10,color:C.muted,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText(dStr,{x:8.8,y,w:0.9,h:0.38,fontSize:10,bold:dStr!=="—",color:dStr==="—"?C.muted:dColor,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
  });

  // 說明
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:5.47,w:9.4,h:0.04,fill:{color:C.orange}});
}

// ============================================================
// 通用函數：會員結構頁（含客流+天氣合併）
// ============================================================
function makeMemberSlide(d26, d25, periodLabel, periodDesc, slideTag) {
  const sl = pres.addSlide();
  slideHeader(sl, `六、会员结构 & 商场客流  ·  ${periodLabel}`, slideTag);
  subLabel(sl, 0.3, 0.78, periodDesc);

  // 左：會員表
  sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.95,w:5.5,h:0.36,fill:{color:C.navy}});
  [{x:0.3,w:1.5,t:"等级"},{x:1.8,w:1.2,t:"26年"},{x:3.0,w:1.2,t:"25年"},{x:4.2,w:1.6,t:"差值（%）"}].forEach(({x,w,t})=>{
    sl.addText(t,{x,y:0.95,w,h:0.36,fontSize:10,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle",align:x===0.3?"left":"center"});
  });

  const levels=["悦卡","银卡","金卡","钻石卡","非会员"];
  levels.forEach((lv,i)=>{
    const y=1.33+i*0.48;
    const v26=d26.members[lv]||0, v25=d25.members[lv]||0;
    const d=v26-v25, dPct=pct(v26,v25);
    const bg=i%2===0?C.white:C.gray1;
    const isGold=lv==="金卡";
    if(isGold) sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:5.5,h:0.44,fill:{color:"FFF8E1"}});
    else sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:5.5,h:0.44,fill:{color:bg}});
    const dColor=d<0?C.red:C.green;
    sl.addText(lv,{x:0.45,y,w:1.3,h:0.44,fontSize:10,color:C.text,fontFace:"Microsoft YaHei",valign:"middle"});
    sl.addText(v26.toLocaleString(),{x:1.8,y,w:1.2,h:0.44,fontSize:10,bold:true,color:C.navy,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText(v25.toLocaleString(),{x:3.0,y,w:1.2,h:0.44,fontSize:10,color:C.muted,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    sl.addText((d>0?"+":"")+d.toLocaleString()+"（"+(d>0?"+":"")+dPct+"%）",
      {x:4.2,y,w:1.6,h:0.44,fontSize:9.5,bold:true,color:dColor,fontFace:"Microsoft YaHei",valign:"middle",align:"center"});
    if(isGold){
      sl.addShape(pres.shapes.RECTANGLE,{x:0.3,y,w:0.05,h:0.44,fill:{color:C.orange}});
    }
  });

  // 右：客流+天氣
  const footDiff=d26.foot-d25.foot;
  const footPct=pct(d26.foot,d25.foot);
  bigCard(sl,6.1,0.95,3.6,1.62,"商场客流（26年）",
    d26.foot.toLocaleString(), d25.foot.toLocaleString(),
    `${footDiff>=0?"▲":"▼"} ${Math.abs(footDiff).toLocaleString()}（${footDiff>=0?"+":""}${footPct}%）`,
    dc(d26.foot,d25.foot));
  bigCard(sl,6.1,2.75,3.6,1.62,"开车进场率（26年）",
    d26.driveRate+"%", d25.driveRate+"%",
    `▼ ${(d26.driveRate-d25.driveRate).toFixed(1)}pp`,
    dc(d26.driveRate,d25.driveRate));

  // 天氣
  sl.addShape(pres.shapes.RECTANGLE,{x:6.1,y:4.5,w:3.6,h:0.38,fill:{color:C.navy}});
  sl.addText("天气干扰排查",{x:6.1,y:4.5,w:3.6,h:0.38,fontSize:10,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle",margin:8});
  const rainMsg = d26.rain===0 && d25.rain===0
    ? "两周期雨雪天数均为0天，天气干扰排除"
    : `26年${d26.rain}天 vs 25年${d25.rain}天，差异微小，可互相抵消`;
  sl.addShape(pres.shapes.RECTANGLE,{x:6.1,y:4.9,w:3.6,h:0.62,fill:{color:C.greenPale}});
  sl.addText(rainMsg,{x:6.2,y:4.9,w:3.4,h:0.62,fontSize:10,color:C.green,fontFace:"Microsoft YaHei",valign:"middle",bold:true});

  // 會員結構柱狀圖
  sl.addChart(pres.charts.BAR,[
    {name:"26年",labels:levels,values:levels.map(l=>d26.members[l]||0)},
    {name:"25年",labels:levels,values:levels.map(l=>d25.members[l]||0)},
  ],{x:0.3,y:3.75,w:5.5,h:1.7,barDir:"col",
    chartColors:[C.blueLight,C.gray2],chartArea:{fill:{color:C.white}},
    catAxisLabelColor:C.muted,valAxisLabelColor:C.muted,
    valGridLine:{color:"E2E8F0",size:0.5},catGridLine:{style:"none"},
    showValue:false,showLegend:true,legendPos:"t",legendFontSize:9,showTitle:false});
}

// ============================================================
// 生成所有內容頁（A / B 各一份）
// ============================================================
const descA26="2026年2月1日—2月23日（23天）  vs  2025年1月12日—2月4日（24天）";
const descB26="2026年2月1日—4月13日（72天）  vs  2025年2月2日—4月14日（72天）";

makeFlowSlide(  D.A26,D.A25,"周期A · 春节周期",descA26,"2/12");
makeFlowSlide(  D.B26,D.B25,"周期B · 长周期",  descB26,"3/12");
makeDurSlide(   D.A26,D.A25,"周期A · 春节周期",descA26,"4/12");
makeDurSlide(   D.B26,D.B25,"周期B · 长周期",  descB26,"5/12");
makeRevenueSlide(D.A26,D.A25,"周期A · 春节周期",descA26,"6/12");
makeRevenueSlide(D.B26,D.B25,"周期B · 长周期",  descB26,"7/12");
makeFreeSlide(  D.A26,D.A25,"周期A · 春节周期",descA26,"8/12");
makeFreeSlide(  D.B26,D.B25,"周期B · 长周期",  descB26,"9/12");
makeCouponSlide(D.A26,D.A25,"周期A · 春节周期",descA26,"10/12");
makeCouponSlide(D.B26,D.B25,"周期B · 长周期",  descB26,"11/12");
makeMemberSlide(D.A26,D.A25,"周期A · 春节周期",descA26,"12/12（上）");
makeMemberSlide(D.B26,D.B25,"周期B · 长周期",  descB26,"12/12（下）");

// ============================================================
// SLIDE 最後：分析总结
// ============================================================
const slC = pres.addSlide();
slC.background = { color: C.navyDark };
slC.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.75,fill:{color:C.navy}});
slC.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:0.08,h:0.75,fill:{color:C.orange}});
slC.addText("分析总结",{x:0.22,y:0,w:9,h:0.75,fontSize:24,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle"});

const conclusions=[
  {c:C.red,   n:"1",t:"春节周期车流实质下降14.6%，客流萎缩是根本原因",
   b:"总车次58,904，同比减少10,034（-14.6%）。同期商场客流下降9.8%（减少78,199人次），来商场的人本身减少。政策收紧（取消任意消费得券）进一步压低开车进场率从8.7%至8.2%。净收入跌幅（-20.4%）远超车流跌幅，天气干扰已排除（两周期雨雪天数均为0）。"},
  {c:C.orange,n:"2",t:"长周期车流持平（-0.8%），但开车进场率系统性下滑",
   b:"总车次166,400，同比几乎持平（-0.8%）。然而商场客流大增+11.1%（+20.3万人次），增加的客流没有转化为停车。开车进场率从9.2%跌至8.2%（-1.0pp），每100位到访客户中开车进场减少约1个。停车场对到访客流的吸引力在持续弱化。"},
  {c:C.red,   n:"3",t:"用券率两周期均断崖下滑，政策影响直接量化",
   b:"春节周期用券车次9,187 vs 25年16,299（-43.6%）；长周期23,366 vs 38,430（-39.2%）。新政策取消「任意消费积分即得+1小时券」是直接原因。用券用户停车时长（约145分钟）比未用券用户（约106分钟）长约40分钟，说明券是带动深度消费的工具，政策削减后深度消费用户进场行为明显改变。"},
  {c:C.red,   n:"4",t:"金卡会员两周期均流失40%以上，高价值客群异常退出",
   b:"金卡：春节周期2,896→1,449（-50.0%），长周期8,490→5,092（-40.0%）。其他等级变动在合理范围，唯独金卡持续大幅流失。新政策对金卡权益缩水最明显（满288元叠加券从+3小时降至+2小时），可能是主因。建议结合消费记录进一步追查。"},
  {c:C.green, n:"5",t:"长周期净收入逆势增长+3.4%，付费用户质量提升",
   b:"净收入288,265元，同比+3.4%；优惠金额占比从65.0%降至64.1%，优惠效率略有改善。付费车次占比从32.6%升至33.6%，付费用户停留深度提升。短期收入韧性尚好，但若开车进场率下滑趋势不扭转，长期增长空间将受制约。"},
];

conclusions.forEach((c,i)=>{
  const col=i<3?0:1, row=i<3?i:i-3;
  const x=col===0?0.22:5.22, y=0.88+row*1.55, w=4.7;
  slC.addShape(pres.shapes.RECTANGLE,{x,y,w,h:1.48,fill:{color:C.navyMid},shadow:makeShadow()});
  slC.addShape(pres.shapes.RECTANGLE,{x,y,w:0.06,h:1.48,fill:{color:c.c}});
  slC.addShape(pres.shapes.RECTANGLE,{x:x+0.14,y:y+0.1,w:0.3,h:0.3,fill:{color:c.c}});
  slC.addText(c.n,{x:x+0.14,y:y+0.1,w:0.3,h:0.3,fontSize:11,bold:true,color:C.white,fontFace:"Microsoft YaHei",align:"center",valign:"middle"});
  slC.addText(c.t,{x:x+0.52,y:y+0.1,w:w-0.62,h:0.34,fontSize:10.5,bold:true,color:C.white,fontFace:"Microsoft YaHei",valign:"middle"});
  slC.addText(c.b,{x:x+0.14,y:y+0.5,w:w-0.25,h:0.92,fontSize:8.5,color:"B8C8E8",fontFace:"Microsoft YaHei",valign:"top"});
});

pres.writeFile({fileName:"/Users/jack/Desktop/fx/停车场分析报告_v2.pptx"})
  .then(()=>console.log("Done ✓"))
  .catch(e=>console.error(e));
