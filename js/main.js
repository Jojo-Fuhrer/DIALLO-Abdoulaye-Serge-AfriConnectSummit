/* ==========================================================================
   AFRICONNECT SUMMIT — LOGIQUE JAVASCRIPT (vanilla, aucune dépendance)
   Sommaire :
   1. Thème clair/sombre (localStorage)
   2. Navbar dynamique + menu hamburger
   3. Révélation des sections au scroll (IntersectionObserver)
   4. Compte à rebours vers la conférence
   5. Compteurs animés des chiffres clés
   6. Onglets du programme (Jour 1/2/3)
   7. Filtrage dynamique des intervenants
   8. Validation du formulaire d'inscription
   9. Bouton retour en haut
   10. Année dynamique du pied de page
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initRevelations();
  initCompteRebours();
  initCompteurs();
  initOngletsProgramme();
  initFiltreIntervenants();
  initFormulaireContact();
  initBoutonHaut();
  initAnneeFooter();
});

/* --------------------------------------------------------------------------
   1. THÈME CLAIR / SOMBRE — persistant via localStorage, partagé entre pages
   -------------------------------------------------------------------------- */
function initTheme() {
  const bouton = document.querySelector(".bascule-theme");
  const themeEnregistre = localStorage.getItem("acs-theme");

  // Si l'utilisateur n'a jamais choisi, on respecte sa préférence système
  const preferenceSysteme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const themeInitial = themeEnregistre || preferenceSysteme;
  document.documentElement.setAttribute("data-theme", themeInitial);

  if (!bouton) return;

  bouton.addEventListener("click", () => {
    const themeActuel = document.documentElement.getAttribute("data-theme");
    const nouveauTheme = themeActuel === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nouveauTheme);
    localStorage.setItem("acs-theme", nouveauTheme);
  });
}

/* --------------------------------------------------------------------------
   2. NAVBAR DYNAMIQUE + MENU HAMBURGER MOBILE
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector(".barre-nav");
  const hamburger = document.querySelector(".bouton-hamburger");
  const liens = document.querySelector(".liens-nav");

  if (navbar) {
    window.addEventListener("scroll", () => {
      // Fond + ombre apparaissent après 80px de défilement
      navbar.classList.toggle("au-scroll", window.scrollY > 80);
    });
  }

  if (hamburger && liens) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("ouvert");
      liens.classList.toggle("ouvert");
    });

    // Ferme le menu quand on choisit un lien (confort mobile)
    liens.querySelectorAll("a").forEach((lien) => {
      lien.addEventListener("click", () => {
        hamburger.classList.remove("ouvert");
        liens.classList.remove("ouvert");
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. RÉVÉLATION DES SECTIONS AU SCROLL (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initRevelations() {
  const elements = document.querySelectorAll(".reveler");
  if (!elements.length) return;

  const observateur = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          entree.target.classList.add("visible");
          observateur.unobserve(entree.target); // on n'anime qu'une fois
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observateur.observe(el));
}

/* --------------------------------------------------------------------------
   4. COMPTE À REBOURS VERS LA CONFÉRENCE
      Date fictive : 12 mars 2027, Diamniadio (Sénégal)
   -------------------------------------------------------------------------- */
function initCompteRebours() {
  const conteneur = document.querySelector("[data-compte-rebours]");
  if (!conteneur) return;

  const dateCible = new Date("2027-03-12T09:00:00");

  const jours = conteneur.querySelector("[data-jours]");
  const heures = conteneur.querySelector("[data-heures]");
  const minutes = conteneur.querySelector("[data-minutes]");
  const secondes = conteneur.querySelector("[data-secondes]");

  function mettreAJour() {
    const maintenant = new Date();
    let ecart = dateCible - maintenant;

    if (ecart < 0) ecart = 0;

    const j = Math.floor(ecart / (1000 * 60 * 60 * 24));
    const h = Math.floor((ecart / (1000 * 60 * 60)) % 24);
    const m = Math.floor((ecart / (1000 * 60)) % 60);
    const s = Math.floor((ecart / 1000) % 60);

    jours.textContent = String(j).padStart(2, "0");
    heures.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    secondes.textContent = String(s).padStart(2, "0");
  }

  mettreAJour();
  setInterval(mettreAJour, 1000);
}

/* --------------------------------------------------------------------------
   5. COMPTEURS ANIMÉS DES CHIFFRES CLÉS (déclenchés au scroll)
   -------------------------------------------------------------------------- */
function initCompteurs() {
  const compteurs = document.querySelectorAll("[data-compteur]");
  if (!compteurs.length) return;

  const observateur = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((entree) => {
        if (!entree.isIntersecting) return;

        const element = entree.target;
        const cible = parseInt(element.dataset.compteur, 10);
        const duree = 1600; // ms
        const debut = performance.now();

        function animer(instant) {
          const progres = Math.min((instant - debut) / duree, 1);
          const valeur = Math.floor(progres * cible);
          element.textContent = valeur.toLocaleString("fr-FR");

          if (progres < 1) {
            requestAnimationFrame(animer);
          } else {
            element.textContent = cible.toLocaleString("fr-FR") + (element.dataset.suffixe || "");
          }
        }

        requestAnimationFrame(animer);
        observateur.unobserve(element);
      });
    },
    { threshold: 0.4 }
  );

  compteurs.forEach((c) => observateur.observe(c));
}

