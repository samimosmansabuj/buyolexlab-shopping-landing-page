const body = document.body;
body.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth * 10;
    const y = e.clientY / window.innerHeight * 10;
    body.style.background = `radial-gradient(circle at ${x*10}% ${y*10}%, #202632, #05060a)`;
});



const heroImg = document.getElementById("heroImg");
heroImg.addEventListener("mousemove", (e) => {
    const rect = heroImg.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X
    const y = e.clientY - rect.top;  // Mouse Y
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8; // max 8deg
    const rotateY = ((x - centerX) / centerX) * -8; // max -8deg
    heroImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});

heroImg.addEventListener("mouseleave", () => {
    heroImg.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
});


function moveBulletsDesktop() {
    const bulletBox = document.querySelector(".hero-bullet-cta-btn");
    const heroContent = document.querySelector(".hero-content");

    if (window.innerWidth >= 768) {
        // desktop — move inside hero-content
        if (!heroContent.contains(bulletBox)) {
            heroContent.appendChild(bulletBox);
        }
    } else {
        // mobile — move back after hero-top
        const hero = document.querySelector(".hero");
        const heroTop = document.querySelector(".hero-top");

        if (heroTop.nextElementSibling !== bulletBox) {
            hero.insertBefore(bulletBox, heroTop.nextElementSibling);
        }
    }
}
window.addEventListener("load", moveBulletsDesktop);
window.addEventListener("resize", moveBulletsDesktop);


// =================================== WHY BUYOLEX ===================================
document.addEventListener("DOMContentLoaded", () => {
    const motions = document.querySelectorAll(".motion-stagger");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        { threshold: 0.2 }
    );

    motions.forEach(el => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {
    const motions = document.querySelectorAll(".motion-scale");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        { threshold: 0.2 }
    );

    motions.forEach(el => observer.observe(el));
});



