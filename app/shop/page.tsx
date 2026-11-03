'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Category={id:number;name:string;slug:string;description:string;image:string};
type Product={id:number;name:string;slug:string;description:string;category_id:number;category?:Category|null;price:number;compare_at_price?:number|null;sku:string;image:string;gallery:string[];tags:string[];stock:number};
type CartLine={product_id:number;name:string;price:number;image:string;quantity:number};
const API=process.env.NEXT_PUBLIC_API_URL||'https://backend-formhaus.vercel.app/api';
const asset=(src:string)=>src?.startsWith('/uploads/')?API.slice(0,-4)+src:src;
const money=(n:number)=>new Intl.NumberFormat('en-BD',{style:'currency',currency:'BDT',maximumFractionDigits:0}).format(n);
const readCart=():CartLine[]=>{try{return JSON.parse(localStorage.getItem('formhaus_cart')||'[]')}catch{return []}};
export default function ShopPage(){
 const [categories,setCategories]=useState<Category[]>([]);
 const [products,setProducts]=useState<Product[]>([]);
 const [category,setCategory]=useState('all');
 const [cart,setCart]=useState<CartLine[]>([]);
 const [cartOpen,setCartOpen]=useState(false);
 const [checkout,setCheckout]=useState(false);
 const [loading,setLoading]=useState(true);
 const [notice,setNotice]=useState('');
 const [customer,setCustomer]=useState({customer_name:'',email:'',phone:'',address:'',notes:''});
 useEffect(()=>{setCart(readCart());if(window.location.hash==='#cart')setCartOpen(true);Promise.all([fetch(API+'/shop/categories').then(r=>r.json()),fetch(API+'/shop/products').then(r=>r.json())]).then(([c,p])=>{setCategories(c.categories||[]);setProducts(p.products||[])}).catch(()=>setNotice('The shop could not load right now. Please refresh.')).finally(()=>setLoading(false))},[]);
 useEffect(()=>{localStorage.setItem('formhaus_cart',JSON.stringify(cart))},[cart]);
 const visible=useMemo(()=>category==='all'?products:products.filter(p=>String(p.category_id)===category),[products,category]);
 const count=cart.reduce((s,x)=>s+x.quantity,0),total=cart.reduce((s,x)=>s+x.price*x.quantity,0);
 const add=(p:Product)=>{setCart(old=>{const found=old.find(x=>x.product_id===p.id);return found?old.map(x=>x.product_id===p.id?{...x,quantity:Math.min(99,x.quantity+1)}:x):[...old,{product_id:p.id,name:p.name,price:p.price,image:p.image,quantity:1}]});setNotice(p.name+' added to cart');setCartOpen(true)};
 const qty=(id:number,delta:number)=>setCart(old=>old.map(x=>x.product_id===id?{...x,quantity:x.quantity+delta}:x).filter(x=>x.quantity>0));
 const placeOrder=async(e:React.FormEvent)=>{e.preventDefault();setNotice('Placing your order…');try{const res=await fetch(API+'/shop/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...customer,items:cart.map(x=>({product_id:x.product_id,quantity:x.quantity})),currency:'BDT'})});const data=await res.json();if(!res.ok)throw new Error(data.message||'Could not place order');setCart([]);setCheckout(false);setNotice('Order '+data.order.order_number+' received. We will contact you to confirm it.')}catch(e){setNotice(e instanceof Error?e.message:'Order failed. Please try again.')}};
 return <main className="page-shell inner-page">
  <header className="topbar"><Link href="/" className="brand-block"><span className="brand-mark">F</span><span>FORMHAUS.STUDIO</span></Link><nav className="main-nav"><Link href="/">Home</Link><Link href="/shop" aria-current="page">Shop</Link><Link href="/about">About</Link><Link href="/#contact">Contact</Link></nav><button className="primary-link" onClick={()=>setCartOpen(true)}>Cart ({count})</button></header>
  <section className="section-intro top-pad"><p className="eyebrow">FORMHAUS STORE</p><h2>Objects made with intention.</h2><p>Explore the collection and find something worth keeping.</p></section>
  <div style={{display:'flex',gap:10,flexWrap:'wrap',padding:'10px 5vw 28px'}}><button onClick={()=>setCategory('all')} className={category==='all'?'primary-button':'secondary-button'}>All products</button>{categories.map(c=><button key={c.id} onClick={()=>setCategory(String(c.id))} className={category===String(c.id)?'primary-button':'secondary-button'}>{c.name}</button>)}</div>
  {notice?<p role="status" style={{padding:'0 5vw',fontSize:13}}>{notice}</p>:null}
  {loading?<p style={{padding:'30px 5vw'}}>Loading products…</p>:<section className="project-grid two-col" style={{paddingBottom:70}}>{visible.map(p=><article key={p.id} className="project-card"><div className="project-media" style={{backgroundImage:p.image?'url('+asset(p.image)+')':'none',backgroundColor:'#e8e4dc'}}/><div className="project-content"><p className="project-tag">{categories.find(c=>c.id===p.category_id)?.name||p.category?.name||'Collection'}</p><h3>{p.name}</h3><p>{p.description}</p><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}><strong>{money(p.price)}</strong><button className="primary-button" onClick={()=>add(p)} disabled={p.stock===0}> {p.stock===0?'Sold out':'Add to cart'}</button></div></div></article>)}</section>}
  {!loading&&!visible.length?<div style={{padding:'60px 5vw'}}>No products in this category yet.</div>:null}
  {cartOpen?<div style={{position:'fixed',inset:0,background:'#0008',zIndex:50,display:'flex',justifyContent:'flex-end'}} onClick={()=>setCartOpen(false)}><aside id="cart" style={{background:'#f5f2ec',width:'min(480px,100%)',height:'100%',overflow:'auto',padding:26,color:'#191a18'}} onClick={e=>e.stopPropagation()}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><h2 style={{fontSize:24}}>Your cart ({count})</h2><button onClick={()=>setCartOpen(false)} aria-label="Close cart">✕</button></div>{cart.map(x=><div key={x.product_id} style={{display:'flex',gap:14,padding:'16px 0',borderBottom:'1px solid #ddd'}}><div style={{width:76,height:76,background:'#e5e1d8',backgroundImage:x.image?'url('+asset(x.image)+')':'none',backgroundSize:'cover',backgroundPosition:'center'}}/><div style={{flex:1}}><strong>{x.name}</strong><p>{money(x.price)}</p><div style={{display:'flex',gap:12,alignItems:'center'}}><button onClick={()=>qty(x.product_id,-1)}>−</button>{x.quantity}<button onClick={()=>qty(x.product_id,1)}>＋</button><button onClick={()=>qty(x.product_id,-x.quantity)} style={{marginLeft:'auto'}}>Remove</button></div></div></div>)}<div style={{display:'flex',justifyContent:'space-between',padding:'20px 0',fontSize:18}}><strong>Subtotal</strong><strong>{money(total)}</strong></div>{cart.length?<button className="primary-button" style={{width:'100%'}} onClick={()=>setCheckout(true)}>Continue to checkout</button>:<p>Your cart is empty.</p>}
  {checkout?<form onSubmit={placeOrder} style={{marginTop:24,display:'grid',gap:12}}><h3>Delivery details</h3><input required placeholder="Full name" value={customer.customer_name} onChange={e=>setCustomer({...customer,customer_name:e.target.value})}/><input required type="email" placeholder="Email address" value={customer.email} onChange={e=>setCustomer({...customer,email:e.target.value})}/><input required placeholder="Phone number" value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})}/><textarea required placeholder="Delivery address" value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})}/><textarea placeholder="Order notes (optional)" value={customer.notes} onChange={e=>setCustomer({...customer,notes:e.target.value})}/><button className="primary-button" type="submit">Place order · {money(total)}</button></form>:null}</aside></div>:null}
 </main>
}