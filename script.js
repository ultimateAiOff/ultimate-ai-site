const btnEgg = document.getElementById("btn");
window.addEventListener('load', () => {
  initMobileFeatures()
  setTheme(document.body.classList.contains('dark') ? 'dark' : 'light');

  btnEgg.addEventListener("click", () => {
    if (window.location.pathname.endsWith("siteevon.html")) {
  window.location.href = "siteegg.html";
 
} else {
  window.location.href = "siteevon.html";
  
}

    
  });
});





// ======== Gestion du menu burger ========
function setupBurgerMenu() {
  const burger = document.createElement('button');
  burger.className = 'burger-menu';
  burger.innerHTML = '<span></span><span></span><span></span>';
  burger.setAttribute('aria-label', 'Menu mobile');
  if (themeRadios[1].checked) {
    if (burger) burger.classList.add('dark');
  }
  const nav = document.querySelector('nav ul');
  const mobileNav = nav.cloneNode(true);
  mobileNav.className = 'mobile-nav';
  
  // Appliquer le thème actuel au menu mobile
  if (body.classList.contains('dark')) {
    mobileNav.style.background = '#121212';
    mobileNav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.8)';
    mobileNav.style.borderBottom = '2px solid #ff6a00';
  } else {
    mobileNav.style.background = '#e6e6e6';
    mobileNav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
  }
  
  document.querySelector('.navbar').appendChild(burger);
  document.body.appendChild(mobileNav);
  
  burger.addEventListener('click', function() {
    this.classList.toggle('open');
    mobileNav.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
  });
  
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('show');
      document.body.classList.remove('no-scroll');
    });
  });
}
// ======== Détection responsive ========
function checkScreenSize() {
  const burger = document.querySelector('.burger-menu');
  const nav = document.querySelector('nav ul');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (window.innerWidth <= 768) {
    if (!burger) setupBurgerMenu();
    if (nav) nav.style.display = 'none';
    
    // Appliquer le thème actuel si le menu mobile existe
    if (mobileNav) {
      if (body.classList.contains('dark')) {
        mobileNav.style.background = '#121212';
      } else {
        mobileNav.style.background = '#e6e6e6';
      }
    }
  } else {
    if (burger) burger.remove();
    if (mobileNav) mobileNav.remove();
    if (nav) nav.style.display = 'flex';
  }
}

  // ======= Navigation scrol ========
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if(element) {
    const offset = 80; // Hauteur navbar
    const position = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }
}

// Gestion des clics
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScrollTo(this.getAttribute('href'));
  });
});

// Gestion des liens externes
  document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Compensation navbar
        behavior: 'smooth'
      });
    }
  });
});
  // ======= Audio Setup =======
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  // Sons génériques avec fréquence, durée, type, volume
  function playSound(freq, duration, type = 'sine', volume = 0.1) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  }

  // Effet son au changement de thème
  function playThemeToggleSound(){
    playSound(500, 0.12, 'triangle', 0.15);
    setTimeout(() => playSound(650, 0.12, 'triangle', 0.15), 150);
  }

  // ======== THEME TOGGLE avec animation fondu + sauvegarde localStorage ========
const body = document.body;
const themeRadios = document.querySelectorAll('input[name="theme"]');

function setTheme(theme) {
  const burger = document.querySelector('.burger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (theme === 'dark') {
    body.classList.replace('light', 'dark');
    if (burger) burger.classList.add('dark');
    if (btnEgg) btnEgg.classList.add('dark');
    localStorage.setItem('evon-theme', 'dark');
    // Appliquer le style sombre au menu mobile s'il existe
    if (mobileNav && window.location.pathname.endsWith("siteevon.html")) {
      mobileNav.style.background = '#121212';
      mobileNav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.8)';
      mobileNav.style.borderBottom = '2px solid #ff6a00';
    }else if (mobileNav && window.location.pathname.endsWith("siteegg.html")) {
      mobileNav.style.background = 'linear-gradient(90deg, #1e1b3a, #3a3360)';
      mobileNav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.8)';
      mobileNav.style.borderBottom = '2px solid #ff6a00';
    }
  } else {
    body.classList.replace('dark', 'light');
    if (burger) burger.classList.remove('dark');
    if (btnEgg) btnEgg.classList.remove('dark');  
    localStorage.setItem('evon-theme', 'light');
    // Appliquer le style clair au menu mobile s'il existe
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav && window.location.pathname.endsWith("siteevon.html")) {
      mobileNav.style.background = '#e6e6e6';
      mobileNav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
      mobileNav.style.borderBottom = 'none';
    }else if (mobileNav && window.location.pathname.endsWith("siteegg.html")) {
      mobileNav.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
      mobileNav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
      mobileNav.style.borderBottom = 'none';
    }
  }
  playThemeToggleSound();
}

themeRadios.forEach(radio => {
  radio.addEventListener('change', (e) => setTheme(e.target.value));
});

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && (e.key === "q" || e.key === "Q")) {
    
    // Récupère l'élément radio coché
    const currentTheme = document.querySelector('input[name="theme"]:checked');
    
    if (currentTheme.value === "dark") {
      document.getElementById("theme-light").click(); // Simule un clic sur le radio light
    } else {
      document.getElementById("theme-dark").click(); // Simule un clic sur le radio dark
    }
    
    // Déclenche le changement de thème
    setTheme(document.querySelector('input[name="theme"]:checked').value);
    if (body.classList.contains('dark')) {
    gameCanvas.style.background = 'linear-gradient(135deg, #302b63, #24243e)';
  } else {
    gameCanvas.style.background = 'linear-gradient(135deg, #ff6a00, #ee0979)';
  }
  }else if (e.key === "Escape"){
    if (!(gamePaused)){
      pause();
    }else{
      startGame();
      pausebtn.textContent = "||";
      gamePaused = false;
    }
  }
});
// Initialisation
function loadTheme() {
  const saved = localStorage.getItem('evon-theme') || 'light';
  setTheme(saved);
  document.getElementById(`theme-${saved}`).checked = true;
}

loadTheme();

  // Apparition progressive des sections
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('visible');
      else e.target.classList.remove('visible');
    });
  }, {threshold: 0.2});
  sections.forEach(sec => observer.observe(sec));

  