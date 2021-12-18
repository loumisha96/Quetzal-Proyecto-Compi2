var forvar = /** @class */ (function () {
    function forvar(tipoForVar, id,expr, linea, column, tipo, entorno) {
        
        this.tipoForVar= tipoForVar;
        this.id = id;
        this.expr = expr;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };
    return forvar;
}());