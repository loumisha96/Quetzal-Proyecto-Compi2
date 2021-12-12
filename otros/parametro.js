var parametro = /** @class */ (function () {
    function parametro(tipoParametro, id, array, linea, column, tipo) {
        this.tipoParametro = tipoParametro;
        this.id = id;
        this.array = array;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        //this.entorno = entorno;
    };
    return parametro;
}());