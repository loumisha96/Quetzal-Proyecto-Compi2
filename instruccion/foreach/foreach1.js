var foreach1 = /** @class */ (function () {
    function foreach1(id1, id2, id3, linea, column, tipo, entorno) {
        
        this.id1 = id1;
        this.id2 = id2;
        this.id3 = id3;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };
    foreach1.prototype.getTipo=function(){
        return this.tipo
    }
    foreach1.prototype.ejecutar = function(entorno, ast){
      return [this.id1, this.id2, this.id3]
    }
    return foreach1;
}());