"use strict";
var Ast = /** @class */ (function () {
    function Ast(instrucciones) {
        this.instrucciones = instrucciones;
        this.structs = []
        this.funciones =[]
    }
    Ast.prototype.existeStruct = function(id){
        for(var i=0; i<this.structs.length; i++){
            const st = this.structs[i]
            if(id==st.getID()){
                return true
            }
            else
                return false
        }
    }
    Ast.prototype.getStruct = function(id){
        for(var i=0; i<this.structs.length; i++){
            const st = this.structs[i]
            if(id==st.getID()){
                return st
            }
        }
    }
    Ast.prototype.existeFuncion = function(id){
        for(var i=0; i<this.funciones.length; i++){
            const fn = this.funciones[i]
            if(id==fn.getID()){
                return true
            }
            else
                return false
        }
    }
    Ast.prototype.getFuncion = function(id){
        for(var i=0; i<this.funciones.length; i++){
            const fn = this.funciones[i]
            if(id==fn.getID()){
                return fn
            }
        }
    }
    return Ast;
}());