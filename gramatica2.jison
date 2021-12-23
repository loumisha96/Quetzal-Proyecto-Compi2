/*definición léxica*/


%lex
%options case-sensitive
%s                                  comment
%%
"//".*                              /* skip comments */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
"*"         return 'asterisk';
"double.parse"	return 'doubleParse';
"int.parse"	return 'intParse';
"boolean.parse"	return 'booleanParse';
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
//"string"	return 'string';
"parse" 	return 'parse';

"toInt" 	return 'toInt';
"toDouble" 	return 'toDouble';
"typeof" 	return 'typeof';
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
[0-9]+("."[0-9]+)?\b  return  'decimal'; 
[0-9]+\b                     return  'digits';

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
	:S EOF { return $1}
;

S
        :MAIN 																{$$= new nodo("S",[$1]); p.getGramatica("S",1)}
		|MAIN GLOBALES 														{$$ = new nodo("S", [$1,$2]); p.getGramatica("S",2)}
		|GLOBALES MAIN 					  								    {$$ = new nodo("S", [$1,$2]); p.getGramatica("S",3)}
		|GLOBALES MAIN GLOBALES 											{$$ = new nodo("S", [$1,$2,$3]); p.getGramatica("S",4)}
		|PANICO
;
PANICO	
		:error                                                			//	{Errores.push(new nodoError("Error Sintáctico", "No se esperaba "+$1, "",this._$.first_line,this._$.first_column, ) );}
;

GLOBALES
		:GLOBALES GLOBAL 													{$$ = new nodo("GLOBALES", [$1,$2]); p.getGramatica("GLOBALES",1)}
		|GLOBAL																{$$ = new nodo("GLOBALES", [$1]); p.getGramatica("GLOBALES",2)}
		
;
GLOBAL	
		:FUNCION																{$$ = new nodo("GLOBAL", [$1]); p.getGramatica("GLOBAL",1)}
		|DECLARACION ptcoma														{$$ = new nodo("GLOBAL", [$1,$2]); p.getGramatica("GLOBAL",2)}
		|ASIGNACION	ptcoma													{$$ = new nodo("GLOBAL", [$1,$2]); p.getGramatica("GLOBAL",3)}
		//|STRUCT																	{$$ = new nodo("GLOBAL", [$1]); p.getGramatica("GLOBAL",4)}
		
;

DECLARACION
		:TIPO corcheteIzq corcheteDer id equal corcheteIzq VARIABLES corcheteDer{$$ = new nodo("DECLARACION", [$1,$2,$3,$4,$5,$6,$7,$8]); p.getGramatica("DECLARACION",1)}
		|id id equal id parIzq VARIABLES parDer									{$$ = new nodo("DECLARACION", [$1,$2,$3,$4,$5,$6,$7]); p.getGramatica("DECLARACION",2)}
		|TIPO  DEC CALL															{$$ = new nodo("DECLARACION", [$1,$2[0],$2[1],$3]); p.getGramatica("DECLARACION",3)}
		|TIPO DEC E 															{$$ = new nodo("DECLARACION", [$1,$2[0],$2[1],$3]); p.getGramatica("DECLARACION",4)}
		|TIPO IDS 																{$$ = new nodo("DECLARACION", [$1,$2]); p.getGramatica("DECLARACION",5)}
		|id id 																	{$$ = new nodo("DECLARACION", [$1,$2]); p.getGramatica("DECLARACION",6)}
;

DEC
	:id equal																	{$$=[$1,$2]; p.getGramatica()}
;

TIPO
		:int																	{$$ = new nodo("TIPO", [$1],$1); p.getGramatica("TIPO",1)}
		|double																	{$$ = new nodo("TIPO", [$1]),$1; p.getGramatica("TIPO",2)}
		|boolean																{$$ = new nodo("TIPO", [$1]),$1; p.getGramatica("TIPO",3)}
		|char																	{$$ = new nodo("TIPO", [$1]),$1; p.getGramatica("TIPO",4)}
		|String																	{$$ = new nodo("TIPO", [$1]),$1; p.getGramatica("TIPO",5)}
		|void																	{$$ = new nodo("TIPO", [$1]),$1; p.getGramatica("TIPO",6)}
