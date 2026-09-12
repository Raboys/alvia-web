(() => {
  const paths = {
    b: '<path d="m9 5 7 7-7 7"/>',
    d: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    chat: '<path d="M20 11.5a8 8 0 0 1-8 8H5l-4 3 2-6a8 8 0 1 1 17-5Z"/><path d="M7 10h8m-8 4h5"/>',
    login: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 21V3m6 8v2"/>'
  };
  const names = { a:'Sin ícono', b:'Chevrón discreto', c:'Ícono de acción', d:'Flecha horizontal' };
  let timer;
  window.showMockNotice = text => {
    let el = document.querySelector('.mock-notice');
    if (!el) { el = document.createElement('div'); el.className='mock-notice'; el.setAttribute('role','status'); document.body.append(el); }
    el.textContent=text; el.hidden=false; clearTimeout(timer); timer=setTimeout(()=>el.hidden=true,3200);
  };
  window.applyVariant = variant => {
    const v = names[variant] ? variant : 'a';
    document.body.dataset.variant=v;
    document.querySelectorAll('.action-icon').forEach(el => {
      const href=el.closest('a')?.getAttribute('href') || '';
      const kind=v==='c' ? (href.includes('doctor.')?'login':'chat') : v;
      el.innerHTML=paths[kind] ? `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[kind]}</svg>` : '';
    });
    document.querySelectorAll('[data-select]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.select===v)));
    return v;
  };
  const context=location.pathname.endsWith('context.html');
  if(context) {
    document.addEventListener('click',e=>{
      const link=e.target.closest('a');
      if(!link || link.closest('.mock-switch')) return;
      const href=link.getAttribute('href')||'';
      if(/^(https?:|mailto:)/.test(href)) {
        e.preventDefault();
        showMockNotice(href.includes('wa.me')?'Este botón abriría WhatsApp.':href.includes('doctor.')?'Este link abriría el ingreso de médicos.':'Este link abriría tu correo.');
      }
    });
    if(window.self===window.top){
      const nav=document.createElement('nav'); nav.className='mock-switch'; nav.setAttribute('aria-label','Alternativas del mock');
      nav.innerHTML='<a href="index.html">Comparar</a>'+Object.entries(names).map(([v,n])=>`<button type="button" data-select="${v}" aria-label="${v.toUpperCase()}: ${n}">${v.toUpperCase()}</button>`).join('');
      document.body.append(nav);
      nav.addEventListener('click',e=>{const b=e.target.closest('[data-select]');if(b){applyVariant(b.dataset.select);history.replaceState(null,'',`?variant=${b.dataset.select}`);}});
    }
  }
  applyVariant(new URLSearchParams(location.search).get('variant')||'a');
})();
