class persona extends AbstractEntidad{

	/**
	 * @param {string} esTest 'test' para crear la entidad sin pintar nada (pruebas)
	 */
	constructor(esTest=null){

		super();

		this.nombreentidad = 'persona';
		this.columnasamostrar = ['dni','nombre_persona','apellidos_persona','foto_persona'];
		this.mostrarespecial = ['foto_persona','fechaNacimiento_persona'];

		this.dom = new entity_dom_fields();
		this.validations = new entity_validations();
		this.access_functions = new ExternalAccess();

		this.url_fotos = 'http://193.147.87.202/ET2/filesuploaded/files_foto_persona/';

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
				<!-- dni es FK de usuario(dni): select con los dni de usuario (se cargan en createForm) -->
				<select id='dni' name='dni'></select>
				<span id="span_error_dni"><a id="error_dni"></a></span>
				<br>

				<label id="label_nombre_persona" class="label_nombre_persona">Nombre</label>
				<input type='text' id='nombre_persona' name='nombre_persona'></input>
				<span id="span_error_nombre_persona"><a id="error_nombre_persona"></a></span>
				<br>

				<label id="label_apellidos_persona" class="label_apellidos_persona">Apellidos</label>
				<input type='text' id='apellidos_persona' name='apellidos_persona'></input>
				<span id="span_error_apellidos_persona"><a id="error_apellidos_persona"></a></span>
				<br>

				<label id="label_fechaNacimiento_persona" class="label_fechaNacimiento_persona">Fecha de Nacimiento</label>
				<input type='text' id='fechaNacimiento_persona' name='fechaNacimiento_persona' placeholder='dd/mm/aaaa'></input>
				<span id="span_error_fechaNacimiento_persona"><a id="error_fechaNacimiento_persona"></a></span>
				<br>

				<label id="label_direccion_persona" class="label_direccion_persona">Direcci\u00F3n Postal</label>
				<textarea rows="5" cols="33" id='direccion_persona' name='direccion_persona'></textarea>
				<span id="span_error_direccion_persona"><a id="error_direccion_persona"></a></span>
				<br>

				<label id="label_telefono_persona" class="label_telefono_persona">Tel\u00E9fono</label>
				<input type='text' id='telefono_persona' name='telefono_persona'></input>
				<span id="span_error_telefono_persona"><a id="error_telefono_persona"></a></span>
				<br>

				<label id="label_email_persona" class="label_email_persona">Correo Electr\u00F3nico</label>
				<input type='text' id='email_persona' name='email_persona'></input>
				<span id="span_error_email_persona"><a id="error_email_persona"></a></span>
				<br>

				<label id="label_foto_persona" class="label_foto_persona">Foto</label>
				<input type='text' id='foto_persona' name='foto_persona'></input>
				<span id="span_error_foto_persona"><a id="error_foto_persona"></a></span>
				<a id="link_foto_persona" href="http://193.147.87.202/ET2/filesuploaded/files_foto_persona/"><img src="./iconos/FILE.png" /></a>
				<br>

				<label id="label_nuevo_foto_persona" class="label_nuevo_foto_persona">Nueva Foto</label>
				<input type='file' id='nuevo_foto_persona' name='nuevo_foto_persona'></input>
				<span id="span_error_nuevo_foto_persona"><a id="error_nuevo_foto_persona"></a></span>
				<br>

			</form>
		`;
		return form_content;
	}

	/**********************************************************************************************
		validaciones personalizadas (personalize_atributo)
		@return {bool} true si cumple, false si no
	***********************************************************************************************/

	/**
	 * la letra del dni corresponde a su numero (numero % 23)
	 */
	personalize_dni(id){
		let valor = document.getElementById(id).value;
		let letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
		let numero = parseInt(valor.substring(0,8), 10);
		return (letras.charAt(numero % 23) == valor.charAt(8));
	}

	/**
	 * la fecha d/m/aaaa existe en el calendario (incluye bisiestos)
	 */
	personalize_fechaNacimiento_persona(id){
		let partes = document.getElementById(id).value.split('/');
		let dia = parseInt(partes[0], 10);
		let mes = parseInt(partes[1], 10);
		let anio = parseInt(partes[2], 10);
		let fecha = new Date(anio, mes - 1, dia);
		return (fecha.getFullYear() == anio && fecha.getMonth() == mes - 1 && fecha.getDate() == dia);
	}

	/**
	 * la fecha d/m/aaaa no es posterior a hoy
	 */
	personalize_fechaNacimiento_persona_no_futura(id){
		let partes = document.getElementById(id).value.split('/');
		let fecha = new Date(parseInt(partes[2], 10), parseInt(partes[1], 10) - 1, parseInt(partes[0], 10));
		let hoy = new Date();
		hoy.setHours(0,0,0,0);
		return (fecha <= hoy);
	}

	/**
	 * en SEARCH: si se busca por una fecha completa tiene que existir; las busquedas parciales son validas
	 */
	personalize_fechaNacimiento_persona_busqueda(id){
		let valor = document.getElementById(id).value;
		if (!(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/.test(valor))){
			return true;
		}
		return this.personalize_fechaNacimiento_persona(id);
	}

	/**
	 * el telefono empieza por 6, 7, 8 o 9
	 */
	personalize_telefono_persona(id){
		let valor = document.getElementById(id).value;
		return ['6','7','8','9'].includes(valor.charAt(0));
	}

	/**
	 * el nombre del fichero tiene al menos minsize caracteres
	 */
	personalize_nuevo_foto_persona_min_size_name(id, minsize){
		return (document.getElementById(id).files[0].name.length >= minsize);
	}

	/**
	 * el nombre del fichero tiene como maximo maxsize caracteres
	 */
	personalize_nuevo_foto_persona_max_size_name(id, maxsize){
		return (document.getElementById(id).files[0].name.length <= maxsize);
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

	ADD_nombre_persona_validation(){
		if (!(this.validations.min_size('nombre_persona',2))){
			return this.error_campo('nombre_persona','nombre_persona_min_size_ko');
		}
		if (!(this.validations.max_size('nombre_persona',45))){
			return this.error_campo('nombre_persona','nombre_persona_max_size_ko');
		}
		// letras con n y acentos, puntos, guiones y espacio
		if (!(this.validations.format('nombre_persona','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F1. -]+$'))){
			return this.error_campo('nombre_persona','nombre_persona_format_ko');
		}
		return this.exito_campo('nombre_persona');
	}

	ADD_apellidos_persona_validation(){
		if (!(this.validations.min_size('apellidos_persona',3))){
			return this.error_campo('apellidos_persona','apellidos_persona_min_size_ko');
		}
		if (!(this.validations.max_size('apellidos_persona',100))){
			return this.error_campo('apellidos_persona','apellidos_persona_max_size_ko');
		}
		if (!(this.validations.format('apellidos_persona','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F1. -]+$'))){
			return this.error_campo('apellidos_persona','apellidos_persona_format_ko');
		}
		return this.exito_campo('apellidos_persona');
	}

	ADD_fechaNacimiento_persona_validation(){
		if (!(this.validations.min_size('fechaNacimiento_persona',8))){
			return this.error_campo('fechaNacimiento_persona','fechaNacimiento_persona_min_size_ko');
		}
		if (!(this.validations.max_size('fechaNacimiento_persona',10))){
			return this.error_campo('fechaNacimiento_persona','fechaNacimiento_persona_max_size_ko');
		}
		// d/m/aaaa o dd/mm/aaaa
		if (!(this.validations.format('fechaNacimiento_persona','^[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}$'))){
			return this.error_campo('fechaNacimiento_persona','fechaNacimiento_persona_format_ko');
		}
		if (!(this.personalize_fechaNacimiento_persona('fechaNacimiento_persona'))){
			return this.error_campo('fechaNacimiento_persona','fechaNacimiento_persona_personalized_ko');
		}
		if (!(this.personalize_fechaNacimiento_persona_no_futura('fechaNacimiento_persona'))){
			return this.error_campo('fechaNacimiento_persona','fechaNacimiento_persona_future_date_ko');
		}
		// se almacena siempre como dd/mm/aaaa
		this.dom.normalizar_fecha('fechaNacimiento_persona');
		return this.exito_campo('fechaNacimiento_persona');
	}

	ADD_direccion_persona_validation(){
		if (!(this.validations.min_size('direccion_persona',10))){
			return this.error_campo('direccion_persona','direccion_persona_min_size_ko');
		}
		if (!(this.validations.max_size('direccion_persona',200))){
			return this.error_campo('direccion_persona','direccion_persona_max_size_ko');
		}
		// alfanumerico con n y acentos, puntos, guiones, punto y coma, espacio y /
		if (!(this.validations.format('direccion_persona','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F10-9.;/ -]+$'))){
			return this.error_campo('direccion_persona','direccion_persona_format_ko');
		}
		return this.exito_campo('direccion_persona');
	}

	ADD_telefono_persona_validation(){
		if (!(this.validations.min_size('telefono_persona',9))){
			return this.error_campo('telefono_persona','telefono_persona_min_size_ko');
		}
		if (!(this.validations.max_size('telefono_persona',9))){
			return this.error_campo('telefono_persona','telefono_persona_max_size_ko');
		}
		if (!(this.validations.format('telefono_persona','^[0-9]{9}$'))){
			return this.error_campo('telefono_persona','telefono_persona_format_ko');
		}
		if (!(this.personalize_telefono_persona('telefono_persona'))){
			return this.error_campo('telefono_persona','telefono_persona_personalized_ko');
		}
		return this.exito_campo('telefono_persona');
	}

	ADD_email_persona_validation(){
		if (!(this.validations.min_size('email_persona',6))){
			return this.error_campo('email_persona','email_persona_min_size_ko');
		}
		if (!(this.validations.max_size('email_persona',45))){
			return this.error_campo('email_persona','email_persona_max_size_ko');
		}
		// usuario@dominio.ext
		if (!(this.validations.format('email_persona','^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'))){
			return this.error_campo('email_persona','email_persona_format_ko');
		}
		return this.exito_campo('email_persona');
	}

	ADD_nuevo_foto_persona_validation(){
		if (!(this.validations.exist_file('nuevo_foto_persona'))){
			return this.error_campo('nuevo_foto_persona','nuevo_foto_persona_exist_file_ko');
		}
		return this.nuevo_foto_persona_comprobar_fichero();
	}

	/**
	 * comprobaciones del fichero de foto cuando hay fichero seleccionado
	 */
	nuevo_foto_persona_comprobar_fichero(){
		if (!(this.personalize_nuevo_foto_persona_min_size_name('nuevo_foto_persona',5))){
			return this.error_campo('nuevo_foto_persona','nuevo_foto_persona_min_size_name_file_ko');
		}
		if (!(this.personalize_nuevo_foto_persona_max_size_name('nuevo_foto_persona',15))){
			return this.error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_name_file_ko');
		}
		if (!(this.validations.format_name_file('nuevo_foto_persona','^[A-Za-z.]+\\.(jpg|jpeg|JPG|JPEG)$'))){
			return this.error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_ko');
		}
		if (!(this.validations.type_file('nuevo_foto_persona',['image/jpeg']))){
			return this.error_campo('nuevo_foto_persona','nuevo_foto_persona_type_file_ko');
		}
		// 2 MB = 2097152 bytes
		if (!(this.validations.max_size_file('nuevo_foto_persona',2097152))){
			return this.error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_file_ko');
		}
		return this.exito_campo('nuevo_foto_persona');
	}

	/**********************************************************************************************
		fields validations for EDIT (mismas reglas que ADD). Los campos de solo lectura (clave
		primaria y foto guardada) no se validan: el usuario no introduce esos datos
	***********************************************************************************************/

	EDIT_nombre_persona_validation(){ return this.ADD_nombre_persona_validation(); }
	EDIT_apellidos_persona_validation(){ return this.ADD_apellidos_persona_validation(); }
	EDIT_fechaNacimiento_persona_validation(){ return this.ADD_fechaNacimiento_persona_validation(); }
	EDIT_direccion_persona_validation(){ return this.ADD_direccion_persona_validation(); }
	EDIT_telefono_persona_validation(){ return this.ADD_telefono_persona_validation(); }
	EDIT_email_persona_validation(){ return this.ADD_email_persona_validation(); }

	// en EDIT la foto nueva es opcional: si no se elige fichero se mantiene la actual,
	// si se elige se comprueba igual que en ADD
	EDIT_nuevo_foto_persona_validation(){
		if (!(this.validations.exist_file('nuevo_foto_persona'))){
			return this.exito_campo('nuevo_foto_persona');
		}
		return this.nuevo_foto_persona_comprobar_fichero();
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

	SEARCH_nombre_persona_validation(){
		if (!(this.validations.max_size('nombre_persona',45))){
			return this.error_campo('nombre_persona','nombre_persona_max_size_ko');
		}
		if (!(this.validations.format('nombre_persona','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F1. -]*$'))){
			return this.error_campo('nombre_persona','nombre_persona_format_ko');
		}
		return this.exito_campo('nombre_persona');
	}

	SEARCH_apellidos_persona_validation(){
		if (!(this.validations.max_size('apellidos_persona',100))){
			return this.error_campo('apellidos_persona','apellidos_persona_max_size_ko');
		}
		if (!(this.validations.format('apellidos_persona','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F1. -]*$'))){
			return this.error_campo('apellidos_persona','apellidos_persona_format_ko');
		}
		return this.exito_campo('apellidos_persona');
	}

	SEARCH_fechaNacimiento_persona_validation(){
		if (!(this.validations.max_size('fechaNacimiento_persona',10))){
			return this.error_campo('fechaNacimiento_persona','fechaNacimiento_persona_max_size_ko');
		}
		if (!(this.validations.format('fechaNacimiento_persona','^[0-9/]*$'))){
			return this.error_campo('fechaNacimiento_persona','fechaNacimiento_persona_format_ko');
		}
		if (!(this.personalize_fechaNacimiento_persona_busqueda('fechaNacimiento_persona'))){
			return this.error_campo('fechaNacimiento_persona','fechaNacimiento_persona_personalized_ko');
		}
		return this.exito_campo('fechaNacimiento_persona');
	}

	SEARCH_direccion_persona_validation(){
		if (!(this.validations.max_size('direccion_persona',200))){
			return this.error_campo('direccion_persona','direccion_persona_max_size_ko');
		}
		if (!(this.validations.format('direccion_persona','^[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00DC\u00FC\u00D1\u00F10-9.;/ -]*$'))){
			return this.error_campo('direccion_persona','direccion_persona_format_ko');
		}
		return this.exito_campo('direccion_persona');
	}

	SEARCH_telefono_persona_validation(){
		if (!(this.validations.max_size('telefono_persona',9))){
			return this.error_campo('telefono_persona','telefono_persona_max_size_ko');
		}
		if (!(this.validations.format('telefono_persona','^[0-9]*$'))){
			return this.error_campo('telefono_persona','telefono_persona_format_ko');
		}
		return this.exito_campo('telefono_persona');
	}

	SEARCH_email_persona_validation(){
		if (!(this.validations.max_size('email_persona',45))){
			return this.error_campo('email_persona','email_persona_max_size_ko');
		}
		if (!(this.validations.format('email_persona','^[A-Za-z0-9._%+@-]*$'))){
			return this.error_campo('email_persona','email_persona_format_ko');
		}
		return this.exito_campo('email_persona');
	}

	SEARCH_foto_persona_validation(){
		if (!(this.validations.max_size('foto_persona',15))){
			return this.error_campo('foto_persona','foto_persona_max_size_ko');
		}
		if (!(this.validations.format('foto_persona','^[A-Za-z.]*$'))){
			return this.error_campo('foto_persona','foto_persona_format_ko');
		}
		return this.exito_campo('foto_persona');
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

	// foto_persona no se valida: esta oculto y lo rellena el back
	ADD_submit_persona(){
		return this.submit_accion('ADD', ['dni','nombre_persona','apellidos_persona','fechaNacimiento_persona',
			'direccion_persona','telefono_persona','email_persona','nuevo_foto_persona']);
	}

	// dni y foto_persona no se validan: son de solo lectura (el usuario no introduce esos datos)
	EDIT_submit_persona(){
		return this.submit_accion('EDIT', ['nombre_persona', 'apellidos_persona', 'fechaNacimiento_persona', 'direccion_persona', 'telefono_persona', 'email_persona', 'nuevo_foto_persona']);
	}

	// nuevo_foto_persona no se valida: en SEARCH esta oculto
	SEARCH_submit_persona(){
		return this.submit_accion('SEARCH', ['dni','nombre_persona','apellidos_persona','fechaNacimiento_persona',
			'direccion_persona','telefono_persona','email_persona','foto_persona']);
	}

	/**********************************************************************************************
		formularios por accion
	***********************************************************************************************/

	/**
	 * dni es FK de usuario(dni): pide al back los usuarios y devuelve las opciones del select.
	 * Si solo_libres es true quita los dni que ya tienen persona (en ADD no se puede repetir la PK)
	 * @param {bool} solo_libres
	 * @returns {Array} [{valor, texto}]
	 */
	async opciones_dni(solo_libres){
		let usuarios = await this.access_functions.peticionBackGeneral('', 'usuario', 'SEARCH');
		let filas = (usuarios['code'] == 'RECORDSET_DATOS') ? usuarios['resource'] : [];
		if (solo_libres){
			let personas = await this.access_functions.peticionBackGeneral('', 'persona', 'SEARCH');
			let usados = (personas['code'] == 'RECORDSET_DATOS') ? personas['resource'].map(p => (p.dni !== null && typeof p.dni == 'object') ? p.dni.dni : p.dni) : [];
			filas = filas.filter(u => !(usados.includes(u.dni)));
		}
		return filas.map(u => ({valor: u.dni, texto: u.dni+' ('+u.usuario+')'}));
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

	/**
	 * nuevo_foto_persona y su label visibles (display block) en ADD y EDIT
	 */
	mostrar_nuevo_foto_persona(){
		this.dom.show_element('label_nuevo_foto_persona');
		this.dom.show_element('nuevo_foto_persona');
	}

	/**
	 * nuevo_foto_persona y su label no visibles (display none) en SEARCH, DELETE y SHOWCURRENT
	 */
	ocultar_nuevo_foto_persona(){
		this.dom.hide_element_form('nuevo_foto_persona');
	}

	async createForm_ADD(){
		this.preparar_formulario('ADD');

		// select de dni con los usuarios que aun no tienen persona
		this.dom.crearOpcionesSelect('dni', await this.opciones_dni(true), 'text_opcion_seleccionar');

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.ADD();');

		// en ADD solo se sube fichero: foto_persona y su enlace ocultos
		this.dom.hide_element_form('foto_persona');
		this.dom.hide_element('link_foto_persona');

		this.dom.colocarvalidaciones('form_iu','ADD');
		this.mostrar_nuevo_foto_persona();
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

		this.dom.assign_property_value('link_foto_persona','href',this.url_fotos+fila.foto_persona);

		fila.fechaNacimiento_persona = this.cambiarformatoFecha(fila.fechaNacimiento_persona);
		// dni (PK) no se modifica: el select solo tiene el dni de la fila
		this.dom.crearOpcionesSelect('dni', [{valor: fila.dni, texto: fila.dni}]);
		this.dom.rellenarvaloresform(fila);

		this.dom.colocarvalidaciones('form_iu','EDIT');
		this.mostrar_nuevo_foto_persona();

		// clave primaria y nombre de foto guardada no se modifican
		this.dom.assign_property_value('dni','readonly','true');
		this.dom.quitar_validacion('dni');
		this.dom.assign_property_value('foto_persona','readonly','true');
		this.dom.quitar_validacion('foto_persona');

		this.dom.colocarboton('EDIT');

		setLang();
	}

	async createForm_SEARCH(){
		this.preparar_formulario('SEARCH');

		// select de dni con todos los usuarios y una opcion vacia para no filtrar por dni
		this.dom.crearOpcionesSelect('dni', await this.opciones_dni(false), 'text_opcion_todos');

		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu','action','javascript:entidad.SEARCH();');

		// en SEARCH se busca por nombre de foto: sin fichero ni enlace
		this.ocultar_nuevo_foto_persona();
		this.dom.hide_element('link_foto_persona');

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

		this.ocultar_nuevo_foto_persona();
		this.dom.assign_property_value('link_foto_persona','href',this.url_fotos+fila.foto_persona);

		fila.fechaNacimiento_persona = this.cambiarformatoFecha(fila.fechaNacimiento_persona);
		// dni (PK) no se modifica: el select solo tiene el dni de la fila
		this.dom.crearOpcionesSelect('dni', [{valor: fila.dni, texto: fila.dni}]);
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

		this.ocultar_nuevo_foto_persona();
		this.dom.assign_property_value('link_foto_persona','href',this.url_fotos+fila.foto_persona);

		fila.fechaNacimiento_persona = this.cambiarformatoFecha(fila.fechaNacimiento_persona);
		// dni (PK) no se modifica: el select solo tiene el dni de la fila
		this.dom.crearOpcionesSelect('dni', [{valor: fila.dni, texto: fila.dni}]);
		this.dom.rellenarvaloresform(fila);

		this.dom.colocartodosreadonly('form_iu');
		// SHOWCURRENT no tiene boton de submit

		setLang();
	}

	/**********************************************************************************************
		presentacion de datos
	***********************************************************************************************/

	/**
	 * aaaa-mm-dd (formato del back) -> dd/mm/aaaa. Si ya viene en otro formato se deja igual
	 * @param {string} stringfecha
	 * @returns {string}
	 */
	cambiarformatoFecha(stringfecha){
		if ((typeof stringfecha !== 'string') || !(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(stringfecha))){
			return stringfecha;
		}
		var elementos = stringfecha.split('-');
		return elementos[2]+'/'+elementos[1]+'/'+elementos[0];
	}

	/**
	 * REFACTORIZADO (AbstractEntidad no se puede modificar): la tabla se crea con la version de
	 * entity_dom_fields, que no rompe los iconos de las filas con apostrofos en sus datos
	 */
	crearTablaDatos(datos, mostrarespecial){
		this.dom.crearTablaDatosEntidad(this, datos, mostrarespecial);
	}

	/**
	 * metodo pedido en el enunciado: devuelve el formato especial a mostrar del valor del atributo
	 * @param {string} atributo nombre del atributo
	 * @param {any} valorentrada valor original
	 * @returns {any} valor transformado
	 */
	mostrarcambioatributo(atributo, valorentrada){
		switch(atributo){
			case 'foto_persona':
				return `<a href='`+this.url_fotos+valorentrada+`'>`+valorentrada+`</a>`;
			case 'fechaNacimiento_persona':
				return this.cambiarformatoFecha(valorentrada);
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
