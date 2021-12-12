var DeclaracionArray = /** @class */ (function () {
    function DeclaracionArray(tipoArray, id, valores, linea, column, tipo) {
        this.tipoArray = tipoArray;
        this.id = id;
        this.valores = valores;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    DeclaracionArray.prototype.ejecutar= function(entorno, ast){
        if(!entorno.existe(this.id)){
            var simb = new Simbolo(this.tipoArray, this.id, this.linea, this.column, this.valores)
            entorno.agregar(this.id,simb)
        }else{
            console.log("Error semántico en Declaracion id: "+ variable+" linea: " + this.linea +" column: " +this.column)
        }
    }
    return DeclaracionArray;
}());