class rol extends AbstractEntidad{

	/**
	 * @param {string} esTest 'test' para crear la entidad sin pintar nada (pruebas)
	 */
	constructor(esTest=null){

		super();

		this.nombreentidad = 'rol';
		this.columnasamostrar = ['id_rol','rol_name','rol_description'];
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

				<label id="label_id_rol" class="label_id_rol">Id Rol</label>
				<input type='text' id='id_rol' name='id_rol'></input>
				<span id="span_error_id_rol"><a id="error_id_rol"></a></span>
				<br>
				<label id="label_rol_name" class="label_rol_name">Nombre Rol</label>
				<input type='text' id='rol_name' name='rol_name'></input>
				<span id="span_error_rol_name"><a id="error_rol_name"></a></span>
				<br>
				<label id="label_rol_description" class="label_rol_description">Descripci\u00F3n Rol</label>
				<textarea rows="5" cols="33" id='rol_description' name='rol_description'></textarea>
				<span id="span_error_rol_description"><a id="error_rol_description"></a></span>
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

	ADD_rol_name_validation(){
		if (!(this.validations.min_size('rol_name',5))){
			return this.error_campo('rol_name','rol_name_min_size_ko');
		}
		if (!(this.validations.max_size('rol_name',48))){
			return this.error_campo('rol_name','rol_name_max_size_ko');
		}
		// alfabetico: solo letras sin \u00F1 ni acentos, sin espacios
		if (!(this.validations.format('rol_name','^[A-Za-z]+$'))){
			return this.error_campo('rol_name','rol_name_format_ko');
		}
		return this.exito_campo('rol_name');
	}

	ADD_rol_description_validation(){
		if (!(this.validations.min_size('rol_description',5))){
			return this.error_campo('rol_description','rol_description_min_size_ko');
		}
		if (!(this.validations.max_size('rol_description',200))){
			return this.error_campo('rol_description','rol_description_max_size_ko');
		}
		// letras con \u00F1 y acentos, espacio y signos de puntuacion (. , ; : ! ? \u00A1 \u00BF ( ) " -)
		if (!(this.validations.format('rol_description','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F1 .,;:!?\u00A1\u00BF()"-]+$'))){
			return this.error_campo('rol_description','rol_description_format_ko');
		}
		return this.exito_campo('rol_description');
	}

	/**********************************************************************************************
		fields validations for EDIT (mismas reglas que ADD). Los campos de solo lectura (clave
		primaria y foto guardada) no se validan: el usuario no introduce esos datos
	***********************************************************************************************/

	EDIT_rol_name_validation(){
		return this.ADD_rol_name_validation();
	}

	EDIT_rol_description_validation(){
		return this.ADD_rol_description_validation();
	}

	/**********************************************************************************************
		fields validations for SEARCH (campos opcionales, valores parciales)
	***********************************************************************************************/

	SEARCH_id_rol_validation(){
		if (!(this.validations.max_size('id_rol',11))){
			return this.error_campo('id_rol','id_rol_max_size_ko');
		}
		if (!(this.validations.format('id_rol','^[0-9]*$'))){
			return this.error_campo('id_rol','id_rol_format_ko');
		}
		return this.exito_campo('id_rol');
	}

	SEARCH_rol_name_validation(){
		if (!(this.validations.max_size('rol_name',48))){
			return this.error_campo('rol_name','rol_name_max_size_ko');
		}
		if (!(this.validations.format('rol_name','^[A-Za-z]*$'))){
			return this.error_campo('rol_name','rol_name_format_ko');
		}
		return this.exito_campo('rol_name');
	}

	SEARCH_rol_description_validation(){
		if (!(this.validations.max_size('rol_description',200))){
			return this.error_campo('rol_description','rol_description_max_size_ko');
		}
		if (!(this.validations.format('rol_description','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F1 .,;:!?\u00A1\u00BF()"-]*$'))){
			return this.error_campo('rol_description','rol_description_format_ko');
		}
		return this.exito_campo('rol_description');
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

	// id_rol no se valida en ADD: es autoincremental y no se muestra
	ADD_submit_rol(){
		return this.submit_accion('ADD', ['rol_name', 'rol_description']);
	}

	EDIT_submit_rol(){
		return this.submit_accion('EDIT', ['rol_name', 'rol_description']);
	}

	SEARCH_submit_rol(){
		return this.submit_accion('SEARCH', ['id_rol', 'rol_name', 'rol_description']);
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

		// id_rol es autoincremental: lo asigna el back, no se muestra en ADD
		this.dom.hide_element_form('id_rol');

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
		this.dom.assign_property_value('id_rol','readonly','true');
		this.dom.quitar_validacion('id_rol');

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
