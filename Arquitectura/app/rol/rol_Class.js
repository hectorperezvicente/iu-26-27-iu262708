/**
 * entidad rol
 */
class rol extends AbstractEntidad{

	/**
	 * crea la entidad, muestra su gestion y carga los datos
	 * @param {string} esTest 'test' si se crea para los test
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
			// className para que no se acumulen los titulos
			document.getElementById('text_title_page').className = 'text_titulo_page_'+this.nombreentidad;
			// mostrar icono de ADD y selector de columnas
			this.dom.configurar_cabecera_gestion(true, true);

			// crear el formulario vacio
			document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();

			// busqueda inicial
			this.SEARCH();
		}
	}

	/**
	 * html del formulario de la entidad
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
	 * marca el campo con error
	 * @param {string} id id del campo
	 * @param {string} codigo codigo de error
	 * @returns {string} el codigo de error
	 */
	error_campo(id, codigo){
		this.dom.mostrar_error_campo(id, codigo);
		return codigo;
	}

	/**
	 * marca el campo como correcto
	 * @param {string} id id del campo
	 * @returns {boolean} true
	 */
	exito_campo(id){
		this.dom.mostrar_exito_campo(id);
		return true;
	}

	/**
	 * valida rol_name en ADD (entre 5 y 48 caracteres, formato)
	 * @returns {string|boolean} codigo de error o true
	 */
	ADD_rol_name_validation(){
		if (!(this.validations.min_size('rol_name',5))){
			return this.error_campo('rol_name','rol_name_min_size_ko');
		}
		if (!(this.validations.max_size('rol_name',48))){
			return this.error_campo('rol_name','rol_name_max_size_ko');
		}
		// solo letras, sin tildes, enie ni espacios
		if (!(this.validations.format('rol_name','^[A-Za-z]+$'))){
			return this.error_campo('rol_name','rol_name_format_ko');
		}
		return this.exito_campo('rol_name');
	}

	/**
	 * valida rol_description en ADD (entre 5 y 200 caracteres, formato)
	 * @returns {string|boolean} codigo de error o true
	 */
	ADD_rol_description_validation(){
		if (!(this.validations.min_size('rol_description',5))){
			return this.error_campo('rol_description','rol_description_min_size_ko');
		}
		if (!(this.validations.max_size('rol_description',200))){
			return this.error_campo('rol_description','rol_description_max_size_ko');
		}
		// letras, tildes, espacios y signos de puntuacion
		if (!(this.validations.format('rol_description','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F1 .,;:!?\u00A1\u00BF()"-]+$'))){
			return this.error_campo('rol_description','rol_description_format_ko');
		}
		return this.exito_campo('rol_description');
	}

	// ---------- validaciones EDIT ----------

	/**
	 * valida rol_name en EDIT, igual que en ADD
	 * @returns {string|boolean} codigo de error o true
	 */
	EDIT_rol_name_validation(){
		return this.ADD_rol_name_validation();
	}

	/**
	 * valida rol_description en EDIT, igual que en ADD
	 * @returns {string|boolean} codigo de error o true
	 */
	EDIT_rol_description_validation(){
		return this.ADD_rol_description_validation();
	}

	// ---------- validaciones SEARCH ----------

	/**
	 * valida id_rol en SEARCH (max 11 caracteres, formato). Puede ir vacio
	 * @returns {string|boolean} codigo de error o true
	 */
	SEARCH_id_rol_validation(){
		if (!(this.validations.max_size('id_rol',11))){
			return this.error_campo('id_rol','id_rol_max_size_ko');
		}
		if (!(this.validations.format('id_rol','^[0-9]*$'))){
			return this.error_campo('id_rol','id_rol_format_ko');
		}
		return this.exito_campo('id_rol');
	}

	/**
	 * valida rol_name en SEARCH (max 48 caracteres, formato). Puede ir vacio
	 * @returns {string|boolean} codigo de error o true
	 */
	SEARCH_rol_name_validation(){
		if (!(this.validations.max_size('rol_name',48))){
			return this.error_campo('rol_name','rol_name_max_size_ko');
		}
		if (!(this.validations.format('rol_name','^[A-Za-z]*$'))){
			return this.error_campo('rol_name','rol_name_format_ko');
		}
		return this.exito_campo('rol_name');
	}

