class funcionalidad_accion extends AbstractEntidad{

	/**
	 * @param {string} esTest 'test' para crear la entidad sin pintar nada (pruebas)
	 */
	constructor(esTest=null){

		super();

		this.nombreentidad = 'funcionalidad_accion';
		this.columnasamostrar = ['id_funcionalidad','id_accion'];
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
				<!-- id_funcionalidad es FK de funcionalidad(id_funcionalidad): select cargado desde el back en createForm -->
				<select id='id_funcionalidad' name='id_funcionalidad'></select>
				<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
				<br>
				<label id="label_id_accion" class="label_id_accion">Acci\u00F3n</label>
				<!-- id_accion es FK de accion(id_accion): select cargado desde el back en createForm -->
				<select id='id_accion' name='id_accion'></select>
				<span id="span_error_id_accion"><a id="error_id_accion"></a></span>
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

	/**********************************************************************************************
		submits
		@return {bool} true si todos los campos son correctos
		@return {object} {id_campo: resultado} si alguno falla
	***********************************************************************************************/

	/**
	 * ejecuta la validacion de la accion para los campos indicados
	 * @param {string} accion SEARCH (el ADD se hace desde la matriz, sin formulario)
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

	SEARCH_submit_funcionalidad_accion(){
		return this.submit_accion('SEARCH', ['id_funcionalidad', 'id_accion']);
	}

	/**********************************************************************************************
		formularios por accion
	***********************************************************************************************/

	/**
	 * id_funcionalidad es FK de funcionalidad(id_funcionalidad): pide al back las filas de funcionalidad y devuelve las opciones del select
	 * @returns {Array} [{valor, texto}]
	 */
	async opciones_id_funcionalidad(){
		let respuesta = await this.access_functions.peticionBackGeneral('', 'funcionalidad', 'SEARCH');
		let filas = (respuesta['code'] == 'RECORDSET_DATOS') ? respuesta['resource'] : [];
		return filas.map(f => ({valor: f.id_funcionalidad, texto: f.id_funcionalidad+' ('+f.nombre_funcionalidad+')'}));
	}

	/**
	 * id_accion es FK de accion(id_accion): pide al back las filas de accion y devuelve las opciones del select
	 * @returns {Array} [{valor, texto}]
	 */
	async opciones_id_accion(){
		let respuesta = await this.access_functions.peticionBackGeneral('', 'accion', 'SEARCH');
		let filas = (respuesta['code'] == 'RECORDSET_DATOS') ? respuesta['resource'] : [];
		return filas.map(f => ({valor: f.id_accion, texto: f.id_accion+' ('+f.nombre_accion+')'}));
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

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.SEARCH();');

		this.dom.colocarvalidaciones('form_iu','SEARCH');
		this.dom.colocarboton('SEARCH');

		setLang();
	}

	/**********************************************************************************************
		GESTION CON MATRIZ: funcionalidad_accion solo se asigna (ADD) y desasigna (DELETE), asi que
		en lugar de la tabla de tuplas con iconos se muestra una matriz funcionalidades x acciones.
		Marcar una casilla hace ADD de la pareja y desmarcarla hace DELETE. La busqueda (SEARCH) y
		el TEST se mantienen. El DOM lo manipulan los metodos de entity_dom_fields
	***********************************************************************************************/

	/**
	 * REFACTORIZADO (AbstractEntidad no se puede modificar): busca en el back con los datos del
	 * formulario y, en lugar de crear la tabla de tuplas, dibuja la matriz con el resultado.
	 * Si se ha buscado por una funcionalidad o una accion, la matriz muestra solo esa fila o columna.
	 * Si el back devuelve un error se muestra en el modal de error
	 */
	async SEARCH(){
		this.filtro = this.dom.valores_formulario('form_iu', ['id_funcionalidad', 'id_accion']);
		let respuesta = await this.access_functions.peticionBackGeneral('form_iu', this.nombreentidad, 'SEARCH');

		// ocultar y limpiar el formulario
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.hide_element('Div_IU_form');

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
	 * pide al back todas las filas de una entidad para las filas o columnas de la matriz
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
	 * dibuja la matriz: filas = funcionalidades, columnas = acciones (filtradas por la busqueda),
	 * casillas marcadas = parejas que ha devuelto la busqueda
	 */
	async mostrar_matriz(){
		let [funcionalidades, acciones] = await Promise.all([
			this.listar('funcionalidad', 'id_funcionalidad', 'nombre_funcionalidad'),
			this.listar('accion', 'id_accion', 'nombre_accion')]);
		if ((funcionalidades === null) || (acciones === null)){
			return;
		}
		let filas = funcionalidades.filter(f => (this.filtro.id_funcionalidad == '') || (f.valor == this.filtro.id_funcionalidad));
		let columnas = acciones.filter(a => (this.filtro.id_accion == '') || (a.valor == this.filtro.id_accion));
		this.activas = new Set(this.datos.map(t => this.clave_tupla(t)));

		this.dom.preparar_contenedor_matriz('IU_manage_table');
		this.dom.crearMatriz('IU_manage_table', 'text_matriz_esquina', 'text_matriz_ayuda', filas, columnas,
			(valorfila, valorcolumna) => this.activas.has(valorfila+'|'+valorcolumna),
			(valorfila, valorcolumna) => true,
			(casilla, valorfila, valorcolumna) => this.matriz_cambiar(casilla, valorfila, valorcolumna));
		setLang();
	}

	/**
	 * al marcar una casilla se hace ADD de la pareja y al desmarcarla DELETE.
	 * Errores del back: si responde con error, la casilla vuelve a su estado y se muestra el codigo en
	 * el modal. Si responde ok se comprueba con una busqueda que la pareja ha quedado (o ya no esta)
	 * en el back; si no coincide, la casilla vuelve a su estado y se avisa de que no se ha guardado
	 * @param {HTMLElement} casilla casilla pulsada
	 * @param {*} id_funcionalidad valor de la fila
	 * @param {*} id_accion valor de la columna
	 */
	async matriz_cambiar(casilla, id_funcionalidad, id_accion){
		let marcar = casilla.checked;
		let datos = {id_funcionalidad: id_funcionalidad, id_accion: id_accion};
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
	 * @param {object} datos {id_funcionalidad, id_accion}
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
		return respuesta['resource'].some(t => this.clave_tupla(t) == clave);
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
