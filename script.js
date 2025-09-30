// Contact form alert
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Thanks for reaching out! I'll get back to you soon.");
  this.reset();
});

const topRoles = [
  { text: "A Full Stack", color: "white-text" },
  { text: "A WEB", color: "white-text" }
];

const bottomRoles = [
  { text: "Developer", color: "blue-text" },
  { text: "Designer", color: "blue-text" }
];

let index = 0;
const roleTop = document.getElementById("role-top");
const roleBottom = document.getElementById("role-bottom");

function typeTextSync(textTop, classTop, textBottom, classBottom, callback) {
  let i = 0;
  roleTop.className = classTop;
  roleBottom.className = classBottom;
  roleTop.textContent = "";
  roleBottom.textContent = "";

  let interval = setInterval(() => {
    roleTop.textContent += textTop[i] || "";
    roleBottom.textContent += textBottom[i] || "";
    i++;
    if (i >= Math.max(textTop.length, textBottom.length)) {
      clearInterval(interval);
      if (callback) {
        setTimeout(callback, 1500); // delay 1.5 detik sebelum hapus
      }
    }
  }, 100);
}

function deleteTextSync(callback) {
  let textTop = roleTop.textContent;
  let textBottom = roleBottom.textContent;
  let i = Math.max(textTop.length, textBottom.length);

  let interval = setInterval(() => {
    roleTop.textContent = textTop.substring(0, i - 1);
    roleBottom.textContent = textBottom.substring(0, i - 1);
    i--;
    if (i <= 0) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 50);
}

function changeRoles() {
  deleteTextSync(() => {
    index = (index + 1) % topRoles.length;
    typeTextSync(
      topRoles[index].text,
      topRoles[index].color,
      bottomRoles[index].text,
      bottomRoles[index].color
    );
  });
}

// pertama kali load
typeTextSync(
  topRoles[0].text,
  topRoles[0].color,
  bottomRoles[0].text,
  bottomRoles[0].color
);

// interval otomatis jalan
setInterval(changeRoles, 5000);

// Pilih semua section yang punya h2
const sections = document.querySelectorAll('.about, .project, .contact');

const observerOptions = {
  threshold: 0.3  // section terlihat 30%
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
    }
  });
}, observerOptions);

// Apply observer ke setiap section
sections.forEach(section => observer.observe(section));