;


ASIGNACION
		:id equal E 															{$$ = new nodo("ASIGNACION", [$1,$2,$3]); p.getGramatica("ASIGNACION",1)}
		|id point id equal E 													{$$ = new nodo("ASIGNACION", [$1,$2,$3,$4,$5]); p.getGramatica("ASIGNACION",2)}
		|id equal numeral id    												{$$ = new nodo("ASIGNACION", [$1,$2,$3,$4]); p.getGramatica("ASIGNACION",3)}
;

EXPRESIONES
		: EXPRESIONES comma E 													{$$ = new nodo("EXPRESIONES", [$1,$2,$3]); p.getGramatica("EXPRESIONES",1)}
		|E 																		 {$$ = new nodo("EXPRESIONES", [$1]); p.getGramatica("EXPRESIONES",2)}
;



VARIABLES 
		:VARIABLES comma E														{$$ = new nodo("VARIABLES", [$1,$2,$3]); p.getGramatica("VARIABLES",1)}
		|E																		{$$ = new nodo("VARIABLES", [$1]); p.getGramatica("VARIABLES",2)}
;

VALOR 
		:cadena																	{$$ = new nodo("VALOR", [$1]),$1; p.getGramatica("VALOR",1)}
		|digits																	{$$ = new nodo("VALOR", [$1]),$1; p.getGramatica("VALOR",2)}
		|decimal																{$$ = new nodo("VALOR", [$1]),$1; p.getGramatica("VALOR",3)}
		|null																	{$$ = new nodo("VALOR", [$1]),$1; p.getGramatica("VALOR",4)}
;

IDS
		:IDS comma id															{$$ = new nodo("IDS", [$1,$2,$3]); p.getGramatica("IDS",1)}
		|id 																	{$$ = new nodo("IDS", [$1],$1); p.getGramatica("IDS",2)}
;

FUNCION 
		:TIPO FUNC PARAMETROS parDer llaIzq INSTRUCCIONES llaDer  		{$$ = new nodo("FUNCION", [$1,$2[0],$2[1],$3,$4,$5,$6,$7]); p.getGramatica("FUNCION",1)}
		|TIPO FUNC parDer llaIzq INSTRUCCIONES llaDer             		{$$ = new nodo("FUNCION", [$1,$2[0],$2[1],$3,$4,$5,$6]); p.getGramatica("FUNCION",2)}
		|TIPO FUNC PARAMETROS parDer llaIzq llaDer             			{$$ = new nodo("FUNCION", [$1,$2[0],$2[1],$3,$4,$5,$6]); p.getGramatica("FUNCION",3)}
		|TIPO FUNC parDer llaIzq llaDer							    	{$$ = new nodo("FUNCION", [$1,$2[0],$2[1],$3,$4,$5]); p.getGramatica("FUNCION",4)}
;

FUNC
	:id parIzq																{$$=[$1,$2]; p.getGramatica("FUNC",1)}
;

PARAMETROS
		:PARAMETROS comma PARAMETRO    											{$$ = new nodo("PARAMETROS", [$1,$2,$3]); p.getGramatica("PARAMETROS",1)}
		|PARAMETRO																{$$ = new nodo("PARAMETROS", [$1]); p.getGramatica("PARAMETROS",2)}
;
PARAMETRO
		:TIPO id 																{$$ = new nodo("PARAMETRO", [$1,$2]); p.getGramatica("PARAMETRO",1)}
		|TIPO corcheteIzq corcheteDer id 										{$$ = new nodo("PARAMETRO", [$1,$2,$3,$4]); p.getGramatica("PARAMETRO",2)}
;

STRUCT		
		:struct id llaIzq ATRIBUTOS llaDer 										{$$ = new nodo("STRUCT", [$1,$2,$3,$4,$5]); p.getGramatica("STRUCT",1)}
;

