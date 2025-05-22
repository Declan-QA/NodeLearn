const form = document.getElementById("user-form");
const email = document.getElementById("email");
const password = document.getElementById("password")

const clearLocal = () =>{
  localStorage.clear()
}

const clearError = () => {
  const errorMessages = document.getElementsByClassName("error");
  if (errorMessages) {
    document.querySelectorAll(".error").forEach(el => el.remove());
  }
};


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();
  const data = [email.value,password.value];
  const result = await checkForm(data);

  if (result.valid){
    localStorage.setItem("email",email.value)
    window.location.replace("/home");
  } else {
    password.insertAdjacentHTML("afterend", `<div class="error">${result.reason}</div>`);
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



