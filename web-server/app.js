import EXPRESS from "express";
import PATH from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = PATH.dirname(__filename);
const APP = EXPRESS();

// Set the port
APP.set('port', 8082);

// Tell express that we want to use the www folder
// for our static assets
APP.use(EXPRESS.static(PATH.join(__dirname, '../www')));
APP.use(EXPRESS.static(PATH.join(__dirname, '..')));

// Listen for requests
const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function () {
 console.log('Servidor inicializado en http://<dirección IP>:' + APP.get('port'));
});