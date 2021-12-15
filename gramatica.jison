/*definición léxica*/


%lex
%options case-insensitive
%s                                  comment
%%
"//".*                              /* skip comments */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
"*"         return 'asterisk';
"."         return 'point';
"("         return 'parIzq';
")"         return 'parDer';
"{"         return 'llaIzq';
"}"         return 'llaDer';
":"         return 'colon';
"!="        return 'diferent';
"!"			return 'not';
"#"			return 'numeral';
"?"			return 'interrogacion';
"||"        return 'or';
"["         return 'corcheteIzq';
"]"         return 'corcheteDer';
";"         return 'ptcoma';
"++"		return 'increment';
"+"         return 'add';
","         return 'comma';
"--"		return 'decrement';
"-"         return 'minus';
"=="		return 'equalEqual';
"="         return 'equal';
"<="        return 'menorIgual';
"<"         return 'menor';
">="        return 'mayorIgual';
">"         return 'mayor';
"&&"        return 'and';
"&"			return 'concat';
"/"         return 'div';
"%"         return 'mod';
"main"		return 'main';
"begin"		return 'begin';
"end"       return 'end';
"in"		return 'in';
"pow"		return 'pow';
"sqrt"		return 'sqrt';
"sin"		return 'sin';
"cos"		return 'cos';
"tan"		return 'tan';
"pop"		return 'pop';
"push"		return 'push';
"void"		return 'void';
"int"		return 'int';
"double"    return 'double';
"boolean"	return 'boolean';
"char"		return 'char';
"String"	return 'String';
"struct"	return 'struct';
"break"		return 'break';
"return"	return 'return';
"if"		return 'if';
"null"		return 'null';
"else"		return 'else';
"switch"	return 'switch';
"case"		return 'case';
"while"		return 'while';
"do"		return 'do';
"for"		return 'for';
"^"			return 'pot';
"print"		return 'print';
"println"   return 'println';
"caracterOfPosition" return 'caracterOfPosition';
"continue"	return 'continue';
"subString" return 'subString';
"length"	return 'length';
"toUppercase" return 'toUppercase';
"toLowercase" return 'toLowercase';


/*Espacios en blanco*/
[ \r\t]+     {}       
\n           {}    
[0-9]+                      return  'digits';
[0-9]+("."[0-9]+)?  return  'decimal';
(\"({EscapeQuot}|[^"])*\")|("'""({EscapeApos}|[^'])*""'") return 'cadena';
[A-Za-z_][A-Za-z_0-9]*	    return 'id';


<<EOF>>                 return 'EOF';
.       {
        console.error('Error');
}
/lex


/* Asociación de operadores y precedencia */
%left 'add', 'minus' /*binary*/
%left  'div', 'asterisk'
%left 'pot', 'mod'



%left 'or'
%left 'and'
%left 'equalEqual', 'diferent'
%left 'mayor', 'menor', 'mayorIgual', 'menorIgual'



%left 'increment', 'decrement', 'menosU', 'not'
%left 'corcheteIzq'
%left 'parIzq', 'parDer', 'corcheteIzq', 'corcheteDer', 'llaIzq', 'llaDer'



<
%start ini 
%% /*definicion de gramática*/
ini
        :MAIN EOF																{$$= new Array(); $$.push($1); return $$}
		|MAIN GLOBALES EOF														{$$ = new Array(); $$.push($1); $$.push($2); return $$}
		|GLOBALES MAIN EOF					  								    {$$ = new Array(); $$.push($1); $$.push($2); return $$}
		|GLOBALES MAIN GLOBALES EOF												{$$ = new Array(); $$.push($1); $$.push($2); $$.push($3); return $$}
		
;

GLOBALES
		:GLOBALES GLOBAL 														{$1.push($2); $$=$1}
		|GLOBAL																	 {$$=[$1]}
		
