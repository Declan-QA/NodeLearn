document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user-form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        recipient_email: form.recipient_email.value,
        project_name: form.project_name.value,
      };
  
      const result = await checkForm(data)
      
    });
  });
  

async function checkForm(formdata){
    const response = await  fetch("/checkform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    })
    return await response.json()

  }