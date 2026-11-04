/**
 * clase para refactorizar los metodos de dom_fields que se consideren necesarios sin modificar su definicion y para inclusion de nuevos metodos
 *
 * NUEVOS:
 *  - crearOpcionesSelect: rellena los select de los atributos FK
 *  - crearTablaDatosEntidad: crearTablaDatos de AbstractEntidad aplanando las claves foraneas que
 *    llegan como objeto y sin romper los iconos de las filas con apostrofos o &#13;&#10;
 *  - normalizar_fecha, al_cambiar y clase_opcion_vacia: manipulacion del DOM que piden las entidades
 *    (persona y rolaccionfuncionalidad), para no hacerla directamente desde la clase de entidad
 *  - quitar_validacion: quita el evento de validacion de los campos de solo lectura de EDIT
 *  - configurar_cabecera_gestion, valores_formulario, preparar_contenedor_matriz, crearSelectorMatriz
 *    y crearMatriz: matriz de casillas con la que se gestionan funcionalidad_accion y
 *    rolaccionfuncionalidad (sustituye a la tabla de tuplas en esas dos entidades)
 *
 * REFACTORIZADOS:
 *  - crearElementoHtml: el original no rellena textarea ni crea select (los crea vacios) y si la prueba
 *    de un input no trae valor no crea el elemento.
 *  - mostrar_error_campo / mostrar_exito_campo: el original acumula las clases de error en el <a>,
 *    y setLang podia acabar pintando el mensaje de un error anterior.
 *  - abrirModalError: el original hace classList.add = codigo (asignacion, no llamada),
 *    asi que el mensaje de error de accion nunca se traducia. Si el codigo del back no esta en
 *    los ficheros de idioma, muestra un mensaje generico traducido y el codigo del back.
 *  - colocarboton: pone clase de traduccion al icono del submit (alt y title traducidos).
 *  - rellenarvaloresform: deja vacios los campos que no vienen en la fila (el original escribe "undefined")
 *    y convierte las entidades html del back (&#13;&#10;) antes de rellenar.
 */
class entity_dom_fields extends dom_fields{
    constructor(){
        super();
    }

	/**
	 * crea un elemento del DOM para las pruebas y lo coloca en el contenedor
	 *
	 * @param {string} contenedor id del contenedor donde colocar el elemento
	 * @param {string} tag tipo de elemento (input, textarea, select, file, submit u otro tag)
	 * @param {string} nombrecampo name e id del elemento
	 * @param {object} valores objeto {campo: valor} con el valor de la prueba
	 * @param {object} extra no se usa
	 * @returns void
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
	 * muestra el error del campo: borde rojo y mensaje (traducido por setLang con el codigo como clase)
	 * @param {string} id id del campo
	 * @param {string} codigoerror codigo del error
	 */
	mostrar_error_campo(id, codigoerror){
		document.getElementById('span_error_'+id).style.display = 'inline';
		document.getElementById('error_'+id).innerHTML = codigoerror;
		document.getElementById('error_'+id).className = codigoerror;
		document.getElementById(id).style.borderColor = 'red';
		setLang();
	}

	/**
	 * muestra el campo como correcto: borde verde y sin mensaje
	 * @param {string} id id del campo
	 */
	mostrar_exito_campo(id){
		document.getElementById('span_error_'+id).style.display = 'none';
		document.getElementById('error_'+id).innerHTML = '';
		document.getElementById('error_'+id).className = '';
		document.getElementById(id).style.borderColor = 'green';
	}

	/**
	 * abre el modal de error de accion con el codigo devuelto por el back.
	 * Si el codigo esta en los ficheros de idioma se muestra su traduccion; si no, se muestra un mensaje
	 * generico traducido seguido del propio codigo de error del back, para que siempre se vea el error real.
	 * El formulario no se toca: al cerrar el modal sigue como estaba para corregir el error
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
	 * REFACTORIZADO: coloca el boton de submit como el original y pone al icono una clase
	 * de traduccion (text_icono_ACCION) para que setLang le ponga alt y title en el idioma elegido
	 * @param {string} accion accion del formulario
	 */
	colocarboton(accion){
		super.colocarboton(accion);
		let icono = document.querySelector('#submit_button img');
		icono.className = 'text_icono_'+accion;
	}

