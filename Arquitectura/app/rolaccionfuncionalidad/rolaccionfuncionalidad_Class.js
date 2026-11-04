class rolaccionfuncionalidad extends AbstractEntidad{

	/**
	 * @param {string} esTest 'test' para crear la entidad sin pintar nada (pruebas)
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
			// className y no classList.add: si no, al cambiar de entidad se acumulan los titulos
			document.getElementById('text_title_page').className = 'text_titulo_page_'+this.nombreentidad;
			// se gestiona con la matriz: sin icono de ADD (se asigna marcando casillas) ni selector de columnas
			this.dom.configurar_cabecera_gestion(false, false);

			// crear el formulario vacio
			document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();

			// busqueda en back con el formulario vacio y dibujo de la matriz
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

	SEARCH_id_accion_validation(){
		if (!(this.validations.max_size('id_accion',11))){
			return this.error_campo('id_accion','id_accion_max_size_ko');
		}
		if (!(this.validations.format('id_accion','^[0-9]*$'))){
			return this.error_campo('id_accion','id_accion_format_ko');
		}
		return this.exito_campo('id_accion');
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

	ADD_submit_rolaccionfuncionalidad(){
		return this.submit_accion('ADD', ['id_funcionalidad', 'id_accion', 'id_rol']);
	}

	SEARCH_submit_rolaccionfuncionalidad(){
		return this.submit_accion('SEARCH', ['id_funcionalidad', 'id_accion', 'id_rol']);
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
	 * id_funcionalidad + id_accion son FK de funcionalidad_accion(id_funcionalidad, id_accion): solo valen
	 * parejas que existan alli. Se piden al back las parejas una vez y se guardan en this.pares.
	 * El back puede devolver cada id como objeto (la tupla relacionada): se usa su id y su nombre.
	 * @returns {Array} [{id_funcionalidad, nombre_funcionalidad, id_accion, nombre_accion}]
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
	 * opciones de id_funcionalidad: las funcionalidades que tienen alguna accion en funcionalidad_accion
	 * @returns {Array} [{valor, texto}]
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
	 * opciones de id_accion: las acciones asociadas a la funcionalidad indicada en funcionalidad_accion
	 * (todas las de las parejas si no se indica funcionalidad)
	 * @param {string} id_funcionalidad funcionalidad elegida ('' = todas)
	 * @returns {Array} [{valor, texto}]
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
	 * al cambiar la funcionalidad se dejan en id_accion solo las acciones de su pareja en funcionalidad_accion
	 * (la manipulacion del DOM la hacen los metodos de entity_dom_fields)
	 */
	filtrar_acciones_por_funcionalidad(){
		this.dom.al_cambiar('id_funcionalidad', async (id_funcionalidad) => {
			this.dom.crearOpcionesSelect('id_accion', await this.opciones_id_accion(id_funcionalidad), this.dom.clase_opcion_vacia('id_accion'));
			setLang();
		});
	}

	/**********************************************************************************************
		GESTION CON MATRIZ: rolaccionfuncionalidad solo se asigna (ADD) y desasigna (DELETE), asi que
		en lugar de la tabla de tuplas con iconos se muestra la misma matriz que en funcionalidad_accion
		(funcionalidades x acciones) con un desplegable arriba a la izquierda para elegir el rol.
		Marcar una casilla asigna el permiso al rol (ADD) y desmarcarla se lo quita (DELETE).
		Solo se pueden marcar las parejas que existen en funcionalidad_accion (es la FK de esta tabla):
		el resto de casillas aparecen deshabilitadas. La busqueda (SEARCH) y el TEST se mantienen.
		El DOM lo manipulan los metodos de entity_dom_fields
	***********************************************************************************************/

	/**
	 * REFACTORIZADO (AbstractEntidad no se puede modificar): busca en el back con los datos del
	 * formulario y, en lugar de crear la tabla de tuplas, dibuja la matriz con el resultado.
	 * Si se ha buscado por un rol, el desplegable queda en ese rol; si se ha buscado por una
	 * funcionalidad o una accion, la matriz muestra solo esa fila o columna.
	 * Si el back devuelve un error se muestra en el modal de error
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
	 * al elegir otro rol en el desplegable se buscan en el back los permisos de ese rol (manteniendo
	 * el filtro de funcionalidad y accion de la ultima busqueda) y se vuelve a dibujar la matriz
	 * @param {*} id_rol rol elegido
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
	 * guarda las tuplas de la respuesta de busqueda y dibuja la matriz, o muestra el error del back
	 * @param {object} respuesta respuesta del back a un SEARCH
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
	 * devuelve el id de un atributo de una tupla del back (las FK pueden llegar como objeto)
	 * @param {*} valor valor del atributo
	 * @param {string} columna nombre del atributo
	 */
	id_valor(valor, columna){
		return (valor !== null && typeof valor == 'object') ? valor[columna] : valor;
	}

	/**
	 * pide al back todas las filas de una entidad para el desplegable, las filas o las columnas de la matriz
	 * @param {string} entidad nombre de la entidad en el back
	 * @param {string} campoid atributo con el id
	 * @param {string} camponombre atributo con el nombre que se muestra
	 * @returns {Array|null} [{valor, texto}] o null si el back devuelve un error (ya mostrado en el modal)
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
	 * clave de casilla de una tupla: 'id_funcionalidad|id_accion'
	 */
	clave_tupla(tupla){
		return this.id_valor(tupla.id_funcionalidad, 'id_funcionalidad')+'|'+this.id_valor(tupla.id_accion, 'id_accion');
	}

	/**
	 * dibuja el desplegable de rol y la matriz: filas = funcionalidades, columnas = acciones (filtradas
	 * por la busqueda), casillas marcadas = permisos del rol elegido que ha devuelto la busqueda,
	 * casillas habilitadas = parejas que existen en funcionalidad_accion y las que ya estan marcadas
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

		// rol del desplegable: el buscado o el ultimo elegido; si no hay (o ya no existe), el primero
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
			// una casilla marcada siempre se puede desmarcar (aunque su pareja no venga en la busqueda de
			// funcionalidad_accion); una vacia solo se puede marcar si la pareja existe en funcionalidad_accion
			(valorfila, valorcolumna) => (this.rol_actual !== '') && (this.activas.has(valorfila+'|'+valorcolumna) || asignables.has(valorfila+'|'+valorcolumna)),
			(casilla, valorfila, valorcolumna) => this.matriz_cambiar(casilla, valorfila, valorcolumna));
		setLang();
	}

	/**
	 * al marcar una casilla se asigna el permiso al rol elegido (ADD) y al desmarcarla se le quita (DELETE).
	 * Errores del back: si responde con error, la casilla vuelve a su estado y se muestra el codigo en
	 * el modal. Si responde ok se comprueba con una busqueda que el permiso ha quedado (o ya no esta)
	 * en el back; si no coincide, la casilla vuelve a su estado y se avisa de que no se ha guardado
	 * @param {HTMLElement} casilla casilla pulsada
	 * @param {*} id_funcionalidad valor de la fila
	 * @param {*} id_accion valor de la columna
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
	 * busca en el back la tupla y comprueba si existe (comparando los ids exactos, porque la busqueda
	 * del back puede devolver tambien ids que contienen el buscado)
	 * @param {object} datos {id_funcionalidad, id_accion, id_rol}
	 * @returns {bool|null} true si existe, false si no, null si el back responde con error
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
