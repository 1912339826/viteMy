/**
 * @overview JS=>JQ $.param
 */
var nextStr = '';
function changeDataType(obj){
 let str = ''
 if(typeof obj == 'object'){
  for(let i in obj){
   if(typeof obj[i] != 'function' && typeof obj[i] != 'object'){
    str += i + '=' + obj[i] + '&' ;
   }else if (typeof obj[i] == 'object'){
    nextStr = '';
    str += changeSonType(i, obj[i])
   }
  }
 }
 return str.replace(/&$/g, '');
}
function changeSonType(objName, objValue){
 if(typeof objValue == 'object'){
  for(let i in objValue){
   if(typeof objValue[i] != 'object'){
    let value = objName + '[' + i + ']=' + objValue[i];
    nextStr += encodeURI(value) + '&';
   }else{
    changeSonType(objName + '[' + i + ']', objValue[i]);
   }
  }
 }
 return nextStr; 
}

export default changeDataType