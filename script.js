// Generar contraseña
function generarContrasena() {
    // Definición de los caracteres posibles para la contraseña
    const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Mayúsculas
    const minus = "abcdefghijklmnopqrstuvwxyz"; // Minúsculas
    const nums = "0123456789"; // Números
    const sims = "!@#$%^&*()_+-={}[]:;\"'<>,.?/\\"; // Caracteres especiales

    let caracteres = ""; // Variable donde se almacenarán los caracteres seleccionados para la contraseña

    // Comprobamos qué tipos de caracteres ha seleccionado el usuario y los añadimos a la variable 'caracteres'
    if (document.getElementById("ABC").checked) caracteres += mayus;
    if (document.getElementById("abc").checked) caracteres += minus;
    if (document.getElementById("123").checked) caracteres += nums;
    if (document.getElementById("#$&").checked) caracteres += sims;

    // Obtenemos la longitud de la contraseña desde el input
    const length = parseInt(document.getElementById("length").value);

    let resultado = ""; // Variable para almacenar la contraseña generada

    // Si no se han seleccionado tipos de caracteres, mostramos un mensaje de error
    if (caracteres.length === 0) {
        resultado = "Seleccione un tipo de caracter";
    } else {
        // Generamos la contraseña aleatoriamente seleccionando caracteres de la cadena 'caracteres'
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length); // Índice aleatorio
            resultado += caracteres[randomIndex]; // Añadimos el carácter seleccionado al resultado
        }
    }

    // Mostramos el resultado en el campo de texto
    document.getElementById("resultado").value = resultado;
}

// Funcionamiento del input range (deslizador)
const rangeInput = document.getElementById("length"); // Input para la longitud de la contraseña
const longitudValor = document.getElementById("longitud-valor"); // Elemento que muestra la longitud seleccionada
const btnMenos = document.querySelector(".btn-menos"); // Botón para disminuir la longitud
const btnMas = document.querySelector(".btn-mas"); // Botón para aumentar la longitud

// Añadimos un event listener al input para que cuando se cambie el valor, se actualice la longitud y se genere una nueva contraseña
rangeInput.addEventListener("input", () => {
    const longitud = parseInt(rangeInput.value); // Obtenemos el valor actual del input
    longitudValor.textContent = longitud; // Actualizamos el texto que muestra la longitud seleccionada
    generarContrasena(); // Generamos la contraseña con la nueva longitud
    evaluarSeguridad(longitud); // Evaluamos la seguridad de la contraseña según la longitud
});

// Llamamos a la función de generar contraseña al cargar el documento
document.addEventListener("DOMContentLoaded", generarContrasena);

// Funcionamiento de los botones de más y menos para cambiar la longitud
btnMenos.addEventListener("click", () => {
    let valor = parseInt(rangeInput.value); // Obtenemos el valor actual del input
    if (valor > parseInt(rangeInput.min)) { // Aseguramos que no se pueda disminuir más allá del mínimo
        rangeInput.value = valor - 1; // Disminuimos el valor
        longitudValor.textContent = rangeInput.value; // Actualizamos el texto que muestra la longitud seleccionada
        generarContrasena(); // Generamos la nueva contraseña
        evaluarSeguridad(rangeInput.value); // Evaluamos la seguridad de la nueva contraseña
    }
});

btnMas.addEventListener("click", () => {
    let valor = parseInt(rangeInput.value); // Obtenemos el valor actual del input
    if (valor < parseInt(rangeInput.max)) { // Aseguramos que no se pueda aumentar más allá del máximo
        rangeInput.value = valor + 1; // Aumentamos el valor
        longitudValor.textContent = rangeInput.value; // Actualizamos el texto que muestra la longitud seleccionada
        generarContrasena(); // Generamos la nueva contraseña
        evaluarSeguridad(rangeInput.value); // Evaluamos la seguridad de la nueva contraseña
    }
});

// Botón de copiar la contraseña al portapapeles
const btnCopiar = document.getElementById("btn-copiar");
const inputResultado = document.getElementById("resultado");

