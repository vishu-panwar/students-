import{o as e,t}from"./react-DnNpwOYT.js";import{t as n}from"./index.esm-4atiuwne.js";import{o as r,s as i}from"./rtk-query-react.modern-jxfClD-6.js";import{c as a,o,u as s}from"./getPropertyQuery-CIDb7UXP.js";import{r as c,t as l}from"./bookMarkSlice-D3FxzNaV.js";import{t as u}from"./createLucideIcon-0QeIYRFC.js";import{t as d}from"./arrow-left-qPGcHEWh.js";import{t as f}from"./bath-DY0muhwl.js";import{t as p}from"./bed-ZBEIx9LD.js";import{t as m}from"./check-DgL25WVq.js";import{t as h}from"./eye-D5qNtspY.js";import{t as g}from"./heart-DDF14Znu.js";import{t as _}from"./house-CH7fbD2Q.js";import{t as v}from"./map-pin-BGerkJeV.js";import{t as y}from"./phone-DD8zp0Ua.js";import{t as b}from"./share-2-D5kXv4zE.js";import{t as x}from"./jsx-runtime-BxgSNiUh.js";import{c as ee,l as te}from"./chunk-OE4NN4TA-FQKjeqDT.js";import{n as S}from"./dist-BH2oWx7z.js";import{n as C,t as w}from"./RecentCardSkeleton-DGIDoyXr.js";var T=u(`map`,[[`path`,{d:`M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z`,key:`169xi5`}],[`path`,{d:`M15 5.764v15`,key:`1pn4in`}],[`path`,{d:`M9 3.236v15`,key:`1uimfh`}]]),E=e(t(),1),D=x(),O=`919548283300`,k=`https://gharbazaar.in`,A=e=>{if(!e)return;let t=`https://gharbazaar.in/property/${e?._id}`,n=`
*${e?.title}*

📍 ${e?.location}

💰 ₹${e?.price?.toLocaleString(`en-IN`)}

${t}

Hello GharBazaar,
I am interested in this property.
Please share more details.
`,r=`https://wa.me/${O}?text=${encodeURIComponent(n)}`;window.open(r,`_blank`)},j=({onClick:e,variant:t=`dark`})=>{let n=t===`dark`;return(0,D.jsxs)(`button`,{onClick:e,className:`
        group relative flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium
        transition-all duration-200 ease-out select-none
        ${n?`bg-[#147638] hover:bg-[#1B9E4B] text-white border border-[#1B9E4B]/20`:`bg-white hover:bg-gray-50 text-gray-700 border border-gray-200`}
      `,children:[(0,D.jsx)(d,{size:14,strokeWidth:2.5,className:`transition-transform duration-200 group-hover:-translate-x-0.5 ${n?`text-white`:`text-gray-700`}`}),(0,D.jsx)(`span`,{children:`Back`})]})};function M(){let{id:e}=te(),t=ee(),u=r(),{bookmarks:d}=i(e=>e.bookmark),[x]=a(),[O,M]=(0,E.useState)(!1),N=JSON.parse(localStorage.getItem(`user`)||`null`),{data:P,isLoading:ne,isError:F}=o({id:e}),[I]=s(),L=P?.data,[R,z]=(0,E.useState)(0),[B,V]=(0,E.useState)([]),[H,U]=(0,E.useState)(!1),[W,G]=(0,E.useState)(1),[K,q]=(0,E.useState)(!0),J=(0,E.useRef)(!1);(0,E.useEffect)(()=>{(async()=>{if(L?._id)try{await I(L?._id)}catch(e){console.log(`View tracking failed`,e)}})()},[L?._id]),(0,E.useEffect)(()=>{z(0),V([]),G(1),q(!0),J.current=!1},[e]);let Y=async(e,t=!1)=>{if(!(!L||J.current))try{U(!0),J.current=!0;let n=await fetch(`http://localhost:3000/gharbazzar/getSimilarProperty?page=${e}&limit=5`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(L)});if(n.ok){let e=await n.json(),r=e?.data||[];V(e=>t?[...e,...r]:r),q(e?.hasMore??r.length===10)}}catch(e){console.error(`Failed to fetch similar properties:`,e)}finally{U(!1),J.current=!1}};(0,E.useEffect)(()=>{L&&W===1&&B.length===0&&Y(1,!1)},[L,e]),(0,E.useEffect)(()=>{W>1&&L&&Y(W,!0)},[W]),(0,E.useEffect)(()=>{let e=()=>{if(!K||H||J.current)return;let e=window.scrollY||document.documentElement.scrollTop,t=window.innerHeight;document.documentElement.scrollHeight-(e+t)<800&&G(e=>e+1)};return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[K,H]);let X=(0,E.useMemo)(()=>L?._id?d?.some(e=>e?._id===L?._id)||L?.bookmarks?.some(e=>e===N?._id||e===N?.id):!1,[d,L?._id,L?.bookmarks,N?._id,N?.id]),re=async()=>{if(!N)return S.error(`Please login first`);if(O)return;let e=L?._id,t=X;try{M(!0),u(t?c(e):l(L)),await x(e).unwrap()}catch(n){console.error(n),u(t?l(L):c(e)),S.error(`Action failed`)}finally{M(!1)}},ie=async()=>{if(!L)return;let e=`https://gharbazaar.in/property/${L?._id}`,t=`
${L?.title}

📍 ${L?.location}

💰 ₹${L?.price?.toLocaleString(`en-IN`)}

${e}
`,n=document.createElement(`div`);n.innerHTML=`
    <div id="gharbazaar-share-overlay"
      style="
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.55);
        z-index:99999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
      "
    >
      <div
        style="
          background:#fff;
          width:100%;
          max-width:420px;
          border-radius:12px;
          padding:24px;
          box-shadow:0 10px 40px rgba(0,0,0,0.2);
          font-family:sans-serif;
        "
      >
        <h2 style="margin:0 0 16px; font-size:20px; font-weight:700; color:#111827;">
          Share Property
        </h2>
        <textarea
          id="gharbazaar-share-text"
          readonly
          style="
            width:100%;
            height:160px;
            border:1px solid #e5e7eb;
            border-radius:8px;
            padding:14px;
            resize:none;
            font-size:14px;
            color:#374151;
            outline:none;
          "
        >${t}</textarea>
        <div style="display:flex; gap:12px; margin-top:18px;">
          <button
            id="gharbazaar-copy-btn"
            style="
              flex:1;
              height:44px;
              border:none;
              border-radius:6px;
              background:#1B9E4B;
              color:white;
              font-weight:600;
              cursor:pointer;
            "
          >
            Copy
          </button>
          <button
            id="gharbazaar-close-btn"
            style="
              flex:1;
              height:44px;
              border:none;
              border-radius:6px;
              background:#f3f4f6;
              color:#111827;
              font-weight:600;
              cursor:pointer;
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(n);let r=()=>{n.remove()};document.getElementById(`gharbazaar-copy-btn`)?.addEventListener(`click`,async()=>{try{await navigator.clipboard.writeText(t),r()}catch(e){console.error(e)}}),document.getElementById(`gharbazaar-close-btn`)?.addEventListener(`click`,r),document.getElementById(`gharbazaar-share-overlay`)?.addEventListener(`click`,e=>{e.target.id===`gharbazaar-share-overlay`&&r()})},Z=L?.images?.length>0?L.images:[`https://via.placeholder.com/1200x600`],Q=Z?.[0]?.startsWith(`http`)?Z?.[0]:`${k}/${Z?.[0]}`,ae=`${k}/share/property/${L?._id}`,$=L?.status?.toLowerCase()===`closed`;return ne?(0,D.jsxs)(`div`,{className:`min-h-screen flex flex-col items-center justify-center bg-[#FDFDFB] gap-4`,children:[(0,D.jsxs)(`div`,{className:`relative w-12 h-12`,children:[(0,D.jsx)(`div`,{className:`absolute inset-0 rounded-full border-4 border-gray-100`}),(0,D.jsx)(`div`,{className:`absolute inset-0 rounded-full border-4 border-t-[#1B9E4B] animate-spin`})]}),(0,D.jsx)(`p`,{className:`text-gray-400 text-sm font-medium`,children:`Loading property…`})]}):F||!L?(0,D.jsxs)(`div`,{className:`min-h-screen flex flex-col items-center justify-center bg-[#FDFDFB] gap-4`,children:[(0,D.jsx)(`div`,{className:`w-14 h-14 rounded-full bg-red-50 flex items-center justify-center`,children:(0,D.jsx)(_,{size:24,className:`text-red-400`})}),(0,D.jsx)(`p`,{className:`text-red-500 text-lg font-bold`,children:`Property not found`}),(0,D.jsx)(j,{onClick:()=>t(`/Recent-properties`),variant:`light`})]}):(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(n,{children:[(0,D.jsxs)(`title`,{children:[L?.title,` | GharBazaar`]}),(0,D.jsx)(`meta`,{name:`description`,content:L?.description||`Premium property listing`}),(0,D.jsx)(`meta`,{property:`og:type`,content:`website`}),(0,D.jsx)(`meta`,{property:`og:title`,content:L?.title}),(0,D.jsx)(`meta`,{property:`og:description`,content:L?.description||`Premium property listing`}),(0,D.jsx)(`meta`,{property:`og:image`,content:Q}),(0,D.jsx)(`meta`,{property:`og:url`,content:ae}),(0,D.jsx)(`meta`,{property:`og:site_name`,content:`GharBazaar`}),(0,D.jsx)(`meta`,{name:`twitter:card`,content:`summary_large_image`}),(0,D.jsx)(`meta`,{name:`twitter:title`,content:L?.title}),(0,D.jsx)(`meta`,{name:`twitter:description`,content:L?.description||`Premium property listing`}),(0,D.jsx)(`meta`,{name:`twitter:image`,content:Q})]}),(0,D.jsxs)(`div`,{className:`min-h-screen bg-[#F5F0E8] pb-20`,children:[(0,D.jsx)(`div`,{className:`sticky top-0 z-50 bg-[#F5F0E8]/80 backdrop-blur-md`,children:(0,D.jsxs)(`div`,{className:`max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between`,children:[(0,D.jsx)(j,{onClick:()=>t(-1),variant:`dark`}),(0,D.jsx)(`div`,{className:`flex items-center gap-2`,children:(0,D.jsx)(`span`,{className:`px-3 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${$?`bg-red-600 text-white`:`bg-[#147638] text-white border border-[#1B9E4B]/30`}`,children:$?`Closed`:`Active`})})]})}),(0,D.jsx)(`div`,{className:`max-w-7xl mx-auto px-4 py-6 sm:px-6 mt-2 bg-white rounded-lg shadow-sm`,children:(0,D.jsxs)(`div`,{className:`flex flex-col lg:flex-row gap-6 xl:gap-8`,children:[(0,D.jsxs)(`div`,{className:`w-full lg:w-1/2 flex flex-col gap-6 order-1 lg:order-none`,children:[(0,D.jsxs)(`div`,{className:`flex flex-col lg:flex-row gap-3 h-[380px] sm:h-[420px] lg:h-[480px]`,children:[(0,D.jsx)(`div`,{className:`order-2 lg:order-1 flex lg:flex-col flex-row gap-2 lg:w-20 w-full overflow-x-auto lg:overflow-y-auto no-scrollbar`,children:Z.map((e,t)=>(0,D.jsx)(`button`,{onClick:()=>z(t),className:`flex-shrink-0 w-16 h-16 lg:w-full lg:h-16 rounded overflow-hidden border-2 transition-all ${R===t?`border-[#1B9E4B]`:`border-transparent opacity-60`}`,children:(0,D.jsx)(`img`,{src:e,alt:``,className:`w-full h-full object-cover`,loading:`lazy`})},t))}),(0,D.jsxs)(`div`,{className:`order-1 lg:order-2 flex-1 relative overflow-hidden rounded border border-gray-100 h-[280px] sm:h-[340px] lg:h-full bg-gray-50`,children:[(0,D.jsx)(`div`,{className:`absolute inset-0 bg-gray-100 animate-pulse`}),(0,D.jsx)(`img`,{src:Z[R],alt:L?.title,className:`absolute inset-0 w-full h-full object-cover transition-opacity duration-300`,onLoad:e=>{e.target.style.opacity=1},style:{opacity:0}},R)]})]}),(0,D.jsxs)(`div`,{className:`hidden lg:block bg-white rounded border border-gray-200 overflow-hidden shadow-sm`,children:[(0,D.jsxs)(`div`,{className:`px-4 py-3 flex items-center justify-between border-b border-gray-100 bg-gray-50/70`,children:[(0,D.jsx)(`span`,{className:`text-base font-bold text-gray-900`,children:`Location`}),(0,D.jsxs)(`button`,{onClick:()=>{let e=L?.locationCoordinates?.lat,t=L?.locationCoordinates?.lng;if(!e||!t){window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(L?.location||``)}`,`__blank`);return}window.open(`https://www.google.com/maps?q=${e},${t}`,`__blank`)},className:`flex items-center gap-1 text-xs font-semibold text-[#147638] hover:text-[#1B9E4B] bg-[#1B9E4B]/10 px-3 py-1 rounded transition-colors`,children:[(0,D.jsx)(T,{size:12}),`View on map`]})]}),(0,D.jsxs)(`div`,{className:`h-[220px] flex flex-col items-center justify-center bg-[#F5F9F6] border-b border-gray-100 relative`,children:[(0,D.jsx)(`div`,{className:`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2`,children:(0,D.jsx)(v,{size:22,className:`text-[#1B9E4B]`})}),(0,D.jsx)(`p`,{className:`text-gray-400 text-xs text-center px-6 max-w-sm font-medium`,children:L?.location||`Location map context`})]})]})]}),(0,D.jsx)(`div`,{className:`w-full lg:w-1/2 order-2 lg:order-none`,children:(0,D.jsxs)(`div`,{className:`bg-white rounded border border-gray-200 shadow-sm overflow-hidden`,children:[(0,D.jsxs)(`div`,{className:`p-5 space-y-4 border-b border-gray-100`,children:[(0,D.jsxs)(`div`,{className:`flex items-start justify-between gap-4`,children:[(0,D.jsx)(`h1`,{className:`text-2xl font-bold text-gray-900 leading-tight tracking-tight`,children:L?.title||`Single room with kitchen`}),(0,D.jsxs)(`div`,{className:`flex items-center gap-1 text-gray-500 text-xs bg-gray-50 px-2 py-1 rounded border border-gray-100 flex-shrink-0`,children:[(0,D.jsx)(h,{size:13,className:`text-gray-400`}),(0,D.jsxs)(`span`,{className:`font-medium text-gray-600`,children:[L?.views||0,` views`]})]})]}),(0,D.jsxs)(`div`,{className:`flex items-baseline gap-1.5 text-2xl font-black text-[#1B9E4B]`,children:[(0,D.jsxs)(`span`,{children:[`₹`,L?.price?.toLocaleString(`en-IN`)||`3,500`]}),(0,D.jsx)(`span`,{className:`text-[#147638] text-xs font-normal`,children:`/month`})]}),(0,D.jsxs)(`div`,{className:`flex items-start gap-1.5 text-gray-600 text-sm pb-1`,children:[(0,D.jsx)(v,{size:14,className:`mt-0.5 text-[#1B9E4B] flex-shrink-0`}),(0,D.jsx)(`span`,{className:`text-xs font-medium`,children:L?.location})]}),(0,D.jsxs)(`div`,{className:`flex items-center gap-2 pt-1`,children:[(0,D.jsx)(`button`,{onClick:re,disabled:O,className:`w-10 h-10 rounded border flex items-center justify-center transition-all flex-shrink-0 ${X?`bg-red-50 border-red-200 text-red-500`:`bg-white border-gray-300 text-gray-600 hover:bg-gray-50`}`,children:(0,D.jsx)(g,{size:16,className:X?`fill-red-500 text-red-500`:``})}),(0,D.jsx)(`button`,{onClick:ie,className:`w-10 h-10 rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-all flex-shrink-0`,children:(0,D.jsx)(b,{size:16})}),(0,D.jsxs)(`button`,{disabled:$,onClick:()=>A(L),className:`flex-1 h-10 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${$?`bg-gray-100 text-gray-400 cursor-not-allowed`:`bg-gradient-to-r from-[#1B9E4B] to-[#147638] hover:opacity-95 text-white`}`,children:[(0,D.jsx)(y,{size:14}),`Book on WhatsApp`]})]})]}),(0,D.jsxs)(`div`,{className:`bg-gray-50/50 p-4 border-b border-gray-100 grid grid-cols-4 gap-2 text-center`,children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`p`,{className:`text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1`,children:`Bedroom`}),(0,D.jsxs)(`p`,{className:`font-bold text-gray-800 text-xs sm:text-sm flex items-center justify-center gap-1`,children:[(0,D.jsx)(p,{size:13,className:`text-[#1B9E4B]`}),L?.propertySpecifications?.bedroom||`01`]})]}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`p`,{className:`text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1`,children:`Bathroom`}),(0,D.jsxs)(`p`,{className:`font-bold text-gray-800 text-xs sm:text-sm flex items-center justify-center gap-1`,children:[(0,D.jsx)(f,{size:13,className:`text-[#1B9E4B]`}),L?.propertySpecifications?.bathroom||`01`]})]}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`p`,{className:`text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1`,children:`Area`}),(0,D.jsx)(`p`,{className:`font-bold text-gray-800 text-xs sm:text-sm`,children:L?.propertySpecifications?.area||`1000 sq.ft`})]}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`p`,{className:`text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1`,children:`Status`}),(0,D.jsx)(`p`,{className:`font-bold text-[#1B9E4B] text-xs sm:text-sm uppercase`,children:L?.status||`Active`})]})]}),(0,D.jsxs)(`div`,{className:`p-5 border-b border-gray-100 space-y-2`,children:[(0,D.jsx)(`h4`,{className:`text-sm font-bold text-gray-900 tracking-wide uppercase`,children:`Description`}),(0,D.jsx)(`p`,{className:`text-gray-700 leading-relaxed text-sm font-normal`,children:L?.description||`Comfortable semi-furnished room with kitchen and bathroom near Quantum University.`})]}),(0,D.jsxs)(`div`,{className:`p-5 border-b border-gray-100 space-y-3`,children:[(0,D.jsx)(`h4`,{className:`text-sm font-bold text-gray-900 tracking-wide uppercase`,children:`Property Features`}),(0,D.jsx)(`div`,{className:`grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4`,children:L?.amenities?.length>0?L.amenities.map((e,t)=>(0,D.jsxs)(`div`,{className:`flex items-center gap-2 text-sm text-gray-700 font-medium`,children:[(0,D.jsx)(m,{size:14,className:`text-[#1B9E4B] flex-shrink-0`,strokeWidth:3}),(0,D.jsx)(`span`,{className:`truncate`,children:e})]},t)):[`Air Conditioning`,`Kitchen`,`Store Room`,`Marble Flooring`,`Car Parking`,`Garden Area`].map((e,t)=>(0,D.jsxs)(`div`,{className:`flex items-center gap-2 text-sm text-gray-700 font-medium`,children:[(0,D.jsx)(m,{size:14,className:`text-[#1B9E4B] flex-shrink-0`,strokeWidth:2.5}),(0,D.jsx)(`span`,{className:`truncate`,children:e})]},t))})]}),(0,D.jsxs)(`div`,{className:`p-5 bg-white space-y-3`,children:[(0,D.jsx)(`h4`,{className:`text-sm font-bold text-gray-900 tracking-wide uppercase`,children:`Nearby Amenities`}),(0,D.jsx)(`div`,{className:`grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4`,children:[`College Nearby`,`Hospitals Nearby`,`Market`,`Street Food`,`Public Transport`,`Park`].map((e,t)=>(0,D.jsxs)(`div`,{className:`flex items-center gap-2 text-sm text-gray-700 font-medium`,children:[(0,D.jsx)(m,{size:14,className:`text-[#1B9E4B] flex-shrink-0`,strokeWidth:2.5}),(0,D.jsx)(`span`,{className:`truncate`,children:e})]},t))})]})]})}),(0,D.jsx)(`div`,{className:`block lg:hidden w-full order-last`,children:(0,D.jsxs)(`div`,{className:`bg-white rounded border border-gray-200 overflow-hidden shadow-sm`,children:[(0,D.jsxs)(`div`,{className:`px-4 py-3 flex items-center justify-between border-b border-gray-100 bg-gray-50/70`,children:[(0,D.jsx)(`span`,{className:`text-base font-bold text-gray-900`,children:`Location`}),(0,D.jsxs)(`button`,{onClick:()=>{let e=L?.locationCoordinates?.lat,t=L?.locationCoordinates?.lng;if(!e||!t){window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(L?.location||``)}`,`__blank`);return}window.open(`https://www.google.com/maps?q=${e},${t}`,`__blank`)},className:`flex items-center gap-1 text-xs font-semibold text-[#147638] hover:text-[#1B9E4B] bg-[#1B9E4B]/10 px-3 py-1 rounded transition-colors`,children:[(0,D.jsx)(T,{size:12}),`View on map`]})]}),(0,D.jsxs)(`div`,{className:`h-[220px] flex flex-col items-center justify-center bg-[#F5F9F6] border-b border-gray-100 relative`,children:[(0,D.jsx)(`div`,{className:`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2`,children:(0,D.jsx)(v,{size:22,className:`text-[#1B9E4B]`})}),(0,D.jsx)(`p`,{className:`text-gray-400 text-xs text-center px-6 max-w-sm font-medium`,children:L?.location||`Location map context`})]})]})})]})}),(0,D.jsxs)(`div`,{className:`max-w-7xl mx-auto px-4 py-8 sm:px-6 mt-6`,children:[(0,D.jsx)(`h2`,{className:`text-xl sm:text-2xl font-bold text-gray-900 mb-6`,children:`Similar Properties`}),(0,D.jsxs)(`div`,{className:`grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6`,children:[B.map(e=>(0,D.jsx)(C,{property:e},e._id)),H&&Array.from({length:1}).map((e,t)=>(0,D.jsx)(w,{},`skeleton-${t}`))]}),!H&&B.length===0&&(0,D.jsx)(`p`,{className:`text-gray-500 text-sm italic`,children:`No similar properties found matching this profile.`})]})]})]})}export{M as default};