ATRIBUTOS
		:ATRIBUTOS comma ATRIBUTO 	 											{$$ = new nodo("ATRIBUTOS", [$1,$2,$3]); p.getGramatica("ATRIBUTOS",1)}
		|ATRIBUTO																{$$ = new nodo("ATRIBUTOS", [$1]); p.getGramatica("ATRIBUTOS",2)}
;

ATRIBUTO
		:TIPO id  					 											{$$ = new nodo("ATRIBUTO", [$1,$2]); p.getGramatica("ATRIBUTO",1)}
		|id id    									 							{$$ = new nodo("ATRIBUTO", [$1,$2]); p.getGramatica("ATRIBUTO",2)}
		|TIPO corcheteIzq corcheteDer id 										{$$ = new nodo("ATRIBUTO", [$1,$2,$3,$4]); p.getGramatica("ATRIBUTO",3)}
;

MAIN
		:TIPO main parIzq parDer llaIzq INSTRUCCIONES llaDer 					{$$ = new nodo("MAIN", [$1,$2,$3,$4,$5,$6,$7]); p.getGramatica("MAIN",1)}
		|TIPO main parIzq parDer llaIzq llaDer							 		{$$ = new nodo("MAIN", [$1,$2,$3,$4,$5,$6]); p.getGramatica("MAIN",2)}
		
;

INSTRUCCIONES
		:INSTRUCCIONES INSTRUCCION												{$$ = new nodo("INSTRUCCIONES", [$1,$2]); p.getGramatica("INSTRUCCIONES",1)}
		|INSTRUCCION															{$$ = new nodo("INSTRUCCIONES", [$1]); p.getGramatica("INSTRUCCIONES",2)}
;

INSTRUCCION
		:GLOBAL       															{$$ = new nodo("INSTRUCCION", [$1]); p.getGramatica("INSTRUCCION",1)}
		|CALL ptcoma																{$$ = new nodo("INSTRUCCION", [$1,$2]); p.getGramatica("INSTRUCCION",2)}
		|IF 																	{$$ = new nodo("INSTRUCCION", [$1]); p.getGramatica("INSTRUCCION",3)}
		|FOR 																	{$$ = new nodo("INSTRUCCION", [$1]); p.getGramatica("INSTRUCCION",4)}
		|PRINT	ptcoma																{$$ = new nodo("INSTRUCCION", [$1,$2]); p.getGramatica("INSTRUCCION",5)}
		|WHILE 																	{$$ = new nodo("INSTRUCCION", [$1]); p.getGramatica("INSTRUCCION",6)}
		|SWITCH 																{$$ = new nodo("INSTRUCCION", [$1]); p.getGramatica("INSTRUCCION",7)}
		|DOWHILE ptcoma															{$$ = new nodo("INSTRUCCION", [$1,$2]); p.getGramatica("INSTRUCCION",8)}
		|FOREACH																{$$ = new nodo("INSTRUCCION", [$1]); p.getGramatica("INSTRUCCION",9)}
		|TERNARIO ptcoma																{$$ = new nodo("INSTRUCCION", [$1,$2]); p.getGramatica("INSTRUCCION",10)}
		|break	ptcoma																{$$ = new nodo("INSTRUCCION", [$1]); p.getGramatica("INSTRUCCION",11)}
		|return	E	ptcoma															{$$ = new nodo("INSTRUCCION", [$1,$2]); p.getGramatica("INSTRUCCION",12)}
		|return	ptcoma	  															{$$ = new nodo("INSTRUCCION", [$1]); p.getGramatica("INSTRUCCION",13)}
		|E																		{$$ = new nodo("INSTRUCCION", [$1]); p.getGramatica("INSTRUCCION",14)}
		|return CALL ptcoma                                                    {$$ = new nodo("INSTRUCCION", [$1,$2, $3]); p.getGramatica("INSTRUCCION",14)}
;

CALL
	:id parIzq parDer 														    {$$ = new nodo("CALL", [$1,$2,$3]); p.getGramatica("CALL",1)}
	|id parIzq VARIABLES parDer 												{$$ = new nodo("CALL", [$1,$2,$3,$4]); p.getGramatica("CALL",2)}
;

