/**
 * clase para refactorizar los metodos existentes en Validations. NO se pueden crear metodos nuevos.
 *
 * REFACTORIZADO: min_size y max_size
 * El Validations original solo mide INPUT de tipo number/email/text y devuelve undefined
 * para TEXTAREA, SELECT e INPUT password. Aqui se mide la longitud del valor en todos ellos.
 */
class entity_validations extends Validations{
    constructor(){
        super();
    }

	/**
	 * comprueba que el valor del elemento tiene al menos minsize caracteres
	 * @param {string} id id del elemento html
	 * @param {number} minsize tamano minimo
	 * @returns {bool} true si cumple, false si no
	 */
	min_size(id, minsize){
		let elemento = document.getElementById(id);
		switch (elemento.tagName){
			case 'INPUT':
				switch (elemento.type){
					case 'number':
					case 'email':
					case 'text':
					case 'password':
						return !(elemento.value.length < minsize);
					case 'file':
						break;
					default:
						break;
				}
				break;
			case 'TEXTAREA':
			case 'SELECT':
				return !(elemento.value.length < minsize);
			default:
				break;
		}
	}

	/**
	 * comprueba que el valor del elemento tiene como maximo maxsize caracteres
	 * @param {string} id id del elemento html
	 * @param {number} maxsize tamano maximo
	 * @returns {bool} true si cumple, false si no
	 */
	max_size(id, maxsize){
		let elemento = document.getElementById(id);
		switch (elemento.tagName){
			case 'INPUT':
				switch (elemento.type){
					case 'number':
					case 'email':
					case 'text':
					case 'password':
						return !(elemento.value.length > maxsize);
					case 'file':
						break;
					default:
						break;
				}
				break;
			case 'TEXTAREA':
			case 'SELECT':
				return !(elemento.value.length > maxsize);
			default:
				break;
		}
	}
}