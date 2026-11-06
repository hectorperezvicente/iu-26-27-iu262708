/**
 * refactorizacion de Validations (sin metodos nuevos): min_size y max_size
 * tambien miden textarea, select y password
 */
class entity_validations extends Validations{
    constructor(){
        super();
    }

	/**
	 * refactorizado: mide tambien textarea, select y password
	 * @param {string} id id del campo
	 * @param {number} minsize tamano minimo
	 * @returns {boolean}
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
	 * refactorizado: mide tambien textarea, select y password
	 * @param {string} id id del campo
	 * @param {number} maxsize tamano maximo
	 * @returns {boolean}
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
