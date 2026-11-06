/**
 * entidad usuario
 */
class usuario extends AbstractEntidad{

	/**
	 * crea la entidad, muestra su gestion y carga los datos
	 * @param {string} esTest 'test' si se crea para los test
	 */
	constructor(esTest=null){

		super();

		this.nombreentidad = 'usuario';
		this.columnasamostrar = ['dni','usuario','id_rol'];
		this.mostrarespecial = ['contrasena'];

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

				<label id="label_dni" class="label_dni">DNI</label>
				<input type='text' id='dni' name='dni'></input>
				<span id="span_error_dni"><a id="error_dni"></a></span>
				<br>
				<label id="label_usuario" class="label_usuario">Usuario</label>
				<input type='text' id='usuario' name='usuario'></input>
				<span id="span_error_usuario"><a id="error_usuario"></a></span>
				<br>
				<label id="label_contrasena" class="label_contrasena">Contrase\u00F1a</label>
				<input type='password' id='contrasena' name='contrasena'></input>
				<span id="span_error_contrasena"><a id="error_contrasena"></a></span>
				<br>
				<label id="label_id_rol" class="label_id_rol">Rol</label>
				<!-- id_rol es FK de rol(id_rol): select cargado desde el back en createForm -->
				<select id='id_rol' name='id_rol'></select>
				<span id="span_error_id_rol"><a id="error_id_rol"></a></span>
				<br>

			</form>
		`;
		return form_content;
	}

	// ---------- validaciones personalizadas ----------

	/**
	 * la letra del dni es la que le corresponde al numero
	 * @param {string} id id del campo
	 * @returns {boolean}
	 */
	personalize_dni(id){
		let valor = document.getElementById(id).value;
		let letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
		let numero = parseInt(valor.substring(0,8), 10);
		return (letras.charAt(numero % 23) == valor.charAt(8));
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

	// ---------- validaciones ADD ----------

	/**
	 * valida dni en ADD (9 caracteres, formato, letra del dni)
	 * @returns {string|boolean} codigo de error o true
	 */
	ADD_dni_validation(){
		if (!(this.validations.min_size('dni',9))){
			return this.error_campo('dni','dni_min_size_ko');
		}
		if (!(this.validations.max_size('dni',9))){
			return this.error_campo('dni','dni_max_size_ko');
		}
		// 8 numeros y una letra mayuscula
		if (!(this.validations.format('dni','^[0-9]{8}[A-Z]$'))){
			return this.error_campo('dni','dni_format_ko');
		}
		if (!(this.personalize_dni('dni'))){
			return this.error_campo('dni','dni_personalized_ko');
		}
		return this.exito_campo('dni');
	}

	/**
	 * valida usuario en ADD (entre 5 y 45 caracteres, formato)
	 * @returns {string|boolean} codigo de error o true
	 */
	ADD_usuario_validation(){
		if (!(this.validations.min_size('usuario',5))){
			return this.error_campo('usuario','usuario_min_size_ko');
		}
		if (!(this.validations.max_size('usuario',45))){
			return this.error_campo('usuario','usuario_max_size_ko');
		}
		// solo letras, sin tildes ni enie
		if (!(this.validations.format('usuario','^[A-Za-z]+$'))){
    		return this.error_campo('usuario','usuario_format_ko');
		}
		return this.exito_campo('usuario');
	}

	/**
	 * valida contrasena en ADD (entre 8 y 45 caracteres, formato)
	 * @returns {string|boolean} codigo de error o true
	 */
	ADD_contrasena_validation(){
		if (document.getElementById('contrasena').value.length == 0){
			return this.exito_campo('contrasena');
		}
		if (!(this.validations.min_size('contrasena',8))){
			return this.error_campo('contrasena','contrasena_min_size_ko');
		}
		if (!(this.validations.max_size('contrasena',45))){
			return this.error_campo('contrasena','contrasena_max_size_ko');
		}
		if (!(this.validations.format('contrasena','^[a-zA-Z]+$'))){
    		return this.error_campo('contrasena','contrasena_format_ko');
		}
		return this.exito_campo('contrasena');
	}

	/**
	 * valida id_rol en ADD (entre 1 y 11 caracteres, formato)
	 * @returns {string|boolean} codigo de error o true
	 */
	ADD_id_rol_validation(){
		if (!(this.validations.min_size('id_rol',1))){
			return this.error_campo('id_rol','id_rol_min_size_ko');
		}
		if (!(this.validations.max_size('id_rol',11))){
			return this.error_campo('id_rol','id_rol_max_size_ko');
		}
		// solo digitos
		if (!(this.validations.format('id_rol','^[0-9]+$'))){
			return this.error_campo('id_rol','id_rol_format_ko');
		}
		return this.exito_campo('id_rol');
	}

	// ---------- validaciones EDIT ----------

	/**
	 * valida usuario en EDIT, igual que en ADD
	 * @returns {string|boolean} codigo de error o true
	 */
	EDIT_usuario_validation(){
		return this.ADD_usuario_validation();
	}

	/**
	 * valida contrasena en EDIT, igual que en ADD
	 * @returns {string|boolean} codigo de error o true
	 */
	EDIT_contrasena_validation(){
		return this.ADD_contrasena_validation();
	}

	/**
	 * valida id_rol en EDIT, igual que en ADD
	 * @returns {string|boolean} codigo de error o true
	 */
	EDIT_id_rol_validation(){
		return this.ADD_id_rol_validation();
	}

	// ---------- validaciones SEARCH ----------

	/**
	 * valida dni en SEARCH (max 9 caracteres, formato). Puede ir vacio
	 * @returns {string|boolean} codigo de error o true
	 */
	SEARCH_dni_validation(){
		if (!(this.validations.max_size('dni',9))){
			return this.error_campo('dni','dni_max_size_ko');
		}
		if (!(this.validations.format('dni','^[0-9A-Z]*$'))){
			return this.error_campo('dni','dni_format_ko');
		}
		return this.exito_campo('dni');
	}

	/**
	 * valida usuario en SEARCH (max 45 caracteres, formato). Puede ir vacio
	 * @returns {string|boolean} codigo de error o true
	 */
	SEARCH_usuario_validation(){
		if (!(this.validations.max_size('usuario',45))){
			return this.error_campo('usuario','usuario_max_size_ko');
		}
		// en la busqueda puede ir vacio
		if (!(this.validations.format('usuario','^[A-Za-z]*$'))){
    		return this.error_campo('usuario','usuario_format_ko');
		}
		return this.exito_campo('usuario');
	}

	/**
	 * valida contrasena en SEARCH (max 45 caracteres, formato). Puede ir vacio
	 * @returns {string|boolean} codigo de error o true
	 */
	SEARCH_contrasena_validation(){
		if (!(this.validations.max_size('contrasena',45))){
			return this.error_campo('contrasena','contrasena_max_size_ko');
		}
		// en la busqueda puede ir vacio
		if (!(this.validations.format('contrasena','^[a-zA-Z]*$'))){
			return this.error_campo('contrasena','contrasena_format_ko');
		}
		return this.exito_campo('contrasena');
	}

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
	ADD_submit_usuario(){
		return this.submit_accion('ADD', ['dni', 'usuario', 'contrasena', 'id_rol']);
	}

	/**
	 * valida todos los campos del formulario de EDIT
	 * @returns {boolean|Object} true o {campo: resultado}
	 */
	EDIT_submit_usuario(){
		return this.submit_accion('EDIT', ['usuario', 'contrasena', 'id_rol']);
	}

	/**
	 * valida todos los campos del formulario de SEARCH
	 * @returns {boolean|Object} true o {campo: resultado}
	 */
	SEARCH_submit_usuario(){
		return this.submit_accion('SEARCH', ['dni', 'usuario', 'contrasena', 'id_rol']);
	}

	// ---------- formularios ----------

	/**
	 * opciones del select de id_rol (roles del back)
	 * @returns {Array} opciones
	 */
	async opciones_id_rol(){
		let respuesta = await this.access_functions.peticionBackGeneral('', 'rol', 'SEARCH');
		let filas = (respuesta['code'] == 'RECORDSET_DATOS') ? respuesta['resource'] : [];
		return filas.map(f => ({valor: f.id_rol, texto: f.id_rol+' ('+f.rol_name+')'}));
	}

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
	 * @returns {Promise<void>}
	 */
	async createForm_ADD(){
		this.preparar_formulario('ADD');
		this.dom.crearOpcionesSelect('id_rol', await this.opciones_id_rol(), 'text_opcion_seleccionar');

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.ADD();');

		this.dom.colocarvalidaciones('form_iu','ADD');
		this.dom.colocarboton('ADD');

		setLang();
	}

	/**
	 * formulario de EDIT con los datos de la fila
	 * @param {Object} fila datos de la fila
	 * @returns {Promise<void>}
	 */
	async createForm_EDIT(fila){
		this.preparar_formulario('EDIT');
		this.dom.crearOpcionesSelect('id_rol', await this.opciones_id_rol());

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.EDIT_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.EDIT();');

		this.dom.rellenarvaloresform(fila);

		this.dom.colocarvalidaciones('form_iu','EDIT');

		// la clave primaria no se modifica
		this.dom.assign_property_value('dni','readonly','true');
		this.dom.quitar_validacion('dni');

		this.dom.colocarboton('EDIT');

		setLang();
	}

	/**
	 * formulario de SEARCH
	 * @returns {Promise<void>}
	 */
	async createForm_SEARCH(){
		this.preparar_formulario('SEARCH');
		this.dom.crearOpcionesSelect('id_rol', await this.opciones_id_rol(), 'text_opcion_todos');

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
		this.dom.crearOpcionesSelect('id_rol', [{valor: fila.id_rol, texto: fila.id_rol}]);

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
		this.dom.crearOpcionesSelect('id_rol', [{valor: fila.id_rol, texto: fila.id_rol}]);

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
		switch(atributo){
			case 'contrasena':
				return '********';
			default:
				return valorentrada;
		}
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
