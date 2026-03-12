
// Navbar scroll
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40)
})

// Mobile menu
function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('open')
}

// Scroll reveal
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}})
},{threshold:0.12})
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))

// Form submit
function submitForm(){document.getElementById('successModal').classList.add('open')}
async function submitContact(){
  const btn = document.getElementById('submitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
  
  const payload = {
    name: document.getElementById('contactName').value,
    phone: document.getElementById('contactPhone').value,
    subject: document.getElementById('contactSubject').value,
    message: document.getElementById('contactMessage').value
  };

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      document.getElementById('successModal').classList.add('open');
      document.getElementById('contactName').value = '';
      document.getElementById('contactPhone').value = '';
      document.getElementById('contactSubject').value = '';
      document.getElementById('contactMessage').value = '';
    } else {
      alert('Could not submit form. Please check your network or use WhatsApp.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again later.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Send Message \u2192'; }
  }
}
function closeSuccess(){document.getElementById('successModal').classList.remove('open')}

// Portal modal
function openPortalModal(type){
  const modal=document.getElementById('portalModal')
  document.getElementById('modalIcon').textContent=type==='student'?'🎒':'👨‍👩‍👧'
  document.getElementById('modalTitle').textContent=type==='student'?'Student Login':'Parent Login'
  document.getElementById('modalSub').textContent=type==='student'?'Access your academic dashboard':'Stay connected with your child\'s progress'
  modal.classList.add('open')
}
function closeModal(){document.getElementById('portalModal').classList.remove('open')}
function portalLogin(){
  closeModal()
  alert('Demo mode — In the live website, this will log you into your portal.')
}

// Photo Zoom
function openZoom(src){
  const modal = document.getElementById('zoomModal');
  const img = document.getElementById('zoomImg');
  img.src = src;
  modal.classList.add('open');
}
function closeZoom(){
  document.getElementById('zoomModal').classList.remove('open');
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(el=>{
  el.addEventListener('click',e=>{if(e.target===el){el.classList.remove('open')}})
})

// Smooth scroll nav highlighting
const sections=['courses','teachers','results','facilities','news','contact','admission']
window.addEventListener('scroll',()=>{
  const scrollY=window.scrollY+120
  sections.forEach(id=>{
    const el=document.getElementById(id)
    if(el){
      const top=el.offsetTop,bot=top+el.offsetHeight
      const link=document.querySelector(`.nav-links a[href="#${id}"]`)
      if(link)link.classList.toggle('active',scrollY>=top&&scrollY<bot)
    }
  })
})

