var DeclaracionCall = /** @class */ (function () {
    function DeclaracionCall(tipoDeclaracion, id, call, linea, column, tipo) {
        this.tipoDeclaracion = tipoDeclaracion;
        this.id = id;
        this.call = call;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    return DeclaracionCall;
}());