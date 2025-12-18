// Contact form alert
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Thanks for reaching out! I'll get back to you soon.");
  this.reset();
});

// ----- Role Animation -----
const roles = [
  {
    top: { text: "A Full Stack", class: "white-text" },
    bottom: { text: "Developer", class: "blue-text" }
  },
  {
    top: { text: "A WEB", class: "white-text" },
    bottom: { text: "Designer", class: "blue-text" }
  }
];

let currentIndex = 0;
const roleTop = document.getElementById("role-top");
const roleBottom = document.getElementById("role-bottom");

function typeText(topText, bottomText, callback) {
  let i = 0;
  roleTop.textContent = "";
  roleBottom.textContent = "";

  const interval = setInterval(() => {
    roleTop.textContent += topText[i] || "";
    roleBottom.textContent += bottomText[i] || "";
    i++;

    if (i >= Math.max(topText.length, bottomText.length)) {
      clearInterval(interval);
      setTimeout(callback, 3000);
    }
  }, 100);
}

function deleteText(callback) {
  let topText = roleTop.textContent;
  let bottomText = roleBottom.textContent;
  let i = Math.max(topText.length, bottomText.length);

  const interval = setInterval(() => {
    roleTop.textContent = topText.slice(0, i - 1);
    roleBottom.textContent = bottomText.slice(0, i - 1);
    i--;

    if (i <= 0) {
      clearInterval(interval);
      callback();
    }
  }, 50);
}

function playRoleAnimation() {
  const role = roles[currentIndex];

  roleTop.className = role.top.class;
  roleBottom.className = role.bottom.class;

  typeText(role.top.text, role.bottom.text, () => {
    deleteText(() => {
      currentIndex = (currentIndex + 1) % roles.length;
      playRoleAnimation(); // 🔁 loop aman
    });
  });
}
// start animation
playRoleAnimation();


// ----- Entry Animation -----
const sections = document.querySelectorAll('.about, .project, .contact');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));


// ----- Email Function -----
function sendMail(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const mailtoLink =
    `mailto:alvin.thoriq@binus.ac.id` +
    `?subject=${encodeURIComponent("Message from " + name)}` +
    `&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

  window.location.href = mailtoLink;
}

