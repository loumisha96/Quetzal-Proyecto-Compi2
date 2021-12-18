var parametro = /** @class */ (function () {
    function parametro(tipoParametro, id, array, linea, column, tipo) {
        
        this.tipoParametro = tipoParametro;
        this.id = id;
        this.array = array;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        //this.entorno = entorno;
    };
    parametro.prototype.ejecutar = function(entorno, ast){
        
        if(!entorno.existe(this.id)){
            var simb = new Simbolo(this.tipo, this.id, this.linea, this.column, this.getValorDefault())
            entorno.agregar(this.id,simb)
        }else{
           // Errores.push(new nodoError("Tipo Semántico", "Tipado no permitido", "", this.linea, this.column))
        }
        
    }

    parametro.prototype.getValorDefault = function(){
        switch (this.tipo) {
            case Primitivo.int:
                return 0;
            case Primitivo.double:
                return 0.0;
            case Primitivo.boolean:
                 return false;
            case  Primitivo.String:
                return "";
            default:
                return null;
        }
    }
    return parametro;
}());