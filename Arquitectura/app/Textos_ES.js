var textos_ES = {

	// textos titulos generales
	'text_titulo_app': 'Interfaz ET2 IU',
	'text_titulo_menu': 'Opciones Men\u00FA',
	'text_titulo_pie': 'Pie de p\u00E1gina',
	'label_seleccioncolumnas': 'Seleccionar columnas',

	// resultado de una validacion correcta (lo busca el test)
	'true': 'Correcto',

	// textos menu
	'text_menu_persona': 'Gestionar persona',
	'text_menu_usuario': 'Gestionar usuario',
	'text_menu_rol': 'Gestionar rol',
	'text_menu_accion': 'Gestionar acci\u00F3n',
	'text_menu_funcionalidad': 'Gestionar funcionalidad',
	'text_menu_funcionalidad_accion': 'Gestionar funcionalidad-acci\u00F3n',
	'text_menu_rolaccionfuncionalidad': 'Gestionar permisos rol-acci\u00F3n-funcionalidad',

	// columnas de acciones de la tabla
	'EDIT': 'Modificar',
	'DELETE': 'Borrar',
	'SHOWCURRENT': 'Detalle',

	// opcion vacia de los select de FK
	'text_opcion_seleccionar': '-- Seleccione --',
	'text_opcion_todos': '-- Todos --',

	// iconos del boton de submit (alt y title)
	'text_icono_ADD': 'A\u00F1adir',
	'text_icono_EDIT': 'Modificar',
	'text_icono_DELETE': 'Borrar',
	'text_icono_SEARCH': 'Buscar',
	'text_icono_SHOWCURRENT': 'Ver detalle',

	// error del back sin traduccion propia
	'text_error_back_desconocido': 'Se ha producido un error al realizar la acci\u00F3n en el servidor',

	/*************************************************************************
		PERSONA
	*************************************************************************/

	// titulos
	'text_titulo_page_persona': 'Gesti\u00F3n de Datos Personales',
	'text_contenido_titulo_form_persona_ADD': 'Formulario Alta Datos Personales',
	'text_contenido_titulo_form_persona_EDIT': 'Formulario Modificaci\u00F3n Datos Personales',
	'text_contenido_titulo_form_persona_DELETE': 'Formulario Eliminaci\u00F3n Datos Personales',
	'text_contenido_titulo_form_persona_SHOWCURRENT': 'Formulario Detalle Datos Personales',
	'text_contenido_titulo_form_persona_SEARCH': 'Formulario B\u00FAsqueda Datos Personales',

	// atributos (cabeceras de tabla y selector de columnas)
	'dni': 'DNI',
	'nombre_persona': 'Nombre',
	'apellidos_persona': 'Apellidos',
	'fechaNacimiento_persona': 'Fecha Nacimiento',
	'direccion_persona': 'Direcci\u00F3n',
	'telefono_persona': 'Tel\u00E9fono',
	'email_persona': 'Correo Electr\u00F3nico',
	'foto_persona': 'Foto',

	// labels
	'label_dni': 'DNI',
	'label_nombre_persona': 'Nombre',
	'label_apellidos_persona': 'Apellidos',
	'label_fechaNacimiento_persona': 'Fecha Nacimiento',
	'label_direccion_persona': 'Direcci\u00F3n',
	'label_telefono_persona': 'Tel\u00E9fono',
	'label_email_persona': 'Correo Electr\u00F3nico',
	'label_foto_persona': 'Foto',
	'label_nuevo_foto_persona': 'Nueva Foto',

	// errores de validacion
	// dni
	'dni_min_size_ko': 'DNI demasiado corto. Debe tener 9 caracteres: 8 n\u00FAmeros y 1 letra may\u00FAscula',
	'dni_max_size_ko': 'DNI demasiado largo. Debe tener 9 caracteres: 8 n\u00FAmeros y 1 letra may\u00FAscula',
	'dni_format_ko': 'Formato de DNI incorrecto. Debe ser 8 n\u00FAmeros seguidos de una letra may\u00FAscula',
	'dni_personalized_ko': 'La letra del DNI no corresponde con el n\u00FAmero',
	// nombre_persona
	'nombre_persona_min_size_ko': 'Nombre demasiado corto. Debe tener entre 2 y 45 caracteres',
	'nombre_persona_max_size_ko': 'Nombre demasiado largo. Debe tener como m\u00E1ximo 45 caracteres',
	'nombre_persona_format_ko': 'Formato de nombre incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), puntos, guiones y espacios',
	// apellidos_persona
	'apellidos_persona_min_size_ko': 'Apellidos demasiado cortos. Debe tener entre 3 y 100 caracteres',
	'apellidos_persona_max_size_ko': 'Apellidos demasiado largos. Debe tener como m\u00E1ximo 100 caracteres',
	'apellidos_persona_format_ko': 'Formato de apellidos incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), puntos, guiones y espacios',
	// fechaNacimiento_persona
	'fechaNacimiento_persona_min_size_ko': 'Fecha demasiado corta. Debe tener entre 8 y 10 caracteres con formato d/m/aaaa o dd/mm/aaaa',
	'fechaNacimiento_persona_max_size_ko': 'Fecha demasiado larga. Debe tener como m\u00E1ximo 10 caracteres',
	'fechaNacimiento_persona_format_ko': 'Formato de fecha incorrecto. Debe ser d/m/aaaa o dd/mm/aaaa',
	'fechaNacimiento_persona_personalized_ko': 'La fecha no existe en el calendario',
	'fechaNacimiento_persona_future_date_ko': 'La fecha de nacimiento no puede ser posterior a la fecha actual',
	// direccion_persona
	'direccion_persona_min_size_ko': 'Direcci\u00F3n demasiado corta. Debe tener entre 10 y 200 caracteres',
	'direccion_persona_max_size_ko': 'Direcci\u00F3n demasiado larga. Debe tener como m\u00E1ximo 200 caracteres',
	'direccion_persona_format_ko': 'Formato de direcci\u00F3n incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), n\u00FAmeros, puntos, guiones, punto y coma, espacios y /',
	// telefono_persona
	'telefono_persona_min_size_ko': 'Tel\u00E9fono demasiado corto. Debe tener 9 d\u00EDgitos',
	'telefono_persona_max_size_ko': 'Tel\u00E9fono demasiado largo. Debe tener como m\u00E1ximo 9 d\u00EDgitos',
	'telefono_persona_format_ko': 'Formato de tel\u00E9fono incorrecto. Solo se permiten d\u00EDgitos',
	'telefono_persona_personalized_ko': 'Tel\u00E9fono incorrecto. Debe empezar por 6, 7, 8 o 9',
	// email_persona
	'email_persona_min_size_ko': 'Email demasiado corto. Debe tener entre 6 y 45 caracteres',
	'email_persona_max_size_ko': 'Email demasiado largo. Debe tener como m\u00E1ximo 45 caracteres',
	'email_persona_format_ko': 'Formato de email incorrecto. Debe ser del tipo usuario@dominio.ext',
	// foto_persona
	'foto_persona_min_size_ko': 'Nombre de foto demasiado corto. Debe tener entre 5 y 15 caracteres',
	'foto_persona_max_size_ko': 'Nombre de foto demasiado largo. Debe tener como m\u00E1ximo 15 caracteres',
	'foto_persona_format_ko': 'Formato de nombre de foto incorrecto. Solo letras sin acentos y puntos, con extensi\u00F3n .jpg o .jpeg',
	// nuevo_foto_persona
	'nuevo_foto_persona_exist_file_ko': 'No se ha seleccionado foto. Debe subir una foto jpg o jpeg',
	'nuevo_foto_persona_min_size_name_file_ko': 'Nombre de foto demasiado corto. Debe tener entre 5 y 15 caracteres',
	'nuevo_foto_persona_max_size_name_file_ko': 'Nombre de foto demasiado largo. Debe tener entre 5 y 15 caracteres',
	'nuevo_foto_persona_format_name_file_ko': 'Nombre de foto incorrecto. Solo letras sin acentos y puntos, con extensi\u00F3n .jpg o .jpeg',
	'nuevo_foto_persona_type_file_ko': 'Tipo de fichero incorrecto. La foto debe ser jpg o jpeg',
	'nuevo_foto_persona_max_size_file_ko': 'Tama\u00F1o de foto excesivo. Debe ser como m\u00E1ximo 2 MB',

	/*************************************************************************
		ACCION
	*************************************************************************/
	'text_titulo_page_accion': 'Gesti\u00F3n de Acciones',
	'text_contenido_titulo_form_accion_ADD': 'Formulario Alta Acci\u00F3n',
	'text_contenido_titulo_form_accion_EDIT': 'Formulario Modificaci\u00F3n Acci\u00F3n',
	'text_contenido_titulo_form_accion_DELETE': 'Formulario Eliminaci\u00F3n Acci\u00F3n',
	'text_contenido_titulo_form_accion_SHOWCURRENT': 'Formulario Detalle Acci\u00F3n',
	'text_contenido_titulo_form_accion_SEARCH': 'Formulario B\u00FAsqueda Acci\u00F3n',
	'id_accion': 'Id Acci\u00F3n',
	'nombre_accion': 'Nombre Acci\u00F3n',
	'descrip_accion': 'Descripci\u00F3n Acci\u00F3n',
	'label_id_accion': 'Id Acci\u00F3n',
	'label_nombre_accion': 'Nombre Acci\u00F3n',
	'label_descrip_accion': 'Descripci\u00F3n Acci\u00F3n',
	'id_accion_min_size_ko': 'El id de acci\u00F3n es demasiado corto. Introduzca al menos 1 n\u00FAmero',
	'id_accion_max_size_ko': 'El id de acci\u00F3n es demasiado largo. Introduzca hasta un m\u00E1ximo de 11 n\u00FAmeros',
	'id_accion_format_ko': 'El id de acci\u00F3n tiene un formato incorrecto. Introduzca el id correctamente con formato num\u00E9rico',
	'nombre_accion_min_size_ko': 'El nombre de acci\u00F3n es demasiado corto. Introduzca al menos 5 caracteres',
	'nombre_accion_max_size_ko': 'El nombre de acci\u00F3n es demasiado largo. Introduzca hasta un m\u00E1ximo de 48 caracteres',
	'nombre_accion_format_ko': 'El nombre de acci\u00F3n tiene un formato incorrecto. Introduzca el nombre correctamente permitiendo \u00F1',
	'descrip_accion_min_size_ko': 'La descripci\u00F3n de acci\u00F3n es demasiado corta. Introduzca al menos 5 caracteres',
	'descrip_accion_max_size_ko': 'La descripci\u00F3n de acci\u00F3n es demasiado larga. Introduzca hasta un m\u00E1ximo de 200 caracteres',
	'descrip_accion_format_ko': 'La descripci\u00F3n de acci\u00F3n tiene un formato incorrecto. Introduzca texto alfab\u00E9tico permitiendo \u00F1, espacios y signos de puntuaci\u00F3n',

	/*************************************************************************
		FUNCIONALIDAD
	*************************************************************************/
	'text_titulo_page_funcionalidad': 'Gesti\u00F3n de Funcionalidades',
	'text_contenido_titulo_form_funcionalidad_ADD': 'Formulario Alta Funcionalidad',
	'text_contenido_titulo_form_funcionalidad_EDIT': 'Formulario Modificaci\u00F3n Funcionalidad',
	'text_contenido_titulo_form_funcionalidad_DELETE': 'Formulario Eliminaci\u00F3n Funcionalidad',
	'text_contenido_titulo_form_funcionalidad_SHOWCURRENT': 'Formulario Detalle Funcionalidad',
	'text_contenido_titulo_form_funcionalidad_SEARCH': 'Formulario B\u00FAsqueda Funcionalidad',
	'id_funcionalidad': 'Id Funcionalidad',
	'nombre_funcionalidad': 'Nombre Funcionalidad',
	'descrip_funcionalidad': 'Descripci\u00F3n Funcionalidad',
	'label_id_funcionalidad': 'Id Funcionalidad',
	'label_nombre_funcionalidad': 'Nombre Funcionalidad',
	'label_descrip_funcionalidad': 'Descripci\u00F3n Funcionalidad',
	'id_funcionalidad_min_size_ko': 'El id de funcionalidad es demasiado corto. Introduzca al menos 1 n\u00FAmero',
	'id_funcionalidad_max_size_ko': 'El id de funcionalidad es demasiado largo. Introduzca hasta un m\u00E1ximo de 11 n\u00FAmeros',
	'id_funcionalidad_format_ko': 'El id de funcionalidad tiene un formato incorrecto. Introduzca el id correctamente con formato num\u00E9rico',
	'nombre_funcionalidad_min_size_ko': 'El nombre de funcionalidad es demasiado corto. Introduzca al menos 5 caracteres',
	'nombre_funcionalidad_max_size_ko': 'El nombre de funcionalidad es demasiado largo. Introduzca hasta un m\u00E1ximo de 48 caracteres',
	'nombre_funcionalidad_format_ko': 'El nombre de funcionalidad tiene un formato incorrecto. Introduzca el nombre correctamente permitiendo \u00F1',
	'descrip_funcionalidad_min_size_ko': 'La descripci\u00F3n de funcionalidad es demasiado corta. Introduzca al menos 5 caracteres',
	'descrip_funcionalidad_max_size_ko': 'La descripci\u00F3n de funcionalidad es demasiado larga. Introduzca hasta un m\u00E1ximo de 200 caracteres',
	'descrip_funcionalidad_format_ko': 'La descripci\u00F3n de funcionalidad tiene un formato incorrecto. Introduzca texto alfab\u00E9tico permitiendo \u00F1, espacios y signos de puntuaci\u00F3n',

	/*************************************************************************
		ROL
	*************************************************************************/
	'text_titulo_page_rol': 'Gesti\u00F3n de Roles',
	'text_contenido_titulo_form_rol_ADD': 'Formulario Alta Rol',
	'text_contenido_titulo_form_rol_EDIT': 'Formulario Modificaci\u00F3n Rol',
	'text_contenido_titulo_form_rol_DELETE': 'Formulario Eliminaci\u00F3n Rol',
	'text_contenido_titulo_form_rol_SHOWCURRENT': 'Formulario Detalle Rol',
	'text_contenido_titulo_form_rol_SEARCH': 'Formulario B\u00FAsqueda Rol',
	'id_rol': 'Id Rol',
	'rol_name': 'Nombre Rol',
	'rol_description': 'Descripci\u00F3n Rol',
	'label_id_rol': 'Rol',
	'label_rol_name': 'Nombre Rol',
	'label_rol_description': 'Descripci\u00F3n Rol',
	// id_rol: comunes a rol y usuario
	'id_rol_min_size_ko': 'El id de rol es demasiado corto. Introduzca al menos 1 n\u00FAmero',
	'id_rol_max_size_ko': 'El id de rol es demasiado largo. Introduzca hasta un m\u00E1ximo de 11 n\u00FAmeros',
	'id_rol_format_ko': 'El id de rol tiene un formato incorrecto. Introduzca el id correctamente con formato num\u00E9rico',
	'rol_name_min_size_ko': 'El nombre de rol es demasiado corto. Introduzca al menos 5 caracteres',
	'rol_name_max_size_ko': 'El nombre de rol es demasiado largo. Introduzca hasta un m\u00E1ximo de 48 caracteres',
	'rol_name_format_ko': 'El nombre de rol tiene un formato incorrecto. Solo se permiten letras alfab\u00E9ticas',
	'rol_description_min_size_ko': 'La descripci\u00F3n de rol es demasiado corta. Introduzca al menos 5 caracteres',
	'rol_description_max_size_ko': 'La descripci\u00F3n de rol es demasiado larga. Introduzca hasta un m\u00E1ximo de 200 caracteres',
	'rol_description_format_ko': 'La descripci\u00F3n de rol tiene un formato incorrecto. Introduzca texto alfab\u00E9tico permitiendo \u00F1, espacios y signos de puntuaci\u00F3n',

	/*************************************************************************
		USUARIO (los errores de dni e id_rol estan en persona y rol)
	*************************************************************************/
	'text_titulo_page_usuario': 'Gesti\u00F3n de Usuarios',
	'text_contenido_titulo_form_usuario_ADD': 'Formulario Alta Usuario',
	'text_contenido_titulo_form_usuario_EDIT': 'Formulario Modificaci\u00F3n Usuario',
	'text_contenido_titulo_form_usuario_DELETE': 'Formulario Eliminaci\u00F3n Usuario',
	'text_contenido_titulo_form_usuario_SHOWCURRENT': 'Formulario Detalle Usuario',
	'text_contenido_titulo_form_usuario_SEARCH': 'Formulario B\u00FAsqueda Usuario',
	'usuario': 'Usuario',
	'contrasena': 'Contrase\u00F1a',
	'label_usuario': 'Usuario',
	'label_contrasena': 'Contrase\u00F1a',
	'usuario_min_size_ko': 'El usuario es demasiado corto. Introduzca al menos 5 caracteres',
	'usuario_max_size_ko': 'El usuario es demasiado largo. Introduzca hasta un m\u00E1ximo de 45 caracteres',
	'usuario_format_ko': 'El usuario tiene un formato incorrecto. Introduzca solo letras, sin \u00F1 ni acentos',
	'contrasena_min_size_ko': 'La contrase\u00F1a es demasiado corta. Introduzca al menos 8 caracteres',
	'contrasena_max_size_ko': 'La contrase\u00F1a es demasiado larga. Introduzca hasta un m\u00E1ximo de 45 caracteres',
	'contrasena_format_ko': 'La contrase\u00F1a tiene un formato incorrecto. Introduzca solo letras, sin \u00F1 ni acentos',

	/*************************************************************************
		ROLACCIONFUNCIONALIDAD (los atributos y errores de id_rol, id_accion e id_funcionalidad estan en rol, accion y funcionalidad)
	*************************************************************************/
	'text_titulo_page_rolaccionfuncionalidad': 'Gesti\u00F3n de Permisos Rol-Acci\u00F3n-Funcionalidad',
	'text_contenido_titulo_form_rolaccionfuncionalidad_ADD': 'Formulario Alta Permiso Rol-Acci\u00F3n-Funcionalidad',
	'text_contenido_titulo_form_rolaccionfuncionalidad_EDIT': 'Formulario Modificaci\u00F3n Permiso Rol-Acci\u00F3n-Funcionalidad',
	'text_contenido_titulo_form_rolaccionfuncionalidad_DELETE': 'Formulario Eliminaci\u00F3n Permiso Rol-Acci\u00F3n-Funcionalidad',
	'text_contenido_titulo_form_rolaccionfuncionalidad_SHOWCURRENT': 'Formulario Detalle Permiso Rol-Acci\u00F3n-Funcionalidad',
	'text_contenido_titulo_form_rolaccionfuncionalidad_SEARCH': 'Formulario B\u00FAsqueda Permiso Rol-Acci\u00F3n-Funcionalidad',

	/*************************************************************************
		FUNCIONALIDAD_ACCION (los atributos y errores de id_accion e id_funcionalidad estan en accion y funcionalidad)
	*************************************************************************/
	'text_titulo_page_funcionalidad_accion': 'Gesti\u00F3n de Funcionalidad-Acci\u00F3n',
	'text_matriz_rolaccionfuncionalidad': 'Rol \\ Funcionalidad / Acci\u00F3n',
	'text_matriz_funcionalidad_accion': 'Funcionalidad \\ Acci\u00F3n',
	'text_contenido_titulo_form_funcionalidad_accion_ADD': 'Formulario Alta Funcionalidad-Acci\u00F3n',
	'text_contenido_titulo_form_funcionalidad_accion_EDIT': 'Formulario Modificaci\u00F3n Funcionalidad-Acci\u00F3n',
	'text_contenido_titulo_form_funcionalidad_accion_DELETE': 'Formulario Eliminaci\u00F3n Funcionalidad-Acci\u00F3n',
	'text_contenido_titulo_form_funcionalidad_accion_SHOWCURRENT': 'Formulario Detalle Funcionalidad-Acci\u00F3n',
	'text_contenido_titulo_form_funcionalidad_accion_SEARCH': 'Formulario B\u00FAsqueda Funcionalidad-Acci\u00F3n',

	/*************************************************************************
		ERRORES DE ACCION (devueltos por el back)
	*************************************************************************/
	'RECORDSET_VACIO': 'No hay coincidencias para la b\u00FAsqueda',
	'dni_es_nulo_ko': 'El DNI no puede ser vac\u00EDo',
	'admin_no_se_puede_modificar_ko': 'El admin no se puede modificar',
	'ERROR_UPLOAD_foto_persona_KO': 'Error al subir la foto al servidor. Int\u00E9ntelo de nuevo o pruebe con otra foto',

}