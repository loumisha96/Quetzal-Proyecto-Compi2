var nativa = /** @class */ (function () {
    function nativa(id1, expr1, expr2, linea, column, tipo) {
        this.id1 = id1;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.linea =  linea;
        this.column = column;
        this.tipo = tipo;
        //this.entorno = entorno;
    };
    return nativa;
}());