TERNARIO
	: CONDICIONES interrogacion INSTRUCCION colon INSTRUCCION  	{$$ = new nodo("TERNARIO", [$1,$2,$3,$4,$5]); p.getGramatica("TERNARIO",1)}
;

IF 
		:if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer ELSES 		{$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6,$7,$8]); p.getGramatica("IF",1)}
		|if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer       		 {$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6,$7]); p.getGramatica("IF",2)}
		|if parIzq CONDICIONES parDer llaIzq  llaDer ELSES						 {$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6,$7]); p.getGramatica("IF",3)}
		|if parIzq CONDICIONES parDer llaIzq llaDer 							 {$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6]); p.getGramatica("IF",4)}
        |if parIzq CONDICIONES parDer INSTRUCCION ELSES  						{$$ = new nodo("IF", [$1,$2,$3,$4,$5,$6]); p.getGramatica("IF",5)}
;

ELSES
		:ELSES ELSE    															{$$ = new nodo("ELSES", [$1,$2]); p.getGramatica("ELSES",1)}
		|ELSE																	 {$$ = new nodo("ELSES", [$1]); p.getGramatica("ELSES",2)}
;

ELSE 
		:else if parIzq CONDICIONES parDer llaIzq llaDer  					    {$$ = new nodo("ELSE", [$1,$2,$3,$4,$5,$6,$7]); p.getGramatica("ELSE",1)}
		|else if parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer  	    {$$ = new nodo("ELSE", [$1,$2,$3,$4,$5,$6,$7,$8]); p.getGramatica("ELSE",2)}
		|else if parIzq CONDICIONES parDer INSTRUCCION 						    {$$ = new nodo("ELSE", [$1,$2,$3,$4,$5,$6]); p.getGramatica("ELSE",3)}
		|else llaIzq INSTRUCCIONES llaDer										{$$ = new nodo("ELSE", [$1,$2,$3,$4]); p.getGramatica("ELSE",4)}
		|else INSTRUCCION 											  		    {$$ = new nodo("ELSE", [$1,$2]); p.getGramatica("ELSE",5)}
		|else llaIzq llaDer														{$$ = new nodo("ELSE", [$1,$2,$3]); p.getGramatica("ELSE",6)}
;

SWITCH
		:switch parIzq id parDer llaIzq CASES llaDer 							{$$ = new nodo("SWITCH", [$1,$2,$3,$4,$5,$6,$7]); p.getGramatica("SWITCH",1)}
;

CASES
		:CASES CASE  															{$$ = new nodo("CASES", [$1,$2]); p.getGramatica("CASES",1)}
		|CASE       															 {$$ = new nodo("CASES", [$1]); p.getGramatica("CASES",2)}
;

CASE
		:case VALOR colon  INSTRUCCIONES break ptcoma  							{$$ = new nodo("CASE", [$1,$2,$3,$4,$5,$6]); p.getGramatica("CASE",1)}
		|case VALOR colon  INSTRUCCIONES 										{$$ = new nodo("CASE", [$1,$2,$3,$4]); p.getGramatica("CASE",2)}
		|case VALOR colon break ptcoma 											{$$ = new nodo("CASE", [$1,$2,$3,$4,$5]); p.getGramatica("CASE",3)}
		|default colon INSTRUCCIONES break ptcoma	                            {$$ = new nodo("CASE", [$1,$2,$3,$4,$5]);}

;
WHILE
		:while parIzq CONDICIONES parDer llaIzq INSTRUCCIONES llaDer 			{$$ = new nodo("WHILE", [$1,$2,$3,$4,$5,$6,$7]); p.getGramatica("WHILE",1)}
		|while parIzq CONDICIONES parDer llaIzq llaDer							{$$ = new nodo("WHILE", [$1,$2,$3,$4,$5,$6]); p.getGramatica("WHILE",2)}
;

DOWHILE
		:do llaIzq INSTRUCCIONES llaDer while parIzq CONDICIONES parDer	    {$$ = new nodo("DOWHILE", [$1,$2,$3,$4,$5,$6,$7,$8]); p.getGramatica("DOWHILE",1)}
		|do llaIzq llaDer while parIzq CONDICIONES parDer 				    {$$ = new nodo("DOWHILE", [$1,$2,$3,$4,$5,$6,$7]); p.getGramatica("DOWHILE",2)}
		
