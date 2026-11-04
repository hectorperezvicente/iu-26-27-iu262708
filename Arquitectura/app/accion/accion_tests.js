let accion_def_tests = [
    /* ==================== ID_ACCION ==================== */

    Array('accion', 'id_accion', 'input', 1, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'id_accion_max_size_ko', 'El id de accion es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('accion', 'id_accion', 'input', 2, 'cumple formato', 'format', 'SEARCH', 'id_accion_format_ko', 'El id de accion tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('accion', 'id_accion', 'input', 3, 'valor correcto', 'valid', 'SEARCH', true, 'El id de accion es correcto.'),

    /* ==================== NOMBRE_ACCION ==================== */

    Array('accion', 'nombre_accion', 'input', 4, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'nombre_accion_min_size_ko', 'El nombre de accion es demasiado corto. Introduzca al menos 5 caracteres'),
    Array('accion', 'nombre_accion', 'input', 5, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'nombre_accion_max_size_ko', 'El nombre de accion es demasiado largo. Introduzca hasta un maximo de 48 caracteres'),
    Array('accion', 'nombre_accion', 'input', 6, 'cumple formato', 'format', 'ADD', 'nombre_accion_format_ko', 'El nombre de accion tiene un formato incorrecto. Introduzca el nombre correctamente permitiendo \u00F1'),
    Array('accion', 'nombre_accion', 'input', 7, 'valor correcto', 'valid', 'ADD', true, 'El nombre de accion es correcto.'),

    Array('accion', 'nombre_accion', 'input', 8, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT', 'nombre_accion_min_size_ko', 'El nombre de accion es demasiado corto. Introduzca al menos 5 caracteres'),
    Array('accion', 'nombre_accion', 'input', 9, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT', 'nombre_accion_max_size_ko', 'El nombre de accion es demasiado largo. Introduzca hasta un maximo de 48 caracteres'),
    Array('accion', 'nombre_accion', 'input', 10, 'cumple formato', 'format', 'EDIT', 'nombre_accion_format_ko', 'El nombre de accion tiene un formato incorrecto. Introduzca el nombre correctamente permitiendo \u00F1'),
    Array('accion', 'nombre_accion', 'input', 11, 'valor correcto', 'valid', 'EDIT', true, 'El nombre de accion es correcto.'),

    Array('accion', 'nombre_accion', 'input', 12, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'nombre_accion_max_size_ko', 'El termino de busqueda es demasiado largo. Introduzca hasta un maximo de 48 caracteres'),
    Array('accion', 'nombre_accion', 'input', 13, 'cumple formato', 'format', 'SEARCH', 'nombre_accion_format_ko', 'El termino de busqueda contiene caracteres no permitidos. Solo se permiten letras y \u00F1'),
    Array('accion', 'nombre_accion', 'input', 14, 'valor correcto', 'valid', 'SEARCH', true, 'El termino de busqueda es correcto.'),

    /* ==================== DESCRIP_ACCION ==================== */

    Array('accion', 'descrip_accion', 'textarea', 15, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'descrip_accion_min_size_ko', 'La descripcion de accion es demasiado corta. Introduzca al menos 5 caracteres'),
    Array('accion', 'descrip_accion', 'textarea', 16, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'descrip_accion_max_size_ko', 'La descripcion de accion es demasiado larga. Introduzca hasta un maximo de 200 caracteres'),
    Array('accion', 'descrip_accion', 'textarea', 17, 'cumple formato', 'format', 'ADD', 'descrip_accion_format_ko', 'La descripcion de accion tiene un formato incorrecto. Introduzca texto alfabetico permitiendo \u00F1, espacios y signos de puntuacion'),
    Array('accion', 'descrip_accion', 'textarea', 18, 'valor correcto', 'valid', 'ADD', true, 'La descripcion de accion es correcta.'),

    Array('accion', 'descrip_accion', 'textarea', 19, 'cumple tama\u00F1o minimo', 'min_size', 'EDIT', 'descrip_accion_min_size_ko', 'La descripcion de accion es demasiado corta. Introduzca al menos 5 caracteres'),
    Array('accion', 'descrip_accion', 'textarea', 20, 'cumple tama\u00F1o maximo', 'max_size', 'EDIT', 'descrip_accion_max_size_ko', 'La descripcion de accion es demasiado larga. Introduzca hasta un maximo de 200 caracteres'),
    Array('accion', 'descrip_accion', 'textarea', 21, 'cumple formato', 'format', 'EDIT', 'descrip_accion_format_ko', 'La descripcion de accion tiene un formato incorrecto. Introduzca texto alfabetico permitiendo \u00F1, espacios y signos de puntuacion'),
    Array('accion', 'descrip_accion', 'textarea', 22, 'valor correcto', 'valid', 'EDIT', true, 'La descripcion de accion es correcta.'),

    Array('accion', 'descrip_accion', 'textarea', 23, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'descrip_accion_max_size_ko', 'El termino de busqueda es demasiado largo. Introduzca hasta un maximo de 200 caracteres'),
    Array('accion', 'descrip_accion', 'textarea', 24, 'cumple formato', 'format', 'SEARCH', 'descrip_accion_format_ko', 'El termino de busqueda contiene caracteres no permitidos. Solo se permiten letras, \u00F1, espacios y signos de puntuacion'),
    Array('accion', 'descrip_accion', 'textarea', 25, 'valor correcto', 'valid', 'SEARCH', true, 'El termino de busqueda es correcto.')
];

let accion_pruebas = [
    /* ==================== ID_ACCION ==================== */

    Array('accion', 'id_accion', 1, 1, 'SEARCH', { id_accion: '123456789012' }, 'id_accion_max_size_ko'),
    Array('accion', 'id_accion', 2, 2, 'SEARCH', { id_accion: 'abc' }, 'id_accion_format_ko'),
    Array('accion', 'id_accion', 3, 3, 'SEARCH', { id_accion: '12345' }, true),

    /* ==================== NOMBRE_ACCION ==================== */

    Array('accion', 'nombre_accion', 4, 4, 'ADD', { nombre_accion: 'Hola' }, 'nombre_accion_min_size_ko'),
    Array('accion', 'nombre_accion', 5, 5, 'ADD', { nombre_accion: 'a'.repeat(49) }, 'nombre_accion_max_size_ko'),
    Array('accion', 'nombre_accion', 6, 6, 'ADD', { nombre_accion: 'Accion123!' }, 'nombre_accion_format_ko'),
    Array('accion', 'nombre_accion', 7, 7, 'ADD', { nombre_accion: 'NombreAccion' }, true),

    Array('accion', 'nombre_accion', 8, 8, 'EDIT', { nombre_accion: 'Hola' }, 'nombre_accion_min_size_ko'),
    Array('accion', 'nombre_accion', 9, 9, 'EDIT', { nombre_accion: 'a'.repeat(49) }, 'nombre_accion_max_size_ko'),
    Array('accion', 'nombre_accion', 10, 10, 'EDIT', { nombre_accion: 'Accion123!' }, 'nombre_accion_format_ko'),
    Array('accion', 'nombre_accion', 11, 11, 'EDIT', { nombre_accion: 'NombreAccion' }, true),

    Array('accion', 'nombre_accion', 12, 12, 'SEARCH', { nombre_accion: 'a'.repeat(49) }, 'nombre_accion_max_size_ko'),
    Array('accion', 'nombre_accion', 13, 13, 'SEARCH', { nombre_accion: 'Accion123!' }, 'nombre_accion_format_ko'),
    Array('accion', 'nombre_accion', 14, 14, 'SEARCH', { nombre_accion: 'Nombre' }, true),

    /* ==================== DESCRIP_ACCION ==================== */

    Array('accion', 'descrip_accion', 15, 15, 'ADD', { descrip_accion: 'Hola' }, 'descrip_accion_min_size_ko'),
    Array('accion', 'descrip_accion', 16, 16, 'ADD', { descrip_accion: 'a'.repeat(201) }, 'descrip_accion_max_size_ko'),
    Array('accion', 'descrip_accion', 17, 17, 'ADD', { descrip_accion: 'Descripcion con numeros 123' }, 'descrip_accion_format_ko'),
    Array('accion', 'descrip_accion', 18, 18, 'ADD', { descrip_accion: 'Esta es una descripcion valida, con signos y n!' }, true),

    Array('accion', 'descrip_accion', 19, 19, 'EDIT', { descrip_accion: 'Hola' }, 'descrip_accion_min_size_ko'),
    Array('accion', 'descrip_accion', 20, 20, 'EDIT', { descrip_accion: 'a'.repeat(201) }, 'descrip_accion_max_size_ko'),
    Array('accion', 'descrip_accion', 21, 21, 'EDIT', { descrip_accion: 'Descripcion con numeros 123' }, 'descrip_accion_format_ko'),
    Array('accion', 'descrip_accion', 22, 22, 'EDIT', { descrip_accion: 'Esta es una descripcion valida, con signos y n!' }, true),

    Array('accion', 'descrip_accion', 23, 23, 'SEARCH', { descrip_accion: 'a'.repeat(201) }, 'descrip_accion_max_size_ko'),
    Array('accion', 'descrip_accion', 24, 24, 'SEARCH', { descrip_accion: 'Descripcion con numeros 123' }, 'descrip_accion_format_ko'),
    Array('accion', 'descrip_accion', 25, 25, 'SEARCH', { descrip_accion: 'Esta es una descripcion valida, con signos y n!' }, true)
];