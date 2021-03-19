# What is ExAMPle?
ExAMPle stands for EXamine A Market PLEase. It's used to analyze market trends in OSRS. If desired, it could be used to predict the increase or decrease in price of certain items over time.

# How do I use ExAMPle?
To use ExAMPle, you need to install NodeJS from [here](https://nodejs.org/en/). Once installed, use the command line to navigate to the folder you downloaded "getItemsPSAR.js" to and use the command "node getItemsPSAR.js". Optionally, you can add -v to the end of the command to give the Bollinger Band width, the mean price over 21 days, and the standard deviation of the price over 21 days. Simply input the name of the item you want to check and the information will output to the console.

# Why 21 days?
It's a sample timeframe I thought would be appropriate for the 180 day range that the OSRS-Exchange API gives for prices.

# What can I do after using ExAMPle for the original analysis?
After using ExAMPle, the program will create a folder called "exports". This folder will include a price csv and a PSAR csv that can be exported to a spreadsheet or a graphing program like Desmos (my personal preference for quick viewing).

### This software uses the OSRS Logs' osrs-exchange API, this is their MIT License.
MIT License

Copyright (c) OSRS Logs https://osrslogs.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.