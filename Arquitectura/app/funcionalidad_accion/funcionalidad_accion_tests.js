let funcionalidad_accion_def_tests = [

    // --- id_funcionalidad (Cambiado a 'select' por ser clave ajena) ---
    Array('funcionalidad_accion', 'id_funcionalidad', 'select', 1, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'id_funcionalidad_max_size_ko', 'El id de funcionalidad es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('funcionalidad_accion', 'id_funcionalidad', 'select', 2, 'cumple formato', 'format', 'SEARCH', 'id_funcionalidad_format_ko', 'El id de funcionalidad tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('funcionalidad_accion', 'id_funcionalidad', 'select', 3, 'valor correcto', 'valid', 'SEARCH', true, 'El id de funcionalidad es correcto.'),

    // --- id_accion (Cambiado a 'select' por ser clave ajena) ---
    Array('funcionalidad_accion', 'id_accion', 'select', 4, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'id_accion_max_size_ko', 'El id de accion es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('funcionalidad_accion', 'id_accion', 'select', 5, 'cumple formato', 'format', 'SEARCH', 'id_accion_format_ko', 'El id de accion tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('funcionalidad_accion', 'id_accion', 'select', 6, 'valor correcto', 'valid', 'SEARCH', true, 'El id de accion es correcto.'),
    
];

let funcionalidad_accion_pruebas = [

    // --- id_funcionalidad ---
    Array('funcionalidad_accion', 'id_funcionalidad', 1, 1, 'SEARCH', { id_funcionalidad: '123456789012' }, 'id_funcionalidad_max_size_ko'),
    Array('funcionalidad_accion', 'id_funcionalidad', 2, 2, 'SEARCH', { id_funcionalidad: '12a' }, 'id_funcionalidad_format_ko'),
    Array('funcionalidad_accion', 'id_funcionalidad', 3, 3, 'SEARCH', { id_funcionalidad: '12345' }, true),

    // --- id_accion ---
    Array('funcionalidad_accion', 'id_accion', 4, 4, 'SEARCH', { id_accion: '123456789012' }, 'id_accion_max_size_ko'),
    Array('funcionalidad_accion', 'id_accion', 5, 5, 'SEARCH', { id_accion: 'abc' }, 'id_accion_format_ko'),
    Array('funcionalidad_accion', 'id_accion', 6, 6, 'SEARCH', { id_accion: '12345' }, true),

];