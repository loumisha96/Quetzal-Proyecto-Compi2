var Ternario = /** @class */ (function () {
    function Ternario(condiciones, expr1, expr2, linea, column, tipo){
        this.condiciones = condiciones;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
    }
    return Ternario;
}());