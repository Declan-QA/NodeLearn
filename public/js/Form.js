const form = document.getElementById("user-form");
const recipientemail = document.getElementById("recipient_email");
const projectname = document.getElementById("project_name");


const clearnameerror = () => {
  document.getElementById("errorname").remove()
  document.getElementById("errornamebr").remove()
}
const clearemailerror = () => {
  document.getElementById("erroremail").remove()
  document.getElementById("erroremailbr").remove()
}

projectname.addEventListener("focus", () => {
  clearnameerror()
});

recipientemail.addEventListener("focus", () => {
  clearemailerror()
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userdata = new FormData(form)
  
  const data = {
    recipient_email: recipientemail.value,
    project_name: projectname.value,
  };
 
  const result = await checkForm(data);
  const { valid } = result;

  if (document.getElementById("errorname")){
    clearnameerror()
  }

  if (document.getElementById("erroremail")){
    clearemailerror()
  }

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
      if (value != data.recipient_email && value != data.project_name){
          send_data.push(value)
      }
    }
    const res = await saveUser(send_data)
    if (res.success){
      console.log("Yes")
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
