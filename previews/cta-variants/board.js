(() => {
  const names={a:'Sin ícono',b:'Chevrón discreto',c:'Ícono de acción',d:'Flecha horizontal'};
  const paths={b:'<path d="m9 5 7 7-7 7"/>',d:'<path d="M4 12h16m-6-6 6 6-6 6"/>',c:'<path d="M20 11.5a8 8 0 0 1-8 8H5l-4 3 2-6a8 8 0 1 1 17-5Z"/><path d="M7 10h8m-8 4h5"/>',login:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 21V3m6 8v2"/>'};
  const frame=document.querySelector('#page-frame');
  let selected='a',timer;
  document.querySelectorAll('.option').forEach(card=>card.querySelectorAll('.icon').forEach(el=>{
    const kind=card.dataset.variant==='c'&&el.classList.contains('login')?'login':card.dataset.variant;
    el.innerHTML=paths[kind]?`<svg viewBox="0 0 24 24">${paths[kind]}</svg>`:'';
  }));
  function select(v){
    selected=names[v]?v:'a';
    document.querySelectorAll('[data-select]').forEach(b=>{const active=b.dataset.select===selected;b.setAttribute('aria-pressed',String(active));b.closest('.option').classList.toggle('selected',active);});
    document.querySelector('#context-title').textContent=`${selected.toUpperCase()} · ${names[selected]}`;
    document.querySelector('#full-link').href=`context.html?variant=${selected}`;
    frame.title=`Alvia v5 con alternativa ${selected.toUpperCase()}: ${names[selected]}`;
    frame.contentWindow?.applyVariant?.(selected);
    history.replaceState(null,'',`?variant=${selected}`);
  }
  frame.addEventListener('load',()=>frame.contentWindow.applyVariant?.(selected));
  document.querySelectorAll('[data-select]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.select)));
  document.querySelectorAll('[data-width]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('[data-width]').forEach(other=>other.setAttribute('aria-pressed',String(other===b)));
    document.querySelector('.frame-stage').classList.toggle('mobile',b.dataset.width==='mobile');
  }));
  document.querySelectorAll('[data-demo]').forEach(el=>el.addEventListener('click',e=>{
    e.preventDefault(); select(el.closest('.option').dataset.variant);
    const notice=document.querySelector('#notice');
    notice.textContent=el.closest('.sample-nav')?'Este link abriría el ingreso de médicos.':'Este botón o link abriría una conversación en WhatsApp.';
    notice.hidden=false;clearTimeout(timer);timer=setTimeout(()=>notice.hidden=true,3000);
  }));
  select(new URLSearchParams(location.search).get('variant')||'a');
})();
