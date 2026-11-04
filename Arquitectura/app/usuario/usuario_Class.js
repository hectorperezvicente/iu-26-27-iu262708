class usuario extends AbstractEntidad{

	/**
	 * @param {string} esTest 'test' para crear la entidad sin pintar nada (pruebas)
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

	/**********************************************************************************************
		validaciones personalizadas (personalize_atributo)
	***********************************************************************************************/

	/**
	 * la letra del dni corresponde a su numero (numero % 23)
	 * @param {string} id id del campo
	 * @returns {bool}
	 */
	personalize_dni(id){
		let valor = document.getElementById(id).value;
		let letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
		let numero = parseInt(valor.substring(0,8), 10);
		return (letras.charAt(numero % 23) == valor.charAt(8));
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

	/**********************************************************************************************
		fields validations for ADD
		@return {string} codigo de error (campo_validacion_ko) o {bool} true si es correcto
	***********************************************************************************************/

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

	ADD_usuario_validation(){
		if (!(this.validations.min_size('usuario',5))){
			return this.error_campo('usuario','usuario_min_size_ko');
		}
		if (!(this.validations.max_size('usuario',45))){
			return this.error_campo('usuario','usuario_max_size_ko');
		}
		// solo letras sin acentos ni \u00F1
		if (!(this.validations.format('usuario','^[A-Za-z]+$'))){
    		return this.error_campo('usuario','usuario_format_ko');
		}
		return this.exito_campo('usuario');
	}

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

	/**********************************************************************************************
		fields validations for EDIT (mismas reglas que ADD). Los campos de solo lectura (clave
		primaria y foto guardada) no se validan: el usuario no introduce esos datos
	***********************************************************************************************/

	EDIT_usuario_validation(){
		return this.ADD_usuario_validation();
	}

	EDIT_contrasena_validation(){
		return this.ADD_contrasena_validation();
	}

	EDIT_id_rol_validation(){
		return this.ADD_id_rol_validation();
	}

	/**********************************************************************************************
		fields validations for SEARCH (campos opcionales, valores parciales)
	***********************************************************************************************/

	SEARCH_dni_validation(){
		if (!(this.validations.max_size('dni',9))){
			return this.error_campo('dni','dni_max_size_ko');
		}
		if (!(this.validations.format('dni','^[0-9A-Z]*$'))){
			return this.error_campo('dni','dni_format_ko');
		}
		return this.exito_campo('dni');
	}

	SEARCH_usuario_validation(){
		if (!(this.validations.max_size('usuario',45))){
			return this.error_campo('usuario','usuario_max_size_ko');
		}
		// en busqueda se permite vacio (* en lugar de +)
		if (!(this.validations.format('usuario','^[A-Za-z]*$'))){
    		return this.error_campo('usuario','usuario_format_ko');
		}
		return this.exito_campo('usuario');
	}

	SEARCH_contrasena_validation(){
		if (!(this.validations.max_size('contrasena',45))){
			return this.error_campo('contrasena','contrasena_max_size_ko');
		}
		// en busqueda se permite vacio (* en lugar de +)
		if (!(this.validations.format('contrasena','^[a-zA-Z]*$'))){
			return this.error_campo('contrasena','contrasena_format_ko');
		}
		return this.exito_campo('contrasena');
	}

	SEARCH_id_rol_validation(){
		if (!(this.validations.max_size('id_rol',11))){
			return this.error_campo('id_rol','id_rol_max_size_ko');
		}
		if (!(this.validations.format('id_rol','^[0-9]*$'))){
			return this.error_campo('id_rol','id_rol_format_ko');
		}
		return this.exito_campo('id_rol');
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

	ADD_submit_usuario(){
		return this.submit_accion('ADD', ['dni', 'usuario', 'contrasena', 'id_rol']);
	}

	EDIT_submit_usuario(){
		return this.submit_accion('EDIT', ['usuario', 'contrasena', 'id_rol']);
	}

	SEARCH_submit_usuario(){
		return this.submit_accion('SEARCH', ['dni', 'usuario', 'contrasena', 'id_rol']);
	}

	/**********************************************************************************************
		formularios por accion
	***********************************************************************************************/

	/**
	 * id_rol es FK de rol(id_rol): pide al back las filas de rol y devuelve las opciones del select
	 * @returns {Array} [{valor, texto}]
	 */
	async opciones_id_rol(){
		let respuesta = await this.access_functions.peticionBackGeneral('', 'rol', 'SEARCH');
		let filas = (respuesta['code'] == 'RECORDSET_DATOS') ? respuesta['resource'] : [];
		return filas.map(f => ({valor: f.id_rol, texto: f.id_rol+' ('+f.rol_name+')'}));
	}

	/**
	 * pone el titulo, pinta el formulario vacio y lo hace visible
	 * @param {string} accion
	 */
	preparar_formulario(accion){
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_'+this.nombreentidad+'_'+accion);
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form','block');
	}

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
	 * @param {Object} fila datos de la fila a modificar
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
	 * @param {Object} fila datos de la fila a borrar
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
	 * @param {Object} fila datos de la fila a mostrar
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
	 * REFACTORIZADO (AbstractEntidad no se puede modificar): la tabla se crea con la version de
	 * entity_dom_fields, que no rompe los iconos de las filas con apostrofos en sus datos
	 */
	crearTablaDatos(datos, mostrarespecial){
		this.dom.crearTablaDatosEntidad(this, datos, mostrarespecial);
	}

	/**
	 * metodo pedido en el enunciado: la contrasena no se muestra en la tabla
	 * @param {string} atributo nombre del atributo
	 * @param {any} valorentrada valor original
	 * @returns {any} valor transformado
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
	 * nombre con el que lo invoca crearTablaDatos de AbstractEntidad (no modificable)
	 */
	cambiarmostrarespecial(columna, valor){
		return this.mostrarcambioatributo(columna, valor);
	}

}
