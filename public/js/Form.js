const form = document.getElementById("user-form");
const recipientemail = document.getElementById("recipient_email");
const projectname = document.getElementById("project_name");


const clearError = () => {
  const errorMessages = document.getElementsByClassName("error");
  if (errorMessages) {
    document.querySelectorAll(".error").forEach(el => el.remove());
  }
};

projectname.addEventListener("focus", () => {
  clearError();
});

recipientemail.addEventListener("focus", () => {
  clearError();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userdata = new FormData(form);

  const data = {
    recipient_email: recipientemail.value,
    project_name: projectname.value,
  };

  const result = await checkForm(data);
  const { valid } = result;

  clearError()

  if (!valid) {
    if (result.recipient_email) {
      recipientemail.insertAdjacentHTML("afterend", result.recipient_email);
    }
    if (result.project_name) {
      projectname.insertAdjacentHTML("afterend", result.project_name);
    }
  } else {
    let send_data = [];
    for (const value of userdata.values()) {
      send_data.push(value);
    }
    const res = await saveUser(send_data);
    if (res.success) {
      localStorage.setItem("email", userdata.get("email"));
      window.location.replace("/home");
    }
  }
});

async function checkForm(formdata) {
  const response = await fetch("/checkform", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formdata),
  });
  return await response.json();
}

async function saveUser(userdata) {
  const response = await fetch("/saveUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userdata),
  });
  return await response.json();
}

function login() {
  window.location.replace("/login");
}
