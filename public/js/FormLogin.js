const form = document.getElementById("user-form");
const email = document.getElementById("email");
const password = document.getElementById("password")

const clearerrors = () => {
  document.getElementById("errorlogin").remove()
  document.getElementById("errorloginbr").remove()
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
  
  // const { valid } = result;

  // if (!valid) {
  //   if (result.recipient_email) {
  //     recipientemail.insertAdjacentHTML("afterend", result.recipient_email);
  //   }
  //   if (result.project_name) {
  //     projectname.insertAdjacentHTML("afterend",result.project_name);
  //   }
  // } else {
  //   let send_data=  []
  //   for (const value of userdata.values()) {
  //     send_data.push(value)
  //   }
  //   const res = await saveUser(send_data)
  //   if (res.success){
  //     console.log("Yes")
  //   }
  // }


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