/* --------------------------------------------------------------------------
   6. ONGLETS DU PROGRAMME (Jour 1 / Jour 2 / Jour 3)
   -------------------------------------------------------------------------- */
function initOngletsProgramme() {
  const onglets = document.querySelectorAll(".onglet");
  const panneaux = document.querySelectorAll(".panneau-jour");
  if (!onglets.length) return;

  onglets.forEach((onglet) => {
    onglet.addEventListener("click", () => {
      const cible = onglet.dataset.jour;

      onglets.forEach((o) => o.classList.remove("actif"));
      onglet.classList.add("actif");

      panneaux.forEach((panneau) => {
        panneau.classList.toggle("actif", panneau.dataset.jour === cible);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. FILTRAGE DYNAMIQUE DES INTERVENANTS PAR THÉMATIQUE
   -------------------------------------------------------------------------- */
function initFiltreIntervenants() {
  const filtres = document.querySelectorAll(".filtre");
  const cartes = document.querySelectorAll("[data-thematique]");
  if (!filtres.length) return;

  filtres.forEach((filtre) => {
    filtre.addEventListener("click", () => {
      const choix = filtre.dataset.filtre;

      filtres.forEach((f) => f.classList.remove("actif"));
      filtre.classList.add("actif");

      cartes.forEach((carte) => {
        const correspond = choix === "tous" || carte.dataset.thematique === choix;
        carte.classList.toggle("masquee", !correspond);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. VALIDATION DU FORMULAIRE D'INSCRIPTION
   -------------------------------------------------------------------------- */
function initFormulaireContact() {
  const formulaire = document.querySelector("#formulaire-inscription");
  if (!formulaire) return;

  const messageSucces = document.querySelector("#message-succes");
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const regles = {
    nom: (valeur) => valeur.trim().length >= 3,
    email: (valeur) => regexEmail.test(valeur.trim()),
    telephone: (valeur) => valeur.replace(/\D/g, "").length >= 8,
    participation: (valeur) => valeur !== "",
    pays: (valeur) => valeur !== "",
    message: (valeur) => valeur.trim().length >= 20,
  };

  const messagesErreur = {
    nom: "Merci d'indiquer votre nom complet (3 caractères minimum).",
    email: "Adresse e-mail invalide.",
    telephone: "Le numéro doit contenir au moins 8 chiffres.",
    participation: "Merci de choisir un type de participation.",
    pays: "Merci de sélectionner votre pays.",
    message: "Votre message doit contenir au moins 20 caractères.",
  };

  function validerChamp(champ) {
    const nom = champ.name;
    const groupe = champ.closest(".groupe-champ");
    if (!regles[nom] || !groupe) return true;

    const estValide = regles[nom](champ.value);
    groupe.classList.toggle("erreur", !estValide);
    groupe.classList.toggle("valide", estValide);

    const zoneMessage = groupe.querySelector(".message-erreur");
    if (zoneMessage) zoneMessage.textContent = messagesErreur[nom];

    return estValide;
  }

  // Validation en direct, champ par champ
  Object.keys(regles).forEach((nomChamp) => {
    const champ = formulaire.querySelector(`[name="${nomChamp}"]`);
    if (champ) {
      champ.addEventListener("blur", () => validerChamp(champ));
      champ.addEventListener("input", () => {
        if (champ.closest(".groupe-champ").classList.contains("erreur")) {
          validerChamp(champ);
        }
      });
    }
  });

  formulaire.addEventListener("submit", (evenement) => {
    evenement.preventDefault();

    let formulaireValide = true;
    Object.keys(regles).forEach((nomChamp) => {
      const champ = formulaire.querySelector(`[name="${nomChamp}"]`);
      if (champ && !validerChamp(champ)) {
        formulaireValide = false;
      }
    });

    if (!formulaireValide) {
      messageSucces?.classList.remove("visible");
      return;
    }

    // Simulation d'envoi réussi
    messageSucces?.classList.add("visible");
    formulaire.reset();
    formulaire.querySelectorAll(".groupe-champ").forEach((groupe) => {
      groupe.classList.remove("valide", "erreur");
    });

    setTimeout(() => messageSucces?.classList.remove("visible"), 6000);
  });
}

/* --------------------------------------------------------------------------
   9. BOUTON RETOUR EN HAUT
   -------------------------------------------------------------------------- */
function initBoutonHaut() {
  const bouton = document.querySelector(".bouton-haut");
  if (!bouton) return;

  window.addEventListener("scroll", () => {
    bouton.classList.toggle("visible", window.scrollY > 300);
  });

  bouton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   10. ANNÉE DYNAMIQUE DANS LE PIED DE PAGE
   -------------------------------------------------------------------------- */
function initAnneeFooter() {
  document.querySelectorAll("[data-annee]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}
