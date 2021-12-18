document.addEventListener("DOMContentLoaded",function(){

    //captura del recurso
    const recurso = document.getElementById("recurso");
    recurso.innerHTML  = '';// se elimina el contenido anerior
    // se capta la dirección inicial 
    recurso.value =  location.href; //document.URL también es valido
    //  captura y se añade el escuchador fiajndo el evento de tipo click y llamando a la función correspondiente
    const botonEnviar = document.getElementById("enviar");
    botonEnviar.addEventListener("click", enviarObjetoHttp );    
    // se crea la constante formulario para poder validar las url 
    const formulario = document.getElementById("formulario");
    const estados = document.getElementById("estados");
    // muestra como estado inicial el 0, para ofrecer información al usuario
    estados.innerHTML = 'No inicada';
    // función para capturar el objetoHttp
    function enviarObjetoHttp(){
        // se almacena el valor del input
        let recursoEvaluate = document.getElementById("recurso").value;
        if(recursoEvaluate === '' || !formulario.checkValidity()){// si está vacio, se manda una alerta y se recarga la página
            alert("Introduzca una url válida");
            window.location.reload();
        }else{
            // se crean las variables para poder mostrar los datos 
            const codigo = document.getElementById("codigo");
            const contenidos = document.getElementById("contenidos");
            const cabeceras = document.getElementById("cabeceras");
            //y se borra el posible contenido que tuviesen
            estados.innerHTML = '';
            codigo.innerHTML = '';
            contenidos.innerHTML = '';
            cabeceras.innerHTML = '';
            
            // se crea el objetoHttp
            const ObjetoHttp = new XMLHttpRequest();
            // se define el tipo 
            ObjetoHttp.contentType = "text/plain";
            // Se realiza la llamada open() con GET con la url capturada en el evento y almacenada en la variable
            ObjetoHttp.open('GET', recursoEvaluate );
            //timeout se limita para evitar tiempos de espera innecesarios
            ObjetoHttp.timeout = 9000;
            //evento ontimeout no tiene nada predefinido hay que declarar la función 
            ObjetoHttp.ontimeout = function(){
                alert("Tiempo de espera agotado");
                window.location.reload();
            }
            // evento para capturar excepciones, por ejemplo de CORS
            ObjetoHttp.onerror = function(){
                alert("Error de red");
                window.location.reload();
            }
            // se seleccionan todas las cabeceras 
            //ObjetoHttp.getAllResponseHeaders();
            // se envía
            ObjetoHttp.send();
            // cada vez que se produce un cambio (listener) en el estado de la petición, 
            ObjetoHttp.onreadystatechange = function(){
                //se evalua y se muestra el estado
                switch (this.readyState) {
                    case 0:
                        estados.innerHTML = "0: No inicada...";
                      break;
                    case 1:
                        estados.innerHTML = "1: Conexion al servidor establecida";
                      break;
                    case 2:
                        estados.innerHTML = "2: solicitud recibida";
                      break;
                    case 3:
                        estados.innerHTML = "3: Descargando...";
                      break;
                    case 4:
                        estados.innerHTML = " 4: Completada";
                  }
                  
                if(this.readyState === this.HEADERS_RECEIVED){
                    // recoge todas las cabeceras
                    cabeceras.innerHTML = this.getAllResponseHeaders();
                }

                if(this.readyState === 4 && this.status === 200){
                    // recoge los contenidos
                    contenidos.textContent = this.responseText;
                }
            }
            // Carga datos desde un servidor y coloca los datos devueltos en el elemento seleccionado
            //  es un evento que se ejecuta cuando se termina la solicitud
            ObjetoHttp.onload = function(){
                let codigoStatus = codigo.innerHTML = this.status + ":";
                codigoStatus += (this.statusText ==='') ? obtenerStatus(this.status) : this.statusText;
                codigo.innerHTML = codigoStatus;
            }
        }
    }

    function obtenerStatus(codigo){
        let respuesta ='No hay respuesta'
        if(!Number.isNaN(codigo)){
            const codigoEstado = parseInt(codigo/100);
            const estadosPosibles = [
                'Error desconocido', 
                'Información recibida con exito', 
                'Solicitud procesada con éxito', 
                'Solicitud redirigida', 
                'Solicitud incorrecta',
                'Error del servidor'
            ];
            
            respuesta = (codigoEstado < estadosPosibles.length && codigoEstado > 0) ? estadosPosibles[codigoEstado] : estadosPosibles[0];

        }

        return respuesta;
    }
});