;
GLOBAL	
		:FUNCION																{$$ = $1}
		|DECLARACION 															{$$ = $1}
		|ASIGNACION																{$$ = $1}
		|STRUCT																	{$$ = $1}
		
;

DECLARACION
		:TIPO corcheteIzq corcheteDer id equal corcheteIzq VARIABLES corcheteDer{ $$ = new DeclaracionArray($1, $4, $7, this._$.first_line,this._$.first_column, tipoInstr.DeclaracionArray)}
		|id id equal id parIzq VARIABLES parDer									{ $$ = new DeclaracionStruct($1, $2, $4, $6, this._$.first_line,this._$.first_column, tipoInstr.Struct)}
		|TIPO id equal CALL														{ $$ = new DeclaracionCall($1, $2, $4, this._$.first_line,this._$.first_column, tipoInstr.DeclaracionCall)}
		|TIPO id equal E 														{ $$ = new DeclaracionExpr($1, $2, $4, this._$.first_line,this._$.first_column, tipoInstr.DeclaracionExpr)}
		|TIPO IDS 																{ $$ = new DeclaracionVarios($1, $2, this._$.first_line,this._$.first_column, tipoInstr.DeclaracionVarios )}
		|id id 																	{ $$ = new DeclaracionStruct2($1, $2, this._$.first_line,this._$.first_column, tipoInstr.DeclaracionStruct2)}
;

TIPO
		:int																	{$$ = Primitivo.int}
		|double																	{$$ = Primitivo.double}
		|boolean																{$$ = Primitivo.boolean}
		|char																	{$$ = Primitivo.char}
		|String																	{$$ = Primitivo.String}
;


ASIGNACION
		:id equal E 															{$$ = new AsignacionExpr($1, $3,this._$.first_line,this._$.first_column, tipoInstr.AsignacionExpr)}
		|id point id equal E 													{$$ = new asignacionAttrb($1, $3, $5, this._$.first_line,this._$.first_column, tipoInstr.AsignacionAttrb) }
		|id equal numeral id    												{$$ = new AsignacionCopiaArr($1, $4, this._$.first_line,this._$.first_column, tipoInstr.AsignacionCopiaArr)}
;

EXPRESIONES
		: EXPRESIONES comma E 													{$1.push($3); $$=$1}
		|E 																		 {$$=[$1]}
;



VARIABLES 
		:VARIABLES comma E														{$1.push($3); $$=$1}
		|E																		 {$$=[$1]}
;

VALOR 
		:cadena																	{$$ = new Literal($1, this._$.first_line,this._$.first_column, Valor.cadena)}
		|digits																	{$$ = new Literal(parseInt($1), this._$.first_line,this._$.first_column, Valor.digito)}
		|decimal																{$$ = new Literal($1, this._$.first_line,this._$.first_column, Valor.decimal)}
		|null																	{$$ = new Literal($1, this._$.first_line,this._$.first_column, Valor.null)}
;

IDS
		:IDS comma id															{$1.push($3); $$=$1}
		|id 																	 {$$=[$1]}
;

FUNCIONES
		:FUNCIONES FUNCION														{$1.push($2); $$=$1}
		|FUNCION																 {$$=[$1]}
;

FUNCION 
		:TIPO2 id parIzq PARAMETROS parDer llaIzq INSTRUCCIONES llaDer  		{$$ = new Funcion($1, $2, $4, $7, this._$.first_line,this._$.first_column, tipoInstr.Funcion)}
		|TIPO2 id parIzq parDer llaIzq INSTRUCCIONES llaDer             		{$$ = new Funcion($1, $2, [], $7, this._$.first_line,this._$.first_column, tipoInstr.Funcion)}
		|TIPO2 id parIzq PARAMETROS parDer llaIzq llaDer             			{$$ = new Funcion($1, $2, $4, [], this._$.first_line,this._$.first_column, tipoInstr.Funcion)}
		|TIPO2 id parIzq parDer llaIzq llaDer									{$$ = new Funcion($1, $2, [], [], this._$.first_line,this._$.first_column, tipoInstr.Funcion)}