;

FOR 
	:for parIzq FORVAR ptcoma FORVAR1 ptcoma FORVAR2 parDer llaIzq INSTRUCCIONES llaDer{$$ = new nodo("FOR", [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11]); p.getGramatica("FOR",1)}
	|for parIzq FORVAR ptcoma FORVAR1 ptcoma FORVAR2 parDer llaIzq llaDer   		   {$$ = new nodo("FOR", [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10]); p.getGramatica("FOR",2)}
;

FORVAR
	:id equal E																	{$$ = new nodo("FORVAR", [$1,$2,$3]); p.getGramatica("FORVAR",1)}
	|TIPO id equal E    													    {$$ = new nodo("FORVAR", [$1,$2,$3,$4]); p.getGramatica("FORVAR",2)}
;

FORVAR1
		:E menor E   															{$$ = new nodo("FORVAR1", [$1,$2,$3]); p.getGramatica("FORVAR1",1)}
		|E mayor E   															{$$ = new nodo("FORVAR1", [$1,$2,$3]); p.getGramatica("FORVAR1",2)}
		|E menorIgual E 														{$$ = new nodo("FORVAR1", [$1,$2,$3]); p.getGramatica("FORVAR1",3)}
		|E mayorIgual E 														{$$ = new nodo("FORVAR1", [$1,$2,$3]); p.getGramatica("FORVAR1",4)}
		|E equal E  															{$$ = new nodo("FORVAR1", [$1,$2,$3]); p.getGramatica("FORVAR1",5)}
		|E                                                                       {$$ = new nodo("FORVAR1", [$1]); p.getGramatica("FORVAR1",5)}
;

FORVAR2
		:id increment  															{$$ = new nodo("FORVAR2", [$1,$2]); p.getGramatica("FORVAR2",1)}
		|id decrement 														    {$$ = new nodo("FORVAR2", [$1,$2]); p.getGramatica("FORVAR2",2)}
;

FOREACH
		:for id in FOREACH1 llaIzq INSTRUCCIONES llaDer 						{$$ = new nodo("FOREACH", [$1,$2,$3,$4,$5,$6,$7]); p.getGramatica("FOREACH",1)}
		|for id in FOREACH1  llaIzq llaDer 										{$$ = new nodo("FOREACH", [$1,$2,$3,$4,$5,$6]); p.getGramatica("FOREACH",2)}
;

FOREACH1
		:cadena                													{$$ = new nodo("FOREACH1", [$1]); p.getGramatica("FOREACH1",1)}
		|id																		{$$ = new nodo("FOREACH1", [$1]); p.getGramatica("FOREACH1",2)}
		|corcheteIzq VARIABLES corcheteDer										{$$ = new nodo("FOREACH1", [$1,$2,$3]); p.getGramatica("FOREACH1",3)}
		|id corcheteIzq digits colon digits corcheteDer  						{$$ = new nodo("FOREACH1", [$1,$2,$3,$4,$5,$6]); p.getGramatica("FOREACH1",4)}
		|id corcheteIzq begin colon end corcheteDer  						    {$$ = new nodo("FOREACH1", [$1,$2,$3,$4,$5,$6]); p.getGramatica("FOREACH1",5)}
;

