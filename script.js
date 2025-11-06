document.addEventListener("DOMContentLoaded", () => {
  const btnMobile = document.getElementById("btn-mobile");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  // 1. LÓGICA DE ABERTURA DO BOTÃO HAMBÚRGUER
  btnMobile.addEventListener("click", (e) => {
    e.stopPropagation(); // Impede que o clique no botão feche o menu imediatamente
    mobileMenu.classList.toggle("open");
  });

  // 2. LÓGICA DE FECHAMENTO AO CLICAR EM UM LINK INTERNO
  mobileLinks.forEach((link) =>
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    })
  );

  // 3. LÓGICA DE FECHAMENTO AO CLICAR FORA DO MENU
  document.addEventListener("click", (e) => {
    // Verifica se o menu está aberto E se o clique não foi:
    // a) Dentro do próprio menu
    // b) No botão que abre/fecha o menu
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickOnButton = btnMobile.contains(e.target);

    if (
      mobileMenu.classList.contains("open") &&
      !isClickInsideMenu &&
      !isClickOnButton
    ) {
      mobileMenu.classList.remove("open");
    }
  });

  // Animação dos números
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = +counter.dataset.count;
    const duration = 1250;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1); // entre 0 e 1
      const value = Math.floor(progress * target);

      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(animate);
  });

  // Barras de skills
  const skillBars = document.querySelectorAll(".skill-bar-progress");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.dataset.level;
          entry.target.style.width = level + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
});

const mapToggleLink = document.getElementById("map-toggle-link");
const mapContainer = document.getElementById("map-container");
const header = document.getElementById("site-header");

// Novos seletores para o toggle do botão
const mapIcon = document.querySelector("#map-toggle-link #map-icon");
const mapText = document.querySelector("#map-toggle-link #map-text");
const contactSection = document.getElementById("contato");

// Verifica se todos os elementos existem
if (
  mapToggleLink &&
  mapContainer &&
  header &&
  mapIcon &&
  mapText &&
  contactSection
) {
  mapToggleLink.addEventListener("click", (e) => {
    e.preventDefault();

    const isVisible = mapContainer.classList.toggle("visible");

    if (isVisible) {
      // MODO: MAPA ABERTO
      mapText.textContent = "Ocultar Mapa";
      mapIcon.innerHTML = '<i class="fas fa-times"></i>'; // Altera o ícone para "X" (Fechar)

      // --- CÁLCULO DE SCROLL PARA ABERTURA ---
      const headerHeight = header.offsetHeight;
      const offsetMargin = 20; // 30px de margem abaixo do header fixo

      // Espera a transição (0.2s) e rola
      setTimeout(() => {
        // 1. Calcula a posição do TOPO DO BOTÃO (mapToggleLink)
        const linkTopPosition =
          mapToggleLink.getBoundingClientRect().top + window.scrollY;

        // 2. Posição final: Posição do Link - Altura do header - Margem extra
        const adjustedPosition = linkTopPosition - headerHeight - offsetMargin;

        window.scrollTo({
          top: adjustedPosition,
          behavior: "smooth",
        });
      }, 200);
    } else {
      // MODO: MAPA FECHADO
      mapText.textContent = "Ver Localização";
      mapIcon.innerHTML = '<i class="fas fa-map-marker-alt"></i>'; // Volta para o ícone de mapa

      // Rola para o topo da seção de Contato
      const headerHeight = header.offsetHeight;
      const targetTop =
        contactSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  });
}
