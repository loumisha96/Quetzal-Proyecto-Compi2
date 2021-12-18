var nodoError = /** @class */ (function () {
    function nodoError(tipo,  descripcion, ambito, linea, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.ambito = ambito
        this.linea= linea
        this.columna = columna;

     }
    
    return nodoError;
}());