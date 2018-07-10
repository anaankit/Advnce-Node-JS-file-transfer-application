const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let globalFileNames = [];

console.log('\nWelcome!')

rl.question('\nPlease enter the name of the directory: ',(answer)=>{


    fs.readdir(answer,(err,fileNames) =>{


        

        if(err){

            console.log('\nno such directory exists');
                console.log('\nexiting Program')
                return process.exit(1);        


            
        }else if(fileNames == ''||fileNames == null||fileNames==undefined){
            console.log('\nSource Directory is empty\n\nExiting')
            return process.exit(1);
        }else{
            globalFileNames = fileNames
            
        }
    
    for(let x in globalFileNames){
        console.log(`\n${x}: ${globalFileNames[x]}`)
    }

    })




        
     //  end of readdir

     setTimeout(() => {
         
        console.log(`\nPlease Choose a file number from the list of files`)

    rl.question('\nenter the number of the file: ',(fileNumber)=>{

        if(!globalFileNames[fileNumber]){

            console.log('\nWrong File Number\n\nexiting')
            return process.exit(1);

        }

        console.log(`\nThe File you have chosen to copy  is:  ${globalFileNames[fileNumber]}`)

     //  end of enter number question

    rl.question('\nenter the destination Directory Name: ',(destinationName)=>{
    
        try{

            return fs.statSync(destinationName).isfile();

        }catch(e){

            if (e.code == 'ENOENT') { // no such file or directory. folder really does not exist
                
                console.log("\nDestination does not exits\n\nExiting program");
                return process.exit(1);
            
              } 

        }



        let readStream = fs.createReadStream(answer+'/'+globalFileNames[fileNumber])

        let writeStream = fs.createWriteStream(destinationName+'/'+globalFileNames[fileNumber])

        
    

        readStream.on('data',(chunk)=>{
            writeStream.write(chunk)
        }) 
        readStream.on('end',()=>{
            console.log('\nFile read complete')
            writeStream.end();
            console.log('\nFile write complete, Thank you!')
        })
    


    }) //  end of destination question

})
}, 1000);


})
