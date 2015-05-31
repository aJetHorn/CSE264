/*
 * TJ O'Hearn CSE 264
 * Homwork 6
 * Due 3/25/15
 * 
 * Program iterates through HTML structure and prints nested HTML tags as well
 * as SRC, TYPE, and TEXT
 */

var appendText = "<ul><li>HTML<ul>";

$(document).ready(function() {
   var element = $('html');
   //difference between objects required splitting head and body
   var element1 = element.children().get(0); //head
   var element2 = element.children().get(1); //body

    traverseChildren(element1);
    traverseChildren(element2);
    
    console.log(appendText);
    $('body').append(appendText + "</li></ul></ul>");
});

    //traverses through children and appends to the string
    function traverseChildren(elem){
        console.log(elem);
        appendText += "<li>" + elem.tagName; 
        if (elem.type !== undefined && elem.type !== ""){
            appendText += " (type) " + elem.type;
        }
        if (elem.src !== undefined && elem.type !== ""){
            appendText += " (src) " + elem.src;
        }
        appendText += "<ul>";
        for (var i = 0; i < elem.children.length; i++){
            var child = elem.children[i];
            traverseChildren(child);
            if (!hasChildren(child)){
                if (child.innerText !== "" && child.innerText !== undefined){
                    appendText += "(text) " + child.innerText;
                }
            }
        }
        appendText += "</ul></li>";
    }
    
    function hasChildren(elem){
        if (elem === undefined || elem.children === undefined || elem.children.length === 0){
            return false;
        }
        return true;
    }