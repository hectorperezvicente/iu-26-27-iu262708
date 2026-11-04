/**
 * clase para poder refactorizar los metodos que se considere adecuados manteniendo la definicion de los mismos y para inclusion de nuevos metodos
 *
 * REFACTORIZADO: data_test_class
 *  - usa entity_dom_fields (Data_Test crea un dom_fields, que no sabe crear textarea ni select)
 *  - vacia el contenedor del formulario antes de las pruebas (si estaba el formulario de la entidad
 *    cargado, getElementById devolveria sus campos en vez de los de la prueba) y lo restaura despues
 *  - muestra el resultado en una ventana nueva, con un resumen de correctas/incorrectas.
 *    El titulo y el resumen salen del fichero de idioma activo (la ventana nueva no tiene setLang,
 *    asi que el texto se toma de window.traduccion al generarla)
 *  - si el navegador bloquea la ventana nueva se avisa con el modal de error, con el texto traducido
 */
class entity_Test_Data extends Data_Test{
    constructor(entidad){
        super(entidad);
    }

	data_test_class(){

		this.dom = new entity_dom_fields();

		// guardar estado del formulario y vaciarlo
		var formulario_previo = document.getElementById('contenedor_IU_form').innerHTML;
		this.dom.vaciarDiv('contenedor_IU_form');

		var salidapruebas = this.data_test_data();

		// restaurar el formulario
		document.getElementById('contenedor_IU_form').innerHTML = formulario_previo;

		// pintar la tabla con el metodo de la arquitectura en un div auxiliar y copiarla a la ventana nueva
		let marcados = {
			pruebastatus: {value:'INCORRECTO', style:'background-color: red'},
			traduccionError : {value:'sintraduccion', style:'background-color: red'}
		};
		this.dom.showData('IU_Test_result_nofile', salidapruebas, marcados);
		var tabla = document.getElementById('IU_Test_result_nofile').innerHTML;
		this.dom.vaciarDiv('IU_Test_result_nofile');
		this.dom.hide_element('IU_Test_result_nofile');

		var total = salidapruebas.length;
		var correctas = salidapruebas.filter(p => p.pruebastatus == 'CORRECTO').length;
		var sintraduccion = salidapruebas.filter(p => p.traduccionError == 'sintraduccion').length;

		// textos del idioma activo
		var t = (clave) => (window.traduccion && window.traduccion[clave]) ? window.traduccion[clave] : clave;

		var ventana = window.open('', 'test_'+this.entidad.nombreentidad);
		if (ventana === null){
			this.dom.abrirModalError('text_test_ventana_bloqueada');
			return false;
		}
		ventana.document.open();
		ventana.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
			<title>Test `+this.entidad.nombreentidad+`</title>
			<style>
				body{font-family:Arial,sans-serif;font-size:13px;margin:16px;}
				table{border-collapse:collapse;width:100%;}
				th,td{border:1px solid black;padding:3px 6px;vertical-align:top;}
				th{background:#ddd;}
				.resumen{margin-bottom:12px;font-size:15px;}
			</style></head><body>
			<h2>`+t('text_test_resultado')+` `+this.entidad.nombreentidad+`</h2>
			<div class="resumen">`+t('text_test_total')+`: `+total+` &nbsp; `+t('text_test_correctas')+`: `+correctas+` &nbsp; `+t('text_test_incorrectas')+`: `+(total-correctas)+` &nbsp; `+t('text_test_sintraduccion')+`: `+sintraduccion+`</div>
			`+tabla+`
			</body></html>`);
		ventana.document.close();

		return true;
	}

}
