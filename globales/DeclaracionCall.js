var DeclaracionCall = /** @class */ (function () {
    function DeclaracionCall(tipoDeclaracion, id, call, linea, column, tipo) {
        
        this.tipoDeclaracion = tipoDeclaracion;
        this.id = id;
        this.call = call;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    DeclaracionCall.prototype.ejecutar = function(entorno, ast){
        if(!entorno.existe(this.id)){
            var simb = new Simbolo(this.tipoDeclaracion, this.id, this.linea, this.column, this.call.ejecutar(entorno, ast))
            entorno.agregar(this.id,simb)
        }else{
            Errores.push(new nodoError("Tipo Semántico", "En declaracion id: " +this.id,"Decla CALL" ,this.linea, this.column))
           // console.log("Error semántico en Declaracion id: "+ variable+" linea: " + this.linea +" column: " +this.column)
        }
    }
    return DeclaracionCall;
}());