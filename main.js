const Discord = require('discord.js');
const fetch = require('node-fetch');
const CoinGecko = require('coingecko-api');

// Client represents the bot
const client = new Discord.Client();
// CoinGecko client
const CoinGeckoClient = new CoinGecko();

// Channel Id for reserve-report: 754436028894544034

// APIKEY
const EtherScanKey = '';
// Wallet Address
const DAOWallet = '';
// Discord bot token
const BotToken = '';

divisor = 1000000000000000000;

const prefix = '!';

client.once('ready', async () => {

    console.log('Reporter Bot is online!');
    //console.log( await walletContents());

    // Call to hourly message function goes here with setTimeout
    setTimeout(function(){ // in leftToEight() milliseconds run this:
        console.log('Message Should send next.');
        sendMessage(); // send the message once
        console.log('Message Should have been sent.');

        var hourInMilliseconds = 1000 * 60 * 60; // define one hour in miliseconds

        setInterval(function(){ // repeat this once an hour
            sendMessage();
        }, hourInMilliseconds)
        
    }, leftToEight());

});

client.on('message', async message =>{

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong');

    } else if (command === 'help'){
        message.channel.send('Here are some commands you can tell me to do:' +
        '\n    !help - Brings you here, where I describe my applicable commands.' +
        '\n    !wallet - Post the contents in the wallet of the DAO.' +
        '\n    !ping - I will respond with \'pong\'.' +
        '\n    !shutup - I will respond in kind.' +
        '\n    !meow - Post a picture of a random cat (Matt used this to practice API calls)' +
        '\n\nSome commands I will have soon:' +
        '\n    !assets - Post the price of a selection of crypto assets.' +
        '\n\nIn the future I will also make a post everytime an asset gets ' +
        'dropped into the DAO\'s wallet.'
        );

    } else if(command === 'shutup'){
        
        message.channel.send('No You!');

    } else if(command === 'meow'){

        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

        message.channel.send(file);

    } else if (command === 'wallet'){

            message.channel.send( await walletContents());

    }   // * * * add more commands here * * * 
    
});

// * * * NEED TO FIGURE THIS OUT. THIS FUNCTION ONLY WANTS TO LET ITS ENCASING CODE RUN AFTER 8am * * * 
function leftToEight(){
    var d = new Date();
    return (-d + d.setHours(0,0,0,0));
} // leftToEight function

async function sendMessage(){

    //console.log('sendMessage has been called!');
    
    const channel = await client.channels.fetch('754436028894544034');

    channel.send(await walletContents());

} // end sendMessage function

