let req = ""
let query = ""
let results = ""
let resultstate = ""
let pw = "606Illinois!"  // put your database password here

customerSelect.onshow=function(){
   txtResults_contents.style.height = "100px"
}

btnCustomer.onclick=function(){
    query = "SELECT * FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=kas40488&pass=" + pw + "&database=kas40488&query=" + query)

if (req.status == 200){ 
        results = JSON.parse(req.responseText)
        console.log(results)
        
    if (results.length == 0){  
        lblMessage.textContent = "There are no customer in the database."
    }else {   
        console.log(`the parsed JSON is ${results}`)
        console.log(`the first row/item in the big array is a small array: ${results[0]}`)


        // Now output the names of all the dogs into the textArea control:
        let message = ""
        for (i = 0; i < results.length; i++)
            message = message + results[i][1] + "\n"
        txtResults.value = message
     } // end else

}else{  
        lblMessage.textContent = "Error code: " + req.status
}
}
customerSelect.onshow=function(){
   txtState_contents.style.height = "100px"
}

btnState.onclick=function(){
    let check = inptState.value
    query = "SELECT * FROM customer WHERE state =" + '"' + check + '"'
    // Below change from my netID to yours (twice: user and database)    
     req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=kas40488&pass=" + pw + "&database=kas40488&query=" + query)
if (req.status == 200){ 
        resultstate = JSON.parse(req.responseText)
        console.log(resultstate)
        
    if (resultstate.length == 0){  
        lblMessage.textContent = "There are no customer in the database."
      }else {   
        lblMessage.textContent= `The customer information is ${resultstate[0]}`


        // Now output the names of all the dogs into the textArea control:
        let message = ""
        for (i = 0; i < resultstate.length; i++)
            message = message + resultstate[i][1] + "\n"
        txtState.value = message
     } // end else

}else{  
        lblMessage.textContent = "Error code: " + req.status
}
}
