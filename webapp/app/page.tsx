"use client";

import { useRef, useState } from "react";
import {
  Activity, ArrowUpRight, Binary, Boxes, Braces, ChevronRight,
  CircleHelp, Clock3, FileCode2, FileSearch, FolderKanban, Globe2,
  History, Network, Plus, Search, Settings2, ShieldCheck, UploadCloud,
  WifiOff, Zap,
} from "lucide-react";

type InputMode = "file" | "website" | "code";

const projects = [
  { name: "Sample Electron desktop app", detail: "Electron · JavaScript · Demo project", status: "Demo data", icon: "desktop" },
  { name: "Android application review", detail: "APK · Static inspection · Demo project", status: "Demo data", icon: "android" },
  { name: "Website architecture study", detail: "Website · Browser inspection · Demo project", status: "Demo data", icon: "web" },
];

export default function Home() {
  const [mode, setMode] = useState<InputMode>("file");
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [fileName, setFileName] = useState("");
  const [notice, setNotice] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function stageAnalysis() {
    const hasInput = mode === "file" ? fileName : mode === "website" ? url.trim() : source.trim();
    if (!hasInput) {
      setNotice(mode === "file" ? "Choose a file first." : mode === "website" ? "Enter a website URL first." : "Paste source code first.");
      return;
    }
    setNotice("Input received. Connect the local REA engine to start a real analysis. No analysis has been run yet.");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">R</div>
          <div><div className="brand-name">REA</div><div className="brand-sub">REVERSE ANYTHING</div></div>
        </div>

        <div>
          <div className="nav-label">WORKSPACE</div>
          <button className="nav-item active"><FolderKanban size={16} /> Overview</button>
          <button className="nav-item"><FileSearch size={16} /> New analysis</button>
          <button className="nav-item"><History size={16} /> Analysis history</button>
          <button className="nav-item"><Boxes size={16} /> Projects</button>
        </div>

        <div>
          <div className="nav-label">TOOLS</div>
          <button className="nav-item"><Network size={16} /> Architecture map</button>
          <button className="nav-item"><Braces size={16} /> Code explorer</button>
          <button className="nav-item"><Settings2 size={16} /> Settings</button>
        </div>

        <div className="side-bottom">
          <div className="engine-card">
            <div style={{display:"flex",alignItems:"center",fontSize:11,fontWeight:700,marginBottom:8}}><span className="engine-dot" />LOCAL ENGINE OFFLINE</div>
            <p className="helper" style={{margin:"0 0 12px"}}>Connect your computer to run REA tools locally and keep analysis under your control.</p>
            <button className="secondary-btn" style={{width:"100%"}} onClick={() => setNotice("Local companion setup is the next integration step. The engine is not connected yet.")}>Connection setup <ArrowUpRight size={12} style={{display:"inline",marginLeft:5}} /></button>
          </div>
          <div className="helper" style={{padding:"16px 9px 0"}}>REA Web · Early access foundation</div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="crumb">Workspace <ChevronRight size={12} style={{display:"inline",verticalAlign:"middle"}} /> <span style={{color:"#dce3ee"}}>Overview</span></div>
          <div style={{display:"flex",alignItems:"center",gap:13}}>
            <span className="helper" style={{display:"flex",alignItems:"center",gap:6}}><WifiOff size={13} /> Engine disconnected</span>
            <div className="avatar">ST</div>
          </div>
        </header>

        <section className="hero">
          <div className="eyebrow">Your reverse engineering workspace</div>
          <h1>Understand how<br />anything is built.</h1>
          <p className="subtitle">Inspect applications, websites, binaries and source code. Follow evidence, map architecture and work toward a reconstruction — with REA as your analysis engine.</p>
        </section>

        <section className="input-panel">
          <div className="section-head">
            <div><div style={{fontSize:14,fontWeight:700}}>Start a new investigation</div><div className="helper" style={{marginTop:5}}>Choose what you want to inspect.</div></div>
            <span className="status-pill">LOCAL-FIRST WORKFLOW</span>
          </div>
          <div className="input-tabs">
            <button className={`input-tab ${mode === "file" ? "selected" : ""}`} onClick={() => {setMode("file");setNotice("");}}><UploadCloud size={14} style={{display:"inline",verticalAlign:"middle",marginRight:6}} /> Upload file</button>
            <button className={`input-tab ${mode === "website" ? "selected" : ""}`} onClick={() => {setMode("website");setNotice("");}}><Globe2 size={14} style={{display:"inline",verticalAlign:"middle",marginRight:6}} /> Website URL</button>
            <button className={`input-tab ${mode === "code" ? "selected" : ""}`} onClick={() => {setMode("code");setNotice("");}}><FileCode2 size={14} style={{display:"inline",verticalAlign:"middle",marginRight:6}} /> Source code</button>
          </div>

          {mode === "file" && (
            <div className="dropzone">
              <div className="drop-icon"><UploadCloud size={20} /></div>
              <div style={{fontSize:13,fontWeight:650}}>{fileName || "Drop a file here or browse your computer"}</div>
              <div className="helper" style={{margin:"7px 0 14px"}}>APK · EXE · DLL · DMG · ZIP · WASM · and more</div>
              <input ref={fileRef} type="file" hidden onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} />
              <button className="secondary-btn" onClick={() => fileRef.current?.click()}>Choose file</button>
            </div>
          )}
          {mode === "website" && (
            <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
              <input className="field" style={{flex:"1 1 260px"}} placeholder="https://example.com" value={url} onChange={(event) => setUrl(event.target.value)} />
              <div className="helper" style={{width:"100%"}}>Only inspect websites you own or are authorized to test.</div>
            </div>
          )}
          {mode === "code" && (
            <textarea className="field" style={{minHeight:150,resize:"vertical",fontFamily:"monospace",lineHeight:1.6}} placeholder="Paste a code snippet or source file here…" value={source} onChange={(event) => setSource(event.target.value)} />
          )}

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,marginTop:15,flexWrap:"wrap"}}>
            <div className="helper" style={{display:"flex",alignItems:"center",gap:6}}><ShieldCheck size={13} /> Your analysis target stays local when using the companion.</div>
            <button className="primary-btn" onClick={stageAnalysis}>Prepare analysis <Zap size={14} style={{display:"inline",verticalAlign:"middle",marginLeft:7}} /></button>
          </div>
          {notice && <div role="status" style={{marginTop:13,padding:"11px 13px",borderRadius:9,border:"1px solid rgba(139,124,255,.22)",background:"rgba(139,124,255,.08)",color:"#c9c1ff",fontSize:12,lineHeight:1.5}}>{notice}</div>}
        </section>

        <section className="stat-grid">
          <div className="stat-card"><div className="stat-label">Projects</div><div className="stat-value">03</div><div className="stat-note">Example workspace items</div></div>
          <div className="stat-card"><div className="stat-label">Analysis runs</div><div className="stat-value">—</div><div className="stat-note">No live runs yet</div></div>
          <div className="stat-card"><div className="stat-label">Engine status</div><div className="stat-value" style={{fontSize:18,color:"#e6b56e",marginTop:13}}>Not connected</div><div className="stat-note">Local companion required</div></div>
        </section>

        <section>
          <div className="section-head">
            <div><h2>Recent workspaces</h2><div className="helper" style={{marginTop:5}}>Illustrative examples — not real analysis results.</div></div>
            <button className="secondary-btn" onClick={() => setNotice("Create a new investigation using the input panel above.")}><Plus size={13} style={{display:"inline",verticalAlign:"middle",marginRight:5}} /> New project</button>
          </div>
          <div className="content-card">
            {projects.map((project) => (
              <div className="project-row" key={project.name}>
                <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0}}>
                  <div className="project-icon">{project.icon === "android" ? <Binary size={17}/> : project.icon === "web" ? <Globe2 size={17}/> : <Activity size={17}/>}</div>
                  <div style={{minWidth:0}}><div className="project-title">{project.name}</div><div className="project-meta">{project.detail}</div></div>
                </div>
                <span className="status-pill">{project.status}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{display:"flex",alignItems:"center",gap:7,marginTop:22}} className="helper"><CircleHelp size={13}/> REA provides evidence and analysis limits; AI explanations will be grounded in those findings.</div>
      </main>
    </div>
  );
}
