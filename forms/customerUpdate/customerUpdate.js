let allNames = ""
let psotUpdate = ""

customerUpdate.onshow=function(){
    // get the data to populate the dropdown with names from database
    let query = "SELECT name FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=dtn75570&pass=" + pw + "&database=dtn75570&query=" + query)


    if (req.status == 200) { //transit worked.
            allNames = JSON.parse(req.responseText)
            // names now in results array - load names into the dropdown
            selUpdate.clear()
            for (i = 0; i <= allNames.length - 1; i++)
                selUpdate.addItem(allNames[i])
    } else {
        // transit error
        NSB.MsgBox(`Error: ${req.status}`);
    }  

}

btnUpdate.onclick=function(){
    let newName = inptNewName.value
    let oldName = selUpdate.value
    
    let found = false
    for (i = 0; i <= allNames.length - 1; i++) {
        // console.log(`FOUND IS false and name is ${allNames[i]}`)
        if (oldName == allNames[i]) {
            found = true
            break
        }
     }   
    if (found == false) 
       NSB.MsgBox("That customer name is not in the database.")
    else if (found == true) {
        query = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
        //alert(query)
       req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=kas40488&pass=" + pw + "&database=kas40488&query=" + query)

        if (req.status == 200) { //transit worked.
            if (req.responseText == 500) {   // means the update succeeded
                NSB.MsgBox(`You have successfully changed the customer name!`)
                // reset controls to original state
                inptNewName.value = ""
                selUpdate.value = ""
            } else
                NSB.MsgBox(`There was a problem changing the customer name.`)
        } else 
            // transit error
            NSB.MsgBox(`Error: ${req.status}`);
    } // found is true 
}

btnCheck1.onclick=function(){
    query = "SELECT * FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=kas40488&pass=" + pw + "&database=kas40488&query=" + query)

if (req.status == 200){ 
        postUpdate = JSON.parse(req.responseText)
        console.log(postUpdate)
        
    if (postUpdate.length == 0){  
        NSB.MsgBox(`There are no customer in the database.`)
    }else {   
        console.log(`the parsed JSON is ${postUpdate}`)
        console.log(`the first row/item in the big array is a small array: ${postUpdate[0]}`)


        // Now output the names of all the dogs into the textArea control:
        let message2 = ""
        for (i = 0; i < postUpdate.length; i++)
            message2 = message2 + postUpdate[i][1] + "\n"
        txtPostUpdate.value = message2

     } // end else

}else{  
        NSB.MsgBox(`Error: ${req.status}`)
}
}

