	/**
	 * metodo nuevo: rellena un select con opciones (para atributos FK)
	 * @param {string} idselect id del select
	 * @param {Array} opciones [{valor, texto}]
	 * @param {string} clasevacia si se indica, primera opcion con valor '' y esa clase (texto traducido por setLang)
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
	 * metodo nuevo: misma funcion que crearTablaDatos de AbstractEntidad (no modificable), corrigiendo
	 * dos problemas con los datos que devuelve el back:
	 *  - las claves foraneas llegan como objeto (la tupla relacionada, p.e. id_rol = {id_rol, rol_name, ...}):
	 *    en la tabla saldria [object Object] y el formulario no podria seleccionar su valor. Se deja solo el id.
	 *  - el JSON de la fila va dentro de un onclick='...': un apostrofo (O'Donnell) cierra el atributo y una
	 *    entidad html como &#13;&#10; (saltos de linea de las descripciones) se convierte en un salto de linea
	 *    real dentro del codigo JavaScript. En ambos casos los iconos EDIT/DELETE/SHOWCURRENT de esa fila
	 *    no funcionan. Se escapan & y ' para que el atributo devuelva el JSON exacto.
	 *
	 * @param {Object} entidad entidad que muestra la tabla
	 * @param {Array} datos filas devueltas por el back
	 * @param {Array} mostrarespecial columnas a transformar antes de mostrarlas
	 */
	crearTablaDatosEntidad(entidad, datos, mostrarespecial){

		var misdatos = datos;

		// claves foraneas que llegan como objeto: se deja el valor del atributo con el mismo nombre
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
	 * REFACTORIZADO: rellena el formulario como el original, corrigiendo dos problemas:
	 *  - el original escribe "undefined" en los campos del formulario que no vienen en la fila (p.e. la
	 *    contrasena si el back no la devuelve: se enviaria "undefined" como contrasena nueva en EDIT).
	 *    Los campos que no vienen, o vienen a null, se dejan vacios.
	 *  - convierte las entidades html que devuelve el back en los textos (p.e. &#13;&#10; de los saltos
	 *    de linea) en sus caracteres reales, para que en los campos se vea el texto y no el codigo
	 * @param {Object} parametros fila con un valor por cada campo del formulario
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
	 * metodo nuevo: reescribe en el campo una fecha d/m/aaaa valida como dd/mm/aaaa (1/1/2000 -> 01/01/2000)
	 * @param {string} id id del campo de fecha
	 */
	normalizar_fecha(id){
		let partes = document.getElementById(id).value.split('/');
		document.getElementById(id).value = partes[0].padStart(2,'0') + '/' + partes[1].padStart(2,'0') + '/' + partes[2];
	}

	/**
	 * metodo nuevo: ejecuta una funcion cada vez que cambia el valor de un campo, pasandole el valor nuevo.
	 * Usa addEventListener para no pisar el onchange de validacion que pone colocarvalidaciones
	 * @param {string} id id del campo
	 * @param {function} funcion funcion a ejecutar, recibe el valor del campo
	 */
	al_cambiar(id, funcion){
		let campo = document.getElementById(id);
		campo.addEventListener('change', () => funcion(campo.value));
	}

	/**
	 * metodo nuevo: devuelve la clase de traduccion de la opcion vacia de un select (la primera, con valor '')
	 * o null si el select no tiene opcion vacia
	 * @param {string} idselect id del select
	 * @returns {string|null}
	 */
	clase_opcion_vacia(idselect){
		let primera = document.getElementById(idselect).options[0];
		return (primera && primera.value === '') ? primera.className : null;
	}

	/**
	 * metodo nuevo: quita el evento de validacion que colocarvalidaciones pone en un campo.
	 * Se usa con los campos de solo lectura de EDIT: el usuario no introduce esos datos, asi que no se
	 * validan y no tienen metodo de validacion (un input readonly se puede enfocar y lanzaria el evento)
	 * @param {string} id id del campo
	 */
	quitar_validacion(id){
		let campo = document.getElementById(id);
		campo.removeAttribute('onblur');
		campo.removeAttribute('onchange');
	}

	/**********************************************************************************************
		METODOS NUEVOS PARA LA MATRIZ DE PERMISOS (funcionalidad_accion y rolaccionfuncionalidad)
	***********************************************************************************************/

	/**
	 * metodo nuevo: muestra u oculta los elementos de la cabecera de gestion (index.html) que no usan
	 * todas las entidades. funcionalidad_accion y rolaccionfuncionalidad se gestionan con la matriz,
	 * asi que no tienen icono de ADD ni selector de columnas (no hay tabla de tuplas). El resto de
	 * entidades lo vuelven a mostrar al crearse
	 * @param {bool} conadd mostrar el icono de ADD
	 * @param {bool} concolumnas mostrar el selector de columnas
	 */
	configurar_cabecera_gestion(conadd, concolumnas){
		document.getElementById('botonADD').style.display = (conadd) ? '' : 'none';
		document.getElementById('label_seleccioncolumnas').style.display = (concolumnas) ? '' : 'none';
		document.getElementById('seleccioncolumnas').style.display = (concolumnas) ? '' : 'none';
	}

	/**
	 * metodo nuevo: devuelve los valores de los campos indicados del formulario (cadena vacia si el
	 * formulario o el campo no existen)
	 * @param {string} idform id del formulario
	 * @param {Array} campos ids de los campos
	 * @returns {object} {campo: valor}
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
	 * metodo nuevo: vacia el contenedor de la tabla de la entidad y le quita la clase de traduccion
	 * (AbstractEntidad le pone RECORDSET_VACIO cuando la busqueda no devuelve datos)
	 * @param {string} idcontenedor id del contenedor (IU_manage_table)
	 */
	preparar_contenedor_matriz(idcontenedor){
		let contenedor = document.getElementById(idcontenedor);
		contenedor.innerHTML = '';
		contenedor.className = '';
		contenedor.style.display = 'block';
	}

	/**
	 * metodo nuevo: coloca arriba a la izquierda del contenedor un desplegable con su etiqueta
	 * (en rolaccionfuncionalidad, para elegir el rol al que se asignan los permisos de la matriz)
	 * @param {string} idcontenedor id del contenedor (IU_manage_table)
	 * @param {string} idselect id del desplegable
	 * @param {string} claseetiqueta clase de traduccion de la etiqueta
	 * @param {Array} opciones [{valor, texto}]
	 * @param {*} valor valor seleccionado
	 * @param {Function} alcambiar (valor) se invoca al cambiar la opcion
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
	 * metodo nuevo: dibuja en el contenedor una matriz de casillas (filas x columnas) y debajo el texto
	 * de ayuda. Una casilla marcada significa que existe la tupla (fila, columna) en el back.
	 * Las casillas de combinaciones que no se pueden asignar se dibujan deshabilitadas
	 *
	 * @param {string} idcontenedor id del contenedor donde se dibuja (IU_manage_table)
	 * @param {string} claseesquina clase de traduccion del texto de la esquina superior izquierda
	 * @param {string} claseayuda clase de traduccion del texto de ayuda de debajo de la matriz
	 * @param {Array} filas [{valor, texto}]
	 * @param {Array} columnas [{valor, texto}]
	 * @param {Function} estaactiva (valorfila, valorcolumna) => true si la casilla va marcada
	 * @param {Function} sepuedeasignar (valorfila, valorcolumna) => false si la casilla va deshabilitada
	 * @param {Function} alcambiar (casilla, valorfila, valorcolumna) se invoca al marcar o desmarcar
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
