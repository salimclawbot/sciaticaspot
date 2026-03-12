"use client";
import { useEffect, useMemo, useState } from "react";
const LOOP=30,SLIDE=5;
const SETS:Record<string,{title:string;subtitle:string;icon:string;bg:string}[]>={
  exercises:[
    {title:"6 Physiotherapist-Approved Sciatica Exercises",subtitle:"Evidence-based movements to relieve sciatic nerve pain fast",icon:"🦵",bg:"from-blue-700 via-blue-500 to-cyan-400"},
    {title:"#1 Piriformis Stretch — 60 seconds each side",subtitle:"Directly targets the muscle compressing your sciatic nerve",icon:"🧘",bg:"from-blue-600 via-sky-500 to-cyan-400"},
    {title:"#2 Knee to Chest — Hold 30 seconds",subtitle:"Releases lumbar compression and calms the nerve root",icon:"🙏",bg:"from-indigo-600 via-blue-500 to-sky-400"},
    {title:"#3 Cat-Cow Stretch — 10 reps daily",subtitle:"Mobilises the spine and reduces disc pressure on L4-S1",icon:"🐱",bg:"from-teal-600 via-cyan-500 to-blue-400"},
    {title:"#4 Nerve Floss — 15 reps per leg",subtitle:"Gently moves the sciatic nerve to reduce adhesions",icon:"⚡",bg:"from-sky-700 via-blue-500 to-indigo-400"},
    {title:"Do these daily — most see relief in 2 weeks",subtitle:"Scroll down for step-by-step instructions and videos",icon:"✅",bg:"from-blue-800 via-blue-600 to-slate-700"},
  ],
  piriformis:[
    {title:"Sciatica vs Piriformis Syndrome",subtitle:"They feel the same — but the treatment is completely different",icon:"🔍",bg:"from-blue-700 via-blue-500 to-cyan-400"},
    {title:"Sciatica: Pain radiates all the way to the foot",subtitle:"Caused by disc herniation or spinal stenosis compressing L4-S1",icon:"⚡",bg:"from-red-600 via-orange-500 to-amber-400"},
    {title:"Piriformis: Pain stays in the buttock and hip",subtitle:"Caused by the piriformis muscle spasming around the sciatic nerve",icon:"🎯",bg:"from-blue-600 via-sky-500 to-teal-400"},
    {title:"Key test: Does pain worsen sitting or walking?",subtitle:"Sitting worsens piriformis. Walking worsens true sciatica.",icon:"🪑",bg:"from-indigo-600 via-violet-500 to-purple-400"},
    {title:"Treatment differs significantly",subtitle:"Sciatica may need decompression. Piriformis responds to stretching.",icon:"💊",bg:"from-teal-600 via-cyan-500 to-blue-400"},
    {title:"See the full diagnostic guide below",subtitle:"Includes the 3 clinical tests physiotherapists use",icon:"📋",bg:"from-blue-800 via-blue-600 to-slate-700"},
  ],
  cushions:[
    {title:"5 Best Seat Cushions for Sciatica — Tested",subtitle:"Ranked by nerve pressure relief, comfort and durability",icon:"🪑",bg:"from-blue-700 via-blue-500 to-cyan-400"},
    {title:"#1 Coccyx Cutout Memory Foam — Score 95/100",subtitle:"The cutout removes direct pressure on the sciatic nerve root",icon:"🥇",bg:"from-blue-600 via-sky-500 to-cyan-400"},
    {title:"#2 Gel Cushion — Score 89/100",subtitle:"Distributes weight evenly. Stays cool. Best for long sitting.",icon:"💙",bg:"from-cyan-600 via-teal-500 to-blue-400"},
    {title:"#3 Wedge Cushion — Score 84/100",subtitle:"Tilts pelvis forward to decompress L4-S1 naturally",icon:"📐",bg:"from-indigo-600 via-blue-500 to-sky-400"},
    {title:"Key buying factor: coccyx cutout",subtitle:"Without the cutout, cushions can worsen nerve compression",icon:"⚠️",bg:"from-amber-600 via-orange-500 to-red-400"},
    {title:"Full ranked list and buying guide below",subtitle:"Includes Amazon links, price comparison and user reviews",icon:"✅",bg:"from-blue-800 via-blue-600 to-slate-700"},
  ],
};
export default function SciaticaVideo({variant}:{variant:"exercises"|"piriformis"|"cushions"}){
  const slides=SETS[variant];
  const[elapsed,setElapsed]=useState(0);
  const[playing,setPlaying]=useState(true);
  useEffect(()=>{
    if(!playing)return;
    const t=window.setInterval(()=>setElapsed(p=>{const n=p+0.1;return n>=LOOP?0:n;}),100);
    return()=>window.clearInterval(t);
  },[playing]);
  const idx=Math.floor(elapsed/SLIDE)%slides.length;
  const slide=useMemo(()=>slides[idx],[idx,slides]);
  return(
    <section className="my-8 rounded-xl border border-slate-200 bg-slate-950 p-3 sm:p-4 shadow-lg">
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-800 relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-colors duration-700`}/>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_45%)]"/>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="mb-4 text-5xl">{slide.icon}</div>
          <p className="text-xl sm:text-3xl font-extrabold leading-tight max-w-2xl">{slide.title}</p>
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl">{slide.subtitle}</p>
        </div>
        <div className="absolute bottom-3 right-4 text-xs text-white/40 font-mono">sciaticaspot.com</div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" onClick={()=>setPlaying(p=>!p)} className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500">{playing?"⏸ Pause":"▶ Play"}</button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700"><div className="h-full rounded-full bg-blue-400 transition-[width] duration-100" style={{width:`${(elapsed/LOOP)*100}%`}}/></div>
        <span className="text-xs text-slate-300 tabular-nums">{Math.floor(elapsed)}s/30s</span>
      </div>
    </section>
  );
}