E
		:E minus E																{$$ = new nodo("E", [$1,$2,$3]); p.getGramatica("E",1)}
		|E asterisk E															{$$ = new nodo("E", [$1,$2,$3]); p.getGramatica("E",2)}
		|E add E																{$$ = new nodo("E", [$1,$2,$3]); p.getGramatica("E",3)}
		|E asterisk E															{$$ = new nodo("E", [$1,$2,$3]); p.getGramatica("E",4)}
		|E pot E																{$$ = new nodo("E", [$1,$2,$3]); p.getGramatica("E",5)}
		|E div E																{$$ = new nodo("E", [$1,$2,$3]); p.getGramatica("E",6)}
		|E mod E																{$$ = new nodo("E", [$1,$2,$3]); p.getGramatica("E",7)}
		|parIzq E parDer														{$$ = new nodo("E", [$1,$2,$3]); p.getGramatica("E",8)}
		|ARRAY																	{$$ = new nodo("E", [$1]); p.getGramatica("E",9)}
		|pow parIzq E comma E parDer											{$$ = new nodo("E", [$1,$2,$3,$4,$5,$6]); p.getGramatica("E",10)}
		|TRIGONOMETRICA parIzq E parDer											{$$ = new nodo("E", [$1,$2,$3,$4]); p.getGramatica("E",11)}
		|VALOR																	{$$ = new nodo("E", [$1]); p.getGramatica("E",12)}
		|numeral id											                    {$$ = new nodo("E", [$1,$2]); p.getGramatica("E",13)}
		|NATIVA																	{$$ = new nodo("E", [$1]); p.getGramatica("E",14)}
	//	|id point id	                                                        {console.log("expresion"); p.getGramatica("E",15)}									
		|OperarARRAY									    					{$$ = new nodo("E", [$1]); p.getGramatica("E",16)}
		|id increment 															{$$ = new nodo("E", [$1,$2]); p.getGramatica("E",17)}
		|id decrement															{$$ = new nodo("E", [$1,$2]); p.getGramatica("E",18)}
		|E concat E 															{$$ = new nodo("E", [$1,$2,$3]); p.getGramatica("E",19)}
		|minus E            %prec menosU                                        {$$ = new nodo("E", [$1,$2]); p.getGramatica("E",20)}
		|E                                                                      {$$ = new nodo("E", [$1]); p.getGramatica("E",21)}
		|CALL																	{$$ = new nodo ("E", [$1]); p.getGramatica("E",22)}
		|sqrt parIzq E parDer													{$$=new nodo("E", [$1,$2,$3,$4]); p.getGramatica("E",23)}	
		|CONDICIONES 																{$$ = new nodo("E", [$1]); p.getGramatica("E",24)}
		|TERNARIO																{$$ = new nodo("E", [$1]); p.getGramatica("E",24)}
;

NATIVA
	:E point caracterOfPosition parIzq E parDer   					 			{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5,$6]); p.getGramatica("NATIVA",1)}
	|E point subString parIzq E comma E parDer			  						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5,$6,$7,$8]); p.getGramatica("NATIVA",2)}
	|E point length parIzq parDer						 						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5]); p.getGramatica("NATIVA",3)}
	|E point toUppercase parIzq parDer					 						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5]); p.getGramatica("NATIVA",4)}
	|E point toLowercase parIzq parDer					 						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5]); p.getGramatica("NATIVA",5)}
	|E point pop parIzq  parDer						 							{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5]); p.getGramatica("NATIVA",6)}
	|E point push parIzq E parDer						  						{$$ = new nodo("NATIVA", [$1,$2,$3,$4,$5,$6]); p.getGramatica("NATIVA",7)}
	|intParse parIzq E parDer											{$$ = new nodo("NATIVA", [$1,$2,$3,$4]); p.getGramatica("NATIVA",8)}
	|doubleParse parIzq E parDer										{$$ = new nodo("NATIVA", [$1,$2,$3,$4]); p.getGramatica("NATIVA",9)}
	|booleanParse parIzq E parDer										{$$ = new nodo("NATIVA", [$1,$2,$3,$4]); p.getGramatica("NATIVA",10)}
	|toInt parIzq E parDer														{$$ = new nodo("NATIVA", [$1,$2,$3,$4]); p.getGramatica("NATIVA",11)}
	|toDouble parIzq E parDer													{$$ = new nodo("NATIVA", [$1,$2,$3,$4]); p.getGramatica("NATIVA",12)}
	|string parIzq E parDer														{$$ = new nodo("NATIVA", [$1,$2,$3,$4]); p.getGramatica("NATIVA",13)}
	|typeof parIzq E parDer														{$$ = new nodo("NATIVA", [$1,$2,$3,$4]); p.getGramatica("NATIVA",14)}
;



