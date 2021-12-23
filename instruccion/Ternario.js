var Ternario = /** @class */ (function () {
    function Ternario(condiciones, expr1, expr2, linea, column, tipo){
        
        this.condiciones = condiciones;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
    }
    Ternario.prototype.ejecutar = function(entorno, ast){
        var cadena =-1;
        try {
            
            this.condiciones.forEach(cond => {
                var valor = cond.getValorImplicito(entorno,ast)
                if (typeof valor == 'boolean'){
                    if(valor){
                    cadena = this.expr1.getValorImplicito(entorno,ast)
                    }else{
                    cadena =  this.expr2.getValorImplicito(entorno,ast)
                    }
                    throw BreakException;
                }else{
                    Errores.push(new nodoError("Tipo Semántico", "En declaracion id: " +this.id, this.linea, this.column))
                }
            });
        } catch (error) {
            
        }
        return cadena
    }
    return Ternario;
}());