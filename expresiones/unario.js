var unario = /** @class */ (function () {
    function unario(id, operador, linea, column, tipo) {
        
        this.id = id;
        this.operador = operador;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
    };

    unario.prototype.ejecutar = function(entorno, ast){
        if(entorno.existe(this.id)){
            var sim =entorno.getSimbolo(this.id)
            var valor = sim.getValorImplicito(entorno, ast)
            if (typeof valor == 'number'){
                if(this.operador == operador.increment){
                    valor = valor+1
                    sim.setValor(valor)
                }else if (this.operador == operador.decrement){
                    valor = valor-1
                    sim.setValor(valor)
                }
            }else{
                Errores.push(new nodoError("Tipo Semántico", "Tipo no válido",  "", this.linea, this.column))
            }
                
        }else{
            Errores.push(new nodoError("Tipo Semántico", "En declaracion id: " +this.id, this.linea, this.column))
            console.log("Error semántico en Declaracion id: "+ this.id+" linea: " + this.linea +" column: " +this.column)
        }
             
    }
    return unario;
}());