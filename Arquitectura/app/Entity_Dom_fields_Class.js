/**
 * refactorizacion de dom_fields y metodos nuevos para las entidades
 * (selects de FK, tabla, calendario de fechas y matriz de permisos)
 */
class entity_dom_fields extends dom_fields{
    constructor(){
        super();
    }

	/**
	 * refactorizado: tambien crea textarea y select para las pruebas
	 * @param {string} contenedor id del contenedor
	 * @param {string} tag tipo de elemento
	 * @param {string} nombrecampo id y name del campo
	 * @param {Object} valores valores de la prueba
	 * @param {*} extra no se usa
	 */
	crearElementoHtml(contenedor, tag, nombrecampo, valores, extra=null){

		var element;
		var valorcampo = (valores && (nombrecampo in valores)) ? valores[nombrecampo] : '';

		switch (tag){
			case 'input':
				element = this.createInput(nombrecampo, 'text');
				element.value = valorcampo;
				this.colocarelemento(element, contenedor);
				break;
			case 'textarea':
				element = document.createElement('textarea');
				element.id = nombrecampo;
				element.name = nombrecampo;
				element.value = valorcampo;
				this.colocarelemento(element, contenedor);
				break;
			case 'select':
				element = document.createElement('select');
				element.id = nombrecampo;
				element.name = nombrecampo;
				var opcion = document.createElement('option');
				opcion.value = valorcampo;
				opcion.innerHTML = valorcampo;
				opcion.selected = true;
				element.append(opcion);
				this.colocarelemento(element, contenedor);
				break;
			case 'file':
				element = this.createInput(nombrecampo, 'file');
				this.fillElementFile(element, valores);
				this.colocarelemento(element, contenedor);
				break;
			case 'submit':
				element = this.createInput(nombrecampo, 'input');
				element.type = 'submit';
				this.colocarelemento(element, contenedor);
				break;
			default: // span y a de los errores, sin valor
				element = document.createElement(tag);
				element.id = nombrecampo;
				this.colocarelemento(element, contenedor);
				break;
		}

	}

	/**
	 * refactorizado: borde rojo y mensaje de error del campo
	 * @param {string} id id del campo
	 * @param {string} codigoerror codigo de error
	 */
	mostrar_error_campo(id, codigoerror){
		document.getElementById('span_error_'+id).style.display = 'inline';
		document.getElementById('error_'+id).innerHTML = codigoerror;
		document.getElementById('error_'+id).className = codigoerror;
		document.getElementById(id).style.borderColor = 'red';
		setLang();
	}

	/**
	 * refactorizado: borde verde y quita el mensaje
	 * @param {string} id id del campo
	 */
	mostrar_exito_campo(id){
		document.getElementById('span_error_'+id).style.display = 'none';
		document.getElementById('error_'+id).innerHTML = '';
		document.getElementById('error_'+id).className = '';
		document.getElementById(id).style.borderColor = 'green';
	}

	/**
	 * refactorizado: modal de error con el texto traducido, o el codigo si no hay traduccion
	 * @param {string} errorMsg codigo de error
	 */
	abrirModalError(errorMsg){
		let mensaje = document.getElementById('error_action_msg');
		document.getElementById('error_action_modal').style.display = 'block';
		document.getElementById('modal_action_overlay').style.display = 'block';
		setLang();
		if (window.traduccion && window.traduccion[errorMsg]){
			mensaje.className = errorMsg;
			mensaje.innerHTML = errorMsg;
		}
		else{
			mensaje.className = '';
			mensaje.innerHTML = `<span class='text_error_back_desconocido'></span>: <b></b>`;
			mensaje.querySelector('b').textContent = errorMsg;
		}
		setLang();
	}

	/**
	 * refactorizado: el icono de submit con alt y title traducidos
	 * @param {string} accion ADD, EDIT, SEARCH...
	 */
	colocarboton(accion){
		super.colocarboton(accion);
		let icono = document.querySelector('#submit_button img');
		icono.className = 'text_icono_'+accion;
	}

