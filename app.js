// const message_ok = document.createElement('div');
const myForm = document.getElementById("formContact");
const MyfirstName = document.getElementById("input_firstName");

function ajout_element(message) {

    const element = document.createElement('div');
    element.setAttribute = 'ok_envoi';
    element.textContent = message;
    document.getElementById("formContact").append(element);
}



// if (document.hasFocus) { alert ("il a le focus")};


// myForm.addEventListener('focusin', alert ('coucou'));
// myForm.focus( ()=> {  alert ('coucou');} )

myForm.addEventListener('submit', (event) => {

    event.preventDefault();

    formData = new FormData(myForm);

    const userData = {};

    const nameRegex = /^[a-zA-Z ]+$/
    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

    const values = {};

    formData.forEach((data, key) => {
        Object.assign(values, { [key]: data });
    });

    // destructuration de l'objet formData
    const { firstName, lastName, email, phone, message } = values;

    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);
    // console.log(phone);
    // console.log(message);

    let error = false;

    //fonction permettant d'afficher en rouge et en gras les champs en erreur 

    function error_style(idElement) {
        document.getElementById(idElement).style.color = 'red';
        document.getElementById(idElement).style.fontWeight = 'bold';
    }

    //fonction annule l'affichage en rouge et en gras des champs en erreur 

    function error_style_remove(idElement) {
        document.getElementById(idElement).style.color = 'black';
        document.getElementById(idElement).style.fontWeight = 'normal';
    }

    // on commence avec un affichage des input en normal black
    error_style_remove("input_firstName");
    error_style_remove("input_lastName");
    error_style_remove("input_email");
    error_style_remove("input_phone");
    error_style_remove("yourmessage");


    // test des champs du formualaire

    if (!nameRegex.test(firstName)) {
        error = true;
        error_style("input_firstName"); //affiche le champs en erreur
    };
    if (!nameRegex.test(lastName)) {
        error = true;
        error_style("input_lastName"); //affiche le champs en erreur
    };
    if (!emailRegex.test(email)) {
        error = true;
        error_style("input_email"); //affiche le champs en erreur
    };

    if (!phoneRegex.test(phone)) {
        error = true;
        error_style("input_phone"); //affiche le champs en erreur
    };

    if (!nameRegex.test(message)) {
        error = true;
        error_style("yourmessage"); //affiche le champs en erreur
    };



    if (!error) {
        console.log(formData);


        /* It's sending the data to the server. */
        axios.post('http://212.83.176.255:3030/contact', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            message: message
        })
            // Récupération de la réponse en cas de succès.
            .then((response) => {
                console.log(response.data);
                document.getElementById("formContact").reset();
                ajout_element(response.data.message);

                // Récupération de l'error en cas d'erreur.
            }).catch((error) => {
                console.error(error);
            });
    }

});

myForm.addEventListener('click', () => {

    const element = document.getElementById("ok_envoi");

    if (typeof element != 'undefined') {
        element.style.display = "none";
    } else

    // if (element) {
    //     element.style.display = "none";
    // }
})