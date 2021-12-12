var attributosStructExpr = /** @class */ (function () {
    function attributosStructExpr(TipoAttrb, id, expr, linea, column, tipo, entorno) {
        this.TipoAttrb = TipoAttrb;
        this.id = id;
        this.expr = expr;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;

    };
    return attributosStructExpr;
}());