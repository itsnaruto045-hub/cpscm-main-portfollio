// js/main.js
// Main front-end scripts: nebula init, smooth scroll, nav toggle, counters, form validation, gallery lightbox, accordion.

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  });

  // Nav toggle (mobile)
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
  }

  // Mode toggle (simple dark/neon switch)
  const modeToggle = document.getElementById('mode-toggle');
  modeToggle?.addEventListener('click', ()=>{
    const dark = document.body.classList.toggle('dark');
    modeToggle.setAttribute('aria-pressed', String(!dark));
  });

  // Counters animation
  const counters = document.querySelectorAll('.counter .count');
  counters.forEach(el=>{
    const target = parseInt(el.getAttribute('data-target')||'0',10);
    let current = 0;
    const step = Math.max(1, Math.floor(target/120));
    const id = setInterval(()=>{
      current += step;
      if(current >= target){
        el.textContent = String(target);
        clearInterval(id);
      } else {
        el.textContent = String(current);
      }
    },12);
  });

  // Admission form validation and sample submission (front-end only)
  const form = document.getElementById('admission-form');
  form?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    // Basic HTML5 validation
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    // Collect data
    const data = new FormData(form);
    // Dev note: Replace URL with real backend endpoint e.g. '/api/admissions'
    try{
      // This sample uses fetch; comment out if back-end not ready.
      /*
      const res = await fetch('/api/admissions',{method:'POST',body:data});
      if(!res.ok) throw new Error('Network response was not ok');
      alert('আপনার আবেদনটি জমা হয়েছে — ধন্যবাদ');
      */
      // Fallback demo behaviour without backend:
      alert('Demo: form validated. Replace fetch URL with /api/admissions to submit to server.');
      form.reset();
    }catch(err){
      console.error(err);
      alert('Submission failed. Check console for details.');
    }
  });

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox-img');
  const lbClose = lightbox?.querySelector('.lightbox-close');
  document.querySelectorAll('.gallery-item').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const src = btn.getAttribute('data-src');
      if(!src) return;
      lightboxImg.src = src;
      lightbox.setAttribute('aria-hidden','false');
    });
  });
  lbClose?.addEventListener('click', ()=>{
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  });

  // Accordion toggles
  document.querySelectorAll('.accordion-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  // Init Nebula — try three.js, fallback to static CSS gradient
  initNebula();
});

function initNebula(){
  const canvas = document.getElementById('nebula-canvas');
  if(!canvas) return;
  // Attempt to initialize a lightweight three.js scene
  if(window.THREE){
    try{
      const renderer = new THREE.WebGLRenderer({canvas,antialias:false,alpha:true,powerPreference:'low-power'});
      renderer.setPixelRatio(window.devicePixelRatio||1);
      renderer.setSize(window.innerWidth,window.innerHeight);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000);
      camera.position.z = 1;

      // Create simple animated points (starfield) + large gradient plane (nebula)
      const starsGeo = new THREE.BufferGeometry();
      const starCount = 800; // keep small for perf
      const positions = new Float32Array(starCount*3);
      for(let i=0;i<starCount;i++){
        positions[i*3] = (Math.random()-0.5)*10;
        positions[i*3+1] = (Math.random()-0.5)*6;
        positions[i*3+2] = -Math.random()*50;
      }
      starsGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
      const starsMat = new THREE.PointsMaterial({size:Math.random()*1.2+0.2,transparent:true});
      starsMat.color = new THREE.Color(0x99f3ff);
      const starPoints = new THREE.Points(starsGeo,starsMat);
      scene.add(starPoints);

      // Nebula plane with simple shader-like gradient using a large sprite
      const loader = new THREE.TextureLoader();
      const grad = new THREE.MeshBasicMaterial({color:0x0b0b23,transparent:true,opacity:0.7});
      const planeGeom = new THREE.PlaneGeometry(20,10);
      const plane = new THREE.Mesh(planeGeom, grad);
      plane.position.z = -10;
      scene.add(plane);

      // animate
      let t=0;
      function animate(){
        t+=0.005;
        starPoints.rotation.y += 0.0008;
        starPoints.rotation.x = Math.sin(t*0.2)*0.02;
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
      }
      animate();

      // handle resize
      window.addEventListener('resize', ()=>{
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();
      });

      return true;
    }catch(err){
      console.warn('three.js nebula failed, using CSS fallback',err);
      canvas.style.display='none';
      return false;
    }
  }else{
    // No three.js: hide canvas (CSS fallback applies)
    canvas.style.display='none';
    return false;
  }
}
