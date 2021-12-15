var call = /** @class */ (function () {
    function call(id, parametros, linea, column, tipo) {
        this.id = id;
        this.parametros = parametros;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    call.prototype.ejecutar = function(entorno,ast){
        if(ast.existeFuncion(this.id)){
            const fn = ast.getFuncion(this.id)
            fn.ejecutar(entorno,ast)
            if(fn.parametros.length == this.parametros.length){
                for(var i=0; i< fn.parametros.length; i++){
                    var sim = entorno.getSimbolo(fn.parametros[i].id)
                    sim.setValor(this.parametros[i])
                }
            }

            fn.instrucciones.forEach(instr => {
                instr.ejecutar(entorno,ast)
            });
        }
    }
    return call;
}());