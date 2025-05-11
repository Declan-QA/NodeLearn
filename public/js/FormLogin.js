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
  const userdata = new FormData(form)
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
    let send_data=  []
    for (const value of userdata.values()) {
      send_data.push(value)
    }
    const res = await saveUser(send_data)
    if (res.success){
      console.log("Yes")
    }
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


async function saveUser(userdata) {
  const response = await fetch("/allowlogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userdata),
  });
  return await response.json();
}
