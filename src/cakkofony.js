/* ======================================================
* CakkofonyJS by FrenchYeti @ 2016
* ---
* v.0.1
*
* Non-Alphanumeric JavaScript encoder for fun
* 
* Warning : there is known performance issues and crashes with big programs 
* (too much recursive during execution)
============================================================ */

'use strict';

var CakkofonyJS = function($in){

    let $2 = "(!!{}|''^!{});_=((!!{}|''^!{})<<(!!{}^''));";
    let $return = "(!!{}+'')[!!{}|'']+(!{}+'')[_<<((!![]))]+(!!{}+'')[~~[]]+({}['']+'')[~~{}]+(!!{}+'')[!!{}|'']+({}['']+'')[!![]|'']";
    let $conc="(~~{}+{})[(_<<(_+~~{}))-_]+(~~{}+{})[_]+(''[~~[]]+'')[!!{}|'#']+(~~{}+{})[(_+!!{}^'<')*_]+(![]+'')[!!{}|'']+(!![]+'')[!!{}&'>']";
    let $cons="(~~{}+{})[(_+!!{}^'<')*_]+(~~{}+{})[_]+(''[~~[]]+'')[!!{}|''&'']+(![]+'')[_+(!!{}|''^!{})]+(!![]+'')[!!{}&'']+(!![]+'')[!!{}|''&'']+(!![]+'')[_]+(~~{}+{})[(_+!!{}^'^')*_]+(!![]+'')[!!{}&'!']+(~~{}+{})[_]+(!![]+'')[!!{}|''&'']";
    let program = "", c0=0 ;
    
    let sym=[
        ["(~~{})"], // 0
        ["(!!{}|'')"], // 1
        ["((!!{}|''^!{})<<(!!{}^''))","($1<<$1)"], // 2
        ["($2+$1)","(($2<<$1)-$1)"], //3
        ["($2<<$1)","($2+$2)"], // 4
        ["(($2<<$1)+$1)"], // 5
        ["(($2<<$2)-$2)"], // 6
        ["($6+($3%$2))"], // 7
        ["($2<<$2)"], // 8
        ["($8+$1)"] // 9
    ];
        
    let symRe = /\$([0-9])/g;

    let makeSym = function(pattern){
        let matches = symRe.exec(pattern);

        return (matches!=null)? makeSym(pattern.replace(matches[0],sym[matches[1]|0][0])) : pattern ;		
    };
    
    program="[]["+$conc+"]["+$cons+"]("+$return+'+" \\""+';

    for(let i=0; i<$in.length ; i++){
        c0=parseInt($in.charCodeAt(i),10).toString(8);

        if(i>0)
            program+="+"
            
        program+='"\\\\"';
        
        if(c0.length<3)
            c0="0"+c0;
        
        for(let j=0; j<c0.length; j++){
            program+="+"+makeSym(sym[c0[j]|0][0]);
        }
    }
    
    return $2+'__='+program+'+\"\\"")();[]['+$conc+']['+$cons+'](__)();';    
}