;

PARAMETROS
		:PARAMETROS comma PARAMETRO    											{$1.push($3); $$=$1}
		|PARAMETRO																 {$$=[$1]}
;
PARAMETRO
		:TIPO id 																{ $$ = new parametro($1, $2, 0,this._$.first_line,this._$.first_column, tipoInstr.Parametro)}
		|TIPO corcheteIzq corcheteDer id 										{ $$ = new parametro($1, $4, 1,this._$.first_line,this._$.first_column, tipoInstr.Parametro)}
;

STRUCT		
		:struct id llaIzq ATRIBUTOS llaDer 										{$$ = new struct($2, $4, this._$.first_line,this._$.first_column,tipoInstr.Struct )}		
;

TIPO2
	:id																			{$$=$1}
	|TIPO																		{$$=$1}
	|void 																		{$$=tipoF.void}
;

ATRIBUTOS
		:ATRIBUTOS comma ATRIBUTO 	 											{$1.push($3); $$=$1}
		|ATRIBUTO																 {$$=[$1]}
;

ATRIBUTO
		:TIPO id  					 											{$$ = new Atributo($1, $2, 0, this._$.first_line,this._$.first_column, tipoInstr.Atributo)}
		|id id    									 							{$$ = new Atributo($1, $2, 0, this._$.first_line,this._$.first_column, tipoInstr.Atributo)}
		|TIPO corcheteIzq corcheteDer id 										{$$ = new Atributo($1, $4, 1, this._$.first_line,this._$.first_column, tipoInstr.Atributo)}
;

MAIN
		:TIPO2 main parIzq parDer llaIzq INSTRUCCIONES llaDer 					{$$ = new main($1, $6, this._$.first_line,this._$.first_column, tipoInstr.Main)}
		|TIPO2 main parIzq parDer llaIzq llaDer							 		{$$ = new main($1, [], this._$.first_line,this._$.first_column, tipoInstr.Main)}
		
;

INSTRUCCIONES
		:INSTRUCCIONES INSTRUCCION												{$1.push($2); $$=$1}
		|INSTRUCCION															 {$$=[$1]}
;

INSTRUCCION
		:GLOBAL       															{$$=$1}
		|CALL																	{$$=$1}
		|IF 																	{$$=$1}
		|FOR 																	{$$=$1}
		|PRINT																	{$$=$1}
		|WHILE 																	{$$=$1}
		|SWITCH 																{$$=$1}
		|DOWHILE																{$$=$1}
		|FOREACH																{$$=$1}
		|TERNARIO 																{$$=$1}
		|break																	{$$= new Break(this._$.first_line,this._$.first_column, tipoInstr.Break)}
		|return	E																{$$= new Return($2, this._$.first_line,this._$.first_column, tipoInstr.ReturnE)}
		|return		  															{$$= new Return(0, this._$.first_line,this._$.first_column, tipoInstr.Return)}
		|E																		{$$ = $1}
;

CALL
	:id parIzq parDer 															{$$= new call($1,[], this._$.first_line,this._$.first_column, tipoInstr.Call)}
	|id parIzq VARIABLES parDer 												{$$= new call($1,$3, this._$.first_line,this._$.first_column, tipoInstr.Call)}
;

TERNARIO
	: parIzq CONDICIONES parDer interrogacion INSTRUCCION colon INSTRUCCION  						{$$= new Ternario($2, $5, $7,this._$.first_line,this._$.first_column, tipoInstr.Ternario)}
;

