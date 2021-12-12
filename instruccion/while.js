var while_ = /** @class */ (function () {
    function while_(condiciones, instrucciones, linea, column, tipo, entorno) {
        this.condiciones = condiciones;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };
    return while_;
}());