var textos_EN = {

	// general titles
	'text_titulo_app': 'IU ET2 Interface',
	'text_titulo_menu': 'Menu Options',
	'text_titulo_pie': 'Footer',
	'label_seleccioncolumnas': 'Select columns',

	// result of a correct validation (used by the test)
	'true': 'Correct',

	// ventana de resultados del TEST
	'text_test_resultado': 'Test results for entity',
	'text_test_total': 'Total',
	'text_test_correctas': 'Correct',
	'text_test_incorrectas': 'Incorrect',
	'text_test_sintraduccion': 'Without translation',
	'text_test_ventana_bloqueada': 'The browser has blocked the window with the test results. Allow pop-up windows for this page and press TEST again',

	// menu
	'text_menu_persona': 'Person management',
	'text_menu_usuario': 'User management',
	'text_menu_rol': 'Role management',
	'text_menu_accion': 'Action management',
	'text_menu_funcionalidad': 'Functionality management',
	'text_menu_funcionalidad_accion': 'Functionality-action permissions',
	'text_menu_rolaccionfuncionalidad': 'Role-action-functionality permissions',

	// table action columns
	'EDIT': 'Edit',
	'DELETE': 'Delete',
	'SHOWCURRENT': 'Detail',

	// opcion vacia de los select de FK
	'text_opcion_seleccionar': '-- Select --',
	'text_opcion_todos': '-- All --',

	// matriz de permisos
	'text_matriz_esquina': 'Functionality \\ Action',
	'label_matriz_rol': 'Role:',
	'text_matriz_ayuda': 'Changes are saved automatically when a box is checked or unchecked; there is no other button to press.',
	'text_matriz_ayuda_rol': 'Changes are saved automatically when a box is checked or unchecked; there is no other button to press. Disabled boxes are combinations that cannot be assigned.',
	'text_error_matriz_no_guardado': 'The server answered correctly, but the change has not been saved. Try again',
	'text_error_matriz_comprobacion': 'It was not possible to check on the server whether the change was saved. Search again to see the current state',

	// iconos del boton de submit (alt y title)
	'text_icono_ADD': 'Add',
	'text_icono_EDIT': 'Edit',
	'text_icono_DELETE': 'Delete',
	'text_icono_SEARCH': 'Search',
	'text_icono_calendario': 'Pick the date from the calendar',

	// error del back sin traduccion propia
	'text_error_back_desconocido': 'An error occurred while performing the action on the server',

	/*************************************************************************
		PERSONA
	*************************************************************************/

	// titles
	'text_titulo_page_persona': 'Personal Data Management',
	'text_contenido_titulo_form_persona_ADD': 'Add Personal Data Form',
	'text_contenido_titulo_form_persona_EDIT': 'Edit Personal Data Form',
	'text_contenido_titulo_form_persona_DELETE': 'Delete Personal Data Form',
	'text_contenido_titulo_form_persona_SHOWCURRENT': 'Personal Data Detail Form',
	'text_contenido_titulo_form_persona_SEARCH': 'Search Personal Data Form',

	// attributes (table headers and column selector)
	'dni': 'ID number',
	'nombre_persona': 'First name',
	'apellidos_persona': 'Last name',
	'fechaNacimiento_persona': 'Date of birth',
	'direccion_persona': 'Address',
	'telefono_persona': 'Phone',
	'email_persona': 'Email',
	'foto_persona': 'Photo',

	// labels
	'label_dni': 'ID number',
	'label_nombre_persona': 'First name',
	'label_apellidos_persona': 'Last name',
	'label_fechaNacimiento_persona': 'Date of birth',
	'label_direccion_persona': 'Address',
	'label_telefono_persona': 'Phone',
	'label_email_persona': 'Email',
	'label_foto_persona': 'Photo',
	'label_nuevo_foto_persona': 'New photo',

	// validation errors
	// dni
	'dni_min_size_ko': 'ID number too short. It must have 9 characters: 8 digits and 1 uppercase letter',
	'dni_max_size_ko': 'ID number too long. It must have 9 characters: 8 digits and 1 uppercase letter',
	'dni_format_ko': 'Wrong ID number format. It must be 8 digits followed by an uppercase letter',
	'dni_personalized_ko': 'The ID letter does not match the number',
	// nombre_persona
	'nombre_persona_min_size_ko': 'First name too short. It must have between 2 and 45 characters',
	'nombre_persona_max_size_ko': 'First name too long. It must have at most 45 characters',
	'nombre_persona_format_ko': 'Wrong first name format. Only letters (including \u00F1 and accents), dots, hyphens and spaces are allowed',
	// apellidos_persona
	'apellidos_persona_min_size_ko': 'Last name too short. It must have between 3 and 100 characters',
	'apellidos_persona_max_size_ko': 'Last name too long. It must have at most 100 characters',
	'apellidos_persona_format_ko': 'Wrong last name format. Only letters (including \u00F1 and accents), dots, hyphens and spaces are allowed',
	// fechaNacimiento_persona
	'fechaNacimiento_persona_min_size_ko': 'Date too short. It must have between 8 and 10 characters in d/m/yyyy or dd/mm/yyyy format',
	'fechaNacimiento_persona_max_size_ko': 'Date too long. It must have at most 10 characters',
	'fechaNacimiento_persona_format_ko': 'Wrong date format. It must be d/m/yyyy or dd/mm/yyyy',
	'fechaNacimiento_persona_personalized_ko': 'The date does not exist in the calendar',
	'fechaNacimiento_persona_future_date_ko': 'The date of birth cannot be later than today',
	// direccion_persona
	'direccion_persona_min_size_ko': 'Address too short. It must have between 10 and 200 characters',
	'direccion_persona_max_size_ko': 'Address too long. It must have at most 200 characters',
	'direccion_persona_format_ko': 'Wrong address format. Only letters (including \u00F1 and accents), digits, dots, hyphens, semicolons, spaces and / are allowed',
	// telefono_persona
	'telefono_persona_min_size_ko': 'Phone too short. It must have 9 digits',
	'telefono_persona_max_size_ko': 'Phone too long. It must have at most 9 digits',
	'telefono_persona_format_ko': 'Wrong phone format. Only digits are allowed',
	'telefono_persona_personalized_ko': 'Wrong phone. It must start with 6, 7, 8 or 9',
	// email_persona
	'email_persona_min_size_ko': 'Email too short. It must have between 6 and 45 characters',
	'email_persona_max_size_ko': 'Email too long. It must have at most 45 characters',
	'email_persona_format_ko': 'Wrong email format. It must be like user@domain.ext',
	// foto_persona
	'foto_persona_min_size_ko': 'Photo name too short. It must have between 5 and 15 characters',
	'foto_persona_max_size_ko': 'Photo name too long. It must have at most 15 characters',
	'foto_persona_format_ko': 'Wrong photo name format. Only letters without accents and dots, with .jpg or .jpeg extension',
	// nuevo_foto_persona
	'nuevo_foto_persona_exist_file_ko': 'No photo selected. You must upload a jpg or jpeg photo',
	'nuevo_foto_persona_min_size_name_file_ko': 'Photo file name too short. It must have between 5 and 15 characters',
	'nuevo_foto_persona_max_size_name_file_ko': 'Photo file name too long. It must have between 5 and 15 characters',
	'nuevo_foto_persona_format_name_file_ko': 'Wrong photo file name. Only letters without accents and dots, with .jpg or .jpeg extension',
	'nuevo_foto_persona_type_file_ko': 'Wrong file type. The photo must be jpg or jpeg',
	'nuevo_foto_persona_max_size_file_ko': 'Photo too big. It must be at most 2 MB',

	/*************************************************************************
		ACCION
	*************************************************************************/
	'text_titulo_page_accion': 'Action Management',
	'text_contenido_titulo_form_accion_ADD': 'Add Action Form',
	'text_contenido_titulo_form_accion_EDIT': 'Edit Action Form',
	'text_contenido_titulo_form_accion_DELETE': 'Delete Action Form',
	'text_contenido_titulo_form_accion_SHOWCURRENT': 'Action Detail Form',
	'text_contenido_titulo_form_accion_SEARCH': 'Search Action Form',
	'id_accion': 'Action Id',
	'nombre_accion': 'Action name',
	'descrip_accion': 'Action description',
	'label_id_accion': 'Action Id',
	'label_nombre_accion': 'Action name',
	'label_descrip_accion': 'Action description',
	'id_accion_min_size_ko': 'The action id is too short. Enter at least 1 digit',
	'id_accion_max_size_ko': 'The action id is too long. Enter at most 11 digits',
	'id_accion_format_ko': 'Wrong action id format. Only digits are allowed',
	'nombre_accion_min_size_ko': 'The action name is too short. Enter at least 5 characters',
	'nombre_accion_max_size_ko': 'The action name is too long. Enter at most 48 characters',
	'nombre_accion_format_ko': 'Wrong action name format. Only letters (including \u00F1) are allowed',
	'descrip_accion_min_size_ko': 'The action description is too short. Enter at least 5 characters',
	'descrip_accion_max_size_ko': 'The action description is too long. Enter at most 200 characters',
	'descrip_accion_format_ko': 'Wrong action description format. Only letters (including \u00F1), spaces and punctuation marks are allowed',

	/*************************************************************************
		FUNCIONALIDAD
	*************************************************************************/
	'text_titulo_page_funcionalidad': 'Functionality Management',
	'text_contenido_titulo_form_funcionalidad_ADD': 'Add Functionality Form',
	'text_contenido_titulo_form_funcionalidad_EDIT': 'Edit Functionality Form',
	'text_contenido_titulo_form_funcionalidad_DELETE': 'Delete Functionality Form',
	'text_contenido_titulo_form_funcionalidad_SHOWCURRENT': 'Functionality Detail Form',
	'text_contenido_titulo_form_funcionalidad_SEARCH': 'Search Functionality Form',
	'id_funcionalidad': 'Functionality Id',
	'nombre_funcionalidad': 'Functionality name',
	'descrip_funcionalidad': 'Functionality description',
	'label_id_funcionalidad': 'Functionality Id',
	'label_nombre_funcionalidad': 'Functionality name',
	'label_descrip_funcionalidad': 'Functionality description',
	'id_funcionalidad_min_size_ko': 'The functionality id is too short. Enter at least 1 digit',
	'id_funcionalidad_max_size_ko': 'The functionality id is too long. Enter at most 11 digits',
	'id_funcionalidad_format_ko': 'Wrong functionality id format. Only digits are allowed',
	'nombre_funcionalidad_min_size_ko': 'The functionality name is too short. Enter at least 5 characters',
	'nombre_funcionalidad_max_size_ko': 'The functionality name is too long. Enter at most 48 characters',
	'nombre_funcionalidad_format_ko': 'Wrong functionality name format. Only letters (including \u00F1) are allowed',
	'descrip_funcionalidad_min_size_ko': 'The functionality description is too short. Enter at least 5 characters',
	'descrip_funcionalidad_max_size_ko': 'The functionality description is too long. Enter at most 200 characters',
	'descrip_funcionalidad_format_ko': 'Wrong functionality description format. Only letters (including \u00F1), spaces and punctuation marks are allowed',

	/*************************************************************************
		ROL
	*************************************************************************/
	'text_titulo_page_rol': 'Role Management',
	'text_contenido_titulo_form_rol_ADD': 'Add Role Form',
	'text_contenido_titulo_form_rol_EDIT': 'Edit Role Form',
	'text_contenido_titulo_form_rol_DELETE': 'Delete Role Form',
	'text_contenido_titulo_form_rol_SHOWCURRENT': 'Role Detail Form',
	'text_contenido_titulo_form_rol_SEARCH': 'Search Role Form',
	'id_rol': 'Role Id',
	'rol_name': 'Role name',
	'rol_description': 'Role description',
	'label_id_rol': 'Role Id',
	'label_rol_name': 'Role name',
	'label_rol_description': 'Role description',
	// id_rol: shared by rol and usuario
	'id_rol_min_size_ko': 'The role id is too short. Enter at least 1 digit',
	'id_rol_max_size_ko': 'The role id is too long. Enter at most 11 digits',
	'id_rol_format_ko': 'Wrong role id format. Only digits are allowed',
	'rol_name_min_size_ko': 'The role name is too short. Enter at least 5 characters',
	'rol_name_max_size_ko': 'The role name is too long. Enter at most 48 characters',
	'rol_name_format_ko': 'Wrong role name format. Only letters are allowed',
	'rol_description_min_size_ko': 'The role description is too short. Enter at least 5 characters',
	'rol_description_max_size_ko': 'The role description is too long. Enter at most 200 characters',
	'rol_description_format_ko': 'Wrong role description format. Only letters (including \u00F1), spaces and punctuation marks are allowed',

	/*************************************************************************
		USUARIO (dni and id_rol errors are in persona and rol)
	*************************************************************************/
	'text_titulo_page_usuario': 'User Management',
	'text_contenido_titulo_form_usuario_ADD': 'Add User Form',
	'text_contenido_titulo_form_usuario_EDIT': 'Edit User Form',
	'text_contenido_titulo_form_usuario_DELETE': 'Delete User Form',
	'text_contenido_titulo_form_usuario_SHOWCURRENT': 'User Detail Form',
	'text_contenido_titulo_form_usuario_SEARCH': 'Search User Form',
	'usuario': 'User',
	'contrasena': 'Password',
	'label_usuario': 'User',
	'label_contrasena': 'Password',
	'usuario_min_size_ko': 'The user name is too short. Enter at least 5 characters',
	'usuario_max_size_ko': 'The user name is too long. Enter at most 45 characters',
	'usuario_format_ko': 'Wrong user name format. Only letters without \u00F1 or accents are allowed',
	'contrasena_min_size_ko': 'The password is too short. Enter at least 8 characters',
	'contrasena_max_size_ko': 'The password is too long. Enter at most 45 characters',
	'contrasena_format_ko': 'Wrong password format. Only letters without \u00F1 or accents are allowed',

	/*************************************************************************
		FUNCIONALIDAD_ACCION (id error codes are in accion, funcionalidad and rol)
	*************************************************************************/
	'text_titulo_page_funcionalidad_accion': 'Functionality-Action Permission Management',
	'text_contenido_titulo_form_funcionalidad_accion_ADD': 'Add Functionality-Action Permission Form',
	'text_contenido_titulo_form_funcionalidad_accion_EDIT': 'Edit Functionality-Action Permission Form',
	'text_contenido_titulo_form_funcionalidad_accion_DELETE': 'Delete Functionality-Action Permission Form',
	'text_contenido_titulo_form_funcionalidad_accion_SHOWCURRENT': 'Functionality-Action Permission Detail Form',
	'text_contenido_titulo_form_funcionalidad_accion_SEARCH': 'Search Functionality-Action Permission Form',

	/*************************************************************************
		ROLACCIONFUNCIONALIDAD (id error codes are in accion, funcionalidad and rol)
	*************************************************************************/
	'text_titulo_page_rolaccionfuncionalidad': 'Role-Action-Functionality Permission Management',
	'text_contenido_titulo_form_rolaccionfuncionalidad_ADD': 'Add Role-Action-Functionality Permission Form',
	'text_contenido_titulo_form_rolaccionfuncionalidad_EDIT': 'Edit Role-Action-Functionality Permission Form',
	'text_contenido_titulo_form_rolaccionfuncionalidad_DELETE': 'Delete Role-Action-Functionality Permission Form',
	'text_contenido_titulo_form_rolaccionfuncionalidad_SHOWCURRENT': 'Role-Action-Functionality Permission Detail Form',
	'text_contenido_titulo_form_rolaccionfuncionalidad_SEARCH': 'Search Role-Action-Functionality Permission Form',

	/*************************************************************************
		ACTION ERRORS (returned by the back end)
	*************************************************************************/
	'RECORDSET_VACIO': 'There are no results for your search',
	'dni_es_nulo_ko': 'The ID number cannot be empty',
	'admin_no_se_puede_modificar_ko': 'The admin cannot be modified',
	'ERROR_UPLOAD_foto_persona_KO': 'Error uploading the photo to the server. Try again or use another photo',

}