IF 
		:if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer ELSES 		 {$$ = new if_($3, $6, $8, this._$.first_line,this._$.first_column, tipoInstr.If )}
		|if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer       		 {$$ = new if_($3, $6, [], this._$.first_line,this._$.first_column, tipoInstr.If )}
		|if parIzq CONDICIONES parDer llaIzq  llaDer ELSES						 {$$ = new if_($3, [], $7, this._$.first_line,this._$.first_column, tipoInstr.If )}
		|if parIzq CONDICIONES parDer llaIzq llaDer 							 {$$ = new if_($3, [], [], this._$.first_line,this._$.first_column, tipoInstr.If )}
        |if parIzq CONDICIONES parDer INSTRUCCION ELSES  						 {$$ = new if_($3, [$5], $6, this._$.first_line,this._$.first_column, tipoInstr.If )}
;

ELSES
		:ELSES ELSE    															{$1.push($2); $$=$1}
		|ELSE																	 {$$=[$1]}
;

ELSE 
		:else if parIzq CONDICIONES parDer llaIzq llaDer  					    {$$ = new elseif($4, [], this._$.first_line,this._$.first_column, tipoInstr.Elseif)}
		|else if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer  	    {$$ = new elseif($4, $7, this._$.first_line,this._$.first_column, tipoInstr.Elseif)}
		|else if parIzq CONDICIONES parDer INSTRUCCION 						    {$$ = new elseif($4, [$6], this._$.first_line,this._$.first_column, tipoInstr.Elseif)}
		|else llaIzq INSTRUCCIONES llaDer										{$$ = new else_($3, this._$.first_line,this._$.first_column, tipoInstr.Else)}							
		|else INSTRUCCION 											  		    {$$ = new else_([$2], this._$.first_line,this._$.first_column, tipoInstr.Else)}							
		|else llaIzq llaDer														{$$ = new else_([], this._$.first_line,this._$.first_column, tipoInstr.Else)}							
;

SWITCH
		:switch parIzq id parDer llaIzq CASES llaDer 							{$$ = new switch_($3, $6, this._$.first_line,this._$.first_column, tipoInstr.Switch)}
;

CASES
		:CASES CASE  															{$1.push($2); $$=$1}
		|CASE       															 {$$=[$1]}
;

CASE
		:case VALOR colon  INSTRUCCIONES break ptcoma  							{$$ = new case_($2,$4, 1, this._$.first_line,this._$.first_column, tipoInstr.Case)}
		|case VALOR colon  INSTRUCCIONES 										{$$ = new case_($2,$4, 0, this._$.first_line,this._$.first_column, tipoInstr.Case)}
		|case VALOR colon break ptcoma 											{$$ = new case_($2,[], 0, this._$.first_line,this._$.first_column, tipoInstr.Case)}
;

WHILE
		:while parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer 			{$$ = new while_($3, $6, this._$.first_line,this._$.first_column, tipoInstr.While)}
		|while parIzq CONDICIONES parDer llaIzq llaDer							{$$ = new while_($3, [], this._$.first_line,this._$.first_column, tipoInstr.While)}
;

DOWHILE
		:do llaIzq INSTRUCCIONES llaDer while parIzq CONDICIONES parDer	{$$ = new dowhile($3,$7,this._$.first_line,this._$.first_column, tipoInstr.DoWhile )}
		|do llaIzq llaDer while parIzq CONDICIONES parDer 				{$$ = new dowhile([],$7,this._$.first_line,this._$.first_column, tipoInstr.DoWhile )}
		
;

FOR 
	:for parIzq FORVAR ptcoma FORVAR1 ptcoma FORVAR2 parDer llaIzq INSTRUCCIONES llaDer{$$ = new for_($3, [$5],$7, $10, this._$.first_line,this._$.first_column, tipoInstr.For)}
	|for parIzq FORVAR ptcoma FORVAR1 ptcoma FORVAR2 parDer llaIzq llaDer   		   {$$ = new for_($3, $5,$7, [], this._$.first_line,this._$.first_column, tipoInstr.For)}
;

FORVAR
	:id equal E																	{$$ = new AsignacionExpr($1, $3,this._$.first_line,this._$.first_column, tipoInstr.AsignacionExpr)}
	|TIPO id equal E    														{ $$ = new DeclaracionExpr($1, $2, $4, this._$.first_line,this._$.first_column, tipoInstr.DeclaracionExpr)}
