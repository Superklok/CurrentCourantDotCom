# The Current Courant (English Version) v1.23.20
<br />

## Basic Root User Deployment Guide For App Evaluation
###### This guide is intended for deployment testing purposes & it uses the Root user. Creating a new user is strongly suggested for a production setup.
<br />

### 1. Deploy a Cloud Compute Ubuntu 22.04 server from Vultr named "CCdotCom".
<br />

### 2. Open a PowerShell (as Admin) terminal & connect to your CCdotCom server's IP address via SSH:

```Bash
ssh root@enter.CCdotCom.IP.address
```

- **Enter the password provided by Vultr on the CCdotCom server page & follow all prompts until connected.**
<br />

### 3. Update Ubuntu OS:

```Bash
sudo apt update && sudo apt upgrade -y
```

<br />

### 4. Enable & setup UFW Firewall:

```Bash
sudo ufw enable
```

```Bash
sudo ufw status
```

- **It should display that the UFW Firewall is active.**

```Bash
sudo ufw allow ssh
```

```Bash
sudo ufw allow http
```

```Bash
sudo ufw allow https
```

- **Restart the CCdotCom server then reconnect via SSH (repeat step 2).**

```Bash
sudo reboot
```

<br />

### 5. Install Node onto the server:

```Bash
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

```Bash
sudo apt install nodejs
```

```Bash
npm --version
```

- **The NPM version should be displayed.**

```Bash
node --version
```

- **The Node version should be displayed.**
<br />

### 6. Clone the CurrentCourantDotCom GitHub repository to the CCdotCom server:

```Bash
cd ~/
```

```Bash
mkdir superkloklabs
```

```Bash
cd superkloklabs
```

```Bash
git clone https://github.com/Superklok/CurrentCourantDotCom.git
```

<br />

### 7. Install dependencies:

```Bash
cd CurrentCourantDotCom/v1.x.x/
```

```Bash
npm i
```

<br />

### 8. Start app using PM2:

```Bash
npm i pm2 -g
```

- **Set environment variables:**

```Bash
cd ~/
```

```Bash
nano .bashrc
```

- **Add the following to the top of the file:**

```Bash
export CLOUDINARY_CLOUD_NAME="YourCloudinaryCloudName"
```

```Bash
export CLOUDINARY_KEY="YourCloudinaryKey"
```

```Bash
export CLOUDINARY_SECRET="YourCloudinarySecret"
```

```Bash
export SESSION_SECRET="YourSessionSecret"
```

```Bash
export AUTHOR_CODE="YourAuthorCode"
```

```Bash
export DB_URL="YourMongoDatabaseURL"
```

```Bash
export PORT="ThePortCCdotComIsRunningOn"
```

```Bash
export NODE_ENV="production"
```

- **Press ctrl+x & save changes, then refresh the user environment:**

```Bash
source .bashrc
```

- **Double check that the new environment variables have been set correctly.**

```Bash
env
```

- **Then start the app in cluster mode:**

```Bash
cd superkloklabs/CurrentCourantDotCom/v1.x.x/
```

```Bash
pm2 start app.js --name "CCdotCom" -i max
```

<br />

### 9. Setup a start script to automatically start the app if the CCdotCom server is restarted:

```Bash
pm2 startup ubuntu
```

```Bash
pm2 save
```

<br />

### 10. Install & configure NGINX:

```Bash
sudo apt install nginx
```

```Bash
sudo nano /etc/nginx/sites-available/default
```

- **Add the following to the location part of the server block:**

```JavaScript
server_name yourwebsite.com www.yourwebsite.com;
    location / {
        proxy_pass http://localhost:ThePortCCdotComIsRunningOn;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

- **Press ctrl+x & save changes.**
- **Check NGINX config:**

```Bash
sudo nginx -t
```

- **Restart NGINX:**

```Bash
sudo service nginx restart
```

<br />

### 11. Update your DNS "A" records for "yourwebsite.com" & "www.yourwebsite.com" with the CCdotCom server IP address.
<br />

### 12. Setup SSL with LetsEncrypt:

```Bash
sudo snap install core; sudo snap refresh core
```

```Bash
sudo snap install --classic certbot
```

```Bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

```Bash
sudo certbot --nginx -d yourwebsite.com -d www.yourwebsite.com
```

- **Enter your@email.com for the email address it requests, & select (y)es, then (n)o.**
- **Test the 90 day renewal process:**

```Bash
certbot renew --dry-run
```

- **Test the PM2 startup script by restarting the CCdotCom server:**

```Bash
sudo reboot
```

- **Then reconnect to the CCdotCom server via SSH (repeat step 2).**
- **Check PM2 to make sure CCdotCom is still running in cluster mode:**

```Bash
pm2 status
```

- **Logout of SSH:**

```Bash
exit
```

<br />
<br />

## DONE!
<br />

###### Languages

[<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />][javascript] [<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />][css] [<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />][html] [<img src="https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white" />][json] [<img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" />][markdown]

###### Database

[<img src="https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=4EA94B" />][mongo]

###### Libraries, Frameworks & Runtime

[<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />][express] [<img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />][bootstrap] [<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />][node] [<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />][npm]

###### Deployment Tools & Services

[<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />][docker] [<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" />][nginx] [<img src="https://img.shields.io/static/v1?style=for-the-badge&message=Let%E2%80%99s+Encrypt&color=003A70&logo=Let%E2%80%99s+Encrypt&logoColor=FFFFFF&label=" />][letsencrypt] [<img src="https://img.shields.io/static/v1?style=for-the-badge&message=Vultr&color=007BFC&logo=Vultr&logoColor=FFFFFF&label=" />][vultr]

<br />
<br />

[javascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[css]: https://developer.mozilla.org/en-US/docs/Web/CSS
[html]: https://developer.mozilla.org/en-US/docs/Web/HTML
[json]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
[markdown]: https://www.markdownguide.org/getting-started/
[mongo]: https://docs.mongodb.com/
[express]: https://expressjs.com/en/guide/routing.html
[bootstrap]: https://getbootstrap.com/docs/5.0/getting-started/introduction/
[node]: https://nodejs.org/en/docs/guides/
[npm]: https://docs.npmjs.com/cli/v7/commands/npm
[docker]: https://hub.docker.com/r/superklok/currentcourantdotcom/tags
[nginx]: https://docs.nginx.com/
[letsencrypt]: https://certbot.eff.org/
[vultr]: https://www.vultr.com/