'use strict';

/* 教師密碼（顯示答案用）：改呢度就轉到密碼 */
const TEACHER_PW = '2897';

/* =========================================================
   題目資料
   ---------------------------------------------------------
   items  : 每個項目嘅名稱、計算式、金額
            col     : 金額應該放邊欄（'inner' 內欄 / 'outer' 外欄）
            group   : 分組名（有 group 嘅項目喺同一節入面可以互換位置）
            amtOnly : 淨係出現在金額區（例如總額數字），唔會有名稱 BAR
   layout : 損益表由上至下每一行
            { t:'bar', id, group?, underline?, double?, outerExpect? }  有得擺嘢嘅空位（outerExpect = 外欄要擺嘅總額金額 id，學生要拉過去）
            { t:'section', label }                       固定小節標題
            { t:'total', label, amount, underline? }     自動顯示嘅總額列
   ========================================================= */
const QUESTIONS = [
{
  tab: '第一題 · 子怡公司',
  company: '子怡公司',
  title: '損益表',
  period: '截至 2023 年度 12 月 31 日止年度',
  brief: [
    '子怡公司於 2023 年 1 月 1 日開始營運，製造單一產品——產品 Y。2023 年度的資料如下：',
    { list: ['產品 Y 的實際每件生產成本如下：'] },
    { table: {
        head: ['', '$'],
        align: ['l', 'r'],
        rows: [
          ['直接原料成本', '5.3'],
          ['直接人工成本（每直接人工小時 $45）', '13.5'],
          ['變動生產間接成本', '6'],
          ['固定生產間接成本', '?']
        ]
    }},
    { list: [
      '預定固定生產間接成本吸收率為每直接人工小時 $5。2023 年的實際固定生產間接成本與預算的金額相同。',
      '預算與實際生產數量分別為 45 000 件和 47 000 件。',
      '預算與實際銷售數量相同。',
      '貢獻毛益率為 35%。',
      '期末存貨為 3 500 件。',
      '2023 年的實際銷售費用為 $138 750，與預算相同。銷售費用的變動成分為每件 $2.5，按銷售水平變動。'
    ], start: 2 },
    '作業要求：',
    { list: [
      '按邊際成本法編製截至 2023 年 12 月 31 日止年度的損益表。',
      '如公司改用吸收成本法，輔以相關計算，解釋這會對 2023 年的淨利有什麼影響。'
    ], marker: 'a' },
    '試將項目名稱同金額（包括總額）分別放入損益表嘅適當位置（作業 (a)）。'
  ],
  items: {
    sales: { label:'銷貨',             formula:'$1 187 550 ÷ (1 − 0.35)',           amount:'1 827 000',  col:'outer' },
    mat:   { label:'直接原料成本',     formula:'($5.3 × 43 500)',                    amount:'230 550',    col:'inner', group:'var' },
    lab:   { label:'直接人工成本',     formula:'($13.5 × 43 500)',                   amount:'587 250',    col:'inner', group:'var' },
    voh:   { label:'變動生產間接成本', formula:'($6 × 43 500)',                      amount:'261 000',    col:'inner', group:'var' },
    vprod: { label:'變動生產成本',     formula:'[($5.3 + $13.5 + $6) × (47 000 − 3 500)]', amount:'1 078 800', col:'inner', group:'var' },
    vsell: { label:'變動銷售費用',     formula:'[$2.5 × (47 000 − 3 500)]',          amount:'108 750',    col:'inner', group:'var' },
    vtotal:{ label:'變動成本總額',     formula:'',                                   amount:'1 187 550',  col:'outer', amtOnly:true },
    cm:    { label:'邊際貢獻',         formula:'',                                   amount:'639 450',    col:'outer' },
    foh:   { label:'固定生產間接成本', formula:'($5 × $13.5 ÷ 45 × 45 000)',         amount:'67 500',     col:'outer', group:'fix' },
    fsell: { label:'固定銷售費用',     formula:'[$138 750 − ($2.5 × 43 500)]',       amount:'30 000',     col:'outer', group:'fix' },
    np:    { label:'淨利',             formula:'',                                   amount:'541 950',    col:'outer' }
  },
  layout: [
    { t:'bar',     id:'sales' },
    { t:'section', label:'減：變動成本' },
    { t:'bar',     id:'mat',   group:'var' },
    { t:'bar',     id:'lab',   group:'var' },
    { t:'bar',     id:'voh',   group:'var' },
    { t:'bar',     id:'vprod', group:'var' },
    { t:'bar',     id:'vsell', group:'var', underline:true, outerExpect:'vtotal' },
    { t:'bar',     id:'cm' },
    { t:'section', label:'減：固定成本' },
    { t:'bar',     id:'foh',   group:'fix' },
    { t:'bar',     id:'fsell', underline:true, group:'fix' },
    { t:'bar',     id:'np', double:true }
  ]
},
{
  tab: '第二題 · 時尚公司',
  company: '時尚有限公司',
  title: '損益表',
  period: '截至 2021 年 12 月 31 日止年度',
  brief: [
    '時尚有限公司生產女裝手袋。企業在截至 2021 年 12 月 31 日止年度生產了 10 000 個同一設計的手袋。詳細成本資料如下：',
    { table: {
        caption: '詳細成本資料',
        head: ['成本項目', '金額'],
        rows: [
          ['直接原料（每生產一件）', '$200'],
          ['直接人工（每生產一件）', '$250'],
          ['生產間接成本 — 變動（每生產一件）', '$50'],
          ['生產間接成本 — 固定（全年總額）', '$800 000'],
          ['銷售及行政費用 — 變動（每售出一件）', '$20'],
          ['銷售及行政費用 — 固定（全年總額）', '$1 200 000']
        ]
    }},
    '假設企業沒有期初存貨，並以每個 $1 200 的價格售出 8 000 個手袋。',
    '公司採用邊際成本法編製損益表。試將項目名稱同金額（包括總額）分別放入損益表嘅適當位置。'
  ],
  items: {
    sales: { label:'銷貨',               formula:'($1 200 × 8 000)',             amount:'9 600 000',  col:'outer' },
    mat:   { label:'直接原料成本',       formula:'($200 × 8 000)',               amount:'1 600 000',  col:'inner', group:'var' },
    lab:   { label:'直接人工成本',       formula:'($250 × 8 000)',               amount:'2 000 000',  col:'inner', group:'var' },
    voh:   { label:'變動生產間接成本',   formula:'($50 × 8 000)',                amount:'400 000',    col:'inner', group:'var' },
    vsell: { label:'變動銷售及行政費用', formula:'($20 × 8 000)',                amount:'160 000',    col:'inner', group:'var' },
    vtotal:{ label:'變動成本總額',       formula:'',                             amount:'4 160 000',  col:'outer', amtOnly:true },
    cm:    { label:'邊際貢獻',           formula:'',                             amount:'5 440 000',  col:'outer' },
    foh:   { label:'固定生產間接成本',   formula:'',                             amount:'800 000',    col:'outer', group:'fix' },
    fsell: { label:'固定銷售及行政費用', formula:'',                             amount:'1 200 000',  col:'outer', group:'fix' },
    np:    { label:'淨利',               formula:'',                             amount:'3 440 000',  col:'outer' }
  },
  layout: [
    { t:'bar',     id:'sales' },
    { t:'section', label:'減：變動成本' },
    { t:'bar',     id:'mat',   group:'var' },
    { t:'bar',     id:'lab',   group:'var' },
    { t:'bar',     id:'voh',   group:'var' },
    { t:'bar',     id:'vsell', group:'var', underline:true, outerExpect:'vtotal' },
    { t:'bar',     id:'cm' },
    { t:'section', label:'減：固定成本' },
    { t:'bar',     id:'foh',   group:'fix' },
    { t:'bar',     id:'fsell', underline:true, group:'fix' },
    { t:'bar',     id:'np', double:true }
  ]
},
{
  tab: '第三題 · 張先生企業',
  company: '張先生企業',
  title: '損益表',
  period: '截至 2022 年 12 月 31 日止年度',
  brief: [
    '張先生的製造企業在 2022 年 1 月 1 日開業。以下數字摘錄自截至 2022 年 12 月 31 日止年度的帳冊：',
    { table: {
        head: ['項目', '金額'],
        align: ['l', 'r'],
        rows: [
          ['產量', '18 000 件'],
          ['銷量', '17 000 件'],
          ['直接原料', '$200 每生產一件'],
          ['直接人工', '$300 每生產一件'],
          ['變動生產間接成本', '$100 每生產一件'],
          ['固定生產間接成本', '$800 000'],
          ['非生產成本 — 變動', '$60 每售出一件'],
          ['非生產成本 — 固定', '$1 000 000'],
          ['售價', '$1 000 每件']
        ]
    }},
    '固定生產間接成本按預定吸收率每件 $40 吸收至產品。該年度的實際固定生產間接成本與預算金額相同。',
    '作業要求：',
    { list: ['按邊際成本法為張先生的企業編製截至 2022 年 12 月 31 日止年度的損益表。'], marker: 'a' },
    '試將項目名稱同金額（包括總額）分別放入損益表嘅適當位置。'
  ],
  items: {
    sales: { label:'銷貨',             formula:'($1 000 × 17 000)',             amount:'17 000 000', col:'outer' },
    mat:   { label:'直接原料成本',     formula:'($200 × 17 000)',               amount:'3 400 000',  col:'inner', group:'var' },
    lab:   { label:'直接人工成本',     formula:'($300 × 17 000)',               amount:'5 100 000',  col:'inner', group:'var' },
    voh:   { label:'變動生產間接成本', formula:'($100 × 17 000)',               amount:'1 700 000',  col:'inner', group:'var' },
    vprod: { label:'變動生產成本',     formula:'[($200 + $300 + $100) × 17 000]', amount:'10 200 000', col:'inner', group:'var' },
    vnon:  { label:'變動非生產成本',   formula:'($60 × 17 000)',                amount:'1 020 000',  col:'inner', group:'var' },
    vtotal:{ label:'變動成本總額',     formula:'',                              amount:'11 220 000', col:'outer', amtOnly:true },
    cm:    { label:'邊際貢獻',         formula:'',                              amount:'5 780 000',  col:'outer' },
    foh:   { label:'固定生產間接成本', formula:'',                              amount:'800 000',    col:'outer', group:'fix' },
    fnon:  { label:'固定非生產成本',   formula:'',                              amount:'1 000 000',  col:'outer', group:'fix' },
    np:    { label:'淨利',             formula:'',                              amount:'3 980 000',  col:'outer' }
  },
  layout: [
    { t:'bar',     id:'sales' },
    { t:'section', label:'減：變動成本' },
    { t:'bar',     id:'mat',   group:'var' },
    { t:'bar',     id:'lab',   group:'var' },
    { t:'bar',     id:'voh',   group:'var' },
    { t:'bar',     id:'vprod', group:'var' },
    { t:'bar',     id:'vnon',  group:'var', underline:true, outerExpect:'vtotal' },
    { t:'bar',     id:'cm' },
    { t:'section', label:'減：固定成本' },
    { t:'bar',     id:'foh',   group:'fix' },
    { t:'bar',     id:'fnon',  underline:true, group:'fix' },
    { t:'bar',     id:'np', double:true }
  ]
},
{
  tab: '第四題 · 奧慧公司',
  company: '奧慧有限公司',
  title: '損益表',
  period: '截至 2019 年 3 月 31 日止季度',
  brief: [
    '奧慧有限公司生產電器。總生產間接成本按生產數量吸收。截至 2018 年 12 月 31 日止年度的銷售和成本資料如下：',
    { table: {
        caption: '截至 2018 年 12 月 31 日止年度',
        head: ['項目', '$', '$'],
        align: ['l', 'r', 'r'],
        rows: [
          ['銷售', '', '1 800 000'],
          ['減：直接原料', '800 000', ''],
          ['直接人工', '250 000', ''],
          ['生產間接成本 — 固定', '190 000', ''],
          ['— 變動', '156 000', ''],
          ['行政費用 — 固定', '139 400', ''],
          ['銷售與分銷費用 — 固定', '90 000', '1 625 400'],
          ['淨利', '', '174 600']
        ]
    }},
    '公司於 2018 年 12 月 31 日並無存貨。截至 2019 年 3 月 31 日止季度，有以下改變：',
    { list: [
      '降低售價 5%',
      '增加銷貨量 20%',
      '增加生產量 30%',
      '固定生產間接成本增至 $210 000',
      '增加固定銷售與分銷費用 $10 000',
      '透過大量購買，降低直接原料單位價格 8%'
    ]},
    '每小時直接人工工資率、每件產品的變動生產間接成本及固定行政費用均維持不變。',
    '試按邊際成本法編製截至 2019 年 3 月 31 日止季度的損益表，將項目名稱同金額（包括總額）分別放入損益表嘅適當位置。'
  ],
  items: {
    sales: { label:'銷貨',             formula:'($1 800 000 × 120% × 95%)',   amount:'2 052 000',  col:'outer' },
    mat:   { label:'直接原料',         formula:'($800 000 × 120% × 92%)',     amount:'883 200',    col:'inner', group:'var' },
    lab:   { label:'直接人工',         formula:'($250 000 × 120%)',           amount:'300 000',    col:'inner', group:'var' },
    voh:   { label:'生產間接成本',     formula:'($156 000 × 120%)',           amount:'187 200',    col:'inner', group:'var', tag:'變動' },
    vtotal:{ label:'變動成本總額',     formula:'',                            amount:'1 370 400',  col:'outer', amtOnly:true },
    cm:    { label:'貢獻毛益',         formula:'',                            amount:'681 600',    col:'outer' },
    foh:   { label:'生產間接成本',     formula:'',                            amount:'210 000',    col:'outer', tag:'固定', group:'fix' },
    fadm:  { label:'行政費用',         formula:'',                            amount:'139 400',    col:'outer', group:'fix' },
    fsell: { label:'銷售與分銷費用',   formula:'($90 000 + $10 000)',          amount:'100 000',    col:'outer', group:'fix' },
    np:    { label:'淨利',             formula:'',                            amount:'232 200',    col:'outer' }
  },
  layout: [
    { t:'bar',     id:'sales' },
    { t:'section', label:'減：變動成本' },
    { t:'bar',     id:'mat',   group:'var' },
    { t:'bar',     id:'lab',   group:'var' },
    { t:'bar',     id:'voh',   group:'var', underline:true, outerExpect:'vtotal' },
    { t:'bar',     id:'cm' },
    { t:'section', label:'減：固定成本' },
    { t:'bar',     id:'foh',   group:'fix' },
    { t:'bar',     id:'fadm',  group:'fix' },
    { t:'bar',     id:'fsell', underline:true, group:'fix' },
    { t:'bar',     id:'np', double:true }
  ]
}
];

