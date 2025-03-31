# Step to host website on AWS
----------------------------------------------
## **Normal Hosting (Static App) :**

1. **Login to AWS Console**
2. **Create an EC2 instance**
   - Choose an Amazon Linux or Ubuntu instance.
3. **Configure Security Group**
   - Open port `22` (SSH) for admin access only (restrict by IP).
   - Open port `80` (HTTP) for normal web traffic.
4. **Connect to the EC2 instance** using SSH.
   - Example: `ssh -i your-key.pem ec2-user@<EC2_PUBLIC_IP>`
5. **Install Apache Web Server** on the EC2 instance:
   ```bash
   sudo su
   yum update -y
   yum install httpd -y
   cd /var/www/html
   yum update -y
   yum install httpd -y
   cd /var/www/html
   ``` 
6. **Start the Apache Web Server**
   ```bash 
   service httpd start
   ```
7. **Access your website** 
   - Open a browser and navigate to http://<EC2_PUBLIC_IP> or the EC2 instance's public DNS.
   - Using this we can host as index.html on  ec2 with port no 80 

# **Custom React App Host Setup on EC2**

### 1. **Switch to Root User**
```bash
sudo su
```
### 2. Create the Workspace Directory
```bash
mkdir workSpace
cd workSpace
```
### 3. Install Required Packages

Install Git
For Amazon Linux:
```bash
sudo yum install git -y
sudo apt install git -y
```

Install Node.js on EC2
Download and install Node.js:

```bash
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs
```

Verify the installation:

```bash
node -v
npm -v
```

Install PM2 Globally
PM2 is used to serve your React build on port 80:

```bash
npm install -g pm2
```
### 4. Clone the React App Repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 5. Install Dependencies
```bash
npm install
```

### 6. Build the React App
```bash
npm run build
```

### 7. Serve the React App on Port 80 Using PM2

```bash
pm2 serve build 80 --spa
```

The --spa option is used to handle single-page applications.
This will start serving the index.html file on port 80.

### 8. Configure Security Group to Allow HTTP Traffic
 - Go to your EC2 Dashboard.
 - Select your EC2 instance.
 - Click on Security Groups in the description tab.
 - Add a rule to allow inbound traffic on port 80 for HTTP.

### 9. Open a Browser and Navigate to the Public IP/DNS
- Open a browser and navigate to http://<EC2_PUBLIC_IP> or the - - EC2 instance's public DNS.
- Your React app should now be visible on port 80.

### 10. Check PM2 Logs
- You can monitor your application using PM2 logs:

```bash
pm2 logs
```

### 11. Check the Public IP Address

Before starting the instance, you can check the public IP address via command:
 - Create The WorKspace
 - mkdir workSpace 
 - cd workSpace


## how to add the ssh key of my computer to github account 

### step1 
Generate ssh key for my pc 
```bash 
Asus/.ssh/ location that file .pub
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub 
```

add to setting/ssh/key/  -- github

## setup the restart.sh

```bash
# Start the SSH agent and add your SSH key
  eval "$(ssh-agent -s)"
# Restarting the React application
  echo "Restarting REACT"
  cd /home/ec2-user/workSpace/cloud-doc-mgmt-s3/cloud-doc-mgmt-client || exit
  git pull
  npm install
  npm run build
  sudo pkill node
# Kills any running Node.js processes
  nohup npm run dev >> ~/react-app.log 2>&1 &
# Run React app in the background and log output
# Restarting the Node.js backend
 echo "Restarting NODE"
 cd /home/ec2-user/workSpace/cloud-doc-mgmt-s3/cloud-doc-mgmt-server || exit
 git pull
 npm install
 nohup npm run dev >> ~/nodejs-app.log 2>&1 &
# Run Node.js backend in the background and log output
```