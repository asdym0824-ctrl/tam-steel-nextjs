'use client';
import { useState } from 'react';
type Item = { id:string; kind:string; tracking_code:string; status:string; created_at:string; payload:Record<string,string> };
export default function Admin() {
 const [token,setToken] = useState(''); const [items,setItems] = useState<Item[]>([]);
 const [error,setError] = useState(''); const [busy,setBusy] = useState(false);
 async function load() {
  setBusy(true); setError('');
  try { const res = await fetch('/api/admin/submissions',{headers:{Authorization:`Bearer ${token}`}}); if(!res.ok) throw new Error('دسترسی مجاز نیست یا خطای سرور رخ داده است.'); const data = await res.json(); setItems(data.items); }
  catch(e) { setError(e instanceof Error ? e.message : 'خطا'); }
  finally { setBusy(false); }
 }
 async function update(id:string,status:string) {
  setError('');
  try { const res = await fetch('/api/admin/submissions',{method:'PATCH',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({id,status})}); if(!res.ok) throw new Error('تغییر وضعیت ناموفق بود.'); await load(); }
  catch(e) { setError(e instanceof Error ? e.message : 'خطا'); }
 }
 return <main dir="rtl" className="min-h-screen bg-slate-100 text-slate-900 p-6 space-y-5">
 <h1 className="text-2xl font-bold">مدیریت درخواست‌های تام فولاد</h1>
 <form onSubmit={e => {e.preventDefault(); void load();}} className="flex flex-wrap gap-3">
 <label htmlFor="admin-token">کلید مدیریت</label><input id="admin-token" type="password" required value={token} onChange={e=>setToken(e.target.value)} className="border rounded p-2 bg-white" />
 <button disabled={busy} className="bg-blue-700 text-white rounded p-2">{busy?'در حال دریافت…':'دریافت درخواست‌ها'}</button>
 <button type="button" onClick={()=>{setToken('');setItems([]);setError('');}} className="border rounded p-2">خروج</button></form>
 {error && <p role="alert" className="text-red-700">{error}</p>}
 {items.length===0 && <p>درخواستی برای نمایش وجود ندارد. برای دریافت اطلاعات وارد شوید.</p>}
 {items.map(item=><article key={item.id} className="bg-white rounded-xl p-5 border space-y-3">
 <h2 className="font-bold break-all">{item.kind} — {item.tracking_code}</h2>
 <time>{new Date(item.created_at).toLocaleString('fa-IR',{timeZone:'Asia/Tehran'})}</time>
 <dl className="space-y-2">{Object.entries(item.payload).map(([key,value])=><div key={key}><dt className="font-bold">{key}</dt><dd className="whitespace-pre-wrap break-words">{key==='signature'?<img src={String(value)} alt="امضای ثبت‌شده" className="max-w-sm border" />:String(value)}</dd></div>)}</dl>
 <label>وضعیت <select value={item.status} onChange={e=>void update(item.id,e.target.value)} className="border p-2"><option value="new">جدید</option><option value="reviewing">در حال بررسی</option><option value="closed">بسته‌شده</option></select></label>
 </article>)}
 </main>;
}
