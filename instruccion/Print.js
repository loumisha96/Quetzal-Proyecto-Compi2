var Print = /** @class */ (function () {
    function Print(expr, ln, expr2, linea, column, tipo) {
        
        this.expr = expr;
        this.ln = ln;
        this.expr2 = expr2;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    Print.prototype.ejecutar = function(entorno, ast){
        var valor =-1
        
        if(this.expr.tipo == tipoInstr.Call){
            valor = this.expr.ejecutar(entorno,ast)
        }else{
            if(this.expr.length>0){
                this.expr.forEach(e => {
                    
                    this.formato(e)
                    valor = e.getValorImplicito(entorno,ast)
                });
            }else
             valor = this.expr.getValorImplicito(entorno, ast)
        }
        if(typeof valor == "object" && entorno.existe(valor) ){
            var sim = entorno.getSimbolo(valor)
            valor =sim.getValorImplicito(entorno, ast)
        }
        var valor2=-1
        if(this.expr2!=null)
             valor2 = this.expr2.getValorImplicito(entorno, ast)
        if(typeof valor2 == "object" && entorno.existe(valor2) ){
            var sim = entorno.getSimbolo(valor2)
            valor2 =sim.getValorImplicito(entorno, ast)
        }
        
        if(typeof valor =="string"){
            var arr = valor.split(" ")
            arr.forEach(e => {
                if(e.includes("$")){
                    var v=e.split("$")
                    var sim=entorno.getSimbolo(v[1].trim().replaceAll("\"",''))
                    if(sim!=null){
                        if(typeof sim =="object"){
                            valor = valor.replaceAll("$"+v[1],sim.getValorImplicito(entorno,ast))
                          //  valor = valor.replaceAll("$",'')
                        }else{
                            valor = valor.replaceAll("$"+v[1],sim)
                          //  valor = valor.replaceAll("$",'')
                        }
                    }
                    else{
                        Errores.push(new nodoError("Error Semántico","Print variable no encontrada:" +v[1], "",this.linea, this.column))
                    }
                        
                    
                       
                }
            });
        }

        if(typeof valor2 =="string"){
            var arr = valor2.split(" ")
            arr.forEach(e => {
                if(e.includes("$")){
                    var v=e.split("$")
                    var sim=entorno.getSimbolo(v[1].trim().replaceAll("\"",''))
                    if(sim!=null){
                        if(typeof sim =="object"){
                            valor2 = valor2.replaceAll("$"+v[1],sim.getValorImplicito(entorno,ast))
                           // valor2 = valor2.replaceAll("$",'')
                        }else{
                            valor2 = valor2.replaceAll("$"+v[1],sim)
                           // valor2 = valor2.replaceAll("$",'')
                        }
                    }else{
                        Errores.push(new nodoError("Error Semántico","Print variable no encontrada:" +v[1], "",this.linea, this.column))
                    }
                    
                }
            });
        }


        if(this.expr2!=null)
        
            console.log(valor+valor2)
        else
            console.log(valor)
        if(this.ln==1)
            console.log("\n")
            
        
    }
    Print.prototype.get3D = function(){
        var codigo3D = "\tprintf(";
        this.expr.forEach(e => {
            switch (e.tipo) {
                case Valor.cadena:
                    codigo3D +="\"%s\","+ e.get3D()
                    break;
                case Valor.digito:
                case Valor.decimal:
                    codigo3D +="\"%d\","+ e.get3D()
                    break;
            }
            
            
        });
        codigo3D +=");\n" ;

        return codigo3D
    }

    Print.prototype.formato = function(val){
        switch (val.tipo) {
            case Valor.cadena:
                cod3D +="\"%s\","
                break;
            case Valor.digito:
            case Valor.decimal:
                cod3D +="\"%d\","
                break;
        }
    }
    return Print;
}());