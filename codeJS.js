//javaScript code
document.addEventListener("DOMContentLoaded",function(){

        // se crean las variables para almacenar los elementos y poder mostrarlos en los inputs
        // se les añase el listener con su evento correspondiente y la llamada a su función
        const validarPalindromo = document.getElementById("inputPalindromo");
        validarPalindromo.addEventListener("keyup", ejercicio_1);

        const validarNumeros = document.getElementById("validar-2");
        validarNumeros.addEventListener("click", ejercicio_2);

        const validarCadena1 = document.getElementById("inputFrase1");
        validarCadena1.addEventListener("keyup", ejercicio_3);

        const validarCadena2 = document.getElementById("inputFrase2");
        validarCadena2.addEventListener("keyup", ejercicio_4);           

    // funcion que resulve el ejercicio 1
    function ejercicio_1(){
        let text = document.getElementById("inputPalindromo").value;// se captura el objeto input y se almacena en la variable su valor como string
        const regex = /,/gi;// expresion regular para encontrar comas
        // toLowerCase = pone en minusculas todos los caracteres
        // split =  genera un arry  de arrays en los que se genera un string con las cadenas que hay entre espacios
        //join = genra un solo string a partir de los arrays generados por split con
        // replace = elimina los elementos alamacenado en regex
        text = text.toLowerCase().split(" ").join("").replace(regex,'');// Por todo lo anterior se consiguen eliminar los espacios y las comas
        let palindromoResult = document.getElementById("palindromoResult");// captura el objeto del input donde se presenta el resultado
        // se evaluan las posibles situaciones y se muestra el resultado mediante innerHTML en la pagina
        if(text.length == 1){
            palindromoResult.innerHTML = "SIGA ESCRIBIENDO"
        }else if (text.length > 1) {
            //Se le da la vuelta a string de text y se compara para ver si son iguales 
            if (text === text.split('').reverse().join('').replace(regex,'')) {
            palindromoResult.innerHTML = "SI ES PALÍNDROMO"
            } else {
                palindromoResult.innerHTML = "NO ES PALÍNDROMO"
            } 
        } else {
            palindromoResult.innerHTML = "NO HAY DATOS"
        }
    }
    // funcion que resulve el ejercicio 2
    function ejercicio_2(){
        // se capturan los ebjetos inpunt y se guarda el valor como numero
        let num1 = document.getElementById("inputNum-1").valueAsNumber;// value devuelve string
        let num2 = document.getElementById("inputNum-2").valueAsNumber;// value devuelve string
        const numResult = document.getElementById("numResult");
        if(!isNaN(num1) && !isNaN(num2)){// se comprueba que el valor es numerico
            // se evaluan las soluciones posibles
            if( num1 > num2){
                numResult.innerHTML = "El numero " + num1 + " es mayor que " + num2 + ".";
            }else if(num1 < num2){
                numResult.innerHTML = "El numero " + num2 + " es mayor que " + num1 + ".";
            }else if(num1 == num2){
                numResult.innerHTML = "Los numeros " + num1 + " y " + num2 + " son iguales.";
            }
        }else{
            numResult.innerHTML = "Introduzca valores validos";// si lo datos no son correctos se indica
        }
    }
    // funcion que resulve el ejercicio 3
    function ejercicio_3(){
        // se captura el objeto input y se almacena en la variable su valor como string
        let cadena = document.getElementById("inputFrase1").value;
        // Se captura el objeto input para mostrar el resultado del ejericio
        const frase1Result = document.getElementById("frase1Result");
        // Si la cadena no es vacia se procesa
        if(cadena != ''){
            // Se llama a la función vocales para procesarlas y se almacena el mapa devuelto con las ocurrencias
            let ocurrenciasVocales = vocales(cadena);
            // si ocurrenciasVocales esta vacia
            if (ocurrenciasVocales === ''){
                // es qeu no hay vocales
                frase1Result.innerHTML = 'No hay vocales';
            }else{// si tiene valores
                // se crea la variable para almacenarlos
                let vocalesExistentes = "";
                //Se recorre el mapa por clave y se añade a la variable que muestra las vocales
                for( let vocal of ocurrenciasVocales.keys()){
                    vocalesExistentes += vocal + ", ";
                }
                // se muestran las vocales en el input con id frase1Result
                frase1Result.innerHTML = "Las vocales que hay son: " + vocalesExistentes;
            }

        }else{
            frase1Result.innerHTML = "Introduzca una frase";
        }

    }
    // funcion que resulve el ejercicio 4
    function ejercicio_4(){
        // captura el input y lo almacena en la variable
        let cadena = document.getElementById("inputFrase2").value;
        // variable del inptu para mostrar el resultado
        const frase2Result = document.getElementById("frase2Result");
        //Se comprueba si al cadena tiene valores
        if(cadena != ''){
            // se llama a vocales para obtener el mapa de vocales
            let ocurrenciasVocales = vocales(cadena);
            // si la variable ocurrencia vocales tiene el valor vacio es que no hay vocalesExistentes
            // si contiene el mapa clave valor, es que si las hay
            if (ocurrenciasVocales != ''){
                let resultado = "";
                //Se recorre el mapa almacenando los datos en la variable resultado 
                for(const [clave, valor] of ocurrenciasVocales){
                    resultado += "{ " + clave + ": " + valor + " }";
                }
                // se muestra el resultado en el input
                frase2Result.innerHTML = "Las vocales que hay son: " + resultado + ".";
            }else{
                frase2Result.innerHTML = "No hay vocales";
            }
        }else{
            frase2Result.innerHTML = "Introduzca una frase";
        }
    }
    // Se crea esta función para que sea utilizada por los ejercicios 3 y 4, 
    function vocales(cadena){
        // se ponen todos los caracteres en minuscula
        cadena.toLowerCase();
        // se añade la expresieón regular para indicar los elementos a buscar, en este caso se incluyen tildes y diéresis
        let arryaVocales = cadena.match(/[aeiouáéíóúü]/gi);
        // se utiliza map() porque no se conoce las claves en tiempo de compilación
        // se conoceran en tiempo de ejecución 
        let mapVocales = new Map();
        // si no hay valores en el array
        if (arryaVocales === null){
            // se pone la variable como vacia
            mapVocales = '';
        }else{// si la variable array tiene valores 
            // se guarda en cada variable las ocurrencias mediante la función filter()
            let a = arryaVocales.filter(element => element === "a" || element === "á");
            let e = arryaVocales.filter(element => element === "e" || element === "é");
            let i = arryaVocales.filter(element => element === "i" || element === "í");
            let o = arryaVocales.filter(element => element === "o" || element === "ó");
            let u = arryaVocales.filter(element => element === "u" || element === "ú" || element === "ü");

            // añade la clave si hay ocurrencias y se añade el tamaño del array como número de ocurrencias
            if(a.length > 0){
                mapVocales.set('a', a.length)
            }
            if(e.length > 0){
                mapVocales.set('e', e.length)
            }

            if(i.length > 0){
                mapVocales.set('i', i.length)
            }

            if(o.length > 0){
                mapVocales.set('o', o.length)
            }

            if(u.length > 0){
                mapVocales.set('u', u.length)
            }
        }

        return mapVocales;// se devuelve el mapa de vocales con clave valor
    }
});

