// 1. גלילה חלקה
document.getElementById('main-cta').addEventListener('click', function() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// 2. אנימציות חשיפה בגלילה
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// 3. טיפול בטופס
document.getElementById('trainerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.innerText = "שולח...";
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('trainerForm').style.display = 'none';
        document.getElementById('success-msg').style.display = 'block';
    }, 1500);
});