var rp = require('request-promise');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var Nexmo = require('nexmo');
var CronJob = require('cron').CronJob;



sendMail = function () {


    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'goleroapp@gmail.com', // Your email id
            pass: 'vicoc123*' // Your password
        }
    });

    var mailOptions = {
        from: 'goleroapp@gmail.com', // sender address
        to: 'diago2012@icloud.com', // list of receivers
        subject: 'Citas Panamá dale que hay!!', // Subject line
        html: '<h3>Hay citas disponibles..!!!</h3>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);

        } else {
            console.log('Message sent: ' + info.response);

        }

    });

};

sendSMS = function () {

    //Enviar a Jorge Felix..
    var nexmo = new Nexmo({
        apiKey: '4972f567',
        apiSecret: 'vLXuKZCdGGb5wLfF'
    });

    // Jorge Felix
    // sender: 12028585645
    // dest: 17863431070
    nexmo.message.sendSms('12028585645', '17863431070', 'Hay Citas...', function (err, responseData) {
        if (err) {
            console.log(err);
        } else {
            console.dir(responseData);
        }
    });

    //Enviarme a mi..
    nexmo = new Nexmo({
        apiKey: '11429e1c',
        apiSecret: 'NbPLuzh0sCp5agxS'
    });

    nexmo.message.sendSms('593998856446', '593998856446', 'Hay Citas...', function (err, responseData) {
        if (err) {
            console.log(err);
        } else {
            console.dir(responseData);
        }
    });
};


exports.scrap = function (req, res) {

    var options = {
        uri: 'http://visas.migracion.gob.pa/SIVA/verif_citas/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function ($) {

            var cant = 0;
            $('a').each(function () {
                cant++;
            });

            if (cant > 1) {
                sendSMS();
            }

            res.status(200).jsonp('Cantidad de botones: ' + cant);
        })
        .catch(function (err) {
            res.status(500).jsonp('Error -> ' + err);
        });

};

automaticScrap = function () {

    var options = {
        uri: 'http://visas.migracion.gob.pa/SIVA/verif_citas/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function ($) {

            var cant = 0;
            $('a').each(function () {
                cant++;
            });

            if (cant > 1) {
                console.log('Hay citas disponibles');
                sendSMS();
            }else{
                console.log('No hay citas disponibles');
            }

        })
        .catch(function (err) {
            console.log('Error -> ' + err);
        });

};

//Automatic Scrap
new CronJob('59 * * * * *', function() {
    automaticScrap();
}, null, true, 'America/Los_Angeles');


//OPTIONS Allow CORS to DELETE
exports.options = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    next();
};


