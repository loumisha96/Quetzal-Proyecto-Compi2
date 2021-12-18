var DeclaracionExpr = /** @class */ (function () {
    function DeclaracionExpr(tipoDeclaracion, id, expresion, linea, column, tipo) {
        
        this.tipoDeclaracion = tipoDeclaracion;
        this.id = id;
        this.expresion = expresion;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.nodo = new nodo("DECLARACIONEXPR", [tipoDeclaracion, id, expresion], "")
        
    };

    DeclaracionExpr.prototype.getID=function(){
        return this.id
    }
    DeclaracionExpr.prototype.ejecutar = function(entorno, ast){
        if(!entorno.existeEnActual(this.id) && !entornoGlobal.existeEnActual(this.id)){
            var simb = new Simbolo(this.tipoDeclaracion, this.id, this.linea, this.column, this.expresion.getValorImplicito(entorno, ast))
            entorno.agregar(this.id,simb)
        }else{
            Errores.push(new nodoError("Tipo Semántico", "En declaracion id: " +this.id, this.linea, this.column))
            console.log("Error semántico en Declaracion id: "+ variable+" linea: " + this.linea +" column: " +this.column)
        }
    }
    return DeclaracionExpr;
}());