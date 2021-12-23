var nativa = /** @class */ (function () {
    function nativa(id1, expr1, expr2, linea, column, tipoN, tipo) {
        
        this.id1 = id1;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.linea =  linea;
        this.column = column;
        this.tipoN = tipoN;
        this.tipo = tipo
        //this.entorno = entorno;
    };
    var val1 = -1
    nativa.prototype.getValorImplicito = function(entorno, ast){
        var sim = -1
        
        
            if(typeof this.id1 =="object" && entorno.existe(this.id1.valor)){
                sim = entorno.getSimbolo(this.id1.valor)
                var cadena = sim.getValorImplicito(entorno, ast)
               // cadena = cadena.replaceAll("\"",'') //animal
                if(this.expr1!=null){
                    var v = this.expr1.getValorImplicito(entorno, ast)
                    if(typeof v =="string"){
                        if(entorno.existe(v)){
                            var sim2 = entorno.getSimbolo(v)
                            val1 = sim2.getValorImplicito(entorno,ast)
                        }
                    }else
                        val1=v
                }
                return this.ejecutarNat(cadena, entorno, ast)
                
            }else if(this.id1.tipo == tipoInstr.Call){
                var cadena = this.id1.ejecutar(entorno, ast)
                return this.ejecutarNat(cadena, entorno, ast)
            }else if(this.tipo == tipoInstr.Nativa){
                var cadena=-1
                if(typeof this.id1 != "object"  ){
                    cadena = this.id1.getValorImplicito(entorno,ast)
                }else if(this.id1.length>0){
                    this.id1.forEach(e => {
                        cadena = e.getValorImplicito(entorno,ast)
                    });
                     
                }
                    

                
                return this.ejecutarNat(cadena, entorno, ast)
            }
            else if(this.isCadena()){
                var cadena = this.id1.getValorImplicito(entorno, ast)
                if(this.expr1!=null){
                    if(this.expr2.tipo != tipoInstr.Nativa){
                        var v = this.expr1.getValorImplicito(entorno, ast)
                        if(typeof v =="string"){
                            if(entorno.existe(v)){
                                var sim2 = entorno.getSimbolo(v)
                                val1 = sim2.getValorImplicito(entorno,ast)
                            }
                        }else
                            val1=v
                    }else{
                        val1 = this.expr1.getValorImplicito(entorno,ast)
                    }
                    
                }
                
                return this.ejecutarNat(cadena, entorno,ast)
    
            }else{
                return this.ejecutarNat(this.id1.getValorImplicito(entorno,ast))
            }
        
        
    }
    nativa.prototype.ejecutarNat=function(cadena,entorno, ast){
        if(typeof cadena == "string")
            cadena = cadena.replaceAll("\"",'')
        switch (this.tipoN) {
            case Nativa.subString:
                if(this.expr2.tipo != tipoInstr.Nativa){
                    var v2 = this.expr2.getValorImplicito(entorno, ast)

                    if(typeof v2 =="string"){//subString(a)
                        if(entorno.existe(v2)){
                            var sim2 = entorno.getSimbolo(v2)
                            val2 = sim2.getValorImplicito(entorno,ast)
                        }
                    }
                    else
                         val2=v2 //subString(2)
    
                }else{
                    val2 = this.expr2.getValorImplicito(entorno, ast)
                }

                var cadena_=""
                for(var i=0; i<cadena.length; i++){
                    if(i>=val1 && i<=val2)
                        cadena_+= cadena[i]
                }
                return cadena_

            case Nativa.length:
                return cadena.length

            case Nativa.toUppercase:
                return cadena.toUpperCase()
            case Nativa.toLowercase:
                return cadena.toLowerCase()
            case Nativa.pop:
                break;
            case Nativa.push:
                break;
            case Nativa.caracterOfPosition:
                for(var i=0; i<cadena.length; i++){
                    if(i==val1)
                        return cadena[i]
                }
                break;
            case Nativa.intParse:
                //cadena = cadena.replaceAll("\"",'')
                return parseInt(cadena)
            case Nativa.doubleParse:
               // cadena = cadena.replaceAll("\"",'')
                return parseFloat(cadena)
            case Nativa.booleanParse:
                if (cadena =="1")
                    return true
                else if(cadena =="0")
                     return false 
            case Nativa.toInt:
                //cadena = cadena.replaceAll("\"",'')
                return parseInt(cadena)
            case Nativa.toDouble:
               // cadena = cadena.replaceAll("\"",'')
                return parseFloat(cadena).toFixed(3)
            case Nativa.string:
                cadena="\""+cadena+"\""
                return cadena
            case Nativa.typeof:
                return typeof cadena
            case tipoInstr.Nativa:
                return cadena
        }
    }
    nativa.prototype.isCadena = function(){
        var tipo = this.id1.getTipo()
        switch (tipo) {
            case Valor.cadena:
                return true
        }
        return false
    }
    return nativa;
}());