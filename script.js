let myChart;

function calcularEdad() {
    const animal = document.getElementById("animal").value;
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const tamano = document.getElementById("tamano").value;

    let edadHumana = 0;
    let peso = 0;

    animal === "perro" ? (
        edad === 1 ? edadHumana = 15 :
            edad === 2 ? edadHumana = 24 :
                edadHumana = 24 + (edad - 2) * 4,
        peso = tamano === "pequeno" ? (edad <= 12 ? edad * 2 : 24 + (edad - 12) * 1) :
            tamano === "mediano" ? (edad <= 12 ? edad * 2.5 : 30 + (edad - 12) * 1.5) :
                edad <= 12 ? edad * 4 : 54 + (edad - 12) * 2
    ) : animal === "gato" ? (
        edad === 1 ? edadHumana = 15 :
            edad === 2 ? edadHumana = 24 :
                edadHumana = 24 + (edad - 2) * 4,
        peso = tamano === "pequeno" ? 2.5 * edad + 1.5 :
            tamano === "mediano" ? 3.5 * edad + 1.5 :
                5.5 * edad + 1.5
    ) : null;

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `La edad de tu ${animal} ${nombre} en años humanos es ${edadHumana} y su peso ideal estimado a esa edad sería ${peso} kg.`;
}

function calcularEdadMascotas() {
    const numMascotas = parseInt(prompt("Ingresa el número de mascotas a calcular:"));
    let i = 0;

    while (i < numMascotas) {
        calcularEdad();
        i++;
    }
}

function calcularIMC() {
    // Obtener los valores de peso y altura
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    // Calcular el IMC
    const imc = (peso / ((altura / 100) ** 2)).toFixed(2);

    // Mostrar el resultado en la página
    const resultado = document.getElementById('resultado2');
    resultado.textContent = imc;

    // Evaluar el resultado del IMC
    resultado.textContent += imc < 18.5 ? " - Bajo peso"
        : imc >= 18.5 && imc < 25 ? " - Peso normal"
            : imc >= 25 && imc < 30 ? " - Sobrepeso"
                : imc >= 30 && imc < 35 ? " - Obesidad grado 1"
                    : imc >= 35 && imc < 40 ? " - Obesidad grado 2"
                        : " - Obesidad grado 3";
}


function addNewRow() {
    let table = document.getElementById("imcData");
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    let nuevaEdad = document.createElement("input");
    nuevaEdad.setAttribute("type", "number");
    nuevaEdad.setAttribute("class", "edad");
    nuevaEdad.setAttribute("name", "edad");
    nuevaEdad.setAttribute("min", "1");
    nuevaEdad.setAttribute("max", "200");
    nuevaEdad.setAttribute("step", "0.1");
    nuevaEdad.setAttribute("form", "formularioIMC");
    nuevaEdad.setAttribute("required", "");

    let nuevoPeso = document.createElement("input");
    nuevoPeso.setAttribute("type", "number");
    nuevoPeso.setAttribute("class", "peso");
    nuevoPeso.setAttribute("name", "peso");
    nuevoPeso.setAttribute("min", "1");
    nuevoPeso.setAttribute("max", "200");
    nuevoPeso.setAttribute("step", "0.1");
    nuevoPeso.setAttribute("form", "formularioIMC");
    nuevoPeso.setAttribute("required", "");

    let nuevaAltura = document.createElement("input");
    nuevaAltura.setAttribute("type", "number");
    nuevaAltura.setAttribute("class", "altura");
    nuevaAltura.setAttribute("name", "altura");
    nuevaAltura.setAttribute("min", "1");
    nuevaAltura.setAttribute("max", "200");
    nuevaAltura.setAttribute("form", "formularioIMC");
    nuevaAltura.setAttribute("required", "");

    cell1.appendChild(nuevaEdad);
    cell2.appendChild(nuevoPeso);
    cell3.appendChild(nuevaAltura);
    cell4.innerHTML = "";
}

function leerTabla() {
    const valoresTabla = document.querySelectorAll("#imcData tr");
    let listaObjetosIMC = [];

    for (let index = 1; index < valoresTabla.length; index++) {
        let edad = valoresTabla[index].querySelector("input[name='edad']").value;
        let peso = valoresTabla[index].querySelector("input[name='peso']").value;
        let altura = valoresTabla[index].querySelector("input[name='altura']").value;
        let imc = 0;
        listaObjetosIMC[index - 1] = { edad, peso, altura, imc };
    }
    listaObjetosIMC = calcularIMCTabla(listaObjetosIMC);
    
    for (let index = 1; index < valoresTabla.length; index++) {
        valoresTabla[index].lastElementChild.innerHTML = listaObjetosIMC[index - 1].imc;
    }

    if (myChart) {
        myChart.destroy();
    }
    crearGrafico(listaObjetosIMC);
}

function calcularIMCTabla(listaObjetosIMC) {
    const decimales_IMC = 2;
    for (let index = 0; index < listaObjetosIMC.length; index++) {
        let aux = listaObjetosIMC[index];
        aux.imc = (aux.peso / ((aux.altura / 100) ** 2)).toFixed(decimales_IMC);
        listaObjetosIMC[index] = aux;
    }
    return listaObjetosIMC;
}

function crearGrafico(listaObjetosIMC) {
    
    const edades = listaObjetosIMC.map((obj) => obj.edad);
    const imcs = listaObjetosIMC.map((obj) => obj.imc);

    const ctx = document.getElementById("imcChart").getContext("2d");

    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: edades,
            datasets: [
                {
                    label: "IMC",
                    data: imcs,
                    backgroundColor: "rgba(153, 205, 1, 0.6)",
                    borderColor: "rgba(153, 205, 1, 1)",
                    borderWidth: 2,
                    fill: true,
                    lineTension: 0.2,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Edad",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "IMC",
                    },
                },
            },
        },
    });
}

