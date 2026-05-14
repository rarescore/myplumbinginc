
const menuBtn=document.querySelector('[data-menu-btn]');const menu=document.querySelector('[data-mobile-menu]');if(menuBtn&&menu){menuBtn.addEventListener('click',()=>menu.classList.toggle('open'));}
function mailForm(form, subject){const data=new FormData(form);let body='';for(const [k,v] of data.entries()){body+=`${k}: ${v}\n`;}window.location.href=`mailto:myplumbinginc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;}
document.querySelectorAll('[data-mail-form]').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();mailForm(form,form.dataset.subject||'Website Request');});});
