let funcionalidad_def_tests = [
    /* ==================== ID_FUNCIONALIDAD ====================*/

    Array('funcionalidad', 'id_funcionalidad', 'input', 1, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH','id_funcionalidad_max_size_ko','El id de funcionalidad es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('funcionalidad', 'id_funcionalidad', 'input', 2, 'cumple formato', 'format', 'SEARCH','id_funcionalidad_format_ko','El id de funcionalidad tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('funcionalidad', 'id_funcionalidad', 'input', 3, 'valor correcto', 'valid', 'SEARCH',true,'El id de funcionalidad es correcto.'),

    /* ==================== NOMBRE_FUNCIONALIDAD ====================*/

    Array('funcionalidad', 'nombre_funcionalidad', 'input', 4, 'cumple tama\u00F1o minimo', 'min_size', 'ADD','nombre_funcionalidad_min_size_ko','El nombre de funcionalidad es demasiado corto. Introduzca al menos 5 caracteres'),
    Array('funcionalidad', 'nombre_funcionalidad', 'input', 5, 'cumple tama\u00F1o maximo', 'max_size', 'ADD','nombre_funcionalidad_max_size_ko','El nombre de funcionalidad es demasiado largo. Introduzca hasta un maximo de 48 caracteres'),
    Array('funcionalidad', 'nombre_funcionalidad', 'input', 6, 'cumple formato', 'format', 'ADD','nombre_funcionalidad_format_ko','El nombre de funcionalidad tiene un formato incorrecto. Introduzca el nombre correctamente permitiendo \u00F1'),
    Array('funcionalidad', 'nombre_funcionalidad', 'input', 7, 'valor correcto', 'valid', 'ADD',true,'El nombre de funcionalidad es correcto.'),

    Array('funcionalidad', 'nombre_funcionalidad', 'input', 8, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT','nombre_funcionalidad_min_size_ko','El nombre de funcionalidad es demasiado corto. Introduzca al menos 5 caracteres'),
    Array('funcionalidad', 'nombre_funcionalidad', 'input', 9, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT','nombre_funcionalidad_max_size_ko','El nombre de funcionalidad es demasiado largo. Introduzca hasta un maximo de 48 caracteres'),
    Array('funcionalidad', 'nombre_funcionalidad', 'input', 10, 'cumple formato', 'format', 'EDIT','nombre_funcionalidad_format_ko','El nombre de funcionalidad tiene un formato incorrecto. Introduzca el nombre correctamente permitiendo \u00F1'),
    Array('funcionalidad', 'nombre_funcionalidad', 'input', 11, 'valor correcto', 'valid', 'EDIT',true,'El nombre de funcionalidad es correcto.'),

    Array('funcionalidad', 'nombre_funcionalidad', 'input', 12, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH','nombre_funcionalidad_max_size_ko','El termino de busqueda es demasiado largo. Introduzca hasta un maximo de 48 caracteres'),
    Array('funcionalidad', 'nombre_funcionalidad', 'input', 13, 'cumple formato', 'format', 'SEARCH','nombre_funcionalidad_format_ko','El termino de busqueda contiene caracteres no permitidos. Solo se permiten letras y \u00F1'),
    Array('funcionalidad', 'nombre_funcionalidad', 'input', 14, 'valor correcto', 'valid', 'SEARCH',true,'El termino de busqueda es correcto.'),

    /* ==================== DESCRIP_FUNCIONALIDAD ====================*/

    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 15, 'cumple tama\u00F1o minimo', 'min_size', 'ADD','descrip_funcionalidad_min_size_ko','La descripcion de funcionalidad es demasiado corta. Introduzca al menos 5 caracteres'),
    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 16, 'cumple tama\u00F1o maximo', 'max_size', 'ADD','descrip_funcionalidad_max_size_ko','La descripcion de funcionalidad es demasiado larga. Introduzca hasta un maximo de 200 caracteres'),
    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 17, 'cumple formato', 'format', 'ADD','descrip_funcionalidad_format_ko','La descripcion de funcionalidad tiene un formato incorrecto. Introduzca texto alfabetico permitiendo \u00F1, espacios y signos de puntuacion'),
    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 18, 'valor correcto', 'valid', 'ADD',true,'La descripcion de funcionalidad es correcta.'),

    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 19, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT','descrip_funcionalidad_min_size_ko','La descripcion de funcionalidad es demasiado corta. Introduzca al menos 5 caracteres'),
    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 20, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT','descrip_funcionalidad_max_size_ko','La descripcion de funcionalidad es demasiado larga. Introduzca hasta un maximo de 200 caracteres'),
    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 21, 'cumple formato', 'format', 'EDIT','descrip_funcionalidad_format_ko','La descripcion de funcionalidad tiene un formato incorrecto. Introduzca texto alfabetico permitiendo \u00F1, espacios y signos de puntuacion'),
    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 22, 'valor correcto', 'valid', 'EDIT',true,'La descripcion de funcionalidad es correcta.'),

    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 23, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH','descrip_funcionalidad_max_size_ko','El termino de busqueda es demasiado largo. Introduzca hasta un maximo de 200 caracteres'),
    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 24, 'cumple formato', 'format', 'SEARCH','descrip_funcionalidad_format_ko','El termino de busqueda contiene caracteres no permitidos. Solo se permiten letras, \u00F1, espacios y signos de puntuacion'),
    Array('funcionalidad', 'descrip_funcionalidad', 'textarea', 25, 'valor correcto', 'valid', 'SEARCH',true,'El termino de busqueda es correcto.')
];

