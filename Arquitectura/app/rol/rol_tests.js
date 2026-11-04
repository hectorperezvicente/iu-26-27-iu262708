let rol_def_tests = [
    /* ==================== ID_ROL ==================== */

    Array('rol', 'id_rol', 'input', 1, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH','id_rol_max_size_ko','El id de rol es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('rol', 'id_rol', 'input', 2, 'cumple formato', 'format', 'SEARCH','id_rol_format_ko','El id de rol tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('rol', 'id_rol', 'input', 3, 'valor correcto', 'valid', 'SEARCH',true,'El id de rol es correcto.'),

    /* ==================== ROL_NAME ==================== */

    Array('rol', 'rol_name', 'input', 4, 'cumple tama\u00F1o minimo', 'min_size', 'ADD','rol_name_min_size_ko','El nombre de rol es demasiado corto. Introduzca al menos 5 caracteres'),
    Array('rol', 'rol_name', 'input', 5, 'cumple tama\u00F1o maximo', 'max_size', 'ADD','rol_name_max_size_ko','El nombre de rol es demasiado largo. Introduzca hasta un maximo de 48 caracteres'),
    Array('rol', 'rol_name', 'input', 6, 'cumple formato', 'format', 'ADD','rol_name_format_ko','El nombre de rol tiene un formato incorrecto. Solo se permiten letras alfabeticas'),
    Array('rol', 'rol_name', 'input', 7, 'valor correcto', 'valid', 'ADD',true,'El nombre de rol es correcto.'),

    Array('rol', 'rol_name', 'input', 8, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT','rol_name_min_size_ko','El nombre de rol es demasiado corto. Introduzca al menos 5 caracteres'),
    Array('rol', 'rol_name', 'input', 9, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT','rol_name_max_size_ko','El nombre de rol es demasiado largo. Introduzca hasta un maximo de 48 caracteres'),
    Array('rol', 'rol_name', 'input', 10, 'cumple formato', 'format', 'EDIT','rol_name_format_ko','El nombre de rol tiene un formato incorrecto. Solo se permiten letras alfabeticas'),
    Array('rol', 'rol_name', 'input', 11, 'valor correcto', 'valid', 'EDIT',true,'El nombre de rol es correcto.'),

    Array('rol', 'rol_name', 'input', 12, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH','rol_name_max_size_ko','El termino de busqueda es demasiado largo. Introduzca hasta un maximo de 48 caracteres'),
    Array('rol', 'rol_name', 'input', 13, 'cumple formato', 'format', 'SEARCH','rol_name_format_ko','El termino de busqueda contiene caracteres no permitidos. Solo se permiten letras alfabeticas'),
    Array('rol', 'rol_name', 'input', 14, 'valor correcto', 'valid', 'SEARCH',true,'El termino de busqueda es correcto.'),

    /* ==================== ROL_DESCRIPTION ==================== */

    Array('rol', 'rol_description', 'textarea', 15, 'cumple tama\u00F1o minimo', 'min_size', 'ADD','rol_description_min_size_ko','La descripcion de rol es demasiado corta. Introduzca al menos 5 caracteres'),
    Array('rol', 'rol_description', 'textarea', 16, 'cumple tama\u00F1o maximo', 'max_size', 'ADD','rol_description_max_size_ko','La descripcion de rol es demasiado larga. Introduzca hasta un maximo de 200 caracteres'),
    Array('rol', 'rol_description', 'textarea', 17, 'cumple formato', 'format', 'ADD','rol_description_format_ko','La descripcion de rol tiene un formato incorrecto. Introduzca texto alfabetico permitiendo \u00F1, espacios y signos de puntuacion'),
    Array('rol', 'rol_description', 'textarea', 18, 'valor correcto', 'valid', 'ADD',true,'La descripcion de rol es correcta.'),

    Array('rol', 'rol_description', 'textarea', 19, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT','rol_description_min_size_ko','La descripcion de rol es demasiado corta. Introduzca al menos 5 caracteres'),
    Array('rol', 'rol_description', 'textarea', 20, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT','rol_description_max_size_ko','La descripcion de rol es demasiado larga. Introduzca hasta un maximo de 200 caracteres'),
    Array('rol', 'rol_description', 'textarea', 21, 'cumple formato', 'format', 'EDIT','rol_description_format_ko','La descripcion de rol tiene un formato incorrecto. Introduzca texto alfabetico permitiendo \u00F1, espacios y signos de puntuacion'),
    Array('rol', 'rol_description', 'textarea', 22, 'valor correcto', 'valid', 'EDIT',true,'La descripcion de rol es correcta.'),

    Array('rol', 'rol_description', 'textarea', 23, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH','rol_description_max_size_ko','El termino de busqueda es demasiado largo. Introduzca hasta un maximo de 200 caracteres'),
    Array('rol', 'rol_description', 'textarea', 24, 'cumple formato', 'format', 'SEARCH','rol_description_format_ko','El termino de busqueda contiene caracteres no permitidos. Solo se permiten letras, \u00F1, espacios y signos de puntuacion'),
    Array('rol', 'rol_description', 'textarea', 25, 'valor correcto', 'valid', 'SEARCH',true,'El termino de busqueda es correcto.')
];

let rol_pruebas = [

    /* ==================== ID_ROL ==================== */

    Array('rol', 'id_rol', 1, 1, 'SEARCH',{ id_rol: '123456789012' },'id_rol_max_size_ko'),
    Array('rol', 'id_rol', 2, 2, 'SEARCH',{ id_rol: '12a' },'id_rol_format_ko'),
    Array('rol', 'id_rol', 3, 3, 'SEARCH',{ id_rol: '12345' },true),

    /* ==================== ROL_NAME ==================== */

    Array('rol', 'rol_name', 4, 4, 'ADD',{ rol_name: 'hola' },'rol_name_min_size_ko'),
    Array('rol', 'rol_name', 5, 5, 'ADD',{ rol_name: 'a'.repeat(49) },'rol_name_max_size_ko'),
    Array('rol', 'rol_name', 6, 6, 'ADD',{ rol_name: 'Admin123' },'rol_name_format_ko'),
    Array('rol', 'rol_name', 7, 7, 'ADD',{ rol_name: 'Administrador' },true),

    Array('rol', 'rol_name', 8, 8, 'EDIT',{ rol_name: 'hola' },'rol_name_min_size_ko'),
    Array('rol', 'rol_name', 9, 9, 'EDIT',{ rol_name: 'a'.repeat(49) },'rol_name_max_size_ko'),
    Array('rol', 'rol_name', 10, 10, 'EDIT',{ rol_name: 'Admin123' },'rol_name_format_ko'),
    Array('rol', 'rol_name', 11, 11, 'EDIT',{ rol_name: 'Administrador' },true),

    Array('rol', 'rol_name', 12, 12, 'SEARCH',{ rol_name: 'a'.repeat(49) },'rol_name_max_size_ko'),
    Array('rol', 'rol_name', 13, 13, 'SEARCH',{ rol_name: 'Admin123' },'rol_name_format_ko'),
    Array('rol', 'rol_name', 14, 14, 'SEARCH',{ rol_name: 'Administrador' },true),

    /* ==================== ROL_DESCRIPTION ==================== */

    Array('rol', 'rol_description', 15, 15, 'ADD',{ rol_description: 'hola' },'rol_description_min_size_ko'),
    Array('rol', 'rol_description', 16, 16, 'ADD',{ rol_description: 'a'.repeat(201) },'rol_description_max_size_ko'),
    Array('rol', 'rol_description', 17, 17, 'ADD',{ rol_description: 'Descripcion con version 1.0' },'rol_description_format_ko'),
    Array('rol', 'rol_description', 18, 18, 'ADD',{ rol_description: 'Esta es una descripcion valida, con \u00F1 y signos.' },true),

    Array('rol', 'rol_description', 19, 19, 'EDIT',{ rol_description: 'hola' },'rol_description_min_size_ko'),
    Array('rol', 'rol_description', 20, 20, 'EDIT',{ rol_description: 'a'.repeat(201) },'rol_description_max_size_ko'),
    Array('rol', 'rol_description', 21, 21, 'EDIT',{ rol_description: 'Descripcion con version 1.0' },'rol_description_format_ko'),
    Array('rol', 'rol_description', 22, 22, 'EDIT',{ rol_description: 'Esta es una descripcion valida, con \u00F1 y signos.' },true),

    Array('rol', 'rol_description', 23, 23, 'SEARCH',{ rol_description: 'a'.repeat(201) },'rol_description_max_size_ko'),
    Array('rol', 'rol_description', 24, 24, 'SEARCH',{ rol_description: 'Descripcion con version 1.0' },'rol_description_format_ko'),
    Array('rol', 'rol_description', 25, 25, 'SEARCH',{ rol_description: 'Esta es una descripcion valida, con \u00F1 y signos.' },true)
];