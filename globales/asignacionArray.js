var asignacionArray = /** @class */ (function () {
    function asignacionArray(ids, valores, linea, column, tipo, entorno) {
        this.ids = ids;
        this.valores = valores;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;

    };
    asignacionArray.prototype.ejecutar = function(entorno, ast){
        if (entorno.existe(this.id)){
            var sim =entorno.getSimbolo(this.id)
            sim.setValor(this.valores)
        }else{
            console.log("Error semántico en Asignacion id: "+ this.id+" linea: " + this.linea +" column: " +this.column)
        }
    }
    return asignacionArray;
}());