	/**
	 * rellena un select
	 * @param {string} idselect id del select
	 * @param {Array} opciones lista de {valor, texto}
	 * @param {string} clasevacia clase de la opcion vacia (opcional)
	 */
	crearOpcionesSelect(idselect, opciones, clasevacia=null){
		let select = document.getElementById(idselect);
		select.innerHTML = '';
		if (clasevacia !== null){
			let vacia = document.createElement('option');
			vacia.value = '';
			vacia.className = clasevacia;
			vacia.innerHTML = '--';
			select.append(vacia);
		}
		for (let opcion of opciones){
			let elemento = document.createElement('option');
			elemento.value = opcion.valor;
			elemento.innerHTML = opcion.texto;
			select.append(elemento);
		}
	}

	/**
	 * como crearTablaDatos pero aplanando las FK y escapando & y ' en los onclick
	 * @param {Object} entidad entidad que pinta la tabla
	 * @param {Array} datos tuplas del back
	 * @param {Array} mostrarespecial columnas con formato especial
	 */
	crearTablaDatosEntidad(entidad, datos, mostrarespecial){

		var misdatos = datos;

		// FK que vienen como objeto: nos quedamos con el id
		for (var i=0;i<misdatos.length;i++){
			for (var clave in misdatos[i]){
				var valor = misdatos[i][clave];
				if ((valor !== null) && (typeof valor == 'object')){
					misdatos[i][clave] = (valor[clave] !== undefined) ? valor[clave] : Object.values(valor)[0];
				}
			}
		}

		for (var i=0;i<misdatos.length;i++){
			var fila = JSON.stringify(misdatos[i]).replace(/&/g, '&amp;').replace(/'/g, '&#39;');
			misdatos[i]['EDIT'] = `<img id='botonEDIT' src='./iconos/EDIT.png' onclick='entidad.createForm_EDIT(`+fila+`);'>`;
			misdatos[i]['DELETE'] = `<img id='botonDELETE' src='./iconos/DELETE.png' onclick='entidad.createForm_DELETE(`+fila+`);'>`;
			misdatos[i]['SHOWCURRENT'] = `<img id='botonSHOWCURRENT' src='./iconos/SHOWCURRENT.png' onclick='entidad.createForm_SHOWCURRENT(`+fila+`);'>`;
		}

		if (mostrarespecial.length > 0){
			for (var i=0;i<misdatos.length;i++){
				for (var clave in misdatos[i]){
					if (mostrarespecial.includes(clave)){
						misdatos[i][clave] = entidad.cambiarmostrarespecial(clave, misdatos[i][clave]);
					}
				}
			}
		}

		this.showData('IU_manage_table', misdatos);
		this.crearSeleccionablecolumnas(entidad.columnasamostrar, entidad.atributos);
		this.mostrarocultarcolumnas(entidad.columnasamostrar, entidad.atributos);

		setLang();
	}

	/**
	 * refactorizado: sin "undefined" en los campos que no vienen y con los &#13;&#10; convertidos
	 * @param {Object} parametros valores de la fila
	 */
	rellenarvaloresform(parametros){
		let decodificador = document.createElement('textarea');
		let fila = {};
		// todos los campos del formulario empiezan vacios
		let campos = document.forms['form_iu'].elements;
		for (let i=0;i<campos.length;i++){
			if (campos[i].id){
				fila[campos[i].id] = '';
			}
		}
		for (let clave in parametros){
			if ((parametros[clave] === null) || (parametros[clave] === undefined)){
				fila[clave] = '';
			}
			else if (typeof parametros[clave] == 'string'){
				decodificador.innerHTML = parametros[clave];
				fila[clave] = decodificador.value;
			}
			else{
				fila[clave] = parametros[clave];
			}
		}
		super.rellenarvaloresform(fila);
	}

	/**
	 * d/m/aaaa -> dd/mm/aaaa
	 * @param {string} id id del campo
	 */
	normalizar_fecha(id){
		let partes = document.getElementById(id).value.split('/');
		document.getElementById(id).value = partes[0].padStart(2,'0') + '/' + partes[1].padStart(2,'0') + '/' + partes[2];
	}

	/**
	 * ejecuta funcion cuando cambia el campo
	 * @param {string} id id del campo
	 * @param {Function} funcion recibe el valor nuevo
	 */
	al_cambiar(id, funcion){
		let campo = document.getElementById(id);
		campo.addEventListener('change', () => funcion(campo.value));
	}

	/**
	 * clase de la opcion vacia del select
	 * @param {string} idselect id del select
	 * @returns {string|null}
	 */
	clase_opcion_vacia(idselect){
		let primera = document.getElementById(idselect).options[0];
		return (primera && primera.value === '') ? primera.className : null;
	}

	/**
	 * quita la validacion de un campo de solo lectura
	 * @param {string} id id del campo
	 */
	quitar_validacion(id){
		let campo = document.getElementById(id);
		campo.removeAttribute('onblur');
		campo.removeAttribute('onchange');
	}

	// ---------- calendario de los campos de fecha ----------

	/**
	 * dd/mm/aaaa -> aaaa-mm-dd
	 * @param {string} texto fecha d/m/aaaa
	 * @returns {string} vacia si no es valida
	 */
	fecha_a_iso(texto){
		let partes = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/.exec(texto);
		if (partes === null){
			return '';
		}
		let dia = parseInt(partes[1], 10);
		let mes = parseInt(partes[2], 10);
		let anio = parseInt(partes[3], 10);
		let fecha = new Date(anio, mes - 1, dia);
		if (fecha.getFullYear() != anio || fecha.getMonth() != mes - 1 || fecha.getDate() != dia){
			return '';
		}
		return partes[3] + '-' + String(mes).padStart(2,'0') + '-' + String(dia).padStart(2,'0');
	}

	/**
	 * aaaa-mm-dd -> dd/mm/aaaa
	 * @param {string} iso fecha aaaa-mm-dd
	 * @returns {string}
	 */
	iso_a_fecha(iso){
		let partes = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(iso);
		return (partes === null) ? '' : partes[3] + '/' + partes[2] + '/' + partes[1];
	}

	/**
	 * muestra el icono del calendario
	 * @param {string} idcampo id del campo de fecha
	 */
	activar_calendario(idcampo){
		let boton = document.getElementById('boton_calendario_'+idcampo);
		boton.title = (window.traduccion && window.traduccion['text_icono_calendario']) ? window.traduccion['text_icono_calendario'] : '';
		boton.setAttribute('aria-label', boton.title);
		document.getElementById('selector_calendario_'+idcampo).style.display = 'inline-block';
	}

	/**
	 * abre el calendario en la fecha del campo (sin fechas futuras)
	 * @param {string} idcampo id del campo de fecha
	 */
	abrir_calendario(idcampo){
		let calendario = document.getElementById('calendario_'+idcampo);
		let hoy = new Date();
		calendario.max = String(hoy.getFullYear()).padStart(4,'0') + '-' + String(hoy.getMonth() + 1).padStart(2,'0') + '-' + String(hoy.getDate()).padStart(2,'0');
		calendario.value = this.fecha_a_iso(document.getElementById(idcampo).value);
		if (typeof calendario.showPicker == 'function'){
			calendario.showPicker();
		}
		else{
			calendario.focus();
			calendario.click();
		}
	}

	/**
	 * pasa la fecha elegida al campo y lo valida
	 * @param {string} idcampo id del campo de fecha
	 */
	elegir_fecha_calendario(idcampo){
		let campo = document.getElementById(idcampo);
		campo.value = this.iso_a_fecha(document.getElementById('calendario_'+idcampo).value);
		campo.dispatchEvent(new Event('blur'));
	}

	// ---------- matriz de permisos (funcionalidad_accion y rolaccionfuncionalidad) ----------

	/**
	 * muestra u oculta el icono de ADD y el selector de columnas
	 * @param {boolean} conadd mostrar el icono de ADD
	 * @param {boolean} concolumnas mostrar el selector de columnas
	 */
	configurar_cabecera_gestion(conadd, concolumnas){
		document.getElementById('botonADD').style.display = (conadd) ? '' : 'none';
		document.getElementById('label_seleccioncolumnas').style.display = (concolumnas) ? '' : 'none';
		document.getElementById('seleccioncolumnas').style.display = (concolumnas) ? '' : 'none';
	}

	/**
	 * valores de varios campos del formulario
	 * @param {string} idform id del formulario
	 * @param {Array} campos ids de los campos
	 * @returns {Object} {campo: valor}
	 */
	valores_formulario(idform, campos){
		let valores = {};
		let formulario = document.getElementById(idform);
		for (let campo of campos){
			let elemento = (formulario) ? formulario.querySelector('#'+campo) : null;
			valores[campo] = (elemento && elemento.value) ? elemento.value : '';
		}
		return valores;
	}

	/**
	 * vacia el contenedor de la tabla
	 * @param {string} idcontenedor id del contenedor
	 */
	preparar_contenedor_matriz(idcontenedor){
		let contenedor = document.getElementById(idcontenedor);
		contenedor.innerHTML = '';
		contenedor.className = '';
		contenedor.style.display = 'block';
	}

	/**
	 * desplegable con etiqueta encima de la matriz
	 * @param {string} idcontenedor id del contenedor
	 * @param {string} idselect id del select
	 * @param {string} claseetiqueta clase de la etiqueta
	 * @param {Array} opciones lista de {valor, texto}
	 * @param {*} valor valor del atributo
	 * @param {Function} alcambiar se llama al cambiar
	 */
	crearSelectorMatriz(idcontenedor, idselect, claseetiqueta, opciones, valor, alcambiar){
		let div = document.createElement('div');
		div.id = 'div_selector_matriz';
		let etiqueta = document.createElement('label');
		etiqueta.id = 'label_'+idselect;
		etiqueta.className = claseetiqueta;
		etiqueta.htmlFor = idselect;
		let select = document.createElement('select');
		select.id = idselect;
		for (let opcion of opciones){
			let elemento = document.createElement('option');
			elemento.value = opcion.valor;
			elemento.textContent = opcion.texto;
			select.append(elemento);
		}
		select.value = valor;
		select.addEventListener('change', () => alcambiar(select.value));
		div.append(etiqueta);
		div.append(' ');
		div.append(select);
		document.getElementById(idcontenedor).append(div);
	}

	/**
	 * tabla de casillas filas x columnas con el texto de ayuda debajo
	 * @param {string} idcontenedor id del contenedor
	 * @param {string} claseesquina clase del texto de la esquina
	 * @param {string} claseayuda clase del texto de ayuda
	 * @param {Array} filas lista de {valor, texto}
	 * @param {Array} columnas lista de {valor, texto}
	 * @param {Function} estaactiva (fila, columna) => true si va marcada
	 * @param {Function} sepuedeasignar (fila, columna) => false si va deshabilitada
	 * @param {Function} alcambiar se llama al cambiar
	 */
	crearMatriz(idcontenedor, claseesquina, claseayuda, filas, columnas, estaactiva, sepuedeasignar, alcambiar){
		let div = document.createElement('div');
		div.id = 'div_matriz';
		let tabla = document.createElement('table');
		tabla.id = 'tablamatriz';
		let cabecera = document.createElement('thead');
		let cuerpo = document.createElement('tbody');
		tabla.append(cabecera);
		tabla.append(cuerpo);

		let trcabecera = document.createElement('tr');
		let esquina = document.createElement('th');
		esquina.className = claseesquina;
		trcabecera.append(esquina);
		for (let columna of columnas){
			let th = document.createElement('th');
			th.textContent = columna.texto;
			th.title = columna.valor;
			trcabecera.append(th);
		}
		cabecera.append(trcabecera);

		for (let fila of filas){
			let tr = document.createElement('tr');
			let thfila = document.createElement('th');
			thfila.textContent = fila.texto;
			thfila.title = fila.valor;
			tr.append(thfila);
			for (let columna of columnas){
				let td = document.createElement('td');
				td.style.textAlign = 'center';
				let casilla = document.createElement('input');
				casilla.type = 'checkbox';
				casilla.id = 'casilla_'+fila.valor+'_'+columna.valor;
				casilla.checked = estaactiva(fila.valor, columna.valor);
				casilla.disabled = !(sepuedeasignar(fila.valor, columna.valor));
				casilla.title = fila.texto+' / '+columna.texto;
				casilla.addEventListener('change', () => alcambiar(casilla, fila.valor, columna.valor));
				td.append(casilla);
				tr.append(td);
			}
			cuerpo.append(tr);
		}

		div.append(tabla);
		let ayuda = document.createElement('p');
		ayuda.className = claseayuda;
		div.append(ayuda);
		document.getElementById(idcontenedor).append(div);
	}
}