btnCopiar.addEventListener("click", () => {
    const contraseña = inputResultado.value; // Obtenemos el valor de la contraseña generada

    // Si no hay contraseña, mostramos un mensaje de alerta
    if (!contraseña) {
        alert("No hay ninguna contraseña para copiar.");
        return;
    }

    // Intentamos copiar la contraseña al portapapeles
    navigator.clipboard.writeText(contraseña)
        .then(() => {
            btnCopiar.textContent = "¡Copiado!"; // Cambiamos el texto del botón a '¡Copiado!'
            setTimeout(() => {
                btnCopiar.textContent = "Copiar"; // Volvemos a mostrar 'Copiar' después de 1.5 segundos
            }, 1500);
        })
        .catch(() => {
            alert("No se pudo copiar la contraseña."); // En caso de error, mostramos un mensaje de alerta
        });
});

// Botón de refrescar para generar una nueva contraseña
const btnRefresh = document.getElementById("btn-refresh");
let rotation = 0; // Variable para controlar la rotación del botón

btnRefresh.addEventListener("click", () => {
    generarContrasena();  // Llamamos a la función para generar una nueva contraseña
    rotation += 360;  // Aumentamos el ángulo de rotación
    btnRefresh.style.transform = `rotate(${rotation}deg)`;  // Aplicamos el giro acumulado al botón
});

// Función para evaluar la seguridad de la contraseña según su longitud
function evaluarSeguridad(longitud) {
    const seguridadValor = document.getElementById("seguridad-valor");

    // Dependiendo de la longitud, cambiamos el texto y color de fondo para indicar el nivel de seguridad
    if (longitud < 5) {
        seguridadValor.textContent = "Muy Débil";
        seguridadValor.style.backgroundColor = "#b10202"; // Color rojo
    } else if (longitud >= 5 && longitud <= 9) {
        seguridadValor.textContent = "Débil";
        seguridadValor.style.backgroundColor = "rgb(219, 192, 158)"; // Color amarillo
    } else if (longitud >= 9 && longitud <= 15) {
        seguridadValor.textContent = "Normal";
        seguridadValor.style.backgroundColor = "#028baa"; // Color azul
    } else if (longitud >= 16 && longitud <= 25) {
        seguridadValor.textContent = "Segura";
        seguridadValor.style.backgroundColor = "green"; // Color verde
    } else {
        seguridadValor.textContent = "Muy Segura";
        seguridadValor.style.backgroundColor = "#15d100"; // Color verde más intenso
    }
}

// Variable global para almacenar la contraseña completa
let contraseñaCompleta = "";

// Función para limitar el texto con puntos suspensivos si excede una longitud máxima
function limitarTexto(texto, maxLength) {
    if (texto.length > maxLength) {
        return texto.substring(0, maxLength) + "..."; // Recorta el texto y añade "..."
    }
    return texto;
}

// Llamamos a la función para generar la contraseña
function generarContrasena() {
    const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minus = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const sims = "!@#$%^&*()_+-={}[]:;\"'<>,.?/\\";

    let caracteres = ""; // Variable para almacenar los caracteres seleccionados

    if (document.getElementById("ABC").checked) caracteres += mayus;
    if (document.getElementById("abc").checked) caracteres += minus;
    if (document.getElementById("123").checked) caracteres += nums;
    if (document.getElementById("#$&").checked) caracteres += sims;

    const length = parseInt(document.getElementById("length").value);

    let resultado = "";

    if (caracteres.length === 0) {
        resultado = "Seleccione un tipo de caracter";
    } else {
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            resultado += caracteres[randomIndex];
        }
    }

    // Guardamos la contraseña completa
    contraseñaCompleta = resultado;

    // Limitar el texto para mostrar solo los primeros 20 caracteres en el campo de texto
    document.getElementById("resultado").value = limitarTexto(resultado, 20);
}

// Función para copiar la contraseña
btnCopiar.addEventListener("click", () => {
    if (!contraseñaCompleta) {
        alert("No hay ninguna contraseña para copiar.");
        return;
    }

    navigator.clipboard.writeText(contraseñaCompleta)
        .then(() => {
            btnCopiar.textContent = "¡Copiado!";
            setTimeout(() => {
                btnCopiar.textContent = "Copiar";
            }, 1500);
        })
        .catch(() => {
            alert("No se pudo copiar la contraseña.");
        });
});
