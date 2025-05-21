const form = document.getElementById("user-form");
const email = document.getElementById("email");
const password = document.getElementById("password")

const clearerrors = () => {
if (document.getElementById("errorlogin")) {
    document.getElementById("errorlogin").remove()
    document.getElementById("errorloginbr").remove()
}
}

email.addEventListener("focus", () => {
  clearerrors()
});

password.addEventListener("focus", () => {
  clearerrors()
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = [email.value,password.value];
  const result = await checkForm(data);
  if (result.valid){
    localStorage.setItem("email",email.value)
    window.location.replace("/home");
  } else {
    password.insertAdjacentHTML("afterend", `<br class="errorloginbr"><p class="errorlogin">${result.reason}</p>`);
  }
});

async function checkForm(formdata) {
  const response = await fetch("/checkformlogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formdata),
  });
  return await response.json();
}



