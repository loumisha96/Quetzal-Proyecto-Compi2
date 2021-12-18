var case_ = /** @class */ (function () {
    function case_(valor, instrucciones, break_, linea, column, tipo, entorno) {
        
        this.valor = valor;
        this.instrucciones = instrucciones;
        this.break = break_;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        this.entorno = entorno;
    };
    case_.prototype.getID= function(){
        return this.valor
    }
    case_.prototype.getBreak = function(){
        return this.break
    }
    case_.prototype.ejecutar = function(entorno, ast){
        
            this.instrucciones.forEach(instr => {
                instr.ejecutar(entorno, ast)
            });
    }
    return case_;
}());