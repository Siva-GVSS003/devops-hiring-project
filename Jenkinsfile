pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-2"
        ACCOUNT_ID = "649170435015"
        ECR_REPO = "crud-api"
        IMAGE = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t crud-api ./crud-api
                '''
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION \
                | docker login \
                --username AWS \
                --password-stdin \
                $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker tag crud-api:latest $IMAGE:latest
                docker push $IMAGE:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop crud-api || true
                docker rm crud-api || true

                docker pull $IMAGE:latest

                docker run -d \
                --name crud-api \
                --restart unless-stopped \
                -p 3000:3000 \
		-e AWS_REGION=$AWS_REGION \
		-e SECRET_NAME=devops-hiring-project-postgres-secret \
                $IMAGE:latest
	        sleep 10

                docker ps -a

                docker logs crud-api --tail 50                '''
            }
        }

    }
}