/* =========================================================
   狀態
   ========================================================= */
let QUESTION = QUESTIONS[0];
let ITEMS, LAYOUT, BAR_ROWS, TOTAL;
let QI = 0;

const state = {
  items:     [],                 // 每行放咗邊個項目名稱
  amts:      [],                 // 每行嘅內欄 / 外欄放咗邊個金額
  selected:  null,               // { kind:'item'|'amt', id }
  drag:      null,               // { kind, id }
  trayItems: [],
  trayAmts:  [],
  feedback:  [],                 // 每行 { item:'ok'|'bad', amt:'ok'|'bad' }
  attempts:  0,
  lastScore: null,
  showFormula: false,   // 檢查答案後先顯示計算式
  td: null,                 // 觸控拖曳中途狀態
  touchSuppressUntil: 0     // 觸控拖曳後要食咗嘅合成 click
};

function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esc(s){
  return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

/* 題目資料表（成本未分類，學生要自己判斷變動／固定） */
function tableHtml(t){
  const cls = (i) => (t.align && t.align[i] === 'r') ? ' class="num"' : '';
  const head = t.head ? `<thead><tr>${t.head.map((h, i) => `<th${cls(i)}>${esc(h)}</th>`).join('')}</tr></thead>` : '';
  const body = `<tbody>${t.rows.map(r => `<tr>${r.map((c, i) => `<td${cls(i)}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  return `<figure class="qfig">${t.caption ? `<figcaption>${esc(t.caption)}</figcaption>` : ''}<table class="qtable">${head}${body}</table></figure>`;
}

/* 題目有序清單（預設 (i)(ii)…；start 續編號，marker:'a' 用 (a)(b)…） */
function listHtml(items, t){
  const cls = (t.marker === 'a') ? 'qlist alpha' : 'qlist';
  const style = (t.start && t.start > 1) ? ` style="counter-reset:qi ${t.start - 1}"` : '';
  return `<ol class="${cls}"${style}>${items.map(s => `<li>${esc(s)}</li>`).join('')}</ol>`;
}

function initState(){
  state.items     = LAYOUT.map(() => null);
  state.amts      = LAYOUT.map(() => ({ inner:null, outer:null }));
  state.feedback  = LAYOUT.map(() => null);
  state.selected  = null;
  state.drag      = null;
  state.showFormula = false;
  state.td = null;
  state.touchSuppressUntil = 0;
  state.attempts  = 0;
  state.lastScore = null;
  state.trayItems = shuffle(Object.keys(ITEMS).filter(k => !ITEMS[k].amtOnly));
  state.trayAmts  = shuffle(Object.keys(ITEMS));
}

/* =========================================================
   批改規則
   ========================================================= */
// 有 group 嘅行：同 group 嘅項目都可以；冇 group：必須係指定項目
function allowed(row, item){
  return row.group ? item.group === row.group : row.id === item.id;
}

function amtCount(){
  return state.amts.reduce((n, c) => n + (c.inner ? 1 : 0) + (c.outer ? 1 : 0), 0);
}

function hasAnyAmt(row){
  return !!(state.amts[row].inner || state.amts[row].outer);
}

/* =========================================================
   渲染
   ========================================================= */
function verdict(v){
  if(!v) return '';
  return `<span class="verdict ${v === 'ok' ? 'v-ok' : 'v-bad'}">${v === 'ok' ? '✓' : '✗'}</span>`;
}

/* 計算式：未檢查之前唔顯示 */
function fmlHtml(it){
  return (state.showFormula && it.formula) ? `<span class="fml">${esc(it.formula)}</span>` : '';
}

function itemBar(id, mode){
  const it = ITEMS[id];
  const picked = state.selected && state.selected.kind === 'item' && state.selected.id === id;
  if(mode === 'tray'){
    return `<div class="bar bar--tray${picked ? ' selected' : ''}" draggable="true"
                 tabindex="0" role="button" data-kind="item" data-id="${id}"
                 title="撳一下揀起，再撳目標格放入">
              <span class="lbl">${esc(it.label)}${it.tag && !it.amtOnly ? `<span class="tag">${esc(it.tag)}</span>` : ''}</span>
              ${fmlHtml(it)}
            </div>`;
  }
  return `<div class="bar bar--item${picked ? ' selected' : ''}" draggable="true"
               tabindex="0" role="button" data-kind="item" data-id="${id}"
               title="撳一下揀起，再撳目標格放入">
            <span class="grip" aria-hidden="true">⠿</span>
            <span class="lbl">${esc(it.label)}</span>
            ${fmlHtml(it)}
            <button class="ret" type="button" title="放返項目區" aria-label="放返項目區">↩</button>
          </div>`;
}

function amtBar(id, mode){
  const it = ITEMS[id];
  const picked = state.selected && state.selected.kind === 'amt' && state.selected.id === id;
  if(mode === 'tray'){
    return `<div class="bar bar--tray bar--amt${picked ? ' selected' : ''}" draggable="true"
                 tabindex="0" role="button" data-kind="amt" data-id="${id}"
                 title="撳一下揀起，再撳金額欄放入">
              <span class="num">${esc(it.amount)}</span>
            </div>`;
  }
  return `<div class="bar bar--amt-in${picked ? ' selected' : ''}" draggable="true"
               tabindex="0" role="button" data-kind="amt" data-id="${id}"
               title="撳一下揀起，再撳目標金額欄放入">
            <span class="num">${esc(it.amount)}</span>
            <button class="ret" type="button" title="放返金額區" aria-label="放返金額區">↩</button>
          </div>`;
}

function zone(row, zoneName, label, content){
  return `<div class="cell ${zoneName === 'desc' ? 'cell-desc' : 'cell-amt'} zone"
               data-row="${row}" data-zone="${zoneName}" tabindex="0" role="button"
               aria-label="第 ${row + 1} 行 ${label}">${content}</div>`;
}

function barRowHtml(row, i){
  const itemId = state.items[i];
  const item   = itemId ? ITEMS[itemId] : null;
  const fb     = state.feedback[i];

  const cls = ['row','row--slot'];
  if(item || hasAnyAmt(i)) cls.push('filled');
  if(row.underline) cls.push('u');
  if(row.double) cls.push('dbl');
  if(fb){
    cls.push((fb.item === 'ok' && fb.amt === 'ok') ? 'ok' : 'bad');
  }

  /* 名稱欄 */
  let descInner;
  if(item){
    descInner = itemBar(itemId, 'cell') + verdict(fb && fb.item);
  }else{
    descInner = `<span class="zempty">拖入名稱</span>` + verdict(fb && fb.item);
  }

  /* 金額欄 */
  const cell = (col) => {
    const val = state.amts[i][col];
    let cls2 = ['cell','cell-amt','zone'];
    if(val) cls2.push('has');
    /* 呢格期望嘅金額（認數值唔認身份：相同數字嘅 BAR 可以互換） */
    const expectAmt = (item && col === item.col) ? item.amount
      : (col === 'outer' && row.outerExpect) ? ITEMS[row.outerExpect].amount
      : null;
    let v = '';
    if(fb){
      if(val){
        if(expectAmt && ITEMS[val].amount === expectAmt){
          // 同行名稱配對嘅金額：要求名稱都啱；外欄總額：獨立計
          const isPairCell = !!(item && col === item.col);
          v = (!isPairCell || fb.item === 'ok') ? 'ok' : 'bad';
        }else{
          v = 'bad';
        }
      }else if(expectAmt && !hasAnyAmt(i)){
        v = 'bad';
      }
    }
    if(v) cls2.push(v === 'ok' ? 'ok' : 'bad');

    const body = val
      ? amtBar(val, 'cell')
      : `<span class="zempty zempty--amt">$</span>`;

    return `<div class="${cls2.join(' ')}" data-row="${i}" data-zone="${col}"
                 tabindex="0" role="button" aria-label="第 ${i + 1} 行 ${col === 'inner' ? '內欄金額' : '外欄金額'}">
              ${body}${verdict(v)}
            </div>`;
  };

  return `<div class="${cls.join(' ')}" data-row="${i}">
            <div class="cell cell-desc zone" data-row="${i}" data-zone="desc" tabindex="0" role="button"
                 aria-label="第 ${i + 1} 行 名稱">${descInner}</div>
            ${cell('inner')}
            ${cell('outer')}
          </div>`;
}

function rowHtml(row, i){
  if(row.t === 'bar') return barRowHtml(row, i);

  if(row.t === 'section'){
    return `<div class="row row--section">
              <div class="cell cell-desc"><span class="lbl">${esc(row.label)}</span></div>
              <div class="cell cell-amt"></div><div class="cell cell-amt"></div>
            </div>`;
  }

  const cls = ['row','row--total'];
  if(row.underline) cls.push('u');
  if(row.double) cls.push('dbl');
  return `<div class="${cls.join(' ')}">
            <div class="cell cell-desc"><span class="lbl">${esc(row.label)}</span></div>
            <div class="cell cell-amt"></div>
            <div class="cell cell-amt has">${esc(row.amount)}</div>
          </div>`;
}

function renderTable(){
  let html = `<div class="row row--cols">
                <div class="cell"></div>
                <div class="cell cell-amt">$</div>
                <div class="cell cell-amt">$</div>
              </div>`;
  LAYOUT.forEach((row, i) => { html += rowHtml(row, i); });
  document.getElementById('table').innerHTML = html;
}

function renderTray(){
  const usedItems = new Set(state.items.filter(Boolean));
  const usedAmts  = new Set(state.amts.flatMap(c => [c.inner, c.outer]).filter(Boolean));

  const ids  = state.trayItems.filter(id => !usedItems.has(id));
  const aids = state.trayAmts.filter(id => !usedAmts.has(id));

  document.getElementById('trayCount').textContent = (ids.length + aids.length) + ' 個';

  const itemsEl = document.getElementById('trayItems');
  const amtsEl  = document.getElementById('trayAmts');

  if(!ids.length && !aids.length){
    itemsEl.innerHTML = `<div class="tray-empty">所有項目都已經放好 ✅
                           <span>撳「檢查答案」睇下啱唔啱</span></div>`;
    amtsEl.innerHTML  = '';
    return;
  }

  itemsEl.innerHTML = ids.length
    ? ids.map(id => itemBar(id, 'tray')).join('')
    : `<p class="tray-note">名稱放完 ✓</p>`;
  amtsEl.innerHTML = aids.length
    ? aids.map(id => amtBar(id, 'tray')).join('')
    : `<p class="tray-note">金額放完 ✓</p>`;
}

function renderHint(){
  const h = document.getElementById('hint');
  if(state.selected){
    const it = ITEMS[state.selected.id];
    const what = state.selected.kind === 'item'
      ? '名稱「' + it.label + (it.tag ? '（' + it.tag + '）' : '') + '」'
      : '金額「' + it.amount + '」';
    h.innerHTML = `已揀咗${what} → 撳損益表嘅目標格放入（再撳一次取消）。`;
    h.classList.add('active');
  }else{
    h.textContent = '長按可以直接拖（iPad 適用），或撳一下選取、再撳目標格。名稱拖去描述欄、金額（連總額）拖去啱嘅金額欄；「減：變動成本」同「減：固定成本」下面各行位置都可以互換。';
    h.classList.remove('active');
  }
}

function renderStats(){
  const placed = state.items.filter(Boolean).length + amtCount();
  document.getElementById('statPlaced').textContent = `已放置 ${placed} / ${TOTAL}`;
  document.getElementById('statScore').textContent  =
    state.lastScore == null ? '上次成績 —' : `上次成績 ${state.lastScore} / ${TOTAL}`;
  document.getElementById('statTries').textContent  = `嘗試 ${state.attempts} 次`;
}

function renderAll(){
  renderTable();
  renderTray();
  renderHint();
  renderStats();
}

/* =========================================================
   操作
   ========================================================= */
function afterChange(){
  state.feedback = LAYOUT.map(() => null);
  state.selected  = null;
  renderAll();
}

function placeItem(id, row){
  const r = LAYOUT[row];
  if(!r || r.t !== 'bar') return;
  const from = state.items.indexOf(id);
  if(from === row){ state.selected = null; renderAll(); return; }
  const occupant = state.items[row];
  if(from >= 0) state.items[from] = occupant;
  state.items[row] = id;
  afterChange();
}

function placeAmt(id, row, col){
  const r = LAYOUT[row];
  if(!r || r.t !== 'bar' || (col !== 'inner' && col !== 'outer')) return;
  let from = null;
  state.amts.forEach((cells, ri) => {
    ['inner','outer'].forEach(ci => { if(cells[ci] === id) from = { row:ri, col:ci }; });
  });
  const here = state.amts[row][col];
  if(from && from.row === row && from.col === col){ state.selected = null; renderAll(); return; }
  if(from) state.amts[from.row][from.col] = here;
  state.amts[row][col] = id;
  afterChange();
}

function returnToTray(kind, id){
  if(kind === 'item'){
    const idx = state.items.indexOf(id);
    if(idx >= 0) state.items[idx] = null;
  }else{
    state.amts.forEach(cells => {
      if(cells.inner === id) cells.inner = null;
      if(cells.outer === id) cells.outer = null;
    });
  }
  if(state.selected && state.selected.id === id) state.selected = null;
  afterChange();
}

function setBanner(msg, type){
  const b = document.getElementById('feedback');
  b.className = 'banner banner--' + type;
  b.textContent = msg;
}

function check(){
  const placed = state.items.filter(Boolean).length + amtCount();
  if(placed < TOTAL){
    setBanner(`仲有 ${TOTAL - placed} 個未放好，放晒先檢查啦。`, 'warn');
    return;
  }

  state.attempts++;
  state.showFormula = true;   // 檢查嗰陣先顯示計算式
  let score = 0;
  state.feedback = LAYOUT.map(() => null);

  BAR_ROWS.forEach(({ r, i }) => {
    const id   = state.items[i];
    const item = id ? ITEMS[id] : null;
    const itemOk = !!item && allowed(r, item);
    let amtOk = false;
    if(itemOk){
      const placed = state.amts[i][item.col];
      amtOk = !!placed && ITEMS[placed].amount === item.amount;   // 金額要同名稱配對、放喺啱嗰欄（認數值）
    }
    let extraOk = true;
    if(r.outerExpect){
      const placed = state.amts[i]['outer'];
      extraOk = !!placed && ITEMS[placed].amount === ITEMS[r.outerExpect].amount;   // 外欄總額（獨立計分，認數值）
    }
    state.feedback[i] = { item: itemOk ? 'ok' : 'bad', amt: amtOk ? 'ok' : 'bad', extra: r.outerExpect ? (extraOk ? 'ok' : 'bad') : null };
    score += (itemOk ? 1 : 0) + (amtOk ? 1 : 0) + (r.outerExpect ? (extraOk ? 1 : 0) : 0);
  });

  state.lastScore = score;

  if(score === TOTAL){
    setBanner(`全對！${score} / ${TOTAL} · 第 ${state.attempts} 次完成 🎉`, 'ok');
    celebrate();
  }else{
    setBanner(`答啱 ${score} / ${TOTAL}，紅色嘅格再諗吓（已經試咗 ${state.attempts} 次）。`, 'warn');
  }
  renderAll();
}

function reset(){
  initState();
  setBanner('已經重設，項目重新洗牌，再試多次！', 'info');
  renderAll();
}

/* ---------- 教師專用：密碼正確先顯示答案 ---------- */
function openPwModal(){
  document.getElementById('pwInput').value = '';
  document.getElementById('pwErr').classList.add('hidden');
  document.getElementById('pwModal').classList.remove('hidden');
  document.getElementById('pwInput').focus();
}

function closePwModal(){
  document.getElementById('pwModal').classList.add('hidden');
  document.getElementById('pwInput').value = '';
}

function submitPw(){
  const v = document.getElementById('pwInput').value;
  if(v === TEACHER_PW){
    closePwModal();
    reveal();
  }else{
    document.getElementById('pwErr').classList.remove('hidden');
    document.getElementById('pwInput').value = '';
    document.getElementById('pwInput').focus();
  }
}

function reveal(){
  BAR_ROWS.forEach(({ r, i }) => {
    state.items[i] = r.id;
    state.amts[i][ITEMS[r.id].col] = r.id;
    if(r.outerExpect) state.amts[i]['outer'] = r.outerExpect;
  });
  state.feedback = LAYOUT.map(() => null);
  state.showFormula = true;
  state.selected = null;
  setBanner('已經顯示標準答案，對照吓自己嘅排法，再撳「重設」試多次。', 'info');
  renderAll();
}

function celebrate(){
  const s = document.getElementById('statement');
  s.classList.remove('celebrate');
  void s.offsetWidth;
  s.classList.add('celebrate');
  setTimeout(() => s.classList.remove('celebrate'), 1400);
}

/* =========================================================
   事件：拖曳 + 點擊 + 鍵盤
   ========================================================= */
document.addEventListener('dragstart', e => {
  const bar = e.target.closest && e.target.closest('.bar');
  if(!bar) return;
  state.drag = { kind: bar.dataset.kind, id: bar.dataset.id };
  bar.classList.add('dragging');
  if(e.dataTransfer){
    e.dataTransfer.setData('text/plain', bar.dataset.kind + ':' + bar.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
  }
});

document.addEventListener('dragend', e => {
  const bar = e.target.closest && e.target.closest('.bar');
  if(bar) bar.classList.remove('dragging');
  state.drag = null;
  document.querySelectorAll('.zone.over').forEach(el => el.classList.remove('over'));
});

document.addEventListener('dragover', e => {
  const z = e.target.closest && e.target.closest('.zone');
  if(!z || !state.drag) return;
  const want = z.dataset.zone === 'desc' ? 'item' : 'amt';
  if(state.drag.kind !== want) return;
  e.preventDefault();
  if(e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  z.classList.add('over');
});

document.addEventListener('dragleave', e => {
  const z = e.target.closest && e.target.closest('.zone');
  if(!z) return;
  if(e.relatedTarget && z.contains(e.relatedTarget)) return;
  z.classList.remove('over');
});

document.addEventListener('drop', e => {
  const z = e.target.closest && e.target.closest('.zone');
  if(!z) return;
  e.preventDefault();
  z.classList.remove('over');
  const d = state.drag;
  if(!d) return;
  const row = Number(z.dataset.row);
  const col = z.dataset.zone;
  if(col === 'desc'){
    if(d.kind === 'item') placeItem(d.id, row);
  }else if(d.kind === 'amt'){
    placeAmt(d.id, row, col);
  }
  state.drag = null;
});

/* =========================================================
   觸控拖曳（iPad / 手機 Safari 唔支援 HTML5 DnD）
   長按 BAR 約 350ms 啟動拖曳，浮起跟住手指，移到目標格放開；
   未夠鐘就郁手指會當捲動、短撳會當選取，兩者唔受影響。
   ========================================================= */
const TOUCH_HOLD_MS = 350;
const TOUCH_MOVE_PX = 12;
const TOUCH_EDGE_PX = 90;

function cleanupTouchDrag(){
  const td = state.td;
  if(!td) return;
  if(td.timer) clearTimeout(td.timer);
  if(td.raf) cancelAnimationFrame(td.raf);
  if(td.clone && td.clone.parentNode) td.clone.parentNode.removeChild(td.clone);
  document.querySelectorAll('.zone.over').forEach(el => el.classList.remove('over'));
  state.td = null;
}

function touchAutoScroll(){
  const td = state.td;
  if(!td || !td.active) return;
  if(td.scrollDir !== 0){
    let scrolled = false;
    const el = td.scrollEl;
    if(el){
      if(td.scrollDir > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 2){ el.scrollTop += 14; scrolled = true; }
      if(td.scrollDir < 0 && el.scrollTop > 0){ el.scrollTop -= 14; scrolled = true; }
    }
    if(!scrolled) window.scrollBy(0, td.scrollDir * 14);
  }
  td.raf = requestAnimationFrame(touchAutoScroll);
}

function touchHighlight(x, y){
  const td = state.td;
  document.querySelectorAll('.zone.over').forEach(el => el.classList.remove('over'));
  td.zone = null;
  const el = document.elementFromPoint(x, y);
  const z = el && el.closest ? el.closest('.zone') : null;
  if(!z) return;
  const want = z.dataset.zone === 'desc' ? 'item' : 'amt';
  if(td.kind !== want) return;
  z.classList.add('over');
  td.zone = z;
}

function activateTouchDrag(td){
  td.active = true;
  if(navigator.vibrate){ try{ navigator.vibrate(30); }catch(_){} }
  const bar = td.bar;
  bar.classList.add('dragging');
  const rect = bar.getBoundingClientRect();
  const clone = bar.cloneNode(true);
  clone.classList.add('touch-clone');
  clone.classList.remove('selected', 'dragging');
  clone.style.width = rect.width + 'px';
  clone.querySelectorAll('.ret').forEach(b => b.remove());
  document.body.appendChild(clone);
  td.clone = clone;
  td.dx = rect.left - td.curX;
  td.dy = rect.top - td.curY - 14;   // 分身稍為喺手指上面，唔遮住目標格
  clone.style.left = (td.curX + td.dx) + 'px';
  clone.style.top = (td.curY + td.dy) + 'px';
  const tray = bar.closest ? bar.closest('.tray') : null;
  td.scrollEl = (tray && tray.scrollHeight > tray.clientHeight + 4) ? tray : null;
  td.scrollDir = 0;
  td.raf = requestAnimationFrame(touchAutoScroll);
  touchHighlight(td.curX, td.curY);
}

document.addEventListener('touchstart', e => {
  if(state.td) cleanupTouchDrag();
  if(e.touches.length !== 1) return;
  const t = e.touches[0];
  if(!t.target.closest) return;
  if(t.target.closest('.ret')) return;   // ↩ 按鈕照正常撳
  const bar = t.target.closest('.bar');
  if(!bar) return;
  const td = {
    id: bar.dataset.id, kind: bar.dataset.kind, bar,
    startX: t.clientX, startY: t.clientY, curX: t.clientX, curY: t.clientY,
    active: false, timer: null, clone: null, zone: null,
    dx: 0, dy: 0, scrollEl: null, scrollDir: 0, raf: null
  };
  td.timer = setTimeout(() => { if(state.td === td) activateTouchDrag(td); }, TOUCH_HOLD_MS);
  state.td = td;
}, { passive: true });

document.addEventListener('touchmove', e => {
  const td = state.td;
  if(!td) return;
  const t = e.touches[0];
  td.curX = t.clientX; td.curY = t.clientY;
  if(!td.active){
    if(Math.hypot(t.clientX - td.startX, t.clientY - td.startY) > TOUCH_MOVE_PX){
      cleanupTouchDrag();   // 郁得快 = 捲動手勢，放手
    }
    return;
  }
  e.preventDefault();   // 搶走手勢，唔畀頁面捲
  if(td.clone){
    td.clone.style.left = (t.clientX + td.dx) + 'px';
    td.clone.style.top = (t.clientY + td.dy) + 'px';
  }
  td.scrollDir = t.clientY < TOUCH_EDGE_PX ? -1 : (t.clientY > window.innerHeight - TOUCH_EDGE_PX ? 1 : 0);
  touchHighlight(t.clientX, t.clientY);
}, { passive: false });

function endTouchDrag(cancelled){
  const td = state.td;
  if(!td) return;
  if(td.active){
    if(!cancelled && td.zone){
      const row = Number(td.zone.dataset.row);
      const col = td.zone.dataset.zone;
      if(col === 'desc'){
        if(td.kind === 'item') placeItem(td.id, row);
      }else if(td.kind === 'amt'){
        placeAmt(td.id, row, col);
      }
    }
    state.touchSuppressUntil = Date.now() + 600;   // 食咗跟住嚟嘅合成 click
  }
  cleanupTouchDrag();
}
document.addEventListener('touchend', () => endTouchDrag(false));
document.addEventListener('touchcancel', () => endTouchDrag(true));

document.addEventListener('click', e => {
  if(Date.now() < (state.touchSuppressUntil || 0)){ state.touchSuppressUntil = 0; return; }
  const ret = e.target.closest && e.target.closest('.ret');
  if(ret){
    e.stopPropagation();
    const bar = ret.closest('.bar');
    if(bar) returnToTray(bar.dataset.kind, bar.dataset.id);
    return;
  }

  const bar = e.target.closest && e.target.closest('.bar');
  if(bar){
    const pick = { kind: bar.dataset.kind, id: bar.dataset.id };
    const same = state.selected && state.selected.kind === pick.kind && state.selected.id === pick.id;
    state.selected = same ? null : pick;
    renderAll();
    if(state.selected){
      const again = document.querySelector(`.bar[data-kind="${pick.kind}"][data-id="${pick.id}"]`);
      if(again) again.focus();
    }
    return;
  }

  const z = e.target.closest && e.target.closest('.zone');
  if(z && state.selected){
    const row = Number(z.dataset.row);
    const col = z.dataset.zone;
    if(col === 'desc'){
      if(state.selected.kind === 'item') placeItem(state.selected.id, row);
    }else if(state.selected.kind === 'amt'){
      placeAmt(state.selected.id, row, col);
    }
  }
});

document.addEventListener('keydown', e => {
  if(e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
  const bar = e.target.closest && e.target.closest('.bar');
  if(bar){ e.preventDefault(); bar.click(); return; }

  const z = e.target.closest && e.target.closest('.zone');
  if(z && state.selected){
    e.preventDefault();
    const row = Number(z.dataset.row);
    const col = z.dataset.zone;
    if(col === 'desc'){
      if(state.selected.kind === 'item') placeItem(state.selected.id, row);
    }else if(state.selected.kind === 'amt'){
      placeAmt(state.selected.id, row, col);
    }
  }
});

document.getElementById('btnCheck').addEventListener('click', check);
document.getElementById('btnReveal').addEventListener('click', openPwModal);
document.getElementById('pwOk').addEventListener('click', submitPw);
document.getElementById('pwCancel').addEventListener('click', closePwModal);
document.getElementById('pwInput').addEventListener('keydown', e => {
  if(e.key === 'Enter'){ e.preventDefault(); submitPw(); }
  if(e.key === 'Escape'){ closePwModal(); }
});
document.getElementById('pwModal').addEventListener('click', e => {
  if(e.target === document.getElementById('pwModal')) closePwModal();   // 撳遮罩關閉
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && !document.getElementById('pwModal').classList.contains('hidden')) closePwModal();
});
document.getElementById('btnReset').addEventListener('click', reset);
document.getElementById('btnPrint').addEventListener('click', () => window.print());

/* =========================================================
   啟動 + 題目切換
   ========================================================= */
function renderQSwitch(){
  document.getElementById('qswitch').innerHTML = QUESTIONS.map((q, i) =>
    `<button class="qbtn${i === QI ? ' active' : ''}" type="button" data-q="${i}">${esc(q.tab)}</button>`
  ).join('');
}

function loadQuestion(i, silent){
  QI = i;
  QUESTION = QUESTIONS[i];
  ITEMS = QUESTION.items;
  Object.keys(ITEMS).forEach(id => { ITEMS[id].id = id; });   // 俾每項攞返自己嘅 id
  LAYOUT = QUESTION.layout;
  BAR_ROWS = LAYOUT.map((r, idx) => ({ r, i: idx })).filter(x => x.r.t === 'bar');
  TOTAL = BAR_ROWS.length * 2 + LAYOUT.filter(r => r.outerExpect).length;
  document.getElementById('coName').textContent   = QUESTION.company;
  document.getElementById('stTitle').textContent  = QUESTION.title;
  document.getElementById('stPeriod').textContent = QUESTION.period;
  document.getElementById('brief').innerHTML =
    QUESTION.brief.map(t => {
      if(typeof t === 'string') return `<p>${esc(t)}</p>`;
      if(t.table) return tableHtml(t.table);
      if(t.list) return listHtml(t.list, t);
      return '';
    }).join('');
  initState();
  renderQSwitch();
  if(!silent) setBanner(`已切換到「${QUESTION.tab}」，項目重新洗牌，加油！`, 'info');
  renderAll();
}

document.getElementById('qswitch').addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('.qbtn');
  if(!b) return;
  const i = Number(b.dataset.q);
  if(i !== QI) loadQuestion(i);
});

(function init(){
  loadQuestion(0, true);
})();
