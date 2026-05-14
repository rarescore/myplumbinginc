const menuBtn=document.querySelector('[data-menu-btn]');
const menu=document.querySelector('[data-mobile-menu]');
if(menuBtn&&menu){
  menuBtn.addEventListener('click',()=>{
    menu.classList.toggle('open');
    document.body.classList.toggle('menu-open', menu.classList.contains('open'));
  });
}

function mailForm(form, subject){
  const data=new FormData(form);
  let body='';
  for(const [k,v] of data.entries()) body+=`${k}: ${v}\n`;
  window.location.href=`mailto:myplumbinginc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
document.querySelectorAll('[data-mail-form]').forEach(form=>{
  form.addEventListener('submit',e=>{e.preventDefault();mailForm(form,form.dataset.subject||'Website Request');});
});

(function initChatbot(){
  const wrapper=document.createElement('div');
  wrapper.innerHTML=`
    <button class="chatbot-toggle" aria-label="Open chat assistant"></button>
    <div class="chatbot-panel" aria-hidden="true">
      <div class="chatbot-head"><h4>Ask about builds & CA code</h4><button type="button" aria-label="Close chat">×</button></div>
      <div class="chatbot-body">
        <div class="chat-msg bot">Hi, I’m the My Plumbing Inc website assistant. I can answer common questions about remodeling, ADUs, permits, timelines, financing, and California building basics.</div>
        <div class="chat-quick">
          <button type="button">Do I need a permit?</button>
          <button type="button">How does financing work?</button>
          <button type="button">Do you build ADUs?</button>
          <button type="button">Which areas do you serve?</button>
        </div>
      </div>
      <form class="chat-form">
        <input type="text" placeholder="Ask a question..." aria-label="Ask a question">
        <button type="submit">Send</button>
      </form>
    </div>`;
  document.body.appendChild(wrapper);
  const toggle=wrapper.querySelector('.chatbot-toggle');
  const panel=wrapper.querySelector('.chatbot-panel');
  const closeBtn=wrapper.querySelector('.chatbot-head button');
  const body=wrapper.querySelector('.chatbot-body');
  const form=wrapper.querySelector('.chat-form');
  const input=wrapper.querySelector('input');

  const addMsg=(text,who='bot')=>{
    const div=document.createElement('div');
    div.className=`chat-msg ${who}`;
    div.textContent=text;
    body.appendChild(div);
    body.scrollTop=body.scrollHeight;
  };

  const respond=(q)=>{
    const s=q.toLowerCase();
    if(/permit|code|inspection/.test(s)) return 'Most structural remodels, additions, ADUs, plumbing relocations, and electrical changes usually require permits and inspections in California. Exact requirements depend on the scope and city. My Plumbing Inc can review your project and explain the likely permit path.';
    if(/adu|accessory/.test(s)) return 'Yes. My Plumbing Inc handles ADU related construction and can help with planning, build scope, layout, finishes, and contractor coordination. Use the quote form to describe your lot and your ADU goals.';
    if(/kitchen|bath|remodel/.test(s)) return 'Kitchen and bathroom remodel timelines vary by size, materials, and whether plumbing or electrical is moved. A simple refresh can be much faster than a full reconfiguration. Edgar G. can provide a free quote and timeline estimate after reviewing your project.';
    if(/financ/.test(s)) return 'Financing may be available for qualified customers. The Financing page lets you send basic project information so Edgar G. can follow up with next steps and available options.';
    if(/area|serve|location|where/.test(s)) return 'My Plumbing Inc is based near North Hills and serves the entire Los Angeles area, including the San Fernando Valley and surrounding communities.';
    if(/price|cost|quote|estimate/.test(s)) return 'Pricing depends on scope, materials, access, and whether permits or specialty trades are involved. The fastest path is to request a free quote so Edgar G. can review the project details.';
    if(/license|insured|cslb/.test(s)) return 'My Plumbing Inc is a California B General Contractor, CSLB #1120118. You can also ask Edgar G. for project specific documentation.';
    return 'For a precise answer, the best next step is to send your project details through the Book Free Quote or Financing page. Edgar G. can review the scope and respond directly.';
  };

  toggle.addEventListener('click',()=>{
    panel.classList.toggle('open');
    panel.setAttribute('aria-hidden', String(!panel.classList.contains('open')));
  });
  closeBtn.addEventListener('click',()=>{
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
  });
  wrapper.querySelectorAll('.chat-quick button').forEach(btn=>btn.addEventListener('click',()=>{
    const q=btn.textContent.trim();
    addMsg(q,'user');
    addMsg(respond(q),'bot');
  }));
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const q=input.value.trim();
    if(!q) return;
    addMsg(q,'user');
    addMsg(respond(q),'bot');
    input.value='';
  });
})();
