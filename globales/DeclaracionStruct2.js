var DeclaracionStruct2 = /** @class */ (function () {
    function DeclaracionStruct2(tipoStruct, id, linea, column, tipo) {
        this.tipoStruct = tipoStruct;
        this.id = id;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    DeclaracionStruct2.prototype.ejecutar=function(entorno, ast){
        if(ast.existeStruct(this.tipoStruct)){
            if(!entorno.existe(this.id)){
                var simb = new Simbolo(this.tipoStruct, this.id, this.linea, this.column,null)
                entorno.agregar(this.id,simb)
            }else{
                console.log("Error semántico en Declaracion struct: "+ this.id+" linea: " + this.linea +" column: " +this.column) 
            }
            
        }else{
            console.log("Error semántico en Declaracion struct: "+ this.id+" linea: " + this.linea +" column: " +this.column)
        }
    }
    return DeclaracionStruct2;
}());