OperarARRAY
		:TRIGONOMETRICA numeral ARITMETICA parIzq ARRAY parDer					{$$ = new nodo("OPERAR_ARRAY", [$1,$2,$3,$4,$5,$6]); p.getGramatica("OPERAR_ARRAY",1)}
		|id numeral ARITMETICA E 												{$$ = new nodo("OPERAR_ARRAY", [$1,$2,$3,$4]); p.getGramatica("OPERAR_ARRAY",2)}
		
;


TRIGONOMETRICA
		:sin																	{$$ = new nodo("TRIGONOMETRICA", [$1]); p.getGramatica("TRIGONOMETRICA",1)}
		|cos																	{$$ = new nodo("TRIGONOMETRICA", [$1]); p.getGramatica("TRIGONOMETRICA",2)}
		|tan																	{$$ = new nodo("TRIGONOMETRICA", [$1]); p.getGramatica("TRIGONOMETRICA",3)}
;
ARRAY 
	:corcheteIzq EXPRESIONES  corcheteDer										{$$ = new nodo("ARRAY", [$1,$2,$3]); p.getGramatica("ARRAY",1)}
	|corcheteIzq corcheteDer													{$$ = new nodo("ARRAY", [$1,$2]); p.getGramatica("ARRAY",2)}
	|id 																		{$$ = new nodo("ARRAY", [$1]); p.getGramatica("ARRAY",3)}
;		
CONDICIONES
		:CONDICIONES LOGICA COND  											{$$ = new nodo("CONDICIONES", [$1,$2,$3]); p.getGramatica("CONDICIONES",1)}
		|COND																{$$ = new nodo("CONDICIONES", [$1]); p.getGramatica("CONDICIONES",2)}
;

COND 
	:CONDICION															   {$$ = new nodo("COND", [$1]); p.getGramatica("COND",1)}
	|parIzq CONDICION parDer												{$$ = new nodo("COND", [$1,$2,$3]); p.getGramatica("COND",2)}
;

CONDICION
		:E equalEqual E 													{$$ = new nodo("CONDICION", [$1,$2,$3]); p.getGramatica("CONDICION",1)}
		|E diferent E														{$$ = new nodo("CONDICION", [$1,$2,$3]); p.getGramatica("CONDICION",2)}
		|E menor E 															{$$ = new nodo("CONDICION", [$1,$2,$3]); p.getGramatica("CONDICION",3)}
		|E mayor E  														{$$ = new nodo("CONDICION", [$1,$2,$3]); p.getGramatica("CONDICION",4)}
		|E mayorIgual E  													{$$ = new nodo("CONDICION", [$1,$2,$3]); p.getGramatica("CONDICION",5)}
		|E menorIgual E  													{$$ = new nodo("CONDICION", [$1,$2,$3]); p.getGramatica("CONDICION",6)}
		|not E 					 											{$$ = new nodo("CONDICION", [$1,$2]); p.getGramatica("CONDICION",7)}
	
;
LOGICA
		:and																{$$ = new nodo("LOGICA", [$1]); p.getGramatica("LOGICA",1)}
		|or																	{$$ = new nodo("LOGICA", [$1]); p.getGramatica("LOGICA",2)}
		|not																{$$ = new nodo("LOGICA", [$1]); p.getGramatica("LOGICA",3)}
;

PRINT
		:print parIzq E parDer												{$$ = new nodo("PRINT",  [$1,$2,$3,$4]); p.getGramatica("PRINT",1)}
		|print parIzq E comma E parDer										{$$ = new nodo("PRINT",  [$1,$2,$3,$4,$5,$6]); p.getGramatica("PRINT",2)}
		|println parIzq E parDer											{$$ = new nodo("PRINT",  [$1,$2,$3,$4]); p.getGramatica("PRINT",3)}
		|println parIzq E comma E parDer									{$$ = new nodo("PRINT",  [$1,$2,$3,$4,$5,$6]); p.getGramatica("PRINT",4)}
		|print parIzq CALL parDer										//	{$$ = new Print($3,0,null,this._$.first_line,this._$.first_column, tipoInstr.Print) }
		

;

