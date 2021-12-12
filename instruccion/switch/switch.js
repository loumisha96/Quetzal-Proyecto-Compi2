var switch_ = /** @class */ (function () {
    function switch_(id, cases, linea, column, tipo) {
        this.id = id;
        this.cases = cases;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };

     switch_.prototype.ejecutar = function(entorno, ast){
         var bandera = false;
        if(entorno.existe(this.id)){
            var sim = entorno.getSimbolo(this.id)
            var val  = sim.getValorImplicito(entorno, ast)
            this.cases.forEach(c => {
               var val2 = c.getID()
               val2 = val2.getValorImplicito(entorno, ast)
                if(val2 == val){
                  c.ejecutar(entorno, ast)
                  if(c.getBreak()==0)
                    bandera = true
                  else
                    bandera = false

                }else if(bandera ){
                    c.ejecutar(entorno, ast)
                    if(c.getBreak()==0)
                         bandera = true
                    else
                        bandera = false
                }
                
                
            });
        }
     }   
    return switch_;
}());