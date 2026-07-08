pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-2"
        ACCOUNT_ID = "649170435015"

        CRUD_IMAGE = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/crud-api"
        AUTH_IMAGE = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/multi-auth"

        IMAGE_TAG = "${BUILD_NUMBER}"

        SECRET_NAME = "devops-hiring-project-postgres-secret"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t crud-api ./crud-api
                docker build -t multi-auth ./multi-auth
                '''
            }
        }

        stage('Test Images') {
            steps {
                sh '''
                docker images | grep crud-api
                docker images | grep multi-auth
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

        stage('Push Images') {
            steps {
                sh '''
                docker tag crud-api:latest $CRUD_IMAGE:$IMAGE_TAG
                docker tag crud-api:latest $CRUD_IMAGE:latest

                docker tag multi-auth:latest $AUTH_IMAGE:$IMAGE_TAG
                docker tag multi-auth:latest $AUTH_IMAGE:latest

                docker push $CRUD_IMAGE:$IMAGE_TAG
                docker push $CRUD_IMAGE:latest

                docker push $AUTH_IMAGE:$IMAGE_TAG
                docker push $AUTH_IMAGE:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                ##################################################
                # Deploy CRUD API
                ##################################################

                docker stop crud-api || true
                docker rm crud-api || true

                docker pull $CRUD_IMAGE:$IMAGE_TAG

                docker run -d \
                    --name crud-api \
                    --restart unless-stopped \
                    -p 3000:3000 \
                    -e AWS_REGION=$AWS_REGION \
                    -e SECRET_NAME=$SECRET_NAME \
                    $CRUD_IMAGE:$IMAGE_TAG

                ##################################################
                # Deploy Multi Auth
                ##################################################

                docker stop multi-auth || true
                docker rm multi-auth || true

                docker pull $AUTH_IMAGE:$IMAGE_TAG

                docker run -d \
                    --name multi-auth \
                    --restart unless-stopped \
                    -p 4000:4000 \
                    -e AWS_REGION=$AWS_REGION \
                    -e SECRET_NAME=$SECRET_NAME \
                    -e DB_NAME=multi_auth_db \
                    -e JWT_SECRET=your-super-secret-key \
                    -e JWT_EXPIRES_IN=1d \
                    $AUTH_IMAGE:$IMAGE_TAG
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                echo "Waiting for applications..."

                sleep 20

                ##################################################
                # CRUD API
                ##################################################

                CRUD_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health)

                if [ "$CRUD_STATUS" != "200" ]; then
                    echo "CRUD API Health Check Failed"
                    docker logs crud-api --tail 50
                    exit 1
                fi

                ##################################################
                # MULTI AUTH
                ##################################################

                AUTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/auth/profile)

                if [ "$AUTH_STATUS" != "401" ]; then
                    echo "Multi Auth Health Check Failed"
                    docker logs multi-auth --tail 50
                    exit 1
                fi

                echo "Both applications are healthy."
                '''
            }
        }

    }

    post {

        success {
            echo "Deployment Successful"
        }

        failure {
            sh '''
            docker logs crud-api --tail 100 || true
            docker logs multi-auth --tail 100 || true
            '''
            echo "Deployment Failed"
        }

        always {
            sh '''
            docker ps
            '''
        }
    }
}
