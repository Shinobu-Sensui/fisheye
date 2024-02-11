export const openCloseFormContact = () => {
    const contactBtn = document.querySelector(".btn_cta");
    const contactModal = document.querySelector(".modal_wrapper");
    const closeModal = document.querySelector(".btn_close");
    contactBtn.addEventListener("click", () => {
        contactModal.style.display = "flex";
        // On gère le focus sur la croix et on ferme lorsque l'on appuie sur espace
        closeModal.focus();
    });
    closeModal.addEventListener("click", () => contactModal.style.display = "none");
};

export const validateForm = () => {
    const form = document.querySelector('.modal_form form');
    const firstName = document.querySelector("#firstname");
    const lastName = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    form.addEventListener('input', () => displayCustomMessage());

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!form.checkValidity()) displayCustomMessage();
        else {
            const formDatas = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                message: message.value,
            };
            console.log(JSON.stringify(formDatas));
            document.querySelectorAll('.formField').forEach(input => input.classList.remove('valid'));
            form.reset();
        };
    });

    const checkInputValidity = (input, regex) => {
        const errorMessage = input.dataset.error;
        const messageProvider = input.nextElementSibling;
        const isValid = regex.test(input.value);

        if(isValid) {
            messageProvider.innerHTML = "";
            messageProvider.removeAttribute("role");
            input.removeAttribute("aria-invalid");
        } else {
            messageProvider.innerHTML = errorMessage;
            messageProvider.setAttribute("role", "alert")
            input.setAttribute("aria-invalid", "true");
        }

        input.classList.toggle('invalid', !isValid);
        input.classList.toggle('valid', isValid);
    };

    const displayCustomMessage = () => {
        const regexName = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexMessage = /^[A-Za-z0-9|\s]{20,200}$/;

        checkInputValidity(firstName, regexName);
        checkInputValidity(lastName, regexName);
        checkInputValidity(email, regexEmail);
        checkInputValidity(message, regexMessage);
    };
};