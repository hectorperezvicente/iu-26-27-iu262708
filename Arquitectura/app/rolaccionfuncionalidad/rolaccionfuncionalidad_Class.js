/**
 * entidad rolaccionfuncionalidad (matriz con desplegable de rol)
 */
class rolaccionfuncionalidad extends AbstractEntidad{

	/**
	 * crea la entidad, muestra su gestion y pinta la matriz
	 * @param {string} esTest 'test' si se crea para los test
	 */
	constructor(esTest=null){

		super();

		this.nombreentidad = 'rolaccionfuncionalidad';
		this.rol_actual = '';
		this.filtro = {id_funcionalidad: '', id_accion: '', id_rol: ''};
		this.columnasamostrar = ['id_funcionalidad','id_accion','id_rol'];
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
			// con la matriz no hay icono de ADD ni selector de columnas
			this.dom.configurar_cabecera_gestion(false, false);

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

				<label id="label_id_funcionalidad" class="label_id_funcionalidad">Funcionalidad</label>
				<!-- id_funcionalidad es FK de funcionalidad_accion(id_funcionalidad, id_accion): select cargado desde el back en createForm -->
				<select id='id_funcionalidad' name='id_funcionalidad'></select>
				<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
				<br>
				<label id="label_id_accion" class="label_id_accion">Acci\u00F3n</label>
				<!-- id_accion es FK de funcionalidad_accion(id_funcionalidad, id_accion): select cargado desde el back en createForm -->
				<select id='id_accion' name='id_accion'></select>
				<span id="span_error_id_accion"><a id="error_id_accion"></a></span>
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

	// ---------- validaciones SEARCH ----------

	/**
	 * valida id_funcionalidad en SEARCH (max 11 caracteres, formato). Puede ir vacio
	 * @returns {string|boolean} codigo de error o true
	 */
	SEARCH_id_funcionalidad_validation(){
		if (!(this.validations.max_size('id_funcionalidad',11))){
			return this.error_campo('id_funcionalidad','id_funcionalidad_max_size_ko');
		}
		if (!(this.validations.format('id_funcionalidad','^[0-9]*$'))){
			return this.error_campo('id_funcionalidad','id_funcionalidad_format_ko');
		}
		return this.exito_campo('id_funcionalidad');
	}

	/**
	 * valida id_accion en SEARCH (max 11 caracteres, formato). Puede ir vacio
	 * @returns {string|boolean} codigo de error o true
	 */
	SEARCH_id_accion_validation(){
		if (!(this.validations.max_size('id_accion',11))){
			return this.error_campo('id_accion','id_accion_max_size_ko');
		}
		if (!(this.validations.format('id_accion','^[0-9]*$'))){
			return this.error_campo('id_accion','id_accion_format_ko');
		}
		return this.exito_campo('id_accion');
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
	 * valida todos los campos del formulario de SEARCH
	 * @returns {boolean|Object} true o {campo: resultado}
	 */
	SEARCH_submit_rolaccionfuncionalidad(){
		return this.submit_accion('SEARCH', ['id_funcionalidad', 'id_accion', 'id_rol']);
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
	 * formulario de SEARCH
	 * @returns {Promise<void>}
	 */
	async createForm_SEARCH(){
		this.preparar_formulario('SEARCH');
		this.dom.crearOpcionesSelect('id_funcionalidad', await this.opciones_id_funcionalidad(), 'text_opcion_todos');
		this.dom.crearOpcionesSelect('id_accion', await this.opciones_id_accion(), 'text_opcion_todos');
		this.dom.crearOpcionesSelect('id_rol', await this.opciones_id_rol(), 'text_opcion_todos');
		this.filtrar_acciones_por_funcionalidad();

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.SEARCH();');

		this.dom.colocarvalidaciones('form_iu','SEARCH');
		this.dom.colocarboton('SEARCH');

		setLang();
	}

	/**
	 * parejas de funcionalidad_accion
	 * @returns {Array}
	 */
	async cargar_pares(){
		let respuesta = await this.access_functions.peticionBackGeneral('', 'funcionalidad_accion', 'SEARCH');
		let filas = (respuesta['code'] == 'RECORDSET_DATOS') ? respuesta['resource'] : [];
		this.pares = filas.map(f => {
			let fun = f.id_funcionalidad, acc = f.id_accion;
			return {
				id_funcionalidad: (fun !== null && typeof fun == 'object') ? fun.id_funcionalidad : fun,
				nombre_funcionalidad: (fun !== null && typeof fun == 'object') ? fun.nombre_funcionalidad : '',
				id_accion: (acc !== null && typeof acc == 'object') ? acc.id_accion : acc,
				nombre_accion: (acc !== null && typeof acc == 'object') ? acc.nombre_accion : ''
			};
		});
		return this.pares;
	}

	/**
	 * opciones del select de id_funcionalidad
	 * @returns {Array} opciones
	 */
	async opciones_id_funcionalidad(){
		let pares = await this.cargar_pares();
		let opciones = [];
		for (let p of pares){
			if (!(opciones.some(o => o.valor == p.id_funcionalidad))){
				opciones.push({valor: p.id_funcionalidad, texto: p.id_funcionalidad + (p.nombre_funcionalidad ? ' ('+p.nombre_funcionalidad+')' : '')});
			}
		}
		return opciones;
	}

	/**
	 * opciones del select de id_accion
	 * @param {string} id_funcionalidad id de la funcionalidad
	 * @returns {Array} opciones
	 */
	async opciones_id_accion(id_funcionalidad=''){
		let pares = (this.pares) ? this.pares : await this.cargar_pares();
		let opciones = [];
		for (let p of pares){
			if ((id_funcionalidad === '' || p.id_funcionalidad == id_funcionalidad) && !(opciones.some(o => o.valor == p.id_accion))){
				opciones.push({valor: p.id_accion, texto: p.id_accion + (p.nombre_accion ? ' ('+p.nombre_accion+')' : '')});
			}
		}
		return opciones;
	}

	/**
	 * en SEARCH, deja en id_accion solo las acciones de la funcionalidad elegida
	 */
	filtrar_acciones_por_funcionalidad(){
		this.dom.al_cambiar('id_funcionalidad', async (id_funcionalidad) => {
			this.dom.crearOpcionesSelect('id_accion', await this.opciones_id_accion(id_funcionalidad), this.dom.clase_opcion_vacia('id_accion'));
			setLang();
		});
	}

	// ---------- matriz: marcar una casilla hace ADD y desmarcarla DELETE ----------

	/**
	 * refactorizado: busca en el back y pinta la matriz en vez de la tabla
	 * @returns {Promise<void>}
	 */
	async SEARCH(){
		this.filtro = this.dom.valores_formulario('form_iu', ['id_funcionalidad', 'id_accion', 'id_rol']);
		if (this.filtro.id_rol != ''){
			this.rol_actual = this.filtro.id_rol;
		}
		let respuesta = await this.access_functions.peticionBackGeneral('form_iu', this.nombreentidad, 'SEARCH');

		// ocultar y limpiar el formulario
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.hide_element('Div_IU_form');

		await this.procesar_busqueda(respuesta);
	}

	/**
	 * al cambiar el rol del desplegable se buscan sus permisos
	 * @param {string} id_rol id del rol
	 * @returns {Promise<void>}
	 */
	async cambiar_rol(id_rol){
		this.rol_actual = id_rol;
		let datos = {id_rol: id_rol};
		if (this.filtro.id_funcionalidad != ''){
			datos.id_funcionalidad = this.filtro.id_funcionalidad;
		}
		if (this.filtro.id_accion != ''){
			datos.id_accion = this.filtro.id_accion;
		}
		let respuesta = await this.access_functions.peticionBackGeneral('', this.nombreentidad, 'SEARCH', datos);
		await this.procesar_busqueda(respuesta);
	}

	/**
	 * guarda el resultado de la busqueda y pinta la matriz, o saca el error
	 * @param {Object} respuesta respuesta del back
	 * @returns {Promise<void>}
	 */
	async procesar_busqueda(respuesta){
		if ((respuesta['code'] != 'RECORDSET_DATOS') && (respuesta['code'] != 'RECORDSET_VACIO')){
			this.dom.abrirModalError(respuesta['code']);
			return;
		}
		this.datos = (respuesta['code'] == 'RECORDSET_DATOS') ? respuesta['resource'] : [];
		await this.mostrar_matriz();
	}

	/**
	 * id de un atributo (las FK pueden venir como objeto)
	 * @param {*} valor valor del atributo
	 * @param {string} columna atributo
	 * @returns {*} el id
	 */
	id_valor(valor, columna){
		return (valor !== null && typeof valor == 'object') ? valor[columna] : valor;
	}

	/**
	 * pide al back las filas de una entidad para la matriz
	 * @param {Object} entidad entidad que pinta la tabla
	 * @param {string} campoid atributo con el id
	 * @param {string} camponombre atributo con el nombre
	 * @returns {Array|null} [{valor, texto}] o null si hay error
	 */
	async listar(entidad, campoid, camponombre){
		let respuesta = await this.access_functions.peticionBackGeneral('', entidad, 'SEARCH');
		if (respuesta['code'] == 'RECORDSET_VACIO'){
			return [];
		}
		if (respuesta['code'] != 'RECORDSET_DATOS'){
			this.dom.abrirModalError(respuesta['code']);
			return null;
		}
		return respuesta['resource'].map(f => ({valor: f[campoid], texto: f[camponombre]}));
	}

	/**
	 * clave 'funcionalidad|accion' de una tupla
	 * @param {Object} tupla tupla del back
	 * @returns {string}
	 */
	clave_tupla(tupla){
		return this.id_valor(tupla.id_funcionalidad, 'id_funcionalidad')+'|'+this.id_valor(tupla.id_accion, 'id_accion');
	}

	/**
	 * pinta la matriz
	 * @returns {Promise<void>}
	 */
	async mostrar_matriz(){
		let [roles, funcionalidades, acciones] = await Promise.all([
			this.listar('rol', 'id_rol', 'rol_name'),
			this.listar('funcionalidad', 'id_funcionalidad', 'nombre_funcionalidad'),
			this.listar('accion', 'id_accion', 'nombre_accion')]);
		if ((roles === null) || (funcionalidades === null) || (acciones === null)){
			return;
		}
		let pares = await this.cargar_pares();

		// si no hay rol elegido (o ya no existe) se coge el primero
		if (!(roles.some(r => r.valor == this.rol_actual))){
			this.rol_actual = (roles.length > 0) ? roles[0].valor : '';
		}

		let filas = funcionalidades.filter(f => (this.filtro.id_funcionalidad == '') || (f.valor == this.filtro.id_funcionalidad));
		let columnas = acciones.filter(a => (this.filtro.id_accion == '') || (a.valor == this.filtro.id_accion));
		let asignables = new Set(pares.map(p => p.id_funcionalidad+'|'+p.id_accion));
		this.activas = new Set(this.datos
			.filter(t => this.id_valor(t.id_rol, 'id_rol') == this.rol_actual)
			.map(t => this.clave_tupla(t)));

		this.dom.preparar_contenedor_matriz('IU_manage_table');
		this.dom.crearSelectorMatriz('IU_manage_table', 'selector_rol_matriz', 'label_matriz_rol', roles, this.rol_actual,
			(id_rol) => this.cambiar_rol(id_rol));
		this.dom.crearMatriz('IU_manage_table', 'text_matriz_esquina', 'text_matriz_ayuda_rol', filas, columnas,
			(valorfila, valorcolumna) => this.activas.has(valorfila+'|'+valorcolumna),
			// las marcadas siempre se pueden desmarcar; las vacias solo si la pareja
			// existe en funcionalidad_accion
			(valorfila, valorcolumna) => (this.rol_actual !== '') && (this.activas.has(valorfila+'|'+valorcolumna) || asignables.has(valorfila+'|'+valorcolumna)),
			(casilla, valorfila, valorcolumna) => this.matriz_cambiar(casilla, valorfila, valorcolumna));
		setLang();
	}

	/**
	 * marcar = ADD, desmarcar = DELETE. Si falla, la casilla vuelve atras y sale el error
	 * @param {HTMLElement} casilla casilla pulsada
	 * @param {string} id_funcionalidad id de la funcionalidad
	 * @param {string} id_accion id de la accion
	 * @returns {Promise<void>}
	 */
	async matriz_cambiar(casilla, id_funcionalidad, id_accion){
		let marcar = casilla.checked;
		let datos = {id_funcionalidad: id_funcionalidad, id_accion: id_accion, id_rol: this.rol_actual};
		casilla.disabled = true;

		let respuesta = await this.access_functions.peticionBackGeneral('', this.nombreentidad, (marcar) ? 'ADD' : 'DELETE', datos);
		let codigoerror = (respuesta['ok']) ? null : respuesta['code'];
		if (codigoerror === null){
			let existe = await this.existe_en_back(datos);
			if (existe === null){
				codigoerror = 'text_error_matriz_comprobacion';
			}
			else if (existe != marcar){
				codigoerror = 'text_error_matriz_no_guardado';
			}
		}

		casilla.disabled = false;
		if (codigoerror === null){
			if (marcar){
				this.activas.add(id_funcionalidad+'|'+id_accion);
			}
			else{
				this.activas.delete(id_funcionalidad+'|'+id_accion);
			}
		}
		else{
			casilla.checked = !marcar;
			this.dom.abrirModalError(codigoerror);
		}
	}

	/**
	 * comprueba en el back si la tupla esta
	 * @param {Array} datos tuplas del back
	 * @returns {boolean|null} null si el back da error
	 */
	async existe_en_back(datos){
		let respuesta = await this.access_functions.peticionBackGeneral('', this.nombreentidad, 'SEARCH', datos);
		if (respuesta['code'] == 'RECORDSET_VACIO'){
			return false;
		}
		if (respuesta['code'] != 'RECORDSET_DATOS'){
			return null;
		}
		let clave = this.clave_tupla(datos);
		return respuesta['resource'].some(t => (this.clave_tupla(t) == clave) && (this.id_valor(t.id_rol, 'id_rol') == datos.id_rol));
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
