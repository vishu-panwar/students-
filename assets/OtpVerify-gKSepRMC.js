import{o as e,t}from"./react-DnNpwOYT.js";import{t as n}from"./arrow-left-qPGcHEWh.js";import{t as r}from"./circle-check-DuCmmPQo.js";import{t as i}from"./clock-DtMYiVTo.js";import{t as a}from"./loader-circle-D2l-bcSU.js";import{t as o}from"./shield-check-CeCI1Qu-.js";import{t as s}from"./jsx-runtime-BxgSNiUh.js";import{c,s as l}from"./chunk-OE4NN4TA-FQKjeqDT.js";import{t as u}from"./axios-CrL3ecjy.js";import{n as d,t as f}from"./proxy-Du9Y_nFL.js";var p=e(t(),1),m=s(),h=`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .gb-otp-root {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 24px; background: #ede9e0; font-family: 'DM Sans', sans-serif;
  }

  .gb-otp-back {
    position: fixed; top: 20px; left: 20px;
    display: flex; align-items: center; gap: 6px;
    background: #1e5437; color: #fff; border: none; border-radius: 10px;
    padding: 8px 14px; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: all 0.2s;
  }
  .gb-otp-back:hover { background: #174530; transform: translateX(-2px); }

  .gb-otp-card {
    background: #fff; border-radius: 24px; border: 1.5px solid #ddd8cf;
    padding: 44px 40px; width: 100%; max-width: 460px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  }

  .gb-otp-icon-wrap {
    width: 64px; height: 64px; margin: 0 auto 24px;
    background: linear-gradient(135deg, #e8f5ee 0%, #d1ead9 100%);
    border-radius: 18px; display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(30,84,55,0.15);
  }

  .gb-otp-digit {
    width: 100%; aspect-ratio: 1;
    text-align: center; font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700; color: #1a1a1a;
    background: #faf8f4; border: 1.5px solid #d6cfc3;
    border-radius: 12px; outline: none; transition: all 0.2s;
    caret-color: #1e5437;
  }
  .gb-otp-digit:focus { border-color: #1e5437; background: #fff; box-shadow: 0 0 0 3px rgba(30,84,55,0.1); }
  .gb-otp-digit.filled { border-color: #1e5437; background: #f0f9f4; }

  .gb-btn-verify {
    width: 100%; padding: 14px; background: #1e5437; color: #fff;
    border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 4px;
  }
  .gb-btn-verify:hover:not(:disabled) { background: #174530; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,84,55,0.22); }
  .gb-btn-verify:disabled { background: #d6cfc3; color: #a09489; cursor: not-allowed; transform: none; }

  .gb-timer-bar-track { height: 4px; background: #ede9e0; border-radius: 999px; margin: 12px 0 0; overflow: hidden; }
  .gb-timer-bar { height: 100%; border-radius: 999px; transition: width 1s linear, background 1s; }

  @keyframes gb-spin { to { transform: rotate(360deg); } }
  .gb-spin { animation: gb-spin 1s linear infinite; }
`;function g(){let e=l(),t=c(),s=e.state?.email||`your email`,[g,_]=(0,p.useState)([,,,,,,].fill(``)),[v,y]=(0,p.useState)(!1),[b,x]=(0,p.useState)(300),[S,C]=(0,p.useState)({type:``,message:``}),w=(0,p.useRef)([]);(0,p.useEffect)(()=>{w.current[0]?.focus()},[]),(0,p.useEffect)(()=>{if(b<=0)return;let e=setInterval(()=>x(e=>e-1),1e3);return()=>clearInterval(e)},[b]);let T=e=>`${Math.floor(e/60)}:${String(e%60).padStart(2,`0`)}`,E=b/300*100,D=b<60?`#dc2626`:b<120?`#f59e0b`:`#1e5437`,O=(e,t)=>{if(isNaN(e.value))return;let n=[...g];n[t]=e.value,_(n),e.value&&t<5&&w.current[t+1]?.focus()},k=(e,t)=>{e.key===`Backspace`&&!g[t]&&t>0&&w.current[t-1]?.focus()},A=e=>{e.preventDefault();let t=e.clipboardData.getData(`text`).replace(/\D/g,``).slice(0,6).split(``),n=[...g];t.forEach((e,t)=>{n[t]=e}),_(n),w.current[Math.min(t.length,5)]?.focus()};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`style`,{children:h}),(0,m.jsxs)(`div`,{className:`gb-otp-root`,children:[(0,m.jsxs)(`button`,{className:`gb-otp-back`,onClick:()=>t(-1),children:[(0,m.jsx)(n,{size:14}),` Back`]}),(0,m.jsxs)(f.div,{className:`gb-otp-card`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4},children:[(0,m.jsx)(`div`,{className:`gb-otp-icon-wrap`,children:(0,m.jsx)(o,{size:28,color:`#1e5437`})}),(0,m.jsxs)(`div`,{style:{textAlign:`center`,marginBottom:24},children:[(0,m.jsx)(`h2`,{style:{fontFamily:`'Playfair Display',serif`,fontSize:26,fontWeight:700,color:`#1a1a1a`,marginBottom:6},children:`Verify Identity`}),(0,m.jsxs)(`p`,{style:{fontSize:14,color:`#8a7e72`,lineHeight:1.55},children:[`We've sent a 6-digit code to`,` `,(0,m.jsx)(`span`,{style:{color:`#1e5437`,fontWeight:600},children:s})]}),(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:6,marginTop:10},children:[(0,m.jsx)(i,{size:13,color:D}),(0,m.jsx)(`span`,{style:{fontSize:13,fontWeight:600,color:D,fontFamily:`'DM Sans',sans-serif`},children:b>0?`Expires in ${T(b)}`:`OTP Expired`})]}),(0,m.jsx)(`div`,{className:`gb-timer-bar-track`,children:(0,m.jsx)(`div`,{className:`gb-timer-bar`,style:{width:`${E}%`,background:D}})})]}),(0,m.jsxs)(`form`,{onSubmit:async e=>{e.preventDefault();let n=g.join(``);if(!(n.length<6)){if(b<=0){C({type:`error`,message:`OTP expired. Request a new one.`});return}try{y(!0);let e=await u.post(`http://localhost:3000/gharbazzar/verifyotp`,{email:s,otp:n});C({type:`success`,message:e.data.message||`Verified successfully!`}),e.data.success&&setTimeout(()=>t(`/login`,{replace:!0}),1500)}catch(e){C({type:`error`,message:e.response?.data?.message||`Invalid code`})}finally{y(!1)}}},style:{display:`flex`,flexDirection:`column`,gap:20},children:[(0,m.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(6,1fr)`,gap:10},children:g.map((e,t)=>(0,m.jsx)(`input`,{type:`text`,maxLength:1,ref:e=>w.current[t]=e,value:e,onChange:e=>O(e.target,t),onKeyDown:e=>k(e,t),onPaste:t===0?A:void 0,className:`gb-otp-digit${e?` filled`:``}`},t))}),(0,m.jsx)(d,{mode:`wait`,children:S.message&&(0,m.jsxs)(f.div,{initial:{opacity:0,y:-6},animate:{opacity:1,y:0},exit:{opacity:0},style:{display:`flex`,alignItems:`center`,gap:8,padding:`12px 14px`,borderRadius:12,fontSize:13,fontWeight:500,background:S.type===`success`?`#f0f9f4`:`#fef2f2`,color:S.type===`success`?`#1e5437`:`#c0392b`,border:`1px solid ${S.type===`success`?`#c6e8d2`:`#fecaca`}`},children:[S.type===`success`&&(0,m.jsx)(r,{size:15}),S.message]})}),(0,m.jsx)(`button`,{type:`submit`,disabled:v||g.includes(``)||b<=0,className:`gb-btn-verify`,children:v?(0,m.jsx)(a,{size:17,className:`gb-spin`}):`Verify OTP`})]}),(0,m.jsxs)(`p`,{style:{textAlign:`center`,fontSize:13,color:`#8a7e72`,marginTop:20},children:[`Didn't receive the code?`,` `,(0,m.jsx)(`button`,{onClick:()=>{x(300),_([,,,,,,].fill(``)),C({type:``,message:``})},style:{background:`none`,border:`none`,color:`#1e5437`,fontWeight:600,cursor:`pointer`,fontFamily:`'DM Sans',sans-serif`,fontSize:13,padding:0},children:`Resend OTP`})]})]})]})]})}export{g as default};