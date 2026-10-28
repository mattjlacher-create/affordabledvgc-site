(()=>{'use strict';
const isPreview=document.documentElement.hasAttribute('data-preview');
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
function init(){
  $$('.menu-toggle').forEach(b=>b.addEventListener('click',()=>{const nav=b.parentNode.querySelector('.nav');const on=nav.classList.toggle('is-open');b.setAttribute('aria-expanded',String(on));b.setAttribute('aria-label',on?'Close navigation':'Open navigation')}));
  // The service areas index behaves as real navigation: clicking a town fills the quote field.
  document.addEventListener('click',e=>{
    const townLink=e.target.closest('a[data-town]'); if(!townLink)return;
    const current=townLink.closest('.preview-page')||document;
    const form=current.querySelector('#quote form');if(!form)return;
    const field=form.querySelector('input[name=town_zip]');if(!field)return;
    field.value=townLink.dataset.town;field.dispatchEvent(new Event('input',{bubbles:true}));
  });
  // Rewrites local file navigation to beautiful unchanged slugs only when hosted.
  if(!isPreview&&/^https?:$/.test(location.protocol)){$$('a[data-slug]').forEach(a=>{const slug=a.dataset.slug;a.href=slug==='/'?'/':slug});}
  $$('.ba').forEach(el=>{const input=$('input[type=range]',el);if(!input)return; const update=()=>{el.style.setProperty('--position',input.value+'%');input.setAttribute('aria-valuetext',`${input.value}% of after image visible`)}; input.addEventListener('input',update);update()});
  $$('.filter').forEach(b=>b.addEventListener('click',()=>{const root=b.closest('[data-gallery]');$$('.filter',root).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$$('.gallery-item',root).forEach(item=>{item.hidden=b.dataset.filter!=='all'&&!item.dataset.categories.split(' ').includes(b.dataset.filter)}); }));
  const modal=$('.lightbox');if(modal){const img=$('img',modal),cap=$('p',modal);let prior;const close=()=>{modal.removeAttribute('open');document.body.style.overflow='';prior?.focus()};$$('.gallery-item').forEach(btn=>btn.addEventListener('click',()=>{prior=btn;img.src=$('img',btn).src;img.alt=$('img',btn).alt;cap.textContent=btn.dataset.caption||$('img',btn).alt;modal.setAttribute('open','');document.body.style.overflow='hidden';$('button',modal).focus()}));$('button',modal).addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.hasAttribute('open'))close()})}
  $$('.load-more').forEach(b=>b.addEventListener('click',()=>{const parent=b.previousElementSibling;parent.classList.toggle('expanded');const expanded=parent.classList.contains('expanded');b.textContent=expanded?'Show fewer reviews':'Read more reviews';b.setAttribute('aria-expanded',String(expanded))}));
  const m=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window&&!m){const ob=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');ob.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px 50px 0px'});$$('.reveal').forEach(el=>ob.observe(el)); const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;let v=0;const end=Number(e.target.dataset.count),isDecimal=String(end).includes('.'),start=performance.now();function frame(t){const p=Math.min(1,(t-start)/1300);const eased=1-Math.pow(1-p,3);v=end*eased;e.target.textContent=isDecimal?v.toFixed(1):Math.round(v).toLocaleString('en-US');if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);countObserver.unobserve(e.target)}),{threshold:.5});$$('[data-count]').forEach(el=>countObserver.observe(el))}
  else{$$('.reveal').forEach(el=>el.classList.add('is-visible'));$$('[data-count]').forEach(el=>el.textContent=el.dataset.count)}
  $$('form[data-lead-form]').forEach(form=>form.addEventListener('submit',async(e)=>{
    const status=$('.form-feedback',form);const fd=new FormData(form);if(!form.reportValidity())return;
    // Netlify Forms handles production submissions when deployed on Netlify.
    // Local/offline preview uses a transparent mail-app fallback; never simulate delivery.
    const isNetlify=!isPreview&&(location.hostname.endsWith('.netlify.app')||document.documentElement.dataset.formHost==='netlify');
    if(isNetlify){e.preventDefault();const send=new URLSearchParams();for(const [k,v] of fd){if(k!=='bot-field')send.append(k,v.toString())}const b=$('button[type=submit]',form);b.disabled=true;b.textContent='Sending…';try{const response=await fetch(location.pathname,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:send.toString()});if(!response.ok)throw new Error('Unable to submit');status.textContent='Thank you. Your request was submitted.';form.reset()}catch(error){status.textContent='Unable to submit right now. Please call or text (732) 966-6914.'}finally{b.disabled=false;b.textContent=b.dataset.label||'Request My Free Estimate →'}return;}
    e.preventDefault();const entries=[...fd.entries()].filter(([key])=>!['form-name','bot-field'].includes(key));const subject='Website request — '+(fd.get('service')||'General inquiry');const body=entries.map(([k,v])=>`${k}: ${v}`).join('\n');const email=`mailto:affordabledvgc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.innerHTML='Your email app should open with the request. <strong>You must send the email to complete it.</strong> If it does not open, call or text <a href="tel:+17329666914">(732) 966-6914</a>.';
    location.href=email;
  }));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
