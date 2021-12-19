var DeclaracionVarios = /** @class */ (function () {
    function DeclaracionVarios(tipoVarios, ids, linea, column, tipo) {
        
        this.tipoVarios = tipoVarios;
        this.ids = ids;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };

    DeclaracionVarios.prototype.ejecutar = function(entorno, ast){
        this.ids.forEach(variable => {
            if(!entorno.existe(variable)){
                var simb = new Simbolo(this.tipo, variable, this.linea, this.column, this.getValorDefault())
                entorno.agregar(variable,simb)
            }else{
                Errores.push(new nodoError("Tipo Semántico", "En declaracion id: " +this.id, this.linea, this.column))
                console.log("Error semántico en Declaracion id: "+ variable+" linea: " + this.linea +" column: " +this.column)
            }
        });
    }

    DeclaracionVarios.prototype.getValorDefault = function(){
        switch (this.tipoVarios) {
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
    return DeclaracionVarios;
}());