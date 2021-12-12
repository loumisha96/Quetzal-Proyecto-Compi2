var DeclaracionStruct = /** @class */ (function () {
    function DeclaracionStruct(tipoStruct, id, struct, valores, linea, column, tipo) {
        this.tipoStruct = tipoStruct;
        this.id = id;
        this.struct = struct;
        this.valores = valores;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    DeclaracionStruct.prototype.ejecutar = function(entorno, ast){
        if(!entorno.existe()){
            var simb = new Simbolo(this.tipoStruct, this.id, this.linea, this.column, )
            entorno.agregar(this.id,simb)
        }else{
            console.log("Error semántico en Declaracion id: "+ this.id+" linea: " + this.linea +" column: " +this.column)
        }
    }
    return DeclaracionStruct;
}());