const collection = document.getElementsByClassName("error");
const form = document.getElementById("user-form");
const recipientemail = document.getElementById("recipient_email");
const projectname = document.getElementById("project_name");



projectname.addEventListener("click", () => {
  document.getElementById("errorname").remove()
  document.getElementById("errornamebr").remove()
});

recipientemail.addEventListener("click", () => {
  document.getElementById("erroremail").remove()
  document.getElementById("erroremailbr").remove()
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    recipient_email: recipientemail.value,
    project_name: projectname.value,
  };
  console.log(recipientemail.value)
  // Remove previous errors
 

  const result = await checkForm(data);
  const { valid } = result;

  if (!valid) {
    if (result.recipient_email) {
      recipientemail.insertAdjacentHTML("afterend", result.recipient_email);
    }
    if (result.project_name) {
      projectname.insertAdjacentHTML("afterend",result.project_name);
    }
  } else {
    console.log("Form is valid, proceed to submit.");
  }

  if (valid){
    success =await saveUser(data)
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
