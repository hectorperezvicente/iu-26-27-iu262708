class rolaccionfuncionalidad extends AbstractEntidad{

	constructor(esTest=null){

		super();

		this.columnasamostrar = ['id_funcionalidad','id_accion','id_rol'];
		this.mostrarespecial = [];
		this.nombreentidad = 'rolaccionfuncionalidad';

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
	 * devuelve el html del formulario de la entidad (sin action ni onsubmit ni onchange:
	 * los pone cada createForm_<ACCION> con colocarvalidaciones).
	 * Los tres campos son claves ajenas (y a la vez la PK compuesta), por eso son select; cada uno
	 * lleva la opcion vacia ('') para que el SEARCH inicial y el ADD sin seleccionar envien un valor vacio
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

				<label class="label_id_rol">Id Rol</label>
				<select id='id_rol' name='id_rol'>
					<option value=''></option>
				</select>
				<span id="span_error_id_rol"><a id="error_id_rol"></a></span>
				<br>

			</form>
		`;
		return form_content;
	}

	/**********************************************************************************************
		carga de los select (claves ajenas) y datos de la tabla
	***********************************************************************************************/

	/**
	 * carga en los tres select las opciones de funcionalidad, accion y rol que hay en el back.
	 * Debe terminar ANTES de rellenarvaloresform, que asigna el value a los select.
	 */
	async cargar_selects(){
		await Promise.all([
			this.dom.cargar_select_fk('id_funcionalidad','funcionalidad','id_funcionalidad'),
			this.dom.cargar_select_fk('id_accion','accion','id_accion'),
			this.dom.cargar_select_fk('id_rol','rol','id_rol')
		]);
	}

	/**
	 * bloquea los tres select de la PK compuesta (se deja solo la opcion seleccionada, el valor sigue en el FormData)
	 */
	bloquear_selects(){
		this.dom.bloquear_select('id_funcionalidad');
		this.dom.bloquear_select('id_accion');
		this.dom.bloquear_select('id_rol');
	}

	/**
	 * El back devuelve cada clave ajena como objeto (la tupla de la entidad relacionada). Se deja solo
	 * el id antes de crear la tabla: las columnas muestran el id en vez de [object Object], los onclick de
	 * EDIT/DELETE/SHOWCURRENT no arrastran descripciones (pueden traer &#13;&#10;, que rompe el JS del
	 * atributo) y los formularios reciben un valor que encaja en el select.
	 * @param {Object} datos filas devueltas por el back
	 * @param {Array} mostrarespecial columnas con valor especial
	 */
	crearTablaDatos(datos, mostrarespecial){
		for (let i=0;i<datos.length;i++){
			for (let c=0;c<this.columnasamostrar.length;c++){
				let columna = this.columnasamostrar[c];
				let valor = datos[i][columna];
				if (valor !== null && typeof valor == 'object'){
					datos[i][columna] = (valor[columna] !== undefined) ? valor[columna] : Object.values(valor)[0];
				}
			}
		}
		super.crearTablaDatos(datos, mostrarespecial);
	}

	/**********************************************************************************************
		validaciones
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
	 * validacion comun a los tres campos (id numerico de hasta 11 digitos)
	 * @param {string} campo id del campo (id_funcionalidad / id_accion / id_rol); el codigo de error es campo_validacion_ko
	 * @param {bool} obligatorio true en ADD y EDIT (no puede estar vacio y solo digitos), false en SEARCH (valores parciales)
	 * @returns {string} codigo de error o {bool} true si es correcto
	 */
	validar_id_clave_ajena(campo, obligatorio){
		if (obligatorio && !(this.validations.min_size(campo,1))){
			return this.error_campo(campo, campo+'_min_size_ko');
		}
		if (!(this.validations.max_size(campo,11))){
			return this.error_campo(campo, campo+'_max_size_ko');
		}
		// solo digitos
		if (!(this.validations.format(campo, obligatorio ? '^[0-9]+$' : '^[0-9]*$'))){
			return this.error_campo(campo, campo+'_format_ko');
		}
		return this.exito_campo(campo);
	}

	/**
	 * ejecuta la validacion de la accion para todos los campos del formulario
	 * @param {string} accion ADD / EDIT / SEARCH
	 * @returns {bool} true si todos son correctos
	 * @returns {object} {id_campo: resultado} si alguno falla
	 */
	submit_accion(accion){
		var campos = ['id_funcionalidad','id_accion','id_rol'];
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
		return this.validar_id_clave_ajena('id_funcionalidad', true);
	}

	ADD_id_accion_validation(){
		return this.validar_id_clave_ajena('id_accion', true);
	}

	ADD_id_rol_validation(){
		return this.validar_id_clave_ajena('id_rol', true);
	}

	/**
		@return	{bool} true if all fields validations are ok or
		@return {object} object with the ids of elements and error code if a field validation is not ok
	*/
	ADD_submit_rolaccionfuncionalidad(){
		return this.submit_accion('ADD');
	}

	/**********************************************************************************************
		fields validations for EDIT (mismas reglas que ADD; los tres campos son la PK y van bloqueados
		pero se validan igual porque los tests de EDIT esperan los mismos errores)
	***********************************************************************************************/

	EDIT_id_funcionalidad_validation(){
		return this.ADD_id_funcionalidad_validation();
	}

	EDIT_id_accion_validation(){
		return this.ADD_id_accion_validation();
	}

	EDIT_id_rol_validation(){
		return this.ADD_id_rol_validation();
	}

	EDIT_submit_rolaccionfuncionalidad(){
		return this.submit_accion('EDIT');
	}

	/**********************************************************************************************
		fields validations for SEARCH (campos opcionales, se permiten valores parciales)
	***********************************************************************************************/

	SEARCH_id_funcionalidad_validation(){
		return this.validar_id_clave_ajena('id_funcionalidad', false);
	}

	SEARCH_id_accion_validation(){
		return this.validar_id_clave_ajena('id_accion', false);
	}

	SEARCH_id_rol_validation(){
		return this.validar_id_clave_ajena('id_rol', false);
	}

	SEARCH_submit_rolaccionfuncionalidad(){
		return this.submit_accion('SEARCH');
	}

	/**********************************************************************************************
		construccion de formularios por accion
		(async porque hay que cargar los select del back antes de rellenar valores)
	***********************************************************************************************/

	/**
	 * Construye el formulario para EDIT partiendo del formulario basico definido manualmente
	 * @param {Object} fila objeto con los datos de la ocurrencia a modificar
	 */
	async createForm_EDIT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_EDIT');
		// limpiar el formulario y cargar los select
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

		// poner inactivos los campos correspondientes (los tres forman la PK)
		this.dom.colocartodosreadonly('form_iu');
		this.bloquear_selects();

		// colocar boton de submit
		this.dom.colocarboton('EDIT');

		setLang();

	}

	async createForm_DELETE(fila){
		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_DELETE');
		// limpiar el formulario y cargar los select
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
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_SHOWCURRENT');
		// limpiar el formulario y cargar los select
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
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_ADD');
		// limpiar el formulario y cargar los select
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
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_SEARCH');
		// limpiar el formulario y cargar los select
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
	 * (rolaccionfuncionalidad no tiene columnas especiales: se devuelve el valor tal cual).
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