var Atributo = /** @class */ (function () {
    function Atributo(tipoAttrb, id, array, linea, column, tipo, entorno) {
        this.tipoAttrb = tipoAttrb;
        this.id = id;
        this.array = array;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };
    
    Atributo.prototype.ejecutar = function(entorno, ast){
        if(this.array==0){

            if(typeof this.tipoAttrb != "string"){
                var simb = new Simbolo(this.tipoAttrb, this.id, this.linea, this.column,null)
                entorno.agregar(this.id,simb)
            }else{
                if(ast.existeStruct(this.tipoAttrb)){
                    var st = ast.getStruct(this.tipoAttrb)
                    
                    var simb = new Simbolo(this.tipoAttrb, this.id, this.linea, this.column,null)
                    entorno.agregar(this.id,simb)
                }else{
                    console.log("Error semántico en Struct id: "+ this.tipoAttrb+" linea: " + this.linea +" column: " +this.column)
                }
            }

        }else{
            this.id.forEach(e => {
                var simb = new Simbolo(this.tipoDeclaracion, e, this.linea, this.column,null)
                 entorno.agregar(this.id,simb)
            });
        }
    }
    return Atributo;
}());