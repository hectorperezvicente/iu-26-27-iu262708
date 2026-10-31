class funcionalidad_accion extends AbstractEntidad{
 
	constructor(esTest=null){
 
		super();
 
		this.columnasamostrar = ['id_funcionalidad','id_accion'];
		this.mostrarespecial = [];
		this.nombreentidad = 'funcionalidad_accion';
 
		this.dom = new entity_dom_fields();
		this.validations = new entity_validations();
		this.access_functions = new ExternalAccess();
 
		//init
		if (esTest == 'test'){}
		else{
			//visualizar seccion tabla y botones
			document.getElementById('IU_manage_entity').style.display = 'block';
			document.getElementById('text_title_page').className = 'text_titulo_page_'+this.nombreentidad;
 
			//crear el formulario vacio
			document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
 
			//invocar busqueda en back con el formulario vacio
			this.SEARCH();
		}
 
	}
 
	/**
	 * devuelve el html del formulario de la entidad (sin action ni onsubmit ni onblur/onchange:
	 * los pone cada createForm_<ACCION> con colocarvalidaciones)
	 * id_funcionalidad e id_accion son claves ajenas, por eso son selects; siempre llevan la opcion
	 * vacia ('') para que el SEARCH inicial y el ADD sin seleccionar envien un valor vacio al back
	 * @returns {string} html del formulario
	 */
	manual_form_creation(){
		var form_content = `
			<form id='form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>
 
				<label class="label_id_funcionalidad">Id Funcionalidad</label>
				<select id='id_funcionalidad' name='id_funcionalidad'>
					<option value=''></option>
				</select>
				<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
				<br>
 
				<label class="label_id_accion">Id Acción</label>
				<select id='id_accion' name='id_accion'>
					<option value=''></option>
				</select>
				<span id="span_error_id_accion"><a id="error_id_accion"></a></span>
				<br>
 
			</form>
		`;
		return form_content;
	}
 
	/**********************************************************************************************
		carga y bloqueo de los selects de claves ajenas
	***********************************************************************************************/
 
	/**
	 * carga los dos selects del formulario (funcionalidades y acciones) con las tuplas del back.
	 * Usa entity_dom_fields.cargar_select_fk, que muestra el id y el nombre de cada tupla sin necesitar
	 * saber como se llama la columna del nombre. Debe terminar ANTES de rellenarvaloresform.
	 */
	async cargar_selects(){
		await Promise.all([
			this.dom.cargar_select_fk('id_funcionalidad','funcionalidad','id_funcionalidad'),
			this.dom.cargar_select_fk('id_accion','accion','id_accion')
		]);
	}

	/**
	 * bloquea los dos select de la PK compuesta (se deja solo la opcion seleccionada, el valor sigue en el FormData)
	 */
	bloquear_selects(){
		this.dom.bloquear_select('id_funcionalidad');
		this.dom.bloquear_select('id_accion');
	}

	/**
	 * El back devuelve id_funcionalidad e id_accion como objetos (la fila completa de la entidad
	 * referenciada). Se deja solo el id antes de crear la tabla: la columna muestra el id en vez de
	 * [object Object], los onclick de EDIT/DELETE/SHOWCURRENT no llevan descripciones (traen
	 * saltos de linea que rompen el JS del atributo) y los formularios reciben un valor que encaja
	 * en el select.
	 * @param {Object} datos filas devueltas por el back
	 * @param {Array} mostrarespecial columnas con valor especial
	 */
	crearTablaDatos(datos, mostrarespecial){
		var claves = ['id_funcionalidad','id_accion'];
		for (let i=0;i<datos.length;i++){
			for (let j=0;j<claves.length;j++){
				let clave = claves[j];
				let valor = datos[i][clave];
				if (valor !== null && typeof valor == 'object'){
					datos[i][clave] = (valor[clave] !== undefined) ? valor[clave] : Object.values(valor)[0];
				}
			}
		}
		super.crearTablaDatos(datos, mostrarespecial);
	}
 
	/**********************************************************************************************
		utilidades de validacion
	***********************************************************************************************/
 
	/**
	 * muestra el error en el campo y devuelve el codigo
	 * @param {string} id id del campo
	 * @param {string} codigo codigo de error (campo_validacion_ko)
	 * @returns {string} codigo
	 */
	error_campo(id, codigo){
		this.dom.mostrar_error_campo(id, codigo);
		return codigo;
	}
 
	/**
	 * muestra el exito en el campo y devuelve true
	 * @param {string} id id del campo
	 * @returns {bool} true
	 */
	exito_campo(id){
		this.dom.mostrar_exito_campo(id);
		return true;
	}
 
	/**
	 * ejecuta la validacion de la accion para todos los campos del formulario
	 * @param {string} accion ADD / EDIT / SEARCH
	 * @returns {bool} true si todos son correctos
	 * @returns {object} {id_campo: resultado} si alguno falla
	 */
	submit_accion(accion){
		var campos = ['id_funcionalidad','id_accion'];
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
 
	/**********************************************************************************************
		fields validations for ADD
		@return {string} codigo de error (campo_validacion_ko) o {bool} true si es correcto
	***********************************************************************************************/
 
	ADD_id_funcionalidad_validation(){
		if (!(this.validations.min_size('id_funcionalidad',1))){
			return this.error_campo('id_funcionalidad','id_funcionalidad_min_size_ko');
		}
		if (!(this.validations.max_size('id_funcionalidad',11))){
			return this.error_campo('id_funcionalidad','id_funcionalidad_max_size_ko');
		}
		// solo digitos
		if (!(this.validations.format('id_funcionalidad','^[0-9]+$'))){
			return this.error_campo('id_funcionalidad','id_funcionalidad_format_ko');
		}
		return this.exito_campo('id_funcionalidad');
	}
 
	ADD_id_accion_validation(){
		if (!(this.validations.min_size('id_accion',1))){
			return this.error_campo('id_accion','id_accion_min_size_ko');
		}
		if (!(this.validations.max_size('id_accion',11))){
			return this.error_campo('id_accion','id_accion_max_size_ko');
		}
		// solo digitos
		if (!(this.validations.format('id_accion','^[0-9]+$'))){
			return this.error_campo('id_accion','id_accion_format_ko');
		}
		return this.exito_campo('id_accion');
	}
 
	/**
		@return	{bool} true if all fields validations are ok or
		@return {object} object with the ids of elements and error code if a field validation is not ok
	*/
	ADD_submit_funcionalidad_accion(){
		return this.submit_accion('ADD');
	}
 
	/**********************************************************************************************
		fields validations for EDIT (mismas reglas que ADD; los dos campos forman la PK, van
		bloqueados pero se validan igual porque los tests de EDIT esperan los mismos errores)
	***********************************************************************************************/
 
	EDIT_id_funcionalidad_validation(){
		return this.ADD_id_funcionalidad_validation();
	}
 
	EDIT_id_accion_validation(){
		return this.ADD_id_accion_validation();
	}
 
	EDIT_submit_funcionalidad_accion(){
		return this.submit_accion('EDIT');
	}
 
	/**********************************************************************************************
		fields validations for SEARCH (campos opcionales, se permiten valores parciales)
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
 
	SEARCH_id_accion_validation(){
		if (!(this.validations.max_size('id_accion',11))){
			return this.error_campo('id_accion','id_accion_max_size_ko');
		}
		if (!(this.validations.format('id_accion','^[0-9]*$'))){
			return this.error_campo('id_accion','id_accion_format_ko');
		}
		return this.exito_campo('id_accion');
	}
 
	SEARCH_submit_funcionalidad_accion(){
		return this.submit_accion('SEARCH');
	}
 
	/**********************************************************************************************
		construccion de formularios por accion
		(async porque hay que cargar los selects del back antes de rellenar valores)
	***********************************************************************************************/
 
	/**
	 * Construye el formulario para EDIT partiendo del formulario basico definido manualmente
	 * @param {Object} fila objeto con los datos de la ocurrencia a modificar
	 */
	async createForm_EDIT(fila){
 
		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_accion_EDIT');
		// limpiar el formulario y cargar los selects
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		await this.cargar_selects();
		// poner visible el formulario
		this.dom.show_element('Div_IU_form','block');
 
		// rellenar onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.EDIT_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');
 
		// rellenar valores
		this.dom.rellenarvaloresform(fila);
 
		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','EDIT');
 
		// poner inactivos los campos correspondientes (los dos forman la PK)
		this.bloquear_selects();
 
		// colocar boton de submit
		this.dom.colocarboton('EDIT');
 
		setLang();
 
	}
 
	async createForm_DELETE(fila){
		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_accion_DELETE');
		// limpiar el formulario y cargar los selects
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		await this.cargar_selects();
		// poner visible el formulario
		this.dom.show_element('Div_IU_form','block');
 
		// rellenar action
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');
 
		// rellenar valores
		this.dom.rellenarvaloresform(fila);
 
		// poner inactivos los campos correspondientes
		this.dom.colocartodosreadonly('form_iu');
		this.bloquear_selects();
 
		// colocar boton de submit
		this.dom.colocarboton('DELETE');
 
		setLang();
 
	}
 
	async createForm_SHOWCURRENT(fila){
		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_accion_SHOWCURRENT');
		// limpiar el formulario y cargar los selects
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		await this.cargar_selects();
		// poner visible el formulario
		this.dom.show_element('Div_IU_form','block');
 
		// rellenar valores
		this.dom.rellenarvaloresform(fila);
 
		// poner inactivos los campos correspondientes
		this.dom.colocartodosreadonly('form_iu');
		this.bloquear_selects();
 
		setLang();
 
	}
 
	async createForm_ADD(){
		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_accion_ADD');
		// limpiar el formulario y cargar los selects
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		await this.cargar_selects();
		// poner visible el formulario
		this.dom.show_element('Div_IU_form','block');
 
		// poner onsubmit
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
 
		// poner action
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');
 
		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','ADD');
 
		// colocar boton de submit
		this.dom.colocarboton('ADD');
 
		setLang();
	}
 
	async createForm_SEARCH(){
		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_accion_SEARCH');
		// limpiar el formulario y cargar los selects
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		await this.cargar_selects();
		// poner visible el formulario
		this.dom.show_element('Div_IU_form','block');
 
		// poner onsubmit
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
 
		// poner action
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.SEARCH();');
 
		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','SEARCH');
 
		// colocar boton de submit
		this.dom.colocarboton('SEARCH');
 
		setLang();
 
	}
 
	/**
	 * transforma el valor de la columna a mostrar en la tabla de datos de la entidad del back
	 * (funcionalidad_accion no tiene columnas especiales: se devuelve el valor tal cual).
	 * El nombre cambiarmostrarespecial es el que invoca AbstractEntidad.crearTablaDatos
	 *
	 * @param {string} columna nombre de la columna a modificar
	 * @param {any} valor valor inicial de la columna
	 * @returns {any} nuevo valor transformado de la columna
	 */
	cambiarmostrarespecial(columna, valor){
		return valor;
	}
 
}