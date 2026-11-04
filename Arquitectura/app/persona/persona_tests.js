let persona_def_tests = Array(

	/* ==================== DNI ====================*/

	// ---------- ADD ----------
	Array('persona', 'dni', 'select', 1, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'dni_min_size_ko', 'DNI demasiado corto. Debe tener 9 caracteres: 8 numeros y 1 letra mayuscula'),
	Array('persona', 'dni', 'select', 2, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'dni_max_size_ko', 'DNI demasiado largo. Debe tener 9 caracteres: 8 numeros y 1 letra mayuscula'),
	Array('persona', 'dni', 'select', 3, 'cumple formato', 'format', 'ADD', 'dni_format_ko', 'Formato de DNI incorrecto. Debe ser 8 numeros seguidos de una letra mayuscula'),
	Array('persona', 'dni', 'select', 4, 'cumple letra dni', 'personalized', 'ADD', 'dni_personalized_ko', 'La letra del DNI no corresponde con el numero'),
	Array('persona', 'dni', 'select', 5, 'es correcto', 'valid', 'ADD', true, 'DNI correcto'),

	// ---------- SEARCH ----------
	Array('persona', 'dni', 'select', 6, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'dni_max_size_ko', 'DNI demasiado largo. Debe tener como maximo 9 caracteres'),
	Array('persona', 'dni', 'select', 7, 'cumple formato', 'format', 'SEARCH', 'dni_format_ko', 'Formato de busqueda de DNI incorrecto. Solo se permiten numeros y letras mayusculas'),
	Array('persona', 'dni', 'select', 8, 'es correcto', 'valid', 'SEARCH', true, 'Busqueda por DNI correcta'),

/* ==================== NOMBRE_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'nombre_persona', 'input', 9, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'nombre_persona_min_size_ko', 'Nombre demasiado corto. Debe tener entre 2 y 45 caracteres'),
	Array('persona', 'nombre_persona', 'input', 10, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'nombre_persona_max_size_ko', 'Nombre demasiado largo. Debe tener entre 2 y 45 caracteres'),
	Array('persona', 'nombre_persona', 'input', 11, 'cumple formato', 'format', 'ADD', 'nombre_persona_format_ko', 'Formato de nombre incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), puntos, guiones y espacios'),
	Array('persona', 'nombre_persona', 'input', 12, 'es correcto', 'valid', 'ADD', true, 'Nombre correcto'),

	// ---------- EDIT ----------
	Array('persona', 'nombre_persona', 'input', 13, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT', 'nombre_persona_min_size_ko', 'Nombre demasiado corto. Debe tener entre 2 y 45 caracteres'),
	Array('persona', 'nombre_persona', 'input', 14, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT', 'nombre_persona_max_size_ko', 'Nombre demasiado largo. Debe tener entre 2 y 45 caracteres'),
	Array('persona', 'nombre_persona', 'input', 15, 'cumple formato', 'format', 'EDIT', 'nombre_persona_format_ko', 'Formato de nombre incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), puntos, guiones y espacios'),
	Array('persona', 'nombre_persona', 'input', 16, 'es correcto', 'valid', 'EDIT', true, 'Nombre correcto'),

	// ---------- SEARCH ----------
	Array('persona', 'nombre_persona', 'input', 17, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'nombre_persona_max_size_ko', 'Nombre demasiado largo. Debe tener como maximo 45 caracteres'),
	Array('persona', 'nombre_persona', 'input', 18, 'cumple formato', 'format', 'SEARCH', 'nombre_persona_format_ko', 'Formato de busqueda de nombre incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), puntos, guiones y espacios'),
	Array('persona', 'nombre_persona', 'input', 19, 'es correcto', 'valid', 'SEARCH', true, 'Busqueda por nombre correcta'),

/* ==================== APELLIDOS_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'apellidos_persona', 'input', 20, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'apellidos_persona_min_size_ko', 'Apellidos demasiado cortos. Debe tener entre 3 y 100 caracteres'),
	Array('persona', 'apellidos_persona', 'input', 21, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'apellidos_persona_max_size_ko', 'Apellidos demasiado largos. Debe tener entre 3 y 100 caracteres'),
	Array('persona', 'apellidos_persona', 'input', 22, 'cumple formato', 'format', 'ADD', 'apellidos_persona_format_ko', 'Formato de apellidos incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), puntos, guiones y espacios'),
	Array('persona', 'apellidos_persona', 'input', 23, 'es correcto', 'valid', 'ADD', true, 'Apellidos correctos'),

	// ---------- EDIT ----------
	Array('persona', 'apellidos_persona', 'input', 24, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT', 'apellidos_persona_min_size_ko', 'Apellidos demasiado cortos. Debe tener entre 3 y 100 caracteres'),
	Array('persona', 'apellidos_persona', 'input', 25, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT', 'apellidos_persona_max_size_ko', 'Apellidos demasiado largos. Debe tener entre 3 y 100 caracteres'),
	Array('persona', 'apellidos_persona', 'input', 26, 'cumple formato', 'format', 'EDIT', 'apellidos_persona_format_ko', 'Formato de apellidos incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), puntos, guiones y espacios'),
	Array('persona', 'apellidos_persona', 'input', 27, 'es correcto', 'valid', 'EDIT', true, 'Apellidos correctos'),

	// ---------- SEARCH ----------
	Array('persona', 'apellidos_persona', 'input', 28, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'apellidos_persona_max_size_ko', 'Apellidos demasiado largos. Debe tener como maximo 100 caracteres'),
	Array('persona', 'apellidos_persona', 'input', 29, 'cumple formato', 'format', 'SEARCH', 'apellidos_persona_format_ko', 'Formato de busqueda de apellidos incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), puntos, guiones y espacios'),
	Array('persona', 'apellidos_persona', 'input', 30, 'es correcto', 'valid', 'SEARCH', true, 'Busqueda por apellidos correcta'),

/* ==================== FECHA_NACIMIENTO_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'fechaNacimiento_persona', 'input', 31, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'fechaNacimiento_persona_min_size_ko', 'Fecha demasiado corta. Debe tener entre 8 y 10 caracteres con formato d/m/aaaa o dd/mm/aaaa'),
	Array('persona', 'fechaNacimiento_persona', 'input', 32, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'fechaNacimiento_persona_max_size_ko', 'Fecha demasiado larga. Debe tener entre 8 y 10 caracteres con formato d/m/aaaa o dd/mm/aaaa'),
	Array('persona', 'fechaNacimiento_persona', 'input', 33, 'cumple formato', 'format', 'ADD', 'fechaNacimiento_persona_format_ko', 'Formato de fecha incorrecto. Debe ser d/m/aaaa o dd/mm/aaaa'),
	Array('persona', 'fechaNacimiento_persona', 'input', 34, 'cumple fecha existente', 'personalized', 'ADD', 'fechaNacimiento_persona_personalized_ko', 'La fecha no existe en el calendario'),
	Array('persona', 'fechaNacimiento_persona', 'input', 35, 'cumple fecha no posterior a la actual', 'personalized', 'ADD', 'fechaNacimiento_persona_future_date_ko', 'La fecha de nacimiento no puede ser posterior a la fecha actual'),
	Array('persona', 'fechaNacimiento_persona', 'input', 36, 'es correcto', 'valid', 'ADD', true, 'Fecha de nacimiento correcta'),

	// ---------- EDIT ----------
	Array('persona', 'fechaNacimiento_persona', 'input', 37, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT', 'fechaNacimiento_persona_min_size_ko', 'Fecha demasiado corta. Debe tener entre 8 y 10 caracteres con formato d/m/aaaa o dd/mm/aaaa'),
	Array('persona', 'fechaNacimiento_persona', 'input', 38, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT', 'fechaNacimiento_persona_max_size_ko', 'Fecha demasiado larga. Debe tener entre 8 y 10 caracteres con formato d/m/aaaa o dd/mm/aaaa'),
	Array('persona', 'fechaNacimiento_persona', 'input', 39, 'cumple formato', 'format', 'EDIT', 'fechaNacimiento_persona_format_ko', 'Formato de fecha incorrecto. Debe ser d/m/aaaa o dd/mm/aaaa'),
	Array('persona', 'fechaNacimiento_persona', 'input', 40, 'cumple fecha existente', 'personalized', 'EDIT', 'fechaNacimiento_persona_personalized_ko', 'La fecha no existe en el calendario'),
	Array('persona', 'fechaNacimiento_persona', 'input', 41, 'cumple fecha no posterior a la actual', 'personalized', 'EDIT', 'fechaNacimiento_persona_future_date_ko', 'La fecha de nacimiento no puede ser posterior a la fecha actual'),
	Array('persona', 'fechaNacimiento_persona', 'input', 42, 'es correcto', 'valid', 'EDIT', true, 'Fecha de nacimiento correcta'),

	// ---------- SEARCH ----------
	Array('persona', 'fechaNacimiento_persona', 'input', 43, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'fechaNacimiento_persona_max_size_ko', 'Fecha demasiado larga. Debe tener como maximo 10 caracteres'),
	Array('persona', 'fechaNacimiento_persona', 'input', 44, 'cumple formato', 'format', 'SEARCH', 'fechaNacimiento_persona_format_ko', 'Formato de busqueda de fecha incorrecto. Solo se permiten numeros y /'),
	Array('persona', 'fechaNacimiento_persona', 'input', 45, 'cumple fecha existente', 'personalized', 'SEARCH', 'fechaNacimiento_persona_personalized_ko', 'La fecha no existe en el calendario'),
	Array('persona', 'fechaNacimiento_persona', 'input', 46, 'es correcto', 'valid', 'SEARCH', true, 'Busqueda por fecha correcta'),
	
/* ==================== DIRECCION_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'direccion_persona', 'textarea', 47, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'direccion_persona_min_size_ko', 'Direccion demasiado corta. Debe tener entre 10 y 200 caracteres'),
	Array('persona', 'direccion_persona', 'textarea', 48, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'direccion_persona_max_size_ko', 'Direccion demasiado larga. Debe tener entre 10 y 200 caracteres'),
	Array('persona', 'direccion_persona', 'textarea', 49, 'cumple formato', 'format', 'ADD', 'direccion_persona_format_ko', 'Formato de direccion incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), numeros, puntos, guiones, punto y coma, espacios y /'),
	Array('persona', 'direccion_persona', 'textarea', 50, 'es correcto', 'valid', 'ADD', true, 'Direccion correcta'),

	// ---------- EDIT ----------
	Array('persona', 'direccion_persona', 'textarea', 51, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT', 'direccion_persona_min_size_ko', 'Direccion demasiado corta. Debe tener entre 10 y 200 caracteres'),
	Array('persona', 'direccion_persona', 'textarea', 52, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT', 'direccion_persona_max_size_ko', 'Direccion demasiado larga. Debe tener entre 10 y 200 caracteres'),
	Array('persona', 'direccion_persona', 'textarea', 53, 'cumple formato', 'format', 'EDIT', 'direccion_persona_format_ko', 'Formato de direccion incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), numeros, puntos, guiones, punto y coma, espacios y /'),
	Array('persona', 'direccion_persona', 'textarea', 54, 'es correcto', 'valid', 'EDIT', true, 'Direccion correcta'),

	// ---------- SEARCH ----------
	Array('persona', 'direccion_persona', 'textarea', 55, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'direccion_persona_max_size_ko', 'Direccion demasiado larga. Debe tener como maximo 200 caracteres'),
	Array('persona', 'direccion_persona', 'textarea', 56, 'cumple formato', 'format', 'SEARCH', 'direccion_persona_format_ko', 'Formato de busqueda de direccion incorrecto. Solo se permiten letras (incluidas \u00F1 y acentos), numeros, puntos, guiones, punto y coma, espacios y /'),
	Array('persona', 'direccion_persona', 'textarea', 57, 'es correcto', 'valid', 'SEARCH', true, 'Busqueda por direccion correcta'),

/* ==================== TELEFONO_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'telefono_persona', 'input', 58, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'telefono_persona_min_size_ko', 'Telefono demasiado corto. Debe tener 9 digitos'),
	Array('persona', 'telefono_persona', 'input', 59, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'telefono_persona_max_size_ko', 'Telefono demasiado largo. Debe tener 9 digitos'),
	Array('persona', 'telefono_persona', 'input', 60, 'cumple formato', 'format', 'ADD', 'telefono_persona_format_ko', 'Formato de telefono incorrecto. Solo se permiten 9 digitos'),
	Array('persona', 'telefono_persona', 'input', 61, 'cumple inicio telefono', 'personalized', 'ADD', 'telefono_persona_personalized_ko', 'Telefono incorrecto. Debe empezar por 6, 7, 8 o 9'),
	Array('persona', 'telefono_persona', 'input', 62, 'es correcto', 'valid', 'ADD', true, 'Telefono correcto'),

	// ---------- EDIT ----------
	Array('persona', 'telefono_persona', 'input', 63, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT', 'telefono_persona_min_size_ko', 'Telefono demasiado corto. Debe tener 9 digitos'),
	Array('persona', 'telefono_persona', 'input', 64, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT', 'telefono_persona_max_size_ko', 'Telefono demasiado largo. Debe tener 9 digitos'),
	Array('persona', 'telefono_persona', 'input', 65, 'cumple formato', 'format', 'EDIT', 'telefono_persona_format_ko', 'Formato de telefono incorrecto. Solo se permiten 9 digitos'),
	Array('persona', 'telefono_persona', 'input', 66, 'cumple inicio telefono', 'personalized', 'EDIT', 'telefono_persona_personalized_ko', 'Telefono incorrecto. Debe empezar por 6, 7, 8 o 9'),
	Array('persona', 'telefono_persona', 'input', 67, 'es correcto', 'valid', 'EDIT', true, 'Telefono correcto'),

	// ---------- SEARCH ----------
	Array('persona', 'telefono_persona', 'input', 68, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'telefono_persona_max_size_ko', 'Telefono demasiado largo. Debe tener como maximo 9 digitos'),
	Array('persona', 'telefono_persona', 'input', 69, 'cumple formato', 'format', 'SEARCH', 'telefono_persona_format_ko', 'Formato de busqueda de telefono incorrecto. Solo se permiten digitos'),
	Array('persona', 'telefono_persona', 'input', 70, 'es correcto', 'valid', 'SEARCH', true, 'Busqueda por telefono correcta'),
	
/* ==================== EMAIL_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'email_persona', 'input', 71, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'email_persona_min_size_ko', 'Email demasiado corto. Debe tener entre 6 y 45 caracteres'),
	Array('persona', 'email_persona', 'input', 72, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'email_persona_max_size_ko', 'Email demasiado largo. Debe tener entre 6 y 45 caracteres'),
	Array('persona', 'email_persona', 'input', 73, 'cumple formato', 'format', 'ADD', 'email_persona_format_ko', 'Formato de email incorrecto. Debe ser del tipo usuario@dominio.ext'),
	Array('persona', 'email_persona', 'input', 74, 'es correcto', 'valid', 'ADD', true, 'Email correcto'),

	// ---------- EDIT ----------
	Array('persona', 'email_persona', 'input', 75, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT', 'email_persona_min_size_ko', 'Email demasiado corto. Debe tener entre 6 y 45 caracteres'),
	Array('persona', 'email_persona', 'input', 76, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT', 'email_persona_max_size_ko', 'Email demasiado largo. Debe tener entre 6 y 45 caracteres'),
	Array('persona', 'email_persona', 'input', 77, 'cumple formato', 'format', 'EDIT', 'email_persona_format_ko', 'Formato de email incorrecto. Debe ser del tipo usuario@dominio.ext'),
	Array('persona', 'email_persona', 'input', 78, 'es correcto', 'valid', 'EDIT', true, 'Email correcto'),

	// ---------- SEARCH ----------
	Array('persona', 'email_persona', 'input', 79, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'email_persona_max_size_ko', 'Email demasiado largo. Debe tener como maximo 45 caracteres'),
	Array('persona', 'email_persona', 'input', 80, 'cumple formato', 'format', 'SEARCH', 'email_persona_format_ko', 'Formato de busqueda de email incorrecto. Solo se permiten letras sin acentos, numeros y . _ % + - @'),
	Array('persona', 'email_persona', 'input', 81, 'es correcto', 'valid', 'SEARCH', true, 'Busqueda por email correcta'),

/* ==================== FOTO_PERSONA ====================*/

	// ---------- SEARCH ----------
	Array('persona', 'foto_persona', 'input', 82, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'foto_persona_max_size_ko', 'Nombre de foto demasiado largo. Debe tener como maximo 15 caracteres'),
	Array('persona', 'foto_persona', 'input', 83, 'cumple formato', 'format', 'SEARCH', 'foto_persona_format_ko', 'Formato de busqueda de foto incorrecto. Solo se permiten letras sin acentos y puntos'),
	Array('persona', 'foto_persona', 'input', 84, 'es correcto', 'valid', 'SEARCH', true, 'Busqueda por foto correcta'),

/* ==================== NUEVO_FOTO_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'nuevo_foto_persona', 'file', 85, 'existe fichero', 'exist_file', 'ADD', 'nuevo_foto_persona_exist_file_ko', 'No se ha seleccionado foto. Debe subir una foto jpg o jpeg'),
	Array('persona', 'nuevo_foto_persona', 'file', 86, 'cumple tama\u00F1o minimo nombre fichero', 'personalized', 'ADD', 'nuevo_foto_persona_min_size_name_file_ko', 'Nombre de foto demasiado corto. Debe tener entre 5 y 15 caracteres'),
	Array('persona', 'nuevo_foto_persona', 'file', 87, 'cumple tama\u00F1o maximo nombre fichero', 'personalized', 'ADD', 'nuevo_foto_persona_max_size_name_file_ko', 'Nombre de foto demasiado largo. Debe tener entre 5 y 15 caracteres'),
	Array('persona', 'nuevo_foto_persona', 'file', 88, 'cumple formato nombre fichero', 'format_name_file', 'ADD', 'nuevo_foto_persona_format_name_file_ko', 'Nombre de foto incorrecto. Solo letras sin acentos y puntos, con extension .jpg o .jpeg'),
	Array('persona', 'nuevo_foto_persona', 'file', 89, 'cumple tipo fichero', 'type_file', 'ADD', 'nuevo_foto_persona_type_file_ko', 'Tipo de fichero incorrecto. La foto debe ser jpg o jpeg'),
	Array('persona', 'nuevo_foto_persona', 'file', 90, 'cumple tama\u00F1o maximo fichero', 'max_size_file', 'ADD', 'nuevo_foto_persona_max_size_file_ko', 'Tama\u00F1o de foto excesivo. Debe ser como maximo 2 MB (2097152 bytes)'),
	Array('persona', 'nuevo_foto_persona', 'file', 91, 'es correcto', 'valid', 'ADD', true, 'Foto correcta'),

	// ---------- EDIT ----------
	Array('persona', 'nuevo_foto_persona', 'file', 92, 'cumple tama\u00F1o minimo nombre fichero', 'personalized', 'EDIT', 'nuevo_foto_persona_min_size_name_file_ko', 'Nombre de foto demasiado corto. Debe tener entre 5 y 15 caracteres'),
	Array('persona', 'nuevo_foto_persona', 'file', 93, 'cumple tama\u00F1o maximo nombre fichero', 'personalized', 'EDIT', 'nuevo_foto_persona_max_size_name_file_ko', 'Nombre de foto demasiado largo. Debe tener entre 5 y 15 caracteres'),
	Array('persona', 'nuevo_foto_persona', 'file', 94, 'cumple formato nombre fichero', 'format_name_file', 'EDIT', 'nuevo_foto_persona_format_name_file_ko', 'Nombre de foto incorrecto. Solo letras sin acentos y puntos, con extension .jpg o .jpeg'),
	Array('persona', 'nuevo_foto_persona', 'file', 95, 'cumple tipo fichero', 'type_file', 'EDIT', 'nuevo_foto_persona_type_file_ko', 'Tipo de fichero incorrecto. La foto debe ser jpg o jpeg'),
	Array('persona', 'nuevo_foto_persona', 'file', 96, 'cumple tama\u00F1o maximo fichero', 'max_size_file', 'EDIT', 'nuevo_foto_persona_max_size_file_ko', 'Tama\u00F1o de foto excesivo. Debe ser como maximo 2 MB (2097152 bytes)'),
	Array('persona', 'nuevo_foto_persona', 'file', 97, 'es correcto', 'valid', 'EDIT', true, 'Foto correcta'),

);

let persona_pruebas = Array(
	
/* ==================== DNI ====================*/
	
	// ---------- ADD ----------
	Array('persona', 'dni', 1, 1, 'ADD', { dni: '1234567Z' }, 'dni_min_size_ko'),
	Array('persona', 'dni', 2, 2, 'ADD', { dni: '123456789Z' }, 'dni_max_size_ko'),
	Array('persona', 'dni', 3, 3, 'ADD', { dni: '12345678z' }, 'dni_format_ko'),
	Array('persona', 'dni', 4, 4, 'ADD', { dni: '12345678A' }, 'dni_personalized_ko'),
	Array('persona', 'dni', 5, 5, 'ADD', { dni: '12345678Z' }, true),

	// ---------- SEARCH ----------
	Array('persona', 'dni', 6, 6, 'SEARCH', { dni: '1234567890' }, 'dni_max_size_ko'),
	Array('persona', 'dni', 7, 7, 'SEARCH', { dni: '1234-5' }, 'dni_format_ko'),
	Array('persona', 'dni', 8, 8, 'SEARCH', { dni: '1234' }, true),

/* ==================== NOMBRE_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'nombre_persona', 9, 9, 'ADD', { nombre_persona: 'J' }, 'nombre_persona_min_size_ko'),
	Array('persona', 'nombre_persona', 10, 10, 'ADD', { nombre_persona: 'a'.repeat(46) }, 'nombre_persona_max_size_ko'),
	Array('persona', 'nombre_persona', 11, 11, 'ADD', { nombre_persona: 'Juan2' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 11, 12, 'ADD', { nombre_persona: 'Juan_Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 11, 13, 'ADD', { nombre_persona: 'Juan, Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 11, 14, 'ADD', { nombre_persona: "D'Artagnan" }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 11, 15, 'ADD', { nombre_persona: 'Juan@Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 11, 16, 'ADD', { nombre_persona: 'Juan (Carlos)' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 11, 17, 'ADD', { nombre_persona: 'Juan;Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 11, 18, 'ADD', { nombre_persona: 'Juan/Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 11, 19, 'ADD', { nombre_persona: 'Juan#1' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 12, 20, 'ADD', { nombre_persona: 'Jos\u00E9 \u00C1ngel' }, true),
	Array('persona', 'nombre_persona', 12, 21, 'ADD', { nombre_persona: 'Jos\u00E9-Mar\u00EDa' }, true),
	Array('persona', 'nombre_persona', 12, 22, 'ADD', { nombre_persona: 'J. \u00C1ngel Mu\u00F1oz' }, true),

	// ---------- EDIT ----------
	Array('persona', 'nombre_persona', 13, 23, 'EDIT', { nombre_persona: 'J' }, 'nombre_persona_min_size_ko'),
	Array('persona', 'nombre_persona', 14, 24, 'EDIT', { nombre_persona: 'a'.repeat(46) }, 'nombre_persona_max_size_ko'),
	Array('persona', 'nombre_persona', 15, 25, 'EDIT', { nombre_persona: 'Juan2' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 15, 26, 'EDIT', { nombre_persona: 'Juan_Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 15, 27, 'EDIT', { nombre_persona: 'Juan, Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 15, 28, 'EDIT', { nombre_persona: "D'Artagnan" }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 15, 29, 'EDIT', { nombre_persona: 'Juan@Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 15, 30, 'EDIT', { nombre_persona: 'Juan (Carlos)' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 15, 31, 'EDIT', { nombre_persona: 'Juan;Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 15, 32, 'EDIT', { nombre_persona: 'Juan/Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 15, 33, 'EDIT', { nombre_persona: 'Juan#1' }, 'nombre_persona_format_ko'),

	Array('persona', 'nombre_persona', 16, 34, 'EDIT', { nombre_persona: 'Jos\u00E9 \u00C1ngel' }, true),
	Array('persona', 'nombre_persona', 16, 35, 'EDIT', { nombre_persona: 'Jos\u00E9-Mar\u00EDa' }, true),
	Array('persona', 'nombre_persona', 16, 36, 'EDIT', { nombre_persona: 'J. \u00C1ngel Mu\u00F1oz' }, true),

	// ---------- SEARCH ----------
	Array('persona', 'nombre_persona', 17, 37, 'SEARCH', { nombre_persona: 'a'.repeat(46) }, 'nombre_persona_max_size_ko'),
	Array('persona', 'nombre_persona', 18, 38, 'SEARCH', { nombre_persona: 'Ju4n' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 18, 39, 'SEARCH', { nombre_persona: 'Juan_Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 18, 40, 'SEARCH', { nombre_persona: 'Juan, Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 18, 41, 'SEARCH', { nombre_persona: "D'Artagnan" }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 18, 42, 'SEARCH', { nombre_persona: 'Juan@Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 18, 43, 'SEARCH', { nombre_persona: 'Juan (Carlos)' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 18, 44, 'SEARCH', { nombre_persona: 'Juan;Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 18, 45, 'SEARCH', { nombre_persona: 'Juan/Carlos' }, 'nombre_persona_format_ko'),
	Array('persona', 'nombre_persona', 18, 46, 'SEARCH', { nombre_persona: 'Juan#1' }, 'nombre_persona_format_ko'),

	Array('persona', 'nombre_persona', 19, 47, 'SEARCH', { nombre_persona: 'Jo' }, true),
	Array('persona', 'nombre_persona', 19, 48, 'SEARCH', { nombre_persona: 'Jos\u00E9-Mar\u00EDa' }, true),
	Array('persona', 'nombre_persona', 19, 49, 'SEARCH', { nombre_persona: 'J. \u00C1ngel Mu\u00F1oz' }, true),

/* ==================== APELLIDOS_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'apellidos_persona', 20, 50, 'ADD', { apellidos_persona: 'Ga' }, 'apellidos_persona_min_size_ko'),
	Array('persona', 'apellidos_persona', 21, 51, 'ADD', { apellidos_persona: 'a'.repeat(101) }, 'apellidos_persona_max_size_ko'),
	Array('persona', 'apellidos_persona', 22, 52, 'ADD', { apellidos_persona: 'Juan2' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 22, 53, 'ADD', { apellidos_persona: 'P\u00E9rez_L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 22, 54, 'ADD', { apellidos_persona: 'P\u00E9rez, L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 22, 55, 'ADD', { apellidos_persona: "O'Donnell" }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 22, 56, 'ADD', { apellidos_persona: 'L\u00F3pez@Garc\u00EDa' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 22, 57, 'ADD', { apellidos_persona: 'Garc\u00EDa (hijo)' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 22, 58, 'ADD', { apellidos_persona: 'Garc\u00EDa;L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 22, 59, 'ADD', { apellidos_persona: 'Garc\u00EDa/L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 22, 60, 'ADD', { apellidos_persona: 'Garc\u00EDa3' }, 'apellidos_persona_format_ko'),

	Array('persona', 'apellidos_persona', 23, 61, 'ADD', { apellidos_persona: 'Mu\u00F1oz Garc\u00EDa' }, true),
	Array('persona', 'apellidos_persona', 23, 62, 'ADD', { apellidos_persona: 'P\u00E9rez-L\u00F3pez' }, true),
	Array('persona', 'apellidos_persona', 23, 63, 'ADD', { apellidos_persona: 'Fern\u00E1ndez P.' }, true),

	// ---------- EDIT ----------
	Array('persona', 'apellidos_persona', 24, 64, 'EDIT', { apellidos_persona: 'Ga' }, 'apellidos_persona_min_size_ko'),
	Array('persona', 'apellidos_persona', 25, 65, 'EDIT', { apellidos_persona: 'a'.repeat(101) }, 'apellidos_persona_max_size_ko'),
	Array('persona', 'apellidos_persona', 26, 66, 'EDIT', { apellidos_persona: 'Juan2' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 26, 67, 'EDIT', { apellidos_persona: 'P\u00E9rez_L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 26, 68, 'EDIT', { apellidos_persona: 'P\u00E9rez, L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 26, 69, 'EDIT', { apellidos_persona: "O'Donnell" }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 26, 70, 'EDIT', { apellidos_persona: 'L\u00F3pez@Garc\u00EDa' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 26, 71, 'EDIT', { apellidos_persona: 'Garc\u00EDa (hijo)' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 26, 72, 'EDIT', { apellidos_persona: 'Garc\u00EDa;L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 26, 73, 'EDIT', { apellidos_persona: 'Garc\u00EDa/L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 26, 74, 'EDIT', { apellidos_persona: 'Garc\u00EDa3' }, 'apellidos_persona_format_ko'),

	Array('persona', 'apellidos_persona', 27, 75, 'EDIT', { apellidos_persona: 'Mu\u00F1oz Garc\u00EDa' }, true),
	Array('persona', 'apellidos_persona', 27, 76, 'EDIT', { apellidos_persona: 'P\u00E9rez-L\u00F3pez' }, true),
	Array('persona', 'apellidos_persona', 27, 77, 'EDIT', { apellidos_persona: 'Fern\u00E1ndez P.' }, true),

	// ---------- SEARCH ----------
	Array('persona', 'apellidos_persona', 28, 78, 'SEARCH', { apellidos_persona: 'a'.repeat(101) }, 'apellidos_persona_max_size_ko'),
	Array('persona', 'apellidos_persona', 29, 79, 'SEARCH', { apellidos_persona: 'Ju4n' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 29, 80, 'SEARCH', { apellidos_persona: 'P\u00E9rez_L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 29, 81, 'SEARCH', { apellidos_persona: 'P\u00E9rez, L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 29, 82, 'SEARCH', { apellidos_persona: "O'Donnell" }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 29, 83, 'SEARCH', { apellidos_persona: 'L\u00F3pez@Garc\u00EDa' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 29, 84, 'SEARCH', { apellidos_persona: 'Garc\u00EDa (hijo)' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 29, 85, 'SEARCH', { apellidos_persona: 'Garc\u00EDa;L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 29, 86, 'SEARCH', { apellidos_persona: 'Garc\u00EDa/L\u00F3pez' }, 'apellidos_persona_format_ko'),
	Array('persona', 'apellidos_persona', 29, 87, 'SEARCH', { apellidos_persona: 'Garc\u00EDa3' }, 'apellidos_persona_format_ko'),

	Array('persona', 'apellidos_persona', 30, 88, 'SEARCH', { apellidos_persona: 'Jo' }, true),
	Array('persona', 'apellidos_persona', 30, 89, 'SEARCH', { apellidos_persona: 'P\u00E9rez-L\u00F3pez' }, true),
	Array('persona', 'apellidos_persona', 30, 90, 'SEARCH', { apellidos_persona: 'Fern\u00E1ndez P.' }, true),

/* ==================== FECHA_NACIMIENTO_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'fechaNacimiento_persona', 31, 91, 'ADD', { fechaNacimiento_persona: '1/1/200' }, 'fechaNacimiento_persona_min_size_ko'),
	Array('persona', 'fechaNacimiento_persona', 32, 92, 'ADD', { fechaNacimiento_persona: '01/01/20000' }, 'fechaNacimiento_persona_max_size_ko'),
	Array('persona', 'fechaNacimiento_persona', 33, 93, 'ADD', { fechaNacimiento_persona: '01-01-2000' }, 'fechaNacimiento_persona_format_ko'),
	Array('persona', 'fechaNacimiento_persona', 34, 94, 'ADD', { fechaNacimiento_persona: '31/02/2000' }, 'fechaNacimiento_persona_personalized_ko'),
	Array('persona', 'fechaNacimiento_persona', 35, 95, 'ADD', { fechaNacimiento_persona: '31/12/2999' }, 'fechaNacimiento_persona_future_date_ko'),
	Array('persona', 'fechaNacimiento_persona', 36, 96, 'ADD', { fechaNacimiento_persona: '1/1/2000' }, true),

	// ---------- EDIT ----------
	Array('persona', 'fechaNacimiento_persona', 37, 97, 'EDIT', { fechaNacimiento_persona: '1/1/200' }, 'fechaNacimiento_persona_min_size_ko'),
	Array('persona', 'fechaNacimiento_persona', 38, 98, 'EDIT', { fechaNacimiento_persona: '01/01/20000' }, 'fechaNacimiento_persona_max_size_ko'),
	Array('persona', 'fechaNacimiento_persona', 39, 99, 'EDIT', { fechaNacimiento_persona: '01-01-2000' }, 'fechaNacimiento_persona_format_ko'),
	Array('persona', 'fechaNacimiento_persona', 40, 100, 'EDIT', { fechaNacimiento_persona: '31/02/2000' }, 'fechaNacimiento_persona_personalized_ko'),
	Array('persona', 'fechaNacimiento_persona', 41, 101, 'EDIT', { fechaNacimiento_persona: '31/12/2999' }, 'fechaNacimiento_persona_future_date_ko'),
	Array('persona', 'fechaNacimiento_persona', 42, 102, 'EDIT', { fechaNacimiento_persona: '15/08/1990' }, true),

	// ---------- SEARCH ----------
	Array('persona', 'fechaNacimiento_persona', 43, 103, 'SEARCH', { fechaNacimiento_persona: '01/01/20000' }, 'fechaNacimiento_persona_max_size_ko'),
	Array('persona', 'fechaNacimiento_persona', 44, 104, 'SEARCH', { fechaNacimiento_persona: '01-01' }, 'fechaNacimiento_persona_format_ko'),
	Array('persona', 'fechaNacimiento_persona', 45, 105, 'SEARCH', { fechaNacimiento_persona: '31/02/2000' }, 'fechaNacimiento_persona_personalized_ko'),
	Array('persona', 'fechaNacimiento_persona', 46, 106, 'SEARCH', { fechaNacimiento_persona: '1990' }, true),

/* ==================== DIRECCION_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'direccion_persona', 47, 107, 'ADD', { direccion_persona: 'Calle 1 A' }, 'direccion_persona_min_size_ko'),
	Array('persona', 'direccion_persona', 48, 108, 'ADD', { direccion_persona: 'a'.repeat(201) }, 'direccion_persona_max_size_ko'),
	Array('persona', 'direccion_persona', 49, 109, 'ADD', { direccion_persona: 'Calle Mayor, 5' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 49, 110, 'ADD', { direccion_persona: 'Calle Mayor, 12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 49, 111, 'ADD', { direccion_persona: 'Calle_Mayor_12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 49, 112, 'ADD', { direccion_persona: "Calle O'Donnell 5" }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 49, 113, 'ADD', { direccion_persona: 'Calle Mayor @12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 49, 114, 'ADD', { direccion_persona: 'Calle Mayor (12)' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 49, 115, 'ADD', { direccion_persona: 'Calle Mayor #12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 49, 116, 'ADD', { direccion_persona: 'Calle Mayor 12%' }, 'direccion_persona_format_ko'),

	Array('persona', 'direccion_persona', 50, 117, 'ADD', { direccion_persona: 'R\u00FAa do Progreso 12; 3-B' }, true),
	Array('persona', 'direccion_persona', 50, 118, 'ADD', { direccion_persona: 'C/ Mayor 12' }, true),
	Array('persona', 'direccion_persona', 50, 119, 'ADD', { direccion_persona: 'Calle Mayor 12; 2 B' }, true),
	Array('persona', 'direccion_persona', 50, 120, 'ADD', { direccion_persona: 'Avda. de la Paz 5-7' }, true),

	// ---------- EDIT ----------
	Array('persona', 'direccion_persona', 51, 121, 'EDIT', { direccion_persona: 'Calle 1 A' }, 'direccion_persona_min_size_ko'),
	Array('persona', 'direccion_persona', 52, 122, 'EDIT', { direccion_persona: 'a'.repeat(201) }, 'direccion_persona_max_size_ko'),
	Array('persona', 'direccion_persona', 53, 123, 'EDIT', { direccion_persona: 'Calle Mayor, 5' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 53, 124, 'EDIT', { direccion_persona: 'Calle Mayor, 12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 53, 125, 'EDIT', { direccion_persona: 'Calle_Mayor_12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 53, 126, 'EDIT', { direccion_persona: "Calle O'Donnell 5" }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 53, 127, 'EDIT', { direccion_persona: 'Calle Mayor @12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 53, 128, 'EDIT', { direccion_persona: 'Calle Mayor (12)' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 53, 129, 'EDIT', { direccion_persona: 'Calle Mayor #12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 53, 130, 'EDIT', { direccion_persona: 'Calle Mayor 12%' }, 'direccion_persona_format_ko'),

	Array('persona', 'direccion_persona', 54, 131, 'EDIT', { direccion_persona: 'R\u00FAa do Progreso 12; 3-B' }, true),
	Array('persona', 'direccion_persona', 54, 132, 'EDIT', { direccion_persona: 'C/ Mayor 12' }, true),
	Array('persona', 'direccion_persona', 54, 133, 'EDIT', { direccion_persona: 'Calle Mayor 12; 2 B' }, true),
	Array('persona', 'direccion_persona', 54, 134, 'EDIT', { direccion_persona: 'Avda. de la Paz 5-7' }, true),

	// ---------- SEARCH ----------
	Array('persona', 'direccion_persona', 55, 135, 'SEARCH', { direccion_persona: 'a'.repeat(201) }, 'direccion_persona_max_size_ko'),
	Array('persona', 'direccion_persona', 56, 136, 'SEARCH', { direccion_persona: 'Mayor, 5' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 56, 137, 'SEARCH', { direccion_persona: 'Calle Mayor, 12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 56, 138, 'SEARCH', { direccion_persona: 'Calle_Mayor_12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 56, 139, 'SEARCH', { direccion_persona: "Calle O'Donnell 5" }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 56, 140, 'SEARCH', { direccion_persona: 'Calle Mayor @12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 56, 141, 'SEARCH', { direccion_persona: 'Calle Mayor (12)' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 56, 142, 'SEARCH', { direccion_persona: 'Calle Mayor #12' }, 'direccion_persona_format_ko'),
	Array('persona', 'direccion_persona', 56, 143, 'SEARCH', { direccion_persona: 'Calle Mayor 12%' }, 'direccion_persona_format_ko'),

	Array('persona', 'direccion_persona', 57, 144, 'SEARCH', { direccion_persona: 'R\u00FAa' }, true),
	Array('persona', 'direccion_persona', 57, 145, 'SEARCH', { direccion_persona: 'C/ Mayor 12' }, true),
	Array('persona', 'direccion_persona', 57, 146, 'SEARCH', { direccion_persona: 'Calle Mayor 12; 2 B' }, true),
	Array('persona', 'direccion_persona', 57, 147, 'SEARCH', { direccion_persona: 'Avda. de la Paz 5-7' }, true),

/* ==================== TELEFONO_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'telefono_persona', 58, 148, 'ADD', { telefono_persona: '98812345' }, 'telefono_persona_min_size_ko'),
	Array('persona', 'telefono_persona', 59, 149, 'ADD', { telefono_persona: '9881234567' }, 'telefono_persona_max_size_ko'),
	Array('persona', 'telefono_persona', 60, 150, 'ADD', { telefono_persona: '98812345a' }, 'telefono_persona_format_ko'),
	Array('persona', 'telefono_persona', 61, 151, 'ADD', { telefono_persona: '512345678' }, 'telefono_persona_personalized_ko'),
	Array('persona', 'telefono_persona', 62, 152, 'ADD', { telefono_persona: '988123456' }, true),

	// ---------- EDIT ----------
	Array('persona', 'telefono_persona', 63, 153, 'EDIT', { telefono_persona: '98812345' }, 'telefono_persona_min_size_ko'),
	Array('persona', 'telefono_persona', 64, 154, 'EDIT', { telefono_persona: '9881234567' }, 'telefono_persona_max_size_ko'),
	Array('persona', 'telefono_persona', 65, 155, 'EDIT', { telefono_persona: '98812345a' }, 'telefono_persona_format_ko'),
	Array('persona', 'telefono_persona', 66, 156, 'EDIT', { telefono_persona: '512345678' }, 'telefono_persona_personalized_ko'),
	Array('persona', 'telefono_persona', 67, 157, 'EDIT', { telefono_persona: '988123456' }, true),

	// ---------- SEARCH ----------
	Array('persona', 'telefono_persona', 68, 158, 'SEARCH', { telefono_persona: '6123456789' }, 'telefono_persona_max_size_ko'),
	Array('persona', 'telefono_persona', 69, 159, 'SEARCH', { telefono_persona: '612-34' }, 'telefono_persona_format_ko'),
	Array('persona', 'telefono_persona', 70, 160, 'SEARCH', { telefono_persona: '988' }, true),

/* ==================== EMAIL_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'email_persona', 71, 161, 'ADD', { email_persona: 'a@b.c' }, 'email_persona_min_size_ko'),
	Array('persona', 'email_persona', 72, 162, 'ADD', { email_persona: 'a'.repeat(36) + '@correo.es' }, 'email_persona_max_size_ko'),
	Array('persona', 'email_persona', 73, 163, 'ADD', { email_persona: 'usuario.correo.es' }, 'email_persona_format_ko'),
	Array('persona', 'email_persona', 74, 164, 'ADD', { email_persona: 'mateo.perez@uvigo.es' }, true),

	// ---------- EDIT ----------
	Array('persona', 'email_persona', 75, 165, 'EDIT', { email_persona: 'a@b.c' }, 'email_persona_min_size_ko'),
	Array('persona', 'email_persona', 76, 166, 'EDIT', { email_persona: 'a'.repeat(36) + '@correo.es' }, 'email_persona_max_size_ko'),
	Array('persona', 'email_persona', 77, 167, 'EDIT', { email_persona: 'usuario.correo.es' }, 'email_persona_format_ko'),
	Array('persona', 'email_persona', 78, 168, 'EDIT', { email_persona: 'mateo.perez@uvigo.es' }, true),

	// ---------- SEARCH ----------
	Array('persona', 'email_persona', 79, 169, 'SEARCH', { email_persona: 'a'.repeat(36) + '@correo.es' }, 'email_persona_max_size_ko'),
	Array('persona', 'email_persona', 80, 170, 'SEARCH', { email_persona: 'ma\u00F1ana@uvigo.es' }, 'email_persona_format_ko'),
	Array('persona', 'email_persona', 81, 171, 'SEARCH', { email_persona: '@uvigo' }, true),

/* ==================== FOTO_PERSONA ====================*/

	// ---------- SEARCH ----------
	Array('persona', 'foto_persona', 82, 172, 'SEARCH', { foto_persona: 'a'.repeat(16) }, 'foto_persona_max_size_ko'),
	Array('persona', 'foto_persona', 83, 173, 'SEARCH', { foto_persona: 'foto1.jpg' }, 'foto_persona_format_ko'),
	Array('persona', 'foto_persona', 84, 174, 'SEARCH', { foto_persona: 'foto.jpg' }, true),

/* ==================== NUEVO_FOTO_PERSONA ====================*/

	// ---------- ADD ----------
	Array('persona', 'nuevo_foto_persona', 85, 175, 'ADD', {}, 'nuevo_foto_persona_exist_file_ko'),
	Array('persona', 'nuevo_foto_persona', 86, 176, 'ADD', { nuevo_foto_persona: { format_name_file: '.jpg', type_file: 'image/jpeg', max_size_file: 200 } }, 'nuevo_foto_persona_min_size_name_file_ko'),
	Array('persona', 'nuevo_foto_persona', 87, 177, 'ADD', { nuevo_foto_persona: { format_name_file: 'fotodemasiadolarga.jpg', type_file: 'image/jpeg', max_size_file: 200 } }, 'nuevo_foto_persona_max_size_name_file_ko'),
	Array('persona', 'nuevo_foto_persona', 88, 178, 'ADD', { nuevo_foto_persona: { format_name_file: 'nombrejpg00.jpg', type_file: 'image/jpeg', max_size_file: 200 } }, 'nuevo_foto_persona_format_name_file_ko'),
	Array('persona', 'nuevo_foto_persona', 89, 179, 'ADD', { nuevo_foto_persona: { format_name_file: 'foto.jpg', type_file: 'image/png', max_size_file: 200 } }, 'nuevo_foto_persona_type_file_ko'),
	Array('persona', 'nuevo_foto_persona', 90, 180, 'ADD', { nuevo_foto_persona: { format_name_file: 'foto.jpg', type_file: 'image/jpeg', max_size_file: 2097153 } }, 'nuevo_foto_persona_max_size_file_ko'),
	Array('persona', 'nuevo_foto_persona', 91, 181, 'ADD', { nuevo_foto_persona: { format_name_file: 'foto.jpg', type_file: 'image/jpeg', max_size_file: 200 } }, true),

	// ---------- EDIT ----------
	Array('persona', 'nuevo_foto_persona', 92, 182, 'EDIT', { nuevo_foto_persona: { format_name_file: '.jpg', type_file: 'image/jpeg', max_size_file: 200 } }, 'nuevo_foto_persona_min_size_name_file_ko'),
	Array('persona', 'nuevo_foto_persona', 93, 183, 'EDIT', { nuevo_foto_persona: { format_name_file: 'fotodemasiadolarga.jpg', type_file: 'image/jpeg', max_size_file: 200 } }, 'nuevo_foto_persona_max_size_name_file_ko'),
	Array('persona', 'nuevo_foto_persona', 94, 184, 'EDIT', { nuevo_foto_persona: { format_name_file: 'nombrejpg00.jpg', type_file: 'image/jpeg', max_size_file: 200 } }, 'nuevo_foto_persona_format_name_file_ko'),
	Array('persona', 'nuevo_foto_persona', 95, 185, 'EDIT', { nuevo_foto_persona: { format_name_file: 'foto.jpg', type_file: 'image/png', max_size_file: 200 } }, 'nuevo_foto_persona_type_file_ko'),
	Array('persona', 'nuevo_foto_persona', 96, 186, 'EDIT', { nuevo_foto_persona: { format_name_file: 'foto.jpg', type_file: 'image/jpeg', max_size_file: 2097153 } }, 'nuevo_foto_persona_max_size_file_ko'),
	Array('persona', 'nuevo_foto_persona', 97, 187, 'EDIT', { nuevo_foto_persona: { format_name_file: 'foto.jpg', type_file: 'image/jpeg', max_size_file: 200 } }, true),
	Array('persona', 'nuevo_foto_persona', 97, 188, 'EDIT', {}, true),

);
