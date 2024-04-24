function solicitarNumero(mensaje) {
    return parseFloat(prompt(mensaje));
}

function operar(num1, num2, operador) {
    switch (operador) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return 'Error: división por cero';
            }
        default:
            return 'Operador no válido';
    }
}

function guardarHistorial(historial) {
    localStorage.setItem('historial', JSON.stringify(historial));
}

function cargarHistorial() {
    var historial = JSON.parse(localStorage.getItem('historial'));
    if (historial === null) {
        historial = [];
    }
    return historial;
}

function actualizarHistorial(historial) {
    var historialHTML = "<h2>Historial de Operaciones</h2>";
    historial.forEach(function (operacion) {
        historialHTML += "<p>" + operacion.join(' ') + "</p>";
    });
    document.getElementById('historial').innerHTML = historialHTML;
}

function realizarOperacion() {
    var num1 = parseFloat(document.getElementById('num1').value);
    var operador = document.getElementById('operador').value;
    var num2 = parseFloat(document.getElementById('num2').value);
    var resultado;

    switch (operador) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                resultado = num1 / num2;
            } else {
                resultado = 'Error: división por cero';
            }
            break;
        default:
            resultado = 'Operador no válido';
    }

    document.getElementById('resultado').innerText = "Resultado: " + resultado;

    var historial = cargarHistorial();
    historial.push([num1, operador, num2, '=', resultado]);
    guardarHistorial(historial);
    actualizarHistorial(historial);
}

window.onload = function () {
    var historial = cargarHistorial();
    actualizarHistorial(historial);
};