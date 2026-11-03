/**
 * clase para refactorizar los metodos de dom_fields que se consideren necesarios sin modificar su definicion y para inclusion de nuevos metodos
 *
 * NUEVOS:
 *  - crearOpcionesSelect (rellena los select de los atributos FK con las opciones que se le pasan)
 *  - cargar_select_fk (pide al back las tuplas de la entidad referenciada y las añade como opciones del select)
 *  - bloquear_select (deja solo la opcion seleccionada para que no se pueda cambiar y siga en el FormData)
 *  - limpiar_saltos_linea (quita las entidades de salto de linea que devuelve el back antes de crear la tabla)
 *  - lista_back, valor_id, etiqueta_fila, crearMatriz y etiquetar_selector_columnas (tablas en forma de matriz
 *    de funcionalidad_accion y rolaccionfuncionalidad)
 *
 * REFACTORIZADOS:
 *  - crearElementoHtml: el original no rellena textarea ni crea select (los crea vacios) y si la prueba
 *    de un input no trae valor no crea el elemento.
 *  - mostrar_error_campo / mostrar_exito_campo: el original acumula las clases de error en el <a>,
 *    y setLang podia acabar pintando el mensaje de un error anterior.
 *  - abrirModalError: el original hace classList.add = codigo (asignacion, no llamada),
 *    asi que el mensaje de error de accion nunca se traducia. Ahora ademas da un mensaje
 *    generico traducido si el back devuelve un codigo que no esta en los ficheros de idioma.
 *  - colocarboton: pone clase de traduccion al icono del submit (alt y title traducidos).
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
	 * abre el modal de error de accion con el codigo devuelto por el back (traducido).
	 * Si el codigo no esta en los ficheros de idioma se muestra un mensaje generico traducido
	 * (el codigo queda en el title y en la consola para poder identificarlo)
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
			console.log('codigo de error del back sin traduccion: '+errorMsg);
			mensaje.className = 'text_error_back_desconocido';
			mensaje.innerHTML = errorMsg;
		}
		mensaje.title = errorMsg;
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
	 * Pide al back todas las tuplas de una entidad y las añade como opciones a un select (clave ajena).
	 * value de la opcion = columna id; texto = id + primera columna no objeto distinta del id (el nombre).
	 * Las opciones se AÑADEN a las que ya tenga el select (la opcion vacia del formulario).
	 * Debe terminar ANTES de rellenarvaloresform, que asigna el value al select.
	 *
	 * @param {string} idselect id del select del formulario
	 * @param {string} controlador entidad del back de la que se piden las tuplas (rol, accion, funcionalidad...)
	 * @param {string} columnaid nombre de la columna que contiene el id en esa entidad
	 */
	async cargar_select_fk(idselect, controlador, columnaid){
		let respuesta = await new ExternalAccess().peticionBackGeneral('', controlador, 'SEARCH');
		let select = document.getElementById(idselect);

		if (respuesta['code'] == 'RECORDSET_DATOS'){
			for (let i=0;i<respuesta['resource'].length;i++){
				let fila = respuesta['resource'][i];
				let columnanombre = Object.keys(fila).find(c => (c != columnaid) && (typeof fila[c] != 'object'));

				let option = document.createElement('option');
				option.value = fila[columnaid];
				option.textContent = fila[columnaid] + ((columnanombre) ? ' - '+fila[columnanombre] : '');
				select.append(option);
			}
		}
	}

	/**
	 * Deja en el select solo la opcion seleccionada: el usuario no puede cambiarlo
	 * y el valor sigue viajando en el FormData (un select disabled no se envia)
	 * @param {string} id id del select
	 */
	bloquear_select(id){
		let select = document.getElementById(id);
		for (let i=select.options.length-1;i>=0;i--){
			if (!select.options[i].selected){
				select.remove(i);
			}
		}
	}

	/**
	 * El back devuelve los saltos de linea de los textos como entidades html (&#13;&#10;). AbstractEntidad.crearTablaDatos
	 * vuelca cada fila en el onclick de EDIT/DELETE/SHOWCURRENT: el navegador convierte las entidades del atributo en saltos
	 * reales dentro de un string de JS y el onclick da error de sintaxis (los botones de esa fila no hacen nada).
	 * Se sustituyen por un espacio antes de crear la tabla. Llamar desde crearTablaDatos de las entidades con textarea.
	 * @param {Array} datos filas devueltas por el back (se modifican)
	 */
	limpiar_saltos_linea(datos){
		for (let i=0;i<datos.length;i++){
			for (let clave in datos[i]){
				if (typeof datos[i][clave] == 'string'){
					datos[i][clave] = datos[i][clave].replace(/(&#13;)?&#10;|&#13;/g, ' ');
				}
			}
		}
	}

	/**********************************************************************************************
		METODOS NUEVOS PARA LAS TABLAS EN FORMA DE MATRIZ (funcionalidad_accion y rolaccionfuncionalidad)
	***********************************************************************************************/

	/**
	 * metodo nuevo: pide al back todas las tuplas de una entidad
	 * @param {string} controlador entidad del back (rol, accion, funcionalidad...)
	 * @returns {Array} filas devueltas (vacio si el back no devuelve datos)
	 */
	async lista_back(controlador){
		let respuesta = await new ExternalAccess().peticionBackGeneral('', controlador, 'SEARCH');
		return (respuesta['code'] == 'RECORDSET_DATOS') ? respuesta['resource'] : [];
	}

	/**
	 * metodo nuevo: el back devuelve las claves ajenas como objeto (la tupla de la entidad relacionada).
	 * Devuelve solo el valor del id
	 * @param {*} valor valor devuelto por el back (escalar u objeto)
	 * @param {string} columna nombre de la columna id
	 * @returns {*} valor del id
	 */
	valor_id(valor, columna){
		if (valor !== null && typeof valor == 'object'){
			return (valor[columna] !== undefined) ? valor[columna] : Object.values(valor)[0];
		}
		return valor;
	}

	/**
	 * metodo nuevo: texto 'id - nombre' de una tupla (nombre = primera columna no objeto distinta del id)
	 * @param {Object} fila tupla devuelta por el back
	 * @param {string} columnaid nombre de la columna id
	 * @returns {string} etiqueta
	 */
	etiqueta_fila(fila, columnaid){
		let columnanombre = Object.keys(fila).find(c => (c != columnaid) && (typeof fila[c] != 'object'));
		return fila[columnaid] + ((columnanombre) ? ' - '+fila[columnanombre] : '');
	}

	/**
	 * metodo nuevo: dibuja una matriz de checkboxes (filas x columnas) en el contenedor.
	 * Las celdas y cabeceras de columna llevan las clases tabla-td-CLAVE / tabla-th-CLAVE para poder
	 * reutilizar crearSeleccionablecolumnas y mostrarocultarcolumnas
	 *
	 * @param {string} idcomponente id del contenedor donde se dibuja la tabla
	 * @param {string} claseesquina clase de traduccion del texto de la esquina superior izquierda
	 * @param {Array} filas [{id, etiqueta}]
	 * @param {Array} columnas [{clave, etiqueta}] (la etiqueta puede llevar saltos de linea)
	 * @param {Function} estaactiva (idfila, clavecolumna) => true si el checkbox va marcado
	 * @param {Function} alcambiar (checkbox, idfila, clavecolumna) se invoca al hacer click en un checkbox
	 */
	crearMatriz(idcomponente, claseesquina, filas, columnas, estaactiva, alcambiar){

		switch_display_mode(idcomponente,'block','on');
		let contenedor = document.getElementById(idcomponente);
		contenedor.innerHTML = '';
		contenedor.className = '';

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
			th.className = 'tabla-th-'+columna.clave;
			th.style.whiteSpace = 'pre-line';
			th.textContent = columna.etiqueta;
			trcabecera.append(th);
		}
		cabecera.append(trcabecera);

		for (let fila of filas){
			let tr = document.createElement('tr');
			let thfila = document.createElement('th');
			thfila.className = 'tabla-fila-matriz';
			thfila.textContent = fila.etiqueta;
			tr.append(thfila);
			for (let columna of columnas){
				let td = document.createElement('td');
				td.className = 'tabla-td-'+columna.clave;
				let check = document.createElement('input');
				check.type = 'checkbox';
				check.checked = estaactiva(fila.id, columna.clave);
				check.title = fila.etiqueta+' / '+columna.etiqueta.replace(/\n/g, ' ');
				check.addEventListener('change', () => alcambiar(check, fila.id, columna.clave));
				td.append(check);
				tr.append(td);
			}
			cuerpo.append(tr);
		}

		contenedor.append(tabla);
		setLang();
	}

	/**
	 * metodo nuevo: crearSeleccionablecolumnas pone como texto de cada opcion la clave de la columna;
	 * este metodo la sustituye por la etiqueta legible (mismo orden que las columnas)
	 * @param {Array} columnas [{clave, etiqueta}]
	 */
	etiquetar_selector_columnas(columnas){
		let opciones = document.getElementById('seleccioncolumnas').options;
		for (let i=0;i<opciones.length && i<columnas.length;i++){
			opciones[i].textContent = columnas[i].etiqueta.replace(/\n/g, ' ');
		}
	}
}