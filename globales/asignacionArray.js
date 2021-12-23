var asignacionArray = /** @class */ (function () {
    function asignacionArray(ids, valores, linea, column, tipo, entorno) {
        
        this.ids = ids;
        this.valores = valores;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
        this.nodo = new nodo("ASIGNACIONArray", new nodo(this.ids, this.valores,""), "")

    };
    asignacionArray.prototype.ejecutar = function(entorno, ast){
        if (entorno.existe(this.id)){
            var sim =entorno.getSimbolo(this.id)
            sim.setValor(this.valores)
        }else{
            Errores.push(new nodoError("Tipo Semántico", "En declaracion id: " +this.id, this.linea, this.column))
        //    console.log("Error semántico en Asignacion id: "+ this.id+" linea: " + this.linea +" column: " +this.column)
        }
    }
    return asignacionArray;
}());