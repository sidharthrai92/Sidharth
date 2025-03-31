# Cloud-Based Document Management System with AWS S3 Integration

A simple cloud-based document management system that allows users to upload, view, and manage documents stored in AWS S3. The system includes file upload functionality, document listing, and basic access management using AWS services.

## Features
- Upload documents to AWS S3.
- View a list of uploaded documents.
- Download and delete documents from AWS S3.
- Basic user interface for managing documents.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Storage:** AWS S3
- **Database:** (Optional) DynamoDB or PostgreSQL for metadata
- **Hosting:** AWS EC2 (or any hosting service)

---

## Prerequisites

Before running the project, make sure you have the following:

1. **AWS Account**: Set up an AWS account with S3 bucket access and necessary IAM permissions.
2. **AWS CLI**: Installed and configured with your AWS credentials.
3. **Node.js**: Ensure you have Node.js installed (v14 or later).
4. **React.js**: Basic knowledge for frontend setup.
5. **AWS SDK**: Install AWS SDK for Node.js to interact with AWS S3.

---

## Project Setup

### 1. Clone the Repositories
```bash
git clone https://github.com/your-username/cloud-doc-mgmt-s3.git
cd cloud-doc-mgmt-s3
```
Create a .env file in the root of the Frontend folder and add the following environment variables:
env
```bash
  REACT_APP_API_URL = http://localhost:{BACKEND_PORT}
```

#### Frontend (Client-Side):
```bash
cd cloud-doc-mgmt-client
npm install 
npm run dev
```

#### 2. Backend Setup

Create a .env file in the root of the backend folder and add the following environment variables:
env
```bash
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name
PORT=your_backend_port
DB=mongodb_url_altas
JWT_SECRET=secret_key
```

Navigate to the backend directory:
```bash
cd cloud-doc-mgmt-s3-server
npm install 
npm run dev
```

### RUN THE PROJECT THORUGH DOCKER-DESKTOP FILE 

```bash 
   cd Dev 
   docker-compose up 
```

## Usage

Once both frontend and backend servers are running:

1. Open `http://localhost:3000` in your browser.
2. Use the UI to upload documents to AWS S3.
3. View, download, and delete documents directly from the frontend.

## AWS S3 Setup

### Create an S3 Bucket:
1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/home) and create a new bucket.
2. Set the bucket permissions to allow access for uploading and downloading files as required.

### IAM User:
1. Create an IAM user with `AmazonS3FullAccess` permission (or restrict permissions to the specific bucket).
2. Obtain the **Access Key ID** and **Secret Access Key** for use in the `.env` file.

## Additional Notes

- **Security:** Ensure your AWS credentials and bucket policies are properly set to secure access.
- **Error Handling:** Implement error handling for operations like failed uploads or invalid file formats.
- **Scaling:** This project can be scaled by adding user authentication, using AWS IAM roles, and integrating more AWS services like DynamoDB for metadata storage.

### PROJECT SCREENSHOT

## Login Page 
![alt text](./screenShot/image.png)
## Register Page 
![alt text](./screenShot/image-1.png)
## Dashboard Page 
![alt text](./screenShot/image-2.png)
## Upload Document Page 
![alt text](./screenShot/image-3.png)


### Video Complete Processing 
<video controls src="./video/S3DocManager_ Cloud-Based Document Storage - Google Chrome 2024-09-30 20-26-35.mp4" title="Title"></video>