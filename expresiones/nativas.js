var nativa = /** @class */ (function () {
    function nativa(id1, expr1, expr2, linea, column, tipo) {
        this.id1 = id1;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.linea =  linea;
        this.column = column;
        this.tipo = tipo;
        //this.entorno = entorno;
    };
    nativa.prototype.getValorImplicito = function(entorno, ast){
        var sim = -1
        var val1 = -1

        if(entorno.existe(this.id1.getValorImplicito(entorno, ast))){
            sim = entorno.getSimbolo(this.id1.getValorImplicito(entorno, ast))
            var cadena = sim.getValorImplicito(entorno, ast)
            cadena = cadena.replaceAll("\"",'') //animal
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
            return this.ejecutarNat(cadena)
            
        }
        else if(this.isCadena()){
            var cadena = this.id1.getValorImplicito(entorno, ast)
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
            
            return this.ejecutarNat(cadena)

        }
    }
    nativa.prototype.ejecutarNat=function(cadena){
        switch (this.tipo) {
            case Nativa.subString:

                var v2 = this.expr2.getValorImplicito(entorno, ast)

                if(typeof v2 =="string"){//subString(a)
                    if(entorno.existe(v2)){
                        var sim2 = entorno.getSimbolo(v2)
                        val2 = sim2.getValorImplicito(entorno,ast)
                    }
                }else
                     val2=v2 //subString(2)

                var cadena_=""
                for(var i=0; i<cadena_.length; i++){
                    if(i>=val1 && i<=val2)
                        cadena_= cadena_+ cadena_[i]
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