let funcionalidad_pruebas = [

    /* ==================== ID_FUNCIONALIDAD ==================== */

    Array('funcionalidad', 'id_funcionalidad', 1, 1, 'SEARCH',{ id_funcionalidad: '123456789012' },'id_funcionalidad_max_size_ko'),
    Array('funcionalidad', 'id_funcionalidad', 2, 2, 'SEARCH',{ id_funcionalidad: '12a' },'id_funcionalidad_format_ko'),
    Array('funcionalidad', 'id_funcionalidad', 3, 3, 'SEARCH',{ id_funcionalidad: '12345' },true),

    /* ==================== NOMBRE_FUNCIONALIDAD ==================== */

    Array('funcionalidad', 'nombre_funcionalidad', 4, 4, 'ADD',{ nombre_funcionalidad: 'hola' },'nombre_funcionalidad_min_size_ko'),
    Array('funcionalidad', 'nombre_funcionalidad', 5, 5, 'ADD',{ nombre_funcionalidad: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },'nombre_funcionalidad_max_size_ko'),
    Array('funcionalidad', 'nombre_funcionalidad', 6, 6, 'ADD',{ nombre_funcionalidad: 'Funcionalidad123' },'nombre_funcionalidad_format_ko'),
    Array('funcionalidad', 'nombre_funcionalidad', 7, 7, 'ADD',{ nombre_funcionalidad: 'A\u00F1adirPestana' },true),

    Array('funcionalidad', 'nombre_funcionalidad', 8, 8, 'EDIT',{ nombre_funcionalidad: 'hola' },'nombre_funcionalidad_min_size_ko'),
    Array('funcionalidad', 'nombre_funcionalidad', 9, 9, 'EDIT',{ nombre_funcionalidad: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },'nombre_funcionalidad_max_size_ko'),
    Array('funcionalidad', 'nombre_funcionalidad', 10, 10, 'EDIT',{ nombre_funcionalidad: 'Funcionalidad123' },'nombre_funcionalidad_format_ko'),
    Array('funcionalidad', 'nombre_funcionalidad', 11, 11, 'EDIT',{ nombre_funcionalidad: 'A\u00F1adirPestana' },true),

    Array('funcionalidad', 'nombre_funcionalidad', 12, 12, 'SEARCH',{ nombre_funcionalidad: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },'nombre_funcionalidad_max_size_ko'),
    Array('funcionalidad', 'nombre_funcionalidad', 13, 13, 'SEARCH',{ nombre_funcionalidad: 'Funcionalidad123' },'nombre_funcionalidad_format_ko'),
    Array('funcionalidad', 'nombre_funcionalidad', 14, 14, 'SEARCH',{ nombre_funcionalidad: 'A\u00F1adirPestana' },true),

    /* ==================== DESCRIP_FUNCIONALIDAD ==================== */

    Array('funcionalidad', 'descrip_funcionalidad', 15, 15, 'ADD',{ descrip_funcionalidad: 'hola' },'descrip_funcionalidad_min_size_ko'),
    Array('funcionalidad', 'descrip_funcionalidad', 16, 16, 'ADD',{ descrip_funcionalidad: 'a'.repeat(201) },'descrip_funcionalidad_max_size_ko'),
    Array('funcionalidad', 'descrip_funcionalidad', 17, 17, 'ADD',{ descrip_funcionalidad: 'Descripcion con version 1.0' },'descrip_funcionalidad_format_ko'),
    Array('funcionalidad', 'descrip_funcionalidad', 18, 18, 'ADD',{ descrip_funcionalidad: 'Esta es una descripcion valida, con n y signos.' },true),

    Array('funcionalidad', 'descrip_funcionalidad', 19, 19, 'EDIT',{ descrip_funcionalidad: 'hola' },'descrip_funcionalidad_min_size_ko'),
    Array('funcionalidad', 'descrip_funcionalidad', 20, 20, 'EDIT',{ descrip_funcionalidad: 'a'.repeat(201) },'descrip_funcionalidad_max_size_ko'),
    Array('funcionalidad', 'descrip_funcionalidad', 21, 21, 'EDIT',{ descrip_funcionalidad: 'Descripcion con version 1.0' },'descrip_funcionalidad_format_ko'),
    Array('funcionalidad', 'descrip_funcionalidad', 22, 22, 'EDIT',{ descrip_funcionalidad: 'Esta es una descripcion valida, con n y signos.' },true),

    Array('funcionalidad', 'descrip_funcionalidad', 23, 23, 'SEARCH',{ descrip_funcionalidad: 'a'.repeat(201) },'descrip_funcionalidad_max_size_ko'),
    Array('funcionalidad', 'descrip_funcionalidad', 24, 24, 'SEARCH',{ descrip_funcionalidad: 'Descripcion con version 1.0' },'descrip_funcionalidad_format_ko'),
    Array('funcionalidad', 'descrip_funcionalidad', 25, 25, 'SEARCH',{ descrip_funcionalidad: 'Esta es una descripcion valida, con n y signos.' },true)
];