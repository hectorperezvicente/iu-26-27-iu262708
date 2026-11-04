class funcionalidad extends AbstractEntidad{

	/**
	 * @param {string} esTest 'test' para crear la entidad sin pintar nada (pruebas)
	 */
	constructor(esTest=null){

		super();

		this.nombreentidad = 'funcionalidad';
		this.columnasamostrar = ['id_funcionalidad','nombre_funcionalidad','descrip_funcionalidad'];
		this.mostrarespecial = [];

		this.dom = new entity_dom_fields();
		this.validations = new entity_validations();
		this.access_functions = new ExternalAccess();

		if (esTest == 'test'){}
		else{
			// visualizar seccion tabla y botones
			document.getElementById('IU_manage_entity').style.display = 'block';
			// className y no classList.add: si no, al cambiar de entidad se acumulan los titulos
			document.getElementById('text_title_page').className = 'text_titulo_page_'+this.nombreentidad;
			// icono de ADD y selector de columnas visibles (funcionalidad_accion y rolaccionfuncionalidad los ocultan)
			this.dom.configurar_cabecera_gestion(true, true);

			// crear el formulario vacio
			document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();

			// busqueda en back con el formulario vacio
			this.SEARCH();
		}
	}

	/**
	 * formulario base de la entidad. Sin eventos: los pone colocarvalidaciones segun la accion
	 * @returns {string} html del formulario
	 */
	manual_form_creation(){
		var form_content = `
			<form id='form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>

				<label id="label_id_funcionalidad" class="label_id_funcionalidad">Id Funcionalidad</label>
				<input type='text' id='id_funcionalidad' name='id_funcionalidad'></input>
				<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
				<br>
				<label id="label_nombre_funcionalidad" class="label_nombre_funcionalidad">Nombre Funcionalidad</label>
				<input type='text' id='nombre_funcionalidad' name='nombre_funcionalidad'></input>
				<span id="span_error_nombre_funcionalidad"><a id="error_nombre_funcionalidad"></a></span>
				<br>
				<label id="label_descrip_funcionalidad" class="label_descrip_funcionalidad">Descripci\u00F3n Funcionalidad</label>
				<textarea rows="5" cols="33" id='descrip_funcionalidad' name='descrip_funcionalidad'></textarea>
				<span id="span_error_descrip_funcionalidad"><a id="error_descrip_funcionalidad"></a></span>
				<br>

			</form>
		`;
		return form_content;
	}

	/**
	 * muestra el error en el campo y devuelve el codigo
	 */
	error_campo(id, codigo){
		this.dom.mostrar_error_campo(id, codigo);
		return codigo;
	}

	/**
	 * muestra el exito en el campo y devuelve true
	 */
	exito_campo(id){
		this.dom.mostrar_exito_campo(id);
		return true;
	}

	ADD_nombre_funcionalidad_validation(){
		if (!(this.validations.min_size('nombre_funcionalidad',5))){
			return this.error_campo('nombre_funcionalidad','nombre_funcionalidad_min_size_ko');
		}
		if (!(this.validations.max_size('nombre_funcionalidad',48))){
			return this.error_campo('nombre_funcionalidad','nombre_funcionalidad_max_size_ko');
		}
		// solo letras, incluida la \u00F1
		if (!(this.validations.format('nombre_funcionalidad','^[A-Za-z\u00F1\u00D1]+$'))){
			return this.error_campo('nombre_funcionalidad','nombre_funcionalidad_format_ko');
		}
		return this.exito_campo('nombre_funcionalidad');
	}

	ADD_descrip_funcionalidad_validation(){
		if (!(this.validations.min_size('descrip_funcionalidad',5))){
			return this.error_campo('descrip_funcionalidad','descrip_funcionalidad_min_size_ko');
		}
		if (!(this.validations.max_size('descrip_funcionalidad',200))){
			return this.error_campo('descrip_funcionalidad','descrip_funcionalidad_max_size_ko');
		}
		// letras con \u00F1, espacio y signos de puntuacion (. , ; : ! ? \u00A1 \u00BF ( ) " ' -)
		if (!(this.validations.format('descrip_funcionalidad','^[A-Za-z\u00F1\u00D1 .,;:!?\u00A1\u00BF()"\'-]+$'))){
			return this.error_campo('descrip_funcionalidad','descrip_funcionalidad_format_ko');
		}
		return this.exito_campo('descrip_funcionalidad');
	}

	/**********************************************************************************************
		fields validations for EDIT (mismas reglas que ADD). Los campos de solo lectura (clave
		primaria y foto guardada) no se validan: el usuario no introduce esos datos
	***********************************************************************************************/

	EDIT_nombre_funcionalidad_validation(){
		return this.ADD_nombre_funcionalidad_validation();
	}

	EDIT_descrip_funcionalidad_validation(){
		return this.ADD_descrip_funcionalidad_validation();
	}

	/**********************************************************************************************
		fields validations for SEARCH (campos opcionales, valores parciales)
	***********************************************************************************************/

	SEARCH_id_funcionalidad_validation(){
		if (!(this.validations.max_size('id_funcionalidad',11))){
			return this.error_campo('id_funcionalidad','id_funcionalidad_max_size_ko');
		}
		if (!(this.validations.format('id_funcionalidad','^[0-9]*$'))){
			return this.error_campo('id_funcionalidad','id_funcionalidad_format_ko');
		}
		return this.exito_campo('id_funcionalidad');
	}

	SEARCH_nombre_funcionalidad_validation(){
		if (!(this.validations.max_size('nombre_funcionalidad',48))){
			return this.error_campo('nombre_funcionalidad','nombre_funcionalidad_max_size_ko');
		}
		if (!(this.validations.format('nombre_funcionalidad','^[A-Za-z\u00F1\u00D1]*$'))){
			return this.error_campo('nombre_funcionalidad','nombre_funcionalidad_format_ko');
		}
		return this.exito_campo('nombre_funcionalidad');
	}

	SEARCH_descrip_funcionalidad_validation(){
		if (!(this.validations.max_size('descrip_funcionalidad',200))){
			return this.error_campo('descrip_funcionalidad','descrip_funcionalidad_max_size_ko');
		}
		if (!(this.validations.format('descrip_funcionalidad','^[A-Za-z\u00F1\u00D1 .,;:!?\u00A1\u00BF()"\'-]*$'))){
			return this.error_campo('descrip_funcionalidad','descrip_funcionalidad_format_ko');
		}
		return this.exito_campo('descrip_funcionalidad');
	}

	/**********************************************************************************************
		submits
		@return {bool} true si todos los campos son correctos
		@return {object} {id_campo: resultado} si alguno falla
	***********************************************************************************************/

	/**
	 * ejecuta la validacion de la accion para los campos indicados
	 * @param {string} accion ADD / EDIT / SEARCH
	 * @param {Array} campos ids de los campos a validar
	 */
	submit_accion(accion, campos){
		var set_result = {};
		var result = true;

		for (let i=0;i<campos.length;i++){
			set_result[campos[i]] = this[accion+'_'+campos[i]+'_validation']();
			if (set_result[campos[i]] !== true){
				result = false;
			}
		}

		if (result){
			return true;
		}
		else{
			return set_result;
		}
	}

	// id_funcionalidad no se valida en ADD: es autoincremental y no se muestra
	ADD_submit_funcionalidad(){
		return this.submit_accion('ADD', ['nombre_funcionalidad', 'descrip_funcionalidad']);
	}

	EDIT_submit_funcionalidad(){
		return this.submit_accion('EDIT', ['nombre_funcionalidad', 'descrip_funcionalidad']);
	}

	SEARCH_submit_funcionalidad(){
		return this.submit_accion('SEARCH', ['id_funcionalidad', 'nombre_funcionalidad', 'descrip_funcionalidad']);
	}

	/**********************************************************************************************
		formularios por accion
	***********************************************************************************************/

	/**
	 * pone el titulo, pinta el formulario vacio y lo hace visible
	 * @param {string} accion
	 */
	preparar_formulario(accion){
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_'+this.nombreentidad+'_'+accion);
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form','block');
	}

	createForm_ADD(){
		this.preparar_formulario('ADD');

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.ADD();');

		// id_funcionalidad es autoincremental: lo asigna el back, no se muestra en ADD
		this.dom.hide_element_form('id_funcionalidad');

		this.dom.colocarvalidaciones('form_iu','ADD');
		this.dom.colocarboton('ADD');

		setLang();
	}

	/**
	 * @param {Object} fila datos de la fila a modificar
	 */
	createForm_EDIT(fila){
		this.preparar_formulario('EDIT');

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.EDIT_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.EDIT();');

		this.dom.rellenarvaloresform(fila);

		this.dom.colocarvalidaciones('form_iu','EDIT');

		// la clave primaria no se modifica
		this.dom.assign_property_value('id_funcionalidad','readonly','true');
		this.dom.quitar_validacion('id_funcionalidad');

		this.dom.colocarboton('EDIT');

		setLang();
	}

	createForm_SEARCH(){
		this.preparar_formulario('SEARCH');

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.SEARCH();');

		this.dom.colocarvalidaciones('form_iu','SEARCH');
		this.dom.colocarboton('SEARCH');

		setLang();
	}

	/**
	 * @param {Object} fila datos de la fila a borrar
	 */
	createForm_DELETE(fila){
		this.preparar_formulario('DELETE');

		this.dom.assign_property_value('form_iu','action','javascript:entidad.DELETE();');

		this.dom.rellenarvaloresform(fila);

		this.dom.colocartodosreadonly('form_iu');
		this.dom.colocarboton('DELETE');

		setLang();
	}

	/**
	 * @param {Object} fila datos de la fila a mostrar
	 */
	createForm_SHOWCURRENT(fila){
		this.preparar_formulario('SHOWCURRENT');

		this.dom.rellenarvaloresform(fila);

		this.dom.colocartodosreadonly('form_iu');
		// SHOWCURRENT no tiene boton de submit

		setLang();
	}

	/**
	 * REFACTORIZADO (AbstractEntidad no se puede modificar): la tabla se crea con la version de
	 * entity_dom_fields, que no rompe los iconos de las filas con apostrofos en sus datos
	 */
	crearTablaDatos(datos, mostrarespecial){
		this.dom.crearTablaDatosEntidad(this, datos, mostrarespecial);
	}

	/**
	 * metodo pedido en el enunciado. Esta entidad no transforma ninguna columna (mostrarespecial vacio)
	 * @param {string} atributo nombre del atributo
	 * @param {any} valorentrada valor original
	 * @returns {any} el mismo valor
	 */
	mostrarcambioatributo(atributo, valorentrada){
		return valorentrada;
	}

	/**
	 * nombre con el que lo invoca crearTablaDatos de AbstractEntidad (no modificable)
	 */
	cambiarmostrarespecial(columna, valor){
		return this.mostrarcambioatributo(columna, valor);
	}

}
