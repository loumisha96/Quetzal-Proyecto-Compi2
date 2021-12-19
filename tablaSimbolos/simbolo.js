"use strict";
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, id, linea, columna, valor, entorno) {
        this.identificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.Entorno = entorno;
    }
    Simbolo.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };

    Simbolo.prototype.getID = function () {
        return this.identificador;
    };
    Simbolo.prototype.getValorImplicito = function (ent, ast) {
        if(this.tipo ==Valor.id &&  ent.existe(this.valor)){
            var simAux2 = ent.getSimbolo(this.valor)
            this.valor=  simAux2.getValorImplicito(ent, ast)
        }
        return this.valor;
    };
    Simbolo.prototype.setValor = function(val){
        
        this.valor = val
    }
    Simbolo.prototype.getValor = function(){
        return this.valor
    }
    return Simbolo;
}());