export function valida(input){
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }

  if(input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML="";
  }else{
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajeError(tipoInput,input);
  }
}

const tipoErrores=[
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
]

const mensajesError = {
  nombre:{
    valueMissing:"Este campo nombre no puede estar vacio."
  },
  email:{
    valueMissing:"Este campo email no puede estar vacio.",
    typeMismatch: "Correo no valido."
  },
  password:{
    valueMissing:"Este campo password no puede estar vacio.",
    patternMismatch:"Al menos 6 caracteres maximo 12, debe cobtener 1 letra minuscula 1 mayuscula, un numero y no puede contener caracrteres especiales"
  },
  nacimiento:{
    valueMissing:"Este campo nacimiento no puede estar vacio.",
    customError:"Debes tener al menos 18 años de edad."
  },
  numero:{
    valueMissing:"Este campo numero no puede estar vacio.",
    patternMismatch:"Formato requerido 0000000000 10 numeros."

    },
  direccion:{
    valueMissing:"Este campo direccion no puede estar vacio.",
    patternMismatch:"Debe contener entre 10 y 40 caracteres."
  
  },
  ciudad:{
    valueMissing:"Este campo ciudad no puede estar vacio.",
    patternMismatch:"Formato requerido 0000000000 10 numeros."

    },
  estado:{
    valueMissing:"Este campo estado no puede estar vacio.",
    patternMismatch:"Formato requerido 0000000000 10 numeros."
  
    }
}

const validadores = {
  nacimiento : (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput,input){
  let mensaje ="";

  tipoErrores.forEach(error => {
    if (input.validity[error]) {
      console.log(tipoInput, error)
      console.log(input.validity[error])
      console.log(mensajesError[tipoInput][error])
      mensaje=mensajesError[tipoInput][error];
    }
  });

  return mensaje;
}



function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)){
      mensaje="Debes tener al menos 18 años de edad.";
    }
    input.setCustomValidity(mensaje);
    console.log(mensaje);
}

function mayorEdad(fecha){
  const fechaActual = new Date();
  const diferenciaFechas = new Date(fecha.getUTCFullYear()+18,
                                    fecha.getUTCMonth(),
                                    fecha.getUTCDate());
  return diferenciaFechas <= fechaActual;
}

