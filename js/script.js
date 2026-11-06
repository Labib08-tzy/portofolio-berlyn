/* ════════════════════════════════════════════════════════════════════════════
   BERLYN TIARA HAPSARI — PORTFOLIO JAVASCRIPT ENGINE
   ✦ Antigravity Physics, Galaxy/Network Canvas, Web Audio Synthesizer,
     Interactive Packet Simulator, Hacker Terminal & Deluxe Discography ✦
   ════════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. SAFE FAST PRELOADER DISMISSAL ───
  const preloader = document.getElementById('preloader');
  function dismissPreloader() {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 550);
    }
  }
  // Dismiss automatically after brief aesthetic display (max 700ms) or immediately on click
  setTimeout(dismissPreloader, 700);
  if (preloader) preloader.addEventListener('click', dismissPreloader);

  // ─── 2. DUAL-RING GLOW CURSOR WITH INTERPOLATION ───
  const cursorDot = document.getElementById('cursorDot');
  const cursorFollower = document.getElementById('cursorFollower');

  if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorFollower) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followX = mouseX;
    let followY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function renderCursor() {
      followX += (mouseX - followX) * 0.15;
      followY += (mouseY - followY) * 0.15;
      cursorFollower.style.left = followX + 'px';
      cursorFollower.style.top = followY + 'px';
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover effect on interactive elements
    const interactiveTargets = document.querySelectorAll('a, button, input, textarea, .vinyl-album-card, .floating-badge, .track-row');
    interactiveTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
    });
  }

  // ─── 3. CLICK SPARKLE / HEART PARTICLE EXPLOSION ───
  document.addEventListener('click', (e) => {
    // Avoid spawning over modals or form fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      const symbols = ['✦', '✧', '♡', '🌸', '✨'];
      spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      spark.style.position = 'fixed';
      spark.style.left = e.clientX + 'px';
      spark.style.top = e.clientY + 'px';
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '999999';
      spark.style.fontSize = (Math.random() * 12 + 10) + 'px';
      spark.style.color = ['#ff2d95', '#ffbe0b', '#c77dff', '#ffffff', '#ff4081'][Math.floor(Math.random() * 5)];
      spark.style.transform = `translate(-50%, -50%) scale(1)`;
      spark.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      document.body.appendChild(spark);

      const angle = (Math.PI * 2 / 6) * i + (Math.random() * 0.5);
      const dist = Math.random() * 45 + 25;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 15;

      setTimeout(() => {
        spark.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
        spark.style.opacity = '0';
      }, 20);

      setTimeout(() => {
        if (spark.parentNode) spark.parentNode.removeChild(spark);
      }, 850);
    }
  });

  // ─── 4. DYNAMIC GALAXY STARS & NETWORK TOPOLOGY CANVAS ───
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle nodes representing computer network nodes & stars
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        color: ['#ff2d95', '#a855f7', '#ffd166', '#00f0ff', '#ffffff'][Math.floor(Math.random() * 5)],
        pulse: Math.random() * Math.PI
      });
    }

    // Shooting stars
    const shootingStars = [];
    function spawnShootingStar() {
      if (shootingStars.length < 2 && Math.random() < 0.03) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          len: Math.random() * 90 + 50,
          speed: Math.random() * 6 + 5,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          opacity: 1
        });
      }
    }

    let mouseCanvasX = -9999;
    let mouseCanvasY = -9999;
    window.addEventListener('mousemove', (e) => {
      mouseCanvasX = e.clientX;
      mouseCanvasY = e.clientY;
    });

    function drawNetworkGalaxy() {
      ctx.clearRect(0, 0, width, height);

      // Draw Network Lines between close nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.22;
            ctx.strokeStyle = `rgba(255, 45, 149, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & Update Particles
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle interactive mouse repulsion/pull
        const mdx = p.x - mouseCanvasX;
        const mdy = p.y - mouseCanvasY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100) {
          p.x += (mdx / mdist) * 1.5;
          p.y += (mdy / mdist) * 1.5;
        }

        p.pulse += 0.03;
        const sizeMod = Math.sin(p.pulse) * 0.5 + 1;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * sizeMod, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Shooting Stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (star.opacity <= 0 || star.x > width || star.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(255, 209, 102, ${star.opacity})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.len,
          star.y - Math.sin(star.angle) * star.len
        );
        ctx.stroke();
      }

      requestAnimationFrame(drawNetworkGalaxy);
    }
    requestAnimationFrame(drawNetworkGalaxy);
  }

  // ─── 5. 3D TILT EFFECT ON AVATAR CARD ───
  const avatarCard = document.getElementById('avatarCard');
  if (avatarCard) {
    avatarCard.addEventListener('mousemove', (e) => {
      const rect = avatarCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 24;
      const rotateY = (x / rect.width) * 24;
      avatarCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
    });

    avatarCard.addEventListener('mouseleave', () => {
      avatarCard.style.transform = '';
    });
  }

  // ─── 6. NAVBAR SCROLL & ACTIVE SECTION HIGHLIGHT ───
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Mobile Hamburger Toggle
  const navHamburger = document.getElementById('navHamburger');
  const navLinksContainer = document.getElementById('navLinks');
  if (navHamburger && navLinksContainer) {
    navHamburger.addEventListener('click', () => {
      navHamburger.classList.toggle('open');
      navLinksContainer.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navHamburger.classList.remove('open');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // ─── 7. REVEAL-ON-SCROLL & PROGRESS BARS ───
  const revealElements = document.querySelectorAll('.reveal-init');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // If it's a track row, animate its progress bar
        const progressFill = entry.target.querySelector('.track-progress-fill');
        if (progressFill) {
          const targetWidth = progressFill.getAttribute('data-progress');
          progressFill.style.width = targetWidth;
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });
  revealElements.forEach(el => revealObserver.observe(el));

  // ─── 8. SKILLS TRACKLIST FILTER CATEGORIES ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const trackRows = document.querySelectorAll('.track-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');

      trackRows.forEach(row => {
        const rowCategory = row.getAttribute('data-category');
        if (category === 'all' || rowCategory === category) {
          row.style.display = 'grid';
          setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
          }, 50);
        } else {
          row.style.opacity = '0';
          row.style.transform = 'translateY(15px)';
          setTimeout(() => {
            row.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ─── 9. LIVE STATION DIGITAL CLOCK (WIB) ───
  const liveClockDisplay = document.getElementById('liveClockDisplay');
  function updateLiveClock() {
    if (!liveClockDisplay) return;
    const now = new Date();
    // UTC+7 (WIB)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const wib = new Date(utc + (3600000 * 7));
    const h = String(wib.getHours()).padStart(2, '0');
    const m = String(wib.getMinutes()).padStart(2, '0');
    const s = String(wib.getSeconds()).padStart(2, '0');
    liveClockDisplay.textContent = `${h}:${m}:${s} WIB`;
  }
  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  // Dynamic Ping Simulation
  const livePingStat = document.getElementById('livePingStat');
  setInterval(() => {
    if (livePingStat) {
      const pings = ['1ms', '0.8ms', '1.2ms', '0.9ms', '1.4ms'];
      livePingStat.textContent = pings[Math.floor(Math.random() * pings.length)];
    }
  }, 3500);

  // ─── 10. PACKET TRANSMISSION SIMULATOR ───
  const runPacketSimBtn = document.getElementById('runPacketSimBtn');
  const pipelinePacket = document.getElementById('pipelinePacket');
  const simLogText = document.getElementById('simLogText');

  if (runPacketSimBtn && pipelinePacket && simLogText) {
    runPacketSimBtn.addEventListener('click', () => {
      runPacketSimBtn.disabled = true;
      runPacketSimBtn.style.opacity = '0.5';
      pipelinePacket.classList.remove('animate');
      void pipelinePacket.offsetWidth; // Trigger reflow
      pipelinePacket.classList.add('animate');

      simLogText.textContent = 'TRANSMITTING: 64 bytes to 8.8.8.8: icmp_seq=1 ttl=118 time=1.24 ms...';

      setTimeout(() => {
        simLogText.textContent = 'PACKET REACHED GATEWAY (192.168.1.1) ➔ FORWARDING TO CORE...';
      }, 900);

      setTimeout(() => {
        simLogText.textContent = 'REPLY RECEIVED: 64 bytes from 8.8.8.8: 0% packet loss, RTT min/avg = 1.0/1.2 ms [SUCCESS]';
        runPacketSimBtn.disabled = false;
        runPacketSimBtn.style.opacity = '1';
        showToast('Paket ICMP Berhasil Terkirim 100%!');
      }, 2200);
    });
  }

  // ─── 11. DELUXE NOW PLAYING & REAL AUDIO PLAYER (FRANK OCEAN AMBIENT) ───
  const tracks = [
    { title: 'Nights', album: 'BLONDE (2016)', duration: '05:07', src: 'assets/audio/nights.wav' },
    { title: 'Pink + White', album: 'BLONDE (2016)', duration: '03:04', src: 'assets/audio/pink_white.wav' },
    { title: 'Lost', album: 'CHANNEL ORANGE (2012)', duration: '03:54', src: 'assets/audio/lost.wav' },
    { title: 'White Ferrari', album: 'BLONDE (2016)', duration: '04:08', src: 'assets/audio/white_ferrari.wav' }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false; // Starts paused until user interacts (compliant with browser autoplay policies)

  const globalAudio = document.getElementById('globalAudioPlayer');
  const npSongTitle = document.getElementById('npSongTitle');
  const npAlbumSource = document.getElementById('npAlbumSource');
  const npCurrentTime = document.getElementById('npCurrentTime');
  const npTotalTime = document.getElementById('npTotalTime');
  const npScrubFill = document.getElementById('npScrubFill');
  const npScrubBar = document.getElementById('npScrubBar');
  const npPlayBtn = document.getElementById('npPlayBtn');
  const npPrevBtn = document.getElementById('npPrevBtn');
  const npNextBtn = document.getElementById('npNextBtn');
  const npVinylDisc = document.getElementById('npVinylDisc');
  const navAudioPill = document.getElementById('navAudioPill');
  const navAudioLabel = document.getElementById('navAudioLabel');
  const trackPillSelects = document.querySelectorAll('.track-pill-select');
  const eqBars = document.querySelectorAll('.eq-bar');

  // Load initial track
  const nativeAudio = document.getElementById('nativeAudioControls');
  const targetAudio = nativeAudio || globalAudio;

  if (targetAudio) {
    targetAudio.src = tracks[currentTrackIdx].src;
    targetAudio.volume = 0.95;
  }

  function setTrack(idx, autoPlay = true) {
    currentTrackIdx = idx;
    const t = tracks[idx];
    if (npSongTitle) npSongTitle.textContent = t.title;
    if (npAlbumSource) npAlbumSource.textContent = t.album;
    if (npTotalTime) npTotalTime.textContent = t.duration;

    trackPillSelects.forEach((pill, i) => {
      if (i === idx) pill.classList.add('active');
      else pill.classList.remove('active');
    });

    if (targetAudio) {
      targetAudio.src = t.src;
      targetAudio.currentTime = 0;
      if (autoPlay || isPlaying) {
        isPlaying = true;
        targetAudio.play().then(() => {
          updatePlayUI(true);
          showToast(`Sedang Memutar: Frank Ocean — ${t.title} 🎵`);
        }).catch(err => {
          console.log('Audio autoplay prevented:', err);
        });
      }
    }
  }

  function updatePlayUI(playing) {
    if (playing) {
      if (npPlayBtn) npPlayBtn.textContent = '⏸';
      if (npVinylDisc) npVinylDisc.classList.add('spinning');
      if (navAudioLabel) navAudioLabel.textContent = 'Audio On';
      if (navAudioPill) navAudioPill.style.borderColor = 'var(--pink-neon)';
    } else {
      if (npPlayBtn) npPlayBtn.textContent = '▶';
      if (npVinylDisc) npVinylDisc.classList.remove('spinning');
      if (navAudioLabel) navAudioLabel.textContent = 'Audio Off';
      if (navAudioPill) navAudioPill.style.borderColor = '';
      eqBars.forEach(bar => bar.style.height = '6px');
    }
  }

  function togglePlayState() {
    if (!targetAudio) return;

    if (targetAudio.paused) {
      targetAudio.play().then(() => {
        isPlaying = true;
        updatePlayUI(true);
        showToast(`Memutar Musik: Frank Ocean — ${tracks[currentTrackIdx].title} 🎧`);
      }).catch(e => {
        console.warn('Playback error:', e);
      });
    } else {
      targetAudio.pause();
      isPlaying = false;
      updatePlayUI(false);
      showToast('Musik dijeda');
    }
  }

  if (npPlayBtn) npPlayBtn.addEventListener('click', togglePlayState);
  if (navAudioPill) navAudioPill.addEventListener('click', togglePlayState);

  // Sync native controls with custom UI if user uses native bar
  if (nativeAudio) {
    nativeAudio.addEventListener('play', () => {
      isPlaying = true;
      updatePlayUI(true);
    });
    nativeAudio.addEventListener('pause', () => {
      isPlaying = false;
      updatePlayUI(false);
    });
  }

  // Auto start on first user interaction anywhere on page (resolves browser autoplay policy)
  function handleFirstInteraction() {
    if (!isPlaying && targetAudio && targetAudio.paused) {
      targetAudio.play().then(() => {
        isPlaying = true;
        updatePlayUI(true);
        showToast('Musik Frank Ocean mulai berputar 🎶');
      }).catch(() => {});
    }
    window.removeEventListener('click', handleFirstInteraction);
  }
  window.addEventListener('click', handleFirstInteraction, { once: true });

  if (npNextBtn) {
    npNextBtn.addEventListener('click', () => {
      const nextIdx = (currentTrackIdx + 1) % tracks.length;
      setTrack(nextIdx, true);
    });
  }

  if (npPrevBtn) {
    npPrevBtn.addEventListener('click', () => {
      const prevIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
      setTrack(prevIdx, true);
    });
  }

  trackPillSelects.forEach((pill, idx) => {
    pill.addEventListener('click', () => setTrack(idx, true));
  });

  // Track scrubber click
  if (npScrubBar && targetAudio) {
    npScrubBar.addEventListener('click', (e) => {
      const rect = npScrubBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (targetAudio.duration) {
        targetAudio.currentTime = pos * targetAudio.duration;
      }
    });
  }

  // Audio update event
  if (targetAudio) {
    targetAudio.addEventListener('timeupdate', () => {
      if (targetAudio.duration) {
        const cur = targetAudio.currentTime;
        const dur = targetAudio.duration;
        const m = String(Math.floor(cur / 60)).padStart(2, '0');
        const s = String(Math.floor(cur % 60)).padStart(2, '0');
        if (npCurrentTime) npCurrentTime.textContent = `${m}:${s}`;
        if (npScrubFill) {
          npScrubFill.style.width = `${(cur / dur) * 100}%`;
        }

        // Animate Equalizer Wave Bars
        if (!targetAudio.paused) {
          eqBars.forEach(bar => {
            const randHeight = Math.floor(Math.random() * 26 + 6);
            bar.style.height = `${randHeight}px`;
          });
        }
      }
    });

    targetAudio.addEventListener('ended', () => {
      // Loop to next track automatically
      const nextIdx = (currentTrackIdx + 1) % tracks.length;
      setTrack(nextIdx, true);
    });
  }

  // Heart like button
  const npHeartBtn = document.getElementById('npHeartBtn');
  if (npHeartBtn) {
    npHeartBtn.addEventListener('click', () => {
      npHeartBtn.textContent = '💖';
      npHeartBtn.style.color = '#ff2d95';
      showToast('Track ditambahkan ke favorit! ♡');
    });
  }

  // ─── 12. DISCOGRAPHY DETAIL MODAL ───
  const discoModalOverlay = document.getElementById('discoModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectSynopsis = document.getElementById('modalProjectSynopsis');
  const modalSpecDevice = document.getElementById('modalSpecDevice');
  const modalSpecProtocol = document.getElementById('modalSpecProtocol');
  const modalSpecTesting = document.getElementById('modalSpecTesting');
  const modalProjectNotes = document.getElementById('modalProjectNotes');

  const projectDetails = {
    vlan: {
      title: 'Simulasi Jaringan VLAN Multi-Subnet (Cisco Packet Tracer)',
      synopsis: 'Implementasi pemisahan traffic broadcast antardivisi (Lab Siswa & Ruang Guru) menggunakan virtual local area network pada switch Cisco 2960 dan router 1941.',
      device: 'Switch Cisco 2960 & Router 1941',
      protocol: 'IEEE 802.1Q (Trunking) & VTP',
      testing: 'Ping antarsubnet via Inter-VLAN Routing 100% Pass',
      notes: 'Pemisahan VLAN berhasil mengisolasi broadcast domain, meningkatkan efisiensi bandwidth dan proteksi keamanan jaringan lab komputer.'
    },
    crimping: {
      title: 'Praktek Crimping RJ-45 & Sertifikasi Pengujian Fluke',
      synopsis: 'Terminasi kabel twisted-pair Cat6 berstandar EIA/TIA-568A dan 568B, menghasilkan kabel straight-through untuk switch-to-PC dan cross-over untuk direct host.',
      device: 'Crimping Tool, RJ-45 Cat6, LAN Cable Tester',
      protocol: 'TIA/EIA-568B Standard Wiring',
      testing: 'Semua pin 1-8 menyala sempurna berurutan',
      notes: 'Dipastikan jaket kabel masuk ke dalam konektor sebelum di-press untuk mencegah kabel tertarik dan menjamin durabilitas jangka panjang.'
    },
    mikrotik: {
      title: 'Konfigurasi Router & Bandwidth Queue MikroTik',
      synopsis: 'Setup routerboard RB750Gr3 untuk manajemen gateway lab: NAT Masquerade ke ISP, DHCP Server pool 100 host, dan pembatasan bandwidth merata.',
      device: 'MikroTik RouterBOARD RB750Gr3',
      protocol: 'DHCP, NAT, Simple Queue Tree',
      testing: 'Speedtest bandwidth terlimitasi tepat 10 Mbps/user',
      notes: 'Dilengkapi firewall filter rules untuk memblokir port berbahaya dan mengamankan akses admin winbox hanya dari IP manajemen.'
    },
    server: {
      title: 'Deployment Linux Ubuntu Web Server',
      synopsis: 'Instalasi headless Ubuntu Server 22.04 LTS pada mesin lab, setup Apache web server, static IP, dan konfigurasi permission direktori web.',
      device: 'Ubuntu Server 22.04 LTS (Bare-Metal)',
      protocol: 'HTTP/HTTPS, SSH, SFTP, DNS bind9',
      testing: 'Curl HTTP 200 OK & web page loading < 100ms',
      notes: 'Implementasi SSH key authentication untuk keamanan ekstra, menonaktifkan login root direct dengan password.'
    }
  };

  const albumCards = document.querySelectorAll('.vinyl-album-card');
  albumCards.forEach(card => {
    card.addEventListener('click', () => {
      const pKey = card.getAttribute('data-project');
      const data = projectDetails[pKey];
      if (data && discoModalOverlay) {
        modalProjectTitle.textContent = data.title;
        modalProjectSynopsis.textContent = data.synopsis;
        modalSpecDevice.textContent = data.device;
        modalSpecProtocol.textContent = data.protocol;
        modalSpecTesting.textContent = data.testing;
        modalProjectNotes.textContent = data.notes;
        discoModalOverlay.classList.add('open');
      }
    });
  });

  if (modalCloseBtn && discoModalOverlay) {
    modalCloseBtn.addEventListener('click', () => discoModalOverlay.classList.remove('open'));
    discoModalOverlay.addEventListener('click', (e) => {
      if (e.target === discoModalOverlay) discoModalOverlay.classList.remove('open');
    });
  }

  // ─── 13. HACKER CONSOLE / TERMINAL EMULATOR ───
  const terminalTriggerBtn = document.getElementById('terminalTriggerBtn');
  const terminalModalOverlay = document.getElementById('terminalModalOverlay');
  const terminalCloseBtn = document.getElementById('terminalCloseBtn');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

  function openTerminal() {
    if (terminalModalOverlay) {
      terminalModalOverlay.classList.add('open');
      if (terminalInput) terminalInput.focus();
    }
  }

  function closeTerminal() {
    if (terminalModalOverlay) terminalModalOverlay.classList.remove('open');
  }

  if (terminalTriggerBtn) terminalTriggerBtn.addEventListener('click', openTerminal);
  if (terminalCloseBtn) terminalCloseBtn.addEventListener('click', closeTerminal);
  if (terminalModalOverlay) {
    terminalModalOverlay.addEventListener('click', (e) => {
      if (e.target === terminalModalOverlay) closeTerminal();
    });
  }

  function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    const line = document.createElement('p');
    line.innerHTML = `<span style="color: var(--teal-glow);">berlyn@tjkt-core:~$</span> ${cmd}`;
    terminalOutput.appendChild(line);

    const res = document.createElement('div');
    res.style.marginBottom = '12px';

    switch (cleanCmd) {
      case 'help':
        res.innerHTML = `
          <p style="color: var(--gold-neon);">Daftar perintah yang tersedia:</p>
          <p>• <strong>neofetch</strong>: Info sistem profil Berlyn</p>
          <p>• <strong>ping school</strong>: Tes koneksi ke SMKN 1 Giritontro</p>
          <p>• <strong>show-skills</strong>: Tampilkan daftar kompetensi TJKT</p>
          <p>• <strong>frank-ocean</strong>: Tampilkan kutipan favorit</p>
          <p>• <strong>contact</strong>: Tampilkan info kontak WhatsApp & Email</p>
          <p>• <strong>clear</strong>: Bersihkan layar terminal</p>
        `;
        break;

      case 'neofetch':
        res.innerHTML = `
          <pre style="color: var(--pink-neon); font-size: 0.75rem; line-height: 1.2;">
   /\\_/\\    OS: HeartOS 2.6 / TJKT Linux x86_64
  ( o.o )   Host: Berlyn Tiara Hapsari (SMKN 1 Giritontro)
   > ^ <    Uptime: 17 Years of Pure Curiosity
            Shell: bash 5.2-kawaii
            Focus: Network Infrastructure & Telecommunication
            Soundtrack: Frank Ocean — Blonde (2016)
          </pre>
        `;
        break;

      case 'ping -c 4 smkn1giritontro.sch.id':
      case 'ping school':
        res.innerHTML = `
          <p style="color: var(--silver-mist);">PING smkn1giritontro.sch.id (103.247.8.10) 56(84) bytes of data.</p>
          <p>64 bytes from 103.247.8.10: icmp_seq=1 ttl=58 time=12.4 ms</p>
          <p>64 bytes from 103.247.8.10: icmp_seq=2 ttl=58 time=11.8 ms</p>
          <p>64 bytes from 103.247.8.10: icmp_seq=3 ttl=58 time=12.1 ms</p>
          <p>64 bytes from 103.247.8.10: icmp_seq=4 ttl=58 time=11.9 ms</p>
          <p style="color: var(--teal-glow);">--- smkn1giritontro.sch.id ping statistics ---<br>4 packets transmitted, 4 received, 0% packet loss, rtt avg 12.05 ms</p>
        `;
        break;

      case 'show-skills':
        res.innerHTML = `
          <p style="color: var(--gold-neon);">[1] Crimping UTP/STP RJ-45 (TIA-568B)</p>
          <p style="color: var(--gold-neon);">[2] Cisco Packet Tracer & VLAN Routing</p>
          <p style="color: var(--gold-neon);">[3] MikroTik RouterOS Configuration</p>
          <p style="color: var(--gold-neon);">[4] Hardware PC Assembly & Diagnostics</p>
          <p style="color: var(--gold-neon);">[5] Linux Ubuntu Web Server Administration</p>
        `;
        break;

      case 'frank-ocean':
        res.innerHTML = `
          <p style="color: var(--pink-soft); font-style: italic;">"Round your city, round the clock. Everybody needs you..." — Nights</p>
        `;
        break;

      case 'contact':
        res.innerHTML = `
          <p>Email: <a href="mailto:berlyn.tiara@email.com" style="color: var(--cyan-cyber);">berlyn.tiara@email.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" style="color: var(--teal-glow);">+62 812-3456-7890</a></p>
        `;
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        return;

      default:
        res.innerHTML = `<p style="color: #ff5f56;">Perintah tidak dikenal: '${cmd}'. Ketik 'help' untuk petunjuk.</p>`;
    }

    terminalOutput.appendChild(res);
    const terminalBody = document.getElementById('terminalBody');
    if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && terminalInput.value.trim() !== '') {
        executeCommand(terminalInput.value);
        terminalInput.value = '';
      }
    });
  }

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  // ─── 14. QUICK MESSAGE FORM ───
  const quickMessageForm = document.getElementById('quickMessageForm');
  if (quickMessageForm) {
    quickMessageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const msg = document.getElementById('senderMessage').value;
      const text = encodeURIComponent(`Halo Berlyn! Saya ${name}.\n\n${msg}`);
      window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
      showToast('Membuka WhatsApp...');
      quickMessageForm.reset();
    });
  }

  // ─── 15. BACK TO TOP BUTTON ───
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── 16. TOAST NOTIFICATION UTILITY ───
  const toastBox = document.getElementById('toastBox');
  function showToast(msg) {
    if (!toastBox) return;
    toastBox.textContent = msg;
    toastBox.classList.add('show');
    setTimeout(() => {
      toastBox.classList.remove('show');
    }, 2800);
  }

  // Smooth scroll fallback for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});
