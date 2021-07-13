function generateLetters(){
	var letters = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	var number = (Math.random()*15).toFixed(0);
	return letters[number];
}
	
export function ColorHex(){
	var coolor = "";
	for(var i=0;i<6;i++){
		coolor = coolor + generateLetters() ;
	}
	return "#" + coolor;
}