document.addEventListener("DOMContentLoaded", () => {
    const changePasswordForm = document.getElementById("changePasswordForm");
    const formMessage = document.getElementById("formMessage");

    // Obtenemos el email que nos pasó request_code.js por la URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    changePasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const token = document.getElementById("token").value;
        const newPassword = document.getElementById("new_password").value;

        formMessage.textContent = "Cambiando contraseña...";
        formMessage.style.color = "blue";

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/change-password/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    token: token,
                    new_password: newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                formMessage.textContent = data.message;
                formMessage.style.color = "green";
                setTimeout(() => {
                    window.location.href = "index.html"; // Redirigir al login
                }, 2000);
            } else {
                formMessage.textContent = data.error || "Hubo un error al cambiar la contraseña.";
                formMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error);
            formMessage.textContent = "Error de red. Asegúrate de que el servidor esté corriendo.";
            formMessage.style.color = "red";
        }
    });
});
