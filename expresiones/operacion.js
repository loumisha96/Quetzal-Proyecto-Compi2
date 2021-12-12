var operacion = /** @class */ (function () {
    function operacion(expr, linea, column, tipo, entorno) {
        this.expr = expr;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };
    return operacion;
}());