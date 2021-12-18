var AsignacionExpr = /** @class */ (function () {
    function AsignacionExpr(id, expresion, linea, column, tipo) {
        
        this.id = id;
        this.expresion = expresion;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        

    };

    AsignacionExpr.prototype.ejecutar = function(entorno, ast){
        if (entorno.existe(this.id)){
            var sim =entorno.getSimbolo(this.id)
            sim.setValor(this.expresion.getValorImplicito(entorno,ast))
        }else{
            Errores.push(new nodoError("Tipo Semántico", "En asignacion id: " +this.id, this.linea, this.column))
            console.log("Error semántico en Asignacion id: "+ this.id+" linea: " + this.linea +" column: " +this.column)
        }
    }


    return AsignacionExpr;
}());