let rolaccionfuncionalidad_def_tests = [

    // --- id_funcionalidad (Cambiado a 'select' por ser clave ajena) ---
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 'select', 1, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'id_funcionalidad_min_size_ko', 'El id de funcionalidad es demasiado corto. Introduzca al menos 1 numero'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 'select', 2, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'id_funcionalidad_max_size_ko', 'El id de funcionalidad es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 'select', 3, 'cumple formato', 'format', 'ADD', 'id_funcionalidad_format_ko', 'El id de funcionalidad tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 'select', 4, 'valor correcto', 'valid', 'ADD', true, 'El id de funcionalidad es correcto.'),   

    Array('rolaccionfuncionalidad', 'id_funcionalidad', 'select', 5, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'id_funcionalidad_max_size_ko', 'El id de funcionalidad es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 'select', 6, 'cumple formato', 'format', 'SEARCH', 'id_funcionalidad_format_ko', 'El id de funcionalidad tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 'select', 7, 'valor correcto', 'valid', 'SEARCH', true, 'El id de funcionalidad es correcto.'),

    // --- id_accion (Cambiado a 'select' por ser clave ajena) ---
    Array('rolaccionfuncionalidad', 'id_accion', 'select', 8, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'id_accion_min_size_ko', 'El id de accion es demasiado corto. Introduzca al menos 1 numero'),
    Array('rolaccionfuncionalidad', 'id_accion', 'select', 9, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'id_accion_max_size_ko', 'El id de accion es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('rolaccionfuncionalidad', 'id_accion', 'select', 10, 'cumple formato', 'format', 'ADD', 'id_accion_format_ko', 'El id de accion tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('rolaccionfuncionalidad', 'id_accion', 'select', 11, 'valor correcto', 'valid', 'ADD', true, 'El id de accion es correcto.'),

    Array('rolaccionfuncionalidad', 'id_accion', 'select', 12, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'id_accion_max_size_ko', 'El id de accion es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('rolaccionfuncionalidad', 'id_accion', 'select', 13, 'cumple formato', 'format', 'SEARCH', 'id_accion_format_ko', 'El id de accion tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('rolaccionfuncionalidad', 'id_accion', 'select', 14, 'valor correcto', 'valid', 'SEARCH', true, 'El id de accion es correcto.'),

    // --- id_rol (Cambiado a 'select' por ser clave ajena) ---
    Array('rolaccionfuncionalidad', 'id_rol', 'select', 15, 'cumple tama\u00F1o minimo', 'min_size', 'ADD', 'id_rol_min_size_ko', 'El id de rol es demasiado corto. Introduzca al menos 1 numero'),
    Array('rolaccionfuncionalidad', 'id_rol', 'select', 16, 'cumple tama\u00F1o maximo', 'max_size', 'ADD', 'id_rol_max_size_ko', 'El id de rol es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('rolaccionfuncionalidad', 'id_rol', 'select', 17, 'cumple formato', 'format', 'ADD', 'id_rol_format_ko', 'El id de rol tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('rolaccionfuncionalidad', 'id_rol', 'select', 18, 'valor correcto', 'valid', 'ADD', true, 'El id de rol es correcto.'),

    Array('rolaccionfuncionalidad', 'id_rol', 'select', 19, 'cumple tama\u00F1o maximo', 'max_size', 'SEARCH', 'id_rol_max_size_ko', 'El id de rol es demasiado largo. Introduzca hasta un maximo de 11 numeros'),
    Array('rolaccionfuncionalidad', 'id_rol', 'select', 20, 'cumple formato', 'format', 'SEARCH', 'id_rol_format_ko', 'El id de rol tiene un formato incorrecto. Introduzca el id correctamente con formato numerico'),
    Array('rolaccionfuncionalidad', 'id_rol', 'select', 21, 'valor correcto', 'valid', 'SEARCH', true, 'El id de rol es correcto.'),

];

let rolaccionfuncionalidad_pruebas = [

    // --- id_funcionalidad ---
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 1, 1, 'ADD', { id_funcionalidad: '' }, 'id_funcionalidad_min_size_ko'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 2, 2, 'ADD', { id_funcionalidad: '123456789012' }, 'id_funcionalidad_max_size_ko'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 3, 3, 'ADD', { id_funcionalidad: '12a' }, 'id_funcionalidad_format_ko'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 4, 4, 'ADD', { id_funcionalidad: '12345' }, true),

    Array('rolaccionfuncionalidad', 'id_funcionalidad', 5, 5, 'SEARCH', { id_funcionalidad: '123456789012' }, 'id_funcionalidad_max_size_ko'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 6, 6, 'SEARCH', { id_funcionalidad: '12a' }, 'id_funcionalidad_format_ko'),
    Array('rolaccionfuncionalidad', 'id_funcionalidad', 7, 7, 'SEARCH', { id_funcionalidad: '12345' }, true),

    // --- id_accion ---
    Array('rolaccionfuncionalidad', 'id_accion', 8, 8, 'ADD', { id_accion: '' }, 'id_accion_min_size_ko'),
    Array('rolaccionfuncionalidad', 'id_accion', 9, 9, 'ADD', { id_accion: '123456789012' }, 'id_accion_max_size_ko'),
    Array('rolaccionfuncionalidad', 'id_accion', 10, 10, 'ADD', { id_accion: 'abc' }, 'id_accion_format_ko'),
    Array('rolaccionfuncionalidad', 'id_accion', 11, 11, 'ADD', { id_accion: '12345' }, true),

    Array('rolaccionfuncionalidad', 'id_accion', 12, 12, 'SEARCH', { id_accion: '123456789012' }, 'id_accion_max_size_ko'),
    Array('rolaccionfuncionalidad', 'id_accion', 13, 13, 'SEARCH', { id_accion: 'abc' }, 'id_accion_format_ko'),
    Array('rolaccionfuncionalidad', 'id_accion', 14, 14, 'SEARCH', { id_accion: '12345' }, true),

    // --- id_rol ---
    Array('rolaccionfuncionalidad', 'id_rol', 15, 15, 'ADD', { id_rol: '' }, 'id_rol_min_size_ko'),
    Array('rolaccionfuncionalidad', 'id_rol', 16, 16, 'ADD', { id_rol: '123456789012' }, 'id_rol_max_size_ko'),
    Array('rolaccionfuncionalidad', 'id_rol', 17, 17, 'ADD', { id_rol: '12a' }, 'id_rol_format_ko'),
    Array('rolaccionfuncionalidad', 'id_rol', 18, 18, 'ADD', { id_rol: '12345' }, true),

    Array('rolaccionfuncionalidad', 'id_rol', 19, 19, 'SEARCH', { id_rol: '123456789012' }, 'id_rol_max_size_ko'),
    Array('rolaccionfuncionalidad', 'id_rol', 20, 20, 'SEARCH', { id_rol: '12a' }, 'id_rol_format_ko'),
    Array('rolaccionfuncionalidad', 'id_rol', 21, 21, 'SEARCH', { id_rol: '12345' }, true),

];