;

FORVAR1
		:E menor E   															{$$ = new relacional($1,operador.menor, $3, this._$.first_line,this._$.first_column)}
		|E mayor E   															{$$ = new relacional($1,operador.mayor, $3, this._$.first_line,this._$.first_column)}
		|E menorIgual E 														{$$ = new relacional($1,operador.menorIgual, $3, this._$.first_line,this._$.first_column)}
		|E mayorIgual E 														{$$ = new relacional($1,operador.mayorIgual, $3, this._$.first_line,this._$.first_column)}
		|E equal E  															{$$ = new relacional($1,operador.equal, $3, this._$.first_line,this._$.first_column)}
;

FORVAR2
		:id increment  															{$$= new unario($1, operador.increment, this._$.first_line,this._$.first_column)}
		|id decrement 														    {$$= new unario($1, operador.decrement, this._$.first_line,this._$.first_column)}
;

FOREACH
		:for id in FOREACH1 llaIzq INSTRUCCIONES llaDer 						{$$ = new foreach_($2, $4, $6,this._$.first_line,this._$.first_column)}
		|for id in FOREACH1  llaIzq llaDer 										{$$ = new foreach_($2, $4, [],this._$.first_line,this._$.first_column)}
;

FOREACH1
		:cadena                													{$$ = new Literal($1, this._$.first_line,this._$.first_column, Valor.cadena)}
		|id																		{$$ = new Literal($1, this._$.first_line,this._$.first_column, Valor.id)}
		|corcheteIzq VARIABLES corcheteDer										{$$=$2}
		|id corcheteIzq digits colon digits corcheteDer  						{$$ = new foreach1($1,$3, $5,this._$.first_line,this._$.first_column); }
		|id corcheteIzq begin colon end corcheteDer  						{$$ = new foreach1($1,$3, $5,this._$.first_line,this._$.first_column); }
;

E
		:E minus E																{$$ = new Aritmetica($1, operador.resta, $3, this._$.first_line,this._$.first_column);}
		|E asterisk E															{$$ = new Aritmetica($1, operador.multiplicacion, $3, this._$.first_line,this._$.first_column);}
		|E add E																{$$ = new Aritmetica($1, operador.suma, $3, this._$.first_line,this._$.first_column);}
		|E asterisk E															{$$ = new Aritmetica($1, operador.multiplicacion, $3, this._$.first_line,this._$.first_column);}
		|E pot E																{$$ = new Aritmetica($1, operador.potencia, $3, this._$.first_line,this._$.first_column);}
		|E div E																{$$ = new Aritmetica($1, operador.division, $3, this._$.first_line,this._$.first_column);}
		|E mod E																{$$ = new Aritmetica($1, operador.modulo, $3, this._$.first_line,this._$.first_column);}
		|parIzq E parDer														{$$=$2}
		|ARRAY																	{$$=$1}
		|pow parIzq E comma E parDer											{$$ = new Aritmetica($3, operador.potencia, $5, this._$.first_line,this._$.first_column); }
		|TRIGONOMETRICA parIzq E parDer											{$$ = new Trigonometrica($1,$3, this._$.first_line,this._$.first_column)}
		|VALOR																	{$$=$1}
		|numeral id											
		|NATIVA																	{$$=$1}
	//	|id point id	                                                        {console.log("expresion")}									
		|OperarARRAY									    					{$$=$1}
		|id increment 															{$$ = new unario($1, operador.increment,this._$.first_line,this._$.first_column)}
		|id decrement															{$$ = new unario($1, operador.decrement,this._$.first_line,this._$.first_column)}
		|E concat E 															{$$ = new concatenacion($1, $3, this._$.first_line,this._$.first_column); }
		|minus E            %prec menosU                                        {$$ = new Literal($2, this._$.first_line,this._$.first_column, Valor.negativo); }
		|E                                                                      {$$=$1}
