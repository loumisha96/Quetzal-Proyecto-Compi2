var struct = /** @class */ (function () {
    function struct(id, attrbs, linea, column, tipo) {
        
        this.id = id;
        this.attrbs = attrbs;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    struct.setAtributos = function(attrb){
        if(this.array==1){
           for(var i=0; i<this.id.length; i++){
               this.array[i] = this.attrb[i]
           } 
        }else{
            this.array == attrb
        }
    }
    struct.prototype.getAtributos=function(){
        return this.attrbs
    }
    struct.prototype.getID=function(){
        return this.id
    }
    struct.prototype.existeAttrb=function(id){
        if(this.array==1){
            for(var i=0; i<this.attrbs.length; i++){
                if(id==this.attrbs[i])
                    return true
                else
                    return false
            } 
         }else{
             if(this.attrbs==id)
                return true
            else
                return false
             
         }
    }
    struct.prototype.getAtributo = function(id){
        if(this.array==1){
            for(var i=0; i<this.attrbs.length; i++){
                if(id==this.attrbs[i])
                    return this.attrbs[i]
               
            } 
         }else{
             this.array == attrb
         }
    }
    struct.prototype.ejecutar = function(entorno, ast){
        this.attrbs.forEach(atr => {
            atr.ejecutar(entorno, ast)
        });
    }   
    return struct;
}());