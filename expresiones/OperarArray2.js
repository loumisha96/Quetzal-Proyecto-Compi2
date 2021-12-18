var OperarArray2 = /** @class */ (function () {
    function OperarArray2(id, operador, array, expr, linea, column) {
        
        this.id = id;
        this.operador = operador;
        this.array = array;
        this.expr = expr;
        this.linea =  linea;
        this.column = column;
        //this.tipo = tipo;
        //this.entorno = entorno;
    };
    return OperarArray2;
}());