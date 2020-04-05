const input = document.querySelector("#name");
const form = document.querySelector(".new-form");
const loading = document.querySelector(".loading");
loading.style.display = "none";
const link = "http://localhost:5000/tweets";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const tweet = {
    name,
    content,
  };

  fetch(link, {
    methos: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tweet),
  });
  loading.style.display = "block";
  form.style.display = "none";
});