	/**
	 * valida rol_description en SEARCH (max 200 caracteres, formato). Puede ir vacio
	 * @returns {string|boolean} codigo de error o true
	 */
	SEARCH_rol_description_validation(){
		if (!(this.validations.max_size('rol_description',200))){
			return this.error_campo('rol_description','rol_description_max_size_ko');
		}
		if (!(this.validations.format('rol_description','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F1 .,;:!?\u00A1\u00BF()"-]*$'))){
			return this.error_campo('rol_description','rol_description_format_ko');
		}
		return this.exito_campo('rol_description');
	}

	// ---------- submits ----------

	/**
	 * valida la lista de campos con las validaciones de la accion
	 * @param {string} accion ADD, EDIT, SEARCH...
	 * @param {Array} campos ids de los campos
	 * @returns {boolean|Object} true o {campo: resultado}
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

	/**
	 * valida todos los campos del formulario de ADD
	 * @returns {boolean|Object} true o {campo: resultado}
	 */
	ADD_submit_rol(){
		return this.submit_accion('ADD', ['rol_name', 'rol_description']);
	}

	/**
	 * valida todos los campos del formulario de EDIT
	 * @returns {boolean|Object} true o {campo: resultado}
	 */
	EDIT_submit_rol(){
		return this.submit_accion('EDIT', ['rol_name', 'rol_description']);
	}

	/**
	 * valida todos los campos del formulario de SEARCH
	 * @returns {boolean|Object} true o {campo: resultado}
	 */
	SEARCH_submit_rol(){
		return this.submit_accion('SEARCH', ['id_rol', 'rol_name', 'rol_description']);
	}

	// ---------- formularios ----------

	/**
	 * pone el titulo y muestra el formulario vacio
	 * @param {string} accion ADD, EDIT, SEARCH...
	 */
	preparar_formulario(accion){
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_'+this.nombreentidad+'_'+accion);
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form','block');
	}

	/**
	 * formulario de ADD
	 */
	createForm_ADD(){
		this.preparar_formulario('ADD');

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.ADD();');

		// id_rol lo pone el back
		this.dom.hide_element_form('id_rol');

		this.dom.colocarvalidaciones('form_iu','ADD');
		this.dom.colocarboton('ADD');

		setLang();
	}

	/**
	 * formulario de EDIT con los datos de la fila
	 * @param {Object} fila datos de la fila
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

	/**
	 * formulario de SEARCH
	 */
	createForm_SEARCH(){
		this.preparar_formulario('SEARCH');

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.SEARCH();');

		this.dom.colocarvalidaciones('form_iu','SEARCH');
		this.dom.colocarboton('SEARCH');

		setLang();
	}

	/**
	 * formulario de DELETE, todo de solo lectura
	 * @param {Object} fila datos de la fila
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
	 * formulario de SHOWCURRENT, todo de solo lectura
	 * @param {Object} fila datos de la fila
	 */
	createForm_SHOWCURRENT(fila){
		this.preparar_formulario('SHOWCURRENT');

		this.dom.rellenarvaloresform(fila);

		this.dom.colocartodosreadonly('form_iu');
		// SHOWCURRENT no tiene boton de submit

		setLang();
	}

	/**
	 * refactorizado: pinta la tabla con crearTablaDatosEntidad
	 * @param {Array} datos tuplas del back
	 * @param {Array} mostrarespecial columnas con formato especial
	 */
	crearTablaDatos(datos, mostrarespecial){
		this.dom.crearTablaDatosEntidad(this, datos, mostrarespecial);
	}

	/**
	 * cambia como se muestra un atributo en la tabla
	 * @param {string} atributo atributo
	 * @param {*} valorentrada valor que viene del back
	 * @returns {*} valor a mostrar
	 */
	mostrarcambioatributo(atributo, valorentrada){
		return valorentrada;
	}

	/**
	 * lo llama crearTablaDatos de AbstractEntidad
	 * @param {string} columna atributo
	 * @param {*} valor valor del atributo
	 * @returns {*} valor a mostrar
	 */
	cambiarmostrarespecial(columna, valor){
		return this.mostrarcambioatributo(columna, valor);
	}

}
