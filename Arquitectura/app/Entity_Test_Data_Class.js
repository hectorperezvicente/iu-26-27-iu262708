/**
 * refactorizacion de Data_Test: los resultados salen en una ventana nueva
 */
class entity_Test_Data extends Data_Test{
    constructor(entidad){
        super(entidad);
    }

	/**
	 * refactorizado: ejecuta los test y saca el resultado en una ventana nueva
	 * @returns {boolean} false si se bloquea la ventana
	 */
	data_test_class(){

		this.dom = new entity_dom_fields();

		// guardar el formulario y vaciarlo
		var formulario_previo = document.getElementById('contenedor_IU_form').innerHTML;
		this.dom.vaciarDiv('contenedor_IU_form');

		var salidapruebas = this.data_test_data();

		// restaurar el formulario
		document.getElementById('contenedor_IU_form').innerHTML = formulario_previo;

		// se pinta la tabla en un div auxiliar y se copia a la ventana
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
