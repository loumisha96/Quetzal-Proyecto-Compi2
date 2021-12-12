var case_ = /** @class */ (function () {
    function case_(valor, instrucciones, break_, linea, column, tipo, entorno) {
        this.valor = valor;
        this.instrucciones = instrucciones;
        this.break = break_;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };
    return case_;
}());