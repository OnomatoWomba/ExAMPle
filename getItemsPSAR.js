/*
PSAR and Bollinger bands implemented into a Runescape API
gl;hf
*/

const fs = require("fs");
const Exchange = require("osrs-exchange").default;
const inquirer = require("inquirer");

let pricesAsJson;
let pricesAsArray = [];
let psarAsArray = [];

let wasUptrend = false;

let extrema = 0;
let acceleration = 0.2;
let currSAR = 0;
let prevSAR = 0;

var questions = [
    {
      type: 'input',
      name: 'response',
      message: "Name of the item to search for?"
    }
]

const exchange = new Exchange({ timeout:1000 });

console.clear();

inquirer.prompt(questions).then(async (res)=>{

    console.clear();
    console.log("Getting prices...");

    await exchange.getItemPriceGraphByName(res["response"]).then(APIres => {pricesAsJson = APIres}).catch(err => {console.log(err)});

    for(let i in pricesAsJson["daily"]){
        pricesAsArray.push(pricesAsJson["daily"][i]);
    }

    console.clear();

    extrema = pricesAsArray[0];
    currSAR = pricesAsArray[0];
    highestHigh = pricesAsArray[0];
    lowestLow = pricesAsArray[0];

    let average21 = 0;
    for(let i = pricesAsArray.length-21; i < pricesAsArray.length;i++){
        average21 += pricesAsArray[i]/21;
    }

    let stanDev = 0;
    stanDev = Math.sqrt((pricesAsArray[pricesAsArray.length-1] - average21) * (pricesAsArray[pricesAsArray.length-1] - average21));

    for(let i = 0;i<pricesAsArray.length;i++){

        //Calculate PSAR

        prevSAR = currSAR;
        
        if(pricesAsArray[i] > prevSAR){ //Uptrend (Buy)
            if(!wasUptrend){
                acceleration = 0.02;
            }

            if(pricesAsArray[i] > extrema){
                if(acceleration < 0.2){
                    acceleration += 0.02;
                }
                extrema = pricesAsArray[i];
            }

            currSAR = prevSAR + acceleration * (extrema - prevSAR);
            psarAsArray.push(currSAR);
            console.log(i + " uptrend " + currSAR);

            if(!wasUptrend){
                extrema = pricesAsArray[i];
                wasUptrend = true;
            }
        
        }
        else if(pricesAsArray[i] < prevSAR){ //Downtrend (Sell)

            if(wasUptrend){
                acceleration = 0.02;
            }

            if(pricesAsArray[i] < extrema){
                if(acceleration < 0.2){
                    acceleration += 0.02;
                }
                extrema = pricesAsArray[i];
            }

            currSAR = prevSAR - acceleration * (prevSAR - extrema);
            psarAsArray.push(currSAR);
            console.log(i + " downtrend " + currSAR);
            
            if(wasUptrend){
                extrema = pricesAsArray[i];
                wasUptrend = false;
            }
        
        }

    }
    
    //Price average display.
    if(pricesAsArray[pricesAsArray.length - 1] > average21){
        console.log("\nPrice is above the 21 day average of "+average21+"!");
    }
    else{
        console.log("\nPrice is not above the 21 day average of "+average21+".");
    }

    if(((average21 + stanDev) - (average21 - stanDev)) / average21 >= 0.07){
        console.log("\nThe market is in high volatility. No bollinger band squeeze.");
    }
    else if(((average21 + stanDev) - (average21 - stanDev)) / average21 >= 0.04){
        console.log("\nMarket is becoming volatile. Bollinger band expansion or contraction may be occuring.");
    }
    else{
        console.log("\nThe market in not in high volatility. Bollinger band squeeze.");
    }

    //Mean display
    if(process.argv.includes("-v")){
        console.log("\nBollinger band width is "+((average21 + stanDev) - (average21 - stanDev)) / average21);
        console.log("\nMean is: "+average21+". Standard deviation is: "+stanDev+".")
    }

    //Current price display.
    if(process.argv.includes("-v")){
        console.log("\nCurrent price is: " + pricesAsArray[pricesAsArray.length - 1]);
    }

    if(!fs.existsSync("./exports")){
        fs.mkdirSync("./exports");
    }

    //Write data to csv format.
    let writeStream = fs.createWriteStream("./exports/data_"+res["response"].replace(" ", "_").toLowerCase()+"_price.csv");
    let writeStream2 = fs.createWriteStream("./exports/data_"+res["response"].replace(" ", "_").toLowerCase()+"_PSAR.csv");

    for(let i = 0; i < pricesAsArray.length; i++){
        writeStream.write(String(i+","+pricesAsArray[i]));
        writeStream.write("\n");
        if(psarAsArray[i] != undefined){
            writeStream2.write(String(i+","+psarAsArray[i]));
            writeStream2.write("\n");
        }
    }

});