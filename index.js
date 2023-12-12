import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';

const port = 3000;
const host = '0.0.0.0'
var listUSUARIOS = [];
var listMSG = [];

function registrarUSU(req, res){
    
    const datas = req.body;
    let resContent = '';

    if(!(datas.nomeCompleto && datas.nickname && datas.em && datas.senha)) {

        resContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" type="text/css" href="styleCAD-LOG.css">
                <link rel="icon" type="image/svg" href="iconCAD.svg">
                <title>Cadastro</title>
            </head>
            <body>          
                <h1 class="Title">CADASTRO</h1>
                <div id="caixa">
                    <form action="/cadastro.html" method="POST">
                        <label for="nomeCompleto" class="rotul">Nome:</label>
                        <br>
                        <input type="text" id="nomeCompleto" name="nomeCompleto" placeholder="Insira seu nome completo" required>
            
                        <br>
                        <br>

        `;
        if(!datas.nomeCompleto) {
            resContent += `
                        <text class="rockDanger">O campo "Nome Completo" é obrigatório!</text>

                        <br>
                        <br>
            `;
        }

        resContent += `
                        <label for="nickname" class="rotul">Nome de Usuário:</label>
                        <br>
                        <input type="text" id="nickname" name="nickname" placeholder="Insira seu nome de usuário" required>

                        <br>
                        <br>
        `;   
        if(!datas.nickname) {
            resContent += `
                        <text class="rockDanger">O campo "Nome de Usuário" é obrigatório!</text>

                        <br>
                        <br>
            `;
        }   

        resContent += `
                        <label for="em" class="rotul">Email:</label>
                        <br>
                        <input type="email" id="em" name="em" placeholder="Insira seu email" required>
                        
                        <br>
                        <br>
        `;   
        if(!datas.em) {
            resContent += `
                        <text class="rockDanger">O campo "Email" é obrigatório!</text>

                        <br>
                        <br>
            `;
        }   

        resContent += `
                        <label for="senha" class="rotul">Senha:</label>
                        <br>
                        <input type="password" id="senha" name="senha" placeholder="Insira sua senha" required>
                        
                        <br>
                        <br>
        `;   
        if(!datas.senha) {
            resContent += `
                        <text class="rockDanger">O campo "Senha" é obrigatório!</text>

                        <br>
                        <br>
            `;
        } 

        resContent += ` 
                        <button id="BotconfirmCad" type="submit">Cadastrar</button>
                        <p>Já possui um cadastro? <a href="/login.html">Entre aqui!</a></p>
                    </form>
                </div>
            </body>
        </html>
        `;

        res.end(resContent);
    }
    else{
        
        const USUARIO = {
            NomeCompleto: datas.nomeCompleto,
            Nick: datas.nickname,
            Email: datas.em,
            Password: datas.senha,
        }

        listUSUARIOS.push(USUARIO);

        resContent = `
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <title>Tabela de Cadastros</title>
        </head>
        <body>
            <h1>Usuários Cadastrados</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nome Completo</th>
                        <th>Nome de Usuário</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
        `
        for(const USUARIO of listUSUARIOS) {
            resContent += `
                <tr>
                    <td>${USUARIO.NomeCompleto}</td>
                    <td>${USUARIO.Nick}</td>
                    <td>${USUARIO.Email}</td>
                </tr>
            `;
        }

        resContent += `
                </tbody>
            </table>
            <a class="btn btn-primary" href="/" role="button">Voltar ao Menu</a>
            <a class="btn btn-outline-info" href="/cadastro.html" role="button">Acessar Cadastro</a>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>    
            </body>
            </html>
        `;
        res.end(resContent);

    }
}

function autentic(req, res, next) {
    if(req.session.usuAutenticar) {
        next();
    } else {
        res.redirect("/login.html");
    }
}  

const app = express();

app.use(cookieParser());

app.use(session({secret: "M4sterChat482910", resave: true, saveUninitialized: true, cookie: {maxAge: 1000 * 60 * 15}}));

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(process.cwd(), './Pags')));

app.get('/', autentic, (req, res) => {
    const dataUA = req.cookies.DataUltimoAcesso;
    const data = new Date();
    let resContent = '';

    res.cookie("DataUltimoAcesso", data.toLocaleString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });

    resContent =`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="styleCAD-LOG.css">
        <link rel="stylesheet" type="text/css" href="styleCHAT.css">
        <link rel="icon" type="image/svg" href="iconCHAT.svg">
        <title>Menu do Sistema</title>
    </head>
    <body>
        <h1 class="Title">MENU</h1>
        <ul>
            <li><a href="/cadastro.html">Cadastro</a></li>
            <li><a href="/logout">Logout</a></li>
        </ul>
        
        <br>
        <hr>
        <br>

        <h1 id="Title">CHAT</h1>
    
        <div id="caixa-chatEX">
            <div id="caixa-chatIN">
    `;

    for (const mensagem of listMSG) {
        resContent += `
                <div class="nicknameMe">
                    ${mensagem.usuSELECIONADO}:
                </div>
                <div class="caixa-chat-msgMe">
                    ${mensagem.msg} 
                </div>
                \n
                <div class="nicknameMe">
                ${mensagem.horario} 
                </div>\n\n`;
    }

    resContent +=`
                <div id="pseNav">
                    <form action="/mandarMSG" method="POST">
                        <select id="selUSU" name="selUSU">
    `;

    for (const USUARIO of listUSUARIOS) {
        resContent += `
                            <option value="${USUARIO.Nick}">${USUARIO.Nick}</option>
        `;
    }

    resContent += `
                        </select>
                        <input id="msgArea" name="msgArea" type="text">
                        <p id="LastAccess">Seu ultimo acesso foi em: | ${dataUA} |</p>
                        <button type="submit" id="BotEnv">Enviar</button>
                    </form>
                </div>
                
            </div>
        </div>
    </body>
    </html>                          
    `;

    res.end(resContent);

});

app.post('/login', (req, res) => {
    const usuario = req.body.nomeUSU;
    const senha =  req.body.senhaL;
    if (usuario && senha && (usuario === 'Guxta') && (senha === '1234')) {
        req.session.usuAutenticar = true;
        res.redirect("/");
    } else {
        res.end(`
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="styleCAD-LOG.css">
            <title>FALHA NA AUTENTIFICAÇÃO</title>
        </head>
        <body>
            <h1 class="Title">Nome de usuário ou senha inválidos</h1>
            <a href="/login.html">Voltar ao Login</a>
        </body>
        </html>           
        `)
    }
});

app.get('/logout', (req, res) => {

    req.session.usuAutenticar = false;

    res.redirect('/login.html');
});

app.post('/cadastro', autentic, registrarUSU);

app.post('/mandarMSG', autentic, (req, res) => {
    const usuSELECIONADO = req.body.selUSU;
    const msg = req.body.msgArea;
    const horario = new Date().toLocaleString();

    listMSG.push({ usuSELECIONADO, msg, horario });
    
    res.redirect('/');
});

app.listen(port, host, () => {
    console.log(`Servidor operando na URL | http://${host}:${port} |`);
});
