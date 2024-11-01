# w3hetic
School project

## Run the project

Clone the project : 
`git clone https://github.com/LinelinLove/w3hetic.git`

Copy the file `.env.example` and rename in `.env`

Go to the file app/ : `cd app/`

For those who don't have `make` installed you can get it for 
Windows here : `https://gnuwin32.sourceforge.net/packages/make.htm` or with the installer Chocolatey with a few extra step :
- In an Admin Powershell Paste this : `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`
- Then this `choco install make`
Mac : `https://formulae.brew.sh/formula/make`

Run the docker-compose : `make build`

Wireframe of the project: 
![Alt Text](./screenshot/maquette-front-mobile-first.png) 

Architecture of the project:
![Alt Text](./screenshot/architectureDocker.png)