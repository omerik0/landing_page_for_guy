// שנה בפוטר
document.getElementById("year").textContent = new Date().getFullYear();

// גלילה לטופס
const cta = document.getElementById("main-cta");
cta?.addEventListener("click", () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
});

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("active");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// שליחת טופס ל-Netlify
const form = document.getElementById("trainerForm");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = document.getElementById("submit-btn");
  const success = document.getElementById("success-msg");
  const error = document.getElementById("error-msg");

  success.style.display = "none";
  error.style.display = "none";

  btn.textContent = "שולח...";
  btn.disabled = true;

  // ניקוי טלפון לתווים מספריים בלבד
  const phone = document.getElementById("userPhone");
  if (phone) phone.value = phone.value.replace(/[^\d]/g, "");

  const data = new FormData(form);

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    });

    if (!res.ok) throw new Error("Bad response");

    form.reset();
    success.style.display = "block";
  } catch {
    error.style.display = "block";
  } finally {
    btn.textContent = "שלח";
    btn.disabled = false;
  }
});