(function(){
    const horas = document.querySelector('#horas');

    if(horas){
        const dias = document.querySelectorAll('[name="day"]');
        const inputHiddenDia = document.querySelector('[name="day_id"]');
        const categoria = document.querySelector('[name="category_id"]');

        const inputHiddenhora = document.querySelector('[name="time_id"]');

        categoria.addEventListener('change', terminoBusqueda)
        dias.forEach(dia => dia.addEventListener('change', terminoBusqueda));   

    

        let busqueda = {
            category_id: categoria.value || '',
            day: inputHiddenDia.value || '',
        }

        // edit eventos hora
        if(!Object.values(busqueda).includes('')){
           (async () => {
            await buscarEventos();
            
            const id = inputHiddenhora.value;
            //resaltar la hora actual
            const horaSeleccionada = document.querySelector(`[data-hora-id="${id}"]`);

            horaSeleccionada.classList.remove('hora-desabilitada')
            horaSeleccionada.classList.add('horas-seleccionada')

            horaSeleccionada.onclick = seleccionarHora
           })() 
        }

        function terminoBusqueda(e){
            busqueda[e.target.name] = e.target.value

            //reiniciar los campos ocultos

            inputHiddenhora.value = '';
            inputHiddenDia.value = '';
            const horaPrevia = document.querySelector('.horas-seleccionada')
            if(horaPrevia){
                horaPrevia.classList.remove('horas-seleccionada')
            }



            if(Object.values(busqueda).includes('')){
                return
            }

            buscarEventos()
        }

        async function buscarEventos(){
            
            const {day, category_id} = busqueda;
            console.log(busqueda)
            const url = `/api/evento?day_id=${day}&category_id=${category_id}`

            const resultado = await fetch(url);
            const eventos = await resultado.json();

            obtenerHorasDisponibles(eventos);
        }

        function obtenerHorasDisponibles(eventos){
            //reiniciar las horas 
            const listadoHoras = document.querySelectorAll('#horas li')
            listadoHoras.forEach(li => li.classList.add('hora-desabilitada'))
            // comprobar eventos ya tomados y quitar la variable de desabilitado

            const horasTomadas = eventos.map(evento => String(evento.time_id));
        
            const listadoHorasArray = Array.from(listadoHoras)
            // console.log(listadoHorasArray)
            const resultado = listadoHorasArray.filter( li => !horasTomadas.includes(li.dataset.horaId))
            resultado.forEach(li => li.classList.remove('hora-desabilitada'))
              
            const horasDisponibles = document.querySelectorAll('#horas li:not(.hora-desabilitada')
            horasDisponibles.forEach(hora => hora.addEventListener('click', seleccionarHora))        
        }

        function seleccionarHora(e){
            // Deshabilitar seleccion
            const horaPrevia = document.querySelector('.horas-seleccionada')
            if(horaPrevia){
                horaPrevia.classList.remove('horas-seleccionada')
            }

            //agregar la hora seleccionada
            e.target.classList.add('horas-seleccionada')

            inputHiddenhora.value = e.target.dataset.horaId

            //llenar el campo oculto de dia
            inputHiddenDia.value = document.querySelector('[name="day"]:checked').value
        }
    }
})();