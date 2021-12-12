var dowhile = /** @class */ (function () {
    function dowhile(instrucciones, condiciones, linea, column, tipo) {
        this.instrucciones = instrucciones;
        this.condiciones = condiciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
      //  this.entorno = entorno;
    };
    return dowhile;
}());