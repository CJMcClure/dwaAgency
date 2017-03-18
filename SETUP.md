# Server Setup

##Create Droplets (Servers)

###Sign Up

Setup an account at [Digital Ocean](https://www.digitalocean.com)

> Once you are logged in, complete the following steps from your dashboard.

###Initialize

####Staging Server

Click the `Create Droplet` button.

Select `Ubuntu 16.04.2x64`

Select `$5/mth` size package

Select a `New York` data center

Name Droplet `staging`

Click `Create`

> Note: Copy the ip address somewhere readily available, we'll use it within the next few steps

####Production Server

Click the `Create Droplet` button.

Select `Ubuntu 16.04.2x64`

Select `$5/mth` size package

Select a `New York` data center

Name Droplet `production`

Click `Create`

> Note: Copy the ip address somewhere readily available, we'll use it within the next few steps

## Install Ansible

###Homebrew First

From your terminal, enter the following command:

```Shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)
```
###Ansible Second

From your terminal, enter the following command:

```Shell
brew install ansible
```
> Note: Once you've installed these two tools, you're ready to move on to the next steps.

## Clone git repo

From terminal, navigate to a directory you want to have the our project added to:

```Shell
cd /path/to/your/working/directory
```

Now clone the project repo in this directory, by entering the following command:

```Shell
git clone https://github.com/criticalfault/dwaAgency
```

> Note: If the project was cloned correctly, you will now have a folder titled `dwaAgency` in your current directory.

## Run Ansible Playbooks

In terminal change directories to the cloned projects, ansible directory:

```Shell
cd /Path/to/dwaAgency/ansible
```
###Add staging and production ip's to ansible-playbooks

There are two ansible playbooks in this directory, you will need to follow this instruction block for Dwa_Api after we setup the servers.

To access the first playbook:

```Shell
cd Dwa_Servers
```

Open the `hosts` file in your favorite text editor

It will look like this:

```txt
[staging]
45.55.207.227

[production]
104.236.195.240
```

Replace the ip address under `[staging]` with your new staging server ip

Replace the ip address under `[production]` with your new production server ip

> Note: Save the hosts file before continuing

Now we need to update the files in the group_vars directory

Both the staging.yml and production.yml files will look like this:

```yaml
---
system:
  ip: <ip-here>
  user: casey
```

In the `staging.yml` file, replace the existing ip, with the new staging server ip.

In the `production.yml` file, replace the existing ip, with the new production server ip.

> Note: Ensure you save each file after adding the new ip address

Complete the same steps for the `Dwa_Api` directory

### Run Ansible

Make sure you are in the top level directory of your project:

```Shell
cd /Path/to/dwaAgency
```

First we need to install python2 on each of our servers, by running the following commands in terminal

First:

```Shell
ansible staging -m raw -s -a "sudo apt-get -y install python-simplejson" -u root --private-key=~/.ssh/<ssh-key> -i ./hosts
```

Second:

```Shell
ansible production -m raw -s -a "sudo apt-get -y install python-simplejson" -u root --private-key=~/.ssh/<ssh-key> -i ./hosts
```

Now python2 is installed and we can run our ansible playbooks with the following commands:

```Shell 
cd Dwa_Server

ansible-playbook setup.yml -i ./hosts --private-key ~/.ssh/id_ansible --ask-become-pass
```

```Shell
cd ../Dwa_Api

ansible-playbook setup.yml -i ./hosts --private-key ~/.ssh/id_ansible --ask-become-pass
```

> Note: the sudo password to use when prompted, can be found in our `env.json` as `non_root_ssh_pass`

### Setup pm2 ecosystem

From your terminal, create a file called `ecosystem.config.js` in your project directory. It is already setup in the .gitignore to be ignored.

```Shell
cd /Path/to/your/project

touch ecosystem.config.js

nano ecosystem.config.js
```
Once you have ecosystem.config.js open in your terminal editor, copy the following snippet and paste it in the file:

> Note: Switch out the `<placeholders>` in the snippet for your username, password, and database, on the server.

```Shell
module.exports = {
/**
 * Application configuration section
 * http://pm2.keymetrics.io/docs/usage/application-declaration/
 */
  apps : [
    {
      name      : "API",
      script    : "/var/www/dwa_api/src/server.js",
      env: {
        COMMON_VARIABLE: "true",
        DB_USER: <placeholder>,
        DB_PASSWORD: <placeholder>,
        DB_DATABASE: <placeholder>,
        NODE_ENV: "production"
      },
    },
  ],
}
```

Now we need to get this ecosystem file onto our staging and production servers.
We can do this with the following commands:

> Note: Replace <public-key> with your public ssh key used in server setup.

```Shell
scp -i ~/.ssh/<public-key> ecosystem.config.js root@45.55.207.227:/var/www/ecosystem.config.js
```

```Shell
scp -i ~/.ssh/<public-key> ecosystem.config.js root@104.236.195.240:/var/www/ecosystem.config.js
```

Your servers are now configured for use.

## Configure Codeship

Installation comes in three parts...

1. Codeship

###Setting up CodeShip

####Getting an Account

First you need to get an account on _www.Codeship.com_. Once you have registered, you can click on the menu above and click, 'Create a new project'

####Linking a Repository
You will be given three options to link your code repository. _Github_, _BitBucket_, _Gitlab_. 

![Imgur](http://i.imgur.com/rr3R2qq.png)

Once you click on your repository service of your choice. You will have to enter the link to the repository you want to codeship.

![Imgur](http://i.imgur.com/rmOjKCq.png)

You then will be asked to choose between _Codeship basic_ and _pro_. We will only be covering the basic tools. Though you can free feel to use the Pro should you find you enjoy this tool specifically.

![Imgur](http://i.imgur.com/CZzJpAn.png)

After, you will need to make a test setup for the repository you are using. This will require you to declare what kind of tests you will be using and what you will be using to perform them with. They have prestablished test builds for many of the more popular code bases. Select your unit testing software and make sure they are placed in the proper folders in your repository. 

![Imgur](http://i.imgur.com/AvqZe0Q.png)

Finalize with writing the commands required to run your tests!

After you have completed this final test commands. It will require you to make a push to the repository you have configured. This will then accept in your push, download that repository on to _CodeShip_ and run your unit test. After completion, if its gets a green light (Your tests succeed) then it will fire off the deployment plan you will be prompted to establish.

####Project Settings

After your successful push (Continue to retry after making modifications to your code so your tests succeed). You can setup a deployment pipeline to have _CodeShip_ push your code to a remote server. This requires you to add _CodeShips_ SSH Key to the ```~/.ssh/authorized_keys``` file. This key can be found under the general tab of project settings.

>Be extremely careful when editing this file. It is very possible to accidentally change this file while trying to add the key to the bottom of it. Doing so will make it impossible for you to use the edited key as they need to match exactly.


Once you have finished editing in your files. You will need to move onto the "deployment" aspect of the CodeShip Pipeline.

![Imgur](http://i.imgur.com/oWczdTR.png)

Click on the "Add New Deployment Pipeline" and configure the "prerelease" and "master" branches to match exactly to those names.

They will each take you to a new page. Click on Custom Script and then enter in the following...

```
#PreRelease Branch -> Sends to Staging
ssh codeship@45.55.207.227 'rm -Rd /var/www/dwa_api/*'
scp -rp ~/clone/* codeship@45.55.207.227:/var/www/dwa_api/
ssh codeship@45.55.207.227 'npm install /var/www/dwa_api/'
ssh codeship@45.55.207.227 '/usr/local/lib/npm/bin/pm2 restart /var/www/ecosystem.config.js'
```

Make Sure to sub out the IP Addresses for the correct locations. The Prerelease SCPing to the Staging Server and the Master SCPing to the Production Server.

When you save, it should look like this.

![Imgur](http://i.imgur.com/PEDdf7Z.png)