;

NATIVA
	:E point caracterOfPosition parIzq E parDer   					 			{$$= new nativa($1, $5, null, this._$.first_line,this._$.first_column, Nativa.caracterOfPosition)}
	|E point subString parIzq E comma E parDer			  						{$$= new nativa($1, $5, $7, this._$.first_line,this._$.first_column, Nativa.subString)}
	|E point length parIzq parDer						 						{$$= new nativa($1,null, null, this._$.first_line,this._$.first_column, Nativa.length)}
	|E point toUppercase parIzq parDer					 						{$$= new nativa($1,null, null, this._$.first_line,this._$.first_column, Nativa.toUppercase)}
	|E point toLowercase parIzq parDer					 						{$$= new nativa($1,null, null, this._$.first_line,this._$.first_column, Nativa.toLowercase)}
	|E point pop parIzq  parDer						 							{$$= new nativa($1, null, $7, this._$.first_line,this._$.first_column, Nativa.pop)}
	|E point push parIzq E parDer						  						{$$= new nativa($1, $5, $7, this._$.first_line,this._$.first_column, Nativa.push)}
;



OperarARRAY
		:TRIGONOMETRICA numeral ARITMETICA parIzq ARRAY parDer					{$$ = new OperarArray1($1, $3, $5, this._$.first_line,this._$.first_column)}
		|id numeral ARITMETICA E 												{$$ = new OperarArray2($1, $3, $4, this._$.first_line,this._$.first_column )}
		
;


TRIGONOMETRICA
		:sin																	{$$=trigo.sin}
		|cos																	{$$ =trigo.cos}
		|tan																	{$$ = trigo.tan}
;
ARRAY 
	:corcheteIzq EXPRESIONES  corcheteDer										{$$= new arreglo($2, this._$.first_line,this._$.first_column)}
	|corcheteIzq corcheteDer													{$$= new arreglo([], this._$.first_line,this._$.first_column)}
	|id 																		{$$ = new Literal($1, this._$.first_line,this._$.first_column, Valor.id)}
;		
CONDICIONES
		:CONDICIONES LOGICA COND  											{$$ =[new logica($1,$2, $3, this._$.first_line,this._$.first_column)]}
		|COND																{$$=[$1]}
;

COND 
	:CONDICION															   {$$=$1}	
	|parIzq CONDICION parDer												{$$=$2}	
;

CONDICION
		:E equalEqual E 													{$$ = new relacional($1, operador.equalEqual, $3, this._$.first_line,this._$.first_column) }
		|E diferent E														{$$ = new relacional($1, operador.diferente, $3, this._$.first_line,this._$.first_column)}
		|E menor E 															{$$ = new relacional($1, operador.menor, $3, this._$.first_line,this._$.first_column) }
		|E mayor E  														{$$ = new relacional($1, operador.mayor, $3, this._$.first_line,this._$.first_column) }
		|E mayorIgual E  													{$$ = new relacional($1, operador.mayorIgual, $3, this._$.first_line,this._$.first_column) }
		|E menorIgual E  													{$$ = new relacional($1, operador.menorIgual, $3, this._$.first_line,this._$.first_column) }
		|not E 					 											{$$ = new relacional($2, operador.not, null, this._$.first_line,this._$.first_column) }
	
;
LOGICA
		:and																{$$=logica.and}
		|or																	{$$=logica.or}
		|not																{$$=logica.not}
;

PRINT
		:print parIzq E parDer												{$$ = new Print($3,0,null,this._$.first_line,this._$.first_column) }
		|print parIzq E comma E parDer										{$$ = new Print($3,0, $5, this._$.first_line,this._$.first_column) }
		|println parIzq E parDer											{$$ = new Print($3,1,null, this._$.first_line,this._$.first_column) }
		|println parIzq E comma E parDer									{$$ = new Print($3,1,$5, this._$.first_line,this._$.first_column) }

;

