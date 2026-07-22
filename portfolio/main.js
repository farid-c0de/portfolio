document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const themeToggle = document.querySelector(".theme-toggle");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".project-card");

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme || "light";
    setTheme(current === "dark" ? "light" : "dark");
  };

  const toggleNav = () => {
    document.body.classList.toggle("nav-open");
  };

  const closeNav = () => {
    document.body.classList.remove("nav-open");
  };

  const smoothScroll = (event) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeNav();
  };

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
      }
    }
    });
  };

  const filterProjects = (filter) => {
    projectCards.forEach((card) => {
      const categories = card.dataset.category ? card.dataset.category.split(",") : [];
      const show = filter === "all" || categories.includes(filter);
      card.style.display = show ? "block" : "none";
    });
  };

  const applyFilterButton = (button) => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterProjects(button.dataset.filter);
  };

  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilterButton(button));
  });

  window.addEventListener("scroll", updateActiveLink);

  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
  updateActiveLink();
  if (filterButtons.length) {
    const activeButton = document.querySelector("[data-filter].active") || filterButtons[0];
    applyFilterButton(activeButton);
  }
});