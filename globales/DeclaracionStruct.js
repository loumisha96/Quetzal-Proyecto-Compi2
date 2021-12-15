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
        if(ast.existeStruct(this.tipoStruct)){
            if(!entorno.existe(this.id)){
                var simb = new Simbolo(this.tipoStruct, this.id, this.linea, this.column,this.valores)
                entorno.agregar(this.id,simb)
            }else{
                console.log("Error semántico en Declaracion struct: "+ this.id+" linea: " + this.linea +" column: " +this.column) 
            }
            
        }else{
            console.log("Error semántico en Declaracion struct: "+ this.id+" linea: " + this.linea +" column: " +this.column)
        }
    }
    return DeclaracionStruct;
}());