async function walletContents(){

    try{

        //console.log('walletContents function called.');

        const ETH = await fetch('https://api.etherscan.io/api?module=account&action=balance&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let ETHvalue = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const ETHdollars = (ETHvalue.tickers[0].last * (ETH.result/divisor));

        // contract address for USDC 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
        const USDC = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());

        // contract address for MKR 0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2
        const MKR = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let MKRvalue = await fetch('https://api.coingecko.com/api/v3/coins/maker/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const MKRdollars = (MKRvalue.tickers[0].last * (MKR.result/divisor));

        // contract address for BAL 0xba100000625a3754423978a60c9317c58a424e3d
        const BAL = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xba100000625a3754423978a60c9317c58a424e3d&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let BALvalue = await fetch('https://api.coingecko.com/api/v3/coins/balancer/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const BALdollars = (BALvalue.tickers[0].last * (BAL.result/divisor));

        // contract address for OMG 0xd26114cd6EE289AccF82350c8d8487fedB8A0C07
        const OMG = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xd26114cd6EE289AccF82350c8d8487fedB8A0C07&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let OMGvalue = await fetch('https://api.coingecko.com/api/v3/coins/omisego/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const OMGdollars = (OMGvalue.tickers[0].last * (OMG.result/divisor));

        // contract address for REN 0x408e41876cccdc0f92210600ef50372656052a38
        const REN = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x408e41876cccdc0f92210600ef50372656052a38&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let RENvalue = await fetch('https://api.coingecko.com/api/v3/coins/republic-protocol/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const RENdollars = (RENvalue.tickers[0].last * (REN.result/divisor));

        // contract address for ZRX 0xe41d2489571d322189246dafa5ebde1f4699f498
        const ZRX = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xe41d2489571d322189246dafa5ebde1f4699f498&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let ZRXvalue = await fetch('https://api.coingecko.com/api/v3/coins/0x/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const ZRXdollars = (ZRXvalue.tickers[0].last * (ZRX.result/divisor));

        // contract address for BAT 0x0d8775f648430679a709e98d2b0cb6250d2887ef
        const BAT = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x0d8775f648430679a709e98d2b0cb6250d2887ef&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let BATvalue = await fetch('https://api.coingecko.com/api/v3/coins/basic-attention-token/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const BATdollars = (BATvalue.tickers[0].last * (BAT.result/divisor));

        // contract address for BNT 0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c
        const BNT = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let BNTvalue = await fetch('https://api.coingecko.com/api/v3/coins/bancor/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const BNTdollars = (BNTvalue.tickers[0].last * (BNT.result/divisor));

        // contract address for KNC 0xdd974d5c2e2928dea5f71b9825b8b646686bd200
        const KNC = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdd974d5c2e2928dea5f71b9825b8b646686bd200&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let KNCvalue = await fetch('https://api.coingecko.com/api/v3/coins/kyber-network/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const KNCdollars = (KNCvalue.tickers[0].last * (KNC.result/divisor));

        // contract address for DAI 0x6b175474e89094c44da98b954eedeac495271d0f
        const DAI = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x6b175474e89094c44da98b954eedeac495271d0f&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let DAIvalue = await fetch('https://api.coingecko.com/api/v3/coins/dai/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const DAIdollars = (DAIvalue.tickers[0].last * (DAI.result/divisor));

        // contract address for LEND 0x80fB784B7eD66730e8b1DBd9820aFD29931aab03
        const LEND = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x80fB784B7eD66730e8b1DBd9820aFD29931aab03&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
        // get current value for token
        let LENDvalue = await fetch('https://api.coingecko.com/api/v3/coins/ethlend/tickers?exchange_ids=binance').then(response => response.json());
        // do some math
        const LENDdollars = (LENDvalue.tickers[0].last * (LEND.result/divisor));
        
        // special case for USDC
        const USDCdollars = USDC.result/1000000;

        const wallet = '```' +
                        '\nETH          ' + (ETH.result/divisor) +// '                    VALUE   $' + ETHdollars +
                        '\nUSDC         ' + (USDC.result/1000000)+// '                    VALUE   $' + USDCdollars +
                        '\nMKR          ' + (MKR.result/divisor) +// '                    VALUE   $' + MKRdollars +
                        '\nBAL          ' + (BAL.result/divisor) +// '                    VALUE   $' + BALdollars +
                        '\nOMG          ' + (OMG.result/divisor) +// '                    VALUE   $' + OMGdollars +
                        '\nREN          ' + (REN.result/divisor) +// '                    VALUE   $' + RENdollars +
                        '\nZRX          ' + (ZRX.result/divisor) +// '                    VALUE   $' + ZRXdollars +
                        '\nBAT          ' + (BAT.result/divisor) +// '                    VALUE   $' + BATdollars +
                        '\nBNT          ' + (BNT.result/divisor) +// '                    VALUE   $' + BNTdollars +
                        '\nKNC          ' + (KNC.result/divisor) +// '                    VALUE   $' + KNCdollars +
                        '\nDAI          ' + (DAI.result/divisor) +// '                    VALUE   $' + DAIdollars +
                        '\nLEND         ' + (LEND.result/divisor)+// '                    VALUE   $' + LENDdollars +
                        '\n\nTotal Wallet Value: $' + (ETHdollars + USDCdollars + MKRdollars + BALdollars + OMGdollars + RENdollars + 
                                                      ZRXdollars + BATdollars + BNTdollars + KNCdollars + DAIdollars + LENDdollars) +
                        '\n```';
        
        return wallet;

    } catch(error) {
        return error.message;
    } // end try/catch block

} // end walletContents function









// * * * THIS NEEDS TO BE THE LAST LINE IN THE FILE * * * 
client.